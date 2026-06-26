import Link from "next/link";
import type { EssayMeta } from "@/lib/essays";

/**
 * The one creative touch at the end of every essay: a sharp question that is a
 * provocation, not a graded quiz. It doesn't score the reader — it hands them
 * the next thought and links to the next essay. Reward = insight, not a checkmark.
 */
export function ClosingProvocation({
  question,
  next,
}: {
  question: string;
  next: EssayMeta | null;
}) {
  if (!question && !next) return null;

  return (
    <aside className="mx-auto mt-20 max-w-measure">
      <div className="mb-10 flex items-center gap-4 text-amber/60">
        <span className="h-px flex-1 bg-line/20" />
        <span className="font-mono text-[0.7rem] uppercase tracking-[0.18em]">
          One more thought
        </span>
        <span className="h-px flex-1 bg-line/20" />
      </div>

      {question && (
        <p className="font-serif text-2xl font-light italic leading-snug text-ink text-balance sm:text-[1.7rem]">
          {question}
        </p>
      )}

      {next && (
        <Link
          href={`/writing/${next.slug}`}
          className="group mt-10 block rounded-2xl border border-line/15 bg-surface/50 p-6 transition-colors hover:border-amber/40 hover:bg-surface"
        >
          <span className="eyebrow text-amber/80">Follow the thread →</span>
          <span className="mt-2 block font-serif text-xl text-ink transition-colors group-hover:text-amber">
            {next.title}
          </span>
          {next.glance && (
            <span className="mt-1.5 block font-sans text-sm leading-relaxed text-muted">
              {next.glance}
            </span>
          )}
        </Link>
      )}
    </aside>
  );
}
