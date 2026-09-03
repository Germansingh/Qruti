'use client';

import React, { useState } from 'react';
import { useDocumentContext } from '@/lib/context/DocumentContext';
import { useAuth } from '@/lib/context/AuthContext';
import {
  User,
  Shield,
  Key,
  Database,
  Lock,
  RefreshCw,
  CheckCircle2,
  Cpu,
  Info,
  Layers,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

export default function SettingsPage() {
  const { refreshDocuments } = useDocumentContext();
  const { user, isDemoUser, signOut } = useAuth();
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [keySaved, setKeySaved] = useState(false);

  const handleSaveKey = (e: React.FormEvent) => {
    e.preventDefault();
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 3000);
  };

  const handleResetData = () => {
    if (confirm('Reset document workspace to default seed documents?')) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('legal_jargon_documents_v1');
      }
      refreshDocuments();
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
          System Settings & Account Profile
        </h1>
        <p className="text-slate-400 text-xs sm:text-sm mt-1">
          Manage your account authentication state, system architecture status, and local workspace data.
        </p>
      </div>

      {/* Account Info Card */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
            <User className="w-5 h-5 text-indigo-400" />
            Active Account Identity
          </div>
          {user && (
            <span
              className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${
                isDemoUser
                  ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                  : 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
              }`}
            >
              {isDemoUser ? 'Demo Mode Session' : 'Verified Supabase Account'}
            </span>
          )}
        </div>

        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">User ID:</span>
              <code className="bg-slate-950 px-2.5 py-1 rounded text-slate-200 border border-slate-800 block truncate">
                {user.id}
              </code>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Display Name:</span>
              <span className="font-semibold text-slate-100 block py-1">{user.fullName}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Email:</span>
              <span className="text-slate-300 block py-1 truncate">{user.email}</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-950/60 border border-slate-800 text-xs">
            <span className="text-slate-400">
              You are currently not signed in. Sign in or create an account to persist custom document processing across devices.
            </span>
            <div className="flex items-center gap-2 shrink-0">
              <Link
                href="/login"
                className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold transition-colors shadow-md shadow-blue-600/20"
              >
                Create Account
              </Link>
            </div>
          </div>
        )}

        {user && (
          <div className="pt-2 flex justify-end">
            <button
              onClick={() => signOut()}
              className="px-3.5 py-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-semibold flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Grid of System Settings Cards */}
      <div className="space-y-6">
        {/* Card: AI Provider & API Key */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-slate-100 font-bold text-base">
              <Key className="w-5 h-5 text-emerald-400" />
              AI Provider & API Key Slot
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] bg-slate-800 text-slate-400 border border-slate-700">
              Client Secret Protection Active
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Legal Jargon isolates client-side code from secrets. When production AI endpoints are connected, API keys will be processed strictly server-side via Next.js API Routes / Server Actions.
          </p>

          <form onSubmit={handleSaveKey} className="space-y-3">
            <label className="text-xs font-semibold text-slate-300 block">
              Custom LLM / OpenAI Key Slot (Optional Demo Override):
            </label>
            <div className="flex items-center gap-3 max-w-md">
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="sk-proj-demo-placeholder-key..."
                className="flex-1 bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl px-3.5 py-2 text-xs text-slate-100 outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-medium border border-slate-700 transition-colors shrink-0"
              >
                Save Preference
              </button>
            </div>
            {keySaved && (
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> API key preference stored securely in local mock state.
              </p>
            )}
          </form>
        </div>

        {/* Card: Security & Privacy Architecture */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base border-b border-slate-800 pb-3">
            <Lock className="w-5 h-5 text-blue-400" />
            Security & Privacy Architecture
          </div>
          <div className="space-y-3 text-xs text-slate-300">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Private Document Isolation:</strong>
                <span>Documents are scope-restricted by owner ID in Supabase RLS policies.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Clean Document Erasure:</strong>
                <span>Deleting a document purges both document metadata and extracted text from the session.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-slate-200 block">Grounded AI Context Boundaries:</strong>
                <span>Q&A engine filters queries to ensure only document tokens are sent to analysis boundaries.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card: Local Workspace Storage Reset */}
        <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-slate-100 font-bold text-base border-b border-slate-800 pb-3">
            <Database className="w-5 h-5 text-rose-400" />
            Local Data & Workspace Controls
          </div>
          <p className="text-xs text-slate-400">
            Reset local browser storage state back to original seed documents (Lease Agreement, Employment Contract, NDA).
          </p>
          <button
            onClick={handleResetData}
            className="px-4 py-2 bg-rose-600/10 hover:bg-rose-600/20 text-rose-300 border border-rose-500/30 rounded-xl text-xs font-semibold flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Reset Workspace to Default Seed Documents
          </button>
        </div>
      </div>
    </div>
  );
}
