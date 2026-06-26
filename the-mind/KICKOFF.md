# 🧠 The Mind — Kickoff & Context Memory

> **Read this first.** This file is the clean starting context for building Mohit's
> personal website, **"The Mind."** It exists so a fresh Claude session can start
> with zero stale baggage and pick up exactly where things stand.

---

## What this project is

A personal website with one committed concept: **"The Mind" — a navigable model of
how Mohit thinks, not a blog or a portfolio.** Navigation *is* semantic zoom
(thesis → regions → idea clusters → essay → explorable core). Full concept,
visual language, palette, and tech are in **[`BRIEF.md`](./BRIEF.md)** — that is
the single source of truth. Read it fully before doing anything.

- **Public & transparent** — built in the open.
- **Audience:** both laypeople (stay zoomed out) and experts (zoom all the way in).
- **The wow is the *thinking*, not visual decoration.**

## ⛔ Do NOT carry over (important)

This project deliberately starts fresh. **Ignore any older material about Mohit:**

- ❌ The old "Web3 / blockchain / DevRel community builder" framing — **outdated.**
- ❌ The earlier **brutalist-modern portfolio** direction — superseded (archived on
  the branch `claude/greeting-29wlfe` for reference only).
- ✅ Mohit's current direction is **researcher-oriented** (he'll confirm his exact
  regions/thesis). Take identity and content **from him**, not from old data.

## ▶️ What the next session should do, in order

1. **Read `BRIEF.md` completely.**
2. **Ask Mohit for the one required input:** his real **regions** (4–7 genuine
   domains of how he thinks) + which connect to which (and why), plus his
   one-line **thesis**. The structure depends on this.
3. **Collect his writing** (essays/notes) — the corpus the zoom reveals.
4. **Confirm understanding** back to him (thesis + regions + connections).
5. **Present the Phase 1 plan and get approval BEFORE coding.**

## 🧱 Build phasing (don't build it all at once)

- **Phase 1 — the spine:** token/theme system → mind-space hero with semantic zoom
  → **bulletproof, conventional navigation** (real routes per node, persistent top
  nav, breadcrumbs, obvious Back/Home, a plain Index view) → multi-resolution
  reading. **No AI, no evolution scrub yet.** Navigation ease is priority #1, above
  the wow (see Brief §4).
- **Phase 2:** the evolution / time-scrub axis (once there's history to scrub).
- **Phase 3:** the AI "wayfinder" last (once the corpus justifies it).

## 🛠️ Stack (from the brief)

Next.js (App Router) + TypeScript + Tailwind + next-themes + Framer Motion + Lenis
+ MDX + a WebGL/canvas zoom layer (react-zoom-pan-pinch or react-three-fiber) +
Vercel AI SDK (Phase 3). Self-hosted fonts. Lighthouse ≥95, `prefers-reduced-motion`
respected, Vercel-ready. Palette "Warm Ink" (warm dark default + light toggle).

## 📍 Status

- ✅ Brief locked (`BRIEF.md`)
- ✅ This branch (`the-mind`) created clean off `main` as the project home
- ⏳ **Waiting on Mohit:** real regions + thesis + writing corpus
- 🔜 Next: confirm understanding → Phase 1 plan → build

---

*Branch: `the-mind`. The old portfolio lives on `claude/greeting-29wlfe`.
Both are permanent on GitHub and independent of any Claude session.*
