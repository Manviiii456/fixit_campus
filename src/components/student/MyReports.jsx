import React from 'react';
import { PlusCircle, FileText, CheckCircle2, Clock, ThumbsUp } from 'lucide-react';
import IssueCard from '../common/IssueCard';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';

export default function MyReports({ onNavigateReport, onViewDetails }) {
  const { currentUser } = useAuth();
  const { reports } = useIssues();

  // Filter reports submitted by current student
  const myReports = reports.filter(
    (r) => r.reporterEmail?.toLowerCase() === currentUser?.email?.toLowerCase()
  );

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">My Submitted Reports</h2>
          <p className="text-xs text-slate-500">
            Track the real-time status and resolution progress of your campus facility requests.
          </p>
        </div>

        <button
          onClick={onNavigateReport}
          className="flex items-center gap-2 bg-campus-navy hover:bg-campus-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm self-start sm:self-auto cursor-pointer"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Report New Issue</span>
        </button>
      </div>

      {/* Summary stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <p className="text-[11px] font-bold text-slate-500 uppercase">My Reports</p>
          <p className="text-2xl font-black text-slate-900 mt-1">{myReports.length}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-orange-200 bg-orange-50/20">
          <p className="text-[11px] font-bold text-orange-600 uppercase">Pending</p>
          <p className="text-2xl font-black text-orange-600 mt-1">
            {myReports.filter((r) => r.issueStatus === 'PENDING').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-blue-200 bg-blue-50/20">
          <p className="text-[11px] font-bold text-blue-600 uppercase">In Progress</p>
          <p className="text-2xl font-black text-blue-600 mt-1">
            {myReports.filter((r) => r.issueStatus === 'IN PROGRESS').length}
          </p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-emerald-200 bg-emerald-50/20">
          <p className="text-[11px] font-bold text-emerald-600 uppercase">Resolved</p>
          <p className="text-2xl font-black text-emerald-600 mt-1">
            {myReports.filter((r) => r.issueStatus === 'RESOLVED').length}
          </p>
        </div>
      </div>

      {/* Cards list */}
      {myReports.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <FileText className="w-10 h-10 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-800">You haven't submitted any reports yet</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Noticed a broken fixture, water leak, or lighting issue on campus? Submit your first report now.
          </p>
          <button
            onClick={onNavigateReport}
            className="mt-2 text-xs font-bold text-white bg-campus-navy hover:bg-campus-blue px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            Submit a Report
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {myReports.map((report) => (
            <IssueCard
              key={report.id}
              report={report}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

