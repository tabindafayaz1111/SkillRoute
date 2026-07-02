"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  BrainCircuit,
  Flame,
  LayoutDashboard,
  Trophy,
  Search,
  BookOpen,
  History,
  Code2,
  Award,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useProgress } from "@/components/providers/progress-provider";
import { Badge } from "@/components/ui/badge";
import { CommandPalette } from "@/components/search/command-palette";

const links = [
  { href: "/courses", label: "Courses", icon: BookOpen },
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/playground", label: "Playground", icon: Code2 },
  { href: "/research", label: "Research", icon: History },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/certificate", label: "Certificate", icon: Award },
];

export function Navbar() {
  const pathname = usePathname();
  const { xp, level, streakDays } = useProgress();
  const [searchOpen, setSearchOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <motion.span
            initial={{ rotate: -10, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30"
          >
            <BrainCircuit className="h-5 w-5" />
          </motion.span>
          <span className="text-lg font-extrabold tracking-tight">
            Skill<span className="gradient-text">Route</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  active
                    ? "bg-secondary text-foreground"
                    : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setSearchOpen(true)}
            className="hidden items-center gap-2 rounded-lg border border-border bg-secondary/50 px-3 py-2 text-sm text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground lg:flex"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
            <span>Search…</span>
            <kbd className="rounded bg-background px-1.5 text-xs">⌘K</kbd>
          </button>
          <button
            onClick={() => setSearchOpen(true)}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <Badge variant="warning" className="gap-1">
            <Flame className="h-3.5 w-3.5" />
            {streakDays}
          </Badge>
          <Badge variant="default" className="hidden gap-1 sm:flex">
            <Trophy className="h-3.5 w-3.5" />
            Lv {level}
          </Badge>
          <Badge variant="secondary" className="hidden gap-1 sm:flex">
            {xp} XP
          </Badge>

          <ThemeToggle />

          <Link
            href="/dashboard"
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-primary text-sm font-bold text-white"
            aria-label="Profile"
          >
            ML
          </Link>
        </div>
      </div>
    </header>
  );
}
