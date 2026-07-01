import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { site } from "@/lib/site";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Full-bleed footer. Carries the small video loop (same scene as the hero) when
 * public/footer.mp4 exists, the X and e/acc Index links, and a plain colophon.
 * No bio line, no logos, nothing "coming soon".
 */
export function Footer() {
  const hasVideo = fs.existsSync(path.join(process.cwd(), "public", "footer.mp4"));

  return (
    <footer className="mt-24">
      <hr className="rule" />

      {hasVideo && (
        <div className="relative h-40 w-full overflow-hidden sm:h-56" aria-hidden>
          <video
            src={`${BASE_PATH}/footer.mp4`}
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover motion-reduce:hidden"
          />
          <div className="band-blend absolute inset-0 hidden motion-reduce:block" />
        </div>
      )}

      <div className="mx-auto max-w-wide px-5 py-12 sm:px-8">
        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-6">
          <div>
            <Link href="/" className="font-mono text-[0.82rem] uppercase tracking-[0.22em] text-ink">
              {site.name}
            </Link>
            <p className="mt-2 max-w-md font-serif text-[0.95rem] leading-relaxed text-ink2">
              {site.tagline}
            </p>
          </div>

          <ul className="flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-[0.78rem] uppercase tracking-[0.12em]">
            <li>
              <a
                href={site.index.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                {site.index.name} <span aria-hidden className="text-accent">↗</span>
              </a>
            </li>
            <li>
              <a
                href={site.x.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="text-ink transition-colors hover:text-accent"
              >
                {site.x.handle} <span aria-hidden className="text-accent">↗</span>
              </a>
            </li>
            <li>
              <Link href="/writing" className="text-ink2 transition-colors hover:text-accent">
                Writing
              </Link>
            </li>
            <li>
              <Link href="/regions" className="text-ink2 transition-colors hover:text-accent">
                Regions
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-ink2 transition-colors hover:text-accent">
                About
              </Link>
            </li>
          </ul>
        </div>

        <p className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink3" suppressHydrationWarning>
          © {new Date().getFullYear()} {site.author} · set in Fraunces and Fragment Mono
        </p>
      </div>
    </footer>
  );
}
