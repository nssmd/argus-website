export type ProjectLink = {
  kind: "repository" | "official" | "report" | "evidence" | "demo" | "status" | "documentation";
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
      en: "This domain develops the runtime, interfaces, memory, and independent review needed for long-horizon agents to operate reliably.",
      zh: "这一领域构建长程 Agent 所需的运行时、交互界面、记忆系统与独立验收机制。",
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
      ],
      zh: [
        "Manager、Planner、Engineer 与 Reviewer 分别负责项目控制、任务选择、执行和基于证据的验收。",
        "持久化项目状态能够跨会话和运行时升级保留任务、检查点、决策、Skills 与证据。",
        "技术报告记录 SWE-Bench Pro 约 78%，Direct Copilot 为 59%，总 Token 使用量为 1.41 倍。",
        "报告中的六条论文流水线共完成 254 个 mission，并发生 16 次阶段回滚。",
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
    problem: {
      en: "ACE-2 tests whether a resource-shared Transformer inference datapath can preserve deterministic fixed-point behavior from a software oracle through RTL simulation, mapped SKY130 synthesis, and timing analysis.",
      zh: "ACE-2 验证资源共享的 Transformer 推理数据通路，能否从软件定点参考一路保持到 RTL 仿真、SKY130 映射综合和时序分析，并保留可审计的证据边界。",
    },
    highlights: {
      en: [
        "18/18 Layer-0 fixed-point operator boundaries passed.",
        "13,914/13,914 runtime commands passed across a demonstrated 24-layer, two-token path.",
        "Mapped SKY130 result: 62,283 cells, 0.614082704 mm² non-SRAM area, and a 100 MHz target with +0.6966 ns setup slack.",
        "The fused-QKV path reduced three commands to one and simulator cycles from 1,044,326 to 805,011 while matching all 1,152 output bytes.",
      ],
      zh: [
        "Layer-0 的 18/18 个定点算子边界全部通过。",
        "在已展示的 24 层、双 Token 路径上，13,914/13,914 条 runtime 命令全部通过。",
        "SKY130 映射结果为 62,283 cells、0.614082704 mm² 非 SRAM 面积，100 MHz 目标下 setup slack 为 +0.6966 ns。",
        "融合 QKV 路径把三条命令合并为一条，仿真周期由 1,044,326 降至 805,011，且 1,152 个输出字节全部匹配。",
      ],
    },
    outcome: {
      en: "13,914/13,914 commands, 0.614 mm², 62,283 cells, and SKY130 at 100 MHz.",
      zh: "13,914/13,914 条命令通过，0.614 mm²、62,283 cells，SKY130 100 MHz。",
    },
    technologies: ["SystemVerilog", "W4A8", "SKY130", "RTL"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/ace-2" },
      { kind: "evidence", href: "https://github.com/Argus-AiTeam/ace-2/blob/main/CERTIFICATION.md" },
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
      en: "Ten public Argus mathematical result packages with technical reports, explicit claim boundaries, certificates, and reproducible verification.",
      zh: "集中公开十项 Argus 数学成果包，包含技术报告、精确结论边界、证书与可复现验证材料。",
    },
    problem: {
      en: "Mathematical research produced by autonomous agents needs more than a result announcement. Claims must remain connected to their exact scope, reports, source interpretation, machine-checkable evidence, review status, and unresolved neighboring statements.",
      zh: "自主 Agent 产生的数学研究不能只发布一个结论。每项成果都需要持续关联其精确命题范围、技术报告、来源解释、机器可检查证据、审查状态，以及仍未解决的相邻问题。",
    },
    highlights: {
      en: [
        "Archives ten public result packages spanning low-dimensional topology and foliations, Riemannian and algebraic geometry, graph theory, convex geometry, arithmetic dynamics, and braid-group algebra.",
        "Includes six independently replayable computational certificates, a Lean-checked logical composition, technical reports, certificates, and checksums for 59 public artifacts.",
        "Connects completed results to the live Argus Open program, which tracks 757 historical problem records and 30 active research targets.",
        "Separates original constructions from literature reconstructions, historical negative results, scope corrections, active research, and claims whose novelty is not yet certified.",
      ],
      zh: [
        "归档十个公开成果包，覆盖低维拓扑与叶状结构、黎曼与代数几何、图论、凸几何、算术动力系统和辫群代数。",
        "包含六个可独立重放的计算证书、一项 Lean 逻辑组合检查，以及技术报告、证书和 59 个公开产物的校验值。",
        "将已完成成果与 Argus Open 实时研究体系连接；该体系当前覆盖 757 条历史问题记录和 30 个研究目标。",
        "明确区分原创构造、文献重建、历史负面结论、范围修正、研究中项目，以及尚未完成新颖性认证的结论。",
      ],
    },
    outcome: {
      en: "Ten mathematical result packages preserved with explicit scope, review status, and public evidence.",
      zh: "十个数学成果包以明确命题范围、审查状态和公开证据长期保存。",
    },
    technologies: ["Mathematics", "Lean", "Python", "Reproducible research"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/argus-mathematics" },
      { kind: "status", href: "https://open.argusbot.cn/" },
      { kind: "evidence", href: "https://github.com/Argus-AiTeam/argus-mathematics/blob/main/data/results.json" },
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
