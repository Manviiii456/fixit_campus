# DOC-04: User Quickstart

# 🚀 4-Step First-Time User Guide

Welcome to **FixIt Campus**! This guide walks students, staff, and facilities personnel through using the platform to report campus maintenance issues, track resolution timelines, and collaborate on campus infrastructure improvements.

---

## 📌 Step 1: Understanding What FixIt Campus Does

**FixIt Campus** is an open, transparent maintenance ticketing platform built for our campus community:
- **No Lost Complaints:** Every reported defect receives a permanent ticket ID (e.g. `REP-2025-001`).
- **Community Upvoting:** High-priority or hazardous issues (e.g. water leaks, exposed electrical wiring) can be upvoted by students to alert facilities directors.
- **Transparent Progress:** Real-time visibility into whether your ticket is **Pending Review**, **In Progress**, or **Resolved**.
- **Offline Reliability:** All data works directly in your web browser with offline queuing.

---

## 📝 Step 2: How to Report a Campus Issue

Follow these steps to submit a maintenance ticket:

1. Log into your **Student Portal** (or use the demo account `student@fixit.demo`).
2. Click **"Report an Issue"** in the sidebar.
3. Fill in the mandatory fields:

| Field | Example Input | Purpose |
|---|---|---|
| **Issue Title** | `Classroom ceiling fan speed regulator broken` | Concise summary of the defect. |
| **Category** | `Electrical` (choose from 9 options) | Routes ticket to the correct repair crew. |
| **Location** | `Block A - Room 302 (3rd Floor)` | Specific campus area or classroom number. |
| **Description** | `The fan spins at full speed regardless of setting, making a loud rattling sound during lectures.` | Gives repair technicians context on required tools. |
| **Photo (Optional)** | Select any `.png` or `.jpg` photo | Generates an instant local preview of the defect. |

4. Click **"Submit Report"**.

### Expected Result
- A green confirmation toast appears: *"Report submitted! Marked as PENDING SYNC."*
- The form clears automatically.
- Your ticket immediately appears in **"My Reports"** and **"All Campus Issues"**.

---

## 🔍 Step 3: View, Filter, Upvote & Track Status

### 1. Finding Issues
Navigate to **"All Campus Issues"** in the sidebar to use the real-time filter bar:
- **Search Bar:** Type any keyword (e.g., `washroom`, `fan`, or `REP-2025-002`).
- **Category Filter:** Narrow down by *Plumbing*, *Electrical*, *Furniture*, etc.
- **Location Filter:** Type a building name (e.g., `Block B` or `Library`).
- **Status Filter:** Filter by *PENDING*, *IN PROGRESS*, or *RESOLVED*.
- **Sort By:** Switch between *Newest First* or *Most Upvoted First*.

### 2. Upvoting Community Issues
- Click the **thumbs-up button** on any issue card.
- The button turns blue, the counter increments by 1, and your upvote is saved in LocalStorage.
- You can upvote any report once. Subsequent clicks are safely prevented to avoid duplicate vote manipulation.

### 3. Tracking the 4-Stage Resolution Timeline
Click **"View Details"** on any ticket to view its full resolution progress:
```
[ Reported ] ──▶ [ Pending Review ] ──▶ [ In Progress ] ──▶ [ Resolved ]
```
- **Reported:** Ticket logged by student.
- **Pending Review:** Awaiting facility coordinator triage.
- **In Progress:** Repair contractor or campus maintenance crew has been dispatched.
- **Resolved:** Issue inspected, repaired, and signed off.

---

## 🔄 Step 4: Understanding Sync Status & Recovering from Mistakes

### What is Synchronization Status?
Every report in FixIt Campus tracks two independent statuses:

| Status Type | Possible Values | Meaning |
|---|---|---|
| **Issue Status** | `PENDING`, `IN PROGRESS`, `RESOLVED` | Operational repair state of the physical defect. |
| **Sync Status** | `PENDING SYNC`, `SYNCED LOCALLY` | State of the ticket in the browser's persistent storage. |

- **`PENDING SYNC` (Pulsating Amber):** The ticket has been created locally and queued. It survives page refreshes and browser tab closures.
- **`SYNCED LOCALLY` (Emerald Green):** The ticket has been processed through local database reconciliation by the facility administrator.

### How to Recover from Mistakes
- **Entered incorrect search filters?** Click the **"Clear All Filters"** button in the filter toolbar to restore the full list.
- **Want to re-test the entire flow from a clean state?** Expand the **Judge Guide** banner at the top of any page and click **"Reset Sample Data"**. All records will reset to the clean default seed state without clearing your browser cache.

