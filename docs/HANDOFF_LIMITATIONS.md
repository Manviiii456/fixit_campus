# DOC-06: Handoff & Limitations

# 🛠️ Codebase Architecture, Handoff & Production Roadmap

This document outlines the codebase organization, module responsibilities, state management patterns, and architectural considerations for engineers maintaining or extending **FixIt Campus**.

---

## 📂 Source Code Structure & Responsibilities

```
c:\vibecode\src/
├── main.jsx                     # Application bootstrap and root DOM mounting
├── App.jsx                      # Routing tree & global Context Provider nesting
├── index.css                    # Tailwind CSS directives, typography & scrollbar themes
├── context/
│   ├── AuthContext.jsx          # User sessions, login, student registration, simulated OTP
│   ├── IssueContext.jsx         # Report lifecycle, upvotes, filters, status updates, local sync
│   └── ToastContext.jsx         # Non-blocking floating toast notification system
├── utils/
│   ├── storage.js               # Central LocalStorage CRUD utility & sample data initialization
│   ├── sampleData.js            # Fictional seed dataset (reports, students, administrator)
│   └── formatters.js            # Date formatters, status badge configs, category icons
├── components/
│   ├── common/
│   │   ├── Navbar.jsx           # Global sticky top navigation
│   │   ├── Sidebar.jsx          # Responsive dual-mode navigation (Student vs Admin)
│   │   ├── TopHeader.jsx        # Breadcrumb header with live sync indicator & user chip
│   │   ├── StatCard.jsx         # Reusable metrics card
│   │   ├── IssueCard.jsx        # Ticket card with upvoting and status indicators
│   │   ├── IssueDetailsModal.jsx# 4-stage resolution timeline modal with admin controls
│   │   ├── ConfirmationModal.jsx# Modal for confirming approvals, rejections & resets
│   │   └── JudgeDemoBanner.jsx  # Top bar with judge credentials & 3-step test instructions
│   ├── student/
│   │   ├── StudentOverview.jsx  # Student landing view with campus backdrop & stats
│   │   ├── ReportIssueForm.jsx  # Issue submission form with FileReader image preview
│   │   ├── AllCampusIssues.jsx  # Multi-filtered community issues feed with sorting
│   │   ├── MyReports.jsx        # Current student's submitted tickets
│   │   └── StudentProfile.jsx   # Student identity & account status
│   ├── admin/
│   │   ├── AdminOverview.jsx    # Administrative metrics & recent report queue
│   │   ├── AllReportsManagement.jsx # Comprehensive tabular management with inline controls
│   │   ├── StudentManagement.jsx# Student directory with approval & rejection actions
│   │   ├── PendingRegistrations.jsx # Triage queue for unapproved accounts
│   │   ├── LocalSynchronization.jsx # Dedicated sync console with queue controls
│   │   ├── ActivityLog.jsx      # Chronological audit trail with role filtering
│   │   └── Minute40Placeholder.jsx  # Minute 40 constraint fulfillment component
│   └── docs/
│       ├── DocumentationDashboard.jsx # 6-card documentation dashboard
│       └── DocumentViewer.jsx         # Markdown document viewer with back navigation
└── pages/
    ├── LandingPage.jsx          # Public SaaS landing page with features & workflow
    ├── LoginPage.jsx            # Authentication page with simulated 6-digit OTP panel
    ├── RegisterPage.jsx         # Student registration form (Pending Approval)
    ├── StudentDashboardPage.jsx # Protected student layout
    ├── AdminDashboardPage.jsx   # Protected administrator layout
    └── DocumentationPage.jsx    # Full-screen documentation portal
```

---

## ⚙️ Core Application Logic & Data Flow

### 1. Persistence Layer (`src/utils/storage.js`)
All read and write operations flow through `src/utils/storage.js`. It wraps `localStorage.getItem` and `localStorage.setItem` inside defensive `try/catch` blocks.
- **Seeding:** `initializeStorageIfNeeded()` ensures default sample data is loaded on the first session without overwriting user-created tickets on subsequent reloads.
- **Resetting:** `resetToDemoDefaults()` restores the original seed records cleanly.

### 2. State & Business Logic (`src/context/`)
- **`IssueContext.jsx`:** Holds active tickets, handles single-upvote validation, status updates with audit trail entries, priority adjustments, and the **`syncLocally()`** reconciliation loop.
- **`AuthContext.jsx`:** Tracks `currentUser`, validates credentials, blocks unapproved student logins, and generates/validates the simulated 6-digit OTP with a 5-minute countdown.

---

## 🎭 Simulated Features Summary

| Feature | Hackathon Implementation | Real-World Production Equivalent |
|---|---|---|
| **OTP Delivery** | Rendered in on-screen demo verification banner | Transactional email/SMS gateway (Twilio, SendGrid) |
| **Authentication** | Client-side salted hash in `localStorage` | Argon2/Bcrypt hash on secure backend with HTTP-only JWTs |
| **Data Sync** | Local array mutation from `PENDING SYNC` to `SYNCED LOCALLY` | Background Service Worker syncing with REST/GraphQL database |
| **Photo Uploads** | `FileReader` Data URL kept in browser memory | S3 / Cloudflare R2 bucket upload with presigned URLs |

---

## 🚧 Current Limitations

1. **Origin Storage Ceiling:** LocalStorage is constrained to ~5MB per browser origin. Large numbers of high-resolution base64 images could exceed storage limits if not downscaled.
2. **Device Isolation:** Data created in Chrome on Machine A will not automatically appear in Firefox on Machine B without an external synchronization server.
3. **Client-Side Authorization:** While route guards prevent students from seeing administrator views, client-side code can be inspected via DevTools.

---

## 🎯 Top 3 Improvements for Production Deployment

1. **Backend Integration & PostgreSQL Migration:**
   Replace `src/utils/storage.js` with an async API client connecting to a Node.js/Go backend backed by a relational PostgreSQL database with Row-Level Security (RLS).
2. **Object Storage for Media:**
   Offload photo attachments to an S3-compatible bucket via presigned upload URLs, storing only CDN image links in the ticket record.
3. **Service Worker Offline Sync (PWA):**
   Implement a Workbox Service Worker with an `IndexedDB` background-sync queue, allowing students to report issues even in subterranean basements with zero mobile reception and automatically uploading when signal returns.

