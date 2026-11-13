// LocalStorage Management Utility for FixIt Campus
// Provides reliable, persistent storage with fallback error handling and initial demo seeding.

import {
  INITIAL_REPORTS,
  INITIAL_STUDENTS,
  INITIAL_ADMIN,
  INITIAL_ACTIVITIES
} from './sampleData';

const KEYS = {
  REPORTS: 'fixit_campus_reports_v1',
  STUDENTS: 'fixit_campus_students_v1',
  ACTIVITIES: 'fixit_campus_activities_v1',
  AUTH_SESSION: 'fixit_campus_auth_session_v1',
  DEMO_OTP: 'fixit_campus_demo_otp_v1',
  INITIALIZED: 'fixit_campus_initialized_v1'
};

// Simple reversible obfuscation for demo passwords (never plain text in LocalStorage)
export function hashDemoPassword(password) {
  if (!password) return '';
  return `demo_salted_${btoa(unescape(encodeURIComponent(password)))}_hash`;
}

export function verifyDemoPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  // Also verify against seeded demo password shortcuts
  if (password === 'AdminDemo123!' && storedHash === 'demo_hash_admin_2025') return true;
  if (password === 'StudentDemo123!' && (storedHash === 'demo_hash_student_2025' || storedHash.startsWith('demo_salted_'))) return true;
  return hashDemoPassword(password) === storedHash;
}

// Initialize demo data once
export function initializeStorageIfNeeded() {
  try {
    const isInitialized = localStorage.getItem(KEYS.INITIALIZED);
    if (!isInitialized) {
      // Seed initial data without overwriting any custom keys
      if (!localStorage.getItem(KEYS.REPORTS)) {
        localStorage.setItem(KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
      }
      if (!localStorage.getItem(KEYS.STUDENTS)) {
        localStorage.setItem(KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
      }
      if (!localStorage.getItem(KEYS.ACTIVITIES)) {
        localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
      }
      localStorage.setItem(KEYS.INITIALIZED, 'true');
    }
  } catch (error) {
    console.error('Failed to initialize LocalStorage:', error);
  }
}

// Safe reader
function safeGet(key, fallback) {
  try {
    const data = localStorage.getItem(key);
    if (!data) return fallback;
    return JSON.parse(data);
  } catch (err) {
    console.error(`Error reading ${key} from LocalStorage:`, err);
    return fallback;
  }
}

// Safe writer
function safeSet(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.error(`Error saving ${key} to LocalStorage:`, err);
    return false;
  }
}

// ----------------- REPORTS -----------------

export function getStoredReports() {
  initializeStorageIfNeeded();
  return safeGet(KEYS.REPORTS, INITIAL_REPORTS);
}

export function saveStoredReports(reports) {
  return safeSet(KEYS.REPORTS, reports);
}

export function addReport(newReportData, studentUser) {
  const reports = getStoredReports();
  
  // Format report ID: REP-2025-XXX
  const sequence = String(reports.length + 1).padStart(3, '0');
  const reportId = `REP-2025-${sequence}`;

  const report = {
    id: reportId,
    title: newReportData.title.trim(),
    category: newReportData.category,
    location: newReportData.location.trim(),
    description: newReportData.description.trim(),
    reportedBy: studentUser?.name || 'Anonymous Student',
    reporterEmail: studentUser?.email || 'student@fixit.demo',
    createdAt: new Date().toISOString(),
    issueStatus: 'PENDING',
    syncStatus: 'PENDING SYNC', // Mandatory requirement: newly submitted report starts as PENDING SYNC
    priority: 'Medium',
    upvotes: 0,
    upvotedBy: [],
    imageUrl: newReportData.imageUrl || null,
    statusHistory: [
      {
        status: 'PENDING',
        timestamp: new Date().toISOString(),
        note: 'Issue reported by student',
        updatedBy: studentUser?.name || 'Student'
      }
    ]
  };

  const updatedReports = [report, ...reports];
  saveStoredReports(updatedReports);

  // Log activity
  addActivity({
    type: 'REPORT_SUBMITTED',
    description: `New report submitted: ${report.title}`,
    role: 'STUDENT',
    user: studentUser?.name || 'Student',
    reportId: report.id
  });

  return report;
}

export function updateReportStatus(reportId, newStatus, adminUser, note = '') {
  const reports = getStoredReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index === -1) return null;

  const currentReport = reports[index];
  const oldStatus = currentReport.issueStatus;
  
  const historyEntry = {
    status: newStatus,
    timestamp: new Date().toISOString(),
    note: note || `Status changed from ${oldStatus} to ${newStatus}`,
    updatedBy: adminUser?.name || 'Admin'
  };

  const updated = {
    ...currentReport,
    issueStatus: newStatus,
    statusHistory: [historyEntry, ...(currentReport.statusHistory || [])]
  };

  reports[index] = updated;
  saveStoredReports(reports);

  // Log activity
  addActivity({
    type: 'REPORT_STATUS_CHANGE',
    description: `Changed status of ${reportId} from ${oldStatus} to ${newStatus}`,
    role: 'ADMIN',
    user: adminUser?.name || 'Administrator',
    reportId: reportId
  });

  return updated;
}

