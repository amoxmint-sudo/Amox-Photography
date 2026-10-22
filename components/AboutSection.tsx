'use client';

import React from 'react';
import Image from 'next/image';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { ArrowRight } from 'lucide-react';

interface AboutSectionProps {
  lang: Language;
  onNavigatePortfolio: () => void;
  onNavigateContact: () => void;
}

export function AboutSection({
  lang,
  onNavigatePortfolio,
  onNavigateContact,
}: AboutSectionProps) {
  const t = translations[lang];

  return (
    <section id="about" className="py-20 lg:py-32 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Owner Photograph / Clearly labeled placeholder */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] w-full max-w-md mx-auto overflow-hidden bg-[#EAE3D9] border border-[#E0D7CB] shadow-sm">
              <Image
                src={SITE_CONFIG.images.about}
                alt={t.aboutPage.photoPlaceholder}
                fill
                sizes="(max-width: 768px) 100vw, 500px"
                className="object-cover object-center grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-3 text-center">
                <span className="text-[10px] sm:text-[11px] font-mono text-stone-300 tracking-wider">
                  {t.aboutPage.photoPlaceholder}
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial story & philosophy */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
                {t.aboutPage.kicker}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                {t.aboutPage.title}
              </h2>
            </div>

            {/* Official Owner Statement Quote */}
            <div className="py-4 border-y border-[#EAE3D9]">
              <blockquote className="font-serif-editorial text-xl sm:text-2xl md:text-3xl text-[#211B17] leading-relaxed italic">
                {SITE_CONFIG.aboutText[lang]}
              </blockquote>
            </div>

            {/* Natural Philosophy Paragraphs */}
            <div className="space-y-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
              <p>{t.aboutPage.approachP1}</p>
              <p>{t.aboutPage.approachP2}</p>
            </div>

            {/* Unobtrusive Links */}
            <div className="pt-6 flex flex-wrap items-center gap-6 text-xs uppercase tracking-[0.2em] font-medium">
              <button
                type="button"
                onClick={onNavigatePortfolio}
                className="inline-flex items-center gap-2 text-[#211B17] hover:text-[#8C5835] underline underline-offset-4 decoration-[#8C5835] transition-colors"
              >
                <span>{t.aboutPage.portfolioCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={onNavigateContact}
                className="inline-flex items-center gap-2 text-[#6E645A] hover:text-[#211B17] transition-colors"
              >
                <span>{t.aboutPage.contactCta}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
