export type ProjectLink = {
  kind: "repository" | "official" | "report";
  href: string;
};

export type Project = {
  id: string;
  category: "runtime" | "hardware" | "model" | "research";
  status: "preview" | "active" | "research";
  title: string;
  description: {
    en: string;
    zh: string;
  };
  outcome: {
    en: string;
    zh: string;
  };
  technologies: string[];
  links: ProjectLink[];
};

export const projects: Project[] = [
  {
    id: "argus",
    category: "runtime",
    status: "preview",
    title: "Argus",
    description: {
      en: "A persistent, reviewed multi-agent runtime for long-horizon research and engineering.",
      zh: "面向长程研究与工程任务的持久化、多角色独立验收 Agent runtime。",
    },
    outcome: {
      en: "Manager, Planner, Engineer, and Reviewer sustain work beyond a single model turn.",
      zh: "由 Manager、Planner、Engineer 与 Reviewer 让任务跨越单次模型对话持续推进。",
    },
    technologies: ["Python", "Multi-agent", "CLI", "WebUI"],
    links: [
      { kind: "repository", href: "https://github.com/lbx154/Argus" },
      { kind: "official", href: "https://github.com/microsoft/ArgusAgent" },
      { kind: "report", href: "https://arxiv.org/abs/2608.05144" },
    ],
  },
  {
    id: "ace-2",
    category: "hardware",
    status: "active",
    title: "ACE-2",
    description: {
      en: "An evidence-first Qwen2.5-0.5B W4A8 accelerator with a verified 24-layer RTL cascade.",
      zh: "面向 Qwen2.5-0.5B W4A8 的 evidence-first 加速器，完成 24 层 RTL 级联验证。",
    },
    outcome: {
      en: "13,914/13,914 commands, 0.614 mm², 62,283 cells, and SKY130 at 100 MHz.",
      zh: "13,914/13,914 条命令通过，0.614 mm²、62,283 cells，SKY130 100 MHz。",
    },
    technologies: ["SystemVerilog", "W4A8", "SKY130", "RTL"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ace-2" },
    ],
  },
  {
    id: "ace-3",
    category: "hardware",
    status: "active",
    title: "ACE-3",
    description: {
      en: "A standalone Qwen2.5-0.5B-Instruct AWQ W4A16 RTL system with an authenticated Hybrid RTL runtime.",
      zh: "独立的 Qwen2.5-0.5B-Instruct AWQ W4A16 RTL 系统，带可认证 Hybrid RTL runtime。",
    },
    outcome: {
      en: "A verified 24-layer cascade and an expanding mixed-precision accelerator roadmap.",
      zh: "已验证 24 层级联，并持续推进混合精度加速器路线。",
    },
    technologies: ["Python", "SystemVerilog", "AWQ W4A16", "Hybrid RTL"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ace-3" },
    ],
  },
  {
    id: "minimax-h3-mac",
    category: "model",
    status: "active",
    title: "MiniMax-H3 for Mac",
    description: {
      en: "Argus localization for deploying and accelerating MiniMax-H3 on Apple Silicon.",
      zh: "在 Apple Silicon 上部署并加速 MiniMax-H3 的 Argus 本地化方案。",
    },
    outcome: {
      en: "A practical path for running the model on an M4 Pro with 24 GB unified memory.",
      zh: "让 MiniMax-H3 可在 24 GB 统一内存的 M4 Pro 上实际运行。",
    },
    technologies: ["MLX", "Apple Silicon", "Python", "MiniMax-H3"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/minimax-h3-mac" },
    ],
  },
  {
    id: "minimax-h3-desktop",
    category: "model",
    status: "active",
    title: "MiniMax-H3 Desktop",
    description: {
      en: "Full MiniMax-H3 video and stereo-audio generation on a single RTX A6000.",
      zh: "在单张 RTX A6000 上运行完整 MiniMax-H3 视频与立体声音频生成。",
    },
    outcome: {
      en: "1344×768 video, stereo audio, 6.16× Turbo, and formal Sol-Attn N=10.",
      zh: "1344×768 视频、立体声音频、6.16× Turbo，并完成 Sol-Attn N=10。",
    },
    technologies: ["CUDA", "RTX A6000", "Video", "Audio"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/minimax-h3-desktop" },
    ],
  },
  {
    id: "comfyui-minimax-h3",
    category: "model",
    status: "active",
    title: "ComfyUI MiniMax-H3 MLX",
    description: {
      en: "ComfyUI video and stereo-audio nodes for MiniMax-H3 on Apple Silicon Macs.",
      zh: "面向 Apple Silicon Mac 的 MiniMax-H3 ComfyUI 视频与立体声音频节点。",
    },
    outcome: {
      en: "A visual workflow for operating the MLX-based MiniMax-H3 stack.",
      zh: "通过可视化工作流使用基于 MLX 的 MiniMax-H3 技术栈。",
    },
    technologies: ["ComfyUI", "MLX", "Apple Silicon", "Python"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ComfyUI-MiniMax-H3-MLX" },
    ],
  },
  {
    id: "hilbert16",
    category: "research",
    status: "research",
    title: "Hilbert16 Dual Argus Observatory",
    description: {
      en: "A bilingual observatory for two isolated Argus research processes studying Hilbert's sixteenth problem.",
      zh: "由两个相互隔离的 Argus 研究进程探索 Hilbert 第十六问题的双语观测站。",
    },
    outcome: {
      en: "Public research trails make parallel autonomous investigation inspectable.",
      zh: "公开保存并行自主研究轨迹，使研究过程可以被持续观察和审查。",
    },
    technologies: ["Mathematics", "TeX", "Research agents", "Bilingual"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/Hilbert16-Dual-Argus-Observatory" },
    ],
  },
];
