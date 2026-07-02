import type { LessonBody } from "@/types";

export const fullstack: Record<string, LessonBody> = {
  "how-web-works": {
    story:
      "You type netflix.com and hit Enter. In under a second a movie wall appears. What actually happened? Your browser (a program on your laptop) mailed a tiny note across the world that said 'please send me the Netflix homepage'. A powerful computer that never sleeps — a server — read that note, gathered the page, and mailed it back. Your browser unwrapped the reply and painted it on screen. That back-and-forth of notes is the entire web. Every site you have ever used is just your computer politely asking another computer for stuff.",
    problem:
      "Your laptop can't hold every website, video, and bank balance in the world. Someone else's always-on computer holds them. The web is simply the agreed-upon way for your computer to ask for a piece of that, and get an answer, without the two ever having met before.",
    analogy:
      "It's like ordering at a restaurant: you (the client) give the waiter a written order, the kitchen (the server) makes it, and the waiter brings back exactly what you asked for — or a note saying 'we're out of that'.",
    explanation: [
      "The client is the asker — usually your web browser (Chrome, Safari). The server is the answerer — a computer sitting in a data centre, running 24/7, waiting for requests.",
      "They talk using HTTP, a plain set of rules for the request-and-reply. A request has a method (what you want to do) and a URL (the address of the thing). GET means 'give me this', POST means 'here is some new data, please save it'.",
      "Every reply comes with a status code — a 3-digit signal. 200 means 'here you go, all good', 404 means 'I couldn't find that', 500 means 'something broke on my end'. You will see these constantly.",
      "The address itself has parts: https:// (use the secure, encrypted version), the domain (netflix.com — the server's human-friendly name), and a path (/browse — which page).",
      "Before any of this, your computer looks up the domain's real numeric address (its IP) using DNS — the internet's phone book that turns netflix.com into something like 52.4.1.9.",
      "Use this mental model whenever a site feels slow or broken: is the request even reaching the server? Is the server replying with an error code? Almost every web bug lives somewhere in this round trip.",
    ],
    math: "One page load can trigger dozens of requests: 1 for the HTML, then more for each image, stylesheet, and script the page references. Total load time ≈ the slowest chain of these round trips.",
    code: {
      language: "text",
      source: `# What your browser actually sends (a GET request)
GET /browse HTTP/1.1
Host: netflix.com

# What the server sends back
HTTP/1.1 200 OK
Content-Type: text/html

<html>... the page ...</html>`,
      explanation:
        "The top block is the note your browser mails; the bottom is the reply. 200 OK means success, and the HTML that follows is the page your browser paints.",
    },
    exercise: {
      prompt: "Match each status code to its meaning by filling in the blanks.",
      starter: `# TODO: replace each ??? with the right meaning
status_200 = "???"   # request succeeded
status_404 = "???"   # thing not found
status_500 = "???"   # server crashed`,
      solution: `status_200 = "OK - here is what you asked for"
status_404 = "Not Found - that page does not exist"
status_500 = "Internal Server Error - the server broke"`,
    },
    quiz: [
      {
        question: "In the request-reply model, what is the 'server'?",
        options: [
          "Your web browser",
          "An always-on computer that answers requests",
          "The internet cable",
          "Your keyboard",
        ],
        answerIndex: 1,
        explanation:
          "The server is the answerer — a computer that stays on and sends back whatever clients ask for. Your browser is the client (the asker).",
      },
      {
        question: "You visit a link and see '404'. What does that mean?",
        options: [
          "The page loaded perfectly",
          "The server couldn't find the thing you asked for",
          "Your internet is down",
          "The server is overloaded",
        ],
        answerIndex: 1,
        explanation: "404 = Not Found. The server got your request fine, but there's nothing at that address.",
      },
    ],
    flashcards: [
      { front: "Client", back: "The program that makes a request — usually your web browser." },
      { front: "Server", back: "An always-on computer that receives requests and sends back replies." },
      { front: "HTTP", back: "The rules browsers and servers use to send requests and replies." },
      { front: "Status code", back: "A 3-digit reply signal: 200 OK, 404 Not Found, 500 Server Error." },
    ],
    miniProject: {
      title: "Spy on a Real Request",
      brief: "Use your browser's built-in tools to watch the notes fly back and forth on a real site.",
      steps: [
        "Open any website, then press F12 to open Developer Tools and click the 'Network' tab.",
        "Refresh the page and watch the list of requests fill up.",
        "Click one request and find its Status (like 200) and its URL.",
        "Count how many separate requests one page load actually made — you'll be surprised.",
      ],
    },
    industryUse: [
      "Netflix serves its homepage as an HTTP reply to millions of browser requests at once",
      "Amazon returns a 404 page when you follow a link to a product that's been removed",
      "Banks use https:// so the request carrying your login is encrypted end to end",
    ],
    commonMistakes: [
      "Thinking the website 'lives' on your computer — it lives on a server; your browser just borrows a copy each visit.",
      "Confusing a slow site with a broken one — open the Network tab to see whether the request is stuck or the server replied with an error.",
    ],
    interviewQuestions: [
      "Walk me through what happens, step by step, from typing a URL to seeing the page.",
      "What's the difference between a GET and a POST request?",
      "What do the status codes 200, 404, and 500 mean?",
    ],
    papers: [],
    nextUp: ["html-css", "fs-api"],
    cheatsheet: [
      "Client asks, server answers — over HTTP",
      "GET = fetch data, POST = send/save data",
      "200 OK · 404 Not Found · 500 Server Error",
      "URL = protocol + domain + path (https://site.com/page)",
      "DNS turns a domain name into a numeric IP address",
    ],
  },

  "html-css": {
    story:
      "Think of building a web page like building a house. First you put up the walls, doors, and rooms — the raw structure. That's HTML: it says 'here is a heading, here is a paragraph, here is a button'. But bare walls are ugly. So you paint them, choose the flooring, hang art — that's CSS: it says 'make that heading big and blue, give the button rounded corners, centre everything'. HTML is what's on the page; CSS is how it looks. Every website you love is these two working together.",
    problem:
      "A browser can only draw what you describe to it. You need one language to lay out the content (what words, images, and buttons exist) and another to style it (colours, sizes, spacing). Without HTML there's nothing on the page; without CSS everything is plain black text on white, stacked top to bottom.",
    analogy:
      "HTML is the skeleton of a body — bones giving it shape. CSS is the skin, hair, and clothing that make it look like a specific person.",
    explanation: [
      "HTML is made of tags wrapped in angle brackets. Most come in pairs: <h1>Big Title</h1> opens and closes around your content. The opening tag turns the styling on; the closing tag (with a slash) turns it off.",
      "Common tags: <h1> to <h6> for headings, <p> for paragraphs, <a> for links, <img> for images, <button> for buttons, and <div> as a generic box to group things.",
      "CSS is a list of style rules. Each rule picks something (a selector) and sets properties: 'h1 { color: blue; font-size: 40px; }' means 'find every h1 and make it blue and 40 pixels tall'.",
      "You aim CSS at specific elements using a class — a label you attach in HTML (class=\"card\") and target in CSS (.card { ... }). This lets you style one exact thing without touching everything.",
      "Use HTML when you're deciding what content exists; use CSS when you're deciding how that content looks. Keep them separate — mixing styling into your HTML gets messy fast.",
      "Don't over-nest boxes. Beginners wrap everything in ten <div>s; usually you need far fewer. Reach for the tag that actually describes the content (a heading is an <h1>, not a styled <div>).",
    ],
    code: {
      language: "text",
      source: `<!-- HTML: the structure -->
<div class="card">
  <h1>Welcome, Maria</h1>
  <p>You have 3 new messages.</p>
  <button class="btn">Read them</button>
</div>

/* CSS: the style */
.card   { background: white; padding: 20px; border-radius: 12px; }
h1      { color: #6b21a8; font-size: 28px; }
.btn    { background: #a855f7; color: white; border: none; padding: 10px; }`,
      explanation:
        "The HTML says what exists (a card holding a heading, a line of text, and a button). The CSS, aimed by the class names, decides colours, spacing, and rounded corners.",
    },
    exercise: {
      prompt: "Add a CSS rule so paragraphs (<p>) are grey and slightly larger. Fill in the blank.",
      starter: `<p>You have 3 new messages.</p>

p {
  /* TODO: make text grey and 18px */
}`,
      solution: `p {
  color: grey;
  font-size: 18px;
}`,
    },
    quiz: [
      {
        question: "What is HTML responsible for?",
        options: [
          "The colours and fonts of a page",
          "The structure and content of a page",
          "Storing user passwords",
          "Sending emails",
        ],
        answerIndex: 1,
        explanation: "HTML defines what's on the page (headings, text, buttons). CSS handles how it looks.",
      },
      {
        question: "In CSS, what does '.card' select?",
        options: [
          "Every element on the page",
          "Only the first heading",
          "Every element with class=\"card\"",
          "The browser tab",
        ],
        answerIndex: 2,
        explanation: "A dot means 'class'. '.card' targets any element you've labelled with class=\"card\".",
      },
    ],
    flashcards: [
      { front: "HTML", back: "The language that defines a page's structure and content, using tags like <h1> and <p>." },
      { front: "CSS", back: "The language that styles a page — colours, sizes, spacing, layout." },
      { front: "Tag", back: "An HTML instruction in angle brackets, usually paired: <p>...</p>." },
      { front: "Class", back: "A reusable label on an element (class=\"btn\") that CSS targets with a dot (.btn)." },
    ],
    miniProject: {
      title: "Your Own Profile Card",
      brief: "Build a small styled card about yourself using only HTML and CSS.",
      steps: [
        "Create a <div> with your name in an <h1> and a one-line bio in a <p>.",
        "Add an <img> of anything you like and a <button> that says 'Say hi'.",
        "Wrap it in a class and style the card: white background, padding, rounded corners.",
        "Give your name a colour you love and make the button pop.",
      ],
    },
    industryUse: [
      "Airbnb's listing cards are HTML structure styled with CSS for spacing and shadows",
      "Every company's marketing landing page is fundamentally HTML + CSS",
      "Email newsletters from Spotify and banks are built as HTML with inline CSS styling",
    ],
    commonMistakes: [
      "Forgetting the closing tag (</p>) — the browser gets confused about where content ends. Always close what you open.",
      "Using a <div> for everything instead of meaningful tags like <h1> or <button>, which hurts accessibility and clarity.",
    ],
    interviewQuestions: [
      "What's the difference between HTML and CSS?",
      "How do you apply the same style to many elements at once?",
      "What does it mean for a tag to be 'self-closing', like <img>?",
    ],
    papers: [],
    nextUp: ["responsive-design", "fs-js"],
    cheatsheet: [
      "HTML = structure, CSS = style",
      "Tags come in pairs: <p>text</p>",
      "Target a class in CSS with a dot: .card { ... }",
      "Target a tag directly: h1 { color: blue; }",
      "Keep content (HTML) and styling (CSS) separate",
    ],
  },

  "responsive-design": {
    story:
      "You build a beautiful page on your big laptop. Then you open it on your phone and it's a disaster — text spills off the edge, buttons are microscopic, you have to pinch and zoom. The problem? You designed for one screen size, but people visit on phones, tablets, laptops, and giant monitors. Responsive design means building one page that gracefully rearranges itself to look great on every screen. The same site, poured into whatever glass it lands in.",
    problem:
      "Over half of web visits happen on phones. A layout that assumes a wide screen breaks on a narrow one. You need your columns to stack, your text to stay readable, and your images to shrink — automatically, without building a separate site for every device.",
    analogy:
      "It's like water: pour it into a tall glass and it's tall, a wide bowl and it's wide. Responsive layout lets your content take the shape of whatever screen holds it.",
    explanation: [
      "Modern CSS gives you two layout superpowers: Flexbox (arrange items in a row or column that flexes to fit) and Grid (arrange items in rows AND columns like a spreadsheet). Reach for Flexbox for a line of things, Grid for a full 2D layout.",
      "Use relative sizes, not fixed ones. Instead of width: 600px (always 600, even on a 375px phone), use width: 100% or max-width so things shrink to fit.",
      "A media query is CSS that only applies at certain screen sizes: '@media (max-width: 600px) { ... }' means 'when the screen is 600px wide or narrower, use these rules instead'. This is how columns become stacked rows on a phone.",
      "The single most important line: <meta name=\"viewport\" content=\"width=device-width\"> in your HTML head. Without it, phones pretend to be desktop-wide and everything looks tiny.",
      "Design mobile-first: style the small screen first (simple, stacked), then add media queries to spread out on bigger screens. It's easier than cramming a desktop design into a phone.",
      "Don't chase pixel-perfection on every device — aim for 'looks good and works' everywhere. Test by dragging your browser window narrow and watching what breaks.",
    ],
    code: {
      language: "text",
      source: `/* A row of cards that flexes and wraps */
.cards {
  display: flex;
  flex-wrap: wrap;   /* cards drop to the next line if they run out of room */
  gap: 16px;
}
.card { flex: 1 1 250px; }   /* grow, shrink, but aim for ~250px each */

/* On phones, stack them in one column */
@media (max-width: 600px) {
  .card { flex: 1 1 100%; }
}`,
      explanation:
        "On a wide screen the cards sit side by side and wrap as needed; on a narrow phone the media query forces each card to fill the full width, stacking them vertically.",
    },
    exercise: {
      prompt: "Write a media query that hides a sidebar (.sidebar) on screens 700px or narrower.",
      starter: `/* TODO: hide .sidebar on small screens */
@media (max-width: 700px) {

}`,
      solution: `@media (max-width: 700px) {
  .sidebar {
    display: none;
  }
}`,
    },
    quiz: [
      {
        question: "What does a media query do?",
        options: [
          "Plays videos on the page",
          "Applies CSS rules only at certain screen sizes",
          "Loads the page faster",
          "Stores user data",
        ],
        answerIndex: 1,
        explanation: "A media query lets you say 'use these styles only when the screen is this wide' — the heart of responsive design.",
      },
      {
        question: "Why prefer max-width: 100% over width: 600px for a responsive image?",
        options: [
          "It looks nicer on desktop only",
          "It lets the image shrink to fit narrow screens instead of overflowing",
          "It makes the image load faster",
          "Fixed pixels are illegal in CSS",
        ],
        answerIndex: 1,
        explanation: "A fixed 600px stays 600px even on a 375px phone (overflow). Relative sizing shrinks to fit.",
      },
    ],
    flashcards: [
      { front: "Responsive design", back: "Building one page that rearranges to look good on any screen size." },
      { front: "Flexbox", back: "A CSS layout mode for arranging items in a flexible row or column." },
      { front: "Media query", back: "CSS that applies only at certain screen widths: @media (max-width: 600px)." },
      { front: "Viewport meta tag", back: "The HTML line that tells phones to use their real width, not pretend to be desktop." },
    ],
    miniProject: {
      title: "A Layout That Survives Your Phone",
      brief: "Build a 3-card layout that sits in a row on desktop and stacks on mobile.",
      steps: [
        "Create three cards inside a container and lay them out with Flexbox.",
        "Add the viewport meta tag so your phone reads real widths.",
        "Add a media query at 600px that stacks the cards vertically.",
        "Open it on your actual phone (or drag the window narrow) and confirm it reflows.",
      ],
    },
    industryUse: [
      "Google search results reflow from multi-column on desktop to a single column on mobile",
      "Shopify stores use responsive layouts so one theme sells on any device",
      "News sites like the BBC serve the same article beautifully on phone, tablet, and desktop",
    ],
    commonMistakes: [
      "Forgetting the viewport meta tag — the page looks tiny and zoomed-out on phones. Add it to every page's <head>.",
      "Using fixed pixel widths everywhere, so content overflows on small screens. Prefer %, max-width, and flexible layouts.",
    ],
    interviewQuestions: [
      "What's the difference between Flexbox and Grid, and when would you use each?",
      "What is a media query and how does it enable responsive design?",
      "What does 'mobile-first' mean and why is it recommended?",
    ],
    papers: [],
    nextUp: ["fs-js", "fs-framework"],
    cheatsheet: [
      "Flexbox = flexible row/column · Grid = 2D layout",
      "Use %, max-width — avoid fixed pixel widths",
      "@media (max-width: 600px) { ... } for phone rules",
      "Always add the viewport meta tag",
      "Design mobile-first, then expand for bigger screens",
    ],
  },

  "fs-js": {
    story:
      "HTML and CSS give you a page, but it just sits there. Click a button and nothing happens. JavaScript is what wakes the page up. It's the language that runs inside your browser and can respond to clicks, change text on the fly, show and hide things, and fetch new data without reloading. When you 'like' a post and the heart fills in instantly, or a form warns you 'passwords don't match' before you submit — that's JavaScript making a static page feel alive.",
    problem:
      "A page built from only HTML and CSS can't react. It can't count your clicks, validate a form, update a total, or load more results. You need a language running inside the browser that can listen for what the user does and change the page in response.",
    analogy:
      "If HTML is the body and CSS is the clothing, JavaScript is the muscles and nervous system — it makes the page move and react to the world.",
    explanation: [
      "JavaScript stores values in variables using let (can change) or const (stays fixed): const name = \"Maria\". Use const by default; switch to let only when the value truly needs to change.",
      "You bundle reusable steps into a function: 'function greet(name) { return \"Hi \" + name; }'. Call it with greet(\"Sam\") and it hands back \"Hi Sam\". Functions are how you avoid repeating yourself.",
      "To change the page, you grab an element and modify it: document.querySelector(\".title\").textContent = \"New!\" finds the element with class 'title' and rewrites its text. This live document is called the DOM — the browser's editable model of your page.",
      "You react to the user with event listeners: 'button.addEventListener(\"click\", doSomething)' means 'when this button is clicked, run doSomething'. Clicks, typing, hovering — all are events you can listen for.",
      "Use JavaScript for interactivity: responding to input, updating the screen, doing calculations. Don't use it for basic layout or styling — that's CSS's job, and CSS is faster and simpler for looks.",
      "Keep an eye on the browser Console (F12). When JavaScript breaks, the error message appears there — reading it is the fastest way to fix your code.",
    ],
    code: {
      language: "javascript",
      source: `// A click counter that updates the page live
let count = 0;

const button = document.querySelector(".counter-btn");
const label = document.querySelector(".count-label");

button.addEventListener("click", function () {
  count = count + 1;                 // remember one more click
  label.textContent = "Clicks: " + count;  // show it on the page
});`,
      explanation:
        "We keep a running count, listen for clicks on the button, and each click bumps the number and rewrites the label's text — no page reload needed.",
    },
    exercise: {
      prompt: "Finish the function so it returns a friendly greeting using the name passed in.",
      starter: `function greet(name) {
  // TODO: return "Hello, " followed by the name and a "!"
}
console.log(greet("Maria"));  // should print: Hello, Maria!`,
      solution: `function greet(name) {
  return "Hello, " + name + "!";
}
console.log(greet("Maria"));`,
    },
    quiz: [
      {
        question: "What is JavaScript's main job on a web page?",
        options: [
          "To define the page's colours",
          "To make the page interactive and react to the user",
          "To store data on the server",
          "To design the logo",
        ],
        answerIndex: 1,
        explanation: "JavaScript adds behaviour — responding to clicks, updating content, validating forms — that HTML and CSS alone can't do.",
      },
      {
        question: "What does addEventListener(\"click\", fn) do?",
        options: [
          "Deletes the element",
          "Runs the function fn every time the element is clicked",
          "Changes the element's colour",
          "Reloads the page",
        ],
        answerIndex: 1,
        explanation: "It registers a listener: when the 'click' event happens on that element, your function runs.",
      },
    ],
    flashcards: [
      { front: "Variable (let / const)", back: "A named box for a value. const stays fixed; let can be reassigned." },
      { front: "Function", back: "A reusable block of steps you can call by name, optionally passing in values." },
      { front: "DOM", back: "The browser's live, editable model of the page that JavaScript can change." },
      { front: "Event listener", back: "Code that runs in response to a user action like a click or keypress." },
    ],
    miniProject: {
      title: "A Live Character Counter",
      brief: "Build a text box that counts characters as the user types — like Twitter's limit.",
      steps: [
        "Add a <textarea> and a <p> to show the count.",
        "Grab both elements with document.querySelector.",
        "Add an 'input' event listener on the textarea.",
        "Each time it fires, update the <p> to show how many characters are typed.",
      ],
    },
    industryUse: [
      "Gmail uses JavaScript to load new emails and send messages without ever reloading the page",
      "Google Docs updates the document live as you and others type — all JavaScript",
      "Every 'add to cart' button on Amazon that updates the count instantly is JavaScript",
    ],
    commonMistakes: [
      "Trying to grab an element before it exists on the page — put your script at the end of the body, or wait for the page to load first.",
      "Using = (assign) when you mean === (compare) inside an if. Comparing needs three equals signs in JavaScript.",
    ],
    interviewQuestions: [
      "What's the difference between let and const?",
      "What is the DOM, and how does JavaScript use it to change a page?",
      "How do you make a button respond to a click?",
    ],
    papers: [],
    nextUp: ["fs-framework", "fs-state"],
    cheatsheet: [
      "const by default, let when it must change",
      "document.querySelector('.thing') grabs an element",
      ".textContent = ... rewrites its text",
      "element.addEventListener('click', fn) reacts to clicks",
      "Read errors in the Console (F12)",
    ],
  },

  "fs-framework": {
    story:
      "Imagine building a dashboard with a header, a sidebar, ten identical product cards, and a footer. With plain JavaScript you'd hand-wire every card and manually update each one when data changes — exhausting and error-prone. React flips this: you build each piece once as a self-contained component (a reusable chunk of UI), then just say 'give me ten ProductCards with this data'. React draws them and, whenever the data changes, redraws only what actually changed. You describe what the screen should look like; React handles the tedious updating.",
    problem:
      "As pages grow, manually keeping the screen in sync with your data becomes a nightmare — update the number in three places, forget one, and the UI shows a lie. You need a tool that lets you build UI in reusable pieces and automatically keeps the screen matching your data.",
    analogy:
      "Components are like LEGO bricks: build a brick once, then click many copies together to make something big. Change the brick's design and every copy updates.",
    explanation: [
      "A component is a JavaScript function that returns some UI. 'function Welcome() { return <h1>Hi!</h1>; }' is a component named Welcome that produces a heading. You use it like a custom HTML tag: <Welcome />.",
      "That HTML-looking syntax inside JavaScript is called JSX. It's a convenient way to write what the UI looks like right next to the logic that controls it. The browser doesn't run JSX directly — a build tool converts it to plain JavaScript.",
      "Components take inputs called props — like function arguments. <ProductCard name=\"Shoes\" price={40} /> passes name and price in, and the component reads them to render itself. Same component, different data, different card.",
      "The big idea: you describe the UI for a given set of data, and React figures out the minimal changes to the real page. You stop hand-updating the DOM; you just change your data and let React re-render.",
      "Reach for React when your app has lots of interactive, repeated, or changing UI. For a tiny static page, plain HTML is simpler — don't bring a framework to a one-page brochure.",
      "Build small, focused components. A giant 500-line component is a red flag; split it into a header, a list, and a card. Small pieces are easier to reuse, test, and reason about.",
    ],
    code: {
      language: "javascript",
      source: `// A reusable component that takes props
function ProductCard(props) {
  return (
    <div className="card">
      <h2>{props.name}</h2>
      <p>Rs {props.price}</p>
    </div>
  );
}

// Use it many times with different data
function Shop() {
  return (
    <div>
      <ProductCard name="Shoes" price={40} />
      <ProductCard name="Hat"   price={15} />
    </div>
  );
}`,
      explanation:
        "ProductCard is written once, then reused twice with different props. The curly braces drop JavaScript values (props.name, props.price) into the UI.",
    },
    exercise: {
      prompt: "Create a Greeting component that reads a 'name' prop and shows 'Hello, NAME'. Fill in the return.",
      starter: `function Greeting(props) {
  // TODO: return an <h1> that says Hello, then props.name
}`,
      solution: `function Greeting(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
    },
    quiz: [
      {
        question: "What is a React component?",
        options: [
          "A type of database",
          "A reusable piece of UI, written as a function that returns markup",
          "A CSS colour",
          "A server error code",
        ],
        answerIndex: 1,
        explanation: "A component is a self-contained, reusable chunk of UI you can drop in wherever you need it.",
      },
      {
        question: "What are props used for?",
        options: [
          "Styling the page background",
          "Passing data into a component to customise what it renders",
          "Saving files to disk",
          "Connecting to the internet",
        ],
        answerIndex: 1,
        explanation: "Props are inputs to a component, like function arguments — same component, different data.",
      },
    ],
    flashcards: [
      { front: "Component", back: "A reusable, self-contained piece of UI, written as a function that returns markup." },
      { front: "JSX", back: "HTML-like syntax inside JavaScript used to describe what a component renders." },
      { front: "Props", back: "Inputs passed into a component to customise its output, like function arguments." },
      { front: "Re-render", back: "React redrawing the parts of the screen that changed when your data updates." },
    ],
    miniProject: {
      title: "A Reusable Star Rating",
      brief: "Build a small component that shows a movie title and a star rating, then reuse it.",
      steps: [
        "Create a MovieRating component taking 'title' and 'stars' props.",
        "Have it render the title and repeat a star character 'stars' times.",
        "Use it three times with different movies and ratings.",
        "Notice you wrote the layout once but got three cards.",
      ],
    },
    industryUse: [
      "Facebook (which created React) builds its entire interface from components",
      "Netflix's browse page is a grid of reusable row and thumbnail components",
      "Airbnb builds listings, calendars, and maps as shareable React components",
    ],
    commonMistakes: [
      "Building one giant component instead of splitting the UI into small pieces — split early, it's much easier to manage.",
      "Forgetting the curly braces to insert a JavaScript value into JSX ({props.name}), or trying to write plain HTML attribute names — it's className, not class, in React.",
    ],
    interviewQuestions: [
      "What is a component and why is component-based UI useful?",
      "What are props and how do they differ from state?",
      "What is JSX and how does it relate to plain JavaScript?",
    ],
    papers: [],
    nextUp: ["fs-state", "fs-js"],
    cheatsheet: [
      "Component = reusable function returning UI",
      "JSX = HTML-like markup inside JavaScript",
      "Props = inputs: <Card name='Shoes' />",
      "Insert JS values with { curly braces }",
      "Small, focused components beat giant ones",
    ],
  },

  "fs-state": {
    story:
      "Picture a light switch on the wall. Its whole job is to remember one thing: am I on or off? Flip it, and the room reacts. In a web app, that remembered thing is called state — the data your UI is currently showing: how many items are in the cart, whether a menu is open, what the user typed. When state changes, the screen updates to match. A counter showing '3' isn't magic; it's a piece of state holding the number 3, and the UI redrawing itself whenever that number changes.",
    problem:
      "A UI needs to remember things and react when they change. If a user adds an item to a cart, that count must be stored somewhere and the badge must update. Plain variables don't trigger the screen to redraw — you need special state that, when changed, tells the UI to refresh.",
    analogy:
      "State is the app's short-term memory — like the current score on a scoreboard. Change the number and everyone looking at the board sees the new value.",
    explanation: [
      "In React, you create a piece of state with useState: 'const [count, setCount] = useState(0)'. This gives you the current value (count, starting at 0) and a function to change it (setCount). Always change state through that setter — never edit the value directly.",
      "When you call the setter (setCount(count + 1)), React re-renders the component with the new value, and the screen updates automatically. That automatic redraw is the entire point of state.",
      "State is local to a component by default. If two components need the same data, you 'lift it up' — put the state in their shared parent and pass it down as props. This keeps a single source of truth.",
      "Keep state minimal: store only what you can't calculate from something else. If you have a list of items, don't also store the count in state — derive it with items.length. Duplicated state drifts out of sync.",
      "Use state for anything that changes over the life of the page: form inputs, toggles, fetched data, counters. Use props (not state) for data that simply flows in from a parent and doesn't change here.",
      "A classic trap: state updates aren't instant. Right after setCount(5), the old value may still show in that same function run — React applies it on the next render. Trust the re-render, don't expect the variable to change mid-function.",
    ],
    code: {
      language: "javascript",
      source: `import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);   // state starts at 0

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Add one</button>
    </div>
  );
}`,
      explanation:
        "useState gives us count and setCount. Clicking the button calls setCount, React re-renders, and the paragraph shows the new number — no manual DOM editing.",
    },
    exercise: {
      prompt: "Add a second button that decreases the count by one. Fill in its onClick.",
      starter: `const [count, setCount] = useState(0);
