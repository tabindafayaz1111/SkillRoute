import type { LessonBody } from "@/types";

export const genai: Record<string, LessonBody> = {
  attention: {
    story:
      "Read this sentence: \"The dog didn't cross the road because it was too tired.\" What does \"it\" mean? Obviously the dog — not the road. You knew instantly because your brain glanced back at the earlier words and locked onto the one that mattered. Attention is that glance, done by math. For every word it processes, the model asks \"which other words should I pay attention to right now?\" and pulls in their meaning. Change one word — \"it was too wide\" — and suddenly \"it\" means the road, and attention shifts accordingly.",
    problem:
      "Words don't have meaning on their own — they mean something because of the words around them. \"Bank\" near \"river\" is a shoreline; \"bank\" near \"money\" is a building. Older models read one word at a time and quickly forgot the earlier context, so they kept losing the thread in long sentences. We needed a way for every word to directly look at every other word and decide what's relevant.",
    analogy:
      "It's like reading a mystery novel with a highlighter: when you hit the word \"he,\" your eyes dart back and highlight the character it refers to. Attention gives every word its own highlighter.",
    explanation: [
      "For each word, attention produces a set of weights — one per other word — saying how much to focus on each. High weight = \"this word matters a lot for understanding me.\"",
      "Every word builds three things: a Query (what am I looking for?), a Key (what do I offer?), and a Value (the actual content). A word's Query is compared against every Key to decide who to listen to.",
      "The matching scores get turned into percentages (they add up to 100%), and the model blends the Values by those percentages. That blend becomes the word's new, context-aware meaning.",
      "\"Self-attention\" just means the words are all attending to each other within the same sentence, rather than to some outside source.",
      "\"Multi-head\" attention runs this several times in parallel, each head learning a different kind of relationship — one tracks grammar, another tracks who-did-what-to-whom.",
      "Use this intuition whenever context matters (translation, summarizing, answering questions). It's overkill for tiny fixed tasks like \"is this number even?\" where surrounding words are irrelevant.",
    ],
    math:
      "Attention(Q, K, V) = softmax(QKᵀ / √d) · V. Q, K, V are the Query, Key, and Value matrices; QKᵀ scores how well each query matches each key; dividing by √d (the size of each key) keeps the numbers stable; softmax turns scores into percentages that sum to 1; multiplying by V blends the values by those percentages.",
    code: {
      language: "python",
      source: `import numpy as np

def softmax(x):
    e = np.exp(x - x.max())
    return e / e.sum()

# 3 words, each a tiny 2-number "meaning" vector
words = ["dog", "road", "it"]
vecs  = np.array([[1.0, 0.0], [0.0, 1.0], [0.9, 0.1]])

# how much should "it" (last word) attend to each word?
query = vecs[2]
scores = vecs @ query          # dot product = similarity
weights = softmax(scores)

for w, p in zip(words, weights):
    print(w, round(float(p), 2))`,
      explanation:
        "The word \"it\" is compared to every word; softmax turns similarities into focus percentages. \"dog\" gets the highest weight because its vector points the same way as \"it\".",
    },
    exercise: {
      prompt:
        "Nudge the vector for \"it\" so it points toward \"road\" instead, and watch the attention shift.",
      starter: `query = vecs[2]  # TODO: make "it" look more like "road" ([0, 1])
scores = vecs @ query
weights = softmax(scores)
print(dict(zip(words, weights.round(2))))`,
      solution: `query = np.array([0.1, 0.9])  # now "it" leans toward "road"
scores = vecs @ query
weights = softmax(scores)
print(dict(zip(words, weights.round(2))))`,
    },
    quiz: [
      {
        question: "In one line, what does attention let a word do?",
        options: [
          "Look at every other word and decide which ones matter for its meaning",
          "Get translated into another language",
          "Store itself permanently in memory",
          "Run faster on a GPU",
        ],
        answerIndex: 0,
        explanation:
          "Attention computes, per word, how much focus to place on every other word — that's how context gets baked in.",
      },
      {
        question: "What is the role of softmax in attention?",
        options: [
          "It trains the model",
          "It turns raw match scores into focus percentages that add up to 100%",
          "It removes rare words",
          "It picks the final answer",
        ],
        answerIndex: 1,
        explanation:
          "Softmax normalizes the similarity scores into a clean probability distribution used to blend the Values.",
      },
      {
        question: "Why run several attention \"heads\" in parallel?",
        options: [
          "To use more electricity",
          "So each head can specialize in a different kind of relationship (grammar, meaning, etc.)",
          "To make the sentence shorter",
          "They are identical copies for backup",
        ],
        answerIndex: 1,
        explanation:
          "Multi-head attention lets the model track many types of relationships at once instead of forcing one blend to capture everything.",
      },
    ],
    flashcards: [
      { front: "Attention", back: "A mechanism where each word weighs how much to focus on every other word to build its meaning." },
      { front: "Query / Key / Value", back: "Query = what a word seeks; Key = what a word offers; Value = the content that gets blended in." },
      { front: "Self-attention", back: "Words in the same sequence attending to each other, rather than to an external source." },
      { front: "Multi-head attention", back: "Running attention several times in parallel so each head learns a different relationship." },
    ],
    miniProject: {
      title: "Highlight What a Pronoun Refers To",
      brief: "Use a small pretrained model to visualize attention and see which noun a pronoun latches onto.",
      steps: [
        "Install transformers and load a model with output_attentions=True.",
        "Feed in \"The trophy didn't fit in the suitcase because it was too big.\"",
        "Pull out the attention weights for the token \"it\".",
        "Print which word \"it\" attends to most — then swap \"big\" for \"small\" and rerun.",
      ],
    },
    industryUse: [
      "Google Translate uses attention to keep translations coherent across long sentences",
      "Grammarly relies on attention to catch pronoun and agreement errors in your writing",
      "Every chatbot (ChatGPT, Claude, Gemini) resolves context — like what \"it\" refers to — via attention",
    ],
    commonMistakes: [
      "Thinking attention \"reads left to right\" — self-attention sees every word at once, in both directions.",
      "Confusing attention weights with the final answer; they only decide focus, not the output word.",
    ],
    interviewQuestions: [
      "Walk me through how Query, Key, and Value produce an attention output.",
      "Why do we divide the scores by the square root of the key dimension?",
      "What advantage does multi-head attention give over a single attention computation?",
    ],
    papers: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", year: 2017 },
    ],
    nextUp: ["transformers", "llms"],
    cheatsheet: [
      "Attention = each word decides which other words to focus on",
      "Query asks, Key offers, Value is the content blended in",
      "softmax(QKᵀ / √d) · V",
      "Self-attention = words attend within the same sentence",
      "Multi-head = many relationships learned in parallel",
    ],
  },

  transformers: {
    story:
      "Before 2017, AI read text like a person spelling out a word letter by letter — one token at a time, holding a fragile memory of what came before, and forgetting the start of a long paragraph by the time it reached the end. The Transformer threw that out. It reads the whole sentence at once, lets every word talk to every other word through attention, and does it all in parallel. That one change is why we suddenly got ChatGPT, image generators, and protein-folding models. Almost every modern AI you've heard of is a Transformer under the hood.",
    problem:
      "The old workhorses (RNNs and LSTMs) processed text strictly in order, so they were slow to train and bad at connecting words that are far apart — the subject at the start of a sentence and the verb at the end. Training couldn't be spread across many chips because step 2 had to wait for step 1. We needed an architecture that sees long-range context and trains fast on modern hardware.",
    analogy:
      "An RNN is one person reading a document out loud, word by word. A Transformer is a whole room of people who each read the entire page instantly and then compare notes about which words relate to which.",
    explanation: [
      "A Transformer is an architecture built by stacking attention layers (from the previous lesson) with ordinary neural-network layers in between.",
      "It processes all words at the same time (in parallel), so training uses GPUs efficiently and finishes far faster than sequential RNNs.",
      "Because attention lets any word look directly at any other word, long-range context — \"the keys I left this morning… are on the table\" — is easy, no matter the distance.",
      "Since everything is seen at once, order isn't automatic. A \"positional encoding\" is added to each word so the model still knows word #1 from word #7.",
      "Two flavors exist: encoder-style (great at understanding text, like BERT for search) and decoder-style (great at generating text, like GPT). Many models use one or both.",
      "Use Transformers for language, code, images, audio, and more. Don't reach for one when a simple rule or small table would do — they're big, hungry, and expensive to run.",
    ],
    math:
      "The core repeated block is roughly: x → x + Attention(x), then h → h + FeedForward(h), with a normalization step around each. The \"+ x\" is a residual connection: it keeps the original input alongside the new information so deep stacks stay trainable.",
    code: {
      language: "python",
      source: `# Using a Transformer is a few lines thanks to Hugging Face.
from transformers import pipeline

# a decoder-style Transformer that continues text
generator = pipeline("text-generation", model="distilgpt2")

out = generator("The best thing about learning AI is",
                max_new_tokens=20)
print(out[0]["generated_text"])`,
      explanation:
        "The pipeline downloads a pretrained Transformer and generates a continuation; you never write the attention math yourself, you just call the trained model.",
    },
    exercise: {
      prompt:
        "Switch the task from generating text to understanding sentiment using a different pretrained Transformer.",
      starter: `from transformers import pipeline
# TODO: change the task to "sentiment-analysis"
clf = pipeline("text-generation")
print(clf("I absolutely loved this movie!"))`,
      solution: `from transformers import pipeline
clf = pipeline("sentiment-analysis")
print(clf("I absolutely loved this movie!"))`,
    },
    quiz: [
      {
        question: "What is the single biggest reason Transformers beat RNNs?",
        options: [
          "They use less memory",
          "They process all words in parallel and connect far-apart words easily",
          "They don't need any training data",
          "They only work on short sentences",
        ],
        answerIndex: 1,
        explanation:
          "Parallel processing (fast training) plus attention's direct long-range links are the core wins over sequential RNNs.",
      },
      {
        question: "Why do Transformers need positional encodings?",
        options: [
          "To compress the model",
          "Because seeing all words at once loses the sense of word order",
          "To translate languages",
          "To reduce the vocabulary",
        ],
        answerIndex: 1,
        explanation:
          "Attention has no built-in notion of sequence, so position info is added so the model knows which word came first.",
      },
    ],
    flashcards: [
      { front: "Transformer", back: "An architecture built from stacked attention layers that processes all words in parallel." },
      { front: "Positional encoding", back: "Extra info added to each word so the model knows word order despite seeing everything at once." },
      { front: "Encoder vs decoder", back: "Encoders are tuned for understanding text (BERT); decoders for generating it (GPT)." },
      { front: "Residual connection", back: "Adding a layer's input back to its output so very deep networks stay trainable." },
    ],
    industryUse: [
      "OpenAI's GPT and Anthropic's Claude are decoder-style Transformers powering chat assistants",
      "Google Search uses BERT, an encoder Transformer, to better understand what you're asking",
      "DeepMind's AlphaFold uses Transformer-style attention to predict protein shapes",
    ],
    commonMistakes: [
      "Assuming \"Transformer\" only means language models — the same architecture powers vision and audio too.",
      "Forgetting positional information and being surprised the model treats a sentence like a bag of shuffled words.",
    ],
    interviewQuestions: [
      "Contrast how an RNN and a Transformer handle a 500-word document.",
      "What problem do residual connections and layer normalization solve in deep Transformers?",
      "When would you pick an encoder model over a decoder model?",
    ],
    papers: [
      { title: "Attention Is All You Need", url: "https://arxiv.org/abs/1706.03762", year: 2017 },
      { title: "BERT: Pre-training of Deep Bidirectional Transformers", url: "https://arxiv.org/abs/1810.04805", year: 2018 },
    ],
    nextUp: ["llms", "attention"],
    cheatsheet: [
      "Transformer = attention layers stacked into an architecture",
      "Reads all words in parallel → fast training",
      "Direct long-range context via attention",
      "Positional encoding restores word order",
      "Encoder = understand, Decoder = generate",
    ],
  },

  llms: {
    story:
      "Type \"peanut butter and\" into your phone and it suggests \"jelly.\" A Large Language Model is that autocomplete, scaled up unimaginably. It was trained by reading a huge chunk of the internet and playing one game billions of times: cover the next word, guess it, check the answer, adjust. Do that at massive scale and something surprising happens — to predict the next word well, it has to learn grammar, facts, reasoning patterns, even a sense of tone. So when it writes an essay, it's really just predicting one word, then the next, then the next — but with a genuine grasp of the patterns behind them.",
    problem:
      "We wanted software that could write, answer questions, summarize, and code — without hand-coding a rule for every situation. Rules can't cover the infinite ways humans phrase things. The breakthrough was to stop writing rules and instead train one giant next-word predictor on enough text that the rules emerge on their own.",
    analogy:
      "An LLM is fancy autocomplete that read the whole library. Each word it writes is its best guess at \"what naturally comes next?\" — informed by everything it's ever read.",
    explanation: [
      "Text is chopped into \"tokens\" (roughly word-pieces). The model's only job is: given the tokens so far, output a probability for every possible next token.",
      "It picks a next token, appends it, and repeats — that loop is how a single prediction becomes a whole paragraph.",
      "\"Temperature\" is the creativity dial. Low temperature (near 0) = always pick the most likely token, safe and repetitive. High temperature = give unlikely tokens a real chance, more creative but riskier.",
      "It isn't looking anything up in a database. It has no live internet; it answers from patterns baked into its weights during training — which is why it can be confidently wrong (a \"hallucination\").",
      "It has a fixed \"context window\" — the maximum tokens it can consider at once. Go past it and the earliest text falls out of view.",
      "Use an LLM for open-ended language tasks. Don't use it as a source of exact facts, live data, or math you can't verify — pair it with tools or documents (see RAG) for that.",
    ],
    math:
      "The model estimates P(next token | all previous tokens). Temperature T reshapes those probabilities before sampling: probability ∝ exp(score / T). Small T sharpens toward the top choice; large T flattens the distribution so more options become likely.",
    code: {
      language: "python",
      source: `import numpy as np

# The model's raw scores ("logits") for 4 candidate next words
words  = ["jelly", "chocolate", "bananas", "pickles"]
logits = np.array([4.0, 2.0, 1.0, 0.5])

def next_word_probs(logits, temperature):
    z = logits / temperature
    e = np.exp(z - z.max())
    return e / e.sum()

for T in [0.2, 1.0]:
    p = next_word_probs(logits, T)
    print("T =", T, dict(zip(words, p.round(2))))`,
      explanation:
        "At low temperature the model almost always says \"jelly\"; at temperature 1 the other words get a real shot — that's the creativity dial in action.",
    },
    exercise: {
      prompt:
        "Crank the temperature up to 2.0 and see how much flatter (more random) the choices become.",
      starter: `for T in [0.2, 1.0]:  # TODO: add 2.0 to the list
    print(T, next_word_probs(logits, T).round(2))`,
      solution: `for T in [0.2, 1.0, 2.0]:
    print(T, next_word_probs(logits, T).round(2))`,
    },
    quiz: [
      {
        question: "At its core, what is an LLM doing when it writes text?",
        options: [
          "Searching a database of answers",
          "Predicting the next token over and over, one at a time",
          "Copying the closest sentence it memorized",
          "Running a fixed set of grammar rules",
        ],
        answerIndex: 1,
        explanation:
          "It's a next-token predictor; a whole response is just that prediction looped many times.",
      },
      {
        question: "What does raising the temperature do?",
        options: [
          "Makes the model faster",
          "Makes output more random and creative by giving unlikely tokens more chance",
          "Increases the context window",
          "Guarantees factual accuracy",
        ],
        answerIndex: 1,
        explanation:
          "Higher temperature flattens the probabilities, so less-likely tokens get chosen more often.",
      },
      {
        question: "Why can an LLM state a false fact so confidently (a \"hallucination\")?",
        options: [
          "It's looking at an outdated website",
          "It generates plausible-sounding text from patterns, not from a verified fact store",
          "It ran out of memory",
          "The temperature was set to zero",
        ],
        answerIndex: 1,
        explanation:
          "It predicts what sounds right, not what's true — there's no built-in fact-checker, so wrong answers can look just as fluent.",
      },
    ],
    flashcards: [
      { front: "LLM", back: "A giant next-token predictor trained on massive text, which learns language patterns and facts along the way." },
      { front: "Token", back: "A chunk of text (word or word-piece) that the model reads and predicts one at a time." },
      { front: "Temperature", back: "The creativity dial: low = safe and predictable, high = random and creative." },
      { front: "Hallucination", back: "A confident but false output, because the model predicts plausible text rather than checking facts." },
      { front: "Context window", back: "The maximum number of tokens the model can consider at once." },
    ],
    miniProject: {
      title: "Feel the Temperature Dial",
      brief: "Send the same prompt to an LLM at several temperatures and compare how the answers change.",
      steps: [
        "Pick an API or local model you can call from Python.",
        "Send the prompt \"Write a one-line slogan for a coffee shop\" at temperature 0, 0.7, and 1.3.",
        "Print all three responses side by side.",
        "Note how low temperature repeats itself while high temperature gets wilder — and sometimes worse.",
      ],
    },
    industryUse: [
      "GitHub Copilot autocompletes code by predicting the next tokens as you type",
      "Duolingo uses GPT-4 to generate practice conversations and explain mistakes",
      "Customer-support teams at banks and telecoms draft replies with LLMs before an agent reviews them",
    ],
    commonMistakes: [
      "Trusting an LLM's facts without checking — it predicts plausible text, not verified truth.",
      "Setting temperature to 0 and expecting creativity, or high and expecting reliability — match the dial to the task.",
      "Pasting more text than the context window holds and wondering why it ignored the beginning.",
    ],
    interviewQuestions: [
      "Explain, without jargon, what \"next-token prediction\" means and why it's powerful.",
      "How does temperature change the output, and when would you set it low vs high?",
      "Why do LLMs hallucinate, and what are two ways to reduce it?",
    ],
    papers: [
      { title: "Language Models are Few-Shot Learners (GPT-3)", url: "https://arxiv.org/abs/2005.14165", year: 2020 },
    ],
    nextUp: ["prompt-engineering", "rag"],
    cheatsheet: [
      "LLM = fancy autocomplete trained on tons of text",
      "It predicts the next token, then loops",
      "Temperature = creativity dial (low safe, high wild)",
      "No live lookup → it can hallucinate",
      "Context window = how much it can read at once",
    ],
  },

  "prompt-engineering": {
    story:
      "Ask a brilliant but overly literal new intern to \"handle the emails\" and you'll get chaos. Ask them to \"reply to the three unread client emails, keep it under four sentences, friendly tone, and flag anything about pricing for me\" — and they nail it. An LLM is exactly that intern. Prompt engineering is just learning to give clear, specific instructions. Same model, wildly different results, depending only on how you asked.",
    problem:
      "People type a vague one-liner, get a mediocre answer, and conclude the model is dumb. The model isn't dumb — it's guessing at what you meant. A little structure (be specific, show examples, assign a role, ask it to reason) closes the gap between what you wanted and what you got, without touching the model at all.",
    analogy:
      "It's like ordering coffee. \"A coffee\" gets you a random cup. \"A medium oat-milk latte, extra hot, one sugar\" gets you exactly what you wanted. Precision in, precision out.",
    explanation: [
      "Be specific: state the format, length, audience, and tone you want. \"Explain in 3 bullet points for a 10-year-old\" beats \"explain this.\"",
      "Give a role: starting with \"You are an experienced tax accountant\" nudges the model toward the right vocabulary and depth.",
      "Show examples (few-shot): paste one or two input→output pairs so the model copies the pattern instead of guessing it.",
      "Ask it to think step by step: for anything with reasoning or math, \"work through it step by step before giving the final answer\" noticeably improves accuracy.",
      "Give it an out: \"If you're not sure, say so\" reduces made-up answers.",
      "Use these when quality matters or the task is fuzzy. For a trivial ask (\"what's 2+2\"), skip the ceremony — over-prompting just wastes time.",
    ],
    code: {
      language: "python",
      source: `# A few-shot prompt: show the pattern, then ask.
prompt = (
    "Classify the sentiment as POSITIVE or NEGATIVE.\\n\\n"
    "Review: The battery lasts forever. -> POSITIVE\\n"
    "Review: It broke after one day. -> NEGATIVE\\n"
    "Review: Honestly the best purchase this year. ->"
)
print(prompt)
# Sending this to any LLM will very reliably return: POSITIVE`,
      explanation:
        "By showing two labeled examples first, the model locks onto the exact format and answers the new review consistently.",
    },
    exercise: {
      prompt:
        "Turn a vague prompt into a strong one by adding a role, a format, and a length limit.",
      starter: `bad_prompt = "Tell me about the Roman Empire."
# TODO: rewrite as a specific prompt with a role, format, and length
good_prompt = "..."
print(good_prompt)`,
      solution: `bad_prompt = "Tell me about the Roman Empire."
good_prompt = (
    "You are a history teacher for 12-year-olds. "
    "In exactly 5 bullet points, explain why the Roman Empire fell. "
    "Use simple words and no dates."
)
print(good_prompt)`,
    },
    quiz: [
      {
        question: "Which change most reliably improves an answer on a reasoning task?",
        options: [
          "Typing in all caps",
          "Asking the model to think step by step before answering",
          "Making the prompt as short as possible",
          "Raising the temperature to maximum",
        ],
        answerIndex: 1,
        explanation:
          "Step-by-step (chain-of-thought) prompting gives the model room to reason, which boosts accuracy on multi-step problems.",
      },
      {
        question: "What is \"few-shot\" prompting?",
        options: [
          "Sending the prompt only a few times",
          "Including a couple of example input→output pairs so the model copies the pattern",
          "Using a very small model",
          "Limiting the answer length",
        ],
        answerIndex: 1,
        explanation:
          "Few-shot means showing examples in the prompt so the model infers the exact format and behavior you want.",
      },
    ],
    flashcards: [
      { front: "Prompt engineering", back: "Crafting clear, specific instructions to get better output from the same model." },
      { front: "Few-shot prompting", back: "Giving example input→output pairs in the prompt so the model mimics the pattern." },
      { front: "Role prompting", back: "Telling the model who to be (\"You are a lawyer…\") to set vocabulary and depth." },
      { front: "Chain-of-thought", back: "Asking the model to reason step by step before answering, which improves accuracy." },
    ],
    miniProject: {
      title: "Before-and-After Prompt Makeover",
      brief: "Take five weak prompts and rewrite each with role, specificity, examples, or step-by-step reasoning; compare results.",
      steps: [
        "Write five lazy one-line prompts for tasks you actually care about.",
        "Rewrite each using at least two techniques from this lesson.",
        "Run both versions through an LLM.",
        "Score each pair 1–5 and note which technique helped most.",
      ],
    },
    industryUse: [
      "Support teams at Intercom and Zendesk ship prompt templates that keep AI replies on-brand",
      "Legal and consulting firms use role + few-shot prompts to draft first-pass documents",
      "Marketing teams at retailers prompt LLMs with examples to generate product descriptions at scale",
    ],
    commonMistakes: [
      "Being vague and blaming the model — add specifics on format, length, and audience.",
      "Piling on ten instructions in one run; break complex asks into clear, ordered steps.",
      "Forgetting to give examples for format-sensitive tasks, then fighting inconsistent output.",
    ],
    interviewQuestions: [
      "Give a concrete example of turning a weak prompt into a strong one and explain each change.",
      "When does few-shot prompting help, and when is zero-shot enough?",
      "Why does chain-of-thought prompting improve results on reasoning problems?",
    ],
    papers: [
      { title: "Chain-of-Thought Prompting Elicits Reasoning in LLMs", url: "https://arxiv.org/abs/2201.11903", year: 2022 },
    ],
    nextUp: ["rag", "capstone-dl"],
    cheatsheet: [
      "Be specific: format, length, audience, tone",
      "Give a role: \"You are a…\"",
      "Show examples (few-shot) for tricky formats",
      "\"Think step by step\" for reasoning tasks",
      "Let it say \"I don't know\" to cut hallucinations",
    ],
  },

  rag: {
    story:
      "Imagine a very smart friend who read millions of books years ago but has read nothing since — and never saw your company's private files. Ask about last week's policy update and they'll confidently guess, and probably be wrong. Now hand them the exact policy document right before they answer. Suddenly they're brilliant and accurate. That's Retrieval-Augmented Generation: before the LLM answers, you fetch the most relevant documents and paste them into the prompt. It turns a closed-book exam into an open-book one.",
    problem:
      "An LLM only knows what was in its training data — nothing about your files, nothing after its cutoff date, and it can't cite sources. Retraining it on your data is slow and eye-wateringly expensive. RAG sidesteps all that: keep the model frozen, and just feed it the right reference material at question time.",
    analogy:
      "Closed-book exam vs open-book exam. RAG lets the model flip to the exact page it needs before writing the answer, so it stops guessing.",
    explanation: [
      "Step 1 — embed: turn each document chunk into a list of numbers (an \"embedding\") that captures its meaning. Similar meanings land close together in this number-space.",
      "Step 2 — store: keep all those embeddings in a vector database (like Pinecone, Chroma, or FAISS) that can find nearest neighbors fast.",
      "Step 3 — retrieve: embed the user's question the same way, then grab the handful of chunks whose embeddings are closest — those are the most relevant passages.",
      "Step 4 — generate: paste those chunks into the prompt (\"Answer using only the context below…\") and let the LLM write the answer, grounded in real text.",
      "You can now cite sources, update knowledge by just swapping documents, and drastically cut hallucinations — no retraining needed.",
      "Use RAG when answers must come from specific, changing, or private data. Skip it for general chit-chat or creative writing, where fetching documents adds cost with no benefit.",
    ],
    math:
      "Relevance is usually cosine similarity: sim(a, b) = (a · b) / (‖a‖ ‖b‖). Here a and b are embedding vectors; the dot product over the product of their lengths gives a score from -1 to 1, and the highest-scoring chunks are retrieved.",
    code: {
      language: "python",
      source: `import numpy as np

# Pretend embeddings (real ones come from an embedding model)
docs = {
    "return policy": np.array([0.9, 0.1, 0.0]),
    "shipping info": np.array([0.1, 0.9, 0.0]),
    "warranty terms": np.array([0.8, 0.2, 0.1]),
}
question = np.array([0.85, 0.15, 0.0])  # "how do I return an item?"

def cosine(a, b):
    return a @ b / (np.linalg.norm(a) * np.linalg.norm(b))

ranked = sorted(docs, key=lambda k: cosine(question, docs[k]), reverse=True)
top = ranked[0]
print("Retrieved:", top)
print("Prompt -> Answer using this context:", top)`,
      explanation:
        "The question is compared to every document by cosine similarity; the closest chunk (\"return policy\") is retrieved and handed to the LLM as context.",
    },
    exercise: {
      prompt:
        "Retrieve the TOP TWO most relevant chunks instead of just one, so the model gets more context.",
      starter: `ranked = sorted(docs, key=lambda k: cosine(question, docs[k]), reverse=True)
top = ranked[0]  # TODO: grab the top 2
print(top)`,
      solution: `ranked = sorted(docs, key=lambda k: cosine(question, docs[k]), reverse=True)
top = ranked[:2]
print(top)`,
    },
    quiz: [
      {
        question: "What is the core idea of RAG?",
        options: [
          "Retrain the model on new data every night",
          "Retrieve relevant documents first, then answer using them",
          "Make the model bigger",
          "Turn the temperature to zero",
        ],
        answerIndex: 1,
        explanation:
          "RAG fetches the most relevant passages and feeds them to the LLM as context — an open-book approach.",
      },
      {
        question: "What is an embedding?",
        options: [
          "A password for the model",
          "A list of numbers representing a piece of text's meaning, so similar texts sit close together",
          "The final answer from the LLM",
          "A type of GPU",
        ],
        answerIndex: 1,
        explanation:
          "Embeddings map text to vectors where nearness equals similarity in meaning, which is what makes retrieval possible.",
      },
      {
        question: "Why use RAG instead of retraining the model on your documents?",
        options: [
          "Retraining is instant and free",
          "RAG is cheaper, updatable by swapping documents, and lets you cite sources",
          "RAG makes the model larger",
          "Retraining removes hallucinations completely",
        ],
        answerIndex: 1,
        explanation:
          "You keep the model frozen and just change the retrieved documents — far cheaper and more flexible than retraining.",
      },
    ],
    flashcards: [
      { front: "RAG", back: "Retrieval-Augmented Generation: fetch relevant documents first, then have the LLM answer using them." },
      { front: "Embedding", back: "A vector of numbers capturing a text's meaning; similar meanings are close together." },
      { front: "Vector database", back: "A store that finds the embeddings nearest to a query fast (Pinecone, Chroma, FAISS)." },
      { front: "Cosine similarity", back: "A score measuring how aligned two embedding vectors are, used to rank relevance." },
    ],
    miniProject: {
      title: "Ask-Your-PDF in 30 Lines",
      brief: "Build a tiny RAG loop that answers questions from a single PDF you provide.",
      steps: [
        "Split a PDF into small text chunks.",
        "Embed each chunk with an embedding model and store the vectors.",
        "Embed a user question and retrieve the top 3 closest chunks.",
        "Paste those chunks into a prompt and call an LLM for the grounded answer.",
        "Print the answer plus which chunks it came from.",
      ],
    },
    industryUse: [
      "Notion AI and Glean answer questions grounded in a company's own internal documents",
      "Customer-support bots at banks retrieve policy docs so replies match the fine print",
      "Legal and medical tools use RAG to cite the exact source passage behind every answer",
    ],
    commonMistakes: [
      "Chunking documents too big or too small — aim for coherent passages, not whole chapters or single lines.",
      "Retrieving with keyword matching instead of embeddings and missing semantically related passages.",
      "Forgetting to instruct the model to answer only from the retrieved context, letting it drift back to guessing.",
    ],
    interviewQuestions: [
      "Walk me through the four stages of a RAG pipeline.",
      "Why do we use embeddings and a vector database instead of a simple keyword search?",
      "How does RAG reduce hallucinations, and what limits remain?",
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401", year: 2020 },
    ],
    nextUp: ["capstone-dl", "prompt-engineering"],
    cheatsheet: [
      "RAG = open-book exam for LLMs",
      "Embed docs → store in a vector DB",
      "Embed question → retrieve nearest chunks",
      "Paste chunks into the prompt → generate",
      "Cheaper than retraining; enables citations",
    ],
  },

  "capstone-dl": {
    story:
      "You're going to build the thing everyone's asking for in 2026: a chatbot that answers questions about your own documents — a product manual, a set of company policies, your class notes, whatever. Upload the files, ask a question in plain English, and get an accurate answer with sources. Under the hood it's the RAG pipeline you just learned, wired end to end: ingest the documents, embed them, store the vectors, retrieve the relevant bits, feed them to an LLM, and wrap it in a simple chat screen. By the end you'll have a real, deployable app — and a killer portfolio piece.",
    problem:
      "A raw LLM can't answer questions about your specific documents and will hallucinate if you ask. Companies desperately want assistants grounded in their own data — support docs, contracts, wikis. This project turns everything from the last few lessons into one working, shippable system that solves that exact need.",
    analogy:
      "You're building a librarian who has memorized how to explain anything, but always walks to the right shelf, pulls the exact book, and reads from it before answering you.",
    explanation: [
      "Ingest: load your documents and split them into chunks of a few hundred words each — small enough to be specific, big enough to hold a complete thought.",
      "Embed: run every chunk through an embedding model to get vectors, then store them in a vector database (Chroma is free and local; Pinecone is hosted).",
      "Retrieve: when a question arrives, embed it and pull the top few most similar chunks from the database.",
      "Generate: build a prompt that says \"Answer using only this context,\" paste the chunks and the question, and call the LLM.",
      "Chat UI: wrap it in Streamlit so anyone can type a question and see the answer plus the source chunks — no terminal required.",
      "Deploy: push to Streamlit Community Cloud or Hugging Face Spaces so you have a public link to share. Keep your API key in secrets, never in the code.",
    ],
    code: {
      language: "python",
      source: `import streamlit as st
from langchain_community.vectorstores import Chroma
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain.chains import RetrievalQA

# 1-2. Load a prebuilt vector store of your embedded document chunks
db = Chroma(persist_directory="db", embedding_function=OpenAIEmbeddings())

# 3-4. Retrieve top chunks + let the LLM answer from them
qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0),
    retriever=db.as_retriever(search_kwargs={"k": 3}),
)

# 5. Minimal chat UI
st.title("Chat With Your Docs")
question = st.text_input("Ask a question about your documents:")
if question:
    st.write(qa.run(question))`,
      explanation:
        "This is the whole app in a nutshell: a vector store for retrieval, a RetrievalQA chain that grounds the answer, and a Streamlit box for chatting.",
    },
    exercise: {
      prompt:
        "Retrieve more context per question by raising k, and set the LLM to be strictly factual.",
      starter: `qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0.9),          # TODO: make it factual
    retriever=db.as_retriever(search_kwargs={"k": 3}),  # TODO: k = 5
)`,
      solution: `qa = RetrievalQA.from_chain_type(
    llm=ChatOpenAI(temperature=0),
    retriever=db.as_retriever(search_kwargs={"k": 5}),
)`,
    },
    quiz: [
      {
        question: "In the RAG chatbot, what happens the instant a user asks a question?",
        options: [
          "The model is retrained on the question",
          "The question is embedded and used to retrieve the most relevant document chunks",
          "The whole document set is pasted into the prompt",
          "The temperature is raised to be creative",
        ],
        answerIndex: 1,
        explanation:
          "The question becomes an embedding, the vector DB returns the closest chunks, and only those are handed to the LLM.",
      },
      {
        question: "Why set the chatbot's temperature to 0 for this project?",
        options: [
          "To make it faster",
          "To keep answers factual and grounded rather than creative",
          "To save money",
          "To increase the context window",
        ],
        answerIndex: 1,
        explanation:
          "Low temperature makes the model stick to the retrieved facts instead of inventing flourishes.",
      },
    ],
    flashcards: [
      { front: "Ingestion", back: "Loading documents and splitting them into retrievable chunks." },
      { front: "Vector store", back: "The database (e.g. Chroma) holding chunk embeddings for fast similarity search." },
      { front: "RetrievalQA", back: "A chain that retrieves relevant chunks and asks the LLM to answer using them." },
      { front: "Streamlit", back: "A Python library that turns a script into a shareable web app with a few lines." },
    ],
    miniProject: {
      title: "Build & Deploy a RAG Chatbot Over Your Own Docs",
      brief:
        "Ship a public web chatbot that answers questions about documents you provide, grounded in retrieved context and shown with its sources.",
      steps: [
        "Ingest: load 5–20 documents (PDFs, markdown, or text) and split them into ~300-word chunks.",
        "Embed & store: create embeddings for every chunk and save them in a Chroma vector database.",
        "Retrieve & generate: for each question, fetch the top 3–5 chunks and pass them to the LLM with an \"answer only from context\" instruction.",
        "Build the chat UI in Streamlit and display the answer plus the source chunks it used.",
        "Deploy to Streamlit Community Cloud (API key in secrets), then add this resume line: \"Built and deployed a Retrieval-Augmented Generation chatbot (Python, LangChain, Chroma, Streamlit) that answers questions over a private document set with cited sources.\"",
      ],
    },
    industryUse: [
      "Internal help desks at large enterprises answer HR and IT questions from company wikis",
      "SaaS products embed doc-chatbots so users get instant answers grounded in the product manual",
      "Law and finance firms deploy RAG assistants that cite the exact clause behind each answer",
    ],
    commonMistakes: [
      "Hardcoding the API key in the script instead of using secrets — never commit keys to Git.",
      "Skipping source display; showing the retrieved chunks builds trust and makes debugging easy.",
      "Chunking too coarsely, so retrieval returns huge irrelevant blocks and answers get vague.",
    ],
    interviewQuestions: [
      "Describe your RAG chatbot's data flow from raw document to final answer.",
      "How would you evaluate whether the chatbot's answers are actually grounded in the sources?",
      "What would you change to scale this from 20 documents to 20 million?",
    ],
    papers: [
      { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", url: "https://arxiv.org/abs/2005.11401", year: 2020 },
    ],
    nextUp: ["rag", "prompt-engineering"],
    cheatsheet: [
      "Ingest → Embed → Store → Retrieve → Generate → Chat",
      "Chroma (local) or Pinecone (hosted) for vectors",
      "Prompt: \"answer only from this context\"",
      "temperature=0 for grounded answers",
      "Deploy on Streamlit Cloud; keep keys in secrets",
      "Always show the source chunks",
    ],
  },
};
