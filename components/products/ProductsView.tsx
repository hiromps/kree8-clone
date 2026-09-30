"use client";

import { useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ACTIVE_CATEGORIES, PRODUCT_CATALOG, PRODUCT_CATEGORIES, type CategoryKey } from "@/lib/products";

type Filter = "all" | CategoryKey;

const labelOf = (key: CategoryKey) => PRODUCT_CATEGORIES.find((c) => c.key === key)?.label ?? key;

export default function ProductsView() {
  const [filter, setFilter] = useState<Filter>("all");
  const tabs: { key: Filter; label: string }[] = [{ key: "all", label: "すべて" }, ...ACTIVE_CATEGORIES];
  const visible = filter === "all" ? PRODUCT_CATALOG : PRODUCT_CATALOG.filter((p) => p.categories.includes(filter));

  return (
    <MotionConfig reducedMotion="user">
      {/* CATEGORY TABS: tool-type filter, "すべて" first like a chip row */}
      <div className="flex items-center justify-center flex-wrap gap-1 mb-8" aria-label="ツール別に絞り込み">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            aria-pressed={filter === tab.key}
            className={`cat-tab${filter === tab.key ? " active" : ""}`}
            onClick={() => setFilter(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* PRODUCT LIST: one block per product (header + its screenshot cards) */}
      <div className="flex flex-col gap-10 md:gap-14" id="project-list">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((product) => (
            <motion.article
              key={product.key}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="flex flex-col gap-4"
            >
              <header className="w-full max-w-[1100px] mx-auto flex flex-col gap-2 px-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-xl md:text-2xl font-bold text-[var(--ink)]">{product.name}</h2>
                  <span className="text-sm text-[var(--muted-2)]">{product.tagline}</span>
                  <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-[var(--pink-tint)] px-2.5 py-0.5 text-[11px] font-semibold text-[var(--pilot-pink)]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--pilot-pink)]" aria-hidden />
                    運用中
                  </span>
                </div>
                <p className="text-[15px] leading-relaxed text-[var(--ink-2)] max-w-2xl">{product.description}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  {product.categories.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="rounded-full border border-[var(--surface-border)] bg-white px-2.5 py-0.5 text-xs text-[var(--muted-2)] hover:border-[var(--pink-border)] hover:text-[var(--pilot-pink)] transition-colors"
                      onClick={() => setFilter(c)}
                    >
                      {labelOf(c)}
                    </button>
                  ))}
                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink)] hover:text-[var(--pilot-pink)] transition-colors"
                  >
                    サイトを見る <i className="ri-arrow-right-up-line"></i>
                  </a>
                </div>
              </header>

              <div className="flex flex-col gap-5">
                {product.shots.map((shot) => (
                  <div key={shot.src} className="project-card">
                    <img src={shot.src} style={{ aspectRatio: `1100/${shot.h}` }} loading="lazy" alt={shot.alt} />
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
