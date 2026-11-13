import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Eye,
  Sliders,
  CheckCircle2,
  Clock,
  RefreshCw,
  X,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import { useIssues } from '../../context/IssueContext';
import { CATEGORIES, PRIORITIES, STATUSES } from '../../utils/sampleData';
import { getStatusBadgeConfig, getSyncBadgeConfig, getPriorityBadgeConfig, formatDate } from '../../utils/formatters';

export default function AllReportsManagement({ onViewDetails }) {
  const { reports, changeReportStatus, changeReportPriority } = useIssues();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');

  // Inline status/priority change handler
  const handleStatusChange = (reportId, newStatus) => {
    changeReportStatus(reportId, newStatus, `Status updated directly from reports table to ${newStatus}`);
  };

  const handlePriorityChange = (reportId, newPriority) => {
    changeReportPriority(reportId, newPriority);
  };

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mTitle = r.title.toLowerCase().includes(q);
        const mId = r.id.toLowerCase().includes(q);
        const mLoc = r.location.toLowerCase().includes(q);
        const mStudent = r.reportedBy?.toLowerCase().includes(q);
        if (!mTitle && !mId && !mLoc && !mStudent) return false;
      }
      if (selectedCategory && r.category !== selectedCategory) return false;
      if (selectedStatus && r.issueStatus !== selectedStatus) return false;
      if (selectedPriority && r.priority !== selectedPriority) return false;
      return true;
    });
  }, [reports, searchQuery, selectedCategory, selectedStatus, selectedPriority]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedStatus('');
    setSelectedPriority('');
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Title */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">All Campus Reports Management</h2>
          <p className="text-xs text-slate-500">
            Control center for triaging, assigning priorities, and updating resolution statuses.
          </p>
        </div>
      </div>

      {/* Filter toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by title, Report ID, student name or location..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Issue Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            >
              <option value="">All Statuses</option>
              {STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Priority Filter
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            >
              <option value="">All Priorities</option>
              {PRIORITIES.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> of{' '}
            <strong className="text-slate-900">{reports.length}</strong> total reports
          </span>

          {(searchQuery || selectedCategory || selectedStatus || selectedPriority) && (
            <button
              onClick={clearFilters}
              className="text-campus-blue hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-4 py-3.5">Report ID</th>
                <th className="px-4 py-3.5">Issue Title</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Location</th>
                <th className="px-4 py-3.5">Student</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-4 py-3.5">Priority</th>
                <th className="px-4 py-3.5">Issue Status</th>
                <th className="px-4 py-3.5">Sync Status</th>
                <th className="px-4 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredReports.length === 0 ? (
                <tr>
                  <td colSpan="10" className="px-4 py-8 text-center text-slate-400">
                    No reports match the filter criteria.
                  </td>
                </tr>
              ) : (
                filteredReports.map((report) => {
                  const statusCfg = getStatusBadgeConfig(report.issueStatus);
                  const syncCfg = getSyncBadgeConfig(report.syncStatus);
                  const prioCfg = getPriorityBadgeConfig(report.priority);

                  return (
                    <tr key={report.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                        {report.id}
                      </td>

                      <td className="px-4 py-3 font-bold text-slate-800 max-w-[200px] truncate" title={report.title}>
                        {report.title}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="bg-blue-50 text-campus-blue px-2 py-0.5 rounded font-semibold text-[11px]">
                          {report.category}
                        </span>
                      </td>

                      <td className="px-4 py-3 max-w-[150px] truncate" title={report.location}>
                        {report.location}
                      </td>

                      <td className="px-4 py-3 max-w-[120px] truncate" title={report.reportedBy}>
                        {report.reportedBy}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap text-slate-400">
                        {formatDate(report.createdAt)}
                      </td>

                      {/* Priority selector */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={report.priority || 'Medium'}
                          onChange={(e) => handlePriorityChange(report.id, e.target.value)}
                          className={`text-[10px] font-bold uppercase rounded px-2 py-1 border cursor-pointer ${prioCfg.classes}`}
                        >
                          {PRIORITIES.map((p) => (
                            <option key={p} value={p}>{p}</option>
                          ))}
                        </select>
                      </td>

                      {/* Issue Status selector */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <select
                          value={report.issueStatus}
                          onChange={(e) => handleStatusChange(report.id, e.target.value)}
                          className={`text-[11px] font-bold rounded-full px-2.5 py-1 border cursor-pointer ${statusCfg.bg} ${statusCfg.text} ${statusCfg.border}`}
                        >
                          {STATUSES.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </td>

                      {/* Sync Status Badge */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border flex items-center gap-1 w-fit ${syncCfg.bg}`}>
                          {report.syncStatus === 'SYNCED LOCALLY' ? (
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          ) : (
                            <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
                          )}
                          <span>{report.syncStatus}</span>
                        </span>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button
                          onClick={() => onViewDetails(report)}
                          className="text-xs font-bold text-campus-navy hover:text-white bg-slate-100 hover:bg-campus-navy border border-slate-300 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Details</span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

