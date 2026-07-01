"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function StudyChart({ activity }: { activity: Record<string, number> }) {
  const [data, setData] = React.useState<{ day: string; minutes: number }[]>([]);

  React.useEffect(() => {
    const out: { day: string; minutes: number }[] = [];
    const today = new Date();
    const labels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (let i = 6; i >= 0; i--) {
      const d = new Date(today);
      d.setDate(today.getDate() - i);
      const iso = d.toISOString().slice(0, 10);
      out.push({ day: labels[d.getDay()], minutes: activity[iso] ?? 0 });
    }
    setData(out);
  }, [activity]);

  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 10, right: 6, left: -22, bottom: 0 }}>
        <defs>
          <linearGradient id="studyFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.6} />
            <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="day" tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" />
        <YAxis tickLine={false} axisLine={false} fontSize={12} stroke="hsl(var(--muted-foreground))" width={40} />
        <Tooltip
          contentStyle={{
            background: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: 12,
            fontSize: 12,
          }}
          formatter={(v: number) => [`${v} min`, "Studied"]}
        />
        <Area
          type="monotone"
          dataKey="minutes"
          stroke="hsl(var(--primary))"
          strokeWidth={2.5}
          fill="url(#studyFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