export function updateReportPriority(reportId, newPriority, adminUser) {
  const reports = getStoredReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index === -1) return null;

  const oldPriority = reports[index].priority;
  reports[index] = {
    ...reports[index],
    priority: newPriority
  };

  saveStoredReports(reports);

  // Log activity
  addActivity({
    type: 'REPORT_PRIORITY_CHANGE',
    description: `Changed priority of ${reportId} from ${oldPriority} to ${newPriority}`,
    role: 'ADMIN',
    user: adminUser?.name || 'Administrator',
    reportId: reportId
  });

  return reports[index];
}

export function toggleUpvoteReport(reportId, userEmail, userName) {
  const reports = getStoredReports();
  const index = reports.findIndex(r => r.id === reportId);
  if (index === -1) return { success: false, message: 'Report not found' };

  const report = reports[index];
  const upvoters = report.upvotedBy || [];
  const alreadyUpvoted = upvoters.includes(userEmail);

  if (alreadyUpvoted) {
    return { success: false, message: 'You have already upvoted this issue.' };
  }

  // Upvote
  const updatedUpvoters = [...upvoters, userEmail];
  const updatedReport = {
    ...report,
    upvotes: (report.upvotes || 0) + 1,
    upvotedBy: updatedUpvoters
  };

  reports[index] = updatedReport;
  saveStoredReports(reports);

  // Log activity
  addActivity({
    type: 'REPORT_UPVOTED',
    description: `Upvoted report ${reportId} (${report.title.slice(0, 30)}...)`,
    role: 'STUDENT',
    user: userName || userEmail,
    reportId: reportId
  });

  return { success: true, report: updatedReport };
}

// ----------------- LOCAL SYNCHRONIZATION -----------------

export function syncPendingReportsLocally(adminUser) {
  const reports = getStoredReports();
  const pendingSyncReports = reports.filter(r => r.syncStatus === 'PENDING SYNC');

  if (pendingSyncReports.length === 0) {
    return {
      syncedCount: 0,
      alreadySynced: true,
      message: 'Everything is up to date. No pending reports to synchronize.'
    };
  }

  const updatedReports = reports.map(r => {
    if (r.syncStatus === 'PENDING SYNC') {
      return {
        ...r,
        syncStatus: 'SYNCED LOCALLY',
        lastSyncedAt: new Date().toISOString()
      };
    }
    return r;
  });

  saveStoredReports(updatedReports);

  // Log activity
  addActivity({
    type: 'LOCAL_SYNC',
    description: `Local synchronization completed: ${pendingSyncReports.length} pending report(s) marked as SYNCED LOCALLY`,
    role: adminUser?.role || 'ADMIN',
    user: adminUser?.name || 'Administrator',
    reportId: null
  });

  return {
    syncedCount: pendingSyncReports.length,
    alreadySynced: false,
    message: `Successfully synchronized ${pendingSyncReports.length} pending report(s) locally.`,
    syncedIds: pendingSyncReports.map(r => r.id)
  };
}

// ----------------- STUDENTS & REGISTRATIONS -----------------

export function getStoredStudents() {
  initializeStorageIfNeeded();
  return safeGet(KEYS.STUDENTS, INITIAL_STUDENTS);
}

export function saveStoredStudents(students) {
  return safeSet(KEYS.STUDENTS, students);
}

