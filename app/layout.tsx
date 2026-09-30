import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Caveat, Phudu } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import { SiteChrome, SiteAside } from "@/components/chrome/SiteChrome";
import MainShell from "@/components/chrome/MainShell";
import { BottomTabBar } from "@/components/bottom-tab-bar/BottomTabBar";

// Satoshi (Fontshare CDN, linked in <head> below) has no JP glyphs; Noto Sans JP
// is chained after it so Latin text keeps Satoshi's metrics while Japanese falls
// back consistently across browsers.
const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  preload: false,
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  preload: false,
});

const phudu = Phudu({
  subsets: ["latin"],
  variable: "--font-phudu",
  preload: false,
});

export const metadata: Metadata = {
  title: "Social Smart | AIで、社会をスマートに",
  description:
    "自動化で、人とサービスをつなぐ。AIで無駄な作業を減らし、人・企業・サービスを自然につなぐ Social Smart の公式サイト。",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Enables env(safe-area-inset-bottom) so the bar clears the iPhone home indicator.
  viewportFit: "cover",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${notoSansJP.variable} ${caveat.variable} ${phudu.variable}`}
    >
      <head>
        {/* Latin face: Satoshi via Fontshare (same pattern as GrowGram); JP is self-hosted via next/font above. */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap" />
      </head>
      <body className="min-h-screen">
        <SiteChrome />
        <div id="layout-standard" className="flex w-full">
          <SiteAside />
          <MainShell>{children}</MainShell>
        </div>
        <BottomTabBar />
      </body>
    </html>
  );
}
