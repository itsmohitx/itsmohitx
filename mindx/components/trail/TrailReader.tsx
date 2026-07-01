"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Trail reading: clicking a trail link opens the target in a pane beside the
 * current one; earlier panes collapse to labelled spines. The stack is encoded
 * in the URL (?trail=a,b,c) via history.pushState, so Back pops a pane and
 * refresh or share reproduces the exact trail.
 *
 * Fixes over v1: native scrolling only (no smooth-scroll library fighting the
 * pane's inner scroll), and opening a pane never jumps the page vertically.
 * Horizontal movement happens inside the scroller; the window is pinned to the
 * top of the reading area, never the footer.
 *
 * Progressive enhancement: activates on wide screens only. On mobile or with
 * no JS every trail link is an ordinary <a href> to a real URL.
 */

const SPINE_REM = 2.75;
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface PaneData {
  slug: string;
  title: string;
  dek: string;
  glance: string;
  readingTime: number;
  region: { slug: string; short: string } | null;
  html: string;
}

export function TrailReader({
  baseTitle,
  baseSlug,
  children,
}: {
  baseTitle: string;
  baseSlug: string;
  children: React.ReactNode;
}) {
  const [trail, setTrail] = useState<string[]>([]);
  const [cache, setCache] = useState<Record<string, PaneData | null | "loading">>({});
  const [isDesktop, setIsDesktop] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const knownRef = useRef<Record<string, PaneData | null | "loading">>({});

  const readUrl = useCallback(() => {
    const p = new URLSearchParams(window.location.search).get("trail");
    return p ? p.split(",").map((s) => s.trim()).filter(Boolean) : [];
  }, []);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    setTrail(readUrl());
    const onPop = () => setTrail(readUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [readUrl]);

  useEffect(() => {
    let cancelled = false;
    trail.forEach((slug) => {
      if (knownRef.current[slug] !== undefined) return;
      knownRef.current[slug] = "loading";
      setCache((prev) => ({ ...prev, [slug]: "loading" }));
      fetch(`${BASE_PATH}/writing/${slug}/fragment`)
        .then(async (res) => (res.ok ? ((await res.json()) as PaneData) : null))
        .then((val) => {
          knownRef.current[slug] = val;
          if (!cancelled) setCache((prev) => ({ ...prev, [slug]: val }));
        })
        .catch(() => {
          knownRef.current[slug] = null;
          if (!cancelled) setCache((prev) => ({ ...prev, [slug]: null }));
        });
    });
    return () => {
      cancelled = true;
    };
  }, [trail]);

  const pushTrail = useCallback((next: string[]) => {
    const sp = new URLSearchParams(window.location.search);
    if (next.length) sp.set("trail", next.join(","));
    else sp.delete("trail");
    const qs = sp.toString();
    window.history.pushState({}, "", window.location.pathname + (qs ? `?${qs}` : ""));
    setTrail(next);
  }, []);

  /**
   * Reveal a pane WITHOUT letting the browser scroll the page to the pane's
   * bottom edge (the old footer jump). Vertical: pin the window to the top of
   * the reading area if it is not already visible. Horizontal: move only the
   * scroller's own scrollLeft.
   */
  const revealPane = useCallback((index: number) => {
    requestAnimationFrame(() => {
      const scroller = scrollerRef.current;
      if (!scroller) return;
      const top = scroller.getBoundingClientRect().top + window.scrollY - 64;
      if (Math.abs(window.scrollY - top) > 8) {
        window.scrollTo({ top, behavior: "auto" });
      }
      const pane = scroller.querySelector<HTMLElement>(`[data-pane-index="${index}"]`);
      if (pane) {
        const target = pane.offsetLeft + pane.offsetWidth - scroller.clientWidth;
        scroller.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      }
    });
  }, []);

  const openFrom = useCallback(
    (fromIndex: number, slug: string) => {
      const current = readUrl();
      if (slug === baseSlug && fromIndex === 0) {
        revealPane(0);
        return;
      }
      const next = [...current.slice(0, fromIndex), slug];
      pushTrail(next);
      revealPane(next.length);
    },
    [baseSlug, pushTrail, readUrl, revealPane]
  );

  const closePane = useCallback(
    (paneIndex: number) => {
      const current = readUrl();
      pushTrail(current.slice(0, paneIndex - 1));
    },
    [pushTrail, readUrl]
  );

  const onContainerClick = (e: React.MouseEvent) => {
    if (!isDesktop) return;
    const anchor = (e.target as HTMLElement).closest<HTMLElement>("a[data-trail-slug]");
    if (!anchor) return;
    const slug = anchor.getAttribute("data-trail-slug");
    if (!slug) return;
    e.preventDefault();
    const paneEl = anchor.closest<HTMLElement>("[data-pane-index]");
    const fromIndex = paneEl ? Number(paneEl.getAttribute("data-pane-index")) : 0;
    openFrom(fromIndex, slug);
  };

  const trailMode = mounted && isDesktop && trail.length > 0;

  return (
    <div onClick={onContainerClick}>
      <div
        ref={scrollerRef}
        className={trailMode ? "trail-scroller" : ""}
        aria-label={trailMode ? "Reading trail" : undefined}
      >
        <section
          data-pane-index={0}
          className={trailMode ? "trail-pane" : ""}
          style={trailMode ? { left: 0, zIndex: 1, width: "min(44rem, 92vw)" } : undefined}
        >
          {trailMode ? (
            <>
              <PaneRail index={0} title={baseTitle} onClick={() => revealPane(0)} />
              <div className="pane-body">{children}</div>
            </>
          ) : (
            children
          )}
        </section>

        {trailMode &&
          trail.map((slug, i) => {
            const paneIndex = i + 1;
            const data = cache[slug];
            return (
              <section
                key={`${slug}-${i}`}
                data-pane-index={paneIndex}
                className="trail-pane trail-pane--enter"
                style={{
                  left: `${paneIndex * SPINE_REM}rem`,
                  zIndex: paneIndex + 1,
                  width: "min(44rem, 92vw)",
                }}
              >
                <PaneRail
                  index={paneIndex}
                  title={data && data !== "loading" ? data.title : slug}
                  onClick={() => revealPane(paneIndex)}
                />
                <button
                  type="button"
                  className="pane-close"
                  aria-label="Close this pane"
                  onClick={() => closePane(paneIndex)}
                >
                  ×
                </button>
                <div className="pane-body">
                  <FetchedPane data={data} slug={slug} />
                </div>
              </section>
            );
          })}
      </div>
    </div>
  );
}

function PaneRail({
  index,
  title,
  onClick,
}: {
  index: number;
  title: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className="pane-rail" onClick={onClick} title={title}>
      <span className="font-mono text-[0.7rem] text-accent">{String(index).padStart(2, "0")}</span>
      <span className="pane-rail-title">{title}</span>
    </button>
  );
}

function FetchedPane({ data, slug }: { data: PaneData | null | "loading" | undefined; slug: string }) {
  if (data === undefined || data === "loading") {
    return (
      <div className="mx-auto max-w-measure animate-pulse pt-6">
        <div className="h-3 w-24 bg-line/20" />
        <div className="mt-5 h-9 w-3/4 bg-line/20" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 bg-line/15" style={{ width: `${90 - i * 6}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (data === null) {
    return (
      <div className="mx-auto max-w-measure pt-6">
        <p className="text-ink2">This thread could not be opened here.</p>
        <Link href={`/writing/${slug}`} className="mt-3 inline-block text-accent underline underline-offset-4">
          Open it as a page →
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-9">
        {data.region && (
          <Link href={`/regions/${data.region.slug}`} className="label transition-colors hover:text-accent">
            {data.region.short}
          </Link>
        )}
        <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink">
          <Link href={`/writing/${data.slug}`} className="transition-colors hover:text-accent">
            {data.title}
          </Link>
        </h2>
        {data.dek && <p className="mt-3 font-serif text-lg font-light text-ink2">{data.dek}</p>}
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-ink3">
          {data.readingTime} min read
        </p>
      </header>
      <div className="reading" dangerouslySetInnerHTML={{ __html: data.html }} />
    </article>
  );
}
