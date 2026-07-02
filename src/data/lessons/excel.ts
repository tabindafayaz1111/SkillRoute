import type { LessonBody } from "@/types";

export const excel: Record<string, LessonBody> = {
  "excel-cells": {
    story:
      "You open Excel and stare at a giant grid of empty little boxes and think, \"Great, what am I supposed to do with this?\" Here's the whole secret: that grid is just very fancy graph paper. Each little box is a cell, and it can hold a word, a number, or a date. The clever part is that a cell can also hold a formula — a tiny instruction like \"add these two boxes together\" — and it will do the maths for you, instantly, forever. Change a number, and every total that depends on it updates by itself. That's it. Once you see the grid as a live, self-updating calculator, Excel stops being scary.",
    problem:
      "Doing sums by hand or on a calculator is slow and full of mistakes — and the moment one number changes, you have to redo everything. You need a place where numbers live in named spots, where the computer remembers how they connect, and where fixing one figure fixes every total automatically.",
    analogy:
      "A spreadsheet is like a wall of labelled mailboxes: each box (cell) has an address like A1 or B7, and you can tell one box, \"your value is whatever's in these other boxes, added up.\"",
    explanation: [
      "The grid has columns labelled with letters (A, B, C...) going across, and rows labelled with numbers (1, 2, 3...) going down. Every cell has an address made of its column letter and row number, like C4 — that's column C, row 4.",
      "A cell can hold three kinds of things: text (\"Rent\"), a number (1200), or a formula. A formula ALWAYS starts with an equals sign, and that = is how Excel knows \"don't show this literally — calculate it.\"",
      "Type =2+2 in a cell and press Enter — the cell shows 4. But the real power is referencing other cells: =A1+A2 means \"add whatever is in A1 to whatever is in A2,\" so when those change, your answer changes too.",
      "You rarely retype formulas. You write one, then drag the little square at the cell's bottom-right corner down a column, and Excel copies the pattern — =A1*B1 becomes =A2*B2, =A3*B3, and so on. This is called filling, and it's how one formula does a thousand rows.",
      "Sometimes you want a reference to NOT shift when you drag. Putting a dollar sign locks it: $B$1 stays glued to B1 no matter where you copy it. This is an absolute reference, versus a normal (relative) one that moves.",
      "Use a spreadsheet whenever you have rows of similar things — expenses, sales, students, tasks — that you want to total, sort, or summarise. If it's just one paragraph of text, use a document instead; the grid is for structured, repeating data.",
    ],
    math:
      "A formula is just an expression Excel evaluates: =A1*B1 means \"the value stored in A1 times the value stored in B1.\" Relative references (A1) shift when copied; absolute references ($A$1) stay fixed.",
    code: {
      language: "text",
      source: `A1: Item        B1: Price   C1: Qty   D1: Total
A2: Coffee      B2: 3.50    C2: 4     D2: =B2*C2
A3: Muffin      B3: 2.00    C3: 6     D3: =B3*C3
A4:                                   D4: =D2+D3

# D2 shows 14.00, D3 shows 12.00, D4 (the grand total) shows 26.00
# Change B2 from 3.50 to 4.00 and D2 AND D4 update on their own.`,
      explanation:
        "Each Total cell multiplies that row's Price by its Qty, and D4 sums the totals. Nothing is hard-coded — edit any price or quantity and every dependent number recalculates instantly.",
    },
    exercise: {
      prompt:
        "You have Price in B2 and Quantity in C2. Write the formula that goes in D2 to calculate the line total, then a formula in D3 that adds 10% tax to that total.",
      starter: `D2: =   # TODO: price times quantity
D3: =   # TODO: D2 plus 10% of D2`,
      solution: `D2: =B2*C2
D3: =D2*1.1`,
    },
    quiz: [
      {
        question: "What must every formula in Excel begin with?",
        options: ["A number", "An equals sign (=)", "A capital letter", "A dollar sign"],
        answerIndex: 1,
        explanation:
          "The = sign tells Excel to calculate the cell instead of showing the text literally. No equals sign, no calculation.",
      },
      {
        question: "You copy the formula =A1*B1 from row 1 down to row 2. What does it become in row 2?",
        options: ["=A1*B1 (unchanged)", "=A2*B2", "=A1+B1", "An error"],
        answerIndex: 1,
        explanation:
          "Normal (relative) references shift as you copy them down, so row 2 automatically references A2 and B2. That's why one formula can fill a whole column.",
      },
      {
        question: "What does the $ do in a reference like $B$1?",
        options: [
          "Formats the cell as currency",
          "Locks the reference so it doesn't move when copied",
          "Marks it as a total",
          "Nothing — it's decoration",
        ],
        answerIndex: 1,
        explanation:
          "$ freezes the column and/or row so the reference stays glued to that exact cell (an absolute reference) even when you drag the formula elsewhere.",
      },
    ],
    flashcards: [
      { front: "Cell", back: "A single box in the grid with an address like A1; holds text, a number, or a formula." },
      { front: "Cell reference", back: "Using a cell's address (like B2) inside a formula so it pulls that cell's value." },
      { front: "Relative vs absolute reference", back: "A1 shifts when copied; $A$1 stays locked to that exact cell." },
      { front: "Fill (drag down)", back: "Copying a formula down a column so the pattern repeats across many rows." },
    ],
    miniProject: {
      title: "Your One-Week Spending Tracker",
      brief: "Build a tiny spreadsheet that totals a week of your own spending and updates itself.",
      steps: [
        "In column A list 7 things you bought this week; put each cost in column B next to it.",
        "In B9 write =SUM(B2:B8) to total the week — watch it appear.",
        "Add a 'Budget' number in D1 and in D2 write =D1-B9 to see what's left.",
        "Change any cost and confirm the total and 'left' figures update on their own.",
        "Bonus: format column B as currency so it shows your local money symbol.",
      ],
    },
    industryUse: [
      "Small businesses everywhere track invoices, stock, and payroll in Excel before they ever buy dedicated software",
      "Finance teams at banks build budget and forecast models where one grid feeds hundreds of dependent cells",
      "Retailers like local shops and even large chains use spreadsheets to reconcile daily till totals",
    ],
    commonMistakes: [
      "Forgetting the = sign and wondering why the cell shows the text 'A1+A2' instead of a number — always start a formula with =.",
      "Typing the same total by hand instead of referencing cells, so it goes stale the moment data changes; reference cells, never retype values.",
      "Dragging a formula and getting wrong answers because a reference should have been locked — use $ to freeze cells that must not move.",
    ],
    interviewQuestions: [
      "Explain the difference between a relative and an absolute cell reference, and give an example of when you'd need each.",
      "What's the advantage of using cell references in a formula instead of typing the numbers directly?",
      "How would you total a column of 500 numbers without adding them one by one?",
    ],
    papers: [],
    nextUp: ["excel-functions", "excel-lookup"],
    cheatsheet: [
      "Every formula starts with =",
      "Address = column letter + row number (e.g. C4)",
      "=B2*C2 references cells so totals auto-update",
      "Drag the corner to fill a formula down a column",
      "$A$1 locks a reference; A1 shifts when copied",
    ],
  },

  "excel-functions": {
    story:
      "Imagine adding up a column of 300 sales figures by typing =B2+B3+B4+... — you'd lose your mind and probably a decimal point somewhere. So Excel gives you pre-built helpers called functions: little named machines you feed some cells, and they hand back an answer. SUM adds a whole range in one breath. AVERAGE gives you the typical value. And IF is the real star — it lets a cell make a decision: \"IF this sale is over 1000, label it 'Big', otherwise 'Small'.\" Suddenly your spreadsheet isn't just doing arithmetic — it's applying rules, like a tiny assistant sorting things for you.",
    problem:
      "Real data comes in hundreds or thousands of rows, and you need to total it, average it, count it, and categorise it — fast, and without hand-writing giant formulas. You also need cells that react to what's in the data (flagging, labelling, warning) rather than just crunching fixed sums.",
    analogy:
      "Functions are kitchen appliances: SUM is the blender that combines everything, AVERAGE finds the 'usual' flavour, and IF is a sorting tray that drops each item into 'yes' or 'no' based on a rule you set.",
    explanation: [
      "A function has a name and parentheses holding its inputs: =SUM(B2:B300) adds every cell from B2 down to B300. That B2:B300 is a range — a colon means 'everything from here to there'.",
      "The everyday four: SUM (adds), AVERAGE (mean), MIN and MAX (smallest and largest), and COUNT (how many numbers are there). COUNTA counts non-empty cells including text.",
      "IF is a decision-maker. Its shape is =IF(test, value_if_true, value_if_false). Example: =IF(B2>1000, \"Big\", \"Small\") — Excel checks the test, and returns one of the two answers.",
      "You can make IF smarter with helpers: SUMIF adds only cells that meet a condition (=SUMIF(A2:A100, \"Coffee\", B2:B100) totals just the coffee sales), and COUNTIF counts how many match.",
      "Nesting means putting a function inside another. =IF(B2>1000, \"Big\", IF(B2>500, \"Medium\", \"Small\")) creates three tiers. Powerful, but if you're nesting five deep, there's usually a cleaner way.",
      "Use SUM/AVERAGE/COUNT the moment you have more than a few rows. Reach for IF whenever a cell's value should depend on a condition — labelling, flagging overdue dates, pass/fail marks. Don't use IF for looking things up in a table; that's what lookup functions are for (next lesson).",
    ],
    math:
      "A function maps inputs to one output: SUM(range) returns the arithmetic total of all numbers in that range. IF(condition, a, b) returns a when the condition is true and b when it's false.",
    code: {
      language: "text",
      source: `# Sales in B2:B6 = 1200, 450, 980, 2100, 300

=SUM(B2:B6)              -> 5030      (adds them all)
=AVERAGE(B2:B6)          -> 1006      (the typical sale)
=MAX(B2:B6)              -> 2100      (biggest sale)
=COUNT(B2:B6)            -> 5         (how many numbers)

# Label each sale in column C:
=IF(B2>1000, "Big", "Small")         -> "Big"   (1200 > 1000)

# Total only the "Coffee" sales, where A holds the product name:
=SUMIF(A2:A6, "Coffee", B2:B6)`,
      explanation:
        "SUM/AVERAGE/MAX/COUNT summarise a whole range at once. IF returns one of two answers based on a test, and SUMIF adds only the rows that match a condition.",
    },
    exercise: {
      prompt:
        "Sales are in B2. Write an IF formula that returns \"Bonus\" when a sale is 2000 or more, and \"No bonus\" otherwise. Then write a formula that averages B2:B50.",
      starter: `C2: =IF(   )        # TODO: 2000 or more -> "Bonus", else "No bonus"
C3: =                # TODO: average of B2:B50`,
      solution: `C2: =IF(B2>=2000, "Bonus", "No bonus")
C3: =AVERAGE(B2:B50)`,
    },
    quiz: [
      {
        question: "What does =SUM(B2:B10) do?",
        options: [
          "Adds only B2 and B10",
          "Adds every cell from B2 through B10",
          "Counts how many cells have numbers",
          "Finds the biggest value",
        ],
        answerIndex: 1,
        explanation:
          "The colon in B2:B10 means 'the whole range from B2 to B10', and SUM totals all of it.",
      },
      {
        question: "In =IF(A2>50, \"Pass\", \"Fail\"), what shows if A2 contains 40?",
        options: ["\"Pass\"", "\"Fail\"", "50", "An error"],
        answerIndex: 1,
        explanation:
          "The test A2>50 is false when A2 is 40, so IF returns the third part — the value_if_false — which is \"Fail\".",
      },
      {
        question: "Which function totals ONLY the rows that match a condition, like all 'Tea' sales?",
        options: ["SUM", "SUMIF", "COUNT", "AVERAGE"],
        answerIndex: 1,
        explanation:
          "SUMIF adds values only where a condition is met, e.g. =SUMIF(A2:A100, \"Tea\", B2:B100).",
      },
    ],
    flashcards: [
      { front: "Function", back: "A named, built-in operation like SUM or IF that takes inputs in parentheses and returns a result." },
      { front: "Range", back: "A block of cells written with a colon, like B2:B300, meaning everything from B2 to B300." },
      { front: "IF", back: "=IF(test, value_if_true, value_if_false) — returns one of two values based on a condition." },
      { front: "SUMIF / COUNTIF", back: "Add up (or count) only the cells that meet a given condition." },
    ],
    miniProject: {
      title: "Grade Book with Auto Pass/Fail",
      brief: "Turn a list of test scores into an instant report card that grades itself.",
      steps: [
        "In column A list 10 student names, in column B their scores out of 100.",
        "In C2 write =IF(B2>=40, \"Pass\", \"Fail\") and fill it down the column.",
        "At the bottom add =AVERAGE(B2:B11) and =MAX(B2:B11) to see the class average and top score.",
        "Use =COUNTIF(C2:C11, \"Pass\") to count how many passed.",
        "Change a score to flip a Pass to a Fail and watch every summary update.",
      ],
    },
    industryUse: [
      "Accountants use SUM and SUMIF to total expenses by category for tax and reporting",
      "HR teams use IF and COUNTIF to flag employees due for reviews or over leave limits",
      "Sales managers at companies like distributors use AVERAGE and MAX to spot top performers each month",
    ],
    commonMistakes: [
      "Selecting the wrong range in SUM (missing the last row or including a header) — always double-check the range covers exactly the data.",
      "Getting IF's true/false order backwards; remember it's =IF(test, whatToShowIfTrue, whatToShowIfFalse).",
      "Forgetting quotes around text results, so =IF(B2>10, Big, Small) errors — text answers must be in \"quotes\".",
    ],
    interviewQuestions: [
      "Walk me through the syntax of the IF function and give a real example you'd use it for.",
      "What's the difference between SUM and SUMIF, and when would you choose each?",
      "How would you count how many entries in a column are above a certain value?",
    ],
    papers: [],
    nextUp: ["excel-lookup", "excel-pivot"],
    cheatsheet: [
      "=SUM(range) adds; =AVERAGE(range) means",
      "=MIN / =MAX for smallest / largest",
      "=COUNT counts numbers; COUNTA counts non-empty",
      "=IF(test, ifTrue, ifFalse) makes decisions",
      "SUMIF / COUNTIF work only on matching rows",
      "Text results need \"double quotes\"",
    ],
  },

  "excel-lookup": {
    story:
      "You have two sheets: one is a long list of order numbers, the other is a price list. A customer asks the price of item #4471, and you do NOT want to scroll through 5,000 rows squinting for it. VLOOKUP (and its newer, friendlier cousin XLOOKUP) is your search dog: you say \"go find 4471 in that price list and bring me back its price,\" and it fetches it in a blink. It's how you stitch two tables together — matching an ID here to the details over there — which is honestly 80% of real office spreadsheet work.",
    problem:
      "Data almost never lives in one neat table. Prices are in one place, orders in another, employee names in a third. You constantly need to match a value in your sheet to a row in another table and pull back a related piece of info — by hand this is error-prone misery, especially across thousands of rows.",
    analogy:
      "It's like looking up a word in a dictionary: you find the entry (the match) and read across to its definition (the value you want to bring back).",
    explanation: [
      "VLOOKUP means 'Vertical Lookup'. Its shape is =VLOOKUP(what_to_find, where_to_look, which_column, FALSE). The FALSE is crucial — it means 'exact match only', which is what you want 95% of the time.",
      "Example: =VLOOKUP(A2, Prices!A:C, 3, FALSE) — take the ID in A2, hunt for it in the Prices table's first column, and return whatever's in the 3rd column of that table (say, the price).",
      "VLOOKUP has two famous annoyances: the thing you search for must be in the LEFTMOST column of the lookup table, and you count columns by number (so inserting a column silently breaks it). Beginners trip on both.",
      "XLOOKUP is the modern replacement and it's lovely: =XLOOKUP(what_to_find, search_column, return_column). You point directly at the two columns — no counting, and the match can be to the left OR right. If your Excel has it, prefer it.",
      "Both return an error (#N/A) when there's no match. Wrap them to stay tidy: =IFERROR(XLOOKUP(...), \"Not found\") shows a friendly message instead of an ugly error.",
      "Use lookups whenever you're merging information from two tables by a shared key (ID, email, product code). Don't use them to summarise or total groups — that's a pivot table's job (next module).",
    ],
    math:
      "A lookup is a key-to-value mapping: given a key k, search a column for k and return the value in the paired cell of another column. Exact-match lookups return #N/A when no key equals k.",
    code: {
      language: "text",
      source: `# A price table on a sheet called "Prices":
#   Column A = ID, Column B = Name, Column C = Price

# Old way (VLOOKUP): find the ID in A2, return the 3rd column (Price)
=VLOOKUP(A2, Prices!A:C, 3, FALSE)

# New way (XLOOKUP): point straight at search column and return column
=XLOOKUP(A2, Prices!A:A, Prices!C:C)

# Friendly version that never shows an ugly #N/A:
=IFERROR(XLOOKUP(A2, Prices!A:A, Prices!C:C), "Not found")`,
      explanation:
        "VLOOKUP counts columns from the left of the table (fragile if columns move); XLOOKUP takes the search and return columns directly, so it's clearer and works in either direction. IFERROR swaps the #N/A error for a readable message.",
    },
    exercise: {
      prompt:
        "An employee ID is in A2. Their names live in a table: IDs in E2:E100, names in F2:F100. Write an XLOOKUP to fetch the name, and wrap it so a missing ID shows \"Unknown\".",
      starter: `B2: =        # TODO: XLOOKUP the name, "Unknown" if not found`,
      solution: `B2: =IFERROR(XLOOKUP(A2, E2:E100, F2:F100), "Unknown")`,
    },
    quiz: [
      {
        question: "In =VLOOKUP(A2, Prices!A:C, 3, FALSE), what does the 3 mean?",
        options: [
          "Search 3 rows",
          "Return the value from the 3rd column of the lookup table",
          "Round to 3 decimals",
          "Look up 3 different IDs",
        ],
        answerIndex: 1,
        explanation:
          "The number is the column index — which column of the table (counting from the left) holds the value you want back. Here, the 3rd column.",
      },
      {
        question: "What is the main advantage of XLOOKUP over VLOOKUP?",
        options: [
          "It's faster only on small files",
          "You point at the search and return columns directly, and it can look left or right",
          "It doesn't need an equals sign",
          "It only works with numbers",
        ],
        answerIndex: 1,
        explanation:
          "XLOOKUP takes the actual columns instead of a fragile column count, and the returned column can be on either side of the search column.",
      },
      {
        question: "Your lookup shows #N/A. What does that usually mean?",
        options: [
          "The formula is written wrong syntactically",
          "The value you searched for wasn't found in the lookup column",
          "The file is corrupted",
          "You need a newer version of Excel",
        ],
        answerIndex: 1,
        explanation:
          "#N/A means 'not available' — no match was found. Wrap the lookup in IFERROR to show a friendly message instead.",
      },
    ],
    flashcards: [
      { front: "VLOOKUP", back: "Vertical lookup: find a value in a table's leftmost column and return a value from a numbered column to its right." },
      { front: "XLOOKUP", back: "Modern lookup: give it the search column and return column directly; matches in either direction." },
      { front: "Exact match (FALSE)", back: "Tells VLOOKUP to return only a perfect match, not the closest one." },
      { front: "IFERROR", back: "Wraps a formula to replace errors like #N/A with a friendly value you choose." },
    ],
    miniProject: {
      title: "Instant Order Price Finder",
      brief: "Build a mini order sheet that auto-fills prices from a separate price list.",
      steps: [
        "On one sheet make a price list: product IDs in column A, prices in column B.",
        "On a second sheet, type any product ID in A2.",
        "In B2 write =XLOOKUP(A2, Prices!A:A, Prices!B:B) to pull its price automatically.",
        "Wrap it in IFERROR so a typo shows \"Check ID\" instead of #N/A.",
        "Change the ID in A2 and watch the price jump to match — you've linked two tables.",
      ],
    },
    industryUse: [
      "E-commerce teams match order IDs to product catalogs to build invoices automatically",
      "HR at large employers looks up salary or department by employee ID across systems",
      "Banks and insurers reconcile transactions by matching account numbers between two exported reports",
    ],
    commonMistakes: [
      "Forgetting the FALSE in VLOOKUP, so it does an 'approximate' match and returns wrong data silently — always add FALSE for exact matches.",
      "Putting the search value to the right of the return column in VLOOKUP (it can only look right) — switch to XLOOKUP or rearrange columns.",
      "Ignoring #N/A errors instead of handling them — wrap lookups in IFERROR so blanks and typos don't break your sheet.",
    ],
    interviewQuestions: [
      "Explain how VLOOKUP works and name two of its limitations.",
      "Why might you choose XLOOKUP over VLOOKUP in a new spreadsheet?",
      "You're getting #N/A errors across a column of lookups — how do you diagnose and handle them?",
    ],
    papers: [],
    nextUp: ["excel-pivot", "excel-charts"],
    cheatsheet: [
      "=VLOOKUP(find, table, colNumber, FALSE) — exact match",
      "Search value must be in the table's leftmost column",
      "=XLOOKUP(find, searchCol, returnCol) — clearer, looks either way",
      "#N/A means 'no match found'",
      "Wrap in =IFERROR(..., \"Not found\") for tidy output",
    ],
  },

  "excel-pivot": {
    story:
      "You're handed a spreadsheet with 10,000 rows of raw sales — every single transaction, one per line. Your boss asks, \"How much did each region sell, per month?\" Doing that by hand would take all afternoon. A pivot table answers it in about ten seconds of dragging. You literally drag 'Region' into rows, 'Month' into columns, and 'Sales' into the middle, and Excel instantly builds a neat summary grid with all the totals worked out. It feels like magic the first time — a giant messy list collapses into a clean report you can actually read.",
    problem:
      "Raw data is long and unreadable — thousands of individual rows tell you nothing at a glance. You need to group it, total it, and slice it ('sales by region', 'orders by month by product') without writing a single formula, and you need to re-slice it a different way the moment someone asks a new question.",
    analogy:
      "A pivot table is like sorting a huge pile of laundry into baskets: one basket per person, and you instantly see how many socks each family member has — without counting the whole heap one item at a time.",
    explanation: [
      "A pivot table summarises a long list into a compact grid. You never edit the raw data — you drag field names into four zones: Rows, Columns, Values, and Filters.",
      "Rows and Columns decide how the data is grouped (e.g. Region down the side, Month across the top). Values is what gets calculated in the middle — usually a SUM of sales, but it can be a count or average.",
      "The number of rows in your raw data doesn't matter — 100 or 1,000,000, the pivot handles it the same way and stays fast. That's why it's the go-to tool for big lists.",
      "Change your mind? Just drag fields out and drop new ones in. Want 'Salesperson by Product' instead of 'Region by Month'? Two drags. This re-slicing on the fly is the whole point.",
      "The Values zone lets you switch how it summarises: right-click and choose Sum, Count, Average, Max, or even '% of total'. Same data, totally different insight, one click.",
      "Use a pivot table any time someone asks a 'total by group' or 'how many per category' question on more than a few dozen rows. Don't use it for row-by-row calculations (that's ordinary formulas) or for one-off single answers.",
    ],
    math:
      "A pivot table performs a group-by aggregation: it splits rows into groups defined by your chosen fields, then applies a function (SUM, COUNT, AVERAGE) to a value field within each group.",
    code: {
      language: "text",
      source: `# Raw data (thousands of rows like this):
#   Region   | Month | Sales
#   North    | Jan   | 1200
#   South    | Jan   | 900
#   North    | Feb   | 1500
#   ...

# Drag into the pivot:
#   Rows    = Region
#   Columns = Month
#   Values  = Sum of Sales

# Result (built automatically):
#            Jan    Feb    Total
#   North    1200   1500   2700
#   South     900   1100   2000
#   Total    2100   2600   4700`,
      explanation:
        "You drag field names, not write formulas. Excel groups every raw row by Region and Month, sums the Sales in each cell, and adds the row/column totals for you.",
    },
    exercise: {
      prompt:
        "You have raw sales data with columns Salesperson, Product, and Amount. Describe which field goes in each pivot zone to see total Amount for each Salesperson, broken down by Product.",
      starter: `Rows    = ?   # TODO
Columns = ?   # TODO
Values  = ?   # TODO`,
      solution: `Rows    = Salesperson
Columns = Product
Values  = Sum of Amount`,
    },
    quiz: [
      {
        question: "What does a pivot table mainly do?",
        options: [
          "Rotates your text sideways",
          "Summarises a long list into grouped totals without formulas",
          "Deletes duplicate rows",
          "Draws charts automatically",
        ],
        answerIndex: 1,
        explanation:
          "A pivot table groups and aggregates raw rows into a compact summary — its core job is 'totals by category', drag-and-drop, no formulas needed.",
      },
      {
        question: "Which pivot zone determines what number is actually calculated in the middle?",
        options: ["Rows", "Columns", "Values", "Filters"],
        answerIndex: 2,
        explanation:
          "The Values zone holds the field being aggregated (Sum of Sales, Count of Orders, etc.). Rows and Columns just decide how it's grouped.",
      },
      {
        question: "You built 'Region by Month' but now need 'Product by Salesperson'. What do you do?",
        options: [
          "Delete the pivot and rebuild from scratch",
          "Drag the old fields out and drop the new ones in",
          "Rewrite all the underlying formulas",
          "It's not possible without new data",
        ],
        answerIndex: 1,
        explanation:
          "Re-slicing is instant — just drag fields between zones. That flexibility is the main reason pivot tables are so loved.",
      },
    ],
    flashcards: [
      { front: "Pivot table", back: "A drag-and-drop tool that summarises a long list into grouped totals with no formulas." },
      { front: "Values zone", back: "The pivot area that decides what's calculated (Sum, Count, Average) in the body of the table." },
      { front: "Rows / Columns zones", back: "Decide how data is grouped — one field down the side, one across the top." },
      { front: "Aggregation", back: "Combining many rows into one summary number, like summing all sales in a group." },
    ],
    miniProject: {
      title: "Sales-by-Region Summary in 10 Minutes",
      brief: "Take a messy transaction list and produce a clean regional summary using only drags.",
      steps: [
        "Get or type a table with columns Region, Month, and Sales (aim for 30+ rows).",
        "Select the data and insert a PivotTable onto a new sheet.",
        "Drag Region to Rows, Month to Columns, and Sales to Values.",
        "Right-click the Values and switch between Sum and Average to compare.",
        "Add Region as a Filter and try showing just one region at a time.",
      ],
    },
    industryUse: [
      "Retail chains summarise millions of till transactions into sales-by-store, sales-by-day reports",
      "Marketing teams at companies like Spotify pivot campaign data to see conversions by channel and region",
      "Finance departments pivot the general ledger to produce departmental spending summaries each month",
    ],
    commonMistakes: [
      "Building a pivot on data with blank header cells or gaps, which confuses Excel — make sure every column has a clean header and no empty rows.",
      "Editing numbers inside the pivot expecting the source to change — pivots are read-only summaries; fix the raw data, then refresh.",
      "Forgetting to right-click Refresh after the source data changes, so the pivot shows stale totals.",
    ],
    interviewQuestions: [
      "What is a pivot table and when would you reach for one instead of writing formulas?",
      "Explain the roles of the Rows, Columns, Values, and Filters areas.",
      "How would you change a pivot from showing totals to showing each group as a percentage of the whole?",
    ],
    papers: [],
    nextUp: ["excel-charts", "excel-dashboard"],
    cheatsheet: [
      "Pivot = summarise a long list, no formulas",
      "Zones: Rows, Columns, Values, Filters",
      "Values decides Sum vs Count vs Average",
      "Re-slice by dragging fields between zones",
      "Refresh after the source data changes",
    ],
  },

  "excel-charts": {
    story:
      "A wall of numbers makes eyes glaze over, but a single line sloping upward makes a boss lean in and say \"nice.\" That's the power of a chart: it turns rows of figures into a picture your brain reads in half a second. Excel makes this almost too easy — highlight your data, click a chart type, done. And conditional formatting is charts' quieter sibling: instead of a separate picture, it colours the cells themselves — red for low, green for high — so a whole table lights up like a heat map and problems jump out on their own.",
    problem:
      "Numbers alone hide the story. Is this month up or down? Which product is dragging? Which cells are dangerously low? Reading that from a raw grid is slow and easy to miss. You need the data to visually shout its message — through the right chart, or by colouring the cells themselves.",
    analogy:
      "A chart is a photo of your data: you 'see' the trend instantly instead of reading a thousand numbers. Conditional formatting is a highlighter that colours the important bits so they can't be missed.",
    explanation: [
      "Pick the chart that matches your question. Trend over time? Line chart. Comparing categories? Bar or column chart. Parts of a whole? Pie chart (but only for a few slices — pies get messy fast).",
      "Making one is simple: select your data including the labels, go to Insert, and click a chart type. Excel guesses axes and legend from your headers, and you tidy the title and colours after.",
      "A chart is 'live' — it's linked to the cells. Change a number and the bar grows or shrinks on its own. So charts on a dashboard update themselves as fresh data arrives.",
      "Conditional formatting colours cells based on rules. 'Highlight cells greater than 1000 in green', or a Color Scale that shades a whole range from red (low) to green (high) so it reads like a heat map at a glance.",
      "Data bars and icon sets are the fun ones: data bars draw a little in-cell bar (like a mini bar chart inside the cell), and icon sets add traffic-light dots — instant status without a separate chart.",
      "Use charts when you're presenting or spotting trends; use conditional formatting when you want the raw table itself to flag outliers, overdue dates, or low stock. Don't over-decorate — one clear chart beats five confusing ones.",
    ],
    math:
      "A chart maps data values to visual position or length: a bar's height is proportional to its value. A color scale maps each value onto a colour gradient between its minimum and maximum.",
    code: {
      language: "text",
      source: `# 1) Make a chart (menu steps, not a formula):
Select A1:B13  ->  Insert  ->  Line Chart
# A = months, B = sales -> you get a line that rises and falls with the data.

# 2) Conditional formatting rule (described):
Select B2:B100  ->  Home  ->  Conditional Formatting
  ->  Highlight Cells Rules  ->  Greater Than...  ->  1000  ->  Green Fill

# 3) Or a heat map across the whole range:
Select B2:B100  ->  Conditional Formatting  ->  Color Scales
  ->  Red-Yellow-Green   (low values red, high values green)`,
      explanation:
        "Charts and conditional formatting are menu actions, not typed formulas. Both stay linked to the cells, so they recolour or reshape automatically whenever the underlying numbers change.",
    },
    exercise: {
      prompt:
        "You have monthly sales in B2:B13. Name the best chart type to show the trend over the year, and describe a conditional formatting rule to highlight any month below 500 in red.",
      starter: `Best chart type: ?          # TODO
Conditional format rule: ?  # TODO`,
      solution: `Best chart type: Line chart (shows trend over time)
Conditional format rule: Highlight Cells Rules -> Less Than -> 500 -> Red Fill`,
    },
    quiz: [
      {
        question: "You want to show how sales change month by month over a year. Which chart is best?",
        options: ["Pie chart", "Line chart", "Scatter of one point", "No chart — use a table"],
        answerIndex: 1,
        explanation:
          "A line chart is built to show a trend over time; the rising and falling line makes the pattern obvious at a glance.",
      },
      {
        question: "What does conditional formatting do?",
        options: [
          "Creates a separate chart",
          "Colours cells automatically based on rules you set",
          "Deletes cells that meet a condition",
          "Locks cells from editing",
        ],
        answerIndex: 1,
        explanation:
          "Conditional formatting applies colours or icons to the cells themselves based on their values, turning a plain table into a visual one.",
      },
      {
        question: "Why is a pie chart usually a poor choice for comparing 12 products?",
        options: [
          "Pies can't use colour",
          "Too many thin slices are hard to compare",
          "Pies don't update with data",
          "Excel can't make pie charts",
        ],
        answerIndex: 1,
        explanation:
          "Pies work only for a few parts of a whole; with many similar slices the eye can't judge sizes — a bar chart compares categories far better.",
      },
    ],
    flashcards: [
      { front: "Line chart", back: "Best for showing a trend over time — a line that rises and falls with the values." },
      { front: "Bar / column chart", back: "Best for comparing values across categories, like sales per product." },
      { front: "Conditional formatting", back: "Auto-colouring cells based on rules (greater than, color scales, data bars, icons)." },
      { front: "Color scale", back: "A conditional format that shades a range like a heat map, low to high." },
    ],
    miniProject: {
      title: "A One-Screen Sales Snapshot",
      brief: "Turn a plain monthly table into a visual that tells its story instantly.",
      steps: [
        "List 12 months in column A and their sales in column B.",
        "Insert a line chart from A1:B13 and give it a clear title.",
        "Apply a Color Scale to B2:B13 so weak months glow red and strong ones green.",
        "Add a 'Greater Than 2000' rule to bold your best months.",
        "Change one month's number and watch both the line and the colours update.",
      ],
    },
    industryUse: [
      "Executives read business dashboards built from Excel charts to track KPIs at a glance",
      "Project managers use conditional formatting to flag overdue tasks red across a schedule",
      "Retailers use color-scale heat maps on inventory sheets so low-stock items jump out instantly",
    ],
    commonMistakes: [
      "Picking the wrong chart (a pie for a trend), which hides the story — match the chart type to the question.",
      "Overloading conditional formatting with too many clashing rules until the sheet is unreadable — keep it to a few meaningful colours.",
      "Forgetting to include the header/label row when selecting data, so the chart's axes and legend come out unlabelled.",
    ],
    interviewQuestions: [
      "How do you decide between a line, bar, and pie chart for a given dataset?",
      "What is conditional formatting and give a practical example of using it.",
      "Why should charts and conditional formats be linked to live cells rather than static values?",
    ],
    papers: [],
    nextUp: ["excel-dashboard", "excel-pivot"],
    cheatsheet: [
      "Trend over time -> Line chart",
      "Compare categories -> Bar/Column chart",
      "Few parts of a whole -> Pie (sparingly)",
      "Conditional formatting colours cells by rule",
      "Color Scales = instant heat map",
      "Include labels in your selection",
    ],
  },

  "excel-dashboard": {
    story:
      "Everything you've learned — cells, functions, lookups, pivots, and charts — comes together here into the thing employers actually ask for: a dashboard. Picture one clean screen that shows the whole business at a glance: total sales in a big bold number up top, a line chart of the trend, a pivot summarising sales by region, and a dropdown that lets your boss filter to just one month. No scrolling through raw data, no re-doing maths — they change one setting and the whole page updates. Building this is your proof that you can turn a pile of numbers into a decision-making tool. This is the portfolio piece.",
    problem:
      "Decision-makers don't want a 10,000-row spreadsheet — they want answers on one screen, interactive, always up to date. Your job as an analyst is to hide the messy data and surface a clear, self-updating summary anyone can read and explore in seconds.",
    analogy:
      "A dashboard is your car's dashboard: you don't watch the engine — you glance at a few dials (speed, fuel, temperature) that tell you everything you need to drive safely.",
    explanation: [
      "A good dashboard has three layers: the raw Data sheet (never shown to the boss), a Calculations layer (pivots, lookups, SUMIFs that crunch the data), and the Dashboard sheet (only the polished charts and headline numbers).",
      "Start with the questions it must answer: What's total revenue? What's the trend? Who's the top region/product? Design backward from those — each question becomes a number, a chart, or a pivot on the page.",
      "Headline KPIs go big and bold at the top — total sales, growth %, best seller — each one a single cell driven by a SUM or SUMIF so it's always current.",
      "Interactivity is the wow factor. Slicers (clickable buttons attached to a pivot) or a simple dropdown let the viewer filter the whole dashboard to a month, region, or product with one click.",
      "Keep it clean: consistent colours, clear titles, no gridline clutter, and everything linked to live data so refreshing the source refreshes the whole dashboard. A calm layout signals competence.",
      "Use a dashboard whenever a person needs to monitor or explore ongoing data — sales, budgets, project status. Don't cram in every possible chart; a great dashboard answers the top 5 questions brilliantly, not 50 questions poorly.",
    ],
    math:
      "Dashboard KPIs are aggregations of the raw data: Total = SUM(sales), a filtered KPI = SUMIF(region, \"North\", sales), and growth % = (this_period - last_period) / last_period.",
    code: {
      language: "text",
      source: `# The three-sheet structure of a clean dashboard:

Sheet 1  "Data"          -> raw transactions (Region, Month, Product, Sales)
Sheet 2  "Calcs"         -> pivot tables + helper formulas
Sheet 3  "Dashboard"     -> only KPIs + charts + a slicer

# Headline KPI cells on the Dashboard sheet:
Total Sales:   =SUM(Data!D2:D10000)
North Sales:   =SUMIF(Data!A2:A10000, "North", Data!D2:D10000)
Growth %:      =(ThisMonth - LastMonth) / LastMonth

# Then: insert a PivotChart, attach a Slicer, and clicking it
# filters every chart and number on the page at once.`,
      explanation:
        "Separate raw data, calculations, and presentation into three sheets. KPI cells are simple SUM/SUMIF formulas over the raw data, and a slicer wired to the pivots filters the whole dashboard interactively.",
    },
    exercise: {
      prompt:
        "On your Dashboard sheet you need two headline numbers: total sales across all data in Data!D2:D5000, and total sales for just \"South\" using the region column Data!A2:A5000. Write both formulas.",
      starter: `Total Sales: =        # TODO
South Sales: =        # TODO`,
      solution: `Total Sales: =SUM(Data!D2:D5000)
South Sales: =SUMIF(Data!A2:A5000, "South", Data!D2:D5000)`,
    },
    quiz: [
      {
        question: "Why separate a dashboard into Data, Calculations, and Dashboard sheets?",
        options: [
          "To make the file larger",
          "To keep raw data hidden and show only a clean, polished summary",
          "Because Excel requires three sheets",
          "To slow down calculations on purpose",
        ],
        answerIndex: 1,
        explanation:
          "Separating layers keeps the messy raw data out of sight, isolates the calculations, and leaves a clean presentation sheet — easier to read, update, and maintain.",
      },
      {
        question: "What does a slicer add to a dashboard?",
        options: [
          "It deletes filtered rows",
          "Clickable buttons that filter all connected charts and pivots at once",
          "A new chart type",
          "Automatic spell-check",
        ],
        answerIndex: 1,
        explanation:
          "A slicer is an interactive filter — clicking a button (like a region or month) instantly filters every pivot and chart it's connected to, making the dashboard explorable.",
      },
      {
        question: "Which formula would you use for a 'North region total' KPI cell?",
        options: [
          "=SUM(all sales)",
          "=SUMIF(region column, \"North\", sales column)",
          "=VLOOKUP(\"North\", ...)",
          "=COUNT(sales)",
        ],
        answerIndex: 1,
        explanation:
          "SUMIF totals only the rows where the region equals \"North\", which is exactly what a filtered KPI needs.",
      },
    ],
    flashcards: [
      { front: "Dashboard", back: "A single, clean screen of KPIs, charts, and filters that summarises data for decision-makers." },
      { front: "KPI", back: "Key Performance Indicator — a headline number (total sales, growth %) shown big and bold." },
      { front: "Slicer", back: "Clickable filter buttons that update every connected pivot and chart at once." },
      { front: "Three-layer design", back: "Keep raw Data, Calculations, and the Dashboard on separate sheets." },
    ],
    miniProject: {
      title: "Build a Sales Dashboard (Capstone)",
      brief: "Combine everything into one interactive dashboard a manager could actually use.",
      steps: [
        "Put raw sales (Region, Month, Product, Sales) on a 'Data' sheet.",
        "On a 'Calcs' sheet, build a pivot of Sales by Region and one by Month.",
        "On a 'Dashboard' sheet, add headline KPIs with SUM and SUMIF, plus a line chart of monthly sales.",
        "Insert a PivotChart and attach a Slicer for Region so the page filters on click.",
        "Polish: consistent colours, clear titles, no clutter — then change the data and watch it all refresh.",
      ],
    },
    industryUse: [
      "Sales managers live in Excel dashboards to monitor targets, pipeline, and top performers weekly",
      "Small businesses run their entire operations — cash flow, stock, orders — off one Excel dashboard before buying BI tools",
      "Analysts at companies of every size build Excel dashboards as the first draft before rebuilding them in Power BI or Tableau",
    ],
    commonMistakes: [
      "Cramming in every chart and number until it's overwhelming — answer the top few questions cleanly instead.",
      "Hard-coding KPI values instead of using SUM/SUMIF over the raw data, so the dashboard goes stale — always link to live data.",
      "Mixing raw data and presentation on one messy sheet — separate Data, Calcs, and Dashboard so it stays maintainable.",
    ],
    interviewQuestions: [
      "Walk me through how you'd design a sales dashboard from a raw transaction export.",
      "How do you make an Excel dashboard interactive, and why does that matter to stakeholders?",
      "When would you build a dashboard in Excel versus a dedicated tool like Power BI?",
    ],
    papers: [],
    nextUp: ["excel-pivot", "excel-charts"],
    cheatsheet: [
      "Three sheets: Data -> Calcs -> Dashboard",
      "KPIs big and bold, driven by SUM/SUMIF",
      "Charts + pivots do the heavy lifting",
      "Slicers make it interactive with one click",
      "Link everything to live data; keep it clean",
      "This is your portfolio piece — polish it",
    ],
  },
};
