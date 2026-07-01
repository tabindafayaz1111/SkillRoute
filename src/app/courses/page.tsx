"use client";

import { motion } from "framer-motion";
import { CourseCard } from "@/components/home/course-card";
import { coursesByCategory, courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";

export default function CoursesPage() {
  const groups = coursesByCategory();

  return (
    <div className="container py-12">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <Badge className="mb-4">{courses.length} courses · 5 tracks</Badge>
        <h1 className="text-4xl font-black md:text-5xl">Explore the catalog</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every course goes from absolute zero to job-ready, with stories, live code, projects,
          deployment, and interview prep baked in. Pick a track and start today.
        </p>
      </motion.div>

      {/* Category quick-nav */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {groups.map((g) => (
          <a
            key={g.name}
            href={`#${slug(g.name)}`}
            className="rounded-full border border-border bg-secondary/50 px-3.5 py-1.5 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            {g.name}
            <span className="ml-1.5 text-xs text-muted-foreground">{g.items.length}</span>
          </a>
        ))}
      </div>

      {groups.map((group) => (
        <section key={group.name} id={slug(group.name)} className="mt-16 scroll-mt-24">
          <div className="mb-6 flex items-center gap-3">
            <h2 className="text-2xl font-black">{group.name}</h2>
            <div className="h-px flex-1 bg-border" />
            <Badge variant="secondary">{group.items.length}</Badge>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {group.items.map((c, i) => (
              <CourseCard key={c.id} course={c} index={i} />
            ))}
          </div>
        </section>
      ))}

      <div className="mt-16 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
        More tracks coming — MLOps, Computer Vision, NLP, Cloud & DevOps. The platform is built to
        scale to unlimited courses.
      </div>
    </div>
  );
}

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
