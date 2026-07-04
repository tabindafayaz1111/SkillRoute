import type { LessonBody } from "@/types";

export const rag: Record<string, LessonBody> = {
  "rag-what": {
    story:
      "Picture a brilliant new hire on their first day. They have read a million books and can talk about almost anything — but they have never seen a single file from YOUR company. Ask them your refund policy and they will confidently make one up, because they would rather sound smart than say \"I don't know.\" Now imagine you hand them the actual policy binder and say: \"Read the relevant page, then answer.\" Suddenly every answer is grounded in real facts. That handing-over-the-binder move is RAG — Retrieval-Augmented Generation. You retrieve the right documents and paste them into the AI's prompt, turning a closed-book guess into an open-book answer.",
    problem:
      "A large language model only knows what it soaked up during training. It cannot see your private documents, today's news, or that PDF you uploaded five minutes ago. So when you ask about them, it either refuses or invents something plausible-sounding. RAG fixes this by fetching the right text first and putting it in front of the model before it answers.",
    analogy:
      "Closed-book exam: the AI answers from memory and sometimes bluffs. Open-book exam: it looks up the exact page first, then answers. RAG is the open book.",
    explanation: [
      "RAG has two halves joined together: Retrieval (find the most relevant chunks of text for the question) and Generation (the LLM writes an answer using those chunks).",
      "The model's own memory is frozen at training time. RAG lets you inject fresh, private, or niche knowledge at question time — without retraining anything.",
      "Nothing about the model changes. You are just being a good librarian: pulling the right pages and setting them on the desk before the AI starts writing.",
      "Use RAG whenever the answer lives in documents the model has never seen: your handbook, product docs, legal contracts, medical guidelines, last night's support tickets.",
      "Do NOT reach for RAG when the question is general knowledge (\"what is photosynthesis?\") — the model already knows that, and retrieval just adds cost and noise.",
      "The famous 'chat with your PDF / your website / your Notion' apps are all RAG under the hood. It is the single most common pattern in real AI products.",
    ],
    code: {
      language: "python",
      source: `# RAG in one breath: fetch relevant text, then ask the model
question = "What is our refund window?"

# 1. RETRIEVE: pull the paragraph that actually answers this
context = "Refunds are accepted within 30 days of purchase with a receipt."

# 2. GENERATE: hand that context to the model in the prompt
prompt = "Use ONLY this context to answer.\\n" + context + "\\nQ: " + question
# model(prompt) -> "You can get a refund within 30 days, if you have a receipt."
print(prompt)`,
      explanation:
        "The whole idea fits in two steps: retrieve the sentence that answers the question, then paste it into the prompt so the model reads before it writes.",
    },
    exercise: {
      prompt: "Swap in a new context sentence about shipping time, then build the prompt for the question below.",
      starter: `question = "How long does shipping take?"
context = "..."  # TODO: write a sentence that answers it
prompt = "Use ONLY this context to answer.\\n" + context + "\\nQ: " + question
print(prompt)`,
      solution: `question = "How long does shipping take?"
context = "Standard shipping arrives in 3 to 5 business days."
prompt = "Use ONLY this context to answer.\\n" + context + "\\nQ: " + question
print(prompt)`,
    },
    quiz: [
      {
        question: "What does the 'Retrieval' in Retrieval-Augmented Generation actually do?",
        options: [
          "It retrains the language model on your data",
          "It finds the most relevant text and adds it to the prompt",
          "It makes the model respond faster",
          "It deletes wrong answers after the fact",
        ],
        answerIndex: 1,
        explanation:
          "Retrieval fetches the relevant chunks and inserts them into the prompt. The model itself is never retrained.",
      },
      {
        question: "When is RAG the RIGHT tool?",
        options: [
          "When the answer lives in documents the model has never seen",
          "When you ask about basic general knowledge",
          "When you want a faster model",
          "When you want the model to be more creative",
        ],
        answerIndex: 0,
        explanation:
          "RAG shines when the answer is in private, fresh, or niche documents outside the model's training memory.",
      },
    ],
    flashcards: [
      { front: "RAG", back: "Retrieval-Augmented Generation: fetch relevant documents, put them in the prompt, then let the LLM answer from them." },
      { front: "Retrieval", back: "The step that finds and returns the most relevant chunks of text for a question." },
      { front: "Generation", back: "The step where the LLM writes an answer using the retrieved context." },
      { front: "Open-book vs closed-book", back: "Closed-book = answer from memory (can bluff). Open-book = look it up first (RAG)." },
    ],
    miniProject: {
      title: "Your One-Sentence RAG",
      brief: "Fake the retrieval step by hand to feel how grounding changes an answer.",
      steps: [
        "Write down 3 facts about yourself (favourite food, hometown, a hobby).",
        "Ask a friend a question about you WITHOUT the facts — note the guess.",
        "Now hand them the 3 facts and ask again — note how the answer changes.",
        "You just ran RAG by hand: retrieval (the facts) plus generation (their answer).",
      ],
    },
    industryUse: [
      "Notion AI and Dropbox Dash let you 'chat with' your own workspace files using RAG",
      "Customer-support bots at companies like Intercom answer from the company's own help articles",
      "Legal and medical tools (e.g. Harvey, Glean) ground answers in private document libraries instead of the model's memory",
    ],
    commonMistakes: [
      "Thinking RAG retrains the model — it does not; it only changes what text is in the prompt.",
      "Using RAG for general knowledge the model already has, which just adds cost and clutter.",
    ],
    interviewQuestions: [
      "Explain RAG to a non-technical manager in two sentences.",
      "Give an example where RAG is the right tool and one where it is overkill.",
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)", url: "https://arxiv.org/abs/2005.11401", year: 2020 },
    ],
    nextUp: ["rag-why", "rag-flow"],
    cheatsheet: [
      "RAG = Retrieve relevant text + Generate an answer from it",
      "Open-book exam for an AI",
      "Model is NOT retrained — you just change the prompt",
      "Use it for private / fresh / niche knowledge",
      "Powers every 'chat with your docs' app",
    ],
  },

  "rag-why": {
    story:
      "You ask a smart friend, \"Who won the game last night?\" But your friend has been on a silent meditation retreat with no phone since last year. They do not say \"I have no idea\" — instead they cheerfully invent a final score, because their brain fills gaps with something that sounds right. Language models do exactly this. They were trained on a snapshot of the internet frozen months or years ago, and when they hit a gap they produce a confident, fluent, wrong answer. We call that a hallucination. RAG exists because a fluent lie is more dangerous than an honest \"I don't know\" — so we give the model the real notes before it speaks.",
    problem:
      "Two failures haunt every raw LLM: it hallucinates (states false things with total confidence) and its knowledge is stale (it does not know anything after its training cutoff, and never knew your private data). Both come from the same root: the model answers only from frozen memory. RAG attacks both by supplying fresh, real text at question time.",
    analogy:
      "It is like a student who never says \"I didn't study that\" and instead makes up an answer for every exam question. Give them the textbook to open, and the guessing stops.",
    explanation: [
      "An LLM is a pattern machine, not a fact database. It predicts the next likely word — 'likely' and 'true' usually overlap, but not always, and that gap is a hallucination.",
      "Its knowledge has a hard cutoff date. Ask about anything newer and it is guessing, even if it sounds authoritative.",
      "It has never seen your private world: your company wiki, your emails, your product's latest pricing. That knowledge simply is not in its weights.",
      "RAG shrinks hallucination because the model can copy from real text in front of it instead of dredging up a fuzzy memory.",
      "RAG cures staleness because you can retrieve today's document — updating knowledge is now as easy as adding a file, no retraining required.",
      "Fine-tuning is the alternative, but it is slow, expensive, and bakes knowledge in permanently. RAG keeps knowledge in a swappable folder you can edit any minute.",
    ],
    math: "Rough intuition: hallucination risk drops as the answer's needed facts appear verbatim in the provided context. If the fact is in the prompt, the model mostly has to copy, not invent.",
    code: {
      language: "python",
      source: `# Same question, two worlds: no context vs grounded context
question = "What is the price of the Pro plan?"

# WITHOUT RAG: the model guesses from stale memory -> may invent "$29"
guess = "The Pro plan is probably around $20 a month."  # could be wrong!

# WITH RAG: we retrieve the current pricing page first
context = "As of July 2026, the Pro plan costs $15 per month."
grounded = "Based on the context, the Pro plan costs $15 per month."

print("Guess:   ", guess)
print("Grounded:", grounded)`,
      explanation:
        "Without retrieval the model invents a price from old memory; with the real pricing line in the prompt, it simply reports the truth.",
    },
    exercise: {
      prompt: "Write a context line that would stop the model from hallucinating the company's founding year.",
      starter: `question = "What year was the company founded?"
context = "..."  # TODO: give the real fact so the model can't guess
answer = "Based on the context, " + context
print(answer)`,
      solution: `question = "What year was the company founded?"
context = "The company was founded in 2019."
answer = "Based on the context, " + context
print(answer)`,
    },
    quiz: [
      {
        question: "What is a hallucination in an LLM?",
        options: [
          "When the model crashes",
          "A confident, fluent answer that happens to be false",
          "When the model refuses to answer",
          "A slow response",
        ],
        answerIndex: 1,
        explanation:
          "A hallucination is a plausible-sounding but incorrect answer, produced because the model predicts likely words rather than checking facts.",
      },
      {
        question: "Why does raw LLM knowledge go 'stale'?",
        options: [
          "The model forgets things over time",
          "Its knowledge is frozen at its training cutoff and never included your private data",
          "The internet deletes old pages",
          "It runs out of memory",
        ],
        answerIndex: 1,
        explanation:
          "The model is trained once on a snapshot. Anything after the cutoff, or any private document, was never in its training data.",
      },
      {
        question: "How does RAG reduce hallucination?",
        options: [
          "It makes the model bigger",
          "It supplies real text so the model can copy facts instead of inventing them",
          "It slows the model down to think harder",
          "It blocks the model from answering",
        ],
        answerIndex: 1,
        explanation:
          "With the needed facts sitting in the prompt, the model mostly has to reuse them rather than dredge up a fuzzy, possibly wrong memory.",
      },
    ],
    flashcards: [
      { front: "Hallucination", back: "A fluent, confident answer that is actually false — the model predicting plausible words, not truth." },
      { front: "Knowledge cutoff", back: "The date the model's training data stops; it knows nothing newer." },
      { front: "Stale knowledge", back: "Facts the model missed: anything after its cutoff or any private data it never saw." },
      { front: "RAG vs fine-tuning", back: "RAG swaps knowledge in a folder at question time; fine-tuning bakes it into the weights permanently and expensively." },
    ],
    miniProject: {
      title: "Catch a Hallucination",
      brief: "Prove to yourself that raw models bluff, and that context fixes it.",
      steps: [
        "Ask a chatbot a very specific question about a tiny local business or a brand-new event.",
        "Note whether the answer sounds confident, and whether you can verify it.",
        "Now paste in a real paragraph of facts and ask again.",
        "Write one sentence on how the answer changed once it had the real text.",
      ],
    },
    industryUse: [
      "Banks use RAG so support answers cite the current fee schedule, not a model's stale guess",
      "News and finance assistants (e.g. Bloomberg-style tools) inject today's data to avoid outdated answers",
      "Healthcare assistants ground responses in approved clinical guidelines to reduce dangerous hallucinations",
    ],
    commonMistakes: [
      "Trusting a confident tone as proof of correctness — fluency is not accuracy.",
      "Reaching for expensive fine-tuning when the real need is just fresh, swappable knowledge (use RAG first).",
    ],
    interviewQuestions: [
      "Name the two core LLM weaknesses RAG addresses and explain each.",
      "When would you fine-tune instead of using RAG, and why?",
    ],
    papers: [
      { title: "Survey of Hallucination in Natural Language Generation (Ji et al.)", url: "https://arxiv.org/abs/2202.03629", year: 2022 },
    ],
    nextUp: ["rag-flow", "rag-chunking"],
    cheatsheet: [
      "Two LLM weaknesses: hallucination + stale knowledge",
      "Root cause: answers come from frozen memory",
      "RAG cuts hallucination — model copies real text",
      "RAG cures staleness — just add a new file",
      "RAG is cheaper and more flexible than fine-tuning for facts",
    ],
  },

  "rag-flow": {
    story:
      "Watch a great librarian help someone. You walk up and ask, \"Do you have anything on growing tomatoes indoors?\" They do not recite the whole library from memory. They step to the shelves, pull three relevant books, flip to the useful pages, and hand you a tidy summary of just those pages. That four-move dance — hear the question, find the right pages, read them, then answer — is the exact shape of every RAG system. Engineers call it retrieve-then-generate, and once you can picture the librarian, you can picture any RAG app ever built.",
    problem:
      "You have a pile of documents and a user with a question. How do you connect them so the AI answers from the RIGHT pages and not from its imagination? You need a repeatable flow: take the question, search the documents, grab the best matches, and only THEN let the model write.",
    analogy:
      "A librarian who never memorizes the whole library — they just know how to find the right three pages fast, then answer from those.",
    explanation: [
      "Step 1 — the question comes in. This is the user's query, e.g. \"What's our parental leave policy?\"",
      "Step 2 — retrieve. Search your document collection for the chunks most relevant to that question (later lessons show how similarity search does this).",
      "Step 3 — augment. Take the top few chunks and stitch them into the prompt as 'context' alongside the question. This is the 'augmented' in RAG.",
      "Step 4 — generate. The LLM reads the context plus the question and writes a grounded answer, ideally citing which chunk it used.",
      "There are two phases in time: an offline 'indexing' phase (done once: chop docs into chunks and store them) and an online 'query' phase (done per question: the four steps above).",
      "Every fancy RAG system is just this loop with better parts — smarter chunking, better search, re-ranking — but the retrieve-then-generate skeleton never changes.",
    ],
    code: {
      language: "python",
      source: `# The retrieve-then-generate flow, faked with a tiny library
docs = [
    "Parental leave is 16 weeks, fully paid.",
    "Office hours are 9am to 5pm.",
    "The company was founded in 2019.",
]

def retrieve(question, docs):
    # naive search: return the doc sharing the most words with the question
    q = set(question.lower().split())
    return max(docs, key=lambda d: len(q & set(d.lower().split())))

question = "How much parental leave do we get?"
context = retrieve(question, docs)           # STEP 2: retrieve
prompt = "Context: " + context + "\\nQ: " + question   # STEP 3: augment
print(prompt)                                # STEP 4: feed to the model`,
      explanation:
        "A toy retriever picks the most word-overlapping document, then we stitch it into the prompt — the same four moves a real RAG system makes, just with smarter search later.",
    },
    exercise: {
      prompt: "Add a fourth document about the dress code, then ask a matching question and print the retrieved context.",
      starter: `docs = [
    "Parental leave is 16 weeks, fully paid.",
    "Office hours are 9am to 5pm.",
    "The company was founded in 2019.",
    "...",  # TODO: add a dress-code fact
]
question = "What is the dress code?"
context = retrieve(question, docs)
print(context)`,
      solution: `docs = [
    "Parental leave is 16 weeks, fully paid.",
    "Office hours are 9am to 5pm.",
    "The company was founded in 2019.",
    "The dress code is smart casual.",
]
question = "What is the dress code?"
context = retrieve(question, docs)
print(context)`,
    },
    quiz: [
      {
        question: "What is the correct order of the RAG flow?",
        options: [
          "Generate, then retrieve",
          "Retrieve relevant chunks, then generate the answer",
          "Retrain, then answer",
          "Answer, then search to check",
        ],
        answerIndex: 1,
        explanation:
          "RAG is retrieve-then-generate: find the relevant text first, then let the model write using it.",
      },
      {
        question: "Which step is the 'augment' in Retrieval-Augmented Generation?",
        options: [
          "Making the model bigger",
          "Stitching the retrieved chunks into the prompt as context",
          "Deleting the question",
          "Training on new data",
        ],
        answerIndex: 1,
        explanation:
          "Augmenting means adding the retrieved context to the prompt so the model reads it before answering.",
      },
    ],
    flashcards: [
      { front: "Retrieve-then-generate", back: "The core RAG loop: find relevant text first, then have the LLM write from it." },
      { front: "Indexing phase", back: "Offline, done once: chop documents into chunks and store them for fast search." },
      { front: "Query phase", back: "Online, per question: retrieve top chunks, augment the prompt, generate the answer." },
      { front: "Augment", back: "Inserting the retrieved chunks into the prompt as context alongside the question." },
    ],
    miniProject: {
      title: "Be the Retriever",
      brief: "Run the four RAG steps by hand with paper notes.",
      steps: [
        "Write 6 facts about your home on separate sticky notes — that's your document store.",
        "Have someone ask a question out loud (step 1).",
        "Physically pick the 1 to 2 notes that answer it (step 2, retrieve).",
        "Read them, then answer using ONLY those notes (steps 3 and 4).",
      ],
    },
    industryUse: [
      "Perplexity AI runs retrieve-then-generate on live web results for every answer it gives",
      "GitHub Copilot Chat retrieves relevant code from your repo before answering questions about it",
      "Enterprise search tools like Glean index company docs offline, then retrieve-and-generate per query",
    ],
    commonMistakes: [
      "Skipping the indexing phase and searching raw files each time — slow and it does not scale.",
      "Feeding the model too many retrieved chunks so the real answer gets buried in noise.",
    ],
    interviewQuestions: [
      "Walk through the four steps of a RAG query end to end.",
      "What is the difference between the indexing phase and the query phase?",
    ],
    papers: [],
    nextUp: ["rag-chunking", "rag-embeddings"],
    cheatsheet: [
      "Flow: question -> retrieve -> augment -> generate",
      "Offline: index (chunk + store) once",
      "Online: retrieve + answer per question",
      "The librarian: find the right pages, then answer",
      "Fancy RAG = same skeleton, better parts",
    ],
  },

  "rag-chunking": {
    story:
      "Imagine trying to hand someone a 400-page employee handbook and asking, \"Which paragraph answers my question about sick days?\" Nobody searches a whole book at once — you flip to the sick-leave section. Computers have the same problem, but worse: an AI can only read a limited amount of text at a time, and searching one giant blob returns the whole book when you needed one paragraph. So before anything else, we cut every document into bite-sized pieces called chunks — usually a few sentences or a paragraph each. Chunking is the unglamorous chopping-board work of RAG, and getting it right quietly decides whether your whole system feels smart or useless.",
    problem:
      "Documents are too big to search or feed to a model whole. If your 'unit of retrieval' is an entire 50-page PDF, you can never hand the model just the relevant bit — you either overflow its context limit or drown the real answer in irrelevant text. You need to slice documents into small, self-contained pieces you can search and retrieve individually.",
    analogy:
      "It is like meal prep: you do not serve a whole raw pumpkin. You chop it into portions you can actually cook with and grab one when you need it.",
    explanation: [
      "A chunk is a small slice of a document — often a paragraph or a few hundred words — that is big enough to make sense on its own but small enough to search precisely.",
      "Chunk too big and each piece is a haystack: retrieval returns pages of fluff around one useful line. Chunk too small and you slice sentences in half, losing the meaning.",
      "A sweet spot for many docs is roughly 200 to 500 words per chunk — but always test on YOUR documents; there is no universal magic number.",
      "Overlap helps: let chunks share a sentence or two at their edges (e.g. 50-word overlap) so an idea that straddles a boundary is not cut in half.",
      "Chunk along natural seams when you can — paragraphs, headings, sections — instead of blindly every N characters, so each piece stays coherent.",
      "Attach metadata to each chunk (source file, page number, section title). You will need it later to show citations and to filter searches.",
    ],
    code: {
      language: "python",
      source: `# A simple word-based chunker with overlap
def chunk_text(text, size=200, overlap=50):
    words = text.split()
    chunks = []
    start = 0
    while start < len(words):
        end = start + size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start = end - overlap        # step back so chunks overlap
    return chunks

doc = "word " * 500                 # pretend this is a long document
pieces = chunk_text(doc)
print("Made", len(pieces), "chunks")`,
      explanation:
        "We walk through the text in windows of 200 words, stepping back 50 each time so neighbouring chunks overlap and no idea gets sliced cleanly in two.",
    },
    exercise: {
      prompt: "Change the chunker to use 100-word chunks with 20-word overlap, and print how many chunks a 500-word doc makes.",
      starter: `doc = "word " * 500
# TODO: call chunk_text with size 100 and overlap 20
pieces = chunk_text(doc, ..., ...)
print(len(pieces))`,
      solution: `doc = "word " * 500
pieces = chunk_text(doc, 100, 20)
print(len(pieces))`,
    },
    quiz: [
      {
        question: "Why do we split documents into chunks before retrieval?",
        options: [
          "To make the files smaller on disk",
          "So we can search and retrieve just the relevant piece, not the whole document",
          "Because models cannot read paragraphs",
          "To translate them",
        ],
        answerIndex: 1,
        explanation:
          "Chunking lets you retrieve and hand the model only the relevant slice instead of an entire document.",
      },
      {
        question: "What problem does chunk overlap solve?",
        options: [
          "It makes retrieval faster",
          "It stops an idea that spans a boundary from being cut in half",
          "It saves memory",
          "It removes duplicate documents",
        ],
        answerIndex: 1,
        explanation:
          "Overlap shares a few words between neighbouring chunks so meaning straddling a boundary is preserved in at least one chunk.",
      },
      {
        question: "What happens if chunks are far too large?",
        options: [
          "Retrieval becomes more precise",
          "Each retrieved piece buries the real answer in lots of irrelevant text",
          "Overlap becomes automatic",
          "The model refuses to read them",
        ],
        answerIndex: 1,
        explanation:
          "Oversized chunks act like haystacks — the useful sentence is surrounded by fluff, hurting precision and wasting context space.",
      },
    ],
    flashcards: [
      { front: "Chunk", back: "A small, self-contained slice of a document (often a paragraph or a few hundred words) used as the unit of retrieval." },
      { front: "Chunk overlap", back: "Shared text at the edges of neighbouring chunks so ideas spanning a boundary are not lost." },
      { front: "Chunk size tradeoff", back: "Too big = imprecise, noisy retrieval; too small = broken, meaningless fragments." },
      { front: "Chunk metadata", back: "Extra info stored with a chunk (source, page, section) used for citations and filtering." },
    ],
    miniProject: {
      title: "Chunk a Real Article",
      brief: "Feel the size tradeoff by chunking a document three ways.",
      steps: [
        "Grab a news article or a Wikipedia section as plain text.",
        "Chunk it at 100, 300, and 600 words with your chunker.",
        "For a sample question, eyeball which chunk size best isolates the answer.",
        "Write one line on which size felt right and why.",
      ],
    },
    industryUse: [
      "Documentation assistants (e.g. Mintlify, ReadMe) chunk docs by section so answers cite the exact heading",
      "Legal-tech tools chunk contracts clause-by-clause so retrieval returns the precise clause",
      "Support platforms chunk help-center articles into steps so the bot returns one procedure, not a whole page",
    ],
    commonMistakes: [
      "Chunking blindly every N characters and slicing sentences mid-word — split on natural boundaries instead.",
      "Throwing away metadata during chunking, then being unable to cite sources later.",
    ],
    interviewQuestions: [
      "How would you choose a chunk size and overlap for a new corpus?",
      "Why can naive fixed-length chunking hurt retrieval quality?",
    ],
    papers: [],
    nextUp: ["rag-embeddings", "rag-vector-db"],
    cheatsheet: [
      "Chunk = small searchable slice of a doc",
      "Typical start: 200-500 words per chunk",
      "Add ~10-20% overlap so ideas aren't cut",
      "Split on paragraphs/headings, not blind N chars",
      "Keep metadata: source, page, section",
    ],
  },

  "rag-embeddings": {
    story:
      "Think about the words \"king\" and \"queen.\" Your brain instantly knows they are close in meaning but not identical. Now think of \"banana\" — miles away. What if a computer could place every word and sentence on a giant map where closeness means similar-in-meaning? That map is exactly what an embedding is. An embedding turns a piece of text into a long list of numbers — its coordinates on a meaning-map — so that \"How do I get a refund?\" lands right next to \"What is your return policy?\" even though they share almost no words. This is the secret sauce that lets RAG find the RIGHT chunk even when the user phrases things completely differently from your documents.",
    problem:
      "Old-school keyword search fails when people use different words for the same idea. Search for \"car\" and you miss every document that said \"automobile\" or \"vehicle.\" To retrieve by MEANING instead of exact words, we need to turn text into numbers that capture what it is about — so similar meanings end up as nearby numbers.",
    analogy:
      "It is like a map of a country: cities close together are near each other in real life. An embedding is a map of meaning — sentences about the same topic sit close together.",
    explanation: [
      "An embedding is a list of numbers (a vector), often a few hundred to a couple thousand of them, produced by a special model that has learned what text means.",
      "The magic property: texts with similar meaning get similar vectors — they land near each other in this high-dimensional 'meaning space.'",
      "This is why \"reset my password\" can match a document titled \"account recovery steps\" — different words, nearby meaning, nearby vectors.",
      "You never read these numbers yourself. You just compare them: closer vectors = more related meaning. The next lesson shows how we measure 'close.'",
      "You embed twice: once offline to turn every chunk into a vector (stored in a database), and once per question to turn the query into a vector you can compare against them.",
      "Use the SAME embedding model for documents and queries — mixing models is like measuring two maps drawn to different scales; the coordinates will not line up.",
    ],
    math: "An embedding maps text to a point in R^n (n = the number of dimensions, e.g. 768 or 1536). Meaning-similarity is measured by how close two points are — commonly via cosine of the angle between their vectors.",
    code: {
      language: "python",
      source: `# Turn sentences into vectors, then see which two are closest in meaning
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
texts = [
    "How do I get a refund?",
    "What is your return policy?",
    "How tall is Mount Everest?",
]
vecs = model.encode(texts)                       # each text -> a vector

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

print("refund vs return :", round(cosine(vecs[0], vecs[1]), 3))
print("refund vs everest:", round(cosine(vecs[0], vecs[2]), 3))`,
      explanation:
        "The refund and return-policy sentences score high similarity despite sharing no keywords, while the Everest sentence scores low — meaning, not words, drives the match.",
    },
    exercise: {
      prompt: "Add a sentence about the weather, embed it, and print its similarity to the refund question.",
      starter: `texts = [
    "How do I get a refund?",
    "What is your return policy?",
    "How tall is Mount Everest?",
    "...",  # TODO: add a sentence about the weather
]
vecs = model.encode(texts)
print(round(cosine(vecs[0], vecs[3]), 3))`,
      solution: `texts = [
    "How do I get a refund?",
    "What is your return policy?",
    "How tall is Mount Everest?",
    "Will it rain tomorrow afternoon?",
]
vecs = model.encode(texts)
print(round(cosine(vecs[0], vecs[3]), 3))`,
    },
    quiz: [
      {
        question: "What is a text embedding?",
        options: [
          "A compressed zip of the text",
          "A list of numbers that represents the text's meaning as a point in space",
          "A summary written by the model",
          "The text translated to English",
        ],
        answerIndex: 1,
        explanation:
          "An embedding is a vector of numbers positioning the text in a 'meaning space' where similar meanings are near each other.",
      },
      {
        question: "Why can embeddings match \"reset my password\" to \"account recovery\"?",
        options: [
          "They share the same keywords",
          "Similar meanings produce nearby vectors, even with different words",
          "The model memorized that pair",
          "They have the same number of letters",
        ],
        answerIndex: 1,
        explanation:
          "Embeddings capture meaning, so semantically related phrases land close together regardless of exact wording.",
      },
      {
        question: "Why must you use the same embedding model for documents and queries?",
        options: [
          "To save money",
          "So both are placed in the same meaning-space and their coordinates are comparable",
          "Because models expire",
          "It is not actually required",
        ],
        answerIndex: 1,
        explanation:
          "Different models produce different, incompatible spaces; comparing across them is like comparing two maps drawn to different scales.",
      },
    ],
    flashcards: [
      { front: "Embedding", back: "A vector of numbers representing a text's meaning as a point in high-dimensional space." },
      { front: "Meaning space", back: "The space where embeddings live; nearby points mean similar meanings." },
      { front: "Semantic search", back: "Retrieving by meaning (via embeddings) rather than exact keyword match." },
      { front: "Same-model rule", back: "Embed documents and queries with the SAME model so their vectors are comparable." },
    ],
    miniProject: {
      title: "Meaning-Map Your FAQ",
      brief: "Prove embeddings match by meaning, not words.",
      steps: [
        "Write 5 FAQ questions and one query phrased totally differently from all of them.",
        "Embed all 6 with a sentence-transformer model.",
        "Compute cosine similarity of the query against each FAQ.",
        "Confirm the top match is the one that MEANS the same thing, not the one sharing words.",
      ],
    },
    industryUse: [
      "Spotify and YouTube embed songs/videos to recommend semantically similar content",
      "Google and Bing use embeddings so results match intent, not just keywords",
      "E-commerce sites (e.g. Amazon) embed product descriptions for 'similar items' and smarter search",
    ],
    commonMistakes: [
      "Embedding documents with one model and queries with another — the vectors will not line up.",
      "Assuming embeddings understand truth or logic; they capture topical similarity, not factual correctness.",
    ],
    interviewQuestions: [
      "What is an embedding and why does it enable semantic search?",
      "Why is keyword search insufficient, and how do embeddings help?",
    ],
    papers: [
      { title: "Efficient Estimation of Word Representations in Vector Space (word2vec, Mikolov et al.)", url: "https://arxiv.org/abs/1301.3781", year: 2013 },
    ],
    nextUp: ["rag-vector-db", "rag-prompt"],
    cheatsheet: [
      "Embedding = text -> list of numbers (a vector)",
      "Similar meaning = nearby vectors",
      "Enables search by meaning, not keywords",
      "Embed docs once (store) + each query (compare)",
      "Same model for docs AND queries",
    ],
  },

  "rag-vector-db": {
    story:
      "Say you have one million paragraph-chunks, each turned into a list of numbers. A question comes in, you turn it into numbers too, and now you must find the handful of chunks closest in meaning. Comparing your question against a million vectors one by one, every single time, would be painfully slow. A vector database is a special kind of storage built for exactly this: it holds millions of vectors and, given a new one, finds the nearest neighbours almost instantly. It is the search engine at the heart of RAG — the thing that, in a blink, pulls the five most relevant chunks out of a haystack of millions.",
    problem:
      "Once every chunk is an embedding, you need to answer one question fast, over and over: \"Which stored vectors are closest to THIS query vector?\" Doing that by brute force across millions of vectors for every query is too slow. You need purpose-built storage that indexes vectors so nearest-neighbour search is near-instant.",
    analogy:
      "It is like a library organized so that books on similar topics physically sit together — so to find related books you walk to one shelf instead of scanning every book in the building.",
    explanation: [
      "A vector database stores embeddings plus their original text and metadata, and specializes in one operation: given a query vector, return the k nearest vectors (the top-k most similar chunks).",
      "'Nearest' is measured by a similarity metric. The most common is cosine similarity — the cosine of the angle between two vectors, ranging from 1 (same direction/meaning) to 0 (unrelated) to -1 (opposite).",
      "To stay fast at scale, these databases use approximate nearest neighbour (ANN) indexes (like HNSW) — they trade a tiny bit of accuracy for enormous speed, checking clever shortlists instead of every vector.",
      "You pick k, the number of chunks to return (often 3 to 8). Too few and you might miss the answer; too many and you clutter the prompt with noise.",
      "Popular tools: Pinecone, Weaviate, Qdrant, Milvus, Chroma, and pgvector (Postgres). They all do the same core job — store vectors and find neighbours.",
      "You can also filter by metadata before or after search — e.g. 'only chunks from the 2026 handbook' — to keep results relevant and current.",
    ],
    math: "Cosine similarity(a, b) = (a . b) / (||a|| * ||b||). It measures the angle between vectors: 1 means identical direction (very similar meaning), 0 means unrelated.",
    code: {
      language: "python",
      source: `# A tiny in-memory vector store: embed, store, then top-k search
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")
chunks = [
    "Refunds are accepted within 30 days.",
    "Our office is open 9 to 5.",
    "Free shipping on orders over 50 dollars.",
]
store = model.encode(chunks)          # the 'database' of vectors

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

def search(query, k=2):
    q = model.encode([query])[0]
    scores = [cosine(q, v) for v in store]
    top = np.argsort(scores)[::-1][:k]     # indices of the k best
    return [chunks[i] for i in top]

print(search("Can I return this for my money back?"))`,
      explanation:
        "We embed every chunk once, then for a query we score all chunks by cosine similarity and return the top-k — the same job a real vector database does, just at massive scale and speed.",
    },
    exercise: {
      prompt: "Change the search to return the top 1 result only, and query it about shipping.",
      starter: `# store and search are defined above
results = search("...", k=...)  # TODO: ask about shipping, top 1
print(results)`,
      solution: `results = search("When do I get free shipping?", k=1)
print(results)`,
    },
    quiz: [
      {
        question: "What is a vector database built to do?",
        options: [
          "Store images only",
          "Find the vectors most similar to a query vector, fast",
          "Translate documents",
          "Train language models",
        ],
        answerIndex: 1,
        explanation:
          "A vector database specializes in nearest-neighbour search: given a query vector, quickly return the most similar stored vectors.",
      },
      {
        question: "What does cosine similarity measure?",
        options: [
          "The length of the text",
          "The angle between two vectors — how aligned their meanings are",
          "The number of shared words",
          "The file size",
        ],
        answerIndex: 1,
        explanation:
          "Cosine similarity is the cosine of the angle between vectors: 1 means same direction (very similar), 0 means unrelated.",
      },
      {
        question: "Why do vector databases use approximate nearest neighbour (ANN) search?",
        options: [
          "To be more accurate than exact search",
          "To trade a tiny bit of accuracy for huge speed at scale",
          "To save disk space only",
          "Because exact search is impossible",
        ],
        answerIndex: 1,
        explanation:
          "ANN indexes like HNSW check smart shortlists instead of every vector, giving near-instant search with negligible accuracy loss.",
      },
    ],
    flashcards: [
      { front: "Vector database", back: "Storage specialized in finding the nearest (most similar) vectors to a query vector, fast." },
      { front: "Cosine similarity", back: "Cosine of the angle between two vectors; 1 = same meaning direction, 0 = unrelated." },
      { front: "Top-k retrieval", back: "Returning the k most similar chunks for a query (often k = 3 to 8)." },
      { front: "ANN index", back: "Approximate nearest neighbour structure (e.g. HNSW) that trades tiny accuracy for big speed." },
    ],
    miniProject: {
      title: "Build a 10-Chunk Search Engine",
      brief: "Stand up a mini vector store and query it.",
      steps: [
        "Write 10 short facts as chunks.",
        "Embed them all and keep the vectors in a list.",
        "Write a top-k cosine search function.",
        "Fire 3 differently-worded questions and check the right chunks come back on top.",
      ],
    },
    industryUse: [
      "Pinecone and Weaviate power production RAG search at companies like Notion and Shopify",
      "Postgres users add pgvector to do similarity search inside their existing database",
      "Spotify's Annoy library does fast approximate nearest-neighbour search for recommendations",
    ],
    commonMistakes: [
      "Setting k too high and flooding the prompt with weakly-related chunks that confuse the model.",
      "Forgetting to store the original text and metadata with each vector — then you can retrieve a match but cannot show or cite it.",
    ],
    interviewQuestions: [
      "How does cosine similarity work and why is it used for embeddings?",
      "What is approximate nearest neighbour search and why does RAG rely on it?",
    ],
    papers: [
      { title: "Efficient and Robust Approximate Nearest Neighbor Search Using HNSW (Malkov & Yashunin)", url: "https://arxiv.org/abs/1603.09320", year: 2018 },
    ],
    nextUp: ["rag-prompt", "rag-pipeline"],
    cheatsheet: [
      "Vector DB = fast nearest-neighbour search over embeddings",
      "Similarity metric: cosine (angle between vectors)",
      "Return top-k chunks (often 3-8)",
      "ANN (HNSW) = tiny accuracy loss, huge speed",
      "Tools: Pinecone, Weaviate, Qdrant, Chroma, pgvector",
    ],
  },

  "rag-prompt": {
    story:
      "You have done the hard retrieval work: the right three paragraphs are sitting in a variable. But the model does not magically know to use them — you have to hand them over with clear instructions, like slipping a colleague a sticky note that says \"Answer using ONLY what's written here, and if it's not here, say you don't know.\" How you write that instruction — where the context goes, what rules you set, how you separate the facts from the question — is prompt construction, and it is where a good retrieval either becomes a great grounded answer or gets ignored by a chatty model that reverts to guessing.",
    problem:
      "Retrieval gives you relevant text, but the model still decides how to use it. Without explicit instructions it may ignore your context and fall back on its own memory, blend real facts with invented ones, or answer confidently when the context does not actually contain the answer. You need to assemble a prompt that forces the model to stay grounded in the retrieved chunks.",
    analogy:
      "It is like giving a witness the case file and saying: \"Testify only from these documents. If it is not in the file, say so.\" The instruction is what keeps them honest.",
    explanation: [
      "A RAG prompt has three parts: an instruction (the rules), the context (your retrieved chunks), and the question. Keep them clearly separated so the model never confuses facts with the task.",
      "State the grounding rule explicitly: \"Answer using only the context below. If the answer is not in the context, say you don't know.\" This one line dramatically cuts hallucination.",
      "Label each chunk (Source 1, Source 2, or include its filename) so you can later ask the model to cite which chunk it used.",
      "Order matters: put the instruction first or last where the model attends most, and don't bury the question in the middle of a wall of context.",
      "Mind the context window — the model can only read so much. If your top-k chunks are too long, trim or reduce k rather than overflowing and getting truncated.",
      "Ask for the behaviour you want: request a concise answer, a specific format, or an explicit 'not found' response — models follow instructions far better when you state them.",
    ],
    code: {
      language: "python",
      source: `# Assemble a grounded RAG prompt from retrieved chunks
def build_prompt(question, chunks):
    context = ""
    for i, c in enumerate(chunks, start=1):
        context += "Source " + str(i) + ": " + c + "\\n"
    instruction = (
        "Answer the question using ONLY the sources below. "
        "If the answer is not there, reply: I don't know. "
        "Cite the source number you used.\\n\\n"
    )
    return instruction + context + "\\nQuestion: " + question

chunks = [
    "Refunds are accepted within 30 days of purchase.",
    "Shipping takes 3 to 5 business days.",
]
print(build_prompt("How long do I have to get a refund?", chunks))`,
      explanation:
        "We stack a clear grounding instruction, then numbered sources, then the question — the structure that keeps the model answering from the retrieved text and able to cite it.",
    },
    exercise: {
      prompt: "Add a line to the instruction telling the model to answer in one short sentence.",
      starter: `instruction = (
    "Answer the question using ONLY the sources below. "
    "If the answer is not there, reply: I don't know. "
    # TODO: add a rule to answer in one short sentence
    "Cite the source number you used.\\n\\n"
)
print(instruction)`,
      solution: `instruction = (
    "Answer the question using ONLY the sources below. "
    "If the answer is not there, reply: I don't know. "
    "Answer in one short sentence. "
    "Cite the source number you used.\\n\\n"
)
print(instruction)`,
    },
    quiz: [
      {
        question: "What are the three parts of a good RAG prompt?",
        options: [
          "Title, body, footer",
          "Instruction, retrieved context, and the question",
          "Question, answer, and score",
          "System, user, assistant only",
        ],
        answerIndex: 1,
        explanation:
          "A RAG prompt clearly separates the instruction (rules), the retrieved context, and the user's question.",
      },
      {
        question: "Which instruction most reduces hallucination in a RAG prompt?",
        options: [
          "Be as creative as possible",
          "Answer using only the context, and say you don't know if it is not there",
          "Answer as fast as you can",
          "Ignore the context if unsure",
        ],
        answerIndex: 1,
        explanation:
          "Explicitly restricting the model to the provided context and allowing an 'I don't know' response keeps it grounded.",
      },
    ],
    flashcards: [
      { front: "RAG prompt", back: "The assembled input: instruction + retrieved context + question, clearly separated." },
      { front: "Grounding instruction", back: "A rule telling the model to answer only from the context and to admit when the answer is absent." },
      { front: "Context window", back: "The maximum amount of text a model can read at once; retrieved chunks must fit inside it." },
      { front: "Source labels", back: "Numbering or naming chunks so the model can cite which one it used." },
    ],
    miniProject: {
      title: "Two Prompts, Two Answers",
      brief: "See how the instruction changes grounding.",
      steps: [
        "Take one retrieved paragraph and one question it does NOT actually answer.",
        "Prompt A: just paste context + question, no rules.",
        "Prompt B: add 'answer only from context, else say I don't know.'",
        "Compare — B should admit the answer is missing while A may invent one.",
      ],
    },
    industryUse: [
      "Customer-support bots at companies like Zendesk template a grounding instruction around retrieved help articles",
      "Perplexity AI formats sources with numbers so its answers can cite them inline",
      "Internal knowledge assistants at large firms enforce 'answer only from company docs' rules to avoid off-policy answers",
    ],
    commonMistakes: [
      "Pasting context with no grounding instruction, so the model ignores it and reverts to memory.",
      "Stuffing too many long chunks in and overflowing the context window, silently truncating the real answer.",
    ],
    interviewQuestions: [
      "How would you structure a prompt to keep an LLM grounded in retrieved context?",
      "What instruction reduces the chance of hallucination in RAG, and why?",
    ],
    papers: [],
    nextUp: ["rag-citations", "rag-pipeline"],
    cheatsheet: [
      "Prompt = instruction + context + question",
      "Say: answer ONLY from context, else 'I don't know'",
      "Label sources so the model can cite them",
      "Keep chunks within the context window",
      "Ask explicitly for the format you want",
    ],
  },

  "rag-citations": {
    story:
      "Think about why you trust a good Wikipedia article: every claim has a little footnote number you can click to check the source. Now imagine an AI that answers your question and, next to each fact, tells you \"this came from page 12 of the 2026 handbook.\" Suddenly you can verify it in seconds, and if it is wrong you can see exactly where it went wrong. That is grounding with citations — making the model point back to the retrieved chunk it used. It is the difference between an AI you have to blindly trust and one you can actually check, which is what makes RAG safe enough for law firms, hospitals, and banks.",
    problem:
      "Even a well-built RAG system can occasionally drift — stitching together a chunk plus a bit of the model's own memory into a claim you cannot trace. Users, and regulators, need to know: where did this answer come from? Without citations, a RAG answer is just another confident paragraph you have to take on faith.",
    analogy:
      "It is like showing your work on a math test. The teacher does not just want the answer — they want to see which steps and sources you used, so they can trust it and catch mistakes.",
    explanation: [
      "Grounding means every claim in the answer traces back to a specific retrieved chunk — the model is 'standing on' real text, not floating on memory.",
      "Citations are the visible proof of grounding: source numbers, filenames, or page references attached to each statement so a human can verify it.",
      "Because you stored metadata with each chunk (source, page, section), you can pass it into the prompt and ask the model to cite it — this is why that metadata mattered back in chunking.",
      "Citations do double duty: they build user trust AND give you a debugging trail — if an answer is wrong, you can open the cited chunk and see whether retrieval or generation failed.",
      "A powerful safety move: instruct the model to answer 'I don't know' when the retrieved chunks do not contain the answer, rather than filling the gap from memory.",
      "Citations reduce, but do not eliminate, hallucination — always spot-check that a cited source actually says what the answer claims; models can cite the wrong chunk.",
    ],
    code: {
      language: "python",
      source: `# Carry metadata through so the answer can cite its source
chunks = [
    {"text": "Parental leave is 16 weeks, fully paid.", "source": "handbook.pdf p.8"},
    {"text": "Office hours are 9am to 5pm.",            "source": "handbook.pdf p.2"},
]

def build_prompt(question, chunks):
    context = ""
    for c in chunks:
        context += "[" + c["source"] + "] " + c["text"] + "\\n"
    rule = ("Answer using only the sources. After your answer, "
            "cite the [source] you used. If unknown, say I don't know.\\n\\n")
    return rule + context + "\\nQ: " + question

print(build_prompt("How much parental leave is there?", chunks))
# Model -> "16 weeks, fully paid. [handbook.pdf p.8]"`,
      explanation:
        "Each chunk carries its source tag, we pass those tags into the prompt, and we instruct the model to cite them — so the final answer points back to verifiable text.",
    },
    exercise: {
      prompt: "Add a third chunk with a source tag about remote work, then build the prompt for a matching question.",
      starter: `chunks = [
    {"text": "Parental leave is 16 weeks, fully paid.", "source": "handbook.pdf p.8"},
    {"text": "Office hours are 9am to 5pm.",            "source": "handbook.pdf p.2"},
    # TODO: add a remote-work chunk with a source tag
]
print(build_prompt("Can I work remotely?", chunks))`,
      solution: `chunks = [
    {"text": "Parental leave is 16 weeks, fully paid.", "source": "handbook.pdf p.8"},
    {"text": "Office hours are 9am to 5pm.",            "source": "handbook.pdf p.2"},
    {"text": "Remote work is allowed two days per week.", "source": "handbook.pdf p.5"},
]
print(build_prompt("Can I work remotely?", chunks))`,
    },
    quiz: [
      {
        question: "What does 'grounding' mean in RAG?",
        options: [
          "Running the model on a local computer",
          "Every claim in the answer traces back to a specific retrieved chunk",
          "Making the answer shorter",
          "Turning off the internet",
        ],
        answerIndex: 1,
        explanation:
          "Grounding means the answer stands on real retrieved text, with each claim traceable to a source chunk.",
      },
      {
        question: "Why are citations valuable beyond building trust?",
        options: [
          "They make the model faster",
          "They give a debugging trail to see whether retrieval or generation failed",
          "They reduce the file size",
          "They train the model",
        ],
        answerIndex: 1,
        explanation:
          "Citations let you open the cited chunk to check whether the wrong chunk was retrieved or the model misused a correct one.",
      },
      {
        question: "What should a grounded RAG system do when the context lacks the answer?",
        options: [
          "Invent a plausible answer",
          "Say 'I don't know' rather than filling the gap from memory",
          "Return an empty string silently",
          "Repeat the question",
        ],
        answerIndex: 1,
        explanation:
          "Instructing the model to admit when the answer is absent is a key safety behaviour that prevents hallucination.",
      },
    ],
    flashcards: [
      { front: "Grounding", back: "Answering such that every claim traces back to specific retrieved text, not the model's memory." },
      { front: "Citation", back: "A visible reference (source number, filename, page) attached to a claim so a human can verify it." },
      { front: "Metadata handoff", back: "Passing each chunk's source info into the prompt so the model can cite it." },
      { front: "Abstain behaviour", back: "Instructing the model to say 'I don't know' when the context lacks the answer." },
    ],
    miniProject: {
      title: "Add Footnotes to an Answer",
      brief: "Make a RAG answer verifiable.",
      steps: [
        "Give 3 chunks, each tagged with a fake source like doc.pdf p.N.",
        "Build a prompt asking the model to cite the source after its answer.",
        "Check that the cited source actually contains the claim.",
        "Break it on purpose: ask something the chunks don't cover and confirm it says 'I don't know.'",
      ],
    },
    industryUse: [
      "Perplexity AI shows numbered citations under every answer so users can click through to sources",
      "Legal assistants like Harvey cite the exact clause or case a statement is drawn from",
      "Healthcare and finance assistants require source citations to meet compliance and audit requirements",
    ],
    commonMistakes: [
      "Assuming a citation guarantees correctness — models can cite a chunk that does not actually support the claim; always spot-check.",
      "Dropping chunk metadata earlier in the pipeline, leaving nothing to cite at answer time.",
    ],
    interviewQuestions: [
      "What is grounding, and how do citations support it?",
      "How would you design a RAG system to reliably say 'I don't know'?",
    ],
    papers: [],
    nextUp: ["rag-pipeline", "rag-eval"],
    cheatsheet: [
      "Grounding = every claim traces to a retrieved chunk",
      "Citations = visible, checkable source tags",
      "Carry metadata from chunk -> prompt -> answer",
      "Instruct: say 'I don't know' when context lacks it",
      "Citations aid trust AND debugging — still spot-check",
    ],
  },

  "rag-pipeline": {
    story:
      "Everything so far has been a single instrument: chunking, embeddings, the vector store, the grounded prompt. Now we play the whole song. A RAG pipeline is just those parts wired into one smooth line: documents go in, get chopped and embedded and stored (once), and then every question flows through embed-search-prompt-answer. The beautiful part is how little code it actually takes — maybe 30 lines to go from a folder of text to a working 'ask my documents' tool. Once you have built it once, you own the pattern behind an entire category of AI products.",
    problem:
      "You understand each RAG piece in isolation, but a real app has to connect them into one reliable flow — index the documents once, then answer many questions against that index. Without a clear pipeline you end up re-embedding everything per question (slow and costly) or wiring the steps together inconsistently. You need the end-to-end skeleton.",
    analogy:
      "It is like a coffee machine assembly line: beans get ground and loaded once (indexing), then each cup is pulled on demand from that loaded hopper (querying). Prep once, serve many.",
    explanation: [
      "Phase 1, Indexing (run once, offline): load documents, chunk them, embed each chunk, and store the vectors plus text and metadata. This is your searchable knowledge base.",
      "Phase 2, Querying (run per question, online): embed the question, search the store for top-k chunks, build the grounded prompt, and call the LLM to generate the answer.",
      "Keep the two phases separate. Re-indexing is expensive, so do it only when documents change; querying is cheap and happens constantly.",
      "The five moving parts map cleanly: loader -> chunker -> embedder -> vector store -> LLM. Swap any one without touching the others.",
      "Start dumb and simple: an in-memory list of vectors and a naive top-k search is a perfectly good first pipeline. Add a real vector database only when you outgrow it.",
      "Log what got retrieved for each question. When an answer is wrong, the retrieved chunks tell you instantly whether retrieval or generation was the culprit.",
    ],
    code: {
      language: "python",
      source: `# A minimal end-to-end RAG pipeline
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

# --- PHASE 1: INDEX (once) ---
docs = [
    "Refunds are accepted within 30 days of purchase.",
    "Shipping takes 3 to 5 business days.",
    "The Pro plan costs 15 dollars per month.",
]
index = model.encode(docs)            # embed + store

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# --- PHASE 2: QUERY (per question) ---
def answer(question, k=2):
    q = model.encode([question])[0]
    scores = [cosine(q, v) for v in index]
    top = np.argsort(scores)[::-1][:k]
    context = "\\n".join(docs[i] for i in top)
    prompt = "Answer only from:\\n" + context + "\\nQ: " + question
    return prompt                     # hand this to your LLM

print(answer("How much is the Pro plan?"))`,
      explanation:
        "Phase 1 embeds and stores the docs once; phase 2 embeds the question, finds top-k by cosine, and assembles a grounded prompt — the complete retrieve-then-generate loop in one file.",
    },
    exercise: {
      prompt: "Add a fourth document about the free trial, re-index, and query it about trials.",
      starter: `docs = [
    "Refunds are accepted within 30 days of purchase.",
    "Shipping takes 3 to 5 business days.",
    "The Pro plan costs 15 dollars per month.",
    "...",  # TODO: add a free-trial fact
]
index = model.encode(docs)   # re-index after adding
print(answer("Is there a free trial?"))`,
      solution: `docs = [
    "Refunds are accepted within 30 days of purchase.",
    "Shipping takes 3 to 5 business days.",
    "The Pro plan costs 15 dollars per month.",
    "There is a 14 day free trial with no credit card required.",
]
index = model.encode(docs)
print(answer("Is there a free trial?"))`,
    },
    quiz: [
      {
        question: "Which steps belong to the offline indexing phase?",
        options: [
          "Embed the question and search",
          "Load, chunk, embed, and store the documents",
          "Build the prompt and call the LLM",
          "Show citations to the user",
        ],
        answerIndex: 1,
        explanation:
          "Indexing (done once) is load -> chunk -> embed -> store. Querying (per question) is embed -> search -> prompt -> generate.",
      },
      {
        question: "Why keep indexing and querying as separate phases?",
        options: [
          "It looks tidier",
          "Indexing is expensive and only needed when docs change; querying is cheap and constant",
          "The model requires it",
          "To use two computers",
        ],
        answerIndex: 1,
        explanation:
          "Re-embedding all documents per question would be slow and costly; you index once and query many times against that index.",
      },
    ],
    flashcards: [
      { front: "RAG pipeline", back: "The wired-together flow: index documents once, then embed-search-prompt-generate per question." },
      { front: "Indexing phase", back: "Offline, once: load, chunk, embed, and store documents into a searchable index." },
      { front: "Querying phase", back: "Online, per question: embed the query, retrieve top-k, build the prompt, generate." },
      { front: "Retrieval log", back: "A record of which chunks were retrieved per query, used to debug wrong answers." },
    ],
    miniProject: {
      title: "Your First Working RAG",
      brief: "Build the full pipeline over a handful of your own facts.",
      steps: [
        "Write 8 facts about a topic you know (a hobby, a recipe collection).",
        "Index: embed all 8 and store the vectors.",
        "Query: embed a question, retrieve top-3, and print the assembled prompt.",
        "Paste that prompt into any chatbot and confirm it answers from your facts.",
      ],
    },
    industryUse: [
      "LangChain and LlamaIndex package this exact index-then-query pipeline as reusable building blocks",
      "Startups ship 'chat with your docs' products that are essentially this pipeline plus a nice UI",
      "Internal tools at large companies index the wiki nightly, then serve employee questions all day",
    ],
    commonMistakes: [
      "Re-embedding the whole corpus on every question instead of indexing once — slow and expensive.",
      "Not logging retrieved chunks, then being unable to tell whether a wrong answer was a retrieval or generation failure.",
    ],
    interviewQuestions: [
      "Describe an end-to-end RAG pipeline and which steps run offline vs online.",
      "How would you debug a RAG system that returns a wrong answer?",
    ],
    papers: [],
    nextUp: ["rag-eval", "rag-advanced"],
    cheatsheet: [
      "Index once: load -> chunk -> embed -> store",
      "Query per question: embed -> search -> prompt -> generate",
      "Parts: loader, chunker, embedder, vector store, LLM",
      "Start with an in-memory list; scale to a vector DB later",
      "Log retrieved chunks to debug wrong answers",
    ],
  },

  "rag-eval": {
    story:
      "You built a RAG app and it feels great on the three questions you tried. Then a coworker asks something slightly different and it confidently gives a wrong answer. \"Feels good\" is not a measurement. Real teams don't ship on vibes — they score their system on a set of test questions, tracking two separate things: did retrieval pull the RIGHT chunks, and did the answer actually stick to them. Splitting evaluation into these two halves is the single most useful habit in RAG, because when something breaks, you instantly know WHICH half to fix.",
    problem:
      "A RAG system can fail in two very different places: retrieval can fetch the wrong chunks, or generation can ignore good chunks and hallucinate anyway. If you only look at the final answer, you cannot tell which half broke — so you cannot fix it. You need to measure the two halves separately.",
    analogy:
      "It is like a restaurant: if a dish is bad, was it the ingredients (retrieval) or the cooking (generation)? You taste-test each stage separately so you know which one to fix.",
    explanation: [
      "Split evaluation into two questions: Retrieval quality — did the right chunks come back? And Faithfulness — did the answer actually stay true to those chunks?",
      "Retrieval metrics: recall@k (is the correct chunk somewhere in the top-k?) and precision (how many of the retrieved chunks were actually relevant). If recall is low, fix chunking, embeddings, or k.",
      "Faithfulness (also called groundedness): does every claim in the answer follow from the retrieved context, with nothing invented? If retrieval was good but faithfulness is low, fix the prompt or the model.",
      "Answer relevance is a third check: even a faithful answer is useless if it does not actually address the user's question.",
      "Build a small evaluation set: 20 to 50 real questions with known correct answers and known source chunks. This is your scoreboard for every change you make.",
      "You can grade at scale with an 'LLM-as-a-judge': ask a strong model to score whether an answer is supported by the context — cheaper than humans, though still worth spot-checking. Tools like RAGAS automate exactly this.",
    ],
    math: "Recall@k = (number of relevant chunks found in the top-k) / (total relevant chunks). Higher means retrieval is surfacing what you need within the top k results.",
    code: {
      language: "python",
      source: `# Measure retrieval with recall@k on a small labeled set
def recall_at_k(retrieved_ids, relevant_ids, k):
    top = set(retrieved_ids[:k])
    hit = len(top & set(relevant_ids))
    return hit / len(relevant_ids)

# for one question: which chunk ids the system returned, and which truly help
retrieved = ["c3", "c1", "c7", "c2"]     # ranked by the retriever
relevant  = ["c1", "c2"]                  # the human-labeled correct chunks

for k in (1, 2, 3, 4):
    print("recall@" + str(k), round(recall_at_k(retrieved, relevant, k), 2))`,
      explanation:
        "Recall@k rises as k grows because more of the truly-relevant chunks fall inside the top-k window — a direct, honest score for how well retrieval is doing.",
    },
    exercise: {
      prompt: "Compute recall@2 when the retriever returns [\"c5\", \"c1\"] and the relevant chunks are [\"c1\", \"c9\"].",
      starter: `retrieved = ["c5", "c1"]
relevant  = ["c1", "c9"]
# TODO: call recall_at_k with k=2
print(recall_at_k(retrieved, relevant, ...))`,
      solution: `retrieved = ["c5", "c1"]
relevant  = ["c1", "c9"]
print(recall_at_k(retrieved, relevant, 2))`,
    },
    quiz: [
      {
        question: "Why evaluate retrieval and generation separately?",
        options: [
          "To make reports longer",
          "So you know which half to fix when the final answer is wrong",
          "Because the model requires it",
          "To use more metrics for their own sake",
        ],
        answerIndex: 1,
        explanation:
          "A wrong answer could come from bad retrieval or bad generation; measuring each half tells you exactly where to look.",
      },
      {
        question: "What does 'faithfulness' measure in a RAG answer?",
        options: [
          "How fast the answer was produced",
          "Whether every claim follows from the retrieved context with nothing invented",
          "How long the answer is",
          "Whether the user liked it",
        ],
        answerIndex: 1,
        explanation:
          "Faithfulness (groundedness) checks that the answer stays true to the retrieved chunks and does not hallucinate beyond them.",
      },
      {
        question: "What does recall@k tell you?",
        options: [
          "How faithful the answer is",
          "Whether the correct chunks appear within the top-k retrieved results",
          "How much the answer costs",
          "How creative the model is",
        ],
        answerIndex: 1,
        explanation:
          "Recall@k measures how many of the truly relevant chunks were surfaced within the top-k, a core retrieval-quality metric.",
      },
    ],
    flashcards: [
      { front: "Retrieval quality", back: "Whether the system fetched the right chunks; measured by recall@k and precision." },
      { front: "Faithfulness", back: "Whether every claim in the answer follows from the retrieved context, with nothing invented." },
      { front: "Recall@k", back: "Fraction of relevant chunks that appear within the top-k retrieved results." },
      { front: "LLM-as-a-judge", back: "Using a strong model to score answers (e.g. for faithfulness) at scale, as in tools like RAGAS." },
    ],
    miniProject: {
      title: "Score Your Own RAG",
      brief: "Turn 'feels good' into a real number.",
      steps: [
        "Write 10 questions for your pipeline, noting which chunk truly answers each.",
        "Run retrieval and record the top-3 chunk ids per question.",
        "Compute recall@3 across all 10 — that is your retrieval score.",
        "Read 3 answers and judge faithfulness by hand; note any invented claims.",
      ],
    },
    industryUse: [
      "Teams use the open-source RAGAS framework to score faithfulness and retrieval automatically",
      "LangSmith and similar tools track RAG evaluation metrics across app versions in production",
      "Enterprises maintain 'golden' question sets to regression-test their assistants before each release",
    ],
    commonMistakes: [
      "Judging the system on a handful of cherry-picked questions instead of a fixed evaluation set.",
      "Only reading final answers, so you cannot tell whether retrieval or generation caused a failure.",
    ],
    interviewQuestions: [
      "How do you evaluate a RAG system, and why split retrieval from generation?",
      "What is faithfulness and how would you measure it at scale?",
    ],
    papers: [
      { title: "RAGAS: Automated Evaluation of Retrieval Augmented Generation (Es et al.)", url: "https://arxiv.org/abs/2309.15217", year: 2023 },
    ],
    nextUp: ["rag-advanced", "rag-capstone"],
    cheatsheet: [
      "Measure two halves: retrieval + faithfulness",
      "Retrieval: recall@k, precision",
      "Faithfulness: does the answer stick to the context?",
      "Build a fixed 20-50 question eval set",
      "Scale grading with LLM-as-a-judge (e.g. RAGAS)",
    ],
  },

  "rag-advanced": {
    story:
      "Your basic pipeline works, but you notice cracks: someone searches for an exact product code like \"SKU-4471\" and semantic search shrugs because a code has no 'meaning' to embed. Someone else gets an answer built from the 4th-best chunk when the perfect chunk was sitting at rank 7. These are the real-world snags that separate a demo from a product, and the fixes have names: hybrid search (mix keyword matching with meaning matching), re-ranking (a second, smarter pass that reorders the shortlist), and careful chunk-size tuning. This lesson is the toolbox pros reach for when 'good enough' is not good enough.",
    problem:
      "Pure vector search has blind spots: it misses exact terms (codes, names, acronyms), it sometimes ranks the truly-best chunk just below the cutoff, and it is sensitive to how you chunked. To push retrieval from okay to excellent, you need techniques that patch each weakness.",
    analogy:
      "It is like hiring: a quick resume scan (fast vector search) gives you a shortlist, but then you do a careful interview (re-ranking) to reorder who is actually best — and you also check exact credentials (keyword search) that a skim might miss.",
    explanation: [
      "Hybrid search combines two retrievers: keyword search (great for exact terms like 'SKU-4471' or a person's name) and vector search (great for meaning). Merge their results so you catch both.",
      "Re-ranking adds a second pass: retrieve a generous shortlist (say top-20) cheaply, then use a heavier 'cross-encoder' model to score each candidate against the query and reorder — the best chunk floats to the top.",
      "Chunk-size tuning is a real lever: smaller chunks give precise matches but may lack context; larger chunks give context but blur relevance. Test a few sizes against your eval set and pick the winner.",
      "Query rewriting helps vague questions: have an LLM expand 'how much?' into 'how much does the Pro plan cost per month?' before retrieving, so the search has real terms to match.",
      "Retrieve-more-then-shrink is a common recipe: pull top-20, re-rank, keep the top-4 for the prompt — you get quality without stuffing the context window.",
      "Add these one at a time and re-measure. Each technique costs latency or money, so only keep the ones your evaluation set proves actually help.",
    ],
    math: "A hybrid score can blend the two rankings, e.g. score = alpha * vector_similarity + (1 - alpha) * keyword_score, where alpha (0 to 1) sets how much you trust meaning vs exact terms.",
    code: {
      language: "python",
      source: `# Retrieve a wide shortlist, then re-rank it with a cross-encoder
from sentence_transformers import CrossEncoder

reranker = CrossEncoder("cross-encoder/ms-marco-MiniLM-L-6-v2")

query = "How much does the Pro plan cost?"
shortlist = [                          # cheap first-pass candidates
    "The Pro plan costs 15 dollars per month.",
    "Refunds are accepted within 30 days.",
    "Upgrading to Pro unlocks priority support.",
]

pairs = [[query, c] for c in shortlist]
scores = reranker.predict(pairs)       # heavier, more accurate scoring
ranked = sorted(zip(scores, shortlist), reverse=True)
for score, text in ranked:
    print(round(float(score), 2), text)`,
      explanation:
        "The cross-encoder reads the query and each candidate together and scores true relevance, floating the exact pricing chunk to the top even if first-pass search ranked it lower.",
    },
    exercise: {
      prompt: "Add a candidate about a free trial to the shortlist and re-rank against a query asking about the trial.",
      starter: `query = "Is there a free trial?"
shortlist = [
    "The Pro plan costs 15 dollars per month.",
    "Refunds are accepted within 30 days.",
    "...",  # TODO: add a free-trial candidate
]
pairs = [[query, c] for c in shortlist]
scores = reranker.predict(pairs)
print(sorted(zip(scores, shortlist), reverse=True)[0])`,
      solution: `query = "Is there a free trial?"
shortlist = [
    "The Pro plan costs 15 dollars per month.",
    "Refunds are accepted within 30 days.",
    "There is a 14 day free trial with no credit card required.",
]
pairs = [[query, c] for c in shortlist]
scores = reranker.predict(pairs)
print(sorted(zip(scores, shortlist), reverse=True)[0])`,
    },
    quiz: [
      {
        question: "What problem does hybrid search solve that pure vector search struggles with?",
        options: [
          "It makes embeddings smaller",
          "It catches exact terms like codes, names, and acronyms that meaning-based search can miss",
          "It removes the need for a vector database",
          "It trains the model",
        ],
        answerIndex: 1,
        explanation:
          "Keyword search excels at exact-term matches; combining it with vector search covers both exact and meaning-based needs.",
      },
      {
        question: "How does re-ranking improve retrieval?",
        options: [
          "It retrieves fewer chunks the first time",
          "It uses a heavier model to re-score a shortlist so the truly-best chunk rises to the top",
          "It deletes the vector database",
          "It shortens the answer",
        ],
        answerIndex: 1,
        explanation:
          "Re-ranking takes a cheap first-pass shortlist and reorders it with a more accurate cross-encoder, surfacing the best chunk.",
      },
      {
        question: "What is the chunk-size tradeoff?",
        options: [
          "Bigger is always better",
          "Smaller chunks are precise but lack context; larger chunks have context but blur relevance",
          "Chunk size never matters",
          "Smaller chunks are always more accurate",
        ],
        answerIndex: 1,
        explanation:
          "Chunk size is a lever with two failure modes, so you tune it against an evaluation set rather than guessing.",
      },
    ],
    flashcards: [
      { front: "Hybrid search", back: "Combining keyword search (exact terms) with vector search (meaning) for better recall." },
      { front: "Re-ranking", back: "A second pass with a heavier model that re-scores a retrieved shortlist to surface the best chunk." },
      { front: "Cross-encoder", back: "A model that reads query and candidate together to score true relevance, used for re-ranking." },
      { front: "Query rewriting", back: "Expanding a vague query into a fuller one before retrieval so search has real terms to match." },
    ],
    miniProject: {
      title: "Re-rank and Measure",
      brief: "Prove that re-ranking actually helps on your data.",
      steps: [
        "Take your eval set and record recall@3 with plain vector search.",
        "Retrieve top-10, then re-rank with a cross-encoder, keeping top-3.",
        "Recompute recall@3 and compare the two numbers.",
        "Note the latency cost and decide whether the quality gain is worth it.",
      ],
    },
    industryUse: [
      "Cohere and other providers offer dedicated re-rank APIs used in production RAG",
      "Elasticsearch and OpenSearch power hybrid keyword-plus-vector search at large enterprises",
      "Search teams at companies like Airbnb tune chunking and re-ranking to lift answer quality",
    ],
    commonMistakes: [
      "Piling on every advanced technique at once so you cannot tell which one actually helped — add and measure one at a time.",
      "Ignoring the latency and cost each extra step adds, then shipping a slow, expensive pipeline.",
    ],
    interviewQuestions: [
      "When and why would you add a re-ranking step to a RAG system?",
      "Explain hybrid search and when it beats pure vector search.",
    ],
    papers: [
      { title: "ColBERT: Efficient and Effective Passage Search via Contextualized Late Interaction (Khattab & Zaharia)", url: "https://arxiv.org/abs/2004.12832", year: 2020 },
    ],
    nextUp: ["rag-capstone", "rag-eval"],
    cheatsheet: [
      "Hybrid = keyword + vector (catch exact terms)",
      "Re-rank: retrieve top-20 -> cross-encoder -> keep top-4",
      "Tune chunk size against your eval set",
      "Rewrite vague queries before retrieving",
      "Add ONE technique at a time and re-measure",
    ],
  },

  "rag-capstone": {
    story:
      "This is the moment everything clicks into a real thing you can show people: an app where you drop in your own documents — your lecture notes, a company handbook, a stack of PDFs — and then just ask questions and get grounded, cited answers. It is the exact product behind ChatPDF, Notion AI, and a hundred startups, and by now you have built every piece of it. The capstone is not new theory; it is you assembling the loader, chunker, embedder, vector store, prompt, and LLM into one honest, working 'chat with your documents' tool — and then measuring it so you know it actually works.",
    problem:
      "You have learned every part of RAG in isolation. The final test is integration: can you take a folder of real documents and turn it into a trustworthy question-answering assistant, end to end, with grounding and a way to check quality? That is the skill companies actually hire for.",
    analogy:
      "It is like a cooking final: you have practised chopping, seasoning, and plating separately — now you cook the whole meal and serve it.",
    explanation: [
      "Index your documents: load the files, chunk them (with overlap and metadata), embed each chunk, and store the vectors — your knowledge base is now searchable.",
      "Answer questions: embed the question, retrieve top-k (add re-ranking if you want quality), build a grounded prompt that demands citations, and call the LLM.",
      "Ground and cite every answer: carry each chunk's source through to the prompt so the model can point back to it, and instruct it to say 'I don't know' when the docs do not cover the question.",
      "Evaluate before you trust it: build a small set of real questions, measure recall@k for retrieval and spot-check faithfulness of answers.",
      "Wrap it in the simplest usable interface — a command-line loop or a tiny web page — so a non-technical person can drop in files and ask questions.",
      "Iterate with data, not vibes: when an answer is wrong, check the retrieved chunks first (retrieval bug) then the prompt (generation bug), and improve the weakest link.",
    ],
    code: {
      language: "python",
      source: `# Capstone skeleton: chat with your own documents
from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer("all-MiniLM-L6-v2")

# 1. INDEX your docs (each carries a source for citations)
docs = [
    {"text": "Parental leave is 16 weeks, fully paid.", "src": "handbook p.8"},
    {"text": "The Pro plan costs 15 dollars per month.", "src": "pricing p.1"},
    {"text": "Refunds are accepted within 30 days.",      "src": "policy p.3"},
]
index = model.encode([d["text"] for d in docs])

def cosine(a, b):
    return np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b))

# 2. ANSWER any question, grounded and cited
def chat(question, k=2):
    q = model.encode([question])[0]
    top = np.argsort([cosine(q, v) for v in index])[::-1][:k]
    ctx = "\\n".join("[" + docs[i]["src"] + "] " + docs[i]["text"] for i in top)
    return ("Answer only from the sources and cite [src]; "
            "else say I don't know.\\n" + ctx + "\\nQ: " + question)

print(chat("How much parental leave do I get?"))`,
      explanation:
        "This is the whole course in one file: index documents with their sources, retrieve top-k for a question, and assemble a grounded, citation-demanding prompt ready for any LLM.",
    },
    exercise: {
      prompt: "Add a document about vacation days (with a source), re-index, and ask the assistant about vacation.",
      starter: `docs = [
    {"text": "Parental leave is 16 weeks, fully paid.", "src": "handbook p.8"},
    {"text": "The Pro plan costs 15 dollars per month.", "src": "pricing p.1"},
    {"text": "Refunds are accepted within 30 days.",      "src": "policy p.3"},
    # TODO: add a vacation-days doc with a src
]
index = model.encode([d["text"] for d in docs])
print(chat("How many vacation days do I get?"))`,
      solution: `docs = [
    {"text": "Parental leave is 16 weeks, fully paid.", "src": "handbook p.8"},
    {"text": "The Pro plan costs 15 dollars per month.", "src": "pricing p.1"},
    {"text": "Refunds are accepted within 30 days.",      "src": "policy p.3"},
    {"text": "Employees get 20 vacation days per year.",   "src": "handbook p.10"},
]
index = model.encode([d["text"] for d in docs])
print(chat("How many vacation days do I get?"))`,
    },
    quiz: [
      {
        question: "In the capstone, why carry each chunk's source into the prompt?",
        options: [
          "To make the prompt longer",
          "So the model can cite where each answer came from, making it verifiable",
          "To speed up retrieval",
          "It is not necessary",
        ],
        answerIndex: 1,
        explanation:
          "Passing the source through lets the model attach citations, so answers can be checked against real documents.",
      },
      {
        question: "When your 'chat with docs' app gives a wrong answer, what should you check FIRST?",
        options: [
          "Rebuild the whole app",
          "The retrieved chunks — to see if retrieval or generation is at fault",
          "Buy a bigger model",
          "The internet connection",
        ],
        answerIndex: 1,
        explanation:
          "Inspecting the retrieved chunks tells you whether the wrong chunks were fetched (retrieval) or good chunks were misused (generation).",
      },
    ],
    flashcards: [
      { front: "Chat with your documents", back: "A RAG app that indexes your files and answers questions from them, with citations." },
      { front: "End-to-end RAG", back: "Loader + chunker + embedder + vector store + grounded prompt + LLM, wired into one flow." },
      { front: "Grounded + cited answer", back: "An answer whose every claim traces to a retrieved chunk and names its source." },
      { front: "Iterate with data", back: "Fixing the weakest link by inspecting retrieved chunks and evaluation scores, not guessing." },
    ],
    miniProject: {
      title: "Ship: Chat With Your Own PDFs",
      brief: "Build a working document assistant end to end.",
      steps: [
        "Collect 3 to 5 documents you care about (notes, a manual, some PDFs) as plain text.",
        "Index them: chunk with overlap and metadata, embed, and store the vectors.",
        "Build the query loop: retrieve top-k, assemble a grounded, citation-demanding prompt, call an LLM.",
        "Write 10 test questions, measure recall@3, and spot-check faithfulness of the answers.",
        "Wrap it in a simple command-line loop so anyone can ask questions.",
      ],
    },
    industryUse: [
      "ChatPDF and Humata let users upload documents and chat with them — this exact pipeline",
      "Notion AI and Glean answer questions grounded in a company's own workspace and files",
      "Support and onboarding assistants at countless startups are 'chat with your docs' apps in disguise",
    ],
    commonMistakes: [
      "Shipping on vibes without an evaluation set, so you never notice quality regressions.",
      "Dropping metadata during indexing, leaving the finished app unable to cite its sources.",
    ],
    interviewQuestions: [
      "Design a 'chat with your documents' system end to end and name each component.",
      "How would you make such an assistant trustworthy and verifiable in a regulated industry?",
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks (Lewis et al.)", url: "https://arxiv.org/abs/2005.11401", year: 2020 },
    ],
    nextUp: ["rag-eval", "rag-advanced"],
    cheatsheet: [
      "Index: load -> chunk (+meta) -> embed -> store",
      "Query: embed -> retrieve -> grounded prompt -> LLM",
      "Always carry source metadata for citations",
      "Evaluate: recall@k + faithfulness before trusting it",
      "Debug wrong answers: check retrieved chunks first",
    ],
  },
};
