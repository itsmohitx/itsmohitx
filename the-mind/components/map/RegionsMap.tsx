"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { RegionsList } from "./RegionsList";

/**
 * The way in. SSR (and mobile, and no-JS) get the clean list: accessible,
 * SEO-complete, instant. On wide screens we lazily load the animated MapCanvas
 * (which pulls in Framer Motion) only when it scrolls near the viewport, so the
 * homepage's initial payload stays light and FAST.
 */
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export function RegionsMap() {
  const [isWide, setIsWide] = useState(false);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setInView(true);
          io.disconnect();
        }
      },
      { rootMargin: "250px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{isWide && inView ? <MapCanvas /> : <RegionsList />}</div>;
}

function MapSkeleton() {
  return (
    <div className="aspect-[16/10] w-full animate-pulse rounded-2xl border border-line/10 bg-surface/30" />
  );
}
