export type Result = {
  arena: string;
  context: string;
  result: string;
  comparison: string;
  accent: "blue" | "gold";
};

export const results: Result[] = [
  {
    arena: "NVIDIA SOL-ExecBench",
    context: "B200 · 101 kernels",
    result: "Global #6 · 2× #1 · 7 top-3",
    comparison: "Two head-to-head wins over Recursive",
    accent: "gold"
  },
  {
    arena: "nanochat · B200",
    context: "5 min · 1×B200 · 426 attempts",
    result: "0.9636 BPB",
    comparison: "Human SOTA: 0.9646",
    accent: "blue"
  },
  {
    arena: "nanochat · H100",
    context: "5 min · 1×H100 · 37 mechanisms",
    result: "0.9855 BPB",
    comparison: "Human SOTA: 0.9879",
    accent: "blue"
  },
  {
    arena: "nanoGPT speedrun",
    context: "8×H100 · N=10",
    result: "79.77 seconds",
    comparison: "Same-device human #83: 80.18s",
    accent: "gold"
  },
  {
    arena: "AARRI-Bench",
    context: "82 research-intern tasks",
    result: "63/82 · 76.8%",
    comparison: "Paper-reported best: 68.3%",
    accent: "blue"
  },
  {
    arena: "Arbor · RUC NLPIR",
    context: "Math-Reasoning Data",
    result: "28.0 gap",
    comparison: "Arbor 20.83 · Claude Code 8.33 · Codex 6.25",
    accent: "gold"
  }
];
