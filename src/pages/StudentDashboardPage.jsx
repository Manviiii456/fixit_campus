import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Sidebar from '../components/common/Sidebar';
import TopHeader from '../components/common/TopHeader';
import JudgeDemoBanner from '../components/common/JudgeDemoBanner';
import StudentOverview from '../components/student/StudentOverview';
import ReportIssueForm from '../components/student/ReportIssueForm';
import AllCampusIssues from '../components/student/AllCampusIssues';
import MyReports from '../components/student/MyReports';
import StudentProfile from '../components/student/StudentProfile';
import IssueDetailsModal from '../components/common/IssueDetailsModal';
import DocumentationDashboard from '../components/docs/DocumentationDashboard';
import { useAuth } from '../context/AuthContext';

export default function StudentDashboardPage() {
  const { currentUser, isAuthenticated, isStudent, isAdmin } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedReportForDetails, setSelectedReportForDetails] = useState(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const navigate = useNavigate();

  // Route protection
  if (!isAuthenticated) {
    return <Navigate to="/login?role=student" replace />;
  }

  // Redirect admin to admin dashboard if they hit student route
  if (isAdmin) {
    return <Navigate to="/admin" replace />;
  }

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'overview': return 'Student Overview';
      case 'report': return 'Report an Issue';
      case 'all-issues': return 'All Campus Issues';
      case 'my-reports': return 'My Submitted Reports';
      case 'profile': return 'Student Profile';
      case 'docs': return 'Technical Documentation Hub';
      default: return 'Student Portal';
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
          />

          {/* Tab Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {activeTab === 'overview' && (
              <StudentOverview
                onNavigateTab={(tab) => setActiveTab(tab)}
                onViewDetails={(report) => setSelectedReportForDetails(report)}
              />
            )}

            {activeTab === 'report' && (
              <ReportIssueForm
                onSuccessNavigate={() => setActiveTab('all-issues')}
              />
            )}

            {activeTab === 'all-issues' && (
              <AllCampusIssues
                onViewDetails={(report) => setSelectedReportForDetails(report)}
                onNavigateReport={() => setActiveTab('report')}
              />
            )}

            {activeTab === 'my-reports' && (
              <MyReports
                onViewDetails={(report) => setSelectedReportForDetails(report)}
                onNavigateReport={() => setActiveTab('report')}
              />
            )}

            {activeTab === 'profile' && (
              <StudentProfile />
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
