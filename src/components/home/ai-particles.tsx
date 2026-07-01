"use client";

import { motion } from "framer-motion";
import * as React from "react";

/**
 * Floating AI "particles" background. Positions are derived deterministically
 * from the index (no Math.random) so server and client markup match and there's
 * no hydration flash.
 */
export function AiParticles({ count = 26 }: { count?: number }) {
  const particles = React.useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const seed = (i * 9301 + 49297) % 233280;
        const rnd = seed / 233280;
        const seed2 = (i * 4021 + 12345) % 199999;
        const rnd2 = seed2 / 199999;
        return {
          left: `${(rnd * 100).toFixed(2)}%`,
          top: `${(rnd2 * 100).toFixed(2)}%`,
          size: 4 + (i % 4) * 3,
          duration: 6 + (i % 5) * 2,
          delay: (i % 7) * 0.6,
          opacity: 0.25 + (i % 5) * 0.12,
        };
      }),
    [count]
  );

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-gradient-to-br from-primary to-accent blur-[1px]"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, opacity: p.opacity }}
          animate={{ y: [0, -30, 0], x: [0, i % 2 ? 12 : -12, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
