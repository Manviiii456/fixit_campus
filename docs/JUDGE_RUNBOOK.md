# DOC-02: Judge Runbook

# ⏱️ 60-Second Demonstration Script & Verification Guide

This runbook gives judges a precise, repeatable 60-second script to evaluate the core architecture, data persistence, and synchronization mechanics of **FixIt Campus**.

---

## 📋 Initial Application State

- **Application URL:** `http://localhost:5173/`
- **Initial Data State:** Seeded with 6 fictional campus complaints, 4 student demo accounts, and 1 administrator profile.
- **Persistence Target:** Browser `LocalStorage` (`fixit_campus_reports_v1`).
- **Initial Sync Status of Existing Reports:** Pre-synced sample records (`SYNCED LOCALLY`).
- **Pre-configured Demo Credentials:**
  - **Administrator:** `admin@fixit.demo` / `AdminDemo123!`
  - **Pre-Approved Student:** `student@fixit.demo` / `StudentDemo123!`
  - **Pending Student:** `priya.sharma@fixit.demo` / `StudentDemo123!` (Gated by admin approval)

---

## 🎬 60-Second Step-by-Step Judge Script

### Phase 1: Student Login & Simulated OTP (Seconds 0 – 15)

1. Open `http://localhost:5173/`.
2. Click the **"Student Login"** button on the navbar or hero section.
3. On the login screen, click the **"Student Demo"** quick-fill button (fills `student@fixit.demo` / `StudentDemo123!`).
4. Click **"Continue to Verification →"**.
5. Observe the **"Simulated Demo OTP Panel"**:
   - *Expected Output:* A clearly marked yellow verification banner displays:
     ```
     DEMO-ONLY SIMULATED OTP PANEL: [ 6-digit code, e.g. 842190 ]
     ```
6. Enter the 6-digit code into the verification input and click **"Verify Code & Sign In"**.
   - *Expected Output:* Toast notification *"Welcome to FixIt Campus, Aarav Patel!"* and redirect to the Student Portal (`/student`).

---

### Phase 2: Create a New Campus Report (Seconds 15 – 30)

1. In the left sidebar, click **"Report an Issue"**.
2. Click the quick-fill test button **"+ Seminar Projector"** (or manually enter):
   - **Title:** `Projector HDMI port damaged in Seminar Hall`
   - **Category:** `Classroom Facilities`
   - **Campus Location:** `Admin Block - 2nd Floor Seminar Hall 1`
   - **Description:** `The HDMI cable head broke inside the wall port. No presentation can be projected for afternoon seminar.`
3. Click **"Submit Report"**.
   - *Expected Output:*
     - A green notification toast confirms: *"Report REP-2025-007 submitted! Marked as PENDING SYNC."*
     - The view switches to the issues list.
     - The new ticket is at the top of the feed with an **Orange** `PENDING` issue badge and an **Amber animated** `PENDING SYNC` badge.

---

### Phase 3: The Persistence Test — Browser Refresh (Seconds 30 – 40)

1. Press **F5** or click your browser's **Reload** button.
2. The page reloads directly from browser LocalStorage.
3. Inspect the newly created report (`REP-2025-007`):
   - *Expected Output:*
     - The report **persists completely** with identical data.
     - The sync status **remains `PENDING SYNC`**.
     - The top header pill displays: `1 Reports Pending Sync`.

---

### Phase 4: Local Synchronization Demonstration (Seconds 40 – 55)

1. Click **"Sign Out"** at the bottom of the sidebar.
2. On the login page, click the **"Admin Demo"** quick-fill button (`admin@fixit.demo` / `AdminDemo123!`) and click **"Sign In as Administrator"**.
3. In the admin sidebar, click **"Local Synchronization"** (notice the amber badge `1`).
4. In the synchronization console, review the queue under *"Reports Awaiting Local Sync"*.
5. Click the prominent **"SYNC LOCALLY"** button.
   - *Expected Output:*
     - The sync spinner runs briefly and produces a success toast: *"Successfully synchronized 1 pending report(s) locally."*
     - Ticket `REP-2025-007` moves from the pending queue to the *"Locally Synchronized Reports"* table.
     - Its sync status changes to an **Emerald** `SYNCED LOCALLY` badge.
     - The pending sync counter updates to `0` and header displays `Local Storage Synced`.

---

### Phase 5: Audit Trail & Minute 40 Twist Check (Seconds 55 – 60)

1. Click **"Activity Log"** in the sidebar.
   - *Expected Output:* You will see an immutable timestamped log:
     - `Local synchronization completed: 1 pending report(s) marked as SYNCED LOCALLY`
     - `New report submitted: Projector HDMI port damaged in Seminar Hall (REP-2025-007)`
2. Click **"Console Overview"** to inspect the **Minute 40 Twist Section**.

---

## 🌀 Special Hackathon Twist Alignment

### Organizer Constraint Revealed at Minute 40:
> **Offline Queue Constraint:** *"A new report created in the app must appear as 'Pending sync' and remain available after refresh, with a simulated 'Mark synced' action."*

### How FixIt Campus Satisfies This:
1. **Queue Isolation:** Every newly created ticket defaults to `syncStatus: "PENDING SYNC"` independently of its lifecycle `issueStatus`.
2. **Offline Durability:** Because state is serialized to browser `LocalStorage`, tickets survive page reloads, tab closures, and simulated network disconnects.
3. **Simulated Sync Action:** The **"SYNC LOCALLY"** button acts as the simulated *"Mark synced"* action, updating records to `SYNCED LOCALLY` and broadcasting changes to all components.

---

## 🔎 Simulated Functionality Disclosure

To maintain complete transparency with judges:
- **No Remote Network Calls:** No background HTTP or WebSocket calls are made to external servers.
- **Simulated Auth:** Passwords use salted demo client-side hashing (`btoa` / salt).
- **Simulated OTP:** The 6-digit verification code is generated via `Math.random()` and displayed in the UI banner rather than sent through email/SMS.

