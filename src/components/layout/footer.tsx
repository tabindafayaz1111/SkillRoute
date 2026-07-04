import Link from "next/link";
import { BrainCircuit } from "lucide-react";

const groups: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: "Tracks",
    links: [
      { label: "AI & Machine Learning", href: "/courses" },
      { label: "Programming Languages", href: "/courses" },
      { label: "Web & Full-Stack", href: "/courses" },
      { label: "Data & Analytics", href: "/courses" },
    ],
  },
  {
    title: "Grow",
    links: [
      { label: "All Courses", href: "/courses" },
      { label: "Playground", href: "/playground" },
      { label: "Certificates", href: "/certificate" },
      { label: "Leaderboard", href: "/leaderboard" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "History of AI", href: "/research" },
      { label: "AI Mentor", href: "/dashboard" },
      { label: "Roadmap", href: "/courses" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary/30">
      <div className="container grid gap-10 py-12 md:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-primary to-accent text-white">
              <BrainCircuit className="h-4 w-4" />
            </span>
            <span className="font-extrabold">
              Skill<span className="gradient-text">Route</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The most fun way to learn to code, analyze data, and build with AI — from absolute zero
            to job-ready. 23 courses across 5 tracks, free forever.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-sm font-semibold">{g.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="transition-colors hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        Built with Next.js · Learn coding, data &amp; AI · Made for curious humans of every age.
      </div>
    </footer>
  );
}
