import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Hash,
  Building,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Shield
} from 'lucide-react';
import Navbar from '../components/common/Navbar';
import JudgeDemoBanner from '../components/common/JudgeDemoBanner';
import { useAuth } from '../context/AuthContext';
import { useIssues } from '../context/IssueContext';
import { useToast } from '../context/ToastContext';

export default function RegisterPage() {
  const { registerStudent } = useAuth();
  const { refreshData } = useIssues();
  const { showSuccess, showError } = useToast();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    studentId: '',
    department: 'Computer Science & Engineering',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmittedSuccess, setIsSubmittedSuccess] = useState(false);
  const [registeredStudent, setRegisteredStudent] = useState(null);

  // Quick fill fictional test data
  const handleQuickFill = () => {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    setFormData({
      name: `Kavya Ramanathan`,
      email: `kavya.demo${randomId}@fixit.demo`,
      studentId: `STU-2025-${randomId}`,
      department: 'Computer Science & Engineering',
      password: 'StudentDemo123!',
      confirmPassword: 'StudentDemo123!'
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required.';
    else if (formData.name.trim().length < 3) newErrors.name = 'Name must be at least 3 characters.';

    if (!formData.email.trim()) newErrors.email = 'Campus email is required.';
    else if (!formData.email.includes('@') || !formData.email.includes('.')) {
      newErrors.email = 'Please provide a valid fictional campus email (e.g. name@fixit.demo).';
    }

    if (!formData.studentId.trim()) newErrors.studentId = 'Fictional student ID is required.';
    else if (formData.studentId.trim().length < 4) newErrors.studentId = 'Student ID is too short.';

    if (!formData.password) newErrors.password = 'Password is required.';
    else if (formData.password.length < 6) newErrors.password = 'Demo password must be at least 6 characters.';

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const res = registerStudent(formData);
    if (res.success) {
      refreshData();
      setIsSubmittedSuccess(true);
      setRegisteredStudent(res.student);
      showSuccess(
        'Registration submitted! Awaiting administrator approval.',
        'Registration Received'
      );
    } else {
      showError(res.error || 'Failed to submit registration.');
      setErrors({ form: res.error });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans selection:bg-campus-blue selection:text-white">
      <JudgeDemoBanner />
      <Navbar />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 my-6">
        <div className="max-w-lg w-full space-y-6">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-campus-blue text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Student Registration Flow</span>
            </div>
            <h2 className="text-2xl font-black text-campus-navy tracking-tight">
              Register Demo Student Account
            </h2>
            <p className="text-xs text-slate-500">
              New accounts require administrator approval before login is permitted.
            </p>
          </div>

          {/* Registration Success Screen */}
          {isSubmittedSuccess ? (
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-200 shadow-md space-y-6 animate-fadeIn">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Clock className="w-8 h-8 animate-pulse" />
              </div>

              <div className="text-center space-y-2">
                <h3 className="text-xl font-black text-slate-900">
                  Registration Received!
                </h3>
                <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs leading-relaxed font-semibold">
                  "Your registration has been submitted. Waiting for administrator approval."
                </div>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Student record for <strong className="text-slate-800">{registeredStudent?.name}</strong> has been saved locally with status <span className="text-amber-700 font-bold bg-amber-100 px-1 py-0.5 rounded">PENDING APPROVAL</span>.
                </p>
              </div>

              {/* Demo test helper */}
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px] block">
                  Next Step for Judges:
                </span>
                <p className="text-slate-600">
                  1. Log into the <strong className="text-slate-900">Admin Console</strong> (<code className="bg-slate-200 px-1 py-0.5 rounded">admin@fixit.demo</code>).
                  <br />
                  2. Open <strong className="text-slate-900">Student Management</strong> or <strong className="text-slate-900">Pending Registrations</strong>.
                  <br />
                  3. Click <strong className="text-emerald-700">Approve Student</strong> to unlock simulated OTP login.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <Link
                  to="/login?role=admin"
                  className="bg-campus-navy hover:bg-slate-800 text-white font-bold py-3 rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Shield className="w-4 h-4 text-amber-400" />
                  <span>Log in as Admin to Approve</span>
                </Link>

                <Link
                  to="/login?role=student"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-3 rounded-xl text-xs text-center transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Go to Student Login</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ) : (
            /* Registration Form */
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              {/* Quick Fill Button */}
              <div className="flex items-center justify-between p-3 bg-blue-50/60 rounded-xl border border-blue-100">
                <span className="text-xs text-blue-900 font-medium">Want to test registration quickly?</span>
                <button
                  type="button"
                  onClick={handleQuickFill}
                  className="bg-campus-blue hover:bg-blue-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                >
                  Auto-Fill Form
                </button>
              </div>

              {errors.form && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{errors.form}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="reg-name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-name"
                      type="text"
                      placeholder="e.g. Aarav Patel"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                        errors.name ? 'border-rose-400' : 'border-slate-300'
                      } rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all`}
                    />
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                  {errors.name && <p className="text-xs text-rose-500 mt-1">{errors.name}</p>}
                </div>

                {/* Fictional College Email */}
                <div>
                  <label htmlFor="reg-email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Fictional College Email <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-email"
                      type="email"
                      placeholder="studentname@fixit.demo"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                        errors.email ? 'border-rose-400' : 'border-slate-300'
                      } rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all`}
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  </div>
                  {errors.email && <p className="text-xs text-rose-500 mt-1">{errors.email}</p>}
                </div>

                {/* Student ID and Department */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reg-student-id" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Fictional Student ID <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-student-id"
                        type="text"
                        placeholder="e.g. STU-2025-0842"
                        value={formData.studentId}
                        onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                          errors.studentId ? 'border-rose-400' : 'border-slate-300'
                        } rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all`}
                      />
                      <Hash className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                    {errors.studentId && <p className="text-xs text-rose-500 mt-1">{errors.studentId}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg-department" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Department
                    </label>
                    <div className="relative">
                      <select
                        id="reg-department"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all"
                      >
                        <option value="Computer Science & Engineering">Computer Science & Eng</option>
                        <option value="Electronics & Communication">Electronics & Comm</option>
                        <option value="Mechanical Engineering">Mechanical Eng</option>
                        <option value="Information Science">Information Science</option>
                        <option value="Civil Engineering">Civil Eng</option>
                        <option value="General Academics">General Academics</option>
                      </select>
                      <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    </div>
                  </div>
                </div>

                {/* Password and Confirm Password */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="reg-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Demo Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-password"
                        type="password"
                        placeholder="••••••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                          errors.password ? 'border-rose-400' : 'border-slate-300'
                        } rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all`}
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                    {errors.password && <p className="text-xs text-rose-500 mt-1">{errors.password}</p>}
                  </div>

                  <div>
                    <label htmlFor="reg-confirm-password" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                      Confirm Password <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <input
                        id="reg-confirm-password"
                        type="password"
                        placeholder="••••••••••••"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className={`w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border ${
                          errors.confirmPassword ? 'border-rose-400' : 'border-slate-300'
                        } rounded-xl text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-campus-blue transition-all`}
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    </div>
                    {errors.confirmPassword && <p className="text-xs text-rose-500 mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500">
                  ⚠️ <strong>Notice:</strong> Never enter real passwords or actual personal phone numbers. This form is for local evaluation only.
                </div>

                <button
                  type="submit"
                  className="w-full bg-campus-navy hover:bg-campus-blue text-white font-bold py-3.5 rounded-xl shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Submit Demo Registration</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Back to login */}
              <div className="pt-4 border-t border-slate-100 text-center text-xs text-slate-500">
                <span>Already registered? </span>
                <Link
                  to="/login?role=student"
                  className="font-bold text-campus-blue hover:text-blue-700 underline underline-offset-2 ml-1"
                >
                  Sign in to student portal
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

