import React from 'react';
import Navbar from '../components/common/Navbar';
import JudgeDemoBanner from '../components/common/JudgeDemoBanner';
import DocumentationDashboard from '../components/docs/DocumentationDashboard';

export default function DocumentationPage() {
  return (
    <div className="min-h-screen bg-[#F5F7FB] flex flex-col font-sans selection:bg-campus-blue selection:text-white">
      <JudgeDemoBanner />
      <Navbar />

      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto my-4">
        <DocumentationDashboard />
      </main>

      <footer className="bg-white border-t border-slate-200 py-6 text-xs text-slate-400 text-center">
        FixIt Campus Documentation Hub • 6 Technical Deliverables Integrated
      </footer>
    </div>
  );
}

