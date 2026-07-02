import type { LessonBody } from "@/types";

export const pythonProgramming: Record<string, LessonBody> = {
  "why-python": {
    story:
      "Picture giving instructions to a very fast, very literal helper who has never left the kitchen. If you speak in riddles, it freezes. Python is a language for talking to that helper (your computer) using words that look almost like plain English. You write `print(\"Hello!\")` and the computer prints Hello! on the screen. That's it — no cryptic symbols, no ceremony. Python became the world's most popular first language precisely because a sentence you type reads close to a sentence you'd say, so beginners get real things working on day one.",
    problem:
      "Computers are astonishingly fast but astonishingly dumb — they only do exactly what they're told, in a language they understand. You need a way to give clear, step-by-step instructions without learning a wall of confusing symbols first. Python is that gentle on-ramp: readable, forgiving, and used everywhere from tiny scripts to giant companies.",
    analogy:
      "Python is like a friendly translator standing between you and a machine that only speaks in 1s and 0s — you talk in near-plain English, it whispers the machine's language for you.",
    explanation: [
      "A program is just a list of instructions the computer runs top to bottom, in order — like a recipe. You write the steps, hit run, and it does them one at a time.",
      "`print(...)` is your first command: it puts whatever is inside the brackets onto the screen. Text goes in quotes: `print(\"Hi\")`.",
      "Python ignores nothing and forgives little — spelling and brackets must be exact. `Print` (capital P) won't work; `print` will. That strictness is a feature: it means the computer never guesses.",
      "You run Python by typing code into a file (ending in `.py`) or into an interactive prompt, then pressing run. The result appears instantly — that fast feedback is what makes learning fun.",
      "Use Python when you want results fast: automating boring tasks, crunching a spreadsheet, building a small app, or gluing tools together. It's less ideal for ultra-high-speed games or phone apps, where other languages shine.",
      "A `#` starts a comment — a note for humans that Python ignores. Use comments to remind yourself (and others) what a line is for.",
    ],
    code: {
      language: "python",
      source: `# Your very first Python program
print("Hello, world!")        # prints a greeting

# Python can do maths too
print(2 + 2)                  # prints 4

# You can print several things at once
print("You have", 3, "new messages")`,
      explanation:
        "Each print puts one line on the screen. Text needs quotes; numbers don't. Anything after a # is a note for you, not an instruction.",
    },
    exercise: {
      prompt: "Make the program greet YOU by name and print how old you'll be next year.",
      starter: `# TODO: print a greeting with your name
print("Hello, ...")
# TODO: print your age plus 1
print(...)`,
      solution: `print("Hello, Maria")
print(29 + 1)`,
    },
    quiz: [
      {
        question: "What does print(\"Hi\") do?",
        options: [
          "Sends Hi to a printer",
          "Puts the text Hi on the screen",
          "Saves Hi to a file",
          "Nothing — it's a comment",
        ],
        answerIndex: 1,
        explanation:
          "print displays whatever is inside the brackets on the screen. Despite the name, it has nothing to do with paper printers.",
      },
      {
        question: "Why won't Print(\"Hi\") work?",
        options: [
          "Hi is not a real word",
          "You need a comment first",
          "Python is case-sensitive — it must be lowercase print",
          "You can only print numbers",
        ],
        answerIndex: 2,
        explanation:
          "Python cares about exact spelling and capitalisation. The command is print, all lowercase.",
      },
    ],
    flashcards: [
      { front: "print()", back: "A command that displays whatever is inside the brackets on the screen." },
      { front: "Comment (#)", back: "A note for humans that Python ignores when running the program." },
      { front: "Program", back: "A list of instructions the computer runs from top to bottom, in order." },
      { front: "Case-sensitive", back: "Capital and lowercase letters matter — print and Print are different to Python." },
    ],
    miniProject: {
      title: "Your Digital Business Card",
      brief: "Write a short program that prints a mini profile of you to the screen.",
      steps: [
        "Print your name on the first line.",
        "Print your city and favourite hobby, each on its own line.",
        "Print a fun fact using both text and a number (e.g. cups of coffee per day).",
        "Add a comment above each line explaining what it does.",
      ],
    },
    industryUse: [
      "Instagram (Meta) runs huge parts of its backend in Python",
      "Spotify uses Python for data pipelines and music recommendations",
      "NASA uses Python for scientific computing and mission tooling",
    ],
    commonMistakes: [
      "Forgetting the quotes around text: print(Hello) errors, print(\"Hello\") works.",
      "Capitalising commands: it's print, not Print or PRINT.",
      "Forgetting the closing bracket ) — every open ( needs a matching close.",
    ],
    interviewQuestions: [
      "What makes Python a good language for beginners?",
      "What is the difference between a comment and code?",
      "Name two things Python is commonly used for in industry.",
    ],
    papers: [],
    nextUp: ["variables-types"],
    cheatsheet: [
      "print(\"text\") shows text on screen",
      "Text needs quotes; numbers don't",
      "# starts a comment (ignored by Python)",
      "Python is case-sensitive: print, not Print",
      "Files end in .py and run top to bottom",
    ],
  },

  "variables-types": {
    story:
      "You walk into a room and someone hands you a shoebox with a sticky label reading 'name'. You drop a slip of paper saying 'Maria' inside. Later, whenever you say 'name', everyone knows to open that box and read what's there. A variable is exactly that: a labelled box that holds a value for you. In Python you write `name = \"Maria\"` — the label is `name`, the contents are `\"Maria\"` — and from then on the computer remembers it, so you never have to repeat yourself.",
    problem:
      "A computer forgets everything the instant it's done with a line — unless you give the information a name to hang on to. Without variables you'd re-type your name, your total, and every number over and over, and you could never change one value in one place and have it update everywhere it's used.",
    analogy:
      "A variable is a labelled shoebox: the label is the name you pick, and whatever you put inside is the value. Swap the contents anytime — the label stays the same.",
    explanation: [
      "You make a variable with `=`, which means 'put the thing on the right into the box named on the left'. It is NOT 'equals' from maths. `age = 30` means 'store 30 in a box called age'.",
      "Values come in types. Text is a string (letters in quotes: `\"Maria\"`). Whole numbers are ints (`30`). Numbers with a decimal point are floats (`5.8`). True/false answers are booleans (`True` or `False`).",
      "Type matters because Python treats them differently: `\"30\" + \"30\"` glues text into `\"3030\"`, but `30 + 30` adds numbers into `60`. Same-looking value, totally different behaviour.",
      "You can change what a box holds anytime — `age = 30` then later `age = 31` just replaces the contents. The label stays; the value moves on.",
      "Use clear names: `age` and `first_name` tell the next human (usually future-you) what's inside. Avoid `x` and `a` for anything that matters. Names use lowercase_with_underscores.",
      "When unsure what you're holding, ask Python with `type(thing)` — it's the fastest way to catch a number that's secretly text.",
    ],
    code: {
      language: "python",
      source: `name = "Maria"        # a string (text)
age = 30              # an int (whole number)
height = 5.8          # a float (decimal number)
is_member = True      # a boolean (True or False)

print(name, "is", age, "years old")
print("Type of age:", type(age))

age = age + 1         # change the box: now it holds 31
print("Next year:", age)`,
      explanation:
        "Four boxes, four types. type() tells you what kind of value a variable holds, and you can overwrite a variable anytime just by assigning again.",
    },
    exercise: {
      prompt: "Create variables for a product name, its price, and whether it's in stock — then print a one-line summary.",
      starter: `product = "..."      # TODO: a string
price = ...           # TODO: a float like 9.99
in_stock = ...        # TODO: True or False
# TODO: print all three in one sentence
print(...)`,
      solution: `product = "Coffee Mug"
price = 9.99
in_stock = True
print(product, "costs", price, "- in stock:", in_stock)`,
    },
    quiz: [
      {
        question: "What does age = 30 actually do?",
        options: [
          "Checks if age equals 30",
          "Stores the value 30 in a variable named age",
          "Prints 30 to the screen",
          "Creates a permanent constant",
        ],
        answerIndex: 1,
        explanation:
          "A single = is assignment: put the value on the right into the box named on the left. It does not check equality.",
      },
      {
        question: "What type is the value \"5.8\" (with quotes)?",
        options: ["A float", "An int", "A string", "A boolean"],
        answerIndex: 2,
        explanation:
          "Quotes make it text (a string), even though it looks like a number. Without quotes, 5.8 would be a float.",
      },
      {
        question: "What is \"2\" + \"2\" in Python?",
        options: ["4", "\"22\"", "An error", "2.2"],
        answerIndex: 1,
        explanation:
          "Adding two strings glues them together, giving \"22\". Only numbers get mathematically added.",
      },
    ],
    flashcards: [
      { front: "Variable", back: "A named box that stores a value so the computer can remember and reuse it." },
      { front: "String", back: "Text, written inside quotes, e.g. \"Maria\"." },
      { front: "int vs float", back: "int is a whole number (30); float has a decimal point (5.8)." },
      { front: "Boolean", back: "A True or False value used for yes/no answers." },
    ],
    industryUse: [
      "Every app at every company uses variables to hold user data like names and prices",
      "Banks store account balances in variables before saving them to a database",
      "Games track score, health, and position as variables that change each frame",
    ],
    commonMistakes: [
      "Confusing = (assign) with == (compare). One value: use =. Checking equality: use ==.",
      "Putting numbers in quotes by accident, then wondering why maths gives glued text.",
      "Using vague names like x and data2 that mean nothing when you return a week later.",
    ],
    interviewQuestions: [
      "What is the difference between an int, a float, and a string?",
      "What does the = sign do in Python?",
      "How would you check what type a variable holds?",
    ],
    papers: [],
    nextUp: ["strings-numbers", "if-else"],
    cheatsheet: [
      "name = value  ->  store value in a box",
      "Types: str (text), int (whole), float (decimal), bool (True/False)",
      "type(x) tells you what x is",
      "= assigns, == compares",
      "Names: lowercase_with_underscores",
    ],
  },

  "strings-numbers": {
    story:
      "You're addressing 200 wedding invitations. Writing 'Dear ______, ' 200 times is madness — you want a stamp that leaves a blank you fill per guest. In Python, text is a string, and an f-string is exactly that stamp: `f\"Dear {name},\"` prints 'Dear Alex,' or 'Dear Priya,' depending on what's in the box called name. Meanwhile numbers do real arithmetic — `total = price * quantity` — so a receipt calculates itself. Strings hold your words; numbers do your maths; and Python has quick tools to shape both.",
    problem:
      "Real programs constantly mash text and numbers together: 'Your total is $42.50', 'Hi Sam, you have 3 messages'. Doing that by hand is fiddly and error-prone — you need clean ways to join text, insert values, and calculate reliably without the pieces fighting each other.",
    analogy:
      "An f-string is a fill-in-the-blank form letter: you write the sentence once with slots, and Python drops the right value into each slot every time.",
    explanation: [
      "Strings are text in quotes. Join them by 'gluing' with `+` (`\"Hello \" + name`) or, far more cleanly, with an f-string: put an `f` before the quote and wrap variables in `{ }`: `f\"Hello {name}\"`.",
      "Strings have handy tools called methods: `name.upper()` shouts it, `name.lower()` whispers it, `name.strip()` trims stray spaces, and `len(name)` counts the characters.",
      "Numbers do maths with `+ - * /`. There are two extras beginners love: `**` is 'to the power of' (`2 ** 3` is 8), and `%` is the remainder (`7 % 2` is 1) — great for 'is this even?' checks.",
      "`/` always gives a decimal (`10 / 4` is 2.5). Use `//` for whole-number division (`10 // 4` is 2) when you don't want the fraction.",
      "Text and numbers don't mix directly: `\"Age: \" + 30` errors. Convert first with `str(30)`, or just use an f-string which converts for you.",
      "Going the other way, `int(\"30\")` and `float(\"5.8\")` turn text into numbers — essential when reading input, which always arrives as text.",
    ],
    code: {
      language: "python",
      source: `name = "priya"
price = 4.5
quantity = 3

total = price * quantity            # 13.5
greeting = f"Hi {name.title()}!"    # Hi Priya!

print(greeting)
print(f"You bought {quantity} coffees for $" + str(total))
print(f"That's \${total / quantity} each")
print("Is quantity even?", quantity % 2 == 0)`,
      explanation:
        "f-strings drop variables straight into text with { }. Methods like .title() reshape strings, and % checks the remainder to test even/odd.",
    },
    exercise: {
      prompt: "Build a receipt line: given an item, its price, and how many, print 'Total for 3 x Mug: $27.00'.",
      starter: `item = "Mug"
price = 9.0
qty = 3
# TODO: compute total and print the receipt line with an f-string
total = ...
print(...)`,
      solution: `item = "Mug"
price = 9.0
qty = 3
total = price * qty
print(f"Total for {qty} x {item}: \${total}")`,
    },
    quiz: [
      {
        question: "What does f\"Hi {name}\" do when name is \"Sam\"?",
        options: [
          "Prints the literal text Hi {name}",
          "Produces the text Hi Sam",
          "Causes an error",
          "Prints Hi f",
        ],
        answerIndex: 1,
        explanation:
          "An f-string replaces {name} with the value in the variable, giving Hi Sam.",
      },
      {
        question: "What is 7 % 2?",
        options: ["3.5", "1", "14", "2"],
        answerIndex: 1,
        explanation:
          "% is the remainder after division. 7 divided by 2 is 3 with a remainder of 1.",
      },
      {
        question: "Why does \"Age: \" + 30 fail?",
        options: [
          "30 is too big",
          "You can't glue text and a number directly — convert with str(30)",
          "Age is a reserved word",
          "It needs an f before the quote",
        ],
        answerIndex: 1,
        explanation:
          "Python won't add a string and a number. Convert the number to text with str(), or use an f-string.",
      },
    ],
    flashcards: [
      { front: "f-string", back: "Text with an f before the quote where {variable} gets replaced by its value." },
      { front: ".upper() / .lower()", back: "String methods that return the text in all caps or all lowercase." },
      { front: "% (modulo)", back: "The remainder after division; x % 2 == 0 tests if x is even." },
      { front: "str() / int()", back: "Convert between text and numbers: str(30) -> \"30\", int(\"30\") -> 30." },
    ],
    industryUse: [
      "Amazon builds order confirmation emails by inserting names and totals into text templates",
      "Uber formats fares and ETAs into strings shown in the app",
      "Any billing system uses number maths to compute totals, taxes, and discounts",
    ],
    commonMistakes: [
      "Forgetting the f before the quote — {name} then prints literally instead of the value.",
      "Trying to add text and numbers directly; wrap the number in str() or use an f-string.",
      "Assuming / gives a whole number — it always returns a decimal; use // for whole division.",
    ],
    interviewQuestions: [
      "What is an f-string and why is it preferred over gluing strings with +?",
      "What is the difference between / and // in Python?",
      "How do you convert the text \"42\" into a number you can do maths with?",
    ],
    papers: [],
    nextUp: ["if-else", "variables-types"],
    cheatsheet: [
      "f\"Hi {name}\" inserts variables into text",
      "Methods: .upper() .lower() .strip() .title()  len(s) counts chars",
      "Maths: + - * /  ** (power)  % (remainder)  // (whole divide)",
      "str(30) -> text,  int(\"30\") -> number",
      "x % 2 == 0  checks if x is even",
    ],
  },

  "if-else": {
    story:
      "Every morning your brain runs a tiny program: 'If it's raining, take an umbrella; otherwise, leave it.' You check a condition, and the answer decides what you do. Code does the same with `if` and `else`. You write `if raining: take_umbrella()` and the computer only runs that line when the condition is true. This one idea — letting the program choose a path based on what's happening — is what turns a rigid list of steps into something that actually reacts to the situation.",
    problem:
      "A program that does the same thing no matter what is useless for real life. You need it to behave differently depending on the data: greet members but upsell guests, approve small orders but flag huge ones, warn when a password is too short. Decisions are how a program adapts.",
    analogy:
      "if/else is a fork in the road with a signpost: read the sign (the condition), and take the left path if it's true, the right path if it's false.",
    explanation: [
      "An `if` runs its indented block ONLY when the condition is true. The condition is a yes/no question that evaluates to True or False, like `age >= 18`.",
      "Add `else` for the 'otherwise' path. Add `elif` (else-if) in between to check more cases in order: Python takes the FIRST one that's true and skips the rest.",
      "Comparisons build conditions: `==` (equal), `!=` (not equal), `<`, `>`, `<=`, `>=`. Note `==` compares while a single `=` assigns — mixing them up is the classic beginner slip.",
      "Combine conditions with `and` (both must be true), `or` (at least one true), and `not` (flips true/false). Example: `age >= 18 and has_ticket`.",
      "Indentation is not decoration in Python — it's the grammar. Everything indented under an `if` belongs to it. Get the spacing wrong and the meaning changes or the program errors.",
      "Use if/else whenever the program should branch. Don't stack ten `elif`s when a lookup table or a loop would be cleaner — but for a handful of cases, if/else is perfect and readable.",
    ],
    code: {
      language: "python",
      source: `age = 17
has_ticket = True

if age >= 18 and has_ticket:
    print("Welcome to the show!")
elif age < 18:
    print("Sorry, you must be 18 or older.")
else:
    print("Please buy a ticket first.")

# A quick even/odd decision
number = 42
if number % 2 == 0:
    print(f"{number} is even")
else:
    print(f"{number} is odd")`,
      explanation:
        "Python checks conditions top to bottom and runs the first true block. The indented lines under each branch are what run for that case.",
    },
    exercise: {
      prompt: "Grade a score: 90+ is 'A', 70+ is 'B', otherwise 'C'. Print the grade for score = 85.",
      starter: `score = 85
# TODO: use if / elif / else to print the grade
if ...:
    print("A")
`,
      solution: `score = 85
if score >= 90:
    print("A")
elif score >= 70:
    print("B")
else:
    print("C")`,
    },
    quiz: [
      {
        question: "Which runs the block only when BOTH conditions are true?",
        options: ["or", "and", "not", "=="],
        answerIndex: 1,
        explanation:
          "and requires every condition to be true. or needs just one; not flips a single condition.",
      },
      {
        question: "What's wrong with  if age = 18:  ?",
        options: [
          "Nothing, it's fine",
          "It should use == to compare, not = which assigns",
          "age must be in quotes",
          "It needs an else",
        ],
        answerIndex: 1,
        explanation:
          "A single = tries to assign, which isn't allowed in a condition. Use == to compare.",
      },
      {
        question: "In an if/elif/else chain, how many branches run?",
        options: [
          "All of them, top to bottom",
          "Only the first one whose condition is true",
          "The last one only",
          "None unless you use and",
        ],
        answerIndex: 1,
        explanation:
          "Python runs the first true branch and skips the rest. If none are true, else runs (if present).",
      },
    ],
    flashcards: [
      { front: "if / elif / else", back: "Run a block based on a condition; elif adds more cases, else is the fallback." },
      { front: "== vs =", back: "== compares two values; a single = assigns a value to a variable." },
      { front: "and / or / not", back: "Combine conditions: and needs all true, or needs one, not flips true/false." },
      { front: "Indentation", back: "The spacing under an if that marks which lines belong to that branch — required in Python." },
    ],
    miniProject: {
      title: "Ticket Machine",
      brief: "Write a program that decides a cinema ticket price from the customer's age.",
      steps: [
        "Store an age in a variable.",
        "Under 5: free. Under 18: child price. 65+: senior price. Otherwise: adult price.",
        "Use if / elif / else to pick the right price.",
        "Print a friendly message with the price using an f-string.",
      ],
    },
    industryUse: [
      "Banks use if/else rules to approve or flag transactions by amount and location",
      "Netflix decides which homepage row to show based on your watch history",
      "Every login form checks 'if password is correct' before letting you in",
    ],
    commonMistakes: [
      "Writing = instead of == in a condition — assignment vs comparison.",
      "Inconsistent indentation, which either errors or silently changes which lines belong to the if.",
      "Chaining separate ifs when you meant elif, causing multiple branches to run.",
    ],
    interviewQuestions: [
      "What is the difference between if/elif/else and several separate if statements?",
      "Explain the difference between and, or, and not with an example.",
      "Why does indentation matter in Python control flow?",
    ],
    papers: [],
    nextUp: ["loops", "functions"],
    cheatsheet: [
      "if condition:  (indented block runs when true)",
      "elif other:  else:  for more cases and a fallback",
      "Compare: == != < > <= >=",
      "Combine: and  or  not",
      "== compares, = assigns — don't swap them",
    ],
  },

  "loops": {
    story:
      "You have a stack of 100 envelopes to stamp. You don't write 'stamp this one' a hundred times — you say 'for each envelope in the stack, stamp it,' and you keep going until the stack is empty. That's a loop. In Python, `for name in guests: print(name)` does something once for every item in a list, no copy-paste required. Loops are how a five-line program handles ten items or ten million — the computer just keeps repeating the steps until the work is done.",
    problem:
      "The whole point of computers is doing repetitive work for us. Without loops you'd copy-paste the same lines for every customer, every row, every file — unmaintainable and impossible for large amounts. Loops let you write the steps once and run them as many times as needed.",
    analogy:
      "A loop is an assembly line: the same station repeats the same action on each item that comes down the belt, until there are no items left.",
    explanation: [
      "A `for` loop walks through a collection one item at a time: `for guest in guests:` gives you each guest in turn, and the indented block runs once per item.",
      "`range(n)` gives you the numbers 0 up to n-1 — perfect when you just want to repeat something n times: `for i in range(5):` runs five times.",
      "A `while` loop repeats AS LONG AS a condition stays true: `while lives > 0:`. Use it when you don't know the count in advance (waiting for correct input, a game running until you lose).",
      "`break` jumps out of a loop immediately (found what you wanted, stop). `continue` skips the rest of THIS turn and moves to the next item (skip the ones you don't care about).",
      "Beware the infinite loop: a `while` whose condition never becomes false runs forever. Always make sure something inside the loop moves toward stopping it.",
      "Reach for `for` when you have a known collection or count; reach for `while` when you're waiting for a condition to change. Both save you from endless copy-paste.",
    ],
    code: {
      language: "python",
      source: `guests = ["Ava", "Ben", "Cara"]
for guest in guests:
    print(f"Welcome, {guest}!")

# Repeat something 3 times
for i in range(3):
    print("Ping", i)

# Keep going until a condition changes
lives = 3
while lives > 0:
    print(f"Lives left: {lives}")
    lives = lives - 1
print("Game over")`,
      explanation:
        "The for loop runs once per guest and once per number in range. The while loop repeats until lives hits 0, decreasing each pass so it eventually stops.",
    },
    exercise: {
      prompt: "Add up the numbers 1 to 10 using a loop and print the total (should be 55).",
      starter: `total = 0
# TODO: loop over the numbers 1 through 10 and add each to total
for n in range(...):
    ...
print(total)`,
      solution: `total = 0
for n in range(1, 11):
    total = total + n
print(total)`,
    },
    quiz: [
      {
        question: "What does range(3) produce?",
        options: ["1, 2, 3", "0, 1, 2", "0, 1, 2, 3", "3 only"],
        answerIndex: 1,
        explanation:
          "range(3) gives 0, 1, 2 — it starts at 0 and stops before the number you give.",
      },
      {
        question: "When should you use a while loop instead of a for loop?",
        options: [
          "When you know exactly how many times to repeat",
          "When you loop over a list",
          "When you repeat until a condition changes and don't know the count",
          "Never — while loops are obsolete",
        ],
        answerIndex: 2,
        explanation:
          "while is for 'keep going until something changes' — the number of repeats isn't known ahead of time.",
      },
      {
        question: "What does break do inside a loop?",
        options: [
          "Skips to the next item",
          "Pauses the program",
          "Exits the loop immediately",
          "Restarts the loop",
        ],
        answerIndex: 2,
        explanation:
          "break stops the loop entirely. continue is the one that skips to the next item.",
      },
    ],
    flashcards: [
      { front: "for loop", back: "Runs a block once for each item in a collection or number in a range." },
      { front: "range(n)", back: "Produces the numbers 0 up to n-1, useful for repeating n times." },
      { front: "while loop", back: "Repeats a block as long as a condition stays true." },
      { front: "break / continue", back: "break exits the loop now; continue skips to the next iteration." },
    ],
    miniProject: {
      title: "Multiplication Table Printer",
      brief: "Print a clean times-table for any number the way flashcards look.",
      steps: [
        "Pick a number, say 7, in a variable.",
        "Loop from 1 to 10 with range.",
        "For each i, print a line like '7 x 3 = 21' using an f-string.",
        "Bonus: wrap it in another loop to print tables for 1 through 5.",
      ],
    },
    industryUse: [
      "Spotify loops over your listening history to build a Discover Weekly playlist",
      "Airlines loop through thousands of flights to find and price the cheapest route",
      "Any report tool loops over spreadsheet rows to total sales and spot outliers",
    ],
    commonMistakes: [
      "Off-by-one errors: range(1, 10) stops at 9, not 10 — the end is excluded.",
      "Creating an infinite while loop by forgetting to change the condition inside it.",
      "Modifying the list you're looping over, which can skip or repeat items unexpectedly.",
    ],
    interviewQuestions: [
      "What's the difference between a for loop and a while loop?",
      "What does range(2, 10, 2) produce, and what do the three numbers mean?",
      "How do break and continue differ?",
    ],
    papers: [],
    nextUp: ["functions", "lists-dicts"],
    cheatsheet: [
      "for item in collection:  runs once per item",
      "range(n) -> 0..n-1;  range(a, b) -> a..b-1",
      "while condition:  repeats until condition is false",
      "break exits the loop; continue skips to next item",
      "Always ensure a while loop can eventually stop",
    ],
  },

  "functions": {
    story:
      "Your favourite recipe card says 'make pancake batter': you follow it Sunday, and again next Sunday, without re-deriving it each time. You just say 'make the batter' and trust the steps. A function is a recipe card for code: you write the steps once, give them a name, and then 'call' that name whenever you need the work done. Write `def greet(name):` once, and forever after `greet(\"Sam\")` does the whole greeting — no copy-paste, and if you improve the recipe, every use gets better at once.",
    problem:
      "As programs grow, the same chunk of logic shows up again and again — formatting a price, validating an email, calculating a total. Copy-pasting it means bugs multiply and fixes must be made in ten places. Functions let you name a piece of work once and reuse it everywhere, keeping code short, clear, and easy to fix.",
    analogy:
      "A function is a coffee machine: you put in beans and water (the inputs), press one button (call it), and get coffee out (the return value) — without caring how the internals work each time.",
    explanation: [
      "You define a function with `def name(inputs):` followed by an indented block. Nothing runs yet — you've just written the recipe. It runs only when you CALL it: `name(values)`.",
      "The inputs in the brackets are called parameters — placeholders the function fills in with whatever you pass. `def greet(name):` means 'give me a name and I'll use it as `name` inside.'",
      "`return` hands a result back to whoever called the function, so you can store or reuse it: `total = add(2, 3)`. Without `return`, the function does its work but gives nothing back.",
      "Variables created inside a function are local — they live and die inside it. This keeps functions self-contained and stops them stepping on each other's toes.",
      "Give parameters default values with `=` so callers can skip them: `def greet(name, greeting=\"Hi\"):` lets you call `greet(\"Sam\")` or `greet(\"Sam\", \"Hello\")`.",
      "Good functions do ONE clear thing and have a descriptive name. If you can't name it simply, it's probably doing too much — split it up.",
    ],
    code: {
      language: "python",
      source: `def greet(name, greeting="Hi"):
    return f"{greeting}, {name}!"

def total_price(price, quantity):
    return price * quantity

# Call them — the recipes run now
print(greet("Sam"))                 # Hi, Sam!
print(greet("Sam", "Welcome"))      # Welcome, Sam!

bill = total_price(4.5, 3)
print(f"Your bill is $" + str(bill))`,
      explanation:
        "def writes the recipe; calling it runs it. return hands back a value you can store, and a default lets you skip an argument.",
    },
    exercise: {
      prompt: "Write a function is_even(n) that returns True if n is even, False otherwise. Test it on 4 and 7.",
      starter: `def is_even(n):
    # TODO: return True if n is even
    return ...

print(is_even(4))   # should be True
print(is_even(7))   # should be False`,
      solution: `def is_even(n):
    return n % 2 == 0

print(is_even(4))
print(is_even(7))`,
    },
    quiz: [
      {
        question: "What does return do in a function?",
        options: [
          "Prints the result to the screen",
          "Hands a value back to the caller so it can be stored or reused",
          "Ends the whole program",
          "Loops the function",
        ],
        answerIndex: 1,
        explanation:
          "return passes a result out of the function. print only displays; it doesn't give a value back to the code.",
      },
      {
        question: "In def greet(name):, what is name?",
        options: [
          "A global variable",
          "A parameter — a placeholder filled in when you call the function",
          "The function's return value",
          "A built-in command",
        ],
        answerIndex: 1,
        explanation:
          "name is a parameter: it stands in for whatever value you pass when you call greet(...).",
      },
      {
        question: "When does the code inside a function run?",
        options: [
          "As soon as you define it with def",
          "Only when you call the function",
          "Automatically at the end of the program",
          "Never — functions are just documentation",
        ],
        answerIndex: 1,
        explanation:
          "Defining with def only stores the recipe. It runs when you call it by name.",
      },
    ],
    flashcards: [
      { front: "def", back: "The keyword that defines (writes) a function — its recipe of steps." },
      { front: "Parameter vs argument", back: "A parameter is the placeholder in the definition; an argument is the actual value you pass in." },
      { front: "return", back: "Hands a result back to the caller so it can be stored or reused." },
      { front: "Default value", back: "A parameter fallback (greeting=\"Hi\") used when the caller doesn't supply one." },
    ],
    miniProject: {
      title: "Tip Calculator Function",
      brief: "Build a reusable function that splits a restaurant bill with tip.",
      steps: [
        "Write split_bill(total, people, tip_percent=15).",
        "Inside, add the tip to the total, then divide by the number of people.",
        "return the amount each person owes.",
        "Call it a few times with different parties and print the results.",
      ],
    },
    industryUse: [
      "Google reuses one search-ranking function across billions of queries",
      "PayPal wraps 'validate and process payment' in functions reused across every checkout",
      "Data teams write one clean-the-data function and apply it to every incoming file",
    ],
    commonMistakes: [
      "Forgetting to call the function — defining it does nothing until you invoke it.",
      "Using print when you meant return, so the value can't be stored or reused.",
      "Writing giant functions that do five things; keep each one focused on a single job.",
    ],
    interviewQuestions: [
      "What is the difference between a parameter and an argument?",
      "What is the difference between print and return?",
      "What does it mean for a variable to be local to a function?",
    ],
    papers: [],
    nextUp: ["lists-dicts", "if-else"],
    cheatsheet: [
      "def name(params):  writes the recipe",
      "Call it: name(args)  runs the recipe",
      "return value  hands a result back",
      "param=default  makes an argument optional",
      "One function = one clear job with a clear name",
    ],
  },

  "lists-dicts": {
    story:
      "You need to hold your weekly shopping. You could make 20 separate variables — item1, item2, item3 — and lose your mind. Instead you grab one basket and toss everything in: that's a list, `shopping = [\"milk\", \"eggs\", \"bread\"]`, one name holding many items in order. But sometimes order isn't enough — you want to look things up by name, like a phone book: 'what's Ana's number?' That's a dictionary, `phones = {\"Ana\": \"555-1234\"}`, pairing each key with a value. Lists and dictionaries are how real programs store collections of stuff.",
    problem:
      "Single variables hold one thing. Real data comes in bunches — all the users, every product, each score. You need containers that group related items together, let you add and remove them, and let you find what you want fast. Lists and dictionaries are the two workhorses that do this.",
    analogy:
      "A list is a numbered row of lockers (locker 0, 1, 2…), great when order matters. A dictionary is a coat check: you hand over a ticket (the key) and get back your exact coat (the value).",
    explanation: [
      "A list is an ordered collection in square brackets: `[\"milk\", \"eggs\"]`. You reach items by position, starting at 0: `shopping[0]` is the first item, `shopping[-1]` is the last.",
      "Lists grow and shrink: `.append(x)` adds to the end, `.remove(x)` deletes an item, `len(list)` counts them, and `for item in list:` walks through every one.",
      "A dictionary stores key-value pairs in curly braces: `{\"Ana\": \"555-1234\"}`. You look up by key, not position: `phones[\"Ana\"]` returns the number instantly, no scanning required.",
      "Change a dict by assigning: `phones[\"Bob\"] = \"555-9999\"` adds or updates. Loop with `for name, number in phones.items():` to visit every pair.",
      "Use a list when order matters and items are a sequence of the same kind of thing (a queue, a playlist). Use a dict when you want to fetch by a meaningful name (a user by ID, a setting by its name).",
      "A set is a third container — like a list but with NO duplicates and no order: `{1, 2, 3}`. Perfect for 'unique things only' and lightning-fast 'is this in here?' checks.",
    ],
    code: {
      language: "python",
      source: `# A list: ordered, reachable by position
shopping = ["milk", "eggs", "bread"]
shopping.append("coffee")
print("First item:", shopping[0])
print("How many:", len(shopping))

# A dictionary: look up by key
phones = {"Ana": "555-1234", "Bob": "555-9999"}
print("Ana's number:", phones["Ana"])
phones["Cara"] = "555-4321"          # add a new pair

for name, number in phones.items():
    print(f"{name}: {number}")

# A set: unique values only
unique_visitors = {"ana", "bob", "ana"}
print("Unique visitors:", len(unique_visitors))   # 2`,
      explanation:
        "Lists index by position and grow with .append. Dicts fetch by key instantly. Sets automatically drop duplicates.",
    },
    exercise: {
      prompt: "Build a dictionary of three products to prices, then print the price of one and add a fourth product.",
      starter: `prices = {"apple": 0.5, "banana": 0.3, "cherry": 2.0}
# TODO: print the price of banana
print(...)
# TODO: add "date" costing 3.5
...`,
      solution: `prices = {"apple": 0.5, "banana": 0.3, "cherry": 2.0}
print(prices["banana"])
prices["date"] = 3.5
print(prices)`,
    },
    quiz: [
      {
        question: "What is shopping[0] if shopping = [\"milk\", \"eggs\"]?",
        options: ["eggs", "milk", "An error", "0"],
        answerIndex: 1,
        explanation:
          "Lists start counting at 0, so index 0 is the first item, \"milk\".",
      },
      {
        question: "When is a dictionary a better choice than a list?",
        options: [
          "When order is the only thing that matters",
          "When you want to look items up by a meaningful key like a name or ID",
          "When you never add or remove items",
          "Dictionaries are always worse than lists",
        ],
        answerIndex: 1,
        explanation:
          "Dicts shine when you fetch by a meaningful key. Lists are better for ordered sequences.",
      },
      {
        question: "What makes a set different from a list?",
        options: [
          "Sets are ordered and allow duplicates",
          "Sets keep no duplicates and have no fixed order",
          "Sets can only hold numbers",
          "Sets can't be looped over",
        ],
        answerIndex: 1,
        explanation:
          "A set automatically removes duplicates and doesn't track position.",
      },
    ],
    flashcards: [
      { front: "List", back: "An ordered collection in [ ]; access items by position starting at 0." },
      { front: ".append() / .remove()", back: "List methods to add an item to the end or delete an item." },
      { front: "Dictionary", back: "Key-value pairs in { }; look up a value by its key, e.g. phones[\"Ana\"]." },
      { front: "Set", back: "An unordered collection with no duplicates, written in { }." },
    ],
    miniProject: {
      title: "Contact Book",
      brief: "Build a tiny contact book using a dictionary of names to phone numbers.",
      steps: [
        "Start with a dict holding three contacts.",
        "Add a function add_contact(book, name, number).",
        "Add a function look_up(book, name) that returns the number or a 'not found' message.",
        "Loop over the whole book and print every contact neatly.",
      ],
    },
    industryUse: [
      "Twitter/X stores your timeline as a list and each tweet's data as a dictionary",
      "Amazon uses dictionaries to map product IDs straight to product details",
      "Analytics tools use sets to count unique visitors without double-counting",
    ],
    commonMistakes: [
      "Forgetting lists start at 0, so the third item is index 2, not 3.",
      "Looking up a missing dictionary key, which errors — use .get(key) for a safe default.",
      "Expecting a set to keep order or duplicates; it does neither.",
    ],
    interviewQuestions: [
      "When would you choose a dictionary over a list?",
      "How do you safely get a value from a dictionary when the key might not exist?",
      "What is a set and what problem does it solve?",
    ],
    papers: [],
    nextUp: ["files-errors", "loops"],
    cheatsheet: [
      "List: [\"a\", \"b\"]  index from 0,  list[-1] is last",
      ".append(x)  .remove(x)  len(list)",
      "Dict: {\"key\": value}  fetch with d[\"key\"]",
      "d.get(key, default) avoids missing-key errors",
      "Set: {1, 2, 3}  unique, unordered",
    ],
  },

  "files-errors": {
    story:
      "You type a beautiful to-do list, close the program, reopen it — and it's gone. Everything a program holds in variables vanishes the moment it stops, like writing on a whiteboard that wipes itself. To keep anything, you save it to a FILE on disk, the program's long-term memory. And because the real world is messy — the file might be missing, the number might not be a number — you also learn to handle errors gracefully so one hiccup doesn't crash everything. Files give memory; error handling gives resilience.",
    problem:
      "Variables live only while the program runs. To remember data between sessions — a saved game, a config, a log — you must read and write files. And any program touching the outside world (files, user input, the internet) will eventually hit something unexpected. Without error handling, that surprise crashes the whole program.",
    analogy:
      "A file is a filing cabinet: the program writes notes into it and can pull them out later, even after it's shut down. Error handling is a safety net under a tightrope — you plan for the fall so a slip doesn't end the show.",
    explanation: [
      "Open a file with `with open(\"notes.txt\", \"w\") as f:` — the `with` block closes the file for you automatically when done, so you never leak it. `\"w\"` means write (overwrites), `\"a\"` means append (adds), `\"r\"` means read.",
      "Write with `f.write(\"text\\n\")` (the `\\n` is a newline). Read it all back with `f.read()`, or loop line by line with `for line in f:` — the friendliest way to process a file.",
      "Things go wrong: opening a missing file, dividing by zero, turning \"hello\" into a number. These raise errors (called exceptions) that stop the program unless you catch them.",
      "Wrap risky code in `try:` and catch trouble in `except:`. Python runs the `try` block; if an error pops up, it jumps to `except` instead of crashing, so you can show a friendly message or recover.",
      "Catch SPECIFIC errors when you can — `except FileNotFoundError:` or `except ValueError:` — so you only handle what you expect and don't accidentally hide real bugs.",
      "Add `finally:` for cleanup that must always run (closing things, saving), and `else:` for code that runs only if no error occurred. Use error handling around the outside world, not around your own logic bugs.",
    ],
    code: {
      language: "python",
      source: `# Write some lines to a file (auto-closed by 'with')
with open("notes.txt", "w") as f:
    f.write("Buy milk\\n")
    f.write("Call Ana\\n")

# Read them back, line by line
with open("notes.txt", "r") as f:
    for line in f:
        print("Note:", line.strip())

# Handle something that might fail
try:
    age = int(input("Your age: "))
    print(f"Next year you'll be {age + 1}")
except ValueError:
    print("That wasn't a whole number!")`,
      explanation:
        "with open safely writes then reads the file. The try/except catches a bad number instead of crashing the program.",
    },
    exercise: {
      prompt: "Safely divide two numbers: catch division by zero and print a friendly message instead of crashing.",
      starter: `def safe_divide(a, b):
    # TODO: try to return a / b, but catch division by zero
    try:
        ...
    except ...:
        return "Can't divide by zero!"

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
      solution: `def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        return "Can't divide by zero!"

print(safe_divide(10, 2))
print(safe_divide(10, 0))`,
    },
    quiz: [
      {
        question: "Why use  with open(...) as f:  instead of a plain open?",
        options: [
          "It's faster",
          "It automatically closes the file when the block ends",
          "It's the only way to read files",
          "It encrypts the file",
        ],
        answerIndex: 1,
        explanation:
          "The with block guarantees the file is closed for you, even if an error happens — no leaks.",
      },
      {
        question: "What does the mode \"w\" do when opening a file?",
        options: [
          "Reads the file",
          "Appends to the end of the file",
          "Opens for writing, overwriting existing contents",
          "Deletes the file",
        ],
        answerIndex: 2,
        explanation:
          "\"w\" writes and overwrites. Use \"a\" to add to the end, \"r\" to read.",
      },
      {
        question: "What happens when code inside try: raises an error?",
        options: [
          "The program always crashes",
          "Python jumps to the matching except block instead of crashing",
          "The error is ignored silently",
          "The try block runs again",
        ],
        answerIndex: 1,
        explanation:
          "A raised error inside try hands control to the matching except, letting you recover gracefully.",
      },
    ],
    flashcards: [
      { front: "with open(...)", back: "Opens a file and automatically closes it when the block ends." },
      { front: "File modes", back: "\"r\" read, \"w\" write (overwrite), \"a\" append (add to end)." },
      { front: "Exception", back: "An error raised at runtime (missing file, bad conversion) that stops the program unless caught." },
      { front: "try / except", back: "Run risky code in try; if it errors, handle it in except instead of crashing." },
    ],
    miniProject: {
      title: "Persistent Notes App",
      brief: "A tiny program that remembers your notes across runs by saving to a file.",
      steps: [
        "On start, read notes.txt if it exists (catch FileNotFoundError for the first run).",
        "Print the existing notes.",
        "Ask the user for a new note and append it with \"a\" mode.",
        "Wrap the input handling in try/except so bad input never crashes the app.",
      ],
    },
    industryUse: [
      "Every app writes logs to files so engineers can debug what happened",
      "Banks and airlines wrap payment and booking code in try/except to fail gracefully under load",
      "Config files (settings, credentials) are read from disk at startup by nearly every program",
    ],
    commonMistakes: [
      "Forgetting the \\n newline, so all your written lines run together into one.",
      "Catching every error with a bare except, which hides real bugs — catch specific types.",
      "Using \"w\" when you meant \"a\", silently wiping the file you wanted to add to.",
    ],
    interviewQuestions: [
      "What is the benefit of using 'with open(...)' over calling open and close yourself?",
      "What is the difference between the file modes 'w', 'a', and 'r'?",
      "Why is it better to catch a specific exception than to use a bare except?",
    ],
    papers: [],
    nextUp: ["oop-basics", "cli-project"],
    cheatsheet: [
      "with open(\"f.txt\", \"w\") as f:  auto-closes",
      "Modes: r read, w overwrite, a append",
      "f.write(\"line\\n\")  /  for line in f: line.strip()",
      "try: risky code  except SpecificError: handle it",
      "finally: always runs (cleanup)",
    ],
  },

  "oop-basics": {
    story:
      "A cookie cutter isn't a cookie — it's the shape that stamps out as many cookies as you like, each identical in form but able to have its own sprinkles. In code, a class is the cookie cutter and an object is a cookie made from it. You define a `Dog` class once, describing what every dog HAS (a name, an age) and what every dog can DO (bark). Then you stamp out real dogs: `rex = Dog(\"Rex\", 3)`, `bella = Dog(\"Bella\", 5)` — same blueprint, different details. This is object-oriented programming: bundling data and the actions on that data into neat, reusable packages.",
    problem:
      "As programs grow, related data and the functions that act on it drift apart — a user's name here, a function to greet them there, their email somewhere else. It becomes a tangle. Classes bundle the data and its behaviour together into one tidy thing you can create many copies of, so your code mirrors the real-world objects it models.",
    analogy:
      "A class is a blueprint for a house; an object is an actual house built from it. One blueprint, many houses — each with its own address and paint colour but the same fundamental design.",
    explanation: [
      "You define a class with `class Dog:` and describe its shape. An OBJECT (also called an instance) is a real thing made from that class: `rex = Dog(\"Rex\", 3)`.",
      "The special `__init__` method is the setup routine that runs the moment you create an object. It receives the details and stores them on the object: `self.name = name`.",
      "`self` means 'this particular object'. Inside the class, `self.name` is THIS dog's name, keeping each object's data separate from every other object's.",
      "Methods are just functions that live inside a class and can use the object's data: `def bark(self):` can read `self.name` to bark 'Rex says woof!'.",
      "Attributes are the data an object holds (name, age); methods are the things it can do (bark, feed). Together they bundle 'what it is' and 'what it can do' in one place.",
      "Reach for classes when you have many similar things each with their own state — users, products, game characters. For a quick one-off calculation, a plain function is simpler; don't force a class where none is needed.",
    ],
    code: {
      language: "python",
      source: `class Dog:
    def __init__(self, name, age):
        self.name = name        # this dog's own name
        self.age = age

    def bark(self):
        return f"{self.name} says woof!"

    def birthday(self):
        self.age = self.age + 1

# Stamp out two real dogs from the blueprint
rex = Dog("Rex", 3)
bella = Dog("Bella", 5)

print(rex.bark())               # Rex says woof!
rex.birthday()
print(f"{rex.name} is now {rex.age}")   # Rex is now 4`,
      explanation:
        "The class is the blueprint; rex and bella are separate objects with their own name and age. Methods like bark and birthday act on each object's own data via self.",
    },
    exercise: {
      prompt: "Create a BankAccount class with a balance, a deposit(amount) method, and a withdraw(amount) method.",
      starter: `class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        # TODO: add amount to the balance
        ...

    def withdraw(self, amount):
        # TODO: subtract amount from the balance
        ...

acct = BankAccount(100)
acct.deposit(50)
acct.withdraw(30)
print(acct.balance)   # should be 120`,
      solution: `class BankAccount:
    def __init__(self, balance=0):
        self.balance = balance

    def deposit(self, amount):
        self.balance = self.balance + amount

    def withdraw(self, amount):
        self.balance = self.balance - amount

acct = BankAccount(100)
acct.deposit(50)
acct.withdraw(30)
print(acct.balance)`,
    },
    quiz: [
      {
        question: "What is the relationship between a class and an object?",
        options: [
          "They're the same thing",
          "A class is a blueprint; an object is a real thing built from it",
          "An object is a blueprint; a class is built from it",
          "A class can only make one object",
        ],
        answerIndex: 1,
        explanation:
          "A class is the template (cookie cutter); objects are the instances (cookies) made from it.",
      },
      {
        question: "What does __init__ do?",
        options: [
          "Deletes the object",
          "Runs setup when a new object is created, storing its starting data",
          "Prints the object",
          "Loops over all objects",
        ],
        answerIndex: 1,
        explanation:
          "__init__ is the constructor: it runs at creation time and sets up the object's attributes.",
      },
      {
        question: "What does self refer to inside a class method?",
        options: [
          "The class itself",
          "This particular object the method is being called on",
          "A global variable",
          "The __init__ method",
        ],
        answerIndex: 1,
        explanation:
          "self is the specific object, so self.name is that one object's own name.",
      },
    ],
    flashcards: [
      { front: "Class", back: "A blueprint describing what objects of a type have (attributes) and can do (methods)." },
      { front: "Object / instance", back: "A concrete thing built from a class, with its own data." },
      { front: "__init__", back: "The setup method that runs when an object is created and stores its starting attributes." },
      { front: "self", back: "Refers to the specific object, letting methods read and change that object's own data." },
    ],
    miniProject: {
      title: "Library Book Tracker",
      brief: "Model books with a class so you can check them in and out.",
      steps: [
        "Write a Book class with title, author, and is_borrowed (default False).",
        "Add borrow() and return_book() methods that flip is_borrowed.",
        "Create a few Book objects and borrow some.",
        "Print each book's status with a method that returns a friendly sentence.",
      ],
    },
    industryUse: [
      "Game studios model every character, weapon, and enemy as objects from classes",
      "Django (used by Instagram, Pinterest) represents each database table as a Python class",
      "Banking systems model accounts and transactions as objects to keep data and rules together",
    ],
    commonMistakes: [
      "Forgetting self as the first parameter of every method, causing confusing errors.",
      "Forgetting to store data with self.x = x in __init__, so the object 'loses' its values.",
      "Building a class for a one-off task where a simple function would be clearer.",
    ],
    interviewQuestions: [
      "Explain the difference between a class and an object.",
      "What is the purpose of the __init__ method?",
      "What does self represent inside a method?",
    ],
    papers: [],
    nextUp: ["cli-project", "functions"],
    cheatsheet: [
      "class Name:  defines the blueprint",
      "__init__(self, ...) runs at creation; store data with self.x = ...",
      "obj = Name(args)  makes an object",
      "Methods take self first; call with obj.method()",
      "Attributes = data it holds; methods = things it does",
    ],
  },

  "cli-project": {
    story:
      "Now you put it all together and build something you'd actually use: a to-do list app that runs in the terminal. It shows your tasks, lets you add and finish them, and — crucially — remembers everything after you close it, because it saves to a file. There's nothing new to learn here; you already know variables, loops, if/else, functions, lists, files, and error handling. This lesson is where those pieces snap together into one real, working program. That feeling when it runs and your tasks are still there next time? That's you being a programmer.",
    problem:
      "Individual skills are like ingredients on a counter — impressive, but not yet dinner. Real programming is combining them into something that solves a whole task from start to finish: take input, store it, save it, handle mistakes, and present it cleanly. This project is that first full meal, cooked entirely by you.",
    analogy:
      "You've learned to chop, boil, and season separately. This is cooking the whole meal: every technique working together toward one plate you can actually serve.",
    explanation: [
      "Structure the app as a loop that shows a menu, reads the user's choice, and calls the right function — this 'menu loop' pattern is how most small CLI tools work.",
      "Store tasks in a list of dictionaries: each task is `{\"text\": \"Buy milk\", \"done\": False}`. The list holds order; each dict holds that task's own details.",
      "Give each action its own function: `add_task`, `list_tasks`, `complete_task`. Small, named functions keep the program readable and easy to fix.",
      "Persist to a file so tasks survive restarts: save the list on every change and load it on startup. A simple text file (one task per line) is plenty for a first version.",
      "Wrap user input in try/except: if someone types 'banana' where a number goes, show a friendly message and loop again instead of crashing.",
      "Ship the smallest version that works first (add + list), then grow it (complete, delete, save). Working-then-better beats perfect-but-unfinished every time.",
    ],
    code: {
      language: "python",
      source: `tasks = []   # each task: {"text": "...", "done": False}

def add_task(text):
    tasks.append({"text": text, "done": False})

def list_tasks():
    if not tasks:
        print("No tasks yet!")
    for i, task in enumerate(tasks):
        mark = "x" if task["done"] else " "
        print(f"{i}. [{mark}] {task['text']}")

def complete_task(i):
    try:
        tasks[i]["done"] = True
    except IndexError:
        print("No task with that number.")

add_task("Buy milk")
add_task("Call Ana")
complete_task(0)
list_tasks()`,
      explanation:
        "A list of dicts holds the tasks; each function does one job. enumerate gives both the position and the task, and try/except guards against a bad task number.",
    },
    exercise: {
      prompt: "Add a delete_task(i) function that safely removes the task at position i, guarding against a bad index.",
      starter: `def delete_task(i):
    # TODO: remove the task at index i, but handle a bad index
    try:
        ...
    except IndexError:
        print("No task with that number.")`,
      solution: `def delete_task(i):
    try:
        tasks.pop(i)
    except IndexError:
        print("No task with that number.")`,
    },
    quiz: [
      {
        question: "Why store each task as a dictionary like {\"text\": ..., \"done\": False}?",
        options: [
          "Dictionaries are the only container Python has",
          "It keeps each task's details bundled together under clear names",
          "It makes the program run faster",
          "You can't put tasks in a list",
        ],
        answerIndex: 1,
        explanation:
          "A dict bundles a task's text and status together with readable keys, and the list keeps all tasks in order.",
      },
      {
        question: "Why wrap user input in try/except in this app?",
        options: [
          "To make the code shorter",
          "So bad input (like letters where a number goes) shows a message instead of crashing",
          "It's required for all Python programs",
          "To speed up the loop",
        ],
        answerIndex: 1,
        explanation:
          "try/except catches predictable input errors so the app recovers gracefully instead of crashing.",
      },
      {
        question: "What's the smartest way to build this project?",
        options: [
          "Write all features at once, then run it",
          "Get the smallest version working (add + list), then grow it feature by feature",
          "Skip functions and put everything in one long block",
          "Never save to a file",
        ],
        answerIndex: 1,
        explanation:
          "Build the minimal working version first, then add features incrementally — it's easier to debug and stay motivated.",
      },
    ],
    flashcards: [
      { front: "Menu loop", back: "A while loop that shows options, reads a choice, and calls the matching function." },
      { front: "List of dicts", back: "A common pattern: a list holds many records, each a dictionary of that item's fields." },
      { front: "Persistence", back: "Saving data to a file so it survives after the program closes." },
      { front: "enumerate()", back: "Loops giving both the index and the item, e.g. for i, task in enumerate(tasks)." },
    ],
    miniProject: {
      title: "To-Do List CLI (Full Build)",
      brief: "Assemble everything into a working, file-backed to-do app you run in the terminal.",
      steps: [
        "Load tasks from tasks.txt on start (catch FileNotFoundError for the first run).",
        "Show a menu loop: 1 add, 2 list, 3 complete, 4 quit.",
        "Write add_task, list_tasks, complete_task, and save_tasks functions.",
        "Save to the file after every change so tasks persist across runs.",
        "Guard all input with try/except so nothing crashes the app.",
      ],
    },
    industryUse: [
      "Command-line tools like git and pip are, at heart, this same menu-and-action pattern",
      "Startups prototype internal tools as simple Python CLIs before building a full web app",
      "Data teams run daily jobs as CLI scripts that read input, process it, and save results to files",
    ],
    commonMistakes: [
      "Trying to build every feature before running anything — start small and test often.",
      "Forgetting to save after changes, so the file and the in-memory list drift apart.",
      "Letting one bad input crash the whole session instead of catching it and looping again.",
    ],
    interviewQuestions: [
      "Walk me through how you'd structure a simple command-line to-do app.",
      "How would you make the app remember tasks between runs?",
      "How do you keep a long-running CLI from crashing on bad user input?",
    ],
    papers: [],
    nextUp: ["files-errors", "oop-basics"],
    cheatsheet: [
      "Task = {\"text\": ..., \"done\": False}; tasks = list of them",
      "One function per action: add / list / complete / save",
      "Menu loop: show options -> read choice -> call function",
      "Save to a file on every change to persist",
      "Wrap input in try/except; build minimal first, then grow",
    ],
  },
};
