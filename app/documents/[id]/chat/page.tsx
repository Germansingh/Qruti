'use client';

import React, { use } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useDocumentContext } from '@/lib/context/DocumentContext';
import { ChatInterface } from '@/components/chat/ChatInterface';
import { SupportedLanguage } from '@/lib/services/languageService';
import { ArrowLeft, FileText } from 'lucide-react';

export default function DocumentChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const langParam = searchParams.get('lang') as SupportedLanguage | null;
  const initialLang: SupportedLanguage = langParam === 'pa' || langParam === 'hi' ? langParam : 'en';

  const { getDocumentById } = useDocumentContext();
  const document = getDocumentById(id);

  if (!document) {
    return (
      <div className="p-12 text-center space-y-4 max-w-md mx-auto">
        <h2 className="text-2xl font-bold text-slate-100">Document Not Found</h2>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4 py-2">
      <div className="flex items-center justify-between">
        <Link
          href={`/documents/${document.id}`}
          className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Document Analysis
        </Link>
        <span className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
          <FileText className="w-3.5 h-3.5 text-blue-400" />
          {document.title}
        </span>
      </div>

      <ChatInterface document={document} initialLanguage={initialLang} />
    </div>
  );
}
