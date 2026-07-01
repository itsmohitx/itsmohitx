"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/** A plain mono text toggle. No pill, no icon chrome. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // The resolved theme is only known on the client.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={mounted ? `Switch to ${isDark ? "light" : "dark"} theme` : "Toggle theme"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="px-2 py-2 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink2 transition-colors hover:text-accent sm:px-3"
    >
      {mounted ? (isDark ? "Light" : "Dark") : "Theme"}
    </button>
  );
}
