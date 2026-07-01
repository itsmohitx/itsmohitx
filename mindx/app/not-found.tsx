import Link from "next/link";
import { regions } from "@/content/regions";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-wide px-5 py-24 sm:px-8">
      <p className="label">404</p>
      <h1 className="mt-5 max-w-xl font-serif text-4xl font-semibold tracking-tight text-ink text-balance sm:text-5xl">
        This page does not exist.
      </h1>
      <p className="reading mt-5 max-w-md text-lg">
        The link may be old. Everything on the site is one click from here.
      </p>

      <div className="mt-9 flex flex-wrap gap-x-8 gap-y-2 font-mono text-[0.78rem] uppercase tracking-[0.12em]">
        <Link href="/" className="text-accent underline underline-offset-4">
          Home
        </Link>
        <Link href="/writing" className="text-accent underline underline-offset-4">
          Writing
        </Link>
        <Link href="/regions" className="text-accent underline underline-offset-4">
          Regions
        </Link>
      </div>

      <div className="mt-14 max-w-lg border-t border-line/[.16] pt-6">
        <p className="label mb-3">Or start in a region</p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {regions.map((r) => (
            <li key={r.slug}>
              <Link
                href={`/regions/${r.slug}`}
                className="font-serif text-[0.98rem] text-ink2 underline-offset-4 transition-colors hover:text-accent hover:underline"
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
