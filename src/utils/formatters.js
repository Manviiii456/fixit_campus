// Formatting helpers for FixIt Campus

export function formatDate(isoString) {
  if (!isoString) return 'N/A';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  } catch (e) {
    return isoString;
  }
}

export function formatTimeAgo(isoString) {
  if (!isoString) return '';
  try {
    const past = new Date(isoString).getTime();
    const now = Date.now();
    const diffMin = Math.floor((now - past) / 60000);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    if (diffDays < 7) return `${diffDays}d ago`;
    return formatDate(isoString);
  } catch (e) {
    return isoString;
  }
}

export function getStatusBadgeConfig(status) {
  switch (status) {
    case 'PENDING':
      return {
        label: 'PENDING',
        bg: 'bg-orange-50',
        text: 'text-orange-700',
        border: 'border-orange-200',
        dot: 'bg-orange-500'
      };
    case 'IN PROGRESS':
      return {
        label: 'IN PROGRESS',
        bg: 'bg-blue-50',
        text: 'text-blue-700',
        border: 'border-blue-200',
        dot: 'bg-blue-500'
      };
    case 'RESOLVED':
      return {
        label: 'RESOLVED',
        bg: 'bg-emerald-50',
        text: 'text-emerald-700',
        border: 'border-emerald-200',
        dot: 'bg-emerald-500'
      };
    default:
      return {
        label: status || 'UNKNOWN',
        bg: 'bg-slate-50',
        text: 'text-slate-600',
        border: 'border-slate-200',
        dot: 'bg-slate-400'
      };
  }
}

export function getSyncBadgeConfig(syncStatus) {
  if (syncStatus === 'SYNCED LOCALLY') {
    return {
      label: 'SYNCED LOCALLY',
      bg: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      iconColor: 'text-emerald-600'
    };
  }
  return {
    label: 'PENDING SYNC',
    bg: 'bg-amber-50 text-amber-700 border-amber-200 animate-pulse-subtle',
    iconColor: 'text-amber-500'
  };
}

export function getPriorityBadgeConfig(priority) {
  switch (priority) {
    case 'Urgent':
      return {
        label: 'Urgent',
        classes: 'bg-red-50 text-red-700 border-red-200'
      };
    case 'High':
      return {
        label: 'High',
        classes: 'bg-orange-50 text-orange-700 border-orange-200'
      };
    case 'Medium':
      return {
        label: 'Medium',
        classes: 'bg-amber-50 text-amber-700 border-amber-200'
      };
    case 'Low':
    default:
      return {
        label: 'Low',
        classes: 'bg-slate-100 text-slate-600 border-slate-200'
      };
  }
}

export function getCategoryIconName(category) {
  switch (category) {
    case 'Electrical': return 'Zap';
    case 'Plumbing': return 'Droplets';
    case 'Classroom Facilities': return 'GraduationCap';
    case 'Washroom': return 'Bath';
    case 'Cleaning': return 'Sparkles';
    case 'Furniture': return 'Armchair';
    case 'Water Supply': return 'GlassWater';
    case 'Campus Infrastructure': return 'Building2';
    default: return 'AlertCircle';
  }
}

