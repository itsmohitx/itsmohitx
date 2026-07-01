"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { regions, connections, type RegionSlug } from "@/content/regions";

/**
 * The living map of the regions. Restrained motion only, honours
 * prefers-reduced-motion (renders static). Every node is a real link,
 * keyboard focusable with a visible focus state; the glance tooltip has a
 * solid backing and shows on hover AND focus.
 */
export default function MapCanvas() {
  const [hovered, setHovered] = useState<RegionSlug | null>(null);
  const reduce = useReducedMotion();

  return (
    <div
      className="relative aspect-[16/10] w-full overflow-hidden border-y border-line/[.16]"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Connection edges, behind the nodes. */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        {connections.map((c, i) => {
          const a = regions.find((r) => r.slug === c.a)!;
          const b = regions.find((r) => r.slug === c.b)!;
          const active = hovered === c.a || hovered === c.b;
          const dim = hovered !== null && !active;
          return (
            <line
              key={i}
              x1={a.pos.x}
              y1={a.pos.y}
              x2={b.pos.x}
              y2={b.pos.y}
              stroke="rgb(var(--accent))"
              strokeWidth={active ? 1.4 : 1}
              strokeOpacity={active ? 0.7 : dim ? 0.08 : 0.22}
              vectorEffect="non-scaling-stroke"
              style={{ transition: "stroke-opacity 0.3s ease, stroke-width 0.3s ease" }}
            />
          );
        })}
      </svg>

      {regions.map((r, i) => {
        const active = hovered === r.slug;
        const dim = hovered !== null && !active;
        const dur = 13 + (i % 4) * 2.5;
        const drift = reduce
          ? {}
          : { x: [0, i % 2 === 0 ? 6 : -5, 0], y: [0, i % 3 === 0 ? -6 : 5, 0] };

        return (
          <motion.div
            key={r.slug}
            className="absolute"
            style={{ left: `${r.pos.x}%`, top: `${r.pos.y}%`, translateX: "-50%", translateY: "-50%" }}
            animate={drift}
            transition={{ duration: dur, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}
          >
            <Link
              href={`/regions/${r.slug}`}
              aria-label={`${r.title}. ${r.glance}`}
              onMouseEnter={() => setHovered(r.slug)}
              onFocus={() => setHovered(r.slug)}
              onBlur={() => setHovered(null)}
              className="group relative flex flex-col items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              style={{ opacity: dim ? 0.55 : 1, transition: "opacity 0.3s ease" }}
            >
              <motion.span
                aria-hidden
                className="relative block bg-accent"
                style={{
                  width: `${r.size * 0.85}rem`,
                  height: `${r.size * 0.85}rem`,
                  boxShadow: active
                    ? "0 0 0 2px rgb(var(--bg)), 0 0 0 4px rgb(var(--accent))"
                    : "0 0 24px -4px rgb(var(--accent) / 0.7)",
                }}
                animate={reduce ? {} : { scale: [1, 1.07, 1] }}
                transition={{ duration: 6 + (i % 3), repeat: Infinity, ease: "easeInOut" }}
              />
              <span className="pointer-events-none mt-3 whitespace-nowrap text-center font-mono text-[0.72rem] uppercase tracking-[0.1em] text-ink">
                {r.short}
              </span>
            </Link>

            {/* Glance tooltip: solid backing, full-contrast text. */}
            {active && (
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-8 w-60 -translate-x-1/2 border border-line/40 bg-bg p-3 text-center">
                <p className="font-serif text-sm leading-snug text-ink">{r.glance}</p>
              </div>
            )}
          </motion.div>
        );
      })}

      <p className="pointer-events-none absolute bottom-3 left-0 right-0 text-center font-mono text-[0.65rem] uppercase tracking-[0.16em] text-ink3">
        Five regions · click to enter
      </p>
    </div>
  );
}
