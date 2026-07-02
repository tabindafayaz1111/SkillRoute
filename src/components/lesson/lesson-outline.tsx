"use client";

import Link from "next/link";
import { CheckCircle2, Circle, Dot } from "lucide-react";
import type { Course } from "@/types";
import { useProgress } from "@/components/providers/progress-provider";
import { courseProgress } from "@/lib/course-utils";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

/** Sticky in-course navigator: modules, lessons, completion ticks, current highlight. */
export function LessonOutline({
  course,
  currentLessonId,
}: {
  course: Course;
  currentLessonId: string;
}) {
  const { completedLessons, isComplete } = useProgress();
  const prog = courseProgress(course, completedLessons);

  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-soft">
      <div className="mb-3">
        <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {course.title}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <Progress value={prog.percent} className="h-1.5" />
          <span className="shrink-0 text-xs font-semibold text-muted-foreground">
            {prog.percent}%
          </span>
        </div>
      </div>

      <nav className="max-h-[58vh] space-y-3 overflow-y-auto pr-1">
        {course.modules.map((mod) => (
          <div key={mod.id}>
            <p className="mb-1 flex items-center gap-1 text-xs font-bold text-foreground/80">
              <Dot className="h-4 w-4 text-primary" />
              {mod.title}
            </p>
            <ul className="ml-1 space-y-0.5 border-l border-border pl-2">
              {mod.lessons.map((l) => {
                const active = l.id === currentLessonId;
                const done = isComplete(l.id);
                return (
                  <li key={l.id}>
                    <Link
                      href={`/learn/${course.id}/${l.id}`}
                      className={cn(
                        "flex items-start gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors",
                        active
                          ? "bg-primary/10 font-semibold text-primary"
                          : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                      )}
                    >
                      {done ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                      ) : (
                        <Circle
                          className={cn(
                            "mt-0.5 h-4 w-4 shrink-0",
                            active ? "text-primary" : "text-muted-foreground/40"
                          )}
                        />
                      )}
                      <span className="leading-snug">{l.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );
}
