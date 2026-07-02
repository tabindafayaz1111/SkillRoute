"use client";

import * as React from "react";
import { Palette, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/** The selectable brand palettes. Keys must match the [data-palette] blocks in globals.css. */
const PALETTES = [
  { key: "indigo", name: "Indigo & Coral", from: "#4f46e5", to: "#fb6f51" },
  { key: "emerald", name: "Emerald & Amber", from: "#059669", to: "#f59e0b" },
  { key: "cobalt", name: "Cobalt & Rose", from: "#2563eb", to: "#f43f5e" },
  { key: "teal", name: "Teal & Sunset", from: "#0d9488", to: "#f97316" },
];

const STORAGE_KEY = "skillroute-palette";

export function PaletteSwitcher() {
  const [open, setOpen] = React.useState(false);
  const [current, setCurrent] = React.useState("indigo");

  React.useEffect(() => {
    try {
      setCurrent(localStorage.getItem(STORAGE_KEY) || "indigo");
    } catch {
      /* ignore */
    }
  }, []);

  function pick(key: string) {
    setCurrent(key);
    document.documentElement.setAttribute("data-palette", key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {
      /* ignore */
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        aria-label="Change color palette"
        onClick={() => setOpen((o) => !o)}
      >
        <Palette className="h-5 w-5" />
      </Button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 z-50 mt-2 w-56 rounded-xl border border-border bg-card p-1.5 shadow-lift">
            <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Color palette
            </p>
            {PALETTES.map((p) => (
              <button
                key={p.key}
                onClick={() => pick(p.key)}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-lg px-2 py-2 text-sm transition-colors hover:bg-secondary",
                  current === p.key && "bg-secondary"
                )}
              >
                <span
                  className="h-5 w-5 shrink-0 rounded-full ring-1 ring-black/10"
                  style={{ background: `linear-gradient(135deg, ${p.from}, ${p.to})` }}
                />
                <span className="flex-1 text-left">{p.name}</span>
                {current === p.key && <Check className="h-4 w-4 shrink-0 text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
