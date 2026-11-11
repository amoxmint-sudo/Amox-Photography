'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Language } from '@/lib/site-config';
import {
  MY_STORY_CONTENT,
  SelectedExperienceItem,
} from '@/lib/my-story-data';
import { EditorialReveal } from './EditorialReveal';
import { computeStaggerDelay } from '@/lib/scroll-animation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';

interface MyStoryPageContentProps {
  lang: Language;
  onNavigateHomeSection?: (sectionId: string) => void;
}

export function MyStoryPageContent({
  lang,
  onNavigateHomeSection,
}: MyStoryPageContentProps) {
  const c = MY_STORY_CONTENT[lang];
  const homeHref = lang === 'en' ? '/?lang=en' : '/';
  const contactHref = lang === 'en' ? '/?lang=en#contact' : '/#contact';
  const portfolioHref = lang === 'en' ? '/?lang=en#portfolio' : '/#portfolio';

  const handleContactClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHomeSection) {
      e.preventDefault();
      onNavigateHomeSection('contact');
    }
  };

  const handlePortfolioClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onNavigateHomeSection) {
      e.preventDefault();
      onNavigateHomeSection('portfolio');
    }
  };

  const leadExperience = c.selectedExperience.items.find(
    (item) => item.layoutVariant === 'lead'
  );
  const majorExperience = c.selectedExperience.items.find(
    (item) => item.layoutVariant === 'major'
  );
  const pairExperiences = c.selectedExperience.items.filter(
    (item) => item.layoutVariant === 'pair'
  );
  const indexExperiences = c.selectedExperience.items.filter(
    (item) => item.layoutVariant === 'index'
  );

  const renderExperienceVisual = (item: SelectedExperienceItem) => {
    if (!item.imageSrc) return null;
    return (
      <EditorialReveal variant="image-reveal" delay={0.1} className="mt-6">
        <div className="group overflow-hidden bg-[#1B1613] border border-[#2B211A] p-2">
          <div className="overflow-hidden">
            <Image
              src={item.imageSrc}
              alt={item.imageAlt || item.title}
              width={item.imageWidth || 1200}
              height={item.imageHeight || 896}
              sizes="(max-width: 1024px) 100vw, 560px"
              className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </EditorialReveal>
    );
  };

  return (
    <div className="bg-[#1B1613] text-[#F5F0E8] selection:bg-[#8C5835] selection:text-[#F5F0E8]">
      {/* =====================================================================
          01 — EDITORIAL HERO
      ====================================================================== */}
      <section
        id="editorial-hero"
        className="relative pt-8 pb-20 lg:pt-14 lg:pb-28 border-b border-[#2B211A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Magazine Masthead Strip */}
          <EditorialReveal
            variant="fade-in"
            className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 lg:mb-16 border-b border-[#2B211A]"
          >
            <div className="flex items-center gap-6">
              <Link
                href={homeHref}
                className="group inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-[#C8B9A7] hover:text-[#F5F0E8] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
              >
                <ArrowLeft className="w-3.5 h-3.5 text-[#8C5835] transition-transform duration-200 group-hover:-translate-x-1" />
                <span>{c.breadcrumbHome}</span>
              </Link>
              <span className="hidden sm:inline-block w-[1px] h-3.5 bg-[#2B211A]" />
              <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#F5F0E8]">
                {c.hero.publicationHeader}
              </span>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.24em] text-[#8C5835]">
              <span>{c.hero.issueLabel}</span>
            </div>
          </EditorialReveal>

          {/* Asymmetric Editorial Hero Spread */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Side: Editorial Headline, Subtitle, Short Intro & Discreet Metadata */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-10 lg:pt-2">
              <EditorialReveal variant="heading" className="space-y-6">
                <div className="inline-flex items-center gap-3">
                  <span
                    className="w-8 h-[1px] bg-[#8C5835]"
                    aria-hidden="true"
                  />
                  <span className="text-[11px] font-mono uppercase tracking-[0.26em] text-[#8C5835]">
                    {c.hero.issueLabel}
                  </span>
                </div>

                <h1 className="text-4xl sm:text-6xl lg:text-[64px] font-serif-editorial text-[#F5F0E8] tracking-tight leading-[1.06]">
                  <span className="block">{c.hero.titleLines[0]}</span>
                  <span className="block italic font-normal text-[#C8B9A7] mt-1">
                    {c.hero.titleLines[1]}
                  </span>
                </h1>

                <p className="text-lg sm:text-xl lg:text-2xl font-serif-editorial text-[#F5F0E8] tracking-wide pt-1">
                  {c.hero.subtitle}
                </p>
              </EditorialReveal>

              <EditorialReveal
                variant="text"
                delay={0.1}
                className="pt-8 border-t border-[#2B211A] max-w-2xl"
              >
                <p className="text-base sm:text-lg text-[#C8B9A7] leading-[1.8] font-normal">
                  {c.hero.intro}
                </p>
              </EditorialReveal>

              {/* Discreet Editorial Metadata Strip */}
              <EditorialReveal
                variant="section"
                delay={0.18}
                className="pt-8 border-t border-[#2B211A] grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8"
              >
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8C5835] block mb-1.5">
                    {c.hero.metaExperienceLabel}
                  </span>
                  <p className="text-base sm:text-lg font-serif-editorial text-[#F5F0E8] tracking-wide">
                    {c.hero.metaExperienceValue}
                  </p>
                </div>

                <div className="sm:border-l sm:border-[#2B211A] sm:pl-8">
                  <span className="text-[10px] font-mono uppercase tracking-[0.24em] text-[#8C5835] block mb-1.5">
                    {c.hero.metaDisciplineLabel}
                  </span>
                  <p className="text-base sm:text-lg font-serif-editorial text-[#F5F0E8] tracking-wide">
                    {c.hero.metaDisciplineValue}
                  </p>
                </div>
              </EditorialReveal>
            </div>

            {/* Right Side: Single Large Vertical Photograph */}
            <EditorialReveal
              variant="image-reveal"
              delay={0.14}
              parallaxOffset={-10}
              className="lg:col-span-5"
            >
              <figure className="group relative mx-auto max-w-md lg:max-w-none bg-[#241C17] border border-[#2B211A] p-3 sm:p-4">
                <div className="overflow-hidden bg-[#1B1613]">
                  <Image
                    src={c.hero.photoSrc}
                    alt={c.hero.photoAlt}
                    width={c.hero.photoWidth}
                    height={c.hero.photoHeight}
                    priority
                    sizes="(max-width: 1024px) 100vw, 480px"
                    className="w-full h-auto object-contain block group-hover:scale-[1.02] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <figcaption className="pt-3 mt-3 border-t border-[#2B211A] flex items-center justify-between gap-3 text-[11px] font-mono text-[#C8B9A7]">
                  <span className="truncate">{c.hero.photoCaption}</span>
                  <span className="text-[#8C5835] shrink-0 tracking-[0.18em]">
                    {c.hero.photoCode}
                  </span>
                </figcaption>
              </figure>
            </EditorialReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          02 — IZABRANO ISKUSTVO (ASYMMETRIC MAGAZINE SPREAD)
      ====================================================================== */}
      <section
        id="izabrano-iskustvo"
        className="py-20 lg:py-32 border-b border-[#2B211A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Editorial Section Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end pb-12 mb-14 border-b border-[#2B211A]">
            <EditorialReveal variant="heading" className="lg:col-span-8">
              <span className="text-xs font-mono uppercase tracking-[0.26em] text-[#8C5835] block mb-3">
                {c.selectedExperience.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl lg:text-[54px] font-serif-editorial text-[#F5F0E8] tracking-tight leading-[1.08]">
                {c.selectedExperience.title}
              </h2>
            </EditorialReveal>
            <EditorialReveal
              variant="text"
              delay={0.08}
              className="lg:col-span-4 lg:text-right"
            >
              <p className="text-sm text-[#C8B9A7] leading-relaxed">
                {c.selectedExperience.editorialNote}
              </p>
            </EditorialReveal>
          </div>

          {/* Row 1: Dominant Feature (OBRUČ) + Secondary Feature (MONACO YACHT SHOW — 2026) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {leadExperience && (
              <EditorialReveal
                variant="card"
                className="lg:col-span-7 flex"
              >
                <article className="w-full p-8 sm:p-12 lg:p-14 bg-[#241C17] border border-[#2B211A] hover:border-[#8C5835]/70 transition-colors duration-300 flex flex-col justify-between relative">
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-10 border-b border-[#2B211A]">
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-mono text-[#8C5835] tracking-[0.25em]">
                          {leadExperience.num}
                        </span>
                        <span className="text-[#4A3B31]">/</span>
                        <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#F5F0E8]">
                          {leadExperience.yearOrFormat}
                        </span>
                      </div>
                      <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#8C5835]">
                        {leadExperience.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-4xl sm:text-6xl lg:text-7xl font-serif-editorial text-[#F5F0E8] tracking-tight leading-none mb-6">
                      {leadExperience.title}
                    </h3>

                    <p className="text-base sm:text-xl text-[#C8B9A7] leading-relaxed max-w-xl">
                      {leadExperience.description}
                    </p>

                    {renderExperienceVisual(leadExperience)}
                  </div>

                  <div className="pt-10 mt-10 border-t border-[#2B211A] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.22em] text-[#8C5835]">
                    <span>AMOX VIDEO & POST-PRODUCTION</span>
                    <span>ARCHIVE / {leadExperience.num}</span>
                  </div>
                </article>
              </EditorialReveal>
            )}

            {majorExperience && (
              <EditorialReveal
                variant="card"
                delay={0.08}
                className="lg:col-span-5 flex"
              >
                <article className="w-full p-8 sm:p-10 lg:p-12 bg-[#2B211A]/45 border border-[#2B211A] hover:border-[#8C5835]/70 transition-colors duration-300 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-4 pb-6 mb-8 border-b border-[#2B211A]">
                      <span className="text-xs font-mono text-[#8C5835] tracking-[0.25em]">
                        {majorExperience.num}
                      </span>
                      <span className="text-xs font-mono uppercase tracking-[0.22em] text-[#C8B9A7]">
                        {majorExperience.categoryLabel}
                      </span>
                    </div>

                    <span className="inline-block text-xs font-mono uppercase tracking-[0.24em] text-[#8C5835] mb-3">
                      {majorExperience.yearOrFormat}
                    </span>

                    <h3 className="text-3xl sm:text-4xl lg:text-[40px] font-serif-editorial text-[#F5F0E8] tracking-tight leading-[1.12] mb-5">
                      {majorExperience.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#C8B9A7] leading-relaxed">
                      {majorExperience.description}
                    </p>

                    {renderExperienceVisual(majorExperience)}
                  </div>

                  <div className="pt-8 mt-8 border-t border-[#2B211A] flex items-center justify-between text-[11px] font-mono uppercase tracking-[0.2em] text-[#C8B9A7]">
                    <span>MONACO</span>
                    <span className="text-[#8C5835]">
                      {majorExperience.yearOrFormat}
                    </span>
                  </div>
                </article>
              </EditorialReveal>
            )}
          </div>

          {/* Row 2: Asymmetric Editorial Duo (ROCK GARDEN — 2026 & OVERLOAD — 2022 / 2024) */}
          {pairExperiences.length > 0 && (
            <div className="mt-8 lg:mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
              {pairExperiences.map((item, idx) => {
                const colSpanClass =
                  idx === 0 ? 'lg:col-span-5' : 'lg:col-span-7';
                return (
                  <EditorialReveal
                    key={item.id}
                    variant="card"
                    delay={computeStaggerDelay(idx, 0.08, 4)}
                    className={`${colSpanClass} flex`}
                  >
                    <article className="w-full p-8 sm:p-10 bg-[#241C17] border border-[#2B211A] hover:border-[#8C5835]/70 transition-colors duration-300 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b border-[#2B211A]">
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-mono text-[#8C5835] tracking-[0.24em]">
                              {item.num}
                            </span>
                            <span className="text-[#4A3B31]">/</span>
                            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#C8B9A7]">
                              {item.categoryLabel}
                            </span>
                          </div>
                          <span className="text-xs font-mono text-[#8C5835] tracking-[0.2em]">
                            {item.yearOrFormat}
                          </span>
                        </div>

                        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-serif-editorial text-[#F5F0E8] tracking-tight mb-4">
                          {item.title}
                        </h3>

                        <p className="text-sm sm:text-base text-[#C8B9A7] leading-relaxed">
                          {item.description}
                        </p>

                        {renderExperienceVisual(item)}
                      </div>
                    </article>
                  </EditorialReveal>
                );
              })}
            </div>
          )}

          {/* Row 3: Curatorial Exhibition Index Strip (URBAN NO CONCEPT & SURDULICA KROZ OBJEKTIV) */}
          {indexExperiences.length > 0 && (
            <EditorialReveal
              variant="section"
              delay={0.12}
              className="mt-8 lg:mt-10 border border-[#2B211A] bg-[#1B1613] divide-y lg:divide-y-0 lg:divide-x divide-[#2B211A] grid grid-cols-1 lg:grid-cols-2"
            >
              {indexExperiences.map((item, idx) => (
                <EditorialReveal
                  key={item.id}
                  variant="card"
                  delay={computeStaggerDelay(idx, 0.08, 4)}
                  as="article"
                  className="p-7 sm:p-9 lg:p-10 flex flex-col justify-between hover:bg-[#241C17]/60 transition-colors duration-300"
                >
                  <div>
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <span className="text-xs font-mono text-[#8C5835] tracking-[0.24em]">
                        {item.num} / {item.yearOrFormat}
                      </span>
                      <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-[#C8B9A7]">
                        {item.categoryLabel}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-serif-editorial text-[#F5F0E8] tracking-tight mb-2.5">
                      {item.title}
                    </h3>

                    <p className="text-sm text-[#C8B9A7] leading-relaxed">
                      {item.description}
                    </p>

                    {renderExperienceVisual(item)}
                  </div>
                </EditorialReveal>
              ))}
            </EditorialReveal>
          )}
        </div>
      </section>

      {/* =====================================================================
          03 — MOJ KREATIVNI PROCES (4 EDITORIAL COLUMNS)
      ====================================================================== */}
      <section
        id="kreativni-proces"
        className="py-20 lg:py-32 border-b border-[#2B211A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end pb-14 mb-14 border-b border-[#2B211A]">
            <EditorialReveal variant="heading" className="lg:col-span-6">
              <span className="text-xs font-mono uppercase tracking-[0.26em] text-[#8C5835] block mb-3">
                {c.creativeProcess.kicker}
              </span>
              <h2 className="text-3xl sm:text-5xl font-serif-editorial text-[#F5F0E8] tracking-tight leading-[1.1]">
                {c.creativeProcess.title}
              </h2>
            </EditorialReveal>

            <EditorialReveal
              variant="text"
              delay={0.08}
              className="lg:col-span-6"
            >
              <p className="text-base sm:text-lg text-[#C8B9A7] leading-relaxed">
                {c.creativeProcess.intro}
              </p>
            </EditorialReveal>
          </div>

          {/* 4 Editorial Columns separated by thin architectural hairlines */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-[#2B211A]">
            {c.creativeProcess.columns.map((col, idx) => (
              <EditorialReveal
                key={col.num}
                variant="card"
                delay={computeStaggerDelay(idx, 0.07, 4)}
                className="border-r border-b border-[#2B211A] p-7 sm:p-8 lg:p-9 bg-[#1B1613] hover:bg-[#241C17]/50 transition-colors duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#2B211A]">
                    <span className="text-xs font-mono text-[#8C5835] tracking-[0.25em]">
                      {col.num}
                    </span>
                    <span
                      className="w-6 h-[1px] bg-[#8C5835]"
                      aria-hidden="true"
                    />
                  </div>

                  <h3 className="text-2xl sm:text-[26px] font-serif-editorial text-[#F5F0E8] tracking-tight mb-3">
                    {col.areaTitle}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#C8B9A7] leading-relaxed mb-8">
                    {col.summary}
                  </p>
                </div>

                <ul className="pt-5 border-t border-[#2B211A] space-y-3">
                  {col.roles.map((roleTitle) => (
                    <li
                      key={roleTitle}
                      className="flex items-start gap-3 text-sm text-[#F5F0E8]"
                    >
                      <span
                        className="mt-2 w-2 h-[1px] bg-[#8C5835] shrink-0"
                        aria-hidden="true"
                      />
                      <span className="leading-snug">{roleTitle}</span>
                    </li>
                  ))}
                </ul>
              </EditorialReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          04 — PROGRAMI I ALATI (TWO UNEQUAL COLUMNS / TYPOGRAPHIC LIST)
      ====================================================================== */}
      <section
        id="programi-i-alati"
        className="py-20 lg:py-32 border-b border-[#2B211A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Narrower Left Column: Section Title & Note */}
            <div className="lg:col-span-4 space-y-6">
              <EditorialReveal variant="heading">
                <span className="text-xs font-mono uppercase tracking-[0.26em] text-[#8C5835] block mb-3">
                  {c.tools.kicker}
                </span>
                <h2 className="text-3xl sm:text-5xl font-serif-editorial text-[#F5F0E8] tracking-tight leading-[1.1]">
                  {c.tools.title}
                </h2>
              </EditorialReveal>
              <EditorialReveal variant="text" delay={0.08}>
                <p className="text-sm sm:text-base text-[#C8B9A7] leading-relaxed">
                  {c.tools.editorialNote}
                </p>
              </EditorialReveal>
            </div>

            {/* Wider Right Column: Clean Typographic Specification List */}
            <div className="lg:col-span-8">
              <div className="border-t border-[#2B211A] divide-y divide-[#2B211A]">
                {c.tools.items.map((tool, idx) => (
                  <EditorialReveal
                    key={tool.num}
                    variant="text"
                    delay={computeStaggerDelay(idx, 0.05, 6)}
                  >
                    <div className="py-6 sm:py-7 flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 sm:gap-8 group hover:bg-[#241C17]/40 sm:px-4 -mx-4 transition-colors duration-200">
                      <div className="flex items-baseline gap-4 min-w-[230px]">
                        <span className="text-xs font-mono text-[#8C5835] tracking-[0.22em] shrink-0">
                          {tool.num}
                        </span>
                        <h3 className="text-xl sm:text-2xl font-serif-editorial text-[#F5F0E8] tracking-tight group-hover:text-[#C8B9A7] transition-colors duration-200">
                          {tool.name}
                        </h3>
                      </div>

                      <p className="text-sm sm:text-base text-[#C8B9A7] flex-1 sm:pl-2">
                        <span className="text-[#8C5835] mr-2">—</span>
                        {tool.purpose}
                      </p>
                    </div>
                  </EditorialReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          05 — FILOZOFIJA RADA (WARM LIGHT CREAM EDITORIAL SPREAD PAUSE)
      ====================================================================== */}
      <section
        id="filozofija-rada"
        className="py-24 lg:py-36 bg-[#EFE7DA] text-[#1B1613] border-b border-[#D8CBB8]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <EditorialReveal variant="heading" className="mb-12 lg:mb-16">
            <span className="text-xs font-mono uppercase tracking-[0.26em] text-[#8C5835] block mb-3">
              {c.philosophy.kicker}
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif-editorial text-[#1B1613] tracking-tight">
              {c.philosophy.title}
            </h2>
          </EditorialReveal>

          {/* Large Editorial Pull-Quote */}
          <EditorialReveal
            variant="section"
            delay={0.08}
            className="py-12 sm:py-16 border-y border-[#1B1613]/15 my-10"
          >
            <blockquote className="max-w-5xl font-serif-editorial italic text-3xl sm:text-5xl lg:text-[54px] text-[#1B1613] leading-[1.16] tracking-tight">
              {c.philosophy.pullQuote}
            </blockquote>
          </EditorialReveal>

          {/* Two Editorial Columns for Philosophy Text */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pt-4 items-start">
            <EditorialReveal variant="text" delay={0.14} className="md:col-span-6">
              <p className="text-base sm:text-xl text-[#1B1613] leading-[1.75] font-normal">
                {c.philosophy.p1}
              </p>
            </EditorialReveal>
            <EditorialReveal
              variant="text"
              delay={0.22}
              className="md:col-span-6 md:border-l md:border-[#1B1613]/15 md:pl-10"
            >
              <p className="text-base sm:text-lg text-[#3D312A] leading-[1.8]">
                {c.philosophy.p2}
              </p>
            </EditorialReveal>
          </div>
        </div>
      </section>

      {/* =====================================================================
          06 — ZAVRŠNA SEKCIJA (EDITORIAL CLOSING & DISCREET TEXTUAL CTA)
      ====================================================================== */}
      <section id="zavrsna-sekcija" className="py-24 lg:py-36">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl space-y-8">
            <EditorialReveal variant="heading" className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.26em] text-[#8C5835] block">
                {c.closing.kicker}
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-serif-editorial text-[#F5F0E8] tracking-tight leading-[1.08]">
                {c.closing.title}
              </h2>
            </EditorialReveal>

            <EditorialReveal variant="text" delay={0.1}>
              <p className="text-base sm:text-lg lg:text-xl text-[#C8B9A7] leading-relaxed max-w-2xl">
                {c.closing.text}
              </p>
            </EditorialReveal>

            {/* Discreet Textual Editorial Links */}
            <EditorialReveal
              variant="fade-up"
              delay={0.18}
              className="pt-6 flex flex-wrap items-center gap-8 sm:gap-12"
            >
              <Link
                href={contactHref}
                onClick={handleContactClick}
                className="group inline-flex items-center gap-3 pb-2 text-sm sm:text-base font-serif-editorial tracking-wide text-[#F5F0E8] border-b border-[#8C5835] hover:text-[#C8B9A7] hover:border-[#F5F0E8] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
              >
                <span>{c.closing.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 text-[#8C5835] transition-transform duration-200 group-hover:translate-x-1" />
              </Link>

              <Link
                href={portfolioHref}
                onClick={handlePortfolioClick}
                className="group inline-flex items-center gap-2.5 pb-2 text-sm sm:text-base font-serif-editorial tracking-wide text-[#C8B9A7] border-b border-[#2B211A] hover:text-[#F5F0E8] hover:border-[#8C5835] transition-colors duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
              >
                <span>{c.closing.portfolioCtaLabel}</span>
                <ArrowUpRight className="w-4 h-4 text-[#8C5835] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </EditorialReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
