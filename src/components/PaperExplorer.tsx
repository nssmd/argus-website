import { useMemo, useState } from "react";

export type Paper = {
  id: string;
  title: string;
  href: string;
  pages: number;
  status: "Manuscript" | "Draft";
  category: string;
  categoryLabel: string;
  categoryDescription: string;
};

type Props = {
  papers: Paper[];
};

export default function PaperExplorer({ papers }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const categories = useMemo(() => {
    const values = new Map<string, string>();
    papers.forEach((paper) => values.set(paper.category, paper.categoryLabel));
    return [...values.entries()];
  }, [papers]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return papers.filter((paper) => {
      const categoryMatch = category === "all" || paper.category === category;
      const queryMatch =
        !normalized ||
        paper.title.toLowerCase().includes(normalized) ||
        paper.categoryLabel.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, papers, query]);

  return (
    <section className="paper-explorer">
      <div className="paper-toolbar">
        <label className="paper-search">
          <span className="sr-only">搜索论文</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索标题或研究方向"
          />
        </label>
        <div className="paper-filters" aria-label="研究方向">
          <button
            type="button"
            className={category === "all" ? "active" : ""}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            全部
          </button>
          {categories.map(([id, label]) => (
            <button
              type="button"
              className={category === id ? "active" : ""}
              aria-pressed={category === id}
              onClick={() => setCategory(id)}
              key={id}
            >
              {label}
            </button>
          ))}
        </div>
        <p className="paper-count-live" aria-live="polite" aria-atomic="true">
          {filtered.length} 篇
        </p>
      </div>

      <div className="paper-grid">
        {filtered.map((paper) => (
          <a
            className="paper-card"
            href={paper.href}
            target="_blank"
            rel="noreferrer"
            key={paper.id}
          >
            <div className="paper-card__meta">
              <span className={`paper-status ${paper.status === "Draft" ? "draft" : ""}`}>
                {paper.status}
              </span>
              <span>{paper.pages} pp</span>
            </div>
            <h2>{paper.title}</h2>
            <p>{paper.categoryLabel}</p>
            <span className="paper-open">PDF ↗</span>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="paper-empty">没有匹配的论文。</div>
      )}
    </section>
  );
}
