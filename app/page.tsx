'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  FileText,
  Sparkles,
  AlertTriangle,
  MessageSquare,
  Upload,
  ArrowRight,
  UserCheck,
  CheckCircle2,
  Calendar,
  BookOpen,
} from 'lucide-react';
import BentoGrid from '@/components/BentoGrid';
import SpotlightCard from '@/components/ui/SpotlightCard';
import JargonTooltip from '@/components/ui/JargonTooltip';
import MagneticButton from '@/components/ui/MagneticButton';
import UploadModal, { ParsedResultData } from '@/components/upload/UploadModal';

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [parsedData, setParsedData] = useState<ParsedResultData | null>(null);

  const targetAudience = [
    { title: 'Tenants', desc: 'Understand residential leases, auto-renewals, deposit policies, and maintenance duties.' },
    { title: 'Employees & Contractors', desc: 'Spot non-compete traps, IP assignment clauses, and salary pay terms before signing.' },
    { title: 'Students & Scholars', desc: 'Analyze housing agreements, financial aid forms, and tuition contract terms.' },
    { title: 'Small Business Owners', desc: 'Review vendor contracts, liability caps, and service level agreements (SLAs).' },
  ];

  const workflowSteps = [
    { step: '01', title: 'Upload Document', desc: 'Drop your PDF contract securely into the platform.' },
    { step: '02', title: 'OCR & Text Extraction', desc: 'Automated extraction extracts raw clauses cleanly even from scanned image PDFs.' },
    { step: '03', title: 'AI Clause Breakdown', desc: 'Legal Jargon parses legalese into plain language summaries, risk alerts, and duties.' },
    { step: '04', title: 'Grounded AI Chat', desc: 'Ask specific questions grounded directly in your document without hallucinated answers.' },
  ];

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 overflow-hidden space-y-16 py-6 px-4 sm:px-6 lg:px-8">
      {/* Background Radial Glow Gradients */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-blue-600/15 via-teal-500/10 to-transparent blur-3xl rounded-full z-0" />
      <div className="pointer-events-none absolute top-[600px] -right-40 w-[500px] h-[500px] bg-indigo-500/10 blur-3xl rounded-full z-0" />

      {/* Modern High-Tech Hero Section */}
      <section className="relative z-10 text-center max-w-4xl mx-auto space-y-6 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20 text-xs font-semibold backdrop-blur-md">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          Next-Gen AI Legal Contract Intelligence
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-tight">
          Never sign a contract you don&apos;t{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-cyan-300 to-teal-400">
            fully understand
          </span>
        </h1>

        <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Legal Jargon translates complex legalese, hidden penalties, and auto-renewal traps into clear, plain English summaries. Built for tenants, employees, and small business owners.
        </p>

        {/* CTA Buttons with MagneticButton */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <MagneticButton
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto text-base"
          >
            Analyze Document
          </MagneticButton>

          <Link
            href="/dashboard"
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-800 font-semibold flex items-center justify-center gap-2 transition-all text-sm backdrop-blur-md shadow-lg"
          >
            <FileText className="w-4 h-4 text-cyan-400" />
            Launch Dashboard
          </Link>
        </div>

        {/* Feature Pills */}
        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 border-t border-slate-900/80">
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" /> Plain English Breakdown
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" /> Grounded AI Answers
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" /> Red Flag Risk Alerts
          </span>
          <span className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-teal-400" /> Deadline Tracking
          </span>
        </div>
      </section>

      {/* Analysis Results Display (If file parsed) */}
      {parsedData && (
        <section className="relative z-10 max-w-7xl mx-auto space-y-6">
          <SpotlightCard className="bg-slate-900/90 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4 flex-wrap gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-100">{parsedData.fileName}</h3>
                  <div className="text-xs text-slate-400">Analysis completed successfully</div>
                </div>
              </div>
              <Link
                href={`/documents/${parsedData.contractId}/chat`}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg"
              >
                Chat with Document <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Executive Summary Section */}
            <div className="space-y-2">
              <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Executive Summary
              </h4>
              <p className="text-slate-200 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-slate-950/60 border border-slate-800 p-4 rounded-2xl">
                {parsedData.summary}
              </p>
            </div>

            {/* Extracted Jargon Terms with Interactive Tooltips */}
            {parsedData.jargonTerms.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-2">
                  <BookOpen className="w-4 h-4" /> Detected Jargon Terms &amp; Definitions
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {parsedData.jargonTerms.map((jargon, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <JargonTooltip term={jargon.term} definition={jargon.definition}>
                          <strong className="text-sm font-semibold text-slate-100">{jargon.term}</strong>
                        </JargonTooltip>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase border ${
                            jargon.riskLevel === 'High'
                              ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                              : jargon.riskLevel === 'Moderate'
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                          }`}
                        >
                          {jargon.riskLevel} Risk
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 leading-snug">{jargon.definition}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </SpotlightCard>
        </section>
      )}

      {/* 4-Card Responsive Bento Grid */}
      <section className="relative z-10">
        <BentoGrid
          onOpenUploadModal={() => setIsModalOpen(true)}
          parsedData={parsedData}
        />
      </section>

      {/* Target Audience Section */}
      <section className="relative z-10 max-w-7xl mx-auto space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">Designed for Everyday People</h2>
          <p className="text-slate-400 text-sm">
            You don&apos;t need a law degree to understand your own contracts.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {targetAudience.map((item) => (
            <SpotlightCard
              key={item.title}
              className="bg-slate-900/60 border border-slate-800 rounded-3xl p-6 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
                <UserCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-100">{item.title}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 max-w-7xl mx-auto bg-slate-900/40 backdrop-blur-md border border-slate-800/80 rounded-3xl p-8 sm:p-12 space-y-8 shadow-xl">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-100">How Legal Jargon Works</h2>
          <p className="text-slate-400 text-sm">From upload to interactive grounded Q&amp;A in 4 simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {workflowSteps.map((s) => (
            <div key={s.step} className="space-y-3 bg-slate-950/80 p-5 rounded-2xl border border-slate-800">
              <span className="text-2xl font-mono font-black text-cyan-400">{s.step}</span>
              <h4 className="text-base font-bold text-slate-100">{s.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Key Features & Grounding */}
      <section className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <SpotlightCard className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Red Flag Detection</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automatically surfaces high-risk clauses such as uncapped penalties, broad non-competes, and auto-renewal traps before they catch you off guard.
          </p>
        </SpotlightCard>

        <SpotlightCard className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">AI Document Grounding</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Ask any question about your file. The AI strictly references your document&apos;s clauses and alerts you if information is not found.
          </p>
        </SpotlightCard>

        <SpotlightCard className="bg-slate-900/80 border border-slate-800 rounded-3xl p-6 space-y-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 flex items-center justify-center">
            <Calendar className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">Deadline Timeline</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Visual countdown timeline for notice periods, renewal dates, and payment obligations so you never miss a deadline.
          </p>
        </SpotlightCard>
      </section>

      {/* Legal Disclaimer Box */}
      <section className="relative z-10 max-w-7xl mx-auto bg-amber-500/10 border border-amber-500/20 rounded-3xl p-6 text-amber-200 text-xs leading-relaxed flex items-start gap-4">
        <ShieldCheck className="w-6 h-6 text-amber-400 shrink-0 mt-1" />
        <div className="space-y-1">
          <strong className="text-amber-300 font-bold block text-sm">Informational Purpose Disclaimer</strong>
          <p>
            Legal Jargon provides document extraction and AI-powered text simplification for informational purposes only. It is not legal counsel and does not replace consultation with a licensed attorney.
          </p>
        </div>
      </section>

      {/* Interactive PDF Upload Modal */}
      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(data) => {
          setParsedData(data);
        }}
      />
    </div>
  );
}
