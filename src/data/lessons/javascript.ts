import type { LessonBody } from "@/types";

export const javascript: Record<string, LessonBody> = {
  "js-first": {
    story:
      "Open any website — your bank, YouTube, a news site — right now, press F12, and click the tab that says \"Console\". You just opened a tiny room where you can type commands and the web page will obey them instantly. Type 2 + 2 and press Enter: it answers 4. Type alert(\"hi\") and a little popup appears on the page. That console is JavaScript, and JavaScript is the only programming language built right into every web browser on Earth. Every button that reacts, every menu that slides open, every \"like\" that turns red — that is JavaScript running.",
    problem:
      "A plain web page (HTML) is like a printed poster: it just sits there. It can show words and pictures, but it can't count, decide, remember, or react when you click. To make a page do anything — respond to a click, check a password, update a total — something has to actually run instructions. JavaScript is that something.",
    analogy:
      "HTML is the body of the page and CSS is its clothes; JavaScript is the brain and muscles that let it move and react.",
    explanation: [
      "JavaScript is a language you write as plain text, and the browser reads it top to bottom and does what it says — no special software to install, it's already inside Chrome, Safari, Firefox and Edge.",
      "The Console (in the browser's Developer Tools, opened with F12) is your instant playground: type one line, press Enter, see the result immediately. It's the fastest way to learn.",
      "console.log(\"something\") is how you make JavaScript print a message into that console — it's the programmer's way of saying \"show me what's happening in here.\" You'll use it constantly to peek inside your code.",
      "Every statement usually ends with a semicolon ; — think of it as a full stop at the end of a sentence. JavaScript is often forgiving if you forget, but adding it is a tidy habit.",
      "You can write JavaScript straight in the console for quick experiments, or save it in a .js file that a web page loads — the language is identical either way.",
      "JavaScript runs the moment the page loads it, in order, one line after another. If a line has a typo, the console shows a red error message telling you the line and the problem — errors are helpful notes, not scary failures.",
    ],
    code: {
      language: "javascript",
      source: `// Anything after two slashes is a comment - JavaScript ignores it
console.log("Hello, world!");   // prints text to the console
console.log(2 + 2);             // prints 4
console.log("Rooms:", 3 + 1);   // you can mix text and maths

// This one pops up a box on the actual web page:
alert("You just ran JavaScript!");`,
      explanation:
        "console.log prints quietly into the developer console for you to read; alert interrupts the page with a popup. Run these in your browser console and watch each line respond instantly.",
    },
    exercise: {
      prompt: "Print a friendly greeting and then print the result of 7 times 6 on the next line.",
      starter: `// TODO: print "Hi there!" to the console
// TODO: on the next line, print the answer to 7 * 6
`,
      solution: `console.log("Hi there!");
console.log(7 * 6);`,
    },
    quiz: [
      {
        question: "What does console.log() do?",
        options: [
          "It deletes the web page",
          "It prints a message into the browser's developer console so you can see it",
          "It saves a file to your computer",
          "It sends an email",
        ],
        answerIndex: 1,
        explanation:
          "console.log is your window into the code — it shows values and messages in the console so you can see what your program is doing.",
      },
      {
        question: "Where is JavaScript already installed and ready to run?",
        options: [
          "Only on special coding computers",
          "Inside every modern web browser",
          "Only after you buy a licence",
          "Nowhere — you must build it yourself",
        ],
        answerIndex: 1,
        explanation:
          "Every modern browser (Chrome, Firefox, Safari, Edge) has JavaScript built in, which is why the web runs on it.",
      },
    ],
    flashcards: [
      { front: "JavaScript", back: "The programming language built into every web browser that makes pages interactive." },
      { front: "Console", back: "A mini command area in the browser's dev tools where you type code and see instant results." },
      { front: "console.log()", back: "A command that prints a message or value into the console so you can see it." },
      { front: "Comment ( // )", back: "A note in your code that JavaScript ignores; used to explain what the code does." },
    ],
    miniProject: {
      title: "Console Playground",
      brief: "Get comfortable running live JavaScript in your own browser's console.",
      steps: [
        "Open any website and press F12, then click the Console tab.",
        "Type console.log(\"my name\") with your name and press Enter.",
        "Do some maths: type 12 * 8 and press Enter to see the answer.",
        "Try alert(\"Boo!\") and watch a popup appear on the page.",
      ],
    },
    industryUse: [
      "Every interactive feature on Google, YouTube, and Gmail is powered by JavaScript in your browser",
      "Developers at Netflix use the console daily to debug why a page or button isn't behaving",
      "Airbnb and Amazon engineers run quick console experiments to test ideas before writing full code",
    ],
    commonMistakes: [
      "Confusing console.log (prints quietly for you) with alert (interrupts the user) — use log for debugging, not alert.",
      "Forgetting to open the Console tab and wondering where your printed messages went.",
    ],
    interviewQuestions: [
      "What is JavaScript used for, and where does it run?",
      "How would you quickly check the value of something while debugging in the browser?",
    ],
    papers: [],
    nextUp: ["js-variables", "js-functions"],
    cheatsheet: [
      "Open dev tools: press F12, click Console",
      "console.log(x) — print x to the console",
      "// this is a comment (ignored)",
      "End statements with a semicolon ;",
      "alert(\"hi\") — popup on the page",
    ],
  },

  "js-variables": {
    story:
      "Imagine three labelled jars on your kitchen shelf: one says \"sugar\", one says \"salt\", one says \"birthday\". You scoop sugar into the sugar jar, and whenever a recipe says \"sugar\" you know exactly where to look. In JavaScript a variable is that labelled jar. You write let score = 0 and now there's a jar called score holding the number 0. Later you can top it up: score = 10. But some jars should never change — your birthday jar, for instance. For those you use const, which locks the lid so nobody can swap the contents by accident.",
    problem:
      "Code needs to remember things: a player's score, a user's name, whether a checkbox is ticked. Without variables you'd have to write the actual value everywhere and re-type it constantly — and you'd have no way to change one value in a single place and have your whole program update. Variables give each piece of information a name so you can store it, read it, and change it.",
    analogy:
      "let is a jar you can refill; const is a jar with the lid glued shut — same jar idea, but one lets you change what's inside and the other doesn't.",
    explanation: [
      "Use const by default — it means \"this name will always point to this value.\" Reach for let only when you know the value will change later (like a score that goes up). Avoid the old var; it has confusing rules and modern code skips it.",
      "The = sign means \"put the value on the right into the jar on the left\" — it is NOT \"equals\" from maths. let age = 30 means \"store 30 in a jar named age.\"",
      "Values come in types. A string is text in quotes: \"Maria\". A number is any number, whole or decimal: 30 or 5.8 (JavaScript doesn't split them). A boolean is true or false. There's also undefined (a jar you made but never filled) and null (a jar you deliberately emptied).",
      "Type matters: \"5\" + \"5\" glues text into \"55\", but 5 + 5 adds numbers into 10. A number in quotes is text, not a number — a classic source of bugs.",
      "typeof tells you what kind of value you're holding: typeof \"hi\" is \"string\", typeof 42 is \"number\". Use it when a value is misbehaving and you suspect it's the wrong type.",
      "Name variables clearly: firstName and totalPrice tell the next human what's inside. Names can't have spaces, so we squish words together with a capital in the middle — that style is called camelCase.",
    ],
    code: {
      language: "javascript",
      source: `const name = "Maria";      // string - text in quotes
let score = 0;             // number - will change, so use let
const isStudent = true;    // boolean - true or false

score = score + 10;        // update the jar: now score is 10

console.log(name, "scored", score);
console.log(typeof name);   // "string"
console.log("5" + "5");     // "55"  <- text glued together
console.log(5 + 5);         // 10    <- numbers added`,
      explanation:
        "name and isStudent never change so they're const; score changes so it's let. Notice how \"5\" + \"5\" behaves completely differently from 5 + 5.",
    },
    exercise: {
      prompt: "Create a const for your city and a let for temperature starting at 20, then raise the temperature by 5 and print it.",
      starter: `// TODO: make a const called city holding your city name
// TODO: make a let called temperature holding 20
// TODO: add 5 to temperature
// TODO: print city and temperature
`,
      solution: `const city = "Lisbon";
let temperature = 20;
temperature = temperature + 5;
console.log(city, temperature);`,
    },
    quiz: [
      {
        question: "When should you use const instead of let?",
        options: [
          "Never — let is always better",
          "When the value should never be reassigned",
          "Only for numbers",
          "Only inside functions",
        ],
        answerIndex: 1,
        explanation:
          "const is for values that won't be reassigned. Use it by default and switch to let only when you need to change the value.",
      },
      {
        question: "What does \"5\" + \"5\" produce in JavaScript?",
        options: ["10", "\"55\"", "An error", "25"],
        answerIndex: 1,
        explanation:
          "Both values are strings (text in quotes), so + glues them together into \"55\" instead of adding them.",
      },
      {
        question: "Which line correctly checks the type of a value?",
        options: ["type(x)", "typeof x", "x.type", "checkType(x)"],
        answerIndex: 1,
        explanation: "typeof is the JavaScript operator that reports a value's type, like \"string\" or \"number\".",
      },
    ],
    flashcards: [
      { front: "let", back: "Declares a variable whose value you plan to change later." },
      { front: "const", back: "Declares a variable whose value must not be reassigned — use it by default." },
      { front: "string / number / boolean", back: "The core value types: text in quotes, any number, and true/false." },
      { front: "typeof", back: "Operator that tells you a value's type, e.g. typeof 42 is \"number\"." },
    ],
    industryUse: [
      "Spotify's web player keeps the current track, volume, and play state in variables like these",
      "Banking sites store your session and balances in const and let variables as you browse",
      "Every online form (Amazon checkout, sign-up pages) uses variables to hold what you typed",
    ],
    commonMistakes: [
      "Reassigning a const and getting an error — if a value must change, use let instead.",
      "Treating \"7\" (text) like 7 (number) and getting \"77\" when you expected 14 — convert with Number(\"7\") first.",
      "Using vague names like x or data2 — future-you won't remember what they hold. Name things clearly.",
    ],
    interviewQuestions: [
      "What's the difference between let, const, and var?",
      "Explain why \"5\" + 5 gives \"55\" but \"5\" - 5 gives 0.",
    ],
    papers: [],
    nextUp: ["js-functions", "js-control"],
    cheatsheet: [
      "const x = 5  — can't be reassigned (default choice)",
      "let x = 5    — can be reassigned",
      "Types: string, number, boolean, undefined, null",
      "typeof x — check a value's type",
      "\"5\" + \"5\" = \"55\" but 5 + 5 = 10",
      "Name things in camelCase: firstName",
    ],
  },

  "js-functions": {
    story:
      "Think about making a cup of tea. You don't reinvent the steps every time — you just say \"make tea\" and your hands run the familiar routine: boil water, add teabag, pour, wait, remove. A function is you writing down that routine once, giving it a name, and then calling it whenever you want. In JavaScript you write function makeTea() { ... } once, and forever after you just type makeTea() to run the whole thing. Functions can also take ingredients (inputs) and hand you back a result (output) — like makeTea(\"green\") giving you a cup of green tea.",
    problem:
      "As programs grow, you find yourself copying and pasting the same handful of lines again and again. That's fragile: fix a bug in one copy and you've still got five broken ones. Functions let you write a chunk of logic once, name it, and reuse it everywhere — change it in one place and every use updates.",
    analogy:
      "A function is a recipe card: written once, followed many times, and you can vary the ingredients you feed in to get different dishes out.",
    explanation: [
      "You define a function with a name, optional inputs in the parentheses (called parameters), and a body in the curly braces { } that holds the steps to run.",
      "You run it by writing its name followed by parentheses: greet(). The values you pass in, like greet(\"Sam\"), are called arguments — they fill the parameters.",
      "return hands a value back out of the function to whoever called it. Without return, the function does its work but gives back undefined. Think of return as the function's answer.",
      "Modern JavaScript loves arrow functions — a shorter way to write the same thing: const greet = (name) => { ... }. The => is nicknamed \"fat arrow.\" For one-line functions you can even drop the braces and the word return: const double = (n) => n * 2.",
      "Keep functions small and focused: one function should do one clear job, and its name should say what that job is (calculateTotal, not doStuff).",
      "Functions are the main way we organise code. A big program is really just many small functions calling each other — like a kitchen where each recipe uses other recipes.",
    ],
    code: {
      language: "javascript",
      source: `// The classic way to write a function
function greet(name) {
  return "Hello, " + name + "!";
}

// The modern "arrow" way - same result, shorter
const double = (n) => n * 2;

// Call them by writing their name with parentheses:
console.log(greet("Sam"));   // "Hello, Sam!"
console.log(double(21));     // 42

// A function with two inputs
const add = (a, b) => a + b;
console.log(add(3, 4));      // 7`,
      explanation:
        "greet takes one input and returns a sentence; double and add are arrow functions. The value you pass in the parentheses fills the parameter.",
    },
    exercise: {
      prompt: "Write an arrow function called toCelsius that takes a Fahrenheit number and returns the Celsius value, using (f - 32) * 5 / 9.",
      starter: `// TODO: write an arrow function toCelsius(f) that returns the Celsius value
// hint: (f - 32) * 5 / 9

console.log(toCelsius(212));  // should print 100
`,
      solution: `const toCelsius = (f) => (f - 32) * 5 / 9;

console.log(toCelsius(212));  // 100`,
    },
    quiz: [
      {
        question: "What does the return keyword do?",
        options: [
          "It prints to the console",
          "It hands a value back out of the function to whoever called it",
          "It deletes the function",
          "It restarts the program",
        ],
        answerIndex: 1,
        explanation:
          "return sends a value back to the code that called the function. Without it, the function returns undefined.",
      },
      {
        question: "In greet(\"Sam\"), what is \"Sam\" called?",
        options: ["A parameter", "An argument", "A return value", "A variable name"],
        answerIndex: 1,
        explanation:
          "The value you pass in when calling a function is an argument; the placeholder inside the definition is the parameter.",
      },
      {
        question: "Which is a valid arrow function that doubles a number?",
        options: [
          "function => n * 2",
          "const double = (n) => n * 2;",
          "double(n) return n * 2",
          "let double = n * 2;",
        ],
        answerIndex: 1,
        explanation:
          "An arrow function stores a function in a variable: const name = (inputs) => result. For one-liners you can omit braces and return.",
      },
    ],
    flashcards: [
      { front: "Function", back: "A named, reusable block of code you can run whenever you call it." },
      { front: "Parameter vs argument", back: "Parameter is the placeholder in the definition; argument is the actual value you pass in." },
      { front: "return", back: "Hands a value back out of a function to the code that called it." },
      { front: "Arrow function", back: "A short modern syntax: const add = (a, b) => a + b;" },
    ],
    miniProject: {
      title: "Tip Calculator Function",
      brief: "Build a small function that figures out a restaurant tip.",
      steps: [
        "Write a function calcTip(bill, percent) that returns bill * percent / 100.",
        "Call it with your last restaurant bill and 15 percent.",
        "Add a second function totalWithTip(bill, percent) that returns bill plus the tip.",
        "Print a friendly sentence showing the tip and the grand total.",
      ],
    },
    industryUse: [
      "React (used by Facebook, Instagram) builds entire interfaces out of functions called components",
      "Node.js backends at PayPal and Netflix are organised as thousands of small functions",
      "Every form validation you've seen (checking an email is valid) is a function returning true or false",
    ],
    commonMistakes: [
      "Forgetting return, so the function does its work but hands back undefined — add return for the answer.",
      "Calling a function without its parentheses (greet instead of greet()), which refers to the function but never runs it.",
      "Making one giant function that does everything — split it into small, well-named pieces.",
    ],
    interviewQuestions: [
      "What's the difference between a function's parameters and its arguments?",
      "What's the difference between a regular function and an arrow function?",
      "What does a function return if it has no return statement?",
    ],
    papers: [],
    nextUp: ["js-arrays", "js-control"],
    cheatsheet: [
      "function greet(name) { return ... }",
      "Arrow: const add = (a, b) => a + b;",
      "Call it: greet(\"Sam\")",
      "return hands a value back out",
      "One function = one clear job",
    ],
  },

  "js-arrays": {
    story:
      "Picture your weekly shopping list on a single strip of paper: milk, eggs, bread, coffee. It's one thing (a list) holding many items in order, and you can point to any item by its position — \"the first one,\" \"the third one.\" An array is exactly that: one variable that holds an ordered lineup of values. In JavaScript you write const list = [\"milk\", \"eggs\", \"bread\"], and you grab items by their position number, starting from 0: list[0] is \"milk\". The real magic is that arrays come with built-in tools to loop through, filter, and transform the whole list in one line.",
    problem:
      "You rarely have just one of something — you have a list of scores, a feed of posts, a cart of products. Making a separate variable for each (item1, item2, item3...) is unmanageable and impossible to loop over. An array holds them all together, in order, under one name, so you can process the whole collection at once.",
    analogy:
      "An array is an egg carton: one container with numbered slots, and you can reach into any slot by its number — but the first slot is number 0, not 1.",
    explanation: [
      "Create an array with square brackets: const fruits = [\"apple\", \"banana\", \"cherry\"]. Get an item by its index (position), counting from zero: fruits[0] is \"apple\", fruits[1] is \"banana\".",
      "fruits.length tells you how many items are inside. Since counting starts at 0, the last item is always at index length - 1.",
      "push adds to the end (fruits.push(\"date\")) and pop removes the last one. These change the array in place.",
      "map builds a brand-new array by transforming every item: [1,2,3].map(n => n * 2) gives [2,4,6]. Use it when you want to turn a list into another list of the same length.",
      "filter builds a new array keeping only items that pass a test: [1,2,3,4].filter(n => n > 2) gives [3,4]. Use it to whittle a list down.",
      "forEach just runs an action for each item without building anything new — perfect for printing each one. Reach for map/filter when you want a result back, forEach when you just want to do something.",
    ],
    code: {
      language: "javascript",
      source: `const scores = [40, 85, 60, 95, 30];

console.log(scores[0]);        // 40  (first item, index 0)
console.log(scores.length);    // 5

scores.push(70);               // add 70 to the end

// map: transform every score into a percentage string
const labels = scores.map(s => s + " points");

// filter: keep only the passing scores
const passing = scores.filter(s => s >= 60);
console.log(passing);          // [85, 60, 95, 70]

// forEach: just do something with each one
scores.forEach(s => console.log("Score:", s));`,
      explanation:
        "map returns a new transformed list, filter returns a new shorter list of items that pass the test, and forEach just runs an action per item without returning anything.",
    },
    exercise: {
      prompt: "Given the prices array, use filter to keep only prices under 50, then print the result.",
      starter: `const prices = [12, 80, 45, 99, 20, 55];
// TODO: use filter to keep only prices below 50
const cheap = ...;
console.log(cheap);  // should print [12, 45, 20]
`,
      solution: `const prices = [12, 80, 45, 99, 20, 55];
const cheap = prices.filter(p => p < 50);
console.log(cheap);  // [12, 45, 20]`,
    },
    quiz: [
      {
        question: "What is the index of the first item in an array?",
        options: ["1", "0", "-1", "It depends on the array"],
        answerIndex: 1,
        explanation: "Arrays are zero-indexed: the first item is at index 0, so the last is at length - 1.",
      },
      {
        question: "Which method builds a NEW array containing only items that pass a test?",
        options: ["push", "map", "filter", "forEach"],
        answerIndex: 2,
        explanation:
          "filter keeps items that pass its test and returns a new array. map transforms every item; forEach returns nothing.",
      },
      {
        question: "What does [1, 2, 3].map(n => n * 10) return?",
        options: ["[1, 2, 3]", "[10, 20, 30]", "60", "[1, 20, 3]"],
        answerIndex: 1,
        explanation: "map runs the function on every item and collects the results into a new array: [10, 20, 30].",
      },
    ],
    flashcards: [
      { front: "Array", back: "An ordered list of values stored in one variable, written with square brackets." },
      { front: "Index", back: "An item's position in an array, counting from 0. arr[0] is the first item." },
      { front: "map", back: "Returns a NEW array by transforming every item." },
      { front: "filter", back: "Returns a NEW array keeping only items that pass a test." },
    ],
    miniProject: {
      title: "Highlight the High Scores",
      brief: "Turn a list of quiz scores into a clean summary.",
      steps: [
        "Start with an array of at least six numeric scores.",
        "Use filter to get only the scores of 70 or above.",
        "Use map to turn each passing score into \"85%\"-style text.",
        "Print the count of passing scores using .length and list them.",
      ],
    },
    industryUse: [
      "Instagram's feed is an array of posts that map turns into on-screen cards",
      "Amazon uses filter to narrow product arrays down to your selected price range and brand",
      "Spotify holds your playlist as an array and maps over it to render each song row",
    ],
    commonMistakes: [
      "Using index 1 for the first item — it's index 0, so off-by-one bugs are common.",
      "Expecting map to change the original array — it returns a new one; assign it to a variable.",
      "Using forEach when you actually want a result back — use map or filter instead.",
    ],
    interviewQuestions: [
      "What's the difference between map, filter, and forEach?",
      "How do you get the last element of an array of unknown length?",
      "Why do arrays start counting at 0?",
    ],
    papers: [],
    nextUp: ["js-objects", "js-control"],
    cheatsheet: [
      "const a = [1, 2, 3]  — square brackets",
      "a[0] — first item (index starts at 0)",
      "a.length — how many items",
      "a.push(x) — add to end",
      "a.map(f) — new transformed array",
      "a.filter(test) — new filtered array",
    ],
  },

  "js-objects": {
    story:
      "A shopping list (an array) is great when things are all the same kind of thing in a row. But a person isn't a row — a person has a name, an age, an email, whether they're a member. Those are different labelled facts about one thing. An object is a container for exactly that: labelled facts about a single thing. In JavaScript you write const user = { name: \"Maria\", age: 30, member: true }. Each label (name, age) is called a key, and what it holds is its value. You read a fact by its label: user.name gives you \"Maria\".",
    problem:
      "Real-world data isn't just a flat list — it's things with named properties. A product has a title, price, and stock count. A tweet has an author, text, and time. Trying to squeeze that into an array (\"was price at index 1 or 2?\") is a nightmare. Objects let you label each piece, so you ask for user.email instead of remembering a position.",
    analogy:
      "An object is a filing folder with labelled tabs: instead of \"the third sheet,\" you ask for the sheet marked \"Address\" and pull exactly that.",
    explanation: [
      "Create an object with curly braces holding key: value pairs, separated by commas: { name: \"Maria\", age: 30 }. Keys are the labels; values are the contents.",
      "Read a value with a dot and the key: user.name. You can also use brackets user[\"name\"] — handy when the key name is stored in a variable.",
      "Change or add a property just by assigning: user.age = 31 updates it; user.city = \"Lisbon\" adds a brand-new property on the spot.",
      "Values can be anything — including arrays and other objects. user.hobbies = [\"tea\", \"chess\"] nests a list inside; this is how real data (like the JSON that servers send) is shaped.",
      "Objects can hold functions too. A function stored on an object is called a method, and you call it with user.greet(). Inside a method, the keyword this refers to the object itself.",
      "Use an array when you have many of the same thing in order (a list of users); use an object when you have one thing with named properties (a single user). They're often combined: an array of objects.",
    ],
    code: {
      language: "javascript",
      source: `const user = {
  name: "Maria",
  age: 30,
  member: true,
  hobbies: ["tea", "chess"],
  greet() {                       // a method (a function on the object)
    return "Hi, I'm " + this.name;
  }
};

console.log(user.name);        // "Maria"
console.log(user.hobbies[0]);  // "tea"

user.age = 31;                 // change a property
user.city = "Lisbon";          // add a new one

console.log(user.greet());     // "Hi, I'm Maria"`,
      explanation:
        "Dot notation (user.name) reads a property. greet is a method, and this.name inside it refers back to this same user object.",
    },
    exercise: {
      prompt: "Create an object called book with title, author, and pages, then print a sentence like \"Dune by Herbert, 412 pages\".",
      starter: `// TODO: make an object called book with title, author, and pages
const book = ...;

// TODO: print "TITLE by AUTHOR, PAGES pages" using the properties
`,
      solution: `const book = { title: "Dune", author: "Herbert", pages: 412 };

console.log(book.title + " by " + book.author + ", " + book.pages + " pages");`,
    },
    quiz: [
      {
        question: "How do you read the name property of an object called user?",
        options: ["user[name]", "user.name", "user->name", "name.user"],
        answerIndex: 1,
        explanation: "Dot notation user.name reads the value at the key name. Bracket notation user[\"name\"] also works.",
      },
      {
        question: "When should you use an object instead of an array?",
        options: [
          "When you have many of the same thing in order",
          "When you have one thing with named properties",
          "Objects and arrays are identical",
          "Only for numbers",
        ],
        answerIndex: 1,
        explanation:
          "Objects shine for one thing with labelled properties; arrays shine for an ordered list of similar items.",
      },
      {
        question: "What is a function stored inside an object called?",
        options: ["A property", "A method", "An index", "A key"],
        answerIndex: 1,
        explanation: "A function that lives on an object is called a method, and you call it like user.greet().",
      },
    ],
    flashcards: [
      { front: "Object", back: "A container of labelled key: value pairs describing one thing." },
      { front: "Key / value", back: "The label (key) and what it holds (value) inside an object." },
      { front: "Dot notation", back: "Reading a property with a dot: user.name." },
      { front: "Method", back: "A function stored on an object, called like user.greet()." },
    ],
    miniProject: {
      title: "Model Your Favourite Movie",
      brief: "Represent a movie as a JavaScript object with real data.",
      steps: [
        "Create an object with title, year, director, and a genres array.",
        "Add a method summary() that returns a one-line description using this.",
        "Print the summary, then add a new property rating and print that too.",
        "Bonus: put three movie objects into an array and loop over them.",
      ],
    },
    industryUse: [
      "Every API response from Twitter, Stripe, or a weather service arrives as JSON — objects and arrays",
      "MongoDB, used by companies like Uber, stores records as objects (documents)",
      "React components hold their data in objects called state and props",
    ],
    commonMistakes: [
      "Forgetting commas between properties inside the braces — each pair needs one except the last.",
      "Mixing up arrays and objects: use user.name for one person, users[0] for the first in a list.",
      "Reading a key that doesn't exist and getting undefined — check the spelling of the key.",
    ],
    interviewQuestions: [
      "What's the difference between an array and an object, and when would you use each?",
      "What does the keyword this refer to inside an object's method?",
      "How do you add a new property to an existing object?",
    ],
    papers: [],
    nextUp: ["js-control", "js-async"],
    cheatsheet: [
      "const o = { name: \"Maria\", age: 30 }",
      "o.name — read a property",
      "o.age = 31 — change it",
      "o.city = \"Lisbon\" — add a new one",
      "Method: greet() { return this.name }",
      "Array of objects = a list of records",
    ],
  },

  "js-control": {
    story:
      "You wake up and your brain runs a tiny program: IF it's raining, take an umbrella, ELSE wear sunglasses. Then WHILE the kettle isn't boiling, keep waiting. Then FOR each of the 3 emails in your inbox, read it. That's all control flow is — the everyday logic of deciding and repeating, written down so the computer can follow it. JavaScript gives you if/else to decide and loops to repeat, and together they turn a straight list of instructions into something that can react and handle any amount of work.",
    problem:
      "Code that only runs straight down, top to bottom, can't make choices or handle repetition. But real programs must decide (is the password correct?) and repeat (send a reminder to each of 500 users). Control flow gives your code a fork in the road and a way to loop, so it can respond to different situations and process any number of items.",
    analogy:
      "if/else is a fork in the road you take based on a sign; a loop is a roundabout you keep circling until you reach your exit.",
    explanation: [
      "if runs a block only when a condition is true; else if checks another condition; else is the catch-all. The condition goes in parentheses and must boil down to true or false.",
      "Comparisons make conditions: === (exactly equal), !== (not equal), >, <, >=, <=. Always use === not == — the triple equals avoids JavaScript's confusing type-juggling.",
      "Combine conditions with && (AND — both must be true) and || (OR — at least one true), and flip one with ! (NOT). Example: if (age >= 18 && hasTicket).",
      "A for loop repeats a set number of times: for (let i = 0; i < 5; i++) runs with i going 0,1,2,3,4. It's the go-to for counting or stepping through an array by index.",
      "A while loop repeats as long as its condition stays true — use it when you don't know the count in advance (\"keep going until the user quits\"). Beware the infinite loop: make sure something inside eventually makes the condition false.",
      "For walking through an array, for...of is the cleanest: for (const item of list) hands you each item directly, no index bookkeeping.",
    ],
    code: {
      language: "javascript",
      source: `const score = 72;

if (score >= 90) {
  console.log("A");
} else if (score >= 60) {
  console.log("Pass");           // this one runs
} else {
  console.log("Try again");
}

// a for loop that counts 1 to 5
for (let i = 1; i <= 5; i++) {
  console.log("Count:", i);
}

// walk through an array the clean way
const fruits = ["apple", "pear", "plum"];
for (const fruit of fruits) {
  console.log(fruit);
}`,
      explanation:
        "The if/else picks exactly one branch based on the score. The for loop counts up to 5, and for...of hands you each fruit without needing an index.",
    },
    exercise: {
      prompt: "Loop through the numbers array and print only the even ones (a number is even if number % 2 === 0).",
      starter: `const numbers = [3, 8, 15, 20, 7, 12];
// TODO: loop through numbers and print only the even ones
`,
      solution: `const numbers = [3, 8, 15, 20, 7, 12];
for (const n of numbers) {
  if (n % 2 === 0) {
    console.log(n);
  }
}`,
    },
    quiz: [
      {
        question: "Why should you use === instead of == in JavaScript?",
        options: [
          "=== is faster to type",
          "=== compares without confusing automatic type conversion",
          "== doesn't exist in JavaScript",
          "There is no difference",
        ],
        answerIndex: 1,
        explanation:
          "=== checks value and type without JavaScript's surprising type coercion, so it avoids a whole class of bugs. Prefer it.",
      },
      {
        question: "What does the && operator mean in a condition?",
        options: ["At least one side is true", "Both sides must be true", "Neither side is true", "Flip true to false"],
        answerIndex: 1,
        explanation: "&& (AND) is true only when both sides are true. || (OR) is true when at least one side is.",
      },
      {
        question: "Which loop is best when you don't know in advance how many times to repeat?",
        options: ["for", "while", "for...of", "map"],
        answerIndex: 1,
        explanation:
          "A while loop repeats as long as its condition is true, which fits situations where the count isn't known ahead of time.",
      },
    ],
    flashcards: [
      { front: "if / else if / else", back: "Runs different code blocks depending on which condition is true." },
      { front: "===", back: "Strict equality: same value AND same type. Prefer it over ==." },
      { front: "for loop", back: "Repeats a set number of times: for (let i = 0; i < n; i++)." },
      { front: "&& and ||", back: "AND (both true) and OR (at least one true) for combining conditions." },
    ],
    miniProject: {
      title: "FizzBuzz",
      brief: "The classic first challenge that mixes loops and conditions.",
      steps: [
        "Loop through the numbers 1 to 30 with a for loop.",
        "If a number divides by 3 and by 5, print \"FizzBuzz\".",
        "Else if it divides by 3 print \"Fizz\", else if by 5 print \"Buzz\".",
        "Otherwise print the number itself.",
      ],
    },
    industryUse: [
      "Login systems everywhere use if/else to decide whether your credentials are valid",
      "E-commerce sites loop over your cart items to compute totals and apply discount rules",
      "Games run a main loop every frame, checking conditions to move characters and detect collisions",
    ],
    commonMistakes: [
      "Using = (assignment) instead of === (comparison) inside an if — a very common typo that breaks logic.",
      "Writing a while loop whose condition never becomes false, freezing the page in an infinite loop.",
      "Relying on == and getting surprised when \"0\" == 0 is true — use === to avoid it.",
    ],
    interviewQuestions: [
      "What's the difference between == and === in JavaScript?",
      "When would you choose a while loop over a for loop?",
      "How do you loop over every item in an array?",
    ],
    papers: [],
    nextUp: ["js-dom", "js-arrays"],
    cheatsheet: [
      "if (cond) { } else if (cond) { } else { }",
      "Compare: === !== > < >= <=",
      "Combine: && (and) || (or) ! (not)",
      "for (let i = 0; i < n; i++) { }",
      "for (const item of list) { }",
      "while (cond) { }  — beware infinite loops",
    ],
  },

  "js-dom": {
    story:
      "When a browser loads a web page, it reads the HTML and builds a living family tree of every element — the heading, each paragraph, every button — in the computer's memory. That tree is called the DOM (Document Object Model). Here's the exciting part: JavaScript can reach into that tree and change it while the page is open. Change the text of a heading, hide an image, add a new list item, turn a box red — all without reloading. Every time a page updates in front of your eyes without refreshing, JavaScript is editing the DOM.",
    problem:
      "HTML alone paints the page once and then it's frozen. But modern sites constantly update: a counter ticks up, a new message appears, a menu opens. To change what's on screen after the page has loaded, JavaScript needs a way to find elements and rewrite them. The DOM is that bridge between your code and what the user sees.",
    analogy:
      "The DOM is like a puppet theatre backstage: the HTML set the puppets on stage, and JavaScript is the puppeteer who can grab any puppet by its string and make it move, speak, or vanish.",
    explanation: [
      "The browser turns your HTML into the DOM: a tree of element objects your JavaScript can search and edit. document is your entry point to that tree.",
      "Find one element with document.querySelector(\"...\"), using the same selectors as CSS: \"#title\" finds the element with id \"title\", \".card\" finds the first with class \"card\". Use querySelectorAll to get all matches as a list.",
      "Change an element's text with .textContent = \"new text\". Change its HTML with .innerHTML (careful — it interprets tags). Change styling via .style.color = \"red\" or, better, .classList.add(\"active\").",
      "Read or set form input values with .value — that's how you get what a user typed into a text box.",
      "Create fresh elements with document.createElement(\"li\"), fill them, and attach them with parent.appendChild(...) — this is how you add items to a list on the fly.",
      "Always find the element first, store it in a variable, then change it. If querySelector returns null, your selector didn't match anything — check the id or class spelling.",
    ],
    code: {
      language: "javascript",
      source: `// Find elements (selectors work just like CSS)
const title = document.querySelector("#title");
const box = document.querySelector(".card");

// Change what they show
title.textContent = "Welcome back!";
box.style.backgroundColor = "gold";
box.classList.add("highlighted");

// Read what a user typed into an input
const input = document.querySelector("#name-input");
console.log(input.value);

// Create a brand-new element and add it to the page
const item = document.createElement("li");
item.textContent = "New task";
document.querySelector("#list").appendChild(item);`,
      explanation:
        "querySelector finds elements by CSS selector; textContent and style change them; createElement + appendChild add new ones to the page live.",
    },
    exercise: {
      prompt: "Find the element with id \"greeting\" and change its text to \"Hello, DOM!\".",
      starter: `// TODO: select the element with id "greeting"
const greeting = ...;
// TODO: change its text to "Hello, DOM!"
`,
      solution: `const greeting = document.querySelector("#greeting");
greeting.textContent = "Hello, DOM!";`,
    },
    quiz: [
      {
        question: "What is the DOM?",
        options: [
          "A JavaScript file format",
          "A tree of the page's elements that JavaScript can read and change",
          "A type of loop",
          "A database on the server",
        ],
        answerIndex: 1,
        explanation:
          "The DOM (Document Object Model) is the browser's live tree of page elements, and JavaScript can search and edit it.",
      },
      {
        question: "Which line finds the element with id \"title\"?",
        options: [
          "document.querySelector(\".title\")",
          "document.querySelector(\"#title\")",
          "document.getElement(title)",
          "document.find(\"title\")",
        ],
        answerIndex: 1,
        explanation: "The # prefix targets an id, just like in CSS. A dot (.) would target a class instead.",
      },
      {
        question: "How do you change the visible text of an element you've selected?",
        options: ["element.value = ...", "element.textContent = ...", "element.text(...)", "element.write(...)"],
        answerIndex: 1,
        explanation: "textContent sets an element's visible text. (.value is for reading/writing form inputs.)",
      },
    ],
    flashcards: [
      { front: "DOM", back: "The browser's live tree of page elements that JavaScript can read and modify." },
      { front: "querySelector", back: "Finds the first element matching a CSS selector, e.g. \"#id\" or \".class\"." },
      { front: "textContent", back: "Gets or sets the visible text inside an element." },
      { front: "appendChild", back: "Attaches a newly created element into the page as a child." },
    ],
    miniProject: {
      title: "Live Name Card",
      brief: "Build a card whose text you change entirely with JavaScript.",
      steps: [
        "Make a simple HTML page with an <h1 id=\"name\"> and a <p id=\"role\">.",
        "In JavaScript, select both with querySelector.",
        "Set the name text and the role text from variables.",
        "Change the h1's color with .style and add a CSS class with classList.add.",
      ],
    },
    industryUse: [
      "Gmail updates your unread count and inbox in the DOM without ever reloading the page",
      "Google Docs edits the DOM keystroke-by-keystroke as you type",
      "React and Vue (used across the web) are frameworks whose whole job is efficient DOM updates",
    ],
    commonMistakes: [
      "Running the JavaScript before the element exists on the page, so querySelector returns null — load your script after the HTML or wait for the page to be ready.",
      "Confusing textContent (visible text) with innerHTML (interprets tags) — using innerHTML with user input can be unsafe.",
      "Using # for a class or . for an id — # is for ids, . is for classes, matching CSS.",
    ],
    interviewQuestions: [
      "What is the DOM and how does JavaScript interact with it?",
      "What's the difference between querySelector and querySelectorAll?",
      "How would you add a new list item to a page dynamically?",
    ],
    papers: [],
    nextUp: ["js-events", "js-weather-app"],
    cheatsheet: [
      "document.querySelector(\"#id\") / (\".class\")",
      "el.textContent = \"...\" — change text",
      "el.value — read a form input",
      "el.style.color = \"red\"",
      "el.classList.add(\"active\")",
      "createElement + appendChild — add new elements",
    ],
  },

  "js-events": {
    story:
      "So far your code runs once, top to bottom, and stops. But a real web page needs to wait — patiently, forever — for the user to do something, and then react. Click a button, type in a box, hover over a menu: each of these is an event. In JavaScript you don't check \"has the button been clicked yet?\" over and over. Instead you leave a note: \"Hey button, WHEN someone clicks you, run this function.\" The browser watches for you and calls your function at the exact moment it happens. This is how every interactive page comes alive.",
    problem:
      "You can find and change elements with the DOM, but nothing happens until the user acts — and you never know when that will be. Constantly asking \"clicked yet? clicked yet?\" would be wasteful and impossible. Events flip it around: you register interest once, and the browser calls your code the instant the action occurs.",
    analogy:
      "It's like a doorbell: you don't stand at the door checking for visitors all day. You wire up the bell once, then go about your life, and it rings you exactly when someone arrives.",
    explanation: [
      "Attach a listener with element.addEventListener(\"click\", handlerFunction). The first argument is the event name; the second is the function to run when it happens.",
      "The function you pass is called a callback — you're not calling it yourself; you're handing it to the browser to call later, at the right moment.",
      "Common events: \"click\" (buttons), \"input\" (every keystroke in a text field), \"submit\" (a form is sent), \"mouseover\" (hovering), \"keydown\" (a key pressed).",
      "The browser passes your callback an event object (usually named e) full of details — e.target is the element that triggered it, and for forms e.preventDefault() stops the page from reloading.",
      "For text inputs, listen for \"input\" and read the current text with e.target.value — that's how live search boxes update as you type.",
      "Keep handlers small: when the click happens, call a well-named function that does the real work. This keeps your event wiring readable.",
    ],
    code: {
      language: "javascript",
      source: `const button = document.querySelector("#buy");
const input = document.querySelector("#search");

// Run a function WHEN the button is clicked
button.addEventListener("click", () => {
  console.log("Button clicked!");
  button.textContent = "Added to cart";
});

// React to every keystroke in a text box
input.addEventListener("input", (e) => {
  console.log("You typed:", e.target.value);
});

// Stop a form from reloading the page
const form = document.querySelector("#signup");
form.addEventListener("submit", (e) => {
  e.preventDefault();          // keep the page from refreshing
  console.log("Form submitted without reloading");
});`,
      explanation:
        "addEventListener wires a function to an event. The (e) parameter is the event object; e.target.value reads what was typed, and e.preventDefault() stops a form reload.",
    },
    exercise: {
      prompt: "Add a click listener to the button with id \"toggle\" that changes its text to \"Clicked!\".",
      starter: `const btn = document.querySelector("#toggle");
// TODO: add a click listener that sets btn.textContent to "Clicked!"
`,
      solution: `const btn = document.querySelector("#toggle");
btn.addEventListener("click", () => {
  btn.textContent = "Clicked!";
});`,
    },
    quiz: [
      {
        question: "What does addEventListener do?",
        options: [
          "It immediately runs a function once",
          "It registers a function to run whenever a given event happens",
          "It deletes an element",
          "It reloads the page",
        ],
        answerIndex: 1,
        explanation:
          "addEventListener tells the browser \"when this event happens on this element, run this function\" — the function runs later, on each event.",
      },
      {
        question: "How do you read what a user typed into a text input during an input event?",
        options: ["e.value", "e.target.value", "e.text", "input.type"],
        answerIndex: 1,
        explanation: "The event object's e.target is the element, and .value holds its current text.",
      },
      {
        question: "Why call e.preventDefault() in a form's submit handler?",
        options: [
          "To speed up the form",
          "To stop the browser's default page reload so your JavaScript can handle it",
          "To clear the form",
          "To submit the form twice",
        ],
        answerIndex: 1,
        explanation:
          "By default a form submit reloads the page. preventDefault stops that so you can process the data in JavaScript.",
      },
    ],
    flashcards: [
      { front: "Event", back: "Something that happens on the page — a click, keystroke, hover, or form submit." },
      { front: "addEventListener", back: "Registers a function to run whenever a named event fires on an element." },
      { front: "Callback", back: "A function you hand to the browser to be called later, when the event happens." },
      { front: "e.preventDefault()", back: "Stops the browser's default action, like a form reloading the page." },
    ],
    miniProject: {
      title: "Click Counter",
      brief: "A button that counts how many times it's been clicked.",
      steps: [
        "Add a button and a paragraph to a page.",
        "Keep a let count = 0 variable.",
        "On each click, increase count by one.",
        "Update the paragraph's textContent to show the new count.",
      ],
    },
    industryUse: [
      "Every \"like\", \"add to cart\", and \"send\" button on the web is wired with an event listener",
      "Google's search box uses input events to show suggestions as you type",
      "Interactive maps (Uber, Google Maps) respond to click and drag events on the page",
    ],
    commonMistakes: [
      "Calling the handler instead of passing it: addEventListener(\"click\", doThing()) runs it immediately — drop the parentheses or wrap it in an arrow function.",
      "Forgetting e.preventDefault() on form submits, so the page reloads and your code seems to do nothing.",
      "Attaching listeners to elements that don't exist yet because the script ran too early.",
    ],
    interviewQuestions: [
      "How do you make a button respond to a click in JavaScript?",
      "What is a callback function, and how do events use them?",
      "Why and when would you call preventDefault()?",
    ],
    papers: [],
    nextUp: ["js-async", "js-weather-app"],
    cheatsheet: [
      "el.addEventListener(\"click\", fn)",
      "Events: click, input, submit, mouseover, keydown",
      "(e) => ... — e is the event object",
      "e.target — the element that fired it",
      "e.target.value — text typed in an input",
      "e.preventDefault() — stop form reload",
    ],
  },

  "js-async": {
    story:
      "Imagine ordering a coffee. You give your order, then step aside — you don't freeze at the counter blocking everyone until it's ready. You get a little buzzer (a promise) that says \"I'll go off when your coffee is done.\" Meanwhile the queue keeps moving. JavaScript works the same way. When it asks the internet for data — say, today's weather — that takes time. Instead of freezing the whole page while it waits, JavaScript hands you a promise: \"I'll let you know when the answer arrives.\" This is asynchronous code, and it's how web pages stay smooth while talking to servers.",
    problem:
      "Fetching data over the internet is slow compared to normal code — it can take a second or two. If JavaScript stopped and waited, the whole page would freeze: no scrolling, no clicking, nothing. Asynchronous code lets JavaScript kick off the slow request, carry on doing other things, and come back to handle the answer once it arrives.",
    analogy:
      "It's a restaurant buzzer: you order, take the buzzer (the promise), sit down and chat, and it flashes when your food is ready — nobody has to stand frozen at the counter.",
    explanation: [
      "A Promise is an IOU for a value that isn't ready yet. It's in one of three states: pending (waiting), fulfilled (the value arrived), or rejected (something went wrong).",
      "fetch(url) asks a server for data and returns a promise. You don't get the data immediately — you get the promise that it's coming.",
      "The modern, readable way to wait for a promise is async/await. Mark a function async, then write await before a promise, and JavaScript pauses just that function until the value arrives — without freezing the page.",
      "Data from the web usually arrives as JSON (text shaped like JavaScript objects). You call await response.json() to turn that text into a real object you can use.",
      "Things go wrong online — servers fail, wifi drops. Wrap await calls in try/catch so you can show a friendly message instead of crashing: try { ... } catch (error) { ... }.",
      "The older style used .then() chains: fetch(url).then(r => r.json()).then(data => ...). You'll see it in existing code, but async/await usually reads more clearly.",
    ],
    code: {
      language: "javascript",
      source: `// Ask a server for data and handle it when it arrives
async function getUser() {
  try {
    const response = await fetch("https://api.example.com/user/1");
    const data = await response.json();   // turn JSON text into an object
    console.log("Name:", data.name);
  } catch (error) {
    console.log("Something went wrong:", error);
  }
}

getUser();
console.log("This runs FIRST, while we wait for the data");`,
      explanation:
        "await pauses only inside getUser until the data arrives, so the last console.log actually prints first. try/catch handles failures gracefully.",
    },
    exercise: {
      prompt: "Complete the async function so it fetches the URL, converts the response to JSON, and logs it.",
      starter: `async function loadData() {
  // TODO: await fetch the url below
  const response = ...;
  // TODO: await turn the response into json
  const data = ...;
  console.log(data);
}
loadData();
`,
      solution: `async function loadData() {
  const response = await fetch("https://api.example.com/data");
  const data = await response.json();
  console.log(data);
}
loadData();`,
    },
    quiz: [
      {
        question: "What is a Promise in JavaScript?",
        options: [
          "A guarantee the code will never fail",
          "An IOU for a value that will be ready later",
          "A type of loop",
          "A CSS feature",
        ],
        answerIndex: 1,
        explanation:
          "A promise represents a value that isn't available yet — it will be fulfilled with the value or rejected with an error later.",
      },
      {
        question: "What does await do?",
        options: [
          "Freezes the entire browser",
          "Pauses the async function until the promise resolves, without freezing the page",
          "Cancels the request",
          "Loops forever",
        ],
        answerIndex: 1,
        explanation:
          "await pauses only the async function it's in until the promise settles; the rest of the page keeps running.",
      },
      {
        question: "Why wrap fetch/await calls in try/catch?",
        options: [
          "To make them faster",
          "To handle failures (bad network, server error) gracefully instead of crashing",
          "It's required syntax",
          "To loop the request",
        ],
        answerIndex: 1,
        explanation:
          "Network requests can fail; try/catch lets you catch the error and show a friendly message instead of breaking.",
      },
    ],
    flashcards: [
      { front: "Asynchronous", back: "Code that starts a slow task and keeps going, handling the result later without freezing." },
      { front: "Promise", back: "An object representing a future value — pending, fulfilled, or rejected." },
      { front: "async / await", back: "Modern syntax to pause a function until a promise resolves, keeping code readable." },
      { front: "fetch()", back: "Requests data from a URL and returns a promise for the response." },
    ],
    miniProject: {
      title: "Fetch a Random Joke",
      brief: "Pull live data from a free public API and show it.",
      steps: [
        "Write an async function that fetches from a free joke API (e.g. official-joke-api).",
        "await response.json() to get the joke object.",
        "console.log the setup, then the punchline.",
        "Wrap it in try/catch and log a friendly message if it fails.",
      ],
    },
    industryUse: [
      "Twitter and Instagram feeds fetch new posts asynchronously as you scroll, so the app never freezes",
      "Weather and stock apps use fetch to pull live data from APIs every few seconds",
      "Every 'loading spinner' you see is async code waiting on a promise to resolve",
    ],
    commonMistakes: [
      "Forgetting await, so you work with the promise object itself instead of the actual data.",
      "Using await outside an async function — await only works inside a function marked async.",
      "Not handling errors, so a failed request crashes silently — always add try/catch.",
    ],
    interviewQuestions: [
      "What is a promise, and what are its possible states?",
      "How does async/await relate to promises?",
      "How do you handle an error from a failed fetch request?",
    ],
    papers: [],
    nextUp: ["js-weather-app", "js-events"],
    cheatsheet: [
      "async function f() { ... }",
      "const res = await fetch(url)",
      "const data = await res.json()",
      "Promise states: pending / fulfilled / rejected",
      "try { ... } catch (e) { ... }",
      "Old style: fetch(url).then(r => r.json())",
    ],
  },

  "js-weather-app": {
    story:
      "This is where it all clicks together. You're going to build a real, live weather widget: a box with a text field where someone types a city, a button they click, and — a moment later — the current temperature and conditions appear on the page. No page reload, real data from a real weather server. To pull it off you'll use everything from this course at once: variables to hold data, a function to organise the work, DOM code to read the input and write the result, an event listener on the button, and async/await + fetch to talk to the weather API. When it works, you'll have shipped something you'd actually use.",
    problem:
      "Individual skills — variables, functions, the DOM, events, async — are useful, but the real test is wiring them together into one working thing. A weather widget is the perfect project because it needs every piece to cooperate: read what the user typed, ask a server, wait for the answer, and update the screen. Building it turns scattered lessons into a mental model of how real web apps are put together.",
    analogy:
      "Think of it like assembling a sandwich: each ingredient (variable, function, event, fetch) was prepped in earlier lessons — now you layer them in the right order into something you can actually serve.",
    explanation: [
      "Structure: a text input (id \"city\"), a button (id \"go\"), and an empty result area (id \"result\"). Your JavaScript will read the input, fetch data, and fill the result.",
      "Wire the button: button.addEventListener(\"click\", getWeather) so your code runs when the user clicks. Read the typed city with input.value.",
      "Fetch the data: inside an async function, await fetch a weather API URL that includes the city, then await response.json() to get an object with the temperature and conditions.",
      "Show it: set result.textContent (or build elements) to display something like \"Lisbon: 24 degrees, Clear.\" Read the numbers from the JSON object's properties, like data.main.temp.",
      "Handle problems: wrap the fetch in try/catch and, if the city isn't found or the network fails, set the result to a friendly \"Couldn't find that city\" instead of crashing.",
      "Polish: many free APIs (like OpenWeatherMap or Open-Meteo) need you to sign up for a free key or use a specific URL format — read their docs, and keep your key out of public code.",
    ],
    code: {
      language: "javascript",
      source: `const input = document.querySelector("#city");
const button = document.querySelector("#go");
const result = document.querySelector("#result");

async function getWeather() {
  const city = input.value;                       // read what they typed
  result.textContent = "Loading...";
  try {
    const url = "https://api.example-weather.com/now?city=" + city;
    const response = await fetch(url);
    const data = await response.json();            // JSON -> object
    result.textContent = city + ": " + data.temp + " degrees, " + data.sky;
  } catch (error) {
    result.textContent = "Couldn't find that city. Try again.";
  }
}

button.addEventListener("click", getWeather);      // run on click`,
      explanation:
        "One function ties it all together: read the input, fetch live data, await the JSON, and write the result to the page — with try/catch for when things go wrong.",
    },
    exercise: {
      prompt: "Complete getWeather so it reads the city from the input and shows 'Loading...' in the result before fetching.",
      starter: `const input = document.querySelector("#city");
const result = document.querySelector("#result");

async function getWeather() {
  // TODO: read the typed city from input.value into a variable
  const city = ...;
  // TODO: set result.textContent to "Loading..."

  // (fetch logic would go here)
}
`,
      solution: `const input = document.querySelector("#city");
const result = document.querySelector("#result");

async function getWeather() {
  const city = input.value;
  result.textContent = "Loading...";

  // (fetch logic would go here)
}`,
    },
    quiz: [
      {
        question: "In the weather widget, how do you get the city the user typed?",
        options: ["input.textContent", "input.value", "input.city", "input.get()"],
        answerIndex: 1,
        explanation: "A form input's current text lives in its .value property.",
      },
      {
        question: "Why is getWeather marked async?",
        options: [
          "To make it run twice",
          "So it can use await to wait for the fetch without freezing the page",
          "It's required for all functions",
          "To make it faster",
        ],
        answerIndex: 1,
        explanation: "await only works inside an async function, and we need await to wait for the weather data.",
      },
      {
        question: "What's the purpose of the try/catch in the widget?",
        options: [
          "To speed up the fetch",
          "To show a friendly message if the city isn't found or the request fails",
          "To loop the request",
          "To reload the page",
        ],
        answerIndex: 1,
        explanation:
          "Network requests can fail; try/catch lets the widget show a helpful message instead of breaking.",
      },
    ],
    flashcards: [
      { front: "input.value", back: "The current text a user has typed into an input field." },
      { front: "Wiring an app", back: "Combining variables, DOM, events, and fetch into one working flow." },
      { front: "Loading state", back: "Showing 'Loading...' while an async request is in flight, for good UX." },
      { front: "API key", back: "A private token some APIs require; keep it out of public code." },
    ],
    miniProject: {
      title: "Live Weather Widget",
      brief: "Build the full widget end to end with a real free weather API.",
      steps: [
        "Create the HTML: an input (id \"city\"), a button (id \"go\"), and a result div (id \"result\").",
        "Sign up for a free key at a weather API (OpenWeatherMap) or use Open-Meteo which needs none.",
        "Write an async getWeather() that reads input.value, fetches the API, and awaits response.json().",
        "Display the temperature and conditions in the result div; show 'Loading...' first.",
        "Wire it with button.addEventListener(\"click\", getWeather) and add try/catch for bad cities.",
      ],
    },
    industryUse: [
      "The exact pattern here — input, fetch, render — powers search on Amazon, Airbnb, and Google",
      "Weather.com and phone weather apps fetch from APIs and render results just like this widget",
      "Dashboards at companies like Uber fetch live data and update the DOM continuously",
    ],
    commonMistakes: [
      "Forgetting to await the fetch or the .json(), so you try to read data that hasn't arrived yet.",
      "Not showing a loading or error state, leaving the user staring at a blank box when things are slow or fail.",
      "Hard-coding an API key into public code — keep secrets out of code you share or push online.",
    ],
    interviewQuestions: [
      "Walk me through how you'd build a feature that fetches data and displays it on a button click.",
      "How would you handle the case where the API request fails?",
      "Where do the DOM, events, and async each fit in this kind of app?",
    ],
    papers: [],
    nextUp: ["js-async", "js-events"],
    cheatsheet: [
      "Read input: input.value",
      "Wire it: button.addEventListener(\"click\", getWeather)",
      "Fetch: const res = await fetch(url)",
      "Parse: const data = await res.json()",
      "Show: result.textContent = ...",
      "Guard: try { ... } catch { friendly message }",
    ],
  },
};
