# 🧭 SkillRoute

An interactive platform to learn **coding, data, and AI** — from absolute zero to job-ready.
Fun enough for a curious beginner, deep enough for a future expert.

Think *Duolingo + Brilliant + Kaggle Learn*, across **23 courses in 5 tracks**: story-first
lessons, live in-browser code, a real AI mentor, projects, certificates, and full gamification.

🔗 **Live:** https://skill-route-rho.vercel.app

> 🧑‍🎓 **New to the code?** Read [`LEARN-THIS-CODEBASE.md`](./LEARN-THIS-CODEBASE.md) — a from-scratch,
> beginner-friendly walkthrough of *what, how, and why* for the entire project.

---

## 📚 The catalog — 23 courses across 5 tracks

| Track | Courses |
|---|---|
| **AI & Machine Learning** | Machine Learning · Deep Learning |
| **AI Engineering & Tools** | Python for Data Science · LLM & Generative AI Engineering · RAG (Retrieval-Augmented Generation) · Building with Claude · Git & GitHub · Computer Graphics |
| **Programming Languages** | Python · JavaScript · C++ · Java |
| **Web & Full-Stack** | Full-Stack Web Dev · React · Node.js · Spring Boot · Django |
| **Data & Analytics** | SQL · Statistics · Linear Algebra · Excel · Power BI · Tableau |

Every lesson is authored to teach a **non-technical beginner**: story → analogy → plain-English →
maths → runnable code → exercise → quiz → flashcards → mini-project → industry use → common
mistakes → interview questions → cheat sheet.

## ✨ Features

| Area | Notes |
|------|-------|
| **Premium homepage** | Animated AI-particle hero, personalized *Continue Learning* card, featured courses, light/dark |
| **Catalog** | 23 courses grouped by category with quick-nav |
| **Rich lesson engine** | The full teaching flow above, plus a sticky course outline with completion ticks |
| **Live code playground** | Real CPython via **Pyodide** (WASM) + **Monaco** editor; run, reset, hints, solutions, friendly error explanations |
| **AI Mentor** | Floating tutor on every page — **real Claude** when an API key is set, with a helpful offline fallback otherwise |
| **⌘K global search** | Command palette across all courses & lessons, full keyboard nav |
| **Certificates** | Name-only, printable / save-as-PDF, with a "Verified" seal at 100% completion |
| **Dashboard** | XP/level, streak, coins, achievements, learning heatmap, 7-day study chart, challenges |
| **Gamification** | XP, levels, coins, streaks, badges, confetti, leaderboard with you ranked in |
| **Research** | Animated *History of AI* timeline (1958 → ChatGPT) + landmark papers |
| **Interactive widgets** | Drag-to-fit regression, neuron tuner, gradient-descent sim, flip flashcards, animated quizzes |
| **Theme + a11y** | System-aware dark/light (premium light mode), keyboard focus rings, ARIA roles |
| **Notes & bookmarks** | Per-lesson, saved locally |

Everything runs with **zero backend config** — progress persists to `localStorage`, so the full
experience works immediately with no keys or database.

## 🚀 Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Requires **Node 18+**.

## 🏗️ Architecture

```
src/
├── app/                    # pages (App Router) + the /api/mentor route
├── components/
│   ├── ui/                 # design system: Button, Card, Badge, Progress, Tabs…
│   ├── layout/             # Navbar, Footer, ThemeToggle
│   ├── home/               # hero particles, CourseCard, ContinueLearning
│   ├── dashboard/          # Heatmap, StudyChart
│   ├── lesson/             # LessonView, Quiz, Flashcards, Visualizations, LessonOutline
│   ├── playground/         # Monaco + Pyodide editor
│   ├── mentor/             # AI Mentor widget
│   ├── search/             # ⌘K command palette
│   ├── certificate/        # printable certificate
│   └── providers/          # Theme + Progress/gamification store
├── data/                   # THE CONTENT: courses/, lessons/, achievements, research
├── hooks/                  # usePyodide
├── lib/                    # utils, course maths, mentor client, error explainer
└── types/                  # shared TypeScript models
```

**Design principle:** content lives in `src/data/*` and drives every screen. The UI never hard-codes
a course or lesson, so the platform scales to unlimited courses without touching components.

## 🤖 Turn on the real AI Mentor

The mentor works offline out of the box. To upgrade it to a live **Claude** tutor:

1. Create a key at **console.anthropic.com**.
2. Add `ANTHROPIC_API_KEY=...` to `.env.local` (local) **or** Vercel → Project Settings →
   Environment Variables (production).
3. Redeploy. No code changes needed — `src/app/api/mentor/route.ts` picks it up automatically.
   Model is set there (default `claude-haiku-4-5`).

## 🔌 Real accounts & cross-device sync (optional)

Progress currently lives in `localStorage`. To go multi-device with **Clerk + Supabase**:

1. `npm install @clerk/nextjs @supabase/supabase-js`
2. Fill the keys in `.env.local` (see `.env.example`).
3. Wrap `src/app/layout.tsx` in `<ClerkProvider>` and add `middleware.ts`.
4. In `src/components/providers/progress-provider.tsx`, replace the `localStorage` load/save with
   Supabase reads/writes keyed on the Clerk `userId`. **The `useProgress()` API and every component
   stay identical.**

Suggested tables: `profiles`, `lesson_progress`, `quiz_scores`, `activity`; a view ordered by `xp`
powers the leaderboard.

## 🎨 Tech stack

Next.js 14 · React 18 · TypeScript · Tailwind CSS · Framer Motion · shadcn-style components ·
Lucide icons · Recharts · Monaco Editor · Pyodide · next-themes · Anthropic SDK.

## ☁️ Deployment

Hosted on **Vercel** — every push to `main` triggers an automatic build & deploy. No config needed
(Next.js is auto-detected).

---

Built for curious humans of every age. 🌱
