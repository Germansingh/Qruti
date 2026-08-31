import React from 'react';
import { AnalysisResult } from '@/lib/types/document';
import { RiskBadge } from '@/components/ui/Badge';
import { FileCheck, Sparkles, MapPin, Scale, CheckCircle2 } from 'lucide-react';

interface SummaryViewProps {
  analysis: AnalysisResult;
}

export const SummaryView: React.FC<SummaryViewProps> = ({ analysis }) => {
  const { summary } = analysis;

  return (
    <div className="space-y-6">
      {/* Executive Summary Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md">
        <div className="flex items-center justify-between gap-4 mb-4 pb-4 border-b border-slate-800 flex-wrap">
          <div className="flex items-center gap-2 text-blue-400 font-bold text-base">
            <Sparkles className="w-5 h-5" /> Executive Summary
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Estimated Contract Risk:</span>
            <RiskBadge
              severity={
                summary.totalEstimatedRiskScore === 'High'
                  ? 'high'
                  : summary.totalEstimatedRiskScore === 'Moderate'
                  ? 'medium'
                  : 'low'
              }
            />
          </div>
        </div>

        {/* Formatted Detailed Executive Summary */}
        <div className="mb-6">
          <FormattedSummary text={summary.executiveSummary} />
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <Scale className="w-4 h-4 text-indigo-400 shrink-0" />
            <span className="text-slate-400">Contract Type:</span>
            <strong className="text-slate-100">{summary.contractType}</strong>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-400">Jurisdiction:</span>
            <strong className="text-slate-100">{summary.governingJurisdiction}</strong>
          </div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-md">
        <h4 className="text-base font-bold text-slate-100 mb-4 flex items-center gap-2">
          <FileCheck className="w-5 h-5 text-emerald-400" />
          Key Points You Need To Know
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {summary.keyTakeaways.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs sm:text-sm text-slate-200"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{point}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FormattedSummary: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n').filter((l) => l.trim().length > 0);

  return (
    <div className="space-y-3.5 text-slate-200 text-sm sm:text-base leading-relaxed font-normal">
      {lines.map((line, idx) => {
        const cleanLine = line.trim();

        // Headings like ### or 1. Document Overview
        if (cleanLine.startsWith('###') || cleanLine.startsWith('##') || cleanLine.startsWith('#')) {
          const headingText = cleanLine.replace(/^#+\s*/, '');
          return (
            <h3
              key={idx}
              className="text-base sm:text-lg font-bold text-blue-400 mt-5 mb-2 border-b border-slate-800/80 pb-1.5 flex items-center gap-2"
            >
              {headingText}
            </h3>
          );
        }

        // Subheadings / Bold headers
        if (cleanLine.startsWith('**') && cleanLine.endsWith('**')) {
          return (
            <h4 key={idx} className="text-sm sm:text-base font-semibold text-indigo-300 mt-3 mb-1">
              {cleanLine.replace(/\*\*/g, '')}
            </h4>
          );
        }

        // Bullet points (starting with •, -, *)
        if (cleanLine.startsWith('•') || cleanLine.startsWith('- ') || cleanLine.startsWith('* ')) {
          const bulletText = cleanLine.replace(/^[•\-\*]\s*/, '');
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 text-slate-300 text-sm sm:text-base">
              <span className="text-blue-400 shrink-0 mt-1 font-bold">•</span>
              <span>{renderFormattedInlineText(bulletText)}</span>
            </div>
          );
        }

        // Numbered items like 1. 2.
        if (/^\d+\.\s/.test(cleanLine)) {
          return (
            <div key={idx} className="flex items-start gap-2.5 pl-2 text-slate-300 text-sm sm:text-base">
              <span className="text-indigo-400 shrink-0 font-semibold">{cleanLine.match(/^\d+\./)?.[0]}</span>
              <span>{renderFormattedInlineText(cleanLine.replace(/^\d+\.\s*/, ''))}</span>
            </div>
          );
        }

        // Regular paragraph text
        return (
          <p key={idx} className="text-slate-200 text-sm sm:text-base leading-relaxed">
            {renderFormattedInlineText(cleanLine)}
          </p>
        );
      })}
    </div>
  );
};

function renderFormattedInlineText(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-semibold text-slate-100">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return part;
  });
}

