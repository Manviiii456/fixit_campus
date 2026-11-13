import React from 'react';
import {
  FolderOpen,
  Clock,
  TrendingUp,
  CheckCircle2,
  Users,
  UserCheck,
  RefreshCw,
  ArrowRight,
  ShieldAlert,
  Sliders,
  Sparkles
} from 'lucide-react';
import StatCard from '../common/StatCard';
import { useIssues } from '../../context/IssueContext';
import { getStatusBadgeConfig, getSyncBadgeConfig, getPriorityBadgeConfig, formatDate } from '../../utils/formatters';

export default function AdminOverview({ onNavigateTab, onViewDetails }) {
  const { reports, stats, syncLocally } = useIssues();

  // Top 5 urgent or recent issues
  const recentReports = reports.slice(0, 5);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-campus-navy rounded-3xl p-6 sm:p-8 text-white shadow-lg border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-400/20 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Campus Facilities Directorate Console</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Campus Operations Management
          </h2>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl mt-1 leading-relaxed">
            Monitor infrastructure requests, student registrations, and dispatch facility teams with instant local synchronization.
          </p>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={() => onNavigateTab('sync')}
            className="flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <RefreshCw className={`w-4 h-4 ${stats.pendingSync > 0 ? 'animate-spin' : ''}`} />
            <span>Local Sync Console ({stats.pendingSync} Pending)</span>
          </button>

          <button
            onClick={() => onNavigateTab('reports')}
            className="flex items-center gap-2 bg-campus-blue hover:bg-blue-600 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-md transition-all cursor-pointer"
          >
            <span>Manage All Reports</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 6 Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Console Metrics & Key Performance
          </h3>
          <span className="text-xs text-slate-400">Persistent LocalStorage State</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          <StatCard
            title="Total Reports"
            value={stats.total}
            subtitle="All logged issues"
            icon={FolderOpen}
            color="slate"
            onClick={() => onNavigateTab('reports')}
          />
          <StatCard
            title="Pending"
            value={stats.pending}
            subtitle="Awaiting triage"
            icon={Clock}
            color="orange"
            onClick={() => onNavigateTab('reports')}
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            subtitle="Contractors active"
            icon={TrendingUp}
            color="blue"
            onClick={() => onNavigateTab('reports')}
          />
          <StatCard
            title="Resolved"
            value={stats.resolved}
            subtitle="Closed tickets"
            icon={CheckCircle2}
            color="green"
            onClick={() => onNavigateTab('reports')}
          />
          <StatCard
            title="Total Students"
            value={stats.totalStudents}
            subtitle="Demo registrations"
            icon={Users}
            color="purple"
            onClick={() => onNavigateTab('students')}
          />
          <StatCard
            title="Pending Students"
            value={stats.pendingStudents}
            subtitle="Need approval"
            icon={UserCheck}
            color={stats.pendingStudents > 0 ? 'orange' : 'slate'}
            onClick={() => onNavigateTab('pending-registrations')}
          />
        </div>
      </div>

      {/* Recent Reports Table Snapshot */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900">Recent Campus Reports</h3>
            <p className="text-xs text-slate-500">Latest tickets reported by students</p>
          </div>
          <button
            onClick={() => onNavigateTab('reports')}
            className="text-xs font-bold text-campus-blue hover:text-blue-700 flex items-center gap-1"
          >
            <span>View All Reports Table</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Report ID</th>
                <th className="px-4 py-3">Issue Title</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Location</th>
                <th className="px-4 py-3">Priority</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Sync</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {recentReports.map((report) => {
                const statusCfg = getStatusBadgeConfig(report.issueStatus);
                const syncCfg = getSyncBadgeConfig(report.syncStatus);
                const prioCfg = getPriorityBadgeConfig(report.priority);

                return (
                  <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">{report.id}</td>
                    <td className="px-4 py-3 font-bold text-slate-800 max-w-xs truncate">{report.title}</td>
                    <td className="px-4 py-3">
                      <span className="bg-blue-50 text-campus-blue px-2 py-0.5 rounded font-semibold text-[11px]">
                        {report.category}
                      </span>
                    </td>
                    <td className="px-4 py-3 truncate max-w-[150px]">{report.location}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${prioCfg.classes}`}>
                        {report.priority || 'Medium'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold border ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${statusCfg.dot}`} />
                        {statusCfg.label}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold border ${syncCfg.bg}`}>
                        {report.syncStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <button
                        onClick={() => onViewDetails(report)}
                        className="text-xs font-bold text-campus-blue hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded transition-colors"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

