import Link from "next/link";
import { regions } from "@/content/regions";

/**
 * The clean, beautiful, zero-flourish fallback for the regions map. This is what
 * mobile and no-JS visitors get - and it's a first-class way to navigate, not a
 * degraded one. Every region is a real link to its page.
 */
export function RegionsList() {
  return (
    <ul className="border-t border-line/10">
      {regions.map((r) => (
        <li key={r.slug} className="border-b border-line/10">
          <Link
            href={`/regions/${r.slug}`}
            className="group flex flex-col gap-1.5 py-5 transition-colors sm:flex-row sm:items-baseline sm:gap-5"
          >
            <span className="flex items-center gap-3 sm:w-64 sm:shrink-0">
              <span
                aria-hidden
                className="h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: r.accent === "amber" ? "rgb(var(--amber))" : "rgb(var(--oxblood))",
                  boxShadow: `0 0 12px ${r.accent === "amber" ? "rgb(var(--amber) / 0.6)" : "rgb(var(--oxblood) / 0.6)"}`,
                }}
              />
              <span className="font-serif text-xl text-ink transition-colors group-hover:text-amber">
                {r.title}
              </span>
            </span>
            <span className="pl-5 font-sans text-[0.95rem] leading-relaxed text-muted sm:pl-0">
              {r.glance}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
