import type { LessonBody } from "@/types";

export const neural: Record<string, LessonBody> = {
  "forward-pass": {
    story:
      "Think of a factory assembly line making a decision about a photo. At the first station, a few workers each look at the raw pixels, jot down a score, and pass their notes forward. At the next station, new workers read those notes, combine them, and write fresh notes. Station after station, the notes get smarter — until the last worker at the end holds up a card that says 'this is a cat, 92% sure'. That whole left-to-right trip is the forward pass: data walks through the network, one layer at a time, and pops out as a prediction.",
    problem:
      "A neural network is just a big pile of numbers (weights) until something actually pushes data through it. You need a clear, repeatable recipe that turns raw inputs into an answer — otherwise the network can't make a single prediction, and later it can't even know if it was wrong.",
    analogy:
      "It's a bucket-brigade at a fire: each person (layer) takes the water (numbers) from the person behind, does one simple thing to it, and hands it forward — until it reaches the fire (the output).",
    explanation: [
      "Each layer does two tiny steps: first a weighted sum (multiply every incoming number by its weight, add them up, add a bias), then an activation (squash that sum through a function like ReLU or sigmoid).",
      "The output of one layer becomes the input to the next. That's the whole trick — you just repeat the same two steps, layer after layer.",
      "The very first inputs are your raw data (pixels, numbers, words-as-numbers). The very last output is the prediction (a probability, a price, a label).",
      "Nothing 'learns' during the forward pass. It's pure calculation, like running a spreadsheet formula. Learning happens later, when we check the answer and go backward (backprop).",
      "Use this mental model whenever you're confused about a network: data always flows forward, one layer feeding the next, numbers in → numbers out.",
      "In real code you rarely write loops for this — matrix multiplication does a whole layer at once, which is why GPUs (great at big multiplications) make networks fast.",
    ],
    visualization: { type: "neuron" },
    math: "For each layer: z = W·x + b (weighted sum), then a = activation(z). The a from one layer is the x of the next, all the way to the output.",
    code: {
      language: "python",
      source: `import numpy as np

def relu(z):
    return np.maximum(0, z)

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

# One input example with 3 features
x = np.array([0.5, -0.2, 0.1])

# Layer 1: 3 inputs -> 2 neurons
W1 = np.array([[0.2, 0.8, -0.5],
               [0.1, -0.3, 0.9]])
b1 = np.array([0.0, 0.1])

# Layer 2: 2 inputs -> 1 output
W2 = np.array([[1.2, -0.7]])
b2 = np.array([0.05])

# --- Forward pass ---
z1 = W1.dot(x) + b1      # weighted sum, layer 1
a1 = relu(z1)            # activation, layer 1
z2 = W2.dot(a1) + b2     # weighted sum, layer 2
a2 = sigmoid(z2)         # activation, layer 2 (final)

print("Hidden layer:", a1)
print("Prediction:", round(float(a2[0]), 3))`,
      explanation:
        "Two layers, done by hand: multiply-and-add, activate, then feed that result into the next layer to get the final probability.",
    },
    exercise: {
      prompt: "Add a third feature-mixing step: change layer 1 to have 3 neurons instead of 2, then make layer 2 accept 3 inputs. Run the forward pass again.",
      starter: `W1 = np.array([[0.2, 0.8, -0.5],
               [0.1, -0.3, 0.9]])   # TODO: add a 3rd row (3rd neuron)
b1 = np.array([0.0, 0.1])           # TODO: add a 3rd bias
W2 = np.array([[1.2, -0.7]])        # TODO: make this accept 3 inputs`,
      solution: `W1 = np.array([[0.2, 0.8, -0.5],
               [0.1, -0.3, 0.9],
               [0.4, 0.2, 0.2]])
b1 = np.array([0.0, 0.1, -0.1])
W2 = np.array([[1.2, -0.7, 0.5]])
z1 = W1.dot(x) + b1
a1 = relu(z1)
z2 = W2.dot(a1) + b2
a2 = sigmoid(z2)
print(round(float(a2[0]), 3))`,
    },
    quiz: [
      {
        question: "What becomes the input to layer 2?",
        options: [
          "The raw data again",
          "The activated output of layer 1",
          "The final prediction",
          "The weights of layer 1",
        ],
        answerIndex: 1,
        explanation: "Each layer feeds its activated output forward to become the next layer's input.",
      },
      {
        question: "What are the two steps every layer performs, in order?",
        options: [
          "Activation, then weighted sum",
          "Weighted sum, then activation",
          "Backprop, then forward pass",
          "Sort, then multiply",
        ],
        answerIndex: 1,
        explanation: "First z = W·x + b (weighted sum + bias), then a = activation(z).",
      },
      {
        question: "Does the network learn during a forward pass?",
        options: [
          "Yes, weights update as data flows",
          "No, it's pure calculation — learning happens in backprop",
          "Only in the last layer",
          "Only if you use ReLU",
        ],
        answerIndex: 1,
        explanation: "The forward pass just computes a prediction. Weights change later, during backpropagation.",
      },
    ],
    flashcards: [
      { front: "Forward pass", back: "Pushing input data through each layer to produce a prediction." },
      { front: "Weighted sum (z)", back: "W·x + b — every input times its weight, summed, plus a bias." },
      { front: "Activation (a)", back: "The squashed result of z; it becomes the next layer's input." },
      { front: "Why matrix multiply", back: "It computes a whole layer of neurons in one shot — fast on GPUs." },
    ],
    miniProject: {
      title: "Trace a Network by Hand",
      brief: "Build a 3-layer forward pass in numpy and print the numbers at every station.",
      steps: [
        "Pick a 4-feature input and invent weights for three layers.",
        "Compute z and a for each layer, printing both.",
        "Watch the numbers shrink to a single output.",
        "Change one weight and see how the final prediction moves.",
      ],
    },
    industryUse: [
      "Netflix runs a forward pass through its recommendation network every time you open the app to rank titles for you.",
      "Tesla's cameras push each frame forward through a vision network to detect lanes and objects in real time.",
      "Banks push a loan application forward through a network to produce a risk score in milliseconds.",
    ],
    commonMistakes: [
      "Mismatching shapes — a layer's weight matrix must have as many columns as the previous layer had outputs, or the multiply fails.",
      "Forgetting the activation between layers, which quietly turns your deep network into one flat linear model.",
    ],
    interviewQuestions: [
      "Walk me through the forward pass of a 2-layer network, naming every operation.",
      "If layer 1 has 100 neurons, what shape must layer 2's weight matrix have?",
      "Why is the forward pass usually written as matrix multiplications instead of loops?",
    ],
    papers: [],
    nextUp: ["backprop", "activation-functions"],
    cheatsheet: [
      "Per layer: z = W·x + b, then a = activation(z)",
      "a of one layer = x of the next",
      "First x = raw data; last a = prediction",
      "No learning here — just calculation",
      "Whole layer = one matrix multiply",
    ],
  },

  "backprop": {
    story:
      "You cook a pot of soup, taste it, and it's too salty. You don't throw it out — you ask 'which knob did this?' Maybe you added too much salt, or too little water, or left it boiling too long. You mentally trace the saltiness back to each ingredient, decide how much each one is to blame, and nudge them for next time. Backpropagation is exactly this: the network tastes its own answer, measures how wrong it is, then walks backward through every weight asking 'how much are you to blame for this mistake?' — and nudges each one a little.",
    problem:
      "A network makes a prediction and it's wrong. Fine — but it has thousands (or billions) of weights. Which ones should change, and by how much? Guessing is hopeless. You need a systematic way to spread the blame for the error across every single weight.",
    analogy:
      "It's adjusting the knobs on a stove after tasting the soup: the taste tells you the total error, and you turn each knob in proportion to how much it caused that error.",
    explanation: [
      "Step 1: measure the error at the output — how far the prediction is from the true answer (this number is the 'loss').",
      "Step 2: pass the blame backward. The output error tells the last layer's weights how wrong they were; they hand a share of the blame to the layer before, and so on to the very first layer.",
      "Step 3: nudge every weight a little in the direction that would have reduced the error — bigger blame means a bigger nudge.",
      "The 'chain rule' is just bookkeeping for the blame: if A affects B and B affects the error, then A's blame = (how B affects error) × (how A affects B). Multiply the links in the chain, layer by layer.",
      "Do this over and over on many examples and the weights slowly settle into values that make good predictions. That slow settling IS learning.",
      "Don't panic about the calculus — libraries like PyTorch compute all these blame-shares automatically (called 'autograd'). Your job is understanding what it's doing, not doing it by hand.",
    ],
    visualization: { type: "gradient-descent" },
    math: "Blame on a weight = ∂Loss/∂w, read as 'how much the loss changes if we wiggle w'. The chain rule multiplies these wiggle-effects backward through the layers. Then update: w ← w − learning_rate × (blame on w).",
    code: {
      language: "python",
      source: `import numpy as np

# A single weight learning y = 2 * x by tasting its own error
x, y_true = 2.0, 4.0     # we WANT output 4 from input 2
w = 0.0                  # start with a bad guess
lr = 0.1                 # learning rate = how big a nudge

for step in range(20):
    y_pred = w * x               # forward: make a prediction
    error  = y_pred - y_true     # taste it: how wrong?
    loss   = error ** 2          # squared error
    grad   = 2 * error * x       # blame on w (the chain rule)
    w      = w - lr * grad       # nudge w to reduce the error
    print(f"step {step:2d}  w={w:.3f}  loss={loss:.3f}")

print("Learned w:", round(w, 3), "(should be ~2.0)")`,
      explanation:
        "One weight tastes its error, computes its blame (grad), and nudges itself. After a few steps w climbs from 0 toward the correct value 2.",
    },
    exercise: {
      prompt: "Make learning faster by raising the learning rate — then push it too high (like 1.5) and watch it explode instead of settle.",
      starter: `lr = 0.1   # TODO: try 0.3, then try 1.5 and watch the loss`,
      solution: `lr = 0.3   # faster but stable; 1.5 makes the loss blow up (diverges)`,
    },
    quiz: [
      {
        question: "What does backpropagation actually compute?",
        options: [
          "The prediction",
          "How much each weight is to blame for the error",
          "The number of layers",
          "The learning rate",
        ],
        answerIndex: 1,
        explanation: "It spreads the output error backward to find each weight's share of blame (its gradient).",
      },
      {
        question: "In the soup analogy, what does 'tasting the soup' correspond to?",
        options: [
          "Adding a new layer",
          "Measuring the error between prediction and truth",
          "Multiplying the weights",
          "Choosing an activation function",
        ],
        answerIndex: 1,
        explanation: "Tasting = measuring the loss, the gap between what you got and what you wanted.",
      },
      {
        question: "What is the chain rule doing here, in plain words?",
        options: [
          "Sorting the weights by size",
          "Multiplying the blame link-by-link backward through the layers",
          "Adding bias to every neuron",
          "Randomly shuffling the data",
        ],
        answerIndex: 1,
        explanation: "It chains together each layer's effect on the next to trace blame from the error back to any weight.",
      },
    ],
    flashcards: [
      { front: "Backpropagation", back: "Passing the output error backward to find each weight's blame (gradient)." },
      { front: "Loss", back: "A single number measuring how wrong the prediction is." },
      { front: "Gradient", back: "How much the loss changes if you wiggle a given weight." },
      { front: "Weight update", back: "w ← w − learning_rate × gradient: nudge each weight to shrink the error." },
    ],
    miniProject: {
      title: "Watch a Weight Learn",
      brief: "Train a single weight to copy a target relationship and plot its journey.",
      steps: [
        "Pick a target rule like y = 3 * x and a starting weight of 0.",
        "Loop: predict, measure error, compute the gradient, nudge the weight.",
        "Print the weight and loss each step.",
        "Try three learning rates and note which learns cleanly vs. explodes.",
      ],
    },
    industryUse: [
      "OpenAI trains its language models by backpropagating the error over trillions of words to tune billions of weights.",
      "Google Photos improves face and object recognition by backprop on huge labeled image sets.",
      "Spotify tunes its recommendation networks with backprop so next-song guesses keep improving.",
    ],
    commonMistakes: [
      "Setting the learning rate too high — the loss explodes instead of settling; lower it until training is stable.",
      "Forgetting to zero out gradients each step in PyTorch, so blame from old steps piles up and corrupts the update.",
    ],
    interviewQuestions: [
      "Explain backpropagation to a non-technical person in under a minute.",
      "What is a gradient, and why do we subtract it from the weight?",
      "What happens if the learning rate is too high? Too low?",
    ],
    papers: [
      { title: "Learning representations by back-propagating errors (Rumelhart, Hinton, Williams)", url: "https://www.nature.com/articles/323533a0", year: 1986 },
    ],
    nextUp: ["activation-functions", "gradient-descent"],
    cheatsheet: [
      "Forward = predict; backward = assign blame",
      "Loss = how wrong the prediction is",
      "Gradient = blame on a weight",
      "Update: w ← w − lr × gradient",
      "Chain rule = multiply blame backward layer by layer",
    ],
  },

  "activation-functions": {
    story:
      "Imagine you stack ten rulers end to end and try to trace a curvy coastline. No matter how you angle them, straight rulers only ever draw one long straight line — you can never bend to follow the coast. A neural network without activation functions is exactly that: stack a hundred layers and it still only draws a straight line. An activation function adds a kink — a little bend — to each neuron. Add enough kinks and suddenly your network can trace any curvy shape it wants: cats, voices, sentences, the coastline.",
    problem:
      "Layers of neurons are just weighted sums, and a sum of sums is still just one big sum — a plain straight line. Without a bend somewhere, stacking more layers gives you exactly zero extra power. You need non-linearity, or deep networks are pointless.",
    analogy:
      "It's the difference between straight uncooked spaghetti and cooked, bendy spaghetti: only the bendy kind can wrap around a complicated shape.",
    explanation: [
      "An activation function is a small non-linear rule applied to each neuron's weighted sum. That non-linearity is the 'kink' that lets layers combine into curves.",
      "ReLU (Rectified Linear Unit) is the plain workhorse: if the number is negative, output 0; otherwise keep it. That single kink at zero is enough — and it's fast.",
      "Sigmoid squashes any number into a smooth 0-to-1 S-curve. It's great for the final layer when you want a probability ('92% cat'), but it's slow to learn deep inside a network.",
      "Use ReLU for hidden layers (fast, rarely stalls). Use sigmoid (or softmax) at the output when you need a probability. Don't stack sigmoids deep — they cause 'vanishing gradients' where learning grinds to a halt.",
      "Prove it to yourself: remove all activations and your 50-layer network collapses into the math of a single straight-line layer. The kink is what buys you depth.",
      "There's a whole zoo (tanh, LeakyReLU, GELU), but ReLU-in-the-middle, sigmoid/softmax-at-the-end covers most real work.",
    ],
    visualization: { type: "neuron" },
    math: "ReLU(z) = max(0, z) — flat for negatives, a straight climb for positives, with a kink at 0. Sigmoid: σ(z) = 1 / (1 + e^(−z)), squashing any z into (0, 1).",
    code: {
      language: "python",
      source: `import numpy as np

def relu(z):
    return np.maximum(0, z)          # negatives -> 0, positives -> unchanged

def sigmoid(z):
    return 1 / (1 + np.exp(-z))      # squashes anything into (0, 1)

z = np.array([-3.0, -0.5, 0.0, 0.5, 3.0])

print("input:  ", z)
print("relu:   ", relu(z))
print("sigmoid:", np.round(sigmoid(z), 3))

# Why non-linearity matters: two linear layers with NO activation
# collapse into one linear layer (still a straight line):
W1, W2 = 2.0, 3.0
print("stacked linear = single line, slope:", W1 * W2)`,
      explanation:
        "See how ReLU flattens negatives while sigmoid gently bends everything into 0–1. The last line shows two linear layers are just one line, which is why we need the kink.",
    },
    exercise: {
      prompt: "Write a 'leaky' ReLU that lets a tiny bit of the negative side through (multiply negatives by 0.01) instead of hard-zeroing them.",
      starter: `def leaky_relu(z):
    return None   # TODO: negatives -> 0.01 * z, positives -> z`,
      solution: `def leaky_relu(z):
    return np.where(z > 0, z, 0.01 * z)`,
    },
    quiz: [
      {
        question: "Why do we need a non-linear activation function?",
        options: [
          "To use more memory",
          "Without it, stacking layers is just one straight line — no extra power",
          "To slow training down on purpose",
          "It picks the learning rate",
        ],
        answerIndex: 1,
        explanation: "A stack of linear layers collapses into a single linear function; the kink is what unlocks depth.",
      },
      {
        question: "What does ReLU do to a negative input?",
        options: [
          "Squashes it into 0 to 1",
          "Turns it into 0",
          "Doubles it",
          "Leaves it unchanged",
        ],
        answerIndex: 1,
        explanation: "ReLU = max(0, z): negatives become 0, positives pass through unchanged.",
      },
      {
        question: "Where is sigmoid most useful?",
        options: [
          "In every hidden layer of a deep net",
          "At the output when you want a probability between 0 and 1",
          "Only in the input layer",
          "To replace the loss function",
        ],
        answerIndex: 1,
        explanation: "Sigmoid maps to (0, 1), perfect for a final probability; deep in the network it tends to stall learning.",
      },
    ],
    flashcards: [
      { front: "Activation function", back: "A non-linear 'kink' applied to a neuron's weighted sum, unlocking curves." },
      { front: "ReLU", back: "max(0, z): zero out negatives, keep positives. Fast default for hidden layers." },
      { front: "Sigmoid", back: "1/(1+e^-z): squashes any number into (0, 1); great for a final probability." },
      { front: "Vanishing gradient", back: "When deep sigmoids shrink the blame signal so much that learning stalls." },
    ],
    miniProject: {
      title: "Kinks vs. No Kinks",
      brief: "Show numerically that activations are what let a network bend.",
      steps: [
        "Build a 2-layer forward pass with ReLU between the layers.",
        "Run it on a spread of inputs and note the outputs curve.",
        "Delete the ReLU and rerun — confirm the outputs now fall on a straight line.",
        "Swap ReLU for sigmoid and compare the shapes.",
      ],
    },
    industryUse: [
      "Google's image models use ReLU (and its cousins) throughout their vision networks for speed and stability.",
      "Fraud-detection systems at banks put a sigmoid on the final neuron to output a 0–1 'fraud probability'.",
      "Language models like those at Anthropic and OpenAI use smooth activations (GELU) inside their transformer layers.",
    ],
    commonMistakes: [
      "Leaving activations out entirely, then wondering why a deep network performs no better than a straight line.",
      "Using sigmoid in every hidden layer of a deep net, causing vanishing gradients — switch hidden layers to ReLU.",
    ],
    interviewQuestions: [
      "Why can't a network learn complex patterns without non-linear activations?",
      "Compare ReLU and sigmoid — when would you use each?",
      "What is the vanishing gradient problem and which activation helps avoid it?",
    ],
    papers: [
      { title: "Deep Sparse Rectifier Neural Networks (introduces ReLU for deep nets)", url: "https://proceedings.mlr.press/v15/glorot11a.html", year: 2011 },
    ],
    nextUp: ["backprop", "cnn"],
    cheatsheet: [
      "No activation = one straight line, no matter the depth",
      "ReLU(z) = max(0, z) — fast default for hidden layers",
      "Sigmoid squashes to (0, 1) — use at the output for probabilities",
      "Deep sigmoids -> vanishing gradients (learning stalls)",
      "The kink is what buys you depth",
    ],
  },
};
