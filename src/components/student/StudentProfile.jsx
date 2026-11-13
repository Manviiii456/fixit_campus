import React from 'react';
import { User, Mail, Hash, Building, ShieldCheck, CheckCircle2, AlertTriangle, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function StudentProfile() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pb-6 border-b border-slate-100">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-campus-navy to-campus-blue text-white flex items-center justify-center font-extrabold text-2xl shadow-md">
            {currentUser?.name?.charAt(0) || 'S'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-black text-slate-900">{currentUser?.name}</h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                Approved Student
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-1">
              Enrolled Student • Campus Maintenance Portal Access Granted
            </p>
          </div>
        </div>

        {/* Details List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-6">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Student ID
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Hash className="w-4 h-4 text-campus-blue" />
              <span>{currentUser?.id || 'STU-2025-DEMO'}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Campus Email
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 truncate">
              <Mail className="w-4 h-4 text-campus-blue flex-shrink-0" />
              <span className="truncate">{currentUser?.email}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Academic Department
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-800">
              <Building className="w-4 h-4 text-campus-blue" />
              <span>{currentUser?.department || 'Computer Science & Engineering'}</span>
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
              Account Status
            </span>
            <div className="flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Verified & Active</span>
            </div>
          </div>
        </div>

        {/* Local Demo Disclaimer Note */}
        <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            Local Prototype Notice
          </p>
          <p className="text-amber-800 leading-relaxed text-[11px]">
            This session is stored purely in browser LocalStorage. No remote database or external identity provider is accessed. The demo OTP and approval status are fully simulated client-side for offline campus evaluation.
          </p>
        </div>

        {/* Logout Action */}
        <div className="pt-6 border-t border-slate-100 flex justify-end">
          <button
            onClick={logout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold text-rose-600 hover:text-white bg-rose-50 hover:bg-rose-600 border border-rose-200 hover:border-rose-600 transition-all shadow-xs cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out of FixIt Campus</span>
          </button>
        </div>
      </div>
    </div>
  );
}
