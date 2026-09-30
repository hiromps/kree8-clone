// Product catalog for /products: each product carries its tool categories and the
// screenshot cards that were previously a flat list. Name / tagline / URL stay in
// lib/site.ts (PRODUCTS) so the home page and this page never drift apart.
import { PRODUCTS } from "@/lib/site";

export type ProductKey = (typeof PRODUCTS)[number]["key"];

export type CategoryKey = "ai" | "sns" | "web" | "animation" | "devtool";

export const PRODUCT_CATEGORIES: { key: CategoryKey; label: string }[] = [
  { key: "ai", label: "AIツール" },
  { key: "sns", label: "SNS運用" },
  { key: "web", label: "Web制作" },
  { key: "animation", label: "アニメーション" },
  { key: "devtool", label: "開発ツール" },
];

export type ProductShot = {
  src: string;
  alt: string;
  /** Rendered as `aspect-ratio: 1100/<h>` exactly like the original inline style. */
  h: number;
};

export type ProductEntry = {
  key: ProductKey;
  name: string;
  tagline: string;
  url: string;
  /** One-line public description shown under the product name */
  description: string;
  categories: CategoryKey[];
  shots: ProductShot[];
};

type CatalogSeed = Omit<ProductEntry, "name" | "tagline" | "url" | "shots">;

// Heights measured from the actual capture files (hero shots are 1456x1043 -> 1100/788).
const shotsFor = (key: ProductKey, name: string): ProductShot[] => [
  { src: `/images/slides/${key}.png`, alt: name, h: 788 },
  { src: `/playground/${key}-square.png`, alt: name, h: 1100 },
];

const CATALOG_SEED: CatalogSeed[] = [
  {
    key: "smartgram",
    description: "Instagramのいいね・フォロー・ハッシュタグ巡回を、専用のiPhoneが24時間自動で実行するSNS運用ツール",
    categories: ["sns"],
  },
  {
    key: "anima-js",
    description: "Webサイトに動きを加えるアニメーションライブラリ。shadcn CLIの1コマンドでコンポーネントを導入できる",
    categories: ["animation", "web", "devtool"],
  },
  {
    key: "minoru-ai",
    description: "テキストのアイデアから動画を生成するAIアシスタント。台本づくりから書き出しまでを一気通貫で",
    categories: ["ai"],
  },
  {
    key: "socialgoodworld",
    description: "フォロワー・いいね・再生数を増やすSMMサービス。AIによる記事生成システムも備える",
    categories: ["sns", "ai"],
  },
  {
    key: "smm-smart",
    description: "販売店が独自ドメインでパネルを運営できる、マルチテナント型のSMMパネルSaaS",
    categories: ["sns", "web"],
  },
];

export const PRODUCT_CATALOG: ProductEntry[] = CATALOG_SEED.map((seed) => {
  const base = PRODUCTS.find((p) => p.key === seed.key);
  if (!base) throw new Error(`Unknown product key: ${seed.key}`);
  return { ...seed, name: base.name, tagline: base.tagline, url: base.url, shots: shotsFor(seed.key, base.name) };
});

/** Categories that actually have members, in the display order above. */
export const ACTIVE_CATEGORIES = PRODUCT_CATEGORIES.filter((c) =>
  PRODUCT_CATALOG.some((p) => p.categories.includes(c.key)),
);
