"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

/**
 * The nameplate masthead. Small, mono, persistent on every page: MOHITX top
 * left, plain nav top right, one hairline rule underneath. This is the safety
 * net; the whole site is usable from here alone.
 */
export function Masthead() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-line/[.16] bg-bg/90 backdrop-blur-sm">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-14 max-w-wide items-center justify-between px-5 sm:px-8"
      >
        <Link
          href="/"
          className="font-mono text-[0.82rem] uppercase tracking-[0.22em] text-ink"
        >
          {site.name}
        </Link>

        <div className="flex items-center gap-1 sm:gap-2">
          {nav.map((item) =>
            item.external ? (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-2 py-2 font-mono text-[0.74rem] uppercase tracking-[0.14em] text-ink2 transition-colors hover:text-accent sm:px-3"
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
                className={`px-2 py-2 font-mono text-[0.74rem] uppercase tracking-[0.14em] transition-colors hover:text-accent sm:px-3 ${
                  item.match(pathname) ? "text-accent underline underline-offset-4" : "text-ink2"
                }`}
              >
                {item.label}
              </Link>
            )
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
