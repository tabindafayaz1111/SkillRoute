import type { LessonBody } from "@/types";

export const visionSequences: Record<string, LessonBody> = {
  cnn: {
    story:
      "Hand a friend a photo but only let them peek through a tiny hole the size of a postage stamp. They slide that hole across the whole picture, and at each spot they answer one question: 'Do I see a little edge here — a dark-to-light border?' Slide it everywhere and you get a map of all the edges. Now do it again with holes that hunt for corners, then curves, then eyes, then whole faces. That stack of little sliding detectors, each building on the last, is a Convolutional Neural Network — the thing that lets a machine actually see.",
    problem:
      "A photo is just a grid of millions of brightness numbers. If you feed all those raw numbers straight into a regular neural network, it drowns — too many inputs, and it has no idea that pixels next to each other belong together. We need a way to look at small local patches, reuse the same little pattern-detector everywhere, and gradually build from tiny edges up to whole objects.",
    analogy:
      "It's like reading a newspaper through a magnifying glass: you don't read the whole page at once, you glide the glass across it, and the same glass works in every corner.",
    explanation: [
      "A filter (also called a kernel) is a tiny grid of numbers — often 3x3 — that gets slid over every position of the image. At each spot it multiplies and sums, producing one number: 'how strongly does my pattern show up right here?'",
      "The output is a feature map — a new image that lights up wherever the filter's pattern (say, a vertical edge) appears. One filter finds one kind of pattern, so a layer uses many filters at once.",
      "Stack these layers and the patterns compound: early layers find edges, the next combine edges into corners and textures, deeper ones assemble shapes, and the final ones recognize whole objects like a cat's face. Nobody hand-writes these filters — the network learns them from examples.",
      "Two tricks keep it efficient: the same filter's weights are reused across the entire image (so 'edge' means the same thing top-left and bottom-right), and pooling shrinks the maps by keeping only the strongest signal in each little region.",
      "Use CNNs when your data has a grid structure where nearby values relate — photos, medical scans, even spectrograms of sound. Don't reach for them for plain tabular data like a spreadsheet of customer ages and incomes; a tree or a simple network is better there.",
    ],
    math: "Convolution at one spot: output = Σ (patch of image × filter weights) + bias, summed over the little window. It is the same weighted-sum-of-inputs a neuron does, just applied to a small square that slides across the whole image.",
    code: {
      language: "python",
      source: `import numpy as np

# a tiny 5x5 grayscale image (0 = black, 1 = white) with a bright square
img = np.array([
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0],
], dtype=float)

# a 3x3 filter that fires on vertical edges (dark-to-light left-to-right)
vertical_edge = np.array([
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1],
], dtype=float)

# slide the filter over every 3x3 patch
h, w = img.shape
out = np.zeros((h - 2, w - 2))
for r in range(h - 2):
    for c in range(w - 2):
        patch = img[r:r+3, c:c+3]
        out[r, c] = np.sum(patch * vertical_edge)  # multiply + sum

print(out)  # positive numbers mark left edges, negative mark right edges`,
      explanation:
        "The filter multiplies each patch of the image and sums it into one number; slide it everywhere and you get a map that lights up along the square's vertical edges.",
    },
    exercise: {
      prompt: "Swap in a horizontal-edge filter (rows of -1 on top, +1 on the bottom) and see the edge map change from vertical to horizontal.",
      starter: `edge = np.array([
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1],
], dtype=float)  # TODO: turn this into a horizontal-edge detector
out = np.zeros((h - 2, w - 2))
for r in range(h - 2):
    for c in range(w - 2):
        out[r, c] = np.sum(img[r:r+3, c:c+3] * edge)
print(out)`,
      solution: `edge = np.array([
    [-1, -1, -1],
    [ 0,  0,  0],
    [ 1,  1,  1],
], dtype=float)
out = np.zeros((h - 2, w - 2))
for r in range(h - 2):
    for c in range(w - 2):
        out[r, c] = np.sum(img[r:r+3, c:c+3] * edge)
print(out)`,
    },
    quiz: [
      {
        question: "What is a filter (kernel) in a CNN?",
        options: [
          "A small grid of numbers slid across the image to detect a specific pattern",
          "A setting that controls the learning rate",
          "The final list of class labels",
          "A tool that deletes noisy pixels",
        ],
        answerIndex: 0,
        explanation:
          "A filter is a tiny weight grid that slides over the image, and at each position it multiplies and sums to measure how strongly its pattern appears.",
      },
      {
        question: "Why do CNN layers stack instead of using one big layer?",
        options: [
          "To use more memory on purpose",
          "So early layers find simple edges and deeper layers combine them into shapes and objects",
          "Because one layer cannot run on a GPU",
          "To make the image bigger each time",
        ],
        answerIndex: 1,
        explanation:
          "Depth builds a hierarchy: edges become corners, corners become shapes, shapes become whole objects.",
      },
      {
        question: "When is a CNN a poor choice?",
        options: [
          "For photos",
          "For medical scans",
          "For a plain spreadsheet of unrelated columns like age and income",
          "For sound spectrograms",
        ],
        answerIndex: 2,
        explanation:
          "CNNs shine on grid data where neighbors relate. Plain tabular columns have no spatial structure, so trees or simple networks fit better.",
      },
    ],
    flashcards: [
      { front: "Filter / kernel", back: "A small weight grid slid over an image to detect one pattern, like a vertical edge." },
      { front: "Feature map", back: "The output image showing where a filter's pattern was found." },
      { front: "Pooling", back: "Shrinking a feature map by keeping the strongest signal in each small region." },
      { front: "Weight sharing", back: "Reusing the same filter across the whole image so a pattern means the same thing everywhere." },
    ],
    miniProject: {
      title: "Build a Digit Recognizer with Conv2D",
      brief: "Train a small CNN on the MNIST handwritten-digit dataset with Keras and watch it hit 98%+ accuracy.",
      steps: [
        "Load MNIST with keras.datasets.mnist and scale pixels to the 0-1 range.",
        "Stack a Conv2D(32, 3x3) + MaxPooling2D, then Conv2D(64, 3x3) + MaxPooling2D, then Flatten and a Dense(10, softmax).",
        "Compile with the adam optimizer and sparse_categorical_crossentropy loss, then fit for 5 epochs.",
        "Evaluate on the test set and print the accuracy.",
        "Show 5 test images alongside the model's predictions to see where it slips.",
      ],
    },
    industryUse: [
      "Tesla and other self-driving systems use CNNs to spot lane lines, pedestrians, and traffic signs from camera feeds",
      "Hospitals use CNNs to flag tumors and diabetic retinopathy in X-rays and retina scans",
      "Facebook and Google Photos use CNNs to detect and group faces so you can search your photo library",
    ],
    commonMistakes: [
      "Forgetting to scale pixels to 0-1 (divide by 255), which makes training slow and unstable — always normalize.",
      "Feeding images with the wrong shape; Conv2D expects a channel dimension, so reshape grayscale to (height, width, 1).",
      "Using huge filters like 11x11 everywhere; modern nets stack many small 3x3 filters instead, which is cheaper and works better.",
    ],
    interviewQuestions: [
      "Explain how convolution differs from a fully connected layer and why weight sharing matters.",
      "What does pooling do, and what do you lose and gain by using it?",
      "Why do early CNN layers learn edges while deeper layers learn objects?",
    ],
    papers: [
      { title: "ImageNet Classification with Deep CNNs (AlexNet)", url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html", year: 2012 },
      { title: "Gradient-Based Learning Applied to Document Recognition (LeNet)", url: "http://yann.lecun.com/exdb/publis/pdf/lecun-01a.pdf", year: 1998 },
    ],
    nextUp: ["transfer-learning", "vision-project"],
    cheatsheet: [
      "Filter slides over image -> feature map",
      "Small 3x3 filters, many of them per layer",
      "Edges -> shapes -> objects as you go deeper",
      "Pooling shrinks maps, keeps the strongest signal",
      "Always normalize pixels: img / 255.0",
      "Conv2D input shape: (height, width, channels)",
    ],
  },

  "transfer-learning": {
    story:
      "Imagine you need someone to inspect your factory's products for defects. You could raise a child from birth and spend 20 years teaching them everything about the world just to get an expert eye — insane. Or you hire a seasoned inspector who already knows shapes, textures, and edges from a lifetime of looking at things, and you spend one afternoon teaching them what YOUR specific defect looks like. Transfer learning is exactly that: you grab a model that already trained on millions of images, keep everything it learned about seeing, and only retrain the last little piece for your own task.",
    problem:
      "Training a vision model from scratch needs millions of labeled images and days on expensive GPUs — luxuries most people and companies don't have. But almost every image task shares the same low-level vision: edges, textures, colors, shapes. Redoing all that learning for every new problem is a colossal waste.",
    analogy:
      "It's like hiring an experienced chef and just teaching them your restaurant's one signature dish, instead of teaching a stranger how to hold a knife.",
    explanation: [
      "A pretrained model (like MobileNetV2 or ResNet) has already learned, from a giant dataset like ImageNet, a rich stack of feature detectors — edges near the input, whole-object detectors near the output. Those early features are useful for almost any image task.",
      "You load that model without its final classification layer (include_top=False), which strips off the part that named ImageNet's 1000 classes but keeps the powerful 'eyes'.",
      "You freeze the pretrained layers so their hard-won weights don't get wrecked, then bolt on a small new head — usually a pooling layer plus a Dense layer for YOUR classes — and train just that on your handful of images.",
      "Fine-tuning is the optional second step: once the new head is trained, you unfreeze the top few pretrained layers and train everything together at a tiny learning rate to squeeze out extra accuracy.",
      "Use transfer learning whenever you have a smallish dataset (hundreds to thousands of images) and a task similar to natural photos. Don't bother freezing everything if your images look nothing like ImageNet (say, raw radar), and don't train from scratch unless you truly have millions of labeled examples.",
    ],
    math: "No new formula — it's the same weighted sums and backpropagation. The trick is initialization: instead of starting weights at random, you start from weights already tuned on millions of images, so you begin near a good solution rather than in the dark.",
    code: {
      language: "python",
      source: `import tensorflow as tf
from tensorflow.keras import layers, models

# 1) load MobileNetV2 pretrained on ImageNet, WITHOUT its final classifier
base = tf.keras.applications.MobileNetV2(
    input_shape=(160, 160, 3),
    include_top=False,       # drop the 1000-class head
    weights="imagenet",      # keep the learned "eyes"
)
base.trainable = False       # freeze the borrowed knowledge

# 2) add a small new head for YOUR task (say, 2 classes)
model = models.Sequential([
    base,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(1, activation="sigmoid"),  # cat vs dog
])

model.compile(optimizer="adam",
              loss="binary_crossentropy",
              metrics=["accuracy"])
model.summary()  # only the tiny head's weights are trainable`,
      explanation:
        "MobileNetV2 loads with its pretrained vision frozen, and you add a lightweight head so training only tunes a few thousand new weights instead of millions.",
    },
    exercise: {
      prompt: "Switch the base model to ResNet50 (also pretrained on ImageNet) and keep it frozen. Everything else stays the same.",
      starter: `base = tf.keras.applications.MobileNetV2(
    input_shape=(160, 160, 3),
    include_top=False,
    weights="imagenet",
)  # TODO: use ResNet50 instead
base.trainable = False`,
      solution: `base = tf.keras.applications.ResNet50(
    input_shape=(160, 160, 3),
    include_top=False,
    weights="imagenet",
)
base.trainable = False`,
    },
    quiz: [
      {
        question: "What does include_top=False do when loading a pretrained model?",
        options: [
          "Removes the original final classification layer while keeping the learned feature detectors",
          "Deletes the whole model",
          "Freezes the learning rate",
          "Loads the model upside down",
        ],
        answerIndex: 0,
        explanation:
          "It strips the task-specific classifier head but keeps the reusable 'eyes' so you can attach your own head.",
      },
      {
        question: "Why do we freeze the pretrained layers at first?",
        options: [
          "To make training slower on purpose",
          "So their valuable pretrained weights are not destroyed while the new head learns",
          "Because frozen layers use no memory",
          "To convert the model to grayscale",
        ],
        answerIndex: 1,
        explanation:
          "Freezing protects the hard-won features while the small new head learns your classes from scratch.",
      },
      {
        question: "When is transfer learning most valuable?",
        options: [
          "When you have millions of labeled images and unlimited GPUs",
          "When you have a small dataset and a task similar to natural photos",
          "Only for text, never for images",
          "When you want to avoid using any neural network",
        ],
        answerIndex: 1,
        explanation:
          "With limited data, borrowing pretrained features gets you high accuracy fast; from scratch you'd need far more data.",
      },
    ],
    flashcards: [
      { front: "Transfer learning", back: "Reusing a model trained on a big dataset and retraining only a small part for your own task." },
      { front: "include_top=False", back: "Load a pretrained model without its original final classifier so you can add your own." },
      { front: "Freezing", back: "Locking pretrained weights so training doesn't overwrite them." },
      { front: "Fine-tuning", back: "Unfreezing the top pretrained layers and training at a tiny learning rate for extra accuracy." },
    ],
    miniProject: {
      title: "Flower Classifier in an Afternoon",
      brief: "Use MobileNetV2 to classify photos of 5 flower types from the tf_flowers dataset with barely any data.",
      steps: [
        "Load the tf_flowers dataset with tensorflow_datasets and resize images to 160x160.",
        "Load MobileNetV2 with include_top=False, weights='imagenet', and set base.trainable=False.",
        "Add GlobalAveragePooling2D and a Dense(5, softmax) head, then compile with adam.",
        "Train the frozen model for 10 epochs and note the accuracy.",
        "Unfreeze the top 20 layers, recompile at a tiny learning rate (1e-5), and fine-tune for a few more epochs.",
      ],
    },
    industryUse: [
      "Startups build custom product-recognition apps on top of Google's pretrained MobileNet instead of training from scratch",
      "Medical AI teams fine-tune ImageNet models to detect specific conditions from scans with only a few thousand labeled cases",
      "Retailers like Pinterest fine-tune pretrained vision models for visual search ('find products that look like this pin')",
    ],
    commonMistakes: [
      "Forgetting to freeze the base first, so random gradients from the fresh head smash the pretrained weights — freeze, train the head, then fine-tune.",
      "Using the wrong preprocessing; each pretrained model expects its own scaling (MobileNetV2 wants inputs in -1 to 1), so use the matching preprocess_input.",
      "Fine-tuning at a normal learning rate and destroying the features — always drop to a tiny rate like 1e-5 when unfreezing.",
    ],
    interviewQuestions: [
      "Walk through the two stages of transfer learning: feature extraction versus fine-tuning.",
      "Why do the early layers of a pretrained CNN transfer well across very different tasks?",
      "How would you decide how many layers to unfreeze for fine-tuning?",
    ],
    papers: [
      { title: "How transferable are features in deep neural networks?", url: "https://arxiv.org/abs/1411.1792", year: 2014 },
      { title: "MobileNetV2: Inverted Residuals and Linear Bottlenecks", url: "https://arxiv.org/abs/1801.04381", year: 2018 },
    ],
    nextUp: ["vision-project", "cnn"],
    cheatsheet: [
      "Load pretrained: include_top=False, weights='imagenet'",
      "base.trainable = False to freeze",
      "Add head: GlobalAveragePooling2D + Dense",
      "Train head first, then fine-tune top layers",
      "Fine-tune at a tiny learning rate (1e-5)",
      "Match the model's own preprocess_input",
    ],
  },

  "vision-project": {
    story:
      "You've got a folder of cat photos and a folder of dog photos, and you want your computer to look at a brand-new picture and say 'cat' or 'dog' — confidently, in milliseconds. Doing this from scratch would need a mountain of images and a week of training. Instead you'll stand on a giant's shoulders: borrow a model that already learned to see from millions of pictures, teach it your one job in a few minutes, check how well it does, and wrap it so anyone can drop in a photo and get an answer. This is the whole real-world computer-vision workflow, start to finish.",
    problem:
      "Telling cats from dogs is trivial for a toddler and weirdly hard to program by hand — there's no simple rule for 'catness'. You need a model that learns the difference from examples, but you don't have millions of labeled photos or a supercomputer. The project is to get a genuinely accurate classifier out of a small dataset and a laptop.",
    analogy:
      "It's like hiring that experienced art appraiser and showing them just your two paintings — cat and dog — until they can instantly call which is which.",
    explanation: [
      "Step 1, the data: Keras ships a ready-made cats-vs-dogs dataset. You split it into training, validation, and test sets, resize every image to a fixed size like 160x160, and batch them so the GPU can chew through them efficiently.",
      "Step 2, the model: load MobileNetV2 with include_top=False and weights='imagenet', freeze it, and add a tiny head (pooling + one output neuron with sigmoid) for the binary cat-or-dog decision.",
      "Step 3, train and fine-tune: train just the head first so it learns your two classes, then unfreeze the top layers and fine-tune at a tiny learning rate. Watch validation accuracy to catch overfitting.",
      "Step 4, evaluate: run the untouched test set and read accuracy, plus a confusion matrix to see whether it confuses fluffy dogs for cats. This is the honest score you'd report.",
      "Step 5, deploy: save the model with model.save(), then wrap it in a tiny Streamlit or Flask app where a user uploads a photo and gets 'Cat 97%' back. Use data augmentation (random flips, rotations) during training if your dataset is small — it fakes extra variety and fights overfitting.",
    ],
    math: "The output neuron gives a probability p between 0 and 1 via sigmoid. Predict 'dog' if p > 0.5, else 'cat'. Training minimizes binary cross-entropy: loss = −[y·log(p) + (1−y)·log(1−p)], which punishes confident wrong answers hard.",
    code: {
      language: "python",
      source: `import tensorflow as tf
from tensorflow.keras import layers, models

IMG = (160, 160)

# 1) load the cats-vs-dogs dataset, already split
train_ds, val_ds = tf.keras.utils.image_dataset_from_directory(
    "cats_and_dogs/train", image_size=IMG, batch_size=32,
    validation_split=0.2, subset="both", seed=42)

# 2) pretrained base, frozen, plus preprocessing + augmentation
base = tf.keras.applications.MobileNetV2(
    input_shape=IMG + (3,), include_top=False, weights="imagenet")
base.trainable = False

model = models.Sequential([
    layers.RandomFlip("horizontal"),
    layers.Rescaling(1./127.5, offset=-1),   # MobileNetV2 wants -1..1
    base,
    layers.GlobalAveragePooling2D(),
    layers.Dropout(0.2),
    layers.Dense(1, activation="sigmoid"),   # cat=0, dog=1
])

# 3) train the head
model.compile(optimizer="adam", loss="binary_crossentropy",
              metrics=["accuracy"])
model.fit(train_ds, validation_data=val_ds, epochs=5)

# 4) evaluate + 5) save for deployment
print(model.evaluate(val_ds))
model.save("cats_vs_dogs.keras")`,
      explanation:
        "This loads the images, stacks augmentation and a frozen MobileNetV2 under a small sigmoid head, trains, checks accuracy, and saves a deployable model file.",
    },
    exercise: {
      prompt: "Add a fine-tuning stage: unfreeze the base model, recompile at a tiny learning rate, and train a few more epochs.",
      starter: `base.trainable = False  # TODO: unfreeze and fine-tune at a small learning rate
# recompile and fit for a few more epochs here`,
      solution: `base.trainable = True
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=1e-5),
    loss="binary_crossentropy", metrics=["accuracy"])
model.fit(train_ds, validation_data=val_ds, epochs=3)`,
    },
    quiz: [
      {
        question: "Why use a pretrained MobileNetV2 instead of training a CNN from scratch for cats vs dogs?",
        options: [
          "Scratch training needs far more data and compute; pretrained features give high accuracy fast",
          "MobileNetV2 only works for cats",
          "Scratch models cannot classify images at all",
          "Pretrained models never overfit",
        ],
        answerIndex: 0,
        explanation:
          "With a small dataset and a laptop, borrowing pretrained vision features is the practical path to good accuracy.",
      },
      {
        question: "Why do we keep a separate test set the model never trained on?",
        options: [
          "To make training faster",
          "To get an honest measure of how it performs on unseen photos",
          "Because Keras requires exactly three sets",
          "To store extra images for later",
        ],
        answerIndex: 1,
        explanation:
          "Accuracy on data the model has seen is inflated; the untouched test set is the honest score.",
      },
    ],
    flashcards: [
      { front: "Data augmentation", back: "Random flips/rotations added during training to fake more variety and reduce overfitting." },
      { front: "Fine-tuning", back: "Unfreezing the pretrained base and training at a tiny learning rate for extra accuracy." },
      { front: "model.save()", back: "Writes the trained model to a file so an app can load it and make predictions." },
      { front: "Confusion matrix", back: "A table showing which classes the model mixes up (e.g. fluffy dogs called cats)." },
    ],
    miniProject: {
      title: "Cats vs Dogs Classifier — Ship It",
      brief: "Build, fine-tune, and deploy a cat-vs-dog classifier that reaches 95%+ accuracy, then put it behind a web app.",
      steps: [
        "Download the cats-vs-dogs dataset and split into train / validation / test with images resized to 160x160.",
        "Load MobileNetV2 (include_top=False, frozen), add a GlobalAveragePooling2D + Dense(1, sigmoid) head, and train the head for 5 epochs.",
        "Unfreeze the top layers and fine-tune at learning_rate=1e-5 until validation accuracy plateaus.",
        "Evaluate on the test set, print accuracy and a confusion matrix, and save with model.save('cats_vs_dogs.keras').",
        "Wrap it in a Streamlit app where a user uploads a photo and sees 'Cat' or 'Dog' with a confidence percentage.",
        "Resume line: 'Built and deployed a MobileNetV2 transfer-learning classifier reaching 96% test accuracy on cats vs dogs, served via a Streamlit web app.'",
      ],
    },
    industryUse: [
      "Insurance apps classify photos of vehicle damage to speed up claims, using the same transfer-learning workflow",
      "E-commerce sites auto-tag product photos by category so listings are searchable without manual labeling",
      "Wildlife researchers classify camera-trap images (which animal is this?) to monitor populations at scale",
    ],
    commonMistakes: [
      "Peeking at the test set during training or tuning, which inflates your reported accuracy — lock it away until the very end.",
      "Skipping data augmentation on a small dataset and then overfitting; add random flips and rotations to fight it.",
      "Using the wrong pixel scaling for the pretrained base — MobileNetV2 expects -1 to 1, so include the matching rescaling.",
    ],
    interviewQuestions: [
      "Walk me through your full pipeline from raw image folders to a deployed cat-vs-dog classifier.",
      "How would you tell if your model is overfitting, and what would you do about it?",
      "How would you serve this model to real users, and what are the latency and size trade-offs?",
    ],
    papers: [
      { title: "MobileNetV2: Inverted Residuals and Linear Bottlenecks", url: "https://arxiv.org/abs/1801.04381", year: 2018 },
    ],
    nextUp: ["transfer-learning", "deploy-streamlit"],
    cheatsheet: [
      "image_dataset_from_directory to load + split",
      "Freeze base -> train head -> fine-tune",
      "Augment small datasets (RandomFlip/Rotation)",
      "Rescale to -1..1 for MobileNetV2",
      "Judge on an untouched test set",
      "model.save('name.keras') then serve in Streamlit",
    ],
  },

  "rnn-lstm": {
    story:
      "Read this out loud: 'The stock had a rough morning but by afternoon it...' — your brain is already leaning toward 'recovered' or 'crashed' because you remember the whole sentence so far. Order and memory are everything: 'dog bites man' and 'man bites dog' use the same words but mean opposite things. A plain neural network looks at inputs one at a time with no memory of what came before. A Recurrent Neural Network (RNN) keeps a running memory, and an LSTM is a smarter RNN that decides what to hold onto and what to forget — like holding onto the subject of a sentence while ignoring the filler words.",
    problem:
      "Lots of data comes in sequences where order matters: sentences, stock prices, heartbeats, song notes. A normal network treats each input independently and has no sense of 'what came before', so it can't understand context. Worse, simple RNNs forget things from more than a few steps ago — by the end of a long paragraph they've lost the beginning.",
    analogy:
      "An LSTM is like reading a mystery novel with a notepad: you jot down the important clues (the murderer's name), scribble out red herrings, and carry that note all the way to the last page.",
    explanation: [
      "An RNN processes a sequence one step at a time and passes a hidden state — its memory — forward to the next step. So each word or price point is understood in the context of everything before it.",
      "Plain RNNs suffer from short memory: gradients shrink over long sequences (the vanishing gradient problem), so they forget early context. Ask them about the start of a long paragraph and they've lost it.",
      "An LSTM (Long Short-Term Memory) fixes this with a cell state — a memory conveyor belt — controlled by three gates: a forget gate (drop what's no longer useful), an input gate (write in new relevant info), and an output gate (decide what to expose right now).",
      "This gating lets an LSTM carry information across hundreds of steps — remembering the subject of a sentence long enough to pick the right verb, or a stock's opening trend to predict its close.",
      "Use RNNs/LSTMs when order carries meaning: text, time series, sensor streams, speech. Don't use them for unordered data like a table of independent rows, and for very long sequences or top accuracy, know that Transformers (coming up) have largely overtaken them.",
    ],
    math: "The forget gate is f = sigmoid(W·[previous memory-output, new input] + b), a number between 0 and 1 for each memory slot: 0 means 'erase this', 1 means 'keep it fully'. The cell state is updated by multiplying old memory by f (forgetting) and adding new gated information.",
    code: {
      language: "python",
      source: `import tensorflow as tf
from tensorflow.keras import layers, models

# classify movie reviews as positive/negative from word sequences
VOCAB, MAXLEN = 10000, 200

model = models.Sequential([
    layers.Embedding(VOCAB, 32, input_length=MAXLEN),  # words -> vectors
    layers.LSTM(64),                                   # memory over the sequence
    layers.Dense(1, activation="sigmoid"),             # positive vs negative
])

model.compile(optimizer="adam",
              loss="binary_crossentropy",
              metrics=["accuracy"])
model.summary()
# feed padded integer sequences (each review = list of word IDs) to model.fit`,
      explanation:
        "The Embedding turns words into vectors, the LSTM reads them in order while carrying memory, and the final neuron decides if the whole review is positive or negative.",
    },
    exercise: {
      prompt: "Make the model read the sequence in both directions by wrapping the LSTM in a Bidirectional layer.",
      starter: `model = models.Sequential([
    layers.Embedding(VOCAB, 32, input_length=MAXLEN),
    layers.LSTM(64),  # TODO: make this bidirectional
    layers.Dense(1, activation="sigmoid"),
])`,
      solution: `model = models.Sequential([
    layers.Embedding(VOCAB, 32, input_length=MAXLEN),
    layers.Bidirectional(layers.LSTM(64)),
    layers.Dense(1, activation="sigmoid"),
])`,
    },
    quiz: [
      {
        question: "What makes an RNN different from a plain feedforward network?",
        options: [
          "It carries a hidden state (memory) forward, so each step sees the context before it",
          "It only works on images",
          "It has no weights to learn",
          "It processes all inputs at once with no order",
        ],
        answerIndex: 0,
        explanation:
          "RNNs pass a hidden state from step to step, giving them memory of what came earlier in the sequence.",
      },
      {
        question: "What problem do LSTM gates solve?",
        options: [
          "They make the model run on a CPU",
          "They let the network keep useful long-range information and forget irrelevant noise",
          "They remove the need for training data",
          "They turn text into images",
        ],
        answerIndex: 1,
        explanation:
          "The forget, input, and output gates control the cell state so important context survives across long sequences.",
      },
      {
        question: "Which task is a poor fit for an LSTM?",
        options: [
          "Predicting the next word in a sentence",
          "Forecasting tomorrow's temperature from past days",
          "Classifying independent rows in a spreadsheet where order is meaningless",
          "Transcribing speech to text",
        ],
        answerIndex: 2,
        explanation:
          "LSTMs exploit order; unordered tabular rows have no sequence to remember, so a simpler model fits better.",
      },
    ],
    flashcards: [
      { front: "RNN", back: "A network that reads a sequence one step at a time, carrying a hidden state (memory) forward." },
      { front: "Hidden state", back: "The running memory an RNN passes from one step to the next." },
      { front: "LSTM", back: "An RNN with a cell state and gates that keep useful long-range info and forget noise." },
      { front: "Forget gate", back: "The part of an LSTM that decides how much old memory to erase at each step." },
    ],
    miniProject: {
      title: "Sentiment Analyzer for Movie Reviews",
      brief: "Train an LSTM on the IMDB dataset to read a movie review and predict thumbs up or down.",
      steps: [
        "Load keras.datasets.imdb (reviews already encoded as word-ID sequences) and pad them to a fixed length.",
        "Build Embedding -> LSTM(64) -> Dense(1, sigmoid) and compile with adam.",
        "Train for a few epochs and track validation accuracy.",
        "Test it on a couple of reviews you write yourself and print the predicted sentiment.",
        "Swap in a Bidirectional LSTM and see if accuracy improves.",
      ],
    },
    industryUse: [
      "Banks use LSTMs on transaction sequences to flag fraud that only looks suspicious in order",
      "Weather and energy firms forecast demand and temperature from time-series histories with LSTMs",
      "Speech systems and older Google Translate versions used LSTMs to turn ordered audio and words into text",
    ],
    commonMistakes: [
      "Feeding sequences of different lengths without padding them to a common length — pad (and mask) first.",
      "Using a plain RNN on long sequences and blaming the data when it forgets the start — reach for an LSTM or GRU.",
      "Shuffling the time steps within a sequence, which destroys the very order the model needs — only shuffle whole samples.",
    ],
    interviewQuestions: [
      "Explain the vanishing gradient problem and how LSTMs mitigate it.",
      "Describe the roles of the forget, input, and output gates in an LSTM.",
      "When would you choose an LSTM over a Transformer, and vice versa?",
    ],
    papers: [
      { title: "Long Short-Term Memory", url: "https://www.bioinf.jku.at/publications/older/2604.pdf", year: 1997 },
      { title: "Learning to Forget: Continual Prediction with LSTM", url: "https://direct.mit.edu/neco/article/12/10/2451/6415", year: 2000 },
    ],
    nextUp: ["attention", "transformers"],
    cheatsheet: [
      "Sequences: order and memory matter",
      "RNN passes a hidden state step to step",
      "Plain RNNs forget long-range context",
      "LSTM = cell state + forget/input/output gates",
      "Pad sequences to equal length before training",
      "Transformers now beat LSTMs on most NLP tasks",
    ],
  },
};
