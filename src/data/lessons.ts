import type { Lesson, LessonMeta, LessonBody } from "@/types";
import { courses } from "./courses";
import { foundations } from "./lessons/foundations";
import { dataStats } from "./lessons/data-stats";
import { coreModels } from "./lessons/core-models";
import { shipping } from "./lessons/shipping";
import { neural } from "./lessons/neural";
import { visionSequences } from "./lessons/vision-sequences";
import { genai } from "./lessons/genai";
import { dataSciencePython } from "./lessons/data-science-python";
import { statistics } from "./lessons/statistics";
import { pythonProgramming } from "./lessons/python-programming";
import { javascript } from "./lessons/javascript";
import { react } from "./lessons/react";
import { nodejs } from "./lessons/nodejs";
import { cpp } from "./lessons/cpp";
import { fullstack } from "./lessons/fullstack";
import { java } from "./lessons/java";
import { django } from "./lessons/django";
import { springBoot } from "./lessons/spring-boot";
import { sql } from "./lessons/sql";
import { linearAlgebra } from "./lessons/linear-algebra";
import { excel } from "./lessons/excel";
import { powerBi } from "./lessons/power-bi";
import { tableau } from "./lessons/tableau";
import { genaiLlm } from "./lessons/genai-llm";
import { git } from "./lessons/git";
import { computerGraphics } from "./lessons/computer-graphics";
import { claude } from "./lessons/claude";
import { rag } from "./lessons/rag";

/**
 * Hand-authored, full lessons. Not every lesson in the outline is written to
 * this depth yet â€” `getLesson` falls back to a structured template so every
 * route renders real, useful scaffolding instead of a 404. Authoring a new
 * lesson = add an entry here; nothing else changes.
 */
