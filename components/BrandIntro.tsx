'use client';

import React from 'react';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { PORTFOLIO_CATEGORIES } from '@/lib/portfolio-data';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

interface BrandIntroProps {
  lang: Language;
  onNavigateCategory: (categoryId: string) => void;
  onNavigatePortfolio: () => void;
  onNavigateContact: () => void;
}

export function BrandIntro({
  lang,
  onNavigateCategory,
  onNavigatePortfolio,
  onNavigateContact,
}: BrandIntroProps) {
  const t = translations[lang];

  return (
    <section className="py-20 lg:py-28 bg-[#FAF8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Kratko predstavljanje brenda i fotografskog pristupa */}
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
            {t.intro.kicker}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight leading-snug">
            {t.intro.title}
          </h2>
          <div className="mt-6 space-y-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
            <p>{t.intro.p1}</p>
            <p>{t.intro.p2}</p>
          </div>
        </div>

        {/* 2. Vizuelni pregled kategorija usluga */}
        <div className="mb-12">
          <div className="flex items-end justify-between mb-8 pb-4 border-b border-[#EAE3D9]">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-[#8C5835] block mb-1">
                {t.categoriesSection.kicker}
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#211B17]">
                {t.categoriesSection.title}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {PORTFOLIO_CATEGORIES.map((cat, idx) => (
              <div
                key={cat.id}
                onClick={() => onNavigateCategory(cat.slug)}
                className="group bg-white border border-[#E0D7CB] overflow-hidden cursor-pointer hover:border-[#8C5835] transition-all hover:shadow-sm"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE3D9]">
                  <Image
                    src={cat.coverImage}
                    alt={cat.title[lang]}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute top-3 left-3 bg-[#1B1613]/80 backdrop-blur-sm px-2.5 py-1 text-[10px] text-amber-200 font-mono tracking-widest uppercase">
                    0{idx + 1}
                  </div>
                </div>

                <div className="p-6">
                  <h4 className="text-xl font-serif-editorial text-[#211B17] group-hover:text-[#8C5835] transition-colors tracking-wide">
                    {cat.title[lang]}
                  </h4>
                  <p className="mt-2 text-xs text-[#6E645A] leading-relaxed line-clamp-2">
                    {cat.shortDesc[lang]}
                  </p>
                  <div className="mt-4 pt-4 border-t border-[#F3EFE9] flex items-center justify-between text-xs text-[#8C5835] font-medium uppercase tracking-wider">
                    <span>{t.categoriesSection.exploreCategory}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
