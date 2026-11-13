# DOC-01: README & Quickstart

# 🛠️ FixIt Campus
**Campus Maintenance Reporting & Tracking Platform**  
*Full-Stack-Free Offline-Ready Hackathon Prototype*

---

## 30-Second Executive Summary

**FixIt Campus** is a client-side facility management platform tailored for college campuses. It allows students to rapidly report broken fans, plumbing leaks, electrical hazards, classroom issues, and sanitation defects, while giving facilities administrators tools to triage, prioritize, assign, and resolve tickets.

**Zero Cloud Dependencies:** The entire application runs directly in modern web browsers using LocalStorage. It requires no backend server, no cloud database (no Firebase/Supabase), no paid APIs, no email keys, and no `.env` files.

---

## 🎯 Problem Statement

On college campuses, students frequently encounter damaged infrastructure—broken classroom benches, flickering stairwell lights, overflowing waste bins, or washroom leaks. Traditional reporting is fragmented through word-of-mouth or paper complaint books with zero visibility into whether an issue is acknowledged, assigned, or fixed.

**FixIt Campus bridges this gap:**
1. **Students** submit geo-located complaints with local photo previews and track live resolution timelines.
2. **Peers** upvote urgent issues to bubble them up the queue without duplicate spam.
3. **Administrators** approve registrations, triage requests by priority (Low to Urgent), update statuses, and synchronize local offline state with zero cloud overhead.

---

## ✨ Main Features

| Module | Features |
|---|---|
| **Landing & Onboarding** | Professional SaaS landing page with live statistics preview, 4-step workflow, and instant 1-click judge demo logins. |
| **Authentication & Roles** | Role-separated Student & Admin portals, student registration with administrator approval gating, and a client-side simulated 6-digit OTP verification panel. |
| **Student Issue Reporting** | 9 campus categories, exact campus location mapping, detailed description validation, and local image file preview via browser FileReader (no cloud upload). |
| **Community Issues & Upvotes** | Search by title/ID/description, filter by category/location/status, sort by newest or most upvoted. 1-vote-per-student fraud prevention. |
| **Resolution Timeline** | 4-stage visual timeline (*Reported → Pending Review → In Progress → Resolved*) with full timestamped administrator history audit trails. |
| **Admin Control Console** | Tabular issue management with inline status and priority editing, student registration approvals/rejections, and audit logging. |
| **Local Synchronization** | Compulsory offline sync simulation: tickets initialize as `PENDING SYNC`, persist across browser reloads, and turn to `SYNCED LOCALLY` upon clicking "SYNC LOCALLY". |
| **Minute 40 Twist Ready** | Unlocked offline queue handling with local status reconciliation verified. |

---

## 💻 Technologies Used

- **Framework:** React 19 (Modern functional components with Hooks)
- **Routing:** React Router DOM 7
- **Styling:** Tailwind CSS 3 (Deep navy `#172554`, Royal blue `#2563EB`, Light slate `#F5F7FB`)
- **Icons:** Lucide React
- **Bundler:** Vite 6
- **Persistence:** Browser LocalStorage API with JSON serialization and defensive schema initialization

---

## 🚀 Setup & Execution (No Secrets Required)

### 1. Zero-Secret Architecture
This project does **not** use a `.env` file, secret keys, or remote endpoints. All configuration is local.

### 2. Run Locally in 3 Steps
```bash
# Step 1: Clone or navigate to the workspace directory
cd c:\vibecode

# Step 2: Install dependencies (one-time setup)
npm install

# Step 3: Launch development server
npm run dev
```

Open your browser at:
👉 **`http://localhost:5173/`**

To verify the production build:
```bash
npm run build
npm run preview
```

---

## 📦 How Demo & Sample Data is Loaded

The application implements a non-destructive storage initializer in `src/utils/storage.js`:
- On first visit, it checks `localStorage.getItem('fixit_campus_initialized_v1')`.
- If uninitialized, it seeds fictional sample reports (broken fan, water leak, broken bench, flickering corridor light, overflowing bins), registered student profiles, and an administrator account.
- **Persistence Guarantee:** When users or judges submit new reports, user-created records are prepended and saved immediately to LocalStorage. Refreshing the browser preserves all user data without wiping or overwriting it.
- A **"Reset Sample Data"** action is provided in the top Judge Guide banner should you wish to restore initial seed records.

---

## 🖼️ Application Previews

| View | Description | Placeholder / Reference |
|---|---|---|
| **Landing Page** | Public SaaS portal with workflow & features | `[Landing Page Hero Preview]` |
| **Sign In** | Simulated campus auth with translucent campus background & judge 1-click buttons | `[Login Screen & Simulated OTP]` |
| **Student Dashboard** | Greeting card with campus imagery, 4 metrics cards, and recent issues feed | `[Student Portal Overview]` |
| **Issue Management** | Tabular control console with status and priority selectors | `[Admin Management Table]` |
| **Local Sync** | Dedicated synchronization interface demonstrating offline queue transition | `[Sync Console View]` |

---

## ⚠️ Known Limitations & Demonstration Scope

1. **Simulated Authentication:** Login verification is performed locally against salted hashes in LocalStorage. It is designed for offline hackathon evaluation, not production cryptographic authentication.
2. **Simulated OTP System:** 6-digit codes are generated client-side and displayed in the visible on-screen demo verification banner. No external SMS or email gateways are invoked.
3. **Local-Only Synchronization:** Synchronization reconciles state inside the browser's persistent storage to demonstrate offline queue mechanics without transmitting data over the internet.