// existing:  <button onClick={() => setCount(count + 1)}>Add</button>
// TODO: a Subtract button
<button onClick={/* ??? */}>Subtract</button>`,
      solution: `<button onClick={() => setCount(count - 1)}>Subtract</button>`,
    },
    quiz: [
      {
        question: "What is 'state' in a UI?",
        options: [
          "The colour scheme of the page",
          "The data the UI currently holds that can change over time",
          "The name of the server",
          "A permanent database record",
        ],
        answerIndex: 1,
        explanation: "State is the app's changing memory — the current data the UI reflects, like a count or whether a menu is open.",
      },
      {
        question: "Why must you use setCount instead of changing count directly?",
        options: [
          "Direct changes are illegal in JavaScript",
          "The setter tells React to re-render so the screen updates",
          "It runs faster",
          "It saves the value to a database",
        ],
        answerIndex: 1,
        explanation: "Calling the setter triggers a re-render. Editing the variable directly changes the value but never updates the screen.",
      },
    ],
    flashcards: [
      { front: "State", back: "The changing data a UI currently holds and reflects on screen." },
      { front: "useState", back: "React's tool to create state: returns the current value and a setter function." },
      { front: "Setter", back: "The function (like setCount) you call to change state and trigger a re-render." },
      { front: "Lifting state up", back: "Moving shared state into a common parent so both children can use it." },
    ],
    miniProject: {
      title: "A Show/Hide Toggle",
      brief: "Build a button that shows or hides a secret message, tracked with state.",
      steps: [
        "Create a boolean state 'visible' starting false with useState.",
        "Render a button that flips visible with its setter on each click.",
        "Show the secret message only when visible is true.",
        "Add a second piece of state to count how many times it was toggled.",
      ],
    },
    industryUse: [
      "Instagram tracks whether you've liked a post as a piece of state that flips the heart instantly",
      "Amazon's cart badge is state — the count updates the moment you add an item",
      "Trello stores which card you're dragging and the board's contents as state",
    ],
    commonMistakes: [
      "Editing state directly (count++) instead of calling the setter — the value may change but the screen won't update.",
      "Storing data in state that you could just calculate (like a total you could derive from a list), causing the two to fall out of sync.",
    ],
    interviewQuestions: [
      "What's the difference between state and props?",
      "Why do you update state through a setter function instead of assigning directly?",
      "What does 'lifting state up' mean and when do you need it?",
    ],
    papers: [],
    nextUp: ["fs-api", "fs-framework"],
    cheatsheet: [
      "const [x, setX] = useState(initial)",
      "Change state only via the setter: setX(newValue)",
      "Setter → re-render → screen updates",
      "Props flow in; state lives and changes here",
      "Derive values (list.length) instead of duplicating them",
    ],
  },

  "fs-api": {
    story:
      "Your React app looks great, but where does the actual data come from — the notes, the users, the orders? It asks the backend. A REST API is the menu of requests your backend understands. Just like a restaurant menu lists what you can order, an API lists addresses (endpoints) you can hit: GET /notes to fetch all notes, POST /notes to create one, DELETE /notes/5 to remove note number 5. The frontend orders from this menu; the backend cooks and serves the data. That agreed-upon menu is the bridge between the two halves of your app.",
    problem:
      "The frontend (in the browser) and the backend (on a server) are separate programs that can't just share variables. They need a clear, agreed contract: which addresses exist, what each does, and what data comes back. Without it, the frontend has no reliable way to read or change the data the backend guards.",
    analogy:
      "A REST API is a restaurant menu: a fixed list of things you can order (endpoints) and what you'll get back. You don't need to know how the kitchen works — just what to ask for.",
    explanation: [
      "REST organises the API around resources (nouns like 'notes' or 'users') and uses HTTP methods as the verbs: GET (read), POST (create), PUT/PATCH (update), DELETE (remove). GET /notes reads all notes; POST /notes creates one.",
      "Each endpoint is a URL path. Collections use a plural noun (/notes); a single item adds its id (/notes/5). This convention makes APIs predictable — once you know one REST API, you can guess the shape of the next.",
      "Data travels as JSON — a lightweight text format of key-value pairs that looks like { \"title\": \"Buy milk\", \"done\": false }. Both JavaScript and almost every backend language speak JSON, so it's the web's common data language.",
      "Every response carries a status code so the frontend knows what happened: 200 OK, 201 Created (after a POST), 400 Bad Request (you sent something wrong), 404 Not Found, 401 Unauthorized. Handle these instead of assuming success.",
      "Design endpoints around resources and let HTTP methods do the work — don't invent /getAllNotes or /deleteNote5 URLs. Good REST is GET /notes and DELETE /notes/5.",
      "The frontend calls the API with fetch. Because the reply takes time to arrive over the network, the call is asynchronous — you await it. Always handle the case where the request fails (bad network, server error), not just the happy path.",
    ],
    code: {
      language: "javascript",
      source: `// Frontend calling a REST API to load notes
