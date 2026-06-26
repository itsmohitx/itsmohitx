"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

/**
 * Trail reading — the signature interaction (Matuschak stacked panes).
 *
 * Clicking a :trail link opens the target in a pane *beside* the current one;
 * earlier panes collapse to labelled vertical spines, so the reader sees the trail
 * of their own curiosity. The whole stack is encoded in the URL (?trail=a,b,c) via
 * history.pushState, so browser Back pops a pane and refresh/share reproduce the
 * exact trail.
 *
 * Progressive enhancement: this only activates on wide screens. On mobile (or with
 * no JS) the same :trail links are ordinary <a href="/writing/slug"> — they just
 * navigate. Navigation is never sacrificed for the flourish.
 */

const SPINE_REM = 2.75;

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

  // Mount + responsive detection.
  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Initialise from the URL and follow Back/Forward.
  useEffect(() => {
    setTrail(readUrl());
    const onPop = () => setTrail(readUrl());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, [readUrl]);

  // Lazily fetch each pane's rendered fragment.
  useEffect(() => {
    let cancelled = false;
    trail.forEach((slug) => {
      if (knownRef.current[slug] !== undefined) return;
      knownRef.current[slug] = "loading";
      setCache((prev) => ({ ...prev, [slug]: "loading" }));
      fetch(`/writing/${slug}/fragment`)
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

  const scrollToPane = useCallback((index: number) => {
    requestAnimationFrame(() => {
      scrollerRef.current
        ?.querySelector(`[data-pane-index="${index}"]`)
        ?.scrollIntoView({ inline: "end", block: "nearest", behavior: "smooth" });
    });
  }, []);

  // Open `slug` from the pane at `fromIndex` (0 = the base essay).
  const openFrom = useCallback(
    (fromIndex: number, slug: string) => {
      const current = readUrl();
      if (slug === baseSlug && fromIndex === 0) {
        scrollToPane(0);
        return;
      }
      const next = [...current.slice(0, fromIndex), slug];
      pushTrail(next);
      scrollToPane(next.length);
    },
    [baseSlug, pushTrail, readUrl, scrollToPane]
  );

  const closePane = useCallback(
    (paneIndex: number) => {
      const current = readUrl();
      pushTrail(current.slice(0, paneIndex - 1));
    },
    [pushTrail, readUrl]
  );

  // Delegate clicks on trail links. Region links and everything else navigate.
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
        {/* Pane 0 — the canonical essay. Same node in both modes (state preserved). */}
        <section
          data-pane-index={0}
          className={trailMode ? "trail-pane" : ""}
          style={trailMode ? { left: 0, zIndex: 1, width: "min(44rem, 92vw)" } : undefined}
        >
          {trailMode ? (
            <>
              <PaneRail index={0} title={baseTitle} onClick={() => scrollToPane(0)} />
              <div className="pane-body">{children}</div>
            </>
          ) : (
            children
          )}
        </section>

        {/* Trail panes */}
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
                  onClick={() => scrollToPane(paneIndex)}
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
      <span className="font-mono text-[0.7rem] text-amber">{String(index).padStart(2, "0")}</span>
      <span className="pane-rail-title">{title}</span>
    </button>
  );
}

function FetchedPane({ data, slug }: { data: PaneData | null | "loading" | undefined; slug: string }) {
  if (data === undefined || data === "loading") {
    return (
      <div className="mx-auto max-w-measure animate-pulse pt-6">
        <div className="h-3 w-24 rounded bg-line/15" />
        <div className="mt-5 h-9 w-3/4 rounded bg-line/15" />
        <div className="mt-8 space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-line/10" style={{ width: `${90 - i * 6}%` }} />
          ))}
        </div>
      </div>
    );
  }
  if (data === null) {
    return (
      <div className="mx-auto max-w-measure pt-6">
        <p className="text-muted">This thread couldn&apos;t be opened here.</p>
        <Link href={`/writing/${slug}`} className="mt-3 inline-block text-amber hover:underline">
          Open it as a page →
        </Link>
      </div>
    );
  }
  return (
    <article className="mx-auto max-w-measure">
      <header className="mb-9">
        {data.region && (
          <Link href={`/regions/${data.region.slug}`} className="eyebrow hover:text-amber">
            {data.region.short}
          </Link>
        )}
        <h2 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-ink">
          <Link href={`/writing/${data.slug}`} className="hover:text-amber">
            {data.title}
          </Link>
        </h2>
        {data.dek && <p className="mt-3 font-serif text-lg font-light text-muted">{data.dek}</p>}
        <p className="mt-4 font-mono text-[0.7rem] uppercase tracking-[0.12em] text-faint">
          {data.readingTime} min read
        </p>
      </header>
      <div className="reading" dangerouslySetInnerHTML={{ __html: data.html }} />
    </article>
  );
}
