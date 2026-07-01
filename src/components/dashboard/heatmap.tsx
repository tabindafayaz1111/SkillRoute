"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/**
 * GitHub-style learning heatmap for the last ~17 weeks.
 * Dates are computed on the client (after mount) to avoid SSR/Date mismatches.
 */
export function Heatmap({ activity }: { activity: Record<string, number> }) {
  const [days, setDays] = React.useState<{ date: string; minutes: number }[]>([]);

  React.useEffect(() => {
    const out: { date: string; minutes: number }[] = [];
    const today = new Date();
    for (let i = 118; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      out.push({ date: iso, minutes: activity[iso] ?? 0 });
    }
    setDays(out);
  }, [activity]);

  const level = (m: number) =>
    m === 0 ? 0 : m < 10 ? 1 : m < 25 ? 2 : m < 50 ? 3 : 4;

  const colors = [
    "bg-secondary",
    "bg-primary/25",
    "bg-primary/45",
    "bg-primary/70",
    "bg-primary",
  ];

  return (
    <div className="space-y-2">
      <div className="grid grid-flow-col grid-rows-7 gap-1">
        {days.map((d) => (
          <div
            key={d.date}
            title={`${d.date}: ${d.minutes} min`}
            className={cn("h-3.5 w-3.5 rounded-[3px]", colors[level(d.minutes)])}
          />
        ))}
      </div>
      <div className="flex items-center justify-end gap-1.5 text-xs text-muted-foreground">
        <span>Less</span>
        {colors.map((c, i) => (
          <span key={i} className={cn("h-3 w-3 rounded-[3px]", c)} />
        ))}
        <span>More</span>
      </div>
    </div>
  );
}
