import type { LessonBody } from "@/types";

export const dataStats: Record<string, LessonBody> = {
  "eda": {
    story:
      "You inherit a shoebox stuffed with your late uncle's receipts and swear you'll figure out where his money went. Before you build any budget, you dump the box on the table and just look: How many receipts are there? Are some faded and unreadable? Is one for a suspicious 40,000-rupee 'garden gnome'? You sort, count, and squint at the pile first. That first look — before any conclusions — is Exploratory Data Analysis. EDA is getting to know your data like a detective examines a crime scene: no theories yet, just gathering clues.",
    problem:
      "People are desperate to jump straight to a fancy model, then get garbage predictions and have no idea why. The reason is almost always in the data they never looked at: a column that's half-empty, a price recorded as -1, ages of 200 years. If you don't examine your clues first, you build a beautiful model on a rotten foundation.",
    analogy:
      "EDA is a doctor doing a full check-up — pulse, temperature, weight, a good long look — before ever prescribing medicine. You diagnose the data before you treat the problem.",
    explanation: [
      "EDA answers four detective questions: What shape is this data (how many rows and columns)? What's missing? What looks weird (outliers)? And how is each column spread out (its distribution)?",
      "Shape first: `df.shape` tells you rows x columns. 10 rows and 500 rows are very different investigations.",
      "Missing values are the smudged clues. A column that's 90% empty is often useless — you either fill it, drop it, or treat 'missing' as its own signal.",
      "Outliers are the suspects that don't fit: a house priced at 1 rupee, a person aged 214. Sometimes they're typos to fix; sometimes they're the most interesting thing in the whole dataset (like fraud).",
      "Distributions tell you the personality of a column: is income clustered around a typical value, or is there a long tail of a few billionaires dragging the average up? A quick histogram shows this instantly.",
      "Use EDA at the very start of EVERY project, always, before modelling. The only time to skip it is never — even one glance saves hours of confusion later.",
    ],
    math: "A quick summary uses the mean (average) and the standard deviation (typical distance from that average). A value more than about 3 standard deviations from the mean is a classic 'this might be an outlier' flag.",
    code: {
      language: "python",
      source: `import pandas as pd

# Load the shoebox of receipts
df = pd.read_csv("expenses.csv")

# 1. What shape is this data?
print("Rows, columns:", df.shape)

# 2. Meet every column: count, mean, min, max, spread
print(df.describe())

# 3. Where are the smudged clues (missing values)?
print(df.isna().sum())

# 4. Quick visual: distribution of the 'amount' column
df["amount"].hist(bins=30)   # a histogram - see the shape at a glance`,
      explanation:
        "df.describe() gives you count, mean, min, max and spread for every numeric column in one shot. df.isna().sum() counts missing values per column, and the histogram shows the distribution's shape.",
    },
    exercise: {
      prompt: "The 'category' column is text, so describe() skips it. Print how many times each category appears to spot typos like 'Food' vs 'food'.",
      starter: `import pandas as pd
df = pd.read_csv("expenses.csv")
# TODO: count how often each category shows up
counts = ...
print(counts)`,
      solution: `import pandas as pd
df = pd.read_csv("expenses.csv")
counts = df["category"].value_counts()
print(counts)`,
    },
    quiz: [
      {
        question: "What is the main goal of Exploratory Data Analysis?",
        options: [
          "To build the final prediction model as fast as possible",
          "To understand your data's shape, gaps, and quirks before modelling",
          "To delete every row that has a missing value",
          "To make charts that look pretty for a presentation",
        ],
        answerIndex: 1,
        explanation:
          "EDA is the investigation phase — you get to know the data (shape, missing values, outliers, distributions) so your later modelling stands on solid ground.",
      },
      {
        question: "You run df.isna().sum() and one column returns a huge number. What did you just learn?",
        options: [
          "That column has many missing values and needs a decision",
          "That column is the most important feature",
          "The dataset is corrupted and unusable",
          "You must delete the whole dataset",
        ],
        answerIndex: 0,
        explanation:
          ".isna().sum() counts missing values per column. A large number means lots of gaps — you'll need to fill, drop, or flag them.",
      },
      {
        question: "An 'age' column has a value of 214. In EDA, this is a...",
        options: ["Distribution", "Perfectly normal value", "Potential outlier or data-entry error to investigate", "Missing value"],
        answerIndex: 2,
        explanation:
          "A wildly implausible value is a classic outlier — likely a typo, but worth investigating before you trust the column.",
      },
    ],
    flashcards: [
      { front: "EDA", back: "Exploratory Data Analysis — examining data's shape, missing values, outliers, and distributions before modelling." },
      { front: "df.describe()", back: "Pandas summary of count, mean, min, max, and spread for every numeric column." },
      { front: "Missing value", back: "An empty/NaN cell. Count them with df.isna().sum(), then fill, drop, or flag." },
      { front: "Outlier", back: "A value far from the rest — a possible typo, or the most interesting signal in the data." },
    ],
    miniProject: {
      title: "Interrogate a Real Dataset",
      brief: "Download any free CSV (weather, movies, your bank statement) and act as its detective for 20 minutes.",
      steps: [
        "Load it with pd.read_csv and print df.shape and df.head().",
        "Run df.describe() and note anything surprising (impossible min or max?).",
        "Run df.isna().sum() and list which columns have gaps.",
        "Plot a histogram of one numeric column and describe its shape in a sentence.",
        "Write 3 bullet points of 'what I now know about this data'.",
      ],
    },
    industryUse: [
      "Netflix analysts profiling viewing logs (missing timestamps, binge outliers) before building recommendation features",
      "Banks scanning transaction data for weird distributions and outliers that hint at fraud",
      "Hospitals checking patient records for missing lab values before feeding them to a diagnosis model",
    ],
    commonMistakes: [
      "Skipping EDA and modelling straight away — then debugging for hours a problem a single df.describe() would have shown.",
      "Blindly deleting all rows with missing values — sometimes 'missing' is itself a meaningful signal (e.g. no income listed = unemployed).",
      "Trusting the average alone — a few extreme outliers can drag the mean far from what's typical. Always look at the distribution too.",
    ],
    interviewQuestions: [
      "Walk me through the first five things you check when you get a new dataset.",
      "How do you decide whether an outlier is an error to remove or a signal to keep?",
      "What's the difference between the mean and the median, and when would you prefer the median?",
    ],
    papers: [],
    nextUp: ["feature-engineering", "probability-intuition"],
    cheatsheet: [
      "df.shape -> rows x columns",
      "df.describe() -> count, mean, min, max, spread",
      "df.isna().sum() -> missing values per column",
      "df['col'].value_counts() -> counts for text columns",
      "df['col'].hist() -> see the distribution's shape",
      "Look BEFORE you model. Always.",
    ],
  },

  "probability-intuition": {
    story:
      "Your friend flips a coin and it lands heads. You shrug — happens half the time. She flips again: heads. Still fine. But when she gets heads ten times in a row, your eyebrow shoots up: something's off, maybe the coin is rigged. Notice what your brain just did: it measured surprise. Probability is simply a number for 'how surprised should I be that this happened?' A weather app saying '80% rain' means 'don't be surprised if you get soaked.' That's the whole idea — probability is a surprise-meter, from 0 (certain) to 1 (impossible).",
    problem:
      "The world is uncertain and our gut is terrible at it — we panic over rare risks and ignore likely ones. Probability gives us a calm, shared scale for 'how likely is this really?' so we can make decisions with numbers instead of dread. Without it, 'a positive medical test' or 'an 80% forecast' get wildly misread.",
    analogy:
      "Probability is a volume knob for surprise: turn it toward 1 and the event is boring-certain (the sun rises); turn it toward 0 and you'd fall off your chair if it happened (winning the lottery twice).",
    explanation: [
      "A probability is just a number from 0 to 1. 0 means 'never', 1 means 'always', 0.5 means 'flip a coin'. Multiply by 100 to get the percentage everyone quotes.",
      "It's really a long-run frequency: 'the coin is 0.5 heads' means across thousands of flips, about half land heads — not that the next flip is destined to alternate.",
      "The gambler's fallacy is the classic trap: after five heads, tails is NOT 'due'. A fair coin has no memory; the next flip is still 0.5.",
      "Base rates rescue you from panic. If a disease affects 1 in 10,000 people, even a 'positive' on a 99%-accurate test usually means you're fine — because the disease was so rare to begin with. Rare stays rare unless the evidence is overwhelming.",
      "Use probability whenever an outcome is uncertain: forecasts, spam filters, medical tests, insurance. Don't use it to predict a single flip with certainty — it describes the crowd of possibilities, not the one guaranteed answer.",
      "When you can't reason it out, simulate it. Computers can 'flip a coin' a million times in a blink and just count what happened — often faster than doing the math.",
    ],
    math: "For equally-likely outcomes: probability = (ways it can happen) / (total possible outcomes). One head on a coin out of two sides = 1/2 = 0.5.",
    code: {
      language: "python",
      source: `import random

# Simulate flipping a fair coin 10,000 times
flips = 10000
heads = 0
for _ in range(flips):
    if random.random() < 0.5:   # random() gives a number in [0, 1)
        heads += 1

print("Heads:", heads)
print("Fraction that were heads:", heads / flips)
# Run it a few times: the fraction hugs 0.5, but never nails it exactly`,
      explanation:
        "We don't calculate the probability — we act it out 10,000 times and count. The fraction of heads lands very close to the true 0.5, showing probability as a long-run frequency.",
    },
    exercise: {
      prompt: "Change the simulation to a biased coin that lands heads 70% of the time, and check the fraction lands near 0.7.",
      starter: `import random
flips = 10000
heads = 0
for _ in range(flips):
    if random.random() < 0.5:   # TODO: make heads happen 70% of the time
        heads += 1
print(heads / flips)`,
      solution: `import random
flips = 10000
heads = 0
for _ in range(flips):
    if random.random() < 0.7:
        heads += 1
print(heads / flips)`,
    },
    quiz: [
      {
        question: "A fair coin just landed heads 6 times in a row. What is the probability the next flip is heads?",
        options: ["Very low, tails is 'due'", "Still 0.5 — the coin has no memory", "Higher, heads is on a streak", "Exactly 1.0"],
        answerIndex: 1,
        explanation:
          "This is the gambler's fallacy. Each flip of a fair coin is independent and stays 0.5, no matter what came before.",
      },
      {
        question: "A weather app says '90% chance of rain'. The best reading is:",
        options: [
          "It will definitely rain",
          "You'd be quite surprised if it stayed dry — but it's not guaranteed",
          "It will rain for 90% of the day",
          "90% of the city will get rain",
        ],
        answerIndex: 1,
        explanation:
          "Probability measures surprise. 90% means dry weather would be surprising, but not impossible — probability describes likelihood, not certainty.",
      },
      {
        question: "Why does a positive result on a very accurate test for a very rare disease often still mean you're probably fine?",
        options: [
          "The test is lying",
          "Because of the base rate — the disease was so rare that false alarms outnumber true cases",
          "Because accurate tests are actually useless",
          "Because probability doesn't apply to medicine",
        ],
        answerIndex: 1,
        explanation:
          "When a condition is extremely rare, even a small false-positive rate produces more false alarms than real cases. The base rate dominates.",
      },
    ],
    flashcards: [
      { front: "Probability", back: "A number from 0 to 1 measuring how likely (or surprising) an outcome is." },
      { front: "Gambler's fallacy", back: "The false belief that past independent outcomes make a result 'due'. A fair coin has no memory." },
      { front: "Base rate", back: "How common something is to begin with — it hugely affects how to read new evidence." },
      { front: "Simulation", back: "Estimating a probability by acting out the random event many times and counting results." },
    ],
    miniProject: {
      title: "The Birthday Surprise Simulator",
      brief: "Test the famous fact that in a room of just 23 people, there's a ~50% chance two share a birthday.",
      steps: [
        "Write a function that fills a list with N random birthdays (days 1-365).",
        "Check whether any birthday repeats in that list.",
        "Run it 10,000 times for N=23 and count how often a match appears.",
        "Print the fraction — marvel that it's near 0.5.",
        "Try N=50 and watch the probability rocket past 0.97.",
      ],
    },
    industryUse: [
      "Spam filters (Gmail) scoring the probability an email is junk before it hits your inbox",
      "Insurance companies pricing policies from the probability of accidents, illness, or fire",
      "Weather services (and apps like AccuWeather) issuing percentage forecasts from simulations",
    ],
    commonMistakes: [
      "Falling for the gambler's fallacy — thinking a result is 'due' after a streak. Independent events don't remember.",
      "Ignoring the base rate — panicking over a positive test for a rare condition without asking how rare it was.",
      "Reading a single probability as a guarantee — '70% chance' still means it fails 3 times in 10.",
    ],
    interviewQuestions: [
      "Explain the gambler's fallacy and why each fair coin flip stays independent.",
      "A disease affects 1 in 1,000 people and a test is 99% accurate. Roughly how worried should a positive result make you, and why?",
      "How would you estimate a probability you can't calculate by hand?",
    ],
    papers: [],
    nextUp: ["eda", "classification"],
    cheatsheet: [
      "Probability = a surprise-meter from 0 to 1",
      "Equally likely: favorable / total outcomes",
      "Fair coins have no memory (no 'due' outcomes)",
      "Base rates: rare stays rare unless evidence is huge",
      "Can't do the math? Simulate and count.",
    ],
  },

  "feature-engineering": {
    story:
      "You ask two friends to guess if a shop will be busy tomorrow. You hand the first friend a raw timestamp: '2026-07-04 00:00:00' — they blink, useless. You tell the second friend: 'It's a Saturday, and it's a public holiday.' Instantly they say 'packed!' Same underlying fact, but you reshaped it into a clue a human (or a model) can actually use. Feature engineering is that reshaping: turning raw data into the telling clues a model needs. Often a plain model with great clues crushes a fancy model fed raw junk.",
    problem:
      "Models are literal-minded. They can't tell that '2026-07-04' is a Saturday, or that a $9.99 price 'feels' cheaper than $10 — unless you spell it out as a number. Raw columns hide the signal; the model flails. Feature engineering digs out the useful signal and hands it over on a plate.",
    analogy:
      "It's like prepping ingredients before cooking: the model is a decent cook, but if you hand it whole unpeeled onions it struggles. Chop and season first (good features) and even a simple recipe tastes great.",
    explanation: [
      "A feature is one input clue you give the model — one column. Feature engineering is crafting better columns from the ones you already have.",
      "The classic win: dates. A raw date is meaningless to a model, but day-of-week, month, is-weekend, and is-holiday extracted from it are gold for predicting sales, traffic, or demand.",
      "Other everyday moves: combine columns (price per square foot = price / area), bucket numbers into groups (age -> child/adult/senior), and turn text categories into numbers the model can read.",
      "Why it matters so much: better features usually beat a fancier algorithm. A simple model with smart clues routinely outperforms a deep, expensive model fed raw, confusing data.",
      "Use feature engineering on almost every real project — it's where domain knowledge (what YOU know about shops, patients, or houses) becomes the model's advantage.",
      "The caution: don't invent features that secretly contain the answer (called leakage), like using 'final exam score' to predict 'did they pass'. That's cheating, and it collapses the moment you go live.",
    ],
    math: "Many crafted features are just simple arithmetic on existing columns, e.g. price_per_sqft = price / area, or a 0/1 flag: is_weekend = 1 if the day is Saturday or Sunday, else 0.",
    code: {
      language: "python",
      source: `import pandas as pd

df = pd.DataFrame({"date": ["2026-07-04", "2026-07-06", "2026-07-08"],
                   "sales": [900, 300, 320]})

# Turn a useless raw date into clues a model can use
df["date"] = pd.to_datetime(df["date"])
df["day_of_week"] = df["date"].dt.day_name()      # 'Saturday', 'Monday'...
df["is_weekend"] = df["date"].dt.weekday >= 5      # True on Sat/Sun

print(df)
# Now the model can SEE that weekends drive higher sales`,
      explanation:
        "We convert the raw date into a real datetime, then extract day-of-week and an is_weekend flag. These new columns are the clues the model actually learns from.",
    },
    exercise: {
      prompt: "Add a new feature 'month' extracted from the date column, so the model can learn seasonal patterns.",
      starter: `import pandas as pd
df = pd.DataFrame({"date": ["2026-07-04", "2026-12-25"]})
df["date"] = pd.to_datetime(df["date"])
# TODO: create a 'month' column (1-12)
df["month"] = ...
print(df)`,
      solution: `import pandas as pd
df = pd.DataFrame({"date": ["2026-07-04", "2026-12-25"]})
df["date"] = pd.to_datetime(df["date"])
df["month"] = df["date"].dt.month
print(df)`,
    },
    quiz: [
      {
        question: "What is a 'feature' in machine learning?",
        options: [
          "A bug in the model",
          "One input clue (column) the model uses to make predictions",
          "The final prediction",
          "A type of neural network",
        ],
        answerIndex: 1,
        explanation:
          "A feature is a single input column — a clue. Feature engineering is crafting better clues from your raw data.",
      },
      {
        question: "Why do we extract day-of-week from a raw date instead of feeding the date directly?",
        options: [
          "Dates are illegal to store",
          "The model can't tell a raw date is a weekend, but 'is_weekend' is a clue it understands",
          "It makes the file smaller",
          "It's required by Python syntax",
        ],
        answerIndex: 1,
        explanation:
          "A raw timestamp hides useful signal. Extracting day-of-week / is_weekend hands the model a clue it can actually learn from.",
      },
      {
        question: "You build a feature that secretly contains the answer you're trying to predict. This is called...",
        options: ["Good feature engineering", "Data leakage — it cheats and fails in production", "Normalization", "A histogram"],
        answerIndex: 1,
        explanation:
          "Leakage means a feature encodes the target. Scores look amazing in testing but collapse on real, live data.",
      },
    ],
    flashcards: [
      { front: "Feature", back: "One input clue (column) a model uses to make its prediction." },
      { front: "Feature engineering", back: "Crafting better input clues from raw data (e.g. date -> day-of-week)." },
      { front: "Data leakage", back: "A feature that secretly contains the answer — great scores in testing, disaster in production." },
      { front: "Encoding", back: "Turning text categories into numbers a model can read." },
    ],
    miniProject: {
      title: "Predict the Busy Day",
      brief: "Take a small table of dates and store visits, engineer clues, and see which day-features matter.",
      steps: [
        "Build a DataFrame of 14 dates with a made-up 'visitors' number (higher on weekends).",
        "Engineer day_of_week, is_weekend, and month columns.",
        "Group by is_weekend and compare average visitors.",
        "Add an is_holiday flag by hand for one or two dates.",
        "Write one sentence: which feature best explains busy days?",
      ],
    },
    industryUse: [
      "Uber engineering time-of-day and is-weekend features to predict surge demand",
      "Banks crafting 'transactions in last 24h' and 'distance from home' features to catch card fraud",
      "Amazon building 'days since last purchase' features to power recommendations",
    ],
    commonMistakes: [
      "Feeding raw dates or IDs straight into a model instead of extracting the real signal (day-of-week, category).",
      "Creating leaky features that contain the answer — the model looks brilliant until it meets real data.",
      "Chasing a fancier algorithm when a couple of smart new features would have helped far more.",
    ],
    interviewQuestions: [
      "Give an example of a useful feature you could engineer from a raw timestamp.",
      "What is data leakage and how do you guard against it?",
      "Why might feature engineering matter more than the choice of algorithm?",
    ],
    papers: [],
    nextUp: ["train-test-split", "linear-regression"],
    cheatsheet: [
      "Feature = one input clue (column) for the model",
      "Date -> day_of_week, is_weekend, month, is_holiday",
      "Combine: price_per_sqft = price / area",
      "Good features often beat a fancier model",
      "Beware leakage: don't leak the answer into a feature",
    ],
  },

  "train-test-split": {
    story:
      "A teacher hands out a practice sheet, and a sneaky student memorizes the exact answers instead of learning the method. On practice day: perfect score! On the real exam with new questions: disaster. To measure real learning, the teacher must test on questions the student has never seen. A machine learning model is that student. If we score it on the very data it studied, it can cheat by memorizing — so we hide a chunk of data away and only test on that. That hidden pile is the test set.",
    problem:
      "A model that memorizes its training data can look flawless — 100% right! — while having learned nothing that generalizes. If you never hide any data, you have no honest way to know whether your model actually learned the pattern or just parroted back the answers it saw.",
    analogy:
      "Don't let a student study the exact exam questions. Hide some questions away, and grade only on those — that's the only fair test of real understanding.",
    explanation: [
      "Split your data into two piles: a training set (usually ~80%) the model learns from, and a test set (~20%) it never sees during training.",
      "Train on the first pile, then measure accuracy on the hidden pile. That test score is your honest estimate of real-world performance.",
      "A big gap — great on training, poor on test — means overfitting: the model memorized instead of learned. That gap is the whole reason we hold data back.",
      "Always shuffle before splitting so both piles are representative, and set a random_state so your split is reproducible (you get the same split every run).",
      "Golden rule: never let the model touch the test set until the very end. Peeking at it, or tuning your model to it, quietly turns it back into cheating.",
      "Use this on every supervised project — it's non-negotiable. For serious work, pros go further and add a third 'validation' pile for tuning, keeping test truly untouched.",
    ],
    visualization: { type: "bias-variance" },
    math: "A typical split holds out a fraction for testing, e.g. test_size = 0.2 means 20% of rows go to the test set and 80% to training.",
    code: {
      language: "python",
      source: `from sklearn.model_selection import train_test_split

X = [[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]]   # inputs
y = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]                  # answers

# Hide 20% of the data for honest testing
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

print("Trained on:", len(X_train), "examples")
print("Tested on: ", len(X_test), "hidden examples")
# The model learns from X_train and is graded on X_test - data it never saw`,
      explanation:
        "train_test_split shuffles the data and carves off 20% as a hidden test set. random_state=42 makes the split reproducible so you get the same result every run.",
    },
    exercise: {
      prompt: "Change the split so 30% of the data is held out for testing instead of 20%.",
      starter: `from sklearn.model_selection import train_test_split
X = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]
y = [2,4,6,8,10,12,14,16,18,20]
# TODO: hold out 30% for testing
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=..., random_state=42)
print(len(X_test))`,
      solution: `from sklearn.model_selection import train_test_split
X = [[1],[2],[3],[4],[5],[6],[7],[8],[9],[10]]
y = [2,4,6,8,10,12,14,16,18,20]
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=42)
print(len(X_test))`,
    },
    quiz: [
      {
        question: "Why do we hide a portion of the data from the model during training?",
        options: [
          "To make training faster",
          "To honestly measure whether the model learned the pattern or just memorized",
          "Because the computer runs out of memory",
          "To save disk space",
        ],
        answerIndex: 1,
        explanation:
          "Testing on unseen data is the only fair way to check real learning. Scoring on training data lets a memorizer cheat.",
      },
      {
        question: "Your model scores 99% on training data but 60% on the test set. What's happening?",
        options: [
          "It's a perfect model",
          "Overfitting — it memorized the training data instead of learning the pattern",
          "The test set is broken",
          "You should train on the test set too",
        ],
        answerIndex: 1,
        explanation:
          "A big train-vs-test gap is the signature of overfitting: the model memorized rather than generalized.",
      },
      {
        question: "What is the danger of tuning your model by repeatedly checking the test set?",
        options: [
          "Nothing, it's encouraged",
          "You slowly leak the test answers into your choices — it stops being an honest test",
          "It makes training slower",
          "It uses more electricity",
        ],
        answerIndex: 1,
        explanation:
          "Peeking and tuning to the test set turns it back into cheating. That's why pros keep a separate validation set for tuning.",
      },
    ],
    flashcards: [
      { front: "Training set", back: "The data (~80%) the model learns from." },
      { front: "Test set", back: "Held-out data (~20%) the model never sees in training, used for an honest score." },
      { front: "Overfitting", back: "Memorizing the training data instead of learning the pattern — great on train, poor on test." },
      { front: "random_state", back: "A seed that makes your shuffle/split reproducible — same split every run." },
    ],
    miniProject: {
      title: "The Honest vs Cheating Scorecard",
      brief: "See with your own eyes how scoring on training data flatters a model, while the test set tells the truth.",
      steps: [
        "Load any small dataset and split it with train_test_split (test_size=0.2).",
        "Train a simple model (e.g. LinearRegression or DecisionTree).",
        "Score it on the TRAINING data and note the number.",
        "Score it on the TEST data and compare — spot the gap.",
        "Write one sentence explaining which score you'd trust and why.",
      ],
    },
    industryUse: [
      "Netflix holding out recent viewing data to test whether a new recommender truly improves predictions",
      "Banks validating fraud models on unseen transactions before trusting them with real money",
      "Hospitals testing diagnostic models on patients the model never trained on to ensure they generalize",
    ],
    commonMistakes: [
      "Scoring the model on its own training data and celebrating a fake-perfect result.",
      "Letting information from the test set sneak into training (data leakage) — inflated scores that crash in production.",
      "Forgetting to set random_state, so results change every run and can't be compared or reproduced.",
    ],
    interviewQuestions: [
      "Why do we split data into train and test sets, and what is a typical ratio?",
      "What is overfitting and how does the train-test gap reveal it?",
      "What is a validation set and how does it differ from the test set?",
    ],
    papers: [],
    nextUp: ["overfitting", "metrics"],
    cheatsheet: [
      "Split ~80% train / ~20% test",
      "Train on train, grade on the hidden test set",
      "Big train-test gap = overfitting",
      "train_test_split(X, y, test_size=0.2, random_state=42)",
      "Never peek at the test set until the end",
    ],
  },
};
