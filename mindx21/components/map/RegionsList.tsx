import Link from "next/link";
import { regions } from "@/content/regions";

/**
 * The plain fallback and full equivalent of the map for touch, keyboard, and
 * no-JS: full-width hairline rows, every region a real link. Not a degraded
 * mode, a first-class one.
 */
export function RegionsList() {
  return (
    <ul>
      {regions.map((r) => (
        <li key={r.slug} className="border-t border-line/[.16] last:border-b">
          <Link
            href={`/regions/${r.slug}`}
            className="group flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-8"
          >
            <span className="w-56 shrink-0 font-serif text-xl leading-snug text-ink transition-colors group-hover:text-accent">
              {r.title}
            </span>
            <span className="type-dek">{r.glance}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
