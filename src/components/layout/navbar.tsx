"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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
  LogOut,
  User,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./theme-toggle";
import { useProgress } from "@/components/providers/progress-provider";
import { useAuth } from "@/components/providers/auth-provider";
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

function getInitials(name: string) {
  return name
    .split(/[\s_.-]+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { xp, level, streakDays } = useProgress();
  const { user, openLogin, logout } = useAuth();
  const [searchOpen, setSearchOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const menuRef = React.useRef<HTMLDivElement>(null);

  // Close user menu when clicking outside
  React.useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  const displayName =
    user?.user_metadata?.display_name ||
    user?.email?.split("@")[0] ||
    "Learner";

  const initials = getInitials(displayName);

  async function handleLogout() {
    setMenuOpen(false);
    await logout();
    router.push("/");
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <CommandPalette open={searchOpen} onOpenChange={setSearchOpen} />
      <div className="container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
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

        {/* Desktop Nav Links */}
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

        {/* Right side controls */}
        <div className="flex items-center gap-2">
          {/* Search — desktop */}
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

          {/* Badges */}
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

          {/* Mobile hamburger (shows all nav links) */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="grid h-9 w-9 place-items-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground md:hidden"
            aria-label="Open menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* User avatar / dropdown */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setMenuOpen((o) => !o)}
              id="user-menu-trigger"
              aria-label="Open user menu"
              aria-expanded={menuOpen}
              className="flex items-center gap-1.5 rounded-full transition-all"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-sm font-bold text-white shadow-md shadow-primary/30 transition-transform hover:scale-105">
                {user ? initials : "?"}
              </span>
              <ChevronDown
                className={cn(
                  "h-3.5 w-3.5 text-muted-foreground transition-transform duration-200",
                  menuOpen && "rotate-180"
                )}
              />
            </button>

            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.96 }}
                  transition={{ type: "spring", damping: 22, stiffness: 320 }}
                  className="absolute right-0 top-12 z-50 w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-xl shadow-black/10"
                >
                  {/* User info header */}
                  <div className="border-b border-border bg-gradient-to-r from-primary/10 to-accent/10 px-4 py-4">
                    <div className="flex items-center gap-3">
                      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-sm font-bold text-white">
                        {user ? initials : <User className="h-4 w-4" />}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold">
                          {user ? displayName : "Not signed in"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {user ? `Level ${level} · ${xp} XP` : "Sign in to save progress"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Nav links */}
                  <div className="p-2">
                    <p className="mb-1 px-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Navigate
                    </p>
                    {links.map(({ href, label, icon: Icon }) => {
                      const active = pathname.startsWith(href);
                      return (
                        <Link
                          key={href}
                          href={href}
                          onClick={() => setMenuOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                            active
                              ? "bg-primary/10 text-primary"
                              : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {label}
                          {active && (
                            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                          )}
                        </Link>
                      );
                    })}
                  </div>

                  {/* Auth action */}
                  <div className="border-t border-border p-2">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    ) : (
                      <button
                        onClick={() => { setMenuOpen(false); openLogin(); }}
                        className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
                      >
                        <User className="h-4 w-4" />
                        Sign In / Create Account
                      </button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile nav drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-border md:hidden"
          >
            <div className="container grid grid-cols-2 gap-1 py-3">
              {links.map(({ href, label, icon: Icon }) => {
                const active = pathname.startsWith(href);
                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      "flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </Link>
                );
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
