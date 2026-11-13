import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  ArrowUpDown,
  Tag,
  MapPin,
  CheckCircle2,
  RefreshCw,
  PlusCircle,
  X
} from 'lucide-react';
import IssueCard from '../common/IssueCard';
import { CATEGORIES, STATUSES } from '../../utils/sampleData';
import { useIssues } from '../../context/IssueContext';

export default function AllCampusIssues({ onViewDetails, onNavigateReport }) {
  const { reports } = useIssues();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');
  const [sortBy, setSortBy] = useState('newest'); // 'newest' | 'upvotes'

  // Extract distinct locations for filter dropdown
  const uniqueLocations = useMemo(() => {
    const locs = reports.map((r) => r.location).filter(Boolean);
    return Array.from(new Set(locs));
  }, [reports]);

  // Filtering and sorting logic
  const filteredReports = useMemo(() => {
    return reports
      .filter((report) => {
        // Search by title or ID or description
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase().trim();
          const matchTitle = report.title.toLowerCase().includes(query);
          const matchId = report.id.toLowerCase().includes(query);
          const matchDesc = report.description.toLowerCase().includes(query);
          if (!matchTitle && !matchId && !matchDesc) return false;
        }

        // Category filter
        if (selectedCategory && report.category !== selectedCategory) {
          return false;
        }

        // Location filter
        if (selectedLocation && !report.location.toLowerCase().includes(selectedLocation.toLowerCase())) {
          return false;
        }

        // Status filter
        if (selectedStatus && report.issueStatus !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'upvotes') {
          return (b.upvotes || 0) - (a.upvotes || 0);
        }
        // Default: newest first
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [reports, searchQuery, selectedCategory, selectedLocation, selectedStatus, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedLocation('');
    setSelectedStatus('');
    setSortBy('newest');
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedLocation || selectedStatus || sortBy !== 'newest';

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">All Campus Issues</h2>
          <p className="text-xs text-slate-500">
            Browse, search, and upvote reported facility and infrastructure issues across campus.
          </p>
        </div>

        {onNavigateReport && (
          <button
            onClick={onNavigateReport}
            className="flex items-center gap-2 bg-campus-navy hover:bg-campus-blue text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-sm self-start sm:self-auto cursor-pointer"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Report Issue</span>
          </button>
        )}
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
        {/* Search Input */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search issues by title, description or Report ID (e.g. REP-2025-001)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-campus-blue focus:bg-white transition-all"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            >
              <option value="">All Categories</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Location Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Location Filter
            </label>
            <input
              type="text"
              placeholder="e.g. Block A, Library"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            />
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Issue Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            >
              <option value="">All Statuses</option>
              {STATUSES.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-medium focus:ring-2 focus:ring-campus-blue focus:bg-white focus:outline-none"
            >
              <option value="newest">Newest First</option>
              <option value="upvotes">Most Upvoted First</option>
            </select>
          </div>
        </div>

        {/* Filter Summary & Reset */}
        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-100 flex-wrap gap-2">
          <span className="text-slate-500">
            Showing <strong className="text-slate-900">{filteredReports.length}</strong> of{' '}
            <strong className="text-slate-900">{reports.length}</strong> reports
          </span>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-campus-blue hover:text-blue-700 font-semibold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>Clear All Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Issues Grid */}
      {filteredReports.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 space-y-3">
          <p className="text-base font-bold text-slate-800">No issues match your current filters</p>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try adjusting your search terms or clearing selected category and status filters.
          </p>
          <button
            onClick={clearFilters}
            className="mt-2 text-xs font-bold text-campus-blue bg-blue-50 px-4 py-2 rounded-lg border border-blue-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReports.map((report) => (
            <IssueCard
              key={report.id}
              report={report}
              onViewDetails={onViewDetails}
            />
          ))}
        </div>
      )}
    </div>
  );
}

