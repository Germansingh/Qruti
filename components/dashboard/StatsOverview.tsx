import React from 'react';
import { LegalDocument } from '@/lib/types/document';
import { FileText, AlertTriangle, Calendar, CheckCircle2 } from 'lucide-react';

interface StatsOverviewProps {
  documents: LegalDocument[];
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ documents }) => {
  const totalDocs = documents.length;
  const processedDocs = documents.filter((d) => d.status === 'processed').length;

  let totalRisks = 0;
  let totalHighRisks = 0;
  let totalDates = 0;

  documents.forEach((doc) => {
    if (doc.analysis) {
      totalRisks += doc.analysis.risks.length;
      totalHighRisks += doc.analysis.risks.filter((r) => r.severity === 'high').length;
      totalDates += doc.analysis.importantDates.length;
    }
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {/* Metric 1 */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
        <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Total Documents</p>
          <p className="text-2xl font-extrabold text-slate-100 group-hover:text-blue-400 transition-colors">{totalDocs}</p>
        </div>
      </div>

      {/* Metric 2 */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
        <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:scale-110 transition-transform">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">AI Analyzed</p>
          <p className="text-2xl font-extrabold text-slate-100 group-hover:text-emerald-400 transition-colors">{processedDocs}</p>
        </div>
      </div>

      {/* Metric 3 */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-rose-500/50 hover:shadow-lg hover:shadow-rose-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
        <div className="p-3 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 group-hover:scale-110 transition-transform">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Red Flag Clauses</p>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-rose-400">{totalHighRisks}</span>
            <span className="text-xs text-slate-400">({totalRisks} total)</span>
          </div>
        </div>
      </div>

      {/* Metric 4 */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 flex items-center gap-4 shadow-sm hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
        <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 group-hover:scale-110 transition-transform">
          <Calendar className="w-6 h-6" />
        </div>
        <div>
          <p className="text-xs text-slate-400 font-medium">Key Deadlines</p>
          <p className="text-2xl font-extrabold text-slate-100 group-hover:text-indigo-400 transition-colors">{totalDates}</p>
        </div>
      </div>
    </div>
  );
};
