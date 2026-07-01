import type { LessonBody } from "@/types";

export const coreModels: Record<string, LessonBody> = {
  "gradient-descent": {
    story:
      "You're standing on a foggy mountainside at dusk and you want to reach the valley. You can't see the bottom — the fog is too thick. So you do the only sensible thing: you feel the ground under your feet, notice which way slopes down most steeply, and take a small step that way. Then you stop, feel again, and step again. Repeat that a few hundred times and you arrive at the lowest point without ever seeing it. That patient, feel-and-step routine is gradient descent — and it's how almost every model in ML learns.",
    problem:
      "A model has knobs (its weights) and a score for how wrong it currently is (the loss). We want the knob settings that make the loss as small as possible. But there are millions of possible settings — we can't try them all. How do we find the good ones without seeing the whole landscape?",
    analogy:
      "It's like getting out of a valley in thick fog by always stepping in the steepest-downhill direction you can feel — many tiny steps, no map needed.",
    explanation: [
      "The loss is a landscape: high where the model is wrong, low where it's right. We want the lowest point.",
      "The gradient is the slope under your feet — it points uphill, toward more error. So we step in the OPPOSITE direction to go downhill.",
      "The learning rate is your step size. Too big and you leap right over the valley and bounce around (or fly off the mountain); too small and you crawl, taking forever to arrive.",
      "You repeat: measure slope, take a step, measure again — each pass is one 'iteration'. Loss should shrink a little each time.",
      "Use it when: your loss is a smooth function of the weights (linear/logistic regression, neural nets — basically everything). It's the workhorse under the hood.",
      "Watch out when: the landscape has many dips (local minima) or flat plains — the ball can get stuck. Good step sizes and smarter variants (momentum, Adam) help.",
    ],
    visualization: { type: "gradient-descent" },
    math: "Update rule: w ← w − α · (dL/dw). Here w is the weight you're tuning, L is the loss (how wrong you are), dL/dw is the slope of the loss at your current spot, and α (alpha) is the learning rate — how big a step you take downhill.",
    code: {
      language: "python",
      source: `# Find the x that minimizes f(x) = (x - 3)**2  (answer: x = 3)
# We only get to feel the slope, not see the whole curve.

def slope(x):
    return 2 * (x - 3)   # derivative of (x-3)**2

x = 0.0            # start somewhere random
lr = 0.1           # learning rate = step size

for step in range(30):
    x = x - lr * slope(x)   # step downhill

print("x landed at:", round(x, 3))   # -> very close to 3.0`,
      explanation:
        "Each loop nudges x against the slope by a small step. After ~30 steps x settles at 3, the bottom of the curve — that is gradient descent in eight lines.",
    },
    exercise: {
      prompt: "Bump the learning rate up to 1.1 and print x each step. Watch it overshoot and blow up — proof that too big a step size is dangerous.",
      starter: `def slope(x):
    return 2 * (x - 3)

x = 0.0
lr = 1.1   # too big!
for step in range(10):
    # TODO: update x and print it each step
    pass`,
      solution: `def slope(x):
    return 2 * (x - 3)

x = 0.0
lr = 1.1
for step in range(10):
    x = x - lr * slope(x)
    print(round(x, 2))   # values explode away from 3`,
    },
    quiz: [
      {
        question: "Why do we step in the OPPOSITE direction of the gradient?",
        options: [
          "The gradient points downhill, so we reverse it to go up",
          "The gradient points uphill (toward more error), so we reverse it to go down",
          "To make the code run faster",
          "It doesn't matter which direction we step",
        ],
        answerIndex: 1,
        explanation:
          "The gradient points toward increasing loss (uphill). We want less loss, so we move the opposite way — downhill.",
      },
      {
        question: "Your loss bounces around and never settles. What's the most likely fix?",
        options: [
          "Increase the learning rate",
          "Decrease the learning rate",
          "Add more data instantly fixes it",
          "Remove the loss function",
        ],
        answerIndex: 1,
        explanation:
          "Bouncing usually means steps are too big — you keep leaping over the valley. Shrink the learning rate so steps are gentler.",
      },
    ],
    flashcards: [
      { front: "Gradient descent", back: "Repeatedly stepping downhill on the loss landscape to find the weights with lowest error." },
      { front: "Gradient", back: "The slope of the loss — it points uphill (toward more error), so we move against it." },
      { front: "Learning rate (α)", back: "The step size. Too big overshoots; too small crawls." },
      { front: "Iteration", back: "One measure-slope-then-step cycle. Loss should drop a little each one." },
    ],
    miniProject: {
      title: "Watch the Ball Roll Downhill",
      brief: "Minimize a simple curve by hand-coding gradient descent and plotting the path it takes.",
      steps: [
        "Pick f(x) = (x - 5)**2 and write its slope function.",
        "Run gradient descent from x = 0, saving x at every step into a list.",
        "Plot the saved x values with matplotlib to see it settle at 5.",
        "Try learning rates 0.01, 0.1, and 1.2 — describe how each behaves.",
      ],
    },
    industryUse: [
      "OpenAI and Google training massive language models entirely with gradient descent variants (Adam)",
      "Tesla tuning self-driving vision networks by descending on a driving-error loss",
      "Banks fitting credit-risk models by minimizing prediction error step by step",
    ],
    commonMistakes: [
      "Setting the learning rate too high — the loss explodes to infinity. Fix: start small (like 0.01) and increase carefully.",
      "Forgetting to scale features, so one direction is a steep cliff and another is a gentle slope, making descent zig-zag. Fix: standardize your inputs first.",
    ],
    interviewQuestions: [
      "Explain gradient descent to someone non-technical, then write the weight update rule.",
      "What's the difference between batch, stochastic, and mini-batch gradient descent?",
      "How does the learning rate affect convergence, and how would you choose one?",
    ],
    papers: [
      { title: "Adam: A Method for Stochastic Optimization (Kingma & Ba)", url: "https://arxiv.org/abs/1412.6980", year: 2014 },
    ],
    nextUp: ["classification", "overfitting"],
    cheatsheet: [
      "Update: w ← w − α · slope",
      "Gradient points uphill → step the other way",
      "Learning rate too big = overshoot; too small = crawl",
      "Standardize features so descent doesn't zig-zag",
      "Adam is the go-to modern variant",
    ],
  },

  "classification": {
    story:
      "Your email inbox does something clever every day: it looks at a new message and decides 'spam' or 'not spam' — a yes/no bucket, not a number. A doctor reading a scan decides 'this looks like disease' or 'this looks healthy'. Neither is guessing a price or a temperature; they're sorting things into named boxes. That's classification: teaching a computer to answer 'which category?' instead of 'how much?'.",
    problem:
      "Regression predicts a number (a house price, tomorrow's temperature). But tons of real decisions aren't numbers — they're labels: spam or not, fraud or legit, cat or dog, will-buy or won't. How do we get a model to output a category we can act on?",
    analogy:
      "It's like a post-office sorter dropping each letter into the right city bin — the answer is a bucket, not a measurement.",
    explanation: [
      "Regression answers 'how much?' (a number). Classification answers 'which one?' (a category). Same idea of learning from examples, different kind of output.",
      "The simplest classifier, logistic regression, first computes a score, then squashes it into a probability between 0 and 1 (like 'this is 92% likely to be spam').",
      "You pick a threshold (usually 0.5): above it → one class, below it → the other. You can move the threshold to be stricter or more lenient.",
      "Two classes is 'binary' (spam/not); more than two is 'multiclass' (cat/dog/bird). The same tools extend to both.",
      "Use it when: the thing you're predicting is a label or a yes/no, not a continuous quantity.",
      "Don't judge it by accuracy alone: if 99% of emails are legit, a lazy 'always not-spam' model is 99% accurate but useless. Precision and recall tell the real story (see the metrics lesson).",
    ],
    math: "Logistic regression squashes a linear score into a probability with the sigmoid: p = 1 / (1 + e^(−z)), where z = w·x + b. Here x is your input features, w and b are learned weights, e is Euler's number, and p is the probability of the 'yes' class. Predict 'yes' when p ≥ 0.5.",
    code: {
      language: "python",
      source: `from sklearn.linear_model import LogisticRegression

# Tiny spam detector: [words_in_email, number_of_links] -> 1 = spam, 0 = not
X = [[10, 0], [50, 1], [200, 9], [8, 0], [180, 7], [15, 1]]
y = [0, 0, 1, 0, 1, 0]

model = LogisticRegression().fit(X, y)

new_email = [[190, 8]]   # long, link-heavy
print("Spam?", model.predict(new_email)[0])                 # -> 1
print("Probability spam:", round(model.predict_proba(new_email)[0][1], 2))`,
      explanation:
        ".fit learns which feature values lean toward spam; .predict gives the label and .predict_proba gives the confidence behind it.",
    },
    exercise: {
      prompt: "Use the trained model to classify a short, link-free email [[9, 0]] and print both the predicted label and its spam probability.",
      starter: `# model is already trained above
short_email = [[9, 0]]
# TODO: print the predicted label and the spam probability
`,
      solution: `short_email = [[9, 0]]
print(model.predict(short_email)[0])                      # -> 0 (not spam)
print(round(model.predict_proba(short_email)[0][1], 2))   # low probability`,
    },
    quiz: [
      {
        question: "Which task is classification, not regression?",
        options: [
          "Predicting tomorrow's temperature in degrees",
          "Predicting a house's sale price",
          "Predicting whether a transaction is fraud or legit",
          "Predicting how many loaves to bake",
        ],
        answerIndex: 2,
        explanation:
          "Fraud vs legit is a category (a label). The others predict continuous numbers, which is regression.",
      },
      {
        question: "Logistic regression outputs a probability. What turns that into a class label?",
        options: [
          "Rounding the input features",
          "Comparing the probability to a threshold (e.g. 0.5)",
          "Squaring the errors",
          "Taking the average of the data",
        ],
        answerIndex: 1,
        explanation:
          "It outputs a probability between 0 and 1; you apply a threshold (default 0.5) to decide the final class.",
      },
    ],
    flashcards: [
      { front: "Classification", back: "Predicting a category/label (spam, fraud, disease) rather than a number." },
      { front: "Logistic regression", back: "A classifier that squashes a linear score into a 0–1 probability with the sigmoid." },
      { front: "Sigmoid", back: "The S-curve that maps any number into a probability between 0 and 1." },
      { front: "Threshold", back: "The cutoff (often 0.5) that turns a probability into a yes/no decision." },
    ],
    miniProject: {
      title: "Pass or Fail Predictor",
      brief: "Predict whether a student passes an exam from hours studied and hours slept.",
      steps: [
        "Collect or make up 10 rows: [hours_studied, hours_slept] -> pass (1) or fail (0).",
        "Train a LogisticRegression on it.",
        "Predict a new student and print predict_proba to see the confidence.",
        "Move the threshold from 0.5 to 0.7 and note how the decisions change.",
      ],
    },
    industryUse: [
      "Gmail classifying every incoming email as spam or not spam",
      "Banks like PayPal flagging card transactions as fraud or legitimate in real time",
      "Hospitals screening scans as likely-tumor vs likely-clear to prioritize radiologists",
    ],
    commonMistakes: [
      "Trusting accuracy on imbalanced data — 99% 'not fraud' can look great yet catch zero fraud. Fix: check precision, recall, and a confusion matrix.",
      "Leaving the threshold at 0.5 by default when the costs are lopsided. Fix: tune the threshold to your real-world cost of false alarms vs misses.",
    ],
    interviewQuestions: [
      "What's the difference between classification and regression? Give an example of each.",
      "Why can't we use plain linear regression for a yes/no target, and what does the sigmoid fix?",
      "Explain precision vs recall and when you'd favor one over the other.",
    ],
    papers: [],
    nextUp: ["overfitting", "metrics"],
    cheatsheet: [
      "Classification = predict a label; regression = predict a number",
      "Logistic regression: sigmoid turns a score into a probability",
      "Threshold (default 0.5) turns probability into a decision",
      "sklearn: LogisticRegression().fit(X, y).predict(Xnew)",
      "Never trust accuracy alone on imbalanced data",
    ],
  },

  "overfitting": {
    story:
      "Two students study for the same exam. One truly learns the ideas; the other memorizes last year's answer key word for word. On the practice paper they both score 100%. But the real exam has new questions — and the memorizer crumbles while the learner sails through. A model that memorizes its training data instead of learning the pattern is overfitting: dazzling on data it has seen, useless on data it hasn't.",
    problem:
      "It's easy to build a model that gets the training data perfectly right — just let it memorize every quirk and noise point. But we don't care about data we already have answers for; we care about new, unseen data. How do we tell 'really learned it' apart from 'just memorized it'?",
    analogy:
      "It's the student who aces the practice papers by memorizing them, then bombs the real exam full of new questions.",
    explanation: [
      "The telltale sign: great score on the training set, much worse score on the test set. That gap is overfitting.",
      "The opposite failure is underfitting: the model is too simple and does poorly on BOTH — like a student who barely studied. You want the sweet spot in between.",
      "This is the bias–variance tradeoff. Too simple = high bias (misses the pattern). Too complex = high variance (chases the noise). The best model balances the two.",
      "Fix 1 — more data: harder to memorize a million examples than ten, so the model is forced to find the real pattern.",
      "Fix 2 — a simpler model: fewer knobs means less room to memorize noise (shallower tree, fewer features, lower-degree curve).",
      "Fix 3 — regularization: gently penalize complexity so the model prefers a smooth, general answer over a wiggly memorized one (Ridge/Lasso, dropout in neural nets).",
    ],
    visualization: { type: "bias-variance" },
    math: "Watch the gap: if train_error is tiny but test_error is large, you're overfitting. If both are large, you're underfitting. The goal is low test error, which means low train error AND a small train–test gap.",
    code: {
      language: "python",
      source: `import numpy as np
from sklearn.tree import DecisionTreeClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import make_classification

X, y = make_classification(n_samples=300, n_features=8, random_state=0)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=0)

# A deep tree memorizes; a shallow one generalizes.
deep = DecisionTreeClassifier(max_depth=None).fit(Xtr, ytr)
shallow = DecisionTreeClassifier(max_depth=3).fit(Xtr, ytr)

print("DEEP    train:", round(deep.score(Xtr, ytr), 2), " test:", round(deep.score(Xte, yte), 2))
print("SHALLOW train:", round(shallow.score(Xtr, ytr), 2), " test:", round(shallow.score(Xte, yte), 2))`,
      explanation:
        "The deep tree scores ~1.0 on train but drops on test (memorizing); the shallow tree scores lower on train yet holds up better on test — that smaller gap is the goal.",
    },
    exercise: {
      prompt: "Retrain the shallow tree with max_depth=1 (a 'stump'). Print its train and test scores — is it now underfitting (both low)?",
      starter: `# X, Xtr, Xte, ytr, yte already exist from above
from sklearn.tree import DecisionTreeClassifier
# TODO: train a tree with max_depth=1 and print train + test scores
`,
      solution: `from sklearn.tree import DecisionTreeClassifier
stump = DecisionTreeClassifier(max_depth=1).fit(Xtr, ytr)
print("train:", round(stump.score(Xtr, ytr), 2), " test:", round(stump.score(Xte, yte), 2))
# Both scores are low -> underfitting`,
    },
    quiz: [
      {
        question: "A model scores 99% on training data but 62% on test data. What's happening?",
        options: [
          "Underfitting",
          "Overfitting",
          "The model is perfect",
          "The data is too small to tell",
        ],
        answerIndex: 1,
        explanation:
          "A big gap — great on train, poor on test — is the classic signature of overfitting (memorizing, not learning).",
      },
      {
        question: "Which of these is NOT a standard way to reduce overfitting?",
        options: [
          "Collect more training data",
          "Use a simpler model",
          "Add regularization",
          "Train longer on the same tiny dataset until train error hits zero",
        ],
        answerIndex: 3,
        explanation:
          "Driving train error to zero on a tiny dataset makes overfitting worse. More data, simpler models, and regularization are the real fixes.",
      },
    ],
    flashcards: [
      { front: "Overfitting", back: "Memorizing training data (incl. noise) so the model does great on train but poorly on unseen data." },
      { front: "Underfitting", back: "Model too simple to catch the pattern — poor on both train and test." },
      { front: "Bias–variance tradeoff", back: "Balancing too-simple (high bias) against too-complex (high variance) for lowest test error." },
      { front: "Regularization", back: "Penalizing complexity so the model prefers a smooth, general answer over a memorized one." },
    ],
    miniProject: {
      title: "Find the Overfitting Cliff",
      brief: "Grow a tree deeper and deeper and watch exactly when it starts memorizing.",
      steps: [
        "Split any sklearn dataset into train and test.",
        "Loop max_depth from 1 to 20, recording train and test accuracy each time.",
        "Plot both curves on one chart.",
        "Mark the depth where test accuracy peaks then dips — that's where overfitting begins.",
      ],
    },
    industryUse: [
      "Netflix guarding recommender models against overfitting so they generalize to new viewing habits",
      "Banks validating credit-scoring models on held-out data to ensure they work on next year's applicants",
      "Kaggle competitors constantly balancing train vs validation scores to avoid overfitting the leaderboard",
    ],
    commonMistakes: [
      "Evaluating on the same data you trained on and celebrating a perfect score. Fix: always keep a separate test set.",
      "Reacting to a poor test score by making the model even more complex. Fix: first check WHICH problem you have — overfitting wants simpler/more-data, underfitting wants more capacity.",
    ],
    interviewQuestions: [
      "How would you detect overfitting, and name three ways to reduce it.",
      "Explain the bias–variance tradeoff with a concrete example.",
      "What does regularization do, and how do Ridge and Lasso differ?",
    ],
    papers: [
      { title: "Dropout: A Simple Way to Prevent Neural Networks from Overfitting (Srivastava et al.)", url: "https://jmlr.org/papers/v15/srivastava14a.html", year: 2014 },
    ],
    nextUp: ["trees-and-forests", "metrics"],
    cheatsheet: [
      "Overfit = great train, poor test (big gap)",
      "Underfit = poor train AND poor test",
      "Fixes: more data · simpler model · regularization",
      "Always score on a held-out test set",
      "Aim for low test error, not zero train error",
    ],
  },

  "trees-and-forests": {
    story:
      "Think about how you actually decide whether to bring an umbrella. 'Is it cloudy?' If yes, 'Is rain forecast?' If yes, 'grab the umbrella.' You just ran a little flowchart of yes/no questions ending in a decision. A decision tree is exactly that — a machine that learns the best questions to ask, in the best order, to reach an answer. And a random forest is what you get when you don't trust one flowchart: you ask hundreds of slightly different trees and let them vote.",
    problem:
      "Linear models draw straight lines, but many real decisions are a chain of conditions ('if income high AND debt low AND age over 25 → approve loan'). We want a model that learns these branching rules automatically, stays easy to read, and handles messy mixed data without much fuss.",
    analogy:
      "A decision tree is a game of 20 Questions that ends in an answer; a random forest is asking a whole crowd of experts and going with the majority vote.",
    explanation: [
      "A decision tree splits the data one question at a time: it picks the question that best separates the classes, then repeats on each branch until it reaches a confident answer (a 'leaf').",
      "Trees are wonderfully readable — you can literally trace the path of yes/no answers that led to a prediction. Great when you need to explain a decision.",
      "But a single deep tree overfits easily: it'll keep asking questions until it has memorized the training data.",
      "A random forest fixes this by growing many trees, each on a random slice of the data and a random subset of features, so every tree is a bit different.",
      "To predict, every tree votes and the forest takes the majority (classification) or the average (regression). The mistakes of individual trees cancel out — the crowd is wiser than any one member.",
      "Use them when: you have tabular data with mixed numeric/categorical features and want strong accuracy with little tuning. Forests are a fantastic default. Reach for a single tree when explainability matters most.",
    ],
    code: {
      language: "python",
      source: `from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

X, y = load_iris(return_X_y=True)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.3, random_state=0)

# 100 trees, each seeing a random slice of the data, then voting.
forest = RandomForestClassifier(n_estimators=100, random_state=0).fit(Xtr, ytr)

print("Test accuracy:", round(forest.score(Xte, yte), 2))
print("Most useful feature #:", forest.feature_importances_.argmax())`,
      explanation:
        "n_estimators=100 grows 100 voting trees; .score reports accuracy on unseen flowers, and feature_importances_ tells you which measurement mattered most.",
    },
    exercise: {
      prompt: "Print each feature's importance next to its position, so you can see how the forest ranked the four flower measurements.",
      starter: `# forest is already trained above
importances = forest.feature_importances_
# TODO: print each feature index with its importance rounded to 2 decimals
`,
      solution: `importances = forest.feature_importances_
for i, imp in enumerate(importances):
    print("feature", i, "->", round(imp, 2))`,
    },
    quiz: [
      {
        question: "What is a decision tree, in plain terms?",
        options: [
          "A straight line fitted through data points",
          "A flowchart of yes/no questions that ends in a prediction",
          "A way to average many numbers together",
          "A method for shrinking model weights",
        ],
        answerIndex: 1,
        explanation:
          "A decision tree learns a sequence of yes/no splits — a flowchart — that leads to an answer at each leaf.",
      },
      {
        question: "How does a random forest make a final prediction?",
        options: [
          "It uses only the single deepest tree",
          "It has many trees vote and takes the majority (or average)",
          "It draws one big straight line",
          "It memorizes the training data exactly",
        ],
        answerIndex: 1,
        explanation:
          "A forest aggregates many diverse trees by voting/averaging, so individual errors cancel out and accuracy improves.",
      },
    ],
    flashcards: [
      { front: "Decision tree", back: "A model that predicts by asking a learned sequence of yes/no questions (a flowchart)." },
      { front: "Leaf", back: "The end of a tree branch, where a final prediction is made." },
      { front: "Random forest", back: "Many diverse decision trees that vote/average for a stronger, less overfit prediction." },
      { front: "Feature importance", back: "How much each input contributed to the forest's decisions." },
    ],
    miniProject: {
      title: "Who Survived the Titanic?",
      brief: "Train a random forest to predict survival from passenger details, then see which features mattered.",
      steps: [
        "Load the Titanic dataset (seaborn.load_dataset('titanic')) and drop rows with missing key values.",
        "Encode sex/class as numbers and pick a few features (age, fare, sex, class).",
        "Train a RandomForestClassifier and score it on a test split.",
        "Print feature_importances_ and see whether sex or class drove survival most.",
      ],
    },
    industryUse: [
      "Banks scoring loan and credit applications with tree ensembles for accuracy plus auditability",
      "Airbnb and other marketplaces ranking and pricing listings with gradient-boosted trees",
      "Hospitals using random forests on tabular patient data to flag high-risk cases",
    ],
    commonMistakes: [
      "Letting a single tree grow unlimited depth, then wondering why it overfits. Fix: limit max_depth or use a forest.",
      "Expecting a random forest to read like one clean flowchart. Fix: it's a crowd of trees — use feature_importances_ for interpretation instead.",
    ],
    interviewQuestions: [
      "How does a decision tree decide where to split? (Gini/entropy — information gain.)",
      "Why does a random forest usually beat a single decision tree?",
      "What's the difference between bagging (random forests) and boosting (e.g. XGBoost)?",
    ],
    papers: [
      { title: "Random Forests (Leo Breiman)", url: "https://link.springer.com/article/10.1023/A:1010933404324", year: 2001 },
    ],
    nextUp: ["overfitting", "metrics"],
    cheatsheet: [
      "Tree = flowchart of learned yes/no questions",
      "One deep tree overfits easily",
      "Forest = many random trees that vote/average",
      "sklearn: RandomForestClassifier(n_estimators=100).fit(X, y)",
      "feature_importances_ shows what mattered",
    ],
  },
};
