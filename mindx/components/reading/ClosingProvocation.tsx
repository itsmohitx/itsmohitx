import Link from "next/link";
import type { EssayMeta } from "@/lib/essays";

/**
 * The closing provocation: one sharp question, then the next essay as a plain
 * hairline block. No card, no box.
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
      <div className="mb-9 flex items-baseline gap-4">
        <span className="h-px flex-1 self-center bg-line/25" />
        <span className="font-mono text-[0.68rem] uppercase tracking-[0.16em] text-ink2">
          One more thought
        </span>
        <span className="h-px flex-1 self-center bg-line/25" />
      </div>

      {question && (
        <p className="font-serif text-2xl font-light italic leading-snug text-ink text-balance sm:text-[1.65rem]">
          {question}
        </p>
      )}

      {next && (
        <div className="mt-10 border-t border-line/[.16] pt-5">
          <p className="label">Follow the thread</p>
          <Link
            href={`/writing/${next.slug}`}
            className="group mt-2 block font-serif text-xl text-ink transition-colors hover:text-accent"
          >
            {next.title} <span aria-hidden className="text-accent">→</span>
          </Link>
          {next.glance && (
            <p className="mt-1.5 font-serif text-[0.95rem] leading-relaxed text-ink2">
              {next.glance}
            </p>
          )}
        </div>
      )}
    </aside>
  );
}
