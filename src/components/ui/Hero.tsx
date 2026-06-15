'use client';

import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from './Button';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  useEffect(() => {
    if (!titleRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo('.hero-kicker', { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
      gsap.fromTo(titleRef.current, { y: 60, opacity: 0, filter: 'blur(18px)' }, { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.35, delay: 0.15, ease: 'expo.out' });
    });
    return () => ctx.revert();
  }, []);
  return <section className="relative grid min-h-screen place-items-center overflow-hidden px-6 py-24"><div className="galaxy-grid absolute inset-0 opacity-60" /><div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(56,189,248,.18),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(168,85,247,.12),transparent_30%)]" /><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="relative z-10 mx-auto max-w-6xl text-center"><p className="hero-kicker mb-6 text-xs font-medium uppercase tracking-[0.45em] text-sky-100/70">Frontier intelligence mapped in orbit</p><h1 ref={titleRef} className="text-balance text-6xl font-semibold tracking-[-0.08em] text-white md:text-8xl lg:text-[9.5rem]">AI News Universe</h1><p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">Explore the latest artificial intelligence signals as living planetary systems—ranked by impact, grouped by source, and designed for focused discovery.</p><div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"><Button onClick={() => document.getElementById('galaxy')?.scrollIntoView({ behavior: 'smooth' })}>Enter the galaxy</Button><a href="#signals" className="rounded-full px-5 py-3 text-sm text-slate-300 transition hover:text-white">View signal index</a></div></motion.div><div className="absolute bottom-8 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden bg-white/10"><motion.div animate={{ y: ['-100%', '120%'] }} transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }} className="h-8 w-px bg-white" /></div></section>;
}
