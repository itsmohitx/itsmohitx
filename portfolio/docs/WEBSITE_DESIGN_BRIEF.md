# Mohit Jain — Website Design & Tech Brief

> A complete overview of what we're building, the tech behind it, and the design
> direction. Review this, mark up anything you want changed, and we'll iterate.
> Prepared 2026-06-14 · Status: **foundation built, awaiting your review**

---

## 1. What we're building

A **personal portfolio website** — a single, scrolling, story-style page that
introduces you, shows your work, and drives people to contact you.

**Type:** One-page "scrollytelling" portfolio (not a multi-page corporate site).
**Goal:** Make people go *"whoa, this person is serious"* in the first 3 seconds.
**Audience:** Recruiters, Web3 communities, collaborators, event organizers.

### Sections (the scroll journey)
1. **Hero** — giant name, one-line identity, "let's talk" button
2. **Ticker strip** — moving keywords (Web3 · DevRel · Blockchain…)
3. **About** — one bold statement about who you are
4. **Experience** — Quillhash, CoinDCX, Vega, GDSC (interactive list)
5. **Ticker strip 2** — a moving statement ("Decentralize everything")
6. **Projects** — card grid (voting system, Glance case study, DevRel Lab)
7. **Contact** — big "Say Hello", schedule button, all social links
8. **Footer** — name, location, year

### Possible future add-ons (optional, later)
- ✍️ **Blog / Writing** section (your Medium articles)
- 🧊 **3D interactive hero** (three.js — already installed)
- 🌓 **Light/Dark toggle**
- 🗣️ **Speaking / Events** page
- 📄 **Resume / CV** download

---

## 2. Tech stack (and *why* each piece)

| Layer | Tech | Why it's used |
| --- | --- | --- |
| **Framework** | **Next.js 16** (React + TypeScript) | Industry standard for premium sites; fast, SEO-friendly, deploys free on Vercel |
| **Styling** | **Tailwind CSS v4** | Pixel-perfect, consistent design system; what modern studios use |
| **Animation** | **Motion** (Framer Motion) | Scroll reveals, staggered text, smooth entrance animations |
| **Animation+** | **GSAP** | Heavy-duty timeline animations for "wow" moments |
| **Smooth scroll** | **Lenis** | The buttery, weighted scroll feel every award-winning site has |
| **3D (ready)** | **three.js + React Three Fiber** | Installed and ready if we add an interactive 3D hero |
| **Hosting** | **Vercel** (free tier) | One-click deploy, custom domain, instant previews |

> This is the exact stack behind sites that win on **Awwwards** and **Godly**.
> It's chosen for maximum visual impact + reliability.

---

## 3. Design philosophy — **Brutalist-Modern**

The chosen aesthetic. Here's what it means and the rules we follow:

**The vibe:** Raw, bold, confident, design-forward. Big type. Hard edges. High
contrast. One loud accent color. Looks like a human crafted it with intent — the
opposite of a generic template.

**Design rules we follow:**
- 🔲 **Hard borders** — 2px solid black lines, no soft rounded corners
- 🔠 **Oversized typography** — the name fills the screen; type *is* the design
- ⬛ **Stark contrast** — black ink on warm paper, inverted blocks
- ⚡ **One loud accent** — electric indigo, used sparingly for punch
- 📐 **Visible grid** — structure you can see; columns and dividers
- 🎞️ **Motion with weight** — nothing floaty; deliberate, snappy reveals
- 🌾 **Subtle paper grain** — a faint texture so flat blocks don't feel sterile

---

## 4. Color palette

The current palette (every color has a job):

| Role | Color | Hex | Used for |
| --- | --- | --- | --- |
| **Paper** (background) | ⬜ warm off-white | `#E9E7E0` | Main background — softer than pure white |
| **Ink** (foreground) | ⬛ near-black | `#0D0D0D` | Text, borders, inverted blocks |
| **Accent** | 🟣 electric indigo | `#4F2BFF` | Links, the "/" slash, primary buttons, highlights |
| **Accent 2** | 🟢 acid lime | `#C6F032` | Tags, secondary highlights, "hello" pop |

**Color grading / mood:** warm, paper-like base (not cold) + one electric pop.
Feels premium and editorial, with a Web3 energy from the electric accents.

> 🎨 **Easy to re-theme.** All colors live in one file (`globals.css`) as
> variables. Want a different vibe? Swap 4 hex codes and the whole site changes.
> Alternatives I can offer: all-black dark mode, neon-on-black, mono + single red,
> or a softer pastel-brutalist.

---

## 5. Typography

| Use | Font | Why |
| --- | --- | --- |
| **Display / headings** | **Space Grotesk** (bold, uppercase) | Strong, geometric, characterful — the brutalist face |
| **Body / labels** | **Geist Mono** (monospace) | Technical, "developer" feel; great for tags & small caps |

**Type treatment:**
- Headings: UPPERCASE, ultra-tight letter spacing, huge (hero ≈ 13rem)
- Body: monospace, generous line height, calm and readable
- Labels/tags: small, wide letter-spacing, uppercase

> Fonts are also swappable. Other brutalist options: Archivo, Neue Montreal,
> Anton, PP Neue Machina, or a serif-display contrast like Editorial New.

---

## 6. Interaction & motion

- **Entrance:** hero name reveals in a staggered slide-up on load
- **On scroll:** each section fades + slides up as it enters view
- **Hover:** experience rows invert to black; project cards flip to lime; buttons lift
- **Tickers:** infinite horizontal marquees, opposite directions
- **Scroll feel:** Lenis momentum scrolling throughout

---

## 7. Responsiveness

- 📱 **Mobile-first** — scales from 390px phones up to large desktops
- Hero type scales with viewport (`vw` units) so it always fills the screen
- Multi-column grids collapse to single column on mobile
- Touch-friendly tap targets and spacing

---

## 8. Status & next steps

- ✅ **Built:** full foundation, all 8 sections, animations, responsive — committed to the repo, build passing
- ⏳ **Awaiting your review** of this brief
- 🔜 **Next:** lock the design direction (or request changes), then Codex designs refinements and I integrate + deploy

### Decisions I'd love your call on
1. **Keep brutalist-modern**, or explore an alternative (dark/neon, minimal, etc.)?
2. **Accent color** — keep electric indigo `#4F2BFF`, or try another?
3. **Add any future sections?** (Blog, Speaking, 3D hero, Resume download)
4. **Custom domain** for hosting (e.g. mohit.xyz / devrellab.com)?

---

*Everything here is changeable. This is a starting direction, not a final
contract — tell me what to push further or pull back, and we iterate.*
