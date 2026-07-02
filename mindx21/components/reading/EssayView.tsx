import Link from "next/link";
import type { Essay, EssayMeta } from "@/lib/essays";
import { getRegion } from "@/content/regions";

/**
 * Plain reading: one column, generous serif, sidenotes for depth. No dates
 * anywhere. Long essays get a simple text contents list. Ends with a plain
 * link to the next essay. Labels are plain serif; the mono uppercase register
 * is reserved for navigation.
 */
export function EssayView({ essay, next }: { essay: Essay; next: EssayMeta | null }) {
  const region = getRegion(essay.region);
  const toc = essay.outline.filter((o) => o.depth === 2);
  const showToc = toc.length >= 4;

  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-11">
        {region && (
          <p className="font-serif text-[0.95rem] italic text-ink2">
            From the region{" "}
            <Link href={`/regions/${region.slug}`} className="text-accent underline underline-offset-4">
              {region.title}
            </Link>
          </p>
        )}
        {/* The headline may run wider than the reading measure on desktop so a
            long title sits on one line instead of stranding its last word;
            text-wrap: pretty guards the narrower widths. */}
        <h1 className="mt-4 font-serif text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.015em] text-ink [text-wrap:pretty] sm:text-[2.9rem] lg:w-[52rem] lg:max-w-none">
          {essay.title}
        </h1>
        {essay.dek && (
          <p className="mt-5 font-serif text-xl font-light leading-relaxed text-ink2 sm:text-[1.3rem]">
            {essay.dek}
          </p>
        )}
        <p className="mt-5 font-serif text-[0.9rem] text-ink2">{essay.readingTime} minute read</p>
      </header>

      {showToc && (
        <nav aria-label="Contents" className="mb-10 border-y border-line/[.16] py-4">
          <p className="font-serif text-[0.95rem] italic text-ink2">In this essay</p>
          <ol className="mt-2 space-y-1">
            {toc.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-serif text-[0.98rem] text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="reading" dangerouslySetInnerHTML={{ __html: essay.html }} />

      {next && (
        <div className="mt-16 border-t border-line/[.16] pt-5">
          <p className="font-serif text-[0.95rem] italic text-ink2">Next essay</p>
          <Link
            href={`/writing/${next.slug}`}
            className="group mt-1.5 block font-serif text-xl text-ink transition-colors hover:text-accent"
          >
            {next.title} <span aria-hidden className="text-accent">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}
