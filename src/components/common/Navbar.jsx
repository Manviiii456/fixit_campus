import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Wrench, Shield, User, ArrowRight, LayoutDashboard, LogOut, BookOpen } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { currentUser, isAuthenticated, isStudent, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-xl bg-campus-navy flex items-center justify-center text-white shadow-md group-hover:bg-campus-blue transition-colors">
            <Wrench className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-xl tracking-tight text-campus-navy">FixIt</span>
              <span className="font-extrabold text-xl tracking-tight text-campus-blue">Campus</span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase -mt-1">Campus Facilities Portal</p>
          </div>
        </Link>

        {/* Center navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link to="/" className="hover:text-campus-blue transition-colors">Home</Link>
          <a href="#features" className="hover:text-campus-blue transition-colors">Features</a>
          <a href="#how-it-works" className="hover:text-campus-blue transition-colors">How It Works</a>
          <a href="#judge-flow" className="hover:text-campus-blue transition-colors">Judge Verification</a>
          <Link to="/docs" className="flex items-center gap-1 text-campus-blue hover:text-blue-700 font-semibold transition-colors">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Documentation</span>
          </Link>
        </nav>

        {/* Right action controls */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate(isAdmin ? '/admin' : '/student')}
                className="flex items-center gap-2 bg-campus-navy hover:bg-campus-blue text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all cursor-pointer"
              >
                <LayoutDashboard className="w-4 h-4" />
                <span>Go to {isAdmin ? 'Admin Console' : 'Student Portal'}</span>
              </button>

              <button
                onClick={logout}
                className="flex items-center gap-1.5 text-slate-600 hover:text-rose-600 px-3 py-2 rounded-lg text-sm font-medium transition-colors border border-slate-200 hover:border-rose-200 cursor-pointer"
                title="Sign out"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                to="/login?role=student"
                className="flex items-center gap-1.5 text-slate-700 hover:text-campus-blue px-3.5 py-2 rounded-lg text-sm font-medium hover:bg-slate-100 transition-colors"
              >
                <User className="w-4 h-4 text-campus-blue" />
                <span>Student Login</span>
              </Link>
              <Link
                to="/login?role=admin"
                className="flex items-center gap-1.5 bg-campus-navy hover:bg-campus-blue text-white px-4 py-2 rounded-lg text-sm font-medium shadow-sm transition-all"
              >
                <Shield className="w-4 h-4 text-blue-300" />
                <span>Admin Login</span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
