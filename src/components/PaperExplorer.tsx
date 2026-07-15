import { useEffect, useMemo, useState } from "react";

export type Paper = {
  id: string;
  title: string;
  href: string;
  pages: number;
  status: "Manuscript" | "Draft";
  category: string;
  categoryLabel: string;
  categoryDescription: string;
  summary: string;
};

type Props = {
  papers: Paper[];
  locale?: "en" | "zh";
};

export default function PaperExplorer({ papers, locale = "en" }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    document.documentElement.dataset.paperExplorerReady = "true";
    document.dispatchEvent(new Event("argus:paper-explorer-ready"));

    return () => {
      delete document.documentElement.dataset.paperExplorerReady;
    };
  }, []);

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
        paper.categoryLabel.toLowerCase().includes(normalized) ||
        paper.categoryDescription.toLowerCase().includes(normalized) ||
        paper.summary.toLowerCase().includes(normalized);
      return categoryMatch && queryMatch;
    });
  }, [category, papers, query]);
  const copy = locale === "zh" ? {
    searchLabel: "搜索论文",
    searchPlaceholder: "搜索标题、简介或研究方向",
    categories: "研究方向",
    filterHint: "横向滑动查看更多研究方向",
    all: "全部",
    count: (value: number) => `${value} 篇`,
    empty: "没有匹配的论文。",
  } : {
    searchLabel: "Search papers",
    searchPlaceholder: "Search titles, summaries, or research areas",
    categories: "Research areas",
    filterHint: "Scroll sideways for more research areas",
    all: "All",
    count: (value: number) => `${value} ${value === 1 ? "paper" : "papers"}`,
    empty: "No papers match your search.",
  };

  return (
    <section className="paper-explorer" data-paper-explorer>
      <div className="paper-toolbar">
        <label className="paper-search">
          <span className="sr-only">{copy.searchLabel}</span>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.searchPlaceholder}
          />
        </label>
        <div className="paper-filters" aria-label={copy.categories}>
          <button
            type="button"
            className={category === "all" ? "active" : ""}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            {copy.all}
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
        <p className="paper-filter-hint" aria-hidden="true">{copy.filterHint}</p>
        <p className="paper-count-live" aria-live="polite" aria-atomic="true">
          {copy.count(filtered.length)}
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
            <p className="paper-card__category">{paper.categoryLabel}</p>
            <p className="paper-card__summary">{paper.summary}</p>
            <span className="paper-open">PDF ↗</span>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="paper-empty">{copy.empty}</div>
      )}
    </section>
  );
}
