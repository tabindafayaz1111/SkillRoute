"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, RotateCcw, PartyPopper } from "lucide-react";
import type { QuizQuestion } from "@/types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Quiz({
  questions,
  onComplete,
}: {
  questions: QuizQuestion[];
  onComplete?: (scorePct: number) => void;
}) {
  const [idx, setIdx] = React.useState(0);
  const [selected, setSelected] = React.useState<number | null>(null);
  const [correct, setCorrect] = React.useState(0);
  const [done, setDone] = React.useState(false);

  const q = questions[idx];
  const answered = selected !== null;

  function choose(i: number) {
    if (answered) return;
    setSelected(i);
    if (i === q.answerIndex) setCorrect((c) => c + 1);
  }

  function next() {
    if (idx + 1 < questions.length) {
      setIdx((i) => i + 1);
      setSelected(null);
    } else {
      const pct = Math.round(((correct) / questions.length) * 100);
      setDone(true);
      onComplete?.(pct);
    }
  }

  function reset() {
    setIdx(0);
    setSelected(null);
    setCorrect(0);
    setDone(false);
  }

  if (done) {
    const pct = Math.round((correct / questions.length) * 100);
    return (
      <div className="rounded-2xl border border-border bg-card p-8 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mx-auto w-fit">
          <PartyPopper className="h-12 w-12 text-primary" />
        </motion.div>
        <h3 className="mt-3 text-2xl font-black">{pct}%</h3>
        <p className="mt-1 text-muted-foreground">
          You got {correct} of {questions.length} right.
          {pct === 100 ? " Flawless! +20 bonus XP 🎉" : " Review and try again for a perfect score!"}
        </p>
        <Button variant="outline" className="mt-4" onClick={reset}>
          <RotateCcw className="h-4 w-4" /> Retake
        </Button>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
        <span>Question {idx + 1} of {questions.length}</span>
        <span>{correct} correct</span>
      </div>
      <h3 className="text-lg font-bold">{q.question}</h3>
      <div className="mt-4 space-y-2.5">
        {q.options.map((opt, i) => {
          const isAnswer = i === q.answerIndex;
          const isPicked = i === selected;
          return (
            <button
              key={i}
              onClick={() => choose(i)}
              disabled={answered}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl border p-3.5 text-left text-sm transition-all",
                !answered && "hover:border-primary/50 hover:bg-secondary/50",
                answered && isAnswer && "border-success bg-success/10",
                answered && isPicked && !isAnswer && "border-danger bg-danger/10",
                answered && !isAnswer && !isPicked && "opacity-60"
              )}
            >
              <span
                className={cn(
                  "grid h-6 w-6 shrink-0 place-items-center rounded-full border text-xs font-bold",
                  answered && isAnswer && "border-success bg-success text-white",
                  answered && isPicked && !isAnswer && "border-danger bg-danger text-white"
                )}
              >
                {answered && isAnswer ? (
                  <Check className="h-3.5 w-3.5" />
                ) : answered && isPicked ? (
                  <X className="h-3.5 w-3.5" />
                ) : (
                  String.fromCharCode(65 + i)
                )}
              </span>
              {opt}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="mt-4 overflow-hidden"
          >
            <div className="rounded-xl bg-secondary/60 p-4 text-sm">
              <span className="font-semibold">
                {selected === q.answerIndex ? "✅ Correct! " : "Not quite. "}
              </span>
              {q.explanation}
            </div>
            <Button className="mt-3 w-full" variant="gradient" onClick={next}>
              {idx + 1 < questions.length ? "Next question" : "See results"}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
