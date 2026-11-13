import React, { useState } from 'react';
import {
  BookOpen,
  Timer,
  CheckSquare,
  Compass,
  ShieldCheck,
  Code2,
  ArrowRight,
  Sparkles,
  FileText,
  Download,
  ExternalLink
} from 'lucide-react';
import { DOCUMENTS } from '../../data/documentsData';
import DocumentViewer from './DocumentViewer';

export default function DocumentationDashboard() {
  const [selectedDoc, setSelectedDoc] = useState(null);

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Timer': return <Timer className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
      case 'Code2': return <Code2 className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  // If a document is selected, render DocumentViewer
  if (selectedDoc) {
    return (
      <DocumentViewer
        doc={selectedDoc}
        onBack={() => setSelectedDoc(null)}
        onSelectDoc={(doc) => setSelectedDoc(doc)}
        allDocs={DOCUMENTS}
      />
    );
  }

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-campus-blue text-xs font-semibold border border-blue-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Hackathon Documentation Deliverables</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-campus-navy tracking-tight">
            FixIt Campus Documentation Hub
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Six comprehensive technical deliverables covering quickstart instructions, the 60-second judge runbook, test checklists, privacy disclosures, and architecture handoff notes.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-2xl">
          <FileText className="w-4 h-4 text-campus-blue" />
          <span>6 Complete Documents Available</span>
        </div>
      </div>

      {/* 2-Column Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {DOCUMENTS.map((doc) => (
          <div
            key={doc.id}
            onClick={() => setSelectedDoc(doc)}
            className={`bg-white rounded-3xl p-6 sm:p-7 border ${doc.cardAccent} shadow-xs hover:shadow-lg transition-all duration-200 flex flex-col justify-between group cursor-pointer transform hover:-translate-y-1`}
          >
            <div>
              {/* Card Header: Doc ID & Category Badge */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className={`text-xs font-black uppercase tracking-wider px-3 py-1 rounded-lg border ${doc.tagColor}`}>
                    {doc.id}
                  </span>
                  <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                    {doc.category}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 group-hover:text-campus-blue group-hover:bg-blue-50 transition-colors">
                  {getIcon(doc.iconName)}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-lg font-black text-slate-900 group-hover:text-campus-blue transition-colors mb-2">
                {doc.title}
              </h3>

              {/* Short Description */}
              <p className="text-xs text-slate-600 leading-relaxed line-clamp-3 mb-6">
                {doc.shortDescription}
              </p>
            </div>

            {/* Card Footer: Reading time & Action button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <span className="text-[11px] text-slate-400 font-medium">
                {doc.readingTime}
              </span>

              <button
                type="button"
                className="flex items-center gap-1.5 text-xs font-bold text-campus-navy group-hover:text-campus-blue transition-colors py-1 px-2 rounded-lg"
              >
                <span>View Document</span>
                <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

