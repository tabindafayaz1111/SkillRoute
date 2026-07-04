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
  {
    id: "rag",
    title: "RAG: Retrieval-Augmented Generation",
    tagline: "Give AI an open book so it answers from YOUR data.",
    description:
      "Ground language models in real documents: chunking, embeddings, vector search, and retrieve-then-generate — the technique behind every 'chat with your docs' app.",
    icon: "Library",
    gradient: "from-cyan-500 via-teal-500 to-emerald-500",
    accent: "#06b6d4",
    difficulty: "Advanced",
    estimatedHours: 30,
    projectCount: 6,
    category: "AI Engineering & Tools",
    modules: [
      {
        id: "rag-foundations",
        title: "RAG Foundations",
        summary: "What RAG is and the problem it solves.",
        lessons: [
          { id: "rag-what", title: "What Is RAG? (An Open-Book Exam for AI)", minutes: 14, xp: 60, kind: "concept" },
          { id: "rag-why", title: "Why LLMs Need RAG: Hallucination & Stale Knowledge", minutes: 16, xp: 70, kind: "concept" },
          { id: "rag-flow", title: "The Retrieve-then-Generate Flow", minutes: 16, xp: 70, kind: "concept" },
        ],
      },
      {
        id: "rag-retrieval",
        title: "The Retrieval Half",
        summary: "Turn documents into searchable meaning.",
        lessons: [
          { id: "rag-chunking", title: "Documents & Chunking", minutes: 18, xp: 80, kind: "code" },
          { id: "rag-embeddings", title: "Embeddings: Meaning as Numbers", minutes: 20, xp: 90, kind: "concept" },
          { id: "rag-vector-db", title: "Vector Databases & Similarity Search", minutes: 20, xp: 90, kind: "code" },
        ],
      },
      {
        id: "rag-generation",
        title: "The Generation Half",
        summary: "Answer using the retrieved context.",
        lessons: [
          { id: "rag-prompt", title: "Building the Prompt with Context", minutes: 18, xp: 80, kind: "code" },
          { id: "rag-citations", title: "Grounding & Citations", minutes: 16, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "rag-build",
        title: "Build & Go Advanced",
        summary: "Ship a real RAG app and level it up.",
        lessons: [
          { id: "rag-pipeline", title: "Build a Minimal RAG Pipeline", minutes: 24, xp: 100, kind: "code" },
          { id: "rag-eval", title: "Evaluating a RAG System", minutes: 18, xp: 90, kind: "concept" },
          { id: "rag-advanced", title: "Advanced RAG: Re-ranking & Hybrid Search", minutes: 20, xp: 100, kind: "concept" },
          { id: "rag-capstone", title: "Capstone: Chat With Your Own Documents", minutes: 50, xp: 220, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "claude",
    title: "Building with Claude",
    tagline: "Build real AI apps on Anthropic's Claude models.",
    description:
      "From your first API call to tool-using, document-reading apps with Claude: the model family, the Messages API, streaming, tool use, vision, prompt caching, and safe deployment.",
    icon: "Sparkles",
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    accent: "#f97316",
    difficulty: "Intermediate",
    estimatedHours: 28,
    projectCount: 6,
    category: "AI Engineering & Tools",
    modules: [
      {
        id: "claude-meet",
        title: "Meet Claude",
        summary: "The models and your first request.",
        lessons: [
          { id: "claude-what", title: "What Is Claude?", minutes: 12, xp: 50, kind: "concept" },
          { id: "claude-models", title: "The Claude Family: Opus, Sonnet & Haiku", minutes: 14, xp: 60, kind: "concept" },
          { id: "claude-setup", title: "Your First Request (API Key & SDK)", minutes: 16, xp: 70, kind: "code" },
        ],
      },
      {
        id: "claude-api",
        title: "The Messages API",
        summary: "How you actually talk to Claude.",
        lessons: [
          { id: "claude-messages", title: "The Messages API, Explained", minutes: 18, xp: 80, kind: "code" },
          { id: "claude-system", title: "System Prompts & Conversations", minutes: 16, xp: 70, kind: "code" },
          { id: "claude-streaming", title: "Streaming Responses", minutes: 16, xp: 80, kind: "code" },
        ],
      },
      {
        id: "claude-beyond",
        title: "Beyond Chat",
        summary: "Tools, vision, and cost control.",
        lessons: [
          { id: "claude-tools", title: "Tool Use: Giving Claude Abilities", minutes: 22, xp: 100, kind: "code" },
          { id: "claude-vision", title: "Vision: Images & PDFs", minutes: 16, xp: 80, kind: "code" },
          { id: "claude-caching", title: "Prompt Caching: Faster & Cheaper", minutes: 16, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "claude-build",
        title: "Build Real Apps",
        summary: "From prompt craft to a shipped assistant.",
        lessons: [
          { id: "claude-prompting", title: "Prompt Engineering for Claude", minutes: 18, xp: 90, kind: "concept" },
          { id: "claude-agents", title: "Building Agents with Claude", minutes: 20, xp: 100, kind: "concept" },
          { id: "claude-capstone", title: "Capstone: A Claude-Powered Assistant", minutes: 50, xp: 220, kind: "project" },
        ],
      },
    ],
  },
];
