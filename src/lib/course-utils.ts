import type { Course } from "@/types";

export function courseLessonIds(course: Course) {
  return course.modules.flatMap((m) => m.lessons.map((l) => l.id));
}

export function courseProgress(course: Course, completed: string[]) {
  const ids = courseLessonIds(course);
  const done = ids.filter((id) => completed.includes(id)).length;
  return {
    done,
    total: ids.length,
    percent: ids.length ? Math.round((done / ids.length) * 100) : 0,
  };
}

/** Flat, ordered list of every lesson in a course (with its module id). */
export function flatLessons(course: Course) {
  return course.modules.flatMap((m) =>
    m.lessons.map((l) => ({ ...l, moduleId: m.id }))
  );
}

/** The previous and next lesson ids around a given lesson. */
export function adjacentLessons(course: Course, lessonId: string) {
  const flat = flatLessons(course);
  const i = flat.findIndex((l) => l.id === lessonId);
  return {
    prev: i > 0 ? flat[i - 1] : null,
    next: i >= 0 && i < flat.length - 1 ? flat[i + 1] : null,
  };
}

/** The next uncompleted lesson, or the first lesson if the course is done/fresh. */
export function nextLesson(course: Course, completed: string[]) {
  for (const mod of course.modules) {
    for (const lesson of mod.lessons) {
      if (!completed.includes(lesson.id)) return { moduleId: mod.id, lesson };
    }
  }
  const first = course.modules[0]?.lessons[0];
  return first ? { moduleId: course.modules[0].id, lesson: first } : null;
}
