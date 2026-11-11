'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { ArrowRight } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

interface AboutSectionProps {
  lang: Language;
  onNavigatePortfolio: () => void;
}

export function AboutSection({
  lang,
  onNavigatePortfolio,
}: AboutSectionProps) {
  const t = translations[lang];
  const myStoryHref = lang === 'en' ? '/moja-prica?lang=en' : '/moja-prica';

  return (
    <section id="about" className="py-20 lg:py-32 bg-[#1B1613] border-t border-[#332922]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Owner Photograph with editorial reveal & subtle hover depth */}
          <EditorialReveal
            variant="image-reveal"
            parallaxOffset={-10}
            className="lg:col-span-5 relative"
          >
            <div className="group relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-[#241C17] border border-[#332922] shadow-sm hover:shadow-md transition-all duration-500">
              <Image
                src={SITE_CONFIG.images.about}
                alt={
                  lang === 'sr'
                    ? 'AMOX Photography & Film — autorski portret iza objektiva'
                    : 'AMOX Photography & Film — photographer portrait behind the lens'
                }
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center grayscale-[15%] group-hover:grayscale-0 group-hover:scale-[1.035] transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-[#1B1613]/75 backdrop-blur-sm p-3 text-center border-t border-[#332922]/80 transition-opacity duration-300">
                <span className="text-[10px] sm:text-[11px] font-mono text-[#C8B9A7] tracking-wider">
                  {t.aboutPage.photoPlaceholder}
                </span>
              </div>
            </div>
          </EditorialReveal>

          {/* Right Column: Editorial story & philosophy with staggered choreography */}
          <div className="lg:col-span-7 space-y-6">
            <EditorialReveal variant="heading" delay={0.08}>
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
                {t.aboutPage.kicker}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#F5F0E8] tracking-tight">
                {t.aboutPage.title}
              </h2>
            </EditorialReveal>

            {/* Official Owner Statement Quote */}
            <EditorialReveal
              variant="section"
              delay={0.18}
              className="py-5 border-y border-[#332922]"
            >
              <blockquote className="font-serif-editorial text-xl sm:text-2xl md:text-3xl text-[#F5F0E8] leading-relaxed italic">
                {t.aboutPage.quote}
              </blockquote>
            </EditorialReveal>

            {/* Natural Philosophy Paragraphs */}
            <EditorialReveal
              variant="text"
              delay={0.28}
              className="space-y-4 text-sm sm:text-base text-[#C8B9A7] leading-relaxed"
            >
              <p>{t.aboutPage.approachP1}</p>
              <p>{t.aboutPage.approachP2}</p>
            </EditorialReveal>

            {/* Unobtrusive Links with entrance animation & fluid hover */}
            <EditorialReveal
              variant="fade-up"
              delay={0.38}
              className="pt-6 flex flex-wrap items-center gap-x-5 sm:gap-x-8 gap-y-4"
            >
              <Link
                href={myStoryHref}
                className="group inline-flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] font-medium text-[#8C5835] hover:text-[#F5F0E8] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
              >
                <span className="editorial-link pb-1 border-b border-[#8C5835]/50 group-hover:border-[#F5F0E8] transition-colors duration-200">
                  {t.aboutPage.myStoryCta}
                </span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
              </Link>

              <button
                type="button"
                onClick={onNavigatePortfolio}
                className="group inline-flex items-center gap-2 whitespace-nowrap text-[11px] sm:text-xs uppercase tracking-[0.14em] sm:tracking-[0.2em] font-medium text-[#F5F0E8] hover:text-[#8C5835] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
              >
                <span className="editorial-link pb-1 border-b border-[#F5F0E8]/30 group-hover:border-[#8C5835] transition-colors duration-200">
                  {t.aboutPage.portfolioCta}
                </span>
                <ArrowRight className="w-3.5 h-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-1.5" />
              </button>
            </EditorialReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
