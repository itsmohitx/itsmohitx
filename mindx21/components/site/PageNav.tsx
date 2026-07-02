import Link from "next/link";

export interface Crumb {
  label: string;
  href?: string;
}

/**
 * One navigation mechanism per page: clickable breadcrumbs. The first crumb is
 * Home, so there is no separate back/home pair duplicating it. Plain mono text.
 */
export function PageNav({ crumbs }: { crumbs: Crumb[]; backHref?: string }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-9 min-w-0">
      <ol className="flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-[0.7rem] uppercase tracking-[0.12em]">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={i} className="flex items-baseline gap-2">
              {c.href && !last ? (
                <Link
                  href={c.href}
                  className="inline-flex min-h-11 items-center text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {c.label}
                </Link>
              ) : (
                <span
                  className={`inline-flex min-h-11 items-center ${last ? "text-ink" : "text-ink2"}`}
                  aria-current={last ? "page" : undefined}
                >
                  {c.label}
                </span>
              )}
              {!last && <span className="text-ink3">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
