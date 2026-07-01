/**
 * The AI Mentor's "brain".
 *
 * Right now this is a local, rule-based Socratic responder so the mentor works
 * with zero API keys or cost. To make it a real LLM tutor, replace
 * `askMentor` with a fetch to `/api/mentor` (a route that calls the Claude API
 * with the Anthropic SDK). Keep the same signature and the UI won't change.
 *
 * Recommended model: claude-opus-4-8 (or claude-sonnet-5 for lower latency).
 * The mentor's system prompt should enforce: never give the final answer
 * outright — ask a guiding question, then reveal step by step.
 */

export interface MentorMessage {
  role: "user" | "mentor";
  content: string;
}

const KNOWLEDGE: { match: RegExp; reply: string }[] = [
  {
    match: /overfit/i,
    reply:
      "Great question. Before I answer — what do you think happens when a student *memorises* past exam papers instead of understanding them? 🤔\n\nThat's overfitting: the model nails the training data but flops on new data. The fix is usually: more data, simpler models, regularization, or cross-validation. Want me to show it with a picture or with code?",
  },
  {
    match: /gradient descent|learning rate/i,
    reply:
      "Picture hiking down a foggy mountain, taking small steps in the steepest downhill direction — that's gradient descent. The *learning rate* is your step size.\n\nQuick check: what do you think happens if the steps are HUGE? (Hint: you might leap over the valley.) Tell me your guess and I'll confirm.",
  },
  {
    match: /neuron|neural net|perceptron/i,
    reply:
      "A neuron is just a weighted vote + a decision. inputs × weights, summed, then squashed by an activation.\n\nLet me flip it to you: if 'rain' should strongly *discourage* going for a run, should its weight be positive or negative? Answer that and you already understand weights. 🙂",
  },
  {
    match: /transformer|attention/i,
    reply:
      "Attention lets each word 'look at' the other words that matter to it — like re-reading a sentence and focusing on the pronoun's antecedent.\n\nWhat sentence confuses you if you *don't* look back at earlier words? Think of one, and you'll feel why attention exists.",
  },
  {
    match: /overwhelm|hard|confus|lost|give up|too much/i,
    reply:
      "Totally normal — everyone feels this. We learn one small idea at a time here, with a story first. 🌱\n\nTell me the exact sentence or concept that lost you, and we'll break just that piece down together. No rush.",
  },
  {
    match: /project|portfolio|resume/i,
    reply:
      "Projects are how you *prove* skill. Start tiny: pick a dataset you personally care about (your spending, a game you play, local weather).\n\nWhat's a topic you're genuinely curious about? I'll help shape it into a portfolio-ready project with a README and a live demo.",
  },
  {
    match: /interview|job/i,
    reply:
      "Interviews test whether you can *explain*, not just code. Try this: explain 'train/test split' to me like I'm your grandparent.\n\nGo ahead — I'll give you feedback and then hit you with a follow-up question a real interviewer would ask.",
  },
];

const FALLBACKS = [
  "Good question! Let's reason it out together. What's your current guess — even a rough one? I'll build on it. 🧠",
  "I could just tell you… but you'll remember it far better if we get there together. What part do you already understand, and where does it get fuzzy?",
  "Let's slow down and picture it first. Can you describe the problem in your own everyday words? Then we'll add the technical layer.",
];

export async function askMentor(
  question: string,
  history: MentorMessage[] = []
): Promise<string> {
  // Simulate think time for a natural feel.
  await new Promise((r) => setTimeout(r, 450));
  const hit = KNOWLEDGE.find((k) => k.match.test(question));
  if (hit) return hit.reply;
  // Deterministic fallback (no Math.random for SSR/replay safety).
  const idx = (question.length + history.length) % FALLBACKS.length;
  return FALLBACKS[idx];
}
