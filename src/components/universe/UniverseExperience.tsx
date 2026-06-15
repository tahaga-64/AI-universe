"use client";

import dynamic from "next/dynamic";
import { useMemo, type CSSProperties } from "react";
import { useSelectedNews } from "@/hooks/useSelectedNews";
import { NewsDetailPanel } from "@/components/news/NewsDetailPanel";
import type { GalaxyDefinition } from "@/types/news";
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

interface UniverseExperienceProps {
  galaxy: GalaxyDefinition;
}

export function UniverseExperience({ galaxy }: UniverseExperienceProps) {
  const { selectedNews, selectNews, clearNews } = useSelectedNews();
  const sortedItems = useMemo(
    () => [...galaxy.items].sort((a, b) => b.impactScore - a.impactScore),
    [galaxy.items],
  );
  const topSignal = sortedItems[0];
  const averageImpact = useMemo(
    () =>
      Math.round(
        sortedItems.reduce((total, item) => total + item.impactScore, 0) /
          sortedItems.length,
      ),
    [sortedItems],
  );
  const sources = useMemo(
    () => Array.from(new Set(sortedItems.map((item) => item.source))),
    [sortedItems],
  );

  return (
    <section
      id="galaxy"
      className="relative h-screen min-h-[760px] overflow-hidden border-y border-white/10 bg-slate-950"
      style={{ "--galaxy-accent": galaxy.accent } as CSSProperties}
    >
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_15%,transparent_0%,rgba(3,4,10,0.2)_35%,rgba(3,4,10,0.78)_100%)]" />
      <GalaxyScene items={sortedItems} onSelect={selectNews} />
      <div className="pointer-events-none absolute left-4 top-4 z-20 grid gap-3 md:left-8 md:top-8 md:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-xl">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-500">
            最大ニュース
          </p>
          <p className="mt-2 max-w-[14rem] text-sm font-medium text-white">
            {topSignal.title}
          </p>
        </div>
        <div className="hidden rounded-3xl border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-xl sm:block">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-500">
            平均インパクト
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-[-0.04em] text-white">
            {averageImpact}
          </p>
        </div>
        <div className="hidden rounded-3xl border border-white/10 bg-black/25 px-5 py-4 backdrop-blur-xl lg:block">
          <p className="text-[0.65rem] uppercase tracking-[0.28em] text-slate-500">
            情報源
          </p>
          <p className="mt-2 text-sm text-slate-200">{sources.join(" · ")}</p>
        </div>
      </div>
      <NewsDetailPanel item={selectedNews} onClose={clearNews} />
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-20 w-[min(92vw,720px)] -translate-x-1/2 rounded-full border border-white/10 bg-black/25 px-5 py-3 text-center text-xs text-slate-300 backdrop-blur-xl md:text-sm">
        ドラッグで銀河を回転。スクロールでズーム。星をクリックすると詳細パネルが開きます。
      </div>
    </section>
  );
}