/** The three flagship, hand-authored lessons. The rest live in ./lessons/*. */
const core: Record<string, LessonBody> = {
  "what-is-ml": {
    story:
      "Imagine you run a tiny bakery. Every morning you guess how many loaves to bake. Bake too few and customers leave angry; too many and they go stale. After years, your gut 'just knows' â€” rainy Mondays are slow, sunny weekends are chaos. Machine Learning is teaching a computer to build that same gut feeling from data, instead of you writing down every rule by hand.",
    problem:
      "Traditional programming means writing explicit rules: `if raining and monday: bake 20`. But real life has thousands of subtle patterns no human can enumerate. How do we handle problems too messy for hand-written rules?",
    analogy:
      "Normal code is a recipe you write. Machine Learning is a student you train: you show it examples, it figures out the recipe itself.",
    explanation: [
      "Machine Learning flips programming around. Instead of Rules + Data â†’ Answers, you give the machine Data + Answers â†’ Rules.",
      "You feed it examples (yesterday's weather + how many loaves sold), and it discovers the pattern connecting inputs to outputs.",
      "Once trained, it can predict tomorrow's demand from tomorrow's forecast â€” even for weather combinations it never saw exactly.",
      "There are three big families: Supervised (learn from labelled examples), Unsupervised (find hidden groups), and Reinforcement (learn by trial, reward, and error).",
    ],
    visualization: { type: "linear-regression" },
    math: "Prediction: Å· = f(x). Learning means finding the function f that makes Å· closest to the real answers y across all your examples.",
    code: {
      language: "python",
      source: `# Your first "model": predicting bakery demand
# (Just averages for now â€” real models find smarter patterns)
sales = [20, 22, 19, 40, 45, 21, 20]   # last 7 days
prediction = sum(sales) / len(sales)
print(f"Bake about {round(prediction)} loaves tomorrow")`,
      explanation:
        "This naive model just predicts the average. It's technically 'machine learning-ish' â€” it learned one number from data. Real models learn far richer functions, but the loop is the same: look at data, produce a prediction.",
    },
    exercise: {
      prompt: "Change the model to predict using only the last 3 days (recent trend matters more).",
      starter: `sales = [20, 22, 19, 40, 45, 21, 20]
# TODO: average only the last 3 days
prediction = ...
print(prediction)`,
      solution: `sales = [20, 22, 19, 40, 45, 21, 20]
prediction = sum(sales[-3:]) / 3
print(prediction)`,
    },
    quiz: [
      {
        question: "What's the key difference between traditional programming and ML?",
        options: [
          "ML uses a faster computer",
          "ML learns rules from data instead of you writing them",
          "ML never makes mistakes",
          "ML only works on images",
        ],
        answerIndex: 1,
        explanation:
          "Traditional code = you write the rules. ML = the machine infers the rules from examples.",
      },
      {
        question: "Learning from labelled examples (input â†’ correct answer) is calledâ€¦",
        options: ["Unsupervised learning", "Reinforcement learning", "Supervised learning", "Deep learning"],
        answerIndex: 2,
        explanation: "Labelled data (you know the right answers) is supervised learning.",
      },
    ],
    flashcards: [
      { front: "Supervised learning", back: "Learning from labelled examples where the correct answer is known." },
      { front: "Unsupervised learning", back: "Finding structure/groups in data with no labels." },
      { front: "Reinforcement learning", back: "Learning by taking actions and receiving rewards or penalties." },
    ],
    miniProject: {
      title: "Weekend Weather Mood Predictor",
      brief: "Collect a week of your own mood (1â€“10) and the weather, then predict your weekend mood.",
      steps: [
        "Log mood + weather for 7 days in a Python list of dicts.",
        "Compute average mood for sunny vs rainy days.",
        "Predict this weekend from the forecast.",
        "Reflect: what would make this a 'real' ML model?",
      ],
    },
    industryUse: [
      "Netflix predicting what you'll watch next",
      "Banks flagging fraudulent transactions in real time",
      "Hospitals triaging X-rays to spot urgent cases first",
    ],
    commonMistakes: [
      "Thinking ML is magic â€” it's just pattern-finding, and garbage data gives garbage predictions.",
      "Judging a model on data it already saw (that's cheating â€” see the train/test lesson).",
    ],
    interviewQuestions: [
      "Explain the difference between supervised and unsupervised learning with an example.",
      "When would you NOT use machine learning for a problem?",
    ],
    papers: [
      { title: "A Few Useful Things to Know About Machine Learning (Domingos)", url: "https://homes.cs.washington.edu/~pedrod/papers/cacm12.pdf", year: 2012 },
    ],
    nextUp: ["python-variables", "train-test-split"],
    cheatsheet: [
      "Rules + Data â†’ Answers = normal code",
      "Data + Answers â†’ Rules = machine learning",
      "3 families: Supervised Â· Unsupervised Â· Reinforcement",
      "More/cleaner data usually beats a fancier algorithm",
    ],
  },

  "linear-regression": {
    story:
      "A friend asks: 'I'm about to add a 3rd bedroom â€” how much will my house be worth?' You don't guess randomly. You picture houses you know: bigger ones cost more, roughly along a straight line. You're mentally fitting a line through points. That line is linear regression.",
    problem:
      "Given past data (house size â†’ price), can we draw the single 'best' straight line so we can predict the price of a house we've never seen?",
    analogy:
      "It's like laying a taut piece of string through a scatter of dots so the string sits as close as possible to all of them at once.",
    explanation: [
      "We model price as: price = w Â· size + b. `w` is the slope (â‚¹ per extra sq-ft), `b` is the base price.",
      "'Best' line = the one where the total squared vertical distance from points to the line is smallest. That total is the loss (Mean Squared Error).",
      "We start with a random line, measure the loss, then nudge w and b to shrink it â€” that nudging is gradient descent (next lesson).",
      "Linear regression is the 'hello world' of ML: simple, interpretable, and shockingly effective as a baseline.",
    ],
    visualization: { type: "linear-regression" },
    math: "Loss (MSE) = (1/n) Î£ (yáµ¢ âˆ’ (wÂ·xáµ¢ + b))Â². We pick w, b to minimize this.",
    code: {
      language: "python",
      source: `import numpy as np
from sklearn.linear_model import LinearRegression

# size in sq-ft -> price in lakhs
X = np.array([[500],[750],[1000],[1250],[1500]])
y = np.array([25, 38, 50, 61, 74])

model = LinearRegression().fit(X, y)
print("Price per sq-ft:", round(model.coef_[0], 3))
print("1100 sq-ft ->", round(model.predict([[1100]])[0], 1), "lakhs")`,
      explanation:
        "scikit-learn finds the best w (coef_) and b (intercept_) for you. `.fit` learns from data; `.predict` uses the learned line on new inputs.",
    },
    exercise: {
      prompt: "Predict the price of a 2000 sq-ft house using the trained model.",
      starter: `# model is already trained above
price = ...  # TODO
print(price)`,
      solution: `price = model.predict([[2000]])[0]
print(round(price, 1))`,
    },
    quiz: [
      {
        question: "In price = wÂ·size + b, what does w represent?",
        options: ["The base price", "The price change per extra sq-ft", "The error", "The number of houses"],
        answerIndex: 1,
        explanation: "w is the slope â€” how much price moves for each unit of size.",
      },
      {
        question: "Why do we square the errors in MSE instead of just adding them?",
        options: [
          "Squaring is faster",
          "So positive and negative errors don't cancel, and big errors are punished more",
          "It's a legal requirement",
          "To make numbers smaller",
        ],
        answerIndex: 1,
        explanation:
          "Squaring removes signs (no cancelling) and penalises large mistakes heavily, pushing the line to fit outliers-aware.",
      },
    ],
    flashcards: [
      { front: "Linear regression", back: "Fitting the best straight line (y = wx + b) to predict a continuous value." },
      { front: "MSE", back: "Mean Squared Error â€” average of squared gaps between predictions and truth." },
      { front: "Coefficient (w)", back: "The slope: how much output changes per unit of input." },
    ],
    miniProject: {
      title: "Predict Your City's Coffee Price",
      brief: "Fit a line from cafe size â†’ coffee price using data you collect.",
      steps: [
        "Note price + a feature (seats, or distance from centre) for 8 cafes.",
        "Fit LinearRegression.",
        "Predict a new cafe and check the residuals.",
        "Plot the line over the points with matplotlib.",
      ],
    },
    industryUse: [
      "Zillow/Housing.com estimating property values",
      "Retail forecasting weekly demand from price + promotions",
      "Finance modelling risk factors as linear drivers",
    ],
    commonMistakes: [
      "Assuming a straight line fits everything â€” many relationships curve (use polynomial/other models).",
      "Forgetting to scale features when combining size (1000s) with, say, bedrooms (single digits).",
    ],
    interviewQuestions: [
      "Derive the cost function for linear regression and explain why it's convex.",
      "What are the assumptions of linear regression?",
      "How does regularization (Ridge/Lasso) change linear regression?",
    ],
    papers: [
      { title: "Regression Shrinkage and Selection via the Lasso (Tibshirani)", url: "https://www.jstor.org/stable/2346178", year: 1996 },
    ],
    nextUp: ["gradient-descent", "classification"],
    cheatsheet: [
      "Model: y = wÂ·x + b",
      "Loss: Mean Squared Error",
      "Best line = smallest MSE",
      "sklearn: LinearRegression().fit(X, y).predict(Xnew)",
      "Great interpretable baseline â€” always try it first",
    ],
  },

  "what-is-a-neuron": {
    story:
      "You decide whether to go for a run. You weigh things: Is it raining? (heavily against) Did I sleep well? (for) Do I have time? (for). You mentally add up these weighted votes, and if the total crosses your personal 'meh, fine' threshold â€” you run. An artificial neuron does exactly this arithmetic.",
    problem:
      "How can we build the smallest possible unit that takes several inputs, forms an opinion, and passes it on â€” so we can stack millions of them into a brain-like network?",
    analogy:
      "A neuron is a tiny voting booth: each input gets a weight (how much its vote counts), the votes are summed, and a decision function decides whether to 'fire'.",
    explanation: [
      "A neuron takes inputs xâ‚â€¦xâ‚™, multiplies each by a weight wáµ¢ (importance), and adds them up with a bias b (a baseline nudge).",
      "That sum z = wÂ·x + b is squashed by an activation function (like sigmoid or ReLU) to introduce a decision/non-linearity.",
      "Learning = adjusting the weights so the neuron's output matches reality. Millions of these, wired in layers, become a neural network.",
      "One neuron is basically logistic regression. The magic is stacking them: layers of neurons can represent astonishingly complex patterns.",
    ],
    visualization: { type: "neuron" },
    math: "output = activation(Î£ wáµ¢xáµ¢ + b). With sigmoid: Ïƒ(z) = 1 / (1 + e^(âˆ’z)), squashing any number into (0, 1).",
    code: {
      language: "python",
      source: `import numpy as np

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# a neuron deciding "should I go for a run?"
inputs  = np.array([0.0, 0.9, 0.8])   # rain?, slept well?, have time?
weights = np.array([-2.0, 1.5, 1.0])  # rain counts strongly AGAINST
bias    = -0.5

z = np.dot(inputs, weights) + bias
print("Confidence to run:", round(float(sigmoid(z)), 3))`,
      explanation:
        "The dot product is the weighted vote. Sigmoid turns the raw score into a 0â€“1 'confidence'. Negative weight on rain means rain lowers the score.",
    },
    exercise: {
      prompt: "Make 'sleep' matter twice as much by changing its weight, and see how confidence shifts.",
      starter: `weights = np.array([-2.0, 1.5, 1.0])  # TODO: double the sleep weight
z = np.dot(inputs, weights) + bias
print(round(float(sigmoid(z)), 3))`,
      solution: `weights = np.array([-2.0, 3.0, 1.0])
z = np.dot(inputs, weights) + bias
print(round(float(sigmoid(z)), 3))`,
    },
    quiz: [
      {
        question: "What does the weight of an input control?",
        options: ["Its color", "How much that input influences the decision", "The learning rate", "The number of neurons"],
        answerIndex: 1,
        explanation: "Bigger absolute weight = stronger influence on the neuron's output.",
      },
      {
        question: "Why do we need an activation function?",
        options: [
          "To slow training down",
          "To add non-linearity so networks can learn complex patterns",
          "To use more memory",
          "It's optional decoration",
        ],
        answerIndex: 1,
        explanation:
          "Without non-linear activations, stacking layers collapses into a single linear function â€” no extra power.",
      },
    ],
    flashcards: [
      { front: "Weight", back: "How strongly an input influences a neuron's output." },
      { front: "Bias", back: "A learnable constant that shifts the neuron's threshold." },
      { front: "Activation function", back: "A non-linear squashing function (ReLU, sigmoid) applied to the weighted sum." },
    ],
    miniProject: {
      title: "Hand-Build a 2-Input Logic Neuron",
      brief: "Tune weights and bias by hand so a single neuron behaves like an AND gate.",
      steps: [
        "Write the sigmoid neuron function.",
        "Test all 4 input combos of (0/1, 0/1).",
        "Adjust weights + bias until it only fires for (1,1).",
        "Try to make an OR gate â€” what changed?",
      ],
    },
    industryUse: [
      "Every deep learning system (vision, speech, LLMs) is built from these units",
      "Credit scoring with a single-layer perceptron as a baseline",
      "Edge devices running tiny neural nets for keyword spotting",
    ],
    commonMistakes: [
      "Forgetting the bias â€” it lets the neuron shift its decision boundary off the origin.",
      "Using no activation (or only linear ones) and wondering why depth doesn't help.",
    ],
    interviewQuestions: [
      "Show that a single neuron with sigmoid is equivalent to logistic regression.",
      "Why can't a single-layer perceptron learn XOR?",
    ],
    papers: [
      { title: "The Perceptron (Rosenblatt)", url: "https://psycnet.apa.org/record/1959-09865-001", year: 1958 },
    ],
    nextUp: ["forward-pass", "backprop"],
    cheatsheet: [
      "z = Î£ wáµ¢xáµ¢ + b",
      "output = activation(z)",
      "1 neuron â‰ˆ logistic regression",
      "Non-linear activation is what makes depth powerful",
      "Learning = adjusting weights & bias",
    ],
  },
};

