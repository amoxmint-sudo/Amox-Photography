'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG, Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

interface HeroSectionProps {
  lang: Language;
  onNavigatePortfolio: () => void;
  onNavigateContact: () => void;
  onScrollDown: () => void;
}

export function HeroSection({
  lang,
  onNavigatePortfolio,
  onNavigateContact,
  onScrollDown,
}: HeroSectionProps) {
  const t = translations[lang];
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="home"
      aria-label={lang === 'sr' ? 'Uvodna sekcija' : 'Hero section'}
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#1B1613] text-[#FAF8F5]"
    >
      {/* 1 & 2. Main background photograph with gradual fade-in and slow cinematic camera zoom */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 overflow-hidden"
      >
        <div className="relative w-full h-full animate-hero-zoom">
          <Image
            src={SITE_CONFIG.images.hero}
            alt={
              lang === 'sr'
                ? 'AMOX Photography & Film — autentična fotografija i video produkcija'
                : 'AMOX Photography & Film — authentic photography and video production'
            }
            fill
            priority
            sizes="100vw"
            className="object-cover object-[58%_42%] sm:object-[55%_45%] lg:object-center brightness-[0.72] contrast-[1.05]"
            referrerPolicy="no-referrer"
          />
        </div>
        {/* Measured editorial scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1613] via-black/40 to-black/25" />
      </motion.div>

      {/* Top spacer */}
      <div className="relative z-10 pt-10" />

      {/* Center text and dual equal CTA buttons with repeatable staggered choreography */}
      <div
        key={lang}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-16"
      >
        <div className="space-y-6">
          {/* Brand Subtitle Kicker */}
          <EditorialReveal variant="fade-up" delay={0.05} className="inline-block">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-amber-200/90 py-1.5 px-3.5 border border-amber-200/30 backdrop-blur-sm inline-block">
              {SITE_CONFIG.name} · {SITE_CONFIG.subtitle}
            </span>
          </EditorialReveal>

          {/* 3. Slogan with upward slide and gradual fade-in */}
          <EditorialReveal variant="heading" delay={0.14}>
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial text-white tracking-tight leading-[1.08] text-balance">
              „{SITE_CONFIG.slogan[lang]}“
            </h1>
          </EditorialReveal>

          {/* 4. Subtitle / lead text appearing after slogan */}
          <EditorialReveal variant="text" delay={0.24}>
            <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed">
              {t.hero.subtitle}
            </p>
          </EditorialReveal>

          {/* 5. Two equal minimalist buttons appearing one after another */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <EditorialReveal variant="fade-up" delay={0.34} className="w-full sm:w-auto">
              <button
                type="button"
                onClick={onNavigatePortfolio}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#211B17] bg-[#FAF8F5] hover:bg-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[44px]"
              >
                <span>{t.hero.explorePortfolio}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </EditorialReveal>

            <EditorialReveal variant="fade-up" delay={0.42} className="w-full sm:w-auto">
              <button
                type="button"
                onClick={onNavigateContact}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-transparent hover:bg-white/15 border border-white/60 hover:border-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[44px]"
              >
                <span>{t.hero.requestQuote}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </EditorialReveal>
          </div>
        </div>
      </div>

      {/* 6. Bottom bar with discreet animated scroll indicator */}
      <EditorialReveal
        variant="fade-in"
        delay={0.5}
        className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-end text-xs text-stone-400"
      >
        <button
          type="button"
          onClick={onScrollDown}
          aria-label={
            lang === 'sr' ? 'Skroluj na sledeću sekciju' : 'Scroll to next section'
          }
          className="group flex items-center gap-3 text-stone-300 hover:text-white transition-colors ml-auto focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-300 p-1"
        >
          <span className="text-[11px] uppercase tracking-[0.22em] font-mono">
            {lang === 'sr' ? 'Istraži priču' : 'Explore Story'}
          </span>
          <span className="relative flex flex-col items-center justify-center w-4 h-7 overflow-hidden">
            <span className="w-[1px] h-full bg-amber-200/75 animate-scroll-line" />
          </span>
          <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
        </button>
      </EditorialReveal>
    </section>
  );
}
