import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  getStoredSession,
  saveStoredSession,
  clearStoredSession,
  getStoredStudents,
  registerStudent as registerStudentInStorage,
  updateStudentApproval as updateApprovalInStorage,
  verifyDemoPassword,
  generateDemoOTP,
  getDemoOTP,
  verifyDemoOTP,
  addActivity
} from '../utils/storage';
import { INITIAL_ADMIN } from '../utils/sampleData';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => getStoredSession());
  const [pendingOtpSession, setPendingOtpSession] = useState(null);
  const [activeOtpInfo, setActiveOtpInfo] = useState(null);
  const [otpCooldown, setOtpCooldown] = useState(0);

  // Sync session changes to LocalStorage
  useEffect(() => {
    if (currentUser) {
      saveStoredSession(currentUser);
    } else {
      clearStoredSession();
    }
  }, [currentUser]);

  // Handle OTP countdown timer if active
  useEffect(() => {
    if (otpCooldown <= 0) return;
    const interval = setInterval(() => {
      setOtpCooldown((prev) => Math.max(0, prev - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [otpCooldown]);

  // Login Administrator
  const loginAdmin = useCallback((email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    
    if (trimmedEmail !== INITIAL_ADMIN.email.toLowerCase()) {
      return { success: false, error: 'Unrecognized administrator email. Use demo account: admin@fixit.demo' };
    }

    const isValid = verifyDemoPassword(password, INITIAL_ADMIN.passwordHash);
    if (!isValid) {
      return { success: false, error: 'Incorrect administrator demo password. Use: AdminDemo123!' };
    }

    const adminUser = {
      id: INITIAL_ADMIN.id,
      name: INITIAL_ADMIN.name,
      email: INITIAL_ADMIN.email,
      role: 'ADMIN',
      title: INITIAL_ADMIN.title
    };

    setCurrentUser(adminUser);
    setPendingOtpSession(null);
    setActiveOtpInfo(null);

    addActivity({
      type: 'ADMIN_LOGIN',
      description: `Administrator ${adminUser.name} logged into console`,
      role: 'ADMIN',
      user: adminUser.name
    });

    return { success: true, user: adminUser };
  }, []);

  // Initiate Student Login (leads to OTP verification if approved)
  const initiateStudentLogin = useCallback((email, password) => {
    const trimmedEmail = email.trim().toLowerCase();
    const students = getStoredStudents();
    const student = students.find((s) => s.email.toLowerCase() === trimmedEmail);

    if (!student) {
      return {
        success: false,
        error: 'Student account not found. Please register your demo student details first.'
      };
    }

    const isPasswordValid = verifyDemoPassword(password, student.passwordHash);
    if (!isPasswordValid) {
      return {
        success: false,
        error: 'Invalid password. If using sample student, use: StudentDemo123!'
      };
    }

    // Role Approval Check
    if (student.approvalStatus === 'PENDING APPROVAL') {
      return {
        success: false,
        requiresApproval: true,
        error: 'Your registration is currently PENDING ADMINISTRATOR APPROVAL. A campus admin must approve your registration before you can log in.'
      };
    }

    if (student.approvalStatus === 'REJECTED') {
      return {
        success: false,
        rejected: true,
        error: 'Your student registration was REJECTED by campus administration. Please contact the campus helpdesk.'
      };
    }

    if (student.approvalStatus === 'APPROVED') {
      // Generate Demo OTP locally
      const otp = generateDemoOTP(trimmedEmail);
      setPendingOtpSession({
        student,
        initiatedAt: Date.now()
      });
      setActiveOtpInfo(otp);
      setOtpCooldown(30); // 30 second resend cooldown

      return {
        success: true,
        requiresOtp: true,
        otpCode: otp.code,
        message: 'Administrator approval verified. Please complete simulated OTP verification.'
      };
    }

    return { success: false, error: 'Unknown account status.' };
  }, []);

  // Resend Demo OTP
  const resendDemoOTP = useCallback(() => {
    if (!pendingOtpSession) return null;
    const otp = generateDemoOTP(pendingOtpSession.student.email);
    setActiveOtpInfo(otp);
    setOtpCooldown(30);
    return otp;
  }, [pendingOtpSession]);

  // Complete OTP Verification
  const completeStudentOTP = useCallback((enteredCode) => {
    if (!pendingOtpSession) {
      return { success: false, error: 'No active login session found. Please enter your credentials again.' };
    }

    const verification = verifyDemoOTP(enteredCode, pendingOtpSession.student.email);
    if (!verification.valid) {
      return { success: false, error: verification.error };
    }

    // Successfully verified
    const studentUser = {
      id: pendingOtpSession.student.id,
      name: pendingOtpSession.student.name,
      email: pendingOtpSession.student.email,
      department: pendingOtpSession.student.department,
      role: 'STUDENT',
      approvalStatus: 'APPROVED'
    };

    setCurrentUser(studentUser);
    setPendingOtpSession(null);
    setActiveOtpInfo(null);

    addActivity({
      type: 'STUDENT_LOGIN',
      description: `Student ${studentUser.name} (${studentUser.id}) logged in successfully via demo OTP`,
      role: 'STUDENT',
      user: studentUser.name
    });

    return { success: true, user: studentUser };
  }, [pendingOtpSession]);

  // Cancel OTP and return to login form
  const cancelOtpFlow = useCallback(() => {
    setPendingOtpSession(null);
    setActiveOtpInfo(null);
  }, []);

  // Register Student
  const registerStudent = useCallback(({ name, email, studentId, department, password }) => {
    const result = registerStudentInStorage({ name, email, studentId, department, password });
    return result;
  }, []);

  // Logout
  const logout = useCallback(() => {
    if (currentUser) {
      addActivity({
        type: 'LOGOUT',
        description: `${currentUser.role} ${currentUser.name} signed out`,
        role: currentUser.role,
        user: currentUser.name
      });
    }
    setCurrentUser(null);
    setPendingOtpSession(null);
    setActiveOtpInfo(null);
    clearStoredSession();
  }, [currentUser]);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isStudent: currentUser?.role === 'STUDENT',
        isAdmin: currentUser?.role === 'ADMIN',
        pendingOtpSession,
        activeOtpInfo,
        otpCooldown,
        loginAdmin,
        initiateStudentLogin,
        resendDemoOTP,
        completeStudentOTP,
        cancelOtpFlow,
        registerStudent,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

