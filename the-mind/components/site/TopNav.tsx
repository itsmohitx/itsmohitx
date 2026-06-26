"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The safety net. Persistent, always-visible, works at every depth and on every
 * route. A first-time visitor can use the whole site from this bar alone.
 */
export function TopNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/10 bg-bg/80 backdrop-blur-md backdrop-saturate-150">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-16 max-w-wide items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="group flex items-center gap-2.5 rounded-md font-sans text-[0.95rem] font-medium tracking-tight"
        >
          <MindMark />
          <span>
            The <span className="text-amber">Mind</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => {
            const active = item.match(pathname);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`relative rounded-md px-3 py-2 font-sans text-[0.9rem] transition-colors hover:text-ink ${
                    active ? "text-ink" : "text-muted"
                  }`}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-amber" />
                  )}
                </Link>
              </li>
            );
          })}
          <li className="ml-2 pl-2">
            <ThemeToggle />
          </li>
        </ul>

        {/* Mobile controls */}
        <div className="flex items-center gap-1.5 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-line/30 text-ink"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-line/10 bg-bg md:hidden">
          <ul className="mx-auto max-w-wide px-4 py-2">
            {nav.map((item) => {
              const active = item.match(pathname);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 font-sans text-base ${
                      active ? "bg-surface text-ink" : "text-muted"
                    }`}
                  >
                    {item.label}
                    {active && <span className="h-1.5 w-1.5 rounded-full bg-amber" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}

function MindMark() {
  // A small, quiet mark: concentric warm arcs - a mind, not a brain clipart.
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 text-amber">
      <circle cx="12" cy="12" r="2.4" fill="currentColor" />
      <circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1.1" opacity="0.6" />
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.28" />
    </svg>
  );
}
