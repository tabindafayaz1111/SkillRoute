import type { LessonBody } from "@/types";

export const java: Record<string, LessonBody> = {
  "java-jvm": {
    story:
      "Picture writing a letter that everyone in the world can read — no matter their language. You write it once in a special 'universal' script, and every country has a little translator that turns it into the local tongue on the spot. That's Java's superpower. You write your program once, and a piece of software called the JVM (Java Virtual Machine) runs it on Windows, Mac, a phone, or a giant bank server — no rewriting. That promise even has a slogan: 'write once, run anywhere.'",
    problem:
      "Normally a program built for a Windows computer won't run on a Mac, because different machines speak different low-level languages. Rewriting your app for every kind of computer is slow and error-prone. Java solves this by not talking to the computer directly at all — it talks to the JVM, which is installed on each machine and knows how to speak the local dialect.",
    analogy:
      "The JVM is like a universal power adapter: you plug in the same laptop charger anywhere in the world, and the adapter handles the local socket for you.",
    explanation: [
      "You write human-friendly Java code in a file ending in .java. This is the letter you type.",
      "A tool called the compiler (javac) turns your .java file into bytecode — a compact, half-way language stored in a .class file. It's not English and not raw machine code; it's in between.",
      "The JVM reads that bytecode and translates it into instructions the actual computer understands, right as the program runs. Because every operating system has its own JVM, the same bytecode runs everywhere.",
      "The JVM also does helpful chores automatically, like cleaning up memory you're no longer using (called garbage collection), so you rarely have to manage it by hand.",
      "You don't run Java code line-by-line like a script; you compile first, then run. The two commands are usually 'javac Hello.java' then 'java Hello'.",
      "Use Java when you want the same code to run reliably across many machines — that's why banks, Android phones, and huge web backends love it.",
    ],
    code: {
      language: "text",
      source: `// File: Hello.java
public class Hello {
    // Every Java program starts running here, in "main"
    public static void main(String[] args) {
        System.out.println("Hello, world!");
    }
}

// In a terminal you'd type:
//   javac Hello.java   -> makes Hello.class (bytecode)
//   java Hello         -> the JVM runs it, prints: Hello, world!`,
      explanation:
        "The class name must match the file name (Hello). The 'main' method is the front door — the JVM always looks for it first and starts there.",
    },
    exercise: {
      prompt: "Make the program print your own name instead of 'Hello, world!'.",
      starter: `public class Hello {
    public static void main(String[] args) {
        // TODO: print a greeting with your name
    }
}`,
      solution: `public class Hello {
    public static void main(String[] args) {
        System.out.println("Hi, my name is Sam!");
    }
}`,
    },
    quiz: [
      {
        question: "What does the JVM actually do?",
        options: [
          "It writes your code for you",
          "It runs Java bytecode by translating it for the specific computer it's on",
          "It connects your program to the internet",
          "It designs the user interface",
        ],
        answerIndex: 1,
        explanation:
          "The JVM is the translator that lets one compiled program run on many different machines.",
      },
      {
        question: "What is bytecode?",
        options: [
          "The final machine code your CPU runs directly",
          "A picture of your program",
          "The half-way language (.class file) the compiler produces from your .java file",
          "An error message",
        ],
        answerIndex: 2,
        explanation:
          "javac turns .java source into .class bytecode, and the JVM turns bytecode into real machine instructions at run time.",
      },
    ],
    flashcards: [
      { front: "JVM", back: "Java Virtual Machine — software that runs Java bytecode on any operating system." },
      { front: "Bytecode", back: "The compact intermediate language (.class file) produced by the Java compiler." },
      { front: "javac", back: "The Java compiler; turns .java source files into .class bytecode." },
      { front: "Write once, run anywhere", back: "Java's promise: the same compiled program runs on any machine with a JVM." },
    ],
    industryUse: [
      "Android apps at Google historically ran on a JVM-style engine, so Java became the classic Android language",
      "Banks like Goldman Sachs run huge trading and settlement systems on the JVM for reliability",
      "Netflix and LinkedIn run big backend services on the JVM for its speed and stability",
    ],
    commonMistakes: [
      "Naming the file differently from the public class — Java demands 'public class Hello' live in Hello.java.",
      "Trying to run the .java file directly with 'java Hello.java' out of habit — you compile with javac first (modern Java can shortcut this, but knowing the two steps matters).",
    ],
    interviewQuestions: [
      "Explain the difference between the JDK, the JRE, and the JVM.",
      "What is bytecode, and why does it make Java portable?",
      "What does garbage collection do, and why is it helpful?",
    ],
    papers: [],
    nextUp: ["java-syntax"],
    cheatsheet: [
      "Write .java -> compile with javac -> get .class bytecode -> run with java",
      "JVM = the translator that makes 'run anywhere' possible",
      "Program starts in: public static void main(String[] args)",
      "Class name must match the file name",
      "The JVM cleans up unused memory for you (garbage collection)",
    ],
  },

  "java-syntax": {
    story:
      "Think of a kitchen where every jar is labeled and — this is the strict part — each jar is stamped with what it's allowed to hold. The sugar jar can ONLY hold sugar; you can't sneak flour in. Java variables are exactly like that: every box you make has a name AND a fixed type (a number, a word, a true/false, and so on). This strictness feels bossy at first, but it catches mistakes before your program ever runs.",
    problem:
      "Programs need to remember things — a person's age, a bank balance, a name. Without labeled storage you'd have loose values floating around with no way to find them or trust what they are. Java makes you declare, up front, both the name and the type of every value, so a whole class of bugs simply can't happen.",
    analogy:
      "A Java variable is a labeled shoebox with a rule written on the lid: 'shoes only.' Try to put a book in it and Java refuses before you even leave the house.",
    explanation: [
      "You declare a variable by writing its type, then its name, then its value: int age = 30. 'int' means whole number, 'age' is the label, 30 is what's inside.",
      "The main everyday types: int (whole numbers like 7), double (decimals like 3.14), boolean (true or false), char (a single character like 'A'), and String (text like \"hello\").",
      "String is spelled with a capital S and its text goes in double quotes. A single char uses single quotes. Mixing them up is a classic beginner slip.",
      "Operators do the math and comparisons: + - * / for arithmetic, and == != > < for comparing. Careful: = means 'assign', == means 'is it equal?'",
      "Every statement ends with a semicolon (;). It's like the period at the end of a sentence — Java needs it to know you're done.",
      "Once a variable has a type, it keeps it. An int box always holds whole numbers. This 'strong typing' is why Java catches many mistakes for you.",
    ],
    code: {
      language: "text",
      source: `public class Basics {
    public static void main(String[] args) {
        int age = 30;              // whole number
        double price = 4.99;       // decimal number
        boolean isOpen = true;     // true or false
        char grade = 'A';          // single character
        String name = "Priya";     // text (capital S, double quotes)

        int nextYear = age + 1;    // do math with them
        System.out.println(name + " will be " + nextYear);
        System.out.println("Store open? " + isOpen);
    }
}
// Prints:
// Priya will be 31
// Store open? true`,
      explanation:
        "The + between text and a number glues them into one message (Java converts the number to text automatically). Each variable's type is fixed the moment it's declared.",
    },
    exercise: {
      prompt: "Create two int variables for a shopping cart (apples and oranges) and print the total number of fruits.",
      starter: `public class Cart {
    public static void main(String[] args) {
        int apples = 3;
        // TODO: add an oranges variable and print the total
    }
}`,
      solution: `public class Cart {
    public static void main(String[] args) {
        int apples = 3;
        int oranges = 5;
        int total = apples + oranges;
        System.out.println("Total fruits: " + total);
    }
}`,
    },
    quiz: [
      {
        question: "Which type should hold a price like 4.99?",
        options: ["int", "double", "boolean", "char"],
        answerIndex: 1,
        explanation: "int is for whole numbers only. double holds decimals like 4.99.",
      },
      {
        question: "What's the difference between = and == in Java?",
        options: [
          "They're the same",
          "= assigns a value; == checks if two values are equal",
          "== assigns; = compares",
          "Both compare values",
        ],
        answerIndex: 1,
        explanation:
          "A single = puts a value into a variable. A double == asks a yes/no question: are these equal?",
      },
    ],
    flashcards: [
      { front: "int", back: "A type for whole numbers, like 5 or -20." },
      { front: "double", back: "A type for decimal numbers, like 3.14 or 4.99." },
      { front: "String", back: "A type for text; written with a capital S and double quotes." },
      { front: "Strong typing", back: "Every variable has a fixed type, so Java catches type mistakes early." },
    ],
    industryUse: [
      "Banking apps store money in precise types (often BigDecimal, not double) to avoid rounding errors on your balance",
      "E-commerce sites like Amazon use int for stock counts and boolean for 'in stock?' flags",
      "Android apps track things like battery level (int) and 'is charging' (boolean) constantly",
    ],
    commonMistakes: [
      "Using == to compare Strings — for text you use .equals() instead (a later lesson explains why).",
      "Forgetting the semicolon at the end of a line — Java stops and complains until you add it.",
    ],
    interviewQuestions: [
      "What's the difference between int and double, and when would you use each?",
      "Why does Java require you to declare a variable's type?",
      "What happens if you try to store text in an int variable?",
    ],
    papers: [],
    nextUp: ["java-flow", "java-classes"],
    cheatsheet: [
      "Declare: type name = value;  e.g. int age = 30;",
      "Types: int, double, boolean, char, String",
      "String = capital S + double quotes; char = single quotes",
      "= assigns, == compares",
      "Every statement ends with a semicolon ;",
    ],
  },

  "java-flow": {
    story:
      "Every morning you make tiny decisions and repeat little routines without thinking: IF it's cold, grab a jacket; WHILE there are dirty dishes, keep washing. Programs are exactly the same. They need to choose between paths and repeat work without you copy-pasting the same line a thousand times. In Java, 'if' makes the choices, loops do the repeating, and 'methods' are little named routines you can reuse — like a recipe card you pull out whenever you need it.",
    problem:
      "A program that always does the exact same thing top to bottom is nearly useless. Real programs must react ('if the balance is negative, block the payment') and repeat ('send a reminder to all 500 customers'). And if you find yourself writing the same few lines over and over, you need a way to name that chunk once and call it by name.",
    analogy:
      "if/else is a fork in the road with a signpost. A loop is a running track you go around until you decide to stop. A method is a labeled button that does a whole task when you press it.",
    explanation: [
      "if / else if / else picks a path: 'if this is true do A, otherwise do B.' The condition inside the parentheses must be true or false.",
      "A for loop repeats a known number of times: for (int i = 0; i < 5; i++) runs the body 5 times, counting i from 0 to 4.",
      "A while loop repeats as long as a condition stays true — great when you don't know the count ahead of time (like 'keep asking until the password is right').",
      "A method is a named block of code: you give it a name, optional inputs (parameters), and it can hand back a result (return value). Call it whenever you need that task done.",
      "A method's shape is: returnType name(parameters). 'int add(int a, int b)' means 'this returns an int, is called add, and takes two ints.' Use 'void' when it returns nothing.",
      "Methods are how you avoid copy-paste and keep code tidy — write the logic once, reuse it everywhere. If you change the recipe, you change it in one place.",
    ],
    code: {
      language: "text",
      source: `public class Flow {
    // A method: takes a score, returns a letter grade
    static String grade(int score) {
        if (score >= 90) return "A";
        else if (score >= 80) return "B";
        else return "C or below";
    }

    public static void main(String[] args) {
        int[] scores = {95, 82, 70};
        // A loop: check every score
        for (int i = 0; i < scores.length; i++) {
            System.out.println(scores[i] + " -> " + grade(scores[i]));
        }
    }
}
// Prints:
// 95 -> A
// 82 -> B
// 70 -> C or below`,
      explanation:
        "The grade method is written once but called three times inside the loop. That's the whole point: decide with if, repeat with a loop, reuse with a method.",
    },
    exercise: {
      prompt: "Write a loop that prints the numbers 1 through 5, each on its own line.",
      starter: `public class Counter {
    public static void main(String[] args) {
        // TODO: use a for loop to print 1, 2, 3, 4, 5
    }
}`,
      solution: `public class Counter {
    public static void main(String[] args) {
        for (int i = 1; i <= 5; i++) {
            System.out.println(i);
        }
    }
}`,
    },
    quiz: [
      {
        question: "Which loop is best when you know exactly how many times to repeat?",
        options: ["while loop", "for loop", "if statement", "method"],
        answerIndex: 1,
        explanation: "A for loop has a built-in counter, perfect for a known number of repeats.",
      },
      {
        question: "What does 'void' mean in a method signature?",
        options: [
          "The method is broken",
          "The method returns nothing",
          "The method is empty",
          "The method runs forever",
        ],
        answerIndex: 1,
        explanation: "void means the method does its job but hands back no value.",
      },
    ],
    flashcards: [
      { front: "if / else", back: "Chooses which code to run based on a true/false condition." },
      { front: "for loop", back: "Repeats a block a known number of times using a counter." },
      { front: "while loop", back: "Repeats a block as long as a condition stays true." },
      { front: "Method", back: "A named, reusable block of code that can take inputs and return a result." },
    ],
    industryUse: [
      "Uber uses conditionals to decide surge pricing: if demand is high, raise the fare",
      "Email systems at Gmail loop over your contact list to send the same message to many people",
      "Payment apps run 'if balance < amount, reject' checks on every single transaction",
    ],
    commonMistakes: [
      "Writing = instead of == inside an if condition — that assigns instead of comparing and won't behave as expected.",
      "Creating an infinite loop by forgetting to change the counter, so the condition never becomes false and the program hangs.",
    ],
    interviewQuestions: [
      "When would you choose a while loop over a for loop?",
      "What is the difference between a method's parameters and its return value?",
      "What causes an infinite loop, and how do you avoid one?",
    ],
    papers: [],
    nextUp: ["java-classes"],
    cheatsheet: [
      "if (condition) { ... } else { ... }",
      "for (int i = 0; i < n; i++) { ... }  // known count",
      "while (condition) { ... }  // unknown count",
      "Method: returnType name(params) { ... return value; }",
      "void = returns nothing; call a method by its name()",
    ],
  },

  "java-classes": {
    story:
      "Imagine a cookie cutter and the cookies it stamps out. The cutter isn't a cookie — it's the shape, the plan. Press it into dough and out come many cookies, each the same shape but able to have its own sprinkles. In Java, a 'class' is the cookie cutter (the blueprint) and an 'object' is an actual cookie (a real thing made from that blueprint). You design a BankAccount class once, then create thousands of real account objects from it, each with its own name and balance.",
    problem:
      "Real programs model real things — customers, accounts, cars, songs. Storing a customer as five loose variables (name, age, email, id, balance) is messy and easy to muddle. A class lets you bundle the data AND the actions that belong together into one tidy package, so a 'BankAccount' knows its own balance and knows how to deposit into itself.",
    analogy:
      "A class is the architect's blueprint for a house; each object is a real house built from it — same design, but one is painted blue and another red.",
    explanation: [
      "A class groups related data (called fields) with related actions (called methods) under one name. It's the blueprint.",
      "An object is a real instance made from the class, created with the 'new' keyword: BankAccount a = new BankAccount(...). Now 'a' is a living account with its own values.",
      "A constructor is a special method that runs when you say 'new' — its job is to set up the object's starting values. It has the same name as the class.",
      "Fields are usually marked 'private' so nothing outside can mess with them directly. You expose safe methods (like deposit) to change them — this is called encapsulation, and it protects your data.",
      "'this' refers to the current object — 'this.balance' means 'this particular account's balance', helping tell fields apart from parameters with the same name.",
      "Use classes whenever you have a 'thing' with both properties and behaviors. If you catch yourself passing the same bundle of variables around together, that bundle wants to be a class.",
    ],
    code: {
      language: "text",
      source: `public class BankAccount {
    private String owner;     // fields = the data
    private double balance;

    // Constructor: sets up a new account
    public BankAccount(String owner, double startingBalance) {
        this.owner = owner;
        this.balance = startingBalance;
    }

    // Method: a safe action on the data
    public void deposit(double amount) {
        balance = balance + amount;
    }

    public double getBalance() {
        return balance;
    }

    public static void main(String[] args) {
        BankAccount a = new BankAccount("Maria", 100.0);
        a.deposit(50.0);
        System.out.println(a.getBalance());  // prints 150.0
    }
}`,
      explanation:
        "'new BankAccount(...)' builds one real object using the constructor. deposit and getBalance are the only doors into the private balance, keeping it safe.",
    },
    exercise: {
      prompt: "Add a withdraw method that subtracts an amount from the balance.",
      starter: `public class BankAccount {
    private double balance = 100.0;

    // TODO: add a withdraw(double amount) method

    public double getBalance() { return balance; }
}`,
      solution: `public class BankAccount {
    private double balance = 100.0;

    public void withdraw(double amount) {
        balance = balance - amount;
    }

    public double getBalance() { return balance; }
}`,
    },
    quiz: [
      {
        question: "What is the relationship between a class and an object?",
        options: [
          "They are the same thing",
          "A class is a blueprint; an object is a real thing built from it",
          "An object is a blueprint; a class is built from it",
          "A class is faster than an object",
        ],
        answerIndex: 1,
        explanation: "Class = cookie cutter (plan). Object = the actual cookie made from it.",
      },
      {
        question: "What does a constructor do?",
        options: [
          "Destroys an object",
          "Sets up an object's starting values when you use 'new'",
          "Prints the object",
          "Compares two objects",
        ],
        answerIndex: 1,
        explanation: "The constructor runs at creation time to initialize the new object's fields.",
      },
    ],
    flashcards: [
      { front: "Class", back: "A blueprint that bundles related data (fields) and actions (methods)." },
      { front: "Object", back: "A real instance created from a class using the 'new' keyword." },
      { front: "Constructor", back: "A special method that sets up a new object's initial values." },
      { front: "Encapsulation", back: "Keeping fields private and exposing safe methods to protect the data." },
    ],
    industryUse: [
      "Spotify models a Song as a class with fields like title and duration, and methods like play()",
      "Banks model every Account and Customer as objects with private balances guarded by methods",
      "Android represents each screen button as an object built from a Button class",
    ],
    commonMistakes: [
      "Forgetting 'new' when creating an object — 'BankAccount a;' declares one but never builds it, causing a NullPointerException.",
      "Making all fields public, which lets outside code corrupt them; keep fields private and use methods instead.",
    ],
    interviewQuestions: [
      "Explain the difference between a class and an object with an example.",
      "What is encapsulation and why is it useful?",
      "What is the purpose of a constructor?",
    ],
    papers: [],
    nextUp: ["java-inheritance", "java-collections"],
    cheatsheet: [
      "Class = blueprint; object = real thing built with 'new'",
      "Fields = data; methods = actions",
      "Constructor: same name as class, runs on 'new'",
      "Keep fields private; expose safe methods (encapsulation)",
      "'this.balance' = this specific object's balance",
    ],
  },

  "java-inheritance": {
    story:
      "Think of a family. A child inherits traits from a parent — same last name, similar eyes — but adds their own personality. In Java, one class can inherit from another: a SavingsAccount is a kind of BankAccount, so it automatically gets deposit and withdraw for free, then adds its own twist (like earning interest). And an 'interface' is a promise: 'anything labeled Payable MUST have a pay() method,' without saying how. Inheritance shares real code; interfaces share a contract.",
    problem:
      "You'll often build several things that are almost the same. Copy-pasting a whole BankAccount class just to make a SavingsAccount means fixing every bug twice. Inheritance lets the new class reuse the parent's code and only add what's different. Interfaces solve a second problem: letting totally unrelated classes agree to support the same action so your program can treat them the same way.",
    analogy:
      "Inheritance is 'a SavingsAccount IS-A BankAccount' (it gets the family features). An interface is a job description: 'to be hired as a Driver you must be able to drive()' — how you drive is up to you.",
    explanation: [
      "A subclass extends a parent (superclass) with the keyword 'extends'. It automatically gets the parent's fields and methods, so you write less.",
      "The subclass can add new methods, or override (replace) a parent method to behave differently — mark overrides with @Override so Java double-checks you.",
      "'super' lets a child call the parent's version — super() in a constructor runs the parent's setup first, then the child adds its part.",
      "An interface lists method names with no bodies — just the promise. A class 'implements' an interface and must provide the real code for every method it promised.",
      "A class can extend only ONE parent (single inheritance) but can implement MANY interfaces — that's how Java stays simple while still flexible.",
      "Use inheritance for a true 'is-a' relationship with shared code; use interfaces to guarantee unrelated classes can all do the same action (like everything that can be printed, saved, or paid).",
    ],
    code: {
      language: "text",
      source: `class Account {
    protected double balance = 0;
    public void deposit(double amount) { balance += amount; }
    public double getBalance() { return balance; }
}

// SavingsAccount IS-A Account, plus interest
class SavingsAccount extends Account {
    private double rate = 0.05;
    public void addInterest() {
        balance += balance * rate;   // reuses inherited 'balance'
    }
}

public class Demo {
    public static void main(String[] args) {
        SavingsAccount s = new SavingsAccount();
        s.deposit(1000);     // inherited from Account
        s.addInterest();     // its own new ability
        System.out.println(s.getBalance());  // 1050.0
    }
}`,
      explanation:
        "SavingsAccount never re-writes deposit — it inherits it. It only adds addInterest. Change deposit once in Account and every subclass gets the fix.",
    },
    exercise: {
      prompt: "Create a class Dog that extends an Animal class and adds a bark() method that prints 'Woof!'.",
      starter: `class Animal {
    public void eat() { System.out.println("nom nom"); }
}

// TODO: make Dog extend Animal and add bark()`,
      solution: `class Animal {
    public void eat() { System.out.println("nom nom"); }
}

class Dog extends Animal {
    public void bark() { System.out.println("Woof!"); }
}`,
    },
    quiz: [
      {
        question: "What does 'extends' let a class do?",
        options: [
          "Delete the parent class",
          "Inherit the parent's fields and methods, then add its own",
          "Run faster",
          "Become an interface",
        ],
        answerIndex: 1,
        explanation: "extends creates a subclass that reuses the parent's code and can add more.",
      },
      {
        question: "How is an interface different from a normal parent class?",
        options: [
          "An interface can be extended many times but only lists method promises, not shared code",
          "An interface holds all the data",
          "There is no difference",
          "Interfaces run without the JVM",
        ],
        answerIndex: 0,
        explanation:
          "An interface is a contract of method names; a class can implement many interfaces but extend only one parent.",
      },
    ],
    flashcards: [
      { front: "Inheritance", back: "A subclass reuses a parent class's fields and methods via 'extends'." },
      { front: "Override", back: "Replacing an inherited method with a new version in the subclass." },
      { front: "super", back: "Keyword to call the parent class's constructor or method." },
      { front: "Interface", back: "A contract of method names a class promises to implement." },
    ],
    industryUse: [
      "Android's UI: a Button and a CheckBox both extend the View class, inheriting shared drawing code",
      "Payment systems define a Payable interface so credit cards, PayPal, and gift cards all support pay()",
      "Game engines have an Enemy base class that Goblin and Dragon extend, each overriding attack()",
    ],
    commonMistakes: [
      "Overusing inheritance for things that aren't truly 'is-a' — a Car is not a kind of Engine; prefer holding an Engine as a field.",
      "Forgetting @Override, so a typo creates a brand-new method instead of replacing the parent's, silently breaking behavior.",
    ],
    interviewQuestions: [
      "What is the difference between an interface and an abstract/parent class?",
      "Why does Java allow multiple interfaces but only single inheritance of classes?",
      "What does the @Override annotation do and why use it?",
    ],
    papers: [],
    nextUp: ["java-collections", "java-generics"],
    cheatsheet: [
      "class Child extends Parent  // inherit fields + methods",
      "@Override to replace a parent method",
      "super() calls the parent constructor first",
      "class C implements Payable  // must provide pay()",
      "One parent, many interfaces",
    ],
  },

  "java-collections": {
    story:
      "Your kitchen has different containers for different jobs: a stackable rack for plates (order matters), a labeled spice organizer (find cumin instantly by name), and a bag of marbles where duplicates don't matter. Java's Collections are exactly these containers for your data. A List is the ordered plate rack, a Map is the labeled spice organizer (look things up by a key), and a Set is the marble bag that quietly ignores duplicates. Pick the right container and your program gets simpler and faster.",
    problem:
      "A plain array in Java has a fixed size — decide it holds 10 items and you're stuck at 10. Real life is messier: shopping carts grow, contact lists shrink, you need to look up a phone number by a person's name in an instant. Collections give you flexible, resizable, purpose-built containers so you stop fighting fixed-size arrays.",
    analogy:
      "A List is a numbered guest list (position 0, 1, 2…). A Map is a phone book (look up a number by a name). A Set is a party where each guest can only be on the list once.",
    explanation: [
      "List (usually ArrayList) keeps items in order and allows duplicates. You add with .add(x) and fetch by position with .get(0). Great for 'a sequence of things.'",
      "Map (usually HashMap) stores key → value pairs. You put with .put(\"key\", value) and look up instantly with .get(\"key\"). Great for 'find X by its name/id.'",
      "Set (usually HashSet) stores unique items and automatically drops duplicates. Great for 'the distinct things I've seen.'",
      "Collections are generic — you say what type they hold in angle brackets: List<String> means a list of text. This keeps the wrong type out.",
      "You loop over a List or Set with an enhanced for loop: for (String name : names). For a Map you can loop over its keys or its entries.",
      "Choose by your question: 'in what order?' → List. 'look up by key?' → Map. 'are these unique?' → Set. Choosing wrong makes code slow and awkward.",
    ],
    code: {
      language: "text",
      source: `import java.util.*;

public class Collections1 {
    public static void main(String[] args) {
        // List: ordered, allows duplicates
        List<String> cart = new ArrayList<>();
        cart.add("milk");
        cart.add("eggs");
        cart.add("milk");            // duplicate is fine
        System.out.println(cart);    // [milk, eggs, milk]

        // Map: look up a value by a key
        Map<String, Integer> ages = new HashMap<>();
        ages.put("Anna", 34);
        ages.put("Ben", 29);
        System.out.println(ages.get("Anna"));  // 34

        // Set: keeps only unique items
        Set<String> tags = new HashSet<>();
        tags.add("sale");
        tags.add("sale");            // ignored
        System.out.println(tags.size());  // 1
    }
}`,
      explanation:
        "The List kept both milks, the Map found Anna's age instantly by name, and the Set refused the duplicate 'sale' — three containers, three different jobs.",
    },
    exercise: {
      prompt: "Make a Map that stores two country capitals (like France -> Paris) and print one of them.",
      starter: `import java.util.*;

public class Capitals {
    public static void main(String[] args) {
        Map<String, String> capitals = new HashMap<>();
        // TODO: add two capitals and print one
    }
}`,
      solution: `import java.util.*;

public class Capitals {
    public static void main(String[] args) {
        Map<String, String> capitals = new HashMap<>();
        capitals.put("France", "Paris");
        capitals.put("Japan", "Tokyo");
        System.out.println(capitals.get("France"));  // Paris
    }
}`,
    },
    quiz: [
      {
        question: "You need to look up a customer's balance by their account ID. Which collection fits best?",
        options: ["List", "Map", "Set", "Array"],
        answerIndex: 1,
        explanation: "A Map is built for key → value lookups: account ID (key) → balance (value).",
      },
      {
        question: "What does a Set do with duplicate items?",
        options: [
          "Stores them all",
          "Throws an error",
          "Silently keeps only one copy",
          "Sorts them",
        ],
        answerIndex: 2,
        explanation: "A Set keeps only unique items; adding a duplicate simply has no effect.",
      },
    ],
    flashcards: [
      { front: "List (ArrayList)", back: "An ordered, resizable collection that allows duplicates." },
      { front: "Map (HashMap)", back: "Stores key → value pairs for fast lookup by key." },
      { front: "Set (HashSet)", back: "A collection of unique items; duplicates are ignored." },
      { front: "Generics <>", back: "Angle brackets that declare what type a collection holds, e.g. List<String>." },
    ],
    industryUse: [
      "Twitter/X uses Sets to track the unique users who liked a post, so no one is counted twice",
      "E-commerce carts at Amazon are Lists — ordered items where you can have two of the same product",
      "Session systems use Maps to look up your logged-in data instantly by your session id",
    ],
    commonMistakes: [
      "Using a List and then scanning it top to bottom to find something by key — that's slow; a Map does it instantly.",
      "Expecting a HashSet or HashMap to keep insertion order — it doesn't; use LinkedHashSet/LinkedHashMap if order matters.",
    ],
    interviewQuestions: [
      "When would you choose a List over a Set, and vice versa?",
      "How does a HashMap find a value so quickly by its key?",
      "What is the difference between an array and an ArrayList?",
    ],
    papers: [],
    nextUp: ["java-generics", "java-exceptions"],
    cheatsheet: [
      "List<String> = ordered, allows duplicates (.add, .get)",
      "Map<K,V> = look up by key (.put, .get)",
      "Set<T> = unique items only",
      "Declare the type in <>: List<Integer>",
      "Order? List. Lookup by key? Map. Unique? Set.",
    ],
  },

  "java-exceptions": {
    story:
      "Imagine a self-checkout machine. Sometimes the barcode won't scan, or your card gets declined. A good machine doesn't explode and shut down the whole store — it says 'please try again' and keeps going. That's exception handling. Things WILL go wrong in a program: a file is missing, a user types 'abc' where a number belongs, the internet drops. Java lets you catch these problems gracefully with try/catch, so one hiccup doesn't crash your entire app.",
    problem:
      "When something unexpected happens — dividing by zero, opening a file that isn't there — Java throws an 'exception.' If nobody catches it, the whole program crashes with a scary red error. For real apps used by real people, crashing is unacceptable. You need a way to say 'try this risky thing, and if it fails, here's my calm backup plan.'",
    analogy:
      "try/catch is a safety net under a trapeze artist: try the risky flip; if you fall (an exception), the net (catch) saves you and the show continues.",
    explanation: [
      "You wrap risky code in a try block. If it fails, Java jumps to the matching catch block instead of crashing.",
      "The catch block receives the exception object (often called e), which describes what went wrong — you can log it or show a friendly message.",
      "A finally block runs no matter what — success or failure — perfect for cleanup like closing a file or a connection.",
      "You can throw your own exceptions with 'throw new IllegalArgumentException(\"...\")' to signal 'this input is invalid' — for example, refusing a negative deposit.",
      "There are two flavors: checked exceptions (Java forces you to handle them, like file errors) and unchecked ones (bugs like dividing by zero or using a null). Knowing the difference guides how careful you must be.",
      "Catch specific problems, not a blanket 'catch everything' — you want to handle a missing file differently from bad user input, and silently swallowing all errors hides real bugs.",
    ],
    code: {
      language: "text",
      source: `public class Safe {
    public static void main(String[] args) {
        String userInput = "abc";   // oops, not a number
        try {
            int number = Integer.parseInt(userInput);
            System.out.println("You typed: " + number);
        } catch (NumberFormatException e) {
            System.out.println("That wasn't a valid number. Try again!");
        } finally {
            System.out.println("Done checking input.");
        }
    }
}
// Prints:
// That wasn't a valid number. Try again!
// Done checking input.`,
      explanation:
        "Integer.parseInt fails on 'abc' and throws a NumberFormatException. The catch block turns a crash into a polite message, and finally always runs.",
    },
    exercise: {
      prompt: "Wrap a division in try/catch so dividing by zero prints a friendly message instead of crashing.",
      starter: `public class Divide {
    public static void main(String[] args) {
        int a = 10, b = 0;
        // TODO: try to print a / b, catch the error
    }
}`,
      solution: `public class Divide {
    public static void main(String[] args) {
        int a = 10, b = 0;
        try {
            System.out.println(a / b);
        } catch (ArithmeticException e) {
            System.out.println("Can't divide by zero!");
        }
    }
}`,
    },
    quiz: [
      {
        question: "What is the purpose of a try/catch block?",
        options: [
          "To make code run faster",
          "To handle errors gracefully instead of crashing",
          "To create new variables",
          "To loop over data",
        ],
        answerIndex: 1,
        explanation: "try runs risky code; catch handles the failure so the program keeps going.",
      },
      {
        question: "When does a finally block run?",
        options: [
          "Only when there's an error",
          "Only when there's no error",
          "Always — whether or not an exception happened",
          "Never",
        ],
        answerIndex: 2,
        explanation: "finally always runs, making it ideal for cleanup like closing files.",
      },
    ],
    flashcards: [
      { front: "Exception", back: "An object signaling that something went wrong during a program's run." },
      { front: "try / catch", back: "Run risky code in try; handle any failure in catch instead of crashing." },
      { front: "finally", back: "A block that always runs, used for cleanup like closing resources." },
      { front: "throw", back: "Keyword to raise your own exception, e.g. for invalid input." },
    ],
    industryUse: [
      "Banking apps catch a 'card declined' exception and show a retry screen instead of crashing your session",
      "Netflix catches network errors when a stream drops and quietly retries or lowers quality",
      "Web servers catch bad requests so one malformed user input doesn't take down the whole site",
    ],
    commonMistakes: [
      "Catching an exception and doing nothing (an empty catch block) — this hides real bugs; at least log the error.",
      "Catching the broad 'Exception' or 'Throwable' everywhere, which masks specific problems you should handle differently.",
    ],
    interviewQuestions: [
      "What is the difference between a checked and an unchecked exception?",
      "When would you use a finally block?",
      "Why is swallowing exceptions (empty catch) considered bad practice?",
    ],
    papers: [],
    nextUp: ["java-generics", "java-bank-app"],
    cheatsheet: [
      "try { risky } catch (SomeException e) { handle }",
      "finally { } always runs — great for cleanup",
      "throw new IllegalArgumentException(\"bad input\")",
      "Catch specific exceptions, not a blanket catch-all",
      "Never leave a catch block empty",
    ],
  },

  "java-generics": {
    story:
      "Imagine buying storage boxes that come in one universal design but let YOU stamp the label — 'Books,' 'Toys,' 'Photos.' Same box, and once you label it 'Books' it politely refuses toys. Java Generics are that stamp: they let one class or method work with any type you choose, while still guaranteeing you only put the right thing in. Streams are the second star here — a modern, clean way to process a whole collection ('take these numbers, keep the big ones, add them up') in a single readable line, like an assembly line for data.",
    problem:
      "Before generics, a List could hold anything, so you might accidentally drop a String into a list of numbers and only discover it when the program crashed later. And processing collections meant clunky loops with counters and temporary variables everywhere. Generics catch type mistakes early; Streams let you describe WHAT you want done to your data instead of micromanaging HOW.",
    analogy:
      "Generics are labeled containers that reject the wrong contents. A Stream is a factory conveyor belt: raw items go in one end, pass through stations (filter, transform), and finished results come out the other.",
    explanation: [
      "Generics use a placeholder type in angle brackets. List<String> means 'a list that only holds Strings' — try to add a number and Java stops you before running.",
      "You can write your own generic class: class Box<T> uses T as a stand-in for 'whatever type the user picks,' so one Box works for Strings, Integers, anything.",
      "The big win: mistakes are caught at compile time (before running), and you skip messy casting because Java already knows the type.",
      "A Stream turns a collection into a flowing pipeline. You chain steps: .filter(keep some), .map(transform each), .collect or .sum (gather the result).",
      "Streams read like plain English and don't change the original collection — they produce a new result. Great for 'from this list, give me X.'",
      "Use generics whenever you build reusable containers or methods; use streams when you're transforming or summarizing a collection and want short, readable code. For a simple one-off loop, a plain for loop is still fine.",
    ],
    code: {
      language: "text",
      source: `import java.util.*;
import java.util.stream.*;

public class GenericsStreams {
    public static void main(String[] args) {
        // Generics: this list can ONLY hold Integers
        List<Integer> nums = List.of(4, 9, 15, 22, 7);

        // Stream pipeline: keep numbers > 8, then add them up
        int total = nums.stream()
                        .filter(n -> n > 8)      // keep big ones: 9, 15, 22
                        .mapToInt(n -> n)        // treat as plain ints
                        .sum();                  // add them: 46

        System.out.println("Sum of big numbers: " + total);
    }
}
// Prints: Sum of big numbers: 46`,
      explanation:
        "List<Integer> guarantees only whole numbers go in. The stream reads top to bottom like a recipe: filter, then sum — no counter variables, no manual loop.",
    },
    exercise: {
      prompt: "Use a stream to filter a list of names down to those longer than 3 letters and print how many remain.",
      starter: `import java.util.*;
import java.util.stream.*;

public class Names {
    public static void main(String[] args) {
        List<String> names = List.of("Al", "Sara", "Jo", "Priya");
        // TODO: count names with length > 3
    }
}`,
      solution: `import java.util.*;
import java.util.stream.*;

public class Names {
    public static void main(String[] args) {
        List<String> names = List.of("Al", "Sara", "Jo", "Priya");
        long count = names.stream()
                          .filter(n -> n.length() > 3)
                          .count();
        System.out.println(count);  // 2
    }
}`,
    },
    quiz: [
      {
        question: "What problem do generics like List<String> solve?",
        options: [
          "They make lists longer",
          "They stop the wrong type from being added, catching mistakes early",
          "They make code run on more computers",
          "They sort the list automatically",
        ],
        answerIndex: 1,
        explanation: "Generics lock in the type, so a List<String> refuses non-Strings before the program runs.",
      },
      {
        question: "What does .filter() do in a stream pipeline?",
        options: [
          "Deletes the whole list",
          "Keeps only items that match a condition",
          "Adds up the numbers",
          "Sorts the items",
        ],
        answerIndex: 1,
        explanation: "filter keeps the items where your condition is true and drops the rest.",
      },
    ],
    flashcards: [
      { front: "Generics", back: "A way to write classes/methods that work with any chosen type, safely (e.g. List<String>)." },
      { front: "Type parameter <T>", back: "A placeholder for 'whatever type the user picks' in a generic class." },
      { front: "Stream", back: "A pipeline for processing a collection with steps like filter, map, and collect." },
      { front: "filter", back: "A stream step that keeps only items matching a condition." },
    ],
    industryUse: [
      "Big-data pipelines at LinkedIn use streams to filter and summarize millions of records concisely",
      "Every Java collection (used everywhere from Google to your bank) relies on generics for type safety",
      "Analytics dashboards use streams to compute totals and averages from raw event lists on the fly",
    ],
    commonMistakes: [
      "Forgetting a stream is lazy and produces a NEW result — the original list is unchanged, so you must capture the output.",
      "Cramming ten operations into one giant stream chain — break it up for readability, or use a plain loop when it's clearer.",
    ],
    interviewQuestions: [
      "What problem do generics solve compared to using raw types?",
      "What is the difference between filter and map in a stream?",
      "Are Java streams lazy or eager, and why does it matter?",
    ],
    papers: [],
    nextUp: ["java-bank-app"],
    cheatsheet: [
      "List<String> = only Strings allowed (generics)",
      "class Box<T> = your own reusable generic container",
      "stream().filter(...).map(...).collect(...)",
      "filter = keep some; map = transform each; sum/count = gather",
      "Streams don't change the original — they return a new result",
    ],
  },

  "java-bank-app": {
    story:
      "Time to build a real thing: a small banking system, right in Java. It will hold accounts, let people deposit and withdraw, refuse to hand out money that isn't there, and remember everyone by account number. This is where all your pieces click together — a class for the account, a Map to store many accounts, exceptions to block bad withdrawals, and methods that tie it into a working whole. By the end you'll have a program that behaves like the boring-but-critical software real banks actually run.",
    problem:
      "Individually, classes and collections and exceptions can feel abstract. A project forces them to cooperate: How do you store thousands of accounts? (A Map.) How do you stop someone withdrawing more than they have? (An exception.) How do you keep each balance private and safe? (Encapsulation.) Building a bank ties every concept to a real, obvious purpose.",
    analogy:
      "You've been learning individual LEGO bricks — a wheel, a door, a windshield. This project is snapping them together into an actual car you can push across the floor.",
    explanation: [
      "Model one account as a class with private fields (owner, balance) and methods (deposit, withdraw) — encapsulation keeps balances safe from outside tampering.",
      "Store all accounts in a Map<String, Account>, using the account number as the key so you can look anyone up instantly.",
      "In withdraw, check the balance first; if there isn't enough, THROW an exception rather than letting the balance go negative — that's your safety rule.",
      "A Bank class wraps the Map and offers friendly methods: openAccount, deposit, withdraw, getBalance. The outside world talks only to the Bank.",
      "Wrap risky actions in try/catch when you use the bank, so a rejected withdrawal shows a message instead of crashing.",
      "This structure — a manager class holding a collection of domain objects, guarded by exceptions — is the exact shape of countless real business applications.",
    ],
    code: {
      language: "text",
      source: `import java.util.*;

class Account {
    private String owner;
    private double balance;
    public Account(String owner) { this.owner = owner; this.balance = 0; }
    public void deposit(double amt) { balance += amt; }
    public void withdraw(double amt) {
        if (amt > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amt;
    }
    public double getBalance() { return balance; }
}

public class Bank {
    private Map<String, Account> accounts = new HashMap<>();

    public void openAccount(String id, String owner) {
        accounts.put(id, new Account(owner));
    }

    public static void main(String[] args) {
        Bank bank = new Bank();
        bank.openAccount("A1", "Maria");
        Account a = bank.accounts.get("A1");
        a.deposit(100);
        try {
            a.withdraw(150);            // too much!
        } catch (IllegalStateException e) {
            System.out.println("Blocked: " + e.getMessage());
        }
        System.out.println("Balance: " + a.getBalance());  // 100.0
    }
}`,
      explanation:
        "The Bank holds accounts in a Map keyed by id. withdraw throws when funds are short, and the try/catch turns that into a polite 'Blocked' message while the balance stays safe at 100.",
    },
    exercise: {
      prompt: "Add a transfer method idea: withdraw from one account and deposit into another. Sketch the withdraw-then-deposit steps.",
      starter: `class Account {
    private double balance = 200;
    public void deposit(double amt) { balance += amt; }
    public void withdraw(double amt) {
        // TODO: block if amt > balance, else subtract
    }
    public double getBalance() { return balance; }
}`,
      solution: `class Account {
    private double balance = 200;
    public void deposit(double amt) { balance += amt; }
    public void withdraw(double amt) {
        if (amt > balance) throw new IllegalStateException("Insufficient funds");
        balance -= amt;
    }
    public double getBalance() { return balance; }
}
// transfer(from, to, amt): from.withdraw(amt); then to.deposit(amt);`,
    },
    quiz: [
      {
        question: "Why store accounts in a Map keyed by account number?",
        options: [
          "Maps sort the accounts alphabetically",
          "So you can look up any account instantly by its number",
          "Maps use less memory than everything else",
          "It's the only collection Java has",
        ],
        answerIndex: 1,
        explanation: "A Map gives instant key → value lookup: account number → the Account object.",
      },
      {
        question: "How does the bank stop someone withdrawing more than their balance?",
        options: [
          "It ignores the request silently",
          "It throws an exception when the amount exceeds the balance",
          "It sets the balance to zero",
          "It closes the program",
        ],
        answerIndex: 1,
        explanation: "withdraw checks funds and throws an exception, which the caller catches and handles gracefully.",
      },
    ],
    flashcards: [
      { front: "Domain object", back: "A class modeling a real thing in your app, like an Account." },
      { front: "Manager class", back: "A class (like Bank) that holds a collection of domain objects and offers operations on them." },
      { front: "Guard clause", back: "An early check (like 'if amt > balance, throw') that stops invalid actions." },
      { front: "Map<String, Account>", back: "Stores many accounts, each found instantly by its id key." },
    ],
    miniProject: {
      title: "Mini Bank in Java",
      brief: "Build a small but working bank with accounts, deposits, withdrawals, and safety checks.",
      steps: [
        "Write an Account class with private owner and balance, plus deposit and withdraw methods.",
        "Make withdraw throw an exception when funds are insufficient.",
        "Create a Bank class holding a Map<String, Account>, with openAccount and getBalance methods.",
        "In main, open two accounts, deposit, and try an over-withdrawal wrapped in try/catch.",
        "Bonus: add a transfer method that withdraws from one account and deposits into another.",
      ],
    },
    industryUse: [
      "Core banking systems at institutions like JPMorgan are, at heart, accounts + a store + strict safety rules",
      "Payment platforms like Stripe model balances and transactions with the same class-and-guard pattern",
      "Any e-wallet (PayPal, Google Pay) uses an account object plus checks to prevent overspending",
    ],
    commonMistakes: [
      "Letting a balance go negative by forgetting the funds check — always guard before subtracting.",
      "Exposing the Map or balance directly so outside code can change it — keep them private and go through Bank methods.",
    ],
    interviewQuestions: [
      "How would you design classes for a simple banking system?",
      "How do you ensure an account balance can never go negative?",
      "Where would you use a Map versus a List in this design?",
    ],
    papers: [],
    nextUp: ["java-classes", "java-exceptions"],
    cheatsheet: [
      "Account class: private fields + deposit/withdraw methods",
      "Bank class: Map<String, Account> keyed by account id",
      "withdraw: if (amt > balance) throw ...",
      "Wrap risky calls in try/catch",
      "Keep everything private; talk through methods",
    ],
  },
};
