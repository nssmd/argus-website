export type PaperSummary = {
  en: string;
  zh: string;
};

const paperSummaries: Record<string, PaperSummary> = {
  "anchoring": {
    en: "Audits six train-free anchoring interventions across 893 model calls. Several prompts reduce measured anchor pull, but missing stability controls, held-out confirmation, and material parser/API failures mean that no mitigation method is selected.",
    zh: "审计六种免训练锚定偏差干预与 893 次模型调用。部分提示能降低测得的锚定效应，但稳定性控制、留出集确认及解析/API 失败仍不完整，因此论文最终不选择任何缓解方法。",
  },
  "base-rate-neglect": {
    en: "Builds a prior-flip diagnostic that changes only the prior while preserving likelihood evidence and answer format. The API model reaches ceiling, Qwen remains inconsistent, and prior-first prompting shows no advantage over direct or chain-of-thought baselines.",
    zh: "构建只改变先验、保持似然证据与答案格式不变的 prior-flip 诊断。API 模型出现天花板效应，Qwen 的算术与后验一致性仍较弱，prior-first 提示也未优于直接回答或思维链基线。",
  },
  "default-status-quo": {
    en: "Separates default-label bias from legitimate switching costs on MovieLens, Yelp, and Goodbooks decisions. Cost-aware aggregation protects some valid overrides, but regresses badly on other slices and does not transfer as a reliable mitigation across backends.",
    zh: "在 MovieLens、Yelp 与 Goodbooks 决策中区分默认标签偏差和合理切换成本。成本感知聚合能保护部分合理覆盖情形，但在其他切片明显退化，且无法跨后端稳定迁移。",
  },
  "drift-guard-language-drift": {
    en: "Evaluates a train-free monitor-and-repair workflow for unintended language switching. Results are family-specific and mostly negative, showing that future controls must separately measure language adherence, semantic preservation, truncation, and legitimate code-switching.",
    zh: "评估用于非预期语言切换的免训练监控与修复流程。结果具有明显任务族差异且总体不支持方法胜出，说明后续工作必须分别衡量语言遵循、语义保持、截断和合理的代码切换。",
  },
  "framing-effect": {
    en: "Tests gain/loss framing with paired source items, neutral controls, counterframes, and lexical diagnostics. Canonical decision normalization does not beat raw prompting, so the contribution is a stricter diagnostic protocol rather than a mitigation claim.",
    zh: "利用成对源题、neutral 控制、反向框架和词汇诊断测试收益/损失框架效应。规范化决策提示未超过原始提示，因此主要贡献是更严格的诊断协议，而非缓解方法胜出。",
  },
  "goal-instrumental-constraint-neglect": {
    en: "Studies whether assistants recognize that a user constraint can block the user's own goal. A structured audit wrapper reaches 97.5% relation-label accuracy versus 70% for direct answering, while the paper keeps claims bounded to the evaluated setting.",
    zh: "研究助手能否识别“用户约束反而阻碍用户目标”的情形。结构化审计 wrapper 的关系标签准确率达到 97.5%，高于直接回答的 70%，但结论严格限定在当前评测设置内。",
  },
  "irreversibility-blindness-llm-advice": {
    en: "Measures whether advice becomes appropriately more cautious when actions are hard to reverse. The proposed reversibility check raises caution but also over-warns on reversible choices, showing that recoverability is measurable while selective warning remains unsolved.",
    zh: "衡量行动难以撤销时，模型建议是否会适度提高谨慎程度。所提可逆性检查虽然增加警告，也会对可逆选择过度提醒，说明可恢复性可以测量，但选择性警告仍未解决。",
  },
  "scale-neglect-llm-advice": {
    en: "Diagnoses whether recommendations change when a decision-relevant magnitude crosses a threshold. Threshold-first prompting fails to outperform direct advice and exposes saturated cells, scaffold-cue sensitivity, and family-specific failures across two hosted backends.",
    zh: "诊断关键数量跨过阈值时，模型建议是否随之改变。threshold-first 提示未优于直接建议，并暴露出饱和单元、脚手架线索敏感性及跨后端的任务族特定失败。",
  },
  "sunk-cost": {
    en: "Compares bare prompting, generic sunk-cost warnings, and a prospective-value reframe on 720 decisions. The reframe improves the primary hosted-backend matrix, but weaker replication evidence limits the claim to a promising candidate rather than broad robustness.",
    zh: "在 720 个决策任务上比较原始提示、通用沉没成本警告和前瞻价值重构。重构方法在主后端上取得改进，但复现实验较弱，因此只能视为有前景的候选方案，不能宣称普遍稳健。",
  },
  "auditable-evidence-admission": {
    en: "Introduces EG-MPoT, which plans visual subquestions, admits supported observations into memory, and answers from that trace. It performs well on POPE and constrained HallusionBench, while A-OKVQA shows where answer-first prompting remains preferable.",
    zh: "提出 EG-MPoT：规划视觉子问题，将受支持的观察写入记忆，再从可审计轨迹生成答案。方法在 POPE 和受限 HallusionBench 上表现良好，而 A-OKVQA 显示直接答案优先仍有适用场景。",
  },
  "attribute-binding": {
    en: "Tests whether localization evidence helps verify attribute-object binding. Oracle regions provide a strong signal, but detector coverage and recall are too weak for a practical train-free bridge, yielding a calibrated no-go result.",
    zh: "测试定位证据能否验证属性与对象的正确绑定。Oracle 区域带来明显提升，但检测器覆盖率与召回率不足以形成实用的免训练方案，因此得到校准后的 no-go 结论。",
  },
  "compositional-image-text-matching": {
    en: "Evaluates dependency-aware atom evidence as a selective veto for compositional image-text matching. On 61,902 tasks, the proposed gate underperforms a simpler VQAScore plus CLIP fallback and blocks useful corrections, producing a negative reliability result.",
    zh: "评估依存关系感知的原子证据能否作为组合式图文匹配的选择性否决器。在 61,902 个任务上，该 gate 低于更简单的 VQAScore 加 CLIP fallback，并会阻断有效修正。",
  },
  "contrast-before-answering-vlm-spatial": {
    en: "Drafts a contrast-region self-verification scaffold that pairs visual contrasts and deterministic region views before answering spatial questions. The method, baselines, and evidence contract are specified, but the MMVP and RefSpatial evaluation is not yet complete.",
    zh: "提出 contrast-region self-verification 脚手架，在回答空间问题前构造视觉对比与确定性区域视图。论文已定义方法、基线和证据约束，但 MMVP 与 RefSpatial 实验尚未完成。",
  },
  "diagnostic-benchmark": {
    en: "Introduces ChartOCR-SourceDiag, a 6,300-row benchmark package separating chart marks, OCR-visible text, and prompt shortcuts. Visual prompting clearly beats question-only and OCR-text-only controls, while scorer scope and source-channel failures remain explicit.",
    zh: "提出包含 6,300 行结果的 ChartOCR-SourceDiag，用于区分图表标记、可见 OCR 文本和提示捷径。视觉提示明显优于纯问题与纯 OCR 文本控制，同时明确保留评分器范围和来源通道失败。",
  },
  "frozen-hallucination-wrappers": {
    en: "Audits calibration-free hallucination wrappers on POPE, AMBER, and HallusionBench. Several wrappers are output-identical to the baseline, while visual-delta contrast significantly degrades AMBER, so the study maps failure boundaries rather than claiming mitigation.",
    zh: "在 POPE、AMBER 和 HallusionBench 上审计无需校准的幻觉 wrapper。多种 wrapper 与基线输出完全相同，visual-delta 对比还显著降低 AMBER 表现，因此论文聚焦失败边界而非缓解效果。",
  },
  "gui-reliability-surface-prior": {
    en: "Ranks GUI actions by fixed cost labels and public task-surface cues under matched coverage. It slightly reduces aggregate high-cost wrong execution, but improvement appears in only one active family and does not establish task recovery.",
    zh: "在匹配覆盖率下，按固定动作成本与公开任务表面线索排序 GUI 行动。方法略微减少高成本错误执行，但改进仅出现在一个有效任务族中，也未证明任务能够恢复。",
  },
  "hallucination": {
    en: "Drafts Support-Gated Contrastive Decoding, which applies visual contrast mainly to low-support visual-content tokens. The planned LLaVA and Qwen evaluation spans POPE, CHAIR, HallusionBench, and MME, but headline results remain pending.",
    zh: "提出 Support-Gated Contrastive Decoding，主要对视觉支持度较低的内容 token 施加对比解码。计划在 LLaVA、Qwen 及 POPE、CHAIR、HallusionBench、MME 上评测，但核心结果仍待完成。",
  },
  "in-image-text-reading": {
    en: "Uses 120 near-neighbor rendered strings to test whether VLMs read glyphs or guess plausible text. Crop-and-reread performs worse than direct VLM transcription, prompt-only visual wording, and PaddleOCR, giving a scoped negative result.",
    zh: "用 120 组近邻字符串测试 VLM 是忠实读取字形，还是猜测更合理的文本。crop-and-reread 低于直接转录、视觉提示和 PaddleOCR，得到范围明确的负结果。",
  },
  "instruction-data": {
    en: "Drafts a coverage-aware strategy for selecting vision-language instruction-tuning data while holding the LLaVA LoRA recipe fixed. Full-data, random, quality, diversity, and coverage-aware subsets are defined, but canonical benchmark results are still pending.",
    zh: "提出覆盖感知的视觉语言指令微调数据选择策略，并固定 LLaVA LoRA 训练配方。论文已定义全量、随机、质量、多样性和覆盖感知子集，但正式基准结果仍待完成。",
  },
  "no-go-visual-hallucination-mitigation": {
    en: "Evaluates prompt-only hallucination mitigation on hosted GPT-5-series VLMs. Evidence-first entailment and selective routing both lose to paraphrase-consistency controls, showing that disagreement signals are diagnostic but not yet benchmark-improving policies.",
    zh: "在托管 GPT-5 系列 VLM 上评估纯提示式幻觉缓解。证据优先蕴含策略与选择性路由均低于改写一致性控制，说明分歧信号可用于诊断，但尚不能提升基准表现。",
  },
  "prior-override": {
    en: "Audits whether image evidence overrides language and scene priors across TextVQA, VQA v2, and RefSpatial. Evidence-grounded prompting helps one family, ties another, and hurts the third, supporting a diagnostic ledger rather than a superiority claim.",
    zh: "在 TextVQA、VQA v2 和 RefSpatial 上审计图像证据能否覆盖语言与场景先验。证据提示在一个任务族提升、一个持平、一个下降，因此支持的是诊断账本，而非方法优越性。",
  },
  "qimen-bench-chart-construction": {
    en: "Builds paired visible-control and hidden-derivation tasks for procedural chart construction, plus independent arithmetic and transduction controls. Models often copy visible fields while failing hidden rules, making target-control pairing an effective shortcut detector.",
    zh: "为程序化排盘构建可见控制与隐藏推导成对任务，并加入独立算术和转写控制。模型往往能复制可见字段却无法完成隐藏规则，证明 target-control 配对能有效暴露捷径。",
  },
  "spatial-relations": {
    en: "Compares direct visual answers with chain-of-thought, constraint prompts, no-image controls, and coordinate-style prompts that receive no boxes. The box-oriented prompt matches direct accuracy and trails constraint-aware prompting, yielding a measured null result.",
    zh: "比较直接视觉回答、思维链、约束提示、无图控制，以及没有提供框的坐标式提示。box-oriented 提示与直接回答基本持平，并低于约束感知提示，因此得到明确的零结果。",
  },
  "token-efficiency": {
    en: "Runs a full accuracy-and-cost matrix for visual-token pruning on four multimodal benchmarks. AP-HTS reduces analytical prefill FLOPs but loses far more accuracy than FitPrune, especially on OCR-sensitive TextVQA, establishing a negative frontier result.",
    zh: "在四个多模态基准上执行完整的准确率与成本矩阵。AP-HTS 虽降低分析性 prefill FLOPs，却比 FitPrune 损失更多准确率，尤其伤害 OCR 敏感的 TextVQA，因此形成负面的效率前沿结论。",
  },
  "visual-numerosity": {
    en: "Evaluates exact visual counting across CAPTURe, TallyQA, and PixMo-Count with strict integer parsing and repeated conditions. Accuracy is low despite clean parsing, showing that most failures are genuinely wrong counts rather than output-format errors.",
    zh: "在 CAPTURe、TallyQA 和 PixMo-Count 上用严格整数解析与重复条件评估精确计数。即使解析过程干净，准确率仍很低，说明主要失败来自错误计数而非输出格式。",
  },
  "selective-deliberation-agents": {
    en: "Compares ReAct, reflexion, tree search, debate, and an adaptive verifier-stop controller on 300 database tasks. Extra fixed compute does not improve accuracy, while adaptive deliberation matches the best observed success using about half the tokens and calls.",
    zh: "在 300 个数据库任务上比较 ReAct、反思、树搜索、辩论和自适应 verifier-stop。固定增加推理计算并未提升准确率，而自适应策略用约一半 token 与调用次数达到相近成功率。",
  },
  "reasoning": {
    en: "Drafts a verifier-guided visual test-time scaling method that generates family-specific evidence candidates under matched budgets. The MathVista, MMMU, MATH-Vision, and MMStar matrix is defined, but accuracy and scope conclusions remain unfilled.",
    zh: "提出 verifier 引导的视觉测试时扩展方法，在匹配预算下生成任务族特定的证据候选。MathVista、MMMU、MATH-Vision 和 MMStar 评测矩阵已定义，但准确率和适用范围结论尚未填写。",
  },
  "test-time-scaling-v2": {
    en: "Drafts ATCoR, a training-free router that assigns multimodal agent examples to different compute tiers and operators using first-pass diagnostics. Planned GUI, web-action, and smartphone evaluations are specified, but outcome-dependent claims remain pending.",
    zh: "提出 ATCoR：根据首轮诊断将多模态智能体任务分配到不同计算档位与操作器。论文已规划 GUI、网页动作和手机任务评测，但依赖实验结果的结论仍待完成。",
  },
  "tool-orchestration": {
    en: "Audits the first-tool choice among direct answer, OCR, zoom, VQA, and caption-style evidence. RouteScope underperforms direct answering and the strongest caption control overall, while different tools win by family, exposing routing and evidence-use failures.",
    zh: "审计直接回答、OCR、缩放、VQA 和 caption 证据之间的首工具选择。RouteScope 总体低于直接回答和最强 caption 控制，且不同任务族由不同工具领先，暴露路由与证据使用失败。",
  },
  "visual-uncertainty-v2": {
    en: "Estimates confidence from answer stability across prompt, crop, caption, and OCR views. CVUR does not significantly improve pooled accuracy, but offers useful selective prediction with high coverage and a small route-or-abstain set.",
    zh: "通过提示、裁剪、caption 和 OCR 多视图下的答案稳定性估计置信度。CVUR 未显著提升总体准确率，但在高覆盖率下提供了有用的选择性预测与少量路由/弃答决策。",
  },
  "i2v-structured-pruning": {
    en: "Prunes a Wan image-to-video DiT below one billion parameters while keeping the rest of the pipeline fixed. Parameter targets are met, but VBench-I2V quality drops by 18.9%, making the evaluated depth-and-width pruning recipe a clear no-go.",
    zh: "在保持其余流水线不变的前提下，将 Wan 图生视频 DiT 剪枝到 10 亿参数以下。参数目标虽达成，VBench-I2V 质量却下降 18.9%，因此当前深度与宽度剪枝方案明确不可行。",
  },
  "no-extra-model-speculative-decoding": {
    en: "Tests vLLM n-gram speculation for Qwen3-8B without a draft model. Quality stays nearly unchanged across four task families, but meaningful latency improvement appears mainly on EvalPlus code generation, supporting workload-specific deployment.",
    zh: "测试无需额外 draft 模型的 Qwen3-8B vLLM n-gram 推测解码。四类任务质量基本不变，但明显延迟收益主要出现在 EvalPlus 代码生成，因此应按工作负载选择性部署。",
  },
  "evidence-adaptive-rag-decoding": {
    en: "Proposes a training-free RAG decoder that arbitrates document-conditioned candidates using agreement, entropy, retrieval confidence, logit shaping, and verification. The small pilot underperforms standard RAG and repeatedly fails comparability gates, so no method claim is made.",
    zh: "提出免训练 RAG 解码器，利用跨文档一致性、熵、检索置信度、logit 调整和验证来仲裁候选答案。小规模 pilot 低于标准 RAG，并多次触发可比性门禁，因此不作方法有效性声明。",
  },
  "longctx-kvcache": {
    en: "Drafts a risk-routed KV-cache compression policy that begins with an aggressive budget and escalates high-risk rows. Planned LongBench, RULER, and needle-retrieval comparisons are defined, but quality, memory, and throughput results remain pending.",
    zh: "提出风险路由的 KV Cache 压缩策略：先采用激进预算，再对高风险样本升级资源。LongBench、RULER 和 needle 检索评测已规划，但质量、显存与吞吐结果仍待完成。",
  },
  "sink-norm-kv-cache-quant": {
    en: "Allocates KV-cache precision using calibration-time sink, norm, and reconstruction cues under a matched memory budget. CSN-KV clears pooled non-inferiority against KIVI, but misses family-level criteria on several model-benchmark pairs.",
    zh: "在匹配显存预算下，利用校准阶段的 sink、norm 和重建线索分配 KV Cache 精度。CSN-KV 通过总体非劣性门槛，但多个模型与基准组合仍未达到任务族级标准。",
  },
  "tail-guard-activation-aware-ptq": {
    en: "Protects a small heavy-tail set of activation channels while routing the rest through INT4. TailGuard is worse than AWQ and FP16 on usable slices, and its GSM8K path is invalid, making this a scoped negative PTQ diagnostic.",
    zh: "保护少量重尾激活通道，其余激活走 INT4 路径。TailGuard 在可用切片上低于 AWQ 与 FP16，GSM8K 路径也无效，因此论文给出范围明确的负面 PTQ 诊断。",
  },
  "vocab-row-quantization": {
    en: "Tests whether tokenizer frequency, row norms, and public entity lists can choose high-precision vocabulary rows without calibration. The selectors stay statistically indistinguishable from random bypass, rejecting a positive long-tail factuality claim.",
    zh: "测试能否仅凭 tokenizer 频率、行范数和公开实体列表，在无校准条件下选择高精度词表行。各选择器与随机 bypass 无统计显著差异，因此不支持长尾事实性提升声明。",
  },
  "world-sim": {
    en: "Compares direct prompting with multiple structured counterfactual scaffolds across CounterBench, CLADDER, CRASS, and several backends. Gains reverse by benchmark and model, while an adaptive selector fails to rescue them, motivating a strict negative evaluation protocol.",
    zh: "在 CounterBench、CLADDER、CRASS 与多个后端上比较直接提示和多种结构化反事实脚手架。收益会随基准和模型反转，自适应选择器也无法补救，因此论文提出严格的负面评测协议。",
  },
  "world-state": {
    en: "Uses decode-time transition ledgers to expose state updates, invalidate stale facts, and reverify answers. The ledger slightly helps FANToM but hurts MMToM-QA and MuMA-ToM, making it an audit surface rather than a universal accuracy intervention.",
    zh: "利用解码时 transition ledger 暴露状态更新、失效旧事实并重新验证答案。该方法在 FANToM 略有帮助，却降低 MMToM-QA 与 MuMA-ToM 表现，因此更适合作为审计界面而非通用增益方法。",
  },
  "leaderboard-audit-evaluation-uncertainty": {
    en: "Converts leaderboard outputs into pairwise stable-or-abstain decisions for 10 models and five benchmark families. Simultaneous bands authorize only 15 of 315 comparisons, while evaluator-format changes flip 53 pairs, arguing for uncertainty-aware reporting.",
    zh: "将 10 个模型、五类基准的排行榜输出转化为成对的“稳定结论或弃权”决策。同时置信带仅授权 315 个比较中的 15 个，而评测格式变化会翻转 53 对结果，说明报告必须显式处理不确定性。",
  },
  "trace-width-state-trace": {
    en: "Generates compact state-transition tasks with exact executable certificates and row-level provenance. Prompting variants do not beat direct answers, while code execution reaches the exact ceiling, so TraceWidth contributes an audit-ready protocol rather than a leaderboard.",
    zh: "生成带精确可执行证书和逐行来源记录的紧凑状态转移任务。提示变体未超过直接回答，代码执行则达到精确上限，因此 TraceWidth 的贡献是可审计协议，而非排行榜结果。",
  },
};

export default paperSummaries;
