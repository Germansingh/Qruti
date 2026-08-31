import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-amber-500/10 border-b border-amber-500/20 text-amber-900 dark:text-amber-200 py-2.5 px-4 text-xs font-medium">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 text-center sm:text-left flex-wrap">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0" />
        <span>
          <strong>Legal Disclaimer:</strong> Legal Jargon is an AI-powered document understanding tool intended for informational guidance only. It does not constitute formal legal advice or create an attorney-client relationship.
        </span>
      </div>
    </div>
  );
};
