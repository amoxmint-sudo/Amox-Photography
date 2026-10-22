'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import {
  PORTFOLIO_ITEMS,
  PortfolioItem,
  VIDEO_ITEMS,
} from '@/lib/portfolio-data';
import { Video, Maximize2, ExternalLink } from 'lucide-react';

interface PortfolioSectionProps {
  lang: Language;
  onOpenLightbox: (items: PortfolioItem[], index: number) => void;
}

type FilterCategory = 'all' | 'weddings' | 'events' | 'portraits' | 'video' | 'ngo';

export function PortfolioSection({ lang, onOpenLightbox }: PortfolioSectionProps) {
  const t = translations[lang];
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');

  const filteredItems = PORTFOLIO_ITEMS.filter((item) => {
    if (activeFilter === 'all') return true;
    return item.category === activeFilter;
  });

  const filterButtons: { id: FilterCategory; label: string }[] = [
    { id: 'all', label: t.portfolioPage.all },
    { id: 'weddings', label: t.portfolioPage.weddings },
    { id: 'events', label: t.portfolioPage.events },
    { id: 'portraits', label: t.portfolioPage.portraits },
    { id: 'video', label: t.portfolioPage.video },
    { id: 'ngo', label: t.portfolioPage.ngo },
  ];

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
            {lang === 'sr' ? 'Izabrani kadrovi' : 'Visual Stories'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
            {t.portfolioPage.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
            {t.portfolioPage.subtitle}
          </p>
        </div>

        {/* Interactive Filter Tabs (Functional Buttons) */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
          {filterButtons.map((btn) => {
            const isActive = activeFilter === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                onClick={() => setActiveFilter(btn.id)}
                className={`px-4 py-2 text-xs uppercase tracking-[0.16em] font-medium transition-all ${
                  isActive
                    ? 'bg-[#211B17] text-white'
                    : 'bg-white text-[#6E645A] hover:text-[#211B17] border border-[#E0D7CB]'
                } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]`}
              >
                {btn.label}
              </button>
            );
          })}
        </div>

        {/* Gallery Grid */}
        {activeFilter !== 'video' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredItems.map((item, index) => {
              const aspectClass =
                item.aspectRatio === 'portrait'
                  ? 'aspect-[3/4]'
                  : item.aspectRatio === 'square'
                  ? 'aspect-square'
                  : 'aspect-[4/3]';

              return (
                <div
                  key={item.id}
                  onClick={() => onOpenLightbox(filteredItems, index)}
                  className="group relative bg-[#EAE3D9] overflow-hidden cursor-pointer border border-[#E0D7CB] shadow-sm"
                  tabIndex={0}
                  role="button"
                  aria-label={`${item.title[lang]} — otvori fotografiju u punoj veličini`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      onOpenLightbox(filteredItems, index);
                    }
                  }}
                >
                  <div className={`relative w-full ${aspectClass}`}>
                    <Image
                      src={item.imagePath}
                      alt={item.alt[lang]}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Editorial hover scrim */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                          {item.category}
                        </span>
                        <Maximize2 className="w-4 h-4 text-stone-300" />
                      </div>

                      <h3 className="font-serif-editorial text-lg sm:text-xl font-medium tracking-wide mt-1">
                        {item.title[lang]}
                      </h3>

                      <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                        {item.subtitle[lang]}
                      </p>
                    </div>
                  </div>

                  {/* Clean unboxed caption below photo */}
                  <div className="p-4 bg-white flex items-center justify-between text-xs text-[#6E645A] border-t border-[#F3EFE9]">
                    <span className="font-serif-editorial text-sm sm:text-base text-[#211B17] font-medium tracking-wide">
                      {item.title[lang]}
                    </span>
                    <span className="text-[10px] uppercase font-mono text-[#8C5835]">
                      {item.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Video category view */
          <div className="max-w-4xl mx-auto space-y-8">
            {VIDEO_ITEMS.map((video) => (
              <div
                key={video.id}
                className="bg-white border border-[#E0D7CB] overflow-hidden shadow-sm"
              >
                <div className="relative aspect-video w-full bg-stone-900">
                  <Image
                    src={video.thumbnailPath}
                    alt={video.title[lang]}
                    fill
                    sizes="(max-width: 1024px) 100vw, 900px"
                    className="object-cover opacity-80"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <a
                      href={video.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-white transition-transform hover:scale-110"
                      aria-label="Pogledaj na YouTube"
                    >
                      <Video className="w-7 h-7 ml-0.5" />
                    </a>
                  </div>
                </div>

                <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase font-mono text-[#8C5835] tracking-widest block mb-1">
                      {lang === 'sr' ? 'Video Showreel' : 'Cinematic Video'}
                    </span>
                    <h3 className="font-serif-editorial text-xl sm:text-2xl text-[#211B17]">
                      {video.title[lang]}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#6E645A] mt-2 max-w-xl">
                      {video.description[lang]}
                    </p>
                  </div>

                  <a
                    href={video.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 text-xs uppercase tracking-wider font-medium text-white bg-[#211B17] hover:bg-[#8C5835] transition-colors"
                  >
                    <span>{lang === 'sr' ? 'Otvori YouTube' : 'Open YouTube'}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {filteredItems.length === 0 && activeFilter !== 'video' && (
          <p className="text-center text-sm text-[#8C8176] py-12">
            {t.portfolioPage.noItems}
          </p>
        )}
      </div>
    </section>
  );
}
