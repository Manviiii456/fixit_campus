import React, { useState } from 'react';
import { ShieldCheck, Info, RefreshCw, X, ChevronDown, ChevronUp, UserCheck, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIssues } from '../../context/IssueContext';
import { useAuth } from '../../context/AuthContext';

export default function JudgeDemoBanner() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { stats, syncLocally, resetDemo } = useIssues();
  const { currentUser } = useAuth();

  if (isDismissed) return null;

  return (
    <aside aria-label="Hackathon Judge Quick Access Guide" className="bg-campus-navy text-white text-xs border-b border-blue-900/50 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2.5">
          <span className="flex items-center gap-1.5 bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded-full border border-blue-400/30 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
            FixIt Campus
          </span>
          <span className="text-slate-300 hidden sm:inline">
            Prototype Demo • 100% LocalStorage • Zero Cloud Dependencies
          </span>
        </div>

        <div className="flex items-center gap-2.5 ml-auto">
          {/* Documentation Link */}
          <Link
            to="/docs"
            className="hidden md:flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-700/60 transition-colors"
          >
            <BookOpen className="w-3 h-3 text-blue-400" />
            <span>Docs (DOC 01-06)</span>
          </Link>

          {/* Quick sync count pill */}
          {stats.pendingSync > 0 ? (
            <button
              onClick={() => syncLocally()}
              className="flex items-center gap-1 bg-amber-500/20 text-amber-300 border border-amber-500/40 px-2.5 py-1 rounded hover:bg-amber-500/30 transition-colors cursor-pointer"
              title="Click to sync pending reports locally"
            >
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>{stats.pendingSync} Pending Sync</span>
            </button>
          ) : (
            <span className="flex items-center gap-1 text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2.5 py-1 rounded">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>All Reports Synced</span>
            </span>
          )}

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-1 text-slate-300 hover:text-white px-2 py-1 rounded bg-slate-800/60 hover:bg-slate-700/60 transition-colors cursor-pointer"
          >
            <span>Judge Guide</span>
            {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          <button
            onClick={() => setIsDismissed(true)}
            className="text-slate-400 hover:text-white p-1"
            title="Dismiss banner"
            aria-label="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="bg-slate-900/95 border-t border-slate-800 px-4 py-3 text-slate-300 animate-fadeIn">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <p className="font-semibold text-blue-300 mb-1 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Judge 3-Step Verification Test
              </p>
              <ol className="list-decimal list-inside space-y-1 text-slate-400">
                <li><strong className="text-slate-200">Step 1:</strong> Submit a new campus report (marks as PENDING SYNC).</li>
                <li><strong className="text-slate-200">Step 2:</strong> Refresh browser (verify report persists & remains PENDING SYNC).</li>
                <li><strong className="text-slate-200">Step 3:</strong> Click <span className="text-amber-300 font-medium">SYNC LOCALLY</span> (status turns to SYNCED LOCALLY).</li>
              </ol>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50">
              <p className="font-semibold text-blue-300 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Demo Credentials
              </p>
              <div className="space-y-1 text-slate-400">
                <p><strong className="text-slate-200">Admin:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded text-amber-300">admin@fixit.demo</code> / <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-300">AdminDemo123!</code></p>
                <p><strong className="text-slate-200">Student:</strong> <code className="bg-slate-900 px-1 py-0.5 rounded text-blue-300">student@fixit.demo</code> / <code className="bg-slate-900 px-1 py-0.5 rounded text-slate-300">StudentDemo123!</code></p>
                <p className="text-[11px] text-slate-400 italic">One-click demo buttons are provided on the Login page!</p>
              </div>
            </div>

            <div className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex flex-col justify-between">
              <div>
                <p className="font-semibold text-blue-300 mb-1 flex items-center gap-1.5">
                  <RefreshCw className="w-3.5 h-3.5" /> Local Demo State
                </p>
                <p className="text-slate-400">
                  Data persists across browser refreshes in LocalStorage. Click Reset to revert to default sample data at any time.
                </p>
              </div>
              <button
                onClick={resetDemo}
                className="mt-2 self-start flex items-center gap-1.5 text-xs text-rose-300 hover:text-rose-200 bg-rose-950/40 hover:bg-rose-900/40 border border-rose-800/50 px-2.5 py-1 rounded transition-colors"
              >
                <RefreshCw className="w-3 h-3" /> Reset Sample Data
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
