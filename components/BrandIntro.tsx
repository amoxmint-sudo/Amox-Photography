'use client';

import React from 'react';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { PORTFOLIO_CATEGORIES, PortfolioItem } from '@/lib/portfolio-data';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';
import { computeStaggerDelay } from '@/lib/scroll-animation';

interface BrandIntroProps {
  lang: Language;
  onNavigateCategory: (categoryId: string) => void;
  selectedCovers?: Partial<Record<string, PortfolioItem>>;
}

export function BrandIntro({
  lang,
  onNavigateCategory,
  selectedCovers,
}: BrandIntroProps) {
  const t = translations[lang];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Kratko predstavljanje brenda i fotografskog pristupa */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <EditorialReveal variant="heading">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
              {t.intro.kicker}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight leading-snug">
              {t.intro.title}
            </h2>
          </EditorialReveal>
          <EditorialReveal
            variant="text"
            delay={0.1}
            className="mt-6 space-y-4 text-sm sm:text-base text-[#6E645A] leading-relaxed"
          >
            <p>{t.intro.p1}</p>
            <p>{t.intro.p2}</p>
          </EditorialReveal>
        </div>

        {/* 2. Vizuelni pregled kategorija usluga */}
        <div id="services" className="mb-12 scroll-mt-24">
          <EditorialReveal
            variant="heading"
            className="flex items-end justify-between mb-8 pb-4 border-b border-[#EAE3D9]"
          >
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#8C5835] block mb-1">
                {t.categoriesSection.kicker}
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif-editorial text-[#211B17]">
                {t.categoriesSection.title}
              </h2>
            </div>
          </EditorialReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PORTFOLIO_CATEGORIES.map((cat, idx) => {
              const selectedItem = selectedCovers?.[cat.slug];
              const resolvedCoverSrc = selectedItem?.imagePath || cat.coverImage;
              return (
                <EditorialReveal
                  key={cat.id}
                  variant="card"
                  delay={computeStaggerDelay(idx, 0.07, 6)}
                  className="h-full"
                >
                  <div
                    onClick={() => onNavigateCategory(cat.slug)}
                    role="button"
                    tabIndex={0}
                    data-service-card={cat.id}
                    data-selected-photo={resolvedCoverSrc}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onNavigateCategory(cat.slug);
                      }
                    }}
                    className="group h-full flex flex-col justify-between bg-white border border-[#E0D7CB] overflow-hidden cursor-pointer hover:border-[#8C5835] hover:-translate-y-1.5 hover:shadow-md active:translate-y-0 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
                  >
                    <div>
                      <div className="relative aspect-[2/3] lg:aspect-[4/5] w-full overflow-hidden bg-[#EAE3D9]">
                        <Image
                          src={resolvedCoverSrc}
                          alt={
                            selectedItem
                              ? selectedItem.alt[lang]
                              : `${cat.title[lang]} — AMOX Photography & Film`
                          }
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className={`object-cover ${
                            cat.id === 'ngo' ? 'object-center' : 'object-top'
                          } group-hover:scale-[1.05] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]`}
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-300" />
                        <div className="absolute top-3 left-3 bg-[#1B1613]/85 backdrop-blur-sm px-2.5 py-1 text-[10px] text-amber-200 font-mono tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-0.5">
                          0{idx + 1}
                        </div>
                      </div>

                      <div className="p-6 pb-4">
                        <h3 className="text-xl font-serif-editorial text-[#211B17] group-hover:text-[#8C5835] transition-colors duration-200 tracking-wide">
                          {cat.title[lang]}
                        </h3>
                        <p className="mt-2 text-xs text-[#6E645A] leading-relaxed">
                          {cat.shortDesc[lang]}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-4 border-t border-[#F3EFE9] flex items-center justify-between text-xs text-[#8C5835] font-medium uppercase tracking-wider">
                      <span className="editorial-link pb-0.5">
                        {cat.ctaLabel[lang]}
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 transition-transform duration-200" />
                    </div>
                  </div>
                </EditorialReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
