import type { Course } from "@/types";

/** Category: AI Engineering & Tools. */
export const aitools: Course[] = [
  {
    id: "data-science-python",
    title: "Python for Data Science",
    tagline: "The toolkit that turns data into decisions.",
    description:
      "Master the data-science stack: NumPy, Pandas, Matplotlib, Seaborn, and a first taste of Scikit-learn — the daily tools of analysts and ML engineers.",
    icon: "PieChart",
    gradient: "from-teal-500 via-cyan-500 to-sky-500",
    accent: "#14b8a6",
    difficulty: "Beginner",
    estimatedHours: 40,
    projectCount: 10,
    category: "AI Engineering & Tools",
    featured: true,
    modules: [
      {
        id: "ds-numpy",
        title: "NumPy",
        summary: "Fast arrays and vectorized maths.",
        lessons: [
          { id: "ds-numpy-arrays", title: "NumPy Arrays vs Lists", minutes: 16, xp: 60, kind: "code" },
          { id: "ds-numpy-ops", title: "Vectorized Operations", minutes: 16, xp: 70, kind: "code" },
        ],
      },
      {
        id: "ds-pandas",
        title: "Pandas",
        summary: "Spreadsheets your code can question.",
        lessons: [
          { id: "ds-pandas-dataframe", title: "DataFrames: Load & Explore", minutes: 18, xp: 70, kind: "code" },
          { id: "ds-pandas-clean", title: "Cleaning Messy Data", minutes: 20, xp: 80, kind: "code" },
          { id: "ds-pandas-groupby", title: "Grouping & Aggregating", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "ds-viz",
        title: "Visualization & ML Peek",
        summary: "See patterns and train a first model.",
        lessons: [
          { id: "ds-matplotlib", title: "Plotting with Matplotlib & Seaborn", minutes: 18, xp: 80, kind: "code" },
          { id: "ds-sklearn-intro", title: "Your First Scikit-learn Model", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "ds-project",
        title: "Build Something",
        summary: "A full analysis, start to finish.",
        lessons: [
          { id: "ds-eda-project", title: "Project: Explore a Real Dataset", minutes: 45, xp: 190, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "genai-llm",
    title: "LLM & Generative AI Engineering",
    tagline: "Build real apps on top of ChatGPT-style models.",
    description:
      "The modern AI-engineer stack: prompt engineering, Hugging Face, embeddings, vector databases, RAG, and LangChain — build a production AI app.",
    icon: "Bot",
    gradient: "from-fuchsia-500 via-purple-500 to-indigo-500",
    accent: "#d946ef",
    difficulty: "Advanced",
    estimatedHours: 45,
    projectCount: 9,
    category: "AI Engineering & Tools",
    featured: true,
    modules: [
      {
        id: "genai-foundations",
        title: "Working with LLMs",
        summary: "How to actually use large language models.",
        lessons: [
          { id: "genai-how-llms", title: "How LLMs Work in Practice", minutes: 16, xp: 70, kind: "concept" },
          { id: "genai-prompting", title: "Prompt Engineering That Works", minutes: 18, xp: 80, kind: "concept" },
          { id: "genai-huggingface", title: "Using Hugging Face Models", minutes: 20, xp: 90, kind: "code" },
        ],
      },
      {
        id: "genai-retrieval",
        title: "Giving AI a Memory",
        summary: "Embeddings, vector search, and RAG.",
        lessons: [
          { id: "genai-embeddings", title: "Embeddings & Semantic Search", minutes: 20, xp: 90, kind: "concept" },
          { id: "genai-vector-db", title: "Vector Databases", minutes: 20, xp: 90, kind: "code" },
          { id: "genai-rag", title: "RAG: Retrieval-Augmented Generation", minutes: 22, xp: 100, kind: "concept" },
        ],
      },
      {
        id: "genai-build",
        title: "Building AI Apps",
        summary: "Orchestrate it all with LangChain.",
        lessons: [
          { id: "genai-langchain", title: "LangChain: Chains & Agents", minutes: 22, xp: 100, kind: "code" },
          { id: "genai-capstone", title: "Capstone: A RAG Chatbot", minutes: 55, xp: 220, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "git",
    title: "Git & GitHub",
    tagline: "Version control — a non-negotiable skill for every coder.",
    description:
      "Never lose work or fear breaking code again. Learn commits, branches, merging, and collaborating on GitHub the way real teams do.",
    icon: "GitBranch",
    gradient: "from-orange-500 via-red-500 to-rose-500",
    accent: "#f97316",
    difficulty: "Beginner",
    estimatedHours: 18,
    projectCount: 5,
    category: "AI Engineering & Tools",
    modules: [
      {
        id: "git-basics",
        title: "Git Basics",
        summary: "Track changes with confidence.",
        lessons: [
          { id: "git-why", title: "Why Version Control?", minutes: 10, xp: 40, kind: "concept" },
          { id: "git-commits", title: "init, add & commit", minutes: 14, xp: 60, kind: "code" },
          { id: "git-history", title: "Reading & Undoing History", minutes: 14, xp: 60, kind: "code" },
        ],
      },
      {
        id: "git-branches",
        title: "Branching & Collaboration",
        summary: "Work in parallel and with others.",
        lessons: [
          { id: "git-branching", title: "Branches & Merging", minutes: 16, xp: 70, kind: "concept" },
          { id: "git-github", title: "Remotes & GitHub", minutes: 16, xp: 70, kind: "code" },
          { id: "git-pull-requests", title: "Pull Requests & Reviews", minutes: 16, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "git-project",
        title: "Build Something",
        summary: "Run a real collaboration workflow.",
        lessons: [
          { id: "git-workflow-project", title: "Project: Ship a Repo the Team Way", minutes: 35, xp: 160, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "computer-graphics",
    title: "Computer Graphics",
    tagline: "How computers draw everything you see on screen.",
    description:
      "From pixels to 3D: color, coordinate systems, transformations, and rendering. Build visual intuition and draw with code on a canvas.",
    icon: "Palette",
    gradient: "from-pink-500 via-rose-500 to-red-500",
    accent: "#ec4899",
    difficulty: "Intermediate",
    estimatedHours: 40,
    projectCount: 8,
    category: "AI Engineering & Tools",
    modules: [
      {
        id: "cg-pixels",
        title: "Pixels & Color",
        summary: "The atoms of every image.",
        lessons: [
          { id: "cg-images", title: "How Images Are Drawn", minutes: 14, xp: 50, kind: "concept" },
          { id: "cg-color", title: "Pixels, RGB & Color", minutes: 16, xp: 60, kind: "concept" },
          { id: "cg-coordinates", title: "Coordinate Systems", minutes: 16, xp: 60, kind: "concept" },
        ],
      },
      {
        id: "cg-2d",
        title: "2D Graphics",
        summary: "Draw and move shapes with code.",
        lessons: [
          { id: "cg-canvas", title: "Drawing on a Canvas", minutes: 18, xp: 70, kind: "code" },
          { id: "cg-transforms", title: "2D Transformations", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "cg-3d",
        title: "Into 3D",
        summary: "How 3D scenes become 2D images.",
        lessons: [
          { id: "cg-rasterization", title: "Rendering & Rasterization", minutes: 20, xp: 90, kind: "concept" },
          { id: "cg-3d-basics", title: "3D Basics: Projection", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "cg-project",
        title: "Build Something",
        summary: "Make something move on screen.",
        lessons: [
          { id: "cg-animation-project", title: "Project: An Animated Scene", minutes: 45, xp: 190, kind: "project" },
        ],
      },
    ],
  },
];
