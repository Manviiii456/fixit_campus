# 🛠️ FixIt Campus

> **Report. Track. Improve.**  
> *Making campus maintenance simpler, faster, and more transparent.*  
> **Campus Maintenance Reporting & Tracking Platform**  
> *Full-Stack-Free Mini-Hackathon Prototype*

---

## 🌟 Executive Summary

**FixIt Campus** is a comprehensive, responsive campus facility maintenance reporting and tracking web application. It satisfies all hackathon requirements without needing a backend server, cloud database, external auth provider, or paid APIs.

All persistent state (reports, upvotes, approval statuses, demo sessions, and activity logs) is maintained reliably in browser **LocalStorage**.

---

## ⚖️ Hackathon Constraint Compliance

| Constraint | Status | Implementation Details |
|---|---|---|
| **No External APIs** | ✅ Pass | 100% client-side computation; zero external endpoints called. |
| **No Paid Services** | ✅ Pass | Built using free open-source libraries (`react`, `react-router-dom`, `lucide-react`, `tailwindcss`). |
| **No External Auth (Firebase/Supabase/Auth0)** | ✅ Pass | Role-separated client-side authentication and authorization with salted demo password hashing. |
| **No Gmail / Third-Party Email** | ✅ Pass | Simulated 6-digit Demo OTP verification with dedicated visible verification panel and 5-minute expiry. |
| **No Cloud Database** | ✅ Pass | Robust LocalStorage persistence utility (`src/utils/storage.js`) with error recovery. |
| **Zero Backend / Zero `.env`** | ✅ Pass | Fully standalone browser SPA. No backend process, API keys, or secret tokens required. |
| **Works Offline** | ✅ Pass | Operates completely without an internet connection once assets are loaded. |
| **Minute 40 Twist Readiness** | ✅ Pass | Modular placeholder architecture reserved for the organizer surprise constraint. |

---

## 🔑 Demo Credentials & Accounts

Quick-fill 1-click buttons are provided on the Login page for instant judge convenience.

### 🛡️ Administrator Demo Account
- **Email:** `admin@fixit.demo`
- **Password:** `AdminDemo123!`
- **Role:** Campus Facilities Director (`Dr. K. S. Venkatesh`)
- **Permissions:** Manage all reports, update issue statuses, change priorities, approve/reject student registrations, execute Local Synchronization, view full audit logs.

### 🎓 Student Demo Account
- **Email:** `student@fixit.demo`
- **Password:** `StudentDemo123!`
- **Role:** Enrolled Student (`Aarav Patel` — `STU-2025-0842`)
- **Approval Status:** Pre-Approved
- **Permissions:** Submit new issues, attach photos (local preview), upvote campus issues (1 vote limit), view issue timelines, review personal submitted reports.

### ⏳ Pending Approval Student Demo Account
- **Email:** `priya.sharma@fixit.demo`
- **Password:** `StudentDemo123!`
- **Approval Status:** `PENDING APPROVAL`
- *Attempting login will correctly block access until approved by the Admin in the Student Management tab!*

---

## 🧪 The Compulsory 3-Step Judge Verification Test

To verify client-side persistence and local synchronization:

### **Step 1: Submit a New Campus Report**
1. Log in as a student (`student@fixit.demo`) or register a new student.
2. Click **Report an Issue** in the sidebar.
3. Fill in the form (or click the **"+ Seminar Projector"** quick-fill button) and click **Submit Report**.
4. Notice the newly created report is assigned a unique ID (`REP-2025-007`) with:
   - `issueStatus: "PENDING"` (Orange)
   - `syncStatus: "PENDING SYNC"` (Amber animated badge)

### **Step 2: Refresh the Browser**
1. Press <kbd>F5</kbd> or click the browser reload button.
2. Navigate to **All Campus Issues** or **My Reports**.
3. **Verify:** The report still exists and still clearly displays `PENDING SYNC`. Data has survived the page reload from LocalStorage!

