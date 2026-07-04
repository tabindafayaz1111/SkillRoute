import type { LessonBody } from "@/types";

export const claude: Record<string, LessonBody> = {
  "claude-what": {
    story:
      "You have already met Claude if you have ever typed a question into a chat box and watched a thoughtful answer appear. That chat is powered by a Claude model — an AI built by a company called Anthropic. Here is the part most people miss: the same brain behind that chat window can be plugged directly into YOUR own app, website, or spreadsheet. Instead of a person copy-pasting into a chat all day, your program can ask Claude questions and get answers back automatically — summarize a review, draft a reply, sort a pile of emails. \"Building with Claude\" simply means writing a few lines of code that hand a request to Claude and use whatever comes back.",
    problem:
      "The chat website is great for you, one message at a time. But a real business has thousands of emails, receipts, and support tickets a day — no human can chat through all of them. You need Claude to work inside your software, on autopilot, so the smart part happens without anyone sitting at a keyboard.",
    analogy:
      "The chat website is like phoning a brilliant assistant and reading them a question. The API is like giving that same assistant a desk inside your company, so your programs can slide work under their door all day and collect the finished answers.",
    explanation: [
      "Claude is a family of AI models made by Anthropic that read text (and images and documents) and write helpful text back.",
      "You reach Claude through an API — a doorway your code knocks on to send a request and receive a reply. You get a key to that doorway at console.anthropic.com.",
      "Anthropic gives you an official SDK (a small helper library) so you barely have to think about the plumbing: it is called \"anthropic\" for Python and \"@anthropic-ai/sdk\" for JavaScript.",
      "Use Claude when a task involves understanding or producing language: summarizing, answering, rewriting, classifying, extracting facts, chatting.",
      "Do NOT reach for Claude when a plain rule or a simple calculator already does the job — adding up numbers or checking if a box is ticked does not need an AI.",
      "Anthropic designs Claude with safety in mind: it is trained to be helpful, honest, and to decline genuinely harmful requests.",
    ],
    code: {
      language: "python",
      source: `# The whole idea in five lines: your code asks, Claude answers.
from anthropic import Anthropic

client = Anthropic()  # reads your key from the ANTHROPIC_API_KEY setting
reply = client.messages.create(
    model="claude-sonnet-5",           # which Claude brain to use
    max_tokens=200,                     # a length limit for the answer
    messages=[{"role": "user", "content": "Explain what Claude is in one sentence."}],
)
print(reply.content[0].text)            # the words Claude wrote back`,
      explanation:
        "You build a client, send one message, and read the text Claude returns. Everything else in this course is a richer version of these same few lines.",
    },
    quiz: [
      {
        question: "What is the difference between the Claude chat website and the Claude API?",
        options: [
          "They are the same thing with different colors",
          "The website is for humans to chat one message at a time; the API lets your own code send requests automatically",
          "The API is slower and only works on weekends",
          "The website can build apps but the API cannot",
        ],
        answerIndex: 1,
        explanation:
          "The chat site is a human typing to Claude. The API is your program talking to the same models, so work can happen automatically and at scale.",
      },
      {
        question: "Who makes Claude?",
        options: ["OpenAI", "Google", "Anthropic", "Microsoft"],
        answerIndex: 2,
        explanation: "Claude is the family of AI models built by Anthropic.",
      },
    ],
    flashcards: [
      { front: "Claude", back: "A family of AI models made by Anthropic that understand and generate text (and images/documents)." },
      { front: "API", back: "A doorway your code uses to send a request to Claude and get a reply back." },
      { front: "SDK", back: "Anthropic's official helper library — \"anthropic\" (Python) or \"@anthropic-ai/sdk\" (JS) — that handles the plumbing." },
      { front: "Anthropic Console", back: "The website at console.anthropic.com where you sign up and get your API key." },
    ],
    miniProject: {
      title: "One-Sentence Explainer",
      brief: "Make Claude explain any topic in exactly one friendly sentence, for a non-expert.",
      steps: [
        "Sign up at console.anthropic.com and note where API keys live (you will create one next lesson).",
        "In your head, write the user message: \"Explain photosynthesis in one sentence for a 10-year-old.\"",
        "Predict what a good answer looks like before running anything.",
        "List three everyday tasks in your own life Claude could handle automatically.",
      ],
    },
    industryUse: [
      "Notion uses Claude to summarize and rewrite text inside documents for millions of users",
      "Customer-support teams at companies like DoorDash draft reply suggestions with Claude",
      "Law and finance firms use Claude to read long contracts and pull out the key clauses",
    ],
    commonMistakes: [
      "Thinking you must be a math genius to use Claude — you send text and read text; the hard AI part is already built.",
      "Confusing the chat website with the API. Building apps means using the API and SDK, not copy-pasting into the chat.",
    ],
    interviewQuestions: [
      "In plain words, what is Claude and how does an app talk to it?",
      "Give an example of a task where Claude is a great fit, and one where it is overkill.",
    ],
    papers: [],
    nextUp: ["claude-models", "claude-setup"],
    cheatsheet: [
      "Claude = AI models by Anthropic",
      "You use it via the API with an official SDK",
      "Get a key at console.anthropic.com",
      "Great for language tasks: summarize, answer, rewrite, classify",
      "The website is for humans; the API is for your code",
    ],
  },

  "claude-models": {
    story:
      "Imagine hiring help for your kitchen. For chopping onions all night you want someone fast and cheap. For the everyday cooking you want a solid all-rounder who is quick AND smart. For inventing a brand-new dish under pressure, you want your most brilliant chef, even if they cost more and take their time. Claude comes as a family for exactly this reason. Same recipe book, different speed-and-brains trade-offs. Picking the right one is most of the skill: use a small model for easy, high-volume work and save the big one for the truly hard thinking.",
    problem:
      "If you always use the most powerful model, you overpay and wait longer for simple jobs. If you always use the cheapest, hard tasks come out shallow. You need to match the model to the task.",
    analogy:
      "It is like choosing a vehicle: a scooter for a quick corner-shop run, a family car for daily driving, and a truck for the heavy haul. All get you there — the right one depends on the load.",
    explanation: [
      "Claude Haiku 4.5 (\"claude-haiku-4-5\") is the fastest and cheapest. Reach for it on simple, high-volume jobs: tagging, quick classifications, short replies.",
      "Claude Sonnet 5 (\"claude-sonnet-5\") is the best balance of speed and intelligence — the great everyday default that handles almost everything well.",
      "Claude Opus 4.8 (\"claude-opus-4-8\") is the most capable Opus model, for the hardest reasoning where quality matters more than cost.",
      "Anthropic's most capable overall is Claude Fable 5 (\"claude-fable-5\"), reserved for the very hardest, long-running work.",
      "You choose a model with one word — the model id string — and can change it any time by editing that one line.",
      "A good habit: prototype on Sonnet 5, drop to Haiku 4.5 where the task turns out to be easy, and step up to Opus 4.8 or Fable 5 only where you see the answers falling short.",
    ],
    code: {
      language: "python",
      source: `# The ONLY thing that changes between models is this one string.
from anthropic import Anthropic
client = Anthropic()

task = "Sort this review as positive or negative: The food was cold and slow."

# Cheap + fast — perfect for a simple label like this:
fast = client.messages.create(
    model="claude-haiku-4-5",
    max_tokens=20,
    messages=[{"role": "user", "content": task}],
)
print("Haiku says:", fast.content[0].text)

# Swap one word to use the smart all-rounder instead:
# model="claude-sonnet-5"   <- everyday default
# model="claude-opus-4-8"   <- hardest reasoning`,
      explanation:
        "Same code, different model id. Haiku is ideal for a tiny classification like this; Sonnet or Opus would be wasteful here but shine on harder tasks.",
    },
    exercise: {
      prompt: "Change the model to the everyday-default balanced model (best mix of speed and intelligence).",
      starter: `from anthropic import Anthropic
client = Anthropic()
reply = client.messages.create(
    model="claude-haiku-4-5",   # TODO: switch to the balanced default
    max_tokens=50,
    messages=[{"role": "user", "content": "Say hi in a friendly way."}],
)
print(reply.content[0].text)`,
      solution: `from anthropic import Anthropic
client = Anthropic()
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=50,
    messages=[{"role": "user", "content": "Say hi in a friendly way."}],
)
print(reply.content[0].text)`,
    },
    quiz: [
      {
        question: "You need to label 100,000 short reviews as happy or unhappy, as cheaply as possible. Which model fits best?",
        options: ["claude-opus-4-8", "claude-fable-5", "claude-haiku-4-5", "None of them can classify"],
        answerIndex: 2,
        explanation:
          "Simple, high-volume, cheap work is exactly Haiku 4.5's sweet spot. The bigger models would cost more and add no value here.",
      },
      {
        question: "Which model is described as the best balance of speed and intelligence — the great everyday default?",
        options: ["claude-haiku-4-5", "claude-sonnet-5", "claude-opus-4-8", "claude-fable-5"],
        answerIndex: 1,
        explanation: "Claude Sonnet 5 is the balanced default that handles most tasks well.",
      },
    ],
    flashcards: [
      { front: "claude-haiku-4-5", back: "Fastest and cheapest Claude — best for simple, high-volume tasks." },
      { front: "claude-sonnet-5", back: "Best balance of speed and intelligence — the everyday default." },
      { front: "claude-opus-4-8", back: "Most capable Opus model — for the hardest reasoning where quality matters most." },
      { front: "claude-fable-5", back: "Anthropic's most capable overall model — for the very hardest, long-running work." },
    ],
    miniProject: {
      title: "Right Model for the Job",
      brief: "Match five real tasks to the cheapest model that can still do them well.",
      steps: [
        "List 5 tasks: tag spam emails, draft a polite refund reply, plan a complex multi-step migration, translate a menu, summarize a 2-line note.",
        "For each, pick Haiku, Sonnet, or Opus and write one sentence of reasoning.",
        "Note which you would prototype on Sonnet first.",
        "Explain when stepping up to Opus 4.8 or Fable 5 is actually worth the extra cost.",
      ],
    },
    industryUse: [
      "High-volume moderation pipelines run on Haiku to keep costs low at massive scale",
      "Most everyday product features (summaries, replies, search helpers) default to Sonnet",
      "Research assistants and hard coding-agent workflows step up to Opus or Fable for the toughest reasoning",
    ],
    commonMistakes: [
      "Always using the biggest model — you pay more and wait longer for jobs a smaller model nails.",
      "Guessing model names. Use the exact ids: claude-haiku-4-5, claude-sonnet-5, claude-opus-4-8, claude-fable-5.",
    ],
    interviewQuestions: [
      "How would you decide between Haiku, Sonnet, and Opus for a given feature?",
      "Why might starting on Sonnet and adjusting be smarter than picking a model up front?",
    ],
    papers: [],
    nextUp: ["claude-setup", "claude-messages"],
    cheatsheet: [
      "Haiku 4.5 = fastest + cheapest (simple, high-volume)",
      "Sonnet 5 = balanced default (everyday)",
      "Opus 4.8 = hardest reasoning",
      "Fable 5 = most capable overall (very hardest work)",
      "Change models by editing one string: the model id",
    ],
  },

  "claude-setup": {
    story:
      "Every club has a locked door and a key. To let your code walk through Claude's door, you need your own key — a secret string from Anthropic's website. You paste it once into a safe place on your computer, install Anthropic's helper library, and from then on your code can knock, send a message, and get an answer. It feels like a big deal the first time, but it is genuinely three steps: get a key, store it safely, run five lines of Python. After this lesson you will have made a real request to a real AI.",
    problem:
      "Claude will not answer just anyone — that would let strangers run up your bill. So it needs proof the request is really from you. That proof is your API key, and the trick is using it without ever pasting it straight into your code where it could leak.",
    analogy:
      "Your API key is like the PIN for your bank card. You need it to spend, but you never write it on the card itself. You keep it somewhere private and pull it out only when you pay.",
    explanation: [
      "Step 1: at console.anthropic.com, create an API key. It is a long secret string that identifies and bills your account.",
      "Step 2: store it in an environment variable named ANTHROPIC_API_KEY — a private setting on your computer, outside your code. The SDK reads it automatically.",
      "Step 3: install the SDK with \"pip install anthropic\", then create a client with Anthropic(). Because the key lives in the environment, you write Anthropic() with nothing inside the parentheses.",
      "Never paste the key directly into your code, and never commit it to GitHub — anyone who sees it can spend your money.",
      "If a key ever leaks, revoke it in the console and make a new one. Keys are cheap to replace; a leak is not.",
      "When your code runs, the SDK attaches the key to every request behind the scenes — you just call client.messages.create(...).",
    ],
    code: {
      language: "python",
      source: `# First, ONE time in your terminal (not in Python):
#   pip install anthropic
#   set the secret so your code can find it, e.g. on Mac/Linux:
#   export ANTHROPIC_API_KEY="sk-ant-your-key-here"

from anthropic import Anthropic

client = Anthropic()  # empty parentheses: it reads ANTHROPIC_API_KEY for you

reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=100,
    messages=[{"role": "user", "content": "Hello, Claude! Say hi back."}],
)
print(reply.content[0].text)   # your very first Claude answer`,
      explanation:
        "The key stays in the environment, so Anthropic() needs nothing passed in. This is the safe, standard setup you will reuse in every lesson.",
    },
    exercise: {
      prompt: "Fix this code so it reads the key from the environment safely instead of hardcoding a secret in the file.",
      starter: `from anthropic import Anthropic
# TODO: this pastes a secret straight into the code, which is unsafe. Fix it.
client = Anthropic(api_key="sk-ant-1234-SECRET")
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=50,
    messages=[{"role": "user", "content": "Hi"}],
)
print(reply.content[0].text)`,
      solution: `from anthropic import Anthropic
# The key lives in the ANTHROPIC_API_KEY environment variable, not in the code.
client = Anthropic()
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=50,
    messages=[{"role": "user", "content": "Hi"}],
)
print(reply.content[0].text)`,
    },
    quiz: [
      {
        question: "Why should you store your API key in an environment variable instead of in your code?",
        options: [
          "It makes Claude answer faster",
          "So the secret is not pasted into files that could leak or be pushed to GitHub",
          "Environment variables are required by Python",
          "It changes which model you use",
        ],
        answerIndex: 1,
        explanation:
          "Keeping the key out of your code means it will not accidentally end up in a shared file or public repository where others could steal it.",
      },
      {
        question: "You write Anthropic() with empty parentheses. Where does it get your key?",
        options: [
          "It asks you to type it each time",
          "From the ANTHROPIC_API_KEY environment variable",
          "It works without any key",
          "From the model name",
        ],
        answerIndex: 1,
        explanation: "With no key passed in, the SDK reads the ANTHROPIC_API_KEY environment variable automatically.",
      },
    ],
    flashcards: [
      { front: "API key", back: "A secret string from console.anthropic.com that proves a request is yours and bills your account." },
      { front: "ANTHROPIC_API_KEY", back: "The environment variable the SDK reads to find your key, keeping it out of your code." },
      { front: "pip install anthropic", back: "The command that installs Anthropic's official Python SDK." },
      { front: "Anthropic()", back: "Creates the client; empty parentheses means it reads the key from the environment." },
    ],
    miniProject: {
      title: "Hello, Claude",
      brief: "Make your first real request end to end and confirm it works.",
      steps: [
        "Create an API key in the Anthropic Console.",
        "Set ANTHROPIC_API_KEY in your environment (never in the code file).",
        "Run pip install anthropic, then the five-line hello example.",
        "Change the message to ask Claude for a fun fact and run it again.",
      ],
    },
    industryUse: [
      "Every company building on Claude stores keys in secret managers, never in source code",
      "Startups use environment variables locally and cloud secret stores in production",
      "Security teams rotate and revoke leaked keys instantly from the console",
    ],
    commonMistakes: [
      "Hardcoding the key in the file and pushing it to GitHub — revoke it immediately if you do.",
      "Forgetting to set the environment variable, then wondering why Anthropic() cannot authenticate.",
    ],
    interviewQuestions: [
      "Walk me through setting up your first Claude request safely.",
      "What would you do the moment you realize an API key has leaked?",
    ],
    papers: [],
    nextUp: ["claude-messages", "claude-system"],
    cheatsheet: [
      "Get a key at console.anthropic.com",
      "Store it in ANTHROPIC_API_KEY (never in code)",
      "pip install anthropic",
      "client = Anthropic()  # reads the env var",
      "Leaked key? Revoke and regenerate right away",
    ],
  },

  "claude-messages": {
    story:
      "Talking to Claude in code is like passing sticky notes back and forth. Each note has a label saying who wrote it — \"user\" for you, \"assistant\" for Claude — and the words on it. The Messages API is simply the mailbox where you drop your note and pick up Claude's reply. You always tell it three things: which model to use, how long the answer can be, and the list of notes so far. That is the entire heart of building with Claude, and once it clicks, everything else is a variation of it.",
    problem:
      "You need a precise, predictable way to send Claude what you want and understand what comes back. Vague hand-waving will not do — code needs an exact shape for the request and the reply.",
    analogy:
      "Think of a waiter taking your order: you say the dish (your message), they bring a plate (the reply). The messages list is the running order slip; each line has who spoke and what they said.",
    explanation: [
      "Every call needs three things: model (which Claude), max_tokens (a length limit for the reply), and messages (the conversation so far).",
      "messages is a list of notes. Each note is a small object: {\"role\": \"user\" or \"assistant\", \"content\": \"the words\"}.",
      "\"user\" means you (or your app's user); \"assistant\" means Claude. A basic request has just one user note.",
      "max_tokens caps how long the answer can be. Tokens are chunks of text — roughly a few characters each — so bigger numbers allow longer replies (and cost a bit more).",
      "The reply comes back with the text at reply.content[0].text. The content is a list of blocks; for a plain answer you read the first block's text.",
      "Set max_tokens sensibly: too low and the answer gets cut off mid-sentence; too high wastes nothing on short answers but leaves room for long ones.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

# The three required ingredients: model, max_tokens, messages.
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=300,
    messages=[
        {"role": "user", "content": "List three tips for saving money on groceries."},
    ],
)

# The answer text lives in the first content block:
print(reply.content[0].text)

# Handy extras Claude sends back:
print("Stopped because:", reply.stop_reason)   # e.g. "end_turn" or "max_tokens"`,
      explanation:
        "One user message goes in; Claude's text comes out at content[0].text. stop_reason tells you WHY it stopped — \"max_tokens\" means your limit cut it off.",
    },
    exercise: {
      prompt: "Add a second message so the conversation has a user note AND an assistant note, then a new user follow-up question.",
      starter: `from anthropic import Anthropic
client = Anthropic()
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "My favorite color is teal."},
        # TODO: add an assistant reply, then a new user question asking Claude to recall the color
    ],
)
print(reply.content[0].text)`,
      solution: `from anthropic import Anthropic
client = Anthropic()
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[
        {"role": "user", "content": "My favorite color is teal."},
        {"role": "assistant", "content": "Nice, teal is a calming color!"},
        {"role": "user", "content": "What did I say my favorite color was?"},
    ],
)
print(reply.content[0].text)`,
    },
    quiz: [
      {
        question: "Which three things must every Messages API call include?",
        options: [
          "model, temperature, and password",
          "model, max_tokens, and messages",
          "api_key, color, and length",
          "user, assistant, and system only",
        ],
        answerIndex: 1,
        explanation: "Every call needs model (which Claude), max_tokens (length limit), and messages (the conversation).",
      },
      {
        question: "In a message, what does the \"role\" field say?",
        options: [
          "How smart the model is",
          "Who wrote the note — \"user\" for you or \"assistant\" for Claude",
          "The price of the request",
          "Which language to answer in",
        ],
        answerIndex: 1,
        explanation: "role labels the speaker: \"user\" is your side, \"assistant\" is Claude's.",
      },
      {
        question: "Your answer gets cut off and stop_reason is \"max_tokens\". What is the fix?",
        options: [
          "Change the model to Haiku",
          "Raise max_tokens so there is room for a longer reply",
          "Delete the messages list",
          "Nothing can be done",
        ],
        answerIndex: 1,
        explanation: "\"max_tokens\" means your length cap stopped the answer early — raise max_tokens to allow more.",
      },
    ],
    flashcards: [
      { front: "messages", back: "A list of notes, each {\"role\": ..., \"content\": ...}, that make up the conversation." },
      { front: "role", back: "Who wrote a message — \"user\" (you) or \"assistant\" (Claude)." },
      { front: "max_tokens", back: "The maximum length of the reply, measured in tokens (chunks of text)." },
      { front: "reply.content[0].text", back: "Where the answer text lives in Claude's response." },
    ],
    miniProject: {
      title: "Tiny Q&A Tool",
      brief: "Build a loop that asks Claude any question you type and prints the answer.",
      steps: [
        "Use input() to grab a question from the keyboard.",
        "Put it in a single user message and call messages.create.",
        "Print reply.content[0].text and reply.stop_reason.",
        "Wrap it in a while loop so you can ask many questions in a row.",
      ],
    },
    industryUse: [
      "Every Claude-powered feature — from chatbots to summarizers — is built on messages.create",
      "Support tools pass the customer's message as a user note and show Claude's reply",
      "Data pipelines loop messages.create over thousands of rows to classify or extract",
    ],
    commonMistakes: [
      "Setting max_tokens too low and getting answers chopped off mid-sentence.",
      "Forgetting the reply is a list of blocks — read content[0].text, not the whole object.",
    ],
    interviewQuestions: [
      "Describe the shape of a Messages API request and response.",
      "What does stop_reason tell you, and how would you react to \"max_tokens\"?",
    ],
    papers: [],
    nextUp: ["claude-system", "claude-streaming"],
    cheatsheet: [
      "Required: model, max_tokens, messages",
      "message = {\"role\": \"user\"|\"assistant\", \"content\": text}",
      "Answer text: reply.content[0].text",
      "stop_reason \"max_tokens\" = raise the limit",
      "Tokens = chunks of text (a few characters each)",
    ],
  },

  "claude-system": {
    story:
      "Before an actor walks on stage, the director hands them a character card: \"You are a calm, witty librarian. Never break character.\" The actor plays every scene through that lens. A system prompt is that character card for Claude. You set it once, and it quietly shapes every reply — the tone, the rules, the persona — without you repeating yourself in each message. Pair that with the fact that Claude has no memory between calls, and you have the two ideas that turn one-off answers into a real, consistent conversation.",
    problem:
      "Two problems bite beginners fast. First, you want Claude to behave a certain way every time (polite, brief, always answer in Spanish) without pasting instructions into every message. Second, Claude forgets everything the instant a reply is sent — so how does a back-and-forth chat even work?",
    analogy:
      "The system prompt is the job description you give an employee on day one. The messages list is the ongoing conversation. And because Claude has amnesia, each call is like briefing a brand-new temp: you must hand them the whole conversation so far, every single time.",
    explanation: [
      "A system prompt is a top-level string (system=\"...\") that sets Claude's persona, rules, and style. It applies to the whole conversation.",
      "Use it for durable instructions: \"You are a friendly cooking assistant. Keep answers under three sentences. Never suggest unsafe techniques.\"",
      "The API is stateless — Claude remembers nothing between calls. To continue a chat, you resend the entire conversation each time.",
      "So a real chat works like this: keep a growing messages list, append Claude's reply as an \"assistant\" note, add the new user note, and send the whole list again.",
      "The system prompt is separate from the messages list — it is not a user or assistant note; it sits above them as standing orders.",
      "Keep system prompts clear and specific. Vague rules give vague behavior; concrete rules give reliable behavior.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

# system = the character card, applied to every reply.
system_prompt = "You are a cheerful pirate. Answer in one short sentence, always in pirate speak."

# The API forgets everything, so we keep the whole conversation ourselves.
conversation = [{"role": "user", "content": "What's the weather like at sea?"}]

reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=100,
    system=system_prompt,
    messages=conversation,
)
answer = reply.content[0].text
print(answer)

# To continue, append Claude's answer, add a new question, and resend EVERYTHING.
conversation.append({"role": "assistant", "content": answer})
conversation.append({"role": "user", "content": "And what should I eat?"})`,
      explanation:
        "system sets the persona once. Because the API is stateless, we store the conversation and resend the full list to keep the pirate remembering the chat.",
    },
    exercise: {
      prompt: "Give Claude a system prompt that makes it act as a patient math tutor who always ends with an encouraging line.",
      starter: `from anthropic import Anthropic
client = Anthropic()
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    system="",   # TODO: write the tutor persona and rule here
    messages=[{"role": "user", "content": "What is 7 times 8?"}],
)
print(reply.content[0].text)`,
      solution: `from anthropic import Anthropic
