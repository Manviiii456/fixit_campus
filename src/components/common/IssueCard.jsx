import React from 'react';
import {
  ThumbsUp,
  MapPin,
  Calendar,
  Eye,
  Tag,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Image as ImageIcon
} from 'lucide-react';
import { getStatusBadgeConfig, getSyncBadgeConfig, getPriorityBadgeConfig, formatTimeAgo } from '../../utils/formatters';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';

export default function IssueCard({ report, onViewDetails }) {
  const { currentUser } = useAuth();
  const { upvoteReport } = useIssues();

  const statusConfig = getStatusBadgeConfig(report.issueStatus);
  const syncConfig = getSyncBadgeConfig(report.syncStatus);
  const priorityConfig = getPriorityBadgeConfig(report.priority);

  const hasUpvoted = currentUser?.email && report.upvotedBy?.includes(currentUser.email);

  const handleUpvote = (e) => {
    e.stopPropagation();
    upvoteReport(report.id);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        {/* Top Header: ID, Category & Sync Badge */}
        <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
              {report.id}
            </span>
            <span className="text-xs font-semibold text-campus-blue bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-100">
              {report.category}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Priority indicator */}
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border ${priorityConfig.classes}`}>
              {report.priority || 'Medium'}
            </span>

            {/* Sync Status Badge */}
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-md border flex items-center gap-1 ${syncConfig.bg}`}
              title={`Synchronization Status: ${report.syncStatus}`}
            >
              {report.syncStatus === 'SYNCED LOCALLY' ? (
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              ) : (
                <RefreshCw className="w-3 h-3 text-amber-600 animate-spin" />
              )}
              <span>{report.syncStatus}</span>
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-bold text-slate-900 group-hover:text-campus-blue transition-colors line-clamp-1 mb-1.5">
          {report.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2.5">
          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
          <span className="truncate">{report.location}</span>
        </div>

        {/* Description snippet */}
        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-4">
          {report.description}
        </p>

        {/* Has Image Indicator */}
        {report.imageUrl && (
          <div className="mb-3 flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200 w-fit">
            <ImageIcon className="w-3.5 h-3.5 text-slate-400" />
            <span>Image Attached</span>
          </div>
        )}
      </div>

      {/* Card Footer: Status, Upvote, and View Details */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
        {/* Issue Status Indicator */}
        <div className="flex items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${statusConfig.bg} ${statusConfig.text} ${statusConfig.border}`}
          >
            <span className={`w-2 h-2 rounded-full ${statusConfig.dot}`} />
            {statusConfig.label}
          </span>
          <span className="text-[11px] text-slate-400 hidden sm:inline">
            {formatTimeAgo(report.createdAt)}
          </span>
        </div>

        {/* Actions: Upvote & Details */}
        <div className="flex items-center gap-2">
          {/* Upvote button */}
          <button
            onClick={handleUpvote}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              hasUpvoted
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
            title={hasUpvoted ? 'You upvoted this' : 'Click to upvote'}
          >
            <ThumbsUp className={`w-3.5 h-3.5 ${hasUpvoted ? 'fill-white' : ''}`} />
            <span>{report.upvotes || 0}</span>
          </button>

          {/* View Details button */}
          <button
            onClick={() => onViewDetails(report)}
            className="flex items-center gap-1 bg-white hover:bg-slate-50 text-campus-navy border border-slate-300 hover:border-campus-navy px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors shadow-xs"
          >
            <Eye className="w-3.5 h-3.5 text-campus-blue" />
            <span>View Details</span>
          </button>
        </div>
      </div>
    </div>
  );
}

