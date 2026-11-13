// Fictional sample data for FixIt Campus - Campus Maintenance Prototype

export const INITIAL_STUDENTS = [
  {
    id: "STU-2025-0842",
    name: "Aarav Patel",
    email: "student@fixit.demo",
    // Salted demo hash (not plain text)
    passwordHash: "demo_hash_student_2025",
    approvalStatus: "APPROVED", // "PENDING APPROVAL" | "APPROVED" | "REJECTED"
    registeredAt: "2026-11-10T09:30:00Z",
    department: "Computer Science & Engineering",
    phone: "DEMO-ONLY",
    role: "STUDENT"
  },
  {
    id: "STU-2025-1109",
    name: "Priya Sharma",
    email: "priya.sharma@fixit.demo",
    passwordHash: "demo_hash_priya_2025",
    approvalStatus: "PENDING APPROVAL",
    registeredAt: "2026-11-13T08:15:00Z",
    department: "Electronics & Communication",
    phone: "DEMO-ONLY",
    role: "STUDENT"
  },
  {
    id: "STU-2025-0321",
    name: "Rohit Verma",
    email: "rohit.verma@fixit.demo",
    passwordHash: "demo_hash_rohit_2025",
    approvalStatus: "APPROVED",
    registeredAt: "2026-11-11T14:20:00Z",
    department: "Mechanical Engineering",
    phone: "DEMO-ONLY",
    role: "STUDENT"
  },
  {
    id: "STU-2025-1442",
    name: "Ananya Sen",
    email: "ananya.sen@fixit.demo",
    passwordHash: "demo_hash_ananya_2025",
    approvalStatus: "REJECTED",
    registeredAt: "2026-11-09T11:45:00Z",
    department: "Information Science",
    phone: "DEMO-ONLY",
    role: "STUDENT"
  }
];

export const INITIAL_ADMIN = {
  id: "ADM-001",
  name: "Dr. K. S. Venkatesh",
  title: "Campus Facilities Director",
  email: "admin@fixit.demo",
  passwordHash: "demo_hash_admin_2025",
  role: "ADMIN"
};

export const INITIAL_REPORTS = [
  {
    id: "REP-2025-001",
    title: "Classroom ceiling fan speed regulator broken",
    category: "Electrical",
    location: "Block A - Room 302 (3rd Floor)",
    description: "The ceiling fan near the window spins at full speed regardless of regulator setting, producing a loud vibrating noise during lectures.",
    reportedBy: "Aarav Patel",
    reporterEmail: "student@fixit.demo",
    createdAt: "2026-11-11T10:15:00Z",
    issueStatus: "PENDING", // "PENDING" | "IN PROGRESS" | "RESOLVED"
    syncStatus: "SYNCED LOCALLY", // "PENDING SYNC" | "SYNCED LOCALLY"
    priority: "Medium", // "Low" | "Medium" | "High" | "Urgent"
    upvotes: 14,
    upvotedBy: ["student@fixit.demo", "rohit.verma@fixit.demo"],
    imageUrl: null,
    statusHistory: [
      {
        status: "PENDING",
        timestamp: "2026-11-11T10:15:00Z",
        note: "Issue submitted by student via FixIt Campus portal",
        updatedBy: "Aarav Patel"
      }
    ]
  },
  {
    id: "REP-2025-002",
    title: "Major water leakage near washroom entrance",
    category: "Plumbing",
    location: "Block B - 2nd Floor East Wing",
    description: "Under-sink pipe has fractured and water is spilling onto the corridor floor, creating a severe slip hazard for students moving between laboratories.",
    reportedBy: "Rohit Verma",
    reporterEmail: "rohit.verma@fixit.demo",
    createdAt: "2026-11-12T08:45:00Z",
    issueStatus: "IN PROGRESS",
    syncStatus: "SYNCED LOCALLY",
    priority: "Urgent",
    upvotes: 27,
    upvotedBy: ["student@fixit.demo", "rohit.verma@fixit.demo"],
    imageUrl: null,
    statusHistory: [
      {
        status: "PENDING",
        timestamp: "2026-11-12T08:45:00Z",
        note: "Issue submitted by student",
        updatedBy: "Rohit Verma"
      },
      {
        status: "IN PROGRESS",
        timestamp: "2026-11-12T09:30:00Z",
        note: "Plumbing contractor assigned. Valve shut off temporarily.",
        updatedBy: "Dr. K. S. Venkatesh (Admin)"
      }
    ]
  },
  {
    id: "REP-2025-003",
    title: "Broken classroom bench and loose screws",
    category: "Furniture",
    location: "Block C - Lecture Hall 104",
    description: "Fourth row bench seat is cracked in half and has exposed sharp metal screws that could tear clothing or cause injury.",
    reportedBy: "Aarav Patel",
    reporterEmail: "student@fixit.demo",
    createdAt: "2026-11-12T14:10:00Z",
    issueStatus: "PENDING",
    syncStatus: "SYNCED LOCALLY",
    priority: "Low",
    upvotes: 8,
    upvotedBy: ["student@fixit.demo"],
    imageUrl: null,
    statusHistory: [
      {
        status: "PENDING",
        timestamp: "2026-11-12T14:10:00Z",
        note: "Issue reported by student",
        updatedBy: "Aarav Patel"
      }
    ]
  },
  {
    id: "REP-2025-004",
    title: "Corridor fluorescent tube flickering & dark zone",
    category: "Electrical",
    location: "Main Building - 1st Floor East Staircase",
    description: "Stairwell lights failed completely, making the evening exit hazardous after 6 PM labs.",
    reportedBy: "Rohit Verma",
    reporterEmail: "rohit.verma@fixit.demo",
    createdAt: "2026-11-09T17:30:00Z",
    issueStatus: "RESOLVED",
    syncStatus: "SYNCED LOCALLY",
    priority: "Medium",
    upvotes: 19,
    upvotedBy: ["rohit.verma@fixit.demo"],
    imageUrl: null,
    statusHistory: [
      {
        status: "PENDING",
        timestamp: "2026-11-09T17:30:00Z",
        note: "Issue submitted",
        updatedBy: "Rohit Verma"
      },
      {
        status: "IN PROGRESS",
        timestamp: "2026-11-10T10:00:00Z",
        note: "Electrical crew dispatched with replacement LED fixtures.",
        updatedBy: "Facilities Admin"
      },
      {
        status: "RESOLVED",
        timestamp: "2026-11-10T15:00:00Z",
        note: "Dual LED battens installed and verified functional.",
        updatedBy: "Dr. K. S. Venkatesh (Admin)"
      }
    ]
  },
  {
    id: "REP-2025-005",
    title: "Waste bins overflowing around canteen courtyard",
    category: "Cleaning",
    location: "Campus Garden & Cafeteria Courtyard",
    description: "Organic waste and plastic food containers are spilling out of both bins, attracting stray animals and creating foul odor.",
    reportedBy: "Aarav Patel",
    reporterEmail: "student@fixit.demo",
    createdAt: "2026-11-13T11:00:00Z",
    issueStatus: "IN PROGRESS",
    syncStatus: "SYNCED LOCALLY",
    priority: "High",
    upvotes: 31,
    upvotedBy: ["student@fixit.demo", "rohit.verma@fixit.demo"],
    imageUrl: null,
    statusHistory: [
      {
        status: "PENDING",
        timestamp: "2026-11-13T11:00:00Z",
        note: "Reported by Aarav Patel",
        updatedBy: "Aarav Patel"
      },
      {
        status: "IN PROGRESS",
        timestamp: "2026-11-13T11:30:00Z",
        note: "Campus sanitation squad alerted for immediate clearance.",
        updatedBy: "Dr. K. S. Venkatesh (Admin)"
      }
    ]
  },
  {
    id: "REP-2025-006",
    title: "Drinking water dispenser tap broken",
    category: "Water Supply",
    location: "Mechanical Block - 2nd Floor Water Station",
    description: "The cold water push-tap has snapped off at the valve thread, causing continuous trickling and leaving no drinking water on this floor.",
    reportedBy: "Rohit Verma",
    reporterEmail: "rohit.verma@fixit.demo",
    createdAt: "2026-11-12T11:20:00Z",
    issueStatus: "PENDING",
    syncStatus: "SYNCED LOCALLY",
    priority: "High",
    upvotes: 18,
    upvotedBy: ["rohit.verma@fixit.demo"],
    imageUrl: null,
    statusHistory: [
      {
        status: "PENDING",
        timestamp: "2026-11-12T11:20:00Z",
        note: "Reported by Rohit Verma",
        updatedBy: "Rohit Verma"
      }
    ]
  }
];

