import Link from "next/link";
import type { Essay, EssayMeta } from "@/lib/essays";
import { getRegion } from "@/content/regions";
import { ResolutionTabs } from "./ResolutionTabs";
import { ClosingProvocation } from "./ClosingProvocation";

function formatDate(iso: string): string {
  if (!iso) return "";
  const d = new Date(iso + "T00:00:00");
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

/**
 * The reading page: one column, generous serif, sidenotes for depth. Server
 * rendered. Used as the canonical essay body and, verbatim, as pane 0 inside
 * the trail reader.
 */
export function EssayView({ essay, next }: { essay: Essay; next: EssayMeta | null }) {
  const region = getRegion(essay.region);

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

      <ResolutionTabs glance={essay.glance} summary={essay.summary} outline={essay.outline}>
        <div className="reading" dangerouslySetInnerHTML={{ __html: essay.html }} />
      </ResolutionTabs>

      <ClosingProvocation question={essay.provocation} next={next} />
    </article>
  );
}
