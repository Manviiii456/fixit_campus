import React, { useState } from 'react';
import {
  X,
  MapPin,
  Calendar,
  ThumbsUp,
  Tag,
  CheckCircle2,
  Clock,
  AlertCircle,
  RefreshCw,
  User,
  ShieldCheck,
  Send,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { getStatusBadgeConfig, getSyncBadgeConfig, getPriorityBadgeConfig, formatDate } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';
import { PRIORITIES, STATUSES } from '../../utils/sampleData';

export default function IssueDetailsModal({ report, onClose }) {
  const { currentUser, isAdmin } = useAuth();
  const { upvoteReport, changeReportStatus, changeReportPriority } = useIssues();

  const [selectedStatus, setSelectedStatus] = useState(report?.issueStatus || 'PENDING');
  const [selectedPriority, setSelectedPriority] = useState(report?.priority || 'Medium');
  const [adminNote, setAdminNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  if (!report) return null;

  const statusConfig = getStatusBadgeConfig(report.issueStatus);
  const syncConfig = getSyncBadgeConfig(report.syncStatus);
  const priorityConfig = getPriorityBadgeConfig(report.priority);
  const hasUpvoted = currentUser?.email && report.upvotedBy?.includes(currentUser.email);

  // Timeline steps
  const timelineSteps = [
    { key: 'REPORTED', label: 'Reported', completed: true },
    { key: 'PENDING', label: 'Pending Review', completed: report.issueStatus === 'PENDING' || report.issueStatus === 'IN PROGRESS' || report.issueStatus === 'RESOLVED' },
    { key: 'IN PROGRESS', label: 'In Progress', completed: report.issueStatus === 'IN PROGRESS' || report.issueStatus === 'RESOLVED' },
    { key: 'RESOLVED', label: 'Resolved', completed: report.issueStatus === 'RESOLVED' }
  ];

  const handleAdminUpdate = (e) => {
    e.preventDefault();
    setIsUpdating(true);

    if (selectedStatus !== report.issueStatus) {
      changeReportStatus(report.id, selectedStatus, adminNote);
    }
    if (selectedPriority !== report.priority) {
      changeReportPriority(report.id, selectedPriority);
    }

    setIsUpdating(false);
    setAdminNote('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden my-8 animate-fadeIn">
        {/* Modal Top Header */}
        <div className="bg-campus-navy text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs font-bold bg-blue-500/30 text-blue-200 px-2.5 py-1 rounded border border-blue-400/30">
              {report.id}
            </span>
            <div>
              <span className="text-xs text-blue-300 uppercase tracking-wider font-semibold">
                {report.category}
              </span>
              <p className="text-sm font-bold text-white truncate max-w-md">{report.title}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Status and Sync Bar */}
          <div className="flex items-center justify-between gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Issue Status:</span>
              <span
                className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
              >
                <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
                {statusConfig.label}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Sync Status:</span>
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-md border flex items-center gap-1.5 ${syncConfig.bg}`}
              >
                {report.syncStatus === 'SYNCED LOCALLY' ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <RefreshCw className="w-3.5 h-3.5 text-amber-600 animate-spin" />
                )}
                <span>{report.syncStatus}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">Priority:</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded border ${priorityConfig.classes}`}>
                {report.priority || 'Medium'}
              </span>
            </div>
          </div>

          {/* Status Timeline */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Resolution Progress Timeline
            </h4>
            <div className="grid grid-cols-4 gap-2">
              {timelineSteps.map((step, idx) => (
                <div key={step.key} className="text-center">
                  <div
                    className={`h-2 rounded-full mb-1.5 transition-colors ${
                      step.completed ? 'bg-campus-blue' : 'bg-slate-200'
                    }`}
                  />
                  <p
                    className={`text-[11px] font-semibold ${
                      step.completed ? 'text-campus-navy' : 'text-slate-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Main Info */}
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Issue Description</label>
              <p className="text-sm text-slate-700 mt-1 leading-relaxed whitespace-pre-line bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                {report.description}
              </p>
            </div>

            {/* Optional Image Preview */}
            {report.imageUrl && (
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Attached Photo (Local Preview)</label>
                <div className="mt-2 rounded-xl overflow-hidden border border-slate-200 bg-slate-100 max-h-64 flex items-center justify-center">
                  <img
                    src={report.imageUrl}
                    alt="Campus issue visual"
                    className="max-h-64 w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-campus-blue" />
                <span><strong className="text-slate-900">Location:</strong> {report.location}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar className="w-4 h-4 text-campus-blue" />
                <span><strong className="text-slate-900">Reported on:</strong> {formatDate(report.createdAt)}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <User className="w-4 h-4 text-campus-blue" />
                <span><strong className="text-slate-900">Reported by:</strong> {report.reportedBy} ({report.reporterEmail})</span>
              </div>
              <div className="flex items-center gap-2 text-slate-600">
                <ThumbsUp className="w-4 h-4 text-campus-blue" />
                <span><strong className="text-slate-900">Community Support:</strong> {report.upvotes || 0} student upvotes</span>
              </div>
            </div>
          </div>

          {/* Status History Audit Trail */}
          {report.statusHistory && report.statusHistory.length > 0 && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2.5">
                Audit Trail & Status Updates
              </h4>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {report.statusHistory.map((hist, idx) => (
                  <div key={idx} className="text-xs bg-slate-50 border border-slate-200 p-2.5 rounded-lg flex items-start gap-2.5">
                    <Clock className="w-3.5 h-3.5 text-slate-400 mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-800">{hist.status}</span>
                        <span className="text-[10px] text-slate-400">{formatDate(hist.timestamp)}</span>
                      </div>
                      <p className="text-slate-600 mt-0.5">{hist.note}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">By: {hist.updatedBy}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Management Section (Visible ONLY to Admin) */}
          {isAdmin && (
            <div className="p-4 bg-amber-50/60 border border-amber-200 rounded-xl space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Administrator Controls (Save to LocalStorage)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Update Status</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-campus-blue focus:outline-none"
                  >
                    {STATUSES.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Assign Priority</label>
                  <select
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-campus-blue focus:outline-none"
                  >
                    {PRIORITIES.map((pr) => (
                      <option key={pr} value={pr}>{pr}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Status Note / Resolution Remarks</label>
                <input
                  type="text"
                  placeholder="e.g. Electrician team assigned to inspect switchboard"
                  value={adminNote}
                  onChange={(e) => setAdminNote(e.target.value)}
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:outline-none"
                />
              </div>

              <button
                onClick={handleAdminUpdate}
                disabled={isUpdating}
                className="w-full bg-campus-navy hover:bg-campus-blue text-white text-xs font-bold py-2.5 rounded-lg shadow-sm transition-colors flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Changes to LocalStorage</span>
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-6 py-3.5 border-t border-slate-200 flex items-center justify-between">
          <button
            onClick={() => upvoteReport(report.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              hasUpvoted
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
            }`}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-white' : ''}`} />
            <span>{hasUpvoted ? 'Upvoted' : 'Upvote Issue'} ({report.upvotes || 0})</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-semibold text-xs rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

