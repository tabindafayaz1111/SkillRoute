import type { LessonBody } from "@/types";

export const foundations: Record<string, LessonBody> = {
  "python-variables": {
    story:
      "You walk into a room and someone hands you a shoebox with a sticky label on it that says 'name'. You drop a slip of paper reading 'Maria' inside. Later, anytime you say 'name', everyone knows to look in that box and read what's there. A variable is exactly that: a labelled box that holds a value for you. In Python you write `name = \"Maria\"` — the label is `name`, the thing inside is `\"Maria\"` — and from then on the computer remembers it for you so you never have to repeat yourself.",
    problem:
      "A computer has no memory of what you told it two lines ago unless you give that information a name. Without variables you would have to re-type your name, your age, and every number over and over, and you could never change a value in one place and have it update everywhere.",
    analogy:
      "A variable is a labelled shoebox: the label is the name you choose, and whatever you put inside is the value — swap the contents anytime, the label stays.",
    explanation: [
      "You create a variable with `=`, which means 'put the thing on the right into the box named on the left' — it is NOT 'equals' like in maths. `age = 30` means 'store 30 in a box called age'.",
      "Values come in types. Text is a string (letters in quotes: `\"Maria\"`). Whole numbers are ints (`30`). Numbers with a decimal point are floats (`5.8`). True/false answers are booleans (`True` or `False`).",
      "The type matters because Python treats them differently: `\"30\" + \"30\"` glues text into `\"3030\"`, but `30 + 30` adds numbers into `60`. Same-looking value, very different behaviour.",
      "You can change what a box holds anytime — `age = 30` then later `age = 31` just replaces the contents. The label stays; the value moves on.",
      "Use good names: `age` and `first_name` tell the next human (often future-you) what's inside. Avoid `x` and `a` for anything that matters.",
      "Use `type(thing)` when you're unsure what kind of value you're holding — it's the quickest way to catch a number that's secretly text.",
    ],
    code: {
      language: "python",
      source: `# Four boxes, four different types
name = "Maria"        # string  - text in quotes
age = 30              # int     - whole number
height = 5.8          # float   - number with a decimal
is_student = True     # boolean - True or False

# Use them like you'd use their contents
print("Hello,", name)
print("Next year you'll be", age + 1)
print(type(height))   # tells you it's a float

# You can change what a box holds
age = 31
print("Updated age:", age)`,
      explanation:
        "Each `=` drops a value into a named box; `print` reads the boxes back out, and `age + 1` proves Python treats an int as a real number you can do maths on.",
    },
    exercise: {
      prompt:
        "Make a box called `city` holding the text of your city, and a box called `year_born` holding a whole number. Then print a sentence using both.",
      starter: `city = ...        # TODO: put your city as a string (use quotes)
year_born = ...   # TODO: put a whole number (no quotes)
print("I live in", city, "and I was born in", year_born)`,
      solution: `city = "Mumbai"
year_born = 1994
print("I live in", city, "and I was born in", year_born)`,
    },
    quiz: [
      {
        question: "What does `age = 30` actually do?",
        options: [
          "Checks whether age is equal to 30",
          "Stores the value 30 in a box named age",
          "Prints 30 to the screen",
          "Creates a new number type called age",
        ],
        answerIndex: 1,
        explanation:
          "A single `=` is assignment: it puts the value on the right into the variable named on the left. Comparison ('is it equal?') uses `==`.",
      },
      {
        question: "What is `\"5\" + \"5\"` in Python?",
        options: ["10", "\"55\"", "An error", "\"10\""],
        answerIndex: 1,
        explanation:
          "Those are strings (text, because of the quotes). Adding strings glues them together, so you get \"55\", not the number 10.",
      },
      {
        question: "Which value is a boolean?",
        options: ["\"True\"", "1", "True", "5.8"],
        answerIndex: 2,
        explanation:
          "`True` (no quotes, capital T) is a boolean. `\"True\"` with quotes is just text, and 1 and 5.8 are numbers.",
      },
    ],
    flashcards: [
      { front: "Variable", back: "A named box that stores a value so you can reuse and change it by name." },
      { front: "String", back: "Text wrapped in quotes, e.g. \"Maria\"." },
      { front: "Int vs Float", back: "Int is a whole number (30); float has a decimal point (5.8)." },
      { front: "Boolean", back: "A True/False value used for yes/no decisions." },
    ],
    miniProject: {
      title: "Your Digital ID Card",
      brief: "Store your own details in well-named variables and print a tidy ID card to the screen.",
      steps: [
        "Create variables: full_name (string), age (int), height_m (float), likes_coffee (boolean).",
        "Print each on its own line with a clear label, e.g. 'Name: Maria'.",
        "Add a computed line: print the year you'll turn 100 using age.",
        "Use type() on two of your variables to confirm they're the types you expect.",
      ],
    },
    industryUse: [
      "Every Netflix recommendation starts as variables holding your user id and what you just watched.",
      "Banking apps store your balance and account number in variables before any transaction runs.",
      "Spotify keeps the current song, volume, and whether you're a premium user in variables as the app runs.",
    ],
    commonMistakes: [
      "Putting quotes around numbers you want to do maths on: `age = \"30\"` makes text, so `age + 1` breaks. Drop the quotes.",
      "Confusing `=` (store a value) with `==` (check if two things are equal). Assignment uses one; comparison uses two.",
      "Using vague names like `x` or `data1` — a week later nobody knows what's inside. Name the box after its contents.",
    ],
    interviewQuestions: [
      "What's the difference between an int and a float, and when would you pick each?",
      "Explain the difference between `=` and `==` in Python.",
      "What happens when you add two strings versus two integers?",
    ],
    papers: [],
    nextUp: ["loops-functions", "numpy-basics"],
    cheatsheet: [
      "name = \"Maria\"  # string",
      "age = 30        # int",
      "height = 5.8    # float",
      "is_ready = True # boolean",
      "= stores a value, == checks equality",
      "type(x) tells you what kind of value x is",
    ],
  },

  "loops-functions": {
    story:
      "Imagine you have to write 'I will not chew gum in class' 100 times on a blackboard. You could copy it by hand 100 times — or you could tell a tireless helper 'write this line, and repeat it 100 times' and walk away. That instruction is a loop. Now imagine you keep needing to make tea for guests: rather than explaining every step each time, you write the recipe once, name it 'make_tea', and from then on you just say 'make_tea' and it all happens. That named recipe is a function. Loops kill copy-paste; functions let you name a job once and reuse it forever.",
    problem:
      "Real tasks repeat — process every customer, every row, every file — and doing that by copy-pasting the same lines is slow, error-prone, and impossible to fix later. And the same chunk of logic gets needed in ten different places, so retyping it everywhere means ten places to update when something changes.",
    analogy:
      "A loop is telling someone 'do this for each item in the pile until the pile is empty'; a function is a recipe card you write once and hand over whenever that dish is needed.",
    explanation: [
      "A `for` loop walks through a collection one item at a time: `for name in guests:` runs the indented block once for each guest, with `name` holding the current one. No copy-paste, no matter if there are 3 guests or 3 million.",
      "The indented lines under the loop are 'the body' — that's what gets repeated. Python uses indentation (spaces) to know what's inside the loop, so line them up carefully.",
      "A function is defined with `def`, given a name, and takes inputs called parameters in the brackets. `return` hands a result back to whoever called it.",
      "You 'call' a function by writing its name with brackets: `make_tea()` or `area(5, 3)`. Write it once, call it a hundred times — fix a bug in one place and every call is fixed.",
      "Use a loop when you're doing the same thing to many items. Use a function when you have a named job you'll want to reuse (or just to give a messy block a clear name).",
      "Loops and functions team up constantly: a function often contains a loop, and you often call a function inside a loop. That combo is 90% of everyday code.",
    ],
    code: {
      language: "python",
      source: `# A loop: greet every guest without copy-pasting
guests = ["Maria", "Sam", "Priya"]
for name in guests:
    print("Welcome,", name)

# A function: name a reusable recipe once
def area(width, height):
    return width * height   # hand the answer back

# Call it as many times as you like
print("Room 1:", area(5, 3))
print("Room 2:", area(4, 6))

# Loops + functions together: total area of several rooms
rooms = [(5, 3), (4, 6), (2, 2)]
total = 0
for w, h in rooms:
    total = total + area(w, h)
print("Total area:", total)`,
      explanation:
        "The `for` loop runs its indented body once per item; `area` is a recipe defined once with `def` and reused via `area(...)`, and the last block shows them working together to add up every room.",
    },
    exercise: {
      prompt:
        "Write a function `double(n)` that returns n times 2, then use a loop to print the double of every number in the list.",
      starter: `def double(n):
    return ...   # TODO: return n multiplied by 2

numbers = [3, 7, 10]
for n in numbers:
    print(...)   # TODO: print double(n)`,
      solution: `def double(n):
    return n * 2

numbers = [3, 7, 10]
for n in numbers:
    print(double(n))`,
    },
    quiz: [
      {
        question: "What is the main reason to use a loop?",
        options: [
          "To make the code run slower",
          "To repeat an action over many items without copy-pasting",
          "To store a single value",
          "To connect to the internet",
        ],
        answerIndex: 1,
        explanation:
          "A loop repeats its body for each item in a collection, so you write the action once instead of copying it for every item.",
      },
      {
        question: "In `def area(width, height):`, what are `width` and `height`?",
        options: [
          "The name of the function",
          "Parameters — the inputs the function expects",
          "The returned answer",
          "Loop counters",
        ],
        answerIndex: 1,
        explanation:
          "They're parameters: named inputs you fill in when you call the function, e.g. area(5, 3).",
      },
      {
        question: "What does `return` do in a function?",
        options: [
          "Prints the value to the screen",
          "Repeats the function",
          "Hands a result back to whoever called the function",
          "Deletes the function",
        ],
        answerIndex: 2,
        explanation:
          "`return` sends a value back to the caller so it can be stored or used. That's different from `print`, which only shows it on screen.",
      },
    ],
    flashcards: [
      { front: "for loop", back: "Runs a block of code once for each item in a collection." },
      { front: "Function", back: "A named, reusable block of code you define once with `def` and call many times." },
      { front: "Parameter", back: "A named input a function expects, filled in when you call it." },
      { front: "return", back: "Hands a result back from a function to whoever called it." },
    ],
    miniProject: {
      title: "Grocery Bill Calculator",
      brief: "Use a function and a loop to total a shopping list and apply a discount.",
      steps: [
        "Write a function apply_tax(price) that returns price plus 5% tax.",
        "Make a list of item prices, e.g. [120, 45, 300].",
        "Loop over the list, run each price through apply_tax, and add it to a running total.",
        "Print each taxed price and the final total, then try changing the tax rate in one place.",
      ],
    },
    industryUse: [
      "Amazon loops over every item in your cart to compute the order total and shipping.",
      "Gmail runs a spam-scoring function on each incoming email in a loop as messages arrive.",
      "Banks loop over millions of daily transactions, calling a fraud-check function on each one.",
    ],
    commonMistakes: [
      "Wrong indentation: code that should be inside the loop isn't lined up, so it runs only once. Keep the loop body indented consistently.",
      "Forgetting `return`, so the function computes an answer but hands back nothing (None). If you need the result, return it.",
      "Copy-pasting the same block instead of writing a function — then having to fix the bug in five places. If you've written it twice, make it a function.",
    ],
    interviewQuestions: [
      "What's the difference between `print` and `return` in a function?",
      "When would you choose a loop over writing the code out by hand?",
      "Explain what parameters and arguments are with a small example.",
    ],
    papers: [],
    nextUp: ["numpy-basics", "pandas-basics"],
    cheatsheet: [
      "for item in things:  # repeat for each item",
      "def name(inputs):    # define a reusable recipe",
      "return value         # hand a result back",
      "name(args)           # call the function",
      "Indent the body so Python knows what's inside",
      "Written it twice? Make it a function.",
    ],
  },

  "numpy-basics": {
    story:
      "You have a shopping list of 10,000 prices and you want to add 5% tax to every single one. In plain Python you'd write a loop that visits each price one at a time — like a cashier scanning 10,000 items individually. NumPy hands you a magic clipboard: you write 'prices times 1.05' once, and it applies that to all 10,000 numbers in a single instant, in one line. That magic clipboard is a NumPy array — a container built for numbers — and doing maths on the whole array at once (instead of item by item) is called vectorized math. It's why NumPy is the number-crunching engine underneath nearly all of machine learning.",
    problem:
      "A regular Python list can hold anything, but that flexibility makes maths on big piles of numbers slow, because Python checks and handles each element one at a time. Scientific work needs to add, multiply, and average millions of numbers fast — plain lists simply can't keep up.",
    analogy:
      "A Python list is a junk drawer that holds anything; a NumPy array is a tray of identical egg-cups built only for numbers — so the computer can blaze through them all at once.",
    explanation: [
      "A NumPy array looks like a list but holds numbers of one type packed tightly together in memory, which lets your computer process them in fast, bulk operations.",
      "The killer feature is vectorized math: `arr * 1.05` multiplies EVERY element by 1.05 at once — no loop needed. This is shorter to write AND dramatically faster to run.",
      "Element-wise operations line arrays up and combine them position by position: `[1,2,3] + [10,20,30]` gives `[11,22,33]`. Great for combining columns of data.",
      "Arrays come with instant summaries: `.sum()`, `.mean()`, `.max()` crunch the whole array in one call, which is exactly what you do constantly in data work.",
      "Use NumPy when you have lots of numbers and want speed and clean math. Stick with a plain list when you're holding a mix of things (names, dates, flags) or just a handful of items.",
      "Nearly every ML library — Pandas, scikit-learn, TensorFlow, PyTorch — is built on NumPy arrays under the hood, so learning it here pays off everywhere later.",
    ],
    math:
      "Vectorized scaling: given an array x, `x * 1.05` computes 1.05 · xᵢ for every element xᵢ at once — the same operation applied across the whole array with no explicit loop.",
    code: {
      language: "python",
      source: `import numpy as np

# A plain list vs a NumPy array
prices_list = [100, 250, 80, 400]
prices = np.array(prices_list)   # turn the list into an array

# Vectorized math: add 5% tax to EVERY price in one line (no loop!)
with_tax = prices * 1.05
print("With tax:", with_tax)

# Element-wise: combine two arrays position by position
tax_paid = with_tax - prices
print("Tax on each:", tax_paid)

# Instant summaries over the whole array
print("Total spent:", with_tax.sum())
print("Average price:", prices.mean())`,
      explanation:
        "`prices * 1.05` scales all four numbers at once, `with_tax - prices` subtracts arrays element by element, and `.sum()`/`.mean()` crunch the entire array in a single call — all without writing a loop.",
    },
    exercise: {
      prompt:
        "You have temperatures in Celsius. Convert the WHOLE array to Fahrenheit in one line using the formula F = C * 9/5 + 32 (no loop).",
      starter: `import numpy as np
celsius = np.array([0, 20, 37, 100])
fahrenheit = ...   # TODO: vectorized conversion, no loop
print(fahrenheit)`,
      solution: `import numpy as np
celsius = np.array([0, 20, 37, 100])
fahrenheit = celsius * 9/5 + 32
print(fahrenheit)`,
    },
    quiz: [
      {
        question: "Why is a NumPy array faster than a plain Python list for number crunching?",
        options: [
          "It uses the internet to compute",
          "It stores same-type numbers tightly and processes them in fast bulk operations",
          "It secretly skips some of the numbers",
          "It only works on small data",
        ],
        answerIndex: 1,
        explanation:
          "Arrays pack numbers of one type together and run vectorized operations over them in bulk, instead of handling each element one at a time like a list.",
      },
      {
        question: "What does `np.array([1, 2, 3]) * 10` produce?",
        options: ["[1, 2, 3, 10]", "[10, 20, 30]", "60", "An error"],
        answerIndex: 1,
        explanation:
          "Multiplying an array by a number scales every element, giving [10, 20, 30] — this is vectorized, element-wise math.",
      },
      {
        question: "When is a plain Python list a better choice than a NumPy array?",
        options: [
          "When you have millions of numbers to average",
          "When you're mixing different kinds of things like names, dates, and flags",
          "When you need maximum math speed",
          "Never — arrays are always better",
        ],
        answerIndex: 1,
        explanation:
          "Arrays shine for large collections of same-type numbers. For a mixed bag of items, a plain list is simpler and more appropriate.",
      },
    ],
    flashcards: [
      { front: "NumPy array", back: "A container built for numbers of one type, packed for fast bulk math." },
      { front: "Vectorized math", back: "Applying an operation to a whole array at once, with no explicit loop." },
      { front: "Element-wise operation", back: "Combining arrays position by position, e.g. [1,2]+[3,4]=[4,6]." },
      { front: ".sum() / .mean()", back: "Array methods that crunch the entire array into one summary number." },
    ],
    miniProject: {
      title: "Exam Score Analyzer",
      brief: "Use one NumPy array to grade a class without a single loop.",
      steps: [
        "Make an array of 8 raw exam scores out of 50.",
        "Convert every score to a percentage in one vectorized line (score / 50 * 100).",
        "Print the class mean, highest, and lowest using .mean(), .max(), .min().",
        "Add 5 bonus marks to everyone at once and see how the average changes.",
      ],
    },
    industryUse: [
      "Netflix crunches huge arrays of viewing numbers with NumPy to power its recommendation math.",
      "NASA and research labs use NumPy arrays for physics simulations and signal processing.",
      "Quant trading desks at banks run vectorized NumPy math over price arrays to price risk in real time.",
    ],
    commonMistakes: [
      "Writing a slow Python loop to do math NumPy could do in one vectorized line — let the array do it all at once.",
      "Mixing incompatible shapes, e.g. adding a 3-element array to a 4-element one, which errors. Make sure sizes line up.",
      "Forgetting `import numpy as np`, then wondering why `np.array` is undefined. That import line is required.",
    ],
    interviewQuestions: [
      "What's the difference between a Python list and a NumPy array?",
      "What does 'vectorized' mean and why does it make code faster?",
      "How would you compute the mean of a large set of numbers efficiently in NumPy?",
    ],
    papers: [
      { title: "Array programming with NumPy (Harris et al., Nature)", url: "https://arxiv.org/abs/2006.10256", year: 2020 },
    ],
    nextUp: ["pandas-basics", "linear-regression"],
    cheatsheet: [
      "import numpy as np",
      "a = np.array([1, 2, 3])",
      "a * 1.05        # scale every element (vectorized)",
      "a + b           # element-wise add",
      "a.sum(), a.mean(), a.max()  # instant summaries",
      "Same-type numbers + no loops = speed",
    ],
  },

  "pandas-basics": {
    story:
      "You keep your household budget in a giant spreadsheet — one row per expense, columns for date, amount, and category. One day you wonder: 'How much did I spend on food in June?' Answering that by scrolling and adding across 2,000 rows by hand is misery. Pandas is a Python tool that loads that spreadsheet into memory and lets you ask it questions in one line: filter to June, keep only food, add up the amounts — done in a blink. The spreadsheet-in-Python that Pandas gives you is called a DataFrame: rows and columns you already understand, except now Python can slice, filter, and total them instantly. In short: Pandas is a spreadsheet that answers your questions on command.",
    problem:
      "Real data lives in spreadsheets and CSV files with thousands of rows, and answering simple questions — filter these rows, sum that column, average by group — is painfully slow and error-prone by hand. You need a way to load that table into Python and query it in one line.",
    analogy:
      "A DataFrame is Excel with a Python steering wheel: the same rows and columns you know, but you can filter, total, and reshape them by typing a single instruction instead of clicking around.",
    explanation: [
      "A DataFrame is a table: labelled columns across the top (like 'amount' or 'category') and numbered rows down the side. It's the spreadsheet you already picture in your head, living inside Python.",
      "You usually load data with `pd.read_csv(\"file.csv\")`, which turns a comma-separated file into a DataFrame ready to query.",
      "Grab a single column by name — `df[\"amount\"]` — and it behaves like a NumPy array, so `.sum()` and `.mean()` work instantly on the whole column.",
      "Filter rows with a condition in square brackets: `df[df[\"category\"] == \"food\"]` keeps only the rows where category is food. Read it as 'give me the rows where this is true'.",
      "You can build new columns from old ones: `df[\"total\"] = df[\"price\"] * df[\"qty\"]` creates a column for every row at once, no loop.",
      "Use Pandas whenever your data is table-shaped (spreadsheets, CSVs, database exports). It's the everyday workhorse that gets raw data clean and ready before any machine learning happens.",
    ],
    code: {
      language: "python",
      source: `import pandas as pd

# A tiny expense table (normally you'd read a CSV file)
data = {
    "category": ["food", "rent", "food", "transport", "food"],
    "amount":   [120, 800, 60, 45, 200],
    "month":    ["June", "June", "July", "June", "June"],
}
df = pd.DataFrame(data)

# Total of one whole column, in one line
print("Total spent:", df["amount"].sum())
print("Average expense:", round(df["amount"].mean(), 1))

# Filter rows: keep only food expenses
food = df[df["category"] == "food"]
print("Food spend:", food["amount"].sum())

# Filter on two conditions: food in June
june_food = df[(df["category"] == "food") & (df["month"] == "June")]
print("Food in June:", june_food["amount"].sum())`,
      explanation:
        "`pd.DataFrame` builds the table, `df[\"amount\"].sum()` totals a whole column at once, and the bracket conditions filter to just the rows you care about — answering 'how much food in June?' in a single line.",
    },
    exercise: {
      prompt:
        "From the same df, filter to only the rows where amount is greater than 100, then print the mean of that filtered amount column.",
      starter: `# df already exists from the lesson
big = ...   # TODO: keep rows where amount > 100
print(big["amount"].mean())`,
      solution: `big = df[df["amount"] > 100]
print(big["amount"].mean())`,
    },
    quiz: [
      {
        question: "In one sentence, what is a Pandas DataFrame?",
        options: [
          "A type of chart for plotting data",
          "A table of rows and columns that Python can filter and total in one line",
          "A way to connect to the internet",
          "A single number computed from data",
        ],
        answerIndex: 1,
        explanation:
          "A DataFrame is a spreadsheet-like table — labelled columns and rows — that you can slice, filter, and summarise with short Python commands.",
      },
      {
        question: "What does `df[df[\"category\"] == \"food\"]` do?",
        options: [
          "Deletes the food rows",
          "Keeps only the rows where category equals food",
          "Adds a new food column",
          "Sums the food amounts",
        ],
        answerIndex: 1,
        explanation:
          "The inner condition marks which rows are food; wrapping it in df[...] returns just those matching rows.",
      },
      {
        question: "How would you get the average of the 'amount' column?",
        options: [
          "df.average()",
          "df[\"amount\"].mean()",
          "mean(df)",
          "df.amount.total()",
        ],
        answerIndex: 1,
        explanation:
          "Select the column with df[\"amount\"], then call .mean() on it to average the whole column at once.",
      },
    ],
    flashcards: [
      { front: "Pandas", back: "A Python tool that loads table data and lets you filter, sort, and total it in one line." },
      { front: "DataFrame", back: "A spreadsheet-like table of labelled columns and rows living inside Python." },
      { front: "read_csv", back: "pd.read_csv(\"file.csv\") loads a CSV file into a DataFrame." },
      { front: "Filtering rows", back: "df[df[\"col\"] == value] keeps only the rows where the condition is true." },
    ],
    miniProject: {
      title: "Your Monthly Spending Report",
      brief: "Build a small expense DataFrame and answer real budgeting questions with Pandas.",
      steps: [
        "Create a DataFrame with columns category, amount, and month for about 8 expenses.",
        "Print the total and average spend across all rows.",
        "Filter to a single category and print how much it cost.",
        "Add a new column 'is_big' that's True when amount is over 100, then count how many are True.",
      ],
    },
    industryUse: [
      "Data teams at Airbnb use Pandas to clean and explore booking data before building pricing models.",
      "Banks load transaction CSVs into Pandas to filter and total spending for fraud and reporting.",
      "Spotify analysts use Pandas to slice listening data by region and playlist to guide decisions.",
    ],
    commonMistakes: [
      "Using `and`/`or` between conditions instead of `&`/`|` — Pandas needs the symbols, and each condition must be wrapped in its own brackets.",
      "Forgetting the quotes on column names: it's df[\"amount\"], not df[amount], unless amount is a variable.",
      "Editing a filtered copy and expecting the original to change. Filtering returns a new view/copy; assign it back if you need to keep it.",
    ],
    interviewQuestions: [
      "What is a DataFrame and how does it differ from a NumPy array?",
      "How do you filter rows of a DataFrame based on a condition?",
      "How would you compute the total of a column and the average by group?",
    ],
    papers: [
      { title: "Data Structures for Statistical Computing in Python (McKinney)", url: "https://conference.scipy.org/proceedings/scipy2010/pdfs/mckinney.pdf", year: 2010 },
    ],
    nextUp: ["eda", "train-test-split"],
    cheatsheet: [
      "import pandas as pd",
      "df = pd.read_csv(\"file.csv\")",
      "df[\"amount\"].sum()   # total a column",
      "df[\"amount\"].mean()  # average a column",
      "df[df[\"cat\"] == \"food\"]  # filter rows",
      "df[\"total\"] = df[\"price\"] * df[\"qty\"]  # new column",
    ],
  },
};
