export const CONTACT_MAILTO = "mailto:socialsmart.jp@gmail.com";
export const GITHUB_URL = "https://github.com/hiromps";

export type NavItem = {
  href: "/" | "/products" | "/playground" | "/pricing";
  label: string;
  iconLine: string;
  /** When absent the icon never swaps to a fill variant (Playground in the original). */
  iconFill?: string;
  /** Playground's nav row has no trailing arrow in the original sidebar. */
  hasArrow: boolean;
};

export const NAV_ITEMS: NavItem[] = [
  { href: "/", label: "ホーム", iconLine: "ri-home-5-line", iconFill: "ri-home-5-fill", hasArrow: true },
  { href: "/products", label: "プロダクト", iconLine: "ri-book-open-line", iconFill: "ri-book-open-fill", hasArrow: true },
  { href: "/playground", label: "プレイグラウンド", iconLine: "ri-gamepad-line", hasArrow: false },
  { href: "/pricing", label: "料金", iconLine: "ri-money-dollar-circle-line", iconFill: "ri-money-dollar-circle-fill", hasArrow: true },
];

export const PRODUCTS = [
  {
    key: "smartgram",
    name: "SMARTGRAM",
    tagline: "SNS運用を、自動で",
    url: "https://smartgram.jp",
  },
  {
    key: "anima-js",
    name: "anima.js",
    tagline: "Webに、動きを",
    url: "https://anima-js.vercel.app",
  },
  {
    key: "minoru-ai",
    name: "Minoru-AI",
    tagline: "AIアシスタント",
    url: "https://minoru-ai.vercel.app",
  },
  {
    key: "socialgoodworld",
    name: "SocialGoodWorld",
    tagline: "社会貢献をつなぐ",
    url: "https://socialgoodworld.com",
  },
  {
    key: "smm-smart",
    name: "SMM Smart",
    tagline: "SNSマーケを効率化",
    url: "https://app.socialgoodworld.com",
  },
] as const;
