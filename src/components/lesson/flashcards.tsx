"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Flashcards({ cards }: { cards: { front: string; back: string }[] }) {
  const [idx, setIdx] = React.useState(0);
  const [flipped, setFlipped] = React.useState(false);

  const go = (dir: number) => {
    setFlipped(false);
    setIdx((i) => (i + dir + cards.length) % cards.length);
  };

  const card = cards[idx];

  return (
    <div className="flex flex-col items-center">
      <div
        className="relative h-52 w-full max-w-md cursor-pointer [perspective:1200px]"
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          className="relative h-full w-full [transform-style:preserve-3d]"
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Front */}
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-border bg-gradient-to-br from-primary/10 to-accent/10 p-6 text-center [backface-visibility:hidden]">
            <div>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">Term</p>
              <p className="mt-2 text-xl font-bold">{card.front}</p>
              <p className="mt-4 text-xs text-muted-foreground">Click to reveal ↺</p>
            </div>
          </div>
          {/* Back */}
          <div className="absolute inset-0 grid place-items-center rounded-2xl border border-primary/40 bg-card p-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden]">
            <div>
              <p className="text-xs uppercase tracking-wide text-primary">Definition</p>
              <p className="mt-2 text-base">{card.back}</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => go(-1)}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          {idx + 1} / {cards.length}
        </span>
        <Button variant="outline" size="icon" onClick={() => go(1)}>
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setFlipped((f) => !f)} aria-label="Flip">
          <RefreshCw className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
