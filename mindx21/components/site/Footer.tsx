import fs from "node:fs";
import path from "node:path";
import Link from "next/link";
import { nav, site } from "@/lib/site";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/**
 * Full-bleed footer. Same nav vocabulary as the header, plus X and the two
 * companies. The small video loop renders when public/footer.mp4 exists.
 * No colophon, no bio line.
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

          <ul className="flex flex-wrap items-baseline gap-x-7 gap-y-3 font-mono text-[0.76rem] uppercase tracking-[0.12em]">
            {nav.map((item) =>
              item.external ? (
                <li key={item.label}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-ink transition-colors hover:text-accent"
                  >
                    {item.label} <span aria-hidden className="text-accent">↗</span>
                  </a>
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center text-ink2 transition-colors hover:text-accent"
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li>
              <a
                href={site.x.href}
                target="_blank"
                rel="me noopener noreferrer"
                className="inline-flex min-h-11 items-center text-ink transition-colors hover:text-accent"
              >
                {site.x.handle} <span aria-hidden className="text-accent">↗</span>
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-10 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-ink3" suppressHydrationWarning>
          © {new Date().getFullYear()} {site.author} ·{" "}
          <a href="https://glanzaventures.com" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            Glanza Ventures
          </a>{" "}
          ·{" "}
          <a href="https://engagenetwork.ai" target="_blank" rel="noopener noreferrer" className="hover:text-accent">
            Engage Network
          </a>
        </p>
      </div>
    </footer>
  );
}
