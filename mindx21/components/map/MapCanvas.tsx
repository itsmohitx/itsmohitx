"use client";

import Link from "next/link";
import { useState } from "react";
import { regions, connections, type RegionSlug } from "@/content/regions";

export interface Landmark {
  slug: string;
  title: string;
  region: RegionSlug;
  pos: { x: number; y: number };
}

/**
 * The regions map, rebuilt for instant first paint: no animation library, no
 * lazy mount, server-rendered markup with CSS-only drift (which the global
 * reduced-motion rule disables). Regions are labelled nodes; every essay is a
 * visible landmark linked to its page, tethered to its region by a faint edge.
 * All nodes are real links, keyboard focusable with a visible focus state.
 */
export default function MapCanvas({ landmarks }: { landmarks: Landmark[] }) {
  const [hovered, setHovered] = useState<RegionSlug | null>(null);

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden border-y border-line/[.16]"
      onMouseLeave={() => setHovered(null)}
    >
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {/* Region-to-region edges */}
        {connections.map((c, i) => {
          const a = regions.find((r) => r.slug === c.a)!;
          const b = regions.find((r) => r.slug === c.b)!;
          const active = hovered === c.a || hovered === c.b;
          const dim = hovered !== null && !active;
          return (
            <line
              key={`c-${i}`}
              x1={a.pos.x}
              y1={a.pos.y}
              x2={b.pos.x}
              y2={b.pos.y}
              stroke="rgb(var(--accent))"
              strokeWidth={active ? 1.4 : 1}
              strokeOpacity={active ? 0.7 : dim ? 0.08 : 0.22}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-opacity 0.3s ease" }}
            />
          );
        })}
        {/* Essay tethers to their region */}
        {landmarks.map((l) => {
          const r = regions.find((x) => x.slug === l.region)!;
          const active = hovered === l.region;
          return (
            <line
              key={`t-${l.slug}`}
              x1={r.pos.x}
              y1={r.pos.y}
              x2={l.pos.x}
              y2={l.pos.y}
              stroke="rgb(var(--ink))"
              strokeOpacity={active ? 0.35 : 0.14}
              strokeWidth={1}
              strokeDasharray="2 3"
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-opacity 0.3s ease" }}
            />
          );
        })}
      </svg>

      {/* Region nodes */}
      {regions.map((r, i) => {
        const active = hovered === r.slug;
        const dim = hovered !== null && !active;
        return (
          <div
            key={r.slug}
            className="map-drift absolute"
            style={{
              left: `${r.pos.x}%`,
              top: `${r.pos.y}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 1.3}s`,
              animationDuration: `${11 + (i % 4) * 2}s`,
            }}
          >
            <Link
              href={`/regions/${r.slug}`}
              aria-label={`${r.title}. ${r.glance}`}
              onMouseEnter={() => setHovered(r.slug)}
              onFocus={() => setHovered(r.slug)}
              onBlur={() => setHovered(null)}
              className="group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              style={{ opacity: dim ? 0.55 : 1, transition: "opacity 0.3s ease" }}
            >
              <span
                aria-hidden
                className="block bg-accent"
                style={{
                  width: `${r.size * 1.3}rem`,
                  height: `${r.size * 1.3}rem`,
                  boxShadow: active
                    ? "0 0 0 2px rgb(var(--bg)), 0 0 0 4px rgb(var(--accent))"
                    : "0 0 28px -4px rgb(var(--accent) / 0.8)",
                }}
              />
              <span className="pointer-events-none mt-3 whitespace-nowrap text-center font-mono text-[0.84rem] uppercase tracking-[0.14em] text-ink">
                {r.short}
              </span>
            </Link>

            {active && (
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-7 w-60 -translate-x-1/2 border border-line/40 bg-bg p-3 text-center">
                <p className="font-serif text-sm leading-snug text-ink">{r.glance}</p>
              </div>
            )}
          </div>
        );
      })}

      {/* Essay landmarks */}
      {landmarks.map((l, i) => {
        const dim = hovered !== null && hovered !== l.region;
        return (
          <div
            key={l.slug}
            className="map-drift absolute"
            style={{
              left: `${l.pos.x}%`,
              top: `${l.pos.y}%`,
              transform: "translate(-50%, -50%)",
              animationDelay: `${i * 0.9 + 0.5}s`,
              animationDuration: `${13 + (i % 3) * 2}s`,
            }}
          >
            <Link
              href={`/writing/${l.slug}`}
              onMouseEnter={() => setHovered(l.region)}
              onFocus={() => setHovered(l.region)}
              onBlur={() => setHovered(null)}
              className="group flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              style={{ opacity: dim ? 0.45 : 1, transition: "opacity 0.3s ease" }}
            >
              <span
                aria-hidden
                className="block h-[0.35rem] w-[0.35rem] border border-line/50 bg-bg transition-colors group-hover:bg-accent"
              />
              <span className="pointer-events-none mt-1 max-w-[9.5rem] text-center font-serif text-[0.72rem] italic leading-tight text-ink2 transition-colors group-hover:text-accent">
                {l.title}
              </span>
            </Link>
          </div>
        );
      })}

      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink3">
        Every point is a link
      </p>
    </div>
  );
}
