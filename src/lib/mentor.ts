/**
 * The AI Mentor's client + offline brain.
 *
 * `askMentor` calls the /api/mentor route, which uses the real Claude API when
 * ANTHROPIC_API_KEY is configured (see README → "Turn on the real AI Mentor").
 * With no key, or if the network fails, it falls back to `localMentorReply` —
 * a keyword responder that gives real, helpful answers (not just deflections),
 * so the mentor is genuinely useful even with zero setup.
 */

export interface MentorMessage {
  role: "user" | "mentor";
  content: string;
}

/** Real, beginner-friendly answers for the most common questions. */
const KNOWLEDGE: { match: RegExp; reply: string }[] = [
  {
    match: /overfit/i,
    reply:
      "Overfitting is when your model *memorizes* the training data instead of *learning* from it — like a student who memorizes last year's exact exam answers but panics on new questions.\n\nThe tell-tale sign: it scores brilliantly on data it has seen, then flops on new data. Fixes: (1) give it more data, (2) use a simpler model, (3) use regularization to discourage it from over-trusting any one feature, and (4) always test on data it never saw during training.\n\nWant me to show what overfitting looks like on a graph?",
  },
  {
    match: /gradient descent|learning rate/i,
    reply:
      "Gradient descent is how a model *learns*. Imagine hiking down a foggy mountain to the lowest valley: you can't see far, so you feel which way is downhill and take a small step, over and over.\n\nThe 'downhill direction' is the gradient (which way reduces the error). The step size is the *learning rate*. Too big and you leap over the valley and bounce around; too small and it takes forever. Getting it 'just right' is most of the art.\n\nWant the tiny Python loop that does this?",
  },
  {
    match: /neuron|neural net|perceptron/i,
    reply:
      "A neuron is just a tiny decision-maker. It takes some inputs, decides how important each one is (those importances are called *weights*), adds them up, and fires a number out the other side.\n\nExample: deciding whether to go for a run. Inputs might be 'is it raining?', 'did I sleep well?', 'do I have time?'. Rain has a strong negative weight; good sleep has a positive one. Add up the weighted votes → out pops a 'yes/no'.\n\nStack millions of these together in layers and you get a neural network. Want to try tuning one?",
  },
  {
    match: /transformer|attention|gpt|llm|chatgpt/i,
    reply:
      "An LLM (like ChatGPT) is, at heart, a very fancy next-word predictor. Trained on mountains of text, it learned which words tend to follow which — but at a depth where it genuinely captures meaning, not just surface patterns.\n\nThe engine inside is the *Transformer*, and its superpower is *attention*: for each word, it decides which other words matter most for understanding it. In 'the trophy didn't fit in the suitcase because it was too big', attention is how the model figures out 'it' = the trophy.\n\nWant me to break attention down with a clearer example?",
  },
  {
    match: /pandas|dataframe/i,
    reply:
      "Pandas is a Python tool that turns a spreadsheet into something your code can slice and question instantly. Its main object is the *DataFrame* — think rows and columns, just like Excel.\n\nSay you have 5,000 rows of expenses. Instead of scrolling forever, you write `df[df['category'] == 'food']['amount'].sum()` and get your total food spend in one line. Load data, filter rows, compute totals, spot missing values — Pandas does it fast.\n\nIt's the tool ML engineers basically live in. Want a tiny runnable example?",
  },
  {
    match: /numpy|array/i,
    reply:
      "NumPy gives Python fast, math-friendly arrays. A normal Python list is flexible but slow for number-crunching; a NumPy array is built for speed and does math on whole rows at once.\n\nExample: with a list you'd loop to double every number. With NumPy you just write `arr * 2` and it doubles all of them instantly — cleaner and much faster. That 'operate on everything at once' idea (called vectorization) is why every ML library sits on top of NumPy.\n\nWant to see it next to a plain Python list?",
  },
  {
    match: /regression|predict.*(price|number|value)/i,
    reply:
      "Linear regression is the 'draw the best straight line through the dots' method. You have data (say house size vs price), and you find the single line that sits as close as possible to all the points. Then you use that line to predict prices for houses you haven't seen.\n\nThe model is just `price = w × size + b`: `w` is how much price rises per extra square foot, `b` is the base price. It's the 'hello world' of ML — simple, fast, and a great first thing to always try.\n\nWant to run one on real numbers?",
  },
  {
    match: /classification|classify|spam/i,
    reply:
      "Classification is teaching a model to sort things into buckets: spam vs not-spam, sick vs healthy, cat vs dog. Unlike regression (which predicts a *number*), classification predicts a *category*.\n\nUnder the hood the model outputs a probability — say 0.92 that an email is spam — and you pick a cutoff (usually 0.5) to make the final call. The classic starter algorithm is logistic regression.\n\nWant a tiny spam-classifier example in Python?",
  },
  {
    match: /where.*(start|begin)|new|beginner|first|how.*learn/i,
    reply:
      "Start at the very beginning — no shame in it, everyone does. Here's the path I'd take:\n\n1. **Python basics** (variables, loops, functions) — the 'Programming Foundations' module.\n2. **NumPy & Pandas** — how to handle data.\n3. **Your first model** — linear regression. You'll predict something real.\n4. **A tiny project** you care about, then deploy it.\n\nGo one lesson at a time, do the code exercises (don't just read), and let me know the moment anything feels fuzzy. Which of those sounds like the right starting point for you?",
  },
  {
    match: /overwhelm|hard|confus|lost|give up|too much|stuck|difficult/i,
    reply:
      "Totally normal — every single person who learns this felt exactly that at some point. The trick is to shrink the problem.\n\nYou don't need to understand 'machine learning'. Right now you just need to understand *one small idea*. Tell me the exact sentence or word that lost you, and we'll take just that piece apart together, slowly. No rush, no judgement. 🌱",
  },
  {
    match: /project|portfolio|resume|cv/i,
    reply:
      "Projects are how you *prove* skill — far more than certificates. Start tiny and personal: use data you actually care about (your spending, a sport you follow, local weather).\n\nA good first project has 5 parts: a clear question, a dataset, a simple model, an honest evaluation, and a short README explaining it. Then deploy it (Streamlit makes this a 10-minute job) so you have a live link for your resume.\n\nTell me a topic you're curious about and I'll help you shape it into a real project.",
  },
  {
    match: /interview|job|hire/i,
    reply:
      "Interviews mostly test whether you can *explain* clearly, not whether you can recite formulas. A great way to prep: practise explaining a concept out loud as if to a friend.\n\nTry it now — explain 'train/test split' to me like I'm your grandparent. I'll give you feedback and then ask the kind of follow-up a real interviewer would. Deal?",
  },
];

const FALLBACK =
  "Great question! Here's the short version, then tell me which part to go deeper on:\n\nMachine learning is teaching a computer to spot patterns from examples instead of you writing every rule by hand. You show it data, it finds the pattern, then it predicts on new data.\n\nWhat specifically would you like me to explain — a concept, some code, or how to get started? I'll keep it simple and concrete.";

/** Offline responder — gives a real, useful answer based on keywords. */
export function localMentorReply(question: string, _history: MentorMessage[] = []): string {
  const hit = KNOWLEDGE.find((k) => k.match.test(question));
  return hit ? hit.reply : FALLBACK;
}

/** Ask the mentor. Calls the API route; falls back to the offline brain. */
export async function askMentor(
  question: string,
  history: MentorMessage[] = []
): Promise<string> {
  try {
    const res = await fetch("/api/mentor", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question, messages: history }),
    });
    if (!res.ok) throw new Error(`Mentor route ${res.status}`);
    const data = (await res.json()) as { reply?: string };
    return data.reply?.trim() || localMentorReply(question, history);
  } catch {
    // Network/route failure — never leave the learner hanging.
    return localMentorReply(question, history);
  }
}
