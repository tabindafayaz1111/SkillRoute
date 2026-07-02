import type { LessonBody } from "@/types";

export const dataSciencePython: Record<string, LessonBody> = {
  "ds-numpy-arrays": {
    story:
      "Say you have the price of a coffee for all 365 days of last year and you want to add 5 rupees to every one of them. In plain Python you'd store them in a list and write a loop that walks through each day, one at a time — a bit like counting a jar of coins by hand. NumPy hands you a machine that adds 5 to all 365 numbers in a single line, all at once. That box of numbers NumPy gives you is called an array, and it is the foundation everything else in data science is built on.",
    problem:
      "Ordinary Python lists are flexible but slow when you have thousands or millions of numbers, and doing maths on them means writing loops every time. Analysts crunch huge tables of numbers all day — they need something that treats a whole column of numbers as one thing you can add, multiply, or average instantly.",
    analogy:
      "A Python list is a shopping bag where you can toss in anything — apples, a book, a phone. A NumPy array is an egg carton: every slot holds the same kind of thing (numbers), lined up neatly, so a machine can process the whole carton in one go.",
    explanation: [
      "A NumPy array is a grid of numbers that are all the same type, stored tightly together in memory — that tidy packing is why it is so fast.",
      "You create one with np.array([...]), turning a normal list into a supercharged one.",
      "Arrays have a shape: (5,) means 5 numbers in a row, (3, 4) means 3 rows and 4 columns — a mini spreadsheet.",
      "Use arrays whenever you have lots of numbers to do maths on: prices, temperatures, pixels, sensor readings.",
      "Do NOT reach for NumPy when you just have a handful of mixed things (a name, an age, a yes/no) — a plain list or dictionary is simpler there.",
      "Almost every other tool — Pandas, scikit-learn, image libraries — is really NumPy arrays wearing a costume, so learning arrays unlocks all of them.",
    ],
    math:
      "An array's shape is just its dimensions written as (rows, columns). A 1-D array of n numbers has shape (n,); a table with r rows and c columns has shape (r, c).",
    code: {
      language: "python",
      source: `import numpy as np

# a plain list vs a NumPy array
prices = [95, 110, 88, 120]        # ordinary Python list
arr = np.array(prices)             # supercharged NumPy array

print(arr)          # [ 95 110  88 120]
print(arr.shape)    # (4,)  -> four numbers in a row
print(arr.dtype)    # int64 -> they are whole numbers
print(arr.mean())   # 103.25 -> average, in one call`,
      explanation:
        "np.array turns the list into an array; .shape tells you its dimensions and .mean() averages every value without a single loop.",
    },
    exercise: {
      prompt:
        "You have five daily step counts. Put them in a NumPy array and print the shape.",
      starter: `import numpy as np

steps = [8200, 10450, 6100, 9700, 12030]
# TODO: make a NumPy array called arr from steps
arr = ...
print(arr.shape)`,
      solution: `import numpy as np

steps = [8200, 10450, 6100, 9700, 12030]
arr = np.array(steps)
print(arr.shape)   # (5,)`,
    },
    quiz: [
      {
        question: "What is the main reason to use a NumPy array instead of a plain Python list?",
        options: [
          "It can hold text, numbers, and images all mixed together",
          "It stores same-type numbers tightly so maths on many values is fast",
          "It automatically connects to the internet",
          "It makes your code longer and more explicit",
        ],
        answerIndex: 1,
        explanation:
          "Arrays keep same-type numbers packed together, which lets NumPy do maths on the whole array at once, very fast.",
      },
      {
        question: "An array prints its shape as (3, 4). What does that mean?",
        options: [
          "3 numbers total",
          "The numbers range from 3 to 4",
          "3 rows and 4 columns",
          "It has 34 items",
        ],
        answerIndex: 2,
        explanation: "Shape is (rows, columns), so (3, 4) is a grid of 3 rows by 4 columns.",
      },
    ],
    flashcards: [
      { front: "NumPy array", back: "A tightly-packed grid of same-type numbers you can do fast maths on all at once." },
      { front: ".shape", back: "The dimensions of an array, written as (rows, columns) or (n,) for a single row." },
      { front: ".dtype", back: "The type of data an array holds, e.g. int64 for whole numbers or float64 for decimals." },
      { front: "np.array([...])", back: "Turns a normal Python list into a NumPy array." },
    ],
    miniProject: {
      title: "Your Week in Numbers",
      brief: "Track one number about your day for a week and explore it as an array.",
      steps: [
        "Write down a number for each of 7 days (cups of water, minutes walked, whatever).",
        "Put them in a NumPy array with np.array.",
        "Print the array's shape, its mean, its max, and its min.",
        "Add 1 to every value in one line and print the new array.",
      ],
    },
    industryUse: [
      "Netflix stores millions of user ratings as arrays to power recommendations",
      "NASA and weather agencies process satellite sensor grids as NumPy arrays",
      "Banks run risk calculations across huge arrays of transaction amounts",
    ],
    commonMistakes: [
      "Mixing types in one array (numbers and text) — NumPy quietly converts everything to text and your maths breaks. Keep an array to one type.",
      "Forgetting to import NumPy as np, then wondering why np.array is undefined. Always start with import numpy as np.",
    ],
    interviewQuestions: [
      "What are the advantages of a NumPy array over a Python list?",
      "What does the shape of an array tell you, and how do you check it?",
    ],
    papers: [],
    nextUp: ["ds-numpy-ops", "ds-pandas-dataframe"],
    cheatsheet: [
      "import numpy as np",
      "arr = np.array([1, 2, 3])",
      "arr.shape  -> dimensions",
      "arr.mean(), arr.max(), arr.min()",
      "Same type + tightly packed = fast",
    ],
  },

  "ds-numpy-ops": {
    story:
      "Imagine a checkout worker who scans one grocery item, keys in the tax, bags it, then reaches for the next — repeating that whole dance for every single item. Now imagine a magic scanner that adds tax to the entire cart in one beep. That magic beep is a vectorized operation: with NumPy, when you write arr * 1.18 you're not looping through prices one by one — you're taxing the whole array in a single stroke. It is faster to run and far easier to read.",
    problem:
      "Doing maths on lots of numbers with a Python for-loop is slow and clutters your code with bookkeeping. Data scientists need to add, multiply, and compare thousands of numbers at once without writing loops every time.",
    analogy:
      "A loop is painting a fence one plank at a time with a tiny brush. A vectorized operation is a paint roller that coats the whole fence in one smooth pass.",
    explanation: [
      "A vectorized operation applies the same maths to every element of an array at once — no loop needed.",
      "arr + 10 adds 10 to every value; arr * arr2 multiplies two arrays element by element (position 1 with position 1, and so on).",
      "This 'apply to everything at once' behaviour is called broadcasting when the shapes differ, like adding a single number to a whole array.",
      "You can also filter: arr[arr > 100] instantly pulls out only the values above 100 — no if-statement loop required.",
      "Use vectorized ops for any bulk number-crunching; they are both faster and shorter than the loop version.",
      "The one time to avoid them is logic that must go step by step and depends on the previous result (like a running game score) — loops or special functions fit better there.",
    ],
    math:
      "Element-wise means result[i] = a[i] + b[i] for every position i, done in one command. Broadcasting stretches a smaller shape (like a single number) to match the bigger one so the maths lines up.",
    code: {
      language: "python",
      source: `import numpy as np

prices = np.array([95, 110, 88, 120])

with_tax = prices * 1.18          # add 18% tax to ALL prices at once
print(with_tax)                   # [112.1 129.8 103.84 141.6]

expensive = prices[prices > 100]  # keep only prices above 100
print(expensive)                  # [110 120]

print(prices.sum())               # 413  -> total, no loop`,
      explanation:
        "prices * 1.18 taxes every price in one line, prices[prices > 100] filters instantly, and .sum() totals the whole array.",
    },
    exercise: {
      prompt:
        "Temperatures are in Celsius. Convert the whole array to Fahrenheit using F = C * 9/5 + 32 — in one line, no loop.",
      starter: `import numpy as np

celsius = np.array([0, 20, 37, 100])
# TODO: convert every value to Fahrenheit in one line
fahrenheit = ...
print(fahrenheit)`,
      solution: `import numpy as np

celsius = np.array([0, 20, 37, 100])
fahrenheit = celsius * 9 / 5 + 32
print(fahrenheit)   # [ 32.  68.  98.6 212.]`,
    },
    quiz: [
      {
        question: "What does 'vectorized' mean in NumPy?",
        options: [
          "The code uses arrows and diagrams",
          "The same operation is applied to every element at once, without a loop",
          "The array is turned into a picture",
          "It only works on 3-D data",
        ],
        answerIndex: 1,
        explanation:
          "Vectorized operations apply maths to the whole array in one go, which is faster and shorter than looping.",
      },
      {
        question: "What does prices[prices > 100] return?",
        options: [
          "The number 100",
          "True or False for the whole array",
          "Only the prices greater than 100",
          "An error, because you can't compare an array",
        ],
        answerIndex: 2,
        explanation:
          "The condition builds a mask of True/False, and indexing with it keeps only the values where the condition is True.",
      },
    ],
    flashcards: [
      { front: "Vectorized operation", back: "Applying maths to every element of an array at once, with no loop." },
      { front: "Element-wise", back: "Combining two arrays position by position: result[i] from a[i] and b[i]." },
      { front: "Broadcasting", back: "NumPy stretching a smaller shape (like a single number) to match a larger array so maths lines up." },
      { front: "Boolean mask", back: "A True/False array from a condition, used to filter values like arr[arr > 100]." },
    ],
    miniProject: {
      title: "Grade Booster",
      brief: "Take a class's test scores and curve them, all with vectorized maths.",
      steps: [
        "Make an array of 8 test scores out of 100.",
        "Add 5 bonus points to every score in one line.",
        "Cap anything over 100 back down to 100 using np.minimum(scores, 100).",
        "Use a boolean mask to count how many students now pass (>= 40).",
      ],
    },
    industryUse: [
      "Spotify scales and normalizes audio features across millions of tracks with vectorized maths",
      "Trading firms apply price adjustments to entire portfolios of stocks at once",
      "Image apps like Instagram brighten every pixel of a photo using one array operation",
    ],
    commonMistakes: [
      "Writing a for-loop to do maths NumPy could do in one vectorized line — slower and harder to read. Try the whole-array version first.",
      "Combining arrays of mismatched shapes and getting a broadcasting error. Check .shape on both before combining.",
    ],
    interviewQuestions: [
      "What is broadcasting, and give an example where it saves you a loop?",
      "How would you select all elements of an array greater than a threshold without a loop?",
    ],
    papers: [],
    nextUp: ["ds-pandas-dataframe", "ds-numpy-arrays"],
    cheatsheet: [
      "arr + 10  -> add to all at once",
      "a * b     -> element-wise multiply",
      "arr[arr > 100]  -> filter by condition",
      "arr.sum(), arr.mean()  -> aggregate",
      "np.minimum(arr, 100)  -> cap values",
    ],
  },

  "ds-pandas-dataframe": {
    story:
      "Picture the spreadsheet you'd build to track a shop's sales: a row for each sale, columns for date, item, and price. A Pandas DataFrame is that exact spreadsheet, but living inside your code where you can ask it questions in plain commands instead of clicking around. You load a file with one line, peek at the top few rows, and instantly know what you're working with. It is Excel with a brain — and it happily handles a million rows without freezing your laptop.",
    problem:
      "Real data arrives as messy files — CSVs from a bank, exports from a website — and you need to load, look at, and slice that data quickly. Opening giant files in Excel is slow and clumsy, and you can't easily repeat your steps. Pandas gives you a spreadsheet you can drive with code.",
    analogy:
      "A DataFrame is a spreadsheet that answers questions. Instead of scrolling and squinting, you say 'show me the top 5 rows' or 'give me just the price column' and it hands them over instantly.",
    explanation: [
      "A DataFrame is a table with labelled rows and named columns — exactly like a sheet in Excel or Google Sheets.",
      "You usually create one by loading a file: pd.read_csv('sales.csv') reads a comma-separated file into a DataFrame in one line.",
      "df.head() shows the first 5 rows so you can eyeball the data; df.shape tells you how many rows and columns you have.",
      "df.info() lists each column, its type, and how many values are missing — your first health check on any dataset.",
      "Grab a single column with df['price'] (that single column is called a Series); grab several with df[['date', 'price']].",
      "Reach for Pandas any time your data looks like a table; for a single list of numbers, plain NumPy is lighter.",
    ],
    code: {
      language: "python",
      source: `import pandas as pd

# load a CSV file into a DataFrame
df = pd.read_csv("sales.csv")

print(df.head())      # first 5 rows
print(df.shape)       # (rows, columns), e.g. (1000, 3)
print(df.info())      # column names, types, missing counts

# grab a single column (a Series)
print(df["price"].mean())   # average price across all sales`,
      explanation:
        "read_csv loads the file, head/shape/info let you inspect it, and df['price'] pulls one column so you can average it.",
    },
    exercise: {
      prompt:
        "A DataFrame df has a column named 'age'. Print how many rows the DataFrame has, then the average age.",
      starter: `import pandas as pd

df = pd.read_csv("people.csv")
# TODO: print the number of rows, then the mean age
print(...)
print(...)`,
      solution: `import pandas as pd

df = pd.read_csv("people.csv")
print(df.shape[0])        # number of rows
print(df["age"].mean())   # average age`,
    },
    quiz: [
      {
        question: "What does pd.read_csv('data.csv') give you back?",
        options: [
          "A single number",
          "A DataFrame — a table of the file's rows and columns",
          "A picture of the data",
          "A plain Python list",
        ],
        answerIndex: 1,
        explanation: "read_csv loads the file into a DataFrame, Pandas' spreadsheet-like table.",
      },
      {
        question: "You want a quick look at the first few rows of df. Which do you use?",
        options: ["df.shape", "df.head()", "df.mean()", "df.columns"],
        answerIndex: 1,
        explanation: "df.head() shows the first 5 rows — the fastest way to eyeball your data.",
      },
    ],
    flashcards: [
      { front: "DataFrame", back: "A table of labelled rows and named columns — a spreadsheet you drive with code." },
      { front: "Series", back: "A single column of a DataFrame." },
      { front: "pd.read_csv()", back: "Loads a CSV file into a DataFrame in one line." },
      { front: "df.head()", back: "Shows the first 5 rows so you can quickly inspect the data." },
    ],
    miniProject: {
      title: "Meet a Dataset",
      brief: "Download any small CSV (city temperatures, movies, Pokemon) and get to know it.",
      steps: [
        "Load the CSV with pd.read_csv into a DataFrame called df.",
        "Print df.shape to see how big it is.",
        "Print df.head() and df.info() to understand the columns.",
        "Pick one number column and print its .mean() and .max().",
      ],
    },
    industryUse: [
      "Data analysts at Airbnb load booking CSVs into DataFrames to spot trends",
      "Hospitals load patient records into Pandas to summarize outcomes",
      "E-commerce teams at Amazon inspect sales exports as DataFrames before deeper analysis",
    ],
    commonMistakes: [
      "Forgetting import pandas as pd, then getting a name error on pd. Always import it first.",
      "Confusing df['price'] (one column, a Series) with df[['price']] (a one-column DataFrame). Double brackets keep it a table.",
    ],
    interviewQuestions: [
      "What is the difference between a DataFrame and a Series?",
      "How do you quickly check the size and structure of a new dataset in Pandas?",
    ],
    papers: [],
    nextUp: ["ds-pandas-clean", "ds-pandas-groupby"],
    cheatsheet: [
      "import pandas as pd",
      "df = pd.read_csv('file.csv')",
      "df.head(), df.shape, df.info()",
      "df['col']  -> one column (Series)",
      "df[['a','b']]  -> several columns",
    ],
  },

  "ds-pandas-clean": {
    story:
      "You get a customer list where some ages are blank, one person's name is 'JOHN' and another 'john', and a few rows are copied twice. Before you can trust any number you calculate from it, you have to tidy it up — just like you'd wipe a table before serving dinner on it. Cleaning data is the unglamorous but essential part of the job: real data is always messy, and Pandas gives you gentle tools to fill the gaps, fix the labels, and drop the duplicates so your results actually mean something.",
    problem:
      "Raw data almost always has holes (missing values), inconsistencies (Yes vs yes vs Y), and duplicates. If you analyze it as-is, your averages lie and your charts mislead. You need a reliable way to find and fix these problems before trusting the data.",
    analogy:
      "Cleaning data is like sorting laundry before washing: you pull out the odd sock (missing value), separate the whites from the colours (fix inconsistent labels), and toss the duplicates. Skip it and everything comes out grey.",
    explanation: [
      "First, find the mess: df.isnull().sum() counts missing values in each column — your damage report.",
      "Fill gaps with df['age'].fillna(df['age'].mean()) to replace blanks with the average, or drop rows with df.dropna() when a value is truly unknown and can't be guessed.",
      "Remove exact repeats with df.drop_duplicates() so one sale isn't counted twice.",
      "Standardize text with df['name'].str.lower().str.strip() to make 'JOHN ' and 'john' the same thing.",
      "Fix types when numbers arrive as text: pd.to_numeric(df['price']) turns '95' into a real number you can average.",
      "There's no single 'right' fix — filling vs dropping depends on how much data you'd lose and whether a guess is safe. Always look before you leap.",
    ],
    code: {
      language: "python",
      source: `import pandas as pd

df = pd.read_csv("customers.csv")

# 1. see where the holes are
print(df.isnull().sum())

# 2. fill missing ages with the average age
df["age"] = df["age"].fillna(df["age"].mean())

# 3. make names consistent, then drop repeated rows
df["name"] = df["name"].str.lower().str.strip()
df = df.drop_duplicates()

print(df.isnull().sum())   # should be all zeros now`,
      explanation:
        "isnull().sum() reveals missing values, fillna fills them, string methods standardize text, and drop_duplicates removes repeats.",
    },
    exercise: {
      prompt:
        "The 'income' column has some missing values. Fill them with the median income (df['income'].median()).",
      starter: `import pandas as pd

df = pd.read_csv("salaries.csv")
# TODO: fill missing income values with the median income
df["income"] = ...
print(df["income"].isnull().sum())   # should print 0`,
      solution: `import pandas as pd

df = pd.read_csv("salaries.csv")
df["income"] = df["income"].fillna(df["income"].median())
print(df["income"].isnull().sum())   # 0`,
    },
    quiz: [
      {
        question: "Which line tells you how many missing values are in each column?",
        options: [
          "df.head()",
          "df.isnull().sum()",
          "df.drop_duplicates()",
          "df.shape",
        ],
        answerIndex: 1,
        explanation: "isnull() marks each cell True if missing, and .sum() counts those per column.",
      },
      {
        question: "Why might you fill missing ages with the mean instead of dropping those rows?",
        options: [
          "The mean is always the correct age",
          "To avoid throwing away the other useful data in those rows",
          "Dropping rows is not allowed in Pandas",
          "It makes the file smaller",
        ],
        answerIndex: 1,
        explanation:
          "Dropping a row loses all its other columns too; filling keeps that data when a reasonable guess is acceptable.",
      },
    ],
    flashcards: [
      { front: "Missing value (NaN)", back: "An empty cell in the data; Pandas marks it as NaN (Not a Number)." },
      { front: "fillna()", back: "Replaces missing values with something, e.g. the mean or median." },
      { front: "dropna()", back: "Removes rows (or columns) that contain missing values." },
      { front: "drop_duplicates()", back: "Removes rows that are exact copies of another row." },
    ],
    miniProject: {
      title: "Rescue a Messy File",
      brief: "Take a deliberately messy CSV and turn it into clean, trustworthy data.",
      steps: [
        "Load the file and run df.isnull().sum() to spot the missing values.",
        "Fill or drop the gaps, choosing sensibly for each column.",
        "Lowercase and strip any text columns so labels match.",
        "Run drop_duplicates and confirm with df.shape that rows dropped.",
      ],
    },
    industryUse: [
      "Banks scrub transaction records of missing and duplicate entries before fraud analysis",
      "Marketing teams at Spotify de-duplicate and standardize user lists before campaigns",
      "Hospitals clean patient data so that averages and reports are accurate for care decisions",
    ],
    commonMistakes: [
      "Filling missing values without looking first — sometimes a blank means zero, sometimes 'unknown'; the right fix differs. Inspect before filling.",
      "Forgetting to reassign: df['age'].fillna(...) alone changes nothing; you must write df['age'] = df['age'].fillna(...).",
    ],
    interviewQuestions: [
      "How do you detect and handle missing values in a dataset?",
      "When would you drop rows with missing data versus fill them in?",
    ],
    papers: [],
    nextUp: ["ds-pandas-groupby", "ds-matplotlib"],
    cheatsheet: [
      "df.isnull().sum()  -> find missing",
      "df['c'].fillna(df['c'].mean())",
      "df.dropna()  -> drop empty rows",
      "df.drop_duplicates()",
      "df['c'].str.lower().str.strip()",
    ],
  },

  "ds-pandas-groupby": {
    story:
      "You've got a year of sales and your boss asks: 'Which city sells the most?' Reading a thousand rows one by one is hopeless. Instead you sort every sale into piles — one pile per city — and add up each pile. That sort-into-piles-then-summarize move is exactly what groupby does. In one line, Pandas splits your data into groups, crunches a number for each, and hands you a tidy little summary table. It is the single most useful trick for turning raw rows into an answer.",
    problem:
      "A big table of individual records rarely answers a question directly. You want summaries — total sales per city, average score per class, count of orders per customer. Doing this by hand or with loops is painful; you need a one-line way to split, calculate, and combine.",
    analogy:
      "groupby is like sorting a pile of receipts into labelled envelopes — one per store — and then writing the total on the front of each envelope.",
    explanation: [
      "The pattern is split-apply-combine: split rows into groups, apply a calculation to each group, combine the results into a summary.",
      "df.groupby('city')['sales'].sum() splits by city, sums the sales in each, and returns one total per city.",
      "Swap the calculation freely: .mean() for averages, .count() for how many, .max() for the biggest.",
      "Group by more than one column with df.groupby(['city', 'month']) to get, say, sales per city per month.",
      "Use .agg() when you want several summaries at once, like both the mean and the count in one table.",
      "Use groupby whenever a question contains the words 'per' or 'by each' — that's your signal to group.",
    ],
    math:
      "Split-apply-combine: partition rows so rows sharing a key land together, compute one summary number per group (sum, mean, count), then stack those summaries into a result table.",
    code: {
      language: "python",
      source: `import pandas as pd

df = pd.read_csv("sales.csv")

# total sales per city
by_city = df.groupby("city")["sales"].sum()
print(by_city)

# average sales per city, sorted highest first
avg = df.groupby("city")["sales"].mean().sort_values(ascending=False)
print(avg.head())

# several summaries at once
print(df.groupby("city")["sales"].agg(["sum", "mean", "count"]))`,
      explanation:
        "groupby('city') makes the piles, ['sales'].sum() totals each, and .agg([...]) computes several summaries in one shot.",
    },
    exercise: {
      prompt:
        "You have a DataFrame df with columns 'department' and 'salary'. Find the average salary per department.",
      starter: `import pandas as pd

df = pd.read_csv("employees.csv")
# TODO: average salary for each department
result = ...
print(result)`,
      solution: `import pandas as pd

df = pd.read_csv("employees.csv")
result = df.groupby("department")["salary"].mean()
print(result)`,
    },
    quiz: [
      {
        question: "What three steps does groupby perform, in order?",
        options: [
          "Sort, filter, delete",
          "Split into groups, apply a calculation, combine into a summary",
          "Load, clean, save",
          "Plot, label, show",
        ],
        answerIndex: 1,
        explanation: "groupby follows split-apply-combine: split rows, apply a calc per group, combine the results.",
      },
      {
        question: "df.groupby('city')['sales'].mean() gives you…",
        options: [
          "The total sales across all cities",
          "The average sales for each city",
          "A list of every sale",
          "The number of cities",
        ],
        answerIndex: 1,
        explanation: "It groups rows by city and computes the mean of sales within each city.",
      },
    ],
    flashcards: [
      { front: "groupby", back: "Splits rows into groups by a column so you can summarize each group." },
      { front: "Split-apply-combine", back: "The pattern behind groupby: split rows, apply a calculation, combine results." },
      { front: ".agg()", back: "Computes several summaries (sum, mean, count) for each group at once." },
      { front: "Aggregation", back: "Turning many rows into one summary number, like a total or average." },
    ],
    miniProject: {
      title: "Who Sells the Most?",
      brief: "Use a sales dataset to answer real business questions with groupby.",
      steps: [
        "Load a sales CSV that has a category or city column and an amount column.",
        "Find total sales per category with groupby and sum.",
        "Find the average order size per category with mean.",
        "Sort the totals to reveal your top and bottom performers.",
      ],
    },
    industryUse: [
      "Uber groups trips by city and hour to find surge-pricing patterns",
      "Retailers group sales by product category to plan inventory",
      "Streaming services group watch time by genre to guide content spending",
    ],
    commonMistakes: [
      "Forgetting to pick a column to summarize, e.g. df.groupby('city').sum() sums every numeric column instead of just the one you meant.",
      "Grouping by a column with tiny typos ('NYC' vs 'nyc') so one real group splits into several. Clean text first.",
    ],
    interviewQuestions: [
      "Explain the split-apply-combine idea behind groupby.",
      "How would you compute both the average and the count for each group in one call?",
    ],
    papers: [],
    nextUp: ["ds-matplotlib", "ds-eda-project"],
    cheatsheet: [
      "df.groupby('col')['val'].sum()",
      ".mean(), .count(), .max()",
      "groupby(['a','b'])  -> multi-key",
      ".agg(['sum','mean','count'])",
      "Question says 'per' -> use groupby",
    ],
  },

  "ds-matplotlib": {
    story:
      "You could stare at a column of 500 temperatures and never notice that summers are getting hotter. Draw them as a line, though, and the upward slope jumps out in half a second. That's the whole point of a chart: your eyes spot patterns that numbers hide. Matplotlib is Python's classic drawing tool for turning data into pictures, and Seaborn sits on top of it to make those pictures pretty with almost no effort. Together they turn a wall of numbers into a story anyone can see.",
    problem:
      "Rows and rows of numbers hide their patterns. A trend, an outlier, or a relationship between two things is nearly invisible in a table but obvious in a chart. You need an easy way to plot data so you — and your audience — can actually see what's going on.",
    analogy:
      "Numbers in a table are ingredients in the pantry; a chart is the finished dish on the plate. Same stuff, but now you can actually take it in at a glance.",
    explanation: [
      "Matplotlib is the base drawing library; you build a chart piece by piece — plot the data, add a title, label the axes, then show it.",
      "plt.plot() draws a line (great for trends over time), plt.bar() draws bars (great for comparing categories), plt.hist() shows a distribution (how values spread out), and plt.scatter() shows the relationship between two numbers.",
      "Always label your axes and add a title — an unlabelled chart is a riddle, not an answer.",
      "Seaborn wraps Matplotlib to make good-looking statistical charts in one line, e.g. sns.histplot(df['age']) or sns.scatterplot(...).",
      "Pick the chart to fit the question: trend over time = line, comparison = bar, spread = histogram, relationship = scatter.",
      "Don't over-decorate. A clear, honest chart beats a flashy, cluttered one every time.",
    ],
    code: {
      language: "python",
      source: `import matplotlib.pyplot as plt
import seaborn as sns
import pandas as pd

df = pd.read_csv("sales.csv")

# a line chart of sales over time
plt.plot(df["month"], df["sales"])
plt.title("Monthly Sales")
plt.xlabel("Month")
plt.ylabel("Sales")
plt.show()

# a Seaborn histogram of ages, in one line
sns.histplot(df["age"])
plt.show()`,
      explanation:
        "plt.plot draws the line and the title/label calls make it readable; sns.histplot builds a clean distribution chart with a single command.",
    },
    exercise: {
      prompt:
        "You have df with columns 'height' and 'weight'. Draw a scatter plot to see if taller people weigh more, with axis labels.",
      starter: `import matplotlib.pyplot as plt

# TODO: scatter plot of height (x) vs weight (y), labelled
plt.scatter(...)
plt.xlabel(...)
plt.ylabel(...)
plt.show()`,
      solution: `import matplotlib.pyplot as plt

plt.scatter(df["height"], df["weight"])
plt.xlabel("Height")
plt.ylabel("Weight")
plt.show()`,
    },
    quiz: [
      {
        question: "You want to show a trend over 12 months. Which chart fits best?",
        options: ["A pie chart", "A line chart", "A histogram", "A scatter plot"],
        answerIndex: 1,
        explanation: "A line chart is ideal for showing how a value changes over time.",
      },
      {
        question: "What is Seaborn's relationship to Matplotlib?",
        options: [
          "It replaces Matplotlib entirely and shares no code",
          "It sits on top of Matplotlib to make attractive charts with less code",
          "It only makes 3-D charts",
          "It is an older version of Matplotlib",
        ],
        answerIndex: 1,
        explanation: "Seaborn is built on Matplotlib and gives you good-looking statistical plots in one line.",
      },
    ],
    flashcards: [
      { front: "Matplotlib", back: "Python's core plotting library; you build charts piece by piece." },
      { front: "Seaborn", back: "A library on top of Matplotlib that makes attractive statistical charts with little code." },
      { front: "Histogram", back: "A chart showing how values spread out across ranges (the distribution)." },
      { front: "Scatter plot", back: "A chart of dots showing the relationship between two numeric columns." },
    ],
    miniProject: {
      title: "Chart the Story",
      brief: "Take any dataset and reveal one insight with the right chart.",
      steps: [
        "Load a CSV with at least one number column and one category or time column.",
        "Draw a bar chart comparing a value across categories.",
        "Draw a histogram of one numeric column to see its spread.",
        "Add a title and axis labels, then write one sentence on what you learned.",
      ],
    },
    industryUse: [
      "Analysts at Netflix chart viewing trends to decide which shows to renew",
      "Public health teams plot case counts over time to track outbreaks",
      "Finance teams at banks visualize portfolio performance for client reports",
    ],
    commonMistakes: [
      "Leaving off titles and axis labels, so nobody (including future you) knows what the chart shows. Always label.",
      "Using a pie chart for many categories, which is hard to read. A bar chart compares categories far more clearly.",
    ],
    interviewQuestions: [
      "Which chart type would you choose to show a trend over time, and why?",
      "What is the difference between Matplotlib and Seaborn?",
    ],
    papers: [],
    nextUp: ["ds-sklearn-intro", "ds-eda-project"],
    cheatsheet: [
      "import matplotlib.pyplot as plt",
      "plt.plot / plt.bar / plt.hist / plt.scatter",
      "plt.title / plt.xlabel / plt.ylabel",
      "plt.show()  -> display it",
      "sns.histplot(df['col'])  -> quick, pretty",
    ],
  },

  "ds-sklearn-intro": {
    story:
      "You've spent this whole course loading, cleaning, and charting data — now you get to do the thing everyone talks about: teach a computer to make a prediction. Say you have house sizes and prices, and you want to guess the price of a new house. Scikit-learn (spelled sklearn in code) is a toolbox where every prediction model works the same simple way: you show it examples with .fit(), then ask it for guesses with .predict(). That's it. Once you learn the pattern once, you can swap in dozens of different models without relearning anything.",
    problem:
      "You want to predict something — a price, a category, a yes/no — from data you already have. Writing the maths from scratch is hard and error-prone. You need a reliable library where trained-and-tested models are a few lines away, all following the same recipe.",
    analogy:
      "Scikit-learn is like a coffee machine with the same two buttons on every model: fill it with beans (fit on your data), press brew (predict on new data). Different machines, identical buttons.",
    explanation: [
      "Every scikit-learn model follows the same two steps: model.fit(X, y) learns from your data, model.predict(X_new) makes guesses on new data.",
      "X is your inputs (the features, like size and bedrooms) shaped as a table; y is the answers you want it to learn (the price).",
      "Split your data first with train_test_split so you can train on one part and honestly test on data the model never saw — testing on training data is cheating.",
      "Predicting a number (like price) is regression; predicting a category (spam or not) is classification — same fit/predict pattern, different model.",
      "Check how good it is with a score: accuracy for classification, or how close predictions land for regression.",
      "This is your on-ramp to machine learning, not the finish line — real projects add more features, better models, and careful evaluation.",
    ],
    visualization: { type: "linear-regression" },
    math:
      "A model learns a function f so that predicted y-hat = f(X) is close to the true y on the training examples, then you hope it stays close on new, unseen X.",
    code: {
      language: "python",
      source: `from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import numpy as np

# X = house sizes, y = prices
X = np.array([[500], [750], [1000], [1250], [1500]])
y = np.array([25, 38, 50, 61, 74])

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

model = LinearRegression()
model.fit(X_train, y_train)          # learn from training data
print(model.predict([[1100]]))       # predict price of a 1100 sq-ft house`,
      explanation:
        "train_test_split holds back some data, .fit learns the pattern from the training part, and .predict guesses the price for a new house.",
    },
    exercise: {
      prompt:
        "The model is already trained. Predict the price for a 2000 sq-ft house and print it.",
      starter: `# model is trained above
# TODO: predict the price for a 2000 sq-ft house
prediction = ...
print(prediction)`,
      solution: `prediction = model.predict([[2000]])
print(prediction)`,
    },
    quiz: [
      {
        question: "Which two methods do (almost) all scikit-learn models share?",
        options: [
          ".load() and .save()",
          ".fit() to learn and .predict() to guess",
          ".open() and .close()",
          ".draw() and .show()",
        ],
        answerIndex: 1,
        explanation: "Every model learns with .fit(X, y) and makes predictions with .predict(X_new).",
      },
      {
        question: "Why do we split the data into a training set and a test set?",
        options: [
          "To make the file smaller",
          "So we can honestly measure the model on data it never saw during training",
          "Because scikit-learn requires exactly two files",
          "To train the model twice for accuracy",
        ],
        answerIndex: 1,
        explanation:
          "Testing on unseen data shows how the model performs in the real world; scoring on training data flatters it unfairly.",
      },
    ],
    flashcards: [
      { front: "scikit-learn", back: "Python's go-to machine-learning library; every model shares .fit() and .predict()." },
      { front: ".fit(X, y)", back: "Teaches a model the pattern from your inputs X and answers y." },
      { front: ".predict(X_new)", back: "Uses the trained model to make guesses on new data." },
      { front: "train_test_split", back: "Splits data so you train on one part and test honestly on another." },
    ],
    miniProject: {
      title: "Your First Prediction",
      brief: "Train a tiny model to predict something from a real dataset.",
      steps: [
        "Load a dataset with one number to predict (e.g. tip amount) and one or two inputs (bill, party size).",
        "Split it with train_test_split.",
        "Fit a LinearRegression model on the training set.",
        "Predict on the test set and eyeball how close the guesses are.",
      ],
    },
    industryUse: [
      "Banks train scikit-learn classifiers to flag likely-fraudulent transactions",
      "Real-estate sites train regression models to estimate home prices",
      "Retailers predict which customers are likely to churn so they can win them back",
    ],
    commonMistakes: [
      "Testing the model on the same data it trained on and celebrating a fake-high score. Always evaluate on held-out test data.",
      "Passing X as a flat 1-D list; scikit-learn wants a 2-D table shape like [[500], [750]]. Reshape or wrap in extra brackets.",
    ],
    interviewQuestions: [
      "Walk through the basic scikit-learn workflow from data to prediction.",
      "Why is train/test splitting important, and what goes wrong without it?",
    ],
    papers: [
      { title: "Scikit-learn: Machine Learning in Python (Pedregosa et al.)", url: "https://www.jmlr.org/papers/v12/pedregosa11a.html", year: 2011 },
    ],
    nextUp: ["ds-eda-project", "ds-matplotlib"],
    cheatsheet: [
      "from sklearn.linear_model import LinearRegression",
      "train_test_split(X, y, test_size=0.2)",
      "model.fit(X_train, y_train)",
      "model.predict(X_new)",
      "Always test on unseen data",
    ],
  },

  "ds-eda-project": {
    story:
      "This is where it all comes together. Someone hands you a spreadsheet you've never seen — say, every passenger on the Titanic, or a year of a coffee shop's sales — and asks, 'What can you tell me?' You have no formula to plug in; your job is to explore. You load it, clean the mess, chart the interesting bits, and slowly the data starts talking: women survived more often, weekends sell double, older customers spend less. That detective work is Exploratory Data Analysis, or EDA, and it is the heart of what data scientists actually do all day.",
    problem:
      "Before any fancy model, you face a raw, unfamiliar dataset and a vague question. You need a repeatable process to understand what's in it, fix what's broken, and surface the real patterns — otherwise you're modelling blind.",
    analogy:
      "EDA is like exploring a new city on foot before you plan your route: you wander, take notes, notice the landmarks (patterns) and the dodgy alleys (bad data) before committing to anything.",
    explanation: [
      "Step 1 — Load and look: read the file, then df.head(), df.shape, and df.info() to learn what columns and types you have.",
      "Step 2 — Clean: count missing values with df.isnull().sum(), fill or drop them, and remove duplicates so your numbers are honest.",
      "Step 3 — Summarize: df.describe() gives min, max, mean, and quartiles for every number column in one shot.",
      "Step 4 — Group: use groupby to answer 'per' questions — survival rate per class, average spend per age group.",
      "Step 5 — Visualize: draw histograms for spread, bar charts for comparisons, and scatter plots for relationships between columns.",
      "Step 6 — Tell the story: write down the two or three findings that actually matter. EDA's output is insight, not more numbers.",
    ],
    code: {
      language: "python",
      source: `import pandas as pd
import seaborn as sns
import matplotlib.pyplot as plt

df = pd.read_csv("titanic.csv")

# 1. look and clean
print(df.shape)
print(df.isnull().sum())
df["age"] = df["age"].fillna(df["age"].median())

# 2. summarize and group
print(df.describe())
print(df.groupby("sex")["survived"].mean())   # survival rate by sex

# 3. visualize a relationship
sns.barplot(x="pclass", y="survived", data=df)
plt.title("Survival Rate by Passenger Class")
plt.show()`,
      explanation:
        "The workflow flows top to bottom: inspect and clean, summarize with describe and groupby, then chart the finding — the full EDA loop.",
    },
    exercise: {
      prompt:
        "As one EDA step, print a quick statistical summary of every numeric column in df.",
      starter: `import pandas as pd

df = pd.read_csv("titanic.csv")
# TODO: print min, max, mean, quartiles for all numeric columns
print(...)`,
      solution: `import pandas as pd

df = pd.read_csv("titanic.csv")
print(df.describe())`,
    },
    quiz: [
      {
        question: "What is the main goal of Exploratory Data Analysis (EDA)?",
        options: [
          "To train the most complex model possible",
          "To understand a dataset and surface its real patterns before modelling",
          "To delete as many rows as possible",
          "To make the file load faster",
        ],
        answerIndex: 1,
        explanation:
          "EDA is about understanding the data and finding insights — cleaning, summarizing, and visualizing — before any modelling.",
      },
      {
        question: "Which method gives a fast statistical summary (min, max, mean, quartiles) of numeric columns?",
        options: ["df.head()", "df.describe()", "df.dropna()", "df.plot()"],
        answerIndex: 1,
        explanation: "df.describe() reports count, mean, min, max, and quartiles for every numeric column at once.",
      },
    ],
    flashcards: [
      { front: "EDA", back: "Exploratory Data Analysis — exploring a dataset to understand it and find patterns before modelling." },
      { front: "df.describe()", back: "A one-line statistical summary (count, mean, min, max, quartiles) of numeric columns." },
      { front: "Insight", back: "The real, communicable finding EDA produces — not just more numbers." },
      { front: "EDA workflow", back: "Load, clean, summarize, group, visualize, then tell the story." },
    ],
    miniProject: {
      title: "Full EDA on a Real Dataset",
      brief: "Run a complete exploratory analysis on the Titanic (or any) dataset and report three findings.",
      steps: [
        "Load the dataset and inspect it with head, shape, and info.",
        "Clean missing values and drop duplicates.",
        "Use describe and groupby to summarize the data.",
        "Make at least two charts (a histogram and a bar or scatter plot).",
        "Write three plain-English findings someone non-technical would understand.",
      ],
    },
    industryUse: [
      "Data scientists at Airbnb run EDA on booking data before building pricing models",
      "Netflix explores viewing data to understand audience patterns before recommending",
      "Public health analysts explore case data to find who is most at risk during an outbreak",
    ],
    commonMistakes: [
      "Jumping straight to a fancy model without exploring first, then being blindsided by dirty data or an obvious pattern. Always explore first.",
      "Producing dozens of charts but no conclusions. The deliverable of EDA is a few clear findings, not a pile of graphs.",
    ],
    interviewQuestions: [
      "Walk me through how you'd approach a brand-new dataset you've never seen.",
      "What steps make up a typical exploratory data analysis, and what's the end goal?",
    ],
    papers: [],
    nextUp: ["ds-sklearn-intro", "ds-pandas-groupby"],
    cheatsheet: [
      "df.head() / df.info() / df.shape",
      "df.isnull().sum() -> clean",
      "df.describe() -> summarize",
      "df.groupby(...) -> 'per' questions",
      "Charts: hist, bar, scatter",
      "End with 2-3 plain findings",
    ],
  },
};
