import { sourcePreview } from "./projectUpdates";
import { desktopRelease } from "./desktopRelease";

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

export const windowsReleaseNotes = {
  en: [
    `Windows v${desktopRelease.windows.version} keeps in-memory drafts and attachments per session and protects new input during uploads or sends. This does not preserve drafts across a page refresh. Notifications open the corresponding session's result while respecting your latest navigation.`,
    "Plugins, Skills and Knowledge now sit above the session list. Source-bound Chinese names, guides and search cover 211 bundled Skills and references without replacing their execution text or rewriting user and third-party files. Read-only diffs offer highlighting, original text and copy; Windows knowledge reads handle CRLF newlines.",
    "This installer uses a frozen development branch and does not include the later main-branch research orchestration, mission-recovery and runtime-incident fixes. A newer source snapshot is not an installer feature list.",
    `Windows v${desktopRelease.windows.version} defaults to the map when no workspace is explicitly selected or saved. Its Skill file browser covers global, vertical and project Skills with recent updates; these are reusable files, not proof of model-weight training.`,
    "Interactive research proposals support duration, resource, dependency and deadline planning, plus version comparison. Saving a proposal does not launch experiments or change the backlog; estimates are not guaranteed deadlines.",
    "Ordinary research reading includes “Ask this step”: a valid saved source and explicit submission are required; read-only views cannot submit. Answers use the saved explanation and its task/event snapshots, are saved separately without changing research tasks, and do not count as research progress. Problem background notes remain an opt-in experimental preview. Generation uses a model and counts toward usage; teaching review is not scientific acceptance.",
    "Windows installation adds in-place upgrade protection and improves backend recovery for existing installations. Stopping the current Manager reply does not stop team tasks or undo work already dispatched.",
    "Own-account cost accounting distinguishes priced and unresolved usage: the default unpriced-cost policy can stop later own-account calls. Trial users' local dollar records remain not_billed; trial token quotas are enforced server-side. This is not a universal block across modes.",
  ],
  zh: [
    `Windows v${desktopRelease.windows.version} 按会话保留内存草稿与附件，并保护上传或发送过程中的新输入；不保证刷新页面后仍保留草稿。通知可定位对应会话的成果，同时尊重用户最近一次导航。`,
    "插件、技能库和知识库入口集中到会话列表上方。211 项随包技能与参考资料提供来源绑定的中文名称、导读和搜索，不替换执行原文，也不改写用户或第三方文件。只读 diff 支持着色、原文与复制，知识库读取兼容 Windows CRLF 换行。",
    "此安装包基于冻结的开发分支，不包含随后 main 合入的研究编排、任务恢复及运行时 incident 修复；不能把最新源码变化全部算作安装包功能。",
    `Windows v${desktopRelease.windows.version} 在没有显式选择或已保存工作区时默认进入地图。Skill 文件浏览器覆盖全局、领域和项目 Skills，并展示最近更新；这些是可复用文件，不是模型权重训练的证明。`,
    "交互式研究方案支持时长、资源、依赖和截止日期规划，以及版本比较。保存方案不会启动实验或改变 backlog；估算不等于保证按期完成。",
    "普通研究阅读已包含“问这一步”：需有有效的已保存来源并由用户明确提交，只读视图不能提交新问题。回答依据保存的说明与任务／事件快照另存，不修改研究任务，也不算新的研究进展。问题基础说明仍是需显式启用的实验预览。生成过程调用模型并计入用量；教学复核不等于科研结论验收。",
    "Windows 安装增加原地升级保护，并改善已有安装的后端恢复。停止当前 Manager 回复不等于停止团队任务，也不会撤销已派发的工作。",
    "自有账户费用核算区分已定价和未解决的用量；默认的未定价费用策略可能阻止后续自有账户调用。试用用户的本地美元记录仍标记为 not_billed，token 额度由服务端执行；并非所有模式都会因此阻塞。",
  ],
} as const;

