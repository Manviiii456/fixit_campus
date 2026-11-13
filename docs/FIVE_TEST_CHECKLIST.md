# DOC-03: Five-Test Checklist

# 🧪 Manual Verification & Quality Assurance Checklist

This checklist outlines five distinct manual test suites covering end-to-end user flows, edge cases, input validation, data persistence, and hackathon constraint compliance.

---

## 📑 Test Matrix Summary

| Test ID | Test Category | Target Component | Status |
|---|---|---|:---:|
| **TC-01** | Happy Path End-to-End | Report Submission & Admin Resolution | [x] PASS |
| **TC-02** | Validation & Error Handling | Form Input Boundary & Auth Gating | [x] PASS |
| **TC-03** | Special Hackathon Twist | Offline Queue & Local Synchronization | [x] PASS |
| **TC-04** | State Durability | Browser Refresh & Seed Data Reset | [x] PASS |
| **TC-05** | Boundary & Concurrency | Single-Vote Restriction & Search Bounds | [x] PASS |

---

## 1️⃣ TC-01: Happy Path End-to-End Test

### Test Objective
Verify that a student can successfully submit a campus complaint, track it in the feed, upvote it, and have an administrator review, reprioritize, and resolve the ticket with full audit trail logging.

### Steps to Execute
1. Log in as student `student@fixit.demo` (complete simulated OTP).
2. Navigate to **"Report an Issue"**.
3. Enter:
   - **Title:** `Broken water dispenser push button`
   - **Category:** `Water Supply`
   - **Location:** `Library Ground Floor East`
   - **Description:** `Cold water button is stuck down, resulting in continuous spillage.`
4. Click **"Submit Report"**.
5. Switch to **"All Campus Issues"** and click **"Upvote"**.
6. Sign out and log in as administrator `admin@fixit.demo`.
7. Navigate to **"All Reports Management"**.
8. Find the newly created report. Change its **Priority** to `Urgent` and its **Status** to `IN PROGRESS`.
9. Click **"Details"** to open the modal and change status to `RESOLVED` with a resolution note: *"Tap spring replaced by plumbing team."*

### Expected Result
- The issue is created with status `PENDING` and sync status `PENDING SYNC`.
- Upvote count increments by 1.
- Administrator successfully updates priority and status.
- Progress timeline highlights all 4 stages (*Reported → Pending → In Progress → Resolved*).
- Status changes appear in the **Activity Log**.

**Result:** ✅ **PASS**

---

## 2️⃣ TC-02: Invalid Input & Gating Validation Test

### Test Objective
Ensure the application validates all mandatory fields, blocks empty or substandard submissions, and enforces administrator approval gating for unapproved students.

### Steps to Execute
1. Navigate to **"Report an Issue"**.
2. Leave all fields empty and click **"Submit Report"**.
3. Enter a title shorter than 5 characters (e.g. `Fan`) and test submission.
4. Leave category unselected and test submission.
5. Enter a description shorter than 10 characters (e.g. `Broken`) and test submission.
6. Sign out and attempt to log in with unapproved student `priya.sharma@fixit.demo` (`StudentDemo123!`).
7. Enter an incorrect OTP (e.g. `000000`) on the verification step.

### Expected Result
- Inline field errors are displayed for empty title, category, location, and description.
- Sub-minimum text lengths trigger descriptive warnings.
- Submissions are halted without corrupting LocalStorage.
- Unapproved student login is rejected with: *"Your registration is currently PENDING ADMINISTRATOR APPROVAL."*
- Incorrect OTP is rejected with: *"Invalid verification code. Please check the 6-digit demo code."*

**Result:** ✅ **PASS**

---

## 3️⃣ TC-03: Special Hackathon Twist Verification Test

### Test Objective
Verify the Minute 40 constraint: a newly submitted issue must be queued as `PENDING SYNC`, remain available across browser refreshes, and successfully transition to `SYNCED LOCALLY` upon executing the local sync action.

### Steps to Execute
1. Log in as student and submit a complaint.
2. Confirm the sync status badge displays `PENDING SYNC` with an active pulsating amber indicator.
3. Refresh the browser (<kbd>F5</kbd> / reload).
4. Verify the report remains in `PENDING SYNC`.
5. Log in as administrator and open **"Local Synchronization"**.
6. Verify the report is displayed in the *Reports Awaiting Local Sync* queue.
7. Click **"SYNC LOCALLY"**.

### Expected Result
- Newly submitted ticket begins with `syncStatus: "PENDING SYNC"`.
- Browser refresh does not clear or prematurely sync the record.
- Clicking **"SYNC LOCALLY"** transitions the ticket to `SYNCED LOCALLY` with an emerald badge.
- Re-clicking when queue is empty displays: *"Everything is up to date. No pending reports to synchronize."*

**Result:** ✅ **PASS**

---

## 4️⃣ TC-04: Refresh, Reset & Persistence Test

### Test Objective
Validate that all application state (tickets, upvotes, student approvals, and activity logs) survives page refreshes and browser tab closures, while providing an idempotent reset mechanism.

### Steps to Execute
1. While logged in as an administrator, approve pending student `priya.sharma@fixit.demo`.
2. Update a report's priority to `Urgent`.
3. Hard refresh the page (<kbd>Ctrl</kbd> + <kbd>F5</kbd>).
4. Navigate to **"Student Management"** to verify Priya Sharma's status is still `APPROVED`.
5. Open the **Judge Guide** banner at the top of the screen and click **"Reset Sample Data"**.

### Expected Result
- LocalStorage retains modified student approval statuses and updated priorities across refreshes.
- Resetting demo data safely restores seed reports, seed students, and default activities without generating JavaScript runtime exceptions.

**Result:** ✅ **PASS**

---

## 5️⃣ TC-05: Boundary & Concurrency Test

### Test Objective
Verify that single-vote fraud prevention prevents duplicate upvotes from the same authenticated student, search queries handle edge characters, and photo attachments stay within local storage boundaries.

### Steps to Execute
1. As student `student@fixit.demo`, navigate to **"All Campus Issues"**.
2. Click **"Upvote"** on report `REP-2025-001`. Notice upvotes increment by 1 and the button turns blue.
3. Click the upvote button again.
4. In the search bar, enter special characters: `!@#$%^&*()`, extremely long strings, and report IDs (e.g. `REP-2025-004`).
5. Open **"Report an Issue"** and attach an image file.

### Expected Result
- Second upvote attempt is blocked with an informational toast: *"You have already upvoted this issue."* Duplicate votes are rejected.
- Search queries with special characters do not break the card list or crash the React rendering tree.
- Attached photos are previewed locally via `FileReader` data URLs and rendered cleanly.

**Result:** ✅ **PASS**

