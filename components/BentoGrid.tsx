'use client';

import React, { useState } from 'react';
import {
  FileText,
  Search,
  Sparkles,
  ArrowRight,
  Upload,
  CheckCircle2,
  Zap,
  BookOpen,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import SpotlightCard from '@/components/ui/SpotlightCard';
import JargonTooltip from '@/components/ui/JargonTooltip';

export interface ParsedResultData {
  originalText: string;
  summary: string;
  jargonTerms: Array<{ term: string; definition: string; riskLevel: string }>;
  contractId: string;
  fileName: string;
}

export interface BentoGridProps {
  className?: string;
  onOpenUploadModal?: () => void;
  parsedData?: ParsedResultData | null;
}

export const BentoGrid: React.FC<BentoGridProps> = ({
  className,
  onOpenUploadModal,
  parsedData,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  return (
    <div className={cn('w-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8', className)}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* CARD 1: Legal Term Simplifier (Spans 2 columns on desktop) */}
        <div className="md:col-span-2">
          <SpotlightCard className="h-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 hover:scale-[1.02] hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform duration-300">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                  Instant Translation
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
                Legal Term Simplifier
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Transform dense legalese into plain, human-friendly English in real-time. Understand obligations, liabilities, and terms without needing a law degree.
              </p>
            </div>

            {/* Interactive Preview Widget with JargonTooltip */}
            <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-800/60 pb-2">
                <span className="flex items-center gap-1.5 font-medium text-slate-300">
                  <Sparkles className="w-3.5 h-3.5 text-blue-400" /> Original Legalese:
                </span>
                <span className="text-slate-500">Clause 14.2</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 italic">
                &quot;Party A shall{' '}
                <JargonTooltip
                  term="Indemnify"
                  definition="To compensate or compensate for legal harm, loss, or damages."
                >
                  indemnify
                </JargonTooltip>{' '}
                and hold harmless Party B against any and all claims, liabilities, or costs...&quot;
              </p>
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Simplified:
                </span>
                <span className="text-xs text-slate-300">
                  Party A pays for any legal damages or costs if problems happen.
                </span>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD 2: PDF Document AI Analyzer */}
        <div className="md:col-span-1">
          <SpotlightCard className="h-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 hover:scale-[1.02] hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  AI Extraction
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                PDF Document AI Analyzer
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Upload any PDF contract or document to automatically detect risks, key dates, and payment obligations.
              </p>
            </div>

            {/* Subtle Upload Preview Widget with Animation */}
            <div
              onClick={onOpenUploadModal}
              onMouseEnter={() => setIsUploading(true)}
              onMouseLeave={() => setIsUploading(false)}
              className="relative bg-slate-950/80 border border-dashed border-slate-700 hover:border-indigo-500/50 rounded-2xl p-5 text-center cursor-pointer transition-colors duration-300"
            >
              <div className="flex flex-col items-center justify-center space-y-2">
                <div
                  className={cn(
                    'p-3 rounded-full bg-indigo-500/10 text-indigo-400 transition-transform duration-500',
                    isUploading ? 'scale-110 -translate-y-1' : ''
                  )}
                >
                  <Upload className="w-5 h-5 animate-bounce" />
                </div>
                <div className="text-xs font-medium text-slate-200">
                  {isUploading ? 'Ready to Analyze PDF...' : 'Drop PDF contract here'}
                </div>
                <div className="text-[11px] text-slate-500">
                  Supports PDF up to 50MB
                </div>
              </div>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD 3: Smart Search */}
        <div className="md:col-span-1">
          <SpotlightCard className="h-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 hover:scale-[1.02] hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 group-hover:scale-110 transition-transform duration-300">
                  <Search className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  Grounded Q&amp;A
                </span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">
                Smart Search
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Ask questions directly to your documents. Instant citations back to exact paragraphs.
              </p>
            </div>

            {/* Sleek Search Bar UI */}
            <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-2.5 flex items-center space-x-2 focus-within:border-cyan-500/50 transition-colors">
              <Search className="w-4 h-4 text-cyan-400 shrink-0 ml-1" />
              <input
                type="text"
                placeholder="What is the notice period?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-xs text-slate-200 placeholder-slate-500 focus:outline-none"
              />
              <button className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30 transition-colors shrink-0">
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </SpotlightCard>
        </div>

        {/* CARD 4: Plain English Breakdown (Medium card showing before/after text) */}
        <div className="md:col-span-2">
          <SpotlightCard className="h-full bg-slate-900/60 backdrop-blur-md border border-slate-800 rounded-3xl p-6 sm:p-8 hover:scale-[1.02] hover:border-slate-700 transition-all duration-300 group flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  Side-By-Side Comparison
                </span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-slate-100 mb-2">
                Plain English Breakdown
              </h3>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-6">
                Compare complex legal text side-by-side with clear, non-technical explanations to make fast and safe decisions.
              </p>
            </div>

            {/* Before / After Text Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/70 border border-slate-800/80 rounded-2xl p-4">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-rose-500/20 space-y-1">
                <div className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider">Before (Legalese)</div>
                <p className="text-xs text-slate-300 leading-snug">
                  &quot;Termination without cause shall require thirty (30) days prior written notice, failing which early cancellation penalties equal to one month salary accrue.&quot;
                </p>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-emerald-500/20 space-y-1">
                <div className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">After (Plain English)</div>
                <p className="text-xs text-slate-200 leading-snug">
                  &quot;Give 30 days written notice before leaving to avoid paying a 1-month salary penalty.&quot;
                </p>
              </div>
            </div>
          </SpotlightCard>
        </div>

      </div>
    </div>
  );
};

export default BentoGrid;
