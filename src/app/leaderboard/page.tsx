"use client";

import { motion } from "framer-motion";
import { Trophy, Crown, Flame } from "lucide-react";
import { leaderboard } from "@/data/achievements";
import { useProgress } from "@/components/providers/progress-provider";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export default function LeaderboardPage() {
  const { xp, level, streakDays } = useProgress();

  // Inject the current learner into the ranking by XP.
  const you = { rank: 0, name: "You", xp, avatar: "🧑‍💻", country: "⭐", isYou: true };
  const rows = [...leaderboard.map((r) => ({ ...r, isYou: false })), you]
    .sort((a, b) => b.xp - a.xp)
    .map((r, i) => ({ ...r, rank: i + 1 }));

  const podium = rows.slice(0, 3);

  return (
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <Badge className="mb-4"><Trophy className="h-3.5 w-3.5" /> Weekly ranking</Badge>
        <h1 className="text-4xl font-black md:text-5xl">Leaderboard</h1>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          Earn XP by finishing lessons, acing quizzes, and shipping projects. Climb the ranks!
        </p>
      </motion.div>

      {/* Podium */}
      <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 items-end gap-4">
        {[podium[1], podium[0], podium[2]].filter(Boolean).map((p, i) => {
          const heights = ["h-28", "h-40", "h-24"];
          const place = p.rank;
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="text-3xl">{p.avatar}</div>
              <p className={cn("mt-1 text-sm font-semibold", p.isYou && "text-primary")}>{p.name}</p>
              <p className="text-xs text-muted-foreground">{p.xp} XP</p>
              <div
                className={cn(
                  "mt-2 grid w-full place-items-center rounded-t-xl bg-gradient-to-b text-white",
                  heights[i],
                  place === 1 ? "from-yellow-400 to-amber-500" : place === 2 ? "from-slate-300 to-slate-400" : "from-amber-600 to-amber-700"
                )}
              >
                {place === 1 && <Crown className="h-6 w-6" />}
                <span className="text-2xl font-black">{place}</span>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Your stats */}
      <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-primary/40 bg-primary/5 p-5">
        <div className="flex items-center justify-around text-center">
          <div>
            <p className="text-2xl font-black text-primary">{xp}</p>
            <p className="text-xs text-muted-foreground">Your XP</p>
          </div>
          <div>
            <p className="text-2xl font-black">Lv {level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
          <div className="flex items-center gap-1">
            <Flame className="h-5 w-5 text-danger" />
            <div>
              <p className="text-2xl font-black">{streakDays}</p>
              <p className="text-xs text-muted-foreground">Streak</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full table */}
      <div className="mx-auto mt-8 max-w-2xl divide-y divide-border overflow-hidden rounded-2xl border border-border">
        {rows.map((r) => (
          <div
            key={r.name + r.rank}
            className={cn(
              "flex items-center gap-4 px-5 py-3.5",
              r.isYou ? "bg-primary/10" : "bg-card"
            )}
          >
            <span className="w-6 text-center font-bold text-muted-foreground">{r.rank}</span>
            <span className="text-2xl">{r.avatar}</span>
            <span className={cn("flex-1 font-medium", r.isYou && "text-primary")}>
              {r.name} {r.isYou && <Badge variant="default" className="ml-1">you</Badge>}
            </span>
            <span className="text-sm">{r.country}</span>
            <span className="w-20 text-right font-mono font-semibold">{r.xp} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
