import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  ListOrdered,
  FileText,
  User,
  Users,
  UserCheck,
  RefreshCw,
  History,
  LogOut,
  Wrench,
  ShieldAlert,
  ChevronRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useIssues } from '../../context/IssueContext';

export default function Sidebar({ activeTab, setActiveTab, isMobileOpen, setIsMobileOpen }) {
  const { currentUser, isStudent, isAdmin, logout } = useAuth();
  const { stats } = useIssues();

  const studentNavItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'report', label: 'Report an Issue', icon: PlusCircle, highlight: true },
    { id: 'all-issues', label: 'All Campus Issues', icon: ListOrdered, badge: stats.total },
    { id: 'my-reports', label: 'My Reports', icon: FileText },
    { id: 'profile', label: 'Student Profile', icon: User },
    { id: 'docs', label: 'Documentation', icon: BookOpen }
  ];

  const adminNavItems = [
    { id: 'overview', label: 'Console Overview', icon: LayoutDashboard },
    { id: 'reports', label: 'All Reports Management', icon: ListOrdered, badge: stats.total },
    { id: 'students', label: 'Student Management', icon: Users, badge: stats.totalStudents },
    {
      id: 'pending-registrations',
      label: 'Pending Registrations',
      icon: UserCheck,
      badge: stats.pendingStudents > 0 ? stats.pendingStudents : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'sync',
      label: 'Local Synchronization',
      icon: RefreshCw,
      badge: stats.pendingSync > 0 ? stats.pendingSync : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    { id: 'activity-log', label: 'Activity Log', icon: History },
    { id: 'docs', label: 'Documentation', icon: BookOpen }
  ];

  const navItems = isAdmin ? adminNavItems : studentNavItems;

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (setIsMobileOpen) setIsMobileOpen(false);
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed lg:static top-0 left-0 bottom-0 z-50 w-64 bg-campus-navy text-slate-300 flex flex-col transition-transform duration-300 ease-in-out border-r border-slate-800 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-campus-blue flex items-center justify-center text-white shadow-md">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg text-white">FixIt</span>
                <span className="font-bold text-lg text-blue-400">Campus</span>
              </div>
              <span className="text-[10px] text-blue-300/80 font-medium tracking-wide uppercase">
                {isAdmin ? 'Admin Console' : 'Student Portal'}
              </span>
            </div>
          </div>
        </div>

        {/* User Identity Chip */}
        <div className="p-4 mx-3 my-3 bg-slate-800/60 border border-slate-700/60 rounded-xl">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center font-bold text-white text-sm ${
              isAdmin ? 'bg-amber-600' : 'bg-blue-600'
            }`}>
              {currentUser?.name?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentUser?.name || 'User'}</p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  isAdmin ? 'bg-amber-400' : 'bg-emerald-400'
                }`} />
                <span className="text-[11px] text-slate-400 uppercase tracking-wider font-medium truncate">
                  {isAdmin ? 'Facilities Admin' : (currentUser?.id || 'Student')}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-2 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Navigation Menu
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all group cursor-pointer ${
                  isActive
                    ? 'bg-campus-blue text-white shadow-sm'
                    : item.highlight
                    ? 'text-white bg-blue-900/40 hover:bg-blue-900/70 border border-blue-500/30'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? 'text-white' : item.highlight ? 'text-blue-300' : 'text-slate-400 group-hover:text-blue-400'
                  }`} />
                  <span className="truncate">{item.label}</span>
                </div>

                {item.badge !== undefined && item.badge !== null && (
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    item.badgeColor || (isActive ? 'bg-blue-900 text-white' : 'bg-slate-800 text-slate-300')
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Bottom Section & Logout */}
        <div className="p-3 border-t border-slate-800 space-y-2">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-rose-300 hover:bg-rose-950/30 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-slate-400 group-hover:text-rose-400" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
