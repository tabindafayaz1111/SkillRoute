"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Target,
  Lightbulb,
  Eye,
  Sigma,
  Code2,
  Dumbbell,
  HelpCircle,
  Layers,
  Rocket,
  Briefcase,
  AlertTriangle,
  MessagesSquare,
  FileText,
  StickyNote,
  ScrollText,
  ArrowRight,
  ArrowLeft,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock,
  Zap,
  ChevronRight,
} from "lucide-react";
import type { Lesson, Course } from "@/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PythonEditor } from "@/components/playground/python-editor";
import { Quiz } from "@/components/lesson/quiz";
import { Flashcards } from "@/components/lesson/flashcards";
import { Visualization } from "@/components/lesson/visualizations";
import { Confetti } from "@/components/confetti";
import { useProgress } from "@/components/providers/progress-provider";
import { adjacentLessons } from "@/lib/course-utils";
import { isAuthored } from "@/data/lessons";

function Section({
  icon: Icon,
  title,
  subtitle,
  children,
  id,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  id?: string;
}) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4 }}
      className="scroll-mt-24"
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      <div className="text-[15px] leading-relaxed text-foreground/90">{children}</div>
    </motion.section>
  );
}

export function LessonView({ lesson, course }: { lesson: Lesson; course: Course }) {
  const {
    completeLesson,
    isComplete,
    isBookmarked,
    toggleBookmark,
    saveNote,
    notes,
    recordQuiz,
  } = useProgress();

  const done = isComplete(lesson.id);
  const bookmarked = isBookmarked(lesson.id);
  const [note, setNote] = React.useState(notes[lesson.id] ?? "");
  const [celebrate, setCelebrate] = React.useState(false);
  const { prev, next } = adjacentLessons(course, lesson.id);

  function handleComplete() {
    completeLesson(lesson.id, lesson.xp, lesson.minutes);
    if (!done) {
      setCelebrate(true);
      setTimeout(() => setCelebrate(false), 2500);
    }
  }

  return (
    <div className="relative">
      {celebrate && <Confetti />}

      {/* Breadcrumb + banner */}
      <div className={`bg-gradient-to-br ${course.gradient} py-8 text-white`}>
        <div className="container">
          <div className="flex flex-wrap items-center gap-1.5 text-sm text-white/80">
            <Link href={`/courses/${course.id}`} className="hover:text-white">{course.title}</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="capitalize">{lesson.kind}</span>
          </div>
          <div className="mt-2 flex items-start justify-between gap-4">
            <h1 className="text-3xl font-black md:text-4xl">{lesson.title}</h1>
            <button
              onClick={() => toggleBookmark(lesson.id)}
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/15 backdrop-blur transition-colors hover:bg-white/25"
              aria-label="Bookmark"
            >
              {bookmarked ? <BookmarkCheck className="h-5 w-5" /> : <Bookmark className="h-5 w-5" />}
            </button>
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="secondary" className="text-foreground"><Clock className="h-3 w-3" /> {lesson.minutes} min</Badge>
            <Badge variant="secondary" className="text-foreground"><Zap className="h-3 w-3" /> +{lesson.xp} XP</Badge>
            {done && <Badge variant="success"><CheckCircle2 className="h-3 w-3" /> Completed</Badge>}
            {!isAuthored(lesson.id) && (
              <Badge variant="secondary" className="text-foreground">Structured preview</Badge>
            )}
          </div>
        </div>
      </div>

      <div className="container grid gap-10 py-10 lg:grid-cols-[1fr_260px]">
        {/* Main content */}
        <article className="max-w-3xl space-y-12">
          <Section icon={BookOpen} title="The Story" subtitle="Let's start with something human">
            <p className="rounded-2xl border border-border bg-secondary/40 p-5 italic">{lesson.story}</p>
          </Section>

          <Section icon={Target} title="The Problem" subtitle="What are we actually trying to solve?">
            <p>{lesson.problem}</p>
          </Section>

          <Section icon={Lightbulb} title="The Analogy" subtitle="A picture for your head">
            <p className="rounded-2xl bg-warning/10 p-5">{lesson.analogy}</p>
          </Section>

          {lesson.visualization && (
            <Section icon={Eye} title="See It Move" subtitle="Play before you compute">
              <Visualization viz={lesson.visualization} />
            </Section>
          )}

          <Section icon={Layers} title="The Idea, Simply" subtitle="Plain English first">
            <ul className="space-y-2.5">
              {lesson.explanation.map((point, i) => (
                <li key={i} className="flex gap-3">
                  <span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-[11px] font-bold text-primary">
                    {i + 1}
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </Section>

          {lesson.math && (
            <Section icon={Sigma} title="Now The Maths" subtitle="Only after the intuition clicks">
              <p className="rounded-2xl border border-border bg-card p-5 font-mono text-sm">{lesson.math}</p>
            </Section>
          )}

          {lesson.code && (
            <Section icon={Code2} title="In Python" subtitle="Run it, break it, learn it">
              <p className="mb-3 text-muted-foreground">{lesson.code.explanation}</p>
              <PythonEditor initialCode={lesson.code.source} />
            </Section>
          )}

          {lesson.exercise && (
            <Section icon={Dumbbell} title="Your Turn" subtitle="Practice makes permanent">
              <p className="mb-3 font-medium">{lesson.exercise.prompt}</p>
              <PythonEditor
                initialCode={lesson.exercise.starter}
                solution={lesson.exercise.solution}
                hint="Break the problem into tiny steps. Print intermediate values to see what's happening."
              />
            </Section>
          )}

          <Section icon={HelpCircle} title="Quick Quiz" subtitle="Prove it to yourself">
            <Quiz questions={lesson.quiz} onComplete={(pct) => recordQuiz(lesson.id, pct)} />
          </Section>

          {lesson.flashcards.length > 0 && (
            <Section icon={Layers} title="Flashcards" subtitle="Spaced repetition ready">
              <Flashcards cards={lesson.flashcards} />
            </Section>
          )}

          {lesson.miniProject && (
            <Section icon={Rocket} title="Mini Project" subtitle="Build something real">
              <div className="rounded-2xl border border-primary/30 bg-primary/5 p-5">
                <h3 className="font-bold">{lesson.miniProject.title}</h3>
                <p className="mt-1 text-muted-foreground">{lesson.miniProject.brief}</p>
                <ol className="mt-3 space-y-1.5">
                  {lesson.miniProject.steps.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="font-bold text-primary">{i + 1}.</span> {s}
                    </li>
                  ))}
                </ol>
              </div>
            </Section>
          )}

          <div className="grid gap-6 sm:grid-cols-2">
            <InfoList icon={Briefcase} title="In Industry" items={lesson.industryUse} tone="accent" />
            <InfoList icon={AlertTriangle} title="Common Mistakes" items={lesson.commonMistakes} tone="danger" />
          </div>

          <Section icon={MessagesSquare} title="Interview Questions" subtitle="Get hired-ready">
            <ul className="space-y-2">
              {lesson.interviewQuestions.map((q, i) => (
                <li key={i} className="rounded-xl border border-border bg-card px-4 py-3 text-sm">
                  <span className="mr-2 font-bold text-primary">Q{i + 1}.</span>{q}
                </li>
              ))}
            </ul>
          </Section>

          {lesson.papers.length > 0 && (
            <Section icon={FileText} title="Read Next" subtitle="Papers, explained simply elsewhere on the platform">
              <ul className="space-y-2">
                {lesson.papers.map((p) => (
                  <li key={p.title}>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm transition-colors hover:border-primary/40"
                    >
                      <FileText className="h-4 w-4 text-primary" />
                      <span className="flex-1">{p.title}</span>
                      <Badge variant="secondary">{p.year}</Badge>
                    </a>
                  </li>
                ))}
              </ul>
            </Section>
          )}

          {/* Notes */}
          <Section icon={StickyNote} title="Your Notes" subtitle="Saved automatically to this device">
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              onBlur={() => saveNote(lesson.id, note)}
              placeholder="Jot down anything that helped it click for you…"
              className="min-h-[120px] w-full rounded-xl border border-border bg-card p-4 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </Section>

          {/* Cheat sheet */}
          <Section icon={ScrollText} title="Cheat Sheet" subtitle="Everything on one card">
            <div className="rounded-2xl border border-dashed border-primary/40 bg-primary/5 p-5">
              <ul className="space-y-1.5 font-mono text-sm">
                {lesson.cheatsheet.map((c, i) => (
                  <li key={i} className="flex gap-2">
                    <span className="text-primary">▸</span> {c}
                  </li>
                ))}
              </ul>
            </div>
          </Section>

          {/* Complete + nav */}
          <div className="rounded-2xl border border-border bg-card p-6 text-center">
            <Button size="lg" variant={done ? "secondary" : "gradient"} onClick={handleComplete}>
              {done ? <><CheckCircle2 className="h-5 w-5" /> Completed — revisit anytime</> : <>Mark complete · +{lesson.xp} XP</>}
            </Button>
            {lesson.nextUp.length > 0 && (
              <p className="mt-3 text-xs text-muted-foreground">
                Recommended next: {lesson.nextUp.join(", ")}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between gap-3">
            {prev ? (
              <Button asChild variant="outline">
                <Link href={`/learn/${course.id}/${prev.id}`}>
                  <ArrowLeft className="h-4 w-4" /> {prev.title}
                </Link>
              </Button>
            ) : <span />}
            {next && (
              <Button asChild variant="gradient" className="ml-auto">
                <Link href={`/learn/${course.id}/${next.id}`}>
                  {next.title} <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            )}
          </div>
        </article>

        {/* Sticky outline */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              This lesson
            </p>
            <div className="rounded-2xl border border-border bg-card p-4 text-sm">
              <p className="font-semibold">How we teach</p>
              <ol className="mt-2 space-y-1 text-muted-foreground">
                <li>1. Story &amp; problem</li>
                <li>2. Visual intuition</li>
                <li>3. Plain-English idea</li>
                <li>4. Maths</li>
                <li>5. Python you run</li>
                <li>6. Practice &amp; quiz</li>
                <li>7. Project &amp; career</li>
              </ol>
            </div>
            <div className="rounded-2xl border border-primary/30 bg-primary/5 p-4 text-sm">
              <p className="font-semibold text-primary">Stuck?</p>
              <p className="mt-1 text-muted-foreground">
                Tap the AI Mentor bottom-right — it teaches, never just tells.
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function InfoList({
  icon: Icon,
  title,
  items,
  tone,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  items: string[];
  tone: "accent" | "danger";
}) {
  return (
    <div className={`rounded-2xl border p-5 ${tone === "danger" ? "border-danger/30 bg-danger/5" : "border-accent/30 bg-accent/5"}`}>
      <div className="flex items-center gap-2 font-bold">
        <Icon className={`h-5 w-5 ${tone === "danger" ? "text-danger" : "text-accent"}`} />
        {title}
      </div>
      <ul className="mt-3 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2">
            <span className={tone === "danger" ? "text-danger" : "text-accent"}>•</span> {it}
          </li>
        ))}
      </ul>
    </div>
  );
}
