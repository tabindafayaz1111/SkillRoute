import type { LessonBody } from "@/types";

export const linearAlgebra: Record<string, LessonBody> = {
  "la-what-vector": {
    story:
      "You're giving a friend directions to your house: 'Walk 3 blocks east, then 2 blocks north.' You just used a vector. A vector is nothing scarier than a list of numbers that describes an amount and a direction — here, (3, 2). Draw it as an arrow starting at where you're standing and ending at your front door. That arrow IS the vector. Machine learning turns everything — a house, a customer, even a word — into one of these little lists of numbers, because once something is a list of numbers, a computer can do maths on it.",
    problem:
      "A computer can't 'see' a house or 'understand' a customer. It only does arithmetic. So we need a way to squeeze real-world things into numbers a machine can add, compare, and learn from. A single number (like price) is too thin to describe anything interesting. We need a tidy bundle of numbers that travels together.",
    analogy:
      "A vector is like a recipe card: '2 cups flour, 1 egg, 3 spoons sugar.' The order matters and the whole card describes one thing — a cake. Change one number and it's a different cake.",
    explanation: [
      "A vector is just an ordered list of numbers, like (3, 2) or (170, 65, 30). Each slot means something specific — and the order is fixed, so slot 1 is always 'height', slot 2 always 'weight', and so on.",
      "You can picture a 2-number vector as an arrow on a graph: start at the origin (0,0), go across by the first number, up by the second, and draw the arrow to that point.",
      "The number of slots is called the 'dimension'. (3, 2) is 2-dimensional (fits on paper). A customer described by 50 numbers is a 50-dimensional vector — you can't draw it, but the maths works exactly the same.",
      "In ML, a vector is how we describe one example: one house might be (1200, 3, 2) meaning 1200 sq-ft, 3 bedrooms, 2 baths. That single row of numbers is a 'feature vector'.",
      "Use vectors whenever you want the computer to treat several facts about one thing as a single package it can compute with. Almost every ML model eats vectors for breakfast.",
    ],
    math: "A vector is written v = (v₁, v₂, …, vₙ). The little numbers are its components; n is how many of them there are (its dimension).",
    code: {
      language: "python",
      source: `import numpy as np

# a vector = a list of numbers that belong together
directions = np.array([3, 2])        # 3 east, 2 north
house      = np.array([1200, 3, 2])  # sq-ft, bedrooms, baths

print("directions:", directions)
print("this house has", len(house), "features")
print("first component of directions:", directions[0])`,
      explanation:
        "NumPy's array is the everyday tool for vectors in Python. len() gives the dimension, and indexing with [0] pulls out one component.",
    },
    exercise: {
      prompt: "Make a vector describing yourself with 3 numbers (age, height in cm, shoe size), and print how many dimensions it has.",
      starter: `import numpy as np
# TODO: build a 3-number vector called me
me = ...
print(me, "->", len(me), "dimensions")`,
      solution: `import numpy as np
me = np.array([50, 172, 9])
print(me, "->", len(me), "dimensions")`,
    },
    quiz: [
      {
        question: "What is a vector, in plain terms?",
        options: [
          "A single number",
          "An ordered list of numbers that describes one thing",
          "A type of chart",
          "A computer program",
        ],
        answerIndex: 1,
        explanation: "A vector bundles several numbers together in a fixed order to describe one thing.",
      },
      {
        question: "The vector (1200, 3, 2) has how many dimensions?",
        options: ["1", "2", "3", "1200"],
        answerIndex: 2,
        explanation: "Dimension = how many numbers (components) are in the list. Here there are three.",
      },
    ],
    flashcards: [
      { front: "Vector", back: "An ordered list of numbers describing one thing, e.g. (3, 2)." },
      { front: "Component", back: "One of the numbers inside a vector." },
      { front: "Dimension", back: "How many components a vector has." },
      { front: "Feature vector", back: "A vector whose numbers are the measured features of one example (one house, one customer)." },
    ],
    miniProject: {
      title: "Turn Your Fridge Into Vectors",
      brief: "Describe 5 foods as vectors so a computer could compare them.",
      steps: [
        "Pick 3 features every food has: calories, grams of sugar, grams of protein.",
        "Write each of 5 foods as a 3-number NumPy array.",
        "Stack them and print the shape.",
        "Say out loud which two foods 'look closest' as numbers — you're previewing similarity.",
      ],
    },
    industryUse: [
      "Spotify represents every song as a vector of audio features to power recommendations",
      "Banks describe each customer as a vector (income, age, balance...) to score loan risk",
      "Google turns every word into a vector so 'king' and 'queen' sit near each other",
    ],
    commonMistakes: [
      "Mixing up the order of components — if slot 2 is 'weight' for one example, it must be 'weight' for every example.",
      "Thinking vectors must be 2D arrows. Most real ML vectors have dozens or thousands of dimensions you can't draw.",
    ],
    interviewQuestions: [
      "What is a feature vector and why does ML represent examples this way?",
      "What does the 'dimension' of a vector mean, and can it be more than 3?",
    ],
    papers: [],
    nextUp: ["la-vector-ops", "la-dot-product"],
    cheatsheet: [
      "Vector = ordered list of numbers = an arrow with direction + length",
      "np.array([3, 2]) makes one in Python",
      "len(v) = its dimension",
      "One example in ML = one feature vector",
      "Order of the numbers is fixed and meaningful",
    ],
  },

  "la-vector-ops": {
    story:
      "Monday you walk 3 blocks east and 2 north to the cafe. From there you walk 1 more block east and 4 north to the library. Where did you end up overall from home? You add the trips: (3, 2) + (1, 4) = (4, 6). That's vector addition — just line up the arrows tip-to-tail. Now suppose you took that exact same first walk but at double speed, covering twice the distance: (3, 2) becomes (6, 4). That's scaling — stretching an arrow by a number. Adding and scaling are the only two moves you ever really do to vectors, and every ML model is built from them.",
    problem:
      "Real data comes in pieces you need to combine or adjust. You want to merge two trips, average a batch of measurements, or make one influence stronger. Doing this number-by-number by hand is tedious and error-prone. Vector addition and scaling let you combine or resize whole lists of numbers in one clean step.",
    analogy:
      "Adding vectors is like stacking two recipes: combine the flour with the flour, the sugar with the sugar. Scaling is doubling a recipe: every ingredient times two.",
    explanation: [
      "Adding two vectors: line them up and add matching slots. (3, 2) + (1, 4) = (3+1, 2+4) = (4, 6). Both vectors must be the same length.",
      "Scaling (multiplying by a plain number): stretch or shrink every component. 2 × (3, 2) = (6, 4). A number bigger than 1 stretches, between 0 and 1 shrinks, and a negative number flips the arrow to point the opposite way.",
      "Subtracting is just adding a flipped vector: a − b points from b's tip to a's tip — the 'difference' or 'how to get from one to the other'.",
      "Geometrically, addition is tip-to-tail (walk the first arrow, then start the second where the first ended). Scaling keeps the direction but changes the length.",
      "In ML these show up constantly: averaging vectors (add them all, scale by 1/n), and every neuron scaling inputs by weights then adding them up is exactly these two moves.",
      "Watch out: you can't add vectors of different lengths, and multiplying two vectors is NOT done slot-by-slot here — that's a different operation (the dot product, next lesson).",
    ],
    math: "Addition: (a₁,a₂) + (b₁,b₂) = (a₁+b₁, a₂+b₂). Scaling: c·(a₁,a₂) = (c·a₁, c·a₂).",
    code: {
      language: "python",
      source: `import numpy as np

trip1 = np.array([3, 2])
trip2 = np.array([1, 4])

print("total trip:", trip1 + trip2)   # tip-to-tail
print("double speed:", 2 * trip1)     # scaling
print("difference:", trip2 - trip1)   # how to get from trip1 to trip2

# averaging a batch is add-then-scale
batch = np.array([[3, 2], [1, 4], [5, 0]])
print("average vector:", batch.sum(axis=0) / len(batch))`,
      explanation:
        "NumPy adds and scales whole vectors in one line. axis=0 sums down the columns so we average matching slots.",
    },
    exercise: {
      prompt: "You have vectors a=(2,5) and b=(4,1). Compute a + b, then shrink the result to half its size.",
      starter: `import numpy as np
a = np.array([2, 5])
b = np.array([4, 1])
# TODO: add them, then multiply by 0.5
result = ...
print(result)`,
      solution: `import numpy as np
a = np.array([2, 5])
b = np.array([4, 1])
result = 0.5 * (a + b)
print(result)`,
    },
    quiz: [
      {
        question: "What is (3, 2) + (1, 4)?",
        options: ["(4, 6)", "(3, 8)", "(4, 8)", "(2, -2)"],
        answerIndex: 0,
        explanation: "Add matching slots: 3+1=4 and 2+4=6.",
      },
      {
        question: "What does multiplying a vector by 0.5 do?",
        options: [
          "Flips its direction",
          "Doubles its length",
          "Halves its length, same direction",
          "Deletes a component",
        ],
        answerIndex: 2,
        explanation: "A scale between 0 and 1 shrinks the arrow while keeping its direction.",
      },
      {
        question: "Why can't you add (3, 2) and (1, 4, 5)?",
        options: [
          "They point different ways",
          "They have different dimensions",
          "One is negative",
          "You actually can",
        ],
        answerIndex: 1,
        explanation: "Addition needs matching slots, so both vectors must be the same length.",
      },
    ],
    flashcards: [
      { front: "Vector addition", back: "Add matching components; geometrically, tip-to-tail." },
      { front: "Scaling", back: "Multiply every component by one number; stretches, shrinks, or flips the arrow." },
      { front: "Vector subtraction", back: "a − b: the arrow pointing from b to a, i.e. the difference." },
      { front: "Averaging vectors", back: "Add them all, then scale by 1/n." },
    ],
    miniProject: {
      title: "Find the Meeting Point",
      brief: "Three friends stand at different spots. Find the fair central spot to meet.",
      steps: [
        "Write each friend's location as a 2-number vector.",
        "Add all three vectors.",
        "Scale the sum by 1/3 to get the average — the centroid.",
        "Plot the three points and the meeting point with matplotlib.",
      ],
    },
    industryUse: [
      "Recommender systems average the vectors of songs you liked to describe your taste",
      "Robotics adds movement vectors to plan a path step by step",
      "Neural networks scale inputs by weights then add them — that's this exact maths, billions of times",
    ],
    commonMistakes: [
      "Trying to add vectors of different lengths — line them up slot-for-slot first.",
      "Confusing scaling (times a single number) with multiplying two vectors together, which is a separate operation.",
    ],
    interviewQuestions: [
      "How would you compute the centroid (average position) of a set of points using vectors?",
      "Geometrically, what does subtracting one vector from another give you?",
    ],
    papers: [],
    nextUp: ["la-dot-product", "la-matrices-intro"],
    cheatsheet: [
      "Add: match slots, add them — a+b tip-to-tail",
      "Scale: c*v stretches (c>1), shrinks (0<c<1), flips (c<0)",
      "a - b = arrow from b to a",
      "Average = add all, scale by 1/n",
      "Same length required to add",
    ],
  },

  "la-dot-product": {
    story:
      "Two friends rate three movies out of 5. You want to know: do they have similar taste? You could eyeball it, or you can multiply their scores movie-by-movie and add it all up: friend A (5,1,4) and friend B (4,2,5) give 5×4 + 1×2 + 4×5 = 42 — a big number, so their tastes point the same way. If one loved what the other hated, the products would cancel out toward zero. That single summarizing number is the dot product, and it's the quiet engine behind 'people who liked this also liked...'",
    problem:
      "We constantly need to ask 'how similar are these two things?' — two customers, two documents, two songs. Comparing long lists of numbers by eye is hopeless. We need one number that captures whether two vectors point the same way (similar), opposite ways (opposite tastes), or off at right angles (unrelated).",
    analogy:
      "The dot product is like a compatibility score on a dating app: it multiplies how much you each care about the same things and sums it up. Agree strongly on lots of things → high score. Pull in opposite directions → it drags the score down.",
    explanation: [
      "The dot product multiplies two vectors slot-by-slot, then adds up all those products, giving you a single number. (5,1,4)·(4,2,5) = 20 + 2 + 20 = 42.",
      "The sign tells the story: a positive result means the vectors broadly point the same way, near zero means they're unrelated (at right angles), and negative means they point in opposing directions.",
      "It's the maths behind similarity. To make it a fair comparison regardless of size, we often divide by the vectors' lengths — that gives 'cosine similarity', a score from -1 (opposite) to +1 (identical direction).",
      "A neuron uses the dot product to combine inputs with weights: multiply each input by its weight, sum them — that's a weighted vote, and it's literally a dot product.",
      "Use it whenever you want a single 'how aligned are these?' number: search engines matching your query to documents, or ML models scoring inputs against learned weights.",
      "Careful: raw dot product grows just because vectors are long. If you want pure direction/similarity, normalize (use cosine similarity) so a long, loud vector doesn't fake a high score.",
    ],
    math: "a·b = a₁b₁ + a₂b₂ + … + aₙbₙ. Also a·b = |a||b|cos θ, where θ is the angle between them — so it measures alignment.",
    code: {
      language: "python",
      source: `import numpy as np

alice = np.array([5, 1, 4])   # ratings for 3 movies
bob   = np.array([4, 2, 5])

score = np.dot(alice, bob)
print("dot product:", score)   # one similarity number

# cosine similarity: fair comparison ignoring how 'loud' each is
cos = np.dot(alice, bob) / (np.linalg.norm(alice) * np.linalg.norm(bob))
print("cosine similarity:", round(float(cos), 3))  # -1 .. 1`,
      explanation:
        "np.dot does the multiply-and-add. Dividing by the lengths (np.linalg.norm) turns it into cosine similarity, a size-proof score between -1 and 1.",
    },
    exercise: {
      prompt: "Compute the dot product of u=(2, 0, 3) and v=(1, 5, 1) by hand-style code, then check with np.dot.",
      starter: `import numpy as np
u = np.array([2, 0, 3])
v = np.array([1, 5, 1])
# TODO: compute the dot product
answer = ...
print(answer)`,
      solution: `import numpy as np
u = np.array([2, 0, 3])
v = np.array([1, 5, 1])
answer = np.dot(u, v)   # 2*1 + 0*5 + 3*1 = 5
print(answer)`,
    },
    quiz: [
      {
        question: "The dot product of two vectors gives you…",
        options: [
          "Another vector",
          "A single number measuring alignment",
          "The longer vector",
          "A percentage",
        ],
        answerIndex: 1,
        explanation: "It multiplies slot-by-slot and sums, producing one number that captures how aligned the vectors are.",
      },
      {
        question: "A dot product near zero between two vectors means…",
        options: [
          "They are identical",
          "They point opposite ways",
          "They are unrelated (roughly at right angles)",
          "One vector is empty",
        ],
        answerIndex: 2,
        explanation: "Near-zero alignment means the vectors are roughly perpendicular — unrelated in direction.",
      },
      {
        question: "Why use cosine similarity instead of the raw dot product?",
        options: [
          "It's faster to type",
          "It ignores vector size so long, 'loud' vectors don't fake a high score",
          "It only works on movies",
          "It gives a bigger number",
        ],
        answerIndex: 1,
        explanation: "Dividing by the lengths removes the effect of magnitude, leaving a pure direction-based score from -1 to 1.",
      },
    ],
    flashcards: [
      { front: "Dot product", back: "Multiply two vectors slot-by-slot and sum: one number for alignment." },
      { front: "Cosine similarity", back: "Dot product divided by both lengths; a size-proof score from -1 to 1." },
      { front: "Positive dot product", back: "The vectors broadly point the same way." },
      { front: "Zero dot product", back: "The vectors are perpendicular / unrelated in direction." },
    ],
    miniProject: {
      title: "Tiny Movie Recommender",
      brief: "Use the dot product to find whose taste matches yours.",
      steps: [
        "Rate 5 movies as your vector, and invent 3 friends' rating vectors.",
        "Compute cosine similarity between you and each friend.",
        "Pick the highest-scoring friend.",
        "Recommend a movie they rated highly that you haven't seen.",
      ],
    },
    industryUse: [
      "Netflix and Spotify use cosine similarity between taste vectors to recommend content",
      "Search engines score how well a document vector matches your query vector",
      "LLMs compare word vectors with the dot product to judge which words relate",
    ],
    commonMistakes: [
      "Forgetting to normalize — a long vector can score high just from size, not real similarity.",
      "Expecting a vector back — the dot product always returns a single number, not another vector.",
    ],
    interviewQuestions: [
      "What is the geometric meaning of the dot product, and what does its sign tell you?",
      "When would you use cosine similarity instead of the raw dot product?",
    ],
    papers: [],
    nextUp: ["la-matrices-intro", "la-matmul"],
    cheatsheet: [
      "a·b = a₁b₁ + a₂b₂ + … (multiply slots, sum)",
      "Result is ONE number, not a vector",
      "Positive = same way · 0 = unrelated · negative = opposite",
      "Cosine similarity = dot / (|a||b|), range -1..1",
      "np.dot(a, b); np.linalg.norm(v) for length",
    ],
  },

  "la-matrices-intro": {
    story:
      "Take a photo on your phone and rotate it 90 degrees. Every pixel moved to a new spot, all at once, following the same rule. What performed that rule? A matrix. A matrix is a grid of numbers, but the magic idea is this: a matrix is a machine that takes in vectors and moves them — it can rotate, stretch, squish, or flip every point in a space in one go. Instead of describing where one arrow ends up, a matrix describes how ALL arrows get transformed. That's why matrices run everything from image filters to the layers of a neural network.",
    problem:
      "Often you don't want to transform one point — you want to apply the same operation to millions of them: rotate a whole image, scale an entire dataset, or push a batch of vectors through a neural network layer. Writing that rule out per point is impossible. A matrix packages a whole transformation into one tidy grid you can apply to any vector.",
    analogy:
      "A matrix is like a cookie cutter's stamping machine: feed in any dough shape (vector) and it comes out transformed the same consistent way — rotated, stretched, or flipped — every single time.",
    explanation: [
      "A matrix is a rectangular grid of numbers, written in rows and columns, like [[1, 0], [0, 1]]. A 2×2 matrix has 2 rows and 2 columns.",
      "The powerful way to see it: a matrix is a transformation. Multiply it by a vector and out comes a new, moved vector. It answers 'where does this arrow go?'",
      "The columns of the matrix tell you where the basic direction arrows land. In 2D, the first column is where the 'right' arrow (1,0) ends up, the second column is where the 'up' arrow (0,1) ends up. Know those two, and you know the whole transformation.",
      "Special matrices have intuitive jobs: the identity matrix [[1,0],[0,1]] leaves everything unchanged, a scaling matrix stretches, and a rotation matrix spins everything around the origin.",
      "In ML, each layer of a neural network is basically a matrix that transforms the incoming vector into a new, more useful representation. Images, on the other hand, are stored AS matrices (a grid of pixel brightnesses).",
      "Use a matrix when you want one consistent rule applied to a whole space of vectors. Don't confuse the two roles: sometimes a matrix is the data (an image), sometimes it's the transformer (a rotation) — context tells you which.",
    ],
    math: "Applying matrix A to vector x: A·x. Each output component is a dot product of a row of A with x. The columns of A show where the unit vectors (1,0) and (0,1) land.",
    code: {
      language: "python",
      source: `import numpy as np

# rotate 90 degrees counter-clockwise
rotate = np.array([[0, -1],
                   [1,  0]])

point = np.array([2, 0])          # an arrow pointing right
moved = rotate @ point            # apply the transformation
print("before:", point, "after:", moved)   # now points up: [0, 2]

identity = np.eye(2)              # the 'do nothing' matrix
print("unchanged:", identity @ point)`,
      explanation:
        "The @ symbol applies a matrix to a vector. The rotation matrix sends the rightward arrow (2,0) to the upward arrow (0,2). np.eye(2) is the identity, which changes nothing.",
    },
    exercise: {
      prompt: "Build a matrix that doubles the x and triples the y of any vector, then apply it to (2, 2).",
      starter: `import numpy as np
# TODO: a matrix that scales x by 2 and y by 3
stretch = ...
point = np.array([2, 2])
print(stretch @ point)`,
      solution: `import numpy as np
stretch = np.array([[2, 0],
                    [0, 3]])
point = np.array([2, 2])
print(stretch @ point)   # [4, 6]`,
    },
    quiz: [
      {
        question: "The most powerful way to think of a matrix is as…",
        options: [
          "A single number",
          "A transformation that moves vectors",
          "A type of chart",
          "A list of dates",
        ],
        answerIndex: 1,
        explanation: "A matrix takes in a vector and returns a transformed one — it moves, rotates, stretches, or flips space.",
      },
      {
        question: "What does the identity matrix do to a vector?",
        options: [
          "Doubles it",
          "Rotates it 90 degrees",
          "Leaves it unchanged",
          "Deletes it",
        ],
        answerIndex: 2,
        explanation: "The identity matrix is the 'do nothing' transformation — the vector comes out exactly as it went in.",
      },
      {
        question: "What do the columns of a 2×2 matrix tell you?",
        options: [
          "The average of the data",
          "Where the basic direction arrows (1,0) and (0,1) end up",
          "The number of rows",
          "Nothing useful",
        ],
        answerIndex: 1,
        explanation: "Each column is the new home of a unit vector, which fully describes the transformation.",
      },
    ],
    flashcards: [
      { front: "Matrix", back: "A grid of numbers that can act as a transformation of vectors." },
      { front: "Matrix as transformation", back: "Multiplying a matrix by a vector moves/rotates/stretches that vector." },
      { front: "Identity matrix", back: "[[1,0],[0,1]] — leaves any vector unchanged." },
      { front: "Columns of a matrix", back: "Where the basic unit vectors land after the transformation." },
    ],
    miniProject: {
      title: "Spin a Triangle",
      brief: "Rotate a shape using a matrix and watch it turn.",
      steps: [
        "Define a triangle as three 2D point vectors.",
        "Build a rotation matrix (start with 90 degrees).",
        "Apply the matrix to each point.",
        "Plot the original and rotated triangle on the same graph with matplotlib.",
      ],
    },
    industryUse: [
      "Instagram and Photoshop apply matrices to rotate, scale, and skew images",
      "Game engines and CGI move 3D models around the screen with transformation matrices",
      "Every layer in a neural network transforms its input vector using a weight matrix",
    ],
    commonMistakes: [
      "Confusing a matrix-as-data (an image) with a matrix-as-transformation (a rotation) — context decides which role it plays.",
      "Forgetting the order of rows and columns: a 2×3 matrix (2 rows, 3 columns) is different from a 3×2.",
    ],
    interviewQuestions: [
      "Explain what it means to think of a matrix as a linear transformation.",
      "What do the columns of a transformation matrix represent geometrically?",
    ],
    papers: [],
    nextUp: ["la-matmul", "la-eigen"],
    cheatsheet: [
      "Matrix = grid of numbers = a transformation of space",
      "A @ x moves the vector x",
      "Columns = where (1,0) and (0,1) land",
      "Identity np.eye(n) = do nothing",
      "Neural net layer = a weight matrix",
    ],
  },

  "la-matmul": {
    story:
      "You rotate a photo 90 degrees, then you stretch it wide. Two transformations, one after the other. Wouldn't it be handy to bake both into a single step you can reuse? That's exactly what matrix multiplication does: it combines two transformations into one new matrix that does both at once. When you multiply matrix B by matrix A, you get a single matrix that means 'first do A, then do B.' It looks fiddly at first, but the idea is simply chaining machines together into one bigger machine.",
    problem:
      "Real systems stack transformations: a neural network runs your data through layer after layer, and graphics apply rotate-then-scale-then-move. Redoing every step separately, every time, is wasteful. Matrix multiplication lets us fuse a whole pipeline of steps into one matrix, and it's the single most-used operation in all of machine learning.",
    analogy:
      "It's like combining two recipes into one master recipe: instead of 'make the sauce, then make the pasta' as separate cards, you write one card that produces the finished dish in a single flow.",
    explanation: [
      "To multiply matrices, each entry of the result is a dot product: take a row from the left matrix and a column from the right matrix, multiply slot-by-slot, and sum. Do that for every row-column pairing.",
      "The rule for whether it's allowed: the left matrix's number of columns must equal the right matrix's number of rows. A (2×3) times a (3×4) works and gives a (2×4). The inner numbers must match; the outer numbers become the result's shape.",
      "Meaning-wise, B·A means 'apply A first, then B.' Reading right-to-left feels backwards but matches how the maths flows.",
      "Order matters! A·B is usually NOT the same as B·A. Rotating then stretching gives a different result than stretching then rotating — so matrix multiplication is not commutative.",
      "This is the workhorse of ML: one layer of a neural network is a matrix multiply (inputs times weights), and modern GPUs exist largely to do enormous matrix multiplications blindingly fast.",
      "Use it to chain transformations or to push a whole batch of data through a layer at once. Just double-check the shapes line up first — mismatched shapes are the number-one error.",
    ],
    math: "(AB)ᵢⱼ = Σₖ Aᵢₖ·Bₖⱼ — the entry in row i, column j is the dot product of row i of A with column j of B. Shapes: (m×n)·(n×p) = (m×p).",
    code: {
      language: "python",
      source: `import numpy as np

rotate  = np.array([[0, -1], [1, 0]])   # 90 degree spin
stretch = np.array([[2, 0], [0, 1]])    # double the x

# combine into ONE matrix: first rotate, then stretch
combo = stretch @ rotate
print("combined transform:\\n", combo)

point = np.array([1, 0])
print("step by step:", stretch @ (rotate @ point))
print("in one shot: ", combo @ point)   # same answer`,
      explanation:
        "@ multiplies matrices. combo does the rotate-then-stretch in a single step, giving the same result as applying them one after the other.",
    },
    exercise: {
      prompt: "Multiply A=[[1,2],[3,4]] by B=[[5,6],[7,8]] using @, and print the result's shape.",
      starter: `import numpy as np
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
# TODO: multiply them
C = ...
print(C, C.shape)`,
      solution: `import numpy as np
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = A @ B
print(C, C.shape)   # [[19 22] [43 50]] (2, 2)`,
    },
    quiz: [
      {
        question: "Each entry of a matrix product is computed as…",
        options: [
          "A sum of the whole matrix",
          "A dot product of a row from the left and a column from the right",
          "The bigger of two numbers",
          "A random value",
        ],
        answerIndex: 1,
        explanation: "Every result entry is the dot product of one row of the left matrix with one column of the right.",
      },
      {
        question: "For A·B to be allowed, what must match?",
        options: [
          "Both matrices must be square",
          "The columns of A must equal the rows of B",
          "They must be the same size",
          "Nothing — it always works",
        ],
        answerIndex: 1,
        explanation: "The inner dimensions must agree: (m×n)·(n×p) works and yields (m×p).",
      },
      {
        question: "Is A·B always equal to B·A?",
        options: [
          "Yes, always",
          "No — order matters",
          "Only for images",
          "Only on Tuesdays",
        ],
        answerIndex: 1,
        explanation: "Matrix multiplication is not commutative; swapping the order usually changes the result.",
      },
    ],
    flashcards: [
      { front: "Matrix multiplication", back: "Combines two transformations into one; each entry is a row·column dot product." },
      { front: "Shape rule", back: "(m×n)·(n×p) = (m×p); inner dimensions must match." },
      { front: "Not commutative", back: "A·B is generally NOT equal to B·A — order matters." },
      { front: "Why it matters in ML", back: "One neural-network layer is a matrix multiply of inputs by weights." },
    ],
    miniProject: {
      title: "Chain Two Filters Into One",
      brief: "Prove that combining transformations equals doing them one at a time.",
      steps: [
        "Make a rotation matrix and a scaling matrix.",
        "Multiply them to get a single combined matrix.",
        "Apply the combined matrix to a shape's points.",
        "Apply the two separately in sequence and confirm you get the same picture.",
      ],
    },
    industryUse: [
      "Every forward pass of a neural network at OpenAI or Google is a chain of matrix multiplications",
      "GPUs from NVIDIA are built primarily to do giant matrix multiplies for AI",
      "3D games multiply model, view, and projection matrices to place objects on screen",
    ],
    commonMistakes: [
      "Mismatched shapes — always check the left's columns equal the right's rows before multiplying.",
      "Assuming A·B equals B·A; swapping the order gives a different transformation.",
    ],
    interviewQuestions: [
      "When is matrix multiplication defined, and what shape is the result?",
      "Why is matrix multiplication not commutative? Give an intuitive example.",
    ],
    papers: [],
    nextUp: ["la-eigen", "la-image-project"],
    cheatsheet: [
      "Result entry = row · column dot product",
      "Shapes: (m×n)·(n×p) = (m×p)",
      "B·A means 'do A first, then B'",
      "A·B ≠ B·A in general",
      "A @ B in NumPy; it's THE core ML operation",
    ],
  },

  "la-eigen": {
    story:
      "Push a swing and it wants to move along one natural line — back and forth, not sideways. Stretch a rubber sheet and there are certain directions that only get longer or shorter, never twisted off course. Every transformation has these special 'spine' directions that survive it unchanged in direction. Those directions are eigenvectors, and how much each one stretches is its eigenvalue. Find a transformation's eigenvectors and you've found its skeleton — the few directions that explain what it really does.",
    problem:
      "A big transformation (or a big dataset) can look like a chaotic mess of numbers. We want to cut through the noise and ask: what are the few directions that truly matter here? Which way does this data mostly spread? Which directions does this transformation leave alone? Eigenvectors and eigenvalues extract that hidden backbone.",
    analogy:
      "Eigenvectors are like the grain in a piece of wood: you can push wood in any direction, but it splits cleanly only along its grain. The grain directions are the eigenvectors; how easily it splits along each is the eigenvalue.",
    explanation: [
      "When a matrix transforms most vectors, it knocks them off in a new direction. But a few special vectors come out pointing the exact same way as they went in — only longer or shorter. Those are the eigenvectors.",
      "The eigenvalue is the stretch factor for its eigenvector: an eigenvalue of 3 means that direction gets 3× longer; 0.5 means it shrinks to half; a negative one means it flips to point backward.",
      "In words: transforming an eigenvector is the same as just scaling it. The matrix doesn't rotate it, only lengthens or shrinks it. That's the whole definition, minus the jargon.",
      "Why care? Eigenvectors reveal a transformation's natural axes. In data, the eigenvectors of the data's spread show the directions of greatest variation — the backbone of the dataset.",
      "This powers PCA (Principal Component Analysis), the go-to tool for squashing 100 columns down to the 2 or 3 that matter, and it's behind Google's original PageRank and many recommendation systems.",
      "Don't over-reach: eigenvectors are cleanest for square matrices, and you rarely compute them by hand — you ask NumPy. The value is the intuition: 'which directions does this thing leave pointing the same way?'",
    ],
    math: "The defining equation: A·v = λ·v. Transforming eigenvector v by matrix A equals simply scaling v by the eigenvalue λ — no change in direction.",
    code: {
      language: "python",
      source: `import numpy as np

# a stretch: x doubles, y triples
A = np.array([[2, 0],
              [0, 3]])

values, vectors = np.linalg.eig(A)
print("eigenvalues:", values)      # [2. 3.] the stretch factors
print("eigenvectors:\\n", vectors)  # the x and y axes

# proof: A times an eigenvector = eigenvalue times that eigenvector
v = vectors[:, 1]
print("A @ v   :", A @ v)
print("lambda*v:", values[1] * v)   # same!`,
      explanation:
        "np.linalg.eig hands back the eigenvalues (stretch factors) and eigenvectors (special directions). The last two prints show A @ v equals just scaling v — the definition in action.",
    },
    exercise: {
      prompt: "Find the eigenvalues of the matrix [[4, 0], [0, 1]] and print just the eigenvalues.",
      starter: `import numpy as np
A = np.array([[4, 0], [0, 1]])
# TODO: get the eigenvalues
values = ...
print(values)`,
      solution: `import numpy as np
A = np.array([[4, 0], [0, 1]])
values, _ = np.linalg.eig(A)
print(values)   # [4. 1.]`,
    },
    quiz: [
      {
        question: "What is special about an eigenvector of a matrix?",
        options: [
          "It becomes zero after the transformation",
          "It comes out pointing the same direction, only scaled",
          "It always doubles in length",
          "It disappears",
        ],
        answerIndex: 1,
        explanation: "An eigenvector's direction is unchanged by the transformation — the matrix only stretches or shrinks it.",
      },
      {
        question: "What does an eigenvalue of 0.5 mean for its eigenvector?",
        options: [
          "It flips direction",
          "It stays the same",
          "It shrinks to half its length",
          "It grows five times",
        ],
        answerIndex: 2,
        explanation: "The eigenvalue is the stretch factor; 0.5 halves the eigenvector's length while keeping its direction.",
      },
      {
        question: "Eigenvectors are the backbone of which famous technique?",
        options: [
          "Linear regression",
          "PCA (Principal Component Analysis)",
          "Sorting algorithms",
          "Spell check",
        ],
        answerIndex: 1,
        explanation: "PCA uses eigenvectors to find the directions of greatest variation and reduce dimensions.",
      },
    ],
    flashcards: [
      { front: "Eigenvector", back: "A direction a matrix leaves unchanged — it only gets scaled, not rotated." },
      { front: "Eigenvalue", back: "The stretch factor applied to its eigenvector (2 = double, 0.5 = half, negative = flip)." },
      { front: "A·v = λ·v", back: "The defining equation: transforming v equals just scaling v by λ." },
      { front: "PCA", back: "Uses eigenvectors to find the main directions of variation and shrink data's dimensions." },
    ],
    miniProject: {
      title: "Find a Dataset's Backbone",
      brief: "Use eigenvectors to reveal the main direction a cloud of points spreads.",
      steps: [
        "Generate a stretched cloud of 2D points with NumPy.",
        "Compute the covariance matrix of the points.",
        "Get its eigenvectors and eigenvalues with np.linalg.eig.",
        "Plot the points and draw the biggest eigenvector — it points along the spread.",
      ],
    },
    industryUse: [
      "PCA compresses images and speeds up ML models by keeping only the top eigenvector directions",
      "Google's original PageRank ranked web pages using an eigenvector of the link matrix",
      "Face-recognition 'eigenfaces' describe faces using their strongest eigenvector directions",
    ],
    commonMistakes: [
      "Thinking every vector is an eigenvector — only a few special directions qualify for a given matrix.",
      "Trying to compute eigenvectors by hand for big matrices; use np.linalg.eig and focus on the intuition.",
    ],
    interviewQuestions: [
      "In plain English, what are eigenvectors and eigenvalues of a matrix?",
      "How do eigenvectors relate to PCA and dimensionality reduction?",
    ],
    papers: [
      { title: "The PageRank Citation Ranking (Page, Brin et al.)", url: "http://ilpubs.stanford.edu:8090/422/", year: 1999 },
    ],
    nextUp: ["la-image-project"],
    cheatsheet: [
      "Eigenvector = direction left unchanged (only scaled)",
      "Eigenvalue = the stretch factor (λ)",
      "Definition: A·v = λ·v",
      "np.linalg.eig(A) -> values, vectors",
      "Backbone of PCA & PageRank",
    ],
  },

  "la-image-project": {
    story:
      "Here's the payoff for everything you've learned: an image is just a grid of numbers — a matrix — and every filter in Photoshop is a matrix quietly doing arithmetic on it. In this project you'll load a picture, then rotate, flip, and stretch it using nothing but the vectors and matrices you now understand. When your image spins on screen because YOU multiplied a rotation matrix by its coordinates, linear algebra stops being abstract and becomes something you can literally see.",
    problem:
      "Beginners finish a maths course able to define a matrix but unable to DO anything with one. This project fixes that: you'll turn dry definitions into a working image transformer, proving to yourself that vectors, matrix multiplication, and transformations are real, usable tools — not just symbols on a page.",
    analogy:
      "It's like finally driving the car after learning what the pedals do. You've studied vectors and matrices; now you take them out on the road and watch an image obey your commands.",
    explanation: [
      "An image is a matrix of pixel values (brightness or colour). Its shape is height × width, and each entry is a number the screen paints.",
      "Simple filters are matrix operations directly on that grid: flipping is reversing rows or columns, and brightening is scaling every value.",
      "Geometric transforms (rotate, stretch, shear) work on pixel COORDINATES: treat each pixel's (x, y) as a vector and multiply it by a transformation matrix to find its new home.",
      "You'll reuse every skill: vectors (pixel coordinates), scaling (brightness), matrix-vector multiply (moving a pixel), and matrix multiply (chaining rotate-then-stretch into one step).",
      "Libraries like NumPy and Pillow make loading and displaying images easy, so you can focus on the maths and immediately SEE each result.",
      "The lesson to walk away with: 'image editing' and 'neural network layer' and 'rotate my photo' are all the same handful of linear-algebra moves wearing different costumes.",
    ],
    math: "Rotate a pixel coordinate: [x', y'] = R·[x, y], where R = [[cos θ, −sin θ], [sin θ, cos θ]]. Brightness is scaling: new_pixels = c · pixels.",
    code: {
      language: "python",
      source: `import numpy as np
from PIL import Image

img = np.array(Image.open("cat.jpg").convert("L"))  # grayscale grid
print("image is a matrix of shape:", img.shape)

# 1) brightness = scaling every pixel
brighter = np.clip(img * 1.4, 0, 255).astype(np.uint8)

# 2) horizontal flip = reverse the columns
flipped = img[:, ::-1]

# 3) rotate 90 degrees by transposing then flipping
rotated = img.T[:, ::-1]

Image.fromarray(rotated).save("cat_rotated.jpg")
print("saved a rotated cat!")`,
      explanation:
        "The image loads as a NumPy matrix. Scaling brightens it, reversing columns flips it, and transpose-plus-flip rotates it — each a plain linear-algebra move.",
    },
    exercise: {
      prompt: "Given the grayscale image matrix img, create a darker version at 60% brightness (clip values to stay 0-255).",
      starter: `import numpy as np
# img is already loaded as a NumPy matrix
# TODO: make it 60% as bright, keep values valid
darker = ...
print(darker.dtype)`,
      solution: `import numpy as np
darker = np.clip(img * 0.6, 0, 255).astype(np.uint8)
print(darker.dtype)`,
    },
    quiz: [
      {
        question: "How is a grayscale image stored in code?",
        options: [
          "As a single number",
          "As a matrix (grid) of pixel brightness values",
          "As a sentence",
          "As an audio file",
        ],
        answerIndex: 1,
        explanation: "A grayscale image is a 2D matrix where each entry is one pixel's brightness.",
      },
      {
        question: "Increasing an image's brightness is really which linear-algebra operation?",
        options: [
          "A dot product",
          "Scaling every value by a number",
          "Finding eigenvalues",
          "Adding two vectors",
        ],
        answerIndex: 1,
        explanation: "Multiplying every pixel value by a constant is scaling — brighter above 1, darker below 1.",
      },
      {
        question: "To rotate the position of a pixel, you…",
        options: [
          "Delete it",
          "Multiply its (x, y) coordinate vector by a rotation matrix",
          "Change its colour randomly",
          "Sort the pixels",
        ],
        answerIndex: 1,
        explanation: "Rotation transforms coordinates: multiply each pixel's position vector by a rotation matrix.",
      },
    ],
    flashcards: [
      { front: "Image as matrix", back: "A grayscale image is a grid of numbers (pixel brightnesses)." },
      { front: "Brightness = scaling", back: "Multiply every pixel value by a constant to brighten or darken." },
      { front: "Flip", back: "Reverse rows or columns of the image matrix." },
      { front: "Rotate", back: "Multiply pixel coordinate vectors by a rotation matrix." },
    ],
    miniProject: {
      title: "Build a Mini Photo Filter App",
      brief: "Turn your linear algebra into a working image editor.",
      steps: [
        "Load an image as a NumPy matrix with Pillow.",
        "Write functions to brighten (scale), flip (reverse), and rotate (matrix multiply).",
        "Chain two transforms and confirm the combined matrix gives the same result.",
        "Save the before/after images and show them side by side.",
      ],
    },
    industryUse: [
      "Instagram and Snapchat filters are matrix operations on image pixel grids",
      "Self-driving cars at Tesla transform camera images with matrices before detecting objects",
      "Medical imaging software rotates and scales MRI scans using these same transforms",
    ],
    commonMistakes: [
      "Forgetting to clip pixel values to 0-255 after scaling, which makes colours wrap around and look glitchy.",
      "Mixing up transforming pixel VALUES (brightness) with transforming pixel COORDINATES (rotation) — they're different operations.",
    ],
    interviewQuestions: [
      "How is an image represented so a computer can transform it with matrices?",
      "Explain how you would rotate an image using a rotation matrix on pixel coordinates.",
    ],
    papers: [],
    nextUp: ["la-what-vector"],
    cheatsheet: [
      "Image = matrix of pixel values",
      "Brightness = scale all pixels (clip 0-255)",
      "Flip = reverse rows/columns: img[:, ::-1]",
      "Rotate = matrix-multiply pixel coordinates",
      "PIL + NumPy = load, transform, see it",
    ],
  },
};
