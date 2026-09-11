import { sourcePreview } from "./projectUpdates";

export type ProjectLink = {
  kind: "repository" | "official" | "report" | "evidence" | "demo" | "status" | "documentation" | "license";
  href: string;
};

export type ProjectCategory = "runtime" | "hardware" | "model" | "mathematics";

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
  problem: {
    en: string;
    zh: string;
  };
  highlights: {
    en: string[];
    zh: string[];
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
      en: "Argus provides long-horizon orchestration; Argus-Pi develops its execution layer, while optional workbenches such as CrystalPilot extend it into specialist research.",
      zh: "Argus 提供长程组织与验收，Argus-Pi 改进执行层，CrystalPilot 等可选工作台将其扩展到专业科研。",
    },
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
  },
  {
    id: "mathematics",
    label: { en: "Mathematics", zh: "数学研究" },
    eyebrow: { en: "Autonomous mathematical inquiry", zh: "自主数学探索" },
    headline: {
      en: "Explore difficult mathematical questions through parallel, inspectable reasoning.",
      zh: "通过并行、可观察的推理过程探索困难数学问题。",
    },
    description: {
      en: "This domain applies Argus to open mathematical problems while preserving conjectures, failed paths, revisions, and public research artifacts.",
      zh: "这一领域将 Argus 用于开放数学问题，并保留猜想、失败路线、修正过程与公开研究产物。",
    },
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
    problem: {
      en: "Most coding agents are organized around one conversation or one bounded task. Long-running work needs durable state, explicit authority boundaries, independent review, and a way to continue after sessions, failures, and environment changes.",
      zh: "多数编码 Agent 围绕一次对话或单个有界任务组织。长程工作还需要持久状态、明确的权责边界、独立验收，以及在会话结束、运行失败和环境变化后继续推进的能力。",
    },
    highlights: {
      en: [
        "Manager, Planner, Engineer, and Reviewer separate campaign control, task selection, execution, and evidence-based acceptance.",
        "Durable project state retains tasks, checkpoints, decisions, skills, and evidence across sessions and runtime upgrades.",
        "The technical report records about 78% on SWE-Bench Pro versus 59% for Direct Copilot, with 1.41× aggregate tokens.",
        "Six paper pipelines completed 254 missions with 16 stage rollbacks recorded in the report.",
        `Source preview reviewed ${sourcePreview.reviewedOn}: streamed Manager replies and tool-call display, task-map and activity-feed improvements, and optional workbench integration. These changes follow desktop v${sourcePreview.desktopBaseline}; they are not included in that installer or automatically synchronized to the official source repository.`,
      ],
      zh: [
        "Manager、Planner、Engineer 与 Reviewer 分别负责项目控制、任务选择、执行和基于证据的验收。",
        "持久化项目状态能够跨会话和运行时升级保留任务、检查点、决策、Skills 与证据。",
        "技术报告记录 SWE-Bench Pro 约 78%，Direct Copilot 为 59%，总 Token 使用量为 1.41 倍。",
        "报告中的六条论文流水线共完成 254 个 mission，并发生 16 次阶段回滚。",
        `${sourcePreview.reviewedOn} 核对的开发源码新增 Manager 流式回复、工具调用展示、任务地图与活动记录改进，以及可选工作台集成；这些改动晚于桌面 v${sourcePreview.desktopBaseline}，不在该安装包中，也不代表官方源码仓库已同步。`,
      ],
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
      { kind: "status", href: sourcePreview.changesUrl },
    ],
  },
  {
    id: "argus-pi",
    category: "runtime",
    status: "preview",
    title: "Argus-Pi",
    description: {
      en: "The team's Pi-based inference and execution layer for Argus, available as a source preview.",
      zh: "团队为 Argus 维护的 Pi 推理与执行层，目前提供源码预览。",
    },
    problem: {
      en: "Research execution needs faithful role instructions, inspectable document reads, and failures that remain visible through pipelines and handoffs. This fork improves the Pi layer without replacing Argus orchestration.",
      zh: "研究执行需要准确保留角色指令、按需读取文档，并在命令管道与任务交接中保留真实失败。该分支改进 Pi 执行层，不替代 Argus 的组织与验收。",
    },
    highlights: {
      en: [
        "Preserves the pi CLI, configuration and provider authentication; argus-pi is an additional executable name. It uses the existing pi backend, not a tenth Argus backend.",
        "Reads selected PDF pages and notebook cells with source context and saved-output inventories. PDF extraction is not OCR, figure inspection or layout review; stored notebook output is not evidence of a fresh run.",
        "Local Bash pipefail and signal-aware status handling keep failed commands observable instead of reporting a successful pipe or a missing exit code as success.",
        "The argus branch is a source preview, with no separately published package or binary release. Upstream Pi installation and self-update do not install this fork.",
        "Small prompt-profile trials are not evidence of general performance superiority; comparisons must retain failures and incomplete deliverables.",
      ],
      zh: [
        "保留 pi CLI、配置与 Provider 登录，argus-pi 是附加可执行名称；仍使用既有 pi 后端，不是第十个 Argus 后端。",
        "可按页读取 PDF、按单元格读取 Notebook，保留来源与已保存输出清单。PDF 文本提取不是 OCR、看图或布局审核；Notebook 旧输出也不证明刚刚运行成功。",
        "本地 Bash 的 pipefail 与信号状态处理让命令失败保持可见，不把管道末端成功或缺少退出码误当成整段成功。",
        "argus 分支目前是源码预览，没有独立发布的软件包或二进制安装包；安装或自更新上游 Pi 不会得到此分支。",
        "小规模提示词试验不等于通用性能领先；比较仍需保留失败与未完成交付。",
      ],
    },
    outcome: {
      en: "A source-preview execution layer with bounded document reads and explicit failure reporting.",
      zh: "以源码预览提供按范围读取文档与明确失败报告的执行层。",
    },
    technologies: ["TypeScript", "Pi", "PDF", "Notebook"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/Argus-Pi" },
      { kind: "documentation", href: "https://github.com/Argus-AiTeam/Argus-Pi/blob/argus/README.md" },
    ],
  },
  {
    id: "crystalpilot",
    category: "runtime",
    status: "preview",
    title: "Argus CrystalPilot",
    description: {
      en: "An independently distributed, optional crystallography workbench with Chinese and English interfaces.",
      zh: "独立分发的可选晶体学研究工作台，支持中文与英文界面。",
    },
    problem: {
      en: "Diffraction processing, structure solution, refinement and 3D crystal research need a specialist scientific environment. CrystalPilot adds that workbench to compatible Argus hosts without bundling its scientific core into Argus itself.",
      zh: "衍射数据处理、结构求解、精修与三维晶体研究需要专业科学环境。CrystalPilot 为兼容的 Argus 宿主增加工作台，不把科学核心直接打入 Argus 默认安装。",
    },
    highlights: {
      en: [
        "Version 0.4.0 is independently distributed. Its host integration is in the development source reviewed on 2026-09-11, not in desktop v0.1.5; no workbench plugin is enabled by default.",
        "Compatible hosts install the pinned, SHA-256-checked package from the plugin center into an isolated environment. Supported backends are Codex, Copilot and Pi, including supported mixed-role configurations.",
        "Prepares scientific dependencies automatically; optional or licensed dependencies remain explicit. SHELX requires authorization from its author. Scientific binaries, model credentials and research datasets are not bundled in the distribution.",
        "Separate workbench conversations and project bindings preserve ownership. Updates are manual and staged; uninstalling preserves research data, conversations and reusable software.",
        "Proprietary: TopoSpace reserves all rights and prohibits unauthorized commercial use or derivative development. Public source availability is not an open-source license; the host integration and third-party components have separate terms.",
      ],
      zh: [
        "0.4.0 独立分发；宿主集成位于 2026-09-11 核对的开发源码，不在桌面 v0.1.5 中，默认不启用任何工作台插件。",
        "兼容宿主通过插件中心安装固定版本、经过 SHA-256 核对的软件包，并使用隔离环境；支持 Codex、Copilot、Pi 及这些后端的混合角色配置。",
        "自动准备科学依赖，缺失的可选或授权组件会明确提示；SHELX 需向原作者取得许可。发行物不包含上游科学二进制、模型凭据或研究数据。",
        "独立工作台会话与项目绑定保留权属边界；更新需手动触发并分阶段切换，卸载保留研究数据、对话和可复用软件。",
        "专有许可：TopoSpace 保留全部权利，未经许可禁止商用或二次开发。公开源码不等于开源授权；宿主集成与第三方组件适用各自条款。",
      ],
    },
    outcome: {
      en: "Optional CrystalPilot 0.4.0 distribution for plugin-capable development-source hosts.",
      zh: "为具备插件能力的开发源码宿主提供可选 CrystalPilot 0.4.0。",
    },
    technologies: ["Crystallography", "Python", "Codex / Copilot / Pi", "Bilingual"],
    links: [
      { kind: "documentation", href: "https://crystalpilot-downloads.argusbot.cn/" },
      { kind: "status", href: "https://github.com/lbx154/Argus/blob/ed13672c4d/docs/workbench-plugins.md" },
      { kind: "license", href: "https://github.com/lbx154/Argus/blob/ed13672c4d/docs/workbench-plugins.md#crystalpilot-licensing" },
    ],
  },
  {
    id: "ace-2",
    category: "hardware",
    status: "active",
    title: "ACE-2",
    description: {
      en: "A Qwen2.5-0.5B W4A8 research project with preserved Alpha-2/3 RTL and SKY130 evidence.",
      zh: "面向 Qwen2.5-0.5B W4A8 的研究项目，保留已认证的 Alpha-2/3 RTL 与 SKY130 证据。",
    },
    problem: {
      en: "ACE-2's certified baseline tested whether a resource-shared Transformer inference datapath could preserve deterministic fixed-point behavior from a software oracle through RTL simulation, mapped SKY130 synthesis, and timing analysis.",
      zh: "ACE-2 已认证的基线验证了资源共享 Transformer 推理数据通路从软件定点参考到 RTL 仿真、SKY130 映射综合和时序分析的一致性，并保留可审计的证据边界。",
    },
    highlights: {
      en: [
        "18/18 Layer-0 fixed-point operator boundaries passed.",
        "13,914/13,914 runtime commands passed across a demonstrated 24-layer, two-token path.",
        "Mapped SKY130 result: 62,283 cells, 0.614082704 mm² non-SRAM area, and a 100 MHz target with +0.6966 ns setup slack.",
        "The fused-QKV path reduced three commands to one and simulator cycles from 1,044,326 to 805,011 while matching all 1,152 output bytes.",
        "These are preserved Alpha-2/3 results. Current work is local simulation and software research; later hardware Stage 2, FPGA, synthesis/PPA, and U280 work are cancelled.",
      ],
      zh: [
        "Layer-0 的 18/18 个定点算子边界全部通过。",
        "在已展示的 24 层、双 Token 路径上，13,914/13,914 条 runtime 命令全部通过。",
        "SKY130 映射结果为 62,283 cells、0.614082704 mm² 非 SRAM 面积，100 MHz 目标下 setup slack 为 +0.6966 ns。",
        "融合 QKV 路径把三条命令合并为一条，仿真周期由 1,044,326 降至 805,011，且 1,152 个输出字节全部匹配。",
        "以上为保留的 Alpha-2/3 成果。当前工作聚焦本地仿真与软件研究；后续硬件 Stage 2、FPGA、综合/PPA 和 U280 工作已取消。",
      ],
    },
    outcome: {
      en: "Certified baseline: 13,914/13,914 commands, 0.614 mm², 62,283 cells, and SKY130 at 100 MHz.",
      zh: "已认证基线：13,914/13,914 条命令通过，0.614 mm²、62,283 cells，SKY130 100 MHz。",
    },
    technologies: ["SystemVerilog", "W4A8", "SKY130", "RTL"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ace-2" },
      { kind: "evidence", href: "https://github.com/Argus-AiTeam/ace-2/blob/main/CERTIFICATION.md" },
      { kind: "status", href: "https://github.com/Argus-AiTeam/ace-2/blob/main/docs/results/PUBLICATION_BOUNDARY.md" },
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
    problem: {
      en: "ACE-3 establishes a reproducible hardware boundary for native asymmetric INT4 AWQ inference, including official tensor binding, complete projection reductions, FP16 operators, causal KV state, and authenticated simulator state.",
      zh: "ACE-3 为原生非对称 INT4 AWQ 推理建立可复现的硬件边界，覆盖官方 Tensor 绑定、完整投影归约、FP16 算子、因果 KV 状态与可认证仿真状态。",
    },
    highlights: {
      en: [
        "The accepted full-24 fixture consumed all 624/624 official decoder tensors.",
        "Post-layer-23 Token 1 maximum absolute hidden-state error was 0.0898849897, within the published 0.125 bound.",
        "One indexed decoder engine is reused across all 24 official layers with native AWQ W4A16 G128 arithmetic.",
        "The current public scope is pre-synthesis RTL evidence; it does not claim measured latency, area, power, FPGA execution, or readable RTL dialogue.",
      ],
      zh: [
        "已验收的完整 24 层 fixture 使用了 624/624 个官方 Decoder Tensor。",
        "第 23 层之后 Token 1 的隐藏状态最大绝对误差为 0.0898849897，低于公开的 0.125 上限。",
        "一个带索引的 Decoder Engine 在全部 24 个官方层之间复用，并执行原生 AWQ W4A16 G128 算术。",
        "当前公开范围是综合前 RTL 证据，不声称已有实测延迟、面积、功耗、FPGA 执行或可读 RTL 对话。",
      ],
    },
    outcome: {
      en: "A verified 24-layer cascade and an expanding mixed-precision accelerator roadmap.",
      zh: "已验证 24 层级联，并持续推进混合精度加速器路线。",
    },
    technologies: ["Python", "SystemVerilog", "AWQ W4A16", "Hybrid RTL"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ace-3" },
      { kind: "status", href: "https://github.com/Argus-AiTeam/ace-3/blob/main/docs/STATUS.md" },
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
    problem: {
      en: "The upstream BF16 DiT is about 62 GiB, far beyond the tested Mac's 24 GB unified memory. The project streams text-encoder layers and DiT blocks so the complete documented generation path can run without loading the whole transformer at once.",
      zh: "上游 BF16 DiT 约为 62 GiB，远超测试机器的 24 GB 统一内存。项目通过流式加载文本编码器层与 DiT Block，在不同时驻留完整 Transformer 的情况下运行完整生成路径。",
    },
    highlights: {
      en: [
        "Generated a 1344×768, 124-frame, 24 FPS video with stereo audio on a 24 GB Apple M4 Pro MacBook Pro.",
        "The documented BF16 + Turbo run completed in 2,878.7 seconds with an approximately 15.8 GB measured peak memory footprint.",
        "The default streaming path keeps only small groups of the 50 main DiT blocks resident at a time.",
        "A separate calibrated INT8 route quantizes 254 linear layers while retaining four sensitive projections in BF16.",
      ],
      zh: [
        "在 24 GB Apple M4 Pro MacBook Pro 上生成 1344×768、124 帧、24 FPS 且带立体声的视频。",
        "公开的 BF16 + Turbo 运行耗时 2,878.7 秒，实测峰值内存约 15.8 GB。",
        "默认流式路径在任一时刻只驻留 50 个主要 DiT Block 中的一小组。",
        "独立的校准 INT8 路径量化了 254 个线性层，并将四个敏感投影保留为 BF16。",
      ],
    },
    outcome: {
      en: "A practical path for running the model on an M4 Pro with 24 GB unified memory.",
      zh: "让 MiniMax-H3 可在 24 GB 统一内存的 M4 Pro 上实际运行。",
    },
    technologies: ["MLX", "Apple Silicon", "Python", "MiniMax-H3"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/minimax-h3-mac" },
      { kind: "demo", href: "https://github.com/Argus-AiTeam/minimax-h3-mac/blob/main/examples/bf16-turbo-768p/output-bf16-turbo-1344x768-5s.mp4" },
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
    problem: {
      en: "The roughly 134.16 GiB MiniMax-H3 FL2VA checkpoint is much larger than one RTX A6000's 48 GB VRAM. The project builds explicit fidelity and approximation lanes, same-GPU benchmarks, structural AV validation, and retained negative results.",
      zh: "约 134.16 GiB 的 MiniMax-H3 FL2VA Checkpoint 远大于单张 RTX A6000 的 48 GB 显存。项目建立了明确区分的保真与近似路线、同卡基准、音视频结构验证以及保留失败结果的实验记录。",
    },
    highlights: {
      en: [
        "BF16 dense baseline formal N=10 median: 1,792.202 seconds for the fixed 1344×768 short workload.",
        "Turbo 8-step formal N=10 median: 290.998 seconds, reported as 6.159×, with a 12/12 visual suite.",
        "The bounded five-step Sol-Attn lane recorded a 15.203% median HTTP-time improvement in matched N=10 runs.",
        "Public outputs include prompts, MP4s, contact sheets, hashes, frame/audio checks, GPU memory, power, and temperature metadata.",
      ],
      zh: [
        "固定 1344×768 短视频工作负载的 BF16 Dense Baseline 正式 N=10 中位数为 1,792.202 秒。",
        "Turbo 8-step 正式 N=10 中位数为 290.998 秒，报告加速为 6.159×，视觉检查为 12/12。",
        "限定在五步路线的 Sol-Attn 在同条件 N=10 中记录了 15.203% 的 HTTP 时间中位数改进。",
        "公开产物包含 Prompt、MP4、Contact Sheet、哈希、帧与音频检查、GPU 内存、功耗和温度元数据。",
      ],
    },
    outcome: {
      en: "1344×768 video, stereo audio, 6.16× Turbo, and formal Sol-Attn N=10.",
      zh: "1344×768 视频、立体声音频、6.16× Turbo，并完成 Sol-Attn N=10。",
    },
    technologies: ["CUDA", "RTX A6000", "Video", "Audio"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/minimax-h3-desktop" },
      { kind: "report", href: "https://github.com/Argus-AiTeam/minimax-h3-desktop/blob/main/technical_report/minimax_h3_a6000_performance.md" },
      { kind: "demo", href: "https://github.com/Argus-AiTeam/minimax-h3-desktop/blob/main/examples/a6000-turbo-8step-niulai-inspired/niulai-inspired-forest-awakening-turbo-8step.mp4" },
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
    problem: {
      en: "The underlying Mac implementation is command-line oriented. This plugin exposes model loading, generation, optional image/audio conversion, and MP4 saving through a ComfyUI node graph while avoiding unnecessary full float32 frame materialization.",
      zh: "底层 Mac 实现以命令行为主。这个插件把模型加载、生成、可选的图像与音频转换以及 MP4 保存接入 ComfyUI 节点图，并尽量避免不必要的完整 Float32 帧展开。",
    },
    highlights: {
      en: [
        "Provides four nodes covering model loading, video-and-audio generation, ComfyUI conversion, and direct MP4 saving.",
        "Supports both the upstream BF16 path and the calibrated INT8 path on arm64 Apple Silicon Macs.",
        "The intermediate MINIMAX_H3_RESULT can be saved directly without constructing a full float32 ComfyUI image batch.",
        "The public package declares Python 3.11+ and recommends at least 24 GB unified memory plus sufficient SSD capacity.",
      ],
      zh: [
        "提供四个节点，覆盖模型加载、视频与音频生成、ComfyUI 数据转换和直接保存 MP4。",
        "在 arm64 Apple Silicon Mac 上支持上游 BF16 路径和校准 INT8 路径。",
        "中间类型 MINIMAX_H3_RESULT 可以直接保存，不必构造完整 Float32 ComfyUI 图像批次。",
        "公开包要求 Python 3.11+，建议至少 24 GB 统一内存和足够的 SSD 空间。",
      ],
    },
    outcome: {
      en: "A visual workflow for operating the MLX-based MiniMax-H3 stack.",
      zh: "通过可视化工作流使用基于 MLX 的 MiniMax-H3 技术栈。",
    },
    technologies: ["ComfyUI", "MLX", "Apple Silicon", "Python"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ComfyUI-MiniMax-H3-MLX" },
      { kind: "documentation", href: "https://github.com/Argus-AiTeam/ComfyUI-MiniMax-H3-MLX/blob/main/README.md" },
    ],
  },
  {
    id: "argus-mathematics",
    category: "mathematics",
    status: "active",
    title: "Argus Mathematics",
    description: {
      en: "Seventeen public Argus mathematical result packages with reviewed source records, technical reports, explicit claim boundaries, certificates, and reproducible verification.",
      zh: "集中公开十七项 Argus 数学成果包，包含经审查的来源记录、技术报告、精确结论边界、证书与可复现验证材料。",
    },
    problem: {
      en: "Mathematical research produced by autonomous agents needs more than a result announcement. Claims must remain connected to their exact scope, reports, source interpretation, machine-checkable evidence, review status, and unresolved neighboring statements.",
      zh: "自主 Agent 产生的数学研究不能只发布一个结论。每项成果都需要持续关联其精确命题范围、技术报告、来源解释、机器可检查证据、审查状态，以及仍未解决的相邻问题。",
    },
    highlights: {
      en: [
        "Archives seventeen public result packages spanning low-dimensional topology and foliations, Riemannian and algebraic geometry, complex analysis and harmonic measure, geometric group theory and Kleinian groups, set theory, lattices and spherical designs, graph theory, convex geometry, beta-transformations and Salem numbers, arithmetic dynamics, and braid-group algebra.",
        "Includes nine independently replayable computational certificates, a Lean-checked logical composition, technical reports, and checksums for 81 public artifacts. The latest package answers Stephen Bigelow's zipper-algebra twist question at the representation level.",
        "Connects archived results to Argus Open. The dated portal snapshot below distinguishes active campaigns, processed audit records and novelty decisions from the archive's certified artifacts.",
        "Separates original constructions from literature reconstructions, historical negative results, scope corrections, active research, and claims whose novelty is not yet certified.",
        "Original archive materials are All Rights Reserved following reported authorship misuse; accurate citation remains welcome.",
      ],
      zh: [
        "归档十七个公开成果包，覆盖低维拓扑与叶状结构、黎曼与代数几何、复分析与调和测度、几何群论与 Kleinian 群、集合论、格与球面设计、图论、凸几何、β-变换与 Salem 数、算术动力系统和辫群代数。",
        "包含九个可独立重放的计算证书、一项 Lean 逻辑组合检查，以及技术报告和 81 个公开产物的校验值。最新成果包在表示层回答了 Stephen Bigelow 提出的 zipper algebra twist 问题。",
        "将归档成果与 Argus Open 连接；下方带时间的门户快照分别展示活跃研究、审计记录与新颖性裁决，不与档案中的已认证产物混为同一统计。",
        "明确区分原创构造、文献重建、历史负面结论、范围修正、研究中项目，以及尚未完成新颖性认证的结论。",
        "鉴于已出现公开成果材料被他人冒充署名的情况，档案原创材料现明确保留全部权利；仍欢迎规范引用。",
      ],
    },
    outcome: {
      en: "Seventeen mathematical result packages preserved with explicit scope, review status, and public evidence.",
      zh: "十七个数学成果包以明确命题范围、审查状态和公开证据长期保存。",
    },
    technologies: ["Mathematics", "Lean", "Python", "Reproducible research"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/argus-mathematics" },
      { kind: "status", href: "https://open.argusbot.cn/" },
      { kind: "evidence", href: "https://github.com/Argus-AiTeam/argus-mathematics/blob/main/data/results.json" },
      { kind: "license", href: "https://github.com/Argus-AiTeam/argus-mathematics/blob/main/LICENSE" },
      { kind: "documentation", href: "https://open.argusbot.cn/catalog" },
    ],
  },
  {
    id: "hilbert16",
    category: "mathematics",
    status: "research",
    title: "Hilbert16 Dual Argus Observatory",
    description: {
      en: "A bilingual observatory for two isolated Argus research processes studying Hilbert's sixteenth problem.",
      zh: "由两个相互隔离的 Argus 研究进程探索 Hilbert 第十六问题的双语观测站。",
    },
    problem: {
      en: "Parallel mathematical agents can accidentally share assumptions or treat agreement as proof. The observatory enforces separate workspaces, scoped exchanges, evidence classes, and a single-writer synthesis boundary for Part II of Hilbert's sixteenth problem.",
      zh: "并行数学 Agent 可能意外共享假设，或把彼此认同误当成证明。这个观测站针对 Hilbert 第十六问题第二部分，设置独立工作区、受限交流、证据分类和单写入者综合边界。",
    },
    highlights: {
      en: [
        "Argus A studies theory, finiteness, upper constraints, and configurations; Argus B studies constructions, lower bounds, bifurcations, and computational falsification.",
        "A coordinator is the only writer of the public observatory and the only broker of deliberately limited exchanges between the two processes.",
        "A deterministic monitor generates public status from durable state instead of model-authored progress prose.",
        "The project does not claim a complete solution; running missions and agent agreement are explicitly not treated as mathematical proof.",
      ],
      zh: [
        "Argus A 研究理论、有限性、上界约束和构型；Argus B 研究构造、下界、分岔与计算反证。",
        "Coordinator 是公开观测站的唯一写入者，也是两个研究进程之间受限交流的唯一中介。",
        "确定性 Monitor 从持久状态生成公开进度，而不是采用模型自行撰写的状态描述。",
        "项目不声称已经完整解决该问题；正在运行的任务和 Agent 之间的一致意见都不会被当作数学证明。",
      ],
    },
    outcome: {
      en: "Public research trails make parallel autonomous investigation inspectable.",
      zh: "公开保存并行自主研究轨迹，使研究过程可以被持续观察和审查。",
    },
    technologies: ["Mathematics", "TeX", "Research agents", "Bilingual"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/Hilbert16-Dual-Argus-Observatory" },
      { kind: "status", href: "https://github.com/Argus-AiTeam/Hilbert16-Dual-Argus-Observatory/blob/main/status/live.md" },
    ],
  },
];
