import type { Course } from "@/types";

/** Category: Programming Languages. Outlines are data-driven; lesson bodies use
 *  the structured lesson template until authored to full depth. */
export const languages: Course[] = [
  {
    id: "python-programming",
    title: "Python Programming",
    tagline: "The friendliest first language — write real code fast.",
    description:
      "Learn general-purpose Python from scratch: think like a programmer, automate boring tasks, and build small apps. The perfect on-ramp to everything else.",
    icon: "FileCode2",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    accent: "#3b82f6",
    difficulty: "Beginner",
    estimatedHours: 35,
    projectCount: 10,
    category: "Programming Languages",
    modules: [
      {
        id: "getting-started",
        title: "Getting Started",
        summary: "Install Python, run your first program, and meet variables.",
        lessons: [
          { id: "why-python", title: "Why Python? Your First Program", minutes: 10, xp: 40, kind: "concept" },
          { id: "variables-types", title: "Variables & Data Types", minutes: 14, xp: 50, kind: "code" },
          { id: "strings-numbers", title: "Working with Text & Numbers", minutes: 14, xp: 50, kind: "code" },
        ],
      },
      {
        id: "logic-and-flow",
        title: "Logic & Flow",
        summary: "Make decisions, repeat work, and package code into functions.",
        lessons: [
          { id: "if-else", title: "Making Decisions with if/else", minutes: 14, xp: 60, kind: "code" },
          { id: "loops", title: "Loops: Repeat Without Copy-Paste", minutes: 16, xp: 60, kind: "code" },
          { id: "functions", title: "Functions: Reusable Recipes", minutes: 16, xp: 70, kind: "code" },
        ],
      },
      {
        id: "data-and-files",
        title: "Data Structures & Files",
        summary: "Store collections of things and read/write real files.",
        lessons: [
          { id: "lists-dicts", title: "Lists, Dictionaries & Sets", minutes: 18, xp: 70, kind: "code" },
          { id: "files-errors", title: "Reading Files & Handling Errors", minutes: 16, xp: 70, kind: "code" },
          { id: "oop-basics", title: "Classes & Objects, Gently", minutes: 20, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "python-project",
        title: "Build Something",
        summary: "Turn your skills into a small, real program.",
        lessons: [
          { id: "cli-project", title: "Project: A To-Do List App", minutes: 40, xp: 180, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "javascript",
    title: "JavaScript Essentials",
    tagline: "The language of the web — make pages come alive.",
    description:
      "Master the fundamentals of JavaScript, then use it to make web pages interactive. The gateway to React, Node, and full-stack development.",
    icon: "Braces",
    gradient: "from-yellow-400 via-amber-500 to-orange-500",
    accent: "#eab308",
    difficulty: "Beginner",
    estimatedHours: 38,
    projectCount: 11,
    category: "Programming Languages",
    modules: [
      {
        id: "js-basics",
        title: "JavaScript Basics",
        summary: "Variables, types, and the browser console.",
        lessons: [
          { id: "js-first", title: "Your First Script & the Console", minutes: 12, xp: 40, kind: "code" },
          { id: "js-variables", title: "let, const & Data Types", minutes: 14, xp: 50, kind: "code" },
          { id: "js-functions", title: "Functions & Arrow Functions", minutes: 16, xp: 60, kind: "code" },
        ],
      },
      {
        id: "js-data",
        title: "Data & Logic",
        summary: "Arrays, objects, and control flow.",
        lessons: [
          { id: "js-arrays", title: "Arrays & Array Methods", minutes: 18, xp: 70, kind: "code" },
          { id: "js-objects", title: "Objects: Real-World Data", minutes: 16, xp: 70, kind: "code" },
          { id: "js-control", title: "Conditionals & Loops", minutes: 14, xp: 60, kind: "code" },
        ],
      },
      {
        id: "js-web",
        title: "JavaScript in the Browser",
        summary: "Manipulate pages and talk to servers.",
        lessons: [
          { id: "js-dom", title: "The DOM: Changing the Page", minutes: 18, xp: 80, kind: "code" },
          { id: "js-events", title: "Events: Reacting to Clicks", minutes: 16, xp: 70, kind: "code" },
          { id: "js-async", title: "Async, Promises & fetch()", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "js-project",
        title: "Build Something",
        summary: "Ship an interactive web mini-app.",
        lessons: [
          { id: "js-weather-app", title: "Project: Live Weather Widget", minutes: 40, xp: 190, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "cpp",
    title: "C++ Programming",
    tagline: "The powerhouse behind games, engines, and fast systems.",
    description:
      "Go deep on C++: from syntax to pointers, memory, and object-oriented design. Learn how computers really work while building high-performance code.",
    icon: "Binary",
    gradient: "from-blue-500 via-indigo-500 to-violet-500",
    accent: "#6366f1",
    difficulty: "Intermediate",
    estimatedHours: 55,
    projectCount: 9,
    category: "Programming Languages",
    modules: [
      {
        id: "cpp-basics",
        title: "C++ Foundations",
        summary: "Compile your first program and learn the core syntax.",
        lessons: [
          { id: "cpp-hello", title: "Compilers & Your First Program", minutes: 14, xp: 50, kind: "concept" },
          { id: "cpp-types", title: "Variables, Types & Operators", minutes: 16, xp: 60, kind: "code" },
          { id: "cpp-flow", title: "Control Flow & Loops", minutes: 16, xp: 60, kind: "code" },
          { id: "cpp-functions", title: "Functions & Scope", minutes: 16, xp: 70, kind: "code" },
        ],
      },
      {
        id: "cpp-memory",
        title: "Pointers & Memory",
        summary: "The part that makes C++ powerful (and tricky).",
        lessons: [
          { id: "cpp-arrays", title: "Arrays & References", minutes: 18, xp: 80, kind: "code" },
          { id: "cpp-pointers", title: "Pointers & Memory, Demystified", minutes: 22, xp: 100, kind: "concept" },
          { id: "cpp-dynamic", title: "Dynamic Memory & Smart Pointers", minutes: 20, xp: 90, kind: "code" },
        ],
      },
      {
        id: "cpp-oop",
        title: "Object-Oriented C++",
        summary: "Model the world with classes and the STL.",
        lessons: [
          { id: "cpp-classes", title: "Classes, Objects & Constructors", minutes: 20, xp: 90, kind: "code" },
          { id: "cpp-inheritance", title: "Inheritance & Polymorphism", minutes: 20, xp: 90, kind: "concept" },
          { id: "cpp-stl", title: "The STL: vector, map & Algorithms", minutes: 20, xp: 90, kind: "code" },
        ],
      },
      {
        id: "cpp-project",
        title: "Build Something",
        summary: "Apply it all in a real program.",
        lessons: [
          { id: "cpp-console-game", title: "Project: A Console Game", minutes: 45, xp: 200, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "java",
    title: "Java Programming",
    tagline: "Write once, run anywhere — the enterprise workhorse.",
    description:
      "Learn Java from the ground up: clean object-oriented code, collections, and the JVM. The foundation for Android and Spring Boot backends.",
    icon: "Coffee",
    gradient: "from-orange-500 via-amber-500 to-red-500",
    accent: "#f97316",
    difficulty: "Beginner",
    estimatedHours: 45,
    projectCount: 9,
    category: "Programming Languages",
    modules: [
      {
        id: "java-basics",
        title: "Java Foundations",
        summary: "The JVM, syntax, and your first class.",
        lessons: [
          { id: "java-jvm", title: "How Java Runs: the JVM", minutes: 12, xp: 50, kind: "concept" },
          { id: "java-syntax", title: "Variables, Types & Operators", minutes: 16, xp: 60, kind: "code" },
          { id: "java-flow", title: "Control Flow & Methods", minutes: 16, xp: 60, kind: "code" },
        ],
      },
      {
        id: "java-oop",
        title: "Object-Oriented Java",
        summary: "The heart of Java: classes and objects.",
        lessons: [
          { id: "java-classes", title: "Classes, Objects & Constructors", minutes: 20, xp: 80, kind: "code" },
          { id: "java-inheritance", title: "Inheritance & Interfaces", minutes: 20, xp: 90, kind: "concept" },
          { id: "java-collections", title: "Collections: List, Map & Set", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "java-robust",
        title: "Writing Robust Code",
        summary: "Handle errors and organize larger programs.",
        lessons: [
          { id: "java-exceptions", title: "Exceptions & Error Handling", minutes: 16, xp: 70, kind: "code" },
          { id: "java-generics", title: "Generics & Streams", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "java-project",
        title: "Build Something",
        summary: "Put your Java to work.",
        lessons: [
          { id: "java-bank-app", title: "Project: A Banking System", minutes: 45, xp: 200, kind: "project" },
        ],
      },
    ],
  },
];
