import type { LessonBody } from "@/types";

export const statistics: Record<string, LessonBody> = {
  "stats-center": {
    story:
      "Ten friends go out for dinner and split the story of their salaries. Nine of them earn around 40,000 a month. The tenth, quietly sipping water, is a startup founder who just made 5,000,000. Someone says 'the average person here earns over half a million!' — and technically they're right, but it's a ridiculous thing to say about this table. This is the whole drama of finding the 'center' of data: there are three different honest answers (mean, median, mode), and picking the wrong one can turn a group of ordinary earners into imaginary millionaires.",
    problem:
      "You have a big pile of numbers — salaries, ages, house prices, test scores — and you want ONE number that says 'this is typical.' But 'typical' is slippery. One giant outlier can yank the everyday average into fantasy land, and a single number chosen carelessly can badly mislead everyone who trusts it.",
    analogy:
      "Finding the center is like describing a whole family with one height. The mean is everyone's height poured into a bucket and divided out; the median is the person standing exactly in the middle of the line-up; the mode is the height you see most often.",
    explanation: [
      "The MEAN is the plain average: add everything up, divide by how many there are. It uses every number, which is great — but that's also its weakness, because one monster value drags it around.",
      "The MEDIAN is the middle value once you line the numbers up in order. Half are below it, half above. It shrugs off outliers completely — the founder's 5 million doesn't move it at all.",
      "The MODE is simply the value that shows up most often. It's the only one that works for non-numbers too (the most common shoe size, the best-selling colour).",
      "Use the MEDIAN for money, house prices, and anything with a long tail of extreme values — it tells the honest 'typical person' story. Use the MEAN when data is fairly symmetric and you need it for further maths. Use the MODE for categories and 'what's most popular.'",
      "A quick tell: if the mean is much bigger than the median, you have a few big values pulling upward (a 'right skew'). If it's much smaller, a few tiny values are pulling down.",
      "Never report just one number blindly. 'Average salary 550k' is a lie of omission here; 'typical salary 40k, but one person earns far more' is the truth.",
    ],
    math: "Mean = (sum of all values) / (count of values). Median = the middle value after sorting (or the average of the two middle values if there's an even count). Mode = the most frequently occurring value.",
    code: {
      language: "python",
      source: `import numpy as np
from statistics import mode

# Monthly salaries of 10 dinner friends (in thousands)
salaries = [38, 40, 41, 39, 42, 40, 37, 43, 40, 5000]

print("Mean  :", np.mean(salaries))     # dragged way up by the founder
print("Median:", np.median(salaries))   # calm, ignores the outlier
print("Mode  :", mode(salaries))         # the most common salary`,
      explanation:
        "Watch the gap: the mean explodes to ~536 because of one huge value, while the median stays at a sensible 40. That gap is your warning sign of an outlier or skew.",
    },
    exercise: {
      prompt: "The founder leaves the table. Compute the mean of the remaining 9 salaries and see how much saner it becomes.",
      starter: `import numpy as np
salaries = [38, 40, 41, 39, 42, 40, 37, 43, 40, 5000]
# TODO: drop the last value, then take the mean
mean_without_founder = ...
print(mean_without_founder)`,
      solution: `import numpy as np
salaries = [38, 40, 41, 39, 42, 40, 37, 43, 40, 5000]
mean_without_founder = np.mean(salaries[:-1])
print(mean_without_founder)  # about 40, matching the median`,
    },
    quiz: [
      {
        question: "You're reporting the 'typical' home price in a city where a few mansions cost 100x the rest. Which is most honest?",
        options: ["The mean, always", "The median", "The mode", "It doesn't matter"],
        answerIndex: 1,
        explanation:
          "The median ignores the handful of extreme mansions and reflects what a normal buyer actually pays. The mean would be inflated by the mansions.",
      },
      {
        question: "The mean of a dataset is much LARGER than its median. What does that suggest?",
        options: [
          "The data is perfectly symmetric",
          "A few unusually large values are pulling the average up (right skew)",
          "There is a mistake in the calculation",
          "The mode must equal the mean",
        ],
        answerIndex: 1,
        explanation:
          "When the mean sits well above the median, a small number of big values are stretching the average upward — a classic right-skewed shape.",
      },
      {
        question: "Which measure of center works for non-numeric data like favourite ice-cream flavour?",
        options: ["Mean", "Median", "Mode", "None of them"],
        answerIndex: 2,
        explanation:
          "You can't add or sort flavours meaningfully, but you can count them. The mode — the most common flavour — is the only one that applies.",
      },
    ],
    flashcards: [
      { front: "Mean", back: "The plain average: sum of all values divided by how many there are. Sensitive to outliers." },
      { front: "Median", back: "The middle value after sorting. Half the data is below it, half above. Ignores outliers." },
      { front: "Mode", back: "The most frequently occurring value. The only center that works for categories." },
      { front: "Skew", back: "When one tail of the data is longer, pulling the mean away from the median." },
    ],
    miniProject: {
      title: "The Honest Number",
      brief: "Grab a real-ish list of numbers and expose the difference between mean and median.",
      steps: [
        "Collect 15 values with at least one big outlier (e.g. prices of items in your cart plus one luxury item).",
        "Compute mean, median, and mode in Python.",
        "Write one sentence stating which number you'd put in a headline and why.",
        "Remove the outlier and recompute — note how much the mean moves versus the median.",
      ],
    },
    industryUse: [
      "Governments and news outlets report MEDIAN household income (not mean) so a few billionaires don't distort the picture",
      "Amazon and Spotify surface the MODE — the most-purchased or most-played item — in 'bestseller' and 'top charts' lists",
      "Real-estate sites like Zillow headline the MEDIAN home price for a neighbourhood to reflect a typical buyer",
    ],
    commonMistakes: [
      "Reporting the mean for skewed data (salaries, prices) and accidentally inventing 'average millionaires.' Fix: use the median.",
      "Assuming 'average' always means 'mean.' In everyday speech it's vague — always say which one you mean.",
      "Forgetting the median needs SORTED data. Compute it by hand on unsorted numbers and you'll get nonsense.",
    ],
    interviewQuestions: [
      "When would you prefer the median over the mean, and why?",
      "If the mean and median of a dataset are very different, what does that tell you about its shape?",
      "How would you explain 'average' to a customer without misleading them?",
    ],
    papers: [],
    nextUp: ["stats-spread", "stats-distributions"],
    cheatsheet: [
      "Mean = sum / count (outlier-sensitive)",
      "Median = middle of sorted data (outlier-proof)",
      "Mode = most common value (works for categories)",
      "Mean >> median → right skew (big values pulling up)",
      "Money & prices → almost always report the median",
      "np.mean(x) · np.median(x)",
    ],
  },

  "stats-spread": {
    story:
      "Two towns both have an average temperature of 20 degrees, so you pack the same suitcase for each. In the first town, every single day really is a mild 20 — jeans and a t-shirt, perfect. In the second, it swings from a freezing 2 in the morning to a blistering 38 by afternoon; that same average was hiding chaos. The average told you the center, but it said nothing about how wildly the numbers bounce around. That bounce — the spread — is often the more important half of the story, and it's what variance and standard deviation measure.",
    problem:
      "Two datasets can share the exact same average yet behave completely differently. If you only look at the center, you miss risk, inconsistency, and surprise. You need a number that answers 'how far, typically, do values stray from the average?' — otherwise you'll be shocked by data that was 'average' on paper.",
    analogy:
      "Standard deviation is like the 'typical wobble' of darts around the bullseye. A tight cluster has a small wobble; darts scattered all over the wall have a big one — even if their average position is dead center.",
    explanation: [
      "First find the mean. Then, for each value, measure how far it is from that mean — that gap is called a deviation.",
      "VARIANCE is the average of those gaps AFTER squaring them. We square so that negative gaps (below the mean) don't cancel out positive ones, and so big misses count extra.",
      "STANDARD DEVIATION is just the square root of the variance. We take the root to undo the squaring, so the answer is back in the original units (degrees, dollars) and is human-readable.",
      "Small standard deviation = values huddle close to the mean (consistent, predictable). Large standard deviation = values are scattered (volatile, risky, surprising).",
      "Use it everywhere you care about consistency or risk: investment returns, manufacturing tolerances, delivery times, test scores. Two options with the same average but different spread are NOT the same bet.",
      "Rough rule of thumb for bell-shaped data: about 68% of values sit within one standard deviation of the mean, and about 95% within two. That single fact turns a std into an instant 'what's normal' range.",
    ],
    math: "Variance = average of (each value − mean) squared. Standard deviation = the square root of the variance, returning the answer to the original units.",
    code: {
      language: "python",
      source: `import numpy as np

town_a = [20, 20, 19, 21, 20, 20, 20]   # calm and mild
town_b = [2, 38, 5, 35, 8, 33, 19]       # same-ish average, wild swings

print("Town A mean:", round(np.mean(town_a), 1), "std:", round(np.std(town_a), 1))
print("Town B mean:", round(np.mean(town_b), 1), "std:", round(np.std(town_b), 1))
# Same center, totally different std -> pack very different suitcases`,
      explanation:
        "Both towns average roughly 20 degrees, but Town B's standard deviation is far larger — proof that identical averages can hide wildly different day-to-day reality.",
    },
    exercise: {
      prompt: "Compute how far the value 35 in Town B is from Town B's mean (its raw deviation).",
      starter: `import numpy as np
town_b = [2, 38, 5, 35, 8, 33, 19]
mean_b = np.mean(town_b)
# TODO: deviation of the value 35 from the mean
deviation = ...
print(deviation)`,
      solution: `import numpy as np
town_b = [2, 38, 5, 35, 8, 33, 19]
mean_b = np.mean(town_b)
deviation = 35 - mean_b
print(deviation)  # about 15 degrees above the mean`,
    },
    quiz: [
      {
        question: "Why do we square the deviations when computing variance?",
        options: [
          "To make the maths harder",
          "So that values below and above the mean don't cancel each other out",
          "Because squares are always integers",
          "To convert to percentages",
        ],
        answerIndex: 1,
        explanation:
          "Deviations below the mean are negative and above are positive; without squaring they'd sum to zero. Squaring removes the signs and punishes big gaps more.",
      },
      {
        question: "Two funds both averaged a 7% return last year. Fund X had a std of 2%, Fund Y a std of 20%. What's true?",
        options: [
          "They are equally risky",
          "Fund Y's returns bounced around far more — it's riskier",
          "Fund X must have lied",
          "Standard deviation says nothing about risk",
        ],
        answerIndex: 1,
        explanation:
          "Same average, very different spread. Fund Y swung wildly to average 7%, so it's the riskier, less predictable bet.",
      },
      {
        question: "For bell-shaped data, roughly what fraction of values fall within ONE standard deviation of the mean?",
        options: ["About 34%", "About 50%", "About 68%", "About 99%"],
        answerIndex: 2,
        explanation:
          "The handy 68–95 rule: ~68% of values lie within one std of the mean, and ~95% within two.",
      },
    ],
    flashcards: [
      { front: "Deviation", back: "How far a single value is from the mean (value − mean)." },
      { front: "Variance", back: "The average of the squared deviations. Measures spread, but in squared units." },
      { front: "Standard deviation", back: "The square root of variance — spread in the original, readable units." },
      { front: "68–95 rule", back: "For bell-shaped data, ~68% of values fall within 1 std of the mean, ~95% within 2." },
    ],
    miniProject: {
      title: "Consistency Contest",
      brief: "Prove that 'same average' can hide very different behaviour.",
      steps: [
        "Time your commute (or a video's length) for 10 days two different ways/routes.",
        "Compute the mean and std of each route in Python.",
        "Find two that share a similar mean but different std.",
        "Decide which route you'd actually pick — and justify it using the std, not the mean.",
      ],
    },
    industryUse: [
      "Investment firms and index funds report the standard deviation of returns as the headline measure of risk (volatility)",
      "Factories at companies like Toyota use standard deviation for quality control — a tight std means parts are consistent",
      "Delivery apps like DoorDash care about the std of delivery times, not just the average, so ETAs stay trustworthy",
    ],
    commonMistakes: [
      "Comparing two options by average alone and ignoring spread — you'll misjudge risk badly. Fix: always report std alongside the mean.",
      "Confusing variance and standard deviation. Variance is in squared units; take its square root for the human-readable std.",
      "Forgetting units: a std of 5 means 5 dollars or 5 degrees — always attach the unit or it's meaningless.",
    ],
    interviewQuestions: [
      "What's the difference between variance and standard deviation, and why do we usually report the latter?",
      "Two datasets have the same mean but different standard deviations — what does that imply?",
      "Explain the 68–95–99.7 rule and when it applies.",
    ],
    papers: [],
    nextUp: ["stats-distributions", "stats-center"],
    cheatsheet: [
      "Deviation = value − mean",
      "Variance = average of squared deviations",
      "Std = square root of variance (back in real units)",
      "Small std = consistent · Large std = volatile/risky",
      "68% within 1 std, 95% within 2 std (bell curves)",
      "np.std(x) · np.var(x)",
    ],
  },

  "stats-distributions": {
    story:
      "Line up 1,000 random adults by height, shortest on the left, tallest on the right, and look at the crowd from above. You won't see a flat wall of people or a random mess — you'll see a gentle hill: a few very short folks on the far left, a few very tall on the far right, and a huge bulge of average-height people crowding the middle. That hill shape is the famous 'bell curve,' and it shows up so often in nature — heights, test scores, measurement errors, blood pressure — that statisticians call it the Normal distribution. A distribution is just the shape your data makes when you let it pile up.",
    problem:
      "A list of a thousand numbers is impossible to hold in your head. But their SHAPE — where they cluster, how they spread, whether they lean left or right — tells you almost everything at a glance. Without understanding distributions, you can't say what's 'normal,' what's 'rare,' or how likely any particular value is.",
    analogy:
      "A distribution is like the pile that forms when you pour a bag of sand onto a table: it naturally mounds up highest where values are common and thins out to the edges where they're rare.",
    explanation: [
      "A distribution is a picture (usually a histogram) of how often each value occurs. Tall bars = common values, short bars = rare ones.",
      "The NORMAL distribution — the bell curve — is symmetric, with one peak in the middle (at the mean). Most data sits near the center; extreme values are increasingly rare on both sides.",
      "It's completely described by just two numbers: the mean (where the peak sits) and the standard deviation (how wide and flat the bell is). Wide bell = lots of spread; narrow bell = tight cluster.",
      "Not everything is bell-shaped. SKEWED distributions lean to one side (income leans right — a long tail of high earners). UNIFORM distributions are flat (a fair die: every face equally likely). Knowing the shape stops you from using the wrong tools.",
      "Why does the bell appear everywhere? Because many small, independent nudges add up to it (you'll see exactly why in the Central Limit Theorem lesson). It's less a coincidence than a law of nature.",
      "Use distributions to answer 'is this value weird?' A test score 2 standard deviations above the mean sits in the far-right ~2.5% tail — genuinely exceptional. That judgement is impossible without knowing the shape.",
    ],
    math: "The Normal distribution is defined by its mean (center) and standard deviation (width). By the 68–95–99.7 rule, ~68% of values lie within 1 std of the mean, ~95% within 2, and ~99.7% within 3.",
    code: {
      language: "python",
      source: `import numpy as np

# Simulate 10,000 adult heights: mean 170cm, std 10cm
heights = np.random.normal(loc=170, scale=10, size=10000)

within_1_std = np.mean((heights > 160) & (heights < 180))
print("Share within 1 std (160-180cm):", round(within_1_std, 3))  # ~0.68

# How rare is someone taller than 190cm (2 std above)?
print("Taller than 190cm:", round(np.mean(heights > 190), 3))      # ~0.025`,
      explanation:
        "We generate a bell-shaped crowd of heights and confirm the 68% rule live, then measure how rare a 190cm person is — just 2.5%, matching the far-right tail.",
    },
    exercise: {
      prompt: "Using the same simulated heights, compute the fraction of people SHORTER than 150cm (2 std below the mean).",
      starter: `import numpy as np
heights = np.random.normal(loc=170, scale=10, size=10000)
# TODO: fraction shorter than 150cm
share_short = ...
print(share_short)`,
      solution: `import numpy as np
heights = np.random.normal(loc=170, scale=10, size=10000)
share_short = np.mean(heights < 150)
print(share_short)  # ~0.025, the mirror-image far-left tail`,
    },
    quiz: [
      {
        question: "The Normal (bell curve) distribution is fully described by which two numbers?",
        options: [
          "Minimum and maximum",
          "Mean and standard deviation",
          "Median and mode",
          "Count and sum",
        ],
        answerIndex: 1,
        explanation:
          "The mean fixes where the peak sits and the standard deviation fixes how wide/flat the bell is. Those two alone define the whole curve.",
      },
      {
        question: "Household income typically has a long tail of a few very high earners. What shape is that?",
        options: ["Perfectly Normal", "Uniform", "Right-skewed", "There is no shape"],
        answerIndex: 2,
        explanation:
          "A long tail stretching to the right (toward big values) is a right-skewed distribution — which is exactly why we report median income, not mean.",
      },
      {
        question: "In a Normal distribution, roughly what percent of values lie within 2 standard deviations of the mean?",
        options: ["50%", "68%", "95%", "100%"],
        answerIndex: 2,
        explanation:
          "The 68–95–99.7 rule: about 95% of values fall within two standard deviations of the mean.",
      },
    ],
    flashcards: [
      { front: "Distribution", back: "The shape your data makes when you plot how often each value occurs (e.g. a histogram)." },
      { front: "Normal distribution", back: "The symmetric bell curve, defined by its mean and standard deviation. Very common in nature." },
      { front: "Skew", back: "A distribution leaning to one side with a long tail (right-skew = tail of big values)." },
      { front: "Uniform distribution", back: "A flat distribution where every value is equally likely, like a fair die." },
    ],
    miniProject: {
      title: "Spot the Shape",
      brief: "Collect real data and identify which distribution it forms.",
      steps: [
        "Pick something to measure 30+ times: word counts of emails, prices in a category, or dice rolls.",
        "Plot a histogram with matplotlib.",
        "Decide: is it bell-shaped, skewed, or roughly uniform?",
        "Explain in one sentence what that shape means for anyone using the data.",
      ],
    },
    industryUse: [
      "Standardized tests like the SAT are scaled to a Normal distribution so scores map cleanly to percentiles",
      "Banks model credit-risk and returns with distributions to estimate the odds of rare, extreme losses",
      "Manufacturers at firms like Intel assume a Normal spread of part measurements to set acceptance limits",
    ],
    commonMistakes: [
      "Assuming everything is Normal. Income, wealth, and wait-times are usually skewed — plot a histogram before you trust the bell.",
      "Reporting a mean and std for wildly skewed data, implying a symmetry that isn't there. Fix: name the shape first.",
      "Confusing a distribution (the shape of many values) with a single data point. A distribution describes the whole crowd.",
    ],
    interviewQuestions: [
      "What two parameters define a Normal distribution, and what does each control?",
      "How would you tell whether a dataset is Normally distributed or skewed?",
      "Give a real-world example of a right-skewed distribution and explain the implication.",
    ],
    papers: [],
    nextUp: ["stats-probability-basics", "stats-sampling"],
    cheatsheet: [
      "Distribution = the shape data makes when it piles up",
      "Normal = bell curve, set by mean + std",
      "68 / 95 / 99.7 within 1 / 2 / 3 std",
      "Right-skew = long tail of big values (income)",
      "Uniform = flat, all values equally likely (fair die)",
      "np.random.normal(mean, std, size)",
    ],
  },

  "stats-probability-basics": {
    story:
      "You're about to cross a busy road and your brain silently runs a calculation: how likely is that car to reach me before I make it across? You don't panic; you just weigh the chances and step out. Probability is nothing more than putting a clean number on that everyday gut-sense of 'how likely.' We turn vague words like 'probably,' 'no chance,' and 'maybe' into a number between 0 (impossible) and 1 (certain) — so we can reason about uncertainty without our fears or hopes hijacking the answer.",
    problem:
      "Life is full of uncertainty, and human intuition about it is famously terrible — we overrate dramatic risks and underrate boring ones. We need a precise, shared language for 'how likely,' so we can compare risks, make fair bets, and stop arguing about words like 'probably.'",
    analogy:
      "Probability is a weather forecast for any event: '70% chance of rain' means if today repeated 100 times, it'd rain on about 70 of them. It's not a promise — it's a long-run frequency.",
    explanation: [
      "A probability is a number from 0 to 1. 0 means it never happens, 1 means it always happens, 0.5 is a coin-flip. Multiply by 100 to get the familiar percentage.",
      "For equally likely outcomes, probability = (favourable outcomes) / (total outcomes). Rolling a 4 on a die is 1/6 because one face out of six equally likely faces works.",
      "Probabilities of all possible outcomes always add up to 1 — something must happen. So P(not raining) = 1 − P(raining). This 'complement' trick is a shortcut you'll use constantly.",
      "For INDEPENDENT events (one doesn't affect the other), the chance of both happening is the product: two coin flips both landing heads is 1/2 × 1/2 = 1/4.",
      "Watch out for 'or': the chance of A OR B is P(A) + P(B) only if they can't both happen. If they can overlap, you'd double-count the overlap.",
      "The single biggest trap is confusing 'unlikely' with 'impossible.' A 1-in-1000 event WILL happen if you run the trial 10,000 times. Rare is not never.",
    ],
    math: "For equally likely outcomes: P(event) = favourable outcomes / total outcomes. Complement: P(not A) = 1 − P(A). Two independent events: P(A and B) = P(A) × P(B).",
    code: {
      language: "python",
      source: `import numpy as np

# Flip a fair coin 100,000 times and measure the probability of heads
flips = np.random.choice(["H", "T"], size=100000)
print("P(heads) approx:", np.mean(flips == "H"))   # ~0.5

# Probability of rolling two dice and BOTH showing 6
d1 = np.random.randint(1, 7, size=100000)
d2 = np.random.randint(1, 7, size=100000)
print("P(double six) approx:", np.mean((d1 == 6) & (d2 == 6)))  # ~1/36 = 0.028`,
      explanation:
        "Instead of trusting a formula blindly, we simulate the events many times and let reality reveal the probability. Double-six lands near 1/36, exactly as the multiply rule predicts.",
    },
    exercise: {
      prompt: "Estimate the probability that a single die roll is EVEN (2, 4, or 6) by simulating 100,000 rolls.",
      starter: `import numpy as np
rolls = np.random.randint(1, 7, size=100000)
# TODO: fraction of rolls that are even
p_even = ...
print(p_even)`,
      solution: `import numpy as np
rolls = np.random.randint(1, 7, size=100000)
p_even = np.mean(rolls % 2 == 0)
print(p_even)  # ~0.5, since 3 of 6 faces are even`,
    },
    quiz: [
      {
        question: "You flip a fair coin twice. What's the probability of getting heads BOTH times?",
        options: ["1/2", "1/3", "1/4", "1"],
        answerIndex: 2,
        explanation:
          "The flips are independent, so multiply: 1/2 × 1/2 = 1/4. Each flip has no memory of the other.",
      },
      {
        question: "If the probability of rain today is 0.3, what's the probability it does NOT rain?",
        options: ["0.3", "0.7", "0.5", "It can't be known"],
        answerIndex: 1,
        explanation:
          "Probabilities of all outcomes sum to 1, so P(no rain) = 1 − 0.3 = 0.7. This is the complement rule.",
      },
      {
        question: "A lottery has a 1-in-a-million chance of winning per ticket. Which statement is correct?",
        options: [
          "Winning is impossible",
          "It's unlikely for one ticket, but across millions of tickets someone probably wins",
          "Buying two tickets makes it a certainty",
          "Probability doesn't apply to lotteries",
        ],
        answerIndex: 1,
        explanation:
          "Rare is not impossible. One ticket is very unlikely to win, but run enough independent trials and rare events do happen.",
      },
    ],
    flashcards: [
      { front: "Probability", back: "A number from 0 (impossible) to 1 (certain) measuring how likely an event is." },
      { front: "Complement rule", back: "P(not A) = 1 − P(A). The chances of everything sum to 1." },
      { front: "Independent events", back: "Events where one doesn't affect the other; P(both) = P(A) × P(B)." },
      { front: "Long-run frequency", back: "Probability as the fraction of times an event happens if you repeat the trial many times." },
    ],
    miniProject: {
      title: "Beat Your Gut",
      brief: "Find a case where your intuition about probability is wrong, then prove it with simulation.",
      steps: [
        "Pick a puzzle: e.g. 'in a room of 23 people, what's the chance two share a birthday?'",
        "Write down your gut guess first.",
        "Simulate it 100,000 times in Python and measure the true probability.",
        "Compare — the birthday answer (~50%!) usually shocks people.",
      ],
    },
    industryUse: [
      "Insurance companies price every policy using probabilities of accidents, illness, and death",
      "Weather services like the Met Office issue probabilistic forecasts ('60% chance of rain') rather than yes/no",
      "Casinos and betting exchanges set odds directly from event probabilities to guarantee a long-run edge",
    ],
    commonMistakes: [
      "Treating 'unlikely' as 'impossible.' Rare events happen when trials repeat. Fix: think in long-run frequencies.",
      "Multiplying probabilities of events that aren't actually independent (e.g. two related outcomes). Check independence first.",
      "The gambler's fallacy: thinking a coin is 'due' for heads after a run of tails. Independent flips have no memory.",
    ],
    interviewQuestions: [
      "What's the probability of rolling at least one 6 in four rolls of a die?",
      "Explain the difference between independent and mutually exclusive events.",
      "Why is it dangerous to treat a low-probability event as impossible?",
    ],
    papers: [],
    nextUp: ["stats-sampling", "stats-distributions"],
    cheatsheet: [
      "Probability lives in [0, 1]; ×100 for a percentage",
      "P(event) = favourable / total (equally likely)",
      "P(not A) = 1 − P(A)",
      "Independent: P(A and B) = P(A) × P(B)",
      "Rare is NOT impossible — repeat enough and it happens",
      "Simulate with np.random to check your intuition",
    ],
  },

  "stats-sampling": {
    story:
      "A cook tasting a giant pot of soup doesn't drink the whole pot to check the salt — they stir well and taste one spoonful. That single spoonful tells them about the entire pot, as long as it was stirred. That's sampling: learning about a huge group (the pot) from a small, well-mixed handful (the spoon). And here's the near-magical part, the Central Limit Theorem: if you take many spoonfuls and average each, those averages themselves form a tidy bell curve — even if the soup's ingredients were lumpy and chaotic. That one fact is the quiet engine behind almost all of statistics.",
    problem:
      "You can't survey every human, test every light bulb, or drink the whole pot. You must judge a giant 'population' from a small 'sample' — but how do you know the spoonful represents the pot, and how much can a single sample's average be trusted? Get this wrong and you'll confidently generalize from a biased handful.",
    analogy:
      "Sampling is tasting one stirred spoonful to judge the whole pot. The Central Limit Theorem is the surprise that if many cooks each average their own spoonful, all those averages line up into a neat bell curve.",
    explanation: [
      "The POPULATION is everyone/everything you care about; the SAMPLE is the smaller group you actually measure. Good conclusions require the sample to fairly represent the population.",
      "The golden rule is RANDOM, unbiased sampling — like stirring the soup. If you only sample your friends, or only daytime shoppers, your spoonful tastes nothing like the whole pot (that's sampling bias).",
      "Any single sample's average won't exactly equal the true population average — it'll be a bit off by luck. That wobble is 'sampling variability,' and bigger samples wobble less.",
      "The CENTRAL LIMIT THEOREM (CLT) is the headline act: if you take many samples and record each one's average, those averages form a Normal (bell) distribution centered on the true population mean — no matter how weird the original data's shape was.",
      "This is why bell curves rule statistics: even skewed, lumpy data produces bell-shaped sample averages. That lets us use tidy Normal-curve maths to say how confident we are (next lessons: confidence intervals and hypothesis tests).",
      "Bigger samples give tighter, more trustworthy averages. The spread of those sample averages shrinks as the sample size grows — roughly with the square root of the sample size, so quadrupling your sample halves the wobble.",
    ],
    math: "A sample mean estimates the population mean. By the Central Limit Theorem, sample means are approximately Normal, centered on the true mean, with a spread (the 'standard error') of the population std divided by the square root of the sample size.",
    code: {
      language: "python",
      source: `import numpy as np

# A wildly skewed population (incomes): NOT bell-shaped at all
population = np.random.exponential(scale=50000, size=1000000)

# Take 5,000 samples of size 100 each, and record each sample's mean
sample_means = [np.mean(np.random.choice(population, size=100)) for _ in range(5000)]

print("True population mean:", round(population.mean()))
print("Average of sample means:", round(np.mean(sample_means)))   # very close!
print("Are the sample means bell-shaped? Plot them and see.")`,
      explanation:
        "The raw incomes are heavily skewed, yet the 5,000 sample means pile up into a neat bell centered on the true mean — the Central Limit Theorem in action.",
    },
    exercise: {
      prompt: "Increase the sample size from 100 to 400 and check that the spread (std) of the sample means gets smaller.",
      starter: `import numpy as np
population = np.random.exponential(scale=50000, size=1000000)
# TODO: use size=400 instead of 100
sample_means = [np.mean(np.random.choice(population, size=...)) for _ in range(5000)]
print("Spread of sample means:", round(np.std(sample_means)))`,
      solution: `import numpy as np
population = np.random.exponential(scale=50000, size=1000000)
sample_means = [np.mean(np.random.choice(population, size=400)) for _ in range(5000)]
print("Spread of sample means:", round(np.std(sample_means)))  # about half of the size-100 spread`,
    },
    quiz: [
      {
        question: "The Central Limit Theorem says that the AVERAGES of many samples will be…",
        options: [
          "Exactly equal to each other",
          "Approximately Normal (bell-shaped), even if the original data isn't",
          "Always skewed like the population",
          "Impossible to predict",
        ],
        answerIndex: 1,
        explanation:
          "No matter the shape of the underlying data, the distribution of sample means is approximately Normal and centered on the true mean.",
      },
      {
        question: "You survey only visitors to a luxury mall to estimate the average income of a whole city. What's the flaw?",
        options: [
          "The sample is too random",
          "Sampling bias — the spoonful doesn't represent the pot",
          "Nothing, it's a fine method",
          "The sample is too large",
        ],
        answerIndex: 1,
        explanation:
          "Luxury-mall visitors skew wealthy, so this un-stirred spoonful misrepresents the whole city. Random sampling is essential.",
      },
      {
        question: "What happens to the spread of sample means as you make each sample larger?",
        options: [
          "It grows",
          "It shrinks — bigger samples give more reliable averages",
          "It stays exactly the same",
          "It becomes negative",
        ],
        answerIndex: 1,
        explanation:
          "Larger samples wobble less; the standard error shrinks with the square root of the sample size, so estimates get more precise.",
      },
    ],
    flashcards: [
      { front: "Population vs sample", back: "Population = everyone you care about; sample = the smaller group you actually measure." },
      { front: "Sampling bias", back: "When your sample doesn't represent the population (an un-stirred spoonful)." },
      { front: "Central Limit Theorem", back: "Sample means form a bell curve centered on the true mean, whatever the data's shape." },
      { front: "Standard error", back: "The spread of sample means; shrinks as sample size grows (with the square root)." },
    ],
    miniProject: {
      title: "The Spoonful Proof",
      brief: "Watch the Central Limit Theorem turn chaos into a bell curve with your own eyes.",
      steps: [
        "Create a deliberately weird, non-bell population (e.g. dice sums, or exponential incomes).",
        "Draw 2,000 samples of size 30 and record each mean.",
        "Plot a histogram of the sample means with matplotlib.",
        "Confirm it looks like a bell and is centered on the true mean, then write one sentence on why that's remarkable.",
      ],
    },
    industryUse: [
      "Political pollsters like Gallup estimate an entire nation's opinion from a random sample of ~1,000 people",
      "Factories test a random sample of products for defects rather than inspecting every single unit",
      "Netflix and other companies run experiments on a random sample of users, then generalize to everyone",
    ],
    commonMistakes: [
      "Non-random ('convenience') sampling — surveying whoever's easy to reach. Fix: sample randomly to avoid bias.",
      "Believing a small sample is worthless or a huge sample is perfect. Size helps, but a biased big sample is still wrong.",
      "Thinking the CLT makes your ORIGINAL data bell-shaped. It only makes the sample MEANS bell-shaped.",
    ],
    interviewQuestions: [
      "State the Central Limit Theorem in plain English and explain why it matters.",
      "What is sampling bias, and how do you guard against it?",
      "How does sample size affect the reliability of an estimate?",
    ],
    papers: [],
    nextUp: ["stats-ci", "stats-hypothesis"],
    cheatsheet: [
      "Population = whole pot · Sample = one spoonful",
      "Always sample RANDOMLY (stir first) to avoid bias",
      "CLT: sample means form a bell curve on the true mean",
      "…true even if the raw data is skewed or lumpy",
      "Bigger sample → tighter, more trustworthy average",
      "Standard error shrinks with √(sample size)",
    ],
  },

  "stats-ci": {
    story:
      "A pollster announces '52% of voters support the new park, plus or minus 3 points.' Notice they didn't say a flat '52%' — they wrapped it in a cushion: 'somewhere between 49% and 55%.' That cushion is a confidence interval, and it's one of the most honest things in all of statistics. Because you measured a sample and not every single voter, you can't claim one exact number; instead you give a sensible RANGE and state how confident you are that the truth lives inside it. It's the difference between a nervous guess and a grown-up estimate.",
    problem:
      "Any number you calculate from a sample — an average, a percentage — is a little bit off from the true value by pure luck of the draw. Reporting a single crisp figure pretends to a precision you don't have. You need a way to say 'the real answer is probably in THIS range,' and to attach a confidence level to that claim.",
    analogy:
      "A confidence interval is like a weather forecaster saying 'tomorrow's high will be 20 to 24 degrees,' not a falsely precise '22.0.' The range admits the uncertainty honestly, while still being useful.",
    explanation: [
      "A confidence interval (CI) is a RANGE around your estimate — like 49% to 55% — that probably contains the true population value.",
      "It comes with a confidence LEVEL, usually 95%. The careful meaning: if you repeated the whole study many times, about 95% of the intervals you'd build would capture the true value.",
      "The width of the interval depends on two things: how spread out the data is (more spread = wider) and how big your sample is (bigger sample = narrower, more precise).",
      "The '± part' is the MARGIN OF ERROR. A '52% ± 3%' poll has a 3-point margin, giving the 49–55% interval. Newspapers quote this constantly.",
      "Use CIs whenever you estimate something from a sample: an average delivery time, a conversion rate, a drug's effect. Reporting a bare number without a CI hides how uncertain you really are.",
      "Common trap: a 95% CI does NOT mean 'there's a 95% chance the true value is in THIS particular interval.' The true value is fixed; it's our intervals that vary. In practice, though, treating it as a sensible plausible range works fine.",
    ],
    math: "A confidence interval is estimate ± margin of error. For a 95% interval, the margin is roughly 2 × the standard error (the standard error being the spread of sample estimates). Bigger samples shrink the standard error, narrowing the interval.",
    code: {
      language: "python",
      source: `import numpy as np

# We sampled 200 delivery times (minutes); estimate the true average with a 95% CI
np.random.seed(0)
sample = np.random.normal(loc=32, scale=8, size=200)

mean = np.mean(sample)
standard_error = np.std(sample, ddof=1) / np.sqrt(len(sample))
margin = 1.96 * standard_error   # 1.96 -> the 95% multiplier

print("Estimate:", round(mean, 1), "minutes")
print("95% CI:", round(mean - margin, 1), "to", round(mean + margin, 1))`,
      explanation:
        "We take the sample average, compute its standard error, and stretch out a 95% cushion of about 1.96 standard errors on each side to get an honest range.",
    },
    exercise: {
      prompt: "Recompute the interval as a 99% CI by swapping the 1.96 multiplier for 2.58, and notice it gets wider.",
      starter: `import numpy as np
np.random.seed(0)
sample = np.random.normal(loc=32, scale=8, size=200)
mean = np.mean(sample)
se = np.std(sample, ddof=1) / np.sqrt(len(sample))
# TODO: use the 99% multiplier
margin = ... * se
print(round(mean - margin, 1), "to", round(mean + margin, 1))`,
      solution: `import numpy as np
np.random.seed(0)
sample = np.random.normal(loc=32, scale=8, size=200)
mean = np.mean(sample)
se = np.std(sample, ddof=1) / np.sqrt(len(sample))
margin = 2.58 * se   # wider, because 99% confidence demands a bigger cushion
print(round(mean - margin, 1), "to", round(mean + margin, 1))`,
    },
    quiz: [
      {
        question: "A poll reports '48% support, margin of error ±4%.' What's the confidence interval?",
        options: ["48% to 52%", "44% to 52%", "44% to 48%", "0% to 48%"],
        answerIndex: 1,
        explanation:
          "The interval is the estimate plus and minus the margin: 48% − 4% = 44% up to 48% + 4% = 52%.",
      },
      {
        question: "What makes a confidence interval NARROWER (more precise)?",
        options: [
          "A smaller sample",
          "A larger sample and/or less spread in the data",
          "A higher confidence level",
          "Removing the margin of error",
        ],
        answerIndex: 1,
        explanation:
          "More data and lower variability both shrink the standard error, tightening the interval. (Higher confidence actually widens it.)",
      },
      {
        question: "Which is the most careful reading of a '95% confidence interval'?",
        options: [
          "The true value is definitely inside this exact range",
          "There's a 95% chance this one interval is right",
          "If we repeated the study many times, ~95% of such intervals would contain the true value",
          "95% of the data lies in this range",
        ],
        answerIndex: 2,
        explanation:
          "Confidence refers to the long-run method: about 95% of the intervals built this way capture the truth. Any single interval either does or doesn't.",
      },
    ],
    flashcards: [
      { front: "Confidence interval", back: "A range around an estimate that probably contains the true population value." },
      { front: "Confidence level", back: "How often the method captures the truth in the long run — commonly 95%." },
      { front: "Margin of error", back: "The ± part of a confidence interval (e.g. ±3%). Half the interval's width." },
      { front: "Standard error", back: "The typical wobble of a sample estimate; smaller with bigger samples, giving tighter intervals." },
    ],
    miniProject: {
      title: "Put a Cushion on It",
      brief: "Turn a single estimate into an honest, confident range.",
      steps: [
        "Measure something 50+ times (page load times, a coffee's price around town, steps per day).",
        "Compute the sample mean and its standard error in Python.",
        "Build a 95% confidence interval (mean ± 1.96 × standard error).",
        "Write your finding as a newspaper would: 'about X, plus or minus Y.'",
      ],
    },
    industryUse: [
      "Every reputable political poll (Gallup, YouGov) reports results with a margin of error / confidence interval",
      "Pharmaceutical trials report a drug's effect as a confidence interval to show the plausible range of benefit",
      "Product teams at Google and Meta report experiment results (like conversion lifts) with confidence intervals",
    ],
    commonMistakes: [
      "Reporting a single number with no interval, implying false precision. Fix: always attach a margin of error.",
      "Misreading a 95% CI as '95% chance this exact interval is right.' The confidence is in the method, not the one interval.",
      "Thinking a wider interval is 'worse.' A wide interval honestly reflects real uncertainty — narrow it with more data, not wishful thinking.",
    ],
    interviewQuestions: [
      "What does a 95% confidence interval actually mean?",
      "Name two things that make a confidence interval narrower.",
      "Why is reporting a point estimate without a confidence interval potentially misleading?",
    ],
    papers: [],
    nextUp: ["stats-hypothesis", "stats-ab-test"],
    cheatsheet: [
      "CI = estimate ± margin of error",
      "95% margin ≈ 1.96 × standard error",
      "Bigger sample → narrower, more precise interval",
      "Higher confidence (99%) → wider interval",
      "Report a RANGE, never a lonely point estimate",
      "'95% confident' is about the method, not one interval",
    ],
  },

  "stats-hypothesis": {
    story:
      "You switch your website's 'Buy' button from grey to green, and sales tick up a little. Cue the champagne? Not yet. The nagging question is: did green REALLY cause more sales, or did you just have a lucky week that would've happened anyway? Hypothesis testing is the courtroom procedure statisticians use to answer exactly that. It starts by assuming the boring explanation ('green did nothing, it was luck'), then asks: how surprising is the result we saw, IF that boring story were true? The p-value is the measure of that surprise — and it's the most misunderstood number in all of statistics.",
    problem:
      "Real data is noisy, so almost any change will look like it 'did something.' Humans are wired to see meaning in random noise. You need a disciplined way to separate a genuine effect from a coincidence — before you bet the business on green buttons.",
    analogy:
      "Hypothesis testing is a courtroom. The 'null hypothesis' (nothing happened, it's just luck) is presumed innocent. Your data is the evidence, and the p-value tells you how strong that evidence is against innocence — beyond reasonable doubt, or nothing to see here?",
    explanation: [
      "You always start with the NULL HYPOTHESIS: the sceptical, boring claim that there's NO real effect — the difference you saw is just random luck.",
      "The ALTERNATIVE hypothesis is what you actually suspect: 'green really does sell more.' The test's job is to see whether the evidence is strong enough to reject the boring null.",
      "The P-VALUE answers one precise question: IF the null were true (green did nothing), what's the probability of seeing a result at least as extreme as ours, purely by chance? A tiny p-value means 'this would be a wild coincidence if nothing were happening.'",
      "By convention, if the p-value is below 0.05 (a 1-in-20 fluke), we call the result 'statistically significant' and reject the null. 0.05 is just a customary threshold, not a law of nature.",
      "CRUCIAL: a p-value is NOT 'the probability the null is true,' and it does NOT tell you the effect is big or important. A tiny effect can be 'significant' with enough data; a huge effect can be 'insignificant' with too little.",
      "Two ways to be wrong: a FALSE POSITIVE (crying 'green works!' when it was luck) and a FALSE NEGATIVE (missing a real effect). The 0.05 threshold is a deliberate dial controlling how often you risk a false positive.",
    ],
    math: "The p-value is the probability of observing a result at least as extreme as yours, assuming the null hypothesis (no effect) is true. If p < 0.05, the result is conventionally called statistically significant and the null is rejected.",
    code: {
      language: "python",
      source: `from scipy import stats

# Conversion: grey button 120/2000 buyers, green button 155/2000 buyers
# Is green genuinely better, or luck?
grey = [1]*120 + [0]*1880       # 1 = bought, 0 = didn't
green = [1]*155 + [0]*1845

t_stat, p_value = stats.ttest_ind(green, grey)
print("p-value:", round(p_value, 4))
print("Significant?" , "Yes, reject the null" if p_value < 0.05 else "No, could be luck")`,
      explanation:
        "We ask: if grey and green really performed the same, how likely is a gap this big? A small p-value (below 0.05) says the gap is too big to shrug off as chance.",
    },
    exercise: {
      prompt: "Change green's buyers from 155 to just 128 (a tiny lift) and see whether the result is still statistically significant.",
      starter: `from scipy import stats
grey = [1]*120 + [0]*1880
# TODO: make green 128 buyers out of 2000
green = [1]*... + [0]*...
t_stat, p_value = stats.ttest_ind(green, grey)
print(round(p_value, 4))`,
      solution: `from scipy import stats
grey = [1]*120 + [0]*1880
green = [1]*128 + [0]*1872
t_stat, p_value = stats.ttest_ind(green, grey)
print(round(p_value, 4))  # now well above 0.05 -> not significant, could be luck`,
    },
    quiz: [
      {
        question: "What does the NULL hypothesis usually claim?",
        options: [
          "That your new idea definitely works",
          "That there is NO real effect — any difference is just luck",
          "That the data is wrong",
          "That the sample is too small",
        ],
        answerIndex: 1,
        explanation:
          "The null is the sceptical default: no effect, no difference. The test looks for evidence strong enough to reject it.",
      },
      {
        question: "A p-value of 0.03 means…",
        options: [
          "There's a 3% chance the null hypothesis is true",
          "IF the null were true, there's only a 3% chance of seeing a result this extreme",
          "The effect is 3% in size",
          "The result is 97% certain to be correct",
        ],
        answerIndex: 1,
        explanation:
          "The p-value is the probability of the data (or more extreme) GIVEN the null — not the probability the null itself is true, and not the effect size.",
      },
      {
        question: "You get p = 0.20. Using the usual 0.05 threshold, what do you conclude?",
        options: [
          "Strong evidence the effect is real",
          "Not enough evidence to reject the null — the difference could be chance",
          "The null hypothesis is definitely true",
          "The experiment failed and is unusable",
        ],
        answerIndex: 1,
        explanation:
          "p = 0.20 is above 0.05, so we fail to reject the null. That doesn't PROVE no effect — it just means the evidence isn't strong enough to rule out luck.",
      },
    ],
    flashcards: [
      { front: "Null hypothesis", back: "The boring default claim that there's no real effect; any difference is just luck." },
      { front: "p-value", back: "The chance of seeing a result at least this extreme IF the null were true. Small = surprising." },
      { front: "Statistical significance", back: "By convention, a result with p < 0.05 — unlikely enough to reject the null." },
      { front: "False positive", back: "Concluding an effect is real when it was actually just random chance." },
    ],
    miniProject: {
      title: "Luck or Real?",
      brief: "Run a simple hypothesis test on data you generate.",
      steps: [
        "Simulate two groups (e.g. two dice you claim are different) with 100 rolls each.",
        "Run a t-test with scipy.stats.ttest_ind to get a p-value.",
        "Decide: significant (p < 0.05) or not?",
        "Repeat with truly identical groups and confirm you usually get p > 0.05 — proving the method resists false alarms.",
      ],
    },
    industryUse: [
      "Tech companies (Netflix, Booking.com) run thousands of A/B tests and use p-values to decide which features ship",
      "Drug regulators like the FDA require statistically significant trial results before approving a medicine",
      "Manufacturers use hypothesis tests to check whether a process change genuinely reduced defect rates",
    ],
    commonMistakes: [
      "Reading p-value as 'the probability the result is a fluke' or 'the probability the null is true.' It's neither. Fix: it's P(data this extreme | null true).",
      "Confusing statistical significance with importance. A tiny, useless effect can be 'significant' with a huge sample. Report the effect size too.",
      "'p-hacking' — running many tests and reporting only the ones that hit p < 0.05. That manufactures false positives.",
    ],
    interviewQuestions: [
      "Explain what a p-value is and, just as importantly, what it is NOT.",
      "What's the difference between statistical significance and practical significance?",
      "What are Type I and Type II errors, and how does the 0.05 threshold relate to them?",
    ],
    papers: [
      { title: "The ASA Statement on p-Values: Context, Process, and Purpose", url: "https://www.tandfonline.com/doi/full/10.1080/00031305.2016.1154108", year: 2016 },
    ],
    nextUp: ["stats-ab-test", "stats-ci"],
    cheatsheet: [
      "Null = 'no effect, it's just luck' (presumed innocent)",
      "p-value = P(data this extreme | null is true)",
      "p < 0.05 → reject the null ('significant')",
      "p is NOT the chance the null is true",
      "Significant ≠ important — check the effect size",
      "scipy.stats.ttest_ind(a, b) → t, p",
    ],
  },

  "stats-ab-test": {
    story:
      "Your online store's checkout page has an old grey 'Complete Purchase' button, and someone swears a green one would sell more. Instead of arguing over opinions, you run the experiment properly: for two weeks, half your visitors (at random) see grey and half see green, and you count who actually buys. At the end you don't just eyeball which number is bigger — you run the full statistical machinery from this course to decide whether green truly won or just got lucky. That's an A/B test, and it's how the biggest companies on earth settle 'which version is better' without guessing.",
    problem:
      "Teams waste months and fortunes launching changes based on gut feeling, the loudest voice in the room, or a bump that was pure noise. You need a rigorous, repeatable way to compare two versions of ANYTHING — a button, an email subject, a price — and know, with real evidence, which one is genuinely better.",
    analogy:
      "An A/B test is a taste-test at a supermarket: two unlabelled cups, customers randomly try one, and you tally which gets more thumbs-up. Randomness keeps it fair; counting keeps it honest.",
    explanation: [
      "SPLIT randomly: each visitor is assigned to version A (control, the current design) or version B (the new idea) by a coin flip. Random assignment is what makes the two groups comparable.",
      "DEFINE one clear metric BEFORE you start — usually a conversion rate (bought / visited). Deciding the metric afterward invites cheating (you'd cherry-pick whatever looks good).",
      "COLLECT enough data. Too few visitors and even a real difference hides in the noise; this ties straight back to sample size and the Central Limit Theorem.",
      "COMPARE with a hypothesis test: the null says 'A and B convert equally; any gap is luck.' A small p-value (below 0.05) says B's lead is too big to be chance.",
      "REPORT a confidence interval on the difference, not just a winner. '+1.8% conversion, 95% CI +0.5% to +3.1%' tells you both the size of the win and how sure you are.",
      "This one project stitches together everything: sampling (random split), the CLT (why the averages behave), confidence intervals (the plausible lift), and hypothesis testing (real vs luck).",
    ],
    math: "Compare the conversion rate of A versus B. The null hypothesis is that they're equal; a hypothesis test yields a p-value. If p < 0.05, the difference is statistically significant, and a confidence interval shows the plausible size of the lift.",
    code: {
      language: "python",
      source: `from scipy import stats
import numpy as np

# Two-week A/B test results
# Version A (grey): 2000 visitors, 240 bought  -> 12.0%
# Version B (green): 2000 visitors, 300 bought -> 15.0%
a = np.array([1]*240 + [0]*1760)
b = np.array([1]*300 + [0]*1700)

print("A conversion:", a.mean(), " B conversion:", b.mean())
t, p = stats.ttest_ind(b, a)
print("p-value:", round(p, 4))
print("Winner:", "Green (B), and it's significant" if p < 0.05 else "Too close to call")`,
      explanation:
        "Green converts 15% vs grey's 12%. The t-test asks whether a 3-point gap this size could be luck; a p-value under 0.05 says no — green genuinely wins.",
    },
    exercise: {
      prompt: "Add a 95% confidence interval for the difference in conversion rates (B − A) using the standard-error formula.",
      starter: `import numpy as np
a = np.array([1]*240 + [0]*1760)
b = np.array([1]*300 + [0]*1700)
diff = b.mean() - a.mean()
# standard error of a difference in proportions:
se = np.sqrt(a.var(ddof=1)/len(a) + b.var(ddof=1)/len(b))
# TODO: 95% CI = diff plus/minus 1.96 * se
low, high = ...
print(round(low, 4), "to", round(high, 4))`,
      solution: `import numpy as np
a = np.array([1]*240 + [0]*1760)
b = np.array([1]*300 + [0]*1700)
diff = b.mean() - a.mean()
se = np.sqrt(a.var(ddof=1)/len(a) + b.var(ddof=1)/len(b))
low, high = diff - 1.96*se, diff + 1.96*se
print(round(low, 4), "to", round(high, 4))  # a positive range -> green really lifts sales`,
    },
    quiz: [
      {
        question: "Why must visitors be assigned to A or B RANDOMLY?",
        options: [
          "To make the code run faster",
          "So the two groups are comparable and no hidden factor favours one version",
          "Because random numbers are required by law",
          "To reduce the number of visitors needed",
        ],
        answerIndex: 1,
        explanation:
          "Random assignment balances out hidden differences (device, time of day, user type) so any gap in results is due to the version, not the crowd.",
      },
      {
        question: "In an A/B test, what does the null hypothesis state?",
        options: [
          "Version B is definitely better",
          "Versions A and B convert equally; any difference is just luck",
          "The test should be stopped early",
          "The sample is biased",
        ],
        answerIndex: 1,
        explanation:
          "The sceptical null assumes no real difference. The test looks for evidence (a small p-value) strong enough to reject it in B's favour.",
      },
      {
        question: "You peek at the results daily and stop the test the moment green is ahead. Why is this a problem?",
        options: [
          "It saves too much time",
          "Stopping at a lucky moment inflates false positives — you'll 'find' wins that aren't real",
          "It makes the confidence interval narrower",
          "There is no problem with it",
        ],
        answerIndex: 1,
        explanation:
          "Early stopping on a favourable peek is a form of p-hacking. Random noise will eventually put B ahead by chance; commit to a sample size in advance.",
      },
    ],
    flashcards: [
      { front: "A/B test", back: "A controlled experiment comparing two versions (A vs B) by randomly splitting users and measuring a metric." },
      { front: "Control vs variant", back: "Control (A) is the current version; the variant (B) is the new idea being tested against it." },
      { front: "Conversion rate", back: "The metric in most A/B tests: the fraction of users who took the desired action (e.g. bought)." },
      { front: "Peeking / early stopping", back: "Repeatedly checking and stopping when you like the result — inflates false positives." },
    ],
    miniProject: {
      title: "Run Your Own A/B Test",
      brief: "Take a fake experiment from raw counts all the way to a confident verdict.",
      steps: [
        "Invent two versions with visitor and buyer counts (e.g. A: 240/2000, B: 300/2000).",
        "Compute both conversion rates and the lift (B − A).",
        "Run a t-test for the p-value and decide significance at 0.05.",
        "Build a 95% confidence interval for the lift.",
        "Write a one-paragraph recommendation: ship it, kill it, or keep testing — and why.",
      ],
    },
    industryUse: [
      "Booking.com and Amazon run thousands of A/B tests a year on layouts, copy, and prices to squeeze out conversions",
      "Netflix A/B tests thumbnail artwork and homepage rows to decide what actually keeps people watching",
      "Political campaigns and email marketers A/B test subject lines to maximize open and click rates",
    ],
    commonMistakes: [
      "Peeking at results and stopping early when you like them. Fix: pick a sample size / end date in advance and stick to it.",
      "Testing too many changes at once (new colour AND new text AND new price) so you can't tell what caused the effect. Change one thing.",
      "Declaring a winner from a tiny sample where the difference is well within the noise. Check the p-value AND the confidence interval.",
    ],
    interviewQuestions: [
      "Walk me through how you'd design and analyze an A/B test from scratch.",
      "Why is random assignment critical, and what goes wrong without it?",
      "What is 'peeking,' and why does it invalidate an A/B test?",
    ],
    papers: [
      { title: "Trustworthy Online Controlled Experiments (Kohavi, Tang, Xu)", url: "https://experimentguide.com/", year: 2020 },
    ],
    nextUp: ["stats-hypothesis", "stats-ci"],
    cheatsheet: [
      "A/B test = random split + one clear metric",
      "Control (A) = current · Variant (B) = new idea",
      "Null: A and B convert equally (gap is luck)",
      "p < 0.05 → real winner; else too close to call",
      "Report the lift WITH a 95% confidence interval",
      "Never peek-and-stop; fix the sample size upfront",
    ],
  },
};
