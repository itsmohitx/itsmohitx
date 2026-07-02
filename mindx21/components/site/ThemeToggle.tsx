"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** Plain mono text toggle. Keeps the theme-color meta in sync with the theme. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  const toggle = () => {
    const next = isDark ? "light" : "dark";
    setTheme(next);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute("content", next === "dark" ? "#0A0E15" : "#FFFFFF");
  };

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={toggle}
      className="min-h-11 px-3 py-2 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink2 transition-colors hover:text-accent"
    >
      {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
    </button>
  );
}
