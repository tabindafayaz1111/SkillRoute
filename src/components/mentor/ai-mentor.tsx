"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bot, Send, Sparkles, X, GraduationCap, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { askMentor, type MentorMessage } from "@/lib/mentor";

const SUGGESTIONS = [
  "Where do I start? 🚀",
  "I'm feeling overwhelmed 😅",
  "Explain overfitting simply",
  "How does gradient descent work?",
  "Suggest a beginner project",
];

export function AiMentor() {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState("");
  const [thinking, setThinking] = React.useState(false);
  const [aiSource, setAiSource] = React.useState<"gemini" | "claude" | "offline" | null>(null);
  const [messages, setMessages] = React.useState<MentorMessage[]>([
    {
      role: "mentor",
      content:
        "Hi! I'm your AI Mentor 👋 Powered by Google Gemini — ask me *anything* about coding, AI, data, or your career. I'll teach, not just tell!",
    },
  ]);
  const endRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || thinking) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content: q }]);
    setThinking(true);
    try {
      const res = await fetch("/api/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: q, messages }),
      });
      const data = await res.json();
      if (data.source) setAiSource(data.source);
      setMessages((m) => [...m, { role: "mentor", content: data.reply || "Sorry, I couldn't respond. Try again!" }]);
    } catch {
      setMessages((m) => [...m, { role: "mentor", content: "Network error — please check your connection and try again." }]);
    }
    setThinking(false);
  }

  return (
    <>
      {/* Floating launcher */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen((o) => !o)}
        aria-label="Open AI Mentor"
        className="fixed bottom-5 right-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-white shadow-xl shadow-primary/40"
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X className="h-6 w-6" />
            </motion.span>
          ) : (
            <motion.span key="bot" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <Bot className="h-6 w-6" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ type: "spring", damping: 22, stiffness: 260 }}
            className="fixed bottom-24 right-5 z-50 flex h-[32rem] w-[calc(100vw-2.5rem)] max-w-sm flex-col overflow-hidden rounded-2xl border border-border glass"
          >
            <div className="flex items-center gap-2 border-b border-border/60 bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
                <GraduationCap className="h-4 w-4" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold">AI Mentor</p>
                <p className="text-xs text-muted-foreground">Teaches, never just tells</p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                {aiSource === "gemini" && (
                  <span className="flex items-center gap-1 rounded-full bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-500">
                    <Zap className="h-2.5 w-2.5" /> Gemini
                  </span>
                )}
                <Sparkles className="h-4 w-4 text-primary" />
              </div>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={cn("flex", m.role === "user" ? "justify-end" : "justify-start")}
                >
                  <div
                    className={cn(
                      "max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-sm",
                      m.role === "user"
                        ? "rounded-br-sm bg-primary text-primary-foreground"
                        : "rounded-bl-sm bg-secondary text-secondary-foreground"
                    )}
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {thinking && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl rounded-bl-sm bg-secondary px-3.5 py-3">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-2 w-2 rounded-full bg-muted-foreground"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {messages.length <= 1 && (
              <div className="flex flex-wrap gap-1.5 px-4 pb-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="rounded-full border border-border bg-secondary/50 px-2.5 py-1 text-xs transition-colors hover:border-primary/40 hover:text-primary"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border/60 p-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your mentor…"
                className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <Button type="submit" size="icon" variant="gradient" disabled={thinking}>
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
