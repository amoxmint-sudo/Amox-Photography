'use client';

import React from 'react';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { TESTIMONIALS_DATA } from '@/lib/portfolio-data';
import { MessageSquare, ArrowRight } from 'lucide-react';

interface TestimonialsSectionProps {
  lang: Language;
  onNavigateContact: () => void;
}

export function TestimonialsSection({ lang, onNavigateContact }: TestimonialsSectionProps) {
  const t = translations[lang];
  const hasRealTestimonials = TESTIMONIALS_DATA.length > 0;

  return (
    <section id="testimonials" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
            {lang === 'sr' ? 'Iskustva i poverenje' : 'Client Words'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
            {t.testimonialsPage.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed max-w-xl mx-auto">
            {t.testimonialsPage.subtitle}
          </p>
        </div>

        {hasRealTestimonials ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {TESTIMONIALS_DATA.map((item) => (
              <div
                key={item.id}
                className="bg-white p-8 border border-[#E0D7CB] relative flex flex-col justify-between"
              >
                <p className="text-sm sm:text-base font-serif-editorial italic text-[#211B17] leading-relaxed mb-6">
                  „{item.quote[lang]}“
                </p>
                <div className="pt-4 border-t border-[#F3EFE9] flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#211B17]">{item.clientName}</span>
                  <span className="text-[#8C5835] font-mono">{item.projectType[lang]}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Honest placeholder card explaining real reviews will be published without fabricating fake reviews */
          <div className="max-w-2xl mx-auto bg-white border border-[#E0D7CB] p-8 sm:p-10 text-center">
            <div className="w-12 h-12 mx-auto rounded-full bg-[#FAF8F5] border border-[#E0D7CB] flex items-center justify-center text-[#8C5835] mb-5">
              <MessageSquare className="w-5 h-5 stroke-[1.5]" />
            </div>

            <p className="text-xs sm:text-sm text-[#524941] leading-relaxed max-w-lg mx-auto mb-6">
              {t.testimonialsPage.pendingNote}
            </p>

            <button
              type="button"
              onClick={onNavigateContact}
              className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
            >
              <span>{t.testimonialsPage.ctaButton}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
