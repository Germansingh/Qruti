'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useDocumentContext } from '@/lib/context/DocumentContext';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { DocumentCard } from '@/components/dashboard/DocumentCard';
import { EmptyState } from '@/components/dashboard/EmptyState';
import {
  FileText,
  Upload,
  Search,
  Filter,
  Sparkles,
  RefreshCw,
  Plus,
  SlidersHorizontal,
} from 'lucide-react';

export default function DashboardPage() {
  const { documents, loading, deleteDocument, retryProcessing, refreshDocuments, currentUser } =
    useDocumentContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'processed' | 'processing' | 'failed'>('all');

  const filteredDocs = documents.filter((doc) => {
    const matchesSearch =
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.fileName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'all' || doc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 flex items-center gap-3">
            Document Dashboard
            <span className="text-xs px-2.5 py-1 rounded-full bg-blue-500/10 text-blue-400 font-normal border border-blue-500/20">
              Demo Workspace
            </span>
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Welcome back, <strong className="text-slate-200">{currentUser.name}</strong>. Manage your uploaded contracts and view AI risk breakdowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => refreshDocuments()}
            className="p-2.5 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition-colors"
            title="Refresh documents list"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <Link
            href="/upload"
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-900/30 flex items-center gap-2 text-xs sm:text-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Upload Document
          </Link>
        </div>
      </div>

      {/* Metrics Overview */}
      <StatsOverview documents={documents} />

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-2xl border border-slate-800">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by title, filename, category..."
            className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-4 py-2 text-xs text-slate-100 placeholder-slate-500 outline-none"
          />
        </div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto text-xs">
          <span className="text-slate-500 flex items-center gap-1 shrink-0 font-medium">
            <Filter className="w-3.5 h-3.5 text-slate-400" /> Filter:
          </span>
          {(['all', 'processed', 'processing', 'failed'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors capitalize ${
                statusFilter === st
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Main Document List */}
      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">Loading documents...</div>
      ) : filteredDocs.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocs.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDelete={deleteDocument}
              onRetry={retryProcessing}
            />
          ))}
        </div>
      )}
    </div>
  );
}
