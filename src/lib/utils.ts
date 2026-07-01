import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Merge Tailwind classes with conflict resolution. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Clamp a number between min and max. */
export function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Format a large number, e.g. 1200 -> "1.2k". */
export function formatCompact(n: number) {
  return new Intl.NumberFormat("en", { notation: "compact" }).format(n);
}
