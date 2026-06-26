import type { Config } from "tailwindcss";

/**
 * Warm Ink — the design system for "The Mind".
 *
 * All colours are driven by CSS custom properties (channel triplets) defined in
 * app/globals.css and switched by [data-theme="light"]. That keeps a single token
 * set across light/dark and lets every colour participate in Tailwind's opacity
 * modifiers (e.g. text-ink/70, border-line/60).
 */
const config: Config = {
  darkMode: ["class", '[data-theme="dark"]'],
  content: [
    "./app/**/*.{ts,tsx,mdx}",
    "./components/**/*.{ts,tsx}",
    "./content/**/*.{ts,tsx,mdx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--bg) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        raised: "rgb(var(--raised) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        faint: "rgb(var(--faint) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
        amber: "rgb(var(--amber) / <alpha-value>)",
        oxblood: "rgb(var(--oxblood) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-newsreader)", "Newsreader", "Georgia", "serif"],
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      maxWidth: {
        measure: "40rem", // comfortable reading measure (~66 chars at reading size)
        prose: "44rem",
        wide: "72rem",
      },
      letterSpacing: {
        eyebrow: "0.18em",
      },
      boxShadow: {
        pane: "0 1px 0 rgb(var(--line) / 0.6), 0 24px 60px -32px rgb(0 0 0 / 0.55)",
        glow: "0 0 60px -12px rgb(var(--amber) / 0.35)",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.22, 1, 0.36, 1)",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { opacity: "0.65", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.03)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        breathe: "breathe 7s ease-in-out infinite",
        "fade-up": "fade-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
