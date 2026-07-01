"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, FolderGit2, Signal, ArrowRight } from "lucide-react";
import type { Course } from "@/types";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useProgress } from "@/components/providers/progress-provider";
import { courseProgress, nextLesson } from "@/lib/course-utils";
import { cn } from "@/lib/utils";

const difficultyVariant = {
  Beginner: "success",
  Intermediate: "default",
  Advanced: "warning",
  Expert: "danger",
} as const;

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const { completedLessons } = useProgress();
  const prog = courseProgress(course, completedLessons);
  const next = nextLesson(course, completedLessons);
  const started = prog.done > 0;
  const href = next ? `/learn/${course.id}/${next.lesson.id}` : `/courses/${course.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative"
    >
      {/* Glow */}
      <div
        className={cn(
          "absolute -inset-0.5 rounded-[1.4rem] bg-gradient-to-r opacity-0 blur transition-opacity duration-500 group-hover:opacity-60",
          course.gradient
        )}
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[1.3rem] border border-border bg-card card-hover">
        {/* Header banner */}
        <div className={cn("relative h-36 overflow-hidden bg-gradient-to-br p-6", course.gradient)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" />
          <div className="absolute -right-6 -top-6 opacity-20">
            <Icon name={course.icon} className="h-40 w-40 text-white" />
          </div>
          <div className="relative flex items-center gap-3 text-white">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/20 backdrop-blur">
              <Icon name={course.icon} className="h-6 w-6" />
            </span>
            <div>
              <h3 className="text-xl font-extrabold drop-shadow">{course.title}</h3>
              <p className="text-sm text-white/85">{course.tagline}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-6">
          <p className="text-sm text-muted-foreground">{course.description}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant={difficultyVariant[course.difficulty]}>
              <Signal className="h-3 w-3" /> {course.difficulty}
            </Badge>
            <Badge variant="secondary">
              <Clock className="h-3 w-3" /> {course.estimatedHours}h
            </Badge>
            <Badge variant="secondary">
              <FolderGit2 className="h-3 w-3" /> {course.projectCount} projects
            </Badge>
          </div>

          <div className="mt-5 space-y-1.5">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Your progress</span>
              <span className="font-semibold text-foreground">
                {prog.done}/{prog.total} lessons
              </span>
            </div>
            <Progress value={prog.percent} />
          </div>

          <Button asChild variant="gradient" size="lg" className="mt-6 w-full">
            <Link href={href}>
              {started ? "Continue Learning" : "Start Learning"}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
