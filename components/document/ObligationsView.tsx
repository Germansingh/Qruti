import React from 'react';
import { UserObligation } from '@/lib/types/document';
import { ClipboardList, UserCheck, Building2, AlertCircle } from 'lucide-react';

interface ObligationsViewProps {
  obligations: UserObligation[];
}

export const ObligationsView: React.FC<ObligationsViewProps> = ({ obligations }) => {
  const userObligations = obligations.filter((o) => o.party === 'user');
  const counterpartyObligations = obligations.filter((o) => o.party === 'counterparty');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <ClipboardList className="w-5 h-5 text-indigo-400" />
          Contractual Duties & Responsibilities
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* User Duties */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-blue-400 font-bold text-sm">
            <UserCheck className="w-4 h-4" />
            Your Obligations (Tenant / Employee / Signer)
          </div>

          {userObligations.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No specific personal duties listed.</p>
          ) : (
            userObligations.map((ob) => (
              <div
                key={ob.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <h6 className="font-bold text-slate-100">{ob.title}</h6>
                  {ob.frequency && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                      {ob.frequency}
                    </span>
                  )}
                </div>
                <p className="text-slate-300">{ob.description}</p>
                {ob.consequenceOfBreach && (
                  <div className="pt-2 flex items-center gap-1.5 text-rose-400 text-xs">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    <span>Consequence of breach: {ob.consequenceOfBreach}</span>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Counterparty Duties */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-800 text-emerald-400 font-bold text-sm">
            <Building2 className="w-4 h-4" />
            Counterparty Obligations (Landlord / Employer / Provider)
          </div>

          {counterpartyObligations.length === 0 ? (
            <p className="text-xs text-slate-400 italic">No counterparty duties listed.</p>
          ) : (
            counterpartyObligations.map((ob) => (
              <div
                key={ob.id}
                className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2 text-xs sm:text-sm"
              >
                <div className="flex items-center justify-between gap-2">
                  <h6 className="font-bold text-slate-100">{ob.title}</h6>
                  {ob.frequency && (
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-300 font-medium">
                      {ob.frequency}
                    </span>
                  )}
                </div>
                <p className="text-slate-300">{ob.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
