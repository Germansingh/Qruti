'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDocumentContext } from '@/lib/context/DocumentContext';
import { Dropzone } from '@/components/upload/Dropzone';
import { ProcessingTracker } from '@/components/upload/ProcessingTracker';
import { LegalDocument } from '@/lib/types/document';
import {
  Upload,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Eye,
  MessageSquare,
  RefreshCw,
  Sparkles,
} from 'lucide-react';

export default function UploadPage() {
  const router = useRouter();
  const { uploadDocument, retryProcessing } = useDocumentContext();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSimulatedFailure, setIsSimulatedFailure] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processedDoc, setProcessedDoc] = useState<LegalDocument | null>(null);
  const [failureError, setFailureError] = useState<string | null>(null);

  const handleFileSelect = async (file: File, simulateFailure: boolean) => {
    setSelectedFile(file);
    setIsSimulatedFailure(simulateFailure);
    setIsProcessing(true);
    setFailureError(null);

    // Call service to register document state
    const created = await uploadDocument(file, simulateFailure);
    setProcessedDoc(created);
  };

  const handleComplete = () => {
    setIsProcessing(false);
  };

  const handleFail = (reason: string) => {
    setIsProcessing(false);
    setFailureError(reason);
  };

  const handleRetry = async () => {
    if (!processedDoc) return;
    setIsProcessing(true);
    setFailureError(null);
    setIsSimulatedFailure(false);

    const retried = await retryProcessing(processedDoc.id);
    if (retried) {
      setProcessedDoc(retried);
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      {/* Back to Dashboard Link */}
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </Link>
        <span className="text-xs text-slate-500 font-mono">Step 1 of 2: Document Processing</span>
      </div>

      {/* Header */}
      <div className="text-center space-y-2 max-w-xl mx-auto">
        <h1 className="text-3xl font-extrabold text-slate-100 flex items-center justify-center gap-2">
          Upload Legal Document
          <Sparkles className="w-5 h-5 text-blue-400" />
        </h1>
        <p className="text-slate-400 text-sm">
          Upload your PDF, JPG, or PNG agreement. Legal Jargon will extract text, parse key clauses, and highlight risks.
        </p>
      </div>

      {/* Upload State Switcher */}
      {!selectedFile ? (
        <Dropzone onFileSelect={handleFileSelect} isProcessing={isProcessing} />
      ) : isProcessing ? (
        <ProcessingTracker
          fileName={selectedFile.name}
          isSimulatedFailure={isSimulatedFailure}
          onComplete={handleComplete}
          onFail={handleFail}
        />
      ) : failureError ? (
        /* Failure State Box */
        <div className="bg-slate-900 border border-rose-500/30 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-4 shadow-xl">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center mx-auto">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold text-rose-400">Processing Failed</h3>
          <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-4 rounded-xl border border-slate-800">
            {failureError}
          </p>
          <div className="pt-2 flex items-center justify-center gap-3">
            <button
              onClick={() => {
                setSelectedFile(null);
                setFailureError(null);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium transition-colors"
            >
              Upload Different File
            </button>
            <button
              onClick={handleRetry}
              className="px-5 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-lg shadow-rose-950"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Retry Processing
            </button>
          </div>
        </div>
      ) : (
        /* Success State Box */
        <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-8 text-center max-w-xl mx-auto space-y-6 shadow-2xl">
          <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-100 mb-1">Document Analysis Complete!</h3>
            <p className="text-xs text-slate-400">
              Successfully parsed key clauses, risks, obligations, and dates for{' '}
              <strong className="text-slate-200">{selectedFile.name}</strong>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            {processedDoc && (
              <>
                <Link
                  href={`/documents/${processedDoc.id}`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
                >
                  <Eye className="w-4 h-4" /> View Full Analysis
                </Link>
                <Link
                  href={`/documents/${processedDoc.id}/chat`}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center justify-center gap-2 border border-slate-700 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-blue-400" /> Start Grounded AI Chat
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