client = Anthropic()
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    system="You are a patient math tutor. Explain simply and always end with a short encouraging sentence.",
    messages=[{"role": "user", "content": "What is 7 times 8?"}],
)
print(reply.content[0].text)`,
    },
    quiz: [
      {
        question: "What is a system prompt best used for?",
        options: [
          "Storing your API key",
          "Setting Claude's persona, rules, and style for the whole conversation",
          "Making the reply longer",
          "Choosing which model to use",
        ],
        answerIndex: 1,
        explanation: "The system prompt is standing orders — persona, tone, and rules that apply across every reply.",
      },
      {
        question: "The Claude API is \"stateless.\" What does that mean for a multi-turn chat?",
        options: [
          "Claude saves your chat automatically",
          "You must resend the whole conversation each call, because Claude remembers nothing between calls",
          "You can only send one message ever",
          "The state is stored on Anthropic's servers for you",
        ],
        answerIndex: 1,
        explanation: "Stateless = no memory between calls. You keep the conversation yourself and resend it every time to continue.",
      },
    ],
    flashcards: [
      { front: "System prompt", back: "A top-level string that sets Claude's persona, rules, and style for the whole conversation." },
      { front: "Stateless", back: "The API keeps no memory between calls — you must resend the conversation each time." },
      { front: "Multi-turn chat", back: "Keep a growing messages list, append each reply, add the new question, and resend it all." },
      { front: "assistant note", back: "A message with role \"assistant\" holding what Claude said, added back to continue the chat." },
    ],
    miniProject: {
      title: "Personality Chatbot",
      brief: "Build a small chatbot with a fixed personality that remembers the conversation.",
      steps: [
        "Write a fun system prompt (e.g. a wise owl or a hyper coach).",
        "Keep a conversation list and loop: read input, send it, print the reply.",
        "After each reply, append the assistant note so the bot remembers.",
        "Try changing only the system prompt and watch the whole vibe change.",
      ],
    },
    industryUse: [
      "Companies use system prompts to lock a brand voice into every AI reply",
      "Support bots use them to enforce rules like \"never promise refunds without a ticket\"",
      "Tutoring apps set a patient-teacher persona so lessons stay consistent",
    ],
    commonMistakes: [
      "Forgetting the API is stateless and expecting Claude to remember earlier messages on its own.",
      "Writing vague system prompts (\"be helpful\") instead of concrete rules (\"answer in under 3 sentences\").",
    ],
    interviewQuestions: [
      "What is a system prompt and how does it differ from a user message?",
      "How do you implement a multi-turn conversation given a stateless API?",
    ],
    papers: [],
    nextUp: ["claude-streaming", "claude-prompting"],
    cheatsheet: [
      "system=\"...\" sets persona/rules for the whole chat",
      "API is stateless: resend the full conversation each call",
      "Append the assistant reply to keep memory",
      "Concrete rules beat vague ones",
      "System prompt is separate from the messages list",
    ],
  },

  "claude-streaming": {
    story:
      "Picture asking a friend a big question and them staring silently for ten seconds before dumping the whole answer at once. Awkward, right? Now picture them thinking out loud, words flowing as they go. That is the difference streaming makes. Instead of waiting for Claude to finish the entire reply and then showing it, streaming prints each word the instant it is ready — exactly like the typing effect you see on the Claude website. For anything a person watches, it turns a nervous wait into a lively, responsive feel.",
    problem:
      "Long answers take time. If your app freezes with a blank screen until the whole reply lands, users think it is broken. You want them to see progress immediately, word by word.",
    analogy:
      "Non-streaming is a letter that arrives complete in the mailbox. Streaming is a phone call — you hear each word as it is spoken, so you never wonder if the line went dead.",
    explanation: [
      "Normal calls wait for the full reply, then hand it over all at once. Streaming hands you the text in small pieces as Claude writes it.",
      "In Python you open a stream with a \"with\" block: with client.messages.stream(...) as stream: and then loop over stream.text_stream.",
      "Each loop step gives you the next chunk of words. Print it with end=\"\" so the pieces flow together like natural typing.",
      "Use streaming whenever a human is watching a longer answer — chatbots, writing tools, anything with visible output.",
      "You do not need streaming for quick background jobs where nobody is watching (like labeling data) — there, just take the whole answer at once.",
      "Streaming does not change the answer or the cost; it only changes WHEN the words show up.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

# Open a stream and print each piece the moment it arrives.
with client.messages.stream(
    model="claude-sonnet-5",
    max_tokens=300,
    messages=[{"role": "user", "content": "Write a short bedtime story about a sleepy robot."}],
) as stream:
    for text in stream.text_stream:   # each loop = the next few words
        print(text, end="", flush=True)   # end="" keeps them on one flowing line

print()   # a final newline once the story is done`,
      explanation:
        "The \"with\" block opens the stream; the loop prints words as they arrive. flush=True forces them to show instantly, giving that live-typing feel.",
    },
    exercise: {
      prompt: "Turn this normal (non-streaming) call into a streaming one so the answer prints word by word.",
      starter: `from anthropic import Anthropic
client = Anthropic()
# TODO: change this to stream the reply piece by piece
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[{"role": "user", "content": "Explain rainbows to a child."}],
)
print(reply.content[0].text)`,
      solution: `from anthropic import Anthropic
client = Anthropic()
with client.messages.stream(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[{"role": "user", "content": "Explain rainbows to a child."}],
) as stream:
    for text in stream.text_stream:
        print(text, end="", flush=True)
print()`,
    },
    quiz: [
      {
        question: "What does streaming change about a Claude response?",
        options: [
          "It makes the answer smarter",
          "It shows the text piece by piece as it is generated, instead of all at once",
          "It makes the request free",
          "It picks a different model",
        ],
        answerIndex: 1,
        explanation: "Streaming changes WHEN you see the words — piece by piece — not the content or cost of the answer.",
      },
      {
        question: "When is streaming most worth using?",
        options: [
          "For quiet background jobs nobody watches",
          "When a person is watching a longer answer appear, like in a chatbot",
          "Only for one-word answers",
          "Never — it is always slower",
        ],
        answerIndex: 1,
        explanation: "Streaming shines when a human watches output; it makes longer answers feel responsive instead of frozen.",
      },
    ],
    flashcards: [
      { front: "Streaming", back: "Receiving Claude's reply in small pieces as it is written, instead of all at once." },
      { front: "client.messages.stream(...)", back: "Opens a streaming response inside a \"with\" block." },
      { front: "stream.text_stream", back: "The loop that yields each new chunk of text as it arrives." },
      { front: "end=\"\", flush=True", back: "Print options that keep chunks flowing on one line and show instantly." },
    ],
    miniProject: {
      title: "Live Story Writer",
      brief: "Make a tool that streams a custom short story to the screen as it is written.",
      steps: [
        "Ask the user for a topic with input().",
        "Open a stream that asks Claude for a short story on that topic.",
        "Print each chunk with end=\"\" so it types out live.",
        "Add a system prompt to fix the tone (spooky, funny, gentle) and compare.",
      ],
    },
    industryUse: [
      "The Claude and ChatGPT chat interfaces stream so replies feel like live typing",
      "Coding assistants stream suggestions so developers see progress instantly",
      "Writing apps stream drafts so users can start reading before the piece finishes",
    ],
    commonMistakes: [
      "Forgetting end=\"\" so every chunk lands on its own line and looks broken.",
      "Streaming background jobs where nobody watches — it adds complexity for zero benefit there.",
    ],
    interviewQuestions: [
      "Why would you stream a response instead of waiting for the whole thing?",
      "Does streaming change the final answer or its cost? Explain.",
    ],
    papers: [],
    nextUp: ["claude-tools", "claude-prompting"],
    cheatsheet: [
      "Streaming = words appear as they are written",
      "with client.messages.stream(...) as stream:",
      "for text in stream.text_stream: print(text, end=\"\")",
      "Use it when a human watches longer output",
      "Same answer, same cost — just shown live",
    ],
  },

  "claude-tools": {
    story:
      "Claude is brilliant with words but sealed in a room: it cannot check today's weather, look up your order, or do live math against your database. Tool use hands Claude a phone. You describe the tools it may call — \"get_weather takes a city and returns the temperature\" — and when a question needs one, Claude does not guess. It says \"please run get_weather for Paris.\" Your code runs it, hands back the real result, and Claude weaves that fact into a natural answer. This is the leap from a clever chatbot to something that can actually DO things with live data.",
    problem:
      "Claude's knowledge is frozen and it has no access to your systems. Ask \"what's the weather now?\" or \"what's the status of order #4471?\" and a plain model can only make something up. You need it to pull real, current facts and take real actions.",
    analogy:
      "It is like a smart receptionist who does not know your stock levels by heart but knows to walk to the warehouse computer and check. You give them the computer (the tool); they know when to go look and how to use the answer.",
    explanation: [
      "You pass a tools list. Each tool has a name, a description (when to use it), and an input_schema describing what information it needs.",
      "When a question calls for a tool, Claude replies with a tool_use block: the tool name plus the inputs it wants (like {\"city\": \"Paris\"}).",
      "Your code sees that, actually runs the function, and sends the result back as a tool_result block in a new message.",
      "Claude reads the real result and writes the final human answer using that fact. This is a short back-and-forth loop, not one call.",
      "Tools are how you give Claude live data (weather, prices, your database) and real actions (send an email, book a slot).",
      "Write clear tool descriptions — they are how Claude decides WHEN to reach for each tool. Vague descriptions lead to missed or wrong tool calls.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

# 1. Describe the tool: name, when to use it, and what input it needs.
tools = [{
    "name": "get_weather",
    "description": "Get the current temperature for a city.",
    "input_schema": {
        "type": "object",
        "properties": {"city": {"type": "string"}},
        "required": ["city"],
    },
}]

# 2. Ask a question that needs the tool.
messages = [{"role": "user", "content": "What is the weather in Paris?"}]
reply = client.messages.create(
    model="claude-sonnet-5", max_tokens=300, tools=tools, messages=messages,
)

# 3. If Claude asked for the tool, run it and send the real result back.
for block in reply.content:
    if block.type == "tool_use":
        city = block.input["city"]
        result = "18 degrees and sunny"        # your real function would go here
        messages.append({"role": "assistant", "content": reply.content})
        messages.append({"role": "user", "content": [
            {"type": "tool_result", "tool_use_id": block.id, "content": result},
        ]})
        final = client.messages.create(
            model="claude-sonnet-5", max_tokens=300, tools=tools, messages=messages,
        )
        print(final.content[0].text)   # Claude's natural answer using the real weather`,
      explanation:
        "Claude asks to run get_weather, your code supplies the real result via tool_result, and Claude turns that fact into a friendly final sentence.",
    },
    exercise: {
      prompt: "Fill in the tool description so Claude knows this tool looks up the price of a product by its name.",
      starter: `tools = [{
    "name": "get_price",
    "description": "",   # TODO: describe clearly WHEN and WHAT this tool does
    "input_schema": {
        "type": "object",
        "properties": {"product": {"type": "string"}},
        "required": ["product"],
    },
}]`,
      solution: `tools = [{
    "name": "get_price",
    "description": "Look up the current price of a product by its name. Use when the user asks how much something costs.",
    "input_schema": {
        "type": "object",
        "properties": {"product": {"type": "string"}},
        "required": ["product"],
    },
}]`,
    },
    quiz: [
      {
        question: "What happens when Claude decides it needs a tool?",
        options: [
          "It runs the tool itself on Anthropic's servers",
          "It replies with a tool_use block naming the tool and the inputs it wants, and your code runs it",
          "It refuses to answer",
          "It guesses the answer anyway",
        ],
        answerIndex: 1,
        explanation: "Claude asks for the tool via a tool_use block; YOUR code runs the function and returns the result for Claude to use.",
      },
      {
        question: "What do you send back to Claude after running the tool?",
        options: [
          "A new system prompt",
          "A tool_result block containing the real output, matched by tool_use_id",
          "The API key",
          "Nothing — Claude already knows",
        ],
        answerIndex: 1,
        explanation: "You return a tool_result block with the actual result so Claude can write the final answer from real data.",
      },
      {
        question: "Why do tool descriptions matter so much?",
        options: [
          "They set the model's speed",
          "They are how Claude decides WHEN to use each tool",
          "They store your key",
          "They change max_tokens",
        ],
        answerIndex: 1,
        explanation: "Claude reads the description to judge whether a tool fits the question — clear descriptions mean the right tool gets called.",
      },
    ],
    flashcards: [
      { front: "Tool use", back: "Letting Claude call functions you define to fetch live data or take actions." },
      { front: "tool_use block", back: "Claude's reply asking to run a named tool with specific inputs." },
      { front: "tool_result block", back: "The message you send back containing the real output of the tool." },
      { front: "input_schema", back: "A description of what information a tool needs (its input fields and types)." },
    ],
    miniProject: {
      title: "Weather Buddy",
      brief: "Give Claude a real (or pretend) weather tool and let it answer weather questions with live data.",
      steps: [
        "Define a get_weather tool with a clear description and a city input.",
        "Write a Python function that returns a temperature (a fixed string is fine to start).",
        "Handle the tool_use block: run your function, send back a tool_result.",
        "Print Claude's final answer, then try asking about two cities in one question.",
      ],
    },
    industryUse: [
      "Shopping assistants call inventory and pricing tools to answer with real stock",
      "Travel bots use tools to check live flight availability and book seats",
      "Internal company assistants query databases and calendars through tools",
    ],
    commonMistakes: [
      "Writing a vague tool description so Claude never calls it (or calls the wrong one).",
      "Forgetting to append the assistant's tool_use content before sending the tool_result — the ids must line up.",
    ],
    interviewQuestions: [
      "Walk through the full loop of a single tool call from question to final answer.",
      "Why is tool use necessary for questions about live or private data?",
    ],
    papers: [],
    nextUp: ["claude-agents", "claude-vision"],
    cheatsheet: [
      "tools = [{name, description, input_schema}]",
      "Claude replies with a tool_use block",
      "Your code runs the tool, returns tool_result",
      "Claude writes the final answer from the real result",
      "Clear descriptions = correct tool choices",
    ],
  },

  "claude-vision": {
    story:
      "For a long time, AI could only read words. Show it a photo of a receipt and it shrugged. Not anymore. Claude has eyes: you can hand it an image or a PDF right alongside your question, and it will read the words, describe the scene, pull numbers out of a table, or explain a chart. Snap a picture of a handwritten note and ask \"what does this say?\" Drop in a five-page contract PDF and ask \"what's the deadline?\" The way you do it barely changes from sending plain text — you just add an image or document block to your message.",
    problem:
      "So much information lives in pictures and documents, not tidy text: receipts, screenshots, scanned forms, charts, PDFs. If Claude could only accept typed words, all of that would be locked away from your app.",
    analogy:
      "It is like upgrading a pen-pal who could only read your letters into a friend you can also show photos and hand documents to. Same conversation, but now they can look, not just read.",
    explanation: [
      "A message's content can be a LIST of blocks instead of one plain string — mixing an image (or document) block with a text block.",
      "An image block looks like {\"type\": \"image\", \"source\": {...}} where the source points to the picture's data.",
      "A PDF goes in as a document block — Claude can read multi-page documents and answer questions about them.",
      "Put the picture or document first and your question second, so Claude sees what you are asking about before the ask.",
      "Great uses: reading receipts and forms, describing photos, extracting tables from screenshots, summarizing a PDF report.",
      "This is the same messages.create call you already know — you have just enriched the content with more than text.",
    ],
    code: {
      language: "python",
      source: `import base64
from anthropic import Anthropic
client = Anthropic()

# Read an image file and encode it so it can travel in the request.
with open("receipt.png", "rb") as f:
    image_data = base64.standard_b64encode(f.read()).decode("utf-8")

# The content is now a LIST: an image block, then a text question.
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=300,
    messages=[{
        "role": "user",
        "content": [
            {"type": "image", "source": {
                "type": "base64",
                "media_type": "image/png",
                "data": image_data,
            }},
            {"type": "text", "text": "What is the total amount on this receipt?"},
        ],
    }],
)
print(reply.content[0].text)`,
      explanation:
        "The message content is a list: an image block carrying the picture, plus a text block with the question. Claude looks at the image to answer.",
    },
    exercise: {
      prompt: "Reorder the content list so the image comes BEFORE the text question (best practice), then set the question to ask what is in the photo.",
      starter: `content = [
    {"type": "text", "text": "What is the total?"},   # TODO: move image first, change question
    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}},
]`,
      solution: `content = [
    {"type": "image", "source": {"type": "base64", "media_type": "image/png", "data": image_data}},
    {"type": "text", "text": "What is in this photo? Describe it briefly."},
]`,
    },
    quiz: [
      {
        question: "How do you send an image to Claude?",
        options: [
          "You cannot — Claude only reads text",
          "As an image block inside the message content list, alongside your text question",
          "By pasting the file path into the system prompt",
          "By emailing it to Anthropic",
        ],
        answerIndex: 1,
        explanation: "You make the content a list that includes an image block plus your text question.",
      },
      {
        question: "Besides images, what other kind of file can Claude read directly?",
        options: ["PDF documents", "Video files", "ZIP archives", "Music files"],
        answerIndex: 0,
        explanation: "Claude can read PDF documents via document blocks and answer questions about them.",
      },
    ],
    flashcards: [
      { front: "Vision", back: "Claude's ability to read images and documents, not just text." },
      { front: "image block", back: "A content block {\"type\": \"image\", \"source\": {...}} that carries a picture." },
      { front: "document block", back: "A content block that carries a PDF so Claude can read it." },
      { front: "content list", back: "A message content made of multiple blocks (image/document + text) instead of one string." },
    ],
    miniProject: {
      title: "Receipt Reader",
      brief: "Build a tool that reads a photo of a receipt and pulls out the total and the date.",
      steps: [
        "Take or find a clear photo of a receipt and save it.",
        "Encode it and put it in an image block before your question.",
        "Ask Claude for the total and the date in a short reply.",
        "Try a blurry photo and see how the answer changes — note what makes reading easier.",
      ],
    },
    industryUse: [
      "Expense apps read receipt photos to auto-fill amounts and dates",
      "Insurance firms use Claude to read scanned claim forms and PDFs",
      "Accessibility tools describe images aloud for people who are blind or low-vision",
    ],
    commonMistakes: [
      "Sending a plain string when you meant to send blocks — image input needs a content LIST.",
      "Putting the question before the image; put the image first so Claude sees it before the ask.",
    ],
    interviewQuestions: [
      "How would you have Claude extract fields from a scanned form?",
      "What changes in a request when you add an image versus plain text?",
    ],
    papers: [],
    nextUp: ["claude-caching", "claude-prompting"],
    cheatsheet: [
      "content can be a LIST of blocks",
      "image block: {\"type\": \"image\", \"source\": {...}}",
      "PDFs go in as document blocks",
      "Put the image/document before the text question",
      "Same messages.create — just richer content",
    ],
  },

  "claude-caching": {
    story:
      "Imagine reading a 50-page instruction manual aloud before answering every single question about it. Exhausting, slow, and you would repeat the same 50 pages a hundred times a day. Prompt caching lets Claude memorize that big, unchanging chunk once, then reuse the memory on every following question. You mark the stable part — say a long system prompt or a document — and repeat calls become dramatically cheaper and faster, because Claude does not re-read what it already knows. It is the single easiest way to cut cost when you send the same big context over and over.",
    problem:
      "Many apps prepend the same huge block to every request — a long set of rules, a knowledge base, a big document. Paying to process those same thousands of words on every call is slow and expensive, and it adds up fast.",
    analogy:
      "It is like a barista who memorizes your complicated regular order. The first time you explain it in full; after that you just say \"the usual\" and it is ready in seconds. Caching is Claude remembering \"the usual\" big context.",
    explanation: [
      "Caching helps when a large part of your prompt stays the SAME across many calls, and only a small part (the user's new question) changes.",
      "You add a marker, \"cache_control\": {\"type\": \"ephemeral\"}, to the big, stable block you want remembered.",
      "The first call pays to store it; every later call that reuses that exact block is much cheaper and faster.",
      "The catch: the cached part must be byte-for-byte identical each time. Change one word in it and the memory is thrown away.",
      "So put stable content first (long rules, a document) and keep the changing bits (today's question, a timestamp) at the end, after the cached block.",
      "Do not bother caching tiny prompts or content that changes every call — there is nothing stable to reuse.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

big_manual = "... imagine 40 pages of unchanging company policy here ..."

reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=300,
    system=[
        {
            "type": "text",
            "text": big_manual,
            # Mark this big, stable block to be remembered across calls:
            "cache_control": {"type": "ephemeral"},
        },
    ],
    # The changing part (the user's question) stays OUTSIDE the cached block:
    messages=[{"role": "user", "content": "Can I get a refund after 30 days?"}],
)
print(reply.content[0].text)

# See it working: cache_read_input_tokens grows on repeat calls.
print("Read from cache:", reply.usage.cache_read_input_tokens)`,
      explanation:
        "The big manual is marked with cache_control, so repeat calls reuse it cheaply. The question stays outside the cache because it changes each time.",
    },
    exercise: {
      prompt: "Add the cache_control marker to the large stable block so it gets cached on repeat calls.",
      starter: `system = [
    {
        "type": "text",
        "text": big_manual,
        # TODO: add the cache_control marker here
    },
]`,
      solution: `system = [
    {
        "type": "text",
        "text": big_manual,
        "cache_control": {"type": "ephemeral"},
    },
]`,
    },
    quiz: [
      {
        question: "When does prompt caching actually save you money?",
        options: [
          "When every request is completely different",
          "When a large part of the prompt stays identical across many calls",
          "Only on the very first request",
          "When you use the biggest model",
        ],
        answerIndex: 1,
        explanation: "Caching pays off when a big block repeats unchanged — Claude reuses it instead of re-processing it each time.",
      },
      {
        question: "What breaks the cache and forces Claude to re-read the block?",
        options: [
          "Asking a new question at the end",
          "Changing even one word inside the cached block, since it must match exactly",
          "Using streaming",
          "Waiting a few seconds",
        ],
        answerIndex: 1,
        explanation: "The cached portion must be byte-for-byte identical. Any change inside it invalidates the memory.",
      },
    ],
    flashcards: [
      { front: "Prompt caching", back: "Reusing a large, stable prompt block across calls to save cost and time." },
      { front: "cache_control", back: "The marker {\"type\": \"ephemeral\"} you add to a block you want remembered." },
      { front: "Stable-first rule", back: "Put unchanging content early and changing content (questions, timestamps) last." },
      { front: "cache_read_input_tokens", back: "A usage field showing how many tokens were reused from the cache." },
    ],
    miniProject: {
      title: "Cached FAQ Bot",
      brief: "Build an FAQ helper that caches a long policy document and answers many questions cheaply.",
      steps: [
        "Paste a long (fake) policy into a big string.",
        "Put it in the system block with cache_control marked.",
        "Ask three different questions in a row against it.",
        "Print cache_read_input_tokens each time and watch it rise after the first call.",
      ],
    },
    industryUse: [
      "Support bots cache a big knowledge base so every customer question is cheap",
      "Coding assistants cache large codebase context across a session",
      "Document Q&A tools cache a long PDF once, then answer many questions about it",
    ],
    commonMistakes: [
      "Slipping a changing value (like a timestamp) into the cached block, silently destroying the cache.",
      "Trying to cache tiny prompts where there is nothing large and stable to reuse.",
    ],
    interviewQuestions: [
      "What kind of workload benefits most from prompt caching?",
      "Why must the cached portion of the prompt be identical between calls?",
    ],
    papers: [],
    nextUp: ["claude-prompting", "claude-agents"],
    cheatsheet: [
      "Cache big, stable prompt parts",
      "Add cache_control: {type: ephemeral} to that block",
      "First call stores it; repeats are cheaper + faster",
      "Cached part must be identical each time",
      "Stable content first, changing content last",
    ],
  },

  "claude-prompting": {
    story:
      "Claude is like an eager, capable new hire who does exactly what you ask — so if you ask fuzzily, you get fuzzy work. \"Write something about dogs\" gets you a shrug of a paragraph. \"Write three friendly tips for first-time dog owners, one sentence each, aimed at busy people\" gets you exactly what you pictured. Prompt engineering is just the skill of asking clearly. It is not magic words or secret tricks — it is being specific about what you want, who it is for, and what the answer should look like. Master this and every other feature in this course works better.",
    problem:
      "Beginners blame the model when they get vague or off-target answers, but the real cause is usually a vague or off-target request. You need reliable ways to steer Claude toward the exact output you want.",
    analogy:
      "It is like ordering coffee. \"A coffee\" gets you whatever the barista guesses. \"A small oat-milk latte, extra hot, no sugar\" gets you your drink. Specific requests get specific results.",
    explanation: [
      "Be specific and concrete. State the task, the audience, the tone, and the length instead of leaving Claude to guess.",
      "Show the shape you want. Ask for \"three bullet points\" or \"a JSON list of names\" and Claude will follow that format.",
      "Give an example when the format is tricky — one sample input and output teaches Claude the pattern instantly.",
      "Use the system prompt for durable rules (persona, style, constraints) and the user message for the specific task at hand.",
      "Break big asks into clear steps: \"First summarize, then list risks, then suggest a fix\" beats one vague mega-request.",
      "Iterate. If the first answer misses, do not give up — tighten the wording, add a constraint, and try again. Prompting is a quick feedback loop.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

# Vague ask -> unpredictable answer:
vague = "Tell me about this email."

# Specific ask -> exactly what you want, in the shape you want:
clear = (
    "Summarize this email in one sentence, then list any action items "
    "as short bullet points. Email: 'Hi team, please send Q3 numbers by "
    "Friday and book the review room for Monday.'"
)

reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=250,
    system="You are a concise, helpful assistant. Never add filler.",
    messages=[{"role": "user", "content": clear}],
)
print(reply.content[0].text)`,
      explanation:
        "The clear prompt names the task (summarize), the format (one sentence + bullets), and gives the content. Specific in, specific out.",
    },
    exercise: {
      prompt: "Rewrite this vague prompt to be specific: ask for exactly 3 bullet points, aimed at beginners, each under 12 words.",
      starter: `prompt = "Give me some tips about saving money."  # TODO: make it specific
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[{"role": "user", "content": prompt}],
)
print(reply.content[0].text)`,
      solution: `prompt = "Give exactly 3 money-saving tips for beginners, as bullet points, each under 12 words."
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=200,
    messages=[{"role": "user", "content": prompt}],
)
print(reply.content[0].text)`,
    },
    quiz: [
      {
        question: "What is the core idea of prompt engineering?",
        options: [
          "Finding secret magic words",
          "Asking clearly and specifically — task, audience, tone, and format",
          "Always using the biggest model",
          "Making prompts as long as possible",
        ],
        answerIndex: 1,
        explanation: "Good prompting is clear, specific instruction — not tricks. State what you want and what the answer should look like.",
      },
      {
        question: "Your format is tricky and Claude keeps getting it wrong. What helps most?",
        options: [
          "Give one clear example of the input and the desired output",
          "Repeat the same vague ask louder",
          "Remove all instructions",
          "Lower max_tokens to zero",
        ],
        answerIndex: 0,
        explanation: "A single worked example teaches Claude the exact pattern you want far better than more vague words.",
      },
    ],
    flashcards: [
      { front: "Prompt engineering", back: "The skill of asking Claude clearly and specifically to get the output you want." },
      { front: "Be specific", back: "State the task, audience, tone, and length instead of leaving Claude to guess." },
      { front: "Show the format", back: "Ask for the exact shape (bullets, JSON, one sentence) you want back." },
      { front: "Give an example", back: "Provide one sample input and output to teach a tricky format instantly." },
    ],
    miniProject: {
      title: "Prompt Makeover",
      brief: "Take three lazy prompts and rewrite each into a specific one, then compare the answers.",
      steps: [
        "Write three vague prompts (e.g. \"explain taxes\").",
        "Rewrite each with task, audience, tone, and format specified.",
        "Run both versions and read the difference side by side.",
        "Add a system prompt rule and note how it sharpens every answer.",
      ],
    },
    industryUse: [
      "Product teams keep a library of tested prompts as reusable building blocks",
      "Support tools use example-driven prompts to force a consistent reply format",
      "Analysts break big analyses into stepwise prompts for reliable output",
    ],
    commonMistakes: [
      "Blaming the model for vague answers when the prompt itself was vague.",
      "Asking for a strict format (like JSON) without showing an example of it.",
    ],
    interviewQuestions: [
      "How would you improve a prompt that keeps returning off-target answers?",
      "When do you put instructions in the system prompt versus the user message?",
    ],
    papers: [],
    nextUp: ["claude-agents", "claude-capstone"],
    cheatsheet: [
      "Be specific: task + audience + tone + length",
      "Show the format you want",
      "Give one example for tricky shapes",
      "System prompt = durable rules; user msg = the task",
      "Iterate — tighten and retry",
    ],
  },

  "claude-agents": {
    story:
      "So far Claude answers in one shot. An agent is Claude let loose to work a problem step by step until it is done. Give it a goal — \"find out today's weather in three cities and tell me which is warmest\" — plus some tools, and put it in a loop: Claude picks a tool, sees the result, decides the next move, and keeps going until it has the answer. It is the difference between asking a friend a question and handing them a task, then letting them make calls and check things until they come back with the finished result. Agents combine everything you have learned: tools, a goal, and a loop.",
    problem:
      "Real tasks rarely fit in a single question-and-answer. They need several steps, each depending on the last: look something up, use that to decide, look up more, then conclude. A one-shot call cannot do this on its own.",
    analogy:
      "A single call is asking \"what's 2+2?\" An agent is saying \"plan my dinner party\" — it checks the guest count, looks up recipes, builds a shopping list, and adjusts as it learns, all before reporting back.",
    explanation: [
      "An agent = Claude in a loop with tools. It decides which tool to call, sees the result, and continues toward a goal.",
      "Each loop step: send the conversation, check if Claude asked for a tool, run it, feed the result back, and repeat.",
      "The loop ends when Claude stops asking for tools and gives a final answer — that is its \"I'm done\" signal (stop_reason \"end_turn\").",
      "This is just tool use plus a goal plus repetition. You already know every piece; the agent wires them into a cycle.",
      "Give the agent a clear goal and good tools, and always cap the number of loops so a confused agent cannot run forever.",
      "Use agents for genuinely multi-step tasks. For a simple one-shot answer, a single call is simpler and cheaper.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

tools = [{
    "name": "get_weather",
    "description": "Get the current temperature for a city.",
    "input_schema": {"type": "object",
        "properties": {"city": {"type": "string"}}, "required": ["city"]},
}]

def run_tool(name, args):
    return "20 degrees"   # your real function goes here

messages = [{"role": "user", "content": "Which is warmer right now, Paris or Cairo?"}]

# The agent loop: keep going until Claude stops asking for tools.
for step in range(5):   # a safety cap so it cannot loop forever
    reply = client.messages.create(
        model="claude-sonnet-5", max_tokens=400, tools=tools, messages=messages)
    messages.append({"role": "assistant", "content": reply.content})
    if reply.stop_reason != "tool_use":
        print(reply.content[0].text)   # done: final answer
        break
    results = []
    for block in reply.content:
        if block.type == "tool_use":
            results.append({"type": "tool_result", "tool_use_id": block.id,
                            "content": run_tool(block.name, block.input)})
    messages.append({"role": "user", "content": results})`,
      explanation:
        "Claude calls get_weather for each city, sees the results, and loops until it can answer which is warmer. The range(5) cap keeps it from running forever.",
    },
    exercise: {
      prompt: "Add a safety cap: change the loop so the agent runs at most 3 times instead of looping forever.",
      starter: `while True:   # TODO: cap this at 3 loops so a confused agent cannot run forever
    reply = client.messages.create(
        model="claude-sonnet-5", max_tokens=400, tools=tools, messages=messages)
    if reply.stop_reason != "tool_use":
        break`,
      solution: `for step in range(3):
    reply = client.messages.create(
        model="claude-sonnet-5", max_tokens=400, tools=tools, messages=messages)
    if reply.stop_reason != "tool_use":
        break`,
    },
    quiz: [
      {
        question: "What is an agent, in simple terms?",
        options: [
          "A bigger, more expensive model",
          "Claude in a loop with tools, deciding steps toward a goal until it is done",
          "A different company's AI",
          "A way to cache prompts",
        ],
        answerIndex: 1,
        explanation: "An agent is Claude looping with tools: it picks a tool, sees the result, and continues until it reaches the goal.",
      },
      {
        question: "How does the agent loop know when to stop?",
        options: [
          "After exactly one call, always",
          "When Claude stops asking for tools and gives a final answer",
          "When the API key expires",
          "It never stops",
        ],
        answerIndex: 1,
        explanation: "When Claude no longer requests a tool (stop_reason \"end_turn\"), it has produced its final answer and the loop ends.",
      },
      {
        question: "Why should you cap the number of loops?",
        options: [
          "To make answers longer",
          "So a confused or stuck agent cannot run forever and rack up cost",
          "It is required by Python",
          "To change the model",
        ],
        answerIndex: 1,
        explanation: "A cap is a safety net: it stops an agent that gets stuck from looping endlessly and burning money.",
      },
    ],
    flashcards: [
      { front: "Agent", back: "Claude in a loop with tools, deciding each step toward a goal until it finishes." },
      { front: "Agent loop", back: "Send conversation, run any requested tool, feed the result back, repeat until done." },
      { front: "stop_reason end_turn", back: "The signal that Claude is finished and gave its final answer, ending the loop." },
      { front: "Loop cap", back: "A maximum number of iterations so a stuck agent cannot run forever." },
    ],
    miniProject: {
      title: "Two-City Weather Agent",
      brief: "Build an agent that compares the weather in two cities and reports which is warmer.",
      steps: [
        "Define a get_weather tool and a Python function that returns a temperature.",
        "Start with a goal message comparing two cities.",
        "Loop: run any tool Claude asks for, feed results back, stop when it answers.",
        "Add a loop cap and test with a question needing two tool calls.",
      ],
    },
    industryUse: [
      "Coding agents read files, run tests, and fix bugs across many steps",
      "Research assistants search, read, and synthesize sources into a report",
      "Customer-service agents look up orders, check policies, and take action in a loop",
    ],
    commonMistakes: [
      "Forgetting a loop cap, so a confused agent spins forever and burns money.",
      "Using an agent for a simple one-shot question where a single call would do.",
    ],
    interviewQuestions: [
      "Explain how an agent differs from a single Claude call.",
      "What safety limits would you put on an agent loop, and why?",
    ],
    papers: [],
    nextUp: ["claude-capstone", "claude-tools"],
    cheatsheet: [
      "Agent = Claude + tools + a loop + a goal",
      "Each loop: call, run tools, feed results back",
      "Stop when stop_reason is end_turn",
      "Always cap the number of loops",
      "Use for multi-step tasks, not one-shot answers",
    ],
  },

  "claude-capstone": {
    story:
      "This is where it all comes together. You are going to build a small but real Claude-powered assistant — one that holds a conversation with a persona, uses a tool to fetch live information, and streams its answers so they feel alive. Nothing here is new: you already learned messages, system prompts, conversation memory, tools, and streaming. The capstone is simply wiring those pieces into one thing you can proudly show someone. By the end you will have gone from \"what is Claude?\" to a working app that answers, remembers, acts, and types back in real time.",
    problem:
      "Learning features one at a time is easy; combining them into a coherent app is the real test. A finished assistant needs personality, memory across turns, the ability to look things up, and a responsive feel — all at once.",
    analogy:
      "You have learned each instrument; the capstone is playing them together as a small band. The magic is not any single part — it is how they harmonize into one experience.",
    explanation: [
      "Persona: a system prompt gives your assistant a consistent voice and rules (from the system-prompts lesson).",
      "Memory: keep a growing messages list and resend it each turn, since the API is stateless (from the conversations lesson).",
      "Ability: give it a tool so it can fetch live info or take an action, handling the tool_use / tool_result loop (from the tool-use and agents lessons).",
      "Feel: stream the final answer so it types out live for the user (from the streaming lesson).",
      "Cost sense: pick a sensible model (Sonnet 5 is a great default) and reasonable max_tokens; cache any big fixed context if you have one.",
      "Safety: keep your key in the environment, cap agent loops, and handle the case where Claude declines or hits an error gracefully.",
    ],
    code: {
      language: "python",
      source: `from anthropic import Anthropic
client = Anthropic()

SYSTEM = "You are Nova, a warm, upbeat travel helper. Keep replies short and cheerful."

tools = [{
    "name": "get_weather",
    "description": "Get the current temperature for a city.",
    "input_schema": {"type": "object",
        "properties": {"city": {"type": "string"}}, "required": ["city"]},
}]

def run_tool(name, args):
    return "24 degrees and clear"   # your real lookup goes here

conversation = [{"role": "user", "content": "I'm visiting Rome. What should I pack?"}]

# One turn of the assistant: think, use a tool if needed, then stream the answer.
reply = client.messages.create(
    model="claude-sonnet-5", max_tokens=500,
    system=SYSTEM, tools=tools, messages=conversation)
conversation.append({"role": "assistant", "content": reply.content})

if reply.stop_reason == "tool_use":
    results = [{"type": "tool_result", "tool_use_id": b.id,
                "content": run_tool(b.name, b.input)}
               for b in reply.content if b.type == "tool_use"]
    conversation.append({"role": "user", "content": results})
    with client.messages.stream(
        model="claude-sonnet-5", max_tokens=500,
        system=SYSTEM, tools=tools, messages=conversation) as stream:
        for text in stream.text_stream:
            print(text, end="", flush=True)
    print()`,
      explanation:
        "Nova has a persona (system), memory (conversation list), an ability (weather tool), and a live feel (streaming). Every course idea, working together.",
    },
    exercise: {
      prompt: "Give the assistant its personality: fill in a system prompt that makes it a calm, encouraging fitness coach named Sol.",
      starter: `SYSTEM = ""   # TODO: make it Sol, a calm, encouraging fitness coach
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=300,
    system=SYSTEM,
    messages=[{"role": "user", "content": "I skipped my workout again."}],
)
print(reply.content[0].text)`,
      solution: `SYSTEM = "You are Sol, a calm and encouraging fitness coach. Be supportive, never judgmental, and end with one small doable next step."
reply = client.messages.create(
    model="claude-sonnet-5",
    max_tokens=300,
    system=SYSTEM,
    messages=[{"role": "user", "content": "I skipped my workout again."}],
)
print(reply.content[0].text)`,
    },
    quiz: [
      {
        question: "Which combination of features makes a well-rounded Claude assistant?",
        options: [
          "Only a single messages.create call",
          "A persona (system prompt), memory (conversation list), a tool, and streaming",
          "Just a bigger model",
          "Only prompt caching",
        ],
        answerIndex: 1,
        explanation: "A complete assistant blends persona, memory, an ability via tools, and a responsive streaming feel.",
      },
      {
        question: "In the assistant, why do we keep appending to the conversation list?",
        options: [
          "To make the code longer",
          "Because the API is stateless, so memory must be resent each turn",
          "To change the model",
          "It is optional and does nothing",
        ],
        answerIndex: 1,
        explanation: "The API forgets between calls, so we store the conversation and resend it to give the assistant memory.",
      },
    ],
    flashcards: [
      { front: "Capstone assistant", back: "An app combining persona, memory, tools, and streaming into one working experience." },
      { front: "Persona", back: "The system prompt that gives the assistant a consistent voice and rules." },
      { front: "Memory", back: "The growing messages list you resend each turn, since the API is stateless." },
      { front: "Ability + feel", back: "Tools let it fetch live data or act; streaming makes replies type out live." },
    ],
    miniProject: {
      title: "Your Own Claude Assistant",
      brief: "Ship a small assistant with a persona, memory, one tool, and streaming replies.",
      steps: [
        "Pick a persona and write its system prompt.",
        "Add one tool (weather, a fake lookup, or a calculator) and handle the tool_use loop.",
        "Keep a conversation list so it remembers across turns.",
        "Stream the final answer, then let a friend chat with it and note what to improve.",
      ],
    },
    industryUse: [
      "Startups ship Claude assistants that chat, look things up, and act inside their product",
      "Internal help desks combine a knowledge base, tools, and streaming for staff support",
      "Consumer apps pair a friendly persona with live tools for travel, fitness, or finance help",
    ],
    commonMistakes: [
      "Forgetting to resend the conversation, so the assistant loses its memory between turns.",
      "Skipping error and refusal handling, so the app crashes when Claude declines or a call fails.",
    ],
    interviewQuestions: [
      "Design a simple Claude assistant and name which feature handles each requirement.",
      "How would you keep such an assistant safe, affordable, and responsive?",
    ],
    papers: [],
    nextUp: ["claude-agents", "claude-prompting"],
    cheatsheet: [
      "Persona = system prompt",
      "Memory = resend the conversation list",
      "Ability = tools (tool_use / tool_result loop)",
      "Feel = stream the final answer",
      "Stay safe: env key, loop caps, handle errors",
    ],
  },
};
