import type { Achievement } from "@/types";

export const achievements: Achievement[] = [
  { id: "first-step", title: "First Step", description: "Complete your first lesson", icon: "Footprints", requirement: 1, metric: "lessons" },
  { id: "curious-mind", title: "Curious Mind", description: "Complete 5 lessons", icon: "Sparkles", requirement: 5, metric: "lessons" },
  { id: "scholar", title: "Scholar", description: "Complete 15 lessons", icon: "GraduationCap", requirement: 15, metric: "lessons" },
  { id: "spark", title: "Spark", description: "Earn 250 XP", icon: "Zap", requirement: 250, metric: "xp" },
  { id: "powerhouse", title: "Powerhouse", description: "Earn 1000 XP", icon: "Flame", requirement: 1000, metric: "xp" },
  { id: "on-fire", title: "On Fire", description: "Hit a 3-day streak", icon: "CalendarCheck", requirement: 3, metric: "streak" },
  { id: "unstoppable", title: "Unstoppable", description: "Hit a 7-day streak", icon: "Trophy", requirement: 7, metric: "streak" },
];

/** Mock leaderboard — replace with a Supabase view ordered by xp. */
export const leaderboard = [
  { rank: 1, name: "Aisha K.", xp: 4820, avatar: "🦊", country: "🇮🇳" },
  { rank: 2, name: "Marco P.", xp: 4510, avatar: "🐼", country: "🇮🇹" },
  { rank: 3, name: "Wei L.", xp: 4230, avatar: "🦉", country: "🇸🇬" },
  { rank: 4, name: "Sara M.", xp: 3990, avatar: "🐨", country: "🇧🇷" },
  { rank: 5, name: "James O.", xp: 3710, avatar: "🦁", country: "🇬🇧" },
  { rank: 6, name: "Nadia R.", xp: 3480, avatar: "🐺", country: "🇪🇬" },
  { rank: 7, name: "Tom H.", xp: 3120, avatar: "🐯", country: "🇺🇸" },
];
