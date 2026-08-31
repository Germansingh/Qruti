'use client';

import React, { useState } from 'react';
import { PotentialRisk, RiskSeverity } from '@/lib/types/document';
import { RiskBadge } from '@/components/ui/Badge';
import { AlertTriangle, Lightbulb, ShieldAlert } from 'lucide-react';

interface RisksViewProps {
  risks: PotentialRisk[];
}

export const RisksView: React.FC<RisksViewProps> = ({ risks }) => {
  const [severityFilter, setSeverityFilter] = useState<'all' | RiskSeverity>('all');

  const filteredRisks = severityFilter === 'all' ? risks : risks.filter((r) => r.severity === severityFilter);

  return (
    <div className="space-y-4">
      {/* Header & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-2">
        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <ShieldAlert className="w-5 h-5 text-rose-400" />
          Identified Risk Factors ({risks.length})
        </h4>

        {/* Severity Tabs */}
        <div className="inline-flex rounded-lg bg-slate-900 p-1 border border-slate-800 text-xs">
          <button
            onClick={() => setSeverityFilter('all')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              severityFilter === 'all' ? 'bg-slate-800 text-slate-100' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All ({risks.length})
          </button>
          <button
            onClick={() => setSeverityFilter('high')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              severityFilter === 'high' ? 'bg-rose-500/20 text-rose-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            High Risk
          </button>
          <button
            onClick={() => setSeverityFilter('medium')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              severityFilter === 'medium' ? 'bg-amber-500/20 text-amber-300' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Medium Risk
          </button>
        </div>
      </div>

      {filteredRisks.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 text-xs">
          No risk items match the selected severity filter.
        </div>
      ) : (
        <div className="space-y-4">
          {filteredRisks.map((risk) => (
            <div
              key={risk.id}
              className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <AlertTriangle
                    className={`w-5 h-5 shrink-0 ${
                      risk.severity === 'high'
                        ? 'text-rose-500'
                        : risk.severity === 'medium'
                        ? 'text-amber-400'
                        : 'text-emerald-400'
                    }`}
                  />
                  <h5 className="text-base font-bold text-slate-100">{risk.title}</h5>
                </div>
                <RiskBadge severity={risk.severity} />
              </div>

              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{risk.description}</p>

              {/* Recommended Action Card */}
              <div className="p-3.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-start gap-2.5 text-xs text-indigo-200">
                <Lightbulb className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-indigo-300 block mb-0.5">Recommended Next Step:</strong>
                  <span>{risk.recommendedAction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
