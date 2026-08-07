"use client";

import { usePathname } from "next/navigation";

// These are the RUNTIME class strings the original hash-router writes onto #site-main
// (its static markup said `py-6`, but the router immediately replaces it on load).
// #site-aside becomes position:fixed while collapsed for Playground, which pulls it out of
// #layout-standard's flex flow entirely -- it no longer contributes any height to that row.
// #site-main must therefore carry its own explicit height (not just rely on stretching to
// match the aside like the other views do), or view-playground's h-full canvas has nothing
// real to resolve against and collapses to zero height.
// pt-20 (mobile only) clears the fixed mobile top bar; lg:pt-6 restores the normal padding
// once the real sidebar (and no top bar) takes over.
const MAIN_CLASS_STANDARD =
  "flex-1 flex justify-center pt-20 lg:pt-6 pb-6 px-6 md:px-10 min-h-screen min-w-0";
const MAIN_CLASS_PLAYGROUND = "flex-1 flex h-dvh min-w-0";

export default function MainShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isPlayground = pathname === "/playground";

  return (
    <main id="site-main" className={isPlayground ? MAIN_CLASS_PLAYGROUND : MAIN_CLASS_STANDARD}>
      {children}
    </main>
  );
}
