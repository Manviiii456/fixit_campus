// Documentation Metadata and Content Registry for FixIt Campus

import doc01Content from '../../docs/README.md?raw';
import doc02Content from '../../docs/JUDGE_RUNBOOK.md?raw';
import doc03Content from '../../docs/FIVE_TEST_CHECKLIST.md?raw';
import doc04Content from '../../docs/USER_QUICKSTART.md?raw';
import doc05Content from '../../docs/DATA_PRIVACY.md?raw';
import doc06Content from '../../docs/HANDOFF_LIMITATIONS.md?raw';

export const DOCUMENTS = [
  {
    id: "DOC-01",
    title: "README & Quickstart",
    shortDescription: "30-second project overview, problem statement, key features, architecture, and zero-secret setup instructions.",
    category: "Overview",
    readingTime: "3 min read",
    tagColor: "bg-blue-50 text-blue-700 border-blue-200",
    badgeColor: "bg-blue-600 text-white",
    cardAccent: "border-blue-200 hover:border-blue-400",
    iconName: "BookOpen",
    content: doc01Content
  },
  {
    id: "DOC-02",
    title: "Judge Runbook",
    shortDescription: "Step-by-step 60-second evaluation script for judges with inputs, expected outputs, persistence test, and local sync verification.",
    category: "Evaluation",
    readingTime: "2 min read",
    tagColor: "bg-amber-50 text-amber-700 border-amber-200",
    badgeColor: "bg-amber-600 text-white",
    cardAccent: "border-amber-200 hover:border-amber-400",
    iconName: "Timer",
    content: doc02Content
  },
  {
    id: "DOC-03",
    title: "Five-Test Checklist",
    shortDescription: "Complete QA test matrix: Happy Path, Validation & Auth Gating, Minute 40 Twist Check, State Durability, and Concurrency bounds.",
    category: "Quality Assurance",
    readingTime: "4 min read",
    tagColor: "bg-emerald-50 text-emerald-700 border-emerald-200",
    badgeColor: "bg-emerald-600 text-white",
    cardAccent: "border-emerald-200 hover:border-emerald-400",
    iconName: "CheckSquare",
    content: doc03Content
  },
  {
    id: "DOC-04",
    title: "User Quickstart",
    shortDescription: "Simple 4-step onboarding guide for students: reporting issues, upvoting defects, tracking progress timelines, and recovering from mistakes.",
    category: "User Guide",
    readingTime: "3 min read",
    tagColor: "bg-indigo-50 text-indigo-700 border-indigo-200",
    badgeColor: "bg-indigo-600 text-white",
    cardAccent: "border-indigo-200 hover:border-indigo-400",
    iconName: "Compass",
    content: doc04Content
  },
  {
    id: "DOC-05",
    title: "Data & Privacy Note",
    shortDescription: "Full transparency statement disclosing LocalStorage keys, stored schemas, zero external data transmission, and local image previews.",
    category: "Security & Privacy",
    readingTime: "3 min read",
    tagColor: "bg-cyan-50 text-cyan-700 border-cyan-200",
    badgeColor: "bg-cyan-600 text-white",
    cardAccent: "border-cyan-200 hover:border-cyan-400",
    iconName: "ShieldCheck",
    content: doc05Content
  },
  {
    id: "DOC-06",
    title: "Handoff & Limitations",
    shortDescription: "Engineering handoff documentation covering component architecture, simulated features, current boundaries, and roadmap for real-world launch.",
    category: "Architecture",
    readingTime: "4 min read",
    tagColor: "bg-rose-50 text-rose-700 border-rose-200",
    badgeColor: "bg-rose-600 text-white",
    cardAccent: "border-rose-200 hover:border-rose-400",
    iconName: "Code2",
    content: doc06Content
  }
];

