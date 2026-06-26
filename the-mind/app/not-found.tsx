import Link from "next/link";
import { regions } from "@/content/regions";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-wide flex-col items-center px-5 py-28 text-center sm:px-8">
      <p className="eyebrow">404</p>
      <h1 className="mt-5 max-w-xl font-serif text-4xl font-semibold tracking-tight text-ink text-balance sm:text-5xl">
        This thought doesn&apos;t exist yet.
      </h1>
      <p className="mt-5 max-w-md font-serif text-lg font-light leading-relaxed text-muted">
        The page you&apos;re looking for isn&apos;t here, but the mind is large, and
        you&apos;re one click from anywhere in it.
      </p>

      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-amber px-5 py-2.5 font-sans text-[0.92rem] font-medium text-bg transition-opacity hover:opacity-90"
        >
          ⌂ Back to the map
        </Link>
        <Link
          href="/writing"
          className="rounded-full border border-line/25 px-5 py-2.5 font-sans text-[0.92rem] text-ink transition-colors hover:border-amber/50"
        >
          Read the writing →
        </Link>
      </div>

      <div className="mt-14 w-full max-w-lg border-t border-line/10 pt-8">
        <p className="eyebrow mb-4">Or wander into a region</p>
        <ul className="flex flex-wrap justify-center gap-2">
          {regions.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/regions/${r.slug}`}
                className="rounded-full border border-line/20 px-3.5 py-1.5 font-sans text-sm text-muted transition-colors hover:border-amber/50 hover:text-ink"
              >
                {r.short}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