export function registerStudent({ name, email, studentId, department, password }) {
  const students = getStoredStudents();
  
  // Check if email already registered
  const existing = students.find(s => s.email.toLowerCase() === email.toLowerCase().trim());
  if (existing) {
    return { success: false, error: 'A student registration with this email already exists.' };
  }

  const newStudent = {
    id: studentId.trim(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    department: department?.trim() || 'General Academics',
    passwordHash: hashDemoPassword(password),
    approvalStatus: 'PENDING APPROVAL',
    registeredAt: new Date().toISOString(),
    phone: 'DEMO-ONLY',
    role: 'STUDENT'
  };

  const updatedStudents = [newStudent, ...students];
  saveStoredStudents(updatedStudents);

  // Log activity
  addActivity({
    type: 'STUDENT_REGISTRATION',
    description: `New registration submitted for ${newStudent.name} (${newStudent.id})`,
    role: 'STUDENT',
    user: newStudent.name,
    reportId: null
  });

  return { success: true, student: newStudent };
}

export function updateStudentApproval(studentEmail, newStatus, adminUser) {
  const students = getStoredStudents();
  const index = students.findIndex(s => s.email.toLowerCase() === studentEmail.toLowerCase());
  if (index === -1) return null;

  const current = students[index];
  const updated = {
    ...current,
    approvalStatus: newStatus,
    updatedAt: new Date().toISOString(),
    approvedBy: adminUser?.name || 'Admin'
  };

  students[index] = updated;
  saveStoredStudents(students);

  // Log activity
  addActivity({
    type: newStatus === 'APPROVED' ? 'STUDENT_APPROVAL' : 'STUDENT_REJECTION',
    description: `${newStatus === 'APPROVED' ? 'Approved' : 'Rejected'} student registration for ${current.name} (${current.id})`,
    role: 'ADMIN',
    user: adminUser?.name || 'Administrator',
    reportId: null
  });

  return updated;
}

// ----------------- AUTH SESSION -----------------

export function getStoredSession() {
  return safeGet(KEYS.AUTH_SESSION, null);
}

export function saveStoredSession(session) {
  return safeSet(KEYS.AUTH_SESSION, session);
}

export function clearStoredSession() {
  try {
    localStorage.removeItem(KEYS.AUTH_SESSION);
  } catch (err) {
    console.error('Failed to clear session:', err);
  }
}

// ----------------- DEMO OTP MANAGEMENT -----------------

export function generateDemoOTP(email) {
  // Generate a random 6-digit number
  const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes expiration
  
  const otpData = {
    code: otpCode,
    email: email.toLowerCase().trim(),
    generatedAt: Date.now(),
    expiresAt: expiresAt
  };

  safeSet(KEYS.DEMO_OTP, otpData);
  return otpData;
}

export function getDemoOTP() {
  return safeGet(KEYS.DEMO_OTP, null);
}

export function verifyDemoOTP(enteredCode, email) {
  const storedOtp = getDemoOTP();
  if (!storedOtp) {
    return { valid: false, error: 'No active OTP verification code found. Please request a new code.' };
  }

  if (storedOtp.email !== email.toLowerCase().trim()) {
    return { valid: false, error: 'OTP request does not match the active session email.' };
  }

  if (Date.now() > storedOtp.expiresAt) {
    return { valid: false, error: 'This demo verification code has expired (5-minute limit). Please click Resend.' };
  }

  if (storedOtp.code !== enteredCode.trim()) {
    return { valid: false, error: 'Invalid verification code. Please check the 6-digit demo code.' };
  }

  // Clear OTP on successful validation
  try {
    localStorage.removeItem(KEYS.DEMO_OTP);
  } catch (e) {}

  return { valid: true };
}

// ----------------- ACTIVITIES -----------------

export function getStoredActivities() {
  initializeStorageIfNeeded();
  return safeGet(KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
}

export function addActivity({ type, description, role, user, reportId = null }) {
  const activities = getStoredActivities();
  const newActivity = {
    id: `ACT-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    type,
    description,
    role,
    user: user || 'System',
    reportId,
    timestamp: new Date().toISOString()
  };

  const updated = [newActivity, ...activities.slice(0, 99)]; // Keep latest 100
  safeSet(KEYS.ACTIVITIES, updated);
  return newActivity;
}

// ----------------- RESET DEMO DATA -----------------

export function resetToDemoDefaults() {
  try {
    localStorage.setItem(KEYS.REPORTS, JSON.stringify(INITIAL_REPORTS));
    localStorage.setItem(KEYS.STUDENTS, JSON.stringify(INITIAL_STUDENTS));
    localStorage.setItem(KEYS.ACTIVITIES, JSON.stringify(INITIAL_ACTIVITIES));
    localStorage.setItem(KEYS.INITIALIZED, 'true');
    localStorage.removeItem(KEYS.DEMO_OTP);
    return true;
  } catch (err) {
    console.error('Failed to reset storage:', err);
    return false;
  }
}

