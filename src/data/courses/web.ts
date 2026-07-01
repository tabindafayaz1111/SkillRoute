import type { Course } from "@/types";

/** Category: Web & Full-Stack Development. */
export const web: Course[] = [
  {
    id: "fullstack",
    title: "Full-Stack Web Development",
    tagline: "Zero to a deployed full-stack app — the complete roadmap.",
    description:
      "The big-picture journey: how the web works, frontend, backend, databases, auth, and deployment — tying every web skill together into one shippable product.",
    icon: "Layers",
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    accent: "#a855f7",
    difficulty: "Intermediate",
    estimatedHours: 80,
    projectCount: 16,
    category: "Web & Full-Stack Development",
    featured: true,
    modules: [
      {
        id: "web-foundations",
        title: "How the Web Works",
        summary: "The mental model behind every website.",
        lessons: [
          { id: "how-web-works", title: "Clients, Servers & HTTP", minutes: 14, xp: 50, kind: "concept" },
          { id: "html-css", title: "HTML & CSS: Structure and Style", minutes: 20, xp: 70, kind: "code" },
          { id: "responsive-design", title: "Responsive & Modern Layout", minutes: 18, xp: 70, kind: "code" },
        ],
      },
      {
        id: "web-frontend",
        title: "The Frontend",
        summary: "Interactivity with JavaScript and a framework.",
        lessons: [
          { id: "fs-js", title: "JavaScript for the Frontend", minutes: 18, xp: 70, kind: "code" },
          { id: "fs-framework", title: "Thinking in Components (React)", minutes: 20, xp: 80, kind: "concept" },
          { id: "fs-state", title: "State & Data in the UI", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "web-backend",
        title: "The Backend & Database",
        summary: "APIs, databases, and authentication.",
        lessons: [
          { id: "fs-api", title: "Building a REST API", minutes: 20, xp: 90, kind: "code" },
          { id: "fs-database", title: "Storing Data in a Database", minutes: 20, xp: 90, kind: "code" },
          { id: "fs-auth", title: "Authentication & Sessions", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "web-ship",
        title: "Ship It",
        summary: "Deploy a full app to the internet.",
        lessons: [
          { id: "fs-deploy", title: "Deploying Frontend + Backend", minutes: 22, xp: 110, kind: "concept" },
          { id: "fs-capstone", title: "Capstone: A Full-Stack Notes App", minutes: 55, xp: 220, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "react",
    title: "React",
    tagline: "Build fast, modern user interfaces from reusable pieces.",
    description:
      "Learn the world's most popular UI library: components, state, and hooks. Build interactive apps the way professional frontend teams do.",
    icon: "Atom",
    gradient: "from-cyan-500 via-sky-500 to-blue-500",
    accent: "#06b6d4",
    difficulty: "Intermediate",
    estimatedHours: 45,
    projectCount: 12,
    category: "Web & Full-Stack Development",
    modules: [
      {
        id: "react-basics",
        title: "React Fundamentals",
        summary: "Components and JSX — the building blocks.",
        lessons: [
          { id: "react-why", title: "Why React? Components & JSX", minutes: 16, xp: 60, kind: "concept" },
          { id: "react-props", title: "Props: Passing Data Down", minutes: 16, xp: 70, kind: "code" },
          { id: "react-state", title: "State with useState", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "react-hooks",
        title: "Hooks & Effects",
        summary: "Side effects, lists, and forms.",
        lessons: [
          { id: "react-effects", title: "useEffect & the Lifecycle", minutes: 20, xp: 90, kind: "concept" },
          { id: "react-lists", title: "Rendering Lists & Keys", minutes: 16, xp: 70, kind: "code" },
          { id: "react-forms", title: "Forms & Controlled Inputs", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "react-data",
        title: "Real Apps",
        summary: "Fetch data and manage bigger apps.",
        lessons: [
          { id: "react-fetch", title: "Fetching Data from an API", minutes: 18, xp: 90, kind: "code" },
          { id: "react-router", title: "Routing Between Pages", minutes: 16, xp: 80, kind: "code" },
        ],
      },
      {
        id: "react-project",
        title: "Build Something",
        summary: "Ship a real React app.",
        lessons: [
          { id: "react-movie-app", title: "Project: A Movie Search App", minutes: 45, xp: 200, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "nodejs",
    title: "Node.js",
    tagline: "JavaScript on the server — build APIs and backends.",
    description:
      "Use JavaScript beyond the browser. Build HTTP servers, REST APIs with Express, and connect to databases to power real applications.",
    icon: "Server",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    accent: "#22c55e",
    difficulty: "Intermediate",
    estimatedHours: 42,
    projectCount: 11,
    category: "Web & Full-Stack Development",
    modules: [
      {
        id: "node-basics",
        title: "Node Fundamentals",
        summary: "The runtime, modules, and npm.",
        lessons: [
          { id: "node-what", title: "What Is Node? Runtime & npm", minutes: 14, xp: 50, kind: "concept" },
          { id: "node-modules", title: "Modules & the File System", minutes: 16, xp: 60, kind: "code" },
          { id: "node-async", title: "Async I/O & the Event Loop", minutes: 18, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "node-server",
        title: "Servers & APIs",
        summary: "Serve HTTP and build REST APIs with Express.",
        lessons: [
          { id: "node-http", title: "Your First HTTP Server", minutes: 16, xp: 70, kind: "code" },
          { id: "node-express", title: "Express: Routes & Middleware", minutes: 20, xp: 90, kind: "code" },
          { id: "node-rest", title: "Designing a REST API", minutes: 18, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "node-data",
        title: "Data & Deployment",
        summary: "Persist data and go live.",
        lessons: [
          { id: "node-db", title: "Connecting a Database", minutes: 20, xp: 90, kind: "code" },
          { id: "node-deploy", title: "Deploying a Node Backend", minutes: 18, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "node-project",
        title: "Build Something",
        summary: "Ship a backend service.",
        lessons: [
          { id: "node-api-project", title: "Project: A Blog REST API", minutes: 45, xp: 200, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "spring-boot",
    title: "Spring Boot",
    tagline: "Production-grade Java backends, the industry standard.",
    description:
      "Build robust, enterprise-ready APIs with Java and Spring Boot: controllers, dependency injection, and database access with JPA.",
    icon: "Boxes",
    gradient: "from-lime-500 via-green-500 to-emerald-500",
    accent: "#84cc16",
    difficulty: "Advanced",
    estimatedHours: 50,
    projectCount: 10,
    category: "Web & Full-Stack Development",
    modules: [
      {
        id: "spring-basics",
        title: "Spring Boot Basics",
        summary: "Setup and the core ideas.",
        lessons: [
          { id: "spring-intro", title: "What Is Spring Boot?", minutes: 14, xp: 60, kind: "concept" },
          { id: "spring-setup", title: "Project Setup & Structure", minutes: 16, xp: 60, kind: "code" },
          { id: "spring-di", title: "Dependency Injection Explained", minutes: 18, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "spring-api",
        title: "Building APIs",
        summary: "Controllers and REST endpoints.",
        lessons: [
          { id: "spring-controllers", title: "REST Controllers & Routing", minutes: 20, xp: 90, kind: "code" },
          { id: "spring-services", title: "Services & Business Logic", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "spring-data",
        title: "Data with JPA",
        summary: "Talk to a database the Spring way.",
        lessons: [
          { id: "spring-jpa", title: "JPA & Repositories", minutes: 20, xp: 90, kind: "code" },
          { id: "spring-validation", title: "Validation & Error Handling", minutes: 16, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "spring-project",
        title: "Build Something",
        summary: "Ship a Spring Boot service.",
        lessons: [
          { id: "spring-project-app", title: "Project: A Task Manager API", minutes: 50, xp: 210, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "django",
    title: "Django",
    tagline: "Batteries-included web development with Python.",
    description:
      "Build database-backed web apps fast with Django: models, views, templates, and the famous admin panel — Python's most productive web framework.",
    icon: "LayoutDashboard",
    gradient: "from-emerald-500 via-green-600 to-teal-600",
    accent: "#10b981",
    difficulty: "Intermediate",
    estimatedHours: 48,
    projectCount: 11,
    category: "Web & Full-Stack Development",
    modules: [
      {
        id: "django-basics",
        title: "Django Basics",
        summary: "Setup and the request/response cycle.",
        lessons: [
          { id: "django-intro", title: "Why Django? Project Setup", minutes: 14, xp: 60, kind: "concept" },
          { id: "django-views", title: "Views, URLs & Templates", minutes: 20, xp: 80, kind: "code" },
        ],
      },
      {
        id: "django-data",
        title: "Models & the ORM",
        summary: "Databases without writing SQL.",
        lessons: [
          { id: "django-models", title: "Models & the ORM", minutes: 20, xp: 90, kind: "code" },
          { id: "django-admin", title: "The Admin Panel Superpower", minutes: 16, xp: 70, kind: "concept" },
          { id: "django-forms", title: "Forms & User Input", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "django-auth",
        title: "Users & Deployment",
        summary: "Auth and going live.",
        lessons: [
          { id: "django-auth-lesson", title: "Authentication & Users", minutes: 18, xp: 90, kind: "concept" },
          { id: "django-deploy", title: "Deploying a Django App", minutes: 18, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "django-project",
        title: "Build Something",
        summary: "Ship a Django web app.",
        lessons: [
          { id: "django-blog", title: "Project: A Blog Platform", minutes: 50, xp: 210, kind: "project" },
        ],
      },
    ],
  },
];
