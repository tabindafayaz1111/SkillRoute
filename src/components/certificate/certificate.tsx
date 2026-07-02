"use client";

import { BrainCircuit, Award } from "lucide-react";
import type { Course } from "@/types";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

/** A print-ready certificate of completion. */
export function Certificate({
  name,
  course,
  dateStr,
  verified,
}: {
  name: string;
  course: Course;
  dateStr: string;
  verified: boolean;
}) {
  const id = `SR-${course.id.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6)}-${
    (name.replace(/\s/g, "").length * 7 + course.title.length * 13) % 100000
  }`;

  return (
    <div className="certificate-print relative aspect-[1.55/1] w-full overflow-hidden rounded-2xl border border-border bg-white text-slate-900 shadow-lift">
      {/* Gradient frame */}
      <div className={cn("absolute inset-x-0 top-0 h-2 bg-gradient-to-r", course.gradient)} />
      <div className={cn("absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r", course.gradient)} />
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full opacity-10"
        style={{ background: course.accent }} />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 rounded-full opacity-10"
        style={{ background: course.accent }} />

      <div className="relative flex h-full flex-col items-center justify-center px-[8%] text-center">
        <div className="flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
            <BrainCircuit className="h-5 w-5" />
          </span>
          <span className="text-xl font-extrabold tracking-tight text-slate-900">
            Skill<span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Route</span>
          </span>
        </div>

        <p className="mt-4 text-[0.7rem] font-semibold uppercase tracking-[0.3em] text-slate-500">
          Certificate of Achievement
        </p>

        <p className="mt-4 text-sm text-slate-500">This certifies that</p>
        <p className="mt-1 border-b-2 border-slate-200 px-6 pb-1 text-3xl font-black text-slate-900 md:text-4xl">
          {name || "Your Name"}
        </p>

        <p className="mt-4 max-w-md text-sm text-slate-600">
          has successfully completed the course
        </p>
        <div className="mt-2 flex items-center gap-2">
          <span
            className={cn("grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br text-white", course.gradient)}
          >
            <Icon name={course.icon} className="h-4 w-4" />
          </span>
          <p className="text-xl font-extrabold text-slate-900">{course.title}</p>
        </div>
        <p className="mt-1 text-xs text-slate-500">
          {course.difficulty} · {course.estimatedHours} hours · {course.projectCount} projects
        </p>

        <div className="mt-6 flex w-full items-end justify-between px-2 text-xs text-slate-500">
          <div className="text-left">
            <p className="font-semibold text-slate-700">{dateStr}</p>
            <p>Date of completion</p>
          </div>
          <div className="grid place-items-center">
            <span className={cn("grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br text-white", course.gradient)}>
              <Award className="h-6 w-6" />
            </span>
            <p className="mt-1">{verified ? "Verified" : "Self-issued"}</p>
          </div>
          <div className="text-right">
            <p className="font-mono font-semibold text-slate-700">{id}</p>
            <p>Certificate ID</p>
          </div>
        </div>
      </div>
    </div>
  );
}
