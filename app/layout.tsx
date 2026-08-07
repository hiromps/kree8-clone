import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Caveat, Phudu } from "next/font/google";
import "remixicon/fonts/remixicon.css";
import "./globals.css";
import { SiteChrome, SiteAside } from "@/components/chrome/SiteChrome";
import MainShell from "@/components/chrome/MainShell";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

// Inter has no JP glyphs; Noto Sans JP is chained after it so Latin text keeps
// Inter's metrics while Japanese falls back consistently across browsers.
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

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${inter.variable} ${notoSansJP.variable} ${caveat.variable} ${phudu.variable}`}
    >
      <body className="min-h-screen">
        <SiteChrome />
        <div id="layout-standard" className="flex w-full">
          <SiteAside />
          <MainShell>{children}</MainShell>
        </div>
      </body>
    </html>
  );
}
