import type { LessonBody } from "@/types";

export const sql: Record<string, LessonBody> = {
  "sql-what": {
    story:
      "Think of the last time you used a spreadsheet — a grid of rows and columns where each row is one thing (a customer, a sale) and each column is one fact about it (name, price, date). Now imagine that spreadsheet is a hundred million rows long, several of them are linked together, and dozens of people need to read and change it at the same time without stepping on each other. A regular spreadsheet would melt. A database is the industrial-strength version built exactly for that job. And SQL is the simple language you type to ask it questions like 'show me every customer in Mumbai who spent over 5,000 rupees last month' — and get the answer in a blink.",
    problem:
      "Every business drowns in facts: orders, patients, flights, followers, payments. Storing them in files or spreadsheets falls apart fast — the file gets huge, two people overwrite each other, and answering a simple question means scrolling forever. You need one trustworthy place to keep data and a fast, precise way to ask it questions.",
    analogy:
      "A database is a very organized filing cabinet, and SQL is the polite request you hand the clerk: 'bring me the blue folders from 2023, sorted by date.' You never rummage through the drawers yourself.",
    explanation: [
      "A database stores data in tables. A table is just a grid: rows are records (one customer per row), columns are fields (one fact per column, like email or price).",
      "Every table has a primary key — a column that gives each row a unique ID (like customer_id), so you can point at exactly one row with zero confusion.",
      "SQL (Structured Query Language) is how you talk to the database: you write a short statement, the database does the heavy lifting, and it hands back a result.",
      "It's a 'relational' database because tables can relate to each other — a customers table and an orders table linked by customer_id — which is where the real power comes from (you'll join them later).",
      "Use a database (not a spreadsheet) when data is big, shared by many people, needs to be reliable, or you want to ask flexible questions fast. For a quick personal list of 20 items, a spreadsheet is totally fine.",
      "The same SQL you learn here works, almost unchanged, across PostgreSQL, MySQL, SQLite, SQL Server, and cloud warehouses like BigQuery — learn it once, use it everywhere.",
    ],
    code: {
      language: "sql",
      source: `-- A tiny 'customers' table. Think: a spreadsheet with 3 columns.
-- customer_id | name         | city
--     1       | Aisha Khan   | Mumbai
--     2       | Ravi Patel   | Delhi
--     3       | Mei Lin      | Mumbai

-- Your very first question to the database:
SELECT name, city
FROM customers;`,
      explanation:
        "This asks the database to show the name and city columns from the customers table. SELECT means 'show me'; FROM means 'from this table.'",
    },
    quiz: [
      {
        question: "In a database table, what is a single row?",
        options: [
          "One fact about everything",
          "One record — like one customer or one order",
          "The name of the table",
          "A backup copy",
        ],
        answerIndex: 1,
        explanation:
          "A row is one record (one customer). A column is one fact (like city) shared across all rows.",
      },
      {
        question: "What is a primary key?",
        options: [
          "The password to the database",
          "The first column alphabetically",
          "A column that gives each row a unique ID",
          "The biggest number in the table",
        ],
        answerIndex: 2,
        explanation:
          "A primary key (like customer_id) uniquely identifies each row, so no two rows are ever mixed up.",
      },
    ],
    flashcards: [
      { front: "Database", back: "An organized store of data built to be fast, reliable, and shared by many users." },
      { front: "Table", back: "A grid of data: rows are records, columns are fields." },
      { front: "SQL", back: "Structured Query Language — the language you use to ask a database questions." },
      { front: "Primary key", back: "A column whose value uniquely identifies each row (e.g. customer_id)." },
    ],
    miniProject: {
      title: "Design Your Own Coffee-Shop Database",
      brief: "On paper, sketch the tables a small coffee shop would need — no computer required.",
      steps: [
        "List the things the shop tracks: customers, drinks, orders.",
        "For each, draw a table with sensible columns (a drink has name, price, size).",
        "Circle the primary key in each table (drink_id, customer_id, order_id).",
        "Draw an arrow showing how orders connect to customers.",
      ],
    },
    industryUse: [
      "Instagram stores every post, like, and follow in databases queried billions of times a day",
      "Banks keep every account and transaction in databases so balances are always correct",
      "Hospitals store patient records in databases so any doctor can pull up a history instantly",
    ],
    commonMistakes: [
      "Confusing rows and columns — remember: a row is one whole record, a column is one fact repeated down the grid.",
      "Assuming SQL is a niche coding skill — it's the most requested data skill in the world, used by analysts, marketers, and product managers, not just engineers.",
    ],
    interviewQuestions: [
      "What is a relational database, and how is it different from a spreadsheet?",
      "What is a primary key and why does every table need one?",
    ],
    papers: [],
    nextUp: ["sql-select", "sql-where"],
    cheatsheet: [
      "Database = big, reliable, shared store of data",
      "Table = grid: rows are records, columns are fields",
      "Primary key = unique ID for each row",
      "SQL = the language you type to ask questions",
      "SELECT ... FROM table; = your first question",
    ],
  },

  "sql-select": {
    story:
      "You walk up to the database and say your first real sentence: 'Show me the names.' In SQL that's SELECT name FROM customers. That's it — you just read data. SELECT is the single most-used word in all of SQL, and it does exactly what it sounds like: it selects which columns you want to see and from which table. Everything else you'll ever learn — filtering, sorting, joining — is just extra words tacked onto this one simple sentence.",
    problem:
      "The data is sitting in the database, but you can't see it until you ask. You need a way to say 'pull out these specific columns from this specific table' — without dumping the entire thing on your screen when you only wanted two columns.",
    analogy:
      "SELECT is like ordering off a menu: you don't get the whole kitchen, you point at exactly the dishes (columns) you want, from exactly the restaurant (table) you're in.",
    explanation: [
      "SELECT lists the columns you want; FROM names the table. SELECT name, city FROM customers means 'give me the name and city columns from customers.'",
      "SELECT * means 'give me every column' — the * is a wildcard for 'all.' Handy for a quick peek, but pros usually name the columns they actually need.",
      "Every statement ends with a semicolon ; — that's how you tell the database 'I'm done, go run it.'",
      "You can rename a column in the output with AS: SELECT name AS customer_name. This makes results easier to read; it doesn't change the stored data.",
      "SQL keywords like SELECT and FROM aren't case-sensitive (select works too), but writing them in CAPS is the universal convention — it makes queries easy to scan.",
      "Use SELECT with specific columns when you know what you want; use SELECT * only for exploring a new table you've never seen.",
    ],
    code: {
      language: "sql",
      source: `-- See everything (quick peek at a new table)
SELECT * FROM customers;

-- Better: ask for just the columns you need
SELECT name, city
FROM customers;

-- Rename a column in the output for readability
SELECT name AS customer_name, city AS home_city
FROM customers;`,
      explanation:
        "The first query grabs all columns; the second grabs only two; the third relabels them in the result using AS (the stored data is untouched).",
    },
    exercise: {
      prompt: "From a 'products' table, select only the product_name and price columns.",
      starter: `-- TODO: select product_name and price from products
SELECT ...
FROM products;`,
      solution: `SELECT product_name, price
FROM products;`,
    },
    quiz: [
      {
        question: "What does SELECT * FROM orders; do?",
        options: [
          "Deletes all orders",
          "Returns every column and every row from the orders table",
          "Returns only the first column",
          "Multiplies the orders together",
        ],
        answerIndex: 1,
        explanation:
          "The * is a wildcard meaning 'all columns,' so you get the whole orders table back.",
      },
      {
        question: "What does AS do in SELECT price AS cost?",
        options: [
          "Renames the column to 'cost' in the result",
          "Changes the stored column name forever",
          "Adds up the prices",
          "Filters for cheap items",
        ],
        answerIndex: 0,
        explanation:
          "AS gives the column a temporary display name in the output. The underlying table is unchanged.",
      },
    ],
    flashcards: [
      { front: "SELECT", back: "Chooses which columns to return from a table." },
      { front: "FROM", back: "Names the table you're reading data out of." },
      { front: "SELECT *", back: "Returns all columns (the * is a wildcard for 'everything')." },
      { front: "AS", back: "Gives a column a temporary alias (display name) in the result." },
    ],
    industryUse: [
      "Spotify analysts run SELECT queries to pull song and artist data for playlist reports",
      "E-commerce teams like Flipkart SELECT product and price columns to build catalog exports",
      "Marketing teams SELECT customer emails and cities to plan regional campaigns",
    ],
    commonMistakes: [
      "Forgetting the semicolon at the end — many tools won't run the query until you add it.",
      "Overusing SELECT * in real reports — it pulls unneeded columns, is slower, and breaks if the table changes. Name the columns you want.",
    ],
    interviewQuestions: [
      "What's the difference between SELECT * and selecting specific columns, and why prefer the latter?",
      "What does the AS keyword do in a SELECT statement?",
    ],
    papers: [],
    nextUp: ["sql-where", "sql-sorting"],
    cheatsheet: [
      "SELECT col1, col2 FROM table;",
      "SELECT * = all columns (peek only)",
      "AS gives a column a nicer output name",
      "Keywords in CAPS by convention",
      "End every statement with ;",
    ],
  },

  "sql-where": {
    story:
      "SELECT name FROM customers gives you all 4 million names — useless when you only care about customers in Mumbai. So you add one magic word: WHERE. SELECT name FROM customers WHERE city = 'Mumbai' quietly throws away every row that doesn't match and hands you only the ones you asked for. WHERE is the filter, the bouncer at the door checking each row against your condition and only letting the matches through. Learn WHERE well and you can pinpoint any needle in any haystack.",
    problem:
      "Tables are huge, but you almost never want every row. You want the orders over 1,000 rupees, the users who signed up this year, the products that are out of stock. Without a way to filter, you'd drown in irrelevant rows every single time.",
    analogy:
      "WHERE is a bouncer at a club checking IDs: it looks at each row, asks 'do you meet the condition?', and only lets the ones that pass through to your result.",
    explanation: [
      "WHERE goes after FROM and states a condition each row must satisfy: WHERE price > 1000 keeps only rows where price is above 1000.",
      "Comparison operators: = (equals), <> or != (not equal), > , < , >= , <=. Text values go in single quotes: WHERE city = 'Delhi'. Numbers don't: WHERE price > 500.",
      "Combine conditions with AND (both must be true) and OR (either can be true): WHERE city = 'Delhi' AND price > 500.",
      "Handy extras: BETWEEN 10 AND 20 (a range), IN ('Delhi','Mumbai') (matches any in a list), and LIKE 'A%' (pattern match — here, names starting with A; % means 'any characters').",
      "Empty cells are special: they hold NULL (unknown/missing). To find them you must write WHERE email IS NULL, not = NULL, because nothing 'equals' unknown.",
      "Use WHERE whenever you want a subset. The database can use indexes to make filtered queries lightning fast even on giant tables.",
    ],
    code: {
      language: "sql",
      source: `-- Customers in Mumbai only
SELECT name, city
FROM customers
WHERE city = 'Mumbai';

-- Orders over 1000 rupees placed in Delhi
SELECT order_id, amount
FROM orders
WHERE amount > 1000
  AND city = 'Delhi';

-- Names starting with 'A', and customers with no email on file
SELECT name FROM customers WHERE name LIKE 'A%';
SELECT name FROM customers WHERE email IS NULL;`,
      explanation:
        "Each WHERE keeps only matching rows. Note text in single quotes, AND to require both conditions, LIKE 'A%' for pattern matching, and IS NULL for missing values.",
    },
    exercise: {
      prompt: "From an 'orders' table, find all orders where the amount is between 500 and 2000.",
      starter: `SELECT order_id, amount
FROM orders
-- TODO: keep only amounts from 500 to 2000
WHERE ...;`,
      solution: `SELECT order_id, amount
FROM orders
WHERE amount BETWEEN 500 AND 2000;`,
    },
    quiz: [
      {
        question: "How do you correctly compare a text value in WHERE?",
        options: [
          "WHERE city = Mumbai",
          "WHERE city = \"Mumbai\"",
          "WHERE city = 'Mumbai'",
          "WHERE city == Mumbai",
        ],
        answerIndex: 2,
        explanation:
          "Text goes in single quotes. Numbers don't need quotes, and standard SQL uses a single = for comparison.",
      },
      {
        question: "How do you find rows where the email column is missing (empty)?",
        options: [
          "WHERE email = NULL",
          "WHERE email IS NULL",
          "WHERE email = ''",
          "WHERE email = 0",
        ],
        answerIndex: 1,
        explanation:
          "Missing values are NULL, and nothing equals NULL, so you must use IS NULL to find them.",
      },
    ],
    flashcards: [
      { front: "WHERE", back: "Filters rows — keeps only those that meet a condition." },
      { front: "AND / OR", back: "Combine conditions: AND needs both true, OR needs either true." },
      { front: "LIKE 'A%'", back: "Pattern match: % means 'any characters,' so this matches text starting with A." },
      { front: "IS NULL", back: "Tests for missing/unknown values (you can't use = NULL)." },
    ],
    miniProject: {
      title: "Filter a Movie List",
      brief: "Imagine a movies table (title, year, rating, genre). Write filters to answer fun questions.",
      steps: [
        "Find all movies released after 2015.",
        "Find comedies with a rating above 8.",
        "Find movies whose title starts with 'The' using LIKE.",
        "Find movies with no rating recorded using IS NULL.",
      ],
    },
    industryUse: [
      "Amazon filters orders WHERE status = 'pending' to power the 'to be shipped' dashboard",
      "Banks filter transactions WHERE amount > 50000 to flag them for review",
      "Netflix filters viewing logs WHERE country = 'India' to build regional trending charts",
    ],
    commonMistakes: [
      "Using = NULL instead of IS NULL — it silently returns nothing. Always use IS NULL / IS NOT NULL.",
      "Mixing AND and OR without parentheses. WHERE a AND b OR c can surprise you — wrap groups in ( ) to be explicit.",
    ],
    interviewQuestions: [
      "How do you filter for rows where a column is NULL, and why can't you use = NULL?",
      "What's the difference between IN, BETWEEN, and LIKE in a WHERE clause?",
    ],
    papers: [],
    nextUp: ["sql-sorting", "sql-joins"],
    cheatsheet: [
      "WHERE condition = keep matching rows",
      "Text in 'single quotes', numbers bare",
      "AND (both) · OR (either) · use ( ) to group",
      "BETWEEN a AND b · IN (...) · LIKE 'A%'",
      "IS NULL / IS NOT NULL for missing values",
    ],
  },

  "sql-sorting": {
    story:
      "You've filtered down to your Mumbai customers — but they come back in a random jumble. You actually want the biggest spenders at the top. So you add ORDER BY total_spent DESC and instantly the list is ranked, high to low. And when the database has a million matching rows but you only want to eyeball the top 10, you add LIMIT 10. Together, ORDER BY and LIMIT turn a messy pile into a clean, ranked shortlist — exactly what every 'Top 10' report you've ever seen is built on.",
    problem:
      "Filtered results still arrive in no particular order, which is useless when the whole point is 'who spent the most?' or 'what are the newest signups?' And giant result sets are overwhelming when you only need the first handful.",
    analogy:
      "ORDER BY is sorting your laundry — whites here, colors there, in the order you choose. LIMIT is saying 'just hand me the top few, I don't need the whole basket.'",
    explanation: [
      "ORDER BY sorts the result by one or more columns. ORDER BY price gives ascending order (smallest first) by default.",
      "Add DESC for descending (largest/newest first): ORDER BY price DESC. Add ASC to be explicit about ascending, though it's the default.",
      "You can sort by several columns: ORDER BY city, price DESC sorts by city A–Z, and within each city, by price high to low. It's tie-breaking.",
      "LIMIT caps how many rows come back: LIMIT 10 returns just 10. Combine with ORDER BY to get a true 'Top 10.'",
      "OFFSET skips rows before taking your limit — LIMIT 10 OFFSET 10 gives rows 11–20. That's how websites build page 1, page 2, page 3 of results (pagination).",
      "Always pair LIMIT with ORDER BY when you want the 'top' of something — LIMIT alone gives an arbitrary handful, not the highest values.",
    ],
    code: {
      language: "sql",
      source: `-- Top 5 biggest orders, largest first
SELECT order_id, amount
FROM orders
ORDER BY amount DESC
LIMIT 5;

-- Sort by city A-Z, then by amount high-to-low within each city
SELECT city, amount
FROM orders
ORDER BY city ASC, amount DESC;

-- Page 2 of results (rows 11-20)
SELECT name
FROM customers
ORDER BY name
LIMIT 10 OFFSET 10;`,
      explanation:
        "ORDER BY ... DESC ranks high to low; LIMIT trims to the top few; OFFSET skips rows so you can page through results.",
    },
    exercise: {
      prompt: "From a 'products' table, show the 3 most expensive products, priciest first.",
      starter: `SELECT product_name, price
FROM products
-- TODO: sort by price high-to-low and keep only the top 3
;`,
      solution: `SELECT product_name, price
FROM products
ORDER BY price DESC
LIMIT 3;`,
    },
    quiz: [
      {
        question: "Which clause gives you the highest values first?",
        options: [
          "ORDER BY value ASC",
          "ORDER BY value DESC",
          "LIMIT value",
          "WHERE value DESC",
        ],
        answerIndex: 1,
        explanation:
          "DESC means descending — largest first. ASC (the default) is smallest first.",
      },
      {
        question: "Why should you pair LIMIT 10 with ORDER BY for a 'Top 10' list?",
        options: [
          "LIMIT sorts automatically",
          "Without ORDER BY, LIMIT returns an arbitrary 10 rows, not the highest",
          "ORDER BY is required by law",
          "It makes the query slower on purpose",
        ],
        answerIndex: 1,
        explanation:
          "LIMIT just caps the count. To get the actual top values you must sort first with ORDER BY.",
      },
    ],
    flashcards: [
      { front: "ORDER BY", back: "Sorts the result by one or more columns." },
      { front: "DESC / ASC", back: "Descending (largest first) / ascending (smallest first, the default)." },
      { front: "LIMIT", back: "Caps how many rows are returned (e.g. LIMIT 10)." },
      { front: "OFFSET", back: "Skips a number of rows before applying LIMIT — used for pagination." },
    ],
    industryUse: [
      "YouTube uses ORDER BY view_count DESC LIMIT 10 to build 'Trending' lists",
      "Online stores show 'Top Sellers' with ORDER BY units_sold DESC",
      "Any 'page 1, 2, 3' of search results uses LIMIT and OFFSET for pagination",
    ],
    commonMistakes: [
      "Using LIMIT without ORDER BY and expecting the 'best' rows — you get a random slice instead.",
      "Forgetting DESC and getting the smallest values when you wanted the largest (default sort is ascending).",
    ],
    interviewQuestions: [
      "How would you return the 3rd through 5th most expensive products?",
      "What's the difference between sorting ascending and descending, and how do you tie-break by a second column?",
    ],
    papers: [],
    nextUp: ["sql-joins", "sql-aggregates"],
    cheatsheet: [
      "ORDER BY col = sort (ASC default)",
      "ORDER BY col DESC = largest/newest first",
      "ORDER BY a, b DESC = sort, then tie-break",
      "LIMIT n = top n rows",
      "LIMIT n OFFSET m = pagination (skip m, take n)",
    ],
  },

  "sql-joins": {
    story:
      "Here's the big secret databases keep: they deliberately split data across tables. Customers live in one table (id, name, city). Orders live in another (order_id, customer_id, amount). The orders table doesn't repeat the customer's name — it just stores customer_id = 2 and trusts you to look up who that is. A JOIN is that lookup. It stitches the two tables back together on the matching id, so you can finally ask 'which CUSTOMER placed this order and how much did they spend?' JOINs are the moment SQL goes from cute to genuinely powerful — this is what separates a database from a spreadsheet.",
    problem:
      "Good databases avoid repeating themselves — storing a customer's name once, not on every one of their 500 orders. But that means the answer to real questions ('name + order amount') is scattered across two tables. You need a way to connect them back together on the fly.",
    analogy:
      "It's like matching name tags to coats at a coat check. The orders table has ticket numbers (customer_id); the customers table has the names. A JOIN matches ticket to person so every coat gets the right owner.",
    explanation: [
      "A JOIN combines rows from two tables based on a matching column — usually a key. orders.customer_id matches customers.customer_id.",
      "The syntax: FROM orders JOIN customers ON orders.customer_id = customers.customer_id. The ON says 'match rows where these two columns are equal.'",
      "INNER JOIN (the default JOIN) keeps only rows that have a match in BOTH tables — customers who placed at least one order, and orders that belong to a real customer.",
      "LEFT JOIN keeps every row from the left (first) table even if there's no match, filling the missing side with NULLs — perfect for 'all customers, including those who never ordered.'",
      "Give tables short nicknames (aliases) to save typing: FROM orders o JOIN customers c ON o.customer_id = c.customer_id, then write o.amount and c.name.",
      "Use INNER JOIN when you only want matched pairs; use LEFT JOIN when you want to keep everything on one side and see what's missing on the other.",
    ],
    code: {
      language: "sql",
      source: `-- Match each order to the customer who placed it
SELECT c.name, c.city, o.amount
FROM orders o
INNER JOIN customers c
  ON o.customer_id = c.customer_id;

-- ALL customers, even those with zero orders (amount comes back NULL)
SELECT c.name, o.amount
FROM customers c
LEFT JOIN orders o
  ON c.customer_id = o.customer_id;`,
      explanation:
        "INNER JOIN returns only customers who have orders; LEFT JOIN keeps every customer and shows NULL for anyone who never ordered. The o and c are table aliases.",
    },
    exercise: {
      prompt: "Join 'products' (product_id, product_name) to 'order_items' (order_id, product_id) to show each order_id with its product_name.",
      starter: `SELECT oi.order_id, p.product_name
FROM order_items oi
-- TODO: inner join products p on the matching product_id
;`,
      solution: `SELECT oi.order_id, p.product_name
FROM order_items oi
INNER JOIN products p
  ON oi.product_id = p.product_id;`,
    },
    quiz: [
      {
        question: "What does an INNER JOIN return?",
        options: [
          "Every row from both tables",
          "Only rows that have a match in both tables",
          "Only rows with no match",
          "The first table only",
        ],
        answerIndex: 1,
        explanation:
          "INNER JOIN keeps only the rows where the ON condition matches in both tables.",
      },
      {
        question: "You want ALL customers, including those who never placed an order. Which join?",
        options: [
          "INNER JOIN",
          "LEFT JOIN (customers on the left)",
          "No join needed",
          "A WHERE clause",
        ],
        answerIndex: 1,
        explanation:
          "LEFT JOIN keeps every row from the left table (customers) and fills NULL where there's no matching order.",
      },
    ],
    flashcards: [
      { front: "JOIN", back: "Combines rows from two tables based on a matching column." },
      { front: "ON", back: "States the matching condition for a join, e.g. ON a.id = b.id." },
      { front: "INNER JOIN", back: "Keeps only rows with a match in both tables." },
      { front: "LEFT JOIN", back: "Keeps all rows from the left table; unmatched right-side columns become NULL." },
    ],
    miniProject: {
      title: "Connect the Library",
      brief: "Imagine a books table and a loans table (who borrowed what). Practice joining them.",
      steps: [
        "Sketch books (book_id, title) and loans (loan_id, book_id, member_name).",
        "INNER JOIN them to list each loan with its book title.",
        "LEFT JOIN books to loans to find books that were never borrowed (loan_id is NULL).",
        "Write down, in plain English, what each join returned.",
      ],
    },
    industryUse: [
      "Uber joins trips to drivers and riders to build every ride receipt",
      "Shopify joins orders, customers, and products to power merchant sales reports",
      "Hospitals join patients to appointments and doctors to assemble a full visit history",
    ],
    commonMistakes: [
      "Forgetting the ON condition — some databases then return every row paired with every other row (a huge, wrong 'cross join').",
      "Using INNER JOIN when you needed LEFT JOIN, silently dropping customers with no orders and undercounting your totals.",
    ],
    interviewQuestions: [
      "Explain the difference between INNER JOIN and LEFT JOIN with an example.",
      "What happens if you join two tables but forget the ON condition?",
      "How would you find customers who have never placed an order?",
    ],
    papers: [],
    nextUp: ["sql-aggregates", "sql-subqueries"],
    cheatsheet: [
      "JOIN combines tables on a shared key",
      "FROM a JOIN b ON a.id = b.id",
      "INNER JOIN = matches in both tables",
      "LEFT JOIN = keep all of left, NULL if no match",
      "Alias tables: FROM orders o JOIN customers c",
    ],
  },

  "sql-aggregates": {
    story:
      "So far you've been pulling out individual rows. But bosses rarely ask for rows — they ask for numbers. 'How many orders did we get?' 'What's the total revenue?' 'What's the average order in each city?' That means squishing many rows down into one summary number. COUNT, SUM, and AVG do the squishing, and GROUP BY does it per category — one number for Mumbai, one for Delhi, one for each city. This is the exact machinery behind every dashboard, sales report, and 'this month vs last month' chart you've ever seen.",
    problem:
      "Individual rows don't answer business questions. Nobody wants to see all 90,000 orders — they want one number: total revenue, or the average per customer, or a count per region. You need to collapse thousands of rows into meaningful summaries.",
    analogy:
      "GROUP BY is sorting a pile of coins into cups by denomination, then counting each cup. You end up with one tidy total per group instead of a chaotic heap.",
    explanation: [
      "Aggregate functions turn many rows into one value: COUNT(*) counts rows, SUM(amount) adds them up, AVG(amount) averages, MIN/MAX find the smallest/largest.",
      "Without GROUP BY, an aggregate summarizes the whole table: SELECT SUM(amount) FROM orders gives one grand total.",
      "GROUP BY splits rows into buckets first, then aggregates each bucket: GROUP BY city gives one row per city with that city's total.",
      "The rule of thumb: every column in your SELECT must either be inside an aggregate (like SUM) or listed in the GROUP BY. Mixing a plain column in without grouping is a classic error.",
      "WHERE filters rows BEFORE grouping; HAVING filters the GROUPS after. 'Cities with total sales over 1 lakh' is a HAVING, because it filters on the aggregated total.",
      "Use GROUP BY whenever a question contains 'per,' 'each,' or 'by' — 'revenue per city,' 'orders per customer,' 'average by month.'",
    ],
    code: {
      language: "sql",
      source: `-- One grand total for the whole table
SELECT COUNT(*) AS num_orders, SUM(amount) AS revenue
FROM orders;

-- Revenue and order count PER city
SELECT city,
       COUNT(*)   AS num_orders,
       SUM(amount) AS revenue,
       AVG(amount) AS avg_order
FROM orders
GROUP BY city
ORDER BY revenue DESC;

-- Only cities whose total revenue tops 100000
SELECT city, SUM(amount) AS revenue
FROM orders
GROUP BY city
HAVING SUM(amount) > 100000;`,
      explanation:
        "COUNT/SUM/AVG collapse rows into numbers; GROUP BY city produces one summary row per city; HAVING filters those grouped results (WHERE can't, because the total doesn't exist until after grouping).",
    },
    exercise: {
      prompt: "From an 'orders' table with a customer_id column, count how many orders each customer placed.",
      starter: `SELECT customer_id, ...
FROM orders
-- TODO: group so you get one count per customer
;`,
      solution: `SELECT customer_id, COUNT(*) AS num_orders
FROM orders
GROUP BY customer_id;`,
    },
    quiz: [
      {
        question: "Which function adds up all the values in a numeric column?",
        options: ["COUNT()", "SUM()", "AVG()", "MAX()"],
        answerIndex: 1,
        explanation:
          "SUM() totals a numeric column. COUNT() counts rows, AVG() averages, MAX() finds the largest.",
      },
      {
        question: "You want only groups where the total is above 1000. Which clause?",
        options: [
          "WHERE SUM(amount) > 1000",
          "HAVING SUM(amount) > 1000",
          "LIMIT 1000",
          "ORDER BY amount",
        ],
        answerIndex: 1,
        explanation:
          "HAVING filters groups after aggregation. WHERE can't reference an aggregate because it runs before grouping.",
      },
    ],
    flashcards: [
      { front: "COUNT / SUM / AVG", back: "Aggregates: count rows, add them up, average them." },
      { front: "GROUP BY", back: "Splits rows into buckets and produces one summary row per bucket." },
      { front: "HAVING", back: "Filters grouped results (like WHERE, but for aggregates)." },
      { front: "WHERE vs HAVING", back: "WHERE filters rows before grouping; HAVING filters groups after." },
    ],
    miniProject: {
      title: "Sales-by-Category Summary",
      brief: "Given an orders table with category and amount, build a one-glance summary.",
      steps: [
        "Count total orders and total revenue for the whole table.",
        "GROUP BY category to get revenue per category.",
        "Sort categories by revenue, highest first.",
        "Use HAVING to keep only categories earning over 50,000.",
      ],
    },
    industryUse: [
      "Every company dashboard uses SUM and COUNT with GROUP BY to show daily revenue and orders",
      "Spotify uses COUNT with GROUP BY artist to build 'most-streamed artist' rankings",
      "Banks GROUP BY account to compute monthly average balances and spending",
    ],
    commonMistakes: [
      "Putting a non-aggregated column in SELECT without adding it to GROUP BY — the database errors out or gives nonsense.",
      "Using WHERE to filter on a SUM or COUNT — that must be HAVING, because the aggregate doesn't exist yet when WHERE runs.",
    ],
    interviewQuestions: [
      "What's the difference between WHERE and HAVING?",
      "Why must every non-aggregated column in SELECT appear in GROUP BY?",
      "How would you find the average order value per city and keep only cities above the overall average?",
    ],
    papers: [],
    nextUp: ["sql-subqueries", "sql-analysis-project"],
    cheatsheet: [
      "COUNT(*) · SUM(x) · AVG(x) · MIN/MAX",
      "GROUP BY col = one summary row per group",
      "SELECT cols must be aggregated or grouped",
      "WHERE filters rows; HAVING filters groups",
      "Think 'per / each / by' → GROUP BY",
    ],
  },

  "sql-subqueries": {
    story:
      "Some questions have a question hiding inside them. 'Show me customers who spent more than the AVERAGE customer' — well, you don't know the average yet, so you have to compute it first, then compare everyone to it. A subquery is exactly that: a query inside a query. The inner one figures out a number (the average), and the outer one uses that number to filter. And when your query grows into a tangled mess of nested subqueries, a CTE (a WITH block) lets you name each step and stack them like a clean recipe — this is how professionals keep big queries readable.",
    problem:
      "Real questions often depend on a value you have to calculate on the spot — an average, a maximum, a list of qualifying IDs. You can't hard-code it because it changes as the data changes. And once queries get complex, one giant nested statement becomes impossible to read or debug.",
    analogy:
      "A subquery is a sticky note you scribble a number on before answering the main question — 'average = 4,200' — then you use that note to judge everyone else. A CTE is writing your recipe in clearly labeled steps instead of one impossible run-on sentence.",
    explanation: [
      "A subquery is a SELECT wrapped in parentheses, used inside another query. It runs first, produces a value or a list, and the outer query uses the result.",
      "Return one value and compare to it: WHERE amount > (SELECT AVG(amount) FROM orders) keeps orders above the average.",
      "Return a list and test membership with IN: WHERE customer_id IN (SELECT customer_id FROM orders WHERE amount > 5000) finds customers who ever placed a big order.",
      "A CTE (Common Table Expression) is a named subquery you define up front with WITH: WITH big_spenders AS (...), then SELECT from big_spenders like a normal table. Same power, far more readable.",
      "CTEs shine when you have several steps — filter, then group, then rank — because you can name and stack them in reading order instead of nesting inside-out.",
      "Reach for a subquery/CTE when a question references a computed value ('more than average,' 'the top category') or needs a multi-step pipeline. For simple one-table filters, plain WHERE is enough.",
    ],
    code: {
      language: "sql",
      source: `-- Customers who spent more than the average order amount
SELECT name, amount
FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders);

-- Same idea, written cleanly with a CTE
WITH avg_order AS (
  SELECT AVG(amount) AS avg_amount FROM orders
)
SELECT o.name, o.amount
FROM orders o, avg_order a
WHERE o.amount > a.avg_amount;

-- Customers who ever placed an order over 5000
SELECT name
FROM customers
WHERE customer_id IN (
  SELECT customer_id FROM orders WHERE amount > 5000
);`,
      explanation:
        "The inner SELECT computes a value or a list first; the outer query uses it. The WITH version (a CTE) names the intermediate step so the whole thing reads top to bottom.",
    },
    exercise: {
      prompt: "Find products whose price is above the average product price. Use a subquery.",
      starter: `SELECT product_name, price
FROM products
-- TODO: keep products priced above the average price
WHERE price > (...);`,
      solution: `SELECT product_name, price
FROM products
WHERE price > (SELECT AVG(price) FROM products);`,
    },
    quiz: [
      {
        question: "What is a subquery?",
        options: [
          "A query that runs on a backup database",
          "A SELECT nested inside another query, whose result the outer query uses",
          "A query with no WHERE clause",
          "A faster version of JOIN",
        ],
        answerIndex: 1,
        explanation:
          "A subquery is a query inside a query — the inner one produces a value or list the outer one uses.",
      },
      {
        question: "What is the main benefit of a CTE (a WITH block)?",
        options: [
          "It runs 10x faster always",
          "It lets you name intermediate steps so complex queries stay readable",
          "It replaces the need for tables",
          "It encrypts your data",
        ],
        answerIndex: 1,
        explanation:
          "A CTE names a step and lets you build queries top-to-bottom, making complex logic far easier to read and debug.",
      },
    ],
    flashcards: [
      { front: "Subquery", back: "A SELECT nested inside another query; runs first, feeds its result to the outer query." },
      { front: "Scalar subquery", back: "A subquery that returns a single value, e.g. (SELECT AVG(amount) FROM orders)." },
      { front: "IN (subquery)", back: "Tests whether a value appears in the list the subquery returns." },
      { front: "CTE (WITH)", back: "A named subquery defined up front for readability: WITH name AS (...)." },
    ],
    miniProject: {
      title: "Above-Average Detective",
      brief: "Using an orders table, find and rank the customers who outspend the crowd.",
      steps: [
        "Write a subquery for the overall average order amount.",
        "Filter orders above that average.",
        "Rewrite the same query using a WITH CTE and compare readability.",
        "Add a second CTE step that ranks the above-average customers by total spend.",
      ],
    },
    industryUse: [
      "Marketing teams use subqueries to target 'customers who spent above average' for VIP offers",
      "Data analysts use CTEs to build multi-step pipelines (clean, then group, then rank) in warehouses like BigQuery and Snowflake",
      "Finance teams use subqueries to flag transactions larger than a customer's typical amount",
    ],
    commonMistakes: [
      "Using = with a subquery that returns many rows — use IN for lists; = only works for a single value.",
      "Nesting five subqueries into one unreadable blob — refactor into named CTEs so each step is clear and debuggable.",
    ],
    interviewQuestions: [
      "What's the difference between a subquery and a CTE, and when would you prefer each?",
      "How do you find rows above the average of a column in one query?",
      "When must you use IN instead of = with a subquery?",
    ],
    papers: [],
    nextUp: ["sql-analysis-project"],
    cheatsheet: [
      "Subquery = query inside a query, runs first",
      "> (SELECT AVG(x) FROM t) = compare to a computed value",
      "IN (SELECT ...) = test membership in a list",
      "WITH name AS (...) = a CTE (named, readable step)",
      "Complex query? Break it into stacked CTEs",
    ],
  },

  "sql-analysis-project": {
    story:
      "Time to be the analyst. Picture a small online store's database landing on your desk with three tables — customers, orders, and products — and your manager asking the questions every business asks: Who are our best customers? Which products actually make money? Which cities should we ship to faster? Every single answer is a query you can now write, because you've got the whole toolkit: SELECT to read, WHERE to filter, JOIN to connect the tables, GROUP BY to summarize, and subqueries to compare against averages. This project is where all of it clicks into one real skill.",
    problem:
      "Knowing individual SQL commands is like knowing individual words — the real skill is stringing them into a sentence that answers a live business question. Employers don't test you on SELECT in isolation; they hand you tables and a question and watch you combine everything to get the answer.",
    analogy:
      "You've learned the individual dance steps; this is the actual dance. The music (a business question) plays, and you chain SELECT, JOIN, and GROUP BY into one smooth move that lands on the answer.",
    explanation: [
      "You'll work with three linked tables: customers (customer_id, name, city), orders (order_id, customer_id, order_date, amount), and products via order_items — the classic shape of nearly every real database.",
      "Start simple to explore: SELECT * with a LIMIT to see what each table actually holds before writing anything clever.",
      "Answer 'top customers' by JOINing orders to customers, then GROUP BY the customer and SUM their amount, then ORDER BY that total DESC with a LIMIT.",
      "Answer 'revenue by city' by grouping the joined data on city — one SUM per city, sorted high to low.",
      "Answer 'above-average orders' with a subquery comparing each order's amount to (SELECT AVG(amount) FROM orders).",
      "The professional workflow: read the question in plain English, decide which tables hold the answer, join them, filter, group, sort — then sanity-check the numbers make sense.",
    ],
    code: {
      language: "sql",
      source: `-- 1. Peek at the data first
SELECT * FROM orders LIMIT 5;

-- 2. Top 5 customers by total spend
SELECT c.name, SUM(o.amount) AS total_spent
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.name
ORDER BY total_spent DESC
LIMIT 5;

-- 3. Revenue by city, biggest markets first
SELECT c.city, SUM(o.amount) AS revenue
FROM orders o
JOIN customers c ON o.customer_id = c.customer_id
GROUP BY c.city
ORDER BY revenue DESC;

-- 4. Orders bigger than the average order
SELECT order_id, amount
FROM orders
WHERE amount > (SELECT AVG(amount) FROM orders)
ORDER BY amount DESC;`,
      explanation:
        "Four real business answers, each combining the tools you learned: join the tables, group to summarize, order to rank, and a subquery to compare against the average.",
    },
    exercise: {
      prompt: "Write a query that finds the total revenue per PRODUCT. Join orders to order_items (order_id, product_id, quantity, price) and group by product_id.",
      starter: `SELECT oi.product_id, ...
FROM order_items oi
-- TODO: sum quantity * price per product, highest first
;`,
      solution: `SELECT oi.product_id,
       SUM(oi.quantity * oi.price) AS revenue
FROM order_items oi
GROUP BY oi.product_id
ORDER BY revenue DESC;`,
    },
    quiz: [
      {
        question: "To find each customer's total spend, which combination do you need?",
        options: [
          "WHERE and LIMIT",
          "JOIN customers to orders, then GROUP BY customer with SUM(amount)",
          "SELECT * only",
          "ORDER BY alone",
        ],
        answerIndex: 1,
        explanation:
          "You join the two tables to connect names to orders, then group per customer and SUM their amounts.",
      },
      {
        question: "What's the smart FIRST step when a new database lands on your desk?",
        options: [
          "Immediately write a 5-table join",
          "Peek at each table with SELECT * ... LIMIT to see its shape",
          "Delete the columns you don't need",
          "Sort everything randomly",
        ],
        answerIndex: 1,
        explanation:
          "Always explore first — a quick SELECT with LIMIT shows the columns and sample values so you know what you're working with.",
      },
    ],
    flashcards: [
      { front: "Analysis workflow", back: "Read question → pick tables → join → filter → group → sort → sanity-check." },
      { front: "Top-N query", back: "JOIN + GROUP BY + SUM + ORDER BY total DESC + LIMIT n." },
      { front: "Revenue by group", back: "GROUP BY the category (city/product) and SUM the amount." },
      { front: "Sanity check", back: "Always ask 'does this number make sense?' before reporting it." },
    ],
    miniProject: {
      title: "Full Sales-Database Analysis",
      brief: "Answer five real business questions from the customers/orders/products database and write up the findings.",
      steps: [
        "Explore all three tables with SELECT * ... LIMIT 5 to learn their columns.",
        "Find the top 5 customers by total spend (join + group + order + limit).",
        "Compute revenue by city and identify your strongest market.",
        "List orders above the average amount using a subquery.",
        "Write 3 plain-English sentences summarizing what the store should do next.",
      ],
    },
    industryUse: [
      "Junior data analysts at companies like Zomato run exactly these queries to build weekly sales reports",
      "Product managers query customer and order tables to decide which features and regions to invest in",
      "Finance teams combine joins and aggregates to produce monthly revenue-by-segment dashboards",
    ],
    commonMistakes: [
      "Reporting a total without checking it — a wrong join can double-count rows and inflate revenue. Always sanity-check against a simple COUNT or a small sample.",
      "Jumping straight to a complex query without exploring the tables first, then joining on the wrong column and getting silent garbage.",
    ],
    interviewQuestions: [
      "Walk me through how you'd find the top 5 customers by revenue from a customers and orders table.",
      "Given orders and products tables, how would you compute revenue per product?",
      "How do you sanity-check that a join didn't accidentally duplicate rows?",
    ],
    papers: [],
    nextUp: ["sql-joins", "sql-aggregates", "sql-subqueries"],
    cheatsheet: [
      "Explore first: SELECT * FROM t LIMIT 5",
      "Top-N: JOIN + GROUP BY + SUM + ORDER BY DESC + LIMIT",
      "Revenue by X: GROUP BY X, SUM(amount)",
      "Above average: WHERE amount > (SELECT AVG(amount) ...)",
      "Always sanity-check totals before reporting",
    ],
  },
};
