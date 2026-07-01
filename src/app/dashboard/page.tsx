"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Flame,
  Zap,
  Trophy,
  Target,
  Clock,
  CheckCircle2,
  Coins,
  ArrowRight,
  Swords,
  CalendarDays,
  Sparkles,
  Lock,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icon";
import { Heatmap } from "@/components/dashboard/heatmap";
import { StudyChart } from "@/components/dashboard/study-chart";
import { useProgress } from "@/components/providers/progress-provider";
import { courses } from "@/data/courses";
import { achievements } from "@/data/achievements";
import { courseProgress, nextLesson } from "@/lib/course-utils";

export default function DashboardPage() {
  const p = useProgress();

  const totalMinutes = Object.values(p.activity).reduce((a, b) => a + b, 0);
  const primary = courses[0];
  const next = nextLesson(primary, p.completedLessons);

  const metricValue = (metric: string) =>
    metric === "lessons"
      ? p.completedLessons.length
      : metric === "xp"
      ? p.xp
      : metric === "streak"
      ? p.streakDays
      : 0;

  const stats = [
    { icon: Zap, label: "Total XP", value: p.xp, tint: "text-primary" },
    { icon: Coins, label: "Coins", value: p.coins, tint: "text-warning" },
    { icon: Flame, label: "Day streak", value: p.streakDays, tint: "text-danger" },
    { icon: CheckCircle2, label: "Lessons done", value: p.completedLessons.length, tint: "text-success" },
  ];

  return (
    <div className="container py-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col justify-between gap-4 md:flex-row md:items-end"
      >
        <div>
          <h1 className="text-3xl font-black md:text-4xl">
            Welcome back 👋
          </h1>
          <p className="mt-1 text-muted-foreground">
            You&apos;re <span className="font-semibold text-foreground">Level {p.level}</span> —
            {p.xpForNextLevel - p.xpIntoLevel} XP to level {p.level + 1}. Keep the streak alive!
          </p>
        </div>
        {next && (
          <Button asChild variant="gradient" size="lg">
            <Link href={`/learn/${primary.id}/${next.lesson.id}`}>
              Continue Learning <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        )}
      </motion.div>

      {/* Level progress */}
      <Card className="mt-6">
        <CardContent className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center">
          <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-xl font-black text-white">
            {p.level}
          </div>
          <div className="flex-1">
            <div className="mb-1.5 flex justify-between text-sm">
              <span className="font-semibold">Level {p.level}</span>
              <span className="text-muted-foreground">
                {p.xpIntoLevel} / {p.xpForNextLevel} XP
              </span>
            </div>
            <Progress value={(p.xpIntoLevel / p.xpForNextLevel) * 100} />
          </div>
        </CardContent>
      </Card>

      {/* Stat cards */}
      <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="card-hover">
              <CardContent className="flex items-center gap-4 py-6">
                <span className={`grid h-11 w-11 place-items-center rounded-xl bg-secondary ${s.tint}`}>
                  <s.icon className="h-5 w-5" />
                </span>
                <div>
                  <div className="text-2xl font-black">{s.value}</div>
                  <div className="text-xs text-muted-foreground">{s.label}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Left: continue + challenges */}
        <div className="space-y-6 lg:col-span-2">
          {/* Continue learning */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-primary" /> Continue where you left off
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {courses.map((c) => {
                const prog = courseProgress(c, p.completedLessons);
                const n = nextLesson(c, p.completedLessons);
                return (
                  <div
                    key={c.id}
                    className="flex items-center gap-4 rounded-xl border border-border p-4"
                  >
                    <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${c.gradient} text-white`}>
                      <Icon name={c.icon} className="h-6 w-6" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p className="truncate font-semibold">{c.title}</p>
                        <span className="text-xs text-muted-foreground">{prog.percent}%</span>
                      </div>
                      <Progress className="mt-2" value={prog.percent} />
                      {n && (
                        <p className="mt-2 truncate text-xs text-muted-foreground">
                          Next: {n.lesson.title}
                        </p>
                      )}
                    </div>
                    {n && (
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/learn/${c.id}/${n.lesson.id}`}>Resume</Link>
                      </Button>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Study chart */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-accent" /> Study time (last 7 days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <StudyChart activity={p.activity} />
              <p className="mt-2 text-sm text-muted-foreground">
                Total time invested: <span className="font-semibold text-foreground">{Math.round(totalMinutes / 60 * 10) / 10}h</span>
              </p>
            </CardContent>
          </Card>

          {/* Heatmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-success" /> Learning heatmap
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Heatmap activity={p.activity} />
            </CardContent>
          </Card>
        </div>

        {/* Right: challenges + achievements */}
        <div className="space-y-6">
          {/* Daily challenge */}
          <Card className="overflow-hidden">
            <div className="bg-gradient-to-br from-primary to-accent p-5 text-white">
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5" />
                <span className="font-bold">Daily Challenge</span>
                <Badge variant="secondary" className="ml-auto text-primary">+50 XP</Badge>
              </div>
              <p className="mt-2 text-sm text-white/90">
                Complete 1 lesson and score 100% on its quiz today.
              </p>
            </div>
            <CardContent className="pt-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-semibold">
                  {Math.min(p.completedLessons.length, 1)}/1
                </span>
              </div>
              <Progress className="mt-2" value={Math.min(p.completedLessons.length, 1) * 100} />
            </CardContent>
          </Card>

          {/* Weekly challenge */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Sparkles className="h-4 w-4 text-warning" /> Weekly Quest
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Earn 300 XP this week</span>
                  <span className="font-semibold">{Math.min(p.xp, 300)}/300</span>
                </div>
                <Progress className="mt-2" value={Math.min(p.xp / 300, 1) * 100} />
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Trophy className="h-4 w-4 text-warning" /> Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-3">
              {achievements.map((a) => {
                const unlocked = metricValue(a.metric) >= a.requirement;
                return (
                  <div
                    key={a.id}
                    className={`rounded-xl border p-3 text-center transition-all ${
                      unlocked
                        ? "border-primary/40 bg-primary/5"
                        : "border-border opacity-60"
                    }`}
                    title={a.description}
                  >
                    <span
                      className={`mx-auto grid h-10 w-10 place-items-center rounded-full ${
                        unlocked ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {unlocked ? <Icon name={a.icon} className="h-5 w-5" /> : <Lock className="h-4 w-4" />}
                    </span>
                    <p className="mt-1.5 text-xs font-semibold">{a.title}</p>
                    <p className="text-[10px] text-muted-foreground">{a.description}</p>
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
