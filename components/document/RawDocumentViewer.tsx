import React from 'react';
import { FileText, Copy, Check } from 'lucide-react';

interface RawDocumentViewerProps {
  rawText: string;
  fileName: string;
}

export const RawDocumentViewer: React.FC<RawDocumentViewerProps> = ({ rawText, fileName }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(rawText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl overflow-hidden shadow-sm">
      <div className="flex items-center justify-between px-5 py-3 bg-slate-900 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-semibold">
          <FileText className="w-4 h-4 text-blue-400" />
          Extracted OCR / PDF Text ({fileName})
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded font-medium transition-colors border border-slate-700"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? 'Copied!' : 'Copy Text'}
        </button>
      </div>
      <div className="p-6 font-mono text-xs text-slate-300 bg-slate-950 overflow-x-auto max-h-[500px] leading-relaxed whitespace-pre-wrap">
        {rawText || 'No raw text extracted for this document.'}
      </div>
    </div>
  );
};
