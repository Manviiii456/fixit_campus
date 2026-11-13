# DOC-05: Data & Privacy Note

# 🔒 Data Architecture, Privacy & Security Statement

This document discloses how **FixIt Campus** handles data storage, browser persistence, user privacy, and authentication security in accordance with the hackathon rules.

---

## 💾 Local Storage Architecture

FixIt Campus runs as an entirely client-side Single Page Application (SPA). **It does not connect to any remote database, backend API, cloud service, or third-party endpoint.**

All data is stored inside the user's browser using the standardized `window.localStorage` API under dedicated namespace keys:

| LocalStorage Key | Purpose | Schema / Data Stored |
|---|---|---|
| `fixit_campus_reports_v1` | Campus maintenance tickets | Array of report objects (see schema below) |
| `fixit_campus_students_v1` | Student demo user profiles | Array of student objects with hashed demo passwords |
| `fixit_campus_activities_v1` | Audit trail history | Chronological log of actions (submissions, upvotes, status changes) |
| `fixit_campus_auth_session_v1`| Active user session | Current authenticated student or administrator profile |
| `fixit_campus_demo_otp_v1` | Simulated OTP state | Active 6-digit code, target email, timestamp, and 5-minute expiry |
| `fixit_campus_initialized_v1` | Seed control flag | Boolean flag ensuring sample data is seeded only once |

---

## 📋 Complete Schema of Stored Campus Reports

Each report saved to `localStorage` contains the following structured fields:

```json
{
  "id": "REP-2025-001",
  "title": "Classroom ceiling fan speed regulator broken",
  "category": "Electrical",
  "location": "Block A - Room 302 (3rd Floor)",
  "description": "The ceiling fan near the window spins at full speed...",
  "reportedBy": "Aarav Patel",
  "reporterEmail": "student@fixit.demo",
  "createdAt": "2026-11-11T10:15:00Z",
  "issueStatus": "PENDING",
  "syncStatus": "SYNCED LOCALLY",
  "priority": "Medium",
  "upvotes": 14,
  "upvotedBy": ["student@fixit.demo", "rohit.verma@fixit.demo"],
  "imageUrl": "data:image/png;base64,... (or null)",
  "statusHistory": [
    {
      "status": "PENDING",
      "timestamp": "2026-11-11T10:15:00Z",
      "note": "Issue reported by student",
      "updatedBy": "Aarav Patel"
    }
  ]
}
```

---

## 🖼️ Photo Storage & Preview Mechanism

- **Local Preview Only:** Photos selected by users are read using the browser's native `FileReader` API as Base64 Data URLs.
- **Zero Cloud Upload:** Photos are never transmitted to cloud storage buckets (no Amazon S3, Cloudinary, or Firebase Storage).
- **Storage Protection:** File size is capped to ensure browser LocalStorage quotas (typically 5MB – 10MB per origin) are never exceeded.

---

## 🛡️ Privacy & Non-Transmission Guarantee

1. **Zero External Data Transmission:**
   - Network inspections (via DevTools Network tab) verify that **zero outgoing HTTP/HTTPS fetch, XHR, or WebSocket requests** are triggered during reporting, upvoting, or synchronization.
   - All state mutations are handled by synchronous memory state in React contexts and written directly to `localStorage`.
2. **No Real Personal Data:**
   - All seeded student records, administrator credentials, and campus reports are entirely **fictional sample data**.
   - Registration forms explicitly warn users not to provide real passwords, actual student IDs, or real phone numbers.
3. **No External Authentication Services:**
   - Does not integrate with Google Identity, Firebase Auth, Supabase, OAuth2, or Auth0.
   - User authentication is verified client-side using salted hashes:
     ```javascript
     function hashDemoPassword(password) {
       return `demo_salted_${btoa(unescape(encodeURIComponent(password)))}_hash`;
     }
     ```
4. **No Secrets or Environment Dependencies:**
   - No `.env` files, private API keys, client secrets, or tokens exist in this repository.

