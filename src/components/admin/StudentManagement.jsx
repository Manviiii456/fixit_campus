import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Mail,
  Hash,
  Building,
  Check,
  X
} from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';
import { useIssues } from '../../context/IssueContext';
import { formatDate } from '../../utils/formatters';

export default function StudentManagement() {
  const { students, approveStudent, rejectStudent } = useIssues();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  
  // Confirmation modal state
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    student: null,
    action: null // 'APPROVE' | 'REJECT'
  });

  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const mName = s.name.toLowerCase().includes(q);
        const mEmail = s.email.toLowerCase().includes(q);
        const mId = s.id.toLowerCase().includes(q);
        const mDept = s.department?.toLowerCase().includes(q);
        if (!mName && !mEmail && !mId && !mDept) return false;
      }
      if (statusFilter && s.approvalStatus !== statusFilter) {
        return false;
      }
      return true;
    });
  }, [students, searchQuery, statusFilter]);

  const handleOpenConfirm = (student, action) => {
    setConfirmModal({
      isOpen: true,
      student,
      action
    });
  };

  const handleConfirmAction = () => {
    if (!confirmModal.student || !confirmModal.action) return;

    if (confirmModal.action === 'APPROVE') {
      approveStudent(confirmModal.student.email);
    } else if (confirmModal.action === 'REJECT') {
      rejectStudent(confirmModal.student.email);
    }

    setConfirmModal({ isOpen: false, student: null, action: null });
  };

  const getApprovalBadge = (status) => {
    switch (status) {
      case 'APPROVED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            Approved
          </span>
        );
      case 'REJECTED':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-50 text-rose-700 border border-rose-200">
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
            Rejected
          </span>
        );
      case 'PENDING APPROVAL':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
            Pending Approval
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Page Title */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">Student Access Management</h2>
          <p className="text-xs text-slate-500">
            Review student registrations, authorize portal access, or reject unauthorized accounts.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search students by name, ID (e.g. STU-2025-0842), email or department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-2.5 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div className="w-full sm:w-64">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
          >
            <option value="">All Statuses</option>
            <option value="PENDING APPROVAL">Pending Approval Only</option>
            <option value="APPROVED">Approved Only</option>
            <option value="REJECTED">Rejected Only</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-600">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="px-5 py-3.5">Student Details</th>
                <th className="px-4 py-3.5">Student ID</th>
                <th className="px-4 py-3.5">Department</th>
                <th className="px-4 py-3.5">Registered Date</th>
                <th className="px-4 py-3.5">Approval Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-4 py-10 text-center text-slate-400">
                    No students found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((student) => (
                  <tr key={student.id + student.email} className="hover:bg-slate-50 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-blue-100 text-campus-blue flex items-center justify-center font-bold text-xs flex-shrink-0">
                          {student.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-slate-900 text-sm">{student.name}</p>
                          <p className="text-slate-400 text-xs flex items-center gap-1">
                            <Mail className="w-3 h-3 text-slate-400" />
                            <span>{student.email}</span>
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5 font-mono font-bold text-slate-700">
                      {student.id}
                    </td>

                    <td className="px-4 py-3.5 text-slate-600">
                      {student.department || 'General Academics'}
                    </td>

                    <td className="px-4 py-3.5 text-slate-400 whitespace-nowrap">
                      {formatDate(student.registeredAt)}
                    </td>

                    <td className="px-4 py-3.5 whitespace-nowrap">
                      {getApprovalBadge(student.approvalStatus)}
                    </td>

                    <td className="px-5 py-3.5 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-2">
                        {student.approvalStatus !== 'APPROVED' && (
                          <button
                            onClick={() => handleOpenConfirm(student, 'APPROVE')}
                            className="flex items-center gap-1 bg-emerald-50 hover:bg-emerald-600 text-emerald-700 hover:text-white border border-emerald-300 hover:border-emerald-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                            title="Approve student login"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Approve</span>
                          </button>
                        )}

                        {student.approvalStatus !== 'REJECTED' && (
                          <button
                            onClick={() => handleOpenConfirm(student, 'REJECT')}
                            className="flex items-center gap-1 bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white border border-rose-300 hover:border-rose-600 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs cursor-pointer"
                            title="Reject student account"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Reject</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.action === 'APPROVE' ? 'Approve Student Account?' : 'Reject Student Account?'}
        message={
          confirmModal.action === 'APPROVE'
            ? `Are you sure you want to approve "${confirmModal.student?.name}" (${confirmModal.student?.email})? Once approved, the student can sign in and complete the simulated demo OTP verification.`
            : `Are you sure you want to reject registration for "${confirmModal.student?.name}"? The student will be blocked from logging in until re-approved.`
        }
        confirmText={confirmModal.action === 'APPROVE' ? 'Yes, Approve Student' : 'Yes, Reject Student'}
        type={confirmModal.action === 'APPROVE' ? 'success' : 'danger'}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, student: null, action: null })}
      />
    </div>
  );
}

