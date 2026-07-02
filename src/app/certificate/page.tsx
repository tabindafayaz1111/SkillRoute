"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Printer, CheckCircle2, Lock, Award } from "lucide-react";
import { courses } from "@/data/courses";
import { courseProgress } from "@/lib/course-utils";
import { useProgress } from "@/components/providers/progress-provider";
import { Certificate } from "@/components/certificate/certificate";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

export default function CertificatePage() {
  const { displayName, setDisplayName, completedLessons } = useProgress();
  const [name, setName] = React.useState("");
  const [selectedId, setSelectedId] = React.useState(courses[0].id);
  const [dateStr, setDateStr] = React.useState("");

  // Hydrate name from the store, compute date on the client.
  React.useEffect(() => setName(displayName), [displayName]);
  React.useEffect(() => {
    setDateStr(
      new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
    );
  }, []);

  const withProgress = courses.map((c) => ({
    course: c,
    percent: courseProgress(c, completedLessons).percent,
  }));

  // Default the selection to the first fully-completed course, if any.
  React.useEffect(() => {
    const firstDone = withProgress.find((c) => c.percent === 100);
    if (firstDone) setSelectedId(firstDone.course.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [completedLessons.length]);

  const selected = courses.find((c) => c.id === selectedId)!;
  const selectedComplete = courseProgress(selected, completedLessons).percent === 100;

  function commitName(v: string) {
    setName(v);
    setDisplayName(v);
  }

  return (
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <Badge className="mb-4 gap-1.5">
          <Award className="h-4 w-4" /> Certificates
        </Badge>
        <h1 className="text-4xl font-black md:text-5xl">Claim your certificate</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Just type your name — that&apos;s it. Pick a course and your certificate is ready to print or
          save as PDF. Finish 100% of a course to earn the official &ldquo;Verified&rdquo; seal.
        </p>
      </motion.div>

      <div className="mx-auto mt-10 grid max-w-5xl gap-8 lg:grid-cols-[300px_1fr]">
        {/* Controls */}
        <div className="space-y-6 print:hidden">
          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <label className="text-sm font-semibold" htmlFor="cert-name">
              Your name on the certificate
            </label>
            <input
              id="cert-name"
              value={name}
              onChange={(e) => commitName(e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="mt-2 w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
            <p className="mt-2 text-xs text-muted-foreground">Saved to this device automatically.</p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="mb-3 text-sm font-semibold">Choose a course</p>
            <div className="max-h-[46vh] space-y-1.5 overflow-y-auto pr-1">
              {withProgress.map(({ course, percent }) => {
                const done = percent === 100;
                const active = course.id === selectedId;
                return (
                  <button
                    key={course.id}
                    onClick={() => setSelectedId(course.id)}
                    className={cn(
                      "flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors",
                      active ? "bg-secondary" : "hover:bg-secondary/60"
                    )}
                  >
                    <span className={cn("grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-to-br text-white", course.gradient)}>
                      <Icon name={course.icon} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">{course.title}</span>
                      <span className="text-xs text-muted-foreground">{percent}% complete</span>
                    </span>
                    {done ? (
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 shrink-0 text-muted-foreground/50" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          <Button
            variant="gradient"
            size="lg"
            className="w-full"
            disabled={!name.trim()}
            onClick={() => window.print()}
          >
            <Printer className="h-5 w-5" /> Print / Save as PDF
          </Button>
          {!selectedComplete && (
            <p className="text-center text-xs text-muted-foreground">
              Tip: this course isn&apos;t finished yet — the certificate will say &ldquo;Self-issued&rdquo; until
              you complete 100%.
            </p>
          )}
        </div>

        {/* Live preview */}
        <div>
          <Certificate name={name} course={selected} dateStr={dateStr} verified={selectedComplete} />
        </div>
      </div>
    </div>
  );
}
