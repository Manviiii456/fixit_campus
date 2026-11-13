import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  getStoredReports,
  addReport as addReportToStorage,
  updateReportStatus as updateStatusInStorage,
  updateReportPriority as updatePriorityInStorage,
  toggleUpvoteReport as upvoteInStorage,
  syncPendingReportsLocally,
  getStoredStudents,
  updateStudentApproval as updateApprovalInStorage,
  getStoredActivities,
  resetToDemoDefaults
} from '../utils/storage';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

const IssueContext = createContext(null);

export function IssueProvider({ children }) {
  const { currentUser } = useAuth();
  const { showSuccess, showError, showInfo } = useToast();

  const [reports, setReports] = useState(() => getStoredReports());
  const [students, setStudents] = useState(() => getStoredStudents());
  const [activities, setActivities] = useState(() => getStoredActivities());
  const [lastSyncResult, setLastSyncResult] = useState(null);

  // Reload state directly from LocalStorage
  const refreshData = useCallback(() => {
    setReports(getStoredReports());
    setStudents(getStoredStudents());
    setActivities(getStoredActivities());
  }, []);

  // Listen to cross-tab storage events (if user opens multiple tabs)
  useEffect(() => {
    const handleStorageChange = () => {
      refreshData();
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [refreshData]);

  // Statistics memoization
  const stats = useMemo(() => {
    const total = reports.length;
    const pending = reports.filter((r) => r.issueStatus === 'PENDING').length;
    const inProgress = reports.filter((r) => r.issueStatus === 'IN PROGRESS').length;
    const resolved = reports.filter((r) => r.issueStatus === 'RESOLVED').length;
    const pendingSync = reports.filter((r) => r.syncStatus === 'PENDING SYNC').length;
    const syncedLocally = reports.filter((r) => r.syncStatus === 'SYNCED LOCALLY').length;

    const totalStudents = students.length;
    const pendingStudents = students.filter((s) => s.approvalStatus === 'PENDING APPROVAL').length;
    const approvedStudents = students.filter((s) => s.approvalStatus === 'APPROVED').length;

    return {
      total,
      pending,
      inProgress,
      resolved,
      pendingSync,
      syncedLocally,
      totalStudents,
      pendingStudents,
      approvedStudents
    };
  }, [reports, students]);

  // Submit a new report
  const submitReport = useCallback(
    (formData) => {
      if (!formData.title?.trim() || !formData.category || !formData.location?.trim() || !formData.description?.trim()) {
        showError('Please fill in all mandatory fields (Title, Category, Location, Description).');
        return { success: false, error: 'Mandatory fields missing' };
      }

      try {
        const newReport = addReportToStorage(formData, currentUser);
        refreshData();
        showSuccess(`Report ${newReport.id} submitted! Marked as PENDING SYNC.`, 'Report Created');
        return { success: true, report: newReport };
      } catch (err) {
        showError('Failed to save report locally. Please try again.');
        return { success: false, error: err.message };
      }
    },
    [currentUser, refreshData, showSuccess, showError]
  );

  // Upvote report
  const upvoteReport = useCallback(
    (reportId) => {
      if (!currentUser) {
        showError('Please log in to upvote issues.');
        return false;
      }

      const result = upvoteInStorage(reportId, currentUser.email, currentUser.name);
      if (result.success) {
        refreshData();
        showSuccess('Your upvote was recorded!', 'Upvoted');
        return true;
      } else {
        showInfo(result.message || 'You have already upvoted this issue.');
        return false;
      }
    },
    [currentUser, refreshData, showSuccess, showInfo, showError]
  );

  // Change report status (Admin only)
  const changeReportStatus = useCallback(
    (reportId, newStatus, note = '') => {
      const updated = updateStatusInStorage(reportId, newStatus, currentUser, note);
      if (updated) {
        refreshData();
        showSuccess(`Issue status changed to "${newStatus}"`, 'Status Updated');
        return true;
      } else {
        showError('Could not update report status.');
        return false;
      }
    },
    [currentUser, refreshData, showSuccess, showError]
  );

  // Change report priority (Admin only)
  const changeReportPriority = useCallback(
    (reportId, newPriority) => {
      const updated = updatePriorityInStorage(reportId, newPriority, currentUser);
      if (updated) {
        refreshData();
        showSuccess(`Priority updated to "${newPriority}"`, 'Priority Updated');
        return true;
      } else {
        showError('Could not update priority.');
        return false;
      }
    },
    [currentUser, refreshData, showSuccess, showError]
  );

  // Local Synchronization - CRITICAL REQUIREMENT
  const syncLocally = useCallback(() => {
    const result = syncPendingReportsLocally(currentUser);
    refreshData();
    setLastSyncResult(result);

    if (result.alreadySynced) {
      showInfo(result.message, 'Local Sync');
    } else {
      showSuccess(result.message, 'Synchronization Complete');
    }

    return result;
  }, [currentUser, refreshData, showSuccess, showInfo]);

  // Student Approval (Admin only)
  const approveStudent = useCallback(
    (studentEmail) => {
      const updated = updateApprovalInStorage(studentEmail, 'APPROVED', currentUser);
      if (updated) {
        refreshData();
        showSuccess(`Student ${updated.name} has been APPROVED!`, 'Student Approved');
        return true;
      }
      return false;
    },
    [currentUser, refreshData, showSuccess]
  );

  // Student Rejection (Admin only)
  const rejectStudent = useCallback(
    (studentEmail) => {
      const updated = updateApprovalInStorage(studentEmail, 'REJECTED', currentUser);
      if (updated) {
        refreshData();
        showSuccess(`Student registration for ${updated.name} was REJECTED.`, 'Registration Rejected');
        return true;
      }
      return false;
    },
    [currentUser, refreshData, showSuccess]
  );

  // Reset demo data to defaults
  const resetDemo = useCallback(() => {
    resetToDemoDefaults();
    refreshData();
    showSuccess('Reset all demo data back to clean initial state.', 'Demo Data Reset');
  }, [refreshData, showSuccess]);

  return (
    <IssueContext.Provider
      value={{
        reports,
        students,
        activities,
        stats,
        lastSyncResult,
        submitReport,
        upvoteReport,
        changeReportStatus,
        changeReportPriority,
        syncLocally,
        approveStudent,
        rejectStudent,
        refreshData,
        resetDemo
      }}
    >
      {children}
    </IssueContext.Provider>
  );
}

export function useIssues() {
  const context = useContext(IssueContext);
  if (!context) {
    throw new Error('useIssues must be used within an IssueProvider');
  }
  return context;
}