async function loadNotes() {
  const response = await fetch("https://api.myapp.com/notes"); // GET by default
  if (!response.ok) {
    throw new Error("Failed to load notes: " + response.status);
  }
  const notes = await response.json();   // turn JSON text into a JS array
  return notes;
}

// Creating a new note with POST
async function addNote(title) {
  await fetch("https://api.myapp.com/notes", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: title, done: false }),
  });
}`,
      explanation:
        "loadNotes does a GET and parses the JSON reply into a usable array; addNote does a POST, sending a new note as JSON in the request body.",
    },
    exercise: {
      prompt: "Complete the fetch call to DELETE the note with id 7.",
      starter: `async function deleteNote() {
  await fetch("https://api.myapp.com/notes/7", {
    // TODO: set the method to delete the note
  });
}`,
      solution: `async function deleteNote() {
  await fetch("https://api.myapp.com/notes/7", {
    method: "DELETE",
  });
}`,
    },
    quiz: [
      {
        question: "In REST, which HTTP method would you use to create a new note?",
        options: ["GET", "POST", "DELETE", "PUT"],
        answerIndex: 1,
        explanation: "POST is the verb for creating a new resource. GET reads, DELETE removes, PUT/PATCH updates.",
      },
      {
        question: "What is JSON used for in an API?",
        options: [
          "Styling the page",
          "A common text format for sending data between frontend and backend",
          "Encrypting passwords",
          "Storing images",
        ],
        answerIndex: 1,
        explanation: "JSON is the lightweight key-value text format both sides use to exchange data over the API.",
      },
    ],
    flashcards: [
      { front: "REST API", back: "A menu of URL endpoints and HTTP methods a backend exposes to read and change data." },
      { front: "Endpoint", back: "A specific URL path the API responds to, like GET /notes or DELETE /notes/5." },
      { front: "JSON", back: "The text format of key-value pairs used to send data between frontend and backend." },
      { front: "fetch", back: "The browser function for making HTTP requests to an API from JavaScript." },
    ],
    miniProject: {
      title: "Talk to a Real Public API",
      brief: "Fetch and display data from a free public API to feel a request end to end.",
      steps: [
        "Use fetch to GET data from a free API like https://jsonplaceholder.typicode.com/todos.",
        "await the response and parse it with .json().",
        "Log the first few items and inspect their shape (keys and values).",
        "Show a couple of fields (like each todo's title) on the page.",
      ],
    },
    industryUse: [
      "Spotify's app fetches your playlists and playback state from its REST API",
      "Stripe exposes a REST API that lets any online store charge cards with a POST request",
      "Twitter/X's timeline is loaded by the app calling REST endpoints for tweets",
    ],
    commonMistakes: [
      "Forgetting an API call is asynchronous — you must await it (or handle the promise), or you'll read data that hasn't arrived yet.",
      "Assuming every request succeeds. Always check response.ok / the status code and handle failures gracefully.",
    ],
    interviewQuestions: [
      "What does REST mean, and how do HTTP methods map to actions?",
      "What's the difference between GET and POST?",
      "How do you handle an API request that fails on the frontend?",
    ],
    papers: [],
    nextUp: ["fs-database", "fs-auth"],
    cheatsheet: [
      "GET read · POST create · PUT/PATCH update · DELETE remove",
      "Collections: /notes · single item: /notes/5",
      "Data travels as JSON",
      "await fetch(url) — it's asynchronous",
      "Always check response.ok before trusting the data",
    ],
  },

  "fs-database": {
    story:
      "When a user writes a note in your app, where does it go? If you only kept it in the app's memory, it would vanish the moment the server restarts. A database is the app's permanent filing cabinet — an organised place on disk that holds your data safely, forever, and lets you find any piece of it in an instant. When you close Instagram and reopen it and your photos are still there, that's a database quietly remembering everything on your behalf.",
    problem:
      "Program memory is temporary — restart the server and everything's gone. You need somewhere durable to store users, notes, and orders that survives restarts, handles thousands of records, and lets you search, update, and relate data reliably.",
    analogy:
      "A database is a giant, well-labelled spreadsheet with superpowers: rows are records, columns are fields, and you can instantly ask it 'show me every note by Maria created this week'.",
    explanation: [
      "The most common kind is a relational (SQL) database. Data lives in tables. A table (say 'notes') has columns (id, title, done, user_id) and each row is one record — one note.",
      "You talk to it with SQL, a readable language of commands: SELECT reads data, INSERT adds a row, UPDATE changes rows, DELETE removes them. 'SELECT * FROM notes WHERE done = false' means 'give me every unfinished note'.",
      "Every row gets a unique id (the primary key) so you can always point to exactly one record. Tables link together with a foreign key — a note's user_id column points at the id in the users table, connecting each note to its owner.",
      "The WHERE clause is how you filter to just the rows you want; without it, commands hit every row (a DELETE with no WHERE wipes the whole table — a famous, painful mistake).",
      "Use a SQL database when your data is structured and related (users, orders, notes) and you need reliability. There are also NoSQL databases (like MongoDB) that store flexible JSON-like documents — handy when your data shape varies a lot.",
      "On the backend, you rarely paste raw SQL by hand into requests. You use parameterised queries or a library (an ORM) that builds safe SQL for you — this prevents a serious attack called SQL injection where a user sneaks commands into an input box.",
    ],
    math: "A well-chosen index turns a search from checking every row (slow: n comparisons) into a near-instant lookup — the database jumps straight to matching rows instead of scanning the whole table.",
    code: {
      language: "sql",
      source: `-- Create a table to hold notes
