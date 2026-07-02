import type { LessonBody } from "@/types";

export const genaiLlm: Record<string, LessonBody> = {
  "genai-how-llms": {
    story:
      "Picture your phone finishing your text messages. You type \"I'll be home for\" and it suggests \"dinner.\" A Large Language Model (LLM) — the thing behind ChatGPT — is that autocomplete, but grown up enormously. It read a huge chunk of the internet, and from all that reading it learned one skill really well: given some words, guess the next word. Ask it a question and it doesn't \"look up\" an answer in a database. It just keeps guessing the next most sensible word, one at a time, until a full, fluent answer has poured out. That's the whole trick — and it's shockingly powerful.",
    problem:
      "For decades, getting a computer to write a helpful paragraph, summarize a report, or answer a question in plain English was nearly impossible — you'd have to hand-code rules for grammar, facts, and tone, and it still sounded robotic. We needed something that could handle the messy, open-ended world of human language without us spelling out every rule.",
    analogy:
      "An LLM is like a friend who has read millions of books and, when you start a sentence, can finish it in a way that sounds right — not because they memorized it, but because they've absorbed how language usually flows.",
    explanation: [
      "An LLM's one job is next-word prediction: it looks at everything so far (your question plus its own answer-in-progress) and predicts the most likely next chunk of text, called a token.",
      "It learned this by reading enormous amounts of text and playing a fill-in-the-blank game billions of times, slowly adjusting itself to guess better.",
      "It has no live memory and no internet unless you give it one — it only knows patterns from its training, which has a cutoff date. That's why it can confidently state wrong facts (called \"hallucinating\").",
      "You control it entirely through the text you send, called the prompt. Better prompt in, better answer out — that's the next lesson.",
      "Use LLMs for language tasks: writing, summarizing, explaining, translating, drafting code. Don't trust them for exact math, fresh news, or facts that must be perfect without checking.",
      "The famous ones — GPT, Claude, Llama, Gemini — all work this same way; they mostly differ in size, training, and price.",
    ],
    math:
      "For each step the model outputs a probability for every possible next token, e.g. P(next = \"dinner\") = 0.62. It picks from the top choices; a setting called temperature controls how adventurous that pick is (low = safe and repetitive, high = creative and risky).",
    code: {
      language: "python",
      source: `# Talking to an LLM is just sending text and reading text back.
# (Pseudo-code — the real call needs an API key.)

prompt = "Explain what a rainbow is to a 6-year-old, in 2 sentences."

# The model reads the prompt and generates the next tokens, one by one:
response = llm.generate(prompt)

print(response)
# -> "A rainbow is a big colorful arc in the sky.
#     It appears when sunlight shines through tiny raindrops."`,
      explanation:
        "You send a string of text (the prompt) and get a string back. Everything an LLM does is wrapped around that simple text-in, text-out loop.",
    },
    exercise: {
      prompt:
        "Write a prompt that would make the LLM reply with a single word. Fill in the TODO with your instruction.",
      starter: `# TODO: write a prompt asking for ONE word only
prompt = "..."
print(prompt)`,
      solution: `prompt = "Reply with exactly one word: the capital of France."
print(prompt)`,
    },
    quiz: [
      {
        question: "At its core, what is an LLM actually doing?",
        options: [
          "Searching a giant database of answers",
          "Predicting the next word, one chunk at a time",
          "Running the internet live in real time",
          "Storing every question anyone ever asked it",
        ],
        answerIndex: 1,
        explanation:
          "An LLM generates text by repeatedly predicting the next token — it isn't looking answers up in a database.",
      },
      {
        question: "Why can an LLM confidently give a wrong fact?",
        options: [
          "It's broken",
          "It predicts likely-sounding text, and likely isn't always true",
          "Someone typed the wrong answer into it",
          "It ran out of memory",
        ],
        answerIndex: 1,
        explanation:
          "It optimizes for plausible-sounding text, not verified truth — that gap causes \"hallucinations.\"",
      },
    ],
    flashcards: [
      { front: "LLM", back: "A Large Language Model — an AI that generates text by predicting the next token." },
      { front: "Token", back: "A chunk of text (often a word or word-piece) that the model reads and produces one at a time." },
      { front: "Prompt", back: "The text you send to an LLM to tell it what you want." },
      { front: "Hallucination", back: "When an LLM states something false but sounds confident about it." },
    ],
    miniProject: {
      title: "Spot the Hallucination",
      brief: "Learn where LLMs are reliable and where they make things up.",
      steps: [
        "Ask any chatbot 5 factual questions you already know the answers to.",
        "Mix in 2 questions about very recent events (past week).",
        "Note which answers were right, wrong, or made-up.",
        "Write one sentence on when you'd trust it and when you'd double-check.",
      ],
    },
    industryUse: [
      "OpenAI's ChatGPT and Anthropic's Claude answering millions of user questions daily",
      "GitHub Copilot suggesting code to developers as they type",
      "Banks and insurers drafting first versions of customer emails and reports",
    ],
    commonMistakes: [
      "Trusting an LLM for exact facts or math without checking — verify anything that must be correct.",
      "Assuming it can see today's news — it only knows up to its training cutoff unless you connect it to live data.",
    ],
    interviewQuestions: [
      "In plain English, how does an LLM generate a response?",
      "What is a hallucination and why does it happen?",
      "What does the 'temperature' setting change about an LLM's output?",
    ],
    papers: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", year: 2017 },
    ],
    nextUp: ["genai-prompting", "genai-huggingface"],
    cheatsheet: [
      "LLM = giant autocomplete that predicts the next token",
      "Text in (prompt) → text out (completion)",
      "No live internet or memory unless you add it",
      "Can hallucinate — verify important facts",
      "Temperature: low = safe, high = creative",
    ],
  },

  "genai-prompting": {
    story:
      "Imagine hiring a brilliant but very literal new assistant on their first day. Say \"write something about our product\" and you'll get something vague and generic. But say \"Write a friendly 3-sentence Instagram caption for our new oat-milk latte, aimed at students, ending with a question\" — and suddenly it nails it. The assistant didn't get smarter; your instructions did. Prompt engineering is just learning to give an LLM clear, specific instructions so it does what you actually want.",
    problem:
      "LLMs are powerful but can't read your mind. Vague prompts give vague, disappointing answers, and beginners blame the model when the real fix is a better request. We need reliable ways to steer it toward exactly the output we want.",
    analogy:
      "It's like ordering coffee. \"A coffee\" gets you whatever they feel like. \"A large oat-milk latte, extra hot, one shot\" gets you your drink. Same barista, wildly different result.",
    explanation: [
      "Be specific about the task, the audience, the format, and the length. The more of the picture you paint, the less the model has to guess.",
      "Give it a role: \"You are a patient math tutor\" primes the tone and depth of the whole answer.",
      "Show examples (called few-shot prompting): give one or two input→output pairs and the model copies the pattern. This is the single most reliable trick.",
      "For tricky reasoning, add \"think step by step\" — the model works through the problem out loud and gets it right far more often (called chain-of-thought).",
      "Tell it the exact output shape you want: \"Answer as a bulleted list,\" or \"Reply only with valid JSON.\" This makes the output easy to use in an app.",
      "Use prompting when you want quick control without training anything. When you need the model to know your private documents, prompting alone isn't enough — that's what RAG (later) is for.",
    ],
    code: {
      language: "text",
      source: `WEAK PROMPT:
  Summarize this.

STRONG PROMPT:
  You are a helpful assistant.
  Summarize the text below for a busy manager.
  - Use exactly 3 bullet points.
  - Each bullet under 15 words.
  - No jargon.

  Text: """
  <paste the long text here>
  """`,
      explanation:
        "The strong prompt sets a role, the audience, the exact format, and a length limit — leaving almost nothing to chance.",
    },
    exercise: {
      prompt:
        "Turn the weak prompt into a strong one. Ask for a product description with a role, an audience, and a length limit.",
      starter: `weak = "Describe our headphones."
# TODO: rewrite as a detailed, specific prompt
strong = "..."
print(strong)`,
      solution: `strong = (
    "You are a marketing copywriter. Write a 2-sentence product "
    "description of our noise-cancelling headphones for busy commuters. "
    "Warm tone, no technical jargon."
)
print(strong)`,
    },
    quiz: [
      {
        question: "What does 'few-shot prompting' mean?",
        options: [
          "Sending very short prompts",
          "Giving the model a few example input→output pairs to copy",
          "Only asking a few questions per day",
          "Using a smaller model",
        ],
        answerIndex: 1,
        explanation:
          "Few-shot means showing examples in the prompt so the model imitates the pattern.",
      },
      {
        question: "Why add 'think step by step' to a reasoning prompt?",
        options: [
          "It makes the model faster",
          "It makes the model reason out loud, improving accuracy on hard problems",
          "It saves money",
          "It hides the answer",
        ],
        answerIndex: 1,
        explanation:
          "Chain-of-thought prompting nudges the model to reason through steps, which improves accuracy on multi-step tasks.",
      },
    ],
    flashcards: [
      { front: "Prompt engineering", back: "Crafting clear, specific instructions to get the output you want from an LLM." },
      { front: "Few-shot prompting", back: "Including a few example input→output pairs so the model copies the pattern." },
      { front: "Chain-of-thought", back: "Asking the model to reason step by step to improve accuracy on hard problems." },
      { front: "System / role prompt", back: "An instruction like 'You are a tutor' that sets the model's tone and behavior." },
    ],
    miniProject: {
      title: "Prompt Makeover",
      brief: "See how much a good prompt improves an answer.",
      steps: [
        "Pick a task (e.g. write a birthday message).",
        "Ask a chatbot with a one-line vague prompt; save the result.",
        "Rewrite with a role, audience, format, and length; ask again.",
        "Compare the two answers and note what changed.",
      ],
    },
    industryUse: [
      "Support teams using prompt templates so every AI reply matches the brand voice",
      "Notion AI and similar tools shipping built-in prompts for summarizing and rewriting",
      "Legal and finance firms using strict format prompts to get structured, checkable output",
    ],
    commonMistakes: [
      "Being vague and blaming the model — add specifics about task, audience, and format first.",
      "Cramming ten instructions into one messy sentence — use a clear list of bullet points instead.",
    ],
    interviewQuestions: [
      "What are three techniques to make an LLM's output more reliable?",
      "When would you use few-shot prompting over a plain instruction?",
      "How do you make an LLM return output your app can parse?",
    ],
    papers: [
      { title: "Chain-of-Thought Prompting Elicits Reasoning in LLMs", url: "https://arxiv.org/abs/2201.11903", year: 2022 },
    ],
    nextUp: ["genai-huggingface", "genai-embeddings"],
    cheatsheet: [
      "Be specific: task + audience + format + length",
      "Give a role: 'You are a...'",
      "Show examples = few-shot",
      "'Think step by step' for hard reasoning",
      "Ask for a format: bullets, JSON, table",
    ],
  },

  "genai-huggingface": {
    story:
      "ChatGPT lives on someone else's servers and you pay per use. But there's a giant free library where thousands of AI models — for translating, summarizing, spotting emotions, generating images — sit ready to download, like apps in an app store. That library is Hugging Face. With about three lines of Python you can grab a model someone else trained and run it on your own computer. No PhD, no training, no huge bill. You just pick a model off the shelf and use it.",
    problem:
      "Training an AI model from scratch costs millions of dollars and needs mountains of data. Almost nobody should do that. We need a way to reuse the excellent models experts already built — for free, with a couple of lines of code.",
    analogy:
      "Hugging Face is the app store for AI models. You don't build the app; you search, download, and open it.",
    explanation: [
      "The Hugging Face Hub hosts hundreds of thousands of free, pre-trained models you can search by task (translation, summarization, sentiment, image generation, and more).",
      "The transformers library gives you a pipeline() helper — pick a task, and it downloads a sensible model and runs it in one line.",
      "\"Pre-trained\" means someone already did the expensive training; you just use it. This reuse is called transfer learning.",
      "Models run locally (private, free, but needs a decent computer) or via the hosted Inference API (easy, no setup, small cost).",
      "Use Hugging Face when you want a specific task done cheaply and privately, or when you want to avoid vendor lock-in. Reach for a hosted LLM like GPT or Claude when you need top-tier open-ended reasoning.",
      "Each model has a \"model card\" — a readme describing what it does, its limits, and how to use it. Always skim it first.",
    ],
    code: {
      language: "python",
      source: `# pip install transformers
from transformers import pipeline

# Pick a task; Hugging Face downloads a good default model for it.
classifier = pipeline("sentiment-analysis")

result = classifier("I absolutely loved this course!")
print(result)
# -> [{'label': 'POSITIVE', 'score': 0.9998}]

summarizer = pipeline("summarization")
print(summarizer("Long article text goes here...", max_length=30))`,
      explanation:
        "pipeline() picks a task, grabs a pre-trained model, and runs it. The first call downloads the model; after that it's local and fast.",
    },
    exercise: {
      prompt:
        "Create a translation pipeline that translates English to French. Fill in the task name.",
      starter: `from transformers import pipeline
# TODO: use the task "translation_en_to_fr"
translator = pipeline("...")
print(translator("Good morning, how are you?"))`,
      solution: `from transformers import pipeline
translator = pipeline("translation_en_to_fr")
print(translator("Good morning, how are you?"))`,
    },
    quiz: [
      {
        question: "What is Hugging Face best described as?",
        options: [
          "A chatbot",
          "A hub of free, pre-trained AI models you can download and use",
          "A programming language",
          "A cloud database",
        ],
        answerIndex: 1,
        explanation:
          "Hugging Face is a hub (the 'app store') for thousands of ready-to-use pre-trained models.",
      },
      {
        question: "What does pipeline('sentiment-analysis') do for you?",
        options: [
          "Trains a new model from scratch",
          "Downloads a suitable pre-trained model and runs the task in one line",
          "Deletes old models",
          "Only works on images",
        ],
        answerIndex: 1,
        explanation:
          "pipeline() picks a good default model for the task and runs it — no training required.",
      },
    ],
    flashcards: [
      { front: "Hugging Face", back: "A hub hosting hundreds of thousands of free, pre-trained AI models." },
      { front: "transformers", back: "The Python library for loading and running Hugging Face models." },
      { front: "pipeline()", back: "A one-line helper that downloads a model for a task and runs it." },
      { front: "Transfer learning", back: "Reusing a model someone already trained instead of starting from scratch." },
    ],
    miniProject: {
      title: "Mini Sentiment Meter",
      brief: "Score the mood of real product reviews with a pre-trained model.",
      steps: [
        "Install transformers and load a sentiment-analysis pipeline.",
        "Paste in 5 real reviews (from a store or app).",
        "Print each review's POSITIVE/NEGATIVE label and score.",
        "Count how many were positive — that's your mood meter.",
      ],
    },
    industryUse: [
      "Startups using Hugging Face models to add sentiment or translation features without training",
      "Grammarly and writing tools building on open transformer models for text tasks",
      "Research labs sharing new models on the Hub the day a paper is published",
    ],
    commonMistakes: [
      "Downloading a huge model onto a weak laptop and hitting memory errors — start with a small model or use the hosted API.",
      "Skipping the model card and using a model on a language or task it wasn't built for.",
    ],
    interviewQuestions: [
      "What is transfer learning and why does it matter for cost?",
      "When would you run a model locally vs via a hosted inference API?",
      "How would you find a model for a specific task on Hugging Face?",
    ],
    papers: [
      { title: "Transformers: State-of-the-Art Natural Language Processing", url: "https://arxiv.org/abs/1910.03771", year: 2020 },
    ],
    nextUp: ["genai-embeddings", "genai-prompting"],
    cheatsheet: [
      "Hugging Face = app store for AI models",
      "pip install transformers",
      "pipeline('task')(text) → result",
      "Pre-trained = someone already did the training",
      "Read the model card before using a model",
    ],
  },

  "genai-embeddings": {
    story:
      "Search for \"cheap places to stay\" and a good search engine also shows \"budget hotels\" and \"affordable hostels\" — even though you never typed those exact words. How? Behind the scenes, every phrase is turned into a list of numbers that captures its meaning. Phrases that mean similar things get similar numbers, so they land near each other in a kind of \"meaning map.\" Those number-lists are called embeddings, and they're how computers finally understand that two different sentences can mean the same thing.",
    problem:
      "Computers compare text letter by letter, so \"car\" and \"automobile\" look totally unrelated to them, while \"car\" and \"cat\" look nearly identical. That's backwards. We need a way to compare text by meaning, not spelling.",
    analogy:
      "An embedding is a GPS coordinate for meaning. \"King\" and \"queen\" sit in the same neighborhood; \"banana\" is across town. To find related ideas, you just look at what's nearby.",
    explanation: [
      "An embedding turns a piece of text into a list of numbers (a vector), usually a few hundred long, that represents its meaning.",
      "Similar meanings get similar vectors, so they sit close together in \"meaning space\"; unrelated things sit far apart.",
      "To measure closeness we use cosine similarity — a score from -1 (opposite) to 1 (identical meaning). Higher means more alike.",
      "This powers semantic search: embed the user's question, embed all your documents, and return the documents whose vectors are closest.",
      "The same trick powers recommendations, clustering, duplicate detection, and — crucially — RAG, coming up soon.",
      "Use embeddings when meaning matters more than exact words. For an exact-match lookup (like an order ID), plain keyword search is simpler and better.",
    ],
    math:
      "Similarity is measured with cosine similarity: cos(A, B) = (A · B) / (|A| · |B|). It's 1 when two vectors point the same way (same meaning) and near 0 when they're unrelated.",
    code: {
      language: "python",
      source: `# pip install sentence-transformers
from sentence_transformers import SentenceTransformer, util

model = SentenceTransformer("all-MiniLM-L6-v2")

sentences = ["cheap places to stay", "budget hotels", "how to bake bread"]
vectors = model.encode(sentences)

# Compare sentence 0 to the others by meaning:
print("hotels:", util.cos_sim(vectors[0], vectors[1]).item())  # high
print("bread: ", util.cos_sim(vectors[0], vectors[2]).item())  # low`,
      explanation:
        "encode() turns each sentence into a meaning-vector. Cosine similarity is high for the two hotel phrases and low for the unrelated bread phrase.",
    },
    exercise: {
      prompt:
        "Add a fourth sentence about affordable travel and check that it scores high against 'cheap places to stay'.",
      starter: `sentences = ["cheap places to stay", "budget hotels", "how to bake bread"]
# TODO: append an affordable-travel sentence, then compare it to sentence 0
`,
      solution: `sentences = ["cheap places to stay", "budget hotels", "how to bake bread",
             "low-cost backpacker hostels"]
vectors = model.encode(sentences)
print(util.cos_sim(vectors[0], vectors[3]).item())  # high`,
    },
    quiz: [
      {
        question: "What is an embedding?",
        options: [
          "A picture of text",
          "A list of numbers representing the meaning of a piece of text",
          "A compressed zip file",
          "A grammar rule",
        ],
        answerIndex: 1,
        explanation:
          "An embedding is a numeric vector that captures the meaning of text so similar meanings sit close together.",
      },
      {
        question: "Two sentences with a high cosine similarity are…",
        options: [
          "Spelled the same",
          "Similar in meaning",
          "Written by the same person",
          "The same length",
        ],
        answerIndex: 1,
        explanation:
          "High cosine similarity between embeddings means the texts are close in meaning.",
      },
    ],
    flashcards: [
      { front: "Embedding", back: "A list of numbers (a vector) that represents the meaning of a piece of text." },
      { front: "Vector", back: "An ordered list of numbers; here, a point in 'meaning space.'" },
      { front: "Cosine similarity", back: "A score (−1 to 1) measuring how alike two vectors' directions are." },
      { front: "Semantic search", back: "Finding results by meaning (via embeddings) rather than exact keywords." },
    ],
    miniProject: {
      title: "Meaning-Based FAQ Matcher",
      brief: "Match a user's question to the closest FAQ by meaning.",
      steps: [
        "Write 5 FAQ questions and embed them.",
        "Type a new question worded differently and embed it.",
        "Compute cosine similarity to all 5 FAQs.",
        "Return the FAQ with the highest score — did it match the right one?",
      ],
    },
    industryUse: [
      "Spotify and YouTube embedding songs/videos to recommend similar ones",
      "Google and Bing using embeddings for semantic search beyond keywords",
      "Support tools matching a new ticket to similar past tickets by meaning",
    ],
    commonMistakes: [
      "Comparing embeddings from two different models — the numbers only make sense within the same model.",
      "Using embeddings for exact-ID lookups where plain keyword or database search is faster and correct.",
    ],
    interviewQuestions: [
      "What is an embedding and how does it enable semantic search?",
      "How do you measure similarity between two embeddings?",
      "Why can't you compare vectors produced by two different embedding models?",
    ],
    papers: [
      { title: "Efficient Estimation of Word Representations (word2vec)", url: "https://arxiv.org/abs/1301.3781", year: 2013 },
    ],
    nextUp: ["genai-vector-db", "genai-rag"],
    cheatsheet: [
      "Embedding = meaning turned into numbers",
      "Similar meaning → nearby vectors",
      "Compare with cosine similarity (−1 to 1)",
      "Powers semantic search & recommendations",
      "Same model for all vectors you compare",
    ],
  },

  "genai-vector-db": {
    story:
      "You've turned 100,000 documents into embeddings — great. Now a user asks a question, you embed it, and you need the 5 closest documents out of 100,000. Comparing against every single one each time is painfully slow. A vector database is a special kind of database built for exactly this: store millions of embeddings, and in milliseconds hand back the nearest few. It's the filing cabinet that files things by meaning and can grab neighbors instantly.",
    problem:
      "A normal database finds exact matches (\"show orders where id = 42\"). It has no idea how to find the \"closest in meaning\" vectors, and looping through millions of embeddings by hand is far too slow for a real app. We need storage that's built for nearest-neighbor search.",
    analogy:
      "It's a librarian who has memorized where every book sits by topic. Ask for \"something like this,\" and instead of walking every aisle, they point you straight to the right shelf.",
    explanation: [
      "A vector database stores embeddings and finds the nearest ones to a query vector — fast, even across millions of items.",
      "It uses clever indexing (approximate nearest neighbor) to skip most comparisons, trading a tiny bit of accuracy for huge speed.",
      "You store the vector plus metadata (the original text, a source URL, tags) so you can filter and show real results, not just numbers.",
      "The core operations are simple: add(id, vector, metadata) and query(vector, top_k) to get the k closest items.",
      "Popular options: Chroma and FAISS (local, free, great for learning), and Pinecone, Weaviate, Milvus, pgvector (production-scale).",
      "Use one whenever you have lots of embeddings to search. For a few dozen items, a simple in-memory list and cosine similarity is fine.",
    ],
    code: {
      language: "python",
      source: `# pip install chromadb
import chromadb

client = chromadb.Client()
docs = client.create_collection("notes")

# Chroma embeds the text for you and stores it.
docs.add(
    ids=["1", "2", "3"],
    documents=["Cats purr when happy",
               "Dogs wag their tails",
               "Python is a programming language"],
)

# Find the 2 notes closest in meaning to the query:
hits = docs.query(query_texts=["feline behavior"], n_results=2)
print(hits["documents"])
# -> [["Cats purr when happy", "Dogs wag their tails"]]`,
      explanation:
        "add() stores documents as vectors; query() returns the closest ones by meaning — here, the cat note ranks first for \"feline behavior.\"",
    },
    exercise: {
      prompt:
        "Add a 4th document about coding, then query for 'software' and return the single closest note.",
      starter: `docs.add(ids=["4"], documents=["JavaScript runs in browsers"])
# TODO: query for "software" and return only the top 1 result
hits = docs.query(...)
print(hits["documents"])`,
      solution: `docs.add(ids=["4"], documents=["JavaScript runs in browsers"])
hits = docs.query(query_texts=["software"], n_results=1)
print(hits["documents"])`,
    },
    quiz: [
      {
        question: "What is a vector database built to do?",
        options: [
          "Find exact-match rows only",
          "Store embeddings and quickly find the nearest ones to a query",
          "Render web pages",
          "Compress images",
        ],
        answerIndex: 1,
        explanation:
          "Vector databases specialize in fast nearest-neighbor search over embeddings.",
      },
      {
        question: "What does 'top_k' control in a vector query?",
        options: [
          "The model size",
          "How many of the closest results to return",
          "The embedding length",
          "The temperature",
        ],
        answerIndex: 1,
        explanation:
          "top_k (or n_results) is how many nearest neighbors you want back.",
      },
    ],
    flashcards: [
      { front: "Vector database", back: "A database built to store embeddings and find the nearest ones fast." },
      { front: "Nearest-neighbor search", back: "Finding the stored vectors closest to a query vector." },
      { front: "Metadata", back: "Extra info stored with each vector (text, source, tags) for filtering and display." },
      { front: "top_k / n_results", back: "How many of the closest matches a query should return." },
    ],
    miniProject: {
      title: "Searchable Note Box",
      brief: "Build a tiny meaning-based search over your own notes.",
      steps: [
        "Install Chroma and create a collection.",
        "Add 10 short notes about different topics.",
        "Query with a phrase you never typed exactly.",
        "Check that the top result is genuinely the most relevant.",
      ],
    },
    industryUse: [
      "Pinecone and Weaviate powering semantic search for thousands of AI apps",
      "E-commerce sites finding visually or semantically similar products",
      "Companies storing internal docs as vectors so AI assistants can search them",
    ],
    commonMistakes: [
      "Storing only the vector and forgetting the original text — then you can't show the user a real answer.",
      "Mixing vectors from different embedding models in one collection, which makes distances meaningless.",
    ],
    interviewQuestions: [
      "Why can't a normal SQL database do semantic search efficiently?",
      "What is approximate nearest-neighbor search and why is it a good trade-off?",
      "What would you store alongside each vector, and why?",
    ],
    papers: [
      { title: "Billion-scale similarity search with GPUs (FAISS)", url: "https://arxiv.org/abs/1702.08734", year: 2017 },
    ],
    nextUp: ["genai-rag", "genai-langchain"],
    cheatsheet: [
      "Vector DB = fast nearest-neighbor search over embeddings",
      "add(id, vector, metadata) then query(vector, top_k)",
      "Store the text as metadata too",
      "Local: Chroma, FAISS · Prod: Pinecone, Weaviate, pgvector",
      "One embedding model per collection",
    ],
  },

  "genai-rag": {
    story:
      "An LLM is like a smart friend who read a lot years ago but has never seen your company handbook, your emails, or last week's news. Ask about them and they'll guess — and often be wrong. RAG fixes this. Before the model answers, you quietly look up the relevant pages from your own documents and paste them into the prompt, saying \"use this to answer.\" Now the friend reads your handbook first, then replies with real, grounded facts. That's Retrieval-Augmented Generation: retrieve the right info, then let the model generate its answer from it.",
    problem:
      "LLMs don't know your private documents and can't see anything after their training cutoff, so they hallucinate on those questions. Retraining a model on your data is slow and expensive. We need a cheap way to give the model the right facts, right when it's answering.",
    analogy:
      "It's an open-book exam. Instead of forcing the model to memorize everything, you hand it the exact page it needs, then ask the question.",
    explanation: [
      "RAG has two steps: Retrieve the relevant documents, then Generate an answer using them.",
      "Retrieve: embed the user's question, search your vector database, and pull back the top few most relevant chunks of text.",
      "Generate: stuff those chunks into the prompt (\"Answer using only this context: ...\") and send it to the LLM.",
      "The result is grounded in your real data, far fewer hallucinations, and you can even show the sources it used.",
      "You prepare data by chunking documents into small pieces, embedding each, and storing them in a vector DB — done once, up front.",
      "Use RAG whenever the answer depends on private, large, or fresh information. Skip it for general knowledge the model already has.",
    ],
    code: {
      language: "python",
      source: `# The RAG loop in plain steps (pseudo-code).
question = "What's our refund window?"

# 1. RETRIEVE: find the most relevant chunks from your docs
chunks = vector_db.query(embed(question), top_k=3)

# 2. AUGMENT: build a prompt that includes them as context
context = "\\n".join(chunks)
prompt = (
    "Answer using ONLY the context below.\\n"
    "Context:\\n" + context + "\\n\\n"
    "Question: " + question
)

# 3. GENERATE: let the LLM answer from the retrieved facts
answer = llm.generate(prompt)
print(answer)  # -> "Our refund window is 30 days from purchase."`,
      explanation:
        "Retrieve the relevant chunks, paste them into the prompt as context, then ask the LLM — so it answers from your real documents.",
    },
    exercise: {
      prompt:
        "The prompt lets the model use outside knowledge. Tighten it so it must answer only from the context, and say so if the answer isn't there.",
      starter: `prompt = "Context: " + context + " Question: " + question
# TODO: instruct the model to use ONLY the context and admit when it can't answer
`,
      solution: `prompt = (
    "Answer using ONLY the context below. "
    "If the answer isn't in the context, say 'I don't know.'\\n"
    "Context:\\n" + context + "\\n\\nQuestion: " + question
)`,
    },
    quiz: [
      {
        question: "What problem does RAG mainly solve?",
        options: [
          "It makes the model train faster",
          "It lets an LLM answer from your private or fresh documents instead of guessing",
          "It compresses the model",
          "It removes the need for prompts",
        ],
        answerIndex: 1,
        explanation:
          "RAG grounds answers in your own retrieved documents, cutting hallucinations on private or recent info.",
      },
      {
        question: "What are the two words in RAG's name, in order?",
        options: [
          "Retrieve, then Generate",
          "Read, then Guess",
          "Rank, then Group",
          "Rewrite, then Grade",
        ],
        answerIndex: 0,
        explanation:
          "RAG = Retrieval-Augmented Generation: first retrieve relevant text, then generate the answer from it.",
      },
    ],
    flashcards: [
      { front: "RAG", back: "Retrieval-Augmented Generation: retrieve relevant docs, then let the LLM answer from them." },
      { front: "Chunking", back: "Splitting documents into small pieces so each can be embedded and retrieved." },
      { front: "Context (in a prompt)", back: "The retrieved text you paste into the prompt for the model to answer from." },
      { front: "Grounding", back: "Basing an answer on real retrieved facts instead of the model's memory." },
    ],
    miniProject: {
      title: "Answer From My PDF",
      brief: "Build a mini RAG that answers questions about one document.",
      steps: [
        "Take one PDF or long text and split it into small chunks.",
        "Embed the chunks and store them in a vector DB.",
        "Embed a question and retrieve the top 3 chunks.",
        "Paste them into a prompt and get a grounded answer with sources.",
      ],
    },
    industryUse: [
      "Customer-support bots answering from a company's help center instead of guessing",
      "Legal and medical assistants citing exact passages from documents",
      "Internal 'chat with your docs' tools at companies like Notion and Dropbox",
    ],
    commonMistakes: [
      "Chunks too big or too small — huge chunks bury the answer, tiny ones lose context. Aim for a few sentences each.",
      "Not telling the model to use only the context, so it drifts back to guessing and hallucinating.",
    ],
    interviewQuestions: [
      "Explain the RAG pipeline end to end.",
      "Why is RAG usually cheaper than fine-tuning a model on your data?",
      "How does chunk size affect retrieval quality?",
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP", url: "https://arxiv.org/abs/2005.11401", year: 2020 },
    ],
    nextUp: ["genai-langchain", "genai-capstone"],
    cheatsheet: [
      "RAG = Retrieve relevant docs, then Generate",
      "Prep: chunk → embed → store in vector DB",
      "Query: embed question → get top_k chunks",
      "Prompt: 'Answer using ONLY this context'",
      "Grounds answers & cuts hallucinations",
    ],
  },

  "genai-langchain": {
    story:
      "You've now got prompts, embeddings, a vector database, and an LLM — a pile of separate parts. Wiring them together by hand every time is tedious and error-prone. LangChain is the toolbox that snaps them together. It gives you \"chains\" (do step A, feed the result into step B, then C) and \"agents\" (let the LLM decide which tools to use — a calculator, a web search, your database — to get the job done). It's the plumbing that turns loose AI parts into a working app.",
    problem:
      "A real AI app is rarely one call — it's fetch some data, format a prompt, call the model, parse the result, maybe call it again. Hand-coding that glue for every project is repetitive and brittle. We need a standard way to connect the pieces.",
    analogy:
      "A chain is a factory conveyor belt: raw input goes in one end, passes through stations (prompt → model → parser), and a finished result comes out. An agent is a worker who decides which stations to visit for each job.",
    explanation: [
      "A chain links steps so the output of one becomes the input of the next: prompt template → LLM → output parser, for example.",
      "Prompt templates let you write a prompt once with blanks and fill them in with different data every time.",
      "An agent is an LLM given a set of tools and the freedom to choose which to call, in what order, to answer a question.",
      "Tools are just functions the agent can invoke — a web search, a calculator, a database lookup, your RAG retriever.",
      "LangChain also bundles ready-made pieces for loading documents, chunking, embedding, and RAG, so you don't rebuild them.",
      "Use chains for predictable, fixed workflows; use agents when the steps depend on the question. Agents are powerful but slower, costlier, and harder to debug — start with a simple chain.",
    ],
    code: {
      language: "python",
      source: `# pip install langchain langchain-openai
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate

llm = ChatOpenAI(model="gpt-4o-mini")

# A reusable prompt with a blank, chained into the model:
prompt = ChatPromptTemplate.from_template(
    "Explain {topic} to a curious 10-year-old in 2 sentences."
)
chain = prompt | llm      # the "|" pipes prompt output into the LLM

print(chain.invoke({"topic": "gravity"}).content)
print(chain.invoke({"topic": "electricity"}).content)`,
      explanation:
        "The prompt template has a {topic} blank; the | operator pipes it into the model. One chain, reused for any topic.",
    },
    exercise: {
      prompt:
        "Change the prompt template so it writes a short rhyming poem about the topic instead of an explanation.",
      starter: `prompt = ChatPromptTemplate.from_template(
    "Explain {topic} to a curious 10-year-old in 2 sentences."
)
# TODO: rewrite the template to request a short rhyming poem about {topic}
`,
      solution: `prompt = ChatPromptTemplate.from_template(
    "Write a short, fun 4-line rhyming poem about {topic}."
)
chain = prompt | llm
print(chain.invoke({"topic": "the moon"}).content)`,
    },
    quiz: [
      {
        question: "What is a 'chain' in LangChain?",
        options: [
          "A blockchain",
          "A sequence of steps where each step's output feeds the next",
          "A type of embedding",
          "A vector database",
        ],
        answerIndex: 1,
        explanation:
          "A chain links steps together so output flows from one into the next, like a conveyor belt.",
      },
      {
        question: "How does an 'agent' differ from a plain chain?",
        options: [
          "It runs faster with no downsides",
          "The LLM decides which tools to use and in what order",
          "It never calls the model",
          "It only works offline",
        ],
        answerIndex: 1,
        explanation:
          "An agent lets the LLM choose which tools to call, rather than following fixed, pre-set steps.",
      },
    ],
    flashcards: [
      { front: "LangChain", back: "A framework that connects prompts, models, tools, and data into working AI apps." },
      { front: "Chain", back: "A sequence of steps where each output becomes the next step's input." },
      { front: "Prompt template", back: "A reusable prompt with blanks you fill in with different data." },
      { front: "Agent", back: "An LLM given tools and the freedom to decide which to use to solve a task." },
    ],
    miniProject: {
      title: "Two-Step Explainer Chain",
      brief: "Chain two model calls so the second improves the first.",
      steps: [
        "Build a prompt template that explains a topic.",
        "Build a second prompt that shortens any text to one sentence.",
        "Chain them: explain the topic, then feed the result into the shortener.",
        "Try it on three topics and compare the one-line results.",
      ],
    },
    industryUse: [
      "Startups using LangChain to ship RAG chatbots in days instead of weeks",
      "Companies building AI agents that query internal databases and APIs on request",
      "Data teams chaining document loading, chunking, and embedding for search tools",
    ],
    commonMistakes: [
      "Reaching for an agent when a simple chain would do — agents are slower, pricier, and harder to debug.",
      "Hard-coding values into prompts instead of using templates, so nothing is reusable.",
    ],
    interviewQuestions: [
      "What's the difference between a chain and an agent?",
      "Why use a prompt template instead of building strings by hand?",
      "When would an agent be the wrong choice?",
    ],
    papers: [
      { title: "ReAct: Synergizing Reasoning and Acting in Language Models", url: "https://arxiv.org/abs/2210.03629", year: 2022 },
    ],
    nextUp: ["genai-capstone", "genai-rag"],
    cheatsheet: [
      "LangChain = plumbing that connects AI parts",
      "Chain = step A → step B → step C",
      "Prompt template = reusable prompt with blanks",
      "Agent = LLM picks which tools to use",
      "Start with a chain; use an agent only when needed",
    ],
  },

  "genai-capstone": {
    story:
      "Time to put it all together. You'll build a chatbot that can actually answer questions about a set of documents you give it — a product manual, a set of policies, your class notes, anything. A user types a question, your app finds the most relevant passages, hands them to the LLM, and returns a grounded answer with its sources. This is exactly the kind of \"chat with your docs\" tool companies pay real money for — and by the end, you'll have built one yourself.",
    problem:
      "You've learned prompts, embeddings, vector databases, RAG, and LangChain as separate ideas. The real skill — the one that gets you hired — is combining them into one working product that solves a genuine problem end to end.",
    analogy:
      "You've collected all the ingredients; now you cook the full meal. This is your test kitchen — and the dish is a real RAG chatbot.",
    explanation: [
      "The build has two phases: an offline \"ingest\" phase (prepare your documents) and a live \"chat\" phase (answer questions).",
      "Ingest: load your documents, chunk them into small passages, embed each chunk, and store them in a vector database. Do this once.",
      "Chat: take the user's question, embed it, retrieve the top few relevant chunks, and build a RAG prompt from them.",
      "Send that prompt to the LLM and return the answer — plus the sources, so users can trust and verify it.",
      "Tie it together with LangChain (or plain Python) and wrap it in a tiny UI or command-line loop for a real chat feel.",
      "Test with questions whose answers are in the docs and questions that aren't — a good bot says \"I don't know\" instead of making things up.",
    ],
    code: {
      language: "python",
      source: `# The whole capstone in one skeleton (pseudo-code).

# ---- Phase 1: INGEST (run once) ----
chunks = chunk(load_documents("my_docs/"))    # split into small passages
vector_db.add(embed(chunks), metadata=chunks) # store vectors + text

# ---- Phase 2: CHAT (run per question) ----
def answer(question):
    hits = vector_db.query(embed(question), top_k=3)
    context = "\\n".join(hits)
    prompt = ("Answer using ONLY this context; if unsure say 'I don't know'.\\n"
              "Context:\\n" + context + "\\n\\nQuestion: " + question)
    reply = llm.generate(prompt)
    return reply, hits          # return the answer AND its sources

while True:
    q = input("Ask: ")
    print(answer(q))`,
      explanation:
        "Ingest once (chunk → embed → store), then per question retrieve, build a grounded prompt, generate, and return the answer with its sources.",
    },
    exercise: {
      prompt:
        "The answer() function returns sources but doesn't show them nicely. Print the answer followed by a 'Sources:' section listing the retrieved chunks.",
      starter: `reply, hits = answer("What is the refund policy?")
# TODO: print the reply, then a "Sources:" section listing each hit
`,
      solution: `reply, hits = answer("What is the refund policy?")
print(reply)
print("\\nSources:")
for i, h in enumerate(hits, 1):
    print(str(i) + ".", h)`,
    },
    quiz: [
      {
        question: "In the capstone, which step happens only once, ahead of time?",
        options: [
          "Answering the user's question",
          "Ingesting documents: chunk, embed, and store them",
          "Printing the answer",
          "Reading user input",
        ],
        answerIndex: 1,
        explanation:
          "Ingestion (chunk → embed → store) is done once up front; retrieval and generation run per question.",
      },
      {
        question: "Why return the sources along with the answer?",
        options: [
          "To slow the app down",
          "So users can trust and verify where the answer came from",
          "To use more tokens",
          "It's required by Python",
        ],
        answerIndex: 1,
        explanation:
          "Showing sources builds trust and lets users check that the answer is grounded in real documents.",
      },
    ],
    flashcards: [
      { front: "Ingest phase", back: "The one-time setup: load, chunk, embed, and store your documents." },
      { front: "Chat phase", back: "The live loop: embed the question, retrieve chunks, build a prompt, and answer." },
      { front: "RAG chatbot", back: "An app that answers questions grounded in your own documents." },
      { front: "Source citation", back: "Returning the retrieved passages so users can verify the answer." },
    ],
    miniProject: {
      title: "Capstone: Chat With Your Docs",
      brief: "Ship a working RAG chatbot over documents you choose.",
      steps: [
        "Pick a small set of documents (manual, notes, policies).",
        "Ingest them: chunk, embed, and store in a vector DB.",
        "Write the answer() loop: retrieve, build a grounded prompt, generate.",
        "Show answers with their sources, and handle 'I don't know' gracefully.",
        "Wrap it in a simple command-line or web chat and demo it.",
      ],
    },
    industryUse: [
      "Support chatbots at SaaS companies answering from help docs with citations",
      "Internal 'ask the wiki' assistants at large firms so staff find policies fast",
      "Consulting and law firms deploying doc-grounded assistants for their teams",
    ],
    commonMistakes: [
      "Letting the bot answer from general knowledge — insist it uses only the retrieved context and says 'I don't know' otherwise.",
      "Skipping source display — without citations, users can't tell a grounded answer from a guess.",
    ],
    interviewQuestions: [
      "Walk me through how you'd build a chatbot that answers from company documents.",
      "How would you reduce hallucinations in a RAG chatbot?",
      "How would you evaluate whether your RAG app gives good answers?",
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP", url: "https://arxiv.org/abs/2005.11401", year: 2020 },
    ],
    nextUp: ["genai-rag", "genai-langchain"],
    cheatsheet: [
      "Phase 1 (once): load → chunk → embed → store",
      "Phase 2 (per Q): embed → retrieve → prompt → generate",
      "Always return the sources",
      "Force 'use ONLY the context' to cut hallucinations",
      "Test with in-doc and out-of-doc questions",
    ],
  },
};