### **Step 3: Click "SYNC LOCALLY"**
1. Sign in to the **Admin Console** (`admin@fixit.demo`).
2. Go to **Local Synchronization** in the sidebar.
3. Observe the report listed in the *Reports Awaiting Local Sync* queue.
4. Click the prominent **SYNC LOCALLY** button.
5. **Verify:**
   - The status immediately transitions to **SYNCED LOCALLY** (Emerald badge).
   - A success notification is displayed.
   - The synchronization is recorded in the **Activity Log** with an exact timestamp.

---

## 📱 Features Breakdown

### 1. Landing Page (`/`)
- Brand: **FixIt Campus** with tagline *"Report. Track. Improve."*
- Interactive dashboard preview mockup.
- 4-step workflow overview (*Spot & Report → Community Upvoting → Admin Triage → Local Sync & Close*).
- 3 feature highlight cards (*Report Campus Issues, Track Every Update, Build a Better Campus*).
- Direct access links to Student & Admin portals.

### 2. Role-Based Authentication & Simulated OTP
- Role tabs for Student and Administrator login.
- **Simulated 6-digit Demo OTP Panel**:
  - Locally generates random 6-digit codes.
  - Displays code in a dedicated, prominent demo notification banner.
  - Validates code entry with error messaging on mismatch.
  - 5-minute code expiration timer.
  - Resend action with 30-second cooldown.
- **Student Registration Flow**:
  - Full name, fictional college email, fictional student ID, academic department, and password.
  - Submits with initial status `PENDING APPROVAL`.
  - Blocked from completing login until campus administrator approves account.

### 3. Student Portal (`/student`)
- **Overview**: Personal greeting, 4 metrics cards (*Total, Pending, In Progress, Resolved*), and recent campus issues feed.
- **Report an Issue**:
  - 9 campus categories: *Electrical, Plumbing, Classroom Facilities, Washroom, Cleaning, Furniture, Water Supply, Campus Infrastructure, Other*.
  - Location input (*block, room, building*).
  - Detailed description with validation.
  - Optional photo selection with local FileReader image preview (never uploaded).
- **All Campus Issues**:
  - Search by title, description, or Report ID.
  - Filter by category, location, and issue status.
  - Sort by newest or most upvoted.
  - One-click upvote mechanism preventing duplicate upvotes from the same student.
- **My Reports**: Dedicated view of tickets submitted by the authenticated student.
- **Student Profile**: Displays verified demo identity and student credentials.

### 4. Admin Management Console (`/admin`)
- **Console Overview**: 6 metrics cards (*Total Reports, Pending Issues, In Progress, Resolved, Total Students, Pending Registrations*) plus priority queue.
- **All Reports Management**: Complete tabular view with inline status modification (*Pending, In Progress, Resolved*) and priority assignment (*Low, Medium, High, Urgent*).
- **Student Management**: Filter students by approval status (*Pending Approval, Approved, Rejected*) with confirmation modals.
- **Pending Registrations Triage**: Fast-track view to review and approve newly registered students.
- **Local Synchronization**: Dedicated synchronization interface with real-time statistics, pending queues, and one-click sync action.
- **Activity Log**: Timestamped chronological audit trail of all campus tickets, upvotes, registrations, approvals, and sync events.
- **Minute 40 Sprint Constraint Slot**: Modular standby socket displaying *"Awaiting official organizer instructions."*

### 5. Interactive Issue Details Modal
- Full issue information, photo preview, and reporter metadata.
- 4-step visual progress timeline: **Reported → Pending → In Progress → Resolved**.
- Full audit log of historical status changes.
- Administrator status and priority update controls directly inside the modal.

---

## 🏗️ Project Architecture & Folder Structure

