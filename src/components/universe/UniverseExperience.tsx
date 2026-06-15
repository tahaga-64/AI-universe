"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";
import { newsItems } from "@/data/news";
import { useSelectedNews } from "@/hooks/useSelectedNews";
import { NewsDetailPanel } from "@/components/news/NewsDetailPanel";
import type { GalaxyScene as GalaxySceneType } from "./GalaxyScene";

const GalaxyScene = dynamic(
  () => import("./GalaxyScene").then((mod) => mod.GalaxyScene),
  {
    ssr: false,
    loading: () => (
      <div className="grid h-full place-items-center text-sm uppercase tracking-[0.3em] text-slate-500">
        Initializing galaxy
      </div>
    ),
  },
) as typeof GalaxySceneType;

export function UniverseExperience() {
  const { selectedNews, selectNews, clearNews } = useSelectedNews();
  const sortedItems = useMemo(
    () => [...newsItems].sort((a, b) => b.impactScore - a.impactScore),
    [],
  );
  return (
    <section
      id="galaxy"
      className="relative h-screen min-h-[760px] overflow-hidden"
    >
      <GalaxyScene items={sortedItems} onSelect={selectNews} />
      <NewsDetailPanel item={selectedNews} onClose={clearNews} />
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 w-[min(92vw,720px)] -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-5 py-3 text-center text-xs text-slate-300 backdrop-blur-xl md:text-sm">
        Hover planets to preview signals. Click any planet to open the
        intelligence panel.
      </div>
    </section>
  );
}
