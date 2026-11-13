import React from 'react';
import {
  PlusCircle,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FolderOpen,
  ArrowRight,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import StatCard from '../common/StatCard';
import IssueCard from '../common/IssueCard';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';

export default function StudentOverview({ onNavigateTab, onViewDetails }) {
  const { currentUser } = useAuth();
  const { reports, stats } = useIssues();

  // Dynamic greeting based on hour
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  // Recent 4 campus issues
  const recentIssues = reports.slice(0, 4);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Header Banner with College Image background & white translucent cover */}
      <div className="rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 relative overflow-hidden bg-slate-100">
        {/* College Campus Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{ backgroundImage: `url('/campus-bg.jpg')` }}
        />
        {/* White translucent cover overlay */}
        <div className="absolute inset-0 bg-white/85 sm:bg-white/80 backdrop-blur-[1.5px] pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/90 text-campus-blue text-xs font-bold border border-blue-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Facility Reporting Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-campus-navy tracking-tight">
              {getGreeting()}, {currentUser?.name || 'Student'}!
            </h2>
            <p className="text-slate-700 text-xs sm:text-sm max-w-xl font-medium leading-relaxed">
              Welcome to FixIt Campus. Help us make our campus better by reporting classroom, electrical, washroom, and infrastructure issues.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateTab('report')}
              className="flex items-center gap-2.5 bg-campus-blue hover:bg-blue-500 text-white font-bold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 cursor-pointer"
            >
              <PlusCircle className="w-5 h-5 text-white" />
              <span>Report New Issue</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">
            Campus Issues At A Glance
          </h3>
          <span className="text-xs text-slate-400 font-medium">Updated from LocalStorage</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Issues"
            value={stats.total}
            subtitle="Campus-wide submissions"
            icon={FolderOpen}
            color="slate"
            onClick={() => onNavigateTab('all-issues')}
          />
          <StatCard
            title="Pending Issues"
            value={stats.pending}
            subtitle="Awaiting triage & assignment"
            icon={Clock}
            color="orange"
            onClick={() => onNavigateTab('all-issues')}
          />
          <StatCard
            title="In Progress"
            value={stats.inProgress}
            subtitle="Maintenance crew on site"
            icon={TrendingUp}
            color="blue"
            onClick={() => onNavigateTab('all-issues')}
          />
          <StatCard
            title="Resolved Issues"
            value={stats.resolved}
            subtitle="Fixed & verified by admin"
            icon={CheckCircle2}
            color="green"
            onClick={() => onNavigateTab('all-issues')}
          />
        </div>
      </div>

      {/* Recent Campus Issues Section */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-slate-900">Recent Campus Issues</h3>
            <p className="text-xs text-slate-500">Live community feed of recently reported campus problems</p>
          </div>
          <button
            onClick={() => onNavigateTab('all-issues')}
            className="flex items-center gap-1.5 text-xs font-bold text-campus-blue hover:text-blue-700 transition-colors cursor-pointer"
          >
            <span>View All ({reports.length})</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {recentIssues.length === 0 ? (
          <div className="bg-white rounded-2xl p-10 text-center border border-slate-200">
            <p className="text-slate-500 text-sm">No campus issues reported yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentIssues.map((report) => (
              <IssueCard
                key={report.id}
                report={report}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
