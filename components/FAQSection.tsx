'use client';

import React, { useState } from 'react';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { FAQ_DATA } from '@/lib/portfolio-data';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { EditorialReveal } from './EditorialReveal';
import { computeStaggerDelay } from '@/lib/scroll-animation';

interface FAQSectionProps {
  lang: Language;
}

export function FAQSection({ lang }: FAQSectionProps) {
  const t = translations[lang];
  const [openId, setOpenId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <EditorialReveal variant="heading">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
              {lang === 'sr' ? 'Transparentnost i saradnja' : 'Clarity & Details'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
              {t.faqPage.title}
            </h2>
          </EditorialReveal>
          <EditorialReveal variant="text" delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
              {t.faqPage.subtitle}
            </p>
          </EditorialReveal>
        </div>

        <div className="space-y-4">
          {FAQ_DATA.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <EditorialReveal
                key={item.id}
                variant="card"
                delay={computeStaggerDelay(index, 0.06, 8)}
              >
                <div
                  className={`border bg-white transition-all duration-300 ${
                    isOpen
                      ? 'border-[#8C5835]/70 shadow-sm'
                      : 'border-[#E0D7CB] hover:border-[#8C5835]/50'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleItem(item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-btn-${item.id}`}
                    className="group w-full flex items-center justify-between text-left p-5 sm:p-6 text-sm sm:text-base font-medium text-[#211B17] hover:text-[#8C5835] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835] transition-colors duration-200 gap-4"
                  >
                    <span className="flex items-baseline gap-3">
                      <span className="text-xs font-mono text-[#8C5835] tabular-nums shrink-0">
                        {(index + 1).toString().padStart(2, '0')}.
                      </span>
                      <span className="font-serif-editorial text-base sm:text-lg tracking-wide group-hover:translate-x-0.5 transition-transform duration-200">
                        {item.question[lang]}
                      </span>
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 shrink-0 text-[#8C5835] transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-btn-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="p-5 sm:p-6 pt-3 text-xs sm:text-sm text-[#6E645A] leading-relaxed border-t border-[#F3EFE9]">
                          {item.answer[lang]}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </EditorialReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
