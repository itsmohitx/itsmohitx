import Link from "next/link";
import { futureProject, nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line/10">
      <div className="mx-auto max-w-wide px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2">
          <div className="max-w-sm">
            <Link href="/" className="font-sans text-base font-medium tracking-tight">
              The <span className="text-amber">Mind</span>
            </Link>
            {/* The credibility whisper — one quiet line, no logos, no grid. */}
            <p className="mt-3 font-mono text-[0.72rem] leading-relaxed text-faint">
              {site.credibility}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <nav aria-label="Footer">
              <p className="eyebrow mb-3">Navigate</p>
              <ul className="space-y-2">
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="font-sans text-sm text-muted transition-colors hover:text-ink">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div>
              <p className="eyebrow mb-3">Elsewhere</p>
              <ul className="space-y-2">
                {site.social.map((s) => (
                  <li key={s.href}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="me noopener noreferrer"
                      className="font-sans text-sm text-muted transition-colors hover:text-ink"
                    >
                      {s.handle}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The optional future-project slot. Quiet by design; nothing is built around it. */}
        <div className="mt-12 rounded-xl border border-dashed border-line/20 bg-surface/40 px-5 py-4">
          <p className="eyebrow mb-1 text-amber/80">Coming · a thematic spine</p>
          {futureProject.live ? (
            <Link href={futureProject.href} className="font-serif text-lg text-ink hover:text-amber">
              {futureProject.name} →
            </Link>
          ) : (
            <p className="font-serif text-lg text-ink">{futureProject.name}</p>
          )}
          <p className="mt-1 max-w-xl font-sans text-[0.85rem] leading-relaxed text-muted">
            {futureProject.blurb}
          </p>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-line/10 pt-6 text-faint sm:flex-row sm:items-center">
          <p className="font-mono text-[0.7rem]">
            © {new Date().getFullYear()} {site.author} · {site.handle}
          </p>
          <p className="font-mono text-[0.7rem]">Set in Newsreader &amp; Space Grotesk</p>
        </div>
      </div>
    </footer>
  );
}
