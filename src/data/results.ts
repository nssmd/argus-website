export type Result = {
  arena: string;
  context: string;
  result: string;
  comparison: string;
  accent: "blue" | "gold";
  href?: string;
};

export const results: Result[] = [
  {
    arena: "SWE-Bench Pro",
    context: "731 software-repair tasks · GPT-5.5/xhigh",
    result: "≈78% accuracy",
    comparison: "Direct Copilot ≈59%; 1.41× aggregate Tokens",
    accent: "gold"
  },
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
    comparison: "Human best: 0.9646",
    accent: "blue"
  },
  {
    arena: "nanochat · H100",
    context: "5 min · 1×H100 · 37 mechanisms",
    result: "0.9855 BPB",
    comparison: "Human best: 0.9879",
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
  },
  {
    arena: "MLE-Bench Lite",
    context: "Official Low split · partial report snapshot",
    result: "9 medals · 3 gold / 3 silver / 3 bronze",
    comparison: "Full split still running; excluded from the primary seven-arena table",
    accent: "blue",
    href: "https://github.com/openai/mle-bench"
  },
  {
    arena: "ChipBench",
    context: "44 Verilog generation + 89 debugging tasks · ≤5 attempts",
    result: "45.5% generation · 66.3% debugging",
    comparison: "Pass@1: 34.1% / 46.1%; unfinished reference-model track excluded",
    accent: "gold",
    href: "https://github.com/zhongkaiyu/ChipBench"
  },
  {
    arena: "Razavi-Bench",
    context: "50 analog-IC questions · 3 full-Argus rollouts",
    result: "150/150 answers · 87.0% exploratory",
    comparison: "Temporary substitute-judge mean; official benchmark score pending",
    accent: "blue",
    href: "https://github.com/Arcadia-1/razavi-bench"
  }
];
