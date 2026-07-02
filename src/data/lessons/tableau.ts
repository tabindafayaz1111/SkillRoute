import type { LessonBody } from "@/types";

export const tableau: Record<string, LessonBody> = {
  "tableau-connect": {
    story:
      "You've got a messy spreadsheet of last year's sales sitting on your laptop. A colleague asks, 'Which region did best?' You could squint at 4,000 rows... or you could hand that same file to Tableau. Connecting to data is simply pointing Tableau at your file and saying 'here's my stuff, let me look at it.' Ten seconds later Tableau has read every column and is ready to draw charts from it — you haven't written a single formula.",
    problem:
      "Your data lives in all sorts of places — an Excel file, a Google Sheet, a database at work, a CSV someone emailed you. Before you can chart anything, Tableau needs to actually read it and understand which columns are words, which are numbers, and which are dates. That first handshake is 'connecting.'",
    analogy:
      "It's like plugging a USB stick into a TV: the TV can't show your holiday photos until it reads the stick first. Connecting is that plug-in moment.",
    explanation: [
      "Tableau doesn't store your data — it connects to it. You pick a source (an Excel file, a CSV, a database) and Tableau reads the columns and rows.",
      "There are two connection styles: a 'live' connection (Tableau always reads the latest data) and an 'extract' (Tableau takes a fast snapshot copy — great for big or slow sources).",
      "When Tableau reads your file, it guesses the type of each column: text (Abc), number (#), date (calendar icon), or geographic (a globe). You can correct a wrong guess with one click.",
      "If your data spans several tables (like 'Orders' and 'Customers'), you can join or relate them on a shared column — Tableau shows this on a canvas so you literally see the tables link up.",
      "Use a live connection when freshness matters (today's sales). Use an extract when the source is huge, slow, or you want to work offline on a plane.",
      "Always sanity-check the preview grid before charting: are the numbers really numbers? Are dates recognised as dates? Fixing it here saves you an hour later.",
    ],
    code: {
      language: "text",
      source: `A typical connection, in plain steps:

1. Open Tableau  ->  "Connect" panel on the left
2. Choose your source:  Microsoft Excel
3. Pick the file:  sales_2024.xlsx
4. Drag the sheet "Orders" onto the canvas
5. Tableau shows a preview grid + guessed data types:
      Region      Abc  (text)
      Order Date  📅   (date)
      Sales       #    (number)
6. Fix any wrong type, then click "Sheet 1" to start charting`,
      explanation:
        "No coding — connecting is a guided, click-and-drag process. The preview grid is where you confirm Tableau read everything correctly.",
    },
    quiz: [
      {
        question: "What does 'connecting to data' in Tableau actually do?",
        options: [
          "Permanently copies your data into Tableau forever",
          "Points Tableau at your source so it can read the columns and rows",
          "Automatically fixes all the errors in your spreadsheet",
          "Uploads your file to the public internet",
        ],
        answerIndex: 1,
        explanation:
          "Connecting is the handshake where Tableau reads your source and learns its columns — it doesn't own or fix the data.",
      },
      {
        question: "When is an 'extract' (a snapshot copy) a better choice than a live connection?",
        options: [
          "When you need up-to-the-second live data",
          "When the source is huge or slow, or you want to work offline",
          "Extracts are never useful",
          "Only when your data has no dates",
        ],
        answerIndex: 1,
        explanation:
          "Extracts give you a fast local snapshot — ideal for big/slow sources or offline work. Live is for freshness.",
      },
    ],
    flashcards: [
      { front: "Data source", back: "The file or database Tableau reads from — Excel, CSV, Google Sheets, SQL, etc." },
      { front: "Live connection", back: "Tableau always reads the latest data straight from the source." },
      { front: "Extract", back: "A fast snapshot copy of the data that Tableau stores locally for speed and offline use." },
      { front: "Data type", back: "What a column holds — text, number, date, or geographic — shown by an icon in Tableau." },
    ],
    miniProject: {
      title: "Connect Your First File",
      brief: "Grab any spreadsheet you own and get it into Tableau cleanly.",
      steps: [
        "Download Tableau Public (free) and open it.",
        "Connect to an Excel or CSV file you already have.",
        "In the preview grid, check every column's data type icon.",
        "Fix at least one wrong type (e.g. a date read as text).",
        "Click 'Sheet 1' — you're now ready to chart.",
      ],
    },
    industryUse: [
      "Coca-Cola analysts connect Tableau to sales databases to track regional performance daily",
      "Charities like the Red Cross connect donation spreadsheets to see giving trends fast",
      "Hospitals connect Tableau to patient-flow systems to spot bottlenecks in real time",
    ],
    commonMistakes: [
      "Charting before checking data types — a 'Sales' column read as text won't add up. Fix the type in the preview first.",
      "Choosing a live connection on a giant, slow database and then wondering why everything crawls. Use an extract instead.",
    ],
    interviewQuestions: [
      "What's the difference between a live connection and an extract, and when would you pick each?",
      "How does Tableau decide the data type of a column, and how would you correct a wrong guess?",
    ],
    papers: [],
    nextUp: ["tableau-marks", "tableau-charts"],
    cheatsheet: [
      "Connect panel = where you pick your source",
      "Live = latest data · Extract = fast snapshot copy",
      "Icons: Abc text · # number · 📅 date · 🌐 geo",
      "Multiple tables? Join/relate on a shared column",
      "Always check the preview grid before charting",
    ],
  },

  "tableau-marks": {
    story:
      "Open Tableau for the first time and you'll see a bunch of shelves along the top and a big empty space in the middle. It looks intimidating — until you realise it's just a smart canvas. You drag a field like 'Region' up to a shelf, drag 'Sales' to another, and a bar chart appears. You didn't tell Tableau to 'make a bar chart.' You just placed your fields, and Tableau drew the picture. Marks, shelves, and fields are the three words that unlock this whole magic trick.",
    problem:
      "Most tools make you pick a chart first, then wrestle your data into it. Tableau flips that: you place your data and the chart emerges. But to steer it, you need to know where things go — which shelf controls the columns, which controls the rows, and how to change the dots into bars or a map.",
    analogy:
      "Think of a pegboard in a workshop. The shelves are the pegs; your fields (Region, Sales, Date) are the tools you hang on them. Hang them in different spots and the whole workbench rearranges itself.",
    explanation: [
      "A 'field' is just a column from your data — like Region, Sales, or Order Date. Tableau splits them into Dimensions (categories: things you group by, usually blue) and Measures (numbers you add up, usually green).",
      "'Shelves' are the drop zones at the top: the Columns shelf builds the horizontal axis, the Rows shelf builds the vertical axis. Drag a field there and an axis appears.",
      "The 'Marks card' controls how each data point looks. It has drop zones for Color, Size, Label, Detail, and Shape — drag a field onto Color and your bars split into a rainbow by category.",
      "The Marks type dropdown (Bar, Line, Circle, Map, Text...) changes the whole picture instantly — same data, different shape.",
      "Rule of thumb: Dimensions slice your data into groups; Measures give you the numbers inside each group. Region (dimension) × Sales (measure) = sales per region.",
      "Everything is drag-and-drop and instantly reversible. Drag a field off a shelf and the chart updates live — so experiment freely, you can't break anything.",
    ],
    code: {
      language: "text",
      source: `Anatomy of a Tableau worksheet:

Columns shelf  ->  [ Region ]            (horizontal axis)
Rows shelf     ->  [ SUM(Sales) ]        (vertical axis)

Marks card:
   Type:  Bar
   Color: [ Region ]     (one colour per region)
   Label: [ SUM(Sales) ] (number on each bar)

Result: a coloured, labelled bar chart of sales by region —
built with zero code, just by dropping fields onto shelves.`,
      explanation:
        "The Columns and Rows shelves set the axes; the Marks card decorates each mark. Swap a field's shelf and the chart re-draws itself instantly.",
    },
    quiz: [
      {
        question: "What is the difference between a Dimension and a Measure?",
        options: [
          "Dimensions are always dates; Measures are always text",
          "Dimensions are categories you group by; Measures are numbers you add up",
          "There is no real difference",
          "Measures are for colour only",
        ],
        answerIndex: 1,
        explanation:
          "Dimensions (like Region) slice data into groups; Measures (like Sales) are the numbers you aggregate inside those groups.",
      },
      {
        question: "You drag 'Region' onto the Columns shelf and 'Sales' onto Rows. What appears?",
        options: [
          "Nothing, until you write a formula",
          "An axis for each, giving you sales per region",
          "A pie chart, always",
          "A blank page",
        ],
        answerIndex: 1,
        explanation:
          "Columns builds the horizontal axis (Region) and Rows the vertical axis (Sales) — together they show sales per region.",
      },
      {
        question: "What does the Marks card control?",
        options: [
          "Which file you connected to",
          "How each data point looks — its colour, size, label, and shape",
          "The name of your workbook",
          "Only the chart title",
        ],
        answerIndex: 1,
        explanation:
          "The Marks card is the styling hub: drop fields on Color, Size, Label, or Shape to change how marks appear.",
      },
    ],
    flashcards: [
      { front: "Field", back: "A column from your data (e.g. Region, Sales, Order Date)." },
      { front: "Dimension", back: "A category you group by — usually text or dates, shown in blue." },
      { front: "Measure", back: "A number you aggregate (sum, average) — shown in green." },
      { front: "Marks card", back: "The panel controlling how each data point looks: Color, Size, Label, Detail, Shape." },
    ],
    miniProject: {
      title: "Build a Chart Without a Chart Button",
      brief: "Prove to yourself that placing fields — not picking charts — is how Tableau works.",
      steps: [
        "Connect any sales-style dataset.",
        "Drag a category (like Region or Product) to Columns.",
        "Drag a number (like Sales) to Rows — watch a bar chart appear.",
        "Drop that same category onto Color in the Marks card.",
        "Switch the Marks type from Bar to Line, then Circle — same data, new pictures.",
      ],
    },
    industryUse: [
      "Airbnb analysts drag Neighbourhood and Bookings onto shelves to compare listings by area in seconds",
      "Spotify data teams use the Marks card to colour streams by genre when exploring trends",
      "Retailers like Walmart split sales by category using Dimensions on Columns for quick store comparisons",
    ],
    commonMistakes: [
      "Confusing Dimensions and Measures — putting Sales where a category belongs gives a nonsense chart. Remember: group by dimensions, count/sum measures.",
      "Forgetting the Marks card exists and wondering why every bar is one dull colour. Drag a field onto Color to bring it alive.",
    ],
    interviewQuestions: [
      "Explain Dimensions vs Measures in Tableau with an example of each.",
      "What do the Columns and Rows shelves do, and how does the Marks card differ from them?",
    ],
    papers: [],
    nextUp: ["tableau-charts", "tableau-calcs"],
    cheatsheet: [
      "Field = a column from your data",
      "Dimension (blue) = category to group by",
      "Measure (green) = number to add up",
      "Columns shelf = horizontal axis · Rows shelf = vertical axis",
      "Marks card = Color · Size · Label · Shape",
      "Drag on and off freely — nothing breaks",
    ],
  },

  "tableau-charts": {
    story:
      "Your boss wants three answers by lunch: which product sells most, how sales trend over the year, and where customers cluster on a map. In Excel that's three fiddly chart wizards. In Tableau it's three drags. A bar chart for the ranking, a line chart for the trend, a map for the geography — each is just a different Marks type over the same data. Once you know which chart answers which kind of question, you become the person who makes data instantly readable.",
    problem:
      "A pile of numbers means nothing to a busy human. The right chart turns 'here are 4,000 rows' into 'the West region is falling behind — here's the picture.' The skill isn't drawing charts; it's picking the one that makes the answer jump out.",
    analogy:
      "Charts are like the right tool for a job: a bar chart is a ruler for comparing sizes, a line chart is a heartbeat monitor for change over time, and a map is a... map. Using a pie chart to show a trend is like hammering a nail with a screwdriver.",
    explanation: [
      "Bar chart — compares amounts across categories (sales by region, students per class). The workhorse: our eyes judge bar lengths brilliantly.",
      "Line chart — shows change over time (revenue by month). Put a date on Columns and a measure on Rows; use it whenever time is involved.",
      "Map — plots geographic fields (country, state, city). Tableau auto-recognises places and drops your measure onto the map by size or colour.",
      "Scatter plot — reveals the relationship between two numbers (ad spend vs sales). Put one measure on Columns, another on Rows.",
      "Heat map / highlight table — a grid coloured by value, great for spotting hot and cold spots across two categories at once.",
      "Skip the pie chart for anything with more than 2–3 slices — humans are terrible at comparing angles. A bar chart almost always reads clearer.",
      "Tableau's 'Show Me' panel suggests chart types based on the fields you've selected — a handy training-wheels button while you learn which chart fits which question.",
    ],
    code: {
      language: "text",
      source: `Same data, three questions, three charts:

Q: Which region sells most?      ->  BAR
   Columns: Region   Rows: SUM(Sales)

Q: How do sales trend monthly?   ->  LINE
   Columns: MONTH(Order Date)   Rows: SUM(Sales)

Q: Where are our customers?      ->  MAP
   Detail: State (geo)   Color: SUM(Sales)

Tip: press "Show Me" and Tableau highlights the chart
     types that fit the fields you picked.`,
      explanation:
        "Choosing a chart in Tableau just means choosing a Marks type or letting 'Show Me' suggest one — the underlying fields stay the same.",
    },
    exercise: {
      prompt:
        "You want to see how monthly revenue changed over a year. Which field goes where, and what Marks type should you use? Fill in the blanks.",
      starter: `Chart goal: revenue over time (a trend)

Marks type:  ____   (bar / line / pie?)
Columns:     ____   (Region / MONTH(Order Date)?)
Rows:        ____   (SUM(Sales) / Customer Name?)`,
      solution: `Marks type:  line
Columns:     MONTH(Order Date)
Rows:        SUM(Sales)

A date on Columns + a measure on Rows + a line = a clean trend.`,
    },
    quiz: [
      {
        question: "Which chart best shows sales trending over 12 months?",
        options: ["Pie chart", "Line chart", "Bar chart of one number", "Word cloud"],
        answerIndex: 1,
        explanation:
          "Time-based change is a line chart's job — a date on Columns and a measure on Rows gives a clean trend.",
      },
      {
        question: "Why do experts avoid pie charts with many slices?",
        options: [
          "Pies are illegal in Tableau",
          "Humans struggle to compare angles accurately, so a bar chart reads clearer",
          "Pie charts can't use colour",
          "They take too long to load",
        ],
        answerIndex: 1,
        explanation:
          "We judge bar lengths far better than pie angles, so bars almost always communicate comparisons more clearly.",
      },
    ],
    flashcards: [
      { front: "Bar chart", back: "Compares amounts across categories — the everyday workhorse." },
      { front: "Line chart", back: "Shows how a measure changes over time." },
      { front: "Map", back: "Plots geographic fields; Tableau auto-recognises places." },
      { front: "Show Me", back: "Tableau's panel that suggests chart types based on your selected fields." },
    ],
    miniProject: {
      title: "Three Charts, One Dataset",
      brief: "Answer three different business questions from a single sales file.",
      steps: [
        "Connect a dataset with a category, a date, a location, and a sales number.",
        "Build a bar chart: sales by category.",
        "Build a line chart: sales by month.",
        "Build a map: sales by state or country.",
        "Rename each sheet clearly (e.g. 'Sales by Region') so you can reuse them later.",
      ],
    },
    industryUse: [
      "Netflix uses line charts of viewing hours over time to spot which shows are gaining momentum",
      "Delivery firms like DoorDash use maps to show order density by neighbourhood",
      "Banks use bar charts to compare loan volumes across branches at a glance",
    ],
    commonMistakes: [
      "Reaching for a pie chart out of habit — a bar chart almost always communicates comparisons better.",
      "Putting a date on Columns but keeping it as a bar chart when a line would show the trend far more clearly.",
    ],
    interviewQuestions: [
      "Given a dataset, how would you decide between a bar chart, line chart, and scatter plot?",
      "When is a map the right visualization, and what does a field need for Tableau to map it?",
    ],
    papers: [],
    nextUp: ["tableau-calcs", "tableau-dashboards"],
    cheatsheet: [
      "Compare categories -> BAR",
      "Change over time -> LINE",
      "Places -> MAP",
      "Two numbers' relationship -> SCATTER",
      "Avoid pies with 3+ slices",
      "Stuck? Press 'Show Me'",
    ],
  },

  "tableau-calcs": {
    story:
      "Your data has 'Sales' and 'Cost' columns, but nobody handed you a 'Profit' column — and profit is the number your boss actually cares about. Do you go back to Excel and add a column? No. In Tableau you create a calculated field: you type Sales minus Cost, name it 'Profit,' and now it behaves like any other field you can drag onto a chart. Calculated fields are how you make Tableau compute the answers your raw data only hints at.",
    problem:
      "Real datasets rarely contain the exact number you want. You want profit, but you have sales and cost. You want a profit margin percentage, a 'High/Low' label, or sales in dollars instead of cents. Rather than editing the source file, you teach Tableau to calculate it on the fly.",
    analogy:
      "It's like a recipe card you pin to your fridge: 'Profit = Sales − Cost.' Once it's written, you never re-do the maths — you just say 'give me Profit' and Tableau follows the recipe every time.",
    explanation: [
      "A calculated field is a new field you build from existing ones using a formula. Once made, it lives in the data pane and drags onto shelves like any real column.",
      "Row-level calculations run on every single row — like Profit = Sales − Cost, computed per order before anything is summed.",
      "Aggregate calculations work on grouped totals — like SUM(Profit) / SUM(Sales) for an overall profit margin. Mixing the two carelessly is the #1 beginner trap.",
      "Logical calculations use IF/THEN to create categories — e.g. label each order 'High' or 'Low' value. Great for colour-coding and filtering.",
      "String and date functions clean and reshape text and dates — pull the year out of a date, or stitch first and last names together.",
      "Calculations update live: change your filter or add data, and every calculated field recomputes automatically. Build the recipe once, trust it forever.",
    ],
    math:
      "Profit margin is an aggregate calculation: SUM(Profit) divided by SUM(Sales), shown as a percentage. Compute it on the totals, not row-by-row, or the average will mislead you.",
    code: {
      language: "text",
      source: `Four everyday calculated fields:

// 1. Row-level: profit on each order
Profit = [Sales] - [Cost]

// 2. Aggregate: overall profit margin (as a %)
Profit Margin = SUM([Profit]) / SUM([Sales])

// 3. Logical: label each order
Order Size = IF [Sales] > 500 THEN "High" ELSE "Low" END

// 4. Date: pull the year out for grouping
Order Year = YEAR([Order Date])`,
      explanation:
        "Square brackets refer to existing fields. Row-level formulas run per row; wrap fields in SUM() when you want a total-level result.",
    },
    exercise: {
      prompt:
        "Write a calculated field called 'Discounted Price' that takes 10% off the Sales value. (Hint: keep 90% of it.)",
      starter: `// TODO: define Discounted Price as 90% of Sales
Discounted Price = ____`,
      solution: `Discounted Price = [Sales] * 0.9

// Multiplying by 0.9 keeps 90% of the price, i.e. a 10% discount.`,
    },
    quiz: [
      {
        question: "What is a calculated field?",
        options: [
          "A field you delete from your data",
          "A new field built from a formula on existing fields",
          "A chart type",
          "A colour setting on the Marks card",
        ],
        answerIndex: 1,
        explanation:
          "It's a new field defined by a formula (like Sales − Cost) that then behaves like any other draggable field.",
      },
      {
        question: "Why is 'Profit Margin' written as SUM(Profit)/SUM(Sales) rather than Profit/Sales per row?",
        options: [
          "Because Tableau can't divide row by row",
          "Because a true overall margin must divide total profit by total sales, not average per-row ratios",
          "Because SUM is faster to type",
          "There is no difference between the two",
        ],
        answerIndex: 1,
        explanation:
          "Averaging per-row ratios gives a misleading number. The real margin divides the grand total of profit by the grand total of sales.",
      },
    ],
    flashcards: [
      { front: "Calculated field", back: "A new field defined by a formula on existing fields." },
      { front: "Row-level calc", back: "A calculation that runs on every single row (e.g. Sales − Cost)." },
      { front: "Aggregate calc", back: "A calculation on grouped totals (e.g. SUM(Profit)/SUM(Sales))." },
      { front: "Logical (IF) calc", back: "An IF/THEN formula that creates categories or labels." },
    ],
    miniProject: {
      title: "From Sales to Insight",
      brief: "Turn a plain sales file into one that reveals profit and priorities.",
      steps: [
        "Create Profit = Sales − Cost.",
        "Create Profit Margin = SUM(Profit) / SUM(Sales) and format it as a percentage.",
        "Create an IF field labelling orders 'High' or 'Low' value.",
        "Build a bar chart of Profit by Region, coloured by your High/Low label.",
        "Note which region has strong sales but weak margin — that's a real insight.",
      ],
    },
    industryUse: [
      "Retailers like Target build profit-margin calculations to find products that sell well but earn little",
      "Airlines create IF-based labels to flag delayed vs on-time flights for their dashboards",
      "SaaS companies calculate churn rate as a field to track cancelled vs active subscriptions",
    ],
    commonMistakes: [
      "Mixing row-level and aggregate logic — writing Profit/Sales per row and calling it 'margin' gives a wrong average. Use SUM(...)/SUM(...).",
      "Hard-coding a value (like a tax rate) inside many charts instead of one calculated field — when it changes, you fix it everywhere. Make one field and reuse it.",
    ],
    interviewQuestions: [
      "What's the difference between a row-level and an aggregate calculation in Tableau? Give an example of each.",
      "How would you build a profit-margin percentage, and why can't you just average per-row ratios?",
    ],
    papers: [],
    nextUp: ["tableau-dashboards", "tableau-story"],
    cheatsheet: [
      "Calculated field = a formula that becomes a new field",
      "[Field] refers to an existing column",
      "Row-level runs per row; wrap in SUM() for totals",
      "IF ... THEN ... ELSE ... END for labels",
      "Margins: SUM(Profit)/SUM(Sales), not row-by-row",
      "Build once, reuse everywhere",
    ],
  },

  "tableau-dashboards": {
    story:
      "You've built five great charts — but they're scattered across five separate sheets, and your boss doesn't want to click through a slideshow. A dashboard is one screen that holds them all together, so a manager sees the bar chart, the trend line, and the map at a glance. Even better: click 'West' on the map, and every other chart instantly filters to the West. Suddenly your static charts become a living control panel that anyone can explore without asking you a thing.",
    problem:
      "One chart answers one question. But real decisions need several views side by side, and they need to talk to each other — click a region and everything updates. Sending someone twelve separate charts is overwhelming; a single interactive dashboard is a story they can navigate themselves.",
    analogy:
      "A dashboard is like a car's dashboard: speed, fuel, and temperature all in one glance, updating together as you drive. You don't check three separate gauges in three separate rooms.",
    explanation: [
      "A dashboard is a single canvas where you drop in the worksheets you've already built, arranging them like tiles.",
      "Actions make it interactive: a 'filter action' means clicking one chart filters the others, and a 'highlight action' dims everything except what you clicked.",
      "Filters and parameters give viewers controls — a dropdown to pick a year, a slider for price range — so they answer their own follow-up questions.",
      "Layout matters: put the big-picture number (a KPI) top-left where eyes land first, then supporting charts around it. Give it breathing room, don't cram.",
      "Tooltips (the little pop-up when you hover) can hold extra detail, keeping the main view clean while still being rich underneath.",
      "Design for your audience and device: an executive wants three clear numbers, not thirty tiny charts, and a phone screen needs a simpler layout than a wall monitor.",
    ],
    code: {
      language: "text",
      source: `Assembling a dashboard:

1. New Dashboard  ->  a blank canvas appears
2. Drag worksheets in like tiles:
      [ KPI: Total Sales ]   [ Map: Sales by State ]
      [ Bar: Top Products ]  [ Line: Monthly Trend ]
3. Add interactivity:
      Dashboard > Actions > Add Filter Action
      "When I CLICK the Map, filter all other sheets"
4. Add a Year dropdown filter for the whole dashboard
5. Result: click Texas -> every chart shows only Texas`,
      explanation:
        "You reuse existing worksheets as tiles, then wire them together with actions so one click updates the whole screen.",
    },
    quiz: [
      {
        question: "What is a Tableau dashboard?",
        options: [
          "A single chart with extra colours",
          "One canvas that combines several worksheets, often interactively",
          "A backup copy of your data",
          "A type of calculated field",
        ],
        answerIndex: 1,
        explanation:
          "A dashboard gathers multiple worksheets onto one screen, usually wired together so they interact.",
      },
      {
        question: "What does a 'filter action' do?",
        options: [
          "Deletes data you don't want",
          "Lets clicking one chart filter all the other charts on the dashboard",
          "Changes the colour of a single bar",
          "Exports the dashboard to PDF",
        ],
        answerIndex: 1,
        explanation:
          "A filter action makes the dashboard interactive: click a region and every other view narrows to it.",
      },
      {
        question: "Where should the most important number usually go on a dashboard?",
        options: [
          "Bottom-right, hidden away",
          "Top-left, where eyes land first",
          "It doesn't matter at all",
          "Only inside a tooltip",
        ],
        answerIndex: 1,
        explanation:
          "Readers scan top-left first, so lead with your headline KPI and arrange supporting charts around it.",
      },
    ],
    flashcards: [
      { front: "Dashboard", back: "One canvas combining several worksheets into a single interactive view." },
      { front: "Filter action", back: "Clicking one chart filters the others on the dashboard." },
      { front: "KPI", back: "A key performance indicator — a headline number like Total Sales." },
      { front: "Tooltip", back: "The pop-up detail shown when you hover over a mark." },
    ],
    miniProject: {
      title: "Your First Interactive Dashboard",
      brief: "Combine your earlier charts into one screen a manager could actually use.",
      steps: [
        "Create a new dashboard and drag in your bar, line, and map sheets.",
        "Add a big KPI showing Total Sales in the top-left.",
        "Add a filter action so clicking the map filters the other charts.",
        "Add a Year dropdown that controls the whole dashboard.",
        "Test it: click a state and confirm every chart updates.",
      ],
    },
    industryUse: [
      "Uber operations teams watch live dashboards of trips, wait times, and driver supply by city",
      "Hospitals run bed-occupancy dashboards so staff see capacity across wards on one screen",
      "Marketing teams at brands like Nike track campaign spend, clicks, and sales in a single interactive view",
    ],
    commonMistakes: [
      "Cramming twenty charts onto one screen — viewers freeze. Show the few views that answer the key question and cut the rest.",
      "Forgetting to add actions, so the dashboard is just a static poster. Wire up at least one filter action to make it explorable.",
    ],
    interviewQuestions: [
      "How would you make one chart on a dashboard filter the others?",
      "What design principles guide where you place charts and KPIs on a dashboard?",
    ],
    papers: [],
    nextUp: ["tableau-story", "tableau-calcs"],
    cheatsheet: [
      "Dashboard = many worksheets on one canvas",
      "Filter action = click one chart, filter the rest",
      "Lead with the KPI, top-left",
      "Filters & parameters = viewer controls",
      "Tooltips hold detail without clutter",
      "Design for the audience and the screen size",
    ],
  },

  "tableau-story": {
    story:
      "Numbers alone rarely change minds — a story does. You've got a year of sales data, and buried in it is a message: 'The West region is quietly losing money, and here's why.' Your job in this project is to guide a viewer from the big picture down to that punchline, one screen at a time, so by the end they nod and say 'we need to act on the West.' You'll build a data storytelling dashboard: not just charts, but charts arranged to make a point.",
    problem:
      "A dashboard shows everything at once, which is great for exploring but poor for persuading. When you need to lead someone to a conclusion — a boss, a client, an investor — you need sequence: first the context, then the tension, then the reveal. That's a data story.",
    analogy:
      "A dashboard is a buffet — grab whatever you like. A data story is a plated three-course meal, served in order, each dish setting up the next.",
    explanation: [
      "Tableau's Story feature is a sequence of 'story points' — each one a captioned snapshot of a dashboard or worksheet, shown in order like slides.",
      "Start with the big picture (total sales this year), then narrow to the tension (one region is dropping), then reveal the cause (its profit margin is negative despite decent sales).",
      "Give every story point a clear caption written as a takeaway, not a label — 'West margins turned negative in Q3,' not 'Chart 4.'",
      "Use annotations and colour to point at exactly what matters, so the viewer's eye goes where you intend, not wandering the whole chart.",
      "End with a 'so what' — a recommendation or question that prompts action. A story with no conclusion is just a slideshow.",
      "Keep it tight: 4–6 story points beat 15. Every extra slide is a chance for your audience to lose the thread.",
    ],
    code: {
      language: "text",
      source: `Storyboard for "The West Region Problem":

Point 1  "Sales hit a record $2.4M this year"
         -> KPI + overall trend line   (set the scene)

Point 2  "But one region is sliding"
         -> map, West highlighted red   (introduce tension)

Point 3  "West sells fine — yet loses money"
         -> bar of Sales vs Profit by region   (the reveal)

Point 4  "Fix: renegotiate West shipping costs"
         -> annotated margin chart + recommendation

Captions are takeaways, not labels. 4 points, one clear message.`,
      explanation:
        "Each story point is a captioned snapshot arranged to move the viewer from context to tension to reveal to action.",
    },
    quiz: [
      {
        question: "How does a data story differ from a plain dashboard?",
        options: [
          "A story has no charts",
          "A story arranges views in a sequence to lead the viewer to a conclusion",
          "A story can only use pie charts",
          "There is no difference",
        ],
        answerIndex: 1,
        explanation:
          "Dashboards show everything for exploring; a story sequences views to persuade and lead to a point.",
      },
      {
        question: "What makes a good story-point caption?",
        options: [
          "A generic label like 'Chart 3'",
          "A clear takeaway like 'West margins turned negative in Q3'",
          "The file name",
          "Nothing — captions should be blank",
        ],
        answerIndex: 1,
        explanation:
          "Captions should state the insight so the audience gets the message even at a glance.",
      },
    ],
    flashcards: [
      { front: "Data story", back: "A sequence of views arranged to lead a viewer to a conclusion." },
      { front: "Story point", back: "One captioned snapshot in a Tableau story, shown like a slide." },
      { front: "Annotation", back: "A note or callout on a chart that points the eye at what matters." },
      { front: "The 'so what'", back: "The recommendation or action a story ends on." },
    ],
    miniProject: {
      title: "Project: A Data Storytelling Dashboard",
      brief: "Turn a year of sales data into a 4–6 point story that lands one clear insight.",
      steps: [
        "Explore the data and find one real, surprising insight (e.g. a region that sells well but loses money).",
        "Build the supporting charts: a KPI, a trend, a map, and a Sales-vs-Profit comparison.",
        "Assemble them into a dashboard, then create a Story with 4–6 points in a deliberate order.",
        "Write each caption as a takeaway and add annotations to spotlight the key mark.",
        "End with a recommendation, then present it to a friend and see if they reach your conclusion.",
      ],
    },
    industryUse: [
      "Consultancies like McKinsey build Tableau stories to walk clients from data to a clear recommendation",
      "Non-profits use data stories to show donors the impact of their giving, step by step",
      "Product teams at companies like Airbnb present quarterly reviews as Tableau stories to leadership",
    ],
    commonMistakes: [
      "Dumping every chart in with no order — the audience gets lost. Sequence: context, tension, reveal, action.",
      "Ending with data but no conclusion. Always finish with a 'so what' — a recommendation or a question that prompts a decision.",
    ],
    interviewQuestions: [
      "Walk me through how you'd turn a dashboard into a persuasive data story.",
      "What makes a data visualization persuasive rather than just informative?",
    ],
    papers: [],
    nextUp: ["tableau-dashboards", "tableau-charts"],
    cheatsheet: [
      "Dashboard = explore · Story = persuade",
      "Story point = one captioned slide",
      "Order: context -> tension -> reveal -> action",
      "Captions = takeaways, not labels",
      "Annotate to guide the eye",
      "Always end on a 'so what'",
    ],
  },
};
