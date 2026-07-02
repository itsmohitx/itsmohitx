import Link from "next/link";
import type { Essay, EssayMeta } from "@/lib/essays";
import { getRegion } from "@/content/regions";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * Plain reading: one column, generous serif, sidenotes for depth. Long essays
 * get a simple text table of contents (anchor links, nothing more). Ends with
 * a plain link to the next essay.
 */
export function EssayView({ essay, next }: { essay: Essay; next: EssayMeta | null }) {
  const region = getRegion(essay.region);
  const toc = essay.outline.filter((o) => o.depth === 2);
  const showToc = toc.length >= 4;

  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-11">
        {region && (
          <Link href={`/regions/${region.slug}`} className="label inline-block transition-colors hover:text-accent">
            {region.title}
          </Link>
        )}
        <h1 className="mt-4 font-serif text-[2.1rem] font-semibold leading-[1.08] tracking-[-0.015em] text-ink text-balance sm:text-[2.9rem]">
          {essay.title}
        </h1>
        {essay.dek && (
          <p className="mt-5 font-serif text-xl font-light leading-relaxed text-ink2 sm:text-[1.3rem]">
            {essay.dek}
          </p>
        )}
        <p className="mt-6 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink3">
          {essay.date && <time dateTime={essay.date}>{formatDate(essay.date)}</time>}
          <span aria-hidden> · </span>
          {essay.readingTime} min read
        </p>
      </header>

      {showToc && (
        <nav aria-label="Contents" className="mb-10 border-y border-line/[.16] py-4">
          <p className="label mb-2">Contents</p>
          <ol className="space-y-1">
            {toc.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="font-serif text-[0.98rem] text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline"
                >
                  <span className="mr-2 font-mono text-[0.7rem] text-ink3">
                    {String(i + 1).padStart(2, "0")}
                  </span>
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
          <p className="label">Next essay</p>
          <Link
            href={`/writing/${next.slug}`}
            className="group mt-2 block font-serif text-xl text-ink transition-colors hover:text-accent"
          >
            {next.title} <span aria-hidden className="text-accent">→</span>
          </Link>
        </div>
      )}
    </article>
  );
}
