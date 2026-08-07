"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { CONTACT_MAILTO, GITHUB_URL, NAV_ITEMS } from "@/lib/site";

function navLinkClass(active: boolean) {
  return active ? "nav-link active" : "nav-link";
}

/** Mobile topbar + slide-in menu (below lg, where the sidebar is hidden). */
export function SiteChrome() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) return;
    document.documentElement.classList.add("overflow-hidden");
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.classList.remove("overflow-hidden");
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // The original menu closes itself whenever a nav link is tapped.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <div
        id="mobile-topbar"
        className="lg:hidden fixed top-0 left-0 right-0 z-[70] flex items-center justify-between px-4 h-14 bg-white/90 backdrop-blur border-b border-gray-200"
      >
        <Link href="/" className="flex items-center">
          <img src="/images/logo.svg" alt="Social Smart" className="h-6" />
        </Link>
        <button
          id="mobile-menu-btn"
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <i className="ri-menu-line text-xl"></i>
        </button>
      </div>

      <div id="mobile-menu" className={`lg:hidden fixed inset-0 z-[80] invisible${open ? " open" : ""}`}>
        <div
          id="mobile-menu-backdrop"
          className="absolute inset-0 bg-black/40 opacity-0 transition-opacity duration-200"
          onClick={() => setOpen(false)}
        ></div>
        <div
          id="mobile-menu-panel"
          className="absolute top-0 right-0 h-full w-[78%] max-w-[300px] bg-white p-6 flex flex-col shadow-2xl translate-x-full transition-transform duration-200 ease-out"
        >
          <div className="flex items-center justify-between mb-8">
            <img src="/images/logo.svg" alt="Social Smart" className="h-6" />
            <button
              id="mobile-menu-close"
              className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <i className="ri-close-line text-xl"></i>
            </button>
          </div>
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass(pathname === item.href)}>
                <i className={item.iconLine}></i> <span>{item.label}</span>
              </Link>
            ))}
            <a href="#" className="nav-link">
              <i className="ri-briefcase-line"></i> <span>採用情報</span>{" "}
              <span className="ml-auto text-[10px] bg-gray-200 rounded-full px-2 py-0.5 text-gray-500">Coming soon</span>
            </a>
          </nav>
          <div className="mt-auto flex flex-col gap-2">
            <a href={CONTACT_MAILTO} className="nav-link !text-[var(--ink)] font-semibold">
              <i className="ri-mail-send-line"></i> <span>メールで相談</span>
            </a>
            <a href={GITHUB_URL} target="_blank" className="nav-link !text-[var(--ink)] font-semibold">
              <i className="ri-github-line"></i> <span>GitHubを見る</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

/** Desktop sidebar, shared across every view. On /playground it gains .pg-collapsed. */
export function SiteAside() {
  const pathname = usePathname();
  const collapsed = pathname === "/playground";

  return (
    <aside
      id="site-aside"
      className={`hidden lg:flex flex-col w-[260px] shrink-0 px-6 py-8 sticky top-0 h-screen${collapsed ? " pg-collapsed" : ""}`}
    >
      <Link href="/" className="flex items-center gap-2 mb-10 aside-logo-row">
        <img src="/images/logo-mark.svg" alt="Social Smart" className="h-7 aside-logo-compact" />
        <img src="/images/logo.svg" alt="Social Smart" className="h-7 aside-logo-full" />
      </Link>

      <nav className="flex flex-col gap-1 mb-8">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={navLinkClass(active)}>
              <i className={active && item.iconFill ? item.iconFill : item.iconLine}></i>{" "}
              <span className="nav-label">{item.label}</span>
              {item.hasArrow && (
                <span className="ml-auto opacity-60 nav-arrow">
                  <i className="ri-arrow-right-line"></i>
                </span>
              )}
            </Link>
          );
        })}
        <a href="#" className="nav-link">
          <i className="ri-briefcase-line"></i> <span className="nav-label">採用情報</span>{" "}
          <span className="ml-auto text-[10px] bg-gray-200 rounded-full px-2 py-0.5 text-gray-500 nav-badge">
            Coming soon
          </span>
        </a>
      </nav>

      <div className="text-[11px] tracking-wider text-gray-400 font-semibold mb-3 px-2 aside-heading">CONTACT</div>
      <div className="flex flex-col gap-2 mb-10">
        <a href={CONTACT_MAILTO} className="nav-link !text-[var(--ink)] font-semibold">
          <i className="ri-mail-send-line"></i> <span className="nav-label">メールで相談</span>
        </a>
        <a href={GITHUB_URL} target="_blank" className="nav-link !text-[var(--ink)] font-semibold">
          <i className="ri-github-line"></i> <span className="nav-label">GitHubを見る</span>
        </a>
      </div>

      <div className="mt-auto aside-brands">
        <div className="text-[11px] tracking-wider text-gray-400 font-semibold mb-3 px-2">
          RUNNING <span className="text-gray-600">5 PRODUCTS</span>
        </div>
        <div className="grid grid-cols-2 gap-3 px-2 opacity-80">
          <img src="/images/brands/smartgram.svg" alt="SMARTGRAM" className="h-4" />
          <img src="/images/brands/anima-js.svg" alt="anima.js" className="h-4" />
          <img src="/images/brands/minoru-ai.svg" alt="Minoru-AI" className="h-4" />
          <img src="/images/brands/socialgoodworld.svg" alt="SocialGoodWorld" className="h-4" />
          <img src="/images/brands/smm-smart.svg" alt="SMM Smart" className="h-4" />
          <img src="/images/brands/and-more.svg" alt="and more" className="h-4" />
        </div>
      </div>
    </aside>
  );
}
