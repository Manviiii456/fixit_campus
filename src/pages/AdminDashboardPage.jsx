import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopHeader from '../components/common/TopHeader';
import JudgeDemoBanner from '../components/common/JudgeDemoBanner';
import AdminOverview from '../components/admin/AdminOverview';
import AllReportsManagement from '../components/admin/AllReportsManagement';
import StudentManagement from '../components/admin/StudentManagement';
import PendingRegistrations from '../components/admin/PendingRegistrations';
import LocalSynchronization from '../components/admin/LocalSynchronization';
import ActivityLog from '../components/admin/ActivityLog';
import Minute40Placeholder from '../components/admin/Minute40Placeholder';
import IssueDetailsModal from '../components/common/IssueDetailsModal';
import DocumentationDashboard from '../components/docs/DocumentationDashboard';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboardPage() {
  const { currentUser, isAuthenticated, isStudent, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReportForDetails, setSelectedReportForDetails] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Route protection
  if (!isAuthenticated) {
    return <Navigate to="/login?role=admin" replace />;
  }

  // Redirect student away from admin dashboard
  if (isStudent) {
    return <Navigate to="/student" replace />;
  }

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Administration Console Overview';
      case 'reports': return 'All Reports Management';
      case 'students': return 'Student Access Management';
      case 'pending-registrations': return 'Pending Registrations Triage';
      case 'sync': return 'Local Database Synchronization';
      case 'activity-log': return 'Campus Activity Audit Trail';
      case 'docs': return 'Technical Documentation Hub';
      default: return 'Campus Facilities Admin';
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans selection:bg-campus-blue selection:text-white">
      {/* Top Banner for Judges */}
      <JudgeDemoBanner />

      <div className="flex-1 flex overflow-hidden">
        {/* Modern Left Sidebar */}
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isMobileOpen={isMobileSidebarOpen}
          setIsMobileOpen={setIsMobileSidebarOpen}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {/* Top Header */}
          <TopHeader
            title={getSectionTitle()}
            onOpenMobile={() => setIsMobileSidebarOpen(true)}
            onNavigateSync={() => setActiveTab('sync')}
          />

          {/* Tab Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
            {activeTab === 'overview' && (
              <>
                <AdminOverview
                  onNavigateTab={(tab) => setActiveTab(tab)}
                  onViewDetails={(report) => setSelectedReportForDetails(report)}
                />

                {/* Minute 40 Constraint Component */}
                <Minute40Placeholder />
              </>
            )}

            {activeTab === 'reports' && (
              <AllReportsManagement
                onViewDetails={(report) => setSelectedReportForDetails(report)}
              />
            )}

            {activeTab === 'students' && (
              <StudentManagement />
            )}

            {activeTab === 'pending-registrations' && (
              <PendingRegistrations />
            )}

            {activeTab === 'sync' && (
              <LocalSynchronization />
            )}

            {activeTab === 'activity-log' && (
              <ActivityLog />
            )}

            {activeTab === 'docs' && (
              <DocumentationDashboard />
            )}
          </main>
        </div>
      </div>

      {/* Issue Details Modal */}
      {selectedReportForDetails && (
        <IssueDetailsModal
          report={selectedReportForDetails}
          onClose={() => setSelectedReportForDetails(null)}
        />
      )}
    </div>
  );
}
