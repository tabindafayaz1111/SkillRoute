import type { LessonBody } from "@/types";

export const git: Record<string, LessonBody> = {
  "git-why": {
    story:
      "You're writing an important document. You save it as \"report.doc\". Then you make big changes, but you're scared to lose the old version, so you save \"report-FINAL.doc\". Then \"report-FINAL-v2.doc\". Then \"report-FINAL-actually-final.doc\". By Friday your folder is a graveyard of versions and you have no idea which one is real. Now imagine that same mess, but with code, and with five people all editing at once. That nightmare is exactly what Git was invented to end. Git is a magic undo button and a time machine for your work — it remembers every version you save, who changed what, and lets you go back to any moment safely.",
    problem:
      "Without version control you either overwrite good work and lose it forever, or you drown in \"final-final-v3\" copies. And the moment a second person touches the same files, you email zip folders back and forth and someone's changes always get destroyed. There's no reliable history, no safe undo, and no clean way to work together.",
    analogy:
      "Git is like the save-points in a video game: at any moment you can plant a flag, and if things go wrong later you can respawn at that exact spot instead of starting the whole level over.",
    explanation: [
      "Version control = a system that records snapshots of your files over time, so you can see the full history and jump back to any past version.",
      "Git is the most popular version control tool on Earth. It runs on your own computer and is completely free.",
      "GitHub is a website that stores your Git history in the cloud so you can back it up and share it — think of Git as the engine and GitHub as the parking garage.",
      "Use it for anything that changes over time: code, sure, but also writing, configs, even recipes. Any folder can become a Git project.",
      "You don't need it for a one-off shopping list — but the moment work matters or more than one person is involved, version control saves you.",
      "Nearly every software job on the planet expects you to know Git. It's not optional; it's the shared language teams use to work without stepping on each other.",
    ],
    code: {
      language: "text",
      source: `# The "before Git" way (a folder full of fear):
report.doc
report-final.doc
report-final-v2.doc
report-final-ACTUALLY-final.doc
report-final-use-this-one.doc

# The "with Git" way (one file, a full timeline behind it):
report.doc   ->  snapshot 1: "first draft"
             ->  snapshot 2: "added charts"
             ->  snapshot 3: "fixed typos"   <- you can jump back to ANY of these`,
      explanation:
        "Git keeps a single clean file but remembers every labelled snapshot behind it, so you never need messy copy-named files again.",
    },
    quiz: [
      {
        question: "What problem does version control mainly solve?",
        options: [
          "It makes your computer faster",
          "It records the history of your files so you can undo and collaborate safely",
          "It writes the code for you",
          "It deletes old files automatically",
        ],
        answerIndex: 1,
        explanation:
          "Version control's whole job is keeping a safe, complete history so you can go back and work with others without losing anything.",
      },
      {
        question: "What's the difference between Git and GitHub?",
        options: [
          "They're the same thing",
          "Git is a website, GitHub is a program on your computer",
          "Git is the tool that tracks versions on your computer; GitHub is a website that stores and shares that history online",
          "GitHub replaced Git and Git is no longer used",
        ],
        answerIndex: 2,
        explanation:
          "Git is the engine that runs locally; GitHub is the cloud service that hosts your Git projects so teams can share them.",
      },
    ],
    flashcards: [
      { front: "Version control", back: "A system that saves snapshots of your files over time so you can review history and undo changes." },
      { front: "Git", back: "The most popular version control tool; it runs locally on your computer and is free." },
      { front: "GitHub", back: "A website that stores Git projects in the cloud so you can back them up and collaborate." },
      { front: "Snapshot", back: "A saved point-in-time version of your project you can return to later." },
    ],
    industryUse: [
      "Google, Meta, and Microsoft run virtually all their code through Git every single day",
      "Open-source projects like Linux and VS Code use Git so thousands of strangers can contribute safely",
      "Banks and hospitals use Git to keep an audit trail of exactly who changed what and when",
    ],
    commonMistakes: [
      "Thinking Git is only for programmers — it works beautifully for any text-based work that changes over time.",
      "Assuming GitHub is required to use Git — Git works fully offline on your own machine; GitHub is optional cloud storage.",
    ],
    interviewQuestions: [
      "In plain terms, what is version control and why do teams need it?",
      "What's the difference between Git and GitHub?",
    ],
    papers: [],
    nextUp: ["git-commits"],
    cheatsheet: [
      "Git = time machine + safe undo for your files",
      "GitHub = cloud storage & sharing for Git projects",
      "Snapshots replace the 'final-final-v3' folder mess",
      "Any folder can become a Git project",
      "Knowing Git is expected in nearly every coding job",
    ],
  },

  "git-commits": {
    story:
      "Think of Git like a camera for your project. As you work, you tell it \"okay, this moment matters — take a photo.\" That photo is called a commit, and each one gets a little caption like \"added the login button.\" But here's the twist: before you take the photo, you get to line people up first. You put only the changes you want into the shot (that's staging with `add`), then you snap the picture (that's `commit`). Later you can flip through the whole photo album and see your project at every stage. Three little commands do all of this: `init` starts the album, `add` lines up the shot, and `commit` takes the picture.",
    problem:
      "You want a reliable, labelled history of your work — but not every half-finished scribble deserves to be recorded, and you don't want one giant messy snapshot of everything. You need a way to start tracking a folder, choose exactly which changes to save, and stamp each save with a note explaining what you did.",
    analogy:
      "Staging then committing is like packing a gift box: you first choose which items go in the box (`add`), then you seal and label it (`commit`). Things you didn't put in the box simply stay out.",
    explanation: [
      "`git init` turns any ordinary folder into a Git project by creating a hidden tracking area. You do this once, at the start.",
      "As you edit, changes float around as \"unsaved.\" `git add` moves the changes you choose into the staging area — a waiting room for your next snapshot.",
      "`git commit -m \"message\"` takes the snapshot of everything staged and saves it with your message. That message is a note to future-you, so make it clear.",
      "This two-step (add, then commit) lets you save a tidy group of related changes instead of dumping everything at once.",
      "Write commit messages in the present tense describing what the change does: \"add contact form,\" not \"stuff\" or \"asdf.\"",
      "`git status` is your best friend — it shows what's changed, what's staged, and what's not, so you always know where you stand.",
    ],
    code: {
      language: "text",
      source: `# Step 1: start tracking this folder (only once, ever)
git init

# Step 2: make some edits, then see what changed
git status

# Step 3: line up the files you want in this snapshot
git add index.html
git add .            # or add EVERYTHING that changed with a dot

# Step 4: take the snapshot with a clear caption
git commit -m "Add homepage with welcome message"

# Peek at your saved history
git log --oneline`,
      explanation:
        "init creates the project, add stages your chosen changes into the waiting room, and commit permanently saves them with a message you'll thank yourself for later.",
    },
    exercise: {
      prompt: "You've edited a file called notes.txt. Write the two commands that stage it and then commit it with the message 'Add my first note'.",
      starter: `# TODO: stage notes.txt
# TODO: commit it with the message "Add my first note"`,
      solution: `git add notes.txt
git commit -m "Add my first note"`,
    },
    quiz: [
      {
        question: "What does `git add` actually do?",
        options: [
          "Permanently saves your changes forever",
          "Stages your chosen changes — puts them in the waiting room for the next commit",
          "Uploads your project to GitHub",
          "Deletes the old version of the file",
        ],
        answerIndex: 1,
        explanation:
          "`add` only stages changes (moves them into the waiting room). Nothing is permanently recorded until you `commit`.",
      },
      {
        question: "Which command turns a normal folder into a Git project?",
        options: ["git start", "git commit", "git init", "git new"],
        answerIndex: 2,
        explanation:
          "`git init` sets up the hidden tracking area that makes a folder a Git repository. You run it once per project.",
      },
      {
        question: "What makes a good commit message?",
        options: [
          "A single random word like 'stuff'",
          "Leaving it blank to save time",
          "A short, clear note describing what the change does, like 'Add login button'",
          "The current date only",
        ],
        answerIndex: 2,
        explanation:
          "Good messages describe what changed so future-you (and teammates) can scan history and understand it instantly.",
      },
    ],
    flashcards: [
      { front: "git init", back: "Turns a folder into a Git project by creating its hidden tracking area (run once)." },
      { front: "Staging area", back: "A waiting room where you gather the exact changes you want in your next snapshot." },
      { front: "git add", back: "Moves chosen changes into the staging area, ready to be committed." },
      { front: "git commit", back: "Saves a permanent, labelled snapshot of everything currently staged." },
    ],
    miniProject: {
      title: "Your First Repository",
      brief: "Create a tiny project and record its first three snapshots by hand.",
      steps: [
        "Make a new folder, open a terminal in it, and run `git init`.",
        "Create a file `about.txt`, write one sentence, then `git add about.txt` and commit it.",
        "Add a second sentence, run `git status` to see the change, then stage and commit again.",
        "Run `git log --oneline` and admire your growing timeline of commits.",
      ],
    },
    industryUse: [
      "Every engineer at Spotify commits small, labelled changes many times a day",
      "Data scientists at Netflix commit notebooks and scripts so experiments are reproducible",
      "Writers using GitHub for documentation commit each edit with a clear message for an audit trail",
    ],
    commonMistakes: [
      "Forgetting to `git add` before committing — Git only snapshots what's staged, so unstaged changes get left behind.",
      "Writing lazy messages like 'update' — later you can't tell your commits apart. Describe the change instead.",
    ],
    interviewQuestions: [
      "Walk me through init, add, and commit — what does each step do?",
      "What is the staging area and why is it useful?",
    ],
    papers: [],
    nextUp: ["git-history", "git-branching"],
    cheatsheet: [
      "git init  -> start tracking a folder (once)",
      "git status  -> see what changed",
      "git add <file>  or  git add .  -> stage changes",
      'git commit -m "clear message"  -> save a snapshot',
      "git log --oneline  -> view your history",
    ],
  },

  "git-history": {
    story:
      "It's 2 a.m., your code worked an hour ago, and now it's completely broken. You have no idea what you touched. Panic? No — you have Git. You type `git log` and see your whole timeline of commits, each with a message and a moment in time. You spot the exact snapshot where things were still fine. With one command you either peek at that old version or roll the file back to it, and you're saved. Reading history is how you become a detective of your own project; undoing history is your rescue rope when you fall.",
    problem:
      "Saving snapshots is only half the value — you also need to read them (what changed, when, and by whom) and, crucially, undo mistakes. Without that, your history is just a pile of photos you can't act on. You need to answer 'what did I do?' and 'how do I go back?' calmly, without deleting everything and starting over.",
    analogy:
      "It's like the browser back button, but for your entire project: `log` is your history list, and undoing is clicking back to a page that still worked.",
    explanation: [
      "`git log` shows your commits newest-first: each has a unique ID (a long code), an author, a date, and your message. Add `--oneline` for a short, scannable list.",
      "`git diff` shows the exact lines you've changed since your last commit — the added and removed text — so you can review before you save.",
      "Made a mess in a file but haven't committed yet? `git restore <file>` throws away those unsaved edits and brings back the last committed version.",
      "Already committed something you regret? `git revert <commit-id>` creates a new commit that undoes it — safe, because it keeps the history honest instead of erasing it.",
      "Every commit has an ID; you only need the first 7 characters to refer to it. Copy it from `git log`.",
      "Rule of thumb: prefer `revert` (adds an 'undo' commit) over commands that rewrite history, especially once work is shared with others.",
    ],
    code: {
      language: "text",
      source: `# See your timeline (short version)
git log --oneline

# Example output:
#   a1b2c3d  Fix typo in header
#   9f8e7d6  Add contact form
#   3c2b1a0  Initial commit

# See exactly what you've changed but not yet committed
git diff

# Throw away UNCOMMITTED edits in one file (back to last commit)
git restore index.html

# Safely undo a commit that already happened, by its ID
git revert 9f8e7d6`,
      explanation:
        "log lists your history, diff shows unsaved changes, restore discards uncommitted edits, and revert cleanly cancels an old commit by adding a new 'undo' snapshot.",
    },
    exercise: {
      prompt: "You just messed up styles.css but have NOT committed. Write the command that discards your unsaved edits and restores the last committed version.",
      starter: `# TODO: restore styles.css to its last committed state`,
      solution: `git restore styles.css`,
    },
    quiz: [
      {
        question: "Which command shows your list of past commits?",
        options: ["git diff", "git log", "git add", "git status"],
        answerIndex: 1,
        explanation:
          "`git log` displays the history of commits, newest first. `--oneline` makes it a compact, easy-to-scan list.",
      },
      {
        question: "You committed a change and now regret it. What's the safe way to undo it?",
        options: [
          "Delete the whole project and start over",
          "git revert <commit-id>, which adds a new commit that cancels the old one",
          "git add the file again",
          "Turn off your computer",
        ],
        answerIndex: 1,
        explanation:
          "`git revert` safely undoes a committed change by creating a new 'undo' commit, preserving an honest history — ideal when work is shared.",
      },
    ],
    flashcards: [
      { front: "git log", back: "Shows the history of commits (add --oneline for a compact list)." },
      { front: "git diff", back: "Shows the exact lines changed since your last commit." },
      { front: "git restore <file>", back: "Discards uncommitted edits in a file, restoring the last committed version." },
      { front: "git revert <id>", back: "Safely undoes a past commit by adding a new commit that reverses it." },
    ],
    industryUse: [
      "Engineers at Amazon read `git log` and `git diff` daily to review what changed before releasing code",
      "When a bad deploy breaks a site, teams at Shopify use `git revert` to instantly roll back the offending commit",
      "Compliance teams at banks rely on Git history as a tamper-evident record of every change",
    ],
    commonMistakes: [
      "Confusing `restore` (throws away uncommitted edits) with `revert` (undoes a committed change) — know which one you need before running it.",
      "Panicking and deleting the project when something breaks — the history is right there; find the last good commit instead.",
    ],
    interviewQuestions: [
      "How do you view what changed in your project, both committed and uncommitted?",
      "What's the safest way to undo a commit that's already been shared with teammates?",
    ],
    papers: [],
    nextUp: ["git-branching"],
    cheatsheet: [
      "git log --oneline  -> scan your commit history",
      "git diff  -> see unsaved changes",
      "git restore <file>  -> discard uncommitted edits",
      "git revert <id>  -> safely undo a committed change",
      "Prefer revert over rewriting shared history",
    ],
  },

  "git-branching": {
    story:
      "Imagine you're writing a novel, and you want to try a wild new ending — but you're terrified of ruining the good draft you already have. So you photocopy the whole manuscript, scribble the risky ending on the copy, and leave the original untouched. If the new ending rocks, you replace the original with it. If it flops, you toss the copy and lose nothing. That safe copy is a branch. In Git, branching lets you split off a parallel version of your project, experiment freely, and only merge your work back into the main version once it actually works.",
    problem:
      "If everyone edits the one 'real' version directly, a single half-finished experiment can break the whole project for everybody. You need a way to try new features and fixes in isolation — without disturbing the stable version — and then combine the good ones back in cleanly.",
    analogy:
      "A branch is a parallel universe of your project: you can do anything you like in it, and reality (your main branch) stays perfectly safe until you decide to merge the two.",
    explanation: [
      "Your project starts with one branch, usually called `main` — the stable, 'this works' version everyone trusts.",
      "`git branch feature-x` creates a new branch; `git checkout feature-x` (or `git switch feature-x`) moves you onto it. Commits you make now happen only on that branch.",
      "You can hop between branches freely. `main` stays untouched while you build and commit on your feature branch.",
      "When your feature is done and working, you `git merge` it back into `main`, combining both timelines into one.",
      "Sometimes two branches changed the same line differently — that's a merge conflict. Git pauses and asks you to pick which version wins; you edit the file, then commit the resolution.",
      "Golden rule: keep `main` stable and shippable. Do risky or in-progress work on branches, merge only when it's ready.",
    ],
    code: {
      language: "text",
      source: `# See your branches (the * marks where you are)
git branch

# Create a branch and switch onto it (two ways)
git branch add-search
git switch add-search        # or:  git checkout add-search

# ...make commits on add-search safely, main is untouched...

# Go back to main and pull the new work in
git switch main
git merge add-search

# Tidy up: delete the finished branch
git branch -d add-search`,
      explanation:
        "You branch off to work in isolation, commit freely, then switch back to main and merge — combining your feature into the stable version only when it's ready.",
    },
    exercise: {
      prompt: "Write the commands to create a new branch called 'fix-typo' and switch onto it.",
      starter: `# TODO: create a branch named fix-typo
# TODO: switch onto it`,
      solution: `git branch fix-typo
git switch fix-typo`,
    },
    quiz: [
      {
        question: "What is a branch, in plain terms?",
        options: [
          "A backup on a USB stick",
          "A parallel copy of your project where you can work without affecting the main version",
          "A type of commit message",
          "A website that hosts your code",
        ],
        answerIndex: 1,
        explanation:
          "A branch is an isolated parallel line of work; the main branch stays safe until you merge your branch back in.",
      },
      {
        question: "What is a merge conflict?",
        options: [
          "When two people have the same name",
          "When your internet disconnects during a merge",
          "When two branches changed the same line differently and Git asks you to choose which version to keep",
          "When you run out of disk space",
        ],
        answerIndex: 2,
        explanation:
          "A conflict happens when merging branches that edited the same lines; Git pauses and you decide how to combine them, then commit the fix.",
      },
    ],
    flashcards: [
      { front: "Branch", back: "A parallel version of your project where you can work in isolation." },
      { front: "main", back: "The default, stable branch that everyone trusts to work." },
      { front: "git merge", back: "Combines the changes from one branch into another." },
      { front: "Merge conflict", back: "When two branches changed the same line and Git asks you to choose the final version." },
    ],
    miniProject: {
      title: "Branch, Build, Merge",
      brief: "Practice the core team workflow on a tiny project of your own.",
      steps: [
        "In a Git project, create and switch to a branch called `add-greeting`.",
        "Add a friendly line to a file and commit it on that branch.",
        "Switch back to `main` and confirm your new line is NOT there yet.",
        "Merge `add-greeting` into `main`, then delete the finished branch.",
      ],
    },
    industryUse: [
      "Every feature at GitHub itself is built on its own branch before merging into main",
      "Teams at Airbnb spin up a branch per bug fix so the live app is never destabilised",
      "Game studios branch to prototype risky mechanics without touching the shippable build",
    ],
    commonMistakes: [
      "Doing all your work directly on `main` — one broken experiment then breaks everyone's project. Branch first.",
      "Fearing merge conflicts — they're normal; Git shows you both versions and you simply choose, then commit.",
    ],
    interviewQuestions: [
      "Why would you use a branch instead of committing straight to main?",
      "What causes a merge conflict and how do you resolve one?",
    ],
    papers: [],
    nextUp: ["git-github", "git-pull-requests"],
    cheatsheet: [
      "git branch <name>  -> create a branch",
      "git switch <name>  -> move onto it",
      "git merge <name>  -> pull its work into your current branch",
      "git branch -d <name>  -> delete a finished branch",
      "Keep main stable; experiment on branches",
    ],
  },

  "git-github": {
    story:
      "Everything you've done so far lives on your laptop. What if it gets stolen, or the coffee spills? Poof — your project and its whole history are gone. Worse, how does a teammate in another city even see your work? This is where GitHub comes in. You create a matching project online (a 'remote'), then `push` your commits up to it like uploading photos to the cloud. Your teammate can `clone` it to their machine, and later `pull` down anything new you added. Your local Git and the GitHub copy stay in sync — one on your desk, one safely in the cloud for the whole world (or just your team) to reach.",
    problem:
      "Git on your computer is powerful but lonely and fragile: it lives on one machine, so it's not backed up and nobody else can see it. To collaborate and to protect your work, you need a shared copy somewhere everyone can reach — and a simple way to send your changes up and bring their changes down.",
    analogy:
      "Your local Git is like the documents folder on your laptop; GitHub is like Google Drive. `push` uploads, `pull` downloads, and `clone` is grabbing the whole shared folder for the first time.",
    explanation: [
      "A remote is a copy of your project hosted elsewhere — usually on GitHub. `origin` is the standard nickname for your main remote.",
      "`git clone <url>` downloads an entire existing project (all its history) from GitHub to your computer — the usual way to start on a team project.",
      "`git push` uploads your local commits to the remote, so your work is backed up and visible to others.",
      "`git pull` downloads commits others have added to the remote and merges them into your local copy, keeping you up to date.",
      "The first time, you connect your local project to a remote with `git remote add origin <url>`, then push. After that, plain `git push` and `git pull` do the job.",
      "Push often. Work that's only on your laptop isn't backed up, and teammates can't see it until you push.",
    ],
    code: {
      language: "text",
      source: `# Start a fresh copy of someone else's (or your own) online project
git clone https://github.com/you/my-project.git

# --- OR, connect an EXISTING local project to a new GitHub repo ---
git remote add origin https://github.com/you/my-project.git
git push -u origin main       # first push sets up the link

# Everyday rhythm once connected:
git pull      # grab teammates' latest changes first
# ...make and commit your changes...
git push      # send yours up to GitHub`,
      explanation:
        "clone downloads a whole project, remote add links your local repo to GitHub, and the daily push/pull rhythm keeps your machine and the cloud in sync.",
    },
    exercise: {
      prompt: "You've committed changes locally and want to send them to GitHub. Write the command that uploads your commits to the remote.",
      starter: `# TODO: upload your local commits to the remote`,
      solution: `git push`,
    },
    quiz: [
      {
        question: "What does `git push` do?",
        options: [
          "Deletes your project from GitHub",
          "Uploads your local commits to the remote (e.g. GitHub)",
          "Downloads other people's changes",
          "Creates a new branch",
        ],
        answerIndex: 1,
        explanation:
          "`push` sends your local commits up to the remote, backing them up and making them visible to teammates.",
      },
      {
        question: "You're joining a project that already lives on GitHub. Which command gets it onto your computer?",
        options: ["git push", "git init", "git clone <url>", "git commit"],
        answerIndex: 2,
        explanation:
          "`git clone` downloads an existing remote project — all its files and full history — to your machine.",
      },
      {
        question: "What is a 'remote' named `origin`?",
        options: [
          "The very first commit you ever made",
          "The standard nickname for your main cloud copy of the project (usually on GitHub)",
          "A type of merge conflict",
          "Your computer's hard drive",
        ],
        answerIndex: 1,
        explanation:
          "`origin` is the conventional name for your primary remote — the shared copy you push to and pull from.",
      },
    ],
    flashcards: [
      { front: "Remote", back: "A copy of your project hosted elsewhere (usually GitHub) that you sync with." },
      { front: "origin", back: "The standard nickname for your main remote." },
      { front: "git clone", back: "Downloads an entire existing remote project, with full history, to your computer." },
      { front: "git push / git pull", back: "Push uploads your commits to the remote; pull downloads and merges others' commits." },
    ],
    miniProject: {
      title: "Put a Project on GitHub",
      brief: "Take a local project and back it up to the cloud for the first time.",
      steps: [
        "Create a free account and a new empty repository on GitHub.",
        "In your local project, run `git remote add origin <your repo url>`.",
        "Push your work with `git push -u origin main` and refresh the GitHub page to see it.",
        "Edit a file directly on GitHub, then run `git pull` locally to bring that change down.",
      ],
    },
    industryUse: [
      "Millions of developers push to GitHub daily; it's where projects like React and TensorFlow are hosted",
      "Companies like Stripe use private GitHub repos to store and share proprietary code securely",
      "Solo creators and students use GitHub as a free, reliable cloud backup of every project",
    ],
    commonMistakes: [
      "Forgetting to `pull` before starting work — you fall behind teammates and cause avoidable conflicts. Pull first.",
      "Committing but never pushing — that work isn't backed up and no one else can see it until it's on the remote.",
    ],
    interviewQuestions: [
      "Explain the difference between clone, push, and pull.",
      "What is a remote, and what does `origin` usually refer to?",
    ],
    papers: [],
    nextUp: ["git-pull-requests"],
    cheatsheet: [
      "git clone <url>  -> download a whole project",
      "git remote add origin <url>  -> link local to GitHub",
      "git push  -> upload your commits",
      "git pull  -> download & merge others' commits",
      "Pull before you start, push when you're done",
    ],
  },

  "git-pull-requests": {
    story:
      "Imagine you baked a new dish for a family cookbook. You don't just rip out the old recipe and shove yours in — you show it to the family first: \"Hey, here's my change, what do you think?\" They taste it, suggest a pinch more salt, you tweak it, and once everyone nods, it goes in the book. A pull request (PR) is exactly that ritual for code. You've done work on a branch, and instead of dumping it straight into `main`, you open a pull request that says \"here's what I changed — please review it before we merge.\" Teammates read it, comment, maybe ask for tweaks, and once approved, the branch merges in. It's how real teams keep quality high without stepping on each other.",
    problem:
      "Merging your own work straight into the shared `main` with no second pair of eyes is how bugs and bad decisions sneak into a live product. Teams need a checkpoint: a place to see exactly what's changing, discuss it, request improvements, and give a clear yes before it becomes official.",
    analogy:
      "A pull request is like submitting an essay for peer review before it's published: reviewers mark it up, you revise, and only the approved version makes it into print.",
    explanation: [
      "You do your work on a branch and push it to GitHub. Then you open a pull request: a page comparing your branch to `main`, showing every changed line.",
      "Teammates review it right there — leaving comments on specific lines, asking questions, or requesting changes. You push more commits to your branch and the PR updates automatically.",
      "Once reviewers approve, someone clicks 'Merge' and your branch's changes flow into `main`. The PR becomes a permanent record of what changed and why.",
      "PRs pair beautifully with automated checks: tests and linters can run on your branch and must pass before merging — catching bugs before a human even looks.",
      "Good PRs are small and focused. A giant PR touching 50 files is exhausting to review; a tight one gets read, approved, and merged fast.",
      "Write a clear PR description: what you changed, why, and how to test it. Reviewers (and future-you) will be grateful.",
    ],
    code: {
      language: "text",
      source: `# The pull-request flow (commands + clicks):
git switch -c add-dark-mode     # 1. new branch for your feature
# ...edit files, commit your work...
git push -u origin add-dark-mode  # 2. push the branch to GitHub

# 3. On github.com, click "Compare & pull request"
#    - write a title + description of what you changed
#    - request a reviewer

# 4. Reviewer comments; you address feedback:
# ...more edits...
git commit -m "Address review: fix contrast"
git push                        # the PR updates automatically

# 5. Once approved -> click "Merge pull request". Done!`,
      explanation:
        "You push a feature branch, open a PR on GitHub so teammates can review and comment, push fixes in response, and merge only after approval.",
    },
    quiz: [
      {
        question: "What is the main purpose of a pull request?",
        options: [
          "To download the whole project",
          "To propose your branch's changes and let teammates review them before merging into main",
          "To delete a branch",
          "To create your first commit",
        ],
        answerIndex: 1,
        explanation:
          "A PR is a review checkpoint: it shows your proposed changes, invites discussion, and merges only after approval.",
      },
      {
        question: "Why are small, focused pull requests better than huge ones?",
        options: [
          "They use less internet data",
          "They're easier and faster for teammates to review, so bugs are caught and merges happen sooner",
          "GitHub charges money for large PRs",
          "Git can't merge large PRs at all",
        ],
        answerIndex: 1,
        explanation:
          "Small PRs are quick to read and review carefully, leading to faster, higher-quality merges. Giant PRs get rubber-stamped or stall.",
      },
    ],
    flashcards: [
      { front: "Pull request (PR)", back: "A proposal to merge your branch into another, opened so teammates can review it first." },
      { front: "Code review", back: "Teammates reading your proposed changes, leaving comments and requesting improvements before merge." },
      { front: "Merge (a PR)", back: "Approving and combining your branch's changes into the target branch, usually main." },
      { front: "Automated checks", back: "Tests and linters that run on your PR and often must pass before it can be merged." },
    ],
    industryUse: [
      "Every code change at GitHub, Google, and Meta goes through a pull request and review before shipping",
      "Open-source projects accept contributions from strangers exclusively via reviewed pull requests",
      "Startups use PRs plus automated tests so a small team can ship fast without breaking production",
    ],
    commonMistakes: [
      "Opening one enormous PR with weeks of work — reviewers can't do it justice. Break work into small, focused PRs.",
      "Submitting a PR with no description — reviewers waste time guessing your intent. Explain what and why.",
    ],
    interviewQuestions: [
      "What is a pull request and why do teams use them?",
      "What makes a pull request easy (or hard) to review well?",
    ],
    papers: [],
    nextUp: ["git-workflow-project"],
    cheatsheet: [
      "PR = 'please review my branch before we merge'",
      "Push a branch -> open PR -> review -> merge",
      "Keep PRs small and focused",
      "Write a clear title + description",
      "Automated tests can gate the merge",
    ],
  },

  "git-workflow-project": {
    story:
      "You now know every instrument — commit, branch, push, pull request. Time to play the whole song. In this project you'll run a real team-style workflow from start to finish: clone or create a repo, branch off for a feature, commit your work in clean steps, push it to GitHub, open a pull request, respond to a review, and merge it into `main` — then repeat for a second feature and handle a merge conflict on purpose. This is exactly the loop professional developers live in every single day. Do it once end-to-end and Git stops feeling like scary magic and starts feeling like second nature.",
    problem:
      "Learning commands one at a time is useful, but real work is the flow that stitches them together. Without practising the full cycle — branch, commit, push, PR, review, merge — you freeze the moment you join a real team. This project builds the muscle memory so the whole rhythm feels automatic.",
    analogy:
      "It's the difference between knowing the notes and playing the whole song. You've practised each chord; now you perform the full piece from start to finish.",
    explanation: [
      "Start clean: create a repo on GitHub and clone it, or init locally and push. Make sure `main` has at least one commit.",
      "For each feature, branch off `main`, do focused work, and make small commits with clear messages — never work directly on `main`.",
      "Push your branch and open a pull request describing your change. Even solo, review your own diff before merging — it catches mistakes.",
      "Deliberately create a merge conflict: change the same line on two branches, merge, and resolve it by editing the file and committing. Facing this on purpose removes the fear.",
      "After merging each PR, delete the branch and pull `main` so your local copy stays current. Repeat the loop for the next feature.",
      "By the end you'll have a repo whose history reads like a clean story: a series of small, reviewed, merged features — exactly what employers want to see.",
    ],
    code: {
      language: "text",
      source: `# The full loop, once per feature:
git switch main
git pull                          # start from the latest main
git switch -c feature-about-page  # 1. branch off

# ...edit files...
git add .
git commit -m "Add about page with bio"   # 2. commit small & clear
git push -u origin feature-about-page      # 3. push branch

# 4. Open a PR on GitHub, review, then merge.

git switch main
git pull                          # 5. bring the merged work down
git branch -d feature-about-page  # 6. tidy up, then repeat`,
      explanation:
        "This is the professional cycle: branch off fresh main, commit in small steps, push, open and merge a PR, then sync main and clean up before the next feature.",
    },
    exercise: {
      prompt: "You just merged your PR on GitHub. Write the two commands that update your local main branch and delete the now-finished branch 'feature-about-page'.",
      starter: `git switch main
# TODO: bring the merged changes down to your local main
# TODO: delete the finished branch feature-about-page`,
      solution: `git switch main
git pull
git branch -d feature-about-page`,
    },
    quiz: [
      {
        question: "In a healthy team workflow, where should you do your feature work?",
        options: [
          "Directly on main so it's live immediately",
          "On a separate branch, then merge into main via a reviewed pull request",
          "In a private zip file you email around",
          "Only on GitHub's website, never locally",
        ],
        answerIndex: 1,
        explanation:
          "You branch off, commit your work in isolation, and merge into main through a pull request — keeping main stable and reviewed.",
      },
      {
        question: "After your pull request is merged on GitHub, what should you do locally?",
        options: [
          "Nothing, your computer updates itself automatically",
          "Delete the whole project and re-clone it",
          "Switch to main, pull the merged changes, and delete the finished branch",
          "Push again to be safe",
        ],
        answerIndex: 2,
        explanation:
          "Switch to main, `git pull` to sync the merge down, and delete the finished branch to keep things tidy before the next feature.",
      },
    ],
    flashcards: [
      { front: "Workflow", back: "The repeating cycle: branch -> commit -> push -> pull request -> review -> merge -> sync." },
      { front: "Feature branch", back: "A short-lived branch for one feature or fix, merged into main when done." },
      { front: "Syncing main", back: "Running git pull on main after a merge so your local copy matches the remote." },
      { front: "git switch -c <name>", back: "Creates a new branch and switches onto it in one step." },
    ],
    miniProject: {
      title: "Ship a Repo the Team Way",
      brief: "Run the full professional Git workflow end to end, including a real merge conflict.",
      steps: [
        "Create a GitHub repo, clone it, and give `main` a first commit (like a README).",
        "Branch off, add a feature, commit, push, and open a pull request; review your own diff and merge it.",
        "Sync main, delete the branch, then start a second feature branch.",
        "On purpose, edit the same line on two branches and merge to trigger a conflict — resolve it by editing the file and committing.",
        "End with a clean `git log --oneline` showing your reviewed, merged history.",
      ],
    },
    industryUse: [
      "This exact branch-PR-merge loop is the daily workflow at Google, Microsoft, and virtually every tech company",
      "Open-source maintainers run this flow to accept contributions from thousands of people cleanly",
      "Bootcamps and hiring managers look at your GitHub history to see if you work this professional way",
    ],
    commonMistakes: [
      "Committing straight to main instead of branching — it breaks the review habit teams depend on.",
      "Forgetting to pull main before branching — you start from stale code and cause needless conflicts.",
    ],
    interviewQuestions: [
      "Walk me through your workflow from starting a feature to getting it into main.",
      "How do you handle a merge conflict, step by step?",
    ],
    papers: [],
    nextUp: [],
    cheatsheet: [
      "Loop: branch -> commit -> push -> PR -> review -> merge",
      "git switch -c <name>  -> branch and switch in one step",
      "Always pull main before branching",
      "Keep commits small; keep main stable",
      "After merge: pull main, delete the branch, repeat",
    ],
  },
};
