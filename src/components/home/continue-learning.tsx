"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, PlayCircle, Sparkles } from "lucide-react";
import { courses, getCourse } from "@/data/courses";
import { courseProgress, nextLesson } from "@/lib/course-utils";
import { useProgress } from "@/components/providers/progress-provider";
import { Icon } from "@/components/icon";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ContinueLearning() {
  const { completedLessons, displayName } = useProgress();

  // Pick the started course with the most progress as "current".
  const started = courses
    .map((c) => ({ course: c, prog: courseProgress(c, completedLessons) }))
    .filter((x) => x.prog.done > 0 && x.prog.percent < 100)
    .sort((a, b) => b.prog.done - a.prog.done);

  const current = started[0];
  const hi = displayName ? `Welcome back, ${displayName.split(" ")[0]}` : "Welcome back";

  // Nothing in progress → gentle recommendation to begin.
  if (!current) {
    const rec = getCourse("python-programming") ?? courses[0];
    const first = nextLesson(rec, completedLessons);
    if (!first) return null;
    return (
      <Shell>
        <div className="flex items-center gap-2 text-sm font-semibold text-primary">
          <Sparkles className="h-4 w-4" /> New here?
        </div>
        <h3 className="mt-1 text-2xl font-black">Start with an easy win</h3>
        <p className="mt-1 text-muted-foreground">
          {rec.title} is a perfect first step — no experience needed.
        </p>
        <Button asChild variant="gradient" size="lg" className="mt-4 w-fit">
          <Link href={`/learn/${rec.id}/${first.lesson.id}`}>
            Begin {rec.title} <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </Shell>
    );
  }

  const { course, prog } = current;
  const next = nextLesson(course, completedLessons);
  if (!next) return null;

  return (
    <Shell>
      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
        <PlayCircle className="h-4 w-4" /> {hi}
      </div>
      <h3 className="mt-1 text-2xl font-black">Continue where you left off</h3>

      <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
        <span
          className={cn(
            "grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br text-white shadow-soft",
            course.gradient
          )}
        >
          <Icon name={course.icon} className="h-7 w-7" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-xs text-muted-foreground">{course.title}</p>
          <p className="truncate text-lg font-bold">Next: {next.lesson.title}</p>
          <div className="mt-2 flex items-center gap-2">
            <Progress value={prog.percent} className="h-1.5" />
            <span className="shrink-0 text-xs font-semibold text-muted-foreground">
              {prog.done}/{prog.total}
            </span>
          </div>
        </div>
        <Button asChild variant="gradient" size="lg" className="shrink-0">
          <Link href={`/learn/${course.id}/${next.lesson.id}`}>
            Resume <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <section className="container -mt-6 pb-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass rounded-3xl p-6 md:p-8"
      >
        {children}
      </motion.div>
    </section>
  );
}
