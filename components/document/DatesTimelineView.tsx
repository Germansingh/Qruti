import React from 'react';
import { ImportantDate } from '@/lib/types/document';
import { Calendar, Clock, AlertCircle, BellRing } from 'lucide-react';

interface DatesTimelineViewProps {
  dates: ImportantDate[];
}

export const DatesTimelineView: React.FC<DatesTimelineViewProps> = ({ dates }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-base font-bold text-slate-100 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-indigo-400" />
          Important Deadlines & Milestones ({dates.length})
        </h4>
        <span className="text-xs text-slate-400">Chronological timeline of notice windows and renewal dates</span>
      </div>

      {dates.length === 0 ? (
        <div className="p-8 text-center bg-slate-900/50 border border-slate-800 rounded-xl text-slate-400 text-xs">
          No key dates or deadlines were identified in this document.
        </div>
      ) : (
        <div className="relative pl-6 border-l-2 border-slate-800 space-y-6 my-4">
          {dates.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline Bullet Dot */}
              <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-slate-900 border-2 border-blue-500 group-hover:bg-blue-500 transition-colors" />

              <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-5 shadow-sm space-y-2 hover:border-slate-700 transition-all">
                <div className="flex items-center justify-between gap-3 flex-wrap">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                      {item.eventType}
                    </span>
                    <h5 className="text-base font-bold text-slate-100">{item.title}</h5>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-blue-400 font-semibold bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>
                </div>

                <div className="pt-2 flex items-start gap-2 text-xs sm:text-sm text-slate-300">
                  <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-slate-200">Required Action: </strong>
                    <span>{item.actionRequired}</span>
                  </div>
                </div>

                {item.isDaysCounted && item.daysRemaining !== undefined && (
                  <div className="pt-2 flex items-center gap-2 text-xs text-emerald-400 font-medium">
                    <BellRing className="w-3.5 h-3.5" />
                    <span>{item.daysRemaining} days remaining from today</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