CREATE TABLE notes (
  id       INTEGER PRIMARY KEY,
  title    TEXT NOT NULL,
  done     BOOLEAN DEFAULT false,
  user_id  INTEGER
);

-- Add a note
INSERT INTO notes (title, user_id) VALUES ('Buy milk', 1);

-- Read all unfinished notes for user 1
SELECT * FROM notes WHERE user_id = 1 AND done = false;

-- Mark note 3 as finished
UPDATE notes SET done = true WHERE id = 3;`,
      explanation:
        "We define the shape of a note, insert one, read back only the unfinished ones for a user, and update a single note by its id — the four everyday database operations.",
    },
    exercise: {
      prompt: "Write a SQL command to delete the note whose id is 9. Fill in the blank.",
      starter: `-- TODO: delete only the note with id 9
DELETE FROM notes WHERE ______ ;`,
      solution: `DELETE FROM notes WHERE id = 9;`,
    },
    quiz: [
      {
        question: "Why use a database instead of just keeping data in the app's memory?",
        options: [
          "Memory is illegal to use",
          "A database keeps data permanently, even after the server restarts",
          "Databases make the page prettier",
          "Memory can't hold numbers",
        ],
        answerIndex: 1,
        explanation: "Program memory is wiped on restart. A database stores data durably on disk so it survives and can be searched.",
      },
      {
        question: "What does 'SELECT * FROM notes WHERE done = false' do?",
        options: [
          "Deletes all notes",
          "Creates a new note",
          "Returns every note that is not yet done",
          "Renames the notes table",
        ],
        answerIndex: 2,
        explanation: "SELECT reads data; the WHERE clause filters to only the rows where done is false.",
      },
    ],
    flashcards: [
      { front: "Database", back: "A durable, organised store for your app's data that survives restarts." },
      { front: "Table", back: "A collection of rows (records) and columns (fields), like a smart spreadsheet." },
      { front: "Primary key", back: "A unique id column that identifies exactly one row." },
      { front: "SQL", back: "The language for reading and changing data: SELECT, INSERT, UPDATE, DELETE." },
    ],
    miniProject: {
      title: "Design a Notes Table",
      brief: "Model a tiny notes app's data and run the core commands in a SQL playground.",
      steps: [
        "Create a 'notes' table with id, title, done, and created_at columns.",
        "INSERT three notes, one already marked done.",
        "SELECT only the notes that are still not done.",
        "UPDATE one note to done and DELETE another, then re-query to confirm.",
      ],
    },
    industryUse: [
      "Banks store every account balance and transaction in relational SQL databases for reliability",
      "Instagram keeps posts, users, and likes in databases so nothing disappears between sessions",
      "Uber stores riders, drivers, and trip records, linked by foreign keys, in its databases",
    ],
    commonMistakes: [
      "Running UPDATE or DELETE without a WHERE clause — it changes or wipes every row. Always double-check the filter first.",
      "Building SQL by gluing user input into a string, which opens SQL injection. Use parameterised queries or an ORM instead.",
    ],
    interviewQuestions: [
      "What's the difference between a primary key and a foreign key?",
      "What are the four basic SQL operations and what does each do?",
      "What is SQL injection and how do you prevent it?",
    ],
    papers: [],
    nextUp: ["fs-auth", "fs-api"],
    cheatsheet: [
      "SELECT read · INSERT add · UPDATE change · DELETE remove",
      "Always filter with WHERE (a DELETE without it wipes the table)",
      "Primary key = unique id per row",
      "Foreign key links tables (note.user_id -> user.id)",
      "Never glue user input into SQL — use parameters",
    ],
  },

  "fs-auth": {
    story:
      "When you log into your bank, two things happen. First, it checks 'are you really you?' — you prove it with your password. That's authentication. Then, once inside, it decides 'what are you allowed to do?' — you can see your own account but not your neighbour's. That's authorization. Every app with a login does this dance. And because the web forgets you between every request (each request is a stranger arriving fresh), the app hands you a wristband after login — a token or session cookie — so it recognises you on every future request without asking for your password again.",
    problem:
      "HTTP is stateless: the server treats each request as if it's never seen you before. So after you log in, how does the server know the next request is still you and not an impostor? And how does it stop you from reading someone else's private data? You need a secure way to prove identity once and be remembered safely.",
    analogy:
      "It's like a concert: you show your ID once at the entrance (login) and get a wristband (session/token). After that, security just glances at the wristband — you don't re-prove who you are at every door.",
    explanation: [
      "Authentication = proving who you are (login with a password). Authorization = what you're allowed to do once in (an admin can delete users; a normal user can't). They're different steps and beginners often mix up the words.",
      "NEVER store passwords as plain text. You store a hash — a scrambled, one-way fingerprint made with a tool like bcrypt. When someone logs in, you hash their attempt and compare fingerprints. Even if the database leaks, the real passwords stay hidden.",
      "After a successful login, the server issues proof of identity. Two common styles: a session (the server keeps a record and hands the browser a cookie holding a session id) or a JWT token (a signed string the browser stores and sends back on each request).",
      "The browser attaches that proof to every future request. The server checks it and instantly knows who's asking — no re-login needed — until it expires or you log out.",
      "Always serve auth over HTTPS so the password and token can't be sniffed in transit, and give tokens/sessions an expiry so a stolen one doesn't work forever. Store secrets server-side, never in your frontend code.",
      "Check authorization on the server, not just by hiding buttons in the UI. Hiding a 'Delete' button doesn't stop a determined user from calling the endpoint directly — the server must verify permission every time.",
    ],
    code: {
      language: "javascript",
      source: `import bcrypt from "bcrypt";

