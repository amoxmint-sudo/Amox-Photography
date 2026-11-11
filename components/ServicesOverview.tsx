'use client';

import React from 'react';
import Image from 'next/image';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import type { PagePhotoSelection } from '@/lib/photo-selection';
import {
  ArrowRight,
  CheckCircle2,
  Video,
  Camera,
  Sparkles,
  Building2,
  Users,
} from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

interface ServicesOverviewProps {
  lang: Language;
  onSelectServiceForInquiry: (serviceName: string) => void;
  onOpenPhoto: (imagePath: string, title: string, category: string) => void;
  selectedPhotos?: PagePhotoSelection['servicesBySlug'];
}

export function ServicesOverview({
  lang,
  onSelectServiceForInquiry,
  onOpenPhoto,
  selectedPhotos,
}: ServicesOverviewProps) {
  const t = translations[lang];
  const weddingPrimary = selectedPhotos?.weddings.primary;
  const weddingMainSrc = weddingPrimary?.imagePath || '/photos/svadbe/AMX03291-Edit.jpg';
  const weddingMainTitle =
    weddingPrimary?.title[lang] ||
    (lang === 'sr' ? 'Venčanja — Kadar 01' : 'Weddings — Frame 01');

  const eventPrimary = selectedPhotos?.events.primary;
  const eventMainSrc = eventPrimary?.imagePath || '/photos/18-rodjendani/AMX09846.jpg';
  const eventMainTitle =
    eventPrimary?.title[lang] ||
    (lang === 'sr' ? '18. rođendani — Kadar 01' : '18th Birthdays — Frame 01');

  const portraitPrimary = selectedPhotos?.portraits.primary;
  const portraitMainSrc = portraitPrimary?.imagePath || '/photos/portreti/AMX00288-Edit.jpg';
  const portraitMainTitle =
    portraitPrimary?.title[lang] ||
    (lang === 'sr' ? 'Portreti — Kadar 01' : 'Portraits — Frame 01');

  const ngoPrimary = selectedPhotos?.ngo.primary;
  const ngoMainSrc = ngoPrimary?.imagePath || SITE_CONFIG.images.ngo;
  const ngoMainTitle =
    ngoPrimary?.title[lang] ||
    (lang === 'sr'
      ? 'Dokumentovanje organizacija — Primer kadra'
      : 'Institutional Documentation — Frame example');

  return (
    <div className="space-y-0">
      {/* 1. Venčanja / Weddings */}
      <section
        id="weddings"
        className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <EditorialReveal variant="heading">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835] mb-4">
                  <Camera className="w-4 h-4" />
                  <span>01 · {lang === 'sr' ? 'Fotografija i Film' : 'Photography & Film'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                  {lang === 'sr' ? 'Venčanja' : 'Weddings'}
                </h2>
              </EditorialReveal>

              <EditorialReveal variant="text" delay={0.08}>
                <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                  {t.servicesOverview.weddingsIntro}
                </p>
              </EditorialReveal>

              <EditorialReveal variant="fade-up" delay={0.16} className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Venčanja' : 'Weddings'
                    )
                  }
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
                >
                  <span>
                    {lang === 'sr' ? 'Zatraži ponudu za venčanje' : 'Request Wedding Quote'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>
              </EditorialReveal>
            </div>

            <EditorialReveal
              variant="image-reveal"
              delay={0.12}
              parallaxOffset={-8}
              className="lg:col-span-6"
            >
              <div
                data-service-photo="weddings-primary"
                data-selected-photo={weddingMainSrc}
                onClick={() =>
                  onOpenPhoto(
                    weddingMainSrc,
                    weddingMainTitle,
                    'svadbe'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenPhoto(
                      weddingMainSrc,
                      weddingMainTitle,
                      'svadbe'
                    );
                  }
                }}
                className="group relative aspect-[2/3] lg:aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
              >
                <Image
                  src={weddingMainSrc}
                  alt={weddingPrimary?.alt[lang] || (lang === 'sr' ? 'Kadar sa venčanja' : 'Wedding frame')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-[1.055] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/85 backdrop-blur-sm px-3 py-1.5 text-[10px] text-stone-200 font-mono tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-1">
                  {lang === 'sr' ? 'Klikni za galeriju' : 'Click for gallery'}
                </div>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      {/* 2. Rođendani i događaji / Birthdays & Events */}
      <section
        id="events"
        className="py-20 lg:py-28 bg-[#FFFFFF] border-t border-[#EAE3D9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <EditorialReveal variant="heading">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835] mb-4">
                  <Users className="w-4 h-4" />
                  <span>02 · {lang === 'sr' ? 'Proslave i Jubileji' : 'Celebrations & Gatherings'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                  {lang === 'sr' ? 'Rođendani i događaji' : 'Birthdays & Events'}
                </h2>
              </EditorialReveal>

              <EditorialReveal variant="text" delay={0.08}>
                <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                  {t.servicesOverview.eventsIntro}
                </p>
              </EditorialReveal>

              <EditorialReveal variant="fade-up" delay={0.16} className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Rođendani i događaji' : 'Birthdays & Events'
                    )
                  }
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
                >
                  <span>
                    {lang === 'sr' ? 'Zatraži ponudu za proslavu' : 'Request Event Quote'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>
              </EditorialReveal>
            </div>

            <EditorialReveal
              variant="image-reveal"
              delay={0.1}
              parallaxOffset={-8}
              className="lg:col-span-6"
            >
              <div
                data-service-photo="events-primary"
                data-selected-photo={eventMainSrc}
                onClick={() =>
                  onOpenPhoto(
                    eventMainSrc,
                    eventMainTitle,
                    '18-rodjendani'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenPhoto(
                      eventMainSrc,
                      eventMainTitle,
                      '18-rodjendani'
                    );
                  }
                }}
                className="group relative aspect-[2/3] lg:aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
              >
                <Image
                  src={eventMainSrc}
                  alt={eventPrimary?.alt[lang] || (lang === 'sr' ? 'Kadar sa proslave rođendana' : 'Birthday celebration frame')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-[1.055] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/85 backdrop-blur-sm px-3 py-1.5 text-[10px] text-stone-200 font-mono tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-1">
                  {lang === 'sr' ? 'Klikni za galeriju' : 'Click for gallery'}
                </div>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      {/* 3. Portreti / Portraits */}
      <section
        id="portraits"
        className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <EditorialReveal variant="heading">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835] mb-4">
                  <Sparkles className="w-4 h-4" />
                  <span>03 · {lang === 'sr' ? 'Editorial i Lični' : 'Editorial & Personal'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                  {lang === 'sr' ? 'Portreti' : 'Portraits'}
                </h2>
              </EditorialReveal>

              <EditorialReveal variant="text" delay={0.08}>
                <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                  {t.servicesOverview.portraitsIntro}
                </p>
              </EditorialReveal>

              <EditorialReveal variant="fade-up" delay={0.16} className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Portreti' : 'Portraits'
                    )
                  }
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
                >
                  <span>
                    {lang === 'sr' ? 'Zakaži portretnu sesiju' : 'Book Portrait Session'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>
              </EditorialReveal>
            </div>

            <EditorialReveal
              variant="image-reveal"
              delay={0.12}
              parallaxOffset={-10}
              className="lg:col-span-6"
            >
              <div
                data-service-photo="portraits-primary"
                data-selected-photo={portraitMainSrc}
                onClick={() =>
                  onOpenPhoto(
                    portraitMainSrc,
                    portraitMainTitle,
                    'portreti'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenPhoto(
                      portraitMainSrc,
                      portraitMainTitle,
                      'portreti'
                    );
                  }
                }}
                className="group relative aspect-[2/3] lg:aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
              >
                <Image
                  src={portraitMainSrc}
                  alt={portraitPrimary?.alt[lang] || (lang === 'sr' ? 'Primer portreta' : 'Portrait example')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-top group-hover:scale-[1.055] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/85 backdrop-blur-sm px-3 py-1.5 text-[10px] text-stone-200 font-mono tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-1">
                  {lang === 'sr' ? 'Klikni za uvećanje' : 'Click to enlarge'}
                </div>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>

      {/* 4. Video produkcija i montaža / Video Production & Editing */}
      <section
        id="video"
        className="py-20 lg:py-28 bg-[#1B1613] text-[#F5F0E8] border-t border-[#2C241E]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-10 lg:space-y-12">
            <EditorialReveal variant="heading">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#D4A373] font-medium mb-4">
                <Video className="w-4 h-4" />
                <span>
                  04 · {lang === 'sr' ? 'Pokretne Slike i Postprodukcija' : 'Moving Images & Post-Production'}
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#F5F0E8] tracking-tight">
                {lang === 'sr' ? 'Video produkcija i montaža' : 'Video Production & Editing'}
              </h2>
            </EditorialReveal>

            <div className="flex flex-col lg:grid lg:grid-cols-[1fr_auto_1fr] lg:gap-12 xl:gap-16 lg:items-stretch">
              {/* Levi blok: Video produkcija i snimanje */}
              <EditorialReveal
                variant="text"
                delay={0.08}
                className="scroll-mt-28 flex flex-col justify-between space-y-6"
              >
                <div id="video-production" className="scroll-mt-28 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif-editorial font-medium text-[#FAF8F5] tracking-tight">
                    {lang === 'sr'
                      ? 'Video produkcija i snimanje'
                      : 'Video Production & Filming'}
                  </h3>

                  <p className="text-sm sm:text-base text-[#D9D0C5] leading-relaxed">
                    {t.servicesOverview.videoProductionIntro}
                  </p>

                  <ul className="space-y-1.5 pt-1 text-xs text-[#E8E0D5] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                      <span>
                        {lang === 'sr'
                          ? 'Snimanje venčanja, privatnih proslava i jubileja'
                          : 'Filming weddings, private celebrations, and milestones'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                      <span>
                        {lang === 'sr'
                          ? 'Snimanje poslovnih događaja, konferencija i projekata organizacija'
                          : 'Filming corporate events, conferences, and organizational projects'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForInquiry(
                        lang === 'sr' ? 'Video produkcija i snimanje' : 'Video Production & Filming'
                      )
                    }
                    className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#1B1613] bg-[#F5F0E8] hover:bg-white hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373]"
                  >
                    <span>
                      {lang === 'sr' ? 'Zatraži ponudu za snimanje' : 'Request Filming Quote'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </button>
                </div>
              </EditorialReveal>

              {/* Razdelna linija: horizontalna na mobilnom, vertikalna na desktopu */}
              <div
                aria-hidden="true"
                data-video-divider="horizontal"
                className="lg:hidden my-8 h-px w-full bg-[#332A24]"
              />
              <div
                aria-hidden="true"
                data-video-divider="vertical"
                className="hidden lg:block w-px bg-[#332A24] my-2 self-stretch"
              />

              {/* Desni blok: Video montaža i postprodukcija */}
              <EditorialReveal
                variant="text"
                delay={0.16}
                className="scroll-mt-28 flex flex-col justify-between space-y-6"
              >
                <div id="video-editing" className="scroll-mt-28 space-y-3">
                  <h3 className="text-xl sm:text-2xl font-serif-editorial font-medium text-[#FAF8F5] tracking-tight">
                    {lang === 'sr'
                      ? 'Video montaža i postprodukcija'
                      : 'Video Editing & Post-Production'}
                  </h3>

                  <p className="text-sm sm:text-base text-[#D9D0C5] leading-relaxed">
                    {t.servicesOverview.videoEditingIntro}
                  </p>

                  <ul className="space-y-1.5 pt-1 text-xs text-[#E8E0D5] font-medium">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                      <span>
                        {lang === 'sr'
                          ? 'Selekcija i povezivanje kadrova, obrada boja i usklađivanje zvuka'
                          : 'Frame selection and assembly, color grading, and sound leveling'}
                      </span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#D4A373] shrink-0" />
                      <span>
                        {lang === 'sr'
                          ? 'Muzika, titlovi i prilagođavanje za društvene mreže prema dogovoru'
                          : 'Music, subtitles, and social media adaptation by arrangement'}
                      </span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() =>
                      onSelectServiceForInquiry(
                        lang === 'sr'
                          ? 'Video montaža i postprodukcija'
                          : 'Video Editing & Post-Production'
                      )
                    }
                    className="group inline-flex items-center gap-2.5 px-5 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-[#F5F0E8] bg-transparent border border-[#F5F0E8]/35 hover:border-[#D4A373] hover:text-[#D4A373] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4A373]"
                  >
                    <span>
                      {lang === 'sr' ? 'Zatraži ponudu za montažu' : 'Request Editing Quote'}
                    </span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                  </button>
                </div>
              </EditorialReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Nevladine organizacije i institucije / NGO & Organizations */}
      <section
        id="ngo"
        className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <EditorialReveal variant="heading">
                <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835] mb-4">
                  <Building2 className="w-4 h-4" />
                  <span>05 · {lang === 'sr' ? 'Organizacije i Institucije' : 'Organizations & Institutions'}</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                  {lang === 'sr' ? 'Nevladine organizacije i institucije' : 'NGO & Organizations'}
                </h2>
              </EditorialReveal>

              <EditorialReveal variant="text" delay={0.08}>
                <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                  {t.servicesOverview.ngoIntro}
                </p>
              </EditorialReveal>

              <EditorialReveal variant="text" delay={0.14} className="space-y-2.5 pt-1">
                <span className="text-[11px] font-mono tracking-wider uppercase text-stone-400 block">
                  {lang === 'sr' ? 'Vrste usluga dokumentovanja:' : 'Types of Documentation Services:'}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#524941]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                    <span>{lang === 'sr' ? 'Događaji i konferencije' : 'Events & conferences'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                    <span>{lang === 'sr' ? 'Radionice i edukacije' : 'Workshops & seminars'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                    <span>{lang === 'sr' ? 'Terenske aktivnosti' : 'Field missions & outreach'}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                    <span>{lang === 'sr' ? 'Projektni rezultati' : 'Project deliverables'}</span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                    <span>{lang === 'sr' ? 'Aktivnosti zajednice i inicijative' : 'Community initiatives & dialogues'}</span>
                  </li>
                </ul>
              </EditorialReveal>

              <EditorialReveal variant="fade-up" delay={0.22} className="pt-3">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Nevladine organizacije i institucije' : 'NGO & Organizations'
                    )
                  }
                  className="group inline-flex items-center gap-2.5 px-6 py-3.5 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
                >
                  <span>
                    {lang === 'sr' ? 'Pošaljite institucionalni upit' : 'Submit Institutional Inquiry'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1.5" />
                </button>
              </EditorialReveal>
            </div>

            <EditorialReveal
              variant="image-reveal"
              delay={0.12}
              parallaxOffset={-8}
              className="lg:col-span-6"
            >
              <div
                data-service-photo="ngo-primary"
                data-selected-photo={ngoMainSrc}
                onClick={() =>
                  onOpenPhoto(
                    ngoMainSrc,
                    ngoMainTitle,
                    'ngo-organizacije'
                  )
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenPhoto(
                      ngoMainSrc,
                      ngoMainTitle,
                      'ngo-organizacije'
                    );
                  }
                }}
                className="group relative aspect-[2/3] lg:aspect-[4/5] w-full max-w-md mx-auto overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
              >
                <Image
                  src={ngoMainSrc}
                  alt={ngoPrimary?.alt[lang] || (lang === 'sr' ? 'Primer dokumentovanja radionice' : 'Workshop documentation example')}
                  fill
                  sizes="(max-width: 1024px) 100vw, 480px"
                  className="object-cover object-center group-hover:scale-[1.055] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/5 transition-colors duration-300" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/85 backdrop-blur-sm px-3 py-1.5 text-[10px] text-stone-200 font-mono tracking-widest uppercase transition-transform duration-300 group-hover:translate-x-1">
                  {lang === 'sr' ? 'Klikni za uvećanje' : 'Click to enlarge'}
                </div>
              </div>
            </EditorialReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
