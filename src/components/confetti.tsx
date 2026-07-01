"use client";

import { motion } from "framer-motion";

const COLORS = ["#8b5cf6", "#06b6d4", "#ec4899", "#f59e0b", "#10b981"];

/** Lightweight CSS/framer confetti burst — no dependency. Deterministic layout. */
export function Confetti({ pieces = 40 }: { pieces?: number }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {Array.from({ length: pieces }).map((_, i) => {
        const left = ((i * 53) % 100);
        const color = COLORS[i % COLORS.length];
        const delay = (i % 10) * 0.05;
        const rotate = (i * 47) % 360;
        return (
          <motion.span
            key={i}
            className="absolute top-0 h-2.5 w-2.5 rounded-sm"
            style={{ left: `${left}%`, backgroundColor: color }}
            initial={{ y: -20, opacity: 1, rotate }}
            animate={{ y: "105vh", opacity: [1, 1, 0], rotate: rotate + 360 }}
            transition={{ duration: 2.2, delay, ease: "easeIn" }}
          />
        );
      })}
    </div>
  );
}
