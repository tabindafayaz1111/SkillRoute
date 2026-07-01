"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Gamepad2,
  Bot,
  Rocket,
  Trophy,
  BookOpenCheck,
  PlayCircle,
} from "lucide-react";
import { AiParticles } from "@/components/home/ai-particles";
import { CourseCard } from "@/components/home/course-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { courses, totalLessons } from "@/data/courses";

const features = [
  { icon: BookOpenCheck, title: "Story-first lessons", text: "Every concept starts with a real-life story, a picture, and an analogy — maths comes last, once it clicks." },
  { icon: Gamepad2, title: "Learn by playing", text: "Drag-and-drop, flashcards, prediction games, sliders and simulations turn theory into muscle memory." },
  { icon: PlayCircle, title: "Live Python in-browser", text: "Run real Python with Pyodide — no installs. Edit, run, break, and fix code right on the page." },
  { icon: Bot, title: "An AI mentor, always on", text: "Stuck? Your mentor asks the right question instead of dumping the answer, just like a great teacher." },
  { icon: Rocket, title: "Ship real projects", text: "From notebook to deployed app with a README and a resume line — build a portfolio, not just knowledge." },
  { icon: Trophy, title: "Addictive by design", text: "XP, streaks, badges, daily challenges and leaderboards keep you coming back — even on lazy days." },
];

const stats = [
  { value: `${totalLessons()}+`, label: "Interactive lessons" },
  { value: "30+", label: "Hands-on projects" },
  { value: "2", label: "Full courses (more soon)" },
  { value: "100%", label: "Free, forever" },
];

export default function HomePage() {
  return (
    <div className="relative">
      {/* ===== HERO ===== */}
      <section className="relative overflow-hidden">
        <AiParticles />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.18),transparent_60%)]" />
        <div className="container relative flex flex-col items-center py-24 text-center md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-6 gap-1.5 px-4 py-1.5 text-sm">
              <Sparkles className="h-4 w-4" />
              Zero to industry-expert — even if you&apos;ve never coded
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="max-w-4xl text-5xl font-black leading-[1.05] tracking-tight md:text-7xl"
          >
            Welcome to <span className="gradient-text">ML Academy</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          >
            Learn Machine Learning and Deep Learning the way professionals actually do —
            through stories, visuals, live code, and real projects. Fun enough for a curious
            beginner, deep enough for a future expert.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Button asChild size="lg" variant="gradient" className="text-base">
              <Link href="/courses">
                Start Learning Free <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-base">
              <Link href="/playground">
                <PlayCircle className="h-5 w-5" /> Try the Playground
              </Link>
            </Button>
          </motion.div>

          {/* Stats band */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-16 grid w-full max-w-3xl grid-cols-2 gap-4 md:grid-cols-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl p-5">
                <div className="text-3xl font-black gradient-text">{s.value}</div>
                <div className="mt-1 text-xs text-muted-foreground">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== COURSES ===== */}
      <section className="container py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-black md:text-4xl">Pick your path</h2>
          <p className="mt-2 text-muted-foreground">
            Two complete journeys today — the platform is built to hold unlimited courses.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {courses.map((c, i) => (
            <CourseCard key={c.id} course={c} index={i} />
          ))}
        </div>
      </section>

      {/* ===== FEATURES ===== */}
      <section className="container py-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-black md:text-4xl">
            Not another boring course
          </h2>
          <p className="mx-auto mt-2 max-w-2xl text-muted-foreground">
            Duolingo&apos;s addictiveness, Brilliant&apos;s visuals, Kaggle&apos;s practicality —
            focused entirely on ML &amp; DL.
          </p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group rounded-2xl border border-border bg-card p-6 card-hover"
            >
              <span className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/15 to-accent/15 text-primary transition-transform group-hover:scale-110">
                <f.icon className="h-6 w-6" />
              </span>
              <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="container py-16">
        <div className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-fuchsia-600 to-accent p-12 text-center text-white">
          <AiParticles count={16} />
          <div className="relative">
            <h2 className="text-3xl font-black md:text-4xl">Your ML journey starts today</h2>
            <p className="mx-auto mt-3 max-w-xl text-white/90">
              No credit card. No prior experience. Just curiosity. Build your first model this
              afternoon.
            </p>
            <Button asChild size="lg" variant="secondary" className="mt-8 text-base">
              <Link href="/dashboard">
                Go to my dashboard <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
