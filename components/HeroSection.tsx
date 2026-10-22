'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import { SITE_CONFIG, Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { ArrowRight, ChevronDown } from 'lucide-react';

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

  return (
    <section
      id="home"
      aria-label="Hero sekcija"
      className="relative min-h-[92vh] flex flex-col justify-between overflow-hidden bg-[#1B1613] text-[#FAF8F5]"
    >
      {/* Background static editorial image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={SITE_CONFIG.images.hero}
          alt="AMOX Photography editorial hero kadar"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-[0.72] contrast-[1.05]"
          referrerPolicy="no-referrer"
        />
        {/* Measured editorial scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1B1613] via-black/40 to-black/25" />
      </div>

      {/* Top spacer */}
      <div className="relative z-10 pt-10" />

      {/* Center text and dual equal CTA buttons */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          {/* Brand Subtitle Tag */}
          <div className="inline-block">
            <span className="text-[11px] sm:text-xs font-mono uppercase tracking-[0.35em] text-amber-200/90 py-1 px-3 border border-amber-200/30 backdrop-blur-sm">
              {SITE_CONFIG.name} · {SITE_CONFIG.subtitle}
            </span>
          </div>

          {/* Slogan */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-serif-editorial text-white tracking-tight leading-[1.08] text-balance">
            „{SITE_CONFIG.slogan[lang]}“
          </h1>

          {/* Subtext */}
          <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-stone-300 font-light leading-relaxed">
            {lang === 'sr'
              ? 'Spajamo iskrene emocije, intiman pristup i promišljeno komponovane kadrove u fotografiji i filmu.'
              : 'Blending genuine moments, an intimate approach, and composed visual frames in photography and film.'}
          </p>

          {/* Two equal minimalist buttons */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button
              type="button"
              onClick={onNavigatePortfolio}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-[#211B17] bg-[#FAF8F5] hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[44px]"
            >
              <span>{t.hero.explorePortfolio}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              type="button"
              onClick={onNavigateContact}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold uppercase tracking-[0.2em] text-white bg-transparent hover:bg-white/10 border border-white/60 hover:border-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 min-h-[44px]"
            >
              <span>{t.hero.requestQuote}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* Bottom bar with placeholder badge and scroll indicator */}
      <div className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pb-6 flex items-center justify-between text-xs text-stone-400">
        <div className="text-[11px] font-mono tracking-wider text-stone-400/80 hidden sm:block">
          <span>{t.hero.placeholderNote}</span>
        </div>

        <button
          type="button"
          onClick={onScrollDown}
          aria-label="Skroluj na sledeću sekciju"
          className="flex items-center gap-2 text-stone-300 hover:text-white transition-colors ml-auto sm:ml-0"
        >
          <span className="text-[11px] uppercase tracking-widest font-mono">
            {lang === 'sr' ? 'Istraži priču' : 'Explore Story'}
          </span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </button>
      </div>
    </section>
  );
}
