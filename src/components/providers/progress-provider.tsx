"use client";

/**
 * Local-first learner progress + gamification store.
 *
 * This intentionally persists to localStorage so the whole app is fully
 * functional with zero backend config. To go multi-device, swap the
 * `load`/`persist` functions for Supabase calls keyed on the Clerk user id
 * (see README → "Wiring up Clerk + Supabase"). The public API stays identical.
 */

import * as React from "react";

export interface LearnerState {
  xp: number;
  coins: number;
  streakDays: number;
  lastActiveISO: string | null;
  completedLessons: string[];
  bookmarks: string[];
  notes: Record<string, string>;
  quizScores: Record<string, number>;
  /** ISO date -> minutes studied, powers the heatmap. */
  activity: Record<string, number>;
}

const DEFAULT_STATE: LearnerState = {
  xp: 0,
  coins: 0,
  streakDays: 0,
  lastActiveISO: null,
  completedLessons: [],
  bookmarks: [],
  notes: {},
  quizScores: {},
  activity: {},
};

const STORAGE_KEY = "ml-academy:progress:v1";

interface ProgressContextValue extends LearnerState {
  level: number;
  xpIntoLevel: number;
  xpForNextLevel: number;
  isComplete: (lessonId: string) => boolean;
  isBookmarked: (lessonId: string) => boolean;
  completeLesson: (lessonId: string, xp: number, minutes?: number) => void;
  addXp: (amount: number) => void;
  toggleBookmark: (lessonId: string) => void;
  saveNote: (lessonId: string, text: string) => void;
  recordQuiz: (lessonId: string, scorePct: number) => void;
  reset: () => void;
}

const ProgressContext = React.createContext<ProgressContextValue | null>(null);

/** 100 XP for L1, scaling ~1.35x per level. */
export function levelFromXp(xp: number) {
  let level = 1;
  let needed = 100;
  let remaining = xp;
  while (remaining >= needed) {
    remaining -= needed;
    level += 1;
    needed = Math.round(needed * 1.35);
  }
  return { level, xpIntoLevel: remaining, xpForNextLevel: needed };
}

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function daysBetween(a: string, b: string) {
  const diff = new Date(b).getTime() - new Date(a).getTime();
  return Math.round(diff / 86_400_000);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<LearnerState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = React.useState(false);

  // Load once on mount.
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...DEFAULT_STATE, ...JSON.parse(raw) });
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist on change (after hydration).
  React.useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full / disabled */
    }
  }, [state, hydrated]);

  const touchStreak = React.useCallback((prev: LearnerState): LearnerState => {
    const today = todayISO();
    if (prev.lastActiveISO === today) return prev;
    let streak = 1;
    if (prev.lastActiveISO) {
      const gap = daysBetween(prev.lastActiveISO, today);
      streak = gap === 1 ? prev.streakDays + 1 : gap <= 0 ? prev.streakDays : 1;
    }
    return { ...prev, streakDays: streak, lastActiveISO: today };
  }, []);

  const completeLesson = React.useCallback(
    (lessonId: string, xp: number, minutes = 8) => {
      setState((prev) => {
        const base = touchStreak(prev);
        const already = base.completedLessons.includes(lessonId);
        const day = todayISO();
        return {
          ...base,
          xp: base.xp + (already ? 0 : xp),
          coins: base.coins + (already ? 0 : Math.round(xp / 4)),
          completedLessons: already
            ? base.completedLessons
            : [...base.completedLessons, lessonId],
          activity: { ...base.activity, [day]: (base.activity[day] ?? 0) + minutes },
        };
      });
    },
    [touchStreak]
  );

  const addXp = React.useCallback(
    (amount: number) =>
      setState((prev) => ({ ...touchStreak(prev), xp: prev.xp + amount })),
    [touchStreak]
  );

  const toggleBookmark = React.useCallback((lessonId: string) => {
    setState((prev) => ({
      ...prev,
      bookmarks: prev.bookmarks.includes(lessonId)
        ? prev.bookmarks.filter((b) => b !== lessonId)
        : [...prev.bookmarks, lessonId],
    }));
  }, []);

  const saveNote = React.useCallback((lessonId: string, text: string) => {
    setState((prev) => ({ ...prev, notes: { ...prev.notes, [lessonId]: text } }));
  }, []);

  const recordQuiz = React.useCallback(
    (lessonId: string, scorePct: number) => {
      setState((prev) => {
        const best = Math.max(prev.quizScores[lessonId] ?? 0, scorePct);
        const bonus = scorePct === 100 && (prev.quizScores[lessonId] ?? 0) < 100 ? 20 : 0;
        return {
          ...touchStreak(prev),
          xp: prev.xp + bonus,
          quizScores: { ...prev.quizScores, [lessonId]: best },
        };
      });
    },
    [touchStreak]
  );

  const reset = React.useCallback(() => setState(DEFAULT_STATE), []);

  const derived = levelFromXp(state.xp);

  const value: ProgressContextValue = {
    ...state,
    ...derived,
    isComplete: (id) => state.completedLessons.includes(id),
    isBookmarked: (id) => state.bookmarks.includes(id),
    completeLesson,
    addXp,
    toggleBookmark,
    saveNote,
    recordQuiz,
    reset,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within <ProgressProvider>");
  return ctx;
}
