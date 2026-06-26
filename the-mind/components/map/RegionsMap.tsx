"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { RegionsList } from "./RegionsList";

/**
 * The way in. SSR (and mobile, and no-JS) get the clean list — accessible,
 * SEO-complete, instant. On wide screens we lazily load the animated MapCanvas
 * (which pulls in Framer Motion), keeping the homepage's initial JS light and FAST.
 */
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => <MapSkeleton />,
});

export function RegionsMap() {
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!isWide) return <RegionsList />;
  return <MapCanvas />;
}

function MapSkeleton() {
  return (
    <div className="aspect-[16/10] w-full animate-pulse rounded-2xl border border-line/10 bg-surface/30" />
  );
}
