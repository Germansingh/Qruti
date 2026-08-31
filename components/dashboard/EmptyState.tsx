import React from 'react';
import Link from 'next/link';
import { FileSearch, Upload, Sparkles } from 'lucide-react';

export const EmptyState: React.FC = () => {
  return (
    <div className="bg-slate-900/60 border border-dashed border-slate-800 rounded-2xl p-12 text-center my-8 max-w-xl mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center mx-auto mb-4">
        <FileSearch className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-100 mb-2">No Legal Documents Uploaded</h3>
      <p className="text-slate-400 text-sm mb-6 leading-relaxed">
        Upload your first lease agreement, employment contract, or freelance NDA to get instant plain-language summaries, risk alerts, and grounded AI document Q&A.
      </p>
      <Link
        href="/upload"
        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-blue-900/30 transition-all text-sm"
      >
        <Upload className="w-4 h-4" />
        Upload & Analyze Document
        <Sparkles className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
};
