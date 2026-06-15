import Link from "next/link";
import { Hero } from "@/components/ui/Hero";
import { galaxies } from "@/data/galaxies";

export default function Home() {
  return (
    <main>
      <Hero />
      <section id="galaxies" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-sky-200/70">
              Three universes
            </p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
              3つの銀河を探索する
            </h2>
          </div>
          <p className="max-w-lg text-slate-400">
            AIツール更新、AI業界ニュース、Qiita・Zenn・Xなどの実践知を想定したAI活用法を、それぞれ独立した3D銀河として表示します。
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {galaxies.map((galaxy) => (
            <Link
              key={galaxy.id}
              href={galaxy.href}
              className="group relative min-h-80 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 transition duration-500 hover:-translate-y-2 hover:bg-white/[0.07]"
            >
              <div
                className="absolute -right-16 -top-16 h-44 w-44 rounded-full blur-3xl transition group-hover:scale-125"
                style={{ background: galaxy.accent, opacity: 0.2 }}
              />
              <p className="relative text-xs uppercase tracking-[0.32em] text-slate-500">
                {galaxy.subtitle}
              </p>
              <h3 className="relative mt-5 text-3xl font-semibold tracking-[-0.05em] text-white">
                {galaxy.title}
              </h3>
              <p className="relative mt-5 text-sm leading-7 text-slate-400">
                {galaxy.description}
              </p>
              <div className="relative mt-10 flex items-center justify-between border-t border-white/10 pt-5 text-sm text-slate-300">
                <span>{galaxy.items.length} signals</span>
                <span className="transition group-hover:translate-x-1">
                  探索する →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
