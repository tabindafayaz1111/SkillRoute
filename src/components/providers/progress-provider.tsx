"use client";

/**
 * Learner progress + gamification store with local-first persistence
 * and automatic Supabase cloud synchronization.
 *
 * When signed in, user progress (XP, streak, completed lessons, notes, quiz scores)
 * is automatically fetched from Supabase, merged with any local progress, and synced
 * back across devices in real time.
 */

import * as React from "react";
import { useAuth } from "./auth-provider";
import { createClient } from "@/lib/supabase";

export interface LearnerState {
  displayName: string;
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
  displayName: "",
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

const LEGACY_STORAGE_KEY = "ml-academy:progress:v1";

function getStorageKey(userId?: string | null) {
  return userId ? `ml-academy:progress:${userId}` : LEGACY_STORAGE_KEY;
}

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
  setDisplayName: (name: string) => void;
  reset: () => void;
  syncWithCloud: () => Promise<void>;
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

/** Merges local and cloud state, keeping the best of both. */
function mergeLearnerStates(local: LearnerState, cloud?: Partial<LearnerState> | null): LearnerState {
  if (!cloud) return local;

  const completedLessons = Array.from(
    new Set([...(local.completedLessons || []), ...(cloud.completedLessons || [])])
  );
  const bookmarks = Array.from(
    new Set([...(local.bookmarks || []), ...(cloud.bookmarks || [])])
  );
  const xp = Math.max(local.xp || 0, cloud.xp || 0);
  const coins = Math.max(local.coins || 0, cloud.coins || 0);
  const streakDays = Math.max(local.streakDays || 0, cloud.streakDays || 0);
  const lastActiveISO = cloud.lastActiveISO || local.lastActiveISO;
  const displayName = cloud.displayName || local.displayName || "";
  const notes = { ...(local.notes || {}), ...(cloud.notes || {}) };
  const quizScores = { ...(local.quizScores || {}), ...(cloud.quizScores || {}) };
  const activity = { ...(local.activity || {}), ...(cloud.activity || {}) };

  return {
    displayName,
    xp,
    coins,
    streakDays,
    lastActiveISO,
    completedLessons,
    bookmarks,
    notes,
    quizScores,
    activity,
  };
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const supabase = createClient();

  const [state, setState] = React.useState<LearnerState>(DEFAULT_STATE);
  const [hydrated, setHydrated] = React.useState(false);
  const prevUserIdRef = React.useRef<string | null | undefined>(undefined);
  const syncTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Load from local storage helper
  const loadLocalState = React.useCallback((userId?: string | null): LearnerState => {
    try {
      const key = getStorageKey(userId);
      const raw = localStorage.getItem(key);
      if (raw) return { ...DEFAULT_STATE, ...JSON.parse(raw) };

      // Fallback to legacy key if user-specific key not populated yet
      if (userId) {
        const legacyRaw = localStorage.getItem(LEGACY_STORAGE_KEY);
        if (legacyRaw) return { ...DEFAULT_STATE, ...JSON.parse(legacyRaw) };
      }
    } catch {
      /* ignore storage errors */
    }
    return DEFAULT_STATE;
  }, []);

  // Sync state to Supabase cloud (user_metadata + optional user_progress table)
  const pushToCloud = React.useCallback(
    async (learnerState: LearnerState, currentUser = user) => {
      if (!currentUser) return;
      try {
        // 1. Update user_metadata in Supabase Auth (always works out of the box)
        await supabase.auth.updateUser({
          data: {
            progress: learnerState,
            display_name: learnerState.displayName || currentUser.user_metadata?.display_name,
          },
        });

        // 2. Try upserting to user_progress table if configured in database
        try {
          await (supabase as any)
            .from("user_progress")
            .upsert({
              user_id: currentUser.id,
              progress: learnerState,
              updated_at: new Date().toISOString(),
            });
        } catch {
          // Table might not exist; metadata already updated
        }
      } catch (err) {
        console.warn("Failed to sync progress to cloud:", err);
      }
    },
    [supabase, user]
  );

  // Fetch from Supabase and merge
  const syncWithCloud = React.useCallback(async () => {
    if (!user) return;

    let local = loadLocalState(user.id);
    const userMetaName = user.user_metadata?.display_name || user.email?.split("@")[0] || "";
    if (userMetaName && !local.displayName) {
      local = { ...local, displayName: userMetaName };
    }

    let cloudState: Partial<LearnerState> | null =
      (user.user_metadata?.progress as Partial<LearnerState>) || null;

    // Check table if metadata was empty
    try {
      const res = await (supabase as any)
        .from("user_progress")
        .select("progress")
        .eq("user_id", user.id)
        .maybeSingle();

      if (res?.data?.progress) {
        cloudState = { ...cloudState, ...(res.data.progress as Partial<LearnerState>) };
      }
    } catch {
      // Table might not exist; safe to ignore
    }

    const merged = mergeLearnerStates(local, {
      ...cloudState,
      displayName: userMetaName || cloudState?.displayName || local.displayName,
    });

    setState(merged);

    // Persist locally
    try {
      localStorage.setItem(getStorageKey(user.id), JSON.stringify(merged));
    } catch {
      /* ignore */
    }

    // Push merged state to cloud if local had more progress
    await pushToCloud(merged, user);
  }, [user, supabase, loadLocalState, pushToCloud]);

  // Handle user authentication transitions (sign-in, switch user, sign-out)
  React.useEffect(() => {
    const currentUserId = user?.id ?? null;

    if (prevUserIdRef.current === undefined) {
      // Initial mount
      prevUserIdRef.current = currentUserId;
      if (user) {
        syncWithCloud().finally(() => setHydrated(true));
      } else {
        const initial = loadLocalState(null);
        setState(initial);
        setHydrated(true);
      }
      return;
    }

    if (prevUserIdRef.current !== currentUserId) {
      prevUserIdRef.current = currentUserId;

      if (user) {
        // User just signed in: fetch cloud progress and populate
        syncWithCloud();
      } else {
        // User logged out: revert to guest/default state
        const guestState = loadLocalState(null);
        setState(guestState);
      }
    }
  }, [user, syncWithCloud, loadLocalState]);

  // Persist state on change and debounce cloud sync
  React.useEffect(() => {
    if (!hydrated) return;

    const storageKey = getStorageKey(user?.id);
    try {
      localStorage.setItem(storageKey, JSON.stringify(state));
    } catch {
      /* storage full / disabled */
    }

    // If user is logged in, sync to Supabase with debounce
    if (user) {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
      syncTimeoutRef.current = setTimeout(() => {
        pushToCloud(state, user);
      }, 1000);
    }

    return () => {
      if (syncTimeoutRef.current) clearTimeout(syncTimeoutRef.current);
    };
  }, [state, hydrated, user, pushToCloud]);

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

  const setDisplayName = React.useCallback(
    (name: string) => setState((prev) => ({ ...prev, displayName: name })),
    []
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
    setDisplayName,
    reset,
    syncWithCloud,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress() {
  const ctx = React.useContext(ProgressContext);
  if (!ctx) throw new Error("useProgress must be used within <ProgressProvider>");
  return ctx;
}
