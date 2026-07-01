"use client";

import { motion } from "framer-motion";
import { CourseCard } from "@/components/home/course-card";
import { courses } from "@/data/courses";
import { Badge } from "@/components/ui/badge";

export default function CoursesPage() {
  return (
    <div className="container py-12">
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <Badge className="mb-4">Full curriculum</Badge>
        <h1 className="text-4xl font-black md:text-5xl">Courses</h1>
        <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
          Every course goes from absolute zero to job-ready, with stories, live code, projects,
          deployment, and interview prep baked in.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {courses.map((c, i) => (
          <CourseCard key={c.id} course={c} index={i} />
        ))}
      </div>

      <div className="mt-10 rounded-2xl border border-dashed border-border p-8 text-center text-muted-foreground">
        More courses coming — Computer Vision, NLP, MLOps, Reinforcement Learning. The platform is
        built to scale to unlimited courses.
      </div>
    </div>
  );
}
