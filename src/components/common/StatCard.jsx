import React from 'react';

export default function StatCard({ title, value, subtitle, icon: Icon, color = 'blue', onClick }) {
  const colorMap = {
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-100',
      borderHover: 'hover:border-orange-300',
      badge: 'bg-orange-100 text-orange-800'
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-100',
      borderHover: 'hover:border-blue-300',
      badge: 'bg-blue-100 text-blue-800'
    },
    green: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-100',
      borderHover: 'hover:border-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-100',
      borderHover: 'hover:border-purple-300',
      badge: 'bg-purple-100 text-purple-800'
    },
    slate: {
      bg: 'bg-slate-50',
      text: 'text-slate-700',
      border: 'border-slate-200',
      borderHover: 'hover:border-slate-300',
      badge: 'bg-slate-100 text-slate-800'
    }
  };

  const scheme = colorMap[color] || colorMap.blue;

  return (
    <div
      onClick={onClick}
      className={`bg-white rounded-2xl p-5 border ${scheme.border} ${
        onClick ? 'cursor-pointer hover:shadow-md ' + scheme.borderHover : 'shadow-xs'
      } transition-all duration-200 flex flex-col justify-between`}
    >
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</span>
        <div className={`w-10 h-10 rounded-xl ${scheme.bg} flex items-center justify-center ${scheme.text}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-slate-900 tracking-tight">{value}</span>
        </div>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );
}

