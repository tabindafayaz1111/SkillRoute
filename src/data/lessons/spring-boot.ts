import type { LessonBody } from "@/types";

export const springBoot: Record<string, LessonBody> = {
  "spring-intro": {
    story:
      "Picture opening a restaurant. Before you cook a single meal, you'd normally have to build the kitchen, wire the electricity, plumb the sinks, and pass a safety inspection — weeks of work before anyone tastes your food. Spring Boot is like renting a fully-built, inspected, ready-to-cook kitchen. You walk in, and within minutes you're actually making the dish you care about. It takes plain Java and turns it into a running web application with almost no setup fuss.",
    problem:
      "Java is powerful, but building a real web backend by hand means wiring together dozens of libraries, servers, and config files — and getting any one wrong means nothing runs. Beginners drown in setup before writing a line of useful code. Spring Boot handles all that plumbing so you can focus on your actual app.",
    analogy:
      "Plain Spring is a box of car parts; Spring Boot is the same car already assembled, fuelled, and idling in your driveway — just get in and drive.",
    explanation: [
      "Spring Boot is a framework: a big toolkit of pre-written Java code that handles the boring, repetitive parts of building a web backend (a program that answers requests over the internet).",
      "Its superpower is 'auto-configuration' — it looks at what you added to your project and sensibly sets everything up for you, so you barely write any configuration.",
      "It bundles a web server (Tomcat) inside your app, so you just run your program and it's live — no separate server to install and manage.",
      "You use it when you need a serious backend: an API for a phone app, an online store, a banking service — anything that must be reliable and handle real users.",
      "You might NOT reach for it for a tiny one-file script or a simple static website — that's overkill, like renting a commercial kitchen to make toast.",
      "It's the industry standard in the Java world: huge companies trust it, so learning it opens a lot of real jobs.",
    ],
    code: {
      language: "text",
      source: `// This tiny class is a complete, runnable Spring Boot app.
@SpringBootApplication
public class TaskApp {
    public static void main(String[] args) {
        SpringApplication.run(TaskApp.class, args);
    }
}
// Run it and a full web server starts on http://localhost:8080`,
      explanation:
        "The @SpringBootApplication annotation (a tag starting with @ that gives Java extra instructions) tells Spring Boot to wake up, auto-configure everything, and start a web server — all from these few lines.",
    },
    quiz: [
      {
        question: "What is the main thing Spring Boot does for you?",
        options: [
          "It writes your business logic automatically",
          "It handles the setup and plumbing so you can focus on your app",
          "It replaces the Java language",
          "It hosts your app on the internet for free",
        ],
        answerIndex: 1,
        explanation:
          "Spring Boot's job is auto-configuration and bundled tooling — it removes the tedious setup, not the actual thinking about your app.",
      },
      {
        question: "Why does a basic Spring Boot app not need a separately installed web server?",
        options: [
          "It doesn't use a web server at all",
          "It ships with a server (Tomcat) built right in",
          "It borrows your browser's server",
          "Servers are illegal in Java",
        ],
        answerIndex: 1,
        explanation:
          "Spring Boot embeds a web server inside the app, so running your program is enough to make it live.",
      },
    ],
    flashcards: [
      { front: "Framework", back: "A toolkit of pre-written code that handles common tasks so you don't rebuild them yourself." },
      { front: "Spring Boot", back: "A Java framework that auto-configures a web backend with almost no setup." },
      { front: "Auto-configuration", back: "Spring Boot inspecting your project and sensibly wiring everything up for you." },
      { front: "Annotation", back: "A tag starting with @ that gives Java/Spring extra instructions about a class or method." },
    ],
    industryUse: [
      "Netflix uses Spring Boot for many of its backend microservices that stream to millions of viewers",
      "Banks and payment companies build secure transaction APIs on Spring Boot",
      "Ticketmaster and countless online stores run their order and inventory backends on it",
    ],
    commonMistakes: [
      "Confusing Spring with Spring Boot — Spring is the underlying toolkit; Spring Boot is the easy, pre-assembled way to use it.",
      "Thinking you must configure everything by hand — beginners often fight the auto-configuration instead of trusting the sensible defaults.",
    ],
    interviewQuestions: [
      "What problem does Spring Boot solve compared to plain Spring?",
      "What does the @SpringBootApplication annotation do?",
      "Why is having an embedded server convenient?",
    ],
    papers: [],
    nextUp: ["spring-setup", "spring-di"],
    cheatsheet: [
      "Spring Boot = Java web backend with the setup done for you",
      "@SpringBootApplication = start here",
      "Web server (Tomcat) is built in — just run the app",
      "Runs on http://localhost:8080 by default",
      "Industry standard for serious Java backends",
    ],
  },

  "spring-setup": {
    story:
      "Imagine you're about to bake, and someone hands you a box where the flour, sugar, and eggs are already measured into the right bowls, and the recipe card is on top. You don't hunt for ingredients — you start mixing. Spring Boot gives you exactly that: a website called Spring Initializr fills a starter project with the right folders and files. You download it, open it, and you already have a running app.",
    problem:
      "A blank Java project is intimidating — where do files go? What libraries do you need? Which button runs it? Without a clear starting structure, beginners waste hours lost before writing real code. A standard project layout means everyone (and every tool) knows exactly where things live.",
    analogy:
      "It's like moving into a house where the kitchen, bedroom, and bathroom are already built and labelled — you just bring your furniture, not a bag of bricks.",
    explanation: [
      "You generate a starter project at start.spring.io (the 'Spring Initializr') by picking a few options and clicking Generate — it downloads a ready-to-run project.",
      "You choose 'dependencies' — pre-packaged features like 'Spring Web' (for building APIs) and 'Spring Data JPA' (for databases). Adding one is like ticking a box to include a whole capability.",
      "A build tool (Maven or Gradle) manages those dependencies for you — it downloads the right code libraries so you never hunt for them by hand.",
      "The key folders: 'src/main/java' holds your Java code, and 'src/main/resources' holds settings like application.properties (a simple text file of app settings).",
      "You run the app by starting the class with the main method — your IDE has a green Run button, or you type a build-tool command in the terminal.",
      "Use this every single time you start a Spring Boot project — even pros never build the structure by hand.",
    ],
    code: {
      language: "text",
      source: `// A typical Spring Boot project layout:
src/
  main/
    java/com/example/taskapp/
      TaskApp.java          // the main class that starts everything
    resources/
      application.properties  // app settings live here
pom.xml                     // Maven's list of dependencies

// application.properties example:
server.port=8080
spring.application.name=task-manager`,
      explanation:
        "pom.xml is the shopping list of libraries your app needs; application.properties is a plain text file where you tweak settings like which port the app runs on.",
    },
    exercise: {
      prompt:
        "You want your app to run on port 9090 instead of the default 8080. Add the correct line to application.properties.",
      starter: `# application.properties
spring.application.name=task-manager
# TODO: set the server port to 9090`,
      solution: `# application.properties
spring.application.name=task-manager
server.port=9090`,
    },
    quiz: [
      {
        question: "What is Spring Initializr (start.spring.io) used for?",
        options: [
          "Writing your business logic for you",
          "Generating a ready-to-run starter project with the folders and dependencies you pick",
          "Hosting your finished app online",
          "Teaching you Java syntax",
        ],
        answerIndex: 1,
        explanation:
          "Spring Initializr scaffolds a correctly-structured project so you can start coding immediately.",
      },
      {
        question: "What does a 'dependency' like 'Spring Web' represent?",
        options: [
          "A bug in your code",
          "A pre-packaged feature/library you add to your project",
          "A folder for images",
          "A type of database",
        ],
        answerIndex: 1,
        explanation:
          "A dependency is a ready-made bundle of capability; the build tool downloads and manages it for you.",
      },
    ],
    flashcards: [
      { front: "Spring Initializr", back: "The website start.spring.io that generates a ready-to-run Spring Boot starter project." },
      { front: "Dependency", back: "A pre-packaged feature/library you add to a project (e.g. Spring Web)." },
      { front: "Maven / Gradle", back: "Build tools that download and manage your project's dependencies." },
      { front: "application.properties", back: "A plain text file holding your app's settings, like the server port." },
    ],
    miniProject: {
      title: "Generate Your First Spring Boot App",
      brief: "Create and run a fresh Spring Boot project from scratch, then change one setting.",
      steps: [
        "Go to start.spring.io, choose Maven and Java, and add the 'Spring Web' dependency.",
        "Click Generate, unzip the download, and open it in your IDE (like IntelliJ or VS Code).",
        "Find the class with the main method and click Run — watch the server start.",
        "Open application.properties and change server.port, then re-run to confirm the new port.",
      ],
    },
    industryUse: [
      "Startups spin up new microservices in minutes using Spring Initializr instead of hand-building structure",
      "Enterprise teams standardize on Maven/Gradle so builds are identical on every developer's machine",
      "Companies keep environment settings (dev vs production) in properties files to switch behavior safely",
    ],
    commonMistakes: [
      "Putting Java files outside src/main/java — Spring won't find them; keep code in the right folder.",
      "Forgetting to add a needed dependency (like Spring Web) and then wondering why web features don't exist.",
    ],
    interviewQuestions: [
      "How do you start a new Spring Boot project and what does Spring Initializr give you?",
      "What is the difference between Maven and Gradle at a high level?",
      "Where do application settings live in a Spring Boot project?",
    ],
    papers: [],
    nextUp: ["spring-di", "spring-controllers"],
    cheatsheet: [
      "Start projects at start.spring.io",
      "Add features as 'dependencies' (Spring Web, Spring Data JPA)",
      "Java code -> src/main/java",
      "Settings -> src/main/resources/application.properties",
      "Run the class with the main method to launch",
    ],
  },

  "spring-di": {
    story:
      "Imagine every time you wanted coffee, you had to grow the beans, build the machine, and wire the electricity yourself. Exhausting. Instead, at a good office, coffee just appears when you ask — someone else prepared the machine and hands it to you ready to use. Dependency Injection is that 'someone': instead of your code building the tools it needs, Spring builds them and hands them over, ready to use.",
    problem:
      "Real programs are made of many parts that rely on each other — a controller needs a service, which needs a database helper. If each part builds its own helpers, the code becomes a tangled knot that's hard to test and change. We need a cleaner way to connect the pieces.",
    analogy:
      "It's like a rental service that delivers exactly the tool you need, fully assembled, so you never build your own drill just to hang one picture.",
    explanation: [
      "A 'dependency' here means: a helper object your class needs to do its job (e.g. a controller depends on a service).",
      "Normally you'd write 'new MyService()' to build that helper yourself. Dependency Injection means Spring builds it and gives it to you instead.",
      "You mark a class with an annotation like @Service or @Component, and Spring creates one shared copy of it — this copy is called a 'bean' and lives in a container Spring manages.",
      "You then ask for the helper by putting it in your constructor (the method that builds your class). Spring sees it and 'injects' the right bean automatically.",
      "Why bother? It makes code loosely coupled — parts don't hard-wire themselves to each other, so you can swap or fake a part (great for testing) without rewriting everything.",
      "Use it for connecting your app's real components. You wouldn't inject tiny throwaway values like a single number — that's just a normal variable.",
    ],
    code: {
      language: "text",
      source: `// Spring builds this and stores it as a "bean"
@Service
public class TaskService {
    public String greeting() { return "You have 3 tasks"; }
}

@RestController
public class TaskController {
    private final TaskService service;

    // Spring INJECTS the TaskService here automatically
    public TaskController(TaskService service) {
        this.service = service;
    }
}`,
      explanation:
        "You never wrote 'new TaskService()' — Spring saw the constructor needs a TaskService, found the bean it built, and handed it over. That's dependency injection.",
    },
    exercise: {
      prompt:
        "A TaskController needs an EmailService. Add a constructor so Spring can inject it (constructor injection).",
      starter: `@RestController
public class TaskController {
    private final EmailService email;

    // TODO: add a constructor that receives EmailService
}`,
      solution: `@RestController
public class TaskController {
    private final EmailService email;

    public TaskController(EmailService email) {
        this.email = email;
    }
}`,
    },
    quiz: [
      {
        question: "What does 'dependency injection' mean in Spring?",
        options: [
          "You inject bugs into your code",
          "Spring creates the helper objects your class needs and hands them to it",
          "You copy code from one class to another",
          "The database sends data to your app",
        ],
        answerIndex: 1,
        explanation:
          "Instead of building helpers yourself with 'new', Spring builds them and injects them into your class.",
      },
      {
        question: "What is a 'bean' in Spring?",
        options: [
          "A type of database",
          "An object Spring creates and manages for you",
          "A configuration file",
          "A Java keyword",
        ],
        answerIndex: 1,
        explanation:
          "A bean is simply an object that Spring builds, stores in its container, and injects where needed.",
      },
      {
        question: "Why is dependency injection useful?",
        options: [
          "It makes the app run on more ports",
          "It keeps parts loosely coupled and easy to test or swap",
          "It deletes unused code automatically",
          "It encrypts your data",
        ],
        answerIndex: 1,
        explanation:
          "Loose coupling means you can replace or fake a component without rewriting everything that uses it — a huge win for testing.",
      },
    ],
    flashcards: [
      { front: "Dependency", back: "A helper object that a class needs to do its job." },
      { front: "Dependency Injection", back: "Spring creating the helpers a class needs and handing them to it, instead of the class building them." },
      { front: "Bean", back: "An object Spring creates, manages, and injects where needed." },
      { front: "@Service / @Component", back: "Annotations that tell Spring to create and manage a class as a bean." },
    ],
    industryUse: [
      "Every large Spring app at companies like Netflix uses DI to wire hundreds of components cleanly",
      "Banking systems swap a real payment gateway for a fake one in tests, thanks to injection",
      "Teams share a single database-connection bean across the whole app instead of duplicating it",
    ],
    commonMistakes: [
      "Writing 'new MyService()' yourself instead of letting Spring inject it — you lose all the benefits of DI.",
      "Forgetting the @Service/@Component annotation, so Spring never creates the bean and injection fails.",
    ],
    interviewQuestions: [
      "Explain dependency injection in your own words with an example.",
      "What is a Spring bean and where does it live?",
      "Why is constructor injection generally preferred over field injection?",
    ],
    papers: [],
    nextUp: ["spring-controllers", "spring-services"],
    cheatsheet: [
      "DI = Spring builds your helpers and hands them to you",
      "Bean = an object Spring creates and manages",
      "Mark helpers with @Service or @Component",
      "Ask for helpers in the constructor",
      "Result: loosely coupled, testable code",
    ],
  },

  "spring-controllers": {
    story:
      "Think of a hotel front desk. Guests walk up and say 'I'd like room 204' or 'check me out.' The receptionist listens, understands each request, and responds. A REST controller is your app's front desk: it listens for requests coming over the internet — like 'GET me all tasks' or 'CREATE this new task' — and sends back an answer. It's the doorway between the outside world and your code.",
    problem:
      "Your app's logic lives inside Java, but users (phone apps, websites, other services) live out on the internet. Something has to receive their requests, figure out what they want, and reply. Without that doorway, your app is a locked building nobody can enter.",
    analogy:
      "A controller is a switchboard operator: each incoming call (request) to a specific extension (URL) gets routed to the right person (method) who answers it.",
    explanation: [
      "REST is just a popular style of talking over the web using URLs (web addresses) plus verbs: GET (read), POST (create), PUT (update), DELETE (remove).",
      "You mark a class @RestController so Spring knows it handles web requests and turns your return values into a response automatically.",
      "Each method gets a @GetMapping, @PostMapping, etc., with a path like '/tasks' — that path is the address people hit to reach that method.",
      "'@PathVariable' grabs a value from the URL (like the 204 in /tasks/204). '@RequestBody' reads the data someone sent you (like a new task's details).",
      "Whatever your method returns (an object, a list) gets automatically turned into JSON — the simple text format apps use to exchange data.",
      "Keep controllers thin: they should receive the request and pass the real work to a service. Don't cram business logic here.",
    ],
    code: {
      language: "text",
      source: `@RestController
@RequestMapping("/tasks")   // every path below starts with /tasks
public class TaskController {

    @GetMapping            // handles GET /tasks
    public List<Task> all() {
        return List.of(new Task("Buy milk"));
    }

    @GetMapping("/{id}")   // handles GET /tasks/42
    public Task one(@PathVariable Long id) {
        return new Task("Task number " + id);
    }

    @PostMapping           // handles POST /tasks
    public Task create(@RequestBody Task task) {
        return task;       // returned as JSON automatically
    }
}`,
      explanation:
        "Each method maps to a URL + verb. @PathVariable pulls the id out of the address; @RequestBody reads the incoming task data; the return value becomes JSON.",
    },
    exercise: {
      prompt:
        "Add a method that handles DELETE /tasks/{id} and takes the id from the URL. Just return a confirmation string.",
      starter: `@RestController
@RequestMapping("/tasks")
public class TaskController {

    // TODO: handle DELETE /tasks/{id}
}`,
      solution: `@RestController
@RequestMapping("/tasks")
public class TaskController {

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        return "Deleted task " + id;
    }
}`,
    },
    quiz: [
      {
        question: "What is the job of a REST controller?",
        options: [
          "To store data in the database",
          "To receive web requests and send back responses",
          "To style the website's buttons",
          "To manage server memory",
        ],
        answerIndex: 1,
        explanation:
          "A controller is the doorway: it listens for incoming requests to certain URLs and returns responses.",
      },
      {
        question: "Which HTTP verb is normally used to CREATE a new item?",
        options: ["GET", "POST", "DELETE", "PATCH"],
        answerIndex: 1,
        explanation:
          "POST is the standard verb for creating new resources; GET reads, PUT/PATCH update, DELETE removes.",
      },
      {
        question: "What does @PathVariable do?",
        options: [
          "Reads a value out of the URL, like the 42 in /tasks/42",
          "Connects to the database",
          "Creates a new bean",
          "Sets the server port",
        ],
        answerIndex: 0,
        explanation:
          "@PathVariable captures a piece of the URL path and hands it to your method as a parameter.",
      },
    ],
    flashcards: [
      { front: "REST controller", back: "A class that receives web requests at certain URLs and returns responses." },
      { front: "HTTP verbs", back: "GET (read), POST (create), PUT/PATCH (update), DELETE (remove)." },
      { front: "@GetMapping / @PostMapping", back: "Annotations that link a method to a URL path and HTTP verb." },
      { front: "@RequestBody", back: "Reads the data a client sent (e.g. a new task) into a Java object." },
      { front: "JSON", back: "The simple text format apps use to exchange data over the web." },
    ],
    miniProject: {
      title: "A Greetings API",
      brief: "Build a tiny controller that greets people by name over the web.",
      steps: [
        "Create a @RestController class in your Spring Boot project.",
        "Add a @GetMapping('/hello/{name}') method taking a @PathVariable name.",
        "Return the string 'Hello, ' + name.",
        "Run the app and visit http://localhost:8080/hello/Sam in your browser.",
        "Add a POST endpoint that echoes back a @RequestBody message.",
      ],
    },
    industryUse: [
      "Instagram's mobile app talks to REST controllers to load your feed and post photos",
      "Uber uses REST endpoints so the rider app can request trips and track drivers",
      "Weather and maps services expose REST APIs that thousands of other apps call",
    ],
    commonMistakes: [
      "Stuffing business logic and database code inside the controller — keep it thin and delegate to a service.",
      "Mixing up verbs, like using GET to create data — follow REST conventions so your API is predictable.",
    ],
    interviewQuestions: [
      "What is the difference between @PathVariable and @RequestBody?",
      "What do the main HTTP verbs mean in a REST API?",
      "Why should controllers stay thin?",
    ],
    papers: [],
    nextUp: ["spring-services", "spring-jpa"],
    cheatsheet: [
      "@RestController = your app's front desk",
      "@GetMapping / @PostMapping / @PutMapping / @DeleteMapping map URLs to methods",
      "@PathVariable reads from the URL; @RequestBody reads sent data",
      "Return values become JSON automatically",
      "Keep controllers thin — delegate work to services",
    ],
  },

  "spring-services": {
    story:
      "In a restaurant, the waiter takes your order and brings your food, but the waiter doesn't cook. The kitchen does. A service is your app's kitchen: it holds the real work — the rules, the calculations, the decisions — while the controller (the waiter) just takes requests and delivers results. Separating them keeps your app organized and calm.",
    problem:
      "If you jam all your logic into the controller, it becomes a giant, tangled method that's impossible to test or reuse. And the same logic often needs to run from more than one place. You need a clean home for your app's actual brains.",
    analogy:
      "The controller is the waiter and the service is the chef — you never want the waiter cooking at the table or the chef taking orders in the dining room.",
    explanation: [
      "A service is a plain Java class marked @Service where your 'business logic' lives — the real rules of what your app does (e.g. 'a task can't be completed twice').",
      "Controllers stay thin and just call the service; the service does the heavy lifting and returns a result.",
      "Because it's a bean, Spring injects the service into any controller (or other service) that needs it — so the same logic is reused everywhere, written once.",
      "This separation means you can test the service on its own, without any web requests — you just call its methods directly.",
      "Services often depend on repositories (the database helpers you'll meet next) — the service decides what to do, the repository fetches or saves the data.",
      "Rule of thumb: if it's a decision or a rule, it belongs in a service; if it's about receiving a web request, it belongs in a controller.",
    ],
    code: {
      language: "text",
      source: `@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();

    public Task add(Task task) {
        if (task.getTitle().isBlank())
            throw new IllegalArgumentException("Title required");
        tasks.add(task);
        return task;
    }

    public List<Task> findAll() { return tasks; }
}

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService service;   // injected by Spring
    public TaskController(TaskService service) { this.service = service; }

    @PostMapping
    public Task create(@RequestBody Task task) {
        return service.add(task);        // controller just delegates
    }
}`,
      explanation:
        "The rule ('title required') lives in the service, not the controller. The controller simply hands the request to service.add and returns the result.",
    },
    exercise: {
      prompt:
        "Add a method 'count()' to TaskService that returns how many tasks exist, and imagine the controller calling it.",
      starter: `@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();
    // TODO: add a count() method returning the number of tasks
}`,
      solution: `@Service
public class TaskService {
    private final List<Task> tasks = new ArrayList<>();

    public int count() {
        return tasks.size();
    }
}`,
    },
    quiz: [
      {
        question: "What kind of code belongs in a service?",
        options: [
          "The app's business logic — its real rules and decisions",
          "The CSS styling",
          "The list of dependencies",
          "The server port setting",
        ],
        answerIndex: 0,
        explanation:
          "Services hold the business logic; controllers just receive requests and delegate to services.",
      },
      {
        question: "Why separate controllers from services?",
        options: [
          "To make the app slower on purpose",
          "So logic can be tested and reused without web requests, keeping code organized",
          "Because Java requires exactly two classes",
          "To hide the code from other developers",
        ],
        answerIndex: 1,
        explanation:
          "Separation keeps controllers thin and lets you test and reuse the real logic independently.",
      },
    ],
    flashcards: [
      { front: "Service", back: "A @Service class holding the app's business logic — its rules and decisions." },
      { front: "Business logic", back: "The real rules of what your app does (e.g. a task can't be completed twice)." },
      { front: "Thin controller", back: "A controller that just receives requests and delegates the work to a service." },
      { front: "Separation of concerns", back: "Keeping each part (controller, service, repository) focused on one job." },
    ],
    industryUse: [
      "E-commerce sites keep pricing and discount rules in services so checkout and cart both reuse them",
      "Banks isolate transfer and fraud-check logic in services that can be tested without any web layer",
      "SaaS apps like project trackers put permission rules in services shared across many endpoints",
    ],
    commonMistakes: [
      "Putting database queries and rules directly in the controller — move them into a service.",
      "Creating a service but still duplicating its logic elsewhere — call the service instead of copy-pasting.",
    ],
    interviewQuestions: [
      "What is the responsibility of a service versus a controller?",
      "Why does putting business logic in services make testing easier?",
      "How does a controller get access to a service?",
    ],
    papers: [],
    nextUp: ["spring-jpa", "spring-validation"],
    cheatsheet: [
      "@Service = home of your business logic",
      "Controllers stay thin and call services",
      "Services are beans, injected where needed",
      "Test services directly, no web request required",
      "Rule/decision -> service; web request -> controller",
    ],
  },

  "spring-jpa": {
    story:
      "Imagine keeping customer records on paper. To find one, you flip through hundreds of pages by hand. A database is the electronic filing cabinet that stores your data safely. But talking to it usually means writing SQL (a special query language). JPA is a translator: you work with normal Java objects like 'Task', and it quietly writes the SQL and files everything for you. You save a Java object; a row appears in the database — no SQL needed.",
    problem:
      "Data has to be saved somewhere permanent, or it vanishes the moment your app restarts. Writing raw database code by hand for every save, load, and search is tedious and error-prone. We want to store and fetch Java objects without becoming SQL experts.",
    analogy:
      "JPA is a bilingual assistant: you speak Java ('save this Task'), and it speaks fluent database on your behalf, handling all the paperwork.",
    explanation: [
      "A database stores data permanently in tables (like spreadsheets: rows and columns). JPA lets each Java class map to a table and each object to a row.",
      "You mark a class @Entity and give it an @Id field — that tells JPA 'this class should be saved as a database table, and this field is its unique identifier.'",
      "A 'repository' is Spring's ready-made database helper. You just declare an interface extending JpaRepository and Spring writes all the code to save, find, update, and delete for you.",
      "You get methods for free: save(), findById(), findAll(), deleteById() — no SQL required for the common stuff.",
      "You can invent query methods just by naming them, like findByCompleted(true) — Spring reads the name and generates the query automatically. Magic, but real.",
      "Use JPA for standard app data. For extremely complex or performance-critical queries you may still drop down to hand-written SQL — but that's rare early on.",
    ],
    code: {
      language: "text",
      source: `@Entity                         // this class becomes a database table
public class Task {
    @Id
    @GeneratedValue               // database assigns the id automatically
    private Long id;
    private String title;
    private boolean completed;
    // getters and setters ...
}

// Declare an interface — Spring writes the implementation for you
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByCompleted(boolean completed);  // auto-generated query
}

// Using it in a service:
repository.save(new Task());     // INSERT row
repository.findAll();            // SELECT all rows
repository.findByCompleted(true);// SELECT where completed = true`,
      explanation:
        "You never wrote SQL. @Entity turns Task into a table, JpaRepository hands you save/find/delete for free, and naming a method findByCompleted auto-generates the matching query.",
    },
    exercise: {
      prompt:
        "Add a repository method that finds all tasks with a given title. Name it so Spring auto-generates the query.",
      starter: `public interface TaskRepository extends JpaRepository<Task, Long> {
    // TODO: find all tasks by title
}`,
      solution: `public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTitle(String title);
}`,
    },
    quiz: [
      {
        question: "What does JPA let you avoid writing for common operations?",
        options: [
          "Java classes",
          "SQL queries",
          "Controllers",
          "The main method",
        ],
        answerIndex: 1,
        explanation:
          "JPA maps Java objects to database rows so you rarely write SQL for save, find, and delete.",
      },
      {
        question: "What does marking a class @Entity mean?",
        options: [
          "It becomes a REST controller",
          "It should be stored as a database table, with rows as objects",
          "It runs the web server",
          "It becomes a configuration file",
        ],
        answerIndex: 1,
        explanation:
          "@Entity tells JPA this class maps to a database table and each instance is a row.",
      },
      {
        question: "How do you get save(), findAll(), and deleteById() methods?",
        options: [
          "Write them all by hand",
          "Declare an interface extending JpaRepository — Spring provides them",
          "Copy them from another project",
          "They come from the controller",
        ],
        answerIndex: 1,
        explanation:
          "Extending JpaRepository gives you the standard CRUD methods automatically, no implementation needed.",
      },
    ],
    flashcards: [
      { front: "Database", back: "Permanent storage that keeps data in tables (rows and columns) even after the app restarts." },
      { front: "JPA", back: "A tool that maps Java objects to database rows so you rarely write SQL." },
      { front: "@Entity / @Id", back: "Mark a class as a database table and its unique-identifier field." },
      { front: "Repository", back: "Spring's ready-made database helper that gives you save/find/delete for free." },
      { front: "Derived query", back: "A method like findByCompleted(true) whose query Spring generates from the method name." },
    ],
    miniProject: {
      title: "Persist Your Tasks",
      brief: "Give your task app a real database so tasks survive a restart.",
      steps: [
        "Add the 'Spring Data JPA' and 'H2 Database' dependencies (H2 is a simple built-in database).",
        "Create a Task @Entity with an @Id field.",
        "Declare a TaskRepository interface extending JpaRepository.",
        "In your service, call repository.save() and repository.findAll().",
        "Run the app, add a task, restart, and confirm the task is still there.",
      ],
    },
    industryUse: [
      "Airlines store bookings and passenger records through JPA-backed repositories",
      "Online stores like Shopify merchants persist products, orders, and inventory with JPA",
      "HR and payroll systems use repositories to save employee records without hand-written SQL",
    ],
    commonMistakes: [
      "Forgetting the @Id field — every @Entity needs a unique identifier or JPA can't manage it.",
      "Misspelling a derived query method (e.g. findByComplete instead of findByCompleted) — the name must match the field exactly.",
    ],
    interviewQuestions: [
      "What is JPA and what problem does it solve?",
      "What do you get by extending JpaRepository?",
      "How do derived query methods like findByTitle work?",
    ],
    papers: [],
    nextUp: ["spring-validation", "spring-project-app"],
    cheatsheet: [
      "@Entity = class becomes a database table",
      "@Id = the unique identifier field",
      "extends JpaRepository = free save/findAll/findById/deleteById",
      "findByX method names auto-generate queries",
      "JPA writes the SQL so you don't have to",
    ],
  },

  "spring-validation": {
    story:
      "Picture a bouncer at a club door. Before anyone gets in, they check IDs and turn away anyone underage or on the no-entry list. Validation is your app's bouncer: before bad data gets into your system, it checks the request and politely rejects anything that's missing, empty, or nonsense. And when something does go wrong, error handling makes sure your app replies with a clear, friendly message instead of an ugly crash page.",
    problem:
      "Users and other apps will send you incomplete, empty, or garbage data — a task with no title, an email with no '@'. If you trust everything blindly, your database fills with junk and your app breaks in confusing ways. You need a gatekeeper and a graceful way to say 'no, and here's why.'",
    analogy:
      "Validation is a form that won't submit until you've filled the required boxes; error handling is the helpful note that says exactly which box you missed.",
    explanation: [
      "Validation means checking incoming data against rules before you use it — 'title must not be blank', 'age must be positive'.",
      "You add simple annotations to your data class, like @NotBlank on a title or @Email on an email field, then put @Valid in the controller to switch the checks on.",
      "If a rule fails, Spring automatically rejects the request with a 400 'Bad Request' response — the data never reaches your service.",
      "Error handling means catching problems and turning them into clear responses instead of a raw stack trace (the scary wall of red text).",
      "You use @ExceptionHandler or a @ControllerAdvice class to say 'when this kind of error happens, respond with this friendly message and status code.'",
      "Always validate at the edge (the controller) so bad data is stopped early — never assume the outside world sends you clean input.",
    ],
    code: {
      language: "text",
      source: `public class Task {
    @NotBlank(message = "Title is required")   // must not be empty
    private String title;

    @Size(max = 200)                           // at most 200 characters
    private String notes;
}

@RestController
@RequestMapping("/tasks")
public class TaskController {

    @PostMapping
    public Task create(@Valid @RequestBody Task task) {  // @Valid runs the checks
        return task;
    }
}

// Turn errors into a clean message instead of a crash:
@ExceptionHandler(MethodArgumentNotValidException.class)
public ResponseEntity<String> handle() {
    return ResponseEntity.badRequest().body("Please check your input");
}`,
      explanation:
        "@NotBlank and @Size define the rules; @Valid tells Spring to enforce them; the @ExceptionHandler converts a failed check into a friendly 'Bad Request' message.",
    },
    exercise: {
      prompt:
        "Add a validation rule so a Task's title must be between 1 and 100 characters. Use the @Size annotation.",
      starter: `public class Task {
    // TODO: title must be 1 to 100 characters
    private String title;
}`,
      solution: `public class Task {
    @Size(min = 1, max = 100)
    private String title;
}`,
    },
    quiz: [
      {
        question: "What is validation's job?",
        options: [
          "To make the app faster",
          "To check incoming data against rules before the app uses it",
          "To style the response",
          "To store data in the database",
        ],
        answerIndex: 1,
        explanation:
          "Validation is the gatekeeper that stops bad, missing, or invalid data before it enters your system.",
      },
      {
        question: "What does @Valid do in a controller method?",
        options: [
          "Turns the class into an entity",
          "Switches on the validation checks for the incoming data",
          "Connects to the database",
          "Starts the web server",
        ],
        answerIndex: 1,
        explanation:
          "@Valid tells Spring to actually run the validation annotations (like @NotBlank) on the incoming object.",
      },
      {
        question: "Why use error handling (like @ExceptionHandler)?",
        options: [
          "To hide all errors from developers",
          "To respond with clear messages instead of an ugly crash/stack trace",
          "To make the app crash faster",
          "To speed up the database",
        ],
        answerIndex: 1,
        explanation:
          "Error handling converts failures into clean, friendly responses with the right status code.",
      },
    ],
    flashcards: [
      { front: "Validation", back: "Checking incoming data against rules before the app uses it." },
      { front: "@NotBlank / @Size / @Email", back: "Annotations that define validation rules on a data field." },
      { front: "@Valid", back: "Placed in a controller to switch on validation of the incoming object." },
      { front: "@ExceptionHandler", back: "Catches an error and returns a clear response instead of a crash." },
      { front: "400 Bad Request", back: "The HTTP status meaning 'your data was invalid.'" },
    ],
    industryUse: [
      "Signup forms at every major site validate emails and passwords before creating accounts",
      "Banking APIs reject malformed transfer requests with clear 400 errors to prevent bad transactions",
      "Booking systems validate dates and guest counts so they never store impossible reservations",
    ],
    commonMistakes: [
      "Adding validation annotations but forgetting @Valid in the controller — the checks never run.",
      "Letting raw stack traces leak to users — add error handling so responses stay clean and friendly.",
    ],
    interviewQuestions: [
      "How do you validate incoming request data in Spring Boot?",
      "What happens when @Valid fails, and what status code is returned?",
      "What is @ControllerAdvice used for?",
    ],
    papers: [],
    nextUp: ["spring-project-app", "spring-jpa"],
    cheatsheet: [
      "Validation = the bouncer for incoming data",
      "@NotBlank, @Size, @Email = rules on fields",
      "@Valid in the controller switches checks on",
      "Failed check -> automatic 400 Bad Request",
      "@ExceptionHandler / @ControllerAdvice = friendly error responses",
    ],
  },

  "spring-project-app": {
    story:
      "You've learned every ingredient — controllers, services, JPA, validation, dependency injection. Now you cook the whole meal. In this project you build a real Task Manager API: a backend where anyone can add tasks, list them, mark them done, and delete them, with all data safely stored in a database and bad input turned away at the door. This is the exact shape of backends running at real companies.",
    problem:
      "Learning pieces one at a time is great, but the pieces only click when you assemble them into a working whole. A Task Manager is the classic first real project because it touches everything — create, read, update, delete — the four things almost every app does.",
    analogy:
      "Until now you've practiced knife skills, boiling, and seasoning separately. This is plating a full three-course dinner — every skill working together on one plate.",
    explanation: [
      "The plan: a Task has a title, a completed flag, and an id. You'll build a full 'CRUD' API — Create, Read, Update, Delete.",
      "Layers you'll stack: a @RestController (front desk) → a @Service (business rules) → a JpaRepository (database) — each doing its one job.",
      "Endpoints: POST /tasks (create), GET /tasks (list all), GET /tasks/{id} (one), PUT /tasks/{id} (update), DELETE /tasks/{id} (remove).",
      "Dependency injection wires the layers: Spring hands the repository to the service and the service to the controller — you never write 'new'.",
      "Validation guards the door: a task with a blank title gets rejected with a clear 400 before it ever reaches the database.",
      "Test it by sending requests with a tool like Postman or curl, or just your browser for the GET endpoints — watch real data flow end to end.",
    ],
    code: {
      language: "text",
      source: `@Entity
public class Task {
    @Id @GeneratedValue private Long id;
    @NotBlank private String title;
    private boolean completed;
    // getters + setters
}

public interface TaskRepository extends JpaRepository<Task, Long> {}

@Service
public class TaskService {
    private final TaskRepository repo;
    public TaskService(TaskRepository repo) { this.repo = repo; }
    public Task add(Task t) { return repo.save(t); }
    public List<Task> all() { return repo.findAll(); }
    public void remove(Long id) { repo.deleteById(id); }
}

@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }

    @PostMapping public Task create(@Valid @RequestBody Task t) { return service.add(t); }
    @GetMapping  public List<Task> list() { return service.all(); }
    @DeleteMapping("/{id}") public void delete(@PathVariable Long id) { service.remove(id); }
}`,
      explanation:
        "Three tiny files — entity+repository, service, controller — form a complete, database-backed, validated Task Manager API. Every concept from this course appears here working together.",
    },
    exercise: {
      prompt:
        "Add an UPDATE endpoint: handle PUT /tasks/{id} in the controller, delegating to a service method that saves the changed task.",
      starter: `@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }

    // TODO: handle PUT /tasks/{id} to update a task
}`,
      solution: `@RestController
@RequestMapping("/tasks")
public class TaskController {
    private final TaskService service;
    public TaskController(TaskService service) { this.service = service; }

    @PutMapping("/{id}")
    public Task update(@PathVariable Long id, @Valid @RequestBody Task task) {
        task.setId(id);
        return service.add(task);   // save() updates when the id already exists
    }
}`,
    },
    quiz: [
      {
        question: "What does 'CRUD' stand for?",
        options: [
          "Create, Read, Update, Delete",
          "Copy, Run, Undo, Deploy",
          "Cache, Route, Update, Debug",
          "Compile, Render, Upload, Download",
        ],
        answerIndex: 0,
        explanation:
          "CRUD is the four core operations almost every app performs on its data: Create, Read, Update, Delete.",
      },
      {
        question: "In this project, which layer holds the business rules?",
        options: [
          "The controller",
          "The service",
          "The repository",
          "The application.properties file",
        ],
        answerIndex: 1,
        explanation:
          "The @Service holds business logic; the controller receives requests and the repository talks to the database.",
      },
      {
        question: "How is the repository given to the service?",
        options: [
          "The service writes 'new TaskRepository()'",
          "Spring injects it through the constructor (dependency injection)",
          "It is copied from the controller",
          "It is loaded from a text file",
        ],
        answerIndex: 1,
        explanation:
          "Spring builds the repository bean and injects it into the service's constructor — no manual 'new' needed.",
      },
    ],
    flashcards: [
      { front: "CRUD", back: "Create, Read, Update, Delete — the four core data operations." },
      { front: "Three-layer API", back: "Controller (requests) -> Service (rules) -> Repository (database)." },
      { front: "Postman / curl", back: "Tools for sending test requests to your API and seeing the responses." },
      { front: "PUT vs POST", back: "POST creates a new item; PUT updates an existing one at a known id." },
    ],
    miniProject: {
      title: "Ship the Task Manager API",
      brief: "Build and run a full CRUD Task Manager backend end to end.",
      steps: [
        "Generate a project with Spring Web, Spring Data JPA, H2, and Validation dependencies.",
        "Create the Task @Entity with @Id and a @NotBlank title.",
        "Add TaskRepository, TaskService, and TaskController with all five CRUD endpoints.",
        "Run the app and use Postman/curl to create, list, update, and delete tasks.",
        "Try sending a blank title and confirm you get a 400 Bad Request.",
      ],
    },
    industryUse: [
      "Trello and Asana are essentially large, polished task/CRUD APIs like the one you just built",
      "Every e-commerce backend is CRUD at its core — products, orders, and carts created, read, updated, deleted",
      "Internal company tools (HR, tickets, inventory) are overwhelmingly Spring Boot CRUD APIs",
    ],
    commonMistakes: [
      "Skipping the service layer and cramming everything into the controller — keep the three layers separate.",
      "Forgetting @Valid so blank tasks slip into the database — validate at the controller edge.",
      "Using POST to update instead of PUT — follow REST conventions so the API is predictable.",
    ],
    interviewQuestions: [
      "Walk me through the layers of a typical Spring Boot CRUD API and each layer's job.",
      "How would you handle the case where a requested task id doesn't exist?",
      "Where would you add validation, and what happens when it fails?",
    ],
    papers: [],
    nextUp: ["spring-jpa", "spring-validation"],
    cheatsheet: [
      "CRUD = Create, Read, Update, Delete",
      "Controller -> Service -> Repository, wired by DI",
      "5 endpoints: POST, GET all, GET one, PUT, DELETE",
      "@Valid guards input; JPA stores data",
      "Test with Postman, curl, or the browser",
    ],
  },
};
