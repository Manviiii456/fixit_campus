import React from 'react';
import { Menu, RefreshCw, Database, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';

export default function TopHeader({ title, onOpenMobile, onNavigateSync }) {
  const { currentUser, isAdmin } = useAuth();
  const { stats, syncLocally } = useIssues();

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-lg text-slate-500 hover:bg-slate-100 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">{title}</h1>
          <p className="text-xs text-slate-500 hidden sm:block">Campus Facility Operations • Real-time Local State</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Local Sync Quick Indicator */}
        {stats.pendingSync > 0 ? (
          <button
            onClick={() => {
              if (isAdmin && onNavigateSync) {
                onNavigateSync();
              } else {
                syncLocally();
              }
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300 hover:bg-amber-100 transition-colors shadow-xs"
            title="Click to synchronize pending reports locally"
          >
            <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
            <span className="hidden md:inline">{stats.pendingSync} Reports Pending Sync</span>
            <span className="md:hidden">{stats.pendingSync} Pending</span>
          </button>
        ) : (
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span className="hidden sm:inline">Local Storage Synced</span>
            <span className="sm:hidden">Synced</span>
          </div>
        )}

        {/* Database indicator */}
        <div className="hidden xl:flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-lg">
          <Database className="w-3.5 h-3.5 text-slate-400" />
          <span>LocalStorage v1</span>
        </div>

        {/* User quick badge */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200 text-sm">
          <div className="w-8 h-8 rounded-full bg-slate-100 border border-slate-300 flex items-center justify-center font-bold text-slate-700 text-xs">
            {currentUser?.name?.charAt(0) || 'U'}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-800 leading-none">{currentUser?.name}</p>
            <p className="text-[10px] text-slate-500 mt-0.5 leading-none">{currentUser?.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

