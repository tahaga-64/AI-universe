import { Hero } from '@/components/ui/Hero';
import { UniverseExperience } from '@/components/universe/UniverseExperience';
import { newsItems } from '@/data/news';
import { formatDate } from '@/lib/utils';

export default function Home() {
  return (
    <main>
      <Hero />
      <UniverseExperience />
      <section id="signals" className="relative mx-auto max-w-7xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-sky-200/70">Signal index</p>
            <h2 className="mt-3 text-4xl font-semibold tracking-[-0.05em] md:text-6xl">Twenty curated AI orbits</h2>
          </div>
          <p className="max-w-lg text-slate-400">
            Mock editorial data from leading AI organizations, structured for extensible feeds and future API integration.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {newsItems.map((item) => (
            <article key={item.id} className="rounded-[1.75rem] border border-white/10 bg-white/[0.035] p-5 transition hover:-translate-y-1 hover:bg-white/[0.06]">
              <div className="mb-5 flex items-center justify-between text-xs uppercase tracking-[0.22em] text-slate-500">
                <span>{item.source}</span>
                <span>{item.impactScore}</span>
              </div>
              <h3 className="text-xl font-medium tracking-[-0.03em] text-white">{item.title}</h3>
              <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{item.summary}</p>
              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span>{item.category}</span>
                <span>{formatDate(item.publishedAt)}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
