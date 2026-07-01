"use client";

import * as Icons from "lucide-react";
import type { LucideProps } from "lucide-react";

/** Render a lucide icon by its string name (used by data-driven course/lesson config). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Cmp = (Icons as unknown as Record<string, React.ComponentType<LucideProps>>)[name];
  const Fallback = Icons.Sparkles;
  const C = Cmp ?? Fallback;
  return <C {...props} />;
}