export const INITIAL_ACTIVITIES = [
  {
    id: "ACT-001",
    type: "REPORT_STATUS_CHANGE",
    description: "Changed status of REP-2025-004 from IN PROGRESS to RESOLVED",
    role: "ADMIN",
    user: "Dr. K. S. Venkatesh",
    reportId: "REP-2025-004",
    timestamp: "2026-11-10T15:00:00Z"
  },
  {
    id: "ACT-002",
    type: "STUDENT_APPROVAL",
    description: "Approved student registration for Aarav Patel (STU-2025-0842)",
    role: "ADMIN",
    user: "Dr. K. S. Venkatesh",
    reportId: null,
    timestamp: "2026-11-10T09:45:00Z"
  },
  {
    id: "ACT-003",
    type: "REPORT_SUBMITTED",
    description: "New report submitted: Classroom ceiling fan speed regulator broken",
    role: "STUDENT",
    user: "Aarav Patel",
    reportId: "REP-2025-001",
    timestamp: "2026-11-11T10:15:00Z"
  },
  {
    id: "ACT-004",
    type: "REPORT_UPVOTED",
    description: "Upvoted report REP-2025-002 (Water leakage near washroom)",
    role: "STUDENT",
    user: "Aarav Patel",
    reportId: "REP-2025-002",
    timestamp: "2026-11-12T09:00:00Z"
  },
  {
    id: "ACT-005",
    type: "LOCAL_SYNC",
    description: "Completed local database synchronization (3 records verified)",
    role: "ADMIN",
    user: "Dr. K. S. Venkatesh",
    reportId: null,
    timestamp: "2026-11-12T16:00:00Z"
  },
  {
    id: "ACT-006",
    type: "STUDENT_REGISTRATION",
    description: "New registration submitted for Priya Sharma (STU-2025-1109)",
    role: "STUDENT",
    user: "Priya Sharma",
    reportId: null,
    timestamp: "2026-11-13T08:15:00Z"
  }
];

export const CATEGORIES = [
  "Electrical",
  "Plumbing",
  "Classroom Facilities",
  "Washroom",
  "Cleaning",
  "Furniture",
  "Water Supply",
  "Campus Infrastructure",
  "Other"
];

export const PRIORITIES = ["Low", "Medium", "High", "Urgent"];
export const STATUSES = ["PENDING", "IN PROGRESS", "RESOLVED"];