```
fixit-campus/
├── index.html                      # HTML5 entry with Inter font & viewport config
├── package.json                    # Dependencies: React 19, React Router 7, Lucide, Tailwind
├── vite.config.js                  # Vite bundler configuration
├── tailwind.config.js              # Theme custom colors (#172554, #0848d2ff, #F5F7FB, status badges)
├── postcss.config.js               # Tailwind & Autoprefixer plugin config
├── src/
│   ├── main.jsx                    # React root render
│   ├── App.jsx                     # Application routes & provider composition
│   ├── index.css                   # Tailwind base, utilities, custom scrollbars
│   ├── context/
│   │   ├── AuthContext.jsx         # User sessions, login, student registration, simulated OTP
│   │   ├── IssueContext.jsx        # Reports state, status changes, upvoting, local sync
│   │   └── ToastContext.jsx        # Floating alert notifications system
│   ├── utils/
│   │   ├── storage.js              # LocalStorage persistence, safe getters/setters, seeding
│   │   ├── sampleData.js           # Initial fictional campus tickets, students & admin accounts
│   │   └── formatters.js           # Date formatters, status badges, priority styling
│   ├── components/
│   │   ├── common/
│   │   │   ├── Navbar.jsx          # Public & shared top navigation
│   │   │   ├── Sidebar.jsx         # Responsive sidebar with Student & Admin modes
│   │   │   ├── TopHeader.jsx       # Header bar with real-time sync indicator & user chip
│   │   │   ├── StatCard.jsx        # Reusable metric statistic cards
│   │   │   ├── IssueCard.jsx       # Issue card with upvotes, badges & details trigger
│   │   │   ├── IssueDetailsModal.jsx # Detailed modal with 4-step timeline & admin controls
│   │   │   ├── ConfirmationModal.jsx # Modal for confirming approvals & rejections
│   │   │   └── JudgeDemoBanner.jsx # Quick judge instructions banner with test steps
│   │   ├── student/
│   │   │   ├── StudentOverview.jsx # Student dashboard landing view
│   │   │   ├── ReportIssueForm.jsx # Ticket submission with local image preview
│   │   │   ├── AllCampusIssues.jsx # Search, multi-filtering, sorting, card grid
│   │   │   ├── MyReports.jsx       # Student's submitted issues
│   │   │   └── StudentProfile.jsx  # Student identity & demo badge
│   │   └── admin/
│   │       ├── AdminOverview.jsx   # Admin statistics & recent reports table
│   │       ├── AllReportsManagement.jsx # Comprehensive management table
│   │       ├── StudentManagement.jsx # Student approval/rejection directory
│   │       ├── PendingRegistrations.jsx # Fast-track registration triage
│   │       ├── LocalSynchronization.jsx # Dedicated SYNC LOCALLY interface
│   │       ├── ActivityLog.jsx     # Timestamped chronological audit trail
│   │       └── Minute40Placeholder.jsx # "Minute 40 Sprint Constraint" standby socket
│   └── pages/
│       ├── LandingPage.jsx         # Public landing page with hero & preview
│       ├── LoginPage.jsx           # Student & Admin login with simulated OTP panel
│       ├── RegisterPage.jsx        # Student registration form (Pending Approval)
│       ├── StudentDashboardPage.jsx# Protected Student portal layout
│       └── AdminDashboardPage.jsx  # Protected Admin console layout
└── README.md                       # Comprehensive documentation & verification guide
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Installation & Run

1. Clone or extract the project directory:
   ```bash
   cd c:\vibecode
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch development server:
   ```bash
   npm run dev
   ```

4. Open your browser at:
   ```
   http://localhost:5173/
   ```

5. To create a production build:
   ```bash
   npm run build
   ```

---

## 🔒 Limitations & Prototype Notes

1. **Simulated Authentication:** Login verification is performed locally in browser storage using salted hashes. It is designed specifically for offline hackathon demonstration and is not intended for production cryptographic identity management.
2. **Simulated OTP:** Verification codes are generated client-side and displayed in the on-screen simulated OTP panel. No actual SMS or email gateways are triggered.
3. **Local Synchronization:** The synchronization mechanism demonstrates data reconciliation and status changes within browser LocalStorage without transmitting payloads over the public internet.

---

*FixIt Campus — Campus Facility Management Prototype 2026*

