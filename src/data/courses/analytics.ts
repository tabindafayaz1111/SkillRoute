import type { Course } from "@/types";

/** Category: Data & Analytics. */
export const analytics: Course[] = [
  {
    id: "sql",
    title: "SQL & Databases",
    tagline: "Ask any question of your data — the language of data.",
    description:
      "Go from zero to confidently querying databases: SELECT, filtering, JOINs, and aggregates. The single most in-demand data skill.",
    icon: "Database",
    gradient: "from-sky-500 via-blue-500 to-indigo-500",
    accent: "#0ea5e9",
    difficulty: "Beginner",
    estimatedHours: 30,
    projectCount: 8,
    category: "Data & Analytics",
    featured: true,
    modules: [
      {
        id: "sql-basics",
        title: "Querying Basics",
        summary: "Get data out of a table.",
        lessons: [
          { id: "sql-what", title: "What Is a Database?", minutes: 12, xp: 50, kind: "concept" },
          { id: "sql-select", title: "SELECT: Reading Data", minutes: 14, xp: 60, kind: "code" },
          { id: "sql-where", title: "Filtering with WHERE", minutes: 14, xp: 60, kind: "code" },
          { id: "sql-sorting", title: "Sorting & Limiting Results", minutes: 12, xp: 50, kind: "code" },
        ],
      },
      {
        id: "sql-relationships",
        title: "Relationships & Joins",
        summary: "Combine data from multiple tables.",
        lessons: [
          { id: "sql-joins", title: "JOINs: Connecting Tables", minutes: 20, xp: 90, kind: "code" },
          { id: "sql-aggregates", title: "GROUP BY & Aggregates", minutes: 18, xp: 80, kind: "code" },
          { id: "sql-subqueries", title: "Subqueries & CTEs", minutes: 18, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "sql-project",
        title: "Build Something",
        summary: "Answer real questions with SQL.",
        lessons: [
          { id: "sql-analysis-project", title: "Project: Analyze a Sales Database", minutes: 40, xp: 180, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "statistics",
    title: "Statistics & Probability",
    tagline: "Make sense of data and reason under uncertainty.",
    description:
      "The intuition behind data science: averages, spread, distributions, probability, and testing whether a result is real. Maths kept friendly.",
    icon: "Sigma",
    gradient: "from-rose-500 via-pink-500 to-fuchsia-500",
    accent: "#f43f5e",
    difficulty: "Beginner",
    estimatedHours: 34,
    projectCount: 7,
    category: "Data & Analytics",
    modules: [
      {
        id: "stats-describe",
        title: "Describing Data",
        summary: "Summarize a dataset in a few numbers.",
        lessons: [
          { id: "stats-center", title: "Mean, Median & Mode", minutes: 14, xp: 50, kind: "concept" },
          { id: "stats-spread", title: "Variance & Standard Deviation", minutes: 16, xp: 60, kind: "concept" },
          { id: "stats-distributions", title: "Distributions & the Bell Curve", minutes: 18, xp: 70, kind: "concept" },
        ],
      },
      {
        id: "stats-probability",
        title: "Probability",
        summary: "How likely is it, really?",
        lessons: [
          { id: "stats-probability-basics", title: "Probability Without the Panic", minutes: 16, xp: 70, kind: "concept" },
          { id: "stats-sampling", title: "Sampling & the Central Limit Theorem", minutes: 18, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "stats-inference",
        title: "Drawing Conclusions",
        summary: "Is this result real or just luck?",
        lessons: [
          { id: "stats-ci", title: "Confidence Intervals", minutes: 18, xp: 80, kind: "concept" },
          { id: "stats-hypothesis", title: "Hypothesis Testing & p-values", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "stats-project",
        title: "Build Something",
        summary: "Run a real analysis end to end.",
        lessons: [
          { id: "stats-ab-test", title: "Project: Analyze an A/B Test", minutes: 40, xp: 180, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "linear-algebra",
    title: "Linear Algebra for ML",
    tagline: "The maths that quietly powers all of machine learning.",
    description:
      "Vectors, matrices, and the operations behind every ML model — taught visually, so it finally clicks. No dry proofs, just intuition and use.",
    icon: "Calculator",
    gradient: "from-indigo-500 via-violet-500 to-purple-500",
    accent: "#8b5cf6",
    difficulty: "Intermediate",
    estimatedHours: 28,
    projectCount: 6,
    category: "Data & Analytics",
    modules: [
      {
        id: "la-vectors",
        title: "Vectors",
        summary: "Arrows, points, and directions.",
        lessons: [
          { id: "la-what-vector", title: "What Is a Vector?", minutes: 14, xp: 50, kind: "concept" },
          { id: "la-vector-ops", title: "Adding & Scaling Vectors", minutes: 16, xp: 60, kind: "concept" },
          { id: "la-dot-product", title: "The Dot Product & Similarity", minutes: 18, xp: 70, kind: "concept" },
        ],
      },
      {
        id: "la-matrices",
        title: "Matrices",
        summary: "Grids that transform space.",
        lessons: [
          { id: "la-matrices-intro", title: "Matrices as Transformations", minutes: 18, xp: 70, kind: "concept" },
          { id: "la-matmul", title: "Matrix Multiplication", minutes: 20, xp: 80, kind: "concept" },
          { id: "la-eigen", title: "Eigenvalues, Intuitively", minutes: 20, xp: 90, kind: "concept" },
        ],
      },
      {
        id: "la-project",
        title: "Build Something",
        summary: "See linear algebra do real work.",
        lessons: [
          { id: "la-image-project", title: "Project: Transform an Image with Matrices", minutes: 40, xp: 170, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "excel",
    title: "Excel for Data Analysis",
    tagline: "The world's most-used data tool — actually mastered.",
    description:
      "Turn spreadsheets into insight: formulas, lookup functions, pivot tables, and dashboards. A skill every job values.",
    icon: "FileSpreadsheet",
    gradient: "from-green-500 via-emerald-500 to-teal-500",
    accent: "#16a34a",
    difficulty: "Beginner",
    estimatedHours: 25,
    projectCount: 8,
    category: "Data & Analytics",
    modules: [
      {
        id: "excel-basics",
        title: "Spreadsheet Basics",
        summary: "Cells, formulas, and functions.",
        lessons: [
          { id: "excel-cells", title: "Cells, Rows & Formulas", minutes: 12, xp: 50, kind: "concept" },
          { id: "excel-functions", title: "Essential Functions (SUM, IF, ...)", minutes: 16, xp: 60, kind: "code" },
          { id: "excel-lookup", title: "VLOOKUP & XLOOKUP", minutes: 18, xp: 70, kind: "code" },
        ],
      },
      {
        id: "excel-analysis",
        title: "Analyzing Data",
        summary: "Summarize and visualize quickly.",
        lessons: [
          { id: "excel-pivot", title: "Pivot Tables That Wow", minutes: 20, xp: 80, kind: "concept" },
          { id: "excel-charts", title: "Charts & Conditional Formatting", minutes: 16, xp: 70, kind: "code" },
        ],
      },
      {
        id: "excel-project",
        title: "Build Something",
        summary: "Ship an interactive dashboard.",
        lessons: [
          { id: "excel-dashboard", title: "Project: A Sales Dashboard", minutes: 40, xp: 170, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "power-bi",
    title: "Power BI",
    tagline: "Turn raw data into interactive business dashboards.",
    description:
      "Microsoft's leading BI tool: load and shape data, model relationships, write DAX, and build dashboards stakeholders love.",
    icon: "BarChart3",
    gradient: "from-amber-500 via-yellow-500 to-orange-500",
    accent: "#f59e0b",
    difficulty: "Beginner",
    estimatedHours: 30,
    projectCount: 8,
    category: "Data & Analytics",
    modules: [
      {
        id: "pbi-load",
        title: "Load & Shape",
        summary: "Get data in and clean it up.",
        lessons: [
          { id: "pbi-intro", title: "What Is Power BI?", minutes: 12, xp: 50, kind: "concept" },
          { id: "pbi-query", title: "Cleaning Data with Power Query", minutes: 18, xp: 70, kind: "code" },
          { id: "pbi-model", title: "The Data Model & Relationships", minutes: 18, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "pbi-analyze",
        title: "Measure & Visualize",
        summary: "DAX and building visuals.",
        lessons: [
          { id: "pbi-dax", title: "DAX Basics: Measures", minutes: 20, xp: 90, kind: "code" },
          { id: "pbi-visuals", title: "Building Interactive Visuals", minutes: 18, xp: 80, kind: "code" },
        ],
      },
      {
        id: "pbi-project",
        title: "Build Something",
        summary: "Deliver a real report.",
        lessons: [
          { id: "pbi-report", title: "Project: An Executive Dashboard", minutes: 40, xp: 180, kind: "project" },
        ],
      },
    ],
  },
  {
    id: "tableau",
    title: "Tableau",
    tagline: "Tell stories with data through beautiful visuals.",
    description:
      "The gold standard for data visualization: connect data, drag-and-drop charts, build dashboards, and craft data stories that persuade.",
    icon: "LineChart",
    gradient: "from-blue-500 via-indigo-500 to-slate-500",
    accent: "#3b82f6",
    difficulty: "Beginner",
    estimatedHours: 28,
    projectCount: 7,
    category: "Data & Analytics",
    modules: [
      {
        id: "tableau-basics",
        title: "Tableau Basics",
        summary: "Connect data and make your first chart.",
        lessons: [
          { id: "tableau-connect", title: "Connecting to Data", minutes: 14, xp: 50, kind: "concept" },
          { id: "tableau-marks", title: "Marks, Shelves & Fields", minutes: 16, xp: 60, kind: "concept" },
          { id: "tableau-charts", title: "Building Core Chart Types", minutes: 18, xp: 70, kind: "code" },
        ],
      },
      {
        id: "tableau-advanced",
        title: "Dashboards & Calculations",
        summary: "Combine views and compute on the fly.",
        lessons: [
          { id: "tableau-calcs", title: "Calculated Fields", minutes: 18, xp: 80, kind: "code" },
          { id: "tableau-dashboards", title: "Interactive Dashboards", minutes: 18, xp: 80, kind: "concept" },
        ],
      },
      {
        id: "tableau-project",
        title: "Build Something",
        summary: "Craft a data story.",
        lessons: [
          { id: "tableau-story", title: "Project: A Data Storytelling Dashboard", minutes: 40, xp: 175, kind: "project" },
        ],
      },
    ],
  },
];
