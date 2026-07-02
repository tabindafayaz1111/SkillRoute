import type { LessonBody } from "@/types";

export const computerGraphics: Record<string, LessonBody> = {
  "cg-images": {
    story:
      "Hold your phone screen right up to your eye until it blurs. Suddenly you see it: the smooth photo you were looking at is actually a wall of tiny glowing squares, like a mosaic made of colored tiles. Nothing on a screen is ever a real curve or a real photo — it is always thousands of little squares, each told to glow one exact color. A screen is basically a giant spreadsheet of dots, and 'drawing' is just deciding what color to put in each cell. That is the whole secret of computer graphics: everything you see is a grid of colored dots.",
    problem:
      "A computer can only store and shuffle numbers. But you want it to show a sunset, a game character, a video call. How do you get from cold numbers to a picture your eyes read as a face? The trick is to chop the picture into a grid of tiny cells and give each cell a number that means a color.",
    analogy:
      "It is like cross-stitch or a Lego mosaic: up close it is just squares of yarn or brick, but step back and your brain blends them into a smooth image.",
    explanation: [
      "A screen is a rectangular grid of tiny lights called pixels (short for 'picture elements'). A modern phone has millions of them packed so tightly your eye can't see the seams.",
      "Each pixel can be set to one color at a time. An image is nothing more than a list of colors — one per pixel — arranged row by row.",
      "'Drawing' something means calculating which pixels it covers and what color each of those pixels should become. Draw a red circle = figure out which pixels fall inside the circle and paint them red.",
      "Because it is all just a grid of numbers, a computer can redraw the whole screen 60+ times a second, which is how you get smooth motion and video.",
      "The more pixels in the same space (higher resolution), the smoother and sharper the picture looks — but the more numbers the computer has to juggle.",
      "This is why zooming into a photo eventually shows blocky squares: you've run out of pixels, and you're finally seeing the raw grid underneath everything.",
    ],
    code: {
      language: "javascript",
      source: `// An image is just a grid of colors. Let's make a tiny 3x3 one.
// Each cell holds a color name.
const image = [
  ["red",   "red",   "red"],
  ["red",   "white", "red"],
  ["red",   "red",   "red"],
];

// "Reading" the image = walking the grid row by row.
for (let row = 0; row < image.length; row++) {
  for (let col = 0; col < image[row].length; col++) {
    console.log("pixel", row, col, "is", image[row][col]);
  }
}`,
      explanation:
        "This 3x3 grid is a real (tiny) image: a red square with a white dot in the middle. Every real image is this same idea, just with millions of cells instead of nine.",
    },
    exercise: {
      prompt: "Change the grid so the middle row is all blue instead of red-white-red.",
      starter: `const image = [
  ["red", "red",   "red"],
  ["red", "white", "red"],  // TODO: make this row all "blue"
  ["red", "red",   "red"],
];
console.log(image);`,
      solution: `const image = [
  ["red", "red",  "red"],
  ["blue","blue", "blue"],
  ["red", "red",  "red"],
];
console.log(image);`,
    },
    quiz: [
      {
        question: "What is a pixel?",
        options: [
          "A type of camera lens",
          "One tiny cell of the screen grid that shows a single color",
          "A file format for images",
          "The speed a screen refreshes",
        ],
        answerIndex: 1,
        explanation:
          "A pixel is one 'picture element' — a single dot in the grid, holding exactly one color at a time.",
      },
      {
        question: "Why does a photo look blocky when you zoom in far enough?",
        options: [
          "The camera was broken",
          "You run out of pixels and start seeing the raw grid of squares",
          "The screen changes color",
          "Zooming deletes data",
        ],
        answerIndex: 1,
        explanation:
          "There are only so many pixels. Zoom past that and each square gets stretched big enough to see — the mosaic underneath everything.",
      },
    ],
    flashcards: [
      { front: "Pixel", back: "One tiny cell of the screen grid; it shows a single color at a time." },
      { front: "Resolution", back: "How many pixels an image or screen has (e.g. 1920x1080). More pixels = sharper." },
      { front: "Image", back: "A grid of colors — one color per pixel, stored row by row." },
    ],
    miniProject: {
      title: "Pixel Art on Graph Paper",
      brief: "Draw a picture the way a computer does — one square at a time.",
      steps: [
        "Grab graph paper and outline a 10x10 grid.",
        "Pick a simple shape (heart, smiley, arrow).",
        "Color in whole squares only — no diagonals or curves allowed.",
        "Step back and notice your eye smoothing the squares into a shape.",
        "Count how many squares you colored — that's how many pixels your 'program' set.",
      ],
    },
    industryUse: [
      "Apple and Samsung market phones by pixel density (Retina displays) because more pixels look sharper",
      "Instagram and TikTok resize every uploaded image to fixed pixel grids so they load fast",
      "Nintendo and indie studios use deliberate low-resolution pixel art as a whole visual style",
    ],
    commonMistakes: [
      "Thinking screens draw real curves — they don't; every curve is faked with a staircase of squares.",
      "Assuming a bigger file always looks better — what matters is having enough pixels for the size it's shown at.",
    ],
    interviewQuestions: [
      "In plain terms, what is an image made of, and how does a screen show it?",
      "Why does the same photo look crisp on a phone but blurry blown up on a billboard?",
    ],
    papers: [],
    nextUp: ["cg-color", "cg-coordinates"],
    cheatsheet: [
      "Screen = grid of tiny lights called pixels",
      "Image = one color per pixel, stored row by row",
      "Drawing = decide the color of each pixel",
      "More pixels (higher resolution) = sharper picture",
      "Zoom too far and you see the raw squares",
    ],
  },

  "cg-color": {
    story:
      "Ask a painter how to make orange and they'll mix red and yellow. A computer screen is sneakier: it can only make three colors of light — red, green, and blue — and it makes every other color by shining those three at different brightnesses at once. Bright red + bright green light overlapping? Your eye sees yellow. All three full-blast? White. All three off? Black. So when your computer 'stores a color,' it really just stores three little dials: how much red, how much green, how much blue. That trio of numbers is called RGB, and it's how every color on Earth gets faked with only three lights.",
    problem:
      "A pixel needs to be able to show any color — millions of them. But a computer only stores numbers. How do you turn 'sunset orange' into numbers a screen can obey? You describe every color as a recipe of three ingredients: red, green, blue.",
    analogy:
      "It's like a shower with three faucets — one red, one green, one blue. Turn each one up or down and you can mix any color of light you want.",
    explanation: [
      "Each pixel's color is stored as three numbers: Red, Green, Blue — each from 0 (fully off) to 255 (fully on). So (255, 0, 0) is pure red, (0, 0, 0) is black, (255, 255, 255) is white.",
      "This is 'additive' color: you're adding light. That's the opposite of paint, where mixing everything gives muddy brown. On screens, mixing everything gives bright white.",
      "Why 255? Each dial uses 8 bits of memory, which can count from 0 to 255. Three dials give 256 x 256 x 256 ≈ 16.7 million possible colors — more than your eye can tell apart.",
      "In code and on the web, RGB is often written in hex, like #FF0000. FF is just 255 in the computer's base-16 number style. So #FF0000 = red, #00FF00 = green, #0000FF = blue.",
      "A fourth number, Alpha, controls transparency (0 = invisible, 255 = solid). RGBA lets you draw glass, shadows, and fades.",
      "Use RGB whenever you set a color in code. Reach for hex when copying colors from design tools or the web — they're the same recipe, just written differently.",
    ],
    math:
      "A color is a triple (R, G, B), each 0–255. White = (255,255,255), black = (0,0,0), and (127,127,127) is a medium gray. Adding alpha makes it (R, G, B, A).",
    code: {
      language: "javascript",
      source: `// Every color on screen is a red/green/blue recipe.
const red    = "rgb(255, 0, 0)";     // all red, no green or blue
const yellow = "rgb(255, 255, 0)";   // red + green light = yellow!
const white  = "rgb(255, 255, 255)"; // all three full = white
const gray   = "rgb(127, 127, 127)"; // equal + medium = gray

// Same red, written in hex (FF means 255):
const redHex = "#FF0000";

console.log(red, yellow, white, gray, redHex);`,
      explanation:
        "Notice yellow needs zero yellow — it's red and green light overlapping. That surprises everyone the first time, because it's light mixing, not paint mixing.",
    },
    exercise: {
      prompt: "Make the color purple. Hint: purple is red light plus blue light, with no green.",
      starter: `// TODO: fill in the three numbers for purple (max red, no green, max blue)
const purple = "rgb(?, ?, ?)";
console.log(purple);`,
      solution: `const purple = "rgb(255, 0, 255)";
console.log(purple);`,
    },
    quiz: [
      {
        question: "What does RGB stand for, and what does each number control?",
        options: [
          "Really Good Backgrounds — brightness levels",
          "Red, Green, Blue — how much of each colored light to shine",
          "Round, Grid, Box — pixel shapes",
          "Right, Ground, Base — screen positions",
        ],
        answerIndex: 1,
        explanation:
          "RGB = Red, Green, Blue. Each number (0–255) sets how much of that colored light the pixel emits.",
      },
      {
        question: "On a screen, what color do you get from full red + full green + full blue?",
        options: ["Brown", "Black", "White", "Gray"],
        answerIndex: 2,
        explanation:
          "Screens add light, so all three at full brightness make white. (Paint is the opposite — mixing all paints gives muddy brown.)",
      },
      {
        question: "What does the Alpha value in RGBA control?",
        options: ["Brightness", "Transparency", "Which screen to use", "Font size"],
        answerIndex: 1,
        explanation: "Alpha is opacity: 0 is fully see-through, 255 (or 1.0) is fully solid.",
      },
    ],
    flashcards: [
      { front: "RGB", back: "A color stored as three numbers (0–255): Red, Green, Blue light amounts." },
      { front: "Additive color", back: "Mixing light — more of everything = white. Screens work this way." },
      { front: "Hex color", back: "RGB written in base-16, e.g. #FF0000 = (255,0,0) = red." },
      { front: "Alpha", back: "The transparency dial: 0 = invisible, full = solid." },
    ],
    miniProject: {
      title: "Guess the Color",
      brief: "Train your eye to think in RGB recipes.",
      steps: [
        "Open any online RGB color picker (search 'rgb color picker').",
        "Before dragging sliders, guess the numbers for orange, then check.",
        "Set green and blue to 0 and slide red 0→255; watch black turn to red.",
        "Make three grays by setting all three sliders equal (50, 128, 200).",
        "Write down the RGB recipe for your favorite color to reuse in code.",
      ],
    },
    industryUse: [
      "Adobe Photoshop and Figma store every color you pick as RGB (or hex) under the hood",
      "Every website's CSS sets colors with rgb() or hex codes like #1DA1F2 (Twitter blue)",
      "TVs and monitors are tested and calibrated by measuring their red, green, and blue output",
    ],
    commonMistakes: [
      "Mixing up light and paint — expecting red + green to make brown; on screen it makes yellow.",
      "Forgetting the range is 0–255, not 0–100, so writing rgb(100,100,100) gives dark gray, not medium.",
    ],
    interviewQuestions: [
      "Explain how a screen produces the color yellow with only red, green, and blue lights.",
      "What is the difference between #FF0000 and rgb(255,0,0)?",
    ],
    papers: [],
    nextUp: ["cg-coordinates", "cg-canvas"],
    cheatsheet: [
      "Color = (Red, Green, Blue), each 0–255",
      "(255,0,0)=red · (0,0,0)=black · (255,255,255)=white",
      "Equal R=G=B → shades of gray",
      "Screens ADD light: red+green = yellow",
      "Hex #FF0000 = rgb(255,0,0); Alpha = transparency",
    ],
  },

  "cg-coordinates": {
    story:
      "Imagine telling a friend where to place a sticker on a big poster: 'go 3 across and 2 down.' You just used coordinates. A computer places every dot on screen the exact same way, with two numbers: how far across (x) and how far down (y). But here's the twist that trips up every beginner: on a screen, y grows DOWNWARD. The top-left corner is (0, 0), and moving down makes y bigger — the opposite of the graphs you drew in school. Once that clicks, you can point to any pixel on any screen with just two numbers.",
    problem:
      "You have millions of pixels. To draw anything, you need to say exactly which one you mean — 'this pixel, right here.' Vague isn't allowed. Coordinates give every single pixel a unique, unmistakable address: (x, y).",
    analogy:
      "It's like a seat in a theater: 'Row 5, Seat 12.' Two numbers pinpoint one exact spot, and everyone agrees where it is.",
    explanation: [
      "Every pixel has an address written (x, y): x is how far right from the left edge, y is how far down from the top edge.",
      "The origin (0, 0) is the TOP-LEFT corner of the screen or canvas — not the center, not the bottom.",
      "x increases as you go right (normal). y increases as you go DOWN. This flipped-y is the #1 surprise in graphics; school math has y going up.",
      "So on an 800x600 canvas: (0,0) is top-left, (800,0) is top-right, (0,600) is bottom-left, (400,300) is the center.",
      "To draw a shape, you give the coordinates of its key points. A rectangle needs a corner (x, y) plus a width and height. A circle needs a center (x, y) plus a radius.",
      "Whenever something appears 'upside down' or in the wrong corner, 90% of the time it's the flipped-y axis catching you out.",
    ],
    math:
      "Screen coordinates: origin (0,0) is top-left. A point is (x, y) where x grows rightward and y grows downward. Center of a width W by height H canvas is (W/2, H/2).",
    code: {
      language: "javascript",
      source: `// Canvas is 800 wide, 600 tall. Let's name the key spots.
const width = 800, height = 600;

const topLeft     = { x: 0,          y: 0 };          // the origin
const topRight    = { x: width,      y: 0 };
const bottomLeft  = { x: 0,          y: height };
const center      = { x: width / 2,  y: height / 2 }; // (400, 300)

console.log("Center is at", center.x, center.y);
// Move 50 pixels DOWN from center: y gets BIGGER
const below = { x: center.x, y: center.y + 50 };
console.log("Below center:", below);`,
      explanation:
        "See how moving down adds to y? That's the flipped axis. Adding to y goes down; subtracting from y goes up.",
    },
    exercise: {
      prompt:
        "Given a 400x400 canvas, write the coordinates of the BOTTOM-RIGHT corner and of the exact center.",
      starter: `const width = 400, height = 400;
const bottomRight = { x: ?, y: ? }; // TODO
const center      = { x: ?, y: ? }; // TODO
console.log(bottomRight, center);`,
      solution: `const width = 400, height = 400;
const bottomRight = { x: 400, y: 400 };
const center      = { x: 200, y: 200 };
console.log(bottomRight, center);`,
    },
    quiz: [
      {
        question: "On a computer screen, where is the point (0, 0)?",
        options: ["The center", "The bottom-left corner", "The top-left corner", "It moves around"],
        answerIndex: 2,
        explanation: "The origin (0,0) sits at the top-left corner of the screen or canvas.",
      },
      {
        question: "You increase a pixel's y value. Which way does it move?",
        options: ["Up", "Down", "Left", "Right"],
        answerIndex: 1,
        explanation:
          "On screens, y grows downward — the opposite of school graphs. Bigger y = lower on screen.",
      },
    ],
    flashcards: [
      { front: "Coordinate (x, y)", back: "A pixel's address: x across from the left, y down from the top." },
      { front: "Origin", back: "The point (0, 0) — the top-left corner in screen graphics." },
      { front: "Flipped y-axis", back: "On screens y increases downward, unlike math graphs where y goes up." },
      { front: "Center of canvas", back: "For width W, height H: the point (W/2, H/2)." },
    ],
    miniProject: {
      title: "Treasure Map Grid",
      brief: "Practice reading and writing (x, y) addresses.",
      steps: [
        "Draw a 10x10 grid and label the top-left corner (0,0).",
        "Number columns 0–10 rightward and rows 0–10 downward.",
        "Hide a 'treasure' and write its coordinates on a slip of paper.",
        "Have someone find it using only the (x, y) you gave.",
        "Now hide it 'up 2 from center' and compute the coordinates yourself.",
      ],
    },
    industryUse: [
      "Every video game tracks player and enemy positions as (x, y) (or x, y, z in 3D) coordinates",
      "Google Maps places pins by converting latitude/longitude into screen x, y coordinates",
      "Web designers position buttons and images using x/y coordinates in CSS and design tools",
    ],
    commonMistakes: [
      "Assuming y goes up like school math — on screens it goes down, so shapes end up flipped or in the wrong place.",
      "Forgetting the origin is top-left, so people put things off-screen with negative numbers by mistake.",
    ],
    interviewQuestions: [
      "How do you address a single pixel on the screen, and where is the origin?",
      "Why do beginners' shapes often appear upside-down, and how does the coordinate system explain it?",
    ],
    papers: [],
    nextUp: ["cg-canvas", "cg-transforms"],
    cheatsheet: [
      "Pixel address = (x, y)",
      "x → right · y → DOWN",
      "Origin (0,0) = top-left corner",
      "Center = (width/2, height/2)",
      "Weird flip? It's the downward y-axis",
    ],
  },

  "cg-canvas": {
    story:
      "Every browser secretly ships with a blank drawing board you can command with code — it's called the canvas. Think of it as an empty sheet of paper plus a robot hand holding a pen. You don't move the pen yourself; you type instructions: 'set the color to blue,' 'draw a rectangle here,' 'fill it in.' The robot obeys instantly. In about five lines you can draw a red square, a blue circle, and a line, all live in a web page. This is where computer graphics stops being theory and starts being something you make.",
    problem:
      "You understand pixels, color, and coordinates — but you need an actual place to draw and a set of commands to draw with. Setting millions of pixels by hand would be madness. The canvas gives you friendly commands like 'draw a rectangle' and sets all those pixels for you.",
    analogy:
      "It's like ordering at a coffee shop: you don't grind the beans yourself, you say 'one flat white' and it appears. You say 'fill a red rectangle' and the canvas paints every pixel for you.",
    explanation: [
      "A canvas is an HTML element (<canvas>) — a blank rectangle on a web page. You grab its 'context' (ctx), which is the robot pen you send commands to.",
      "You set a style, then draw. ctx.fillStyle = 'red' picks the paint color; ctx.fillRect(x, y, width, height) fills a rectangle at that spot.",
      "Order matters: whatever you draw last sits on top, like stacking stickers. Set the color BEFORE you draw, or you'll paint with the old color.",
      "Rectangles use a corner + width + height. Circles use ctx.arc(centerX, centerY, radius, 0, Math.PI*2) then ctx.fill(). Lines use moveTo (pen down here) then lineTo (drag to here) then stroke().",
      "Nothing appears until you call a 'commit' step: fill() paints inside a shape, stroke() draws its outline. Forgetting these is why beginners see a blank screen.",
      "Use canvas for games, charts, animations, and drawing apps. For static logos or icons that must scale crisply, designers often use SVG instead — but canvas is king for anything that moves or has thousands of shapes.",
    ],
    code: {
      language: "javascript",
      source: `// Grab the drawing board and its "robot pen" (the context).
const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

// 1) A red square: corner (20,20), 100 wide, 100 tall.
ctx.fillStyle = "red";
ctx.fillRect(20, 20, 100, 100);

// 2) A blue circle: center (250,70), radius 40.
ctx.fillStyle = "blue";
ctx.beginPath();
ctx.arc(250, 70, 40, 0, Math.PI * 2); // full circle
ctx.fill();

// 3) A green line from one point to another.
ctx.strokeStyle = "green";
ctx.beginPath();
ctx.moveTo(20, 160); // pen down here
ctx.lineTo(300, 160); // drag to here
ctx.stroke();`,
      explanation:
        "Set color, then draw. fillRect paints a solid rectangle; arc + fill paints a circle; moveTo/lineTo + stroke draws a line. Nothing shows until fill() or stroke() runs.",
    },
    exercise: {
      prompt:
        "Draw a solid yellow square that is 50x50, with its top-left corner at (100, 100).",
      starter: `const ctx = canvas.getContext("2d");
// TODO: set the fill color to yellow, then draw the square
`,
      solution: `const ctx = canvas.getContext("2d");
ctx.fillStyle = "yellow";
ctx.fillRect(100, 100, 50, 50);`,
    },
    quiz: [
      {
        question: "What does ctx.fillRect(20, 20, 100, 100) draw?",
        options: [
          "A circle centered at (20,20)",
          "A filled rectangle with top-left corner (20,20), 100 wide and 100 tall",
          "A line from (20,20) to (100,100)",
          "Nothing — you need coordinates in the center",
        ],
        answerIndex: 1,
        explanation:
          "fillRect(x, y, width, height) fills a rectangle starting at the top-left corner (x, y).",
      },
      {
        question: "You drew a circle but nothing appeared. What's the most likely reason?",
        options: [
          "The canvas is broken",
          "You forgot to call ctx.fill() or ctx.stroke() to actually paint it",
          "Circles aren't supported",
          "You need a new browser",
        ],
        answerIndex: 1,
        explanation:
          "Defining a path (arc) doesn't paint anything. You must call fill() or stroke() to commit it to pixels.",
      },
    ],
    flashcards: [
      { front: "Canvas", back: "A blank HTML drawing surface you control with JavaScript." },
      { front: "Context (ctx)", back: "The object you send drawing commands to; get it with canvas.getContext('2d')." },
      { front: "fillRect(x,y,w,h)", back: "Draws a solid rectangle from top-left corner (x,y) with width w, height h." },
      { front: "fill() vs stroke()", back: "fill() paints a shape's inside; stroke() draws its outline." },
    ],
    miniProject: {
      title: "Draw Your Own Flag",
      brief: "Recreate a simple flag using only rectangles and circles.",
      steps: [
        "Pick a flag made of stripes or blocks (Japan, France, Italy).",
        "Set up a canvas and its context.",
        "Draw each colored stripe or block with fillStyle + fillRect.",
        "Add a circle with arc + fill if your flag needs one (like Japan's).",
        "Tweak the coordinates until the proportions look right.",
      ],
    },
    industryUse: [
      "Google Docs and Figma render editable documents and designs on HTML canvas",
      "Browser games and tools like Excalidraw and tldraw draw everything on canvas",
      "Charting libraries such as Chart.js paint graphs pixel-by-pixel on a canvas",
    ],
    commonMistakes: [
      "Forgetting fill() or stroke(), so a shape is 'defined' but never painted — nothing shows.",
      "Setting the color AFTER drawing, so the shape uses the previous color instead of the one you wanted.",
    ],
    interviewQuestions: [
      "Walk me through the steps to draw a filled circle on an HTML canvas.",
      "When would you choose canvas over SVG for graphics on the web?",
    ],
    papers: [],
    nextUp: ["cg-transforms", "cg-animation-project"],
    cheatsheet: [
      "const ctx = canvas.getContext('2d')",
      "ctx.fillStyle = 'red' (set color FIRST)",
      "ctx.fillRect(x, y, w, h) — solid rectangle",
      "ctx.arc(cx, cy, r, 0, Math.PI*2); ctx.fill() — circle",
      "moveTo → lineTo → stroke() — a line",
      "No fill()/stroke() = nothing appears",
    ],
  },

  "cg-transforms": {
    story:
      "Say you've drawn one perfect star and you want twenty of them, scattered, spun, some big, some small. Do you redraw the star twenty times from scratch? No — that's exhausting and error-prone. Instead you tell the canvas: 'slide the whole world 100 to the right' (translate), 'spin the world 45 degrees' (rotate), or 'make everything twice as big' (scale). Then you draw your one star, and it lands transformed. Transformations let you move, turn, and resize things without recalculating a single point by hand. It's the difference between repainting a stamp and just re-inking it.",
    problem:
      "Recomputing every corner of every shape whenever you want to move, spin, or resize it is tedious and full of arithmetic mistakes. You want to say 'put it there, turned this much, this big' once and let the computer do the math.",
    analogy:
      "It's like a rubber stamp on a swivel mat. You don't redraw the picture — you slide the mat, rotate it, or shrink it, then press the same stamp down.",
    explanation: [
      "There are three basic moves. Translate = slide (move by an amount in x and y). Rotate = spin around a point. Scale = grow or shrink.",
      "On a canvas you transform the whole coordinate system, not the shape. ctx.translate(100, 50) shifts where '(0,0)' is; then everything you draw afterward is shifted too.",
      "ctx.rotate(angle) spins around the current origin, and ctx.scale(2, 2) doubles all sizes. Angles are in radians (a full turn = 2*Math.PI), not degrees.",
      "Rotation and scaling happen around the origin (0,0). To spin a shape in place, first translate to its center, then rotate, then draw centered on (0,0).",
      "Order matters a lot: translate-then-rotate looks totally different from rotate-then-translate. Read your transforms top to bottom like stacking instructions.",
      "Always wrap transforms in ctx.save() and ctx.restore(). save() bookmarks the current setup; restore() snaps back so the next shape isn't accidentally moved or spun.",
    ],
    math:
      "Translate by (dx, dy): new point = (x + dx, y + dy). Scale by s: (x*s, y*s). Rotating by angle θ mixes x and y using sine and cosine — the canvas does this trig for you.",
    code: {
      language: "javascript",
      source: `const ctx = canvas.getContext("2d");

function drawSquare() {
  ctx.fillStyle = "purple";
  ctx.fillRect(-25, -25, 50, 50); // centered on the origin (0,0)
}

// Draw the square spun 45 degrees, over near (150, 120).
ctx.save();                 // bookmark the clean setup
ctx.translate(150, 120);    // move the origin there
ctx.rotate(Math.PI / 4);    // spin 45 degrees (in radians)
drawSquare();               // drawn at the new, rotated origin
ctx.restore();              // undo transforms for the next shape

// This square is unaffected — restore() reset everything.
ctx.fillStyle = "orange";
ctx.fillRect(10, 10, 40, 40);`,
      explanation:
        "By drawing the square centered on (0,0), then translating and rotating first, it spins neatly in place. save()/restore() keeps the orange square perfectly normal.",
    },
    exercise: {
      prompt:
        "Move the origin to (200, 200) and scale everything to double size, then draw a 30x30 square at (0,0). (Wrap it in save/restore.)",
      starter: `const ctx = canvas.getContext("2d");
ctx.save();
// TODO: translate to (200,200), then scale by 2
ctx.fillStyle = "teal";
ctx.fillRect(0, 0, 30, 30);
ctx.restore();`,
      solution: `const ctx = canvas.getContext("2d");
ctx.save();
ctx.translate(200, 200);
ctx.scale(2, 2);
ctx.fillStyle = "teal";
ctx.fillRect(0, 0, 30, 30);
ctx.restore();`,
    },
    quiz: [
      {
        question: "What does ctx.translate(100, 50) do?",
        options: [
          "Rotates the canvas 100 degrees",
          "Shifts the coordinate origin 100 right and 50 down for everything drawn after",
          "Deletes shapes at (100,50)",
          "Translates the text into another language",
        ],
        answerIndex: 1,
        explanation:
          "translate moves the origin. Everything you draw afterward is offset by that amount.",
      },
      {
        question: "Why wrap transforms in ctx.save() and ctx.restore()?",
        options: [
          "To save the file to disk",
          "To bookmark and then reset the transform state so later shapes aren't affected",
          "It makes drawing faster",
          "It's required or the browser crashes",
        ],
        answerIndex: 1,
        explanation:
          "save() remembers the current state; restore() puts it back, so transforms don't leak onto the next shape.",
      },
      {
        question: "In canvas, angles for rotate() are measured in…",
        options: ["Degrees", "Radians", "Percent", "Pixels"],
        answerIndex: 1,
        explanation: "Canvas uses radians. A full turn is 2*Math.PI; 90 degrees is Math.PI/2.",
      },
    ],
    flashcards: [
      { front: "Translate", back: "Slide the coordinate system by (dx, dy) — moves everything drawn after." },
      { front: "Rotate", back: "Spin the coordinate system around the origin, in radians." },
      { front: "Scale", back: "Grow or shrink everything by a factor (scale(2,2) = double size)." },
      { front: "save()/restore()", back: "Bookmark the current transform, then snap back so it doesn't leak." },
    ],
    miniProject: {
      title: "Clock Face with Rotation",
      brief: "Use rotate() to place 12 tick marks evenly around a circle.",
      steps: [
        "Translate the origin to the center of the canvas.",
        "Loop 12 times; each time rotate by 2*Math.PI/12.",
        "Draw one short line near the edge each loop — rotation spreads them evenly.",
        "Wrap the whole loop in save()/restore().",
        "Bonus: draw a spinning hand using a second, larger rotation.",
      ],
    },
    industryUse: [
      "Every 2D game moves, spins, and scales sprites (characters, bullets) using these transforms",
      "Figma and Adobe Illustrator move/rotate/resize your shapes with the same underlying math",
      "Map apps like Google Maps translate and scale (pan and zoom) the map view as you drag",
    ],
    commonMistakes: [
      "Forgetting save()/restore(), so transforms pile up and later shapes drift or spin unexpectedly.",
      "Trying to rotate a shape 'in place' without first translating to its center — it swings around the corner instead.",
    ],
    interviewQuestions: [
      "Explain translate, rotate, and scale, and why order of operations matters.",
      "How would you rotate a square around its own center on a canvas?",
    ],
    papers: [],
    nextUp: ["cg-rasterization", "cg-animation-project"],
    cheatsheet: [
      "3 moves: translate (slide), rotate (spin), scale (resize)",
      "translate/rotate/scale transform the whole coordinate system",
      "Angles are in radians: full turn = 2*Math.PI",
      "Rotate in place = translate to center, then rotate",
      "Order matters; always save() before, restore() after",
    ],
  },

  "cg-rasterization": {
    story:
      "You describe a triangle to the computer with three neat corner points. But the screen has no idea what a 'triangle' is — it only knows squares that glow. So the computer plays a game of coloring-in: it looks at every pixel and asks 'is this little square inside the triangle or not?' If yes, paint it; if no, leave it. Turning a clean shape made of points into a filled-in grid of colored pixels is called rasterization. It's the bridge between the tidy math world of shapes and the blocky pixel world of the screen — and it runs billions of times a second inside your graphics card.",
    problem:
      "You define shapes with a few precise points (corners of a triangle, center of a circle). But a screen can only light up whole square pixels. Someone has to decide exactly which pixels a shape covers and color them in. That decision is rasterization.",
    analogy:
      "It's like coloring a shape on graph paper: you outline it, then fill every square that's mostly inside the lines — you can't half-color a square.",
    explanation: [
      "Rasterization = converting a shape defined by points/lines into the set of pixels that shape covers, then coloring those pixels.",
      "For each shape, the computer checks pixels and asks 'inside or outside?' Inside pixels get the shape's color; outside ones are left alone.",
      "Because pixels are whole squares, slanted edges come out as tiny stair-steps — the dreaded 'jaggies.' A diagonal line is really a staircase.",
      "To hide the jaggies, we use anti-aliasing: edge pixels get a blended, partly-transparent color so the staircase looks smooth to your eye from a normal distance.",
      "When shapes overlap, the computer needs to know which is in front. In 2D it's simply 'last drawn wins.' In 3D a depth check (the z-buffer) decides, pixel by pixel, who's closest to the viewer.",
      "This is the heavy-lifting step of all graphics. Your GPU (graphics card) exists mainly to rasterize millions of triangles per frame fast enough for smooth games and video.",
    ],
    math:
      "For a pixel at (px, py) and a shape, rasterization answers a yes/no coverage test: is (px, py) inside the shape? Anti-aliasing softens it to 'what fraction of this pixel is covered?' (0.0–1.0), used to blend the edge color.",
    code: {
      language: "javascript",
      source: `// Rasterize a circle by hand: test every pixel, paint the inside ones.
const ctx = canvas.getContext("2d");
const cx = 60, cy = 60, radius = 40;

for (let y = 0; y < 120; y++) {
  for (let x = 0; x < 120; x++) {
    // distance from this pixel to the circle's center
    const dx = x - cx;
    const dy = y - cy;
    const inside = dx * dx + dy * dy <= radius * radius;
    if (inside) {
      ctx.fillStyle = "crimson";
      ctx.fillRect(x, y, 1, 1); // paint this one pixel
    }
  }
}`,
      explanation:
        "This is rasterization laid bare: loop over every pixel, test if it's inside the circle, and paint only those. Real GPUs do this for millions of triangles, incredibly fast.",
    },
    exercise: {
      prompt:
        "Change the coverage test so it paints a SQUARE region (from x 20–100 and y 20–100) instead of a circle.",
      starter: `for (let y = 0; y < 120; y++) {
  for (let x = 0; x < 120; x++) {
    const inside = /* TODO: true when x is 20–100 AND y is 20–100 */;
    if (inside) ctx.fillRect(x, y, 1, 1);
  }
}`,
      solution: `for (let y = 0; y < 120; y++) {
  for (let x = 0; x < 120; x++) {
    const inside = x >= 20 && x <= 100 && y >= 20 && y <= 100;
    if (inside) ctx.fillRect(x, y, 1, 1);
  }
}`,
    },
    quiz: [
      {
        question: "What is rasterization?",
        options: [
          "Making an image bigger",
          "Turning a shape defined by points into the set of pixels it covers, and coloring them",
          "Compressing a photo",
          "Spinning a shape",
        ],
        answerIndex: 1,
        explanation:
          "Rasterization converts clean geometry (points, lines, triangles) into filled-in screen pixels.",
      },
      {
        question: "Why do diagonal lines look like tiny stair-steps ('jaggies')?",
        options: [
          "The screen is dirty",
          "Pixels are whole squares, so a slanted edge can only approximate with a staircase",
          "The GPU is too slow",
          "Diagonals aren't supported",
        ],
        answerIndex: 1,
        explanation:
          "Because you can only color whole square pixels, slanted edges become a staircase. Anti-aliasing blends the edges to hide it.",
      },
      {
        question: "What does anti-aliasing do?",
        options: [
          "Deletes pixels",
          "Blends edge pixels with partial colors so jagged edges look smooth",
          "Makes the image black and white",
          "Speeds up the computer",
        ],
        answerIndex: 1,
        explanation:
          "Anti-aliasing softens edge pixels using in-between shades so your eye reads a smooth line instead of a staircase.",
      },
    ],
    flashcards: [
      { front: "Rasterization", back: "Converting a shape's geometry into the pixels it covers, then coloring them." },
      { front: "Jaggies / aliasing", back: "The stair-step look on slanted edges caused by square pixels." },
      { front: "Anti-aliasing", back: "Blending edge pixels with partial colors to make edges look smooth." },
      { front: "Z-buffer", back: "A per-pixel depth check in 3D deciding which surface is closest (in front)." },
    ],
    miniProject: {
      title: "Hand-Rasterize a Letter",
      brief: "Feel rasterization by turning a letter into pixels yourself.",
      steps: [
        "On graph paper, lightly sketch a capital letter like 'A'.",
        "For each square, decide: is it mostly inside the letter? If yes, fill it fully.",
        "Look at the diagonal strokes — notice the staircase (jaggies).",
        "Now shade the edge squares lightly (your own anti-aliasing).",
        "Step back and compare the sharp vs. softened versions.",
      ],
    },
    industryUse: [
      "Every GPU (NVIDIA, AMD, Apple) is built to rasterize millions of triangles per frame in games",
      "Fonts are rasterized on the fly — turning letter outlines into crisp pixels at any size",
      "Video codecs and streaming platforms like YouTube rasterize decoded frames to your screen",
    ],
    commonMistakes: [
      "Expecting perfectly smooth diagonals — without anti-aliasing, square pixels always stair-step.",
      "Forgetting draw order in 2D: shapes drawn later cover earlier ones, which can hide things by accident.",
    ],
    interviewQuestions: [
      "Explain rasterization in plain terms and why we need anti-aliasing.",
      "When two shapes overlap, how does the computer decide which one is drawn on top?",
    ],
    papers: [],
    nextUp: ["cg-3d-basics", "cg-animation-project"],
    cheatsheet: [
      "Rasterize = shape → which pixels it covers → color them",
      "Per pixel: inside or outside the shape?",
      "Square pixels → jaggies on diagonals",
      "Anti-aliasing = blend edge pixels for smoothness",
      "3D overlap: z-buffer picks the closest surface",
    ],
  },

  "cg-3d-basics": {
    story:
      "Here's a puzzle: your screen is flat, but games show deep 3D worlds. How? The same way an artist paints a road: things far away are drawn smaller and closer to the middle of the page. A 3D world lives in the computer as points floating in space, each with three numbers — x (left-right), y (up-down), and z (near-far). To show them on your flat screen, the computer 'flattens' every 3D point down to a 2D pixel using a rule: the farther away something is, the more it shrinks toward the center. That flattening is called projection, and it's how a flat screen fakes real depth.",
    problem:
      "A 3D scene is points in space with three coordinates each. But your screen is a flat 2D grid of pixels. You need a reliable rule that turns each 3D point into a 2D pixel — one that makes far things small and near things big, so the flat picture reads as depth.",
    analogy:
      "It's like your own eye: railroad tracks are parallel, but they appear to shrink and meet at the horizon. Projection is the math that makes distant things look small.",
    explanation: [
      "A 3D point has three numbers: x (right/left), y (up/down), and z (how far from you, the depth). Together they place it in space.",
      "Projection converts (x, y, z) into a 2D screen point (screenX, screenY). The core trick: divide x and y by z. Bigger z (farther away) makes the result smaller — automatic shrinking with distance.",
      "This 'divide by z' is perspective projection, and it's exactly why parallel lines seem to converge and distant mountains look tiny. It matches how human eyes and cameras see.",
      "There's a simpler cousin, orthographic projection, that ignores depth (no shrinking) — used for blueprints and some strategy games where you don't want perspective distortion.",
      "Objects are built from lots of tiny triangles (a 'mesh'). To draw a 3D model, you project each triangle's corner points to 2D, then rasterize the triangles — reusing the skills from earlier lessons.",
      "A full 3D pipeline also handles rotation of the object, a movable camera, lighting, and a z-buffer to hide surfaces behind others — but projection is the heart that makes the flat screen feel deep.",
    ],
    math:
      "Simple perspective projection: screenX = (x / z) * f + centerX, screenY = (y / z) * f + centerY, where f is a focal-length constant. Dividing by z shrinks far-away points; adding the center puts (0,0,z) in the middle of the screen.",
    code: {
      language: "javascript",
      source: `// Project 3D points onto a flat screen by dividing by depth (z).
const ctx = canvas.getContext("2d");
const f = 200;                 // focal length (controls "zoom")
const cx = 150, cy = 150;      // center of the screen

function project(p) {
  return {
    x: (p.x / p.z) * f + cx,   // divide by z: far = small
    y: (p.y / p.z) * f + cy,
  };
}

// Two identical-size points, one near, one far.
const near = project({ x: 50, y: 0, z: 2 });
const far  = project({ x: 50, y: 0, z: 8 });

console.log("near maps to", near); // farther right (bigger)
console.log("far maps to",  far);  // closer to center (smaller)`,
      explanation:
        "Both points share x=50, but the far one (bigger z) lands closer to the center — that shrinking-with-distance is exactly how depth is faked on a flat screen.",
    },
    exercise: {
      prompt:
        "Using the project() function above, project the point { x: 100, y: 100, z: 4 } and log the result.",
      starter: `// project() and its constants (f=200, cx=150, cy=150) exist above
const p = { x: 100, y: 100, z: 4 };
const screen = /* TODO: project p */;
console.log(screen);`,
      solution: `const p = { x: 100, y: 100, z: 4 };
// (100 / 4) * 200 + 150 = 5150 for both x and y
const screen = project(p);
console.log(screen);`,
    },
    quiz: [
      {
        question: "What are the three coordinates of a point in 3D space?",
        options: [
          "red, green, blue",
          "x (left-right), y (up-down), z (near-far / depth)",
          "width, height, weight",
          "top, middle, bottom",
        ],
        answerIndex: 1,
        explanation: "A 3D point uses x, y, and z, where z is the depth (how far from the viewer).",
      },
      {
        question: "In perspective projection, why do we divide x and y by z?",
        options: [
          "To make the math harder",
          "So farther things (bigger z) shrink toward the center, faking depth",
          "To change the color",
          "To rotate the object",
        ],
        answerIndex: 1,
        explanation:
          "Dividing by z shrinks distant points, which is exactly how eyes and cameras make far objects look small.",
      },
      {
        question: "Which projection has NO shrinking with distance (good for blueprints)?",
        options: ["Perspective", "Orthographic", "Rasterographic", "Alpha"],
        answerIndex: 1,
        explanation:
          "Orthographic projection ignores depth, so parallel lines stay parallel — ideal for technical drawings.",
      },
    ],
    flashcards: [
      { front: "3D point (x, y, z)", back: "x = left/right, y = up/down, z = depth (distance from viewer)." },
      { front: "Projection", back: "Turning a 3D point into a 2D screen point so a flat screen shows depth." },
      { front: "Perspective (divide by z)", back: "Far things shrink toward the center — how eyes and cameras see." },
      { front: "Mesh", back: "A 3D object built from many small triangles." },
    ],
    miniProject: {
      title: "Spinning Wireframe Cube",
      brief: "Project a cube's 8 corners to 2D and connect them into edges.",
      steps: [
        "List the 8 corners of a cube as {x, y, z} points.",
        "Rotate them a little each frame (mix x and z with sine/cosine).",
        "Project each corner to 2D with the divide-by-z trick.",
        "Draw lines connecting the projected corners into a cube outline.",
        "Watch the flat lines read as a solid, spinning 3D cube.",
      ],
    },
    industryUse: [
      "Every 3D game engine (Unreal, Unity) projects 3D scenes to your 2D screen this way",
      "Blender and CAD tools use projection to show 3D models on a flat monitor",
      "AR apps and Google Earth project 3D geometry onto your phone screen in real time",
    ],
    commonMistakes: [
      "Forgetting the z-divide, so everything looks flat with no sense of depth.",
      "Letting z reach or cross zero (dividing by zero), which sends points to infinity and breaks the image.",
    ],
    interviewQuestions: [
      "How do you display a 3D point on a flat 2D screen? Explain the divide-by-z idea.",
      "What is the difference between perspective and orthographic projection, and when would you use each?",
    ],
    papers: [],
    nextUp: ["cg-animation-project", "cg-rasterization"],
    cheatsheet: [
      "3D point = (x, y, z); z is depth",
      "Projection = 3D point → 2D screen point",
      "Divide x,y by z → far things shrink (perspective)",
      "Orthographic = no shrink (blueprints)",
      "3D models = meshes of many triangles",
    ],
  },

  "cg-animation-project": {
    story:
      "Movies aren't really moving — they're still pictures flashed 24 times a second, and your brain fills in the motion. On screen it's the same trick, just faster and interactive. To make anything move, you run a loop: clear the screen, nudge your object's position a little, draw it, and repeat 60 times a second. That's the whole heartbeat of games and animations, and you already have every skill it needs. In this project you'll put it all together — pixels, color, coordinates, canvas, and transforms — to make a scene that actually moves.",
    problem:
      "Everything so far has been a single frozen drawing. But games, animations, and simulations are alive — things move, bounce, and respond. You need the one loop that turns a stack of still frames into smooth motion.",
    analogy:
      "It's a flip-book: each page is a still drawing, slightly changed. Riffle the pages fast and the drawing comes to life. The animation loop draws the next page 60 times a second.",
    explanation: [
      "Animation = draw a frame, change something small, draw again — fast. Do it ~60 times per second and the eye sees smooth motion.",
      "The engine is requestAnimationFrame(loop): it asks the browser to run your loop function right before the next screen refresh, keeping motion smooth and battery-friendly.",
      "Every frame follows three beats: (1) CLEAR the canvas (or last frame smears everywhere), (2) UPDATE your numbers (move the position, change the angle), (3) DRAW the shapes at their new values.",
      "Motion is just numbers changing over time. Give a ball a position (x, y) and a velocity (dx, dy); each frame do x += dx, y += dy. To bounce, flip the velocity's sign when it hits a wall.",
      "Combine with transforms for richer motion: increase an angle each frame and rotate() to spin something; grow a scale value to make it pulse.",
      "This same loop powers everything from Flappy Bird to physics simulations — the difference is only how fancy the 'update' step gets.",
    ],
    math:
      "Position update each frame: x = x + dx, y = y + dy (dx, dy are pixels moved per frame). Bounce off a wall by flipping a velocity's sign: dx = -dx when the object hits the left or right edge.",
    code: {
      language: "javascript",
      source: `const ctx = canvas.getContext("2d");
const W = canvas.width, H = canvas.height;

// A ball with a position and a velocity.
let x = 50, y = 50, dx = 3, dy = 2, r = 20;

function loop() {
  // 1) CLEAR last frame
  ctx.clearRect(0, 0, W, H);

  // 2) UPDATE: move, then bounce off the walls
  x += dx;
  y += dy;
  if (x - r < 0 || x + r > W) dx = -dx; // hit left/right -> flip
  if (y - r < 0 || y + r > H) dy = -dy; // hit top/bottom -> flip

  // 3) DRAW the ball at its new spot
  ctx.fillStyle = "dodgerblue";
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fill();

  requestAnimationFrame(loop); // do it all again next frame
}
loop();`,
      explanation:
        "Clear, update, draw, repeat — 60 times a second. The ball moves because x and y change each frame, and it bounces because we flip dx/dy at the walls.",
    },
    exercise: {
      prompt:
        "Make the ball leave a fading trail: instead of fully clearing each frame, cover the canvas with a semi-transparent black rectangle.",
      starter: `function loop() {
  // TODO: replace clearRect with a semi-transparent fill for a trail
  ctx.clearRect(0, 0, W, H);
  x += dx; y += dy;
  if (x - r < 0 || x + r > W) dx = -dx;
  if (y - r < 0 || y + r > H) dy = -dy;
  ctx.fillStyle = "dodgerblue";
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  requestAnimationFrame(loop);
}`,
      solution: `function loop() {
  ctx.fillStyle = "rgba(0, 0, 0, 0.1)"; // faint black = fading trail
  ctx.fillRect(0, 0, W, H);
  x += dx; y += dy;
  if (x - r < 0 || x + r > W) dx = -dx;
  if (y - r < 0 || y + r > H) dy = -dy;
  ctx.fillStyle = "dodgerblue";
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill();
  requestAnimationFrame(loop);
}`,
    },
    quiz: [
      {
        question: "What are the three steps that repeat every animation frame?",
        options: [
          "Save, load, delete",
          "Clear the canvas, update the values, draw the shapes",
          "Rotate, scale, translate",
          "Red, green, blue",
        ],
        answerIndex: 1,
        explanation:
          "Each frame: clear the old drawing, update your numbers (positions/angles), then draw at the new values.",
      },
      {
        question: "Why call requestAnimationFrame instead of drawing just once?",
        options: [
          "It makes the ball bigger",
          "It schedules your loop to run again before each screen refresh, creating smooth motion",
          "It saves the image to a file",
          "It changes the color automatically",
        ],
        answerIndex: 1,
        explanation:
          "requestAnimationFrame re-runs your loop each refresh (~60fps), so the changing frames blend into smooth motion.",
      },
      {
        question: "How do you make a ball bounce off the right wall?",
        options: [
          "Set its color to red",
          "Flip the sign of its horizontal velocity (dx = -dx) when it reaches the edge",
          "Stop the loop",
          "Double its radius",
        ],
        answerIndex: 1,
        explanation:
          "Reversing dx sends it back the other way — that's a bounce. Same idea with dy for top/bottom.",
      },
    ],
    flashcards: [
      { front: "Animation loop", back: "Repeatedly clear, update, and draw — ~60 times a second — to create motion." },
      { front: "requestAnimationFrame", back: "Asks the browser to run your loop before the next refresh, for smooth animation." },
      { front: "Velocity (dx, dy)", back: "Pixels an object moves per frame; add it to position each frame." },
      { front: "Bounce", back: "Flip a velocity's sign (dx = -dx) when the object hits a wall." },
    ],
    miniProject: {
      title: "Bouncing Solar System",
      brief: "Build a small animated scene using everything you learned in this course.",
      steps: [
        "Set up the canvas and the clear/update/draw loop.",
        "Draw a yellow 'sun' circle in the center.",
        "Add a planet that orbits: use an angle that grows each frame plus sine/cosine for its position.",
        "Rotate() a moon around the planet, and give one object a bouncing motion.",
        "Add a fading trail with a semi-transparent clear, then tweak speeds and colors to taste.",
      ],
    },
    industryUse: [
      "Web games and interactive sites (Flappy Bird clones, splash animations) run on this exact loop",
      "Data-viz tools like D3.js animate charts frame-by-frame with requestAnimationFrame",
      "Loading spinners, particle effects, and UI transitions across the web use the clear-update-draw loop",
    ],
    commonMistakes: [
      "Forgetting to clear the canvas each frame, so old frames smear into a solid streak.",
      "Doing the update and draw in the wrong order, so the object appears one frame behind where it should be.",
    ],
    interviewQuestions: [
      "Describe the standard animation loop and the role of requestAnimationFrame.",
      "How would you make an object bounce inside the canvas walls?",
    ],
    papers: [],
    nextUp: ["cg-transforms", "cg-3d-basics"],
    cheatsheet: [
      "Animation = clear → update → draw, ~60x/second",
      "requestAnimationFrame(loop) drives the frames",
      "Move: x += dx; y += dy each frame",
      "Bounce: flip velocity sign at a wall (dx = -dx)",
      "Always clearRect first, or frames smear",
      "Combine with rotate()/scale() for richer motion",
    ],
  },
};
