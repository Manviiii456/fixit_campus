import React from 'react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export default function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'primary', // 'primary' | 'danger' | 'success'
  onConfirm,
  onCancel
}) {
  if (!isOpen) return null;

  const typeConfig = {
    danger: {
      btnBg: 'bg-rose-600 hover:bg-rose-700 text-white',
      iconBg: 'bg-rose-100 text-rose-600',
      icon: AlertTriangle
    },
    success: {
      btnBg: 'bg-emerald-600 hover:bg-emerald-700 text-white',
      iconBg: 'bg-emerald-100 text-emerald-600',
      icon: CheckCircle2
    },
    primary: {
      btnBg: 'bg-campus-navy hover:bg-campus-blue text-white',
      iconBg: 'bg-blue-100 text-blue-600',
      icon: AlertTriangle
    }
  };

  const config = typeConfig[type] || typeConfig.primary;
  const Icon = config.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-slate-200 overflow-hidden animate-fadeIn p-6">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${config.iconBg}`}>
            <Icon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <h3 className="text-base font-bold text-slate-900 mb-1">{title}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors shadow-xs ${config.btnBg}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