// At signup: store a hash, never the raw password
async function signup(password) {
  const hash = await bcrypt.hash(password, 10);  // scramble it one-way
  saveToDatabase(hash);                          // store the fingerprint
}

// At login: hash the attempt and compare
async function login(attempt, storedHash) {
  const ok = await bcrypt.compare(attempt, storedHash);
  if (!ok) throw new Error("Wrong password");
  return issueToken();   // hand back a wristband for future requests
}`,
      explanation:
        "Signup stores only a one-way hash of the password. Login re-hashes the attempt and compares fingerprints; on success it issues a token the browser reuses to stay logged in.",
    },
    exercise: {
      prompt: "Fill in the check so login only succeeds when the password matches the stored hash.",
      starter: `async function login(attempt, storedHash) {
  const ok = await bcrypt.compare(attempt, storedHash);
  // TODO: if not ok, throw an error "Wrong password"
  return issueToken();
}`,
      solution: `async function login(attempt, storedHash) {
  const ok = await bcrypt.compare(attempt, storedHash);
  if (!ok) throw new Error("Wrong password");
  return issueToken();
}`,
    },
    quiz: [
      {
        question: "What's the difference between authentication and authorization?",
        options: [
          "They mean exactly the same thing",
          "Authentication proves who you are; authorization decides what you can do",
          "Authorization comes before login",
          "Authentication styles the login page",
        ],
        answerIndex: 1,
        explanation: "First you prove identity (authentication), then the app decides your permissions (authorization).",
      },
      {
        question: "Why should passwords be stored as a hash instead of plain text?",
        options: [
          "Hashes load faster",
          "So that even if the database leaks, the real passwords stay hidden",
          "It's required by JavaScript",
          "To make passwords shorter",
        ],
        answerIndex: 1,
        explanation: "A one-way hash means a stolen database doesn't reveal actual passwords. You compare fingerprints, never the raw text.",
      },
    ],
    flashcards: [
      { front: "Authentication", back: "Proving who you are, typically by logging in with a password." },
      { front: "Authorization", back: "Deciding what an authenticated user is allowed to do." },
      { front: "Password hash", back: "A one-way scrambled fingerprint of a password (via bcrypt) stored instead of the real text." },
      { front: "Session / Token", back: "The 'wristband' issued after login so the server recognises you on future requests." },
    ],
    miniProject: {
      title: "A Safe Login Flow (On Paper + Code)",
      brief: "Sketch and prototype the signup-then-login flow with hashing.",
      steps: [
        "Draw the flow: signup hashes and stores; login hashes the attempt and compares.",
        "Write a signup function that hashes a password with bcrypt before saving.",
        "Write a login function that compares and issues a token on success.",
        "List three rules you'll always follow (HTTPS, expiry, server-side checks).",
      ],
    },
    industryUse: [
      "Google hashes and salts passwords and issues session tokens so you stay logged into Gmail",
      "Banks enforce authorization so you can view only your own accounts, never anyone else's",
      "GitHub uses tokens to authenticate API requests without sending your password each time",
    ],
    commonMistakes: [
      "Storing passwords in plain text (or with weak encryption you can reverse) — always use a proper one-way hash like bcrypt.",
      "Enforcing permissions only by hiding buttons in the UI — the server must verify authorization on every protected request.",
    ],
    interviewQuestions: [
      "What's the difference between authentication and authorization?",
      "Why do we hash passwords, and what does 'salting' add?",
      "How does a server remember a logged-in user across stateless HTTP requests?",
    ],
    papers: [],
    nextUp: ["fs-deploy", "fs-database"],
    cheatsheet: [
      "AuthN = who you are · AuthZ = what you can do",
      "Never store plain passwords — hash with bcrypt",
      "Login issues a session/token; browser resends it",
      "Always use HTTPS and expire tokens",
      "Check permissions on the server, not just the UI",
    ],
  },

  "fs-deploy": {
    story:
      "Your app works perfectly on your laptop. But http://localhost only exists on your machine — your friend across the world can't visit it. Deploying means moving your app onto always-on computers in the cloud and giving it a real web address anyone can reach. It's the moment your project stops being a private experiment and becomes a real website people can actually use. You push a button, and minutes later your app is live at a URL you can text to your mum.",
    problem:
      "Software on your computer is invisible to the world — it turns off when you close your laptop and lives at localhost, an address only you can reach. To have real users, your frontend, backend, and database must run on public, always-on infrastructure with a real domain.",
    analogy:
      "Deploying is like moving from cooking in your home kitchen (only your family can eat) to opening a restaurant on a busy street with a sign out front — now anyone can walk in.",
    explanation: [
      "A full-stack app has parts that deploy to different homes: the frontend (static HTML/CSS/JS) goes to a fast host or CDN (like Vercel or Netlify), the backend API runs on a server platform (like Render or Railway), and the database runs on a managed database host.",
      "The frontend needs to know the backend's public URL — so you use environment variables: settings you set on the host (like API_URL) instead of hard-coding secrets and addresses in your code. This keeps your real database password out of your source files.",
      "You register a domain (myapp.com) and point it at your host through DNS. The host provides HTTPS (the padlock) automatically, encrypting all traffic. Never ship a login form over plain http.",
      "Modern deploys are automated: you connect your Git repository, and every time you push code, the host rebuilds and redeploys your app. Push to main, wait a minute, it's live. This is called continuous deployment.",
      "Deploy early and often, even a half-finished app. Shipping a tiny version and iterating beats hoarding a 'perfect' app on your laptop — you catch real-world issues (slow database, wrong URL) only once it's live.",
      "Watch the logs after deploying. When something works locally but breaks in production, the cause is almost always a missing environment variable, a wrong URL, or a database the deployed backend can't reach — the logs will tell you.",
    ],
    code: {
      language: "text",
      source: `# A typical deploy, step by step

