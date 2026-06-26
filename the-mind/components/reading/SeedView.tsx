import Link from "next/link";
import type { Seed } from "@/lib/seeds";
import type { EssayMeta } from "@/lib/essays";
import { getRegion } from "@/content/regions";

/**
 * A seed: a short entry note that funnels into a pillar. The "read the pillar"
 * link carries data-trail-slug, so on desktop the trail reader opens the pillar in
 * a pane beside the seed, and on mobile (or with no JS) it is an ordinary link to
 * the pillar's real URL.
 */
export function SeedView({ seed, pillar }: { seed: Seed; pillar: EssayMeta | null }) {
  const region = getRegion(seed.region);

  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-10">
        <div className="flex flex-wrap items-center gap-x-2">
          <span className="eyebrow">Seed</span>
          {region && (
            <Link href={`/regions/${region.slug}`} className="eyebrow text-amber/80 transition-colors hover:text-amber">
              · {region.short}
            </Link>
          )}
        </div>
        <h1 className="mt-4 font-serif text-[2rem] font-semibold leading-[1.12] tracking-[-0.015em] text-ink text-balance sm:text-[2.6rem]">
          {seed.title}
        </h1>
        <p className="mt-5 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-faint">
          Entry note · {seed.readingTime} min read
        </p>
      </header>

      <div className="reading" dangerouslySetInnerHTML={{ __html: seed.html }} />

      {pillar && (
        <a
          href={`/writing/${pillar.slug}`}
          data-trail-slug={pillar.slug}
          className="group mt-12 block rounded-2xl border border-line/15 bg-surface/50 p-6 transition-colors hover:border-amber/40 hover:bg-surface"
        >
          <span className="eyebrow text-amber/80">Read the pillar</span>
          <span className="mt-2 block font-serif text-xl text-ink transition-colors group-hover:text-amber">
            {pillar.title} →
          </span>
          <span className="mt-1.5 block font-sans text-sm text-muted">
            Opens beside this note on desktop, so you can read the seed and the essay together.
          </span>
        </a>
      )}
    </article>
  );
}
