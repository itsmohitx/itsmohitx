"use client";

import { useState } from "react";
import type { OutlineItem } from "@/lib/mdx";

type Depth = "glance" | "map" | "deep";

/**
 * Glance / Map / Deep. Plain mono text tabs, no pill container. Deep is the
 * default so a first-time visitor simply reads; the control is for skimming or
 * orienting first.
 */
export function ResolutionTabs({
  glance,
  summary,
  outline,
  children,
}: {
  glance: string;
  summary: string;
  outline: OutlineItem[];
  children: React.ReactNode;
}) {
  const [depth, setDepth] = useState<Depth>("deep");

  const jumpTo = (id: string) => {
    setDepth("deep");
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    }, 30);
  };

  const options: { key: Depth; label: string }[] = [
    { key: "glance", label: "Glance" },
    { key: "map", label: "Map" },
    { key: "deep", label: "Deep" },
  ];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Reading depth"
        className="mb-10 flex items-baseline gap-4 border-b border-line/[.16] pb-3 font-mono text-[0.76rem] uppercase tracking-[0.14em]"
      >
        <span className="text-ink3">Read at:</span>
        {options.map((o) => {
          const active = depth === o.key;
          return (
            <button
              key={o.key}
              role="tab"
              aria-selected={active}
              onClick={() => setDepth(o.key)}
              className={`underline-offset-4 transition-colors ${
                active ? "text-accent underline" : "text-ink2 hover:text-accent"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>

      {depth === "glance" && (
        <div className="animate-fade-up">
          <p className="label mb-4">The glance</p>
          <p className="max-w-measure font-serif text-2xl leading-snug text-ink text-balance sm:text-3xl">
            {glance}
          </p>
          <button
            onClick={() => setDepth("deep")}
            className="mt-8 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-accent underline underline-offset-4"
          >
            Read the full essay →
          </button>
        </div>
      )}

      {depth === "map" && (
        <div className="animate-fade-up">
          <p className="label mb-4">The map</p>
          {summary && (
            <p className="mb-8 max-w-measure font-serif text-xl leading-relaxed text-ink">
              {summary}
            </p>
          )}
          {outline.length > 0 ? (
            <ol className="max-w-measure">
              {outline.map((item, i) => (
                <li
                  key={item.id}
                  className="border-t border-line/[.16] first:border-t-0"
                  style={{ paddingLeft: item.depth === 3 ? "1.75rem" : "0" }}
                >
                  <button
                    onClick={() => jumpTo(item.id)}
                    className="group flex w-full items-baseline gap-4 py-2.5 text-left"
                  >
                    <span className="font-mono text-[0.72rem] text-ink3">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`font-serif text-ink transition-colors group-hover:text-accent ${
                        item.depth === 3 ? "text-base" : "text-lg"
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                </li>
              ))}
            </ol>
          ) : (
            <p className="text-ink2">This one reads as a single movement. Open the deep read.</p>
          )}
          <button
            onClick={() => setDepth("deep")}
            className="mt-8 font-mono text-[0.78rem] uppercase tracking-[0.12em] text-accent underline underline-offset-4"
          >
            Read the full essay →
          </button>
        </div>
      )}

      {depth === "deep" && <div className="animate-fade-up">{children}</div>}
    </div>
  );
}