export const macReleaseNotes = {
  en: [
    `Mac v${desktopRelease.mac.version} ships separate Apple Silicon and Intel DMGs for macOS 13+. It bundles the frozen Python backend and Web workbench; trial setup needs no preinstalled Python, uv or Node.js. Own-account use still requires the chosen Agent CLI and its account.`,
    "Finder launches now discover Homebrew CLIs on both architectures and locate Node for npm-installed CLI scripts, without editing shell startup files or the system PATH. Connection failures retain specific errors while hiding the trial Key.",
    "Download this Mac update manually from its versioned release page: GitHub's Latest marker remains on the Windows release. Stop the local backend and quit before replacing the app, eject the DMG, then launch from Applications. The app is not Apple Developer ID signed or notarized; use Privacy & Security → Open Anyway if blocked, without disabling Gatekeeper.",
    "The release reports a real Copilot-account reply on Apple Silicon, not verification of every backend account or long-running research task. Existing Codex, Claude, Cursor, Pi and other backend choices remain available.",
  ],
  zh: [
    `Mac v${desktopRelease.mac.version} 分别提供 Apple Silicon 与 Intel DMG，最低 macOS 13。包内带冻结 Python 后端和 Web 工作台；试用无需预装 Python、uv 或 Node.js。自带账号仍需准备所选 Agent CLI 与对应账号。`,
    "修复 Finder 启动时找不到两种架构的 Homebrew CLI，以及 npm 安装的 CLI 找不到 Node 的问题；不修改 shell 启动文件或系统 PATH。连接失败保留具体错误，并隐藏试用 Key。",
    "本次 Mac 更新请从对应版本发布页手动下载：GitHub 的 Latest 标记仍留给 Windows。替换前先停止本地后端并退出，安装后弹出 DMG，再从“应用程序”启动。应用未经过 Apple Developer ID 签名和公证；被阻止时使用“隐私与安全性 → 仍要打开”，不要关闭 Gatekeeper。",
    "发行说明记录了 Apple Silicon 上个人 Copilot 账号的真实回复，不代表每种后端账号或长程科研任务均已实测。既有 Codex、Claude、Cursor、Pi 等后端入口仍保留。",
  ],
} as const;

