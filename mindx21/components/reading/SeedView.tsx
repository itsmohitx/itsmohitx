import Link from "next/link";
import type { Seed } from "@/lib/seeds";
import type { EssayMeta } from "@/lib/essays";
import { getRegion } from "@/content/regions";

/**
 * A seed: a short entry note. Plain reading, and a plain "read the full essay"
 * link to its pillar at top and bottom. No panes.
 */
export function SeedView({ seed, pillar }: { seed: Seed; pillar: EssayMeta | null }) {
  const region = getRegion(seed.region);

  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-9">
        <p className="font-serif text-[0.95rem] italic text-ink2">
          A short note
          {region && (
            <>
              {" from "}
              <Link href={`/regions/${region.slug}`} className="text-accent underline underline-offset-4">
                {region.title}
              </Link>
            </>
          )}
        </p>
        <h1 className="mt-4 font-serif text-[1.9rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ink text-balance sm:text-[2.4rem]">
          {seed.title}
        </h1>

        {pillar && (
          <p className="mt-5 border-t border-line/[.16] pt-4 font-serif text-[0.95rem] text-ink2">
            From the essay:{" "}
            <Link href={`/writing/${pillar.slug}`} className="text-accent underline underline-offset-4">
              {pillar.title}
            </Link>
          </p>
        )}
      </header>

      <div className="reading" dangerouslySetInnerHTML={{ __html: seed.html }} />

      {pillar && (
        <div className="mt-12 border-t border-line/[.16] pt-5">
          <p className="font-serif text-[0.95rem] italic text-ink2">Read the full essay</p>
          <Link
            href={`/writing/${pillar.slug}`}
            className="group mt-1.5 block font-serif text-xl text-ink transition-colors hover:text-accent"
          >
            {pillar.title} <span aria-hidden className="text-accent">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}
