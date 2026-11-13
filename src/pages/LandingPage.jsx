import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Wrench,
  Shield,
  User,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Zap,
  TrendingUp,
  Database,
  ThumbsUp,
  Smartphone,
  Check,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import JudgeDemoBanner from '../components/common/JudgeDemoBanner';
import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssueContext';

export default function LandingPage() {
  const { isAuthenticated, isAdmin, currentUser } = useAuth();
  const { stats, reports } = useIssues();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans selection:bg-campus-blue selection:text-white">
      {/* Top Hackathon Banner */}
      <JudgeDemoBanner />

      {/* Main Top Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-[#F5F7FB] to-[#F5F7FB] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto space-y-6">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-campus-blue text-xs font-bold tracking-wide uppercase shadow-xs">
              <Sparkles className="w-4 h-4 text-campus-blue" />
              <span>Campus Facility Prototype</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-campus-navy tracking-tight leading-tight">
              Report. Track. <span className="text-campus-blue">Improve.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-600 font-normal leading-relaxed max-w-2xl mx-auto">
              Making campus maintenance simpler, faster and more transparent. A modern facility reporting platform for students and administration.
            </p>

            {/* CTA Buttons */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isAuthenticated ? (
                <button
                  onClick={() => navigate(isAdmin ? '/admin' : '/student')}
                  className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-campus-navy hover:bg-campus-blue text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-blue-900/10 transition-all transform hover:-translate-y-0.5 cursor-pointer"
                >
                  <span>Open {isAdmin ? 'Admin Console' : 'Student Portal'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <>
                  <Link
                    to="/login?role=student"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-campus-blue hover:bg-blue-600 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-lg shadow-blue-500/20 transition-all transform hover:-translate-y-0.5"
                  >
                    <User className="w-4 h-4" />
                    <span>Student Login</span>
                  </Link>
                  <Link
                    to="/login?role=admin"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-campus-navy hover:bg-slate-800 text-white px-8 py-4 rounded-xl text-sm font-bold shadow-md transition-all transform hover:-translate-y-0.5"
                  >
                    <Shield className="w-4 h-4 text-blue-300" />
                    <span>Admin Console</span>
                  </Link>
                  <Link
                    to="/docs"
                    className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 hover:border-campus-blue px-6 py-4 rounded-xl text-sm font-bold shadow-sm transition-all"
                  >
                    <BookOpen className="w-4 h-4 text-campus-blue" />
                    <span>Documentation</span>
                  </Link>
                </>
              )}
            </div>

            {/* Trust Pills */}
            <div className="pt-4 flex items-center justify-center gap-6 text-xs text-slate-500 flex-wrap">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                100% Client-Side LocalStorage
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Zero External APIs or Cloud DB
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Works Offline In Browser
              </span>
            </div>
          </div>

          {/* Visual Preview of Dashboard */}
          <div className="mt-14 max-w-5xl mx-auto rounded-3xl p-3 bg-gradient-to-b from-slate-200 to-slate-300 shadow-2xl">
            <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-inner">
              {/* Browser window top bar mockup */}
              <div className="h-10 bg-slate-100 border-b border-slate-200 px-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-400" />
                  <div className="w-3 h-3 rounded-full bg-amber-400" />
                  <div className="w-3 h-3 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[11px] font-mono text-slate-500 bg-white px-4 py-1 rounded-md border border-slate-200">
                  https://fixit-campus.demo/student-dashboard
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                  Live Preview
                </div>
              </div>

              {/* Mockup Dashboard Content */}
              <div className="p-6 bg-[#F5F7FB] space-y-4">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-xs">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Total Reports</span>
                    <p className="text-xl font-black text-slate-900 mt-0.5">{stats.total}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-orange-200 bg-orange-50/20 shadow-xs">
                    <span className="text-[10px] font-bold text-orange-600 uppercase">Pending</span>
                    <p className="text-xl font-black text-orange-600 mt-0.5">{stats.pending}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-blue-200 bg-blue-50/20 shadow-xs">
                    <span className="text-[10px] font-bold text-blue-600 uppercase">In Progress</span>
                    <p className="text-xl font-black text-blue-600 mt-0.5">{stats.inProgress}</p>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/20 shadow-xs">
                    <span className="text-[10px] font-bold text-emerald-600 uppercase">Resolved</span>
                    <p className="text-xl font-black text-emerald-600 mt-0.5">{stats.resolved}</p>
                  </div>
                </div>

                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <div>
                      <p className="text-xs font-bold text-slate-800">
                        Classroom fan not working – Block A Room 302
                      </p>
                      <p className="text-[11px] text-slate-500">Reported by Aarav Patel • 14 student upvotes</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                    PENDING
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-bold text-campus-blue uppercase tracking-wider">Workflow</span>
            <h2 className="text-3xl font-extrabold text-campus-navy mt-1">How FixIt Campus Works</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              From discovering a campus maintenance fault to verified resolution in four steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center relative group hover:border-campus-blue transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-campus-blue font-black text-base flex items-center justify-center mx-auto mb-4 group-hover:bg-campus-blue group-hover:text-white transition-colors">
                1
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Spot & Report</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Students report broken fans, leaking taps, or damaged desks with category and location.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center relative group hover:border-campus-blue transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-campus-blue font-black text-base flex items-center justify-center mx-auto mb-4 group-hover:bg-campus-blue group-hover:text-white transition-colors">
                2
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Community Upvoting</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Peers upvote urgent issues to bring them to the top of the campus facilities queue.
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center relative group hover:border-campus-blue transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-campus-blue font-black text-base flex items-center justify-center mx-auto mb-4 group-hover:bg-campus-blue group-hover:text-white transition-colors">
                3
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Admin Triage</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Campus administration prioritizes tickets and assigns technicians (Pending → In Progress).
              </p>
            </div>

            <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 text-center relative group hover:border-campus-blue transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-campus-blue font-black text-base flex items-center justify-center mx-auto mb-4 group-hover:bg-campus-blue group-hover:text-white transition-colors">
                4
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">Local Sync & Close</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Status changes to Resolved with local synchronization audit trail recorded in LocalStorage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Core Feature Sections */}
      <section id="features" className="py-20 bg-[#F5F7FB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-xs font-bold text-campus-blue uppercase tracking-wider">Features</span>
            <h2 className="text-3xl font-extrabold text-campus-navy mt-1">Built For Modern Campus Facilities</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-campus-blue flex items-center justify-center">
                  <Zap className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">1. Report Campus Issues</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Intuitive form for electrical, plumbing, classroom, washroom, cleaning, and furniture complaints. Includes local image preview without any cloud upload.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>9 Campus categories supported</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Instant unique Report ID generation</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">2. Track Every Update</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Clear visual progress timeline: Reported → Pending → In Progress → Resolved. Complete audit history of timestamped administrative status changes.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>4-Step visual progress timeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Single-vote fraud prevention</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">3. Build a Better Campus</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Empower college administrators with student registration gating, priority allocation (Low to Urgent), and one-click local database synchronization.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6">
                <ul className="text-xs text-slate-500 space-y-2">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Admin registration approval gating</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-500" />
                    <span>Simulated 6-digit OTP verification</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Judge Verification Test Callout */}
      <section id="judge-flow" className="py-16 bg-campus-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-900/90 rounded-3xl p-8 border border-slate-800 shadow-xl">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Judge Inspection</span>
                <h3 className="text-2xl font-black text-white mt-1">Compulsory 3-Step Verification Test</h3>
                <p className="text-xs text-slate-400 mt-1">
                  How to test the persistence and local synchronization capabilities of FixIt Campus.
                </p>
              </div>
              <Link
                to="/login?role=student"
                className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold px-6 py-3 rounded-xl text-xs transition-colors flex items-center gap-2"
              >
                <span>Start Test Flow</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <span className="text-xs font-bold text-blue-400 uppercase">Step 1</span>
                <h4 className="text-sm font-bold text-white mt-1">Create an Issue</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Submit a complaint via Student Portal. Notice its sync status is <strong className="text-amber-300">PENDING SYNC</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <span className="text-xs font-bold text-blue-400 uppercase">Step 2</span>
                <h4 className="text-sm font-bold text-white mt-1">Refresh Browser</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Reload the tab. The newly created report survives in LocalStorage and remains <strong className="text-amber-300">PENDING SYNC</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/80">
                <span className="text-xs font-bold text-blue-400 uppercase">Step 3</span>
                <h4 className="text-sm font-bold text-white mt-1">Click "SYNC LOCALLY"</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Click the Sync button in Admin Console. Notice sync status changes to <strong className="text-emerald-400">SYNCED LOCALLY</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-campus-navy text-white flex items-center justify-center font-bold text-xs">
              <Wrench className="w-3.5 h-3.5 text-blue-400" />
            </div>
            <span className="font-bold text-slate-800">FixIt Campus</span>
            <span>• Full-Stack-Free Campus Prototype</span>
          </div>

          <p className="text-slate-400 text-center sm:text-right">
            FixIt Campus • 100% Client-Side LocalStorage • Fictional Demo Data
          </p>
        </div>
      </footer>
    </div>
  );
}
