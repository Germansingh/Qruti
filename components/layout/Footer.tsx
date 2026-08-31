import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, Cpu, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-900 pt-12 pb-8 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1: Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <ShieldCheck className="w-5 h-5 text-blue-500" />
              Legal Jargon
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Empowering tenants, employees, students, and small business owners to understand complex agreements effortlessly with AI grounding.
            </p>
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400 bg-slate-900 px-2.5 py-1 rounded border border-slate-800">
              <Lock className="w-3 h-3 text-emerald-400" />
              Post-Auth Ready Architecture (Step 5)
            </div>
          </div>

          {/* Col 2: Target Audience */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Who It&apos;s Built For
            </h4>
            <ul className="space-y-2 text-xs">
              <li>Residential Tenants</li>
              <li>Employees & Contractors</li>
              <li>Students & Scholars</li>
              <li>Small Business Owners</li>
              <li>Freelancers reviewing NDAs</li>
            </ul>
          </div>

          {/* Col 3: Architecture & Tech */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              System Architecture
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5 text-blue-400" /> Next.js 15 App Router
              </li>
              <li>TypeScript Modular Services</li>
              <li>Local Offline Fallback Mode</li>
              <li>Grounded RAG Boundary</li>
              <li>OCR & PDF Extraction API Layer</li>
            </ul>
          </div>

          {/* Col 4: Links & Disclaimer */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-3">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Product Overview
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-white transition-colors">
                  Document Dashboard
                </Link>
              </li>
              <li>
                <Link href="/upload" className="hover:text-white transition-colors">
                  Upload Document
                </Link>
              </li>
              <li>
                <Link href="/settings" className="hover:text-white transition-colors">
                  System Architecture & Settings
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© 2026 Legal Jargon. Informational Assistance Platform.</p>
          <p className="flex items-center gap-1">
            Built with care for document transparency <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
};
