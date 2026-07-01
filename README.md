# 🧠 ML Academy

An interactive platform to learn **Machine Learning & Deep Learning** from absolute zero to
industry-ready — built to be fun enough for a curious beginner and deep enough for a future expert.

Think *Duolingo + Brilliant + Kaggle Learn*, focused entirely on ML & DL: story-first lessons,
live in-browser Python, an AI mentor, projects, and full gamification.

---

## ✨ What's built and working right now

| Area | Status | Notes |
|------|--------|-------|
| **Premium homepage** | ✅ | Animated AI-particle hero, gradient design, data-driven course cards |
| **Dashboard** | ✅ | XP/level, streak, coins, achievements, **learning heatmap**, 7-day study chart, daily/weekly challenges, continue-learning |
| **Data-driven curriculum** | ✅ | ML + DL courses, modules, lessons — add a course object and it appears everywhere |
| **Rich lesson engine** | ✅ | Story → problem → analogy → interactive visual → plain English → maths → runnable Python → exercise → quiz → flashcards → mini-project → industry use → common mistakes → interview Qs → papers → notes → cheat sheet |
| **Live Python playground** | ✅ | Real CPython via **Pyodide** (WASM) + **Monaco** editor. NumPy / Pandas / scikit-learn. Run, reset, hint, solution, plain-English error explanations |
| **Interactive widgets** | ✅ | Drag-slider linear-regression fit, neuron weight tuner, gradient-descent simulator, flip flashcards, animated quiz |
| **AI Mentor** | ✅ | Floating Socratic tutor on every page (rule-based now; one function swap to a real Claude LLM) |
| **Gamification** | ✅ | XP, levels, coins, streaks, badges/achievements, confetti, leaderboard with you ranked in |
| **Research / History of AI** | ✅ | Animated timeline (1958 → ChatGPT) + landmark papers |
| **Dark / light theme** | ✅ | System-aware, persisted |
| **Responsive + accessible** | ✅ | Mobile-first, keyboard-focus rings, ARIA roles, semantic HTML |
| **Notes & bookmarks** | ✅ | Per-lesson notes + bookmarks, saved locally |

Everything runs with **zero backend config** — progress persists to `localStorage` so you can try
the full experience immediately.

## 🧭 Honest scope note

The original brief lists *hundreds* of features and a complete multi-hundred-lesson curriculum —
realistically a team-months effort. This repository is a **production-structured, fully runnable
foundation** that implements the core platform end-to-end and is architected so the rest plugs in
cleanly:

- **3 lessons are authored in full depth** (`what-is-ml`, `linear-regression`, `what-is-a-neuron`).
- **Every other lesson in the outline renders** via a structured fallback template (clearly badged
  "Structured preview") instead of 404-ing. Authoring a new lesson = add one object to
  `src/data/lessons.ts`; no component changes.
- **Clerk & Supabase** are wired conceptually (see below) but the app runs on a local store so it
  works offline with no keys.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Requires Node 18+.

## 🏗️ Architecture

```
src/
├── app/                      # Next.js App Router
│   ├── page.tsx              # Homepage
│   ├── dashboard/            # Learner dashboard
│   ├── courses/[courseId]/   # Course outline (dynamic)
│   ├── learn/[courseId]/[lessonId]/   # Lesson experience (dynamic)
│   ├── playground/           # Standalone Python playground
│   ├── research/             # History of AI
│   └── leaderboard/
├── components/
│   ├── ui/                   # Design system (Button, Card, Badge, Progress, Tabs…)
│   ├── layout/               # Navbar, Footer, ThemeToggle
│   ├── home/                 # Hero particles, CourseCard
│   ├── dashboard/            # Heatmap, StudyChart
│   ├── lesson/               # LessonView, Quiz, Flashcards, Visualizations
│   ├── playground/           # Monaco + Pyodide PythonEditor
│   ├── mentor/               # AI Mentor widget
│   └── providers/            # Theme + Progress/gamification store
├── data/                     # courses, lessons, achievements, research (the "CMS")
├── hooks/                    # usePyodide
├── lib/                      # utils, course math, mentor brain, error explainer
└── types/                    # Shared TypeScript models
```

**Design principle:** content lives in `src/data/*` and drives every screen. The UI never hard-codes
a course or lesson, so the platform scales to unlimited courses without touching components.

## 🔌 Wiring up Clerk + Supabase (optional, for real accounts & cross-device sync)

The learner store (`src/components/providers/progress-provider.tsx`) exposes a clean API
(`completeLesson`, `addXp`, `toggleBookmark`, …). To go multi-device:

1. `npm install @clerk/nextjs @supabase/supabase-js`
2. Copy `.env.example` → `.env.local` and fill in the keys.
3. Wrap `src/app/layout.tsx` in `<ClerkProvider>` and add `middleware.ts`.
4. In the progress provider, replace the `localStorage` `load`/`persist` calls with Supabase reads
   /writes keyed on the Clerk `userId`. **The public API and every component stay identical.**

Suggested Supabase tables: `profiles`, `lesson_progress`, `quiz_scores`, `activity`. A view ordered
by `xp` powers the leaderboard.

## 🤖 Upgrading the AI Mentor to a real LLM

`src/lib/mentor.ts` has a single `askMentor(question, history)` function (rule-based today).
Replace its body with a `fetch("/api/mentor")` call to a route handler that uses the Anthropic SDK
(recommended model: `claude-opus-4-8`, or `claude-sonnet-5` for lower latency). Keep the signature
and the chat UI won't change. The system prompt should enforce the mentor rule: *guide with a
question first, reveal step by step — never dump the answer.*

## 🎨 Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · shadcn-style components ·
Lucide icons · Recharts · Monaco Editor · Pyodide · next-themes.

---

Built for curious humans of every age. 🌱
