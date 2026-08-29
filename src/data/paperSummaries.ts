export type PaperSummary = {
  en: string;
  zh: string;
};

const paperSummaries: Record<string, PaperSummary> = {
  "goal-instrumental-constraint-neglect": {
    en: "Studies whether assistants recognize that a user constraint can block the user's own goal. A structured audit wrapper reaches 97.5% relation-label accuracy versus 70% for direct answering, while the paper keeps claims bounded to the evaluated setting.",
    zh: "研究助手能否识别“用户约束反而阻碍用户目标”的情形。结构化审计 wrapper 的关系标签准确率达到 97.5%，高于直接回答的 70%，但结论严格限定在当前评测设置内。",
  },
  "q3c-evidence-conditioned-confidence": {
    en: "Trains a QLoRA question-candidate-context judge that evaluates answers together with evidence and sampled alternatives. Q3C raises raw score from 22.0% to 31.7% and cuts overconfident errors from 76% to 12%, while RAG and TruthfulQA expose important operating-point limits.",
    zh: "训练 QLoRA question-candidate-context 判别器，将候选答案、证据和采样备选项联合评估。Q3C 将原始得分从 22.0% 提升到 31.7%，并把过度自信错误从 76% 降至 12%，但 RAG 与 TruthfulQA 结果也暴露出关键的弃答阈值边界。",
  },
  "auditable-evidence-admission": {
    en: "Introduces EG-MPoT, which plans visual subquestions, admits supported observations into memory, and answers from that trace. It performs well on POPE and constrained HallusionBench, while A-OKVQA shows where answer-first prompting remains preferable.",
    zh: "提出 EG-MPoT：规划视觉子问题，将受支持的观察写入记忆，再从可审计轨迹生成答案。方法在 POPE 和受限 HallusionBench 上表现良好，而 A-OKVQA 显示直接答案优先仍有适用场景。",
  },
  "compositional-image-text-matching": {
    en: "Evaluates dependency-aware atom evidence as a selective veto for compositional image-text matching. On 61,902 tasks, the proposed gate underperforms a simpler VQAScore plus CLIP fallback and blocks useful corrections, producing a negative reliability result.",
    zh: "评估依存关系感知的原子证据能否作为组合式图文匹配的选择性否决器。在 61,902 个任务上，该 gate 低于更简单的 VQAScore 加 CLIP fallback，并会阻断有效修正。",
  },
  "diagnostic-benchmark": {
    en: "Introduces ChartOCR-SourceDiag, a 6,300-row benchmark package separating chart marks, OCR-visible text, and prompt shortcuts. Visual prompting clearly beats question-only and OCR-text-only controls, while scorer scope and source-channel failures remain explicit.",
    zh: "提出包含 6,300 行结果的 ChartOCR-SourceDiag，用于区分图表标记、可见 OCR 文本和提示捷径。视觉提示明显优于纯问题与纯 OCR 文本控制，同时明确保留评分器范围和来源通道失败。",
  },
  "frozen-hallucination-wrappers": {
    en: "Audits calibration-free hallucination wrappers on POPE, AMBER, and HallusionBench. Several wrappers are output-identical to the baseline, while visual-delta contrast significantly degrades AMBER, so the study maps failure boundaries rather than claiming mitigation.",
    zh: "在 POPE、AMBER 和 HallusionBench 上审计无需校准的幻觉 wrapper。多种 wrapper 与基线输出完全相同，visual-delta 对比还显著降低 AMBER 表现，因此论文聚焦失败边界而非缓解效果。",
  },
  "selective-deliberation-agents": {
    en: "Compares ReAct, reflexion, tree search, debate, and an adaptive verifier-stop controller on 300 database tasks. Extra fixed compute does not improve accuracy, while adaptive deliberation matches the best observed success using about half the tokens and calls.",
    zh: "在 300 个数据库任务上比较 ReAct、反思、树搜索、辩论和自适应 verifier-stop。固定增加推理计算并未提升准确率，而自适应策略用约一半 token 与调用次数达到相近成功率。",
  },
  "no-extra-model-speculative-decoding": {
    en: "Tests vLLM n-gram speculation for Qwen3-8B without a draft model. Quality stays nearly unchanged across four task families, but meaningful latency improvement appears mainly on EvalPlus code generation, supporting workload-specific deployment.",
    zh: "测试无需额外 draft 模型的 Qwen3-8B vLLM n-gram 推测解码。四类任务质量基本不变，但明显延迟收益主要出现在 EvalPlus 代码生成，因此应按工作负载选择性部署。",
  },
  "sink-norm-kv-cache-quant": {
    en: "Allocates KV-cache precision using calibration-time sink, norm, and reconstruction cues under a matched memory budget. CSN-KV clears pooled non-inferiority against KIVI, but misses family-level criteria on several model-benchmark pairs.",
    zh: "在匹配显存预算下，利用校准阶段的 sink、norm 和重建线索分配 KV Cache 精度。CSN-KV 通过总体非劣性门槛，但多个模型与基准组合仍未达到任务族级标准。",
  },
  "leaderboard-audit-evaluation-uncertainty": {
    en: "Converts leaderboard outputs into pairwise stable-or-abstain decisions for 10 models and five benchmark families. Simultaneous bands authorize only 15 of 315 comparisons, while evaluator-format changes flip 53 pairs, arguing for uncertainty-aware reporting.",
    zh: "将 10 个模型、五类基准的排行榜输出转化为成对的“稳定结论或弃权”决策。同时置信带仅授权 315 个比较中的 15 个，而评测格式变化会翻转 53 对结果，说明报告必须显式处理不确定性。",
  },
};

export default paperSummaries;
