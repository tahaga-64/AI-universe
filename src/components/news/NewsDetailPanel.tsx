'use client';

import { AnimatePresence, motion } from 'framer-motion';
import type { NewsItem } from '@/types/news';
import { formatDate } from '@/lib/utils';
import { Button } from '@/components/ui/Button';

interface NewsDetailPanelProps { item: NewsItem | null; onClose: () => void; }

export function NewsDetailPanel({ item, onClose }: NewsDetailPanelProps) {
  return (
    <AnimatePresence>
      {item ? (
        <motion.aside initial={{ x: 420, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 420, opacity: 0 }} transition={{ type: 'spring', stiffness: 120, damping: 22 }} className="fixed right-4 top-4 z-30 w-[calc(100%-2rem)] max-w-md overflow-hidden rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-2xl shadow-black/50 backdrop-blur-2xl md:right-8 md:top-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-[0.28em] text-sky-100/70">Signal locked</span>
            <Button onClick={onClose} className="px-4 py-2">Close</Button>
          </div>
          <div className="mb-5 flex items-center gap-3 text-sm text-slate-300"><span className="h-3 w-3 rounded-full" style={{ background: item.color }} />{item.source} · {formatDate(item.publishedAt)}</div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white md:text-4xl">{item.title}</h2>
          <p className="mt-5 text-base leading-7 text-slate-300">{item.summary}</p>
          <div className="mt-8 grid grid-cols-2 gap-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Category</p><p className="mt-2 text-sm text-white">{item.category}</p></div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4"><p className="text-xs uppercase tracking-[0.22em] text-slate-500">Impact</p><p className="mt-2 text-sm text-white">{item.impactScore}/100</p></div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