export const sourcePreviewNotes = {
  en: [
    `Development-source snapshot reviewed ${sourcePreview.reviewedOn} at ${sourcePreview.revision}. Release channels remain separate: ${desktopRelease.platformVersionLabel}. These source changes do not imply synchronization to microsoft/ArgusAgent or inclusion in every desktop package.`,
    "The knowledge browser separates global, vertical and project pages with search and recent updates. Latest main names the originating project in the knowledge feed and records Manager tool activity during chat turns, instead of equating every reply with a completed research task. Saved knowledge and Skills are reusable artifacts, not model-weight training.",
    "The research map presents work and review stages, recorded dependencies and mobile-friendly readers. Generated explanations and relationship labels do not change scheduling dependencies, rerun experiments or establish scientific acceptance; model-generated reading still counts toward usage.",
    "TypeScript migration is only beginning: shared event contracts and an experimental Pi streaming adapter are available in source. Python still owns production task state, budgets and stage transitions. The adapter is not a replacement argus command or a budgeted mission runner; full runtime parity is not claimed.",
    `Windows v${desktopRelease.windows.version} and Mac v${desktopRelease.mac.version} now include the 7-built-in / 17-community split and Vertical Store; Linux v${desktopRelease.linux.version} predates it. Packs install without pip, and dependency listings do not automatically install scientific Python dependencies. Hosted shared changes remain operator-controlled, while personal enable/disable choices stay separate.`,
    "For source developers, the Python package migrates from argus_skill to argus, with compatibility aliases for one release. Existing state locations and environment-variable spellings stay unchanged. This source migration does not require desktop users to reinstall.",
    "Hosted features require independent operator deployment and invitation-based authorization; ordinary desktop or Web installation does not enable the service. Hosted model and compute allowances remain separate from the desktop Key's one-million-token rule.",
    "Raw process observations cover Manager, Planner, Engineer and Reviewer records, including failed and interrupted attempts. Export checks purpose-specific authorization and revocation, but does not require per-sample quality approval or certify training readiness. Observations retain the application's system/developer inputs while excluding structured hidden reasoning and signatures; inspect and redact them before sharing.",
    "The separate, strict public/SFT export path still requires purpose-specific authorization, per-event review and renewed revocation checks; it excludes system inputs, private reasoning and credentials. External sharing needs separate authorization. Neither export path automatically uploads data or starts training.",
    "Community or plugin Skills are not automatically approved assets for strict public/SFT export; their availability or license does not replace authorization, review or filtering.",
  ],
  zh: [
    `${sourcePreview.reviewedOn} 核对的开发源码快照（${sourcePreview.revision}）。发行渠道仍需区分：${desktopRelease.platformVersionLabel}。这些源码改动不代表 microsoft/ArgusAgent 已同步，也不代表每个平台的安装包都已包含。`,
    "知识库按全局、领域和项目分层，支持搜索与最近更新。最新 main 会在知识动态中显示来源项目，并记录聊天期间 Manager 的工具活动，不把每次回复等同于完成科研任务。保存的知识与 Skills 是可复用产物，不是模型权重训练。",
    "研究地图呈现执行与验收阶段、已记录的依赖和适合手机阅读的详情。生成的解释与关系标签不改变调度依赖、不重跑实验，也不构成科研验收；模型生成的阅读说明仍计入用量。",
    "TypeScript 迁移刚起步：源码已提供共享事件协议与实验性 Pi 流式适配器。生产任务状态、预算与阶段转换仍由 Python 管理；适配器不是 argus 命令或带预算的任务执行器替代品，也未宣称完整运行时等价。",
    `Windows v${desktopRelease.windows.version} 与 Mac v${desktopRelease.mac.version} 已包含 7 个内置领域／17 个社区领域的拆分和 Vertical Store；Linux v${desktopRelease.linux.version} 早于此次变化。领域包安装无需 pip，依赖清单也不会自动安装科学 Python 依赖。托管共享变更仍由运营方控制，个人启用／停用选择与之分开。`,
    "面向源码开发者，Python 包从 argus_skill 迁移至 argus，旧名称兼容别名保留一个版本。既有状态位置和环境变量拼写不变；这次源码迁移不要求桌面用户重新安装。",
    "托管功能需要运营方独立部署和邀请授权，不会随普通桌面版或 Web 安装自动开放；模型与计算额度独立于桌面 Key 的 100 万 token 规则。",
    "原始过程观察覆盖 Manager、Planner、Engineer 与 Reviewer 的记录，包括失败和中断的尝试。导出检查用途授权与撤销状态，但不要求逐样本质量审批，也不代表已达到训练质量。观察记录会保留应用侧 system/developer 输入，排除结构化隐藏推理与签名；分享前需人工检查和脱敏。",
    "另一条严格的 public/SFT 样本导出路径仍要求用途授权、逐条审查及撤销状态复查，排除系统输入、私有推理和凭据。外部分享需另行授权。两种导出本身都不会自动上传数据或启动训练。",
    "社区或插件 Skills 不会自动成为严格 public/SFT 导出的获批素材；可用性或许可证不能替代用途授权、审查与过滤。",
  ],
} as const;

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
      en: "Argus provides long-horizon orchestration; Argus-Pi develops its execution layer. Argus Verticals distributes MIT community domain packs, separate from optional specialist workbenches such as CrystalPilot.",
      zh: "Argus 提供长程组织与验收，Argus-Pi 改进执行层。Argus Verticals 分发 MIT 社区领域包，与 CrystalPilot 等可选专业工作台相互独立。",
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
        `Since v${desktopRelease.linux.version}, desktop releases include Change Key controls that preserve projects and chat history, current backend/model/reasoning display, clearer theme icons and responsive titles. Account fences remain paused until explicit resumption; execution ending does not certify the research objective as complete.`,
        `Since v${desktopRelease.linux.version}, desktop releases include streamed Manager replies and tool-call display, map and activity-feed improvements, Excel (.xlsx) delivery recognition and optional workbench host integration. The bundled runtime supports stdin scripts (python -) and python -m unittest with test-failure exit codes preserved; it is not a general-purpose Python installation and provides neither pip nor venv.`,
        ...windowsReleaseNotes.en,
        ...macReleaseNotes.en,
        ...sourcePreviewNotes.en,
      ],
      zh: [
        "Manager、Planner、Engineer 与 Reviewer 分别负责项目控制、任务选择、执行和基于证据的验收。",
        "持久化项目状态能够跨会话和运行时升级保留任务、检查点、决策、Skills 与证据。",
        "技术报告记录 SWE-Bench Pro 约 78%，Direct Copilot 为 59%，总 Token 使用量为 1.41 倍。",
        "报告中的六条论文流水线共完成 254 个 mission，并发生 16 次阶段回滚。",
        `自 v${desktopRelease.linux.version} 起，桌面版已包含保留项目和聊天记录的更换 Key 入口、当前后端／模型／推理强度显示，以及更清晰的日夜图标和响应式标题。账户阻塞会保留为暂停，需显式恢复；执行结束不等于研究目标已通过验收。`,
        `自 v${desktopRelease.linux.version} 起，桌面版已包含 Manager 流式回复与工具调用展示、地图和活动记录改进、Excel（.xlsx）交付识别及可选工作台宿主集成。内置运行时支持标准输入脚本（python -）与 python -m unittest，保留测试失败退出码；它不是完整的通用 Python 环境，不提供 pip 或 venv。`,
        ...windowsReleaseNotes.zh,
        ...macReleaseNotes.zh,
        ...sourcePreviewNotes.zh,
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
      { kind: "documentation", href: sourcePreview.hostedGuideUrl },
      { kind: "documentation", href: sourcePreview.mapGuideUrl },
      { kind: "documentation", href: sourcePreview.typescriptGuideUrl },
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
        "In Argus-mode JSON output, a failed prompt does not report terminal failure before queued prompts finish; failed-attempt diagnostics and usage remain visible. includeOutputs=false keeps the normal read default.",
        "Downstream development now targets main. It remains a source preview, with no separately published package or binary release. Build from source with Node.js 22.19+ using the repository instructions; upstream Pi installation and self-update do not install this fork.",
        "Small prompt-profile trials are not evidence of general performance superiority; comparisons must retain failures and incomplete deliverables.",
      ],
      zh: [
        "保留 pi CLI、配置与 Provider 登录，argus-pi 是附加可执行名称；仍使用既有 pi 后端，不是第十个 Argus 后端。",
        "可按页读取 PDF、按单元格读取 Notebook，保留来源与已保存输出清单。PDF 文本提取不是 OCR、看图或布局审核；Notebook 旧输出也不证明刚刚运行成功。",
        "本地 Bash 的 pipefail 与信号状态处理让命令失败保持可见，不把管道末端成功或缺少退出码误当成整段成功。",
        "Argus 模式的 JSON 输出不会因前一条提示失败，就在后续排队提示处理完之前报告整次运行终止；失败尝试的诊断与用量保持可见。includeOutputs=false 沿用普通读取默认值。",
        "下游开发现以 main 为主分支，仍是源码预览，没有独立发布的软件包或二进制安装包。使用 Node.js 22.19+，按仓库说明从源码构建；安装或自更新上游 Pi 不会得到此分支。",
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
      { kind: "documentation", href: "https://github.com/Argus-AiTeam/Argus-Pi/blob/main/README.md" },
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
        `Version 0.4.0 is independently distributed. Desktop releases since v${desktopRelease.linux.version} include its host integration, but CrystalPilot still requires separate installation; no workbench plugin is enabled by default.`,
        "Compatible hosts install the pinned, SHA-256-checked package from the plugin center into an isolated environment. Supported backends are Codex, Copilot and Pi, including supported mixed-role configurations.",
        "Prepares scientific dependencies automatically; optional or licensed dependencies remain explicit. SHELX requires authorization from its author. Scientific binaries, model credentials and research datasets are not bundled in the distribution.",
        "Separate workbench conversations and project bindings preserve ownership. Updates are manual and staged; uninstalling preserves research data, conversations and reusable software.",
        "Proprietary: TopoSpace reserves all rights and prohibits unauthorized commercial use or derivative development. Public source availability is not an open-source license; the host integration and third-party components have separate terms.",
      ],
      zh: [
        `0.4.0 独立分发；桌面版自 v${desktopRelease.linux.version} 起已包含宿主集成，但 CrystalPilot 仍需单独安装，默认不启用任何工作台插件。`,
        "兼容宿主通过插件中心安装固定版本、经过 SHA-256 核对的软件包，并使用隔离环境；支持 Codex、Copilot、Pi 及这些后端的混合角色配置。",
        "自动准备科学依赖，缺失的可选或授权组件会明确提示；SHELX 需向原作者取得许可。发行物不包含上游科学二进制、模型凭据或研究数据。",
        "独立工作台会话与项目绑定保留权属边界；更新需手动触发并分阶段切换，卸载保留研究数据、对话和可复用软件。",
        "专有许可：TopoSpace 保留全部权利，未经许可禁止商用或二次开发。公开源码不等于开源授权；宿主集成与第三方组件适用各自条款。",
      ],
    },
    outcome: {
      en: `Optional CrystalPilot 0.4.0 for compatible Argus hosts, including ${desktopRelease.platformVersionLabel}.`,
      zh: `为兼容的 Argus 宿主提供可选 CrystalPilot 0.4.0，包括 ${desktopRelease.platformVersionLabel}。`,
    },
    technologies: ["Crystallography", "Python", "Codex / Copilot / Pi", "Bilingual"],
    links: [
      { kind: "documentation", href: "https://crystalpilot-downloads.argusbot.cn/" },
      { kind: "status", href: desktopRelease.linux.workbenchGuideUrl },
      { kind: "license", href: `${desktopRelease.linux.workbenchGuideUrl}#crystalpilot-licensing` },
    ],
  },
  {
    id: "argus-verticals",
    category: "runtime",
    status: "active",
    title: "Argus Verticals",
    description: {
      en: "Published MIT community domain packs for compatible Argus source and the newer Windows and Mac desktop releases.",
      zh: "已发布的 MIT 社区领域包，支持兼容的 Argus 源码及新版 Windows、Mac 桌面宿主。",
    },
    problem: {
      en: "Specialist Skills should be available per domain without bundling every field into the runtime. Argus Verticals separates reusable community packs from core built-ins and independently licensed workbenches.",
      zh: "专业 Skills 应能按领域获取，而不必全部打入运行时。Argus Verticals 将可复用社区包与核心内置领域、独立授权工作台分开。",
    },
    highlights: {
      en: [
        "Published 2026-09-14: MIT v0.1.0 provides 17 per-domain ZIP assets plus catalog.json and SHA256SUMS.",
        "These are 17 preexisting domains split out from Argus, spanning chips, circuits, materials, biomedical evidence, physics, quantitative research, literary research and benchmarks—not 17 new research results.",
        `Windows v${desktopRelease.windows.version}, Mac v${desktopRelease.mac.version} and compatible source include the Vertical Store and keep 7 built-in verticals. Linux v${desktopRelease.linux.version} predates this split; its package is not upgraded by the newer releases on other platforms.`,
        "The Vertical Store installs individual domain packs without pip. It lists dependencies but does not automatically install scientific Python dependencies; hosted shared changes remain operator-controlled and personal enable/disable choices remain separate.",
        "MIT community Skills are separate from proprietary CrystalPilot and do not bundle its scientific environment. Installing a pack does not approve its contents for strict public/SFT export or establish scientific results.",
      ],
      zh: [
        "2026-09-14 已发布：MIT 许可的 v0.1.0 提供 17 个按领域分发的 ZIP 资产，以及 catalog.json 和 SHA256SUMS。",
        "这是从 Argus 拆出的 17 个既有领域，涵盖芯片、电路、材料、生物医学证据、物理、量化研究、文学研究和基准测试，不是 17 项新的科研成果。",
        `Windows v${desktopRelease.windows.version}、Mac v${desktopRelease.mac.version} 及兼容源码已包含 Vertical Store，并保留 7 个内置领域。Linux v${desktopRelease.linux.version} 早于此次拆分，不会因其他平台发布新版而自动获得这些变化。`,
        "Vertical Store 按领域安装社区包，无需 pip；它列出依赖，但不会自动安装科学 Python 依赖。托管共享变更仍由运营方控制，个人启用／停用选择与之分开。",
        "MIT 社区 Skills 与专有 CrystalPilot 相互独立，不包含其科学环境。安装领域包不等于内容已获严格 public/SFT 导出批准，也不证明科研结论。",
      ],
    },
    outcome: {
      en: "Seventeen published community packs, with explicit source compatibility and MIT licensing.",
      zh: "十七个已发布社区领域包，明确标示源码兼容条件与 MIT 许可。",
    },
    technologies: ["Skills", "Domain packs", "MIT", "Vertical Store"],
    links: [
      { kind: "repository", href: "https://github.com/Argus-AiTeam/argus-verticals" },
      { kind: "official", href: "https://github.com/Argus-AiTeam/argus-verticals/releases/tag/v0.1.0" },
      { kind: "documentation", href: "https://github.com/Argus-AiTeam/argus-verticals/blob/33a5c1acf3cf145604e2f1c442bedf59c141f69a/README.md" },
      { kind: "license", href: "https://github.com/Argus-AiTeam/argus-verticals/blob/33a5c1acf3cf145604e2f1c442bedf59c141f69a/LICENSE" },
      { kind: "status", href: sourcePreview.verticalStoreGuideUrl },
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
