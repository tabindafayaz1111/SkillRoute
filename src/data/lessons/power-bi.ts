import type { LessonBody } from "@/types";

export const powerBi: Record<string, LessonBody> = {
  "pbi-intro": {
    story:
      "Your boss drops a giant spreadsheet on your desk: 40,000 rows of sales. She wants to know which region is slipping, and she wants it by 3pm — and she wants to click around and see it for herself, not read a paragraph you wrote. Squinting at rows won't cut it. Power BI is a free Microsoft app that swallows that spreadsheet and turns it into a living, clickable dashboard: charts, big numbers, filters. Click 'North' and every chart updates. That's it. That's the whole magic.",
    problem:
      "Spreadsheets are great for storing data and terrible for understanding it at a glance. Copy-pasting numbers into a chart every week is slow, error-prone, and out of date the moment you finish. You need something that connects to your data once, then refreshes and stays interactive.",
    analogy:
      "Excel is the fridge full of raw ingredients. Power BI is the kitchen that turns them into a plated meal your boss can actually eat.",
    explanation: [
      "Power BI Desktop is a free program you install on Windows. You build reports in it, then share them so others can click around.",
      "It works in three steps you'll learn in this course: (1) load and clean data, (2) model it — tell it how tables connect, (3) build visuals and calculations on top.",
      "Use it when someone needs to SEE and EXPLORE data regularly — weekly sales, live KPIs, a dashboard for the whole team.",
      "Don't reach for it for a one-time quick sum or a 10-row table — plain Excel is faster for that.",
      "Three pieces to know: Power BI Desktop (build), the Power BI Service (the website where you publish and share), and Power BI Mobile (view on your phone).",
      "It's part of the Microsoft world, so it plays nicely with Excel, SharePoint, SQL databases, and thousands of other sources.",
    ],
    code: {
      language: "text",
      source: `The Power BI Desktop workflow, in plain words:

1. Get Data      -> pick a source (Excel, CSV, database, web)
2. Transform     -> clean it in Power Query (next lesson)
3. Model         -> connect your tables with relationships
4. Measures      -> write DAX for totals, growth, ratios
5. Visualize     -> drag fields onto the canvas to make charts
6. Publish       -> send it to the Power BI Service to share`,
      explanation:
        "This is the mental map for the entire course. Every lesson lives at one of these six stops, so keep coming back to it.",
    },
    quiz: [
      {
        question: "What is Power BI mainly for?",
        options: [
          "Writing long documents",
          "Turning data into interactive dashboards people can explore",
          "Sending emails",
          "Editing photos",
        ],
        answerIndex: 1,
        explanation:
          "Power BI connects to your data and turns it into clickable charts and dashboards that update — not static text or images.",
      },
      {
        question: "Which piece of Power BI do you use to BUILD a report on your PC?",
        options: ["Power BI Mobile", "Power BI Service", "Power BI Desktop", "Excel"],
        answerIndex: 2,
        explanation:
          "Power BI Desktop is the free Windows app for building. The Service is the website for sharing; Mobile is for viewing.",
      },
    ],
    flashcards: [
      { front: "Power BI", back: "A Microsoft tool that turns raw data into interactive, refreshable dashboards." },
      { front: "Power BI Desktop", back: "The free Windows app where you build reports." },
      { front: "Power BI Service", back: "The website (app.powerbi.com) where you publish and share reports." },
      { front: "Report", back: "A collection of pages of interactive charts and visuals built on your data." },
    ],
    miniProject: {
      title: "Your First 10-Minute Dashboard",
      brief: "Load a tiny spreadsheet and make one chart, just to see the whole loop.",
      steps: [
        "Download Power BI Desktop (it's free) and open it.",
        "Click 'Get Data' and load any small Excel or CSV file you have.",
        "Drag a category field and a number field onto the canvas.",
        "Pick a bar chart from the Visualizations pane.",
        "Click a bar and watch it highlight — you just built an interactive report.",
      ],
    },
    industryUse: [
      "Coca-Cola bottling teams tracking daily sales and delivery performance across regions",
      "Hospitals monitoring bed occupancy and wait times on live dashboards",
      "Banks giving branch managers weekly KPI dashboards instead of emailed spreadsheets",
    ],
    commonMistakes: [
      "Thinking Power BI replaces Excel — it doesn't; it sits on top of data and is for exploring and sharing, not data entry.",
      "Trying to install it on a Mac — Power BI Desktop is Windows-only (Mac users use a virtual machine or the web service).",
    ],
    interviewQuestions: [
      "In your own words, what problem does Power BI solve that a spreadsheet doesn't?",
      "What's the difference between Power BI Desktop and the Power BI Service?",
    ],
    papers: [],
    nextUp: ["pbi-query", "pbi-model"],
    cheatsheet: [
      "Power BI = data in, interactive dashboard out",
      "Desktop = build · Service = share · Mobile = view",
      "Flow: Get Data -> Transform -> Model -> Measures -> Visualize -> Publish",
      "Free to download; Windows-only for Desktop",
      "Great for recurring dashboards, overkill for a quick sum",
    ],
  },

  "pbi-query": {
    story:
      "You open the sales file exported from the old system and it's a mess: prices have '$' stuck to them so they count as text, dates are written five different ways, half the region names say 'North ' with a sneaky space, and there are 12 blank rows at the bottom. In the old days you'd fix this by hand every single week. Power Query is a built-in cleaning machine: you do the fixes ONCE by clicking buttons, and it remembers every step. Next week, new file, same mess — you just hit Refresh and it re-cleans everything automatically.",
    problem:
      "Real-world data is almost never ready to use. It has typos, wrong data types, extra columns, and junk rows. Cleaning it by hand each time is soul-crushing and easy to get wrong. You want to record the cleaning once and replay it forever.",
    analogy:
      "Power Query is like a recipe card for tidying your kitchen: you write the steps down once, and every future mess gets cleaned the exact same way without thinking.",
    explanation: [
      "You open Power Query by clicking 'Transform Data' after loading a source. It's a separate window with your data in the middle and a list of steps on the right.",
      "Every click — remove a column, split a column, replace a value — is saved as a step under 'Applied Steps'. You can undo any step, or reorder them.",
      "The golden rule: set each column's data type correctly (whole number, decimal, date, text). Wrong types quietly break your charts and math later.",
      "Common cleaning moves: Remove Columns you don't need, Filter out junk rows, Replace Values (fix 'N/A'), Trim (kill sneaky spaces), Split Column, and Change Type.",
      "Use it when data comes from messy exports or needs the same fix repeatedly. When your data is already spotless, you can skip straight past it.",
      "Under the hood it writes a language called M, but you almost never touch it — the buttons write it for you.",
    ],
    code: {
      language: "text",
      source: `Applied Steps for cleaning a raw sales export:

1. Source                 (the file loads in)
2. Promoted Headers       (use row 1 as column names)
3. Removed Blank Rows     (drop the 12 empty rows)
4. Trimmed Text: Region   (remove the trailing spaces)
5. Replaced "N/A" -> null (in the Discount column)
6. Changed Type: Amount   (text -> decimal number)
7. Changed Type: OrderDate(text -> date)

-> Hit "Close & Apply". Every step replays on next Refresh.`,
      explanation:
        "This is what the Applied Steps list looks like after a real cleanup. Each line is one click you made, replayed automatically every time the data refreshes.",
    },
    exercise: {
      prompt:
        "Your Region column has values like 'North ', ' South', and 'east'. List the two Power Query steps that make them all clean and consistent.",
      starter: `Messy values: "North ", " South", "east"
Goal: "North", "South", "East"

Step 1: TODO
Step 2: TODO`,
      solution: `Messy values: "North ", " South", "east"
Goal: "North", "South", "East"

Step 1: Trim (removes the leading/trailing spaces)
Step 2: Format -> Capitalize Each Word (fixes "east" -> "East")`,
    },
    quiz: [
      {
        question: "What is the biggest advantage of cleaning data in Power Query?",
        options: [
          "It deletes your original file",
          "It records your steps and replays them every time the data refreshes",
          "It makes charts automatically",
          "It emails your boss",
        ],
        answerIndex: 1,
        explanation:
          "Power Query saves every cleaning step and re-runs them on new data — clean once, benefit forever.",
      },
      {
        question: "Why does setting the correct data type on a column matter?",
        options: [
          "It changes the color of the column",
          "Wrong types quietly break your math and charts later",
          "It's only for decoration",
          "It has no real effect",
        ],
        answerIndex: 1,
        explanation:
          "A number stored as text won't sum, and a date stored as text won't sort or filter by month. Correct types keep everything working.",
      },
    ],
    flashcards: [
      { front: "Power Query", back: "Power BI's data-cleaning tool where each fix is saved as a repeatable step." },
      { front: "Applied Steps", back: "The recorded list of every cleaning action, replayed on each refresh." },
      { front: "Data type", back: "What kind of value a column holds (text, whole number, decimal, date) — must be set correctly." },
      { front: "Trim", back: "A cleaning step that removes sneaky leading and trailing spaces from text." },
    ],
    miniProject: {
      title: "Rescue a Messy Export",
      brief: "Take a deliberately dirty CSV and clean it entirely inside Power Query.",
      steps: [
        "Load a CSV that has blank rows, a '$' in the amount column, and inconsistent region spellings.",
        "Remove blank rows and any columns you don't need.",
        "Trim the text columns and fix inconsistent values with Replace Values.",
        "Set correct data types on every column (dates, numbers, text).",
        "Close & Apply, then edit the raw file and hit Refresh to watch it re-clean.",
      ],
    },
    industryUse: [
      "Retailers combining daily store exports into one clean sales table each morning",
      "Accountants standardizing messy bank statements before reporting",
      "Marketing teams merging campaign exports from Google, Meta, and email into one tidy table",
    ],
    commonMistakes: [
      "Cleaning data manually in Excel first — do it in Power Query so it repeats automatically on refresh.",
      "Skipping data types — leaving numbers as text means your totals silently come out wrong or blank.",
      "Deleting steps out of order and breaking later steps that depended on them.",
    ],
    interviewQuestions: [
      "What is Power Query and why is it better than cleaning data by hand each time?",
      "Give three common transformations you'd apply to a raw data export.",
      "What happens to your Applied Steps when the underlying data source is refreshed?",
    ],
    papers: [],
    nextUp: ["pbi-model", "pbi-dax"],
    cheatsheet: [
      "Transform Data -> opens Power Query",
      "Every click = one saved Applied Step",
      "Always fix data types (number, date, text)",
      "Trim + Replace Values fix messy text",
      "Close & Apply, then Refresh replays it all",
    ],
  },

  "pbi-model": {
    story:
      "You have two tables. One is a huge list of every sale (30,000 rows), each with a Customer ID. The other is a small list of customers with their names, cities, and ages. On its own the sales table just shows codes like 'CUST-0472' — useless. But if you tell Power BI 'the Customer ID in Sales matches the Customer ID in Customers', it links them. Now you can chart Sales by City even though the sales table never had a City column. That link is a relationship, and building good ones is called data modeling.",
    problem:
      "Cramming everything into one giant table is repetitive and slow (the customer's name repeated 30,000 times) and it goes stale. Instead you keep data in sensible separate tables and connect them. But those connections have to be set up correctly, or your numbers double up or come out blank.",
    analogy:
      "It's like a library. One shelf holds the books (facts), another holds a card catalog of authors (details). A shared author-ID card lets you find every book by an author without reprinting the author's bio inside every book.",
    explanation: [
      "A data model is your tables plus the relationships (links) between them. You see and drag these links in the Model view.",
      "The best-practice shape is a star schema: one central 'fact' table (the events — sales, clicks, orders) surrounded by 'dimension' tables (the who/what/when — customers, products, dates).",
      "A relationship connects a column in one table to a matching column in another — almost always a shared ID. The 'one' side (each customer appears once) links to the 'many' side (a customer has many sales).",
      "Always add a dedicated Date table and connect it to your facts. It's what makes month/quarter/year analysis and time comparisons work.",
      "Use a model when data naturally splits into events and their descriptions. If you truly have one flat table with no repetition, you may not need relationships at all.",
      "Watch the arrow: the filter flows from the 'one' side down to the 'many' side. Pick a customer, and it filters their sales — not the other way around by default.",
    ],
    code: {
      language: "text",
      source: `A simple star schema:

        [ Dim_Date ]        [ Dim_Product ]
              |   \\             /
              |    \\           /   (1)
             (1)    v         v
              +---> [ Fact_Sales ] <---+
                        ^ (many)
                        |
                      (1) |
                  [ Dim_Customer ]

Fact_Sales = one row per sale (Date, ProductID, CustomerID, Amount)
Dim_* tables = one row per unique product / customer / date
Relationships link the shared ID columns (the "1" to the "many").`,
      explanation:
        "The central Fact table holds the numbers; the surrounding Dimension tables hold descriptions. Each relationship joins on a shared ID, one-to-many.",
    },
    exercise: {
      prompt:
        "You have Fact_Sales (with ProductID) and Dim_Product (with ProductID and Category). You want a chart of Sales by Category. What one thing must exist for this to work?",
      starter: `Fact_Sales: Date, ProductID, Amount
Dim_Product: ProductID, ProductName, Category

Chart wanted: Sum of Amount, broken down by Category
Missing piece: TODO`,
      solution: `Missing piece: A relationship linking
Dim_Product[ProductID] (the "one" side)
to Fact_Sales[ProductID] (the "many" side).

Without it, Category can't filter the sales amounts.`,
    },
    quiz: [
      {
        question: "What is a relationship in a Power BI data model?",
        options: [
          "A chart color scheme",
          "A link between a column in one table and a matching column in another",
          "A type of DAX formula",
          "A folder for your files",
        ],
        answerIndex: 1,
        explanation:
          "A relationship connects two tables on a shared column (usually an ID) so one can filter the other.",
      },
      {
        question: "In a star schema, what is the 'fact' table?",
        options: [
          "The table of true facts about the company",
          "The central table of events/measurements, like individual sales",
          "The table with the most colors",
          "A backup copy of your data",
        ],
        answerIndex: 1,
        explanation:
          "The fact table holds the events you measure (sales, orders). Dimension tables around it describe the who/what/when.",
      },
      {
        question: "Why add a dedicated Date table?",
        options: [
          "It looks professional",
          "It powers month/quarter/year grouping and time comparisons",
          "It deletes old data",
          "It's required to open Power BI",
        ],
        answerIndex: 1,
        explanation:
          "A proper Date table connected to your facts is what makes reliable time-based analysis (like year-over-year) possible.",
      },
    ],
    flashcards: [
      { front: "Data model", back: "Your tables plus the relationships connecting them." },
      { front: "Relationship", back: "A link between matching columns in two tables (usually a shared ID)." },
      { front: "Star schema", back: "One central fact table surrounded by descriptive dimension tables." },
      { front: "Fact table", back: "The table of events or measurements, like one row per sale." },
      { front: "Dimension table", back: "A table describing the who/what/when — customers, products, dates." },
    ],
    miniProject: {
      title: "Link Sales to Customers",
      brief: "Build your first two-table model and prove the link works.",
      steps: [
        "Load a Sales table (with CustomerID) and a Customers table (with CustomerID, City).",
        "Open Model view and drag CustomerID from Customers onto CustomerID in Sales.",
        "Confirm the relationship is one-to-many with the arrow pointing to Sales.",
        "Build a bar chart of total sales by City.",
        "Notice: City lives only in Customers, yet the chart works — that's the relationship doing its job.",
      ],
    },
    industryUse: [
      "E-commerce firms modeling Orders, Products, Customers, and Dates as a star schema for company-wide reporting",
      "Logistics companies linking shipment events to warehouse and route dimension tables",
      "Subscription businesses connecting a payments fact table to customer and plan dimensions",
    ],
    commonMistakes: [
      "Building one giant flat table instead of separate fact and dimension tables — it bloats the file and slows everything down.",
      "Forgetting a Date table, then wondering why time comparisons don't work.",
      "Creating relationships on columns that aren't truly matching IDs, causing blank or doubled numbers.",
    ],
    interviewQuestions: [
      "What is a star schema and why is it the preferred shape in Power BI?",
      "Explain a one-to-many relationship and which way the filter flows.",
      "Why is a dedicated Date table important in a data model?",
    ],
    papers: [],
    nextUp: ["pbi-dax", "pbi-visuals"],
    cheatsheet: [
      "Model = tables + relationships",
      "Star schema: fact in the middle, dimensions around it",
      "Link on shared IDs, one-to-many",
      "Filter flows from the 'one' side to the 'many'",
      "Always add and connect a Date table",
    ],
  },

  "pbi-dax": {
    story:
      "You drag Sales onto a card and it shows the total — nice. But now the boss asks harder questions: 'What's our total sales?' is easy, but 'What's this month versus last month?' and 'What % of the total does the North region make?' need real calculations. DAX (Data Analysis Expressions) is the formula language for that. If you've ever written an Excel formula like =SUM(A:A), DAX will feel familiar — it's the same idea, but it's smart about whatever the user has clicked and filtered on the screen.",
    problem:
      "Charts can only show what's already in your columns. The moment you need a calculated number — a running total, a growth rate, a ratio, an average that respects the current filters — you need a measure. Writing them by hand for every slice of data is impossible; DAX computes them live.",
    analogy:
      "A measure is like a smart calculator taped to your dashboard: whatever the user filters to — this month, that region — it instantly recomputes the right number for exactly that slice.",
    explanation: [
      "The star of DAX is the measure: a named formula (like Total Sales) that recalculates automatically based on whatever the user has filtered or clicked. This is called filter context — the single most important idea in DAX.",
      "You create a measure with 'New Measure', give it a name, then write a formula. It shows up in your field list ready to drop on any chart.",
      "Start with the workhorse aggregations: SUM, AVERAGE, COUNTROWS, MIN, MAX, DISTINCTCOUNT. Ninety percent of real dashboards run on these.",
      "CALCULATE is the power tool: it lets you compute a value under different filters — like Sales but only for last year, or only for 'North'.",
      "Prefer measures over calculated columns. Measures compute on the fly (light and flexible); calculated columns store a value in every row (heavy). Use a column only when you need to slice or group by the result.",
      "Write measures when you need totals, ratios, growth, or time comparisons. You don't need DAX just to show a column that already exists — drag it and go.",
    ],
    math:
      "Growth % = (This Period − Last Period) ÷ Last Period. In DAX you compute each period with CALCULATE and a date filter, then DIVIDE one by the other.",
    code: {
      language: "text",
      source: `-- A basic measure: total sales
Total Sales = SUM(Fact_Sales[Amount])

-- Count how many orders
Order Count = COUNTROWS(Fact_Sales)

-- Average order value (DIVIDE is safe against divide-by-zero)
Avg Order Value = DIVIDE([Total Sales], [Order Count])

-- Sales for last year, using CALCULATE + a time filter
Sales LY =
CALCULATE(
    [Total Sales],
    SAMEPERIODLASTYEAR(Dim_Date[Date])
)

-- Year-over-year growth %
YoY Growth % = DIVIDE([Total Sales] - [Sales LY], [Sales LY])`,
      explanation:
        "Each of these is a measure. Notice how bigger measures reuse smaller ones in [square brackets] — you build up from simple pieces, just like nesting Excel formulas.",
    },
    exercise: {
      prompt:
        "Write a measure that returns the total number of unique customers who bought something. (Hint: there's a DAX function that counts distinct values.)",
      starter: `-- Table: Fact_Sales with a CustomerID column
Unique Customers = -- TODO`,
      solution: `Unique Customers = DISTINCTCOUNT(Fact_Sales[CustomerID])`,
    },
    quiz: [
      {
        question: "What is a DAX 'measure'?",
        options: [
          "A ruler for the canvas",
          "A named formula that recalculates based on the current filters/clicks",
          "A type of chart",
          "A cleaning step in Power Query",
        ],
        answerIndex: 1,
        explanation:
          "A measure is a formula that recomputes live for whatever slice of data the user has filtered to — that's filter context.",
      },
      {
        question: "Which DAX function lets you compute a value under a DIFFERENT filter, like 'sales for last year'?",
        options: ["SUM", "CALCULATE", "TRIM", "COUNTROWS"],
        answerIndex: 1,
        explanation:
          "CALCULATE is the power tool for changing the filter context — e.g. total sales but restricted to last year or one region.",
      },
      {
        question: "When should you use a measure instead of a calculated column?",
        options: [
          "Always use columns; measures are outdated",
          "Use a measure for on-the-fly totals/ratios; a column only when you need to group by the result",
          "They are exactly the same",
          "Measures only work in Excel",
        ],
        answerIndex: 1,
        explanation:
          "Measures compute live and are light; calculated columns store a value in every row (heavier). Reach for a column only to slice/group by it.",
      },
    ],
    flashcards: [
      { front: "DAX", back: "Data Analysis Expressions — the formula language for calculations in Power BI." },
      { front: "Measure", back: "A named DAX formula that recalculates based on the current filter context." },
      { front: "Filter context", back: "The set of filters/clicks currently applied, which a measure responds to." },
      { front: "CALCULATE", back: "The DAX function that computes a value under a modified set of filters." },
      { front: "Calculated column", back: "A DAX result stored in every row — use only when you need to group/slice by it." },
    ],
    miniProject: {
      title: "Build a Measures Toolkit",
      brief: "Create the five measures every sales dashboard needs.",
      steps: [
        "Create Total Sales with SUM and Order Count with COUNTROWS.",
        "Create Avg Order Value using DIVIDE of the two above.",
        "Create Unique Customers with DISTINCTCOUNT.",
        "Create Sales LY using CALCULATE + SAMEPERIODLASTYEAR (needs a Date table).",
        "Create YoY Growth % and format it as a percentage.",
      ],
    },
    industryUse: [
      "Finance teams computing month-over-month and year-over-year revenue growth for board decks",
      "Retailers calculating average basket size and repeat-customer rates",
      "SaaS companies measuring active users and churn with DISTINCTCOUNT and CALCULATE",
    ],
    commonMistakes: [
      "Using calculated columns for everything — it bloats the model; prefer measures for totals and ratios.",
      "Dividing with '/' and getting errors on zero — use DIVIDE(), which handles divide-by-zero safely.",
      "Building time comparisons without a proper Date table — SAMEPERIODLASTYEAR and friends won't work.",
    ],
    interviewQuestions: [
      "What is the difference between a measure and a calculated column, and when do you use each?",
      "Explain filter context in your own words with an example.",
      "What does CALCULATE do, and give a real use for it.",
    ],
    papers: [],
    nextUp: ["pbi-visuals", "pbi-report"],
    cheatsheet: [
      "DAX = Power BI's formula language",
      "Measure = live formula that respects filters",
      "Core: SUM, AVERAGE, COUNTROWS, DISTINCTCOUNT",
      "CALCULATE = change the filter (e.g. last year)",
      "Use DIVIDE(a, b) to avoid divide-by-zero",
      "Prefer measures over calculated columns",
    ],
  },

  "pbi-visuals": {
    story:
      "You've cleaned the data, linked the tables, and written a few measures. Now comes the fun part — the part your boss actually sees. In Power BI you don't code a chart; you drag a field onto the canvas and it draws one. Drop 'Region' and 'Total Sales' and you get a bar chart. Add a slicer for 'Year' and suddenly anyone can click 2024 and the whole page updates. The real superpower is that all the visuals talk to each other: click one slice of a pie chart and every other chart on the page filters to match. That's what makes it feel alive.",
    problem:
      "A wall of numbers doesn't tell a story. People need the right chart for the right question — a trend over time, a comparison across categories, a single headline number — and they need to poke at it themselves. Building that by hand for every question would take forever.",
    analogy:
      "It's like arranging photos on a corkboard where pulling one pin rearranges all the others to match — click 'North' and the whole board reorganizes around North.",
    explanation: [
      "You build a visual by picking a chart type in the Visualizations pane, then dragging fields into its wells (Axis, Values, Legend). Power BI draws it instantly.",
      "Match the chart to the question: bar/column for comparing categories, line for trends over time, card for a single big number (a KPI), table/matrix for detail, map for geography.",
      "Slicers are on-screen filters (a dropdown or buttons) that let users choose Year, Region, etc. — and they filter every visual on the page.",
      "Cross-filtering is the built-in magic: click any element in any chart and the others respond automatically. No setup needed.",
      "Less is more. A great dashboard has a few clear visuals, not twenty. Give each one a plain-English title and remove clutter (extra gridlines, decimals).",
      "Don't use a pie chart with ten slices (nobody can compare them) or a 3D chart (they distort). When in doubt, a plain bar chart wins.",
    ],
    code: {
      language: "text",
      source: `Choosing the right visual for the question:

Question                          -> Best visual
"How do regions compare?"         -> Bar / column chart
"How are sales trending?"         -> Line chart
"What's our total this month?"    -> Card (big KPI number)
"Where are sales, geographically?"-> Map
"Show me the raw order details"   -> Table / matrix
"Let me pick a year/region"       -> Slicer (a filter control)

Rule of thumb: comparison = bars, time = line,
one headline number = card.`,
      explanation:
        "Pick the visual from the question being asked, not from what looks fanciest. This little table covers most real dashboards.",
    },
    exercise: {
      prompt:
        "A stakeholder asks: 'Show me monthly revenue for the last year so I can spot the trend.' Which visual, and which field goes on which axis?",
      starter: `Question: monthly revenue trend over the last year
Visual: TODO
X-axis (Axis): TODO
Y-axis (Values): TODO`,
      solution: `Visual: Line chart (it shows trends over time)
X-axis (Axis): Month (from the Date table)
Y-axis (Values): Total Sales measure`,
    },
    quiz: [
      {
        question: "Which visual is best for comparing sales across a handful of categories?",
        options: ["A line chart", "A bar or column chart", "A 3D pie chart", "A single card"],
        answerIndex: 1,
        explanation:
          "Bar/column charts make category comparisons easy to read. Lines are for trends over time; cards show one number.",
      },
      {
        question: "What does a slicer do?",
        options: [
          "It cuts your data file in half",
          "It's an on-screen filter that lets users pick values and filters every visual",
          "It's a DAX function",
          "It changes chart colors",
        ],
        answerIndex: 1,
        explanation:
          "A slicer is a filter control (dropdown or buttons) on the report page — pick a value and all visuals update.",
      },
      {
        question: "What is cross-filtering?",
        options: [
          "A cleaning step in Power Query",
          "Clicking an element in one chart automatically filters the others",
          "A type of relationship",
          "A way to email reports",
        ],
        answerIndex: 1,
        explanation:
          "Cross-filtering is Power BI's built-in interactivity: select part of one visual and the rest of the page responds.",
      },
    ],
    flashcards: [
      { front: "Visual", back: "A chart, card, table, or map placed on the report canvas." },
      { front: "Slicer", back: "An on-screen filter (dropdown or buttons) that filters all visuals on the page." },
      { front: "Cross-filtering", back: "Clicking one visual automatically filters the others — built-in interactivity." },
      { front: "Card", back: "A visual that displays a single big number, ideal for a KPI." },
    ],
    miniProject: {
      title: "One Question, Four Visuals",
      brief: "Answer 'How are we doing?' with a mini page of complementary visuals.",
      steps: [
        "Add a Card showing Total Sales as the headline number.",
        "Add a line chart of Total Sales by Month.",
        "Add a bar chart of Total Sales by Region.",
        "Add a slicer for Year at the top.",
        "Click a region bar and watch the card and line chart update — then tidy titles and remove clutter.",
      ],
    },
    industryUse: [
      "Sales leaders at HP using slicer-driven dashboards to drill from global to per-rep numbers",
      "Airlines showing on-time performance by route with maps and bar charts",
      "Retail merchandisers comparing category performance with cross-filtered bar and line visuals",
    ],
    commonMistakes: [
      "Cramming twenty visuals on one page — a few clear charts beat a cluttered wall every time.",
      "Using pie charts with many slices or 3D effects that distort comparisons — use bars instead.",
      "Leaving default titles like 'Sum of Amount' — rename to plain English like 'Total Sales'.",
    ],
    interviewQuestions: [
      "How do you choose which chart type to use for a given question?",
      "What is a slicer and how does it differ from cross-filtering?",
      "What makes a dashboard easy to read versus cluttered?",
    ],
    papers: [],
    nextUp: ["pbi-report", "pbi-dax"],
    cheatsheet: [
      "Drag fields onto the canvas -> instant chart",
      "Comparison = bars · time = line · one number = card",
      "Slicer = on-screen filter for the whole page",
      "Cross-filtering: click one visual, others respond",
      "Fewer, clearer visuals beat a crowded page",
      "Avoid 3D and many-slice pie charts",
    ],
  },

  "pbi-report": {
    story:
      "This is the moment it all comes together. Your CEO wants ONE screen every Monday morning: total revenue, how it compares to last year, the top products, sales by region, and a way to filter by month — all clickable, all current. You're going to build exactly that, end to end: load the raw sales file, clean it in Power Query, model the tables, write the DAX measures, lay out the visuals, and publish it so the whole leadership team can open it on any device. When you finish, you'll have a real portfolio piece — the kind of thing that gets people hired.",
    problem:
      "Individual skills — cleaning, modeling, DAX, visuals — only pay off when you can stitch them into one polished, trustworthy report that a busy executive can read in ten seconds and explore in two clicks. Delivering that reliably, and refreshing it weekly, is the actual job.",
    analogy:
      "You've learned to chop, season, and plate. This project is cooking the whole dinner and serving it — start to finish, for a real guest.",
    explanation: [
      "Follow the full pipeline you learned: Get Data -> clean in Power Query -> build relationships (star schema) -> write measures in DAX -> design the visuals -> publish.",
      "Design for a busy reader: the most important number top-left, a clear title, consistent colors, and no clutter. Executives scan, they don't study.",
      "Build the core measures first: Total Sales, Sales LY, YoY Growth %, and maybe Avg Order Value. Charts are only as good as the measures behind them.",
      "Add interactivity that answers follow-up questions: a Month/Year slicer, and cross-filtering so clicking a region drills the whole page.",
      "Publish to the Power BI Service, then set a scheduled refresh so the report updates itself — no more Monday-morning copy-paste.",
      "Always sanity-check: do the totals match the source? A beautiful dashboard with wrong numbers destroys trust instantly.",
    ],
    code: {
      language: "text",
      source: `Executive Dashboard — build checklist:

DATA     [ ] Load sales CSV/Excel via Get Data
CLEAN    [ ] Power Query: types, trim, remove junk rows
MODEL    [ ] Sales (fact) + Product/Customer/Date (dims)
         [ ] Relationships on IDs, one-to-many
         [ ] Connect the Date table
MEASURES [ ] Total Sales = SUM(Fact_Sales[Amount])
         [ ] Sales LY    = CALCULATE(...SAMEPERIODLASTYEAR...)
         [ ] YoY Growth % = DIVIDE(Total - LY, LY)
VISUALS  [ ] Cards: Total Sales, YoY Growth %
         [ ] Line: Sales by Month
         [ ] Bar: Sales by Region + Top Products
         [ ] Slicer: Year / Month
POLISH   [ ] Plain-English titles, tidy colors
PUBLISH  [ ] Publish to Service + schedule refresh
CHECK    [ ] Totals match the source file`,
      explanation:
        "Work top to bottom. Each stage maps to a lesson you've already done — this project just chains them into one deliverable.",
    },
    exercise: {
      prompt:
        "Your dashboard's Total Sales card shows $2.1M but the source file's SUM is $2.4M. Name two likely causes and how you'd check.",
      starter: `Card shows: $2,100,000
Source SUM: $2,400,000
Likely cause 1: TODO
Likely cause 2: TODO`,
      solution: `Cause 1: A slicer or page filter is still applied
(e.g. it's filtered to one year). Check the Filters pane.
Cause 2: Power Query dropped rows during cleaning
(a bad filter or type change turned some amounts to null).
Check: remove all filters, compare row counts to the source,
and re-inspect the Applied Steps.`,
    },
    quiz: [
      {
        question: "What is the correct order to build an executive dashboard?",
        options: [
          "Visuals first, then load and clean data",
          "Load -> clean -> model -> measures -> visuals -> publish",
          "Publish first, then add data",
          "Write DAX before loading any data",
        ],
        answerIndex: 1,
        explanation:
          "You follow the pipeline: get and clean the data, model it, write measures, then build visuals, and finally publish.",
      },
      {
        question: "Why set up a scheduled refresh after publishing?",
        options: [
          "To change the colors automatically",
          "So the report updates itself with new data instead of manual rebuilding",
          "To delete old reports",
          "It's required to open the file",
        ],
        answerIndex: 1,
        explanation:
          "Scheduled refresh keeps the published report current automatically — no weekly copy-paste.",
      },
      {
        question: "A dashboard looks beautiful but its totals don't match the source. What's the priority?",
        options: [
          "Ship it anyway; it looks great",
          "Fix the numbers first — wrong data destroys trust",
          "Add more charts",
          "Change the font",
        ],
        answerIndex: 1,
        explanation:
          "Accuracy comes before polish. Stakeholders stop trusting the whole report if the numbers are wrong.",
      },
    ],
    flashcards: [
      { front: "Report pipeline", back: "Load -> clean -> model -> measures -> visuals -> publish." },
      { front: "Scheduled refresh", back: "An automatic update of a published report so it stays current." },
      { front: "KPI card", back: "A visual showing one headline number, placed top-left for executives." },
      { front: "Sanity check", back: "Confirming your dashboard totals match the source data before sharing." },
    ],
    miniProject: {
      title: "Ship an Executive Sales Dashboard",
      brief: "Deliver a single-page, interactive dashboard from raw file to published report.",
      steps: [
        "Load the raw sales data and clean it in Power Query (types, trim, remove junk).",
        "Model it as a star schema with a connected Date table.",
        "Write Total Sales, Sales LY, and YoY Growth % measures in DAX.",
        "Lay out KPI cards, a monthly trend line, a regional bar chart, and a Year slicer.",
        "Publish to the Power BI Service, set a scheduled refresh, and verify totals match the source.",
      ],
    },
    industryUse: [
      "Finance teams delivering a weekly executive revenue dashboard to the leadership team",
      "Operations managers publishing live plant-performance reports refreshed hourly",
      "Consultants shipping client-facing KPI dashboards as a core deliverable",
    ],
    commonMistakes: [
      "Polishing visuals before verifying the numbers — always sanity-check totals against the source first.",
      "Leaving a stray slicer or filter applied, so headline numbers look wrong.",
      "Forgetting to set a scheduled refresh, so the 'live' dashboard silently goes stale.",
    ],
    interviewQuestions: [
      "Walk me through how you'd build an executive dashboard from a raw data file to a published report.",
      "How do you make sure the numbers on a dashboard are correct before sharing it?",
      "How do you keep a published Power BI report up to date automatically?",
    ],
    papers: [],
    nextUp: ["pbi-visuals", "pbi-dax"],
    cheatsheet: [
      "Pipeline: load -> clean -> model -> measures -> visuals -> publish",
      "Most important number top-left; scan in 10 seconds",
      "Core measures: Total Sales, Sales LY, YoY Growth %",
      "Add a slicer + rely on cross-filtering for drill-down",
      "Publish + schedule refresh so it stays current",
      "Sanity-check totals against the source before sharing",
    ],
  },
};
