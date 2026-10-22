'use client';

import React from 'react';
import Image from 'next/image';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { ArrowRight, CheckCircle2, Video, Camera, Sparkles, Building2, Users } from 'lucide-react';

interface ServicesOverviewProps {
  lang: Language;
  onSelectServiceForInquiry: (serviceName: string) => void;
  onOpenPhoto: (imagePath: string, title: string, category: string) => void;
}

export function ServicesOverview({
  lang,
  onSelectServiceForInquiry,
  onOpenPhoto,
}: ServicesOverviewProps) {
  const t = translations[lang];

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
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835]">
                <Camera className="w-4 h-4" />
                <span>01 · {lang === 'sr' ? 'Fotografija i Film' : 'Photography & Film'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                {lang === 'sr' ? 'Venčanja' : 'Weddings'}
              </h2>

              <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                {lang === 'sr'
                  ? 'Venčanje je priča o iskrenim pogledima, nežnim dodirima i trenucima koji prolaze u treptaju oka. Naš pristup fotografisanju venčanja stavlja naglasak na autentične trenutke, prirodno svetlo i nenametljivu prisutnost, bez fabrikovanih poza.'
                  : 'A wedding is a tapestry of quiet glances, sincere joy, and moments that pass in a breath. Our wedding approach focuses on authentic documentary capture, warm natural light, and discreet presence without forced posing.'}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Venčanja' : 'Weddings'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] transition-colors"
                >
                  <span>
                    {lang === 'sr' ? 'Zatraži ponudu za venčanje' : 'Request Wedding Quote'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                onClick={() =>
                  onOpenPhoto(
                    SITE_CONFIG.images.wedding,
                    lang === 'sr' ? 'Venčanja — Primer kadra' : 'Weddings — Frame example',
                    'weddings'
                  )
                }
                className="group relative aspect-[4/3] w-full overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm"
              >
                <Image
                  src={SITE_CONFIG.images.wedding}
                  alt={lang === 'sr' ? 'Primer kadra sa venčanja' : 'Wedding frame example'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/80 backdrop-blur-sm px-3 py-1 text-[10px] text-stone-200 font-mono tracking-widest uppercase">
                  {lang === 'sr' ? 'Klikni za uvećanje' : 'Click to enlarge'}
                </div>
              </div>
            </div>
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
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div
                onClick={() =>
                  onOpenPhoto(
                    SITE_CONFIG.images.event,
                    lang === 'sr' ? 'Događaji — Primer kadra' : 'Events — Frame example',
                    'events'
                  )
                }
                className="group relative aspect-[4/3] w-full overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm"
              >
                <Image
                  src={SITE_CONFIG.images.event}
                  alt={lang === 'sr' ? 'Primer kadra sa proslave' : 'Celebration frame example'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/80 backdrop-blur-sm px-3 py-1 text-[10px] text-stone-200 font-mono tracking-widest uppercase">
                  {lang === 'sr' ? 'Klikni za uvećanje' : 'Click to enlarge'}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835]">
                <Users className="w-4 h-4" />
                <span>02 · {lang === 'sr' ? 'Proslave i Jubileji' : 'Celebrations & Gatherings'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                {lang === 'sr' ? 'Rođendani i događaji' : 'Birthdays & Events'}
              </h2>

              <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                {lang === 'sr'
                  ? 'Privatne proslave, jubileji i rođendani nose posebnu toplinu. Beležimo atmosferu, osmehe vaših gostiju, dekoraciju i spontane trenutke radosti koji čine događaj nezaboravnim.'
                  : 'Private celebrations, birthdays, and milestones carry warmth and connection. We capture the atmosphere, genuine smiles, and unscripted memories that define your celebration.'}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Rođendani i događaji' : 'Birthdays & Events'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] transition-colors"
                >
                  <span>
                    {lang === 'sr' ? 'Zatraži ponudu za proslavu' : 'Request Event Quote'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
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
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835]">
                <Sparkles className="w-4 h-4" />
                <span>03 · {lang === 'sr' ? 'Editorial i Lični' : 'Editorial & Personal'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                {lang === 'sr' ? 'Portreti' : 'Portraits'}
              </h2>

              <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                {lang === 'sr'
                  ? 'Portretna fotografija uz prirodan, intiman i estetski pristup. Bilo da vam je potreban autentičan lični portret, kreativni editorial kadar ili profesionalna fotografija za lični brend, fokusiramo se na vaš karakter i opuštenost.'
                  : 'Portrait photography shaped with an organic, editorial sensibility. Whether you desire an authentic personal portrait, creative monograph, or personal branding imagery, we prioritize character and comfort.'}
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Portreti' : 'Portraits'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] transition-colors"
                >
                  <span>
                    {lang === 'sr' ? 'Zakaži portretnu sesiju' : 'Book Portrait Session'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                onClick={() =>
                  onOpenPhoto(
                    SITE_CONFIG.images.portrait,
                    lang === 'sr' ? 'Portreti — Primer kadra' : 'Portraits — Frame example',
                    'portraits'
                  )
                }
                className="group relative aspect-[3/4] max-w-md mx-auto overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm"
              >
                <Image
                  src={SITE_CONFIG.images.portrait}
                  alt={lang === 'sr' ? 'Primer portreta' : 'Portrait example'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 500px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/80 backdrop-blur-sm px-3 py-1 text-[10px] text-stone-200 font-mono tracking-widest uppercase">
                  {lang === 'sr' ? 'Klikni za uvećanje' : 'Click to enlarge'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Video produkcija i montaža / Video Production & Editing */}
      <section
        id="video"
        className="py-20 lg:py-28 bg-[#1B1613] text-[#FAF8F5] border-t border-[#2C241E]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-amber-300">
                <Video className="w-4 h-4" />
                <span>04 · {lang === 'sr' ? 'Filmska Estetika' : 'Cinematic Direction'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-white tracking-tight">
                {lang === 'sr' ? 'Video produkcija i montaža' : 'Video Production & Editing'}
              </h2>

              <p className="text-sm sm:text-base text-stone-300 leading-relaxed">
                {lang === 'sr'
                  ? 'Video daje pokret i ton emocijama. Radimo snimanje i kompletnu postprodukciju — selekciju kadrova, ritmičku montažu, pažljivo odabranu muziku i profesionalnu kolor korekciju.'
                  : 'Film brings movement, rhythm, and sound to emotion. We provide full cinematic capture and complete post-production — pacing, editing, curated licensed music, and fine-art color grading.'}
              </p>

              <div className="space-y-2 text-xs text-stone-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{lang === 'sr' ? 'Kratki filmski rezimei i showreel formati' : 'Cinematic highlights & showreels'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-300 shrink-0" />
                  <span>{lang === 'sr' ? 'Optimizovani formati za YouTube, Instagram i TikTok' : 'Optimized formats for YouTube, Instagram & TikTok'}</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Video produkcija i montaža' : 'Video Production & Editing'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-[#1B1613] bg-[#FAF8F5] hover:bg-white transition-colors"
                >
                  <span>{lang === 'sr' ? 'Zatraži video ponudu' : 'Request Film Quote'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href={SITE_CONFIG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 text-xs uppercase tracking-[0.2em] font-medium text-stone-300 hover:text-white border border-stone-700 hover:border-stone-500 transition-colors"
                >
                  <span>{lang === 'sr' ? 'YouTube kanal' : 'YouTube Channel'}</span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-video w-full overflow-hidden bg-stone-900 border border-stone-800 shadow-xl group">
                <Image
                  src={SITE_CONFIG.images.hero}
                  alt="Filmski video prikaz"
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-black/40">
                  <a
                    href={SITE_CONFIG.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-14 h-14 rounded-full bg-white/20 hover:bg-white/40 backdrop-blur-md border border-white/60 flex items-center justify-center text-white transition-transform hover:scale-110 mb-3"
                    aria-label="Poseti YouTube kanal"
                  >
                    <Video className="w-6 h-6 ml-0.5" />
                  </a>
                  <span className="text-xs font-mono tracking-widest uppercase text-amber-200">
                    {lang === 'sr' ? 'YouTube Video Kanal' : 'YouTube Video Channel'}
                  </span>
                  <p className="text-[11px] text-stone-300 mt-1 max-w-xs">
                    {lang === 'sr'
                      ? 'Novi video radovi se redovno objavljuju na zvaničnom kanalu.'
                      : 'New cinematic projects are premiered on our official channel.'}
                  </p>
                </div>
              </div>
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
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-[#8C5835]">
                <Building2 className="w-4 h-4" />
                <span>05 · {lang === 'sr' ? 'Organizacije i Institucije' : 'Organizations & Institutions'}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
                {lang === 'sr' ? 'Nevladine organizacije i institucije' : 'NGO & Organizations'}
              </h2>

              <p className="text-sm sm:text-base text-[#6E645A] leading-relaxed">
                {lang === 'sr'
                  ? 'Nudimo specijalizovane usluge vizuelnog dokumentovanja za organizacije civilnog društva, fondacije i javne institucije. Razumemo važnost donor reporting-a, profesionalnog vizuelnog identiteta i etičkog pristupa.'
                  : 'We offer specialized documentary visual coverage for civil society organizations, foundations, and public institutions. We understand the rigor required for donor reporting, press dissemination, and ethical representation.'}
              </p>

              {/* Explicitly list the types of documenting services without fabricating past clients */}
              <div className="space-y-2.5 pt-1">
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
              </div>

              <div className="pt-3">
                <button
                  type="button"
                  onClick={() =>
                    onSelectServiceForInquiry(
                      lang === 'sr' ? 'Nevladine organizacije' : 'NGO & Organizations'
                    )
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs uppercase tracking-[0.2em] font-medium text-white bg-[#211B17] hover:bg-[#8C5835] transition-colors"
                >
                  <span>
                    {lang === 'sr' ? 'Pošaljite institucionalni upit' : 'Submit Institutional Inquiry'}
                  </span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div
                onClick={() =>
                  onOpenPhoto(
                    SITE_CONFIG.images.ngo,
                    lang === 'sr' ? 'Dokumentovanje organizacija — Primer kadra' : 'Institutional Documentation — Frame example',
                    'ngo'
                  )
                }
                className="group relative aspect-[4/3] w-full overflow-hidden bg-[#E0D7CB] cursor-pointer shadow-sm"
              >
                <Image
                  src={SITE_CONFIG.images.ngo}
                  alt={lang === 'sr' ? 'Primer dokumentovanja radionice' : 'Workshop documentation example'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 600px"
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                <div className="absolute bottom-3 left-3 bg-[#1B1613]/80 backdrop-blur-sm px-3 py-1 text-[10px] text-stone-200 font-mono tracking-widest uppercase">
                  {lang === 'sr' ? 'Klikni za uvećanje' : 'Click to enlarge'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
