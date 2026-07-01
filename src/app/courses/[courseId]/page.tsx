"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import {
  Clock,
  Signal,
  FolderGit2,
  CheckCircle2,
  Circle,
  PlayCircle,
  FileCode2,
  Brain,
  Rocket,
} from "lucide-react";
import { getCourse } from "@/data/courses";
import { Icon } from "@/components/icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useProgress } from "@/components/providers/progress-provider";
import { courseProgress, nextLesson } from "@/lib/course-utils";
import { cn } from "@/lib/utils";

const kindIcon = { concept: Brain, code: FileCode2, project: Rocket, quiz: PlayCircle };

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const { courseId } = params;
  const course = getCourse(courseId);
  const { completedLessons, isComplete } = useProgress();

  if (!course) return notFound();

  const prog = courseProgress(course, completedLessons);
  const next = nextLesson(course, completedLessons);

  return (
    <div>
      {/* Hero banner */}
      <div className={cn("relative overflow-hidden bg-gradient-to-br py-16 text-white", course.gradient)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_55%)]" />
        <div className="absolute -right-10 -top-10 opacity-15">
          <Icon name={course.icon} className="h-64 w-64" />
        </div>
        <div className="container relative">
          <Link href="/courses" className="text-sm text-white/80 hover:text-white">
            ← All courses
          </Link>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mt-4 text-4xl font-black md:text-5xl">{course.title}</h1>
            <p className="mt-3 max-w-2xl text-lg text-white/90">{course.description}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge variant="secondary" className="text-foreground"><Signal className="h-3 w-3" /> {course.difficulty}</Badge>
              <Badge variant="secondary" className="text-foreground"><Clock className="h-3 w-3" /> {course.estimatedHours}h</Badge>
              <Badge variant="secondary" className="text-foreground"><FolderGit2 className="h-3 w-3" /> {course.projectCount} projects</Badge>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              {next && (
                <Button asChild size="lg" variant="secondary">
                  <Link href={`/learn/${course.id}/${next.lesson.id}`}>
                    {prog.done > 0 ? "Continue" : "Start"} · {next.lesson.title}
                  </Link>
                </Button>
              )}
              <div className="min-w-[200px] flex-1">
                <div className="mb-1 flex justify-between text-sm text-white/90">
                  <span>{prog.done}/{prog.total} lessons</span>
                  <span>{prog.percent}%</span>
                </div>
                <Progress value={prog.percent} indicatorClassName="bg-white" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Modules + lessons */}
      <div className="container py-10">
        <div className="space-y-8">
          {course.modules.map((mod, mi) => (
            <motion.section
              key={mod.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <div className="mb-3 flex items-baseline gap-3">
                <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary/15 text-sm font-bold text-primary">
                  {mi + 1}
                </span>
                <div>
                  <h2 className="text-xl font-bold">{mod.title}</h2>
                  <p className="text-sm text-muted-foreground">{mod.summary}</p>
                </div>
              </div>

              <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border">
                {mod.lessons.map((lesson) => {
                  const done = isComplete(lesson.id);
                  const KIcon = kindIcon[lesson.kind];
                  return (
                    <Link
                      key={lesson.id}
                      href={`/learn/${course.id}/${lesson.id}`}
                      className="flex items-center gap-4 bg-card px-5 py-4 transition-colors hover:bg-secondary/50"
                    >
                      {done ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      ) : (
                        <Circle className="h-5 w-5 shrink-0 text-muted-foreground/40" />
                      )}
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-secondary text-muted-foreground">
                        <KIcon className="h-4 w-4" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className={cn("truncate font-medium", done && "text-muted-foreground")}>
                          {lesson.title}
                        </p>
                        <p className="text-xs capitalize text-muted-foreground">
                          {lesson.kind} · {lesson.minutes} min
                        </p>
                      </div>
                      <Badge variant="secondary" className="shrink-0">+{lesson.xp} XP</Badge>
                    </Link>
                  );
                })}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
