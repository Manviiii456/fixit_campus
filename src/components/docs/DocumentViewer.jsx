import React, { useState } from 'react';
import {
  ArrowLeft,
  Copy,
  Check,
  BookOpen,
  Timer,
  CheckSquare,
  Compass,
  ShieldCheck,
  Code2,
  FileText,
  Printer,
  ChevronRight,
  ChevronLeft
} from 'lucide-react';

export default function DocumentViewer({ doc, onBack, onSelectDoc, allDocs }) {
  const [copied, setCopied] = useState(false);

  if (!doc) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(doc.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const currentIndex = allDocs.findIndex(d => d.id === doc.id);
  const prevDoc = currentIndex > 0 ? allDocs[currentIndex - 1] : null;
  const nextDoc = currentIndex < allDocs.length - 1 ? allDocs[currentIndex + 1] : null;

  // Render markdown line-by-line / section-by-section cleanly
  const renderFormattedContent = (markdownText) => {
    if (!markdownText) return null;

    const lines = markdownText.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeBuffer = [];
    let inTable = false;
    let tableBuffer = [];

    const flushTable = (buffer, key) => {
      if (buffer.length === 0) return null;
      const headerRow = buffer[0];
      const dataRows = buffer.slice(2); // Skip separator row

      const parseCells = (row) =>
        row
          .split('|')
          .slice(1, -1)
          .map((c) => c.trim());

      const headers = parseCells(headerRow);

      return (
        <div key={key} className="my-5 overflow-x-auto rounded-xl border border-slate-200 shadow-xs">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
              <tr>
                {headers.map((h, i) => (
                  <th key={i} className="px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {dataRows.map((r, ri) => {
                const cells = parseCells(r);
                return (
                  <tr key={ri} className="hover:bg-slate-50 transition-colors">
                    {cells.map((c, ci) => {
                      const isPass = c.includes('[x] PASS') || c.includes('PASS');
                      return (
                        <td key={ci} className="px-4 py-3">
                          {isPass ? (
                            <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full text-[11px]">
                              ✓ PASS
                            </span>
                          ) : (
                            c
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      );
    };

    lines.forEach((line, index) => {
      // Code block toggle
      if (line.startsWith('```')) {
        if (inCodeBlock) {
          elements.push(
            <pre key={`code-${index}`} className="bg-slate-900 text-slate-100 p-4 rounded-xl text-xs font-mono overflow-x-auto my-4 border border-slate-800 shadow-inner">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
          codeBuffer = [];
          inCodeBlock = false;
        } else {
          inCodeBlock = true;
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      // Tables
      if (line.startsWith('|')) {
        inTable = true;
        tableBuffer.push(line);
        return;
      } else if (inTable) {
        elements.push(flushTable(tableBuffer, `table-${index}`));
        tableBuffer = [];
        inTable = false;
      }

      // Headings
      if (line.startsWith('# ')) {
        elements.push(
          <h1 key={index} className="text-2xl sm:text-3xl font-black text-campus-navy tracking-tight mt-6 mb-3 border-b border-slate-200 pb-3">
            {line.replace('# ', '')}
          </h1>
        );
      } else if (line.startsWith('## ')) {
        elements.push(
          <h2 key={index} className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-8 mb-3 flex items-center gap-2">
            <span className="w-1.5 h-6 rounded-full bg-campus-blue inline-block" />
            <span>{line.replace('## ', '')}</span>
          </h2>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h3 key={index} className="text-base sm:text-lg font-bold text-slate-800 tracking-tight mt-5 mb-2">
            {line.replace('### ', '')}
          </h3>
        );
      } else if (line.startsWith('> ')) {
        // Blockquote
        elements.push(
          <blockquote key={index} className="p-4 rounded-xl bg-blue-50/70 border-l-4 border-campus-blue text-xs sm:text-sm text-blue-950 font-medium my-4 leading-relaxed">
            {line.replace('> ', '')}
          </blockquote>
        );
      } else if (line.startsWith('- ') || line.startsWith('* ')) {
        // Bullet list
        elements.push(
          <li key={index} className="text-xs sm:text-sm text-slate-600 ml-4 list-disc my-1 leading-relaxed">
            {line.substring(2)}
          </li>
        );
      } else if (/^\d+\.\s/.test(line)) {
        // Numbered list
        elements.push(
          <li key={index} className="text-xs sm:text-sm text-slate-600 ml-4 list-decimal my-1.5 leading-relaxed font-medium">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      } else if (line.trim() === '---') {
        elements.push(<hr key={index} className="my-6 border-slate-200" />);
      } else if (line.trim() !== '') {
        elements.push(
          <p key={index} className="text-xs sm:text-sm text-slate-600 leading-relaxed my-2.5">
            {line}
          </p>
        );
      }
    });

    if (inTable && tableBuffer.length > 0) {
      elements.push(flushTable(tableBuffer, `table-end`));
    }

    return elements;
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
      {/* Top Bar Navigation */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex items-center justify-between gap-4 flex-wrap">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-campus-blue bg-slate-100 hover:bg-slate-200 px-4 py-2.5 rounded-xl transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Documentation</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-campus-blue bg-white border border-slate-300 hover:border-campus-blue px-3.5 py-2 rounded-xl transition-all shadow-xs cursor-pointer"
            title="Copy markdown text"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? 'Copied to Clipboard' : 'Copy Content'}</span>
          </button>
        </div>
      </div>

      {/* Main Document Body */}
      <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-4">
        {/* Document Header Metadata */}
        <div className="pb-6 border-b border-slate-100 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-black uppercase tracking-wider px-2.5 py-1 rounded-md border ${doc.tagColor}`}>
                {doc.id}
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-1 rounded-md">
                {doc.category}
              </span>
              <span className="text-xs text-slate-400 font-medium hidden sm:inline">
                • {doc.readingTime}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-campus-navy tracking-tight">
              {doc.title}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
              {doc.shortDescription}
            </p>
          </div>
        </div>

        {/* Formatted Content */}
        <div className="pt-2 font-sans">
          {renderFormattedContent(doc.content)}
        </div>

        {/* Footer Previous / Next Navigation */}
        <div className="pt-8 mt-8 border-t border-slate-200 flex items-center justify-between gap-4 flex-wrap">
          {prevDoc ? (
            <button
              onClick={() => onSelectDoc(prevDoc)}
              className="flex items-center gap-2 text-left p-3 rounded-xl border border-slate-200 hover:border-campus-blue bg-slate-50 hover:bg-blue-50/40 transition-all max-w-xs group cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5 text-slate-400 group-hover:text-campus-blue" />
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Previous Document</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-campus-blue truncate block">
                  {prevDoc.id}: {prevDoc.title}
                </span>
              </div>
            </button>
          ) : <div />}

          {nextDoc ? (
            <button
              onClick={() => onSelectDoc(nextDoc)}
              className="flex items-center gap-2 text-right p-3 rounded-xl border border-slate-200 hover:border-campus-blue bg-slate-50 hover:bg-blue-50/40 transition-all max-w-xs ml-auto group cursor-pointer"
            >
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase block">Next Document</span>
                <span className="text-xs font-bold text-slate-800 group-hover:text-campus-blue truncate block">
                  {nextDoc.id}: {nextDoc.title}
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-campus-blue" />
            </button>
          ) : <div />}
        </div>
      </article>
    </div>
  );
}

