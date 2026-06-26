"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * The inner-page navigation rail: clickable breadcrumbs + always-present
 * "← Back" and "⌂ Home" controls. Every crumb is a real link; Back uses history
 * when available and falls back to a sensible route so a visitor is never trapped.
 */
export function PageNav({ crumbs, backHref }: { crumbs: Crumb[]; backHref?: string }) {
  const router = useRouter();

  const goBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push(backHref ?? "/");
    }
  };

  return (
    <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-center gap-2">
                {c.href && !last ? (
                  <Link href={c.href} className="text-muted transition-colors hover:text-ink">
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-ink" : "text-muted"} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last && <span className="text-faint">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={goBack}
          className="rounded-full border border-line/30 px-3 py-1.5 font-sans text-[0.8rem] text-muted transition-colors hover:border-amber/50 hover:text-ink"
        >
          ← Back
        </button>
        <Link
          href="/"
          className="rounded-full border border-line/30 px-3 py-1.5 font-sans text-[0.8rem] text-muted transition-colors hover:border-amber/50 hover:text-ink"
        >
          ⌂ Home
        </Link>
      </div>
    </div>
  );
}
