import type { LessonBody } from "@/types";

export const cpp: Record<string, LessonBody> = {
  "cpp-hello": {
    story:
      "Imagine you write a letter in English, but your friend only reads Japanese. Before they can understand a word, someone has to translate the whole letter. A computer is that Japanese-only friend: it only understands 1s and 0s, not the words you type. C++ is the English you write, and a compiler is the translator that turns your whole file into machine language the computer can actually run. When you write your first program, you type friendly words like `cout << \"Hello\"`, hit compile, and a moment later a real, standalone app exists on your machine.",
    problem:
      "The computer's brain (the CPU) only speaks raw machine code — impossible for a human to write by hand. You need a way to write instructions in something readable and then hand it to a tool that converts it, all at once, into a fast program the machine runs directly.",
    analogy:
      "Writing C++ is like writing a recipe in your language; the compiler is a translator who rewrites the entire recipe into the chef's language before a single dish is cooked.",
    explanation: [
      "C++ is a compiled language: you write source code in a `.cpp` file, then a compiler (like g++ or clang) translates the WHOLE file into a machine-code program before it ever runs. This is why C++ programs are famously fast — the translating is already done.",
      "This is different from Python or JavaScript, which are 'interpreted' — translated line by line while running. Compiling up front costs you a build step, but buys you raw speed.",
      "Every C++ program starts running at a special function called `main`. Think of `main` as the front door — when you launch the program, the computer walks in through `main` and does whatever is inside it, top to bottom.",
      "`#include <iostream>` at the top pulls in a toolbox for input/output — it's how you get `cout` (print to screen) and `cin` (read from keyboard).",
      "`std::cout << \"Hello\"` sends text to the screen; the `<<` arrows show which way the text is flowing (into the output). `std::endl` (or `\"\\n\"`) ends the line.",
      "Use C++ when speed and control matter: games, engines, trading systems. It's more work than Python, so don't reach for it for a quick script — reach for it when performance is the whole point.",
    ],
    code: {
      language: "text",
      source: `// hello.cpp - your very first C++ program
#include <iostream>   // brings in cout and cin

int main() {          // the front door: execution starts here
    std::cout << "Hello, world!" << std::endl;
    std::cout << "C++ is now translated and running." << std::endl;
    return 0;         // 0 means "finished successfully"
}

// Build and run in a terminal:
//   g++ hello.cpp -o hello
//   ./hello`,
      explanation:
        "The compiler turns hello.cpp into an executable named hello; running it walks through main and prints two lines. return 0 tells the operating system everything went fine.",
    },
    exercise: {
      prompt: "Add a third line that prints your name to the screen, on its own line.",
      starter: `#include <iostream>
int main() {
    std::cout << "Hello, world!" << std::endl;
    // TODO: print your name on its own line
    return 0;
}`,
      solution: `#include <iostream>
int main() {
    std::cout << "Hello, world!" << std::endl;
    std::cout << "Maria" << std::endl;
    return 0;
}`,
    },
    quiz: [
      {
        question: "What does a compiler do?",
        options: [
          "Runs your code one line at a time",
          "Translates your whole source file into machine code before it runs",
          "Stores your files on the internet",
          "Fixes all your bugs automatically",
        ],
        answerIndex: 1,
        explanation:
          "A compiler translates the entire program into machine code up front, which is why compiled C++ programs run so fast.",
      },
      {
        question: "Where does a C++ program begin running?",
        options: ["The first line of the file", "A function called main", "The #include line", "Wherever cout appears"],
        answerIndex: 1,
        explanation: "Every C++ program starts at main — it's the front door the computer walks through.",
      },
    ],
    flashcards: [
      { front: "Compiler", back: "A tool that translates your whole C++ source file into machine code before running." },
      { front: "main()", back: "The special function where every C++ program starts executing." },
      { front: "#include <iostream>", back: "Pulls in the input/output toolbox that gives you cout and cin." },
      { front: "std::cout <<", back: "Sends text or values to the screen; << shows the direction of flow." },
    ],
    miniProject: {
      title: "Your Business Card in the Terminal",
      brief: "Write a program that prints a little formatted 'business card' about you.",
      steps: [
        "Create card.cpp with #include <iostream> and an empty main.",
        "Print a line of dashes as a top border.",
        "Print your name, a role, and a fake email on separate lines.",
        "Print a line of dashes as a bottom border, then compile and run it.",
      ],
    },
    industryUse: [
      "Unreal Engine (the tech behind Fortnite) is written in C++ for speed",
      "Google's Chrome browser core is C++",
      "High-frequency trading firms like Jane Street use C++ for microsecond-fast systems",
    ],
    commonMistakes: [
      "Forgetting the semicolon at the end of a statement — C++ requires `;` to mark where each instruction ends.",
      "Forgetting `#include <iostream>`, then wondering why `cout` is 'undefined' — the toolbox wasn't brought in.",
    ],
    interviewQuestions: [
      "What is the difference between a compiled and an interpreted language?",
      "What is the role of the main function in a C++ program?",
    ],
    papers: [],
    nextUp: ["cpp-types", "cpp-flow"],
    cheatsheet: [
      "#include <iostream> = get cout and cin",
      "Program starts at int main() { ... }",
      "std::cout << \"text\" << std::endl; prints a line",
      "End every statement with ;",
      "Build: g++ file.cpp -o app  then  ./app",
    ],
  },

  "cpp-types": {
    story:
      "Think of your program's memory as a wall of labelled shoeboxes, but here's the C++ twist: before you get a box, you must declare exactly what kind of thing goes in it. You tell the compiler 'this box holds a whole number' or 'this box holds a single letter', and it hands you a box the perfect size for that. In C++ you write `int age = 30;` — the word `int` is you promising 'this box only ever holds whole numbers.' That promise is what makes C++ fast and predictable: the computer knows in advance exactly how much room each value needs.",
    problem:
      "The computer needs to know how much memory to set aside and how to interpret the bits inside a box. A whole number, a decimal, and a letter are all just bits — the type tells C++ how to read them and what operations make sense.",
    analogy:
      "Types are like labelled containers in a kitchen: a measuring cup for liquids, an egg carton for eggs. Putting eggs in the measuring cup makes no sense — the container's shape declares what belongs.",
    explanation: [
      "You must declare a variable's type before using it: `int score = 100;`. The type comes first, then the name, then the value. This is C++ being strict on purpose.",
      "Core types: `int` (whole numbers like 42), `double` (decimals like 3.14), `char` (a single character in single quotes like 'A'), `bool` (true or false), and `std::string` (text — needs `#include <string>`).",
      "Beware integer division: `7 / 2` gives `3`, not 3.5, because both are ints and C++ throws away the remainder. Write `7.0 / 2` to get `3.5`.",
      "Operators do the work: `+ - * /` for maths, `%` for remainder (`7 % 2` is 1), and comparison operators `== != < > <= >=` that produce a bool.",
      "`const` locks a box: `const double PI = 3.14159;` means 'this never changes' — try to change it and the compiler stops you. Use it for values that should stay fixed.",
      "Use `int` for counting things, `double` for measurements and money-ish maths, `bool` for yes/no flags. Picking the right type prevents whole categories of bugs.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>
#include <string>

int main() {
    int age = 30;                 // whole number
    double height = 5.8;          // decimal
    char grade = 'A';             // single character, single quotes
    bool isStudent = true;        // true or false
    std::string name = "Maria";   // text, double quotes

    std::cout << name << " is " << age << " years old\n";
    std::cout << "Next year: " << age + 1 << "\n";
    std::cout << "7 / 2   = " << 7 / 2 << "\n";     // 3  (integer division!)
    std::cout << "7.0 / 2 = " << 7.0 / 2 << "\n";   // 3.5
    std::cout << "7 % 2   = " << 7 % 2 << "\n";     // 1  (remainder)
    return 0;
}`,
      explanation:
        "Each variable is declared with its exact type. The two division lines show the classic trap: integer division truncates, so add a .0 to force decimal maths.",
    },
    exercise: {
      prompt: "Declare a const double named TAX (0.08), a price of 50.0, and print the total price including tax.",
      starter: `#include <iostream>
int main() {
    // TODO: declare TAX as a const double = 0.08
    double price = 50.0;
    // TODO: print price plus tax
    return 0;
}`,
      solution: `#include <iostream>
int main() {
    const double TAX = 0.08;
    double price = 50.0;
    std::cout << "Total: " << price + price * TAX << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "What does `7 / 2` evaluate to in C++?",
        options: ["3.5", "3", "4", "It causes an error"],
        answerIndex: 1,
        explanation: "Both operands are ints, so C++ does integer division and drops the remainder, giving 3.",
      },
      {
        question: "Which type would you use to store true/false?",
        options: ["int", "char", "bool", "double"],
        answerIndex: 2,
        explanation: "bool holds exactly true or false — perfect for yes/no flags.",
      },
    ],
    flashcards: [
      { front: "int", back: "A type for whole numbers, like 42 or -7." },
      { front: "double", back: "A type for decimal numbers, like 3.14." },
      { front: "% (modulo)", back: "The remainder operator: 7 % 2 is 1." },
      { front: "const", back: "Locks a variable so its value can never change after being set." },
    ],
    miniProject: {
      title: "Tip Calculator",
      brief: "Ask for a bill amount and print the tip and total for a 15% tip.",
      steps: [
        "Declare a const double TIP_RATE = 0.15.",
        "Read a double bill from the user with cin.",
        "Compute tip = bill * TIP_RATE and total = bill + tip.",
        "Print the tip and total, each on its own line.",
      ],
    },
    industryUse: [
      "Game engines use int for scores and double for physics positions",
      "Banking systems pick fixed types carefully to avoid rounding errors on money",
      "Embedded firmware in cars uses small int types to save precious memory",
    ],
    commonMistakes: [
      "Doing `5 / 2` expecting 2.5 — use `5.0 / 2` to get real decimal division.",
      "Mixing up single quotes and double quotes: `'A'` is a char, `\"A\"` is a string. They are not interchangeable.",
    ],
    interviewQuestions: [
      "What is the difference between int and double, and when would you choose each?",
      "What does the const keyword do, and why is it useful?",
    ],
    papers: [],
    nextUp: ["cpp-flow", "cpp-functions"],
    cheatsheet: [
      "int whole · double decimal · char 'A' · bool true/false · string \"text\"",
      "Type comes first: int age = 30;",
      "7 / 2 = 3 (integer div), 7.0 / 2 = 3.5",
      "% gives remainder: 7 % 2 = 1",
      "const locks a value so it can't change",
    ],
  },

  "cpp-flow": {
    story:
      "Every morning your brain runs tiny yes/no checks. Is it raining? If yes, grab an umbrella. Is there coffee left? If not, make more. You also repeat things: brush each tooth, one after another, until you've done them all. That's all control flow is — the program asking questions and repeating work. In C++ you write these as `if` statements (make a decision) and loops (repeat until done). Without them a program would be a straight line that runs once and stops; with them, it can react and work through lists of any size.",
    problem:
      "A program that runs top-to-bottom with no choices can only do one fixed thing. Real programs must decide (show an error only IF the password is wrong) and repeat (greet all 500 users) without you copy-pasting the same code hundreds of times.",
    analogy:
      "An `if` is a fork in the road — go left or right based on a condition. A loop is a running track — you keep going around until a lap counter says stop.",
    explanation: [
      "`if (condition) { ... }` runs its block only when the condition is true. Add `else if` for more options and `else` for the catch-all fallback.",
      "Conditions are made from comparisons (`==`, `!=`, `<`, `>`) joined with `&&` (and), `||` (or), and `!` (not). `age >= 18 && hasID` means both must be true.",
      "A `while` loop repeats as long as its condition stays true — great when you don't know how many times up front (keep asking until the user types 'quit').",
      "A `for` loop is the counting loop: `for (int i = 0; i < 5; i++)` runs exactly 5 times. It bundles the start, the stop-check, and the step into one tidy line.",
      "`break` jumps out of a loop early; `continue` skips to the next round. Use them sparingly — they're handy but can make logic hard to follow.",
      "Watch the `==` vs `=` trap: `==` compares, `=` assigns. `if (x = 5)` accidentally SETS x to 5. Always use `==` for comparisons.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>

int main() {
    int age = 20;

    // Decision: which message to show
    if (age < 13) {
        std::cout << "Child ticket\n";
    } else if (age < 65) {
        std::cout << "Adult ticket\n";
    } else {
        std::cout << "Senior ticket\n";
    }

    // Counting loop: print 1 through 5
    for (int i = 1; i <= 5; i++) {
        std::cout << "Count: " << i << "\n";
    }

    // Conditional loop: keep halving until below 1
    double n = 20.0;
    while (n >= 1.0) {
        std::cout << n << " ";
        n = n / 2.0;
    }
    std::cout << "\n";
    return 0;
}`,
      explanation:
        "The if/else if picks exactly one ticket message. The for loop counts a known number of times; the while loop runs an unknown number of times until n drops below 1.",
    },
    exercise: {
      prompt: "Write a for loop that prints only the even numbers from 1 to 10 (use % to test for even).",
      starter: `#include <iostream>
int main() {
    for (int i = 1; i <= 10; i++) {
        // TODO: print i only if it is even
    }
    return 0;
}`,
      solution: `#include <iostream>
int main() {
    for (int i = 1; i <= 10; i++) {
        if (i % 2 == 0) {
            std::cout << i << " ";
        }
    }
    std::cout << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "Which loop is best when you know you want to run exactly 10 times?",
        options: ["while", "for", "if", "break"],
        answerIndex: 1,
        explanation: "A for loop bundles the counter start, stop condition, and step — ideal for a known number of repeats.",
      },
      {
        question: "What is the danger of writing `if (x = 5)`?",
        options: [
          "Nothing, it's fine",
          "It assigns 5 to x instead of comparing, which is almost never what you want",
          "It crashes the compiler",
          "It runs the loop forever",
        ],
        answerIndex: 1,
        explanation: "A single = assigns; you meant == to compare. This is one of the most classic C++ bugs.",
      },
    ],
    flashcards: [
      { front: "if / else if / else", back: "Runs different blocks of code depending on which condition is true." },
      { front: "for loop", back: "A counting loop: for (init; condition; step) — runs a known number of times." },
      { front: "while loop", back: "Repeats as long as its condition stays true; runs an unknown number of times." },
      { front: "break vs continue", back: "break exits the loop entirely; continue skips to the next iteration." },
    ],
    miniProject: {
      title: "Number Guessing Referee",
      brief: "Pick a secret number and let the user guess in a loop until they get it.",
      steps: [
        "Store a secret int, say 42.",
        "Use a while loop that keeps reading guesses with cin.",
        "Print 'too high' or 'too low' with if/else each round.",
        "Break out of the loop and print 'Correct!' when the guess matches.",
      ],
    },
    industryUse: [
      "Game loops run a while loop every frame to update and draw the scene",
      "Web servers loop over incoming requests, deciding how to respond to each",
      "Spreadsheets like Excel loop over cells recalculating formulas",
    ],
    commonMistakes: [
      "Using `=` instead of `==` in a condition — one assigns, the other compares.",
      "Writing a while loop whose condition never becomes false, creating an infinite loop that hangs the program.",
    ],
    interviewQuestions: [
      "When would you choose a while loop over a for loop?",
      "What do break and continue do inside a loop?",
    ],
    papers: [],
    nextUp: ["cpp-functions", "cpp-arrays"],
    cheatsheet: [
      "if (cond) { } else if (cond) { } else { }",
      "&& = and, || = or, ! = not",
      "for (int i = 0; i < n; i++) { }",
      "while (cond) { } repeats until cond is false",
      "== compares, = assigns — don't mix them up",
    ],
  },

  "cpp-functions": {
    story:
      "Imagine every time you wanted coffee you had to re-explain the entire process — grind beans, boil water, pour, wait. Exhausting. Instead you just say 'make coffee' and everyone knows the steps. A function is that: you teach the computer a set of steps once, give it a name, and forever after you just call the name. In C++ you might write a function `makeCoffee()` or `add(3, 4)`, and instead of repeating ten lines everywhere, you write the recipe once and call it whenever you need it.",
    problem:
      "Copy-pasting the same block of code in ten places means ten places to fix when it changes, and a program that's impossible to read. Functions let you write a piece of logic once, name it, and reuse it — keeping code short, clear, and easy to fix.",
    analogy:
      "A function is a labelled recipe card: you can hand it ingredients (arguments), it follows fixed steps, and it hands back a finished dish (the return value).",
    explanation: [
      "A function has a return type, a name, and parameters: `int add(int a, int b) { return a + b; }`. It takes two ints, and gives back an int.",
      "You call it by name with arguments: `add(3, 4)` runs the recipe with a=3, b=4 and evaluates to 7. `return` sends a value back and ends the function.",
      "If a function does something but hands nothing back (like just printing), its return type is `void` — meaning 'returns nothing'.",
      "In C++ you often declare a function's signature at the top (a 'prototype' like `int add(int, int);`) so `main` knows it exists before the full recipe appears lower down.",
      "Scope: variables created inside a function live only there. A variable `x` in one function is invisible to another — they don't clash. This keeps functions self-contained and safe.",
      "Pass arguments by value (a copy) by default. Change a parameter inside the function and the caller's original is untouched — unless you use references (next module).",
    ],
    code: {
      language: "text",
      source: `#include <iostream>

// A function: takes two ints, returns their sum
int add(int a, int b) {
    return a + b;
}

// A void function: does something, returns nothing
void greet(std::string name) {
    std::cout << "Hello, " << name << "!\n";
}

int main() {
    int result = add(3, 4);        // result is now 7
    std::cout << "3 + 4 = " << result << "\n";
    greet("Maria");                // prints a greeting
    std::cout << "Also: " << add(10, 20) << "\n";  // reuse it
    return 0;
}`,
      explanation:
        "add takes inputs and returns a value you can store or print. greet returns nothing (void) — it just performs an action. Both are written once and reused freely.",
    },
    exercise: {
      prompt: "Write a function `square(int n)` that returns n times n, then print square(6).",
      starter: `#include <iostream>
// TODO: write the square function here

int main() {
    // TODO: print square(6)
    return 0;
}`,
      solution: `#include <iostream>
int square(int n) {
    return n * n;
}
int main() {
    std::cout << square(6) << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "What does the return type `void` mean?",
        options: [
          "The function returns zero",
          "The function returns nothing",
          "The function is broken",
          "The function returns a variable named void",
        ],
        answerIndex: 1,
        explanation: "void means the function hands nothing back — it just performs an action like printing.",
      },
      {
        question: "In `int add(int a, int b)`, what are a and b called?",
        options: ["Return values", "Parameters", "Types", "Loops"],
        answerIndex: 1,
        explanation: "a and b are parameters — the named inputs the function expects when it's called.",
      },
    ],
    flashcards: [
      { front: "Function", back: "A named, reusable block of code that can take inputs and return a value." },
      { front: "return", back: "Sends a value back to the caller and ends the function immediately." },
      { front: "void", back: "A return type meaning the function gives nothing back." },
      { front: "Scope", back: "The region where a variable exists; locals live only inside their function." },
    ],
    miniProject: {
      title: "A Little Math Toolbox",
      brief: "Build a set of small functions and use them together.",
      steps: [
        "Write add, subtract, and multiply functions, each taking two ints.",
        "Write a max function that returns the larger of two ints using if.",
        "In main, read two numbers and print all four results.",
        "Bonus: add a void function that prints a nice header line.",
      ],
    },
    industryUse: [
      "Every large codebase (Adobe Photoshop, Autodesk Maya) is thousands of functions calling each other",
      "Math libraries expose functions like sqrt and sin that everyone reuses",
      "APIs are essentially named functions other programs call to get work done",
    ],
    commonMistakes: [
      "Forgetting the `return` statement in a non-void function — the caller gets garbage or a compiler warning.",
      "Expecting changes to a parameter to affect the caller's variable — by default arguments are copies.",
    ],
    interviewQuestions: [
      "What is the difference between passing an argument by value and by reference?",
      "What does variable scope mean, and why does it matter?",
    ],
    papers: [],
    nextUp: ["cpp-arrays", "cpp-pointers"],
    cheatsheet: [
      "returnType name(params) { ... return value; }",
      "void = returns nothing",
      "Call it: add(3, 4)",
      "Locals live only inside their function (scope)",
      "Arguments are copies by default",
    ],
  },

  "cpp-arrays": {
    story:
      "Suppose you're tracking test scores for 30 students. You could make 30 separate variables — score1, score2, score3 — and lose your mind. Instead you grab one long egg carton with 30 slots and drop a score in each. That's an array: a single named row of same-typed boxes, numbered starting from 0. You write `int scores[30];` and now `scores[0]` is the first slot, `scores[29]` the last. One name, many slots, reachable by number — perfect for looping through.",
    problem:
      "Real data comes in bunches: a list of prices, a row of pixels, all the players in a game. Making one variable per item is impossible at scale. You need a way to hold many values of the same type under one name and step through them.",
    analogy:
      "An array is an egg carton: one container, a fixed number of numbered slots, each holding the same kind of thing. A reference, meanwhile, is a nickname for an existing box — two names, one box.",
    explanation: [
      "Declare an array with a type, name, and size: `int scores[5];`. You can fill it at creation: `int scores[5] = {90, 85, 77, 60, 100};`.",
      "Access slots by index, counting FROM ZERO: `scores[0]` is the first, `scores[4]` is the fifth. The last valid index is size minus one.",
      "Loop through arrays with a for loop: `for (int i = 0; i < 5; i++)` visits every slot. This pairing of array + for loop is everywhere in C++.",
      "Going out of bounds (`scores[5]` on a size-5 array) is a serious bug — C++ won't stop you, it reads random memory. Always keep your index inside the size.",
      "A reference is an alias: `int& ref = age;` makes `ref` another name for the SAME box as `age`. Change one, the other changes too — because they're literally the same memory.",
      "References shine in functions: passing `int&` lets a function modify the caller's variable directly (and avoids copying big data). Use `const int&` to pass big things cheaply without allowing changes.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>

// Reference parameter: modifies the caller's variable directly
void addBonus(int& score) {
    score += 10;          // changes the ORIGINAL, not a copy
}

int main() {
    int scores[5] = {90, 85, 77, 60, 100};

    int total = 0;
    for (int i = 0; i < 5; i++) {
        total += scores[i];               // visit every slot
    }
    std::cout << "Average: " << total / 5 << "\n";

    addBonus(scores[3]);                   // pass by reference
    std::cout << "Boosted 4th score: " << scores[3] << "\n";  // 70
    return 0;
}`,
      explanation:
        "The for loop sums all five slots (indices 0 to 4). addBonus takes an int& — a reference — so it edits the real array slot in place, turning 60 into 70.",
    },
    exercise: {
      prompt: "Fill an int array of size 4 with {2, 4, 6, 8} and print the largest value using a loop.",
      starter: `#include <iostream>
int main() {
    int nums[4] = {2, 4, 6, 8};
    int biggest = nums[0];
    // TODO: loop to find the biggest value
    std::cout << biggest << "\n";
    return 0;
}`,
      solution: `#include <iostream>
int main() {
    int nums[4] = {2, 4, 6, 8};
    int biggest = nums[0];
    for (int i = 1; i < 4; i++) {
        if (nums[i] > biggest) biggest = nums[i];
    }
    std::cout << biggest << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "In an array of size 5, what is the index of the LAST element?",
        options: ["5", "4", "1", "6"],
        answerIndex: 1,
        explanation: "Indexing starts at 0, so a size-5 array has valid indices 0 through 4 — the last is 4.",
      },
      {
        question: "What is a reference (int&) in C++?",
        options: [
          "A copy of a variable",
          "Another name (alias) for an existing variable — same memory",
          "A brand new array",
          "A number",
        ],
        answerIndex: 1,
        explanation: "A reference is an alias: it points at the same box, so changing one changes the other.",
      },
    ],
    flashcards: [
      { front: "Array", back: "A fixed-size row of same-typed values under one name, accessed by index from 0." },
      { front: "Index", back: "The slot number in an array, starting at 0; last index is size minus 1." },
      { front: "Reference (int&)", back: "An alias — a second name for an existing variable, sharing the same memory." },
      { front: "Out-of-bounds", back: "Accessing an index outside the array's size; a dangerous bug C++ won't catch for you." },
    ],
    miniProject: {
      title: "Grade Book Statistics",
      brief: "Store a class of scores and compute simple stats.",
      steps: [
        "Make an int array of 8 test scores.",
        "Loop to compute the total and average.",
        "Loop to find the highest and lowest score.",
        "Print a small report; bonus: count how many scores are above the average.",
      ],
    },
    industryUse: [
      "Image editors store pixels as huge arrays of color values",
      "Audio software holds sound samples in arrays and loops over them",
      "Games keep arrays of enemies, bullets, and tiles updated every frame",
    ],
    commonMistakes: [
      "Off-by-one errors: looping `i <= size` instead of `i < size` reads one slot past the end.",
      "Assuming a reference is a copy — editing it changes the original variable too.",
    ],
    interviewQuestions: [
      "Why do array indices start at 0 in C++?",
      "What is the difference between passing by value and passing by reference?",
    ],
    papers: [],
    nextUp: ["cpp-pointers", "cpp-dynamic"],
    cheatsheet: [
      "int a[5] = {1,2,3,4,5}; declares and fills",
      "Indices go 0 .. size-1",
      "Loop: for (int i = 0; i < size; i++)",
      "int& ref = x; makes ref an alias for x",
      "Pass int& to let a function edit the original",
    ],
  },

  "cpp-pointers": {
    story:
      "Every box in your computer's memory has an address, like houses on a street. A pointer is a slip of paper with a house address written on it. It doesn't hold the value itself — it holds where the value LIVES. Why bother? Because sometimes you want to say 'go to that exact house and change what's inside' without carrying the whole house around. In C++ you write `int* p = &age;` — the `&` means 'the address of age', and `p` now holds that address. Follow the slip with `*p` and you're standing at the box, able to read or change it.",
    problem:
      "Copying big things is slow, and some tasks need to share and modify the exact same data from different places. You need a way to refer to memory by its address — to point at data rather than duplicate it — which unlocks dynamic memory, linked structures, and efficient sharing.",
    analogy:
      "A pointer is a house address on a slip of paper: `&` reads a house's address, and `*` walks you to that house to see or change what's inside.",
    explanation: [
      "`&x` gives the ADDRESS of x (where it lives). `int* p = &x;` stores that address in a pointer p. The `*` in the declaration means 'p is a pointer to an int'.",
      "Dereferencing with `*p` means 'go to the address p holds and use the value there'. `*p = 99;` changes the original x, because p points right at it.",
      "A pointer that points at nothing should be set to `nullptr`. Dereferencing a nullptr (or a random uninitialized pointer) crashes your program — a classic C++ danger.",
      "Pointers and references are cousins: both let you touch data elsewhere. References are simpler and safer; pointers are more powerful (they can be reassigned and can be null).",
      "Arrays and pointers are deeply linked: an array's name acts like a pointer to its first element, which is why `arr` and `&arr[0]` are so closely related.",
      "Use pointers when you truly need them: dynamic memory, optional 'maybe-empty' values (nullptr), or building structures like linked lists. For simple 'edit the caller's variable', prefer a reference.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>

int main() {
    int age = 30;
    int* p = &age;        // p holds the ADDRESS of age

    std::cout << "Value of age:   " << age  << "\n";  // 30
    std::cout << "Address of age: " << p    << "\n";  // some hex address
    std::cout << "Value via *p:   " << *p   << "\n";  // 30 (follow the pointer)

    *p = 99;              // go to that address and change what's there
    std::cout << "age is now:     " << age  << "\n";  // 99 — we edited the original!

    int* nothing = nullptr;   // points at nothing, safely
    if (nothing == nullptr) std::cout << "nothing points nowhere\n";
    return 0;
}`,
      explanation:
        "&age gets age's address; *p follows it back to the value. Setting *p = 99 changes age itself because p points directly at it. nullptr is the safe 'points at nothing' value.",
    },
    exercise: {
      prompt: "Make an int total = 100, a pointer to it, and use the pointer (with *) to add 50 to total.",
      starter: `#include <iostream>
int main() {
    int total = 100;
    int* p = &total;
    // TODO: use *p to add 50 to total
    std::cout << total << "\n";   // should print 150
    return 0;
}`,
      solution: `#include <iostream>
int main() {
    int total = 100;
    int* p = &total;
    *p = *p + 50;
    std::cout << total << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "What does the `&` operator do in `int* p = &age;`?",
        options: [
          "Adds two numbers",
          "Gives the address of age",
          "Follows a pointer",
          "Creates a reference forever",
        ],
        answerIndex: 1,
        explanation: "The & (address-of) operator returns where a variable lives in memory, which the pointer stores.",
      },
      {
        question: "What happens if you dereference a nullptr with `*p`?",
        options: [
          "It returns 0 safely",
          "It crashes the program",
          "It creates a new variable",
          "Nothing at all",
        ],
        answerIndex: 1,
        explanation: "nullptr points at nothing, so following it (dereferencing) is invalid and typically crashes.",
      },
    ],
    flashcards: [
      { front: "Pointer", back: "A variable that stores the memory address of another variable." },
      { front: "& (address-of)", back: "Gives the memory address where a variable lives: &age." },
      { front: "* (dereference)", back: "Follows a pointer to the value it points at: *p reads or writes that box." },
      { front: "nullptr", back: "The safe value for a pointer that points at nothing; never dereference it." },
    ],
    miniProject: {
      title: "Swap Two Numbers with Pointers",
      brief: "Write a classic swap function that exchanges two variables using pointers.",
      steps: [
        "Write void swap(int* a, int* b) that swaps the values a and b point at.",
        "Inside, use a temp variable and dereference with *a and *b.",
        "In main, create two ints and call swap(&x, &y).",
        "Print x and y before and after to prove they swapped.",
      ],
    },
    industryUse: [
      "Operating systems use pointers constantly to manage memory and hardware",
      "Databases use pointers to link records and index structures efficiently",
      "Game engines pass pointers to large objects to avoid slow copies each frame",
    ],
    commonMistakes: [
      "Dereferencing an uninitialized or null pointer — always point it at something valid or nullptr first.",
      "Confusing `*` in a declaration (defines a pointer) with `*` in use (follows the pointer). Same symbol, two jobs.",
    ],
    interviewQuestions: [
      "What is the difference between a pointer and a reference?",
      "What is a null pointer and why is dereferencing one dangerous?",
    ],
    papers: [],
    nextUp: ["cpp-dynamic", "cpp-classes"],
    cheatsheet: [
      "int* p = &x;  p holds x's address",
      "&x = address of x",
      "*p = the value p points at (read or write)",
      "nullptr = points at nothing (safe)",
      "Prefer references for simple cases; pointers when you need power",
    ],
  },

  "cpp-dynamic": {
    story:
      "Sometimes you don't know how much space you'll need until the program is already running — a user might load 3 photos or 3,000. You can't hard-code an array size for that. So you ask the computer, mid-run, 'give me room for exactly this many, right now.' That's dynamic memory: borrowing memory from a big pool called the heap while the program runs. The catch in old C++: whatever you borrow with `new`, you must give back with `delete`, or your program slowly leaks memory. Modern C++ fixes this with smart pointers that return the memory automatically.",
    problem:
      "Regular variables and arrays need a size known at compile time and vanish when their function ends. But real programs must create data whose amount and lifetime are decided at runtime — and manually returning that memory is so error-prone it causes crashes and leaks industry-wide.",
    analogy:
      "`new`/`delete` is like borrowing library books: forget to return them (delete) and they pile up forever (a memory leak). A smart pointer is a friend who automatically returns your books the moment you're done.",
    explanation: [
      "`new` grabs memory from the heap and returns a pointer to it: `int* p = new int(42);`. This memory lives until you explicitly `delete p;`.",
      "Every `new` needs a matching `delete` (or `new[]` with `delete[]` for arrays). Forget it and you leak memory; do it twice and you get crashes. This bookkeeping is famously bug-prone.",
      "Modern C++ says: stop managing this by hand. Use smart pointers from `<memory>` that free the memory automatically when they go out of scope.",
      "`std::unique_ptr<int> p = std::make_unique<int>(42);` owns the memory alone and frees it automatically — no delete needed. Use it as your default.",
      "`std::shared_ptr` is for memory shared by several owners; it counts how many are using it and frees only when the last one is done. Use it when ownership is genuinely shared.",
      "The golden rule of modern C++: avoid raw `new`/`delete`. Reach for `std::vector` for lists and smart pointers for single objects — they handle the memory so you don't leak.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>
#include <memory>   // for smart pointers

int main() {
    // Old way: manual, easy to leak
    int* raw = new int(42);   // borrow from the heap
    std::cout << "raw: " << *raw << "\n";
    delete raw;               // MUST return it, or leak

    // Modern way: smart pointer frees itself automatically
    std::unique_ptr<int> smart = std::make_unique<int>(99);
    std::cout << "smart: " << *smart << "\n";
    // no delete needed — freed when 'smart' goes out of scope

    // Shared ownership: freed when the last owner is done
    std::shared_ptr<int> a = std::make_shared<int>(7);
    std::shared_ptr<int> b = a;   // both now own it
    std::cout << "owners: " << a.use_count() << "\n";  // 2
    return 0;
}`,
      explanation:
        "The raw pointer needs a manual delete or it leaks. unique_ptr and shared_ptr free themselves automatically — the shared one only when its last owner disappears.",
    },
    exercise: {
      prompt: "Create a unique_ptr to an int holding 25, then print its value doubled. No delete needed.",
      starter: `#include <iostream>
#include <memory>
int main() {
    // TODO: make a unique_ptr<int> holding 25 and print value * 2
    return 0;
}`,
      solution: `#include <iostream>
#include <memory>
int main() {
    std::unique_ptr<int> p = std::make_unique<int>(25);
    std::cout << (*p) * 2 << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "What must every `new` be paired with in old-style C++?",
        options: ["Another new", "A matching delete", "A return statement", "A for loop"],
        answerIndex: 1,
        explanation: "Memory from new lives until you delete it; forgetting the delete causes a memory leak.",
      },
      {
        question: "Why prefer std::unique_ptr over raw new/delete?",
        options: [
          "It's faster to type",
          "It frees the memory automatically, preventing leaks",
          "It uses more memory",
          "It disables all pointers",
        ],
        answerIndex: 1,
        explanation: "A unique_ptr releases its memory automatically when it goes out of scope, so you can't forget to delete.",
      },
    ],
    flashcards: [
      { front: "Heap", back: "A large pool of memory you can borrow from at runtime with new or smart pointers." },
      { front: "new / delete", back: "Manually borrow (new) and return (delete) heap memory; must be paired." },
      { front: "Memory leak", back: "Heap memory you borrowed but never returned; it piles up and wastes memory." },
      { front: "std::unique_ptr", back: "A smart pointer that solely owns memory and frees it automatically." },
    ],
    miniProject: {
      title: "A Growing List Without Leaks",
      brief: "Compare manual memory to a std::vector, which manages growth for you.",
      steps: [
        "Include <vector> and make an empty std::vector<int>.",
        "Loop 5 times, using push_back to add numbers the user types.",
        "Loop again to print them all — notice you never called new or delete.",
        "Reflect: how much manual pointer code did the vector save you?",
      ],
    },
    industryUse: [
      "Browsers use smart pointers to manage the lifetime of page elements safely",
      "Game engines allocate objects on the heap as levels load and unload",
      "Large C++ codebases at Google mandate smart pointers to stop memory leaks",
    ],
    commonMistakes: [
      "Forgetting `delete` after `new`, causing memory leaks that grow over time.",
      "Using raw new/delete when a std::vector or unique_ptr would handle memory for you automatically.",
    ],
    interviewQuestions: [
      "What is a memory leak and how do smart pointers prevent it?",
      "What is the difference between unique_ptr and shared_ptr?",
    ],
    papers: [],
    nextUp: ["cpp-classes", "cpp-stl"],
    cheatsheet: [
      "new borrows heap memory; delete returns it",
      "Every new needs one matching delete",
      "unique_ptr: sole owner, auto-frees",
      "shared_ptr: shared owners, frees when last is gone",
      "Modern rule: avoid raw new/delete — use vector & smart pointers",
    ],
  },

  "cpp-classes": {
    story:
      "Think about the idea of a 'car'. A car has properties (color, speed, fuel) and things it can DO (start, accelerate, brake). Wouldn't it be nice to bundle that data and those actions into one neat blueprint, then stamp out as many cars as you like? That's a class: a blueprint that combines data (member variables) and behavior (member functions) into one type. You write a `class Car` once, then create actual cars — `Car myCar;` — each with its own color and speed. It's how C++ lets you model real-world things instead of juggling loose variables.",
    problem:
      "As programs grow, loose variables and functions become chaos — which speed belongs to which car? You need a way to bundle related data with the functions that operate on it, and to stamp out many independent copies from one design.",
    analogy:
      "A class is a cookie cutter (the blueprint); objects are the actual cookies. One cutter, many cookies, each its own cookie but all the same shape.",
    explanation: [
      "A class groups member variables (its data) and member functions (its behavior). A specific instance made from the class is called an object.",
      "`public` members can be used from outside; `private` members are hidden inside and can only be touched by the class's own functions. Hiding data (encapsulation) protects it from accidental misuse.",
      "A constructor is a special function with the class's name that runs automatically when an object is created — perfect for setting starting values: `Car(std::string c) { color = c; }`.",
      "You call an object's functions with a dot: `myCar.accelerate();`. The object carries its own data, so each car's speed is separate.",
      "Encapsulation is the big idea: expose a clean public interface (start, accelerate) while keeping the messy internals private. Users of your class don't need to know how it works inside.",
      "Use classes to model 'things' with state and behavior: a BankAccount, a Player, a Date. If you find variables that always travel together, that's a class waiting to be born.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>
#include <string>

class Car {
private:
    std::string color;    // hidden data
    int speed;

public:
    // Constructor: runs when a Car is created
    Car(std::string c) {
        color = c;
        speed = 0;
    }
    void accelerate(int amount) {
        speed += amount;
    }
    void status() {
        std::cout << color << " car going " << speed << " km/h\n";
    }
};

int main() {
    Car myCar("red");        // constructor runs
    myCar.accelerate(50);    // call a member function
    myCar.accelerate(20);
    myCar.status();          // "red car going 70 km/h"
    return 0;
}`,
      explanation:
        "The Car class bundles color and speed with functions that use them. The constructor sets the starting state; accelerate changes this object's own speed; status reports it. myCar is one object stamped from the blueprint.",
    },
    exercise: {
      prompt: "Add a `brake(int amount)` member function to Car that lowers speed, then call it in main.",
      starter: `class Car {
private:
    std::string color;
    int speed;
public:
    Car(std::string c) { color = c; speed = 0; }
    void accelerate(int amount) { speed += amount; }
    // TODO: add a brake function
    void status();
};`,
      solution: `void brake(int amount) {
    speed -= amount;
    if (speed < 0) speed = 0;
}`,
    },
    quiz: [
      {
        question: "What is an object?",
        options: [
          "A blueprint for making things",
          "A specific instance created from a class",
          "A type of loop",
          "A memory address",
        ],
        answerIndex: 1,
        explanation: "A class is the blueprint; an object is a concrete instance stamped from that blueprint.",
      },
      {
        question: "What does a constructor do?",
        options: [
          "Deletes an object",
          "Runs automatically when an object is created to set it up",
          "Prints the object",
          "Makes the class private",
        ],
        answerIndex: 1,
        explanation: "A constructor is a special function that runs at creation time, usually to initialize the object's data.",
      },
    ],
    flashcards: [
      { front: "Class", back: "A blueprint bundling data (members) and behavior (member functions) into one type." },
      { front: "Object", back: "A specific instance created from a class, with its own copy of the data." },
      { front: "Constructor", back: "A special function that runs automatically when an object is created, to set it up." },
      { front: "Encapsulation", back: "Hiding internal data as private and exposing a clean public interface." },
    ],
    miniProject: {
      title: "A BankAccount Class",
      brief: "Model a bank account with a balance you can deposit to and withdraw from safely.",
      steps: [
        "Create a class BankAccount with a private double balance.",
        "Add a constructor that sets the starting balance.",
        "Add deposit(amount) and withdraw(amount) that reject overdrafts.",
        "Add a printBalance function and test it all in main.",
      ],
    },
    industryUse: [
      "Game engines model every entity (player, enemy, item) as a class",
      "Banking software represents accounts and transactions as classes",
      "GUI frameworks like Qt build every button and window from classes",
    ],
    commonMistakes: [
      "Making everything public and losing the protection encapsulation gives you — keep internal data private.",
      "Forgetting to initialize member variables in the constructor, leaving objects in a garbage state.",
    ],
    interviewQuestions: [
      "What is the difference between a class and an object?",
      "What is encapsulation and why is it useful?",
    ],
    papers: [],
    nextUp: ["cpp-inheritance", "cpp-stl"],
    cheatsheet: [
      "class Name { private: data; public: functions; };",
      "Object: Car myCar(\"red\");",
      "Call a method: myCar.accelerate(50);",
      "Constructor: same name as class, runs at creation",
      "private = hidden, public = usable from outside",
    ],
  },

  "cpp-inheritance": {
    story:
      "A Dog, a Cat, and a Bird are all Animals — they each have a name and can eat, but each makes its own sound. Rewriting 'name' and 'eat' for every animal would be silly. Inheritance lets you write a general `Animal` blueprint once, then say 'a Dog IS an Animal, plus it barks.' The Dog automatically gets everything Animal has, and adds its own twist. Polymorphism is the magic follow-up: you can keep a whole zoo of different animals in one list and tell them all to 'speak' — each responds in its own voice, correctly, without you checking what type each one is.",
    problem:
      "Without inheritance, classes that share behavior duplicate it endlessly, and code that handles many related types drowns in if/else checks asking 'is this a Dog? a Cat?'. You need to share common code AND let different types respond to the same command in their own way.",
    analogy:
      "Inheritance is family traits passed down: a child inherits the parents' features and adds their own. Polymorphism is calling 'everyone, sing your song!' and each person sings their own — same command, different result.",
    explanation: [
      "Inheritance: `class Dog : public Animal` means Dog is a kind of Animal and inherits its members. You write shared code once in the base class (Animal) and specialize in the derived class (Dog).",
      "A base class can define a `virtual` function — a placeholder each child can override. `virtual void speak()` says 'children may replace this'.",
      "Polymorphism: with virtual functions, a base-class pointer or reference calls the CORRECT child version at runtime. A pointer to Animal that actually points at a Dog will bark, not make a generic sound.",
      "This lets you store many types together (a vector of Animal pointers) and treat them uniformly — call speak() on each and each responds correctly. No giant if/else needed.",
      "Always give a base class a `virtual ~Animal()` destructor when using polymorphism, so deleting through a base pointer cleans up the derived part properly.",
      "Use inheritance for genuine 'is-a' relationships (a Dog is an Animal). Don't force it where 'has-a' fits better (a Car has an Engine — that's composition, not inheritance).",
    ],
    code: {
      language: "text",
      source: `#include <iostream>
#include <string>
#include <vector>
#include <memory>

class Animal {
public:
    std::string name;
    Animal(std::string n) : name(n) {}
    virtual void speak() {            // virtual = children can override
        std::cout << name << " makes a sound\n";
    }
    virtual ~Animal() {}             // virtual destructor for safe cleanup
};

class Dog : public Animal {
public:
    Dog(std::string n) : Animal(n) {}
    void speak() override {           // Dog's own version
        std::cout << name << " says Woof!\n";
    }
};

class Cat : public Animal {
public:
    Cat(std::string n) : Animal(n) {}
    void speak() override {
        std::cout << name << " says Meow!\n";
    }
};

int main() {
    std::vector<std::unique_ptr<Animal>> zoo;
    zoo.push_back(std::make_unique<Dog>("Rex"));
    zoo.push_back(std::make_unique<Cat>("Milo"));
    for (auto& a : zoo) a->speak();   // each speaks in its own voice
    return 0;
}`,
      explanation:
        "Dog and Cat inherit name and the speak placeholder from Animal, then override speak. Because speak is virtual, looping over the mixed zoo calls the right version for each — that's polymorphism.",
    },
    exercise: {
      prompt: "Add a Bird class that inherits from Animal and overrides speak() to print a tweet.",
      starter: `class Bird : public Animal {
public:
    Bird(std::string n) : Animal(n) {}
    // TODO: override speak() to say Tweet!
};`,
      solution: `class Bird : public Animal {
public:
    Bird(std::string n) : Animal(n) {}
    void speak() override {
        std::cout << name << " says Tweet!\n";
    }
};`,
    },
    quiz: [
      {
        question: "What does `class Dog : public Animal` mean?",
        options: [
          "Dog contains an Animal variable",
          "Dog inherits from Animal (a Dog is an Animal)",
          "Dog deletes Animal",
          "Animal inherits from Dog",
        ],
        answerIndex: 1,
        explanation: "The colon syntax means Dog is a derived class of Animal and inherits its members.",
      },
      {
        question: "Why must a function be `virtual` for polymorphism to work?",
        options: [
          "So it runs faster",
          "So a base-class pointer calls the correct derived version at runtime",
          "So it can't be overridden",
          "So it becomes private",
        ],
        answerIndex: 1,
        explanation: "virtual enables dynamic dispatch — the right override is chosen based on the real object's type at runtime.",
      },
    ],
    flashcards: [
      { front: "Inheritance", back: "A derived class gains the members of a base class (an 'is-a' relationship)." },
      { front: "virtual function", back: "A base-class function that derived classes can override; enables polymorphism." },
      { front: "Polymorphism", back: "One command (like speak) produces the correct behavior for each object's real type." },
      { front: "override", back: "A keyword marking that a function replaces a virtual one from the base class." },
    ],
    miniProject: {
      title: "A Shape Area Calculator",
      brief: "Use inheritance and polymorphism to compute areas of different shapes uniformly.",
      steps: [
        "Make a base class Shape with a virtual double area() function.",
        "Derive Circle and Rectangle, each overriding area().",
        "Store several shapes in a vector of Shape pointers.",
        "Loop and print each area — the right formula runs for each shape.",
      ],
    },
    industryUse: [
      "Game engines use a base Entity class with virtual update() for every game object",
      "GUI toolkits define a base Widget and derive Button, Slider, TextBox",
      "Graphics drivers use polymorphism to support many hardware backends behind one interface",
    ],
    commonMistakes: [
      "Forgetting `virtual`, so a base pointer calls the base version instead of the child's — silent wrong behavior.",
      "Omitting a virtual destructor in the base class, causing incomplete cleanup when deleting through a base pointer.",
    ],
    interviewQuestions: [
      "What is the difference between inheritance and composition?",
      "What is a virtual function and how does it enable polymorphism?",
    ],
    papers: [],
    nextUp: ["cpp-stl", "cpp-console-game"],
    cheatsheet: [
      "class Dog : public Animal { }; // Dog is-a Animal",
      "virtual void speak(); // children can override",
      "override marks a replaced virtual function",
      "Base pointer + virtual = correct child called (polymorphism)",
      "Always give a polymorphic base a virtual destructor",
    ],
  },

  "cpp-stl": {
    story:
      "Early C++ programmers rewrote the same tools over and over: resizable lists, lookup tables, sorting routines. It was wasteful and buggy. So C++ ships with the Standard Template Library — a toolbox of battle-tested, ready-made containers and algorithms. Need a list that grows on its own? `std::vector`. Need to look things up by a key, like a phone book? `std::map`. Need to sort a million items? One line: `std::sort`. The STL is the professional's shortcut — decades of expert work you get for free, so you write `#include <vector>` instead of reinventing the wheel.",
    problem:
      "Raw arrays have a fixed size and no built-in operations; writing your own growable lists, lookup tables, and sorting is slow and error-prone. You need reliable, fast, ready-made data structures and algorithms so you can focus on your actual problem.",
    analogy:
      "The STL is a fully stocked professional kitchen: instead of forging your own knives and pots, you grab proven tools and get straight to cooking.",
    explanation: [
      "`std::vector` is the workhorse: a list that grows automatically. `push_back` adds to the end, `.size()` tells you how many, and `[i]` indexes like an array. Use it instead of raw arrays almost always.",
      "`std::map` stores key→value pairs, like a dictionary or phone book: `ages[\"Maria\"] = 30;`. Look up by key instantly, no manual searching.",
      "`std::string` is a smart, growable text type with handy operations: `.length()`, `+` to join, `.substr()` to slice. Far safer than C-style char arrays.",
      "STL algorithms in `<algorithm>` work on containers: `std::sort(v.begin(), v.end())` sorts, `std::find` searches, `std::max_element` finds the biggest — one line each.",
      "Range-based for loops read containers cleanly: `for (int x : v)` visits every element. Add `&` (`for (auto& x : v)`) to modify them in place.",
      "Reach for the STL by default. Only hand-roll a data structure when you have a very specific, measured reason — the STL is faster and safer than what most people write by hand.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>
#include <vector>
#include <map>
#include <string>
#include <algorithm>

int main() {
    // vector: a list that grows itself
    std::vector<int> scores = {90, 60, 100, 75};
    scores.push_back(85);
    std::sort(scores.begin(), scores.end());    // one-line sort
    for (int s : scores) std::cout << s << " ";  // 60 75 85 90 100
    std::cout << "\n";

    // map: look things up by a key
    std::map<std::string, int> ages;
    ages["Maria"] = 30;
    ages["Sam"] = 42;
    std::cout << "Maria is " << ages["Maria"] << "\n";

    // algorithm: find the biggest score
    int top = *std::max_element(scores.begin(), scores.end());
    std::cout << "Top score: " << top << "\n";
    return 0;
}`,
      explanation:
        "vector holds a growable list and push_back extends it; sort orders it in one call. map stores name-to-age lookups. max_element finds the highest value — all reused from the STL, none hand-written.",
    },
    exercise: {
      prompt: "Make a vector of names (strings), add two with push_back, then print how many names it holds.",
      starter: `#include <iostream>
#include <vector>
#include <string>
int main() {
    std::vector<std::string> names;
    // TODO: push_back two names, then print names.size()
    return 0;
}`,
      solution: `#include <iostream>
#include <vector>
#include <string>
int main() {
    std::vector<std::string> names;
    names.push_back("Maria");
    names.push_back("Sam");
    std::cout << names.size() << "\n";
    return 0;
}`,
    },
    quiz: [
      {
        question: "Which STL container automatically grows as you add items?",
        options: ["A raw array", "std::vector", "int", "char"],
        answerIndex: 1,
        explanation: "std::vector resizes itself as you push_back, unlike a fixed-size raw array.",
      },
      {
        question: "What is std::map best for?",
        options: [
          "Sorting numbers",
          "Storing and looking up key-value pairs, like a dictionary",
          "Drawing graphics",
          "Reading files",
        ],
        answerIndex: 1,
        explanation: "A map stores key→value pairs so you can look up a value by its key instantly.",
      },
    ],
    flashcards: [
      { front: "std::vector", back: "A list that grows automatically; push_back adds, [i] indexes, .size() counts." },
      { front: "std::map", back: "A key-value store (like a dictionary) for instant lookup by key." },
      { front: "std::sort", back: "An STL algorithm that sorts a container in one line: sort(v.begin(), v.end())." },
      { front: "Range-based for", back: "for (auto x : container) visits every element cleanly." },
    ],
    miniProject: {
      title: "Word Frequency Counter",
      brief: "Count how often each word appears in a sentence using a map.",
      steps: [
        "Store a few words in a std::vector<std::string>.",
        "Loop through them, incrementing counts in a std::map<string,int>.",
        "Print each word with its count.",
        "Bonus: find and print the most common word.",
      ],
    },
    industryUse: [
      "Nearly every modern C++ app uses std::vector as its default list",
      "Compilers and interpreters use std::map for symbol tables",
      "Trading and simulation systems lean on std::sort and STL algorithms for speed",
    ],
    commonMistakes: [
      "Reinventing lists and sorting by hand when std::vector and std::sort already exist and are faster.",
      "Indexing a vector out of bounds with [] — it won't warn you; use .at(i) when you want a bounds check.",
    ],
    interviewQuestions: [
      "When would you use a std::vector versus a std::map?",
      "What does std::sort do and what does it need as arguments?",
    ],
    papers: [],
    nextUp: ["cpp-console-game"],
    cheatsheet: [
      "std::vector<int> v; v.push_back(x); v.size();",
      "std::map<string,int> m; m[\"key\"] = value;",
      "std::sort(v.begin(), v.end());",
      "for (auto& x : v) { } to loop and modify",
      "Prefer the STL over hand-rolling containers",
    ],
  },

  "cpp-console-game": {
    story:
      "Now you get to put it all together and build something you can actually PLAY. A console game — text in the terminal, no fancy graphics — is the perfect first project because every skill you've learned shows up: variables hold the game state, loops keep the game running, if/else checks the rules, functions organize the logic, and maybe a class models the player. We'll build a Guess-the-Number game: the computer picks a secret number, and you keep guessing while it hints 'higher' or 'lower' until you win. It feels like a real game, and it's all yours.",
    problem:
      "Tutorials teach pieces in isolation; a real project forces you to combine them into something that works end to end. Building a small game is the classic way to cement loops, conditions, input, and functions into muscle memory — and to feel the thrill of shipping.",
    analogy:
      "This is your first home-cooked meal after learning individual techniques: chopping, boiling, seasoning. The game is the plated dish where all the skills come together.",
    explanation: [
      "The heart of most games is the game loop: a `while` loop that runs each turn until a win/lose condition ends it. Inside, you read input, update state, and print feedback.",
      "Use `<cstdlib>` and `<ctime>` for randomness: seed once with `srand(time(0))`, then `rand() % 100 + 1` gives a secret number from 1 to 100.",
      "Read the player's guess with `std::cin >> guess;`. Then an if/else compares it to the secret and prints 'too high', 'too low', or 'you win!'.",
      "Track state in variables: the secret number, the guess, and a counter for how many tries it took — printed as the score at the end.",
      "Break the code into functions to stay organized: one to get a valid guess, one to give a hint. This is exactly how bigger games are structured, just scaled down.",
      "Once it works, extend it: add a limited number of tries, a play-again loop, or a difficulty setting. Growing a working program is how real games get built.",
    ],
    code: {
      language: "text",
      source: `#include <iostream>
#include <cstdlib>   // rand, srand
#include <ctime>     // time

int main() {
    srand(time(0));                    // seed randomness once
    int secret = rand() % 100 + 1;     // 1 to 100
    int guess = 0;
    int tries = 0;

    std::cout << "Guess my number (1-100)!\n";
    while (guess != secret) {          // the game loop
        std::cout << "Your guess: ";
        std::cin >> guess;
        tries++;

        if (guess < secret)      std::cout << "Too low!\n";
        else if (guess > secret) std::cout << "Too high!\n";
        else std::cout << "Correct in " << tries << " tries! You win!\n";
    }
    return 0;
}`,
      explanation:
        "srand seeds the randomness so the secret differs each run. The while loop keeps asking until guess equals secret; each turn the if/else gives a hint and tries counts the attempts.",
    },
    exercise: {
      prompt: "Add a maximum of 7 tries: if the player runs out, print the secret and end the game.",
      starter: `while (guess != secret) {
    std::cin >> guess;
    tries++;
    // TODO: if tries >= 7, reveal secret and break
    if (guess < secret) std::cout << "Too low!\n";
    else if (guess > secret) std::cout << "Too high!\n";
    else std::cout << "You win!\n";
}`,
      solution: `while (guess != secret) {
    std::cin >> guess;
    tries++;
    if (tries >= 7 && guess != secret) {
        std::cout << "Out of tries! It was " << secret << "\n";
        break;
    }
    if (guess < secret) std::cout << "Too low!\n";
    else if (guess > secret) std::cout << "Too high!\n";
    else std::cout << "You win!\n";
}`,
    },
    quiz: [
      {
        question: "What structure keeps a console game running turn after turn?",
        options: ["A single if statement", "A game loop (usually a while loop)", "A constructor", "A pointer"],
        answerIndex: 1,
        explanation: "A while loop runs each turn until a win/lose condition ends it — that's the game loop.",
      },
      {
        question: "Why do we call `srand(time(0))` before using rand()?",
        options: [
          "To make the game slower",
          "To seed randomness so the secret number differs each run",
          "To read the player's input",
          "To sort the numbers",
        ],
        answerIndex: 1,
        explanation: "Seeding with the current time makes rand produce a different sequence each time you play.",
      },
    ],
    flashcards: [
      { front: "Game loop", back: "A while loop that runs each turn, reading input and updating state until the game ends." },
      { front: "rand() % 100 + 1", back: "Produces a pseudo-random number from 1 to 100." },
      { front: "srand(time(0))", back: "Seeds the random generator with the clock so results differ each run." },
      { front: "std::cin >> x", back: "Reads a value the player types from the keyboard into x." },
    ],
    miniProject: {
      title: "Guess-the-Number, Leveled Up",
      brief: "Start from the guessing game and grow it into something you'd show a friend.",
      steps: [
        "Get the basic guess loop working with hints.",
        "Add a try counter and print it as the final score.",
        "Add a limited number of tries and a lose message.",
        "Wrap it in a play-again loop so the game restarts on request.",
      ],
    },
    industryUse: [
      "Text adventure games and MUDs were built on exactly these console loops",
      "Roguelike games (like the original Rogue) run a turn-based console loop",
      "Command-line tools use the same input-loop-decide structure for interactive prompts",
    ],
    commonMistakes: [
      "Forgetting to seed with srand, so the 'random' number is the same every run.",
      "Building a while loop with no way to end it, trapping the player in an infinite game.",
    ],
    interviewQuestions: [
      "Describe the structure of a basic game loop.",
      "How would you generate a random number in a given range in C++?",
    ],
    papers: [],
    nextUp: ["cpp-classes", "cpp-stl"],
    cheatsheet: [
      "srand(time(0)); secret = rand() % 100 + 1;",
      "Game loop: while (!gameOver) { ... }",
      "std::cin >> guess; reads player input",
      "if/else gives hints; a counter tracks the score",
      "Ship it, then extend: tries limit, play-again, difficulty",
    ],
  },
};
