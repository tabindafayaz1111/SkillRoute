export type Difficulty = "Beginner" | "Intermediate" | "Advanced" | "Expert";

export interface Course {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string; // lucide icon name
  gradient: string; // tailwind gradient classes
  difficulty: Difficulty;
  estimatedHours: number;
  projectCount: number;
  accent: string; // hex for charts / glows
  category: string; // groups courses on the catalog page
  featured?: boolean; // surfaced on the homepage
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  summary: string;
  lessons: LessonMeta[];
}

export interface LessonMeta {
  id: string;
  title: string;
  minutes: number;
  xp: number;
  kind: "concept" | "code" | "project" | "quiz";
}

/** A rich, pedagogically-structured lesson. */
export interface Lesson extends LessonMeta {
  courseId: string;
  moduleId: string;
  story: string;
  problem: string;
  analogy: string;
  explanation: string[];
  visualization?: LessonVisualization;
  math?: string;
  code?: { language: string; source: string; explanation: string };
  exercise?: { prompt: string; starter: string; solution: string };
  quiz: QuizQuestion[];
  flashcards: { front: string; back: string }[];
  miniProject?: { title: string; brief: string; steps: string[] };
  industryUse: string[];
  commonMistakes: string[];
  interviewQuestions: string[];
  papers: { title: string; url: string; year: number }[];
  nextUp: string[];
  cheatsheet: string[];
}

/** The rich body of a lesson (everything except the metadata + ids). */
export type LessonBody = Omit<Lesson, keyof LessonMeta | "courseId" | "moduleId">;

export type LessonVisualization =
  | { type: "linear-regression" }
  | { type: "gradient-descent" }
  | { type: "neuron" }
  | { type: "bias-variance" };

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  requirement: number;
  metric: "lessons" | "xp" | "streak" | "projects";
}
