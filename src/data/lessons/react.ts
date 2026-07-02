import type { LessonBody } from "@/types";

export const react: Record<string, LessonBody> = {
  "react-why": {
    story:
      "Imagine you are building a website by hand. Every time a user likes a post, you have to find that exact heart icon on the page, change its color, then find the little counter next to it and add 1, then maybe update a total somewhere else. Miss one spot and the page shows the wrong thing. It is like being a stagehand running around a theater flipping every light switch by hand. React changes the job entirely: instead of telling the browser HOW to update every little thing, you just describe WHAT the page should look like for any given situation, and React figures out exactly which switches to flip. You write a description; React does the running around.",
    problem:
      "As soon as a web page has moving parts — buttons, counters, live search, things that appear and disappear — keeping the screen in sync with your data by hand becomes a nightmare of tiny bugs. You update the number but forget the label; you show a popup but forget to hide the old one. React removes that whole class of bugs.",
    analogy:
      "React is like a smart whiteboard: you rewrite the note 'coffees sold: 5' and it instantly redraws the board for you — you never grab an eraser and chase down each character yourself.",
    explanation: [
      "React is a JavaScript library for building user interfaces (the visible, clickable part of an app) out of small reusable pieces called components.",
      "A component is just a function that returns some markup describing a chunk of screen — a button, a card, a whole page. You build big screens by snapping small components together like LEGO.",
      "That markup is written in JSX: HTML-looking code living right inside JavaScript. A tag like <h1>Hi</h1> in your JS file is JSX, and React turns it into real screen elements.",
      "The magic idea is: your screen is a function of your data. Give React the data, it draws the screen. Change the data, it redraws only what actually changed.",
      "Use React when your interface has interactivity and state that changes over time (dashboards, apps, anything with buttons and live updates). You do NOT need it for a plain static article page — that is overkill.",
      "JSX has small rules: you return one wrapped element, className instead of class, and any JavaScript value goes inside curly braces { }.",
    ],
    code: {
      language: "javascript",
      source: `// A component is just a function that returns JSX.
// The name MUST start with a capital letter.
function Welcome() {
  const name = "Maria";
  return (
    <div className="card">
      <h1>Hello, {name}!</h1>
      <p>This little box is a React component.</p>
    </div>
  );
}

// You use it like a custom HTML tag:
// <Welcome />`,
      explanation:
        "Welcome is a component: a function returning JSX. The curly braces around {name} drop a JavaScript value into the markup, so the heading reads 'Hello, Maria!'.",
    },
    exercise: {
      prompt: "Make a component called Greeting that shows the value of the city variable inside an <h2>.",
      starter: `function Greeting() {
  const city = "Delhi";
  // TODO: return an <h2> that says: Welcome to Delhi
  return null;
}`,
      solution: `function Greeting() {
  const city = "Delhi";
  return <h2>Welcome to {city}</h2>;
}`,
    },
    quiz: [
      {
        question: "What is a React component, in plain terms?",
        options: [
          "A special kind of database",
          "A function that returns markup describing a piece of the screen",
          "A CSS file",
          "A browser plugin you install",
        ],
        answerIndex: 1,
        explanation:
          "A component is a function that returns JSX describing part of the UI. You compose big screens from small components.",
      },
      {
        question: "What is JSX?",
        options: [
          "A separate programming language",
          "HTML-looking markup written inside JavaScript that React turns into screen elements",
          "A type of image file",
          "A database query",
        ],
        answerIndex: 1,
        explanation: "JSX lets you write HTML-like tags directly in your JavaScript; React converts it to real UI.",
      },
    ],
    flashcards: [
      { front: "React", back: "A JavaScript library for building user interfaces out of reusable components." },
      { front: "Component", back: "A function that returns JSX describing a piece of the screen." },
      { front: "JSX", back: "HTML-looking markup written inside JavaScript; React renders it to the page." },
      { front: "Curly braces { }", back: "How you insert a live JavaScript value into JSX." },
    ],
    miniProject: {
      title: "Your Personal Profile Card",
      brief: "Build a single React component that shows a little profile card about you.",
      steps: [
        "Create a ProfileCard component that returns a <div> with a className.",
        "Store your name, city, and a hobby in variables.",
        "Show all three inside the card using curly braces.",
        "Add an <h1> title and a short <p> bio under it.",
      ],
    },
    industryUse: [
      "Facebook and Instagram (Meta built and runs React) power their entire UIs with it",
      "Netflix uses React for its fast, interactive browsing interface",
      "Airbnb, Uber, and Discord build their web apps out of React components",
    ],
    commonMistakes: [
      "Naming a component with a lowercase letter (function welcome) — React treats lowercase as a plain HTML tag. Always capitalize: Welcome.",
      "Writing class=\"card\" like in HTML — in JSX it must be className=\"card\".",
      "Returning two side-by-side tags without a wrapper — a component must return one top-level element (wrap them in a <div> or <>...</>).",
    ],
    interviewQuestions: [
      "What problem does React solve compared to updating the DOM by hand?",
      "What is JSX and how is it different from HTML?",
      "Why are components a useful way to structure a UI?",
    ],
    papers: [],
    nextUp: ["react-props", "react-state"],
    cheatsheet: [
      "Component = function that returns JSX",
      "Component names start with a Capital letter",
      "Use className, not class",
      "Insert JS values with { }",
      "Return one wrapped element",
    ],
  },

  "react-props": {
    story:
      "You built one nice profile card. Now your app needs fifty cards, one per user — same design, different names and photos. You would never copy-paste the component fifty times and edit each by hand. Instead you build the card ONCE, and each time you use it you hand it a little packet of information: 'this one is for Maria, age 30, photo here.' Those packets are called props. It is exactly like a coffee shop order form: the cup is always the same cup, but you write 'Maria, oat milk, large' on the side, and the barista makes that specific drink.",
    problem:
      "Without a way to pass data into a component, every component would be frozen with hard-coded text. You need one reusable component that displays different content each time you use it — otherwise you cannot build a real app with a list of anything.",
    analogy:
      "Props are like the arguments you fill into a form: same blank form (the component), different answers each time (the props) produce different results.",
    explanation: [
      "Props (short for 'properties') are the inputs you pass to a component, written like HTML attributes: <Card name=\"Maria\" age={30} />.",
      "Inside the component, all those props arrive together as one object. You read them like props.name and props.age.",
      "A common tidy trick is destructuring: write function Card({ name, age }) so you can just use name and age directly instead of props.name.",
      "Props flow ONE WAY: from a parent component down to its children. A child can read a prop but cannot change it — props are read-only, like a printed receipt.",
      "Text props use quotes (name=\"Maria\"); anything that is a real JavaScript value — a number, an array, a variable — goes in curly braces (age={30}).",
      "Use props whenever you want the same component to show different content. That is what makes a component reusable instead of a one-off.",
    ],
    code: {
      language: "javascript",
      source: `// One reusable component, fed different props each time.
function UserCard({ name, age, city }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>{age} years old, from {city}</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <UserCard name="Maria" age={30} city="Delhi" />
      <UserCard name="Sam" age={25} city="Pune" />
    </div>
  );
}`,
      explanation:
        "UserCard is built once but reused with different props, producing two different cards. Notice age={30} uses braces (a number) while name=\"Maria\" uses quotes (text).",
    },
    exercise: {
      prompt: "Give the Button component a label prop and show it as the button's text.",
      starter: `function Button({ label }) {
  // TODO: return a <button> showing the label prop
  return <button>Click</button>;
}
// Used as: <Button label="Save" />`,
      solution: `function Button({ label }) {
  return <button>{label}</button>;
}`,
    },
    quiz: [
      {
        question: "Which way does data flow with props?",
        options: [
          "From child up to parent",
          "From parent down to child",
          "In both directions equally",
          "Randomly",
        ],
        answerIndex: 1,
        explanation: "Props flow one way: a parent passes them down to its children. This one-way flow keeps apps predictable.",
      },
      {
        question: "How do you pass the number 30 as a prop called age?",
        options: [
          "age=\"30\"",
          "age={30}",
          "age=30",
          "age:30",
        ],
        answerIndex: 1,
        explanation: "Real JavaScript values like numbers go in curly braces: age={30}. Quotes would make it the text \"30\".",
      },
    ],
    flashcards: [
      { front: "Props", back: "Inputs passed into a component to customize what it displays." },
      { front: "Read-only", back: "A component can read its props but must never change them." },
      { front: "Destructuring props", back: "Writing function Card({ name }) to grab props by name directly." },
      { front: "One-way data flow", back: "Props always pass from a parent component down to its children." },
    ],
    miniProject: {
      title: "A Reusable Recipe Card",
      brief: "Build one RecipeCard component and reuse it for three different recipes.",
      steps: [
        "Create RecipeCard({ title, minutes, difficulty }) returning a styled card.",
        "Show the title in an <h2> and the minutes and difficulty in a <p>.",
        "In App, render three RecipeCard components with different props.",
        "Pass minutes as a number in braces and title as text in quotes.",
      ],
    },
    industryUse: [
      "Design systems at companies like Shopify and Atlassian ship reusable prop-driven components (buttons, modals) used across hundreds of pages",
      "Netflix passes movie data as props into a single card component to render entire rows of titles",
      "E-commerce sites like Walmart use one ProductCard fed different props to render whole catalogs",
    ],
    commonMistakes: [
      "Trying to change a prop inside the child (props.name = 'X') — props are read-only; if a value must change, it belongs in state instead.",
      "Passing a number as text: age=\"30\" makes it a string. Use age={30} for real numbers so math works.",
      "Forgetting the curly braces when passing variables — name={userName} not name=userName.",
    ],
    interviewQuestions: [
      "What are props and how do they differ from state?",
      "Why are props described as read-only, and what happens if you try to mutate one?",
      "How do you pass a number versus a string as a prop?",
    ],
    papers: [],
    nextUp: ["react-state", "react-lists"],
    cheatsheet: [
      "Props = inputs to a component",
      "Read with { name } destructuring",
      "Text: name=\"Maria\" · Number: age={30}",
      "Props are read-only",
      "Data flows parent -> child",
    ],
  },

  "react-state": {
    story:
      "Props are things handed to a component from outside, and the component cannot change them. But what about things the component itself needs to remember and change — like how many times you clicked a button, or whether a menu is open? That is state: a component's own private memory. Here is the special part: when state changes, React automatically redraws that part of the screen to match. You do not touch the page yourself. You just say 'the count is now 6,' and React repaints the number for you. It is like a scoreboard operator who only has to change the number; the giant display updates itself.",
    problem:
      "A component often needs to remember something that changes over time and have the screen reflect it. A normal variable will not work — if you change a plain variable, React never notices and the screen stays stale. You need a special kind of memory that tells React 'redraw me.'",
    analogy:
      "State is a component's sticky note it can rewrite; every time it rewrites the note, React redraws the screen to match. A plain variable is a note nobody is watching.",
    explanation: [
      "useState is a React Hook (a special function) that gives your component a piece of memory. You call it like: const [count, setCount] = useState(0).",
      "It hands back two things: the current value (count) and a function to change it (setCount). The 0 is the starting value.",
      "NEVER change state directly (count = count + 1 does nothing useful). Always use the setter: setCount(count + 1). That setter is what tells React to redraw.",
      "When you call the setter, React re-runs your component function with the new value, and the screen updates. This re-run is called a re-render.",
      "When the new state depends on the old one, pass a function: setCount(prev => prev + 1). This is safer when several updates happen quickly.",
      "Use state for anything that changes and should show on screen: counts, toggles, text a user is typing, which tab is selected. Use props for data coming in from a parent.",
    ],
    code: {
      language: "javascript",
      source: `import { useState } from "react";

function Counter() {
  // count = current value, setCount = how we change it
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}`,
      explanation:
        "useState(0) starts the count at 0. Clicking calls setCount, which updates state and makes React redraw the paragraph with the new number automatically.",
    },
    exercise: {
      prompt: "Add a Reset button that sets the count back to 0.",
      starter: `const [count, setCount] = useState(0);
return (
  <div>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Add</button>
    {/* TODO: add a Reset button that sets count to 0 */}
  </div>
);`,
      solution: `const [count, setCount] = useState(0);
return (
  <div>
    <p>{count}</p>
    <button onClick={() => setCount(count + 1)}>Add</button>
    <button onClick={() => setCount(0)}>Reset</button>
  </div>
);`,
    },
    quiz: [
      {
        question: "Why can't you just do count = count + 1 to update state?",
        options: [
          "It is a syntax error",
          "React won't notice the change, so the screen won't update",
          "It deletes the component",
          "Numbers can't be added in React",
        ],
        answerIndex: 1,
        explanation: "Only the setter (setCount) tells React to re-render. Changing the variable directly leaves the screen stale.",
      },
      {
        question: "What does useState(0) return?",
        options: [
          "Just the number 0",
          "A pair: the current value and a function to change it",
          "The whole component",
          "A CSS style",
        ],
        answerIndex: 1,
        explanation: "It returns [value, setter]. You destructure them, e.g. const [count, setCount] = useState(0).",
      },
    ],
    flashcards: [
      { front: "State", back: "A component's own memory that changes over time and triggers a re-render." },
      { front: "useState", back: "A Hook that returns [currentValue, setterFunction]." },
      { front: "Setter function", back: "The function (like setCount) you must call to update state and redraw the UI." },
      { front: "Re-render", back: "React re-running your component to update the screen after state changes." },
    ],
    miniProject: {
      title: "A Like Button",
      brief: "Build a heart button that counts likes and can be reset.",
      steps: [
        "Set up const [likes, setLikes] = useState(0).",
        "Show a heart and the like count.",
        "On click, call setLikes(likes + 1).",
        "Add a Reset button, and try disabling it visually when likes is 0.",
      ],
    },
    industryUse: [
      "Every interactive React app (Twitter/X like counts, Spotify play toggles) leans on useState for local UI state",
      "Form fields, dropdowns, and modals across apps like Notion track open/closed and typed values in state",
      "Dashboards at analytics companies use state to track which filter or tab the user selected",
    ],
    commonMistakes: [
      "Mutating state directly (count++ or pushing into a state array) — always call the setter with a new value.",
      "Calling useState inside an if-statement or loop — Hooks must be called at the top level of the component every time.",
      "Expecting count to be updated on the very next line after setCount — the new value shows on the next render, not instantly.",
    ],
    interviewQuestions: [
      "What is the difference between props and state?",
      "Why must you use the setter function instead of assigning to the state variable directly?",
      "What does the functional update form setCount(prev => prev + 1) protect against?",
    ],
    papers: [],
    nextUp: ["react-effects", "react-forms"],
    cheatsheet: [
      "const [x, setX] = useState(start)",
      "Never assign x directly — use setX(...)",
      "setX triggers a re-render",
      "Depends on old value? setX(prev => prev + 1)",
      "State = component's private memory",
    ],
  },

  "react-effects": {
    story:
      "Your component's main job is simple: take data, return JSX, draw the screen. But sometimes you need to reach OUTSIDE that clean job — fetch data from the internet, start a timer, set the browser tab title, or listen for the keyboard. These are called side effects, because they touch the world beyond just drawing. If you tried to do them right in the middle of drawing, you would cause chaos (imagine fetching new data, which redraws, which fetches again, forever). useEffect is React's designated 'do this AFTER the screen is drawn' slot. It is like a chef who cooks the meal first (renders), then does the side task of texting the customer 'your food is ready' (the effect).",
    problem:
      "Rendering should be pure and predictable — same data in, same screen out, no surprises. But real apps must talk to the outside world: servers, timers, the document title. Doing those things during render breaks React. You need a safe place to run them, and a way to clean them up.",
    analogy:
      "useEffect is the 'after the show' checklist: the play finishes (render), THEN the crew sweeps the stage and sets timers for tomorrow (the effect) — never during the performance.",
    explanation: [
      "useEffect(fn, deps) runs the function fn AFTER React has painted the screen. It is where side effects live: fetching data, timers, subscriptions, setting document.title.",
      "The second argument is the dependency array — a list of values the effect 'watches'. React re-runs the effect whenever any of them changes.",
      "An empty array [] means 'run once, right after the first render, then never again.' Great for loading initial data.",
      "No array at all means 'run after EVERY render' — usually a mistake that causes loops. Almost always give a dependency array.",
      "If your effect starts something ongoing (a timer, a subscription), return a cleanup function. React runs it before the next effect and when the component leaves the screen — this prevents memory leaks.",
      "Rule of thumb: if you are reacting to a state/prop change or reaching outside React (network, browser, timers), useEffect is the tool. If you can compute a value directly during render, do NOT use an effect for it.",
    ],
    code: {
      language: "javascript",
      source: `import { useState, useEffect } from "react";

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // start a timer after the screen is drawn
    const id = setInterval(() => setTime(new Date()), 1000);
    // cleanup: stop the timer when the component leaves
    return () => clearInterval(id);
  }, []); // [] = set this up only once

  return <p>The time is {time.toLocaleTimeString()}</p>;
}`,
      explanation:
        "The effect starts a ticking timer once (empty deps). The returned cleanup function clears the timer so it does not keep running after the component is gone.",
    },
    exercise: {
      prompt: "Use an effect to set the browser tab title to the current count whenever count changes.",
      starter: `const [count, setCount] = useState(0);
// TODO: useEffect that sets document.title to "Count: <count>"
// and re-runs whenever count changes
return <button onClick={() => setCount(count + 1)}>{count}</button>;`,
      solution: `const [count, setCount] = useState(0);
useEffect(() => {
  document.title = "Count: " + count;
}, [count]);
return <button onClick={() => setCount(count + 1)}>{count}</button>;`,
    },
    quiz: [
      {
        question: "What does an empty dependency array [] mean?",
        options: [
          "Run the effect after every render",
          "Run the effect once, after the first render",
          "Never run the effect",
          "Run the effect only on errors",
        ],
        answerIndex: 1,
        explanation: "[] means the effect runs a single time after the first render — perfect for loading initial data.",
      },
      {
        question: "Why return a cleanup function from useEffect?",
        options: [
          "To make the code shorter",
          "To stop timers/subscriptions and prevent leaks when the component updates or unmounts",
          "It is required for every effect",
          "To style the component",
        ],
        answerIndex: 1,
        explanation: "Cleanup tears down ongoing work (timers, listeners) before the next run and when the component leaves the screen.",
      },
    ],
    flashcards: [
      { front: "Side effect", back: "Work that reaches outside rendering: fetching, timers, setting the title, subscriptions." },
      { front: "useEffect", back: "A Hook that runs a function after render, controlled by a dependency array." },
      { front: "Dependency array", back: "The list of values an effect watches; the effect re-runs when they change." },
      { front: "Cleanup function", back: "The function returned from an effect that undoes ongoing work (e.g. clearInterval)." },
    ],
    miniProject: {
      title: "A Live Countdown Timer",
      brief: "Build a timer that counts down from 60 to 0 and stops.",
      steps: [
        "Hold the seconds left in state, starting at 60.",
        "In a useEffect with [], start a setInterval that decreases seconds each tick.",
        "Return a cleanup that clears the interval.",
        "Stop decreasing (or clear) when it reaches 0, and show 'Done!'.",
      ],
    },
    industryUse: [
      "Chat apps like Slack open a live connection in an effect to receive new messages and clean it up on leave",
      "Dashboards poll an API on an interval inside useEffect to refresh live metrics",
      "Analytics tools fire a page-view event in an effect each time the route changes",
    ],
    commonMistakes: [
      "Leaving out the dependency array, causing the effect to run every render — often an infinite loop when it also sets state.",
      "Forgetting cleanup for timers/listeners, which piles up leaks and duplicate timers.",
      "Using an effect to compute a value that could just be derived during render — reach for effects only for real outside-world work.",
    ],
    interviewQuestions: [
      "When does useEffect run relative to rendering?",
      "What is the dependency array and how do [], [x], and no array differ?",
      "Why and when do you return a cleanup function from an effect?",
    ],
    papers: [],
    nextUp: ["react-fetch", "react-lists"],
    cheatsheet: [
      "useEffect(fn, deps) runs after paint",
      "[] = run once · [x] = run when x changes",
      "No array = every render (usually a bug)",
      "return () => cleanup() for timers/listeners",
      "Effects = talk to the outside world",
    ],
  },

  "react-lists": {
    story:
      "You have an array of ten movie titles and you want ten cards on screen. You are NOT going to write ten <Card> tags by hand — and tomorrow the list might have a hundred. In React you take the array and 'map' each item into a piece of JSX, producing a whole list in one line. But React needs one small favor: when you render a list, give each item a unique key. Why? Because if the list changes — you delete one, reorder them — React has to figure out which card is which. The key is like a name tag at a conference: without it, when people shuffle around, the organizer has no idea who moved where and starts handing out the wrong badges.",
    problem:
      "Real apps display lists of things — messages, products, search results — and the length is unknown ahead of time. You need to turn an array of data into an array of UI, efficiently, and React needs a way to track each item so updates stay correct and fast.",
    analogy:
      "map() is an assembly line: raw parts (data) go in one end, finished cards come out the other. The key is each item's name tag so React never mixes them up when the line reshuffles.",
    explanation: [
      "Use the array method .map() to turn each data item into a JSX element: items.map(item => <li>{item}</li>).",
      "The result is an array of elements, and React happily renders an array — so you can drop {items.map(...)} straight into your JSX.",
      "Every element produced by map needs a key prop: a stable, unique value. React uses it to match old and new list items across re-renders.",
      "The best key is a real unique id from your data (movie.id). Only fall back to the array index as a key if the list never reorders or changes.",
      "Do NOT use the index as key for lists that get reordered, filtered, or have items inserted/removed — it causes subtle bugs where the wrong item keeps the wrong state.",
      "Keys are for React's bookkeeping only; they do not appear on the page and you cannot read them back from props.",
    ],
    code: {
      language: "javascript",
      source: `function MovieList() {
  const movies = [
    { id: 1, title: "Inception" },
    { id: 2, title: "Coco" },
    { id: 3, title: "Dune" },
  ];

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>{movie.title}</li>
      ))}
    </ul>
  );
}`,
      explanation:
        "map turns each movie object into an <li>. key={movie.id} gives React a stable id per item so it can update the list correctly and fast.",
    },
    exercise: {
      prompt: "Render the fruits array as a list, using each fruit's id as the key.",
      starter: `const fruits = [
  { id: "a", name: "Apple" },
  { id: "b", name: "Banana" },
];
// TODO: return a <ul> with one <li> per fruit, keyed by id
return null;`,
      solution: `const fruits = [
  { id: "a", name: "Apple" },
  { id: "b", name: "Banana" },
];
return (
  <ul>
    {fruits.map((fruit) => (
      <li key={fruit.id}>{fruit.name}</li>
    ))}
  </ul>
);`,
    },
    quiz: [
      {
        question: "What is the key prop used for?",
        options: [
          "To style each list item",
          "To help React identify which items changed, moved, or were removed",
          "To sort the list",
          "To store the item's text",
        ],
        answerIndex: 1,
        explanation: "Keys let React match items across renders so list updates stay correct and efficient.",
      },
      {
        question: "What makes the best key?",
        options: [
          "A random number generated each render",
          "The array index, always",
          "A stable, unique id from your data",
          "The item's text content",
        ],
        answerIndex: 2,
        explanation: "A stable unique id (like item.id) is ideal. Random keys break matching; the index is risky for lists that reorder.",
      },
    ],
    flashcards: [
      { front: ".map()", back: "Array method that turns each data item into a JSX element to render a list." },
      { front: "key prop", back: "A unique, stable id on each list item so React can track it across re-renders." },
      { front: "Why not index as key", back: "It breaks item identity when the list reorders, filters, or has inserts/removals." },
      { front: "Rendering an array", back: "React renders an array of elements, so {items.map(...)} works directly in JSX." },
    ],
    miniProject: {
      title: "A To-Do List Renderer",
      brief: "Turn an array of tasks into a rendered checklist.",
      steps: [
        "Create an array of task objects, each with an id and text.",
        "Map over them into <li> elements, keyed by id.",
        "Show a count above the list ('3 tasks').",
        "Add a 'done' boolean per task and strike-through the done ones.",
      ],
    },
    industryUse: [
      "Instagram and Twitter/X render feeds by mapping post data into card components with stable keys",
      "E-commerce sites map product arrays into grids of ProductCard components",
      "Email clients like Gmail map message arrays into the inbox list, keyed by message id",
    ],
    commonMistakes: [
      "Forgetting the key prop entirely — React warns in the console and list updates may glitch.",
      "Using the array index as key on a list that reorders or filters, causing inputs/state to jump to the wrong row.",
      "Using Math.random() as a key — a new key every render defeats the whole purpose and hurts performance.",
    ],
    interviewQuestions: [
      "How do you render a list of items in React?",
      "Why does React require a key on list items, and what makes a good key?",
      "What bugs can arise from using the array index as a key?",
    ],
    papers: [],
    nextUp: ["react-forms", "react-fetch"],
    cheatsheet: [
      "List UI = data.map(item => <El/>)",
      "Every mapped element needs key={...}",
      "Best key = stable unique id",
      "Avoid index as key when list changes",
      "Keys are React-internal, not on the page",
    ],
  },

  "react-forms": {
    story:
      "You put a text box on your page and start typing. Who is in charge of what those letters are — the browser, or React? In plain HTML the browser quietly holds the value and React has no idea what you typed. That is a problem: you want React to know, so it can search as you type, validate an email, or disable the submit button until fields are filled. The fix is the controlled input: you make React the single source of truth. The input shows whatever is in state, and every keystroke updates that state. React is now the boss of the box. It is like a shared document where the screen always mirrors one master copy — change the master, the screen follows.",
    problem:
      "By default, form fields manage their own value inside the browser, out of React's sight. But you often need React to read, react to, and control that value — for live search, validation, or conditional buttons. You need to wire the input's value to React state.",
    analogy:
      "A controlled input is a thermostat display wired to one setting: the screen shows the setting, and turning the dial (typing) changes that one setting — never two disagreeing copies.",
    explanation: [
      "A controlled input has two wires: value={text} (show what's in state) and onChange (update state on every keystroke).",
      "The onChange handler receives an event; you read the typed text from event.target.value and pass it to your setter.",
      "Now state is the single source of truth: the box always displays the state, and the state always matches the box. They can never drift apart.",
      "For a submit button, put an onSubmit on the <form> and call event.preventDefault() to stop the browser from reloading the page.",
      "You can validate live — for example disable the button while the field is empty — because React always knows the current value.",
      "Checkboxes use checked instead of value, and their onChange reads event.target.checked (true/false). Same idea, different property.",
    ],
    code: {
      language: "javascript",
      source: `import { useState } from "react";

function NameForm() {
  const [name, setName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();          // stop the page reload
    alert("Hello, " + name);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}                               // show state
        onChange={(e) => setName(e.target.value)}  // update state
        placeholder="Your name"
      />
      <button disabled={name === ""}>Greet</button>
    </form>
  );
}`,
      explanation:
        "The input's value comes from state and every keystroke updates it via onChange, so React always knows the name. The button stays disabled until something is typed.",
    },
    exercise: {
      prompt: "Add live character counting: show how many characters are in the message state.",
      starter: `const [message, setMessage] = useState("");
return (
  <div>
    <input value={message} onChange={(e) => setMessage(e.target.value)} />
    {/* TODO: show the number of characters typed */}
  </div>
);`,
      solution: `const [message, setMessage] = useState("");
return (
  <div>
    <input value={message} onChange={(e) => setMessage(e.target.value)} />
    <p>{message.length} characters</p>
  </div>
);`,
    },
    quiz: [
      {
        question: "What makes an input 'controlled' in React?",
        options: [
          "It has a placeholder",
          "Its value comes from state and onChange updates that state",
          "It is inside a <form>",
          "It uses a special CSS class",
        ],
        answerIndex: 1,
        explanation: "A controlled input's value is driven by state, and onChange keeps state in sync with every keystroke.",
      },
      {
        question: "Why call event.preventDefault() in a form submit handler?",
        options: [
          "To clear the form",
          "To stop the browser from reloading the page on submit",
          "To focus the input",
          "It is optional decoration",
        ],
        answerIndex: 1,
        explanation: "By default an HTML form reloads the page on submit; preventDefault stops that so React can handle it.",
      },
    ],
    flashcards: [
      { front: "Controlled input", back: "An input whose value comes from state and is updated via onChange." },
      { front: "onChange", back: "The handler that fires on each keystroke; read event.target.value inside it." },
      { front: "Single source of truth", back: "State holds the real value; the input just displays it, so they never disagree." },
      { front: "preventDefault()", back: "Stops the browser's default form submit (a full page reload)." },
    ],
    miniProject: {
      title: "A Sign-Up Form",
      brief: "Build a small form with live validation and a smart submit button.",
      steps: [
        "Add controlled inputs for email and password in state.",
        "Disable the submit button until the email contains '@' and password length is 6+.",
        "Show a small red hint under any invalid field.",
        "On submit, preventDefault and alert the entered email.",
      ],
    },
    industryUse: [
      "Search bars on sites like YouTube use controlled inputs to filter results as you type",
      "Checkout forms at Stripe-powered stores validate card fields live via controlled inputs",
      "Login and sign-up flows everywhere use controlled inputs to enable/disable submit and show errors",
    ],
    commonMistakes: [
      "Setting value={name} but forgetting onChange — the input becomes read-only and typing does nothing.",
      "Forgetting preventDefault, so the page reloads and your handler seems to 'not work'.",
      "Starting state as undefined instead of an empty string, which triggers React's 'uncontrolled to controlled' warning.",
    ],
    interviewQuestions: [
      "What is a controlled component and why use one?",
      "How do you read the typed value inside an onChange handler?",
      "Why do you call preventDefault in a form's submit handler?",
    ],
    papers: [],
    nextUp: ["react-fetch", "react-movie-app"],
    cheatsheet: [
      "Controlled: value={x} + onChange",
      "Read text: e.target.value",
      "Checkbox: checked + e.target.checked",
      "Submit: onSubmit + e.preventDefault()",
      "State = single source of truth",
    ],
  },

  "react-fetch": {
    story:
      "Everything so far used data you typed into the file yourself. But a real app gets its data from the internet — a list of movies, today's weather, your messages — by asking a server for it. That asking is called fetching, and it takes time (the server is far away). Three things can happen: it is still loading, it succeeded, or it failed. A good app shows all three honestly: a spinner while loading, the data when it arrives, and a friendly error if the network hiccups. Beginners show only the happy path and then panic when the wifi drops. You will handle all three like a pro. Think of it like ordering takeout: you wait (loading), the food arrives (data), or they call to say they are out of your dish (error).",
    problem:
      "Hard-coded data is useless for real apps — you need live information from a server. But network requests are slow and can fail, and they must run at the right time (not during render). You need a pattern that fetches data safely and shows loading and error states.",
    analogy:
      "Fetching is like ordering delivery: you place the order and wait (loading), the meal shows up (data), or something goes wrong (error) — a good app plans for all three.",
    explanation: [
      "fetch(url) asks a server for data and returns a promise — a placeholder for a result that will arrive later. You use async/await to wait for it cleanly.",
      "Servers usually reply in JSON (a text format for data), so you call response.json() to turn it into a JavaScript object or array.",
      "Kick off the fetch inside a useEffect so it runs after render, not during it — usually with an empty [] to load once when the component mounts.",
      "Track three pieces of state: the data, a loading boolean, and an error. Show a spinner while loading, the data when ready, the error message if it fails.",
      "Wrap the request in try/catch/finally so a failed network call sets the error state instead of crashing, and loading is switched off no matter what.",
      "For anything beyond basics, teams use libraries like React Query to handle caching, retries, and refetching — but the loading/data/error mental model is exactly the same.",
    ],
    code: {
      language: "javascript",
      source: `import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("https://api.example.com/users");
        if (!res.ok) throw new Error("Request failed");
        setUsers(await res.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oops: {error}</p>;
  return <ul>{users.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}`,
      explanation:
        "The effect fetches once on mount, awaits the JSON, and flips loading/error/data states. The three early returns render the loading, error, and success screens.",
    },
    exercise: {
      prompt: "Add a check that throws an error when the response is not ok, so failures show the error screen.",
      starter: `const res = await fetch(url);
// TODO: if the response is not ok, throw an Error
const data = await res.json();
setItems(data);`,
      solution: `const res = await fetch(url);
if (!res.ok) throw new Error("Request failed: " + res.status);
const data = await res.json();
setItems(data);`,
    },
    quiz: [
      {
        question: "Where should you start a data fetch in a React component?",
        options: [
          "Directly in the middle of the JSX",
          "Inside a useEffect so it runs after render",
          "Inside the return statement",
          "It doesn't matter",
        ],
        answerIndex: 1,
        explanation: "Fetching is a side effect, so it belongs in useEffect (often with []) — never during render.",
      },
      {
        question: "Which three states should a good fetch handle?",
        options: [
          "Start, middle, end",
          "Loading, data (success), and error",
          "Open, closed, paused",
          "Red, green, blue",
        ],
        answerIndex: 1,
        explanation: "Robust UIs show a loading indicator, the data on success, and a friendly message on error.",
      },
    ],
    flashcards: [
      { front: "fetch(url)", back: "Browser function that requests data from a server and returns a promise." },
      { front: "Promise", back: "A placeholder for a value that will arrive later; await pauses for it." },
      { front: "response.json()", back: "Turns the server's JSON text into a usable JavaScript object/array." },
      { front: "Loading / data / error", back: "The three states every real fetch should handle in the UI." },
    ],
    miniProject: {
      title: "A Random Joke Fetcher",
      brief: "Fetch a joke from a public API and show loading and error states.",
      steps: [
        "Set up data, loading, and error state.",
        "In useEffect, fetch a joke API and await res.json().",
        "Render 'Loading...', the joke, or an error message accordingly.",
        "Add a 'New joke' button that refetches on click.",
      ],
    },
    industryUse: [
      "Netflix and Spotify fetch your personalized rows and playlists from APIs on load",
      "Weather and news apps fetch fresh data from public APIs and show spinners while it arrives",
      "Most React teams use React Query or SWR on top of fetch to cache and refetch server data",
    ],
    commonMistakes: [
      "Only handling success and forgetting loading/error, so the app looks broken on slow or failed networks.",
      "Fetching directly during render instead of inside useEffect, causing repeated requests or errors.",
      "Not checking res.ok — fetch does not throw on 404/500 by itself, so you must check and throw yourself.",
    ],
    interviewQuestions: [
      "Walk through fetching data in a React component, including loading and error handling.",
      "Why does fetch belong in useEffect rather than in the render body?",
      "Why must you check response.ok even when the fetch 'succeeds'?",
    ],
    papers: [],
    nextUp: ["react-router", "react-movie-app"],
    cheatsheet: [
      "fetch in useEffect(..., [])",
      "await fetch -> await res.json()",
      "Track data + loading + error",
      "Check res.ok, else throw",
      "Real apps: React Query / SWR",
    ],
  },

  "react-router": {
    story:
      "A real app has more than one screen: a home page, a details page, a profile. On an old website, clicking a link makes the browser throw away everything and load a brand-new page from the server — slow, with a white flash. React apps do something slicker: they load once, then swap the visible screen instantly when the URL changes, no reload. That trick is called client-side routing, and React Router is the tool that does it. It watches the address bar and shows the component that matches the current path. It is like a hotel receptionist: you say a room number (the URL) and they point you to the right room — no need to demolish and rebuild the hotel each time.",
    problem:
      "Users expect real pages: a shareable URL for each screen, a working Back button, and instant navigation. But a React app is really one page. You need a way to map URLs to components and switch between them without a full reload.",
    analogy:
      "React Router is a switchboard: it reads the URL and connects it to the right screen component, instantly, without tearing the whole app down.",
    explanation: [
      "React Router maps URL paths to components: path '/' shows Home, '/movies/:id' shows a specific movie. When the URL changes, it swaps the matching component in.",
      "You wrap your app in <BrowserRouter>, then declare <Routes> containing one <Route path=... element={...} /> per screen.",
      "For navigation, use the <Link to=\"/about\"> component instead of a plain <a href>. Link changes the screen without reloading the page.",
      "Dynamic parts of a URL use a colon: path '/movies/:id'. Inside that component, useParams() gives you the actual id from the URL.",
      "useNavigate() lets you move to another route from code — handy after a form submit or a login, e.g. navigate('/dashboard').",
      "Because the URL is real, the Back button, refresh, and sharing a link all work naturally — a huge win over faking screens with state alone.",
    ],
    code: {
      language: "javascript",
      source: `import { BrowserRouter, Routes, Route, Link, useParams } from "react-router-dom";

function Home() {
  return <Link to="/movies/42">See movie 42</Link>;
}

function Movie() {
  const { id } = useParams();     // reads :id from the URL
  return <h2>Movie #{id}</h2>;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}`,
      explanation:
        "Two routes map URLs to screens. Clicking the Link switches to /movies/42 with no reload, and useParams() pulls the id (42) out of the URL for the Movie component.",
    },
    exercise: {
      prompt: "Add an About page at the path '/about' showing an <h2> that says About Us.",
      starter: `<Routes>
  <Route path="/" element={<Home />} />
  {/* TODO: add a Route for /about that renders <h2>About Us</h2> */}
</Routes>`,
      solution: `<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<h2>About Us</h2>} />
</Routes>`,
    },
    quiz: [
      {
        question: "What does client-side routing let you do?",
        options: [
          "Store data in a database",
          "Switch between screens instantly by changing the URL, with no full page reload",
          "Style your components",
          "Fetch data faster",
        ],
        answerIndex: 1,
        explanation: "Routing swaps the visible component when the URL changes, keeping navigation instant and the app a single page.",
      },
      {
        question: "How do you read the id from a URL path like /movies/:id?",
        options: [
          "props.id",
          "useParams()",
          "useState()",
          "document.url",
        ],
        answerIndex: 1,
        explanation: "useParams() returns the dynamic URL segments, so const { id } = useParams() gives you the movie id.",
      },
    ],
    flashcards: [
      { front: "Client-side routing", back: "Swapping screens by URL without a full page reload." },
      { front: "<Route>", back: "Maps a URL path to the component that should render for it." },
      { front: "<Link>", back: "Navigates to a route without reloading the page (use instead of <a>)." },
      { front: "useParams()", back: "Reads dynamic values (like :id) out of the current URL." },
    ],
    miniProject: {
      title: "A Two-Page Blog",
      brief: "Build a tiny app with a post list and individual post pages.",
      steps: [
        "Set up BrowserRouter with routes for '/' and '/posts/:id'.",
        "On Home, map an array of posts into <Link> elements to each post.",
        "In the Post page, read the id with useParams and show that post.",
        "Add a 'Back to home' Link on the post page.",
      ],
    },
    industryUse: [
      "Single-page apps like Trello and Notion use routing so each board/page has a shareable URL without reloads",
      "E-commerce sites route between '/', '/product/:id', and '/cart' seamlessly",
      "Dashboards route between tabs (overview, settings, billing) while keeping the app loaded once",
    ],
    commonMistakes: [
      "Using a plain <a href> for internal links, which forces a full reload and loses app state — use <Link> instead.",
      "Forgetting to wrap the app in <BrowserRouter>, so routes and hooks throw errors.",
      "Hard-coding screens with state toggles instead of real routes, breaking the Back button and shareable URLs.",
    ],
    interviewQuestions: [
      "What is client-side routing and how does it differ from traditional page navigation?",
      "How do you define a route with a URL parameter and read that parameter?",
      "Why use <Link> instead of a normal anchor tag in a React app?",
    ],
    papers: [],
    nextUp: ["react-movie-app"],
    cheatsheet: [
      "Wrap app in <BrowserRouter>",
      "<Route path=... element={...} />",
      "Navigate with <Link to=...> (not <a>)",
      "Dynamic path: /movies/:id",
      "Read it with useParams()",
    ],
  },

  "react-movie-app": {
    story:
      "Time to put it all together. You are going to build a real Movie Search app: a search box where someone types a title, and cards of matching movies appear from a live movie API — with a spinner while it loads and a friendly message if nothing is found. This one project uses every skill you learned: components to structure the UI, props to feed each movie card, state to hold the search text and results, a controlled input for the search box, useEffect plus fetch to call the API, and .map with keys to render the results. When it works, you will have built the kind of thing real frontend developers ship — and you will finally feel like React 'clicked.'",
    problem:
      "Individual concepts are easy in isolation; a real app is about wiring them together correctly. This project forces you to combine state, effects, props, forms, lists, and fetching into one coherent, working feature — exactly what the job requires.",
    analogy:
      "This is the recital after months of scales: every small skill you drilled now plays together as one smooth piece of music.",
    explanation: [
      "Structure it as a few components: an App that holds state, a SearchBar (controlled input), and a MovieCard fed each movie via props.",
      "Keep three pieces of state in App: the search query, the results array, and a loading flag (add an error flag for bonus points).",
      "The search box is a controlled input: its value is the query state and onChange updates it — so App always knows what the user typed.",
      "When the query changes (or on submit), run a fetch inside useEffect to call the movie API, then store the results with your setter.",
      "Render the results with results.map(movie => <MovieCard key={movie.id} ... />), showing a spinner while loading and 'No results' when the array is empty.",
      "To avoid firing a request on every single keystroke, add a small debounce (wait until the user pauses typing) — a real-world polish pros always add.",
    ],
    code: {
      language: "javascript",
      source: `import { useState, useEffect } from "react";

function MovieCard({ title, year }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <p>{year}</p>
    </div>
  );
}

function App() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) return;                 // don't search on empty
    setLoading(true);
    fetch("https://api.example.com/search?q=" + query)
      .then((res) => res.json())
      .then((data) => setMovies(data.results))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies..."
      />
      {loading && <p>Loading...</p>}
      {!loading && movies.length === 0 && <p>No results yet</p>}
      <div className="grid">
        {movies.map((m) => (
          <MovieCard key={m.id} title={m.title} year={m.year} />
        ))}
      </div>
    </div>
  );
}`,
      explanation:
        "App holds query/movies/loading state; the controlled input drives query; useEffect refetches when query changes; and map renders a keyed MovieCard per result with loading and empty states handled.",
    },
    exercise: {
      prompt: "Add an empty-state message that shows 'No movies found' only when loading is finished AND the results array is empty.",
      starter: `// loading and movies are in state
return (
  <div>
    {loading && <p>Loading...</p>}
    {/* TODO: show 'No movies found' only when not loading and movies is empty */}
    {movies.map((m) => <MovieCard key={m.id} title={m.title} year={m.year} />)}
  </div>
);`,
      solution: `return (
  <div>
    {loading && <p>Loading...</p>}
    {!loading && movies.length === 0 && <p>No movies found</p>}
    {movies.map((m) => <MovieCard key={m.id} title={m.title} year={m.year} />)}
  </div>
);`,
    },
    quiz: [
      {
        question: "In the movie app, why is the search box a controlled input?",
        options: [
          "So it looks nicer",
          "So the query state always reflects what the user typed, letting us fetch on it",
          "Because inputs must always be controlled",
          "To avoid using CSS",
        ],
        answerIndex: 1,
        explanation: "A controlled input keeps the query in state, so the effect can fetch results based on the current text.",
      },
      {
        question: "Why put the fetch inside a useEffect with [query] as a dependency?",
        options: [
          "To run it once at startup only",
          "So the search re-runs automatically whenever the query changes",
          "To style the results",
          "Effects are the only place code can run",
        ],
        answerIndex: 1,
        explanation: "With [query], the effect re-runs each time the query changes, refetching results for the new search term.",
      },
    ],
    flashcards: [
      { front: "Component structure", back: "App holds state; SearchBar and MovieCard are smaller pieces fed by props." },
      { front: "Lifting state up", back: "Keeping shared state (query, results) in the parent App so children can use it via props." },
      { front: "Debounce", back: "Waiting for the user to pause typing before firing a search, to avoid excess requests." },
      { front: "Empty state", back: "The message shown when there are no results and loading has finished." },
    ],
    miniProject: {
      title: "Movie Search App (Full Build)",
      brief: "Ship a working search app using a real public movie API (e.g. OMDb or TMDB).",
      steps: [
        "Sign up for a free movie API key and read its search endpoint docs.",
        "Build App with query/movies/loading/error state and a controlled SearchBar.",
        "Fetch results in useEffect keyed on the query; render keyed MovieCard components with posters.",
        "Add loading, empty, and error states, plus a debounce so it searches when typing pauses.",
        "Optional: add routing so clicking a card opens a /movie/:id details page.",
      ],
    },
    industryUse: [
      "Search-as-you-type features on Netflix, YouTube, and Spotify follow exactly this state + fetch + list pattern",
      "E-commerce product search (Amazon, Etsy) uses controlled inputs, debounced fetches, and keyed result lists",
      "This project is a classic portfolio piece that hiring managers recognize as proof you can wire a real React feature",
    ],
    commonMistakes: [
      "Firing a fetch on every keystroke with no debounce, hammering the API — wait for a pause in typing.",
      "Forgetting the loading and empty states, so the UI looks frozen or broken between searches.",
      "Scattering state into child components instead of lifting shared state (query, results) up to App.",
    ],
    interviewQuestions: [
      "Walk me through how you'd structure a search feature: components, state, and data fetching.",
      "How would you prevent a fetch from firing on every keystroke?",
      "Where does state live in this app and why (lifting state up)?",
    ],
    papers: [],
    nextUp: [],
    cheatsheet: [
      "State in App: query · movies · loading",
      "Controlled search input drives query",
      "Fetch in useEffect keyed on [query]",
      "Render results with .map + key",
      "Handle loading, empty, and error states",
      "Debounce to avoid per-keystroke requests",
    ],
  },
};
