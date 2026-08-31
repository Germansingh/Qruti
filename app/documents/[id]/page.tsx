'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useDocumentContext } from '@/lib/context/DocumentContext';
import { SummaryView } from '@/components/document/SummaryView';
import { KeyClausesView } from '@/components/document/KeyClausesView';
import { RisksView } from '@/components/document/RisksView';
import { ObligationsView } from '@/components/document/ObligationsView';
import { DatesTimelineView } from '@/components/document/DatesTimelineView';
import { RawDocumentViewer } from '@/components/document/RawDocumentViewer';
import { StatusBadge } from '@/components/ui/Badge';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import { SupportedLanguage, UI_TRANSLATIONS } from '@/lib/services/languageService';
import { aiService } from '@/lib/services/aiService';
import { AnalysisResult } from '@/lib/types/document';
import {
  ArrowLeft,
  MessageSquare,
  Sparkles,
  BookOpen,
  AlertTriangle,
  ClipboardList,
  Calendar,
  Eye,
  Trash2,
  CheckCircle2,
} from 'lucide-react';

export default function DocumentDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { getDocumentById, deleteDocument } = useDocumentContext();

  const [activeTab, setActiveTab] = useState<
    'summary' | 'clauses' | 'risks' | 'obligations' | 'dates' | 'raw'
  >('summary');
  const [currentLanguage, setCurrentLanguage] = useState<SupportedLanguage>('en');
  const [localizedAnalysis, setLocalizedAnalysis] = useState<AnalysisResult | null>(null);

  const document = getDocumentById(id);

  useEffect(() => {
    if (document?.analysis) {
      const rawText = document.analysis.rawTextPreview || '';
      aiService
        .analyzeDocument(rawText, document.fileName, currentLanguage)
        .then((res) => {
          setLocalizedAnalysis(res);
        })
        .catch((err) => {
          console.error('Failed to localize analysis:', err);
          setLocalizedAnalysis(document.analysis || null);
        });
    }
  }, [document?.id, document?.fileName, currentLanguage]);

  if (!document) {
    return (
      <div className="p-12 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-100">Document Not Found</h2>
        <p className="text-slate-400 text-xs">
          The requested document could not be located in your workspace.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>
    );
  }

  const analysis = localizedAnalysis || document.analysis;
  const labels = UI_TRANSLATIONS[currentLanguage];

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this document?')) {
      await deleteDocument(document.id);
      router.push('/dashboard');
    }
  };

  const tabs = [
    { id: 'summary', label: labels.summary, icon: Sparkles },
    { id: 'clauses', label: `${labels.keyClauses} (${analysis?.keyClauses.length || 0})`, icon: BookOpen },
    { id: 'risks', label: `${labels.risks} (${analysis?.risks.length || 0})`, icon: AlertTriangle },
    { id: 'obligations', label: `${labels.obligations} (${analysis?.obligations.length || 0})`, icon: ClipboardList },
    { id: 'dates', label: `${labels.dates} (${analysis?.importantDates.length || 0})`, icon: Calendar },
    { id: 'raw', label: labels.rawText, icon: Eye },
  ] as const;

  return (
    <div className="space-y-6 py-2">
      {/* Navigation & Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white mb-2 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {labels.backToDashboard}
          </Link>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100">{document.title}</h1>
            <StatusBadge status={document.status} />
          </div>
          <p className="text-xs text-slate-400 mt-1 flex items-center gap-3">
            <span>File: {document.fileName}</span>
            <span>•</span>
            <span>Size: {document.fileSizeFormatted}</span>
            <span>•</span>
            <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
          </p>
        </div>

        {/* Action Controls & Language Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <LanguageSelector
            currentLanguage={currentLanguage}
            onLanguageChange={(lang) => setCurrentLanguage(lang)}
          />
          <div className="flex items-center gap-2">
            <button
              onClick={handleDelete}
              className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors border border-slate-800"
              title="Delete Document"
            >
              <Trash2 className="w-4 h-4" />
            </button>
            <Link
              href={`/documents/${document.id}/chat?lang=${currentLanguage}`}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-blue-900/30 transition-all"
            >
              <MessageSquare className="w-4 h-4" />
              {labels.chatWithAi}
            </Link>
          </div>
        </div>
      </div>

      {/* Real AI Document Analysis Indicator Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-300 flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>{labels.realAiBanner}</strong> (Extracted Text Source of Truth)
          </span>
        </div>
        <span className="text-[11px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-800">
          Selected Language: {currentLanguage.toUpperCase()}
        </span>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-slate-800 overflow-x-auto pb-1 text-xs">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-2 px-4 py-2.5 font-semibold rounded-t-xl transition-all whitespace-nowrap border-b-2 ${
                isActive
                  ? 'bg-slate-900 text-blue-400 border-blue-500 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 border-transparent hover:bg-slate-900/50'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content Display */}
      {analysis ? (
        <div>
          {activeTab === 'summary' && <SummaryView analysis={analysis} />}
          {activeTab === 'clauses' && <KeyClausesView clauses={analysis.keyClauses} />}
          {activeTab === 'risks' && <RisksView risks={analysis.risks} />}
          {activeTab === 'obligations' && <ObligationsView obligations={analysis.obligations} />}
          {activeTab === 'dates' && <DatesTimelineView dates={analysis.importantDates} />}
          {activeTab === 'raw' && (
            <RawDocumentViewer rawText={document.analysis?.rawTextPreview || analysis.rawTextPreview} fileName={document.fileName} />
          )}
        </div>
      ) : (
        <div className="p-8 text-center text-slate-400 text-xs">
          Analysis data unavailable for this document.
        </div>
      )}
    </div>
  );
}
