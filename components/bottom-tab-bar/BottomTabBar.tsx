"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { BookOpen, CircleDollarSign, Gamepad2, House, type LucideIcon } from "lucide-react";
import styles from "./BottomTabBar.module.css";

export type BottomTab = {
  href: string;
  label: string;
  icon: LucideIcon;
  /**
   * Which child of the lucide icon is the closed outline (silhouette). Most lucide icons draw
   * detail paths first and the outline last, but some (circle-dollar-sign, badge-*) put the
   * outline first. The mask keeps that element white so the cut-outs never groove the outline.
   */
  outline?: "first" | "last";
};

/** Bar-specific short labels: 4 cells at 375px are ~84px wide, so "プレイグラウンド" would collide. */
export const DEFAULT_TABS: BottomTab[] = [
  { href: "/", label: "ホーム", icon: House },
  { href: "/products", label: "プロダクト", icon: BookOpen },
  { href: "/playground", label: "Playground", icon: Gamepad2 },
  { href: "/pricing", label: "料金", icon: CircleDollarSign, outline: "first" },
];

/** Contextual CTA band shown directly under the bar; slides in only on pages that pass it. */
export type BottomTabBarCta = { label: string; href: string };

/** Active-pill travel: a spring with a slight overshoot. */
const PILL_SPRING = { type: "spring", stiffness: 380, damping: 30, mass: 0.9 } as const;

const safeId = (s: string) => s.replace(/[^a-zA-Z0-9_-]/g, "");

/**
 * iOS-style floating glass bottom tab bar, shown only below the lg breakpoint (where the
 * sidebar is hidden and the mobile topbar takes over). globals.css adds body padding-bottom
 * whenever [data-bottom-tab-bar] is present so page content never hides under the bar.
 */
export function BottomTabBar({
  tabs = DEFAULT_TABS,
  hiddenPaths = [],
  cta,
}: {
  tabs?: BottomTab[];
  /** Paths (exact match) on which the bar is not rendered. */
  hiddenPaths?: string[];
  cta?: BottomTabBarCta;
}) {
  const pathname = usePathname();
  // SVG mask ids must be unique per page; useId's punctuation and the href's "/" are awkward in url(#...)
  const maskBase = `tab-mask-${safeId(useId())}`;
  const maskIdFor = (href: string) => `${maskBase}-${safeId(href)}`;
  if (hiddenPaths.includes(pathname)) return null;

  // "/" is a prefix of every path, so it only matches exactly
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);

  return (
    // Honour the OS "reduce motion" setting: the pill snaps instead of springing
    <MotionConfig reducedMotion="user">
      <div
        className={styles.root}
        data-bottom-tab-bar
        style={{ "--tab-count": tabs.length } as React.CSSProperties}
      >
        <nav className={styles.bar} aria-label="メインナビゲーション">
          {tabs.map(({ href, label, icon: Icon, outline = "last" }) => {
            const active = isActive(href);
            return (
              <Link
                key={href}
                href={href}
                className={styles.tab}
                data-active={active || undefined}
                aria-current={active ? "page" : undefined}
              >
                {active ? (
                  <motion.span layoutId="active-pill" className={styles.pill} transition={PILL_SPRING} />
                ) : null}
                {/* Inactive: line icon (iconLine).
                    Active: a filled silhouette with the detail lines cut out (iconFill).
                    Filling the outline alone would bury the detail paths, so an SVG mask layers
                    "silhouette = show (white)" over "detail strokes = hide (black)"; the bar's
                    glass shows through the cut-outs instead of a second colour. */}
                <span className={styles.iconStack} aria-hidden>
                  <Icon className={styles.iconLine} size={24} strokeWidth={1.6} />
                  <svg className={styles.iconFill} width={24} height={24} viewBox="0 0 24 24">
                    <mask id={maskIdFor(href)} maskUnits="userSpaceOnUse" x={0} y={0} width={24} height={24}>
                      <Icon x={0} y={0} width={24} height={24} fill="#fff" stroke="#fff" strokeWidth={1.6} />
                      <Icon
                        className={styles.maskDetail}
                        data-outline={outline}
                        x={0}
                        y={0}
                        width={24}
                        height={24}
                        fill="none"
                        strokeWidth={1.6}
                      />
                    </mask>
                    <rect width={24} height={24} fill="currentColor" mask={`url(#${maskIdFor(href)})`} />
                  </svg>
                </span>
                <span className={styles.label}>{label}</span>
              </Link>
            );
          })}
        </nav>

        <AnimatePresence initial={false}>
          {cta ? (
            <motion.div
              key="cta"
              className={styles.ctaSlot}
              initial={{ height: 0 }}
              animate={{ height: 44 }}
              exit={{ height: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <Link href={cta.href} className={styles.cta}>
                {cta.label}
              </Link>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </MotionConfig>
  );
}
