"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, BookOpen, GraduationCap, CornerDownLeft, Layers } from "lucide-react";
import { courses, allLessonMetas } from "@/data/courses";
import { Icon } from "@/components/icon";
import { cn } from "@/lib/utils";

type Result =
  | { kind: "course"; id: string; title: string; subtitle: string; icon: string; href: string }
  | { kind: "lesson"; id: string; title: string; subtitle: string; href: string };

const ALL_LESSONS = allLessonMetas();

function buildResults(query: string): Result[] {
  const q = query.trim().toLowerCase();
  const courseHits: Result[] = courses
    .filter((c) => !q || c.title.toLowerCase().includes(q) || c.category.toLowerCase().includes(q))
    .slice(0, q ? 6 : 6)
    .map((c) => ({
      kind: "course",
      id: c.id,
      title: c.title,
      subtitle: c.category,
      icon: c.icon,
      href: `/courses/${c.id}`,
    }));

  const lessonHits: Result[] = (
    q
      ? ALL_LESSONS.filter(
          (l) => l.title.toLowerCase().includes(q) || l.courseTitle.toLowerCase().includes(q)
        )
      : []
  )
    .slice(0, 8)
    .map((l) => ({
      kind: "lesson",
      id: `${l.courseId}/${l.id}`,
      title: l.title,
      subtitle: l.courseTitle,
      href: `/learn/${l.courseId}/${l.id}`,
    }));

  return [...courseHits, ...lessonHits];
}

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const results = React.useMemo(() => buildResults(query), [query]);

  // Global ⌘K / Ctrl+K to open.
  React.useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(true);
      }
      if (e.key === "Escape") onOpenChange(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onOpenChange]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      // focus after mount
      const t = setTimeout(() => inputRef.current?.focus(), 40);
      return () => clearTimeout(t);
    }
  }, [open]);

  React.useEffect(() => setActive(0), [query]);

  function go(r: Result) {
    onOpenChange(false);
    router.push(r.href);
  }

  function onListKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-start justify-center bg-black/40 p-4 pt-[12vh] backdrop-blur-sm"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ type: "spring", damping: 24, stiffness: 300 }}
            className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-card shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={onListKey}
          >
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search courses and lessons…"
                className="h-14 flex-1 bg-transparent text-base outline-none placeholder:text-muted-foreground"
              />
              <kbd className="hidden rounded bg-secondary px-1.5 py-0.5 text-xs text-muted-foreground sm:block">
                Esc
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 ? (
                <div className="px-4 py-10 text-center text-sm text-muted-foreground">
                  No matches for &ldquo;{query}&rdquo;. Try a topic like &ldquo;pandas&rdquo;, &ldquo;joins&rdquo;, or
                  &ldquo;react&rdquo;.
                </div>
              ) : (
                <>
                  {!query && (
                    <p className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      Browse courses
                    </p>
                  )}
                  {results.map((r, i) => (
                    <button
                      key={`${r.kind}-${r.id}`}
                      onMouseEnter={() => setActive(i)}
                      onClick={() => go(r)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors",
                        i === active ? "bg-secondary" : "hover:bg-secondary/60"
                      )}
                    >
                      <span
                        className={cn(
                          "grid h-9 w-9 shrink-0 place-items-center rounded-lg",
                          r.kind === "course"
                            ? "bg-gradient-to-br from-primary/15 to-accent/15 text-primary"
                            : "bg-secondary text-muted-foreground"
                        )}
                      >
                        {r.kind === "course" ? (
                          <Icon name={r.icon} className="h-5 w-5" />
                        ) : (
                          <BookOpen className="h-4 w-4" />
                        )}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{r.title}</span>
                        <span className="flex items-center gap-1 truncate text-xs text-muted-foreground">
                          {r.kind === "course" ? (
                            <Layers className="h-3 w-3" />
                          ) : (
                            <GraduationCap className="h-3 w-3" />
                          )}
                          {r.kind === "course" ? r.subtitle : `Lesson · ${r.subtitle}`}
                        </span>
                      </span>
                      {i === active && (
                        <CornerDownLeft className="h-4 w-4 shrink-0 text-muted-foreground" />
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border px-4 py-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-2">
                <kbd className="rounded bg-secondary px-1.5">↑↓</kbd> navigate
                <kbd className="rounded bg-secondary px-1.5">↵</kbd> open
              </span>
              <span>{results.length} results</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
