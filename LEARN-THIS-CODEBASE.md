# 📚 Understanding SkillRoute — A Complete Beginner's Guide to Your Own Code

Welcome! This document teaches you **everything** about how SkillRoute is built — assuming you
know almost nothing about web development. We'll go slowly, explain every important concept, and
for each part answer three questions: **What is it? How does it work? Why did we do it this way?**

> **How to read this:** Start at the top and go in order the first time — each section builds on the
> last. Later, use it as a reference: jump to any section when you touch that part of the code.
> Keep the actual file open beside this guide so you can match the words to the lines.

---

## Table of contents

1. [The big picture — what SkillRoute actually is](#1-the-big-picture)
2. [The tech stack — every tool and why it's here](#2-the-tech-stack)
3. [How a Next.js app is organized (files = pages)](#3-how-nextjs-works)
4. [The folder map — where everything lives](#4-the-folder-map)
5. [TypeScript in 10 minutes (the types that describe our data)](#5-typescript)
6. [The data layer — our "content database"](#6-the-data-layer)
7. [Styling — Tailwind, themes, and the design system](#7-styling)
8. [State & memory — the Progress Provider](#8-state--the-progress-provider)
9. [The app shell — layout, providers, navbar, footer](#9-the-app-shell)
10. [Page-by-page walkthrough](#10-page-by-page)
11. [The lesson experience (the heart of the app)](#11-the-lesson-experience)
12. [The Python playground (running code in the browser)](#12-the-python-playground)
13. [The AI Mentor (real Claude + offline fallback)](#13-the-ai-mentor)
14. [The ⌘K command palette (global search)](#14-command-palette)
15. [Certificates](#15-certificates)
16. [Gamification maths (XP, levels, streaks, heatmap)](#16-gamification-maths)
17. [Patterns & conventions you'll see everywhere](#17-patterns)
18. [How to make common changes yourself](#18-how-to-make-changes)
19. [Glossary — every term in one place](#19-glossary)

---

## 1. The big picture

**What it is:** SkillRoute is a website where people learn to code, analyse data, and build with AI.
It has 21 courses, ~220 lessons, a live code playground, an AI tutor, gamification (XP, streaks,
badges), and certificates.

**The one idea that makes it all work — "data-driven UI":**
Most of the app is *not* hand-written page by page. Instead we keep the **content** (courses,
lessons, quizzes) in plain data files, and we write a small number of **components** (reusable UI
pieces) that know how to *display* any content. Add a new course to the data → it automatically
appears on the homepage, the catalog, the search, the dashboard, everywhere. No new pages needed.

Think of it like a **cookie cutter and dough**:
- The **components** are the cookie cutters (the shape).
- The **data** is the dough (the content).
- One "lesson" cookie cutter can stamp out 220 lesson pages.

**Why:** it scales. Writing 220 lesson pages by hand would be insane and impossible to maintain.
With this approach, content and design are separate, so you can change one without breaking the other.

---

## 2. The tech stack

Each tool does one job. Here's the whole team and why each is on it:

| Tool | Plain-English job | Why we chose it |
|---|---|---|
| **Next.js** | The framework. Turns files into web pages, handles routing, and runs a small server. | Industry standard for React apps; gives us pages, an API, and fast builds for free. |
| **React** | The library for building UI out of reusable "components". | The most popular way to build interactive UIs; everything is components. |
| **TypeScript** | JavaScript + type labels. Catches mistakes before you run the code. | Autocomplete + it screams at you when you use data wrongly (a lifesaver). |
| **Tailwind CSS** | Styling by putting tiny classes on elements (`p-4` = padding, `flex` = row). | Fast, consistent styling without writing separate CSS files. |
| **Framer Motion** | Animations (things fading/sliding in). | Simple, smooth animations with one line. |
| **Lucide** | Icon set (the little pictures). | Clean icons you use by name. |
| **Recharts** | Charts (the dashboard's study-hours graph). | Easy React charts. |
| **Monaco** | The code editor (same engine as VS Code). | Real editor feel in the browser. |
| **Pyodide** | Runs actual Python **inside the browser** (compiled to WebAssembly). | Learners run real code with zero install. |
| **next-themes** | Dark/light mode switching. | Handles system preference + saving your choice. |
| **@anthropic-ai/sdk** | Talks to Claude (the AI mentor). | Official way to call the Claude API. |

**Mental model:** Next.js is the *stadium*, React is the *game*, TypeScript is the *referee*,
Tailwind is the *uniforms*, and the rest are *special equipment* for specific plays.

---

## 3. How Next.js works

### Files become pages (the "App Router")
Look in `src/app/`. **Every folder with a `page.tsx` becomes a URL.**

| File | URL it creates |
|---|---|
| `src/app/page.tsx` | `/` (homepage) |
| `src/app/dashboard/page.tsx` | `/dashboard` |
| `src/app/courses/page.tsx` | `/courses` |
| `src/app/research/page.tsx` | `/research` |

### Square brackets = "fill in the blank" (dynamic routes)
`src/app/learn/[courseId]/[lessonId]/page.tsx` handles URLs like
`/learn/sql/sql-joins`. Next.js reads `courseId = "sql"` and `lessonId = "sql-joins"` from the URL
and hands them to the page. That single file renders **all ~220 lessons**.

### `layout.tsx` = the frame around every page
`src/app/layout.tsx` wraps every page with the navbar, footer, and shared providers, so you don't
repeat them on each page. It's the picture frame; pages are the photos you swap in.

### Server components vs client components
By default, Next.js components run on the **server** (fast, no JavaScript shipped). But anything
**interactive** (uses clicks, state, browser features) must be a **client component**, marked with
`"use client";` at the very top of the file.

- No `"use client"` → server component (e.g. static content).
- `"use client"` → runs in the browser (e.g. the quiz, the playground, anything with `useState`).

**Why it matters:** if you use `useState`, `onClick`, or `localStorage` in a file without
`"use client"`, Next.js will error. That one line is the switch.

### The API route
`src/app/api/mentor/route.ts` is **not** a page — it's a mini backend endpoint at `/api/mentor`.
The browser sends it a question, it calls Claude on the server (where the secret API key is safe),
and sends back an answer. Secrets never touch the browser.

---

## 4. The folder map

```
src/
├── app/                    # PAGES + the API route (Next.js App Router)
│   ├── layout.tsx          # the frame around every page (providers, navbar, footer)
│   ├── globals.css         # global styles + the color "design tokens"
│   ├── page.tsx            # homepage
│   ├── dashboard/page.tsx
│   ├── courses/page.tsx            # catalog (grouped by category)
│   ├── courses/[courseId]/page.tsx # one course's outline
│   ├── learn/[courseId]/[lessonId]/page.tsx  # ONE file renders every lesson
│   ├── playground/page.tsx
│   ├── research/page.tsx
│   ├── leaderboard/page.tsx
│   ├── certificate/page.tsx
│   └── api/mentor/route.ts # backend endpoint for the AI tutor
│
├── components/             # REUSABLE UI pieces
│   ├── ui/                 # design-system atoms: Button, Card, Badge, Progress, Tabs, Slot
│   ├── layout/             # Navbar, Footer, ThemeToggle
│   ├── home/               # Hero particles, CourseCard, ContinueLearning
│   ├── dashboard/          # Heatmap, StudyChart
│   ├── lesson/             # LessonView, Quiz, Flashcards, Visualizations, LessonOutline
│   ├── playground/         # PythonEditor (Monaco + Pyodide)
│   ├── mentor/             # AiMentor floating widget
│   ├── search/             # CommandPalette (⌘K)
│   ├── certificate/        # the printable Certificate
│   ├── providers/          # ThemeProvider + ProgressProvider (app-wide state)
│   └── icon.tsx            # render any Lucide icon by its string name
│
├── data/                   # THE CONTENT ("CMS") — no UI here, just facts
│   ├── courses.ts          # the 21 courses (merged from courses/*), + helper functions
│   ├── courses/            # course outlines by category (languages, web, analytics, aitools)
│   ├── lessons.ts          # merges all lesson bodies + getLesson() + fallback template
│   ├── lessons/            # full lesson content, one file per course
│   ├── achievements.ts     # badges + mock leaderboard
│   └── research.ts         # AI history timeline + landmark papers
│
├── hooks/                  # custom React hooks
│   └── use-pyodide.ts      # loads + runs Python in the browser
├── lib/                    # plain helper functions (no UI)
│   ├── utils.ts            # cn(), clamp(), formatCompact()
│   ├── course-utils.ts     # progress maths, next/adjacent lesson
│   ├── mentor.ts           # AI mentor client + offline answers
│   └── error-explainer.ts  # turns Python errors into friendly hints
└── types/index.ts          # TypeScript shapes for all our data
```

**Rule of thumb:** `data/` = *what* (facts). `components/` + `app/` = *how it looks*.
`lib/` + `hooks/` = *reusable logic*. `types/` = *the shape contracts*.

---

## 5. TypeScript

TypeScript is JavaScript with **labels that describe the shape of your data**. Those labels live in
`src/types/index.ts`. Example:

```ts
export interface LessonMeta {
  id: string;        // a unique code like "sql-joins"
  title: string;     // "JOINs: Connecting Tables"
  minutes: number;   // 20
  xp: number;        // 90
  kind: "concept" | "code" | "project" | "quiz";  // ONLY one of these 4 words
}
```

- `interface` = "here's the shape of a thing". `LessonMeta` describes the *summary* of a lesson.
- `string`, `number` = the type of each field.
- `"concept" | "code" | ...` is a **union type**: `kind` must be exactly one of those words.
  If you type `kind: "video"`, TypeScript refuses to build — a typo caught before it ships.

Two more you'll see a lot:

```ts
export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";
export type LessonBody = Omit<Lesson, keyof LessonMeta | "courseId" | "moduleId">;
```

- `Difficulty` is a reusable union (used by every course).
- `LessonBody` uses `Omit<...>`, which means *"take the full `Lesson` type but remove these fields"*.
  A lesson's *body* is everything except its metadata and ids (because those live elsewhere).
  This is TypeScript **reusing** a definition instead of repeating it.

**Why bother?** Autocomplete everywhere, and the build fails loudly if you give a course a field it
doesn't expect. Types are documentation that can't go out of date.

---

## 6. The data layer

This is the "database", except it's just TypeScript files (no server database needed).

### 6a. `data/courses.ts` — the course catalog
Each course is an object matching the `Course` type: `id`, `title`, `gradient` (its colors),
`icon`, `difficulty`, `category`, `featured`, and `modules` (each module has `lessons`).

The two ML/DL courses are written inline; the other 19 are imported from `data/courses/*.ts` and
**merged**:

```ts
export const courses: Course[] = [
  ...aiCourses,     // ML + DL
  ...languages,     // Python, JS, C++, Java
  ...web,           // Full-Stack, React, Node, Spring, Django
  ...analytics,     // SQL, Statistics, Excel, Power BI, Tableau, Linear Algebra
  ...aitools,       // Data Science, GenAI, Git, Graphics
];
```

`...` is the **spread operator** — "unpack all items of this array into the new array". So `courses`
becomes one big list of all 21.

Helper functions at the bottom compute things once, so every screen agrees:

```ts
export function getCourse(id) { return courses.find((c) => c.id === id); }
export function coursesByCategory() { /* groups courses under their category */ }
export function featuredCourses() { return courses.filter((c) => c.featured); }
export function allLessonMetas() { /* flattens every course → a flat list of lessons */ }
```

- `.find(...)` returns the first match; `.filter(...)` returns *all* matches; `.map(...)` transforms
  each item. These three array methods are used constantly across the app — learn them once.

### 6b. `data/lessons.ts` — the lesson engine
This file:
1. Imports every lesson-content file (`data/lessons/*.ts`).
2. Merges them into one big `authored` object keyed by lesson id.
3. Exposes **`getLesson(courseId, lessonId)`** — the function every lesson page calls.

The clever bit is the **graceful fallback**:

```ts
export function getLesson(courseId, lessonId): Lesson | null {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;
  for (const mod of course.modules) {
    const meta = mod.lessons.find((l) => l.id === lessonId);
    if (meta) {
      const body = authored[lessonId];         // full hand-written content?
      if (body) return { ...meta, courseId, moduleId: mod.id, ...body };
      return buildFallback(meta, courseId, mod.id);  // else a structured template
    }
  }
  return null;   // lesson id doesn't exist → the page shows "not found"
}
```

**Why:** if a lesson body exists, use it; if not, still render a useful structured page instead of a
crash. Every one of our 220 lessons now has a body, but the safety net remains for any future gap.

### 6c. `data/lessons/*.ts` — the actual teaching content
One file per course (e.g. `sql.ts`, `react.ts`). Each exports a `Record<string, LessonBody>` — an
object where each key is a lesson id and the value is the full lesson (story, analogy, code, quiz,
flashcards, project, etc.). This is where the "teach it to a beginner" writing lives.

---

## 7. Styling

### 7a. Tailwind — styling with class names
Instead of a separate CSS file, you add small classes to elements:

```tsx
<div className="flex items-center gap-2 rounded-xl bg-card p-4 shadow-soft">
```
- `flex items-center` = lay children in a row, centered vertically.
- `gap-2` = space between them. `p-4` = padding. `rounded-xl` = rounded corners.
- `bg-card` = background using our "card" color. `shadow-soft` = our custom soft shadow.

**Why:** you style right where you build, consistently, and you never hunt through CSS files.

### 7b. Design tokens & theming — `app/globals.css`
Colors aren't hard-coded. We define **CSS variables** once, for light and dark:

```css
:root {                 /* light mode */
  --background: 220 40% 98%;
  --primary: 262 83% 58%;
  ...
}
.dark {                 /* dark mode */
  --background: 240 14% 6%;
  --primary: 262 83% 66%;
  ...
}
```

Tailwind maps these to class names (in `tailwind.config.ts`): `bg-background`, `text-primary`, etc.
So `bg-primary` means "use whatever `--primary` is *right now*". Flip to dark mode and every color
changes at once — because they all point at the same variables. That's why the whole site re-themes
instantly. We also define **`--shadow-soft`/`--shadow-lift`** so cards have real depth in light mode.

### 7c. `cn()` — the class-combining helper (`lib/utils.ts`)
```ts
export function cn(...inputs) { return twMerge(clsx(inputs)); }
```
- `clsx` joins class names and lets you add them conditionally (`active && "bg-primary"`).
- `twMerge` resolves Tailwind conflicts (if two paddings collide, the last wins).
You'll see `cn(...)` in nearly every component — it's how we build the final `className` string.

### 7d. The UI design system — `components/ui/`
Small, reusable building blocks so everything looks consistent:
- **`button.tsx`** uses `class-variance-authority` (`cva`) to define **variants** (`default`,
  `gradient`, `outline`, `ghost`…) and **sizes**. `<Button variant="gradient" size="lg">` picks a
  pre-defined look. Write the styles once, reuse everywhere.
- **`card.tsx`, `badge.tsx`, `progress.tsx`, `tabs.tsx`** — the same idea for boxes, tags, progress
  bars, and tab switchers.
- **`slot.tsx`** powers the `asChild` trick: `<Button asChild><Link/></Button>` makes the Link *look*
  like a button without nesting a button inside a link (which is invalid HTML).

---

## 8. State & the Progress Provider

**The problem:** many parts of the app need the same live data — your XP, streak, which lessons you
finished. We don't want to pass that through 10 layers of components by hand.

**The solution: React Context** — a way to put data in one place and let any component "plug in".
That place is `src/components/providers/progress-provider.tsx`. This is the app's memory. Let's read
the important parts.

### The shape of what we remember
```ts
export interface LearnerState {
  displayName: string;
  xp: number;
  streakDays: number;
  completedLessons: string[];  // ids of finished lessons
  bookmarks: string[];
  notes: Record<string, string>;
  quizScores: Record<string, number>;
  activity: Record<string, number>;  // "2026-07-02" -> minutes studied (powers the heatmap)
  ...
}
```

### Loading & saving (this is what makes progress "stick")
```ts
const [state, setState] = React.useState(DEFAULT_STATE);   // the live data
const [hydrated, setHydrated] = React.useState(false);

React.useEffect(() => {                       // runs ONCE when the app loads
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });  // restore saved progress
  setHydrated(true);
}, []);

React.useEffect(() => {                        // runs whenever `state` changes
  if (!hydrated) return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));  // save it
}, [state, hydrated]);
```

Concepts here:
- **`useState`** gives you a value (`state`) and a setter (`setState`). Changing it re-renders the UI.
- **`useEffect(fn, [])`** runs `fn` once after the first render (the empty `[]` means "no
  dependencies, run once"). We use it to *load* saved data.
- **`useEffect(fn, [state])`** runs whenever `state` changes. We use it to *save*.
- **`localStorage`** is the browser's tiny key-value store that survives refreshes. We store the
  whole state as JSON. That's why your XP is still there tomorrow — no server needed.
- **`hydrated`** guards against overwriting saved data with defaults on the very first render.

### The actions (how the rest of the app changes state)
```ts
const completeLesson = React.useCallback((lessonId, xp, minutes = 8) => {
  setState((prev) => {
    const already = prev.completedLessons.includes(lessonId);
    return {
      ...prev,
      xp: prev.xp + (already ? 0 : xp),          // award XP only the first time
      completedLessons: already ? prev.completedLessons : [...prev.completedLessons, lessonId],
      activity: { ...prev.activity, [today]: (prev.activity[today] ?? 0) + minutes },
    };
  });
}, []);
```
- **`useCallback`** keeps the function identity stable between renders (a small performance nicety).
- We **never mutate** `prev` directly; we build a **new object** with `...prev` and change a few
  fields. React only notices changes when the object reference is new — this is the golden rule of
  React state.
- `prev.activity[today] ?? 0` — the `??` is "if that's missing, use 0".

### Sharing it
```ts
return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
```
Any component can then call **`useProgress()`** to read state and call actions:
```ts
const { xp, completeLesson, isComplete } = useProgress();
```
The navbar reads `xp` and `streakDays`; the lesson page calls `completeLesson`; the dashboard reads
`activity`. All from this one shared brain.

> **To sync across devices later:** swap the two `localStorage` lines for Supabase reads/writes keyed
> on a Clerk `userId`. Every component keeps working because the public API (`useProgress`) is unchanged.

---

## 9. The app shell

### `app/layout.tsx` — wraps everything
```tsx
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
  <ProgressProvider>
    <Navbar />
    <main>{children}</main>
    <Footer />
    <AiMentor />
  </ProgressProvider>
</ThemeProvider>
```
- `ThemeProvider` (from next-themes) toggles a `dark` class on `<html>` → all the CSS variables flip.
- `ProgressProvider` (ours) gives every page the learner state.
- `{children}` is "whatever page you're on".
- `Navbar`, `Footer`, `AiMentor` appear on *every* page because they're here, not in each page.

The `metadata` object here sets the browser tab title and SEO description.

### `components/layout/navbar.tsx`
- Marked `"use client"` because it has state (the search palette open/close) and reads `useProgress`.
- `usePathname()` tells it the current URL so it can highlight the active link.
- It renders the logo, nav links (from a `links` array — data-driven again), your streak/level/XP
  badges, the theme toggle, the search button, and it mounts the `<CommandPalette>`.

### `components/icon.tsx`
Our data stores icons as **strings** (`"Database"`). This helper turns a string into the real Lucide
icon component: `Icons[name]`. Why? Data files can't easily hold React components, but they can hold
names — so we look the component up at render time.

---

## 10. Page by page

- **Homepage (`app/page.tsx`)** — client component. Sections: animated hero (with `AiParticles`),
  the **ContinueLearning** card (personalized), featured course cards, feature grid, CTA. Copy is
  broadened to "coding, data, and AI".
- **Catalog (`app/courses/page.tsx`)** — calls `coursesByCategory()` and renders each track with a
  heading and a grid of `CourseCard`s, plus a category quick-nav.
- **Course outline (`app/courses/[courseId]/page.tsx`)** — reads `courseId` from the URL, finds the
  course, lists its modules and lessons with links into the lesson experience.
- **Lesson (`app/learn/[courseId]/[lessonId]/page.tsx`)** — calls `getLesson(...)`; if found, renders
  `<LessonView>`; if not, a friendly not-found. (See section 11.)
- **Dashboard (`app/dashboard/page.tsx`)** — reads the progress store: XP/level, streak, the
  `Heatmap` and `StudyChart`, achievements (compared against your stats), challenges, continue card.
- **Playground (`app/playground/page.tsx`)** — a standalone `PythonEditor` with example snippets.
- **Research (`app/research/page.tsx`)** — maps over `aiTimeline` from data to draw the animated
  timeline, plus landmark papers.
- **Leaderboard (`app/leaderboard/page.tsx`)** — the mock `leaderboard` array with *you* injected by
  your real XP so you see yourself ranked.
- **Certificate (`app/certificate/page.tsx`)** — see section 15.

---

## 11. The lesson experience

`components/lesson/lesson-view.tsx` is the biggest component. It receives a `lesson` and a `course`
and renders the whole learning page. Key ideas:

- A small **`Section`** helper wraps each block (Story, Problem, Analogy, …) with an icon, a title,
  and a fade-in animation (Framer Motion's `whileInView` animates it as you scroll to it).
- It renders each field of the lesson in a deliberate teaching order: **story → problem → analogy →
  visual → plain-English → maths → code → exercise → quiz → flashcards → project → industry → common
  mistakes → interview Qs → papers → your notes → cheat sheet.** That order *is* the pedagogy.
- **Completion:** a "Mark complete" button calls `completeLesson(...)` and fires `<Confetti/>`.
- **Bookmark & notes:** call `toggleBookmark` and `saveNote` (notes save on blur — when you click away).
- **Prev/Next** buttons use `adjacentLessons(course, lessonId)` from `lib/course-utils.ts`.
- The sticky sidebar renders **`<LessonOutline>`**, which lists every module/lesson with a ✓ for the
  ones you've completed, highlights the current one, and shows a course progress bar.

Interactive sub-components:
- **`quiz.tsx`** — tracks the selected answer, shows right/wrong with an explanation, and reports your
  score via `recordQuiz`. Getting 100% grants bonus XP.
- **`flashcards.tsx`** — click to flip (a CSS/Framer rotation), step through the deck.
- **`visualizations.tsx`** — small interactive diagrams (a draggable line-fit, a neuron weight tuner,
  a gradient-descent animation). Only shown for lessons whose `visualization` field is set.

---

## 12. The Python playground

**The magic:** real Python runs in your browser — no server, no install — thanks to **Pyodide**
(CPython compiled to WebAssembly).

### `hooks/use-pyodide.ts`
A **custom hook** = a reusable function that uses React state/effects. This one:
1. Loads the Pyodide runtime from a CDN the first time it's needed (that's the initial few-second
   wait). It caches it on `window` so it only loads once.
2. Exposes a `run(code)` function that executes Python and captures whatever it `print`s (by
   redirecting Python's `stdout`).
3. Returns `{ ready, loading, run }` so the editor can show a loading state.

### `components/playground/python-editor.tsx`
- Wraps **Monaco** (the VS Code editor) via `@monaco-editor/react`.
- Buttons: **Run** (calls `run`), **Reset** (restore starter code), **Hint**, **Solution**
  (if the lesson provided one), and an **output console**.
- If Python throws an error, `lib/error-explainer.ts` matches the error text and adds a friendly,
  plain-English explanation ("`NameError` usually means a typo in a variable name…").

> Note: JS/SQL/C++/Java lessons show real code with full explanations, but the **Run** button executes
> Python only for now (Pyodide is a Python runtime). Multi-language execution is a possible next step.

---

## 13. The AI Mentor

Two layers so it works with **or without** an API key.

### `lib/mentor.ts` (runs in the browser)
- `askMentor(question, history)` sends a `fetch` POST to `/api/mentor` and returns the reply.
- If that fails (offline/no key), it falls back to `localMentorReply(...)` — a keyword responder with
  real, pre-written answers for common topics (layers, gradient descent, Pandas, "I'm overwhelmed"…).
  If nothing matches, it honestly says it's in offline mode and points to the fix.

### `app/api/mentor/route.ts` (runs on the server)
- Reads `ANTHROPIC_API_KEY` from the environment. **If it's missing**, it returns the offline answer
  (no crash, no cost).
- **If present**, it calls Claude with the official SDK:
  ```ts
  const client = new Anthropic({ apiKey });
  const res = await client.messages.create({
    model: "claude-haiku-4-5",   // fast + cheap, good for a tutor
    max_tokens: 700,
    system: SYSTEM_PROMPT,        // "teach a non-technical beginner, warmly, answer the real question"
    messages,                     // the conversation so far
  });
  ```
- The `SYSTEM_PROMPT` is the mentor's personality and rules. The `messages` array is the chat history
  converted to the API's `user`/`assistant` format.
- Any API error → it quietly falls back to the offline answer.

**Why a server route?** The API key must stay secret. Server code (the route) can read it; browser
code can't. The browser only ever talks to *our* `/api/mentor`, never to Claude directly.

### `components/mentor/ai-mentor.tsx`
The floating chat bubble (bottom-right, on every page). Manages the open/closed state, the message
list, a typing indicator, and suggestion chips. Purely UI — it calls `askMentor` and shows the reply.

---

## 14. Command palette

`components/search/command-palette.tsx` is the ⌘K / Ctrl+K search.

- `buildResults(query)` filters `courses` and `allLessonMetas()` by your text and returns a combined
  list (courses first, then matching lessons).
- A global `keydown` listener (in a `useEffect`) opens it on ⌘K and closes on Escape.
- Arrow keys move an `active` index; Enter navigates with Next's `useRouter().push(href)`.
- It's mounted once inside the navbar; the search buttons just set `open = true`.

This is a great file to study **keyboard handling** and **filtering data** in React.

---

## 15. Certificates

`app/certificate/page.tsx` + `components/certificate/certificate.tsx`.

- You type **only your name**; it's saved to the progress store via `setDisplayName`.
- You pick any course (the list shows each course's completion %). The **`Certificate`** component
  renders a live, styled preview with your name, the course, the date, and a unique certificate id.
- If the course is 100% complete, the seal reads **"Verified"**; otherwise **"Self-issued"**.
- **Print / Save as PDF** calls `window.print()`. Special CSS in `globals.css` under `@media print`
  hides everything except the element with class `certificate-print`, so only the certificate prints.

---

## 16. Gamification maths

In `progress-provider.tsx`:

### Levels from XP
```ts
export function levelFromXp(xp) {
  let level = 1, needed = 100, remaining = xp;
  while (remaining >= needed) {   // keep "leveling up" while you can afford the next level
    remaining -= needed;
    level += 1;
    needed = Math.round(needed * 1.35);  // each level costs 35% more than the last
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: needed };
}
```
Level 1 needs 100 XP, level 2 needs 135, then 182… a gentle curve so early wins feel fast.

### Streaks
`touchStreak` compares today's date with your `lastActiveISO`:
- Same day → no change.
- Exactly 1 day later → streak + 1.
- Bigger gap → streak resets to 1.

### Heatmap
Every completed lesson adds minutes to `activity[today]`. `components/dashboard/heatmap.tsx` draws
the last ~17 weeks as coloured squares, darker = more minutes (like GitHub's contribution graph).
Dates are computed **after mount** (in `useEffect`) so the server and browser markup match.

---

## 17. Patterns

You'll see these again and again — learn them once and the whole codebase reads easily:

- **`"use client"`** at the top → this file runs in the browser (needed for state/clicks/effects).
- **`cn(...)`** → build a className, merging Tailwind classes safely.
- **`...spread`** → copy an object/array and tweak a few fields (React state; merging data).
- **`.map()`** in JSX → turn a list of data into a list of elements (`courses.map(c => <Card/>)`).
  Each needs a unique `key` prop so React can track it.
- **`useState` / `useEffect` / `useCallback`** → the core React hooks (value+setter / run-on-change /
  stable function).
- **`forwardRef`** (in the ui/ atoms) → lets a parent attach a ref to the inner DOM element.
- **`cva` variants** → named style options for a component (`variant`, `size`).
- **Data-driven rendering** → the UI reads from `data/`; you rarely hard-code content.
- **Deterministic values** → we avoid `Math.random()` / `Date.now()` during render (they'd differ
  between server and browser and cause "hydration" warnings); dates are set in `useEffect` instead.

---

## 18. How to make changes

**Add a whole new course:** add a `Course` object to the right file in `data/courses/` (copy an
existing one, change the fields, pick a unique `id`, a `gradient`, an `icon` name, and list modules
& lessons). It instantly shows up everywhere. (If you invent a brand-new gradient color, the safelist
in `tailwind.config.ts` already covers the common Tailwind colors.)

**Add real content to a lesson:** open the matching file in `data/lessons/` and add/extend the entry
keyed by the lesson id, following the `LessonBody` shape (story, analogy, code, quiz, …).

**Change the colors/theme:** edit the CSS variables in `app/globals.css` (`:root` for light, `.dark`
for dark). Everything using `bg-primary`, `text-accent`, etc. updates automatically.

**Add a new page:** create `src/app/your-page/page.tsx` with a default-exported React component. It's
live at `/your-page`. Add a link in the navbar's `links` array if you want it in the menu.

**Turn on the real AI mentor:** put `ANTHROPIC_API_KEY=...` in `.env.local` (local) or in Vercel's
Environment Variables (production), then redeploy. No code change needed.

**After any change:** run `npm run build` to catch errors, then commit and push — Vercel auto-deploys.

---

## 19. Glossary

- **Framework (Next.js):** the scaffolding that turns your files into a running website.
- **Component:** a reusable piece of UI, written as a function that returns JSX.
- **JSX:** the HTML-like syntax inside React (`<div>...</div>` mixed with JavaScript).
- **Props:** the inputs you pass to a component (`<Button variant="gradient">` — `variant` is a prop).
- **State:** data a component remembers and can change (via `useState`); changing it re-renders.
- **Hook:** a special function starting with `use` that plugs into React features (`useState`,
  `useEffect`, or our own `usePyodide`, `useProgress`).
- **Context / Provider:** a way to share state with many components without passing props down manually.
- **Server component:** runs on the server, ships no JS (the default).
- **Client component:** runs in the browser (`"use client"`), needed for interactivity.
- **Route:** a URL; created by a `page.tsx` file. Dynamic routes use `[brackets]`.
- **API route:** a backend endpoint (`route.ts`) — where secrets and server logic live.
- **Tailwind class:** a tiny styling class like `p-4`, `flex`, `bg-card`.
- **Design token:** a named color/size (a CSS variable) reused everywhere so theming is one change.
- **localStorage:** the browser's small storage that survives refreshes (holds your progress).
- **Pyodide:** Python compiled to run inside the browser via WebAssembly.
- **WebAssembly (WASM):** a fast, portable format that lets non-JS languages run in the browser.
- **Hydration:** React "waking up" server-rendered HTML in the browser; markup must match or it warns.
- **Spread (`...`):** unpack an array/object into a new one.
- **Deploy:** publish the site (Vercel does this automatically on every `git push`).

---

### You now have the full map 🗺️
Open any file and you should recognise the pattern: is it a **page** (in `app/`), a **component**
(in `components/`), **content** (in `data/`), or **logic** (in `lib/`/`hooks/`)? Is it interactive
(`"use client"`)? What data does it read? That's 90% of understanding any line here.

Happy building — it's your project now. 🌱
