import type { Metadata } from "next";
import { PRODUCT_SHOTS } from "@/lib/products";

export const metadata: Metadata = {
  title: "プロダクト | Social Smart",
};

const CATEGORY_TABS = [
  { label: "AIツール", active: false },
  { label: "SNS運用", active: false },
  { label: "すべて", active: true },
  { label: "Web制作", active: false },
  { label: "アニメーション", active: false },
  { label: "開発ツール", active: false },
];

export default function ProductsPage() {
  return (
    <div className="card p-6 md:p-10 w-full max-w-[1180px]" id="view-projects">
      {/* CATEGORY TABS (decorative, exactly like the original: no filtering handler) */}
      <div className="flex items-center justify-center flex-wrap gap-1 mb-8">
        {CATEGORY_TABS.map((tab) => (
          <a key={tab.label} href="#" className={`cat-tab${tab.active ? " active" : ""}`}>
            {tab.label}
          </a>
        ))}
      </div>

      {/* PRODUCT LIST */}
      <div className="flex flex-col gap-5" id="project-list">
        {PRODUCT_SHOTS.map((shot, i) => (
          <div key={i} className="project-card">
            <img src={shot.src} style={{ aspectRatio: `1100/${shot.h}` }} loading="lazy" alt={shot.alt} />
          </div>
        ))}
      </div>
    </div>
  );
}
