'use client';

import React, { useState } from 'react';
import { KeyClause } from '@/lib/types/document';
import { RiskBadge } from '@/components/ui/Badge';
import { BookOpen, FileText, Sparkles, Tag, ChevronDown, ChevronUp } from 'lucide-react';

interface KeyClausesViewProps {
  clauses: KeyClause[];
}

export const KeyClausesView: React.FC<KeyClausesViewProps> = ({ clauses }) => {
  const [expandedClauseId, setExpandedClauseId] = useState<string | null>(
    clauses.length > 0 ? clauses[0].id : null
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-blue-400" />
          Extracted Clauses ({clauses.length})
        </h4>
        <span className="text-xs text-slate-400">
          Showing original legalese paired with plain language explanations
        </span>
      </div>

      {clauses.map((clause) => {
        const isExpanded = expandedClauseId === clause.id;
        return (
          <div
            key={clause.id}
            className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:border-slate-700 transition-all"
          >
            {/* Header / Clickable summary */}
            <div
              onClick={() => setExpandedClauseId(isExpanded ? null : clause.id)}
              className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none bg-slate-900"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  {clause.clauseNumber && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-blue-300 border border-slate-700">
                      {clause.clauseNumber}
                    </span>
                  )}
                  <h5 className="text-base font-bold text-slate-100">{clause.title}</h5>
                  <RiskBadge severity={clause.riskLevel} />
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">{clause.simplifiedExplanation}</p>
              </div>

              <button className="p-1 text-slate-400 hover:text-white shrink-0">
                {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
            </div>

            {/* Expanded details */}
            {isExpanded && (
              <div className="p-5 bg-slate-950/70 border-t border-slate-800 space-y-4 text-xs sm:text-sm">
                {/* Plain English Explanation */}
                <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center gap-2 text-blue-400 font-bold text-xs mb-1">
                    <Sparkles className="w-4 h-4" /> Plain English Translation
                  </div>
                  <p className="text-slate-200 leading-relaxed">{clause.simplifiedExplanation}</p>
                </div>

                {/* Original Legalese Text */}
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 font-mono text-xs">
                  <div className="flex items-center gap-2 text-slate-400 font-sans font-semibold mb-1">
                    <FileText className="w-4 h-4 text-slate-500" /> Original Contract Legalese
                  </div>
                  <p className="text-slate-300 italic leading-relaxed">&quot;{clause.originalText}&quot;</p>
                </div>

                {/* Tags */}
                <div className="flex items-center gap-2 pt-1">
                  <Tag className="w-3.5 h-3.5 text-slate-500" />
                  <div className="flex flex-wrap gap-1.5">
                    {clause.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
