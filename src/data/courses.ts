import type { Course } from "@/types";
import { languages } from "./courses/languages";
import { web } from "./courses/web";
import { analytics } from "./courses/analytics";
import { aitools } from "./courses/aitools";

/**
 * The curriculum spine. Adding a course here (or in any ./courses/* file) makes
 * it appear everywhere — home, courses grid, dashboard, search — because the UI
 * is fully data-driven. The platform scales to unlimited courses and categories
 * with no component changes.
 *
 * ML & DL have full hand-authored lesson bodies (see lessons.ts). Other courses
 * currently render with the structured lesson template until authored to depth.
 */
const aiCourses: Course[] = [
  {
    id: "machine-learning",
    title: "Machine Learning",
    tagline: "From zero to your first deployed model.",
    description:
      "Start with plain Python and end up training, evaluating, and shipping real ML models. No maths PhD required — every idea starts with a story and a picture.",
    icon: "Brain",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    accent: "#8b5cf6",
    difficulty: "Beginner",
    estimatedHours: 60,
    projectCount: 14,
    category: "AI & Machine Learning",
    featured: true,
    modules: [
      {
        id: "foundations",
        title: "Programming Foundations",
        summary: "Python, NumPy & Pandas — the tools every ML engineer lives in.",
        lessons: [
          { id: "what-is-ml", title: "What Even Is Machine Learning?", minutes: 8, xp: 40, kind: "concept" },
          { id: "python-variables", title: "Python in 10 Minutes: Variables & Types", minutes: 12, xp: 50, kind: "code" },
          { id: "loops-functions", title: "Loops & Functions (Teaching the Computer)", minutes: 14, xp: 50, kind: "code" },
          { id: "numpy-basics", title: "NumPy: Math at the Speed of Light", minutes: 15, xp: 60, kind: "code" },
          { id: "pandas-basics", title: "Pandas: Spreadsheets on Steroids", minutes: 16, xp: 60, kind: "code" },
        ],
      },
      {
        id: "data-and-stats",
        title: "Data, Stats & Intuition",
        summary: "The mental models pros use before touching a model.",
        lessons: [
          { id: "eda", title: "Exploratory Data Analysis Like a Detective", minutes: 18, xp: 70, kind: "concept" },
          { id: "probability-intuition", title: "Probability Without the Panic", minutes: 14, xp: 60, kind: "concept" },
          { id: "feature-engineering", title: "Feature Engineering: The Secret Sauce", minutes: 20, xp: 80, kind: "code" },
          { id: "train-test-split", title: "Why We Hide Data From Our Model", minutes: 12, xp: 60, kind: "concept" },
        ],
      },
      {
        id: "core-models",
        title: "Core Models",
        summary: "The algorithms that power 80% of real ML systems.",
        lessons: [
          { id: "linear-regression", title: "Linear Regression: Drawing the Best Line", minutes: 20, xp: 90, kind: "code" },
          { id: "gradient-descent", title: "Gradient Descent: Walking Downhill Blindfolded", minutes: 18, xp: 90, kind: "concept" },
          { id: "classification", title: "Classification: Teaching Yes vs No", minutes: 18, xp: 90, kind: "code" },
          { id: "overfitting", title: "Overfitting: When Models Memorize", minutes: 15, xp: 80, kind: "concept" },
          { id: "trees-and-forests", title: "Decision Trees & Random Forests", minutes: 22, xp: 100, kind: "code" },
        ],
      },
      {
        id: "shipping",
        title: "Shipping & Careers",
        summary: "Turn a notebook into a live product and a resume line.",
        lessons: [
          { id: "metrics", title: "Metrics: Is My Model Actually Good?", minutes: 16, xp: 80, kind: "concept" },
          { id: "deploy-streamlit", title: "Deploy Your Model with Streamlit", minutes: 20, xp: 110, kind: "project" },
          { id: "capstone-ml", title: "Capstone: House Price Predictor", minutes: 45, xp: 200, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "deep-learning",
    title: "Deep Learning",
    tagline: "Neural networks, Transformers & LLMs — demystified.",
    description:
      "Build intuition for how neural nets 'think', then go all the way to Transformers, attention, and the models behind ChatGPT. Visual-first, maths-second, code-always.",
    icon: "Network",
    gradient: "from-sky-500 via-cyan-500 to-emerald-500",
    accent: "#06b6d4",
    difficulty: "Intermediate",
    estimatedHours: 75,
    projectCount: 16,
    category: "AI & Machine Learning",
    featured: true,
    modules: [
      {
        id: "neural-foundations",
        title: "Neural Foundations",
        summary: "What a neuron really is and why depth matters.",
        lessons: [
          { id: "what-is-a-neuron", title: "A Neuron Is Just a Tiny Decision", minutes: 12, xp: 60, kind: "concept" },
          { id: "forward-pass", title: "The Forward Pass, Step by Step", minutes: 16, xp: 70, kind: "code" },
          { id: "backprop", title: "Backpropagation Without Tears", minutes: 22, xp: 100, kind: "concept" },
          { id: "activation-functions", title: "Activation Functions: Adding a Kink", minutes: 14, xp: 70, kind: "concept" },
        ],
      },
      {
        id: "vision",
        title: "Computer Vision",
        summary: "Teach machines to see with CNNs.",
        lessons: [
          { id: "cnn", title: "CNNs: How Machines See Edges", minutes: 20, xp: 90, kind: "concept" },
          { id: "transfer-learning", title: "Transfer Learning: Standing on Giants", minutes: 18, xp: 90, kind: "code" },
          { id: "vision-project", title: "Project: Classify Cats vs Dogs", minutes: 40, xp: 180, kind: "project" },
        ],
      },
      {
        id: "sequences",
        title: "Sequences & Language",
        summary: "From RNNs to the attention revolution.",
        lessons: [
          { id: "rnn-lstm", title: "RNNs & LSTMs: Models With Memory", minutes: 20, xp: 90, kind: "concept" },
          { id: "attention", title: "Attention Is All You Need — Explained", minutes: 24, xp: 120, kind: "concept" },
          { id: "transformers", title: "Transformers: The Modern Workhorse", minutes: 24, xp: 120, kind: "concept" },
        ],
      },
      {
        id: "genai",
        title: "Generative AI & LLMs",
        summary: "The tech behind ChatGPT, Midjourney & agents.",
        lessons: [
          { id: "llms", title: "How LLMs Actually Predict Words", minutes: 20, xp: 100, kind: "concept" },
          { id: "prompt-engineering", title: "Prompt Engineering That Works", minutes: 16, xp: 80, kind: "concept" },
          { id: "rag", title: "RAG: Giving LLMs a Memory", minutes: 22, xp: 110, kind: "code" },
          { id: "capstone-dl", title: "Capstone: Build a RAG Chatbot", minutes: 50, xp: 220, kind: "project" },
        ],
      },
    ],
  },
];

/** Every course across every category, in display order. */
export const courses: Course[] = [
  ...aiCourses,
  ...languages,
  ...web,
  ...analytics,
  ...aitools,
];

/** Category display order for the catalog page. */
export const categories: string[] = [
  "AI & Machine Learning",
  "AI Engineering & Tools",
  "Programming Languages",
  "Web & Full-Stack Development",
  "Data & Analytics",
];

/** Courses grouped by category, honoring the `categories` order. */
export function coursesByCategory() {
  return categories
    .map((name) => ({ name, items: courses.filter((c) => c.category === name) }))
    .filter((g) => g.items.length > 0);
}

/** The handful of courses surfaced on the homepage. */
export function featuredCourses() {
  return courses.filter((c) => c.featured);
}

export function getCourse(id: string) {
  return courses.find((c) => c.id === id);
}

export function allLessonMetas() {
  return courses.flatMap((c) =>
    c.modules.flatMap((m) =>
      m.lessons.map((l) => ({ ...l, courseId: c.id, moduleId: m.id, courseTitle: c.title }))
    )
  );
}

export function totalLessons() {
  return allLessonMetas().length;
}
