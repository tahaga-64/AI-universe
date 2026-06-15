import Link from "next/link";
import { UniverseExperience } from "@/components/universe/UniverseExperience";
import { galaxies } from "@/data/galaxies";
import type { GalaxyDefinition } from "@/types/news";

interface GalaxyPageProps {
  galaxy: GalaxyDefinition;
}

export function GalaxyPage({ galaxy }: GalaxyPageProps) {
  return (
    <main>
      <section className="relative overflow-hidden px-6 py-16 md:py-20">
        <div className="galaxy-grid absolute inset-0 opacity-30" />
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-3xl">
            <Link
              href="/"
              className="text-sm text-slate-400 transition hover:text-white"
            >
              ← すべての銀河へ戻る
            </Link>
            <p className="mt-8 text-xs uppercase tracking-[0.45em] text-sky-100/70">
              {galaxy.subtitle}
            </p>
            <h1 className="mt-4 text-5xl font-semibold tracking-[-0.07em] text-white md:text-7xl">
              {galaxy.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              {galaxy.description}
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-sm md:min-w-72">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-slate-500">星の数</p>
              <p className="mt-2 text-3xl font-semibold">
                {galaxy.items.length}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-slate-500">操作</p>
              <p className="mt-2 text-sm text-white">ドラッグで回転</p>
            </div>
          </div>
        </div>
      </section>
      <UniverseExperience galaxy={galaxy} />
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-4 md:grid-cols-3">
          {galaxies.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition hover:-translate-y-1 hover:bg-white/[0.07]"
            >
              <p className="text-xs uppercase tracking-[0.32em] text-slate-500">
                {item.subtitle}
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-[-0.04em]">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
