"use client";

import { motion } from "framer-motion";
import { History, FileText, ExternalLink } from "lucide-react";
import { aiTimeline, landmarkPapers } from "@/data/research";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const tagColor = {
  Idea: "default",
  Breakthrough: "warning",
  Model: "success",
  Milestone: "danger",
} as const;

export default function ResearchPage() {
  return (
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <Badge className="mb-4"><History className="h-3.5 w-3.5" /> The story of AI</Badge>
        <h1 className="text-4xl font-black md:text-5xl">History of AI</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every breakthrough that led to today&apos;s AI — explained simply, in order. From a single
          artificial neuron in 1958 to ChatGPT.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative mx-auto mt-14 max-w-3xl">
        <div className="absolute left-4 top-0 h-full w-0.5 bg-gradient-to-b from-primary via-accent to-transparent md:left-1/2" />
        {aiTimeline.map((e, i) => (
          <motion.div
            key={e.title}
            initial={{ opacity: 0, x: i % 2 ? 30 : -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className={cn(
              "relative mb-8 pl-12 md:w-1/2",
              i % 2 ? "md:ml-auto md:pl-12" : "md:pr-12 md:pl-0 md:text-right"
            )}
          >
            <span className={cn(
              "absolute top-1.5 grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-[11px] font-bold text-white",
              "left-0 md:left-auto",
              i % 2 ? "md:-left-4" : "md:-right-4"
            )}>
              {String(e.year).slice(2)}
            </span>
            <div className="rounded-2xl border border-border bg-card p-5 card-hover">
              <div className={cn("flex items-center gap-2", i % 2 ? "" : "md:justify-end")}>
                <Badge variant={tagColor[e.tag]}>{e.tag}</Badge>
                <span className="text-xs text-muted-foreground">{e.year}</span>
              </div>
              <h3 className="mt-2 text-lg font-bold">{e.title}</h3>
              <p className="text-xs text-primary">{e.who}</p>
              <p className="mt-1.5 text-sm text-muted-foreground">{e.blurb}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Landmark papers */}
      <div className="mx-auto mt-16 max-w-3xl">
        <h2 className="flex items-center gap-2 text-2xl font-black">
          <FileText className="h-6 w-6 text-primary" /> Papers that changed everything
        </h2>
        <p className="mt-1 text-muted-foreground">Start here — each will get a plain-English breakdown lesson.</p>
        <div className="mt-6 space-y-3">
          {landmarkPapers.map((p) => (
            <a
              key={p.title}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-5 card-hover"
            >
              <Badge variant="secondary" className="shrink-0">{p.year}</Badge>
              <div className="min-w-0 flex-1">
                <p className="font-semibold group-hover:text-primary">{p.title}</p>
                <p className="text-sm text-muted-foreground">{p.why}</p>
              </div>
              <ExternalLink className="h-4 w-4 shrink-0 text-muted-foreground" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
