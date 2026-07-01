"use client";

import { notFound } from "next/navigation";
import { getCourse } from "@/data/courses";
import { getLesson } from "@/data/lessons";
import { LessonView } from "@/components/lesson/lesson-view";

export default function LessonPage({
  params,
}: {
  params: { courseId: string; lessonId: string };
}) {
  const { courseId, lessonId } = params;
  const course = getCourse(courseId);
  const lesson = getLesson(courseId, lessonId);

  if (!course || !lesson) return notFound();

  return <LessonView lesson={lesson} course={course} />;
}
