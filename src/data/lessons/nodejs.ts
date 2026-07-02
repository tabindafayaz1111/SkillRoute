import type { LessonBody } from "@/types";

export const nodejs: Record<string, LessonBody> = {
  "node-what": {
    story:
      "For years, JavaScript lived in one tiny cage: the web browser. It could make a button glow or a menu drop down, but the moment you closed the tab, it was gone — it couldn't touch files on your computer or talk to a database. Then in 2009 someone took the super-fast JavaScript engine out of Google Chrome and set it loose on your actual computer. That freed-JavaScript-engine is Node.js. Suddenly the same language you used for buttons could read files, run servers, and power the machines behind websites like Netflix and PayPal.",
    problem:
      "If you wanted to build the 'behind the scenes' part of a website — the part that saves your order, checks your password, and sends the confirmation email — you used to need a whole second language (like Java, PHP, or Python) just for the server. That's two languages, two mindsets, two sets of headaches. Node lets you use JavaScript for both sides, so you learn once and build everything.",
    analogy:
      "A browser is a fish tank where JavaScript can only swim in circles. Node.js is dumping that fish into the open ocean — same fish, but now it can go anywhere on your computer.",
    explanation: [
      "Node.js is not a language and not a framework — it's a runtime: a program you install that runs JavaScript files directly on your computer, outside any browser. You type 'node app.js' in a terminal and your code just runs.",
      "It's built on V8, the same lightning-fast engine inside Chrome, which is why Node is quick even for busy websites handling thousands of visitors at once.",
      "Use it when: you're building the server (backend) of a web app, an API, a command-line tool, or any program that needs to read files, hit databases, or talk over the network.",
      "Don't reach for it when: you just need a small static webpage with no logic behind it — plain HTML is simpler. Node shines when there's real work happening on a server.",
      "npm (Node Package Manager) comes bundled with Node. It's a giant free library of pre-written code (called 'packages') you can drop into your project with one command, so you never have to reinvent the wheel.",
      "Pros treat 'npm install' as their first move on any project — need to send email, resize an image, or build an API? There's almost certainly a package for it.",
    ],
    code: {
      language: "javascript",
      source: `// hello.js — your first Node program
// Run it in a terminal with:  node hello.js

console.log("Hello from Node.js!");

// Node can do things a browser never could:
console.log("This program is running on:", process.platform);
console.log("Node version:", process.version);`,
      explanation:
        "console.log prints to the terminal instead of a browser console. The 'process' object is a Node-only tool that knows about the computer your code is running on.",
    },
    exercise: {
      prompt: "Print a friendly line that includes the current folder your program is running in. Hint: process.cwd() gives you that folder as text.",
      starter: `// TODO: print "I am running in: " followed by the current folder
console.log(...);`,
      solution: `console.log("I am running in: " + process.cwd());`,
    },
    quiz: [
      {
        question: "What exactly is Node.js?",
        options: [
          "A new programming language that replaces JavaScript",
          "A runtime that lets JavaScript run outside the browser",
          "A website builder with drag-and-drop",
          "A type of database",
        ],
        answerIndex: 1,
        explanation:
          "Node.js is a runtime — it runs ordinary JavaScript on your computer instead of only inside a browser tab.",
      },
      {
        question: "What is npm used for?",
        options: [
          "Making websites load faster automatically",
          "Installing ready-made packages of code into your project",
          "Designing the visual layout of a page",
          "Connecting your monitor to your keyboard",
        ],
        answerIndex: 1,
        explanation:
          "npm is Node's package manager — a huge library of free, reusable code you pull into your project with one command.",
      },
    ],
    flashcards: [
      { front: "Node.js", back: "A runtime that runs JavaScript on your computer, outside the browser." },
      { front: "Runtime", back: "The program that actually executes your code (Node runs .js files)." },
      { front: "V8", back: "The fast JavaScript engine from Chrome that powers Node." },
      { front: "npm", back: "Node's package manager: a free library of reusable code you install with one command." },
    ],
    miniProject: {
      title: "Your First Node Script",
      brief: "Write and run a tiny Node program that greets you and reports facts about your computer.",
      steps: [
        "Install Node from nodejs.org, then open a terminal and check it worked with 'node --version'.",
        "Create a file called me.js that prints your name and the current time (use new Date()).",
        "Run it with 'node me.js' and watch it print in the terminal.",
        "Add a line that prints process.platform, then run it again to see your operating system.",
      ],
    },
    industryUse: [
      "Netflix uses Node.js for its user-facing website to load pages fast for millions of viewers",
      "PayPal rebuilt its account pages on Node and saw pages load faster with less code",
      "LinkedIn moved its mobile backend to Node to handle huge traffic with fewer servers",
    ],
    commonMistakes: [
      "Confusing Node with JavaScript — Node is the runtime, JavaScript is the language it runs. Node adds extra powers (files, servers) on top.",
      "Forgetting to install Node first, then wondering why 'node app.js' says 'command not found'. Install from nodejs.org before anything else.",
    ],
    interviewQuestions: [
      "What is Node.js, and how is it different from JavaScript running in a browser?",
      "What is npm, and why is it useful when building a project?",
    ],
    papers: [],
    nextUp: ["node-modules", "node-async"],
    cheatsheet: [
      "Node = JavaScript running outside the browser",
      "Run a file: node app.js",
      "Built on V8, Chrome's fast engine",
      "npm = free library of reusable packages",
      "npm install <package> to add code to your project",
      "Great for servers, APIs, and command-line tools",
    ],
  },

  "node-modules": {
    story:
      "Imagine writing an entire novel as one endless sentence with no chapters, no page breaks — just a wall of words. That's what a program becomes if you cram everything into one giant file. Node fixes this with modules: each file is its own little chapter that does one job and shares only what it chooses. When your kitchen app needs to calculate tax, you write a tax.js chapter, then 'require' it wherever you need it — like flipping to exactly the page you want.",
    problem:
      "Real programs have thousands of lines. If it's all in one file, you can't find anything, two pieces of code accidentally trample each other's variables, and you can never reuse a good chunk somewhere else. You need a way to split code into tidy, self-contained pieces — and a way to actually read and write files on the computer, which is half of what servers do all day.",
    analogy:
      "Modules are like labeled kitchen containers: sugar in one, flour in another. You grab only the container you need, and nothing spills into anything else.",
    explanation: [
      "A module is just a file. Anything you want to share from it, you attach to 'module.exports'. Anything else stays private to that file — no accidental clashes.",
      "To use another file's exports, you call require('./filename'). Node reads that file, runs it once, and hands you whatever it exported.",
      "Node ships with built-in modules you didn't write — the most important early one is 'fs' (file system), which reads and writes files on disk.",
      "Use require('fs') for files, require('path') to build file paths safely across Windows/Mac/Linux, and require('./myfile') for your own code.",
      "The modern alternative syntax is 'import/export' (ES modules). require is the classic CommonJS style; you'll see both in the wild, and they do the same job — package code up and share it.",
      "Rule of thumb pros follow: one clear responsibility per file. A file called 'email.js' handles email and nothing else, so anyone can guess what's inside from the name alone.",
    ],
    code: {
      language: "javascript",
      source: `// math.js — a module that shares two helpers
function add(a, b) { return a + b; }
function double(n) { return n * 2; }
module.exports = { add, double };


// app.js — uses the module and reads a file
const { add } = require("./math");
const fs = require("fs");

console.log("2 + 3 =", add(2, 3));

// Write a file, then read it back
fs.writeFileSync("note.txt", "Node can touch files!");
const text = fs.readFileSync("note.txt", "utf8");
console.log("File says:", text);`,
      explanation:
        "math.js exports helpers; app.js pulls in 'add' with require. The built-in 'fs' module writes note.txt and reads it back as text.",
    },
    exercise: {
      prompt: "In math.js, add a 'square' function that multiplies a number by itself and export it too. Then use it in app.js to print the square of 5.",
      starter: `// math.js
function add(a, b) { return a + b; }
// TODO: add a square function and include it in exports
module.exports = { add };

// app.js
const { square } = require("./math");
console.log(...);`,
      solution: `// math.js
function add(a, b) { return a + b; }
function square(n) { return n * n; }
module.exports = { add, square };

// app.js
const { square } = require("./math");
console.log(square(5));`,
    },
    quiz: [
      {
        question: "How do you make a function usable in other files?",
        options: [
          "Write it in ALL CAPS",
          "Attach it to module.exports",
          "Save the file as .txt",
          "Nothing — every function is automatically shared",
        ],
        answerIndex: 1,
        explanation:
          "Only what you attach to module.exports is shared. Everything else in the file stays private.",
      },
      {
        question: "Which built-in module lets you read and write files on the computer?",
        options: ["http", "fs", "path", "math"],
        answerIndex: 1,
        explanation:
          "'fs' stands for file system — it's Node's built-in tool for reading and writing files on disk.",
      },
    ],
    flashcards: [
      { front: "Module", back: "A single file whose shared parts are attached to module.exports." },
      { front: "require()", back: "Pulls in another module's exports (built-in, from npm, or your own file)." },
      { front: "module.exports", back: "The object holding whatever a file chooses to share with others." },
      { front: "fs module", back: "Node's built-in file system tool for reading and writing files." },
    ],
    miniProject: {
      title: "A Reusable Greeting Module",
      brief: "Build a small module you require from a separate app file, and have it save a log to disk.",
      steps: [
        "Create greet.js that exports a greet(name) function returning 'Hello, <name>!'.",
        "Create app.js that requires greet and prints greet('Sam').",
        "Require 'fs' in app.js and use fs.appendFileSync to add each greeting to greetings.txt.",
        "Run app.js a few times and open greetings.txt to see the growing log.",
      ],
    },
    industryUse: [
      "Every Node backend at companies like Uber and Trello is organized into dozens of small modules by responsibility",
      "The 'fs' module powers build tools like Webpack that read and rewrite thousands of project files",
      "Logging systems at banks use modules to append audit records to files on disk",
    ],
    commonMistakes: [
      "Forgetting the './' in require('./math') for your own files. Without the dot-slash, Node looks for an installed package named 'math' instead.",
      "Expecting a variable to be shared just because it's in the file. If it isn't on module.exports, other files can't see it.",
    ],
    interviewQuestions: [
      "What does module.exports do, and how does require use it?",
      "What is the 'fs' module and give an example of reading a file with it?",
    ],
    papers: [],
    nextUp: ["node-async", "node-http"],
    cheatsheet: [
      "One file = one module",
      "Share code: module.exports = { ... }",
      "Use code: const x = require('./file')",
      "Your files need './'; packages don't",
      "fs = read/write files, path = build safe paths",
      "One clear job per file",
    ],
  },

  "node-async": {
    story:
      "Picture a barista who takes your coffee order, then stands frozen staring at the machine until it finishes — refusing to take anyone else's order until yours is done. The line would be out the door. A good barista starts your coffee, and while it brews, takes the next three orders. That's exactly how Node works: when it asks the disk for a file or the database for data, it doesn't stand frozen waiting. It starts the request, moves on to serve others, and comes back when the answer is ready. This 'don't just stand there' trick is why one Node server can handle thousands of visitors at once.",
    problem:
      "Reading a file, querying a database, or fetching a web page takes time — maybe a few hundred milliseconds. If your server froze and did nothing during every wait, it could only serve one person at a time and everyone else would sit in a queue. You need a way to wait for slow things WITHOUT blocking everything else.",
    analogy:
      "Node is a one-person coffee shop that never stands idle: it starts slow tasks, keeps taking new orders while they brew, and delivers each drink the moment it's ready.",
    explanation: [
      "Node has one main worker (a single thread), but it never wastes time waiting. When it hits a slow task (file, database, network), it hands that task off and immediately serves the next request.",
      "The 'event loop' is the tireless checker that keeps asking 'is anything finished yet?' and runs your follow-up code the instant a slow task completes.",
      "You tell Node what to do when the slow thing finishes using a callback (a function to run later), a Promise, or the cleaner async/await syntax.",
      "async/await is the modern favorite: write 'await' in front of a slow task and your code reads top-to-bottom like normal, but Node still stays free to serve others during the wait.",
      "Use this model when your app does lots of waiting-on-I/O (web servers, APIs, chat apps) — that's Node's sweet spot and where it beats heavier setups.",
      "Don't rely on it for heavy number-crunching (video encoding, giant calculations). That work hogs the single worker and freezes everyone — for that, offload to worker threads or a different tool.",
    ],
    code: {
      language: "javascript",
      source: `const fs = require("fs/promises");

async function readMenu() {
  console.log("1. Asking for the file...");
  const text = await fs.readFile("menu.txt", "utf8"); // Node stays free while waiting
  console.log("3. Got it:", text);
}

readMenu();
console.log("2. Meanwhile, I keep working!");

// Prints 1, then 2, then 3 — proof Node didn't freeze during the wait.`,
      explanation:
        "'await' pauses only this function, not the whole program. Line 2 prints before line 3 because Node kept working during the file read.",
    },
    exercise: {
      prompt: "Write an async function that waits 1 second (using the delay helper below) and then prints 'Done waiting!'. Notice the program prints 'Started' first.",
      starter: `const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log("Started");
  // TODO: await a 1000ms delay, then print "Done waiting!"
}
run();`,
      solution: `const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function run() {
  console.log("Started");
  await delay(1000);
  console.log("Done waiting!");
}
run();`,
    },
    quiz: [
      {
        question: "Why doesn't Node freeze while reading a slow file?",
        options: [
          "It uses a hundred computers at once",
          "It starts the slow task and serves other work until the result is ready",
          "Files always read instantly in Node",
          "It skips the file and moves on forever",
        ],
        answerIndex: 1,
        explanation:
          "Node hands off slow I/O and keeps serving other requests, coming back via the event loop when the result is ready.",
      },
      {
        question: "What does 'await' do in an async function?",
        options: [
          "Freezes the entire computer until done",
          "Pauses just that function until the slow task finishes, while Node keeps serving others",
          "Makes the code run twice",
          "Deletes the file being read",
        ],
        answerIndex: 1,
        explanation:
          "await pauses only the current function. Node remains free to handle other work during the wait.",
      },
    ],
    flashcards: [
      { front: "Asynchronous", back: "Starting a slow task and continuing other work instead of waiting idle." },
      { front: "Event loop", back: "Node's checker that runs your follow-up code when a slow task finishes." },
      { front: "Callback", back: "A function you hand to Node to run later, once a task completes." },
      { front: "async/await", back: "Modern syntax that makes waiting on slow tasks read like normal top-to-bottom code." },
    ],
    miniProject: {
      title: "The Impatient Logger",
      brief: "Prove to yourself that Node keeps working during waits, using timers.",
      steps: [
        "Create a delay helper: const delay = (ms) => new Promise(r => setTimeout(r, ms)).",
        "Write an async function that prints 'A', awaits 2 seconds, then prints 'B'.",
        "Right after calling it, print 'C' — watch the order come out A, C, B.",
        "Add a second async task with a 1-second delay and observe how they interleave.",
      ],
    },
    industryUse: [
      "Chat apps like Slack rely on Node's async model to hold thousands of open connections cheaply",
      "Streaming and API gateways at Netflix handle many simultaneous requests thanks to non-blocking I/O",
      "Real-time dashboards and multiplayer game servers use the event loop to serve many users on one process",
    ],
    commonMistakes: [
      "Forgetting 'await' — your code races ahead using data that hasn't arrived yet, and you get 'undefined'. Add await (or handle the Promise).",
      "Doing heavy CPU work (huge loops, video processing) in Node's main thread and freezing every user. Offload it to worker threads or a different service.",
    ],
    interviewQuestions: [
      "Explain, in plain terms, why Node can handle many requests with a single thread.",
      "What's the difference between a callback, a Promise, and async/await?",
    ],
    papers: [],
    nextUp: ["node-http", "node-express"],
    cheatsheet: [
      "Node = single worker that never waits idle",
      "Event loop checks 'is it done yet?'",
      "Slow tasks: files, DB, network",
      "await pauses one function, not the app",
      "Great for I/O, bad for heavy math",
      "Missing await => undefined data",
    ],
  },

  "node-http": {
    story:
      "Every website you visit runs a quiet doorman on some computer far away. When you type an address and hit enter, your browser knocks on that computer's door with a request: 'Please give me the homepage.' The doorman looks at what you asked for and hands back a response: the page. Node lets YOU be that doorman. In about ten lines of code, your own computer can start listening for knocks and answering them — that's a web server, and you're about to build one.",
    problem:
      "So far your Node programs run once and stop. But a website has to stay awake, waiting for visitors, and reply to each one with the right content. You need a program that listens on a network address, understands incoming requests, and sends back proper responses — the raw machinery every web app sits on.",
    analogy:
      "A server is a hotel front desk: it stays open, guests walk up with requests, and the desk hands back exactly what each one asked for.",
    explanation: [
      "Node's built-in 'http' module lets you create a server with http.createServer. You give it a function that runs every time someone visits.",
      "That function receives two things: 'req' (the request — what the visitor wants, including the URL they asked for) and 'res' (the response — how you answer them).",
      "You finish an answer with res.end(...). Before that you can set a status code (200 means OK, 404 means not found) and headers (like the content type).",
      "server.listen(3000) tells Node to stay awake and watch port 3000 — a numbered 'door' on your computer. You then visit http://localhost:3000 in a browser.",
      "Use the raw http module to truly understand what a server is. In real projects, though, people layer Express on top (next lesson) because writing every route by hand with raw http gets tedious fast.",
      "A 'port' is just a numbered door so one computer can run many servers at once — your app on 3000, a database on 5432, and so on, without bumping into each other.",
    ],
    code: {
      language: "javascript",
      source: `const http = require("http");

const server = http.createServer((req, res) => {
  // req.url is the path the visitor asked for, e.g. "/" or "/about"
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my Node server!");
  } else {
    res.writeHead(404);
    res.end("Page not found");
  }
});

server.listen(3000, () => {
  console.log("Listening at http://localhost:3000");
});`,
      explanation:
        "createServer runs the function on every visit. We check req.url to decide the answer, set a status code, and finish with res.end. listen(3000) keeps the server awake.",
    },
    exercise: {
      prompt: "Add a new route: when the visitor asks for '/hello', respond with the text 'Hi there!'. Keep the existing home and 404 behavior.",
      starter: `const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home");
  }
  // TODO: add an "/hello" route that responds "Hi there!"
  else {
    res.writeHead(404);
    res.end("Not found");
  }
});
server.listen(3000);`,
      solution: `const http = require("http");
const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Home");
  } else if (req.url === "/hello") {
    res.end("Hi there!");
  } else {
    res.writeHead(404);
    res.end("Not found");
  }
});
server.listen(3000);`,
    },
    quiz: [
      {
        question: "In the server function, what do 'req' and 'res' represent?",
        options: [
          "Two databases",
          "The incoming request and the response you send back",
          "Reset and Resume buttons",
          "Two different servers",
        ],
        answerIndex: 1,
        explanation:
          "req holds what the visitor asked for; res is how you answer them (status, headers, body).",
      },
      {
        question: "What does server.listen(3000) do?",
        options: [
          "Deletes the server after 3000 milliseconds",
          "Keeps the server awake, watching port 3000 for visitors",
          "Limits the site to 3000 users",
          "Sets the website's password to 3000",
        ],
        answerIndex: 1,
        explanation:
          "listen(3000) keeps Node running and watching port 3000 so you can visit http://localhost:3000.",
      },
    ],
    flashcards: [
      { front: "Server", back: "A program that stays awake, listens for requests, and sends back responses." },
      { front: "req / res", back: "The incoming request object and the outgoing response object in a Node server." },
      { front: "Port", back: "A numbered door on a computer so many servers can run without clashing (e.g. 3000)." },
      { front: "Status code", back: "A number describing the result: 200 OK, 404 Not Found, 500 Server Error." },
    ],
    miniProject: {
      title: "A Three-Page Raw Server",
      brief: "Build a bare Node server with three routes and see it in your browser.",
      steps: [
        "Create server.js with http.createServer and listen on port 3000.",
        "Answer '/' with a welcome message and '/about' with a short bio.",
        "For any other URL, send a 404 with 'Page not found'.",
        "Run it, then visit /, /about, and /random in your browser to see each response.",
      ],
    },
    industryUse: [
      "Internal microservices at many companies start as small raw-http services before scaling up",
      "Health-check endpoints (a simple /health route returning 200) run on the http module at nearly every Node shop",
      "Learning tools and lightweight proxies are often built directly on Node's http module for speed",
    ],
    commonMistakes: [
      "Forgetting res.end() — the browser spins forever because the server never finished its answer. Always end the response.",
      "Trying to visit the site before running server.listen, or after the program already exited. The server must be running and listening.",
    ],
    interviewQuestions: [
      "Walk through what happens from a browser request to a Node http response.",
      "What is a port, and why do servers need one?",
    ],
    papers: [],
    nextUp: ["node-express", "node-rest"],
    cheatsheet: [
      "http.createServer((req, res) => { ... })",
      "req.url = what the visitor asked for",
      "res.writeHead(status, headers)",
      "res.end('body') finishes the reply",
      "server.listen(3000) stays awake",
      "Visit http://localhost:3000",
    ],
  },

  "node-express": {
    story:
      "Building a server with raw http is like building a car from loose bolts every single time — technically possible, but exhausting. So the Node community built Express: a friendly framework that hands you the car pre-assembled. Instead of one giant if/else checking every URL by hand, you just say 'when someone visits /users, run this function.' Express is the most popular way to build web servers in Node, and once you see it, you'll never want to go back to the loose bolts.",
    problem:
      "In raw http, every route lives inside one growing pile of if-statements, you parse the URL and request body by hand, and adding a shared behavior (like logging every request) means touching everything. It gets messy fast. You need clean, named routes and an easy way to run shared steps on requests.",
    analogy:
      "Express is a restaurant's system of stations: the greeter, the kitchen, the waiter each handle one step and pass the order along. Each 'station' is a piece of middleware, and each dish on the menu is a route.",
    explanation: [
      "Install Express with 'npm install express'. Then app.get('/path', handler) says 'when someone GETs this path, run this handler.' Clean, named, no giant if/else.",
      "Handlers receive (req, res) just like raw http, but Express adds conveniences: res.json(data) sends JSON in one line, and req.params grabs values out of the URL.",
      "Middleware is the star feature: a function that runs on the way in, before your route. It gets (req, res, next) and calls next() to pass control along. Great for logging, checking logins, or parsing the request body.",
      "app.use(express.json()) is middleware that reads incoming JSON so req.body is ready to use — you'll want it for any API that accepts data.",
      "Route parameters like '/users/:id' let one route handle many URLs. Visiting /users/42 makes req.params.id equal '42'.",
      "Use Express for basically any Node web app or API — it's the default choice. Reach for lighter tools only when you need extreme minimalism, or fuller frameworks (like NestJS) when a big team needs more structure.",
    ],
    code: {
      language: "javascript",
      source: `const express = require("express");
const app = express();

app.use(express.json()); // parse incoming JSON bodies

// A logging middleware — runs on EVERY request
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next(); // pass control to the next step
});

app.get("/", (req, res) => res.send("Home page"));

app.get("/users/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Sam" });
});

app.listen(3000, () => console.log("Express on http://localhost:3000"));`,
      explanation:
        "The middleware logs every request then calls next(). app.get defines routes; ':id' is a URL parameter read via req.params. res.json sends JSON automatically.",
    },
    exercise: {
      prompt: "Add a GET route for '/hello/:name' that responds with JSON like { greeting: 'Hello, Sam!' } using the name from the URL.",
      starter: `const express = require("express");
const app = express();

// TODO: add GET /hello/:name that returns { greeting: "Hello, <name>!" }

app.listen(3000);`,
      solution: `const express = require("express");
const app = express();

app.get("/hello/:name", (req, res) => {
  res.json({ greeting: "Hello, " + req.params.name + "!" });
});

app.listen(3000);`,
    },
    quiz: [
      {
        question: "What is middleware in Express?",
        options: [
          "A database that sits in the middle of your app",
          "A function that runs during a request and can pass control on with next()",
          "The middle route in your list",
          "A paid Express feature",
        ],
        answerIndex: 1,
        explanation:
          "Middleware runs on the way into a request — for logging, auth, parsing — and calls next() to continue.",
      },
      {
        question: "In the route '/users/:id', if you visit /users/42, what is req.params.id?",
        options: ["'users'", "'42'", "undefined", "the whole URL"],
        answerIndex: 1,
        explanation:
          "':id' is a placeholder. Visiting /users/42 makes req.params.id equal to '42'.",
      },
    ],
    flashcards: [
      { front: "Express", back: "The most popular Node framework for building web servers and APIs with clean routes." },
      { front: "Route", back: "A path + method pairing (e.g. GET /users) mapped to a handler function." },
      { front: "Middleware", back: "A function running during a request that can act then call next() to continue." },
      { front: "req.params", back: "Values pulled from URL placeholders like ':id' in a route path." },
    ],
    miniProject: {
      title: "A Tiny Express Greeter API",
      brief: "Spin up an Express app with a couple of routes and a logger.",
      steps: [
        "Run 'npm init -y' then 'npm install express' in a new folder.",
        "Create app.js with express.json() and a logging middleware that prints method and URL.",
        "Add GET '/' returning a welcome message and GET '/greet/:name' returning JSON.",
        "Run it and visit /greet/YourName, watching the log print in your terminal.",
      ],
    },
    industryUse: [
      "Express powers the backend of countless startups and is used inside companies like IBM and Accenture",
      "APIs at fintech and e-commerce firms use Express middleware for authentication and request logging",
      "Many popular Node frameworks (like NestJS) are built on top of Express under the hood",
    ],
    commonMistakes: [
      "Forgetting app.use(express.json()), then finding req.body is undefined when a client POSTs data. Add the JSON parser first.",
      "Forgetting to call next() in custom middleware, so the request hangs forever. Always call next() (or send a response).",
    ],
    interviewQuestions: [
      "What is middleware in Express and give two real uses for it?",
      "How do route parameters work, and how do you read them?",
    ],
    papers: [],
    nextUp: ["node-rest", "node-db"],
    cheatsheet: [
      "npm install express",
      "app.get('/path', (req, res) => ...)",
      "app.use(express.json()) to read JSON bodies",
      "Middleware: (req, res, next) => { ...; next(); }",
      "URL params: '/users/:id' -> req.params.id",
      "res.json(data) sends JSON in one line",
    ],
  },

  "node-rest": {
    story:
      "Think about how a good librarian works. You don't tell them HOW to fetch a book — you just say what you want ('give me book #12', 'add this new book', 'remove that one'), and they know exactly what to do. A REST API is that agreement between apps: a shared, predictable language for asking a server to create, read, update, or delete things. Once your phone app and your website both speak REST, they can talk to the same backend without any confusion.",
    problem:
      "Your frontend (a website or phone app) and your backend (the server) are two separate programs, often written by different people. Without agreed rules, every project invents its own oddball way to ask for data, and nothing is predictable. REST is a widely-shared set of conventions so any developer can guess how your API works.",
    analogy:
      "REST is like a standardized menu at a diner: everyone knows 'GET' means look, 'POST' means order a new dish, 'PUT' means change your order, and 'DELETE' means cancel it — no explanation needed.",
    explanation: [
      "In REST, everything is a 'resource' — a thing like a user, a post, or an order. Each resource gets a clear URL, usually a plural noun: /posts, /users, /orders.",
      "The HTTP method says what you want to do: GET reads, POST creates, PUT/PATCH updates, DELETE removes. Same URL, different verb, different action.",
      "So GET /posts lists all posts, GET /posts/5 fetches post 5, POST /posts creates one, PUT /posts/5 updates it, DELETE /posts/5 removes it. Predictable and tidy.",
      "The server answers with data (usually JSON) plus a status code: 200 OK, 201 Created, 404 Not Found, 400 Bad Request. The code tells the client what happened at a glance.",
      "Use REST when different clients (web, mobile, other services) all need to share one backend — it's the default for most web APIs today.",
      "Good habits pros follow: use nouns not verbs in URLs (/posts, not /getPosts), keep it consistent, and return the right status codes so clients can react correctly.",
    ],
    code: {
      language: "javascript",
      source: `const express = require("express");
const app = express();
app.use(express.json());

let posts = [{ id: 1, title: "Hello world" }];

app.get("/posts", (req, res) => res.json(posts));           // read all

app.post("/posts", (req, res) => {                          // create
  const post = { id: Date.now(), title: req.body.title };
  posts.push(post);
  res.status(201).json(post);                               // 201 = Created
});

app.delete("/posts/:id", (req, res) => {                    // delete one
  posts = posts.filter((p) => p.id !== Number(req.params.id));
  res.status(204).end();                                    // 204 = No Content
});

app.listen(3000);`,
      explanation:
        "Same '/posts' resource, three verbs: GET reads, POST creates (returning 201), DELETE removes (returning 204). This is the heart of REST design.",
    },
    exercise: {
      prompt: "Add a GET route for a single post: GET /posts/:id should find the post by id and return it, or return status 404 with a message if it doesn't exist.",
      starter: `let posts = [{ id: 1, title: "Hello world" }];

app.get("/posts/:id", (req, res) => {
  // TODO: find the post by Number(req.params.id)
  // if found, res.json(it); else res.status(404).json({ error: "Not found" })
});`,
      solution: `let posts = [{ id: 1, title: "Hello world" }];

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ error: "Not found" });
  }
});`,
    },
    quiz: [
      {
        question: "Which HTTP method should create a brand-new resource?",
        options: ["GET", "POST", "DELETE", "There is no rule"],
        answerIndex: 1,
        explanation:
          "POST creates. GET reads, PUT/PATCH updates, DELETE removes — that's the REST convention.",
      },
      {
        question: "A well-designed REST URL for the collection of blog posts looks like…",
        options: ["/getAllPostsNow", "/posts", "/data?type=post&action=list", "/post-fetcher"],
        answerIndex: 1,
        explanation:
          "REST uses plural nouns for resources: /posts. The verb (what to do) comes from the HTTP method, not the URL.",
      },
    ],
    flashcards: [
      { front: "REST", back: "A shared convention for APIs: resources at URLs, actions chosen by HTTP method." },
      { front: "Resource", back: "A thing your API manages (user, post, order), given a clear URL like /posts." },
      { front: "HTTP methods", back: "GET read, POST create, PUT/PATCH update, DELETE remove." },
      { front: "Status code", back: "A number reporting the outcome: 200 OK, 201 Created, 404 Not Found, 400 Bad Request." },
    ],
    miniProject: {
      title: "Design a Bookshelf API on Paper",
      brief: "Plan a full REST API for a bookshelf before writing any code.",
      steps: [
        "List the resource (books) and its fields (id, title, author).",
        "Write the five endpoints: GET /books, GET /books/:id, POST /books, PUT /books/:id, DELETE /books/:id.",
        "Next to each, note the success status code (200, 201, 204) and one error code.",
        "Implement two of them in Express and test with your browser or a tool like curl.",
      ],
    },
    industryUse: [
      "Stripe's payment API is a famous, beautifully-designed REST API used by millions of businesses",
      "GitHub exposes a REST API so tools can read and manage repositories programmatically",
      "Twitter/X, Spotify, and weather services all offer REST APIs that apps everywhere build on",
    ],
    commonMistakes: [
      "Putting verbs in URLs like /createPost or /deleteUser. The verb belongs in the HTTP method; keep URLs as nouns.",
      "Always returning 200 even on errors. Return honest codes (404, 400, 500) so clients can tell success from failure.",
    ],
    interviewQuestions: [
      "Design REST endpoints for a to-do app, including methods and status codes.",
      "What's the difference between PUT and PATCH, and when would you use each?",
    ],
    papers: [],
    nextUp: ["node-db", "node-deploy"],
    cheatsheet: [
      "Resource = a thing, at a noun URL (/posts)",
      "GET read · POST create · PUT/PATCH update · DELETE remove",
      "GET /posts (all) vs GET /posts/5 (one)",
      "201 Created · 204 No Content · 404 Not Found",
      "Nouns in URLs, verbs in methods",
      "Return honest status codes",
    ],
  },

  "node-db": {
    story:
      "Everything your server has built so far vanishes the moment it restarts — all those blog posts lived only in a variable in memory, and memory is wiped clean every time the program stops. That's a disaster for a real app; imagine a store that forgets every order overnight. A database is the fireproof filing cabinet that keeps your data safe on disk, even through restarts, crashes, and updates. Connecting your Node app to one is what turns a toy into a real product.",
    problem:
      "Storing data in a plain JavaScript array works until your program restarts — then it's all gone. You also can't easily search, sort, or safely let many users write at once. You need durable storage that survives restarts and handles real-world data reliably: a database.",
    analogy:
      "In-memory data is a whiteboard wiped clean when you leave the room. A database is a locked filing cabinet: your papers are still there tomorrow, neatly labeled and findable.",
    explanation: [
      "Two big families: SQL databases (Postgres, MySQL) store data in neat tables with strict columns — great when your data has clear structure. NoSQL databases (MongoDB) store flexible document 'blobs' — handy when your data shape shifts.",
      "Your Node app doesn't talk to the database in raw wire-speak; it uses a 'driver' or a nicer 'ORM/ODM' library installed from npm (like 'pg' for Postgres, or Mongoose for MongoDB).",
      "Every database call is slow (it goes over the network to the database), so it's asynchronous — you use await, exactly the pattern from the async lesson.",
      "The four core actions match REST perfectly: Create, Read, Update, Delete (CRUD). Your POST route creates a row, your GET route reads rows, and so on.",
      "Never paste user input straight into a query — that's the classic 'SQL injection' hole attackers exploit. Use parameterized queries (placeholders like $1) so the database treats input as data, not commands.",
      "Use SQL when you value structure, relationships, and strong guarantees (banking, orders). Use NoSQL when you want flexibility and speed for loosely-structured data (logs, user profiles, content).",
    ],
    code: {
      language: "javascript",
      source: `const { Pool } = require("pg");        // Postgres driver from npm
const db = new Pool({ connectionString: process.env.DATABASE_URL });

// READ: get all posts
async function getPosts() {
  const result = await db.query("SELECT * FROM posts");
  return result.rows;
}

// CREATE: insert safely with a placeholder ($1), never string-glued
async function addPost(title) {
  const result = await db.query(
    "INSERT INTO posts (title) VALUES ($1) RETURNING *",
    [title]
  );
  return result.rows[0];
}`,
      explanation:
        "The 'pg' driver runs SQL from Node. Note the $1 placeholder with a separate values array — that's a parameterized query, which blocks SQL injection.",
    },
    exercise: {
      prompt: "Write an async deletePost(id) function that runs 'DELETE FROM posts WHERE id = $1' using a parameterized query with the given id.",
      starter: `async function deletePost(id) {
  // TODO: run a parameterized DELETE using $1 and [id]
}`,
      solution: `async function deletePost(id) {
  await db.query("DELETE FROM posts WHERE id = $1", [id]);
}`,
    },
    quiz: [
      {
        question: "Why do we use a database instead of a JavaScript array for real data?",
        options: [
          "Arrays are illegal in Node",
          "A database keeps data safe on disk so it survives restarts and crashes",
          "Databases are always faster than arrays for everything",
          "Arrays can't hold numbers",
        ],
        answerIndex: 1,
        explanation:
          "In-memory arrays vanish on restart. A database persists data durably and handles many users reliably.",
      },
      {
        question: "Why use a parameterized query with placeholders like $1?",
        options: [
          "It looks nicer",
          "It protects against SQL injection by treating input as data, not commands",
          "It makes the query run slower on purpose",
          "It's required to connect to any database",
        ],
        answerIndex: 1,
        explanation:
          "Placeholders keep user input as pure data, closing the SQL injection hole that string-gluing opens.",
      },
    ],
    flashcards: [
      { front: "Database", back: "Durable storage that keeps data on disk, surviving restarts and crashes." },
      { front: "SQL vs NoSQL", back: "SQL = structured tables (Postgres); NoSQL = flexible documents (MongoDB)." },
      { front: "CRUD", back: "Create, Read, Update, Delete — the four core data operations." },
      { front: "Parameterized query", back: "Using placeholders ($1) so user input can't inject malicious SQL." },
    ],
    miniProject: {
      title: "Persist Your Posts",
      brief: "Swap an in-memory array for a real database in a small Express API.",
      steps: [
        "Install a free Postgres (locally or a cloud like Supabase/Neon) and the 'pg' package.",
        "Create a 'posts' table with columns id and title.",
        "Rewrite your GET /posts route to await db.query('SELECT * FROM posts').",
        "Rewrite POST /posts to insert with a parameterized query, then restart the server and confirm your data is still there.",
      ],
    },
    industryUse: [
      "Instagram and countless apps store user data in PostgreSQL, a SQL database",
      "MongoDB (NoSQL) powers flexible content and catalog data at companies like eBay and Forbes",
      "Banks rely on SQL databases' strong guarantees so a transfer never half-completes",
    ],
    commonMistakes: [
      "Gluing user input into SQL with string concatenation, opening a SQL injection hole. Always use parameterized queries.",
      "Forgetting 'await' on database calls, so you use a Promise instead of the actual rows. Await every query.",
    ],
    interviewQuestions: [
      "What is SQL injection and how do parameterized queries prevent it?",
      "When would you choose a SQL database over a NoSQL one, and vice versa?",
    ],
    papers: [],
    nextUp: ["node-deploy", "node-api-project"],
    cheatsheet: [
      "Arrays vanish on restart; databases persist",
      "SQL = tables (Postgres) · NoSQL = documents (Mongo)",
      "Install a driver via npm (pg, mongoose)",
      "DB calls are async -> use await",
      "CRUD = Create Read Update Delete",
      "Always parameterize: VALUES ($1), [value]",
    ],
  },

  "node-deploy": {
    story:
      "Your app runs beautifully — on your laptop. But 'http://localhost:3000' only works for you; the moment you close your laptop, the site is gone, and nobody on the internet can reach it. Deploying means putting your app on a computer that stays on 24/7 in a data center, with a real web address anyone can visit. It's the difference between cooking a great meal in your kitchen and actually opening the restaurant.",
    problem:
      "'localhost' is a private address that only your own machine understands. For real users to reach your app, it has to live on an always-on server with a public address, safely configured with its secrets and set to restart if it crashes. Doing that by hand is fiddly, so modern platforms automate most of it.",
    analogy:
      "Running on localhost is rehearsing a play in your living room. Deploying is renting a real theater with a marquee, seats, and doors the public can walk through.",
    explanation: [
      "A hosting platform (Render, Railway, Fly.io, Heroku, or a cloud like AWS) runs your app on an always-on machine and gives it a public URL. Most connect straight to your GitHub repo and redeploy when you push.",
      "Never hard-code secrets (database passwords, API keys) in your files. Put them in environment variables and read them with process.env.NAME — the platform injects the real values at run time.",
      "Let the host pick the port: use const port = process.env.PORT || 3000, because the platform decides which port your app should listen on.",
      "Add a 'start' script in package.json ('node app.js') so the platform knows how to launch your app. It runs 'npm install' then 'npm start' for you.",
      "Use a managed database (the same platform, or Supabase/Neon/Mongo Atlas) rather than one on your laptop — it needs to be always-on too, and reachable from your deployed app.",
      "Watch the logs after deploying. Crashes, missing environment variables, and port mistakes are the usual first-day problems, and the logs point right at them.",
    ],
    code: {
      language: "javascript",
      source: `// app.js — small changes make an app deploy-ready

// 1. Read the port the host gives you (fallback to 3000 locally)
const port = process.env.PORT || 3000;

// 2. Read secrets from the environment, never hard-coded
const dbUrl = process.env.DATABASE_URL;

// 3. Listen on that port
app.listen(port, () => console.log("Live on port " + port));

// package.json needs:  "scripts": { "start": "node app.js" }`,
      explanation:
        "process.env.PORT lets the platform choose the port; process.env.DATABASE_URL keeps secrets out of your code. The 'start' script tells the host how to run your app.",
    },
    exercise: {
      prompt: "Make this line deploy-ready: it currently hard-codes port 3000. Change it to use the platform's port if provided, otherwise 3000.",
      starter: `// TODO: use the host's port when available
const port = 3000;
app.listen(port);`,
      solution: `const port = process.env.PORT || 3000;
app.listen(port);`,
    },
    quiz: [
      {
        question: "Why can't real users visit your app at http://localhost:3000?",
        options: [
          "localhost is too slow",
          "localhost only refers to your own machine, not the public internet",
          "Port 3000 is banned online",
          "Browsers block all localhost sites",
        ],
        answerIndex: 1,
        explanation:
          "localhost is a private address meaning 'this computer'. Users need a public URL on an always-on server.",
      },
      {
        question: "Where should your database password live in a deployed app?",
        options: [
          "Hard-coded in app.js so it's easy to find",
          "In an environment variable, read via process.env",
          "In a public comment for teammates",
          "Nowhere — deployed apps don't use passwords",
        ],
        answerIndex: 1,
        explanation:
          "Secrets belong in environment variables, injected by the platform, never hard-coded into your source files.",
      },
    ],
    flashcards: [
      { front: "Deploy", back: "Put your app on an always-on server with a public URL anyone can reach." },
      { front: "localhost", back: "A private address meaning 'this very computer' — not reachable from the internet." },
      { front: "Environment variable", back: "A setting (like a secret) supplied at run time, read via process.env." },
      { front: "process.env.PORT", back: "The port the hosting platform tells your app to listen on." },
    ],
    miniProject: {
      title: "Ship It to the World",
      brief: "Take a working Express app from your laptop to a live public URL.",
      steps: [
        "Push your app to a GitHub repository, making sure package.json has a 'start' script.",
        "Create a free account on a host like Render or Railway and connect the repo.",
        "Add your DATABASE_URL and any secrets as environment variables in the platform's dashboard.",
        "Deploy, open the public URL, and check the logs if anything doesn't work.",
      ],
    },
    industryUse: [
      "Startups deploy Node backends on Render, Railway, and Vercel to launch quickly without managing servers",
      "Larger companies deploy Node on AWS, Google Cloud, or Azure, often inside Docker containers",
      "Teams use environment variables and platform secrets managers to keep API keys out of their code at Netflix, Stripe, and beyond",
    ],
    commonMistakes: [
      "Hard-coding port 3000 instead of using process.env.PORT, so the app won't bind on the host. Read the port from the environment.",
      "Leaving secrets in your code or committing a .env file to GitHub. Keep secrets in the platform's environment variables and add .env to .gitignore.",
    ],
    interviewQuestions: [
      "Why should configuration and secrets live in environment variables rather than in code?",
      "Walk through the steps to deploy a Node/Express app to a cloud host.",
    ],
    papers: [],
    nextUp: ["node-api-project"],
    cheatsheet: [
      "localhost = only your machine",
      "Deploy = always-on server + public URL",
      "port = process.env.PORT || 3000",
      "Secrets in env vars: process.env.NAME",
      "package.json: \"start\": \"node app.js\"",
      "Use a managed, always-on database",
    ],
  },

  "node-api-project": {
    story:
      "This is where everything clicks into one real thing. You're going to build the backend for a blog — the exact kind of service that sits behind a real website or phone app. It will let anyone create a post, list all posts, read a single post, edit one, and delete one, with the data saved in a real database so nothing disappears. When you finish, you'll have a working REST API you could genuinely plug a website into, plus proof to yourself that all the pieces — Express, routes, JSON, databases — snap together.",
    problem:
      "You've learned modules, async, Express, REST, and databases as separate pieces. But a real project is about wiring them into one coherent app that handles messy reality: missing fields, requests for posts that don't exist, and data that must survive a restart. This project forces every piece to work together.",
    analogy:
      "Until now you've been practicing knife skills, sauces, and plating separately. This is cooking the whole dinner and serving it — a complete Blog API, start to finish.",
    explanation: [
      "The resource is 'posts', each with an id, a title, and a body. You'll expose the five classic REST endpoints for it — the full CRUD set.",
      "GET /posts returns every post; GET /posts/:id returns one (or a 404 if it's missing); POST /posts creates one from the JSON body; PUT /posts/:id updates one; DELETE /posts/:id removes one.",
      "Use express.json() so req.body is filled in, and validate input: if someone POSTs without a title, respond 400 Bad Request instead of saving junk.",
      "Store posts in a database using async/await, so the blog survives restarts. Start with an in-memory array to get routes working, then swap in a real database once they do.",
      "Return honest status codes throughout: 201 when you create, 200 when you read or update, 204 when you delete, 404 when something's missing, 400 for bad input.",
      "Finish by deploying it to a public URL — now you have a live, shareable Blog API, the same shape as APIs powering real apps today.",
    ],
    code: {
      language: "javascript",
      source: `const express = require("express");
const app = express();
app.use(express.json());

let posts = [];        // swap for a database once routes work

app.get("/posts", (req, res) => res.json(posts));

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Not found" });
  res.json(post);
});

app.post("/posts", (req, res) => {
  if (!req.body.title) return res.status(400).json({ error: "Title required" });
  const post = { id: Date.now(), title: req.body.title, body: req.body.body || "" };
  posts.push(post);
  res.status(201).json(post);
});

app.delete("/posts/:id", (req, res) => {
  posts = posts.filter((p) => p.id !== Number(req.params.id));
  res.status(204).end();
});

app.listen(process.env.PORT || 3000);`,
      explanation:
        "A complete mini Blog API: list, read-one (with 404), create (with 400 validation and 201), and delete (204). Swap the array for a database to make it permanent.",
    },
    exercise: {
      prompt: "Add the missing UPDATE route: PUT /posts/:id should find the post, replace its title with req.body.title, and return it — or return 404 if the post doesn't exist.",
      starter: `app.put("/posts/:id", (req, res) => {
  // TODO: find the post by Number(req.params.id)
  // if missing -> 404; else update its title and return the post
});`,
      solution: `app.put("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === Number(req.params.id));
  if (!post) return res.status(404).json({ error: "Not found" });
  post.title = req.body.title;
  res.json(post);
});`,
    },
    quiz: [
      {
        question: "A user sends POST /posts with no title. What should the API do?",
        options: [
          "Save it anyway with an empty title",
          "Respond 400 Bad Request and not save it",
          "Crash the server",
          "Redirect to the home page",
        ],
        answerIndex: 1,
        explanation:
          "Validate input: a missing required field should return 400 Bad Request, not silently save bad data.",
      },
      {
        question: "GET /posts/999 when post 999 doesn't exist should return…",
        options: ["200 with an empty object", "404 Not Found", "500 Server Error", "201 Created"],
        answerIndex: 1,
        explanation:
          "Asking for a resource that doesn't exist should return 404 Not Found so the client knows.",
      },
    ],
    flashcards: [
      { front: "CRUD endpoints", back: "GET (list/one), POST (create), PUT/PATCH (update), DELETE (remove)." },
      { front: "Input validation", back: "Checking a request's data (e.g. title present) and returning 400 if it's bad." },
      { front: "404 vs 400", back: "404 = the thing doesn't exist; 400 = the request itself is malformed." },
      { front: "201 Created", back: "The status code returned when a POST successfully creates a new resource." },
    ],
    miniProject: {
      title: "Build & Ship the Blog API",
      brief: "Create the full CRUD Blog API, back it with a database, and deploy it live.",
      steps: [
        "Scaffold an Express app with express.json() and an in-memory posts array.",
        "Implement all five routes (GET all, GET one with 404, POST with 400 validation, PUT, DELETE) and test each.",
        "Swap the array for a real database using async/await parameterized queries.",
        "Add a 'start' script, read process.env.PORT, and deploy to Render or Railway.",
        "Share the public URL and try creating, reading, and deleting posts against the live API.",
      ],
    },
    industryUse: [
      "The Blog API pattern is the exact shape behind headless CMS products like Contentful and Ghost",
      "Comment systems, note apps, and to-do backends at thousands of companies are CRUD REST APIs just like this",
      "Mobile apps commonly share one such Node/Express REST backend across iOS, Android, and web",
    ],
    commonMistakes: [
      "Skipping validation and letting bad or missing data into the database. Check required fields and return 400.",
      "Comparing req.params.id (a string) directly to a numeric id and getting no match. Convert with Number() first.",
    ],
    interviewQuestions: [
      "Walk me through the endpoints and status codes of a REST API for a blog.",
      "How would you handle a request for a resource that doesn't exist, and one with invalid input?",
    ],
    papers: [],
    nextUp: ["node-deploy"],
    cheatsheet: [
      "Resource: posts (id, title, body)",
      "GET /posts · GET /posts/:id · POST · PUT · DELETE",
      "express.json() so req.body works",
      "Validate: missing title -> 400",
      "Missing post -> 404; created -> 201; deleted -> 204",
      "Array first, database next, then deploy",
    ],
  },
};