/**
 * Every authored lesson, merged from the modular batch files.
 * Adding a lesson body to any ./lessons/* file makes it live instantly.
 */
const authored: Record<string, LessonBody> = {
  ...core,
  ...foundations,
  ...dataStats,
  ...coreModels,
  ...shipping,
  ...neural,
  ...visionSequences,
  ...genai,
  ...cpp,
  ...dataSciencePython,
  ...statistics,
  ...react,
  ...nodejs,
  ...pythonProgramming,
  ...javascript,
  ...fullstack,
  ...java,
  ...django,
  ...springBoot,
  ...sql,
  ...linearAlgebra,
  ...excel,
  ...powerBi,
  ...tableau,
  ...genaiLlm,
  ...git,
  ...computerGraphics,
  ...claude,
  ...rag,
};

/** Build a structured fallback so unlisted lessons still render usefully. */
function buildFallback(meta: LessonMeta, courseId: string, moduleId: string): Lesson {
  return {
    ...meta,
    courseId,
    moduleId,
    story: `Every big idea in ML started as someone's very real, very human problem. "${meta.title}" is no exception â€” and we'll meet it through a story before a single formula.`,
    problem: `We'll frame exactly which problem "${meta.title}" solves, and why earlier tools fell short.`,
    analogy: "We reach for an everyday analogy first, so the concept clicks before the notation does.",
    explanation: [
      "Visual intuition first â€” a picture you can hold in your head.",
      "Then the plain-English 'why it works'.",
      "Then the maths, introduced only once the intuition is solid.",
      "Finally the professional view: when to use it, when not to, and how it's used in industry.",
    ],
    math: "The precise formulation is introduced step by step, each symbol tied back to the story.",
    code: {
      language: "python",
      source: `# Runnable example for "${meta.title}"\nprint("This lesson's interactive code runs in the playground â†’")`,
      explanation: "Every concept lesson pairs with runnable code you can edit and execute in the browser.",
    },
    quiz: [
      {
        question: `Which statement best captures the goal of "${meta.title}"?`,
        options: [
          "It's purely theoretical with no real use",
          "It solves a concrete, real-world problem you'll practise here",
          "It only works on toy data",
          "It has been replaced and is never used",
        ],
        answerIndex: 1,
        explanation: "Every topic here is tied to real, practical use and a hands-on project.",
      },
    ],
    flashcards: [
      { front: meta.title, back: "Full flashcards are authored per lesson â€” this one is on the roadmap." },
    ],
    industryUse: ["Applied across real production ML systems â€” full case studies coming per lesson."],
    commonMistakes: ["Rushing to code before building visual intuition â€” this platform deliberately slows that down."],
    interviewQuestions: [`Explain "${meta.title}" to a non-technical interviewer in 60 seconds.`],
    papers: [],
    nextUp: [],
    cheatsheet: [`${meta.title}: story â†’ picture â†’ maths â†’ code â†’ project.`],
  };
}

export function getLesson(courseId: string, lessonId: string): Lesson | null {
  const course = courses.find((c) => c.id === courseId);
  if (!course) return null;
  for (const mod of course.modules) {
    const meta = mod.lessons.find((l) => l.id === lessonId);
    if (meta) {
      const body = authored[lessonId];
      if (body) return { ...meta, courseId, moduleId: mod.id, ...body };
      return buildFallback(meta, courseId, mod.id);
    }
  }
  return null;
}

export function isAuthored(lessonId: string) {
  return lessonId in authored;
}
