"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * Breadcrumbs plus an always-present back and home. Plain mono text, no pills,
 * no boxes. Back uses history when there is any, otherwise a sensible route, so
 * a visitor is never trapped.
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
    <div className="mb-9 flex flex-wrap items-baseline justify-between gap-3">
      <nav aria-label="Breadcrumb" className="min-w-0">
        <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={i} className="flex items-baseline gap-2">
                {c.href && !last ? (
                  <Link href={c.href} className="text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline">
                    {c.label}
                  </Link>
                ) : (
                  <span className={last ? "text-ink" : "text-ink2"} aria-current={last ? "page" : undefined}>
                    {c.label}
                  </span>
                )}
                {!last && <span className="text-ink3">/</span>}
              </li>
            );
          })}
        </ol>
      </nav>

      <div className="flex items-baseline gap-5 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
        <button
          type="button"
          onClick={goBack}
          className="text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline"
        >
          ← Back
        </button>
        <Link href="/" className="text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline">
          Home
        </Link>
      </div>
    </div>
  );
}
