'use client';

import React from 'react';
import Script from 'next/script';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { EditorialReveal } from './EditorialReveal';

const SENJA_WIDGET_ID = '576a0b86-5b15-4f41-a7f8-61b98f8eaacb';

interface TestimonialsSectionProps {
  lang: Language;
}

export function TestimonialsSection({ lang }: TestimonialsSectionProps) {
  const t = translations[lang];

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <Script
        id={`senja-platform-${SENJA_WIDGET_ID}`}
        src={`https://widget.senja.io/widget/${SENJA_WIDGET_ID}/platform.js`}
        strategy="afterInteractive"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <EditorialReveal variant="heading">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
              {lang === 'sr' ? 'Iskustva i poverenje' : 'Client Words'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
              {t.testimonialsPage.title}
            </h2>
          </EditorialReveal>
          <EditorialReveal variant="text" delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed max-w-xl mx-auto">
              {t.testimonialsPage.subtitle}
            </p>
          </EditorialReveal>
        </div>

        <EditorialReveal variant="section" delay={0.14} className="w-full">
          <div
            className="senja-embed block w-full"
            data-id={SENJA_WIDGET_ID}
            data-mode="shadow"
            data-lazyload="false"
          />
        </EditorialReveal>
      </div>
    </section>
  );
}
