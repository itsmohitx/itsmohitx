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
 * The sacred reading experience — one column, generous serif, sidenotes for depth.
 * Rendered on the server (SSR, SEO, fast). Used as the canonical essay body and,
 * verbatim, as pane 0 inside the trail reader.
 */
export function EssayView({ essay, next }: { essay: Essay; next: EssayMeta | null }) {
  const region = getRegion(essay.region);

  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-12">
        {region && (
          <Link
            href={`/regions/${region.slug}`}
            className="eyebrow inline-block transition-colors hover:text-amber"
          >
            {region.title}
          </Link>
        )}
        <h1 className="mt-4 font-serif text-[2.1rem] font-semibold leading-[1.1] tracking-[-0.015em] text-ink text-balance sm:text-5xl">
          {essay.title}
        </h1>
        {essay.dek && (
          <p className="mt-5 font-serif text-xl font-light leading-relaxed text-muted sm:text-[1.35rem]">
            {essay.dek}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.72rem] uppercase tracking-[0.12em] text-faint">
          {essay.date && <time dateTime={essay.date}>{formatDate(essay.date)}</time>}
          <span aria-hidden>·</span>
          <span>{essay.readingTime} min read</span>
        </div>
      </header>

      <ResolutionTabs glance={essay.glance} summary={essay.summary} outline={essay.outline}>
        <div className="reading" dangerouslySetInnerHTML={{ __html: essay.html }} />
      </ResolutionTabs>

      <ClosingProvocation question={essay.provocation} next={next} />
    </article>
  );
}
