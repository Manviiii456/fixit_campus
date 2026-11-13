import React, { useState } from 'react';
import {
  History,
  CheckCircle2,
  RefreshCw,
  UserCheck,
  PlusCircle,
  ThumbsUp,
  Sliders,
  Filter,
  Shield,
  User
} from 'lucide-react';
import { useIssues } from '../../context/IssueContext';
import { formatDate } from '../../utils/formatters';

export default function ActivityLog() {
  const { activities } = useIssues();
  const [roleFilter, setRoleFilter] = useState('');

  const filteredActivities = activities.filter((act) => {
    if (roleFilter && act.role !== roleFilter) return false;
    return true;
  });

  const getActivityIcon = (type) => {
    switch (type) {
      case 'REPORT_SUBMITTED':
        return <PlusCircle className="w-4 h-4 text-blue-500" />;
      case 'REPORT_STATUS_CHANGE':
        return <Sliders className="w-4 h-4 text-purple-500" />;
      case 'REPORT_PRIORITY_CHANGE':
        return <Sliders className="w-4 h-4 text-amber-500" />;
      case 'REPORT_UPVOTED':
        return <ThumbsUp className="w-4 h-4 text-blue-600" />;
      case 'STUDENT_APPROVAL':
        return <UserCheck className="w-4 h-4 text-emerald-500" />;
      case 'STUDENT_REJECTION':
        return <UserCheck className="w-4 h-4 text-rose-500" />;
      case 'STUDENT_REGISTRATION':
        return <User className="w-4 h-4 text-slate-500" />;
      case 'LOCAL_SYNC':
        return <RefreshCw className="w-4 h-4 text-amber-500" />;
      case 'ADMIN_LOGIN':
      case 'STUDENT_LOGIN':
      default:
        return <History className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Campus Activity Audit Log</h2>
          <p className="text-xs text-slate-500">
            Immutable chronological record of campus issues, status changes, student registrations, and local synchronizations.
          </p>
        </div>

        {/* Role filter */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Filter Role:</span>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-slate-800 font-semibold focus:ring-2 focus:ring-campus-blue focus:outline-none"
          >
            <option value="">All Roles</option>
            <option value="ADMIN">Admin Only</option>
            <option value="STUDENT">Student Only</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline / Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {filteredActivities.length === 0 ? (
          <div className="p-10 text-center text-slate-400 text-xs">
            No activity logs found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredActivities.map((act) => (
              <div
                key={act.id}
                className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4 flex-wrap sm:flex-nowrap"
              >
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {getActivityIcon(act.type)}
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-900">{act.description}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-slate-500 flex-wrap">
                      <span className="flex items-center gap-1">
                        <strong className="text-slate-700">Triggered by:</strong> {act.user}
                      </span>

                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        act.role === 'ADMIN'
                          ? 'bg-amber-100 text-amber-800 border border-amber-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {act.role}
                      </span>

                      {act.reportId && (
                        <span className="font-mono font-bold text-campus-navy bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {act.reportId}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="text-right text-[11px] text-slate-400 font-mono whitespace-nowrap self-start">
                  {formatDate(act.timestamp)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

