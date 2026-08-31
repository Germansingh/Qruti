'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, FileText, Cpu, AlertTriangle, ShieldCheck } from 'lucide-react';

interface ProcessingTrackerProps {
  fileName: string;
  isSimulatedFailure?: boolean;
  onComplete: () => void;
  onFail: (reason: string) => void;
}

export const ProcessingTracker: React.FC<ProcessingTrackerProps> = ({
  fileName,
  isSimulatedFailure = false,
  onComplete,
  onFail,
}) => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { title: 'Uploading & Security Scan', desc: 'Validating file format, size, and document boundaries.' },
    { title: 'Text Extraction & OCR', desc: 'Running optical character recognition on scanned pages.' },
    { title: 'AI Clause Analysis', desc: 'Identifying legal terminology, risk factors, and user obligations.' },
    { title: 'Structuring Summary & Timeline', desc: 'Formatting dates, notice periods, and grounded Q&A indexes.' },
  ];

  useEffect(() => {
    const timer1 = setTimeout(() => setCurrentStep(1), 800);
    const timer2 = setTimeout(() => {
      if (isSimulatedFailure) {
        setCurrentStep(2);
        onFail('OCR extraction failed: Scanned text contains illegible pixels or low resolution. Please retry with a clearer document.');
      } else {
        setCurrentStep(2);
      }
    }, 2000);

    const timer3 = setTimeout(() => {
      if (!isSimulatedFailure) setCurrentStep(3);
    }, 3500);

    const timer4 = setTimeout(() => {
      if (!isSimulatedFailure) {
        setCurrentStep(4);
        onComplete();
      }
    }, 4800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, [isSimulatedFailure, onComplete, onFail]);

  return (
    <div className="w-full max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xl">
      <div className="flex items-center gap-3 pb-6 border-b border-slate-800 mb-6">
        <div className="p-2.5 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
          <FileText className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-bold text-slate-100 line-clamp-1">{fileName}</h4>
          <p className="text-xs text-slate-400">Processing with Legal Jargon AI Pipeline...</p>
        </div>
      </div>

      <div className="space-y-6">
        {steps.map((step, idx) => {
          const isDone = currentStep > idx;
          const isCurrent = currentStep === idx;
          const isFailedStep = isSimulatedFailure && currentStep === 2 && idx === 2;

          return (
            <div key={step.title} className="flex items-start gap-4">
              <div className="mt-0.5 shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                ) : isFailedStep ? (
                  <AlertTriangle className="w-6 h-6 text-rose-500" />
                ) : isCurrent ? (
                  <Loader2 className="w-6 h-6 text-blue-400 animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-slate-700 flex items-center justify-center text-[10px] text-slate-400 font-mono">
                    {idx + 1}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h5
                  className={`text-sm font-semibold ${
                    isDone
                      ? 'text-slate-200'
                      : isFailedStep
                      ? 'text-rose-400'
                      : isCurrent
                      ? 'text-blue-400 font-bold'
                      : 'text-slate-500'
                  }`}
                >
                  {step.title}
                </h5>
                <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">{step.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
