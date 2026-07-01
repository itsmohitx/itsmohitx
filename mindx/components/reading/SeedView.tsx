import Link from "next/link";
import type { Seed } from "@/lib/seeds";
import type { EssayMeta } from "@/lib/essays";
import { getRegion } from "@/content/regions";

/**
 * A seed: a short entry note that opens into a pillar essay. The pillar
 * affordance sits at the TOP, visible without scrolling, so the split pane is
 * discoverable in place. On desktop it opens the essay in a pane beside the
 * note (data-trail-slug); on mobile and with no JS it is a plain link to the
 * essay's real URL.
 */
export function SeedView({ seed, pillar }: { seed: Seed; pillar: EssayMeta | null }) {
  const region = getRegion(seed.region);

  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-9">
        <p className="label">
          Seed
          {region && (
            <>
              {" · "}
              <Link href={`/regions/${region.slug}`} className="transition-colors hover:text-accent">
                {region.short}
              </Link>
            </>
          )}
        </p>
        <h1 className="mt-4 font-serif text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ink text-balance sm:text-[2.4rem]">
          {seed.title}
        </h1>

        {pillar && (
          <p className="mt-5 border-t border-line/[.16] pt-4 font-mono text-[0.74rem] uppercase tracking-[0.12em] text-ink2">
            {seed.readingTime} min note · opens into{" "}
            <a
              href={`/writing/${pillar.slug}`}
              data-trail-slug={pillar.slug}
              className="text-accent underline underline-offset-4"
            >
              {pillar.title}
            </a>
          </p>
        )}
      </header>

      <div className="reading" dangerouslySetInnerHTML={{ __html: seed.html }} />

      {pillar && (
        <div className="mt-12 border-t border-line/[.16] pt-5">
          <p className="label">The full argument</p>
          <a
            href={`/writing/${pillar.slug}`}
            data-trail-slug={pillar.slug}
            className="group mt-2 block font-serif text-xl text-ink transition-colors hover:text-accent"
          >
            {pillar.title} <span aria-hidden className="text-accent">→</span>
          </a>
          <p className="mt-1.5 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink3">
            On a wide screen this opens beside the note, so you can read both together.
          </p>
        </div>
      )}
    </article>
  );
}
