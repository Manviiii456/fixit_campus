import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback(({ title, message, type = 'info', duration = 4000 }) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast = { id, title, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        removeToast(id);
      }, duration);
    }
  }, [removeToast]);

  const showSuccess = useCallback((message, title = 'Success') => {
    addToast({ title, message, type: 'success' });
  }, [addToast]);

  const showError = useCallback((message, title = 'Error') => {
    addToast({ title, message, type: 'error' });
  }, [addToast]);

  const showInfo = useCallback((message, title = 'Notice') => {
    addToast({ title, message, type: 'info' });
  }, [addToast]);

  const showWarning = useCallback((message, title = 'Attention') => {
    addToast({ title, message, type: 'warning' });
  }, [addToast]);

  return (
    <ToastContext.Provider value={{ addToast, showSuccess, showError, showInfo, showWarning, removeToast }}>
      {children}
      {/* Toast container floating at top right */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          let bgColor = 'bg-white';
          let borderColor = 'border-slate-200';
          let Icon = Info;
          let iconColor = 'text-blue-500';

          if (toast.type === 'success') {
            bgColor = 'bg-white';
            borderColor = 'border-emerald-300';
            Icon = CheckCircle2;
            iconColor = 'text-emerald-500';
          } else if (toast.type === 'error') {
            bgColor = 'bg-white';
            borderColor = 'border-rose-300';
            Icon = XCircle;
            iconColor = 'text-rose-500';
          } else if (toast.type === 'warning') {
            bgColor = 'bg-white';
            borderColor = 'border-amber-300';
            Icon = AlertCircle;
            iconColor = 'text-amber-500';
          }

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto p-4 rounded-xl border shadow-lg ${bgColor} ${borderColor} transition-all duration-300 flex items-start gap-3 transform translate-y-0`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 mt-0.5 ${iconColor}`} />
              <div className="flex-1 text-sm">
                {toast.title && <p className="font-semibold text-slate-800 leading-tight mb-0.5">{toast.title}</p>}
                <p className="text-slate-600 leading-relaxed text-xs">{toast.message}</p>
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

