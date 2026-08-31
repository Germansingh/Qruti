'use client';

import React, { useState, useRef, ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Loader2, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ParsedResultData {
  originalText: string;
  summary: string;
  jargonTerms: Array<{ term: string; definition: string; riskLevel: string }>;
  contractId: string;
  fileName: string;
}

export interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (data: ParsedResultData) => void;
}

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingStage, setLoadingStage] = useState('Extracting PDF text...');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (selectedFile: File) => {
    if (!selectedFile.name.toLowerCase().endsWith('.pdf') && selectedFile.type !== 'application/pdf') {
      setErrorMsg('Please select a valid PDF contract document.');
      return;
    }
    setErrorMsg(null);
    setFile(selectedFile);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!file) return;

    setIsLoading(true);
    setErrorMsg(null);
    setLoadingStage('Extracting PDF text & clauses...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      // Stage timer simulation for glowing loader feedback
      const timer = setTimeout(() => {
        setLoadingStage('Translating legalese into plain English...');
      }, 2000);

      const res = await fetch('/api/parse', {
        method: 'POST',
        body: formData,
      });

      clearTimeout(timer);

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to analyze PDF document');
      }

      setLoadingStage('Done!');
      onSuccess({
        originalText: data.originalText,
        summary: data.summary,
        jargonTerms: data.jargonTerms || [],
        contractId: data.contractId || `contract-${Date.now()}`,
        fileName: file.name,
      });

      onClose();
    } catch (err: unknown) {
      console.error(err);
      const msg = err instanceof Error ? err.message : 'Upload and analysis failed.';
      setErrorMsg(msg);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-800 p-6 sm:p-8 shadow-2xl space-y-6 overflow-hidden"
        >
          {/* Subtle Radial Glow */}
          <div className="pointer-events-none absolute -top-24 -left-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 w-72 h-72 bg-teal-500/10 rounded-full blur-3xl" />

          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-lg">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              Upload PDF Contract
            </div>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Error Banner */}
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Dropzone */}
          {!isLoading ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'relative border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center space-y-3',
                isDragOver
                  ? 'border-cyan-400 bg-cyan-500/10 scale-[1.01]'
                  : 'border-slate-700 bg-slate-950/60 hover:border-slate-500'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileSelect(e.target.files[0]);
                  }
                }}
              />

              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 text-cyan-400 border border-cyan-500/20">
                <FileText className="w-8 h-8" />
              </div>

              {file ? (
                <div className="space-y-1">
                  <div className="text-sm font-semibold text-slate-100 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    {file.name}
                  </div>
                  <div className="text-xs text-slate-400">
                    {(file.size / (1024 * 1024)).toFixed(2)} MB • Ready for Analysis
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="text-sm font-medium text-slate-200">
                    Drag &amp; drop your PDF contract here
                  </div>
                  <div className="text-xs text-slate-400">
                    or click to browse files (PDF up to 50MB)
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Glowing Loader State */
            <div className="py-12 flex flex-col items-center justify-center space-y-4 text-center">
              <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border-4 border-cyan-500/20 border-t-cyan-400 animate-spin" />
                <Sparkles className="w-6 h-6 text-cyan-400 absolute" />
              </div>
              <div className="space-y-1">
                <div className="text-base font-semibold text-slate-100 animate-pulse">
                  {loadingStage}
                </div>
                <div className="text-xs text-slate-400">
                  Powered by Legal Jargon AI Extraction Engine
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleUploadAndAnalyze}
              disabled={!file || isLoading}
              className={cn(
                'px-6 py-2.5 rounded-xl font-semibold text-xs text-white shadow-lg transition-all flex items-center gap-2',
                file && !isLoading
                  ? 'bg-gradient-to-r from-blue-600 via-indigo-600 to-cyan-500 hover:shadow-cyan-500/30 hover:scale-[1.02] cursor-pointer'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              )}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Start AI Analysis
                </>
              )}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UploadModal;
