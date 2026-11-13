import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Wrench,
  Shield,
  User,
  KeyRound,
  Mail,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  RefreshCw,
  Info,
  Lock,
  BookOpen
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import JudgeDemoBanner from '../components/common/JudgeDemoBanner';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function LoginPage() {
  const [searchParams] = useSearchParams();
  const initialRole = searchParams.get('role') === 'admin' ? 'admin' : 'student';

  const [activeTab, setActiveTab] = useState(initialRole); // 'student' | 'admin'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [statusNotice, setStatusNotice] = useState(null);

  const {
    currentUser,
    isAuthenticated,
    loginAdmin,
    initiateStudentLogin,
    pendingOtpSession,
    activeOtpInfo,
    otpCooldown,
    resendDemoOTP,
    completeStudentOTP,
    cancelOtpFlow
  } = useAuth();

  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  // If already authenticated, redirect to appropriate dashboard
  useEffect(() => {
    if (isAuthenticated) {
      if (currentUser?.role === 'ADMIN') {
        navigate('/admin');
      } else {
        navigate('/student');
      }
    }
  }, [isAuthenticated, currentUser, navigate]);

  // Sync tab from URL query param
  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'admin') setActiveTab('admin');
    else if (roleParam === 'student') setActiveTab('student');
  }, [searchParams]);

  // Quick fill demo credentials for judges
  const handleQuickFillAdmin = () => {
    setActiveTab('admin');
    setEmail('admin@fixit.demo');
    setPassword('AdminDemo123!');
    setErrorMessage('');
    setStatusNotice(null);
  };

  const handleQuickFillStudent = (studentEmail = 'student@fixit.demo') => {
    setActiveTab('student');
    setEmail(studentEmail);
    setPassword('StudentDemo123!');
    setErrorMessage('');
    setStatusNotice(null);
  };

  // Handle standard login submission
  const handleSubmitLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setStatusNotice(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both campus email and password.');
      return;
    }

    if (activeTab === 'admin') {
      const res = loginAdmin(email, password);
      if (res.success) {
        showSuccess('Welcome back, Administrator!', 'Admin Login Successful');
        navigate('/admin');
      } else {
        setErrorMessage(res.error);
      }
    } else {
      // Student login
      const res = initiateStudentLogin(email, password);
      if (res.success && res.requiresOtp) {
        showSuccess('Credentials verified. Please enter the simulated OTP.', 'Step 2: OTP Verification');
      } else {
        setErrorMessage(res.error);
        if (res.requiresApproval) {
          setStatusNotice({
            type: 'pending',
            title: 'Registration Pending Approval',
            message: res.error,
            adminActionPrompt: true
          });
        } else if (res.rejected) {
          setStatusNotice({
            type: 'rejected',
            title: 'Account Rejected',
            message: res.error
          });
        }
      }
    }
  };

  // Handle OTP verification submission
  const handleVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!enteredOtp.trim()) {
      setErrorMessage('Please enter the 6-digit verification code.');
      return;
    }

    const res = completeStudentOTP(enteredOtp);
    if (res.success) {
      showSuccess(`Welcome to FixIt Campus, ${res.user.name}!`, 'Verification Successful');
      navigate('/student');
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans relative selection:bg-campus-blue selection:text-white overflow-hidden">
      {/* College Campus Background Image with transparency overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none"
        style={{ backgroundImage: `url('/campus-bg.jpg')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#F5F7FB]/70 via-[#F5F7FB]/85 to-[#F5F7FB]/95 pointer-events-none" />

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <JudgeDemoBanner />
        <Navbar />

        <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
          <div className="max-w-md w-full space-y-6">
            {/* Header Card */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-campus-blue text-xs font-semibold backdrop-blur-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Simulated Campus Authentication</span>
              </div>
              <h2 className="text-2xl font-black text-campus-navy tracking-tight">
                Sign In to FixIt Campus
              </h2>
              <p className="text-xs text-slate-500">
                Role-separated access with LocalStorage session persistence.
              </p>
            </div>

            {/* Quick Demo Credential Buttons for Judges */}
            <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 border border-slate-200 shadow-xs space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-campus-blue" />
                  Judge 1-Click Demo Logins
                </span>
                <span className="text-[10px] text-slate-400">Pre-seeded</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleQuickFillAdmin}
                  className="text-left p-2.5 rounded-xl border border-amber-200 bg-amber-50/60 hover:bg-amber-100/70 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                    <Shield className="w-3.5 h-3.5 text-amber-600" />
                    <span>Admin Demo</span>
                  </div>
                  <p className="text-[10px] text-amber-800/80 truncate mt-0.5">admin@fixit.demo</p>
                </button>

                <button
                  type="button"
                  onClick={() => handleQuickFillStudent('student@fixit.demo')}
                  className="text-left p-2.5 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/70 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-900">
                    <User className="w-3.5 h-3.5 text-campus-blue" />
                    <span>Student Demo</span>
                  </div>
                  <p className="text-[10px] text-blue-800/80 truncate mt-0.5">student@fixit.demo</p>
                </button>
              </div>
            </div>

            {/* If Pending OTP Verification: Show Simulated OTP Panel */}
            {pendingOtpSession ? (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-blue-200 shadow-md space-y-6 animate-fadeIn">
                <div className="text-center space-y-1">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 text-campus-blue flex items-center justify-center mx-auto mb-2">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">Simulated Demo OTP Verification</h3>
                  <p className="text-xs text-slate-500">
                    Verifying account for <strong className="text-slate-800">{pendingOtpSession.student.name}</strong>
                  </p>
                </div>

                {/* Clearly Marked Demo-Only Verification Panel */}
                <div className="p-4 rounded-2xl bg-amber-50 border-2 border-dashed border-amber-300 text-amber-950 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-amber-800 flex items-center gap-1">
                      <Shield className="w-3.5 h-3.5 text-amber-600" />
                      DEMO-ONLY SIMULATED OTP PANEL
                    </span>
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
                      5 min expiry
                    </span>
                  </div>
                  <p className="text-xs text-amber-900 leading-snug">
                    * No real email was sent (offline mini-hackathon rule). Your generated 6-digit demo verification code is:
                  </p>
                  <div className="bg-white py-2.5 px-4 rounded-xl border border-amber-300 text-center font-mono font-black text-2xl tracking-widest text-slate-900 shadow-xs">
                    {activeOtpInfo?.code || '------'}
                  </div>
                  <p className="text-[10px] text-amber-800/80 italic text-center">
                    Copy and enter this code below to complete the simulated verification.
                  </p>
                </div>

                {/* OTP Form */}
                <form onSubmit={handleVerifyOtp} className="space-y-4">
                  <div>
                    <label htmlFor="otp-input" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 text-center">
                      Enter 6-Digit Code
                    </label>
                    <input
                      id="otp-input"
                      type="text"
                      maxLength={6}
                      placeholder="e.g. 123456"
                      value={enteredOtp}
                      onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                      className="w-full text-center text-2xl font-mono font-bold tracking-widest py-3 bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all"
                      autoFocus
                    />
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-campus-navy hover:bg-campus-blue text-white font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Verify Code & Sign In</span>
                  </button>
                </form>

                {/* Resend & Cancel Controls */}
                <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={cancelOtpFlow}
                    className="text-slate-500 hover:text-slate-700 font-semibold cursor-pointer"
                  >
                    Cancel / Change Login
                  </button>

                  <button
                    type="button"
                    onClick={resendDemoOTP}
                    disabled={otpCooldown > 0}
                    className={`font-semibold flex items-center gap-1 ${
                      otpCooldown > 0 ? 'text-slate-400 cursor-not-allowed' : 'text-campus-blue hover:text-blue-700 cursor-pointer'
                    }`}
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${otpCooldown > 0 ? '' : 'text-campus-blue'}`} />
                    <span>{otpCooldown > 0 ? `Resend code in ${otpCooldown}s` : 'Resend Demo Code'}</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Standard Login Form */
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                {/* Role Selection Tabs */}
                <div className="grid grid-cols-2 p-1.5 bg-slate-100/90 rounded-2xl">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('student');
                      setErrorMessage('');
                      setStatusNotice(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'student'
                        ? 'bg-white text-campus-navy shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Student Login</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('admin');
                      setErrorMessage('');
                      setStatusNotice(null);
                    }}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      activeTab === 'admin'
                        ? 'bg-campus-navy text-white shadow-sm'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Shield className="w-4 h-4" />
                    <span>Admin Login</span>
                  </button>
                </div>

                {/* Notice Banner (e.g. Pending Approval) */}
                {statusNotice && (
                  <div className={`p-4 rounded-2xl border text-xs space-y-2 ${
                    statusNotice.type === 'pending'
                      ? 'bg-amber-50 border-amber-200 text-amber-900'
                      : 'bg-rose-50 border-rose-200 text-rose-900'
                  }`}>
                    <div className="flex items-center gap-2 font-bold">
                      <AlertCircle className="w-4 h-4 text-amber-600" />
                      <span>{statusNotice.title}</span>
                    </div>
                    <p className="leading-relaxed">{statusNotice.message}</p>

                    {statusNotice.adminActionPrompt && (
                      <div className="pt-2 border-t border-amber-200/80 flex items-center justify-between">
                        <span className="text-[11px] font-semibold text-amber-800">
                          Want to test approval flow?
                        </span>
                        <button
                          type="button"
                          onClick={handleQuickFillAdmin}
                          className="bg-campus-navy hover:bg-slate-800 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer"
                        >
                          Switch to Admin Login →
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* Main Credentials Form */}
                <form onSubmit={handleSubmitLogin} className="space-y-4">
                  <div>
                    <label htmlFor="login-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      {activeTab === 'admin' ? 'Admin Email' : 'Campus Email Address'}
                    </label>
                    <div className="relative">
                      <input
                        id="login-email"
                        type="email"
                        placeholder={activeTab === 'admin' ? 'admin@fixit.demo' : 'student@fixit.demo'}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label htmlFor="login-password" className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Password
                      </label>
                      <span className="text-[11px] text-slate-400">
                        {activeTab === 'admin' ? 'AdminDemo123!' : 'StudentDemo123!'}
                      </span>
                    </div>
                    <div className="relative">
                      <input
                        id="login-password"
                        type="password"
                        placeholder="••••••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                  </div>

                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    className={`w-full font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 ${
                      activeTab === 'admin'
                        ? 'bg-campus-navy hover:bg-slate-800 text-white'
                        : 'bg-campus-blue hover:bg-blue-600 text-white'
                    }`}
                  >
                    <span>{activeTab === 'admin' ? 'Sign In as Administrator' : 'Continue to Verification'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Registration Link for students */}
                <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                  <span>New student? </span>
                  <Link
                    to="/register"
                    className="font-bold text-campus-blue hover:text-blue-700 underline underline-offset-2 ml-1"
                  >
                    Register as a student
                  </Link>
                </div>
              </div>
            )}

            {/* Disclaimer */}
            <p className="text-center text-[11px] text-slate-500 leading-relaxed max-w-sm mx-auto">
              FixIt Campus is a campus facility management prototype. Authentication is simulated locally using LocalStorage. Never input real personal passwords.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
