'use client';

import React from 'react';
import Link from 'next/link';
import { LegalDocument } from '@/lib/types/document';
import { StatusBadge, RiskBadge } from '@/components/ui/Badge';
import {
  FileText,
  Image as ImageIcon,
  MessageSquare,
  Eye,
  Trash2,
  RefreshCw,
  AlertCircle,
  Clock,
} from 'lucide-react';

interface DocumentCardProps {
  document: LegalDocument;
  onDelete: (id: string) => void;
  onRetry: (id: string) => void;
}

export const DocumentCard: React.FC<DocumentCardProps> = ({
  document,
  onDelete,
  onRetry,
}) => {
  const isFailed = document.status === 'failed';
  const isProcessed = document.status === 'processed';

  const riskScore = document.analysis?.summary.totalEstimatedRiskScore;

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition-all flex flex-col justify-between shadow-lg group">
      <div>
        {/* Top bar: Category & Status */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-800 text-slate-300 border border-slate-700">
            {document.category}
          </span>
          <StatusBadge status={document.status} />
        </div>

        {/* Title & File Icon */}
        <div className="flex items-start gap-3 mb-3">
          <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20 shrink-0">
            {document.fileType === 'pdf' ? (
              <FileText className="w-6 h-6" />
            ) : (
              <ImageIcon className="w-6 h-6" />
            )}
          </div>
          <div>
            <h3 className="text-base font-semibold text-slate-100 group-hover:text-blue-400 transition-colors line-clamp-1">
              {document.title}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
              <span>{document.fileName}</span>
              <span>•</span>
              <span>{document.fileSizeFormatted}</span>
            </p>
          </div>
        </div>

        {/* Failure message if failed */}
        {isFailed && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs text-rose-300">
            <div className="flex items-center gap-1.5 font-semibold text-rose-400 mb-1">
              <AlertCircle className="w-4 h-4" /> Processing Error
            </div>
            <p>{document.failureReason || 'Failed to extract text from file.'}</p>
            <button
              onClick={() => onRetry(document.id)}
              className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-medium transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Processing
            </button>
          </div>
        )}

        {/* Highlights Preview if Processed */}
        {isProcessed && document.analysis && (
          <div className="space-y-2 mb-4 bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium">Overall Risk:</span>
              <RiskBadge
                severity={
                  riskScore === 'High'
                    ? 'high'
                    : riskScore === 'Moderate'
                    ? 'medium'
                    : 'low'
                }
              />
            </div>
            <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed italic">
              &quot;{document.analysis.summary.executiveSummary}&quot;
            </p>
            <div className="flex items-center gap-3 text-[11px] text-slate-400 pt-1 border-t border-slate-800">
              <span>{document.analysis.keyClauses.length} Key Clauses</span>
              <span>•</span>
              <span>{document.analysis.risks.length} Risk Factors</span>
              <span>•</span>
              <span>{document.analysis.importantDates.length} Dates</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-slate-800 text-xs">
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span>{new Date(document.uploadDate).toLocaleDateString()}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => onDelete(document.id)}
            title="Delete Document"
            className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>

          {isProcessed && (
            <>
              <Link
                href={`/documents/${document.id}`}
                className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-md font-medium transition-colors border border-slate-700"
              >
                <Eye className="w-3.5 h-3.5 text-blue-400" />
                Analysis
              </Link>
              <Link
                href={`/documents/${document.id}/chat`}
                className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-medium transition-colors shadow-sm"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Chat AI
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
