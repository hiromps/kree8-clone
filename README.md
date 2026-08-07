# Kree8 Studio — Site Reproduction

A pixel/behavior-accurate, single-file HTML reproduction of [kree8.studio](https://www.kree8.studio), built for local prototyping and design iteration.

This is a static, dependency-free clone — no build step, no framework. Everything (Home, Projects, Pricing, Playground) lives in one file with simple client-side hash routing.

## Run it

Just open `index.html` in a browser, or serve it locally:

```bash
npx serve .
```

## What's inside

- **Home** — hero, problem/solution narrative, moodboard, versatility/type-scale demo, project slideshow, category grid, testimonials, team, footer
- **Projects** — filterable project list by category
- **Pricing** — one-time and retainer pricing cards, standalone page
- **Playground** — a pannable/zoomable canvas of project shots, with a shared sidebar that collapses to icon-only and expands on hover (mirrors the real site's DOM/CSS behavior)

## Stack

- Tailwind CSS (CDN, JIT)
- GSAP 3.12.5 + ScrollTrigger (CDN)
- RemixIcon 4.2.0 (CDN)
- Google Fonts: Inter, Caveat, Phudu
- Vanilla JS (no build tooling) for routing, the Playground canvas, sliders, and the pricing calculator

## Responsive

Includes a mobile top bar + slide-in nav menu (sidebar is desktop/`lg:`-only), and responsive layout adjustments throughout Home (moodboard grid, project category grid, hero heading, section spacing) to avoid horizontal overflow on small screens.

## Notes

This repository reproduces the author's own live site (kree8.studio) for prototyping purposes.