1. Push your code to GitHub:
     git push origin main

2. Host (Vercel/Render) detects the push and builds the app.

3. Set environment variables on the host (NOT in your code):
     API_URL      = https://api.myapp.com
     DATABASE_URL = postgres://user:secret@db-host:5432/app

4. Host gives you a live URL + free HTTPS:
     https://myapp.vercel.app   ->   later:  https://myapp.com`,
      explanation:
        "You push code, the host builds and deploys it, you supply secrets as environment variables, and it hands back a public HTTPS URL anyone can visit.",
    },
    exercise: {
      prompt: "You're hard-coding your database password in code. Rewrite it to read from an environment variable instead.",
      starter: `// Bad: secret is exposed in the source
const dbUrl = "postgres://user:MY_SECRET@host/app";
// TODO: read it from process.env.DATABASE_URL instead`,
      solution: `const dbUrl = process.env.DATABASE_URL;`,
    },
    quiz: [
      {
        question: "Why can't your friend visit your app at http://localhost:3000?",
        options: [
          "localhost only refers to your own machine",
          "Their browser is too old",
          "localhost is a paid service",
          "The app is written in the wrong language",
        ],
        answerIndex: 0,
        explanation: "localhost always means 'this computer'. To reach others, the app must run on a public host with a real address.",
      },
      {
        question: "Why store secrets like a database password in environment variables?",
        options: [
          "It makes the app run faster",
          "To keep secrets out of your source code and configurable per environment",
          "Because code can't hold long strings",
          "It's just a naming preference",
        ],
        answerIndex: 1,
        explanation: "Environment variables keep secrets out of your codebase and let you use different values in development vs production.",
      },
    ],
    flashcards: [
      { front: "Deploy", back: "Putting your app on public, always-on servers with a real web address." },
      { front: "localhost", back: "An address that only refers to your own computer — invisible to others." },
      { front: "Environment variable", back: "A setting (like API_URL or a secret) supplied by the host, not hard-coded in your source." },
      { front: "Continuous deployment", back: "Automatically rebuilding and redeploying your app every time you push code." },
    ],
    miniProject: {
      title: "Ship a Page to the World",
      brief: "Deploy a simple frontend so a real URL exists you can share.",
      steps: [
        "Put a small HTML/CSS/JS page in a Git repository and push it to GitHub.",
        "Connect the repo to a free host like Vercel or Netlify.",
        "Let it build and give you a live https:// URL.",
        "Open the URL on your phone and send it to a friend — it's really live.",
      ],
    },
    industryUse: [
      "Startups deploy their frontend to Vercel/Netlify and backend to Render for fast, automatic releases",
      "Companies use continuous deployment so every merged pull request ships to production in minutes",
      "Managed database hosts run production databases for apps of every size with backups and HTTPS",
    ],
    commonMistakes: [
      "Hard-coding secrets and local URLs in the code, then wondering why the deployed app can't reach the database — use environment variables.",
      "Never reading the deploy logs. When 'it works on my machine' but breaks live, the logs almost always point straight to the cause.",
    ],
    interviewQuestions: [
      "Why do frontend and backend often deploy to different services?",
      "What are environment variables and why are they important in deployment?",
      "What does continuous deployment mean?",
    ],
    papers: [],
    nextUp: ["fs-capstone", "fs-auth"],
    cheatsheet: [
      "localhost = only your machine; deploy to go public",
      "Frontend -> CDN host · Backend -> server host · DB -> managed host",
      "Secrets & URLs -> environment variables, never in code",
      "Get a domain + free HTTPS from the host",
      "Push to main -> auto build & deploy; then check the logs",
    ],
  },

  "fs-capstone": {
    story:
      "Now you put it all together. You're going to build a real Notes app — sign up, log in, and create, edit, and delete your own private notes that are still there when you come back tomorrow. This is the moment every earlier lesson clicks into place: the React frontend you can click, the REST API it talks to, the database that remembers everything, the login that keeps notes private, and the deploy that puts it on the internet. It's small enough to finish and complete enough to be genuinely proud of — a real full-stack app with your name on it.",
    problem:
      "Learning each piece in isolation is one thing; wiring them into a single working product is where it truly becomes real. The capstone forces every layer to cooperate — frontend, API, database, and auth — which is exactly the skill a full-stack job demands.",
    analogy:
      "Until now you've practised chopping, seasoning, and plating separately. The capstone is cooking and serving a whole meal to a real guest — everything on one plate, at the same time.",
    explanation: [
      "Map the layers before coding. Frontend: React components for the note list, a note editor, and login/signup forms. Backend: a REST API with endpoints for notes and auth. Database: a users table and a notes table linked by user_id. This is your blueprint.",
      "Design the API first — it's the contract between the two halves. You'll need GET /notes (my notes), POST /notes (create), PUT /notes/:id (edit), DELETE /notes/:id (remove), plus POST /signup and POST /login. Nail these before building UI.",
      "Wire authentication through everything. On login, issue a token; the frontend sends it on every notes request; the backend uses it to return only that user's notes. This is how notes stay private — the database filters by the logged-in user_id.",
      "Store notes in the database, not in React state alone — otherwise they vanish on refresh. The frontend's job is to display and edit; the database's job is to remember. State holds the current view; the database holds the truth.",
      "Build the thinnest possible version first (create and list notes, no auth), get it working end to end, then layer in editing, deleting, and finally login. Slicing it this way means you always have something that runs.",
      "Finish by deploying all three layers and testing the whole loop: sign up, add a note, refresh, log out, log back in — is your note still there and still private? If yes, you've built and shipped a full-stack app.",
    ],
    code: {
      language: "javascript",
      source: `// The frontend loading THIS user's notes, using their token
async function loadMyNotes(token) {
  const res = await fetch("https://api.mynotes.com/notes", {
    headers: { Authorization: "Bearer " + token },  // prove who I am
  });
  if (!res.ok) throw new Error("Could not load notes");
  return res.json();   // the backend returns only my notes
}

// Creating a note tied to me
async function createNote(token, text) {
  await fetch("https://api.mynotes.com/notes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ text: text }),
  });
}`,
      explanation:
        "Every request carries the login token, so the backend knows who's asking and returns or saves notes for that user only — the heart of a private, multi-user app.",
    },
    exercise: {
      prompt: "Add the Authorization header so this delete request proves who the user is.",
      starter: `async function deleteNote(token, id) {
  await fetch("https://api.mynotes.com/notes/" + id, {
    method: "DELETE",
    // TODO: add an Authorization header carrying the token
  });
}`,
      solution: `async function deleteNote(token, id) {
  await fetch("https://api.mynotes.com/notes/" + id, {
    method: "DELETE",
    headers: { Authorization: "Bearer " + token },
  });
}`,
    },
    quiz: [
      {
        question: "Why must notes be stored in the database, not just in React state?",
        options: [
          "State is illegal to use for notes",
          "So the notes survive a page refresh and are there next time you log in",
          "Databases are prettier",
          "React can't display text",
        ],
        answerIndex: 1,
        explanation: "React state is temporary and wiped on refresh. The database is the permanent source of truth.",
      },
      {
        question: "How does the app make sure you only see YOUR notes?",
        options: [
          "It hides other notes with CSS",
          "The backend uses your login token to return only notes tied to your user id",
          "It asks nicely",
          "All users share the same notes",
        ],
        answerIndex: 1,
        explanation: "Each request carries the token; the backend identifies you and filters the database to your user_id, so private notes stay private.",
      },
    ],
    flashcards: [
      { front: "Full-stack app", back: "An app combining frontend, backend API, and database into one working product." },
      { front: "API contract", back: "The agreed set of endpoints (GET/POST/PUT/DELETE) the frontend and backend both rely on." },
      { front: "Source of truth", back: "The database — the permanent store the UI reads from and writes to." },
      { front: "Vertical slice", back: "Building one feature end to end (UI -> API -> DB) before adding the next." },
    ],
    miniProject: {
      title: "The Full-Stack Notes App",
      brief: "Build, connect, and deploy a private, multi-user notes app end to end.",
      steps: [
        "Design the API: endpoints for signup, login, and CRUD on notes (GET/POST/PUT/DELETE).",
        "Build the backend + database: users and notes tables linked by user_id, with password hashing.",
        "Build the React frontend: login/signup, a note list, and an editor that calls the API with the token.",
        "Wire auth so each user sees only their own notes, and make notes persist across refreshes.",
        "Deploy all three layers, then test the full loop: sign up, add a note, log out, log back in, confirm it's still there.",
      ],
    },
    industryUse: [
      "A notes/CRUD-with-auth app is the exact shape behind Todoist, Notion, and Google Keep",
      "This frontend + API + database + auth stack is what most SaaS startups ship as their v1",
      "Interview take-home projects are frequently a small full-stack CRUD app just like this",
    ],
    commonMistakes: [
      "Keeping notes only in React state, so they vanish on refresh — persist them to the database via the API.",
      "Trying to build all features at once. Ship a thin working slice first, then add editing, deleting, and auth on top.",
    ],
    interviewQuestions: [
      "Walk me through the full journey of a note from the user typing it to it appearing after a refresh.",
      "How do you ensure one user can't read another user's notes?",
      "How would you split this project into deployable slices?",
    ],
    papers: [],
    nextUp: ["fs-deploy", "fs-auth"],
    cheatsheet: [
      "Layers: React UI -> REST API -> Database, glued by auth",
      "Design the API contract first",
      "Every request carries the login token",
      "Database is the source of truth; state is just the view",
      "Build a thin slice end to end, then expand and deploy",
    ],
  },
};
