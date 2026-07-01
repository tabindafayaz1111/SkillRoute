export interface TimelineEvent {
  year: number;
  title: string;
  who: string;
  blurb: string;
  tag: "Idea" | "Breakthrough" | "Model" | "Milestone";
}

export const aiTimeline: TimelineEvent[] = [
  { year: 1958, title: "The Perceptron", who: "Frank Rosenblatt", tag: "Idea", blurb: "The first trainable artificial neuron — the seed of every neural network today." },
  { year: 1986, title: "Backpropagation popularised", who: "Rumelhart, Hinton, Williams", tag: "Breakthrough", blurb: "An efficient way to train multi-layer networks, reviving neural nets from a long winter." },
  { year: 1997, title: "LSTM", who: "Hochreiter & Schmidhuber", tag: "Model", blurb: "Networks that remember long-range patterns — powered translation and speech for years." },
  { year: 2012, title: "AlexNet", who: "Krizhevsky, Sutskever, Hinton", tag: "Breakthrough", blurb: "Crushed ImageNet with GPUs + deep CNNs, kicking off the deep learning boom." },
  { year: 2014, title: "GANs", who: "Ian Goodfellow", tag: "Model", blurb: "Two networks duel to generate realistic images — the ancestor of AI art." },
  { year: 2015, title: "ResNet", who: "He et al. (Microsoft)", tag: "Breakthrough", blurb: "Skip connections let networks go 100+ layers deep without collapsing." },
  { year: 2016, title: "AlphaGo beats Lee Sedol", who: "DeepMind", tag: "Milestone", blurb: "Reinforcement learning masters Go, a game long thought decades away." },
  { year: 2017, title: "Attention Is All You Need", who: "Vaswani et al. (Google)", tag: "Model", blurb: "The Transformer — the architecture behind virtually every modern LLM." },
  { year: 2018, title: "BERT", who: "Devlin et al. (Google)", tag: "Model", blurb: "Bidirectional pretraining that transformed how machines understand language." },
  { year: 2020, title: "GPT-3", who: "OpenAI", tag: "Model", blurb: "175B parameters showed that scale unlocks surprising few-shot abilities." },
  { year: 2020, title: "AlphaFold 2", who: "DeepMind", tag: "Milestone", blurb: "Solved protein folding to near-experimental accuracy — a science landmark." },
  { year: 2022, title: "Diffusion goes mainstream", who: "Stable Diffusion / DALL·E 2", tag: "Breakthrough", blurb: "High-quality image generation from text reaches everyone's laptop." },
  { year: 2022, title: "ChatGPT", who: "OpenAI", tag: "Milestone", blurb: "Instruction-tuned LLMs reach 100M users — AI enters daily life." },
];

export const landmarkPapers = [
  { title: "Attention Is All You Need", year: 2017, url: "https://arxiv.org/abs/1706.03762", why: "Introduced the Transformer — read this if you read only one." },
  { title: "ImageNet Classification with Deep CNNs (AlexNet)", year: 2012, url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html", why: "The paper that started the modern deep learning era." },
  { title: "Deep Residual Learning (ResNet)", year: 2015, url: "https://arxiv.org/abs/1512.03385", why: "Made very deep networks trainable via skip connections." },
  { title: "BERT", year: 2018, url: "https://arxiv.org/abs/1810.04805", why: "Bidirectional pretraining for language understanding." },
  { title: "Denoising Diffusion Probabilistic Models", year: 2020, url: "https://arxiv.org/abs/2006.11239", why: "The maths behind modern image generators." },
];
