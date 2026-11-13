import React, { useState } from 'react';
import { UserCheck, Check, X, Mail, Hash, Building, Clock, AlertCircle } from 'lucide-react';
import ConfirmationModal from '../common/ConfirmationModal';
import { useIssues } from '../../context/IssueContext';
import { formatDate } from '../../utils/formatters';

export default function PendingRegistrations() {
  const { students, approveStudent, rejectStudent } = useIssues();

  const pendingStudents = students.filter((s) => s.approvalStatus === 'PENDING APPROVAL');

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    student: null,
    action: null
  });

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

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-extrabold text-slate-900">Pending Student Registrations</h2>
            <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {pendingStudents.length} Awaiting Review
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Students cannot log in until an administrator reviews and approves their registration here.
          </p>
        </div>
      </div>

      {/* List of Pending Cards */}
      {pendingStudents.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
            <UserCheck className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-800">No Pending Student Registrations</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            All submitted student accounts have been reviewed and approved or rejected.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {pendingStudents.map((student) => (
            <div
              key={student.id + student.email}
              className="bg-white rounded-2xl border border-amber-200/80 p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black text-sm">
                      {student.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-slate-900">{student.name}</h4>
                      <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                        <span>{student.email}</span>
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-600 animate-pulse" />
                    Pending
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-xl border border-slate-100 mb-4">
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Student ID</span>
                    <span className="font-mono font-semibold text-slate-800">{student.id}</span>
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase block">Department</span>
                    <span className="font-semibold text-slate-800 truncate block">{student.department}</span>
                  </div>
                  <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                    <span>Submitted:</span>
                    <span>{formatDate(student.registeredAt)}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
                <button
                  onClick={() => handleOpenConfirm(student, 'APPROVE')}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-xs transition-colors cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve Student</span>
                </button>

                <button
                  onClick={() => handleOpenConfirm(student, 'REJECT')}
                  className="bg-slate-100 hover:bg-rose-50 text-slate-600 hover:text-rose-600 font-semibold px-4 py-2 rounded-xl text-xs border border-slate-200 hover:border-rose-200 transition-colors flex items-center gap-1 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={confirmModal.isOpen}
        title={confirmModal.action === 'APPROVE' ? 'Approve Student Account?' : 'Reject Student Account?'}
        message={
          confirmModal.action === 'APPROVE'
            ? `Authorize student "${confirmModal.student?.name}" (${confirmModal.student?.email}) to log in and use FixIt Campus?`
            : `Reject registration for "${confirmModal.student?.name}"?`
        }
        confirmText={confirmModal.action === 'APPROVE' ? 'Approve Account' : 'Reject Account'}
        type={confirmModal.action === 'APPROVE' ? 'success' : 'danger'}
        onConfirm={handleConfirmAction}
        onCancel={() => setConfirmModal({ isOpen: false, student: null, action: null })}
      />
    </div>
  );
}

