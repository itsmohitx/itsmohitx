"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Nameplate masthead: MOHITX top left, the primary nav top right, one hairline
 * rule underneath. On small screens the nav collapses into a menu button with
 * 44px tap targets. Header and footer share the same nav list.
 */
export function Masthead() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-line/[.16] bg-bg/90 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-wide items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="flex min-h-11 items-center font-mono text-[0.82rem] uppercase tracking-[0.22em] text-ink"
        >
          {site.name}
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-11 items-center px-3 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink2 transition-colors hover:text-accent"
              >
                {item.label}
                <span aria-hidden className="ml-0.5 text-accent">
                  ↗
                </span>
              </a>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                aria-current={item.match(pathname) ? "page" : undefined}
                className={`flex min-h-11 items-center px-3 font-mono text-[0.74rem] uppercase tracking-[0.14em] transition-colors hover:text-accent ${
                  item.match(pathname) ? "text-accent underline underline-offset-4" : "text-ink2"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <ThemeToggle />
        </div>

        {/* Mobile: theme + menu button */}
        <div className="flex items-center md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex min-h-11 min-w-11 items-center justify-center font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      {/* Mobile panel: plain full-width rows, 44px targets. */}
      {open && (
        <div className="border-t border-line/[.16] bg-bg md:hidden">
          <ul className="mx-auto max-w-wide px-5 py-2">
            {nav.map((item) => (
              <li key={item.label} className="border-t border-line/[.12] first:border-t-0">
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-h-12 items-center font-mono text-[0.82rem] uppercase tracking-[0.14em] text-ink"
                  >
                    {item.label}
                    <span aria-hidden className="ml-1 text-accent">
                      ↗
                    </span>
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    aria-current={item.match(pathname) ? "page" : undefined}
                    className={`flex min-h-12 items-center font-mono text-[0.82rem] uppercase tracking-[0.14em] ${
                      item.match(pathname) ? "text-accent" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
