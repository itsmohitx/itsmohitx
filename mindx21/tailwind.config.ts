import type { Config } from "tailwindcss";

/**
 * MohitX design system. Colours are CSS custom properties (channel triplets) in
 * app/globals.css, switched by [data-theme]. Two faces: Fraunces (serif, display
 * and body) and Fragment Mono (labels, metadata). No sans. No rounded corners
 * anywhere (enforced globally in CSS).
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
        ink: "rgb(var(--ink) / <alpha-value>)",
        ink2: "rgb(var(--ink2) / <alpha-value>)",
        ink3: "rgb(var(--ink3) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        line: "rgb(var(--line) / <alpha-value>)",
      },
      fontFamily: {
        serif: ["var(--font-source-serif)", "Georgia", "serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-fragment-mono)", "ui-monospace", "monospace"],
      },
      maxWidth: {
        /* ~66 characters of Source Serif body at 19px: the one reading measure.
           Measured in-browser: 608px at 19px is 67 characters per line. */
        measure: "38rem",
        wide: "76rem",
      },
      animation: {
        "fade-up": "fade-up 0.4s ease both",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
