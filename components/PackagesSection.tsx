'use client';

import React from 'react';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { PACKAGES_DATA } from '@/lib/portfolio-data';
import { ArrowRight, Check } from 'lucide-react';

interface PackagesSectionProps {
  lang: Language;
  onSelectPackage: (serviceTitle: string) => void;
}

export function PackagesSection({ lang, onSelectPackage }: PackagesSectionProps) {
  const t = translations[lang];

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
            {lang === 'sr' ? 'Transparentna saradnja' : 'Investment & Scope'}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
            {t.pricingPage.title}
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
            {t.pricingPage.subtitle}
          </p>
        </div>

        {/* 5 Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES_DATA.map((pkg, index) => {
            return (
              <div
                key={pkg.id}
                className="flex flex-col justify-between bg-white border border-[#E0D7CB] p-6 sm:p-8 hover:border-[#8C5835]/60 transition-all hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-4 mb-5 border-b border-[#F3EFE9]">
                    <span className="text-xs font-mono text-[#8C5835] tracking-widest uppercase">
                      0{index + 1}
                    </span>
                    <span className="text-xs tracking-wider uppercase font-semibold text-[#8C5835]">
                      {t.pricingPage.priceUponRequest}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-serif-editorial text-[#211B17] tracking-wide mb-3">
                    {pkg.title[lang]}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#6E645A] leading-relaxed mb-6">
                    {pkg.description[lang]}
                  </p>

                  <div className="space-y-2.5 mb-6">
                    <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-stone-400 block">
                      {lang === 'sr' ? 'Šta obuhvata saradnja' : 'Included Elements'}
                    </span>
                    <ul className="space-y-2 text-xs text-[#524941]">
                      {pkg.features[lang].map((feat, fIndex) => (
                        <li key={fIndex} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#8C5835] shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#F3EFE9]">
                  <p className="text-[11px] text-[#8C8176] italic mb-4">
                    {pkg.note[lang]}
                  </p>

                  <button
                    type="button"
                    onClick={() => onSelectPackage(pkg.title[lang])}
                    className="w-full flex items-center justify-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.18em] font-medium text-[#211B17] bg-[#FAF8F5] hover:bg-[#211B17] hover:text-white border border-[#E0D7CB] hover:border-[#211B17] transition-all focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
                  >
                    <span>{t.pricingPage.requestQuote}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Disclaimer / Note banner */}
        <div className="mt-12 max-w-3xl mx-auto p-5 bg-white border border-[#E0D7CB] text-center">
          <p className="text-xs text-[#6E645A] leading-relaxed">
            {t.pricingPage.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}
