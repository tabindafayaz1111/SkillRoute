import type { LessonBody } from "@/types";

export const shipping: Record<string, LessonBody> = {
  "metrics": {
    story:
      "A hospital builds a model to spot a rare disease. It reports 99% accuracy and everyone celebrates. Then you notice something horrifying: only 1 in 100 patients actually has the disease. A lazy model that ignores everything and stamps 'healthy' on every single person is also 99% accurate — and it has never caught a single sick patient. Accuracy looked amazing and meant nothing. This is why you never trust a single number to tell you if a model is any good.",
    problem:
      "Once a model makes predictions, you need to know: is it actually helping, or just looking busy? A single feel-good number like accuracy can hide catastrophic failures, especially when one outcome is rare. You need honest measurements that reveal what the model gets right AND what it dangerously gets wrong.",
    analogy:
      "Judging a model by accuracy alone is like judging a smoke detector by how often it stays quiet — a brick also stays quiet, right up until your kitchen is on fire.",
    explanation: [
      "Accuracy = (correct predictions) / (all predictions). It is fine when your classes are balanced (roughly 50/50), and dangerously misleading when they're not, because a model can score high just by always guessing the common answer.",
      "Precision answers: 'When the model shouts ALARM, how often is it right?' High precision = few false alarms. A trigger-happy smoke detector that screams at toast has low precision.",
      "Recall answers: 'Of all the real fires, how many did the alarm actually catch?' High recall = few misses. A detector that sleeps through real smoke has low recall.",
      "There's a tug-of-war: crank sensitivity up and you catch every fire but scream at toast (high recall, low precision); calm it down and you stop the false alarms but miss real danger (high precision, low recall).",
      "Use it when: pick which error hurts more. Missing cancer is deadly -> maximize recall. Wrongly blocking good credit-card charges annoys customers -> favor precision. The F1 score blends both into one number when you care about balance.",
      "Don't use accuracy alone the moment your data is imbalanced (fraud, disease, spam) — reach for precision, recall, and a confusion matrix instead.",
    ],
    math:
      "Precision = TP / (TP + FP): of everything flagged positive, the fraction that truly is. Recall = TP / (TP + FN): of everything that truly is positive, the fraction you caught. TP = true positives (correct alarms), FP = false positives (false alarms), FN = false negatives (missed cases).",
    code: {
      language: "python",
      source: `from sklearn.metrics import accuracy_score, classification_report

# Truth vs. a lazy model that ALWAYS predicts 0 ("healthy")
# 100 patients, only the last one is actually sick (label 1)
y_true = [0]*99 + [1]      # reality: 99 healthy, 1 sick
y_pred = [0]*100           # model: "everyone is healthy"

print("Accuracy:", accuracy_score(y_true, y_pred))   # 0.99 -- looks great!

# But the full report exposes the truth: recall for the sick class is 0
print(classification_report(y_true, y_pred, zero_division=0))`,
      explanation:
        "Accuracy prints a proud 0.99, but the classification_report shows precision and recall of 0 for the 'sick' class — the model never caught the one patient who mattered.",
    },
    exercise: {
      prompt: "A spam filter flagged 8 emails. 6 were truly spam, 2 were real emails it blocked by mistake. Compute its precision by hand in code.",
      starter: `true_positives = 6   # real spam correctly caught
false_positives = 2  # good emails wrongly flagged
# TODO: precision = caught-and-correct / everything-flagged
precision = ...
print(precision)`,
      solution: `true_positives = 6
false_positives = 2
precision = true_positives / (true_positives + false_positives)
print(precision)  # 0.75`,
    },
    quiz: [
      {
        question: "A model predicts 'no fraud' for every transaction and scores 99.8% accuracy. What's wrong?",
        options: [
          "Nothing — 99.8% is excellent",
          "Fraud is rare, so always saying 'no fraud' is accurate but catches zero fraud",
          "The accuracy formula is broken",
          "It needs a faster computer",
        ],
        answerIndex: 1,
        explanation:
          "With imbalanced data, always predicting the majority class gives high accuracy while completely failing at the task that matters.",
      },
      {
        question: "For detecting a deadly disease, which metric matters most?",
        options: [
          "Precision — never raise a false alarm",
          "Recall — don't miss any real cases, even at the cost of some false alarms",
          "Accuracy — the single overall number",
          "Speed of prediction",
        ],
        answerIndex: 1,
        explanation:
          "Missing a sick patient (a false negative) is far more costly than a false alarm, so you prioritize recall.",
      },
      {
        question: "What does high precision but low recall describe?",
        options: [
          "When it flags something it's usually right, but it misses many real cases",
          "It catches everything but with tons of false alarms",
          "It is wrong most of the time",
          "The classes are perfectly balanced",
        ],
        answerIndex: 0,
        explanation:
          "High precision = few false alarms; low recall = many misses. A cautious model that only flags when very sure.",
      },
    ],
    flashcards: [
      { front: "Accuracy", back: "Fraction of all predictions that were correct. Misleading when classes are imbalanced." },
      { front: "Precision", back: "Of everything flagged positive, how much truly is positive. High = few false alarms." },
      { front: "Recall", back: "Of everything truly positive, how much was caught. High = few misses." },
      { front: "F1 score", back: "The balance (harmonic mean) of precision and recall in one number." },
    ],
    miniProject: {
      title: "Catch the Imbalance Trap",
      brief: "Build a tiny imbalanced dataset and prove accuracy lies while recall tells the truth.",
      steps: [
        "Make a list of 100 labels where only 5 are '1' (the rare class).",
        "Create a 'dumb' model that always predicts 0, and print its accuracy.",
        "Print the classification_report and read the recall for class 1.",
        "Write one sentence explaining why a 95%-accurate model here is useless.",
      ],
    },
    industryUse: [
      "Banks tuning fraud models for high recall so almost no fraudulent charge slips through",
      "Gmail balancing precision and recall so spam is caught without burying real email",
      "Hospitals prioritizing recall on cancer-screening models so few sick patients are missed",
    ],
    commonMistakes: [
      "Reporting only accuracy on imbalanced data — always check precision and recall (and a confusion matrix) too.",
      "Chasing precision and recall to 100% at once — they usually trade off, so pick which error hurts more for your problem.",
    ],
    interviewQuestions: [
      "Explain precision vs. recall with an example, and when you'd optimize for each.",
      "Why is accuracy a poor metric for imbalanced datasets? What would you use instead?",
      "What is a confusion matrix and how do precision, recall, and F1 come out of it?",
    ],
    papers: [],
    nextUp: ["deploy-streamlit", "capstone-ml"],
    cheatsheet: [
      "Accuracy = correct / total (lies on imbalanced data)",
      "Precision = TP / (TP + FP) -> fewer false alarms",
      "Recall = TP / (TP + FN) -> fewer misses",
      "F1 = balance of precision and recall",
      "Rare class? Read the classification_report, not just accuracy",
      "Deadly to miss -> chase recall; costly false alarm -> chase precision",
    ],
  },

  "deploy-streamlit": {
    story:
      "You spent a week training a house-price model in a Jupyter notebook. It works beautifully. You proudly show your cousin, who asks, 'Cool — can I try it?' And you realize: she can't. Your masterpiece lives inside your laptop, behind Python installs and code cells she'll never touch. A model nobody can use helps nobody. Streamlit is the tool that turns that notebook into a real web page with a slider and a button — a link you text to your cousin, and she just uses it.",
    problem:
      "A trained model trapped in a .ipynb file is invisible to the world. Non-coders can't install Python, run cells, or read your DataFrame. You need to wrap it in something anyone can open in a browser — without learning HTML, JavaScript, or web servers.",
    analogy:
      "Streamlit is like slapping a friendly dashboard onto an engine: the powerful machine was always there, but now there are knobs and a screen so a normal person can drive it.",
    explanation: [
      "Streamlit lets you write a plain Python script and turns it into an interactive web app — no front-end code, no HTML, no JavaScript required.",
      "You add widgets with one-line commands: st.slider() makes a slider, st.button() a button, st.write() prints anything (text, numbers, charts, DataFrames) to the page.",
      "Every time the user moves a slider, Streamlit re-runs your whole script top to bottom with the new value, so the page updates live. It feels like magic; it's just a re-run.",
      "You run it locally with `streamlit run app.py`, which opens the app in your browser instantly for testing.",
      "Use it when you want to demo a model, build an internal tool, or share a quick prototype fast. Don't reach for it when you need a high-traffic production API or pixel-perfect custom design — use FastAPI or a real front-end framework for that.",
      "To share it with the world for free, push your code to GitHub and deploy on Streamlit Community Cloud — you get a public URL anyone can open.",
    ],
    code: {
      language: "python",
      source: `# app.py  ->  run it with:  streamlit run app.py
import streamlit as st
from sklearn.linear_model import LinearRegression
import numpy as np

# A tiny model trained right here (normally you'd load a saved one)
X = np.array([[500], [1000], [1500], [2000]])   # size in sq-ft
y = np.array([25, 50, 74, 98])                   # price in lakhs
model = LinearRegression().fit(X, y)

st.title("House Price Predictor")
st.write("Drag the slider to size your house, get an instant estimate.")

size = st.slider("House size (sq-ft)", 300, 3000, 1200)
predicted = model.predict([[size]])[0]

st.write("Estimated price:", round(predicted, 1), "lakhs")`,
      explanation:
        "This whole file IS the web app: st.title puts a heading, st.slider gives the user a live control, and st.write shows the model's prediction that updates the instant the slider moves.",
    },
    exercise: {
      prompt: "Add a text input so the user can name their house, and greet them with it above the prediction.",
      starter: `import streamlit as st
st.title("House Price Predictor")
# TODO: add a text input for the house name, then greet the user
name = ...
st.write(...)`,
      solution: `import streamlit as st
st.title("House Price Predictor")
name = st.text_input("Name your house", "Dream Home")
st.write("Pricing up:", name)`,
    },
    quiz: [
      {
        question: "Why isn't a model in a Jupyter notebook enough to share with non-technical people?",
        options: [
          "Notebooks are too slow",
          "They'd need Python installed and know how to run code cells — most people can't",
          "Models expire after 24 hours",
          "Jupyter is illegal to share",
        ],
        answerIndex: 1,
        explanation:
          "A notebook requires a Python environment and coding know-how. A web app just needs a browser link.",
      },
      {
        question: "What happens when a user moves an st.slider in a Streamlit app?",
        options: [
          "Nothing until you click Save",
          "Streamlit re-runs the whole script with the new value and updates the page",
          "It emails you the value",
          "It retrains the model from scratch on new data",
        ],
        answerIndex: 1,
        explanation:
          "Streamlit's model is simple: any interaction re-runs the script top-to-bottom, so outputs refresh automatically.",
      },
    ],
    flashcards: [
      { front: "Streamlit", back: "A Python library that turns a plain script into an interactive web app with no front-end code." },
      { front: "st.slider / st.write", back: "One-line widgets: create a slider control and print text, numbers, charts, or DataFrames to the page." },
      { front: "streamlit run app.py", back: "The terminal command that launches your app locally in the browser." },
      { front: "Streamlit Community Cloud", back: "Free hosting: connect a GitHub repo and get a public URL for your app." },
    ],
    miniProject: {
      title: "Ship Your First Live Web App",
      brief: "Take any small trained model and put it online for free with a public link you can share.",
      steps: [
        "Write app.py: load or train a small model, add st.title, an st.slider input, and st.write showing the prediction.",
        "Run `streamlit run app.py` locally and check it works in your browser.",
        "Create a requirements.txt listing streamlit, scikit-learn, and numpy.",
        "Push the folder to a public GitHub repo.",
        "Go to share.streamlit.io, connect the repo, click Deploy, and share the public URL you get back.",
      ],
    },
    industryUse: [
      "Data teams at startups building internal dashboards and model demos in an afternoon",
      "ML engineers at companies like Uber and Snowflake prototyping tools before a full product build",
      "Researchers and Kaggle competitors sharing interactive demos of their models with a single link",
    ],
    commonMistakes: [
      "Forgetting requirements.txt — Streamlit Cloud can't install your libraries and the deploy fails; list every import you use.",
      "Retraining the model on every slider move, making the app slow — train once (or load a saved model) and cache it with st.cache_resource.",
    ],
    interviewQuestions: [
      "How would you take a trained model from a notebook and make it usable by a non-technical stakeholder?",
      "What are the trade-offs of Streamlit versus building a REST API with FastAPI for serving a model?",
      "Walk me through deploying a Streamlit app to the cloud for free.",
    ],
    papers: [],
    nextUp: ["capstone-ml", "metrics"],
    cheatsheet: [
      "streamlit run app.py -> instant local web app",
      "st.title / st.write -> headings and output",
      "st.slider / st.button / st.text_input -> user controls",
      "Any widget change re-runs the whole script",
      "Add requirements.txt before deploying",
      "Deploy free on share.streamlit.io from a GitHub repo",
    ],
  },

  "capstone-ml": {
    story:
      "Everything you've learned — loading data, cleaning it, picking features, training a model, checking if it's actually good, and shipping it — has been separate LEGO bricks. A capstone is where you snap them into one thing you can show off: a House Price Predictor that takes a house's details and returns a price, live, on the web. When a recruiter asks 'What have you built?', you don't recite topics — you send them a link and say 'I built this.' That's the whole point of this lesson.",
    problem:
      "Learning ideas one at a time leaves a gap: can you actually connect them into a working project by yourself? Employers don't hire people who know definitions; they hire people who've shipped something end-to-end. You need one complete project that proves you can go from a raw CSV all the way to a live app.",
    analogy:
      "You've practiced chopping, seasoning, and frying separately. The capstone is cooking the whole meal and serving it to a guest — that's what shows you can actually cook.",
    explanation: [
      "The pipeline is always the same six steps: load the data, explore it (EDA), build features, train a model, evaluate it honestly, and deploy it. Memorize this loop — it's every real ML project.",
      "Load & explore: read the CSV with pandas, then look — .describe(), a histogram of prices, a correlation check to see which columns actually move with price.",
      "Features: pick the columns that matter (size, bedrooms, location), handle missing values, and convert text categories to numbers so the model can use them.",
      "Train two models and compare: LinearRegression as a simple, interpretable baseline, and RandomForestRegressor which usually captures curves and interactions better. Whichever wins on the test set is your pick.",
      "Evaluate on data the model never saw (the test split), using an honest metric like RMSE or R² — never grade a model on data it trained on, or you're just measuring memorization.",
      "Deploy with Streamlit so anyone can use it, then write it up. Use it as your portfolio's centerpiece; the write-up matters as much as the code.",
    ],
    math:
      "RMSE = sqrt( average( (predicted price − actual price)² ) ). It's the typical size of your prediction error, in the same units as price (lakhs). Lower is better; compare it to the average price to judge if it's good.",
    code: {
      language: "python",
      source: `import pandas as pd
from sklearn.datasets import fetch_california_housing
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error

# 1) LOAD a real housing dataset
data = fetch_california_housing(as_frame=True)
X, y = data.data, data.target        # features, and median house value

# 2) SPLIT so we can test on unseen houses
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# 3) TRAIN a random forest
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 4) EVALUATE honestly on the test set
preds = model.predict(X_test)
rmse = mean_squared_error(y_test, preds) ** 0.5
print("Typical error (RMSE):", round(rmse, 3))

# 5) PREDICT for one new house
print("Predicted value:", round(model.predict(X_test.iloc[[0]])[0], 3))`,
      explanation:
        "This is the whole pipeline in miniature: load real data, split off a test set, train a forest, measure its typical error on unseen houses, then predict a single house — exactly what your Streamlit app will call.",
    },
    exercise: {
      prompt: "Swap the RandomForest for a LinearRegression baseline and print its RMSE so you can compare the two models.",
      starter: `from sklearn.linear_model import LinearRegression
# X_train, y_train, X_test, y_test already exist from above
baseline = ...   # TODO: create and fit a LinearRegression
preds = baseline.predict(X_test)
rmse = mean_squared_error(y_test, preds) ** 0.5
print("Baseline RMSE:", round(rmse, 3))`,
      solution: `from sklearn.linear_model import LinearRegression
baseline = LinearRegression().fit(X_train, y_train)
preds = baseline.predict(X_test)
rmse = mean_squared_error(y_test, preds) ** 0.5
print("Baseline RMSE:", round(rmse, 3))`,
    },
    quiz: [
      {
        question: "Why must you evaluate the model on a separate test set instead of the training data?",
        options: [
          "Test data runs faster",
          "Grading on training data measures memorization, not real-world performance",
          "It's a legal requirement",
          "The training data gets deleted after fitting",
        ],
        answerIndex: 1,
        explanation:
          "A model can memorize its training data and look perfect. Only unseen data tells you how it'll perform in the real world.",
      },
      {
        question: "In this capstone, why train BOTH LinearRegression and RandomForest?",
        options: [
          "To waste time",
          "To compare a simple interpretable baseline against a more flexible model and keep the better one",
          "Random forests only work with linear regression running",
          "Two models are always more accurate than one",
        ],
        answerIndex: 1,
        explanation:
          "The linear model is a clear, interpretable baseline; the forest often does better on complex patterns. You compare and pick the winner on the test set.",
      },
      {
        question: "What makes a capstone strong on a resume?",
        options: [
          "Listing every algorithm you know",
          "A clear end-to-end story plus a live demo link and a README anyone can follow",
          "Using the largest possible dataset",
          "Never mentioning the metric you used",
        ],
        answerIndex: 1,
        explanation:
          "Recruiters value a complete, shippable project they can click and understand — the write-up and live link matter as much as the code.",
      },
    ],
    flashcards: [
      { front: "Capstone project", back: "One end-to-end project (data -> EDA -> features -> train -> evaluate -> deploy) that proves you can build, not just define." },
      { front: "EDA", back: "Exploratory Data Analysis — looking at, summarizing, and plotting your data before modeling." },
      { front: "RMSE", back: "Root Mean Squared Error — typical prediction error in the target's own units. Lower is better." },
      { front: "Baseline model", back: "A simple model (like LinearRegression) you compare fancier models against." },
    ],
    miniProject: {
      title: "House Price Predictor — Portfolio Capstone",
      brief:
        "Build the full pipeline end to end and ship it as a live web app that recruiters can click. Suggested dataset: scikit-learn's California Housing (from sklearn.datasets import fetch_california_housing) or the Kaggle 'House Prices - Advanced Regression Techniques' CSV.",
      steps: [
        "EDA: load the dataset with pandas, run .describe(), plot a histogram of prices and a correlation heatmap to spot which features matter.",
        "Features & train: clean missing values, encode any text categories, then train LinearRegression and RandomForestRegressor.",
        "Evaluate: compare both models' RMSE and R² on a held-out test set, and keep the better one.",
        "Deploy: build a Streamlit app with sliders for size/bedrooms/location that shows a live price, and publish it on Streamlit Community Cloud.",
        "Write it up: a GitHub README (problem, data, approach, result, screenshot, live link), a resume line, and a 60-second interview story.",
      ],
    },
    industryUse: [
      "Zillow and Redfin run house-price estimators built on exactly this pipeline at massive scale",
      "Banks use similar regression pipelines to appraise property value for mortgage decisions",
      "Insurance companies predict claim and asset values with the same load -> feature -> train -> evaluate loop",
    ],
    commonMistakes: [
      "Skipping the test set and reporting training-data scores — always evaluate on unseen data, or your metric is a lie.",
      "Leaving the project as a notebook with no README or demo — recruiters won't run your code; give them a live link and a clear write-up.",
      "Chasing a fancy model before trying a simple baseline — start with LinearRegression so you know if the complexity is even earning its keep.",
    ],
    interviewQuestions: [
      "Walk me through your house-price project end to end, from raw data to the deployed app.",
      "How did you decide between linear regression and a random forest, and how did you measure which was better?",
      "How did you make sure your reported accuracy reflects real-world performance and not overfitting?",
    ],
    papers: [],
    nextUp: ["deploy-streamlit", "metrics"],
    cheatsheet: [
      "Pipeline: load -> EDA -> features -> train -> evaluate -> deploy",
      "Always split: train the model, test on unseen data",
      "Baseline (LinearRegression) vs. RandomForestRegressor -> keep the winner",
      "Judge with RMSE / R² on the TEST set only",
      "Ship it: Streamlit app + Streamlit Community Cloud link",
      "Resume line: 'Built and deployed a live house-price predictor (Python, scikit-learn, Streamlit)'",
    ],
  },
};
