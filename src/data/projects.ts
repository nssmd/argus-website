export type ProjectLink = {
  kind: "repository" | "official" | "report";
  href: string;
};

export type ProjectCategory = "runtime" | "hardware" | "model" | "research";

type LocalizedText = {
  en: string;
  zh: string;
};

export type ProjectDomain = {
  id: ProjectCategory;
  label: LocalizedText;
  eyebrow: LocalizedText;
  headline: LocalizedText;
  description: LocalizedText;
  highlights: {
    title: LocalizedText;
    body: LocalizedText;
  }[];
};

export type Project = {
  id: string;
  category: ProjectCategory;
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

export const projectDomains: ProjectDomain[] = [
  {
    id: "runtime",
    label: { en: "Agent runtime", zh: "Agent Runtime" },
    eyebrow: { en: "Persistent autonomy", zh: "持续自主运行" },
    headline: {
      en: "Systems that keep intelligent work moving beyond a single conversation.",
      zh: "让智能工作跨越单次对话，持续规划、执行与验收。",
    },
    description: {
      en: "This domain develops the runtime, interfaces, memory, and independent review needed for long-horizon agents to operate reliably.",
      zh: "这一领域构建长程 Agent 所需的运行时、交互界面、记忆系统与独立验收机制。",
    },
    highlights: [
      {
        title: { en: "Long-horizon operation", zh: "长程运行" },
        body: { en: "Carry objectives across sessions, failures, and changing environments.", zh: "让目标跨越会话、故障与环境变化持续推进。" },
      },
      {
        title: { en: "Independent review", zh: "独立验收" },
        body: { en: "Separate execution from evidence-based acceptance.", zh: "将任务执行与基于证据的验收明确分离。" },
      },
      {
        title: { en: "Reusable capability", zh: "能力沉淀" },
        body: { en: "Turn trajectories into memory, skills, tools, and evaluations.", zh: "把工作轨迹沉淀为记忆、Skill、工具与评测。" },
      },
    ],
  },
  {
    id: "hardware",
    label: { en: "Chips and RTL", zh: "芯片与 RTL" },
    eyebrow: { en: "AI systems in silicon", zh: "面向硅实现的 AI 系统" },
    headline: {
      en: "From quantized model behavior to verified, silicon-ready architectures.",
      zh: "从量化模型行为走向经过验证、面向硅实现的体系结构。",
    },
    description: {
      en: "The ACE line connects model semantics, quantization, cycle-accurate validation, RTL implementation, and physical evidence.",
      zh: "ACE 系列连接模型语义、量化、周期级验证、RTL 实现与物理实现证据。",
    },
    highlights: [
      {
        title: { en: "Model-faithful execution", zh: "模型一致执行" },
        body: { en: "Preserve quantized model behavior from software reference to RTL.", zh: "从软件参考到 RTL 保持量化模型行为一致。" },
      },
      {
        title: { en: "Evidence-first RTL", zh: "证据优先 RTL" },
        body: { en: "Treat commands, layers, synthesis, and timing as auditable evidence.", zh: "把命令、网络层、综合与时序作为可审计证据。" },
      },
      {
        title: { en: "Precision roadmap", zh: "精度路线" },
        body: { en: "Expand from fixed quantization toward mixed-precision acceleration.", zh: "从固定量化持续扩展到混合精度加速。" },
      },
    ],
  },
  {
    id: "model",
    label: { en: "Model deployment", zh: "模型部署" },
    eyebrow: { en: "Frontier models, practical hardware", zh: "让前沿模型进入可用硬件" },
    headline: {
      en: "Bring advanced multimodal models onto hardware people can actually use.",
      zh: "让先进多模态模型在用户真正拥有的硬件上运行。",
    },
    description: {
      en: "These projects adapt, accelerate, and package demanding model stacks for Apple Silicon, desktop GPUs, and visual workflows.",
      zh: "这些项目面向 Apple Silicon、桌面 GPU 与可视化工作流适配、加速并封装高要求模型栈。",
    },
    highlights: [
      {
        title: { en: "Local execution", zh: "本地运行" },
        body: { en: "Move capable models from datacenter assumptions to personal hardware.", zh: "把依赖数据中心的模型带到个人硬件环境。" },
      },
      {
        title: { en: "Measured acceleration", zh: "可测量加速" },
        body: { en: "Optimize memory, kernels, and attention with reproducible results.", zh: "以可复现结果优化内存、Kernel 与 Attention。" },
      },
      {
        title: { en: "Usable workflows", zh: "可用工作流" },
        body: { en: "Expose complex stacks through direct and visual interfaces.", zh: "通过直接接口与可视化界面提供复杂模型能力。" },
      },
    ],
  },
  {
    id: "research",
    label: { en: "Autonomous research", zh: "自主研究" },
    eyebrow: { en: "Research as an observable process", zh: "可观察的自主研究过程" },
    headline: {
      en: "Make long-running investigations inspectable, auditable, and cumulative.",
      zh: "让长程研究过程可以被观察、审查并持续积累。",
    },
    description: {
      en: "This domain opens the full path from question and failed attempts to evidence, revision, and public research artifacts.",
      zh: "这一领域公开从问题、失败尝试到证据、修正与研究产物的完整路径。",
    },
    highlights: [
      {
        title: { en: "Parallel inquiry", zh: "并行探索" },
        body: { en: "Let isolated research processes test distinct paths independently.", zh: "让相互隔离的研究进程独立检验不同路线。" },
      },
      {
        title: { en: "Visible trajectories", zh: "公开轨迹" },
        body: { en: "Preserve hypotheses, pivots, failures, and intermediate evidence.", zh: "保留假设、改道、失败与中间证据。" },
      },
      {
        title: { en: "Cumulative knowledge", zh: "知识积累" },
        body: { en: "Turn each investigation into reusable context for the next one.", zh: "把每次研究转化为下一次可以复用的上下文。" },
      },
    ],
  },
];

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
