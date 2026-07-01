import Link from "next/link";
import { BrainCircuit } from "lucide-react";

const groups = [
  { title: "Learn", links: ["Machine Learning", "Deep Learning", "Playground", "Roadmap"] },
  { title: "Grow", links: ["Projects", "Interview Mode", "Resume Builder", "Certificates"] },
  { title: "Explore", links: ["Research", "Glossary", "Datasets", "Model Zoo"] },
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
              ML<span className="gradient-text">Academy</span>
            </span>
          </Link>
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            The most fun way to learn Machine Learning & Deep Learning — from absolute zero to
            industry-ready, free forever.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h4 className="text-sm font-semibold">{g.title}</h4>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              {g.links.map((l) => (
                <li key={l} className="cursor-pointer transition-colors hover:text-foreground">
                  {l}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border/60 py-5 text-center text-xs text-muted-foreground">
        Built with Next.js · Made for curious humans of every age.
      </div>
    </footer>
  );
}
