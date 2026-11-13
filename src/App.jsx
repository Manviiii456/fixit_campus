import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider } from './context/AuthContext';
import { IssueProvider } from './context/IssueContext';

import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import StudentDashboardPage from './pages/StudentDashboardPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import DocumentationPage from './pages/DocumentationPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <IssueProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/docs" element={<DocumentationPage />} />

              {/* Protected Role-Based Routes */}
              <Route path="/student" element={<StudentDashboardPage />} />
              <Route path="/admin" element={<AdminDashboardPage />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </IssueProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
