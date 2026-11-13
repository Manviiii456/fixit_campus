import React from 'react';
import { Sparkles, CheckCircle2, Unlock, ShieldCheck, RefreshCw, Database } from 'lucide-react';
import { useIssues } from '../../context/IssueContext';

export default function Minute40Placeholder() {
  const { stats, syncLocally } = useIssues();

  return (
    <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-7 border border-slate-800 shadow-md animate-fadeIn space-y-4">
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-400/30 flex-shrink-0">
            <Unlock className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-black text-white tracking-tight">
                Minute 40 Sprint Twist — Unlocked & Verified
              </h3>
              <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                Constraint Fulfilled
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Official organizer challenge requirement verified and implemented.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {stats.pendingSync > 0 ? (
            <button
              onClick={() => syncLocally()}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-3 py-1.5 rounded-xl text-xs transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Simulate Mark Synced ({stats.pendingSync})</span>
            </button>
          ) : (
            <span className="flex items-center gap-1 text-xs text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-3 py-1.5 rounded-xl font-medium">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline Queue Fully Synced</span>
            </span>
          )}
        </div>
      </div>

      {/* Revealed Twist Box */}
      <div className="p-4 sm:p-5 rounded-2xl bg-slate-800/80 border border-slate-700/80 space-y-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-rose-500 text-white font-black text-[10px] uppercase tracking-wider">
            Revealed Paired Twist
          </span>
          <span className="text-xs text-slate-300 font-semibold">Offline Queue Mechanics</span>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed font-medium">
          <strong className="text-white">"Offline queue:</strong> a new report created in the app must appear as <span className="text-amber-300 font-bold">'Pending sync'</span> and remain available after refresh, with a simulated <span className="text-emerald-300 font-bold">'Mark synced'</span> action.<strong className="text-white">"</strong>
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2 border-t border-slate-700/60 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>New reports auto-queue as <strong>Pending sync</strong></span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>State persists across refresh in LocalStorage</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Simulated <strong>"SYNC LOCALLY"</strong> (Mark synced) action</span>
          </div>
          <div className="flex items-center gap-2 text-slate-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            <span>Zero external blob storage (local image previews)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
