'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Check, Eye, Monitor, Smartphone, Tablet } from 'lucide-react';

interface TypographyPreviewClientProps {
  playfairClass: string;
  dmSansClass: string;
  monteCarloClass: string;
}

type SrAccentWord = 'priča' | 'svoj' | 'kadar';
type EnAccentWord = 'story' | 'its' | 'frame';
type DevicePreviewMode = 'all' | 'desktop' | 'tablet' | 'mobile';

const ADDITIONAL_HEADLINES = [
  {
    id: 'h1',
    lang: 'SR',
    category: 'VENČANJA · DOKUMENTARNI PRISTUP',
    plainBefore: 'Trenuci koji ostaju ',
    accentWord: 'zauvek',
    plainAfter: '.',
    fullPlain: '„Trenuci koji ostaju zauvek.“',
    note: 'Playfair Display Regular + MonteCarlo akcenat na ključnoj emotivnoj reči',
  },
  {
    id: 'h2',
    lang: 'SR',
    category: 'DETALJI · EDITORIAL ESTETIKA',
    plainBefore: 'Lepota je u ',
    accentWord: 'detaljima',
    plainAfter: '.',
    fullPlain: '„Lepota je u detaljima.“',
    note: 'Kontrast klasičnog serifa i kaligrafskog potpisa u maslinastoj nijansi #9BAE90',
  },
  {
    id: 'h3',
    lang: 'SR',
    category: 'PORTRETI & FILM · SVETLO',
    plainBefore: 'Priče ispričane ',
    accentWord: 'svetlom',
    plainAfter: '.',
    fullPlain: '„Priče ispričane svetlom.“',
    note: 'Poetski naslov za sekciju portreta i autorskog filma',
  },
  {
    id: 'h4',
    lang: 'EN',
    category: 'WEDDINGS & EDITORIAL · ARCHIVE',
    plainBefore: 'Moments become ',
    accentWord: 'memories',
    plainAfter: '.',
    fullPlain: '“Moments become memories.”',
    note: 'English editorial headline — MonteCarlo script on “memories”',
  },
  {
    id: 'h5',
    lang: 'EN',
    category: 'CINEMATOGRAPHY · TIMELESS CRAFT',
    plainBefore: 'The ',
    accentWord: 'art',
    plainAfter: ' of preserving moments.',
    fullPlain: '“The art of preserving moments.”',
    note: 'Old Money Luxury balance — script accent integrated inside the sentence',
  },
];

const CATEGORIES_SPECIMEN = [
  'AMOX PHOTOGRAPHY · PHOTOGRAPHY & FILM',
  '01 · VENČANJA I PROSLAVE',
  '02 · KORPORATIVNI DOGAĐAJI',
  '03 · PORTRETNA I MODNA FOTOGRAFIJA',
  '04 · KINEMATOGRAFSKA VIDEO PRODUKCIJA',
  '05 · POSTPRODUKCIJA I KOLOR GRADING',
  '06 · DOKUMENTARNI RAD SA ZAJEDNICAMA',
];

export default function TypographyPreviewClient({
  playfairClass,
  dmSansClass,
  monteCarloClass,
}: TypographyPreviewClientProps) {
  const [srAccent, setSrAccent] = useState<SrAccentWord>('kadar');
  const [enAccent, setEnAccent] = useState<EnAccentWord>('frame');
  const [showAdditionalWithScript, setShowAdditionalWithScript] = useState<boolean>(true);
  const [deviceMode, setDeviceMode] = useState<DevicePreviewMode>('all');
  const [activeButtonFeedback, setActiveButtonFeedback] = useState<string | null>(null);

  const triggerButtonDemo = (label: string) => {
    setActiveButtonFeedback(label);
    setTimeout(() => {
      setActiveButtonFeedback((prev) => (prev === label ? null : prev));
    }, 1800);
  };

  return (
    <div
      className={`${dmSansClass} min-h-screen bg-[#1B1613] text-[#F5F0E8] antialiased selection:bg-[#8C5835] selection:text-[#F5F0E8]`}
      style={{ fontFamily: 'var(--font-preview-dm-sans), sans-serif' }}
    >
      {/* Top Specimen Control Bar */}
      <div className="border-b border-[#C8B9A7]/15 bg-[#241C17]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 h-14 flex items-center justify-between gap-6">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#C8B9A7] hover:text-[#F5F0E8] transition-colors whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-[#9BAE90]" />
              <span>Nazad na sajt</span>
            </Link>
            <span className="text-[#C8B9A7]/30 hidden sm:inline" aria-hidden="true">
              ·
            </span>
            <span className="text-[11px] uppercase tracking-[0.24em] text-[#9BAE90] truncate hidden sm:inline">
              Typography Specimen · Old Money Luxury & Editorial
            </span>
          </div>

          <div className="hidden md:flex items-center gap-5 text-[11px] tracking-[0.18em] uppercase text-[#C8B9A7]">
            <span>Playfair Display</span>
            <span aria-hidden="true" className="text-[#8C5835]">
              ·
            </span>
            <span>DM Sans</span>
            <span aria-hidden="true" className="text-[#8C5835]">
              ·
            </span>
            <span>MonteCarlo</span>
          </div>
        </div>
      </div>

      <main className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 py-12 md:py-20 space-y-20 md:space-y-28">
        {/* Intro Header & Palette Reference */}
        <section aria-labelledby="specimen-intro-heading" className="border-b border-[#C8B9A7]/15 pb-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8 space-y-5">
              <p className="text-[11px] sm:text-xs uppercase tracking-[0.3em] text-[#9BAE90] font-medium">
                AMOX PHOTOGRAPHY & FILM · VIZUELNI TEST TIPOGRAFIJE
              </p>
              <h1
                id="specimen-intro-heading"
                className={`${playfairClass} text-3xl sm:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-[-0.01em] text-[#F5F0E8]`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif', textWrap: 'balance' }}
              >
                Tipografska studija:{' '}
                <span
                  className="italic font-normal text-[#C8B9A7]"
                  style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                >
                  Playfair Display, DM Sans
                </span>{' '}
                &amp;{' '}
                <span
                  className={`${monteCarloClass} text-[1.22em] text-[#9BAE90] font-normal`}
                  style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                >
                  MonteCarlo
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#C8B9A7] max-w-2xl leading-[1.7] font-normal">
                Izolovana probna stranica za procenu harmonije između klasičnog uredničkog serifa
                (Playfair Display), čiste geometrijske čitljivosti (DM Sans) i suptilnog
                kaligrafskog akcenta (MonteCarlo) u autentičnoj AMOX paleti boja.
              </p>
            </div>

            {/* Palette Swatches */}
            <div className="lg:col-span-4 bg-[#241C17] border border-[#C8B9A7]/15 p-6 space-y-4">
              <p className="text-[11px] uppercase tracking-[0.26em] text-[#C8B9A7]">
                AKTIVNA PALETA BOJA
              </p>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#1B1613] border border-[#C8B9A7]/30 shrink-0" />
                  <div>
                    <div className="text-[#F5F0E8] font-medium">#1B1613</div>
                    <div className="text-[#C8B9A7] text-[11px]">Background</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#241C17] border border-[#C8B9A7]/30 shrink-0" />
                  <div>
                    <div className="text-[#F5F0E8] font-medium">#241C17</div>
                    <div className="text-[#C8B9A7] text-[11px]">Secondary BG</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#F5F0E8] border border-[#C8B9A7]/30 shrink-0" />
                  <div>
                    <div className="text-[#F5F0E8] font-medium">#F5F0E8</div>
                    <div className="text-[#C8B9A7] text-[11px]">Cream Text</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#C8B9A7] border border-[#C8B9A7]/30 shrink-0" />
                  <div>
                    <div className="text-[#F5F0E8] font-medium">#C8B9A7</div>
                    <div className="text-[#C8B9A7] text-[11px]">Secondary Text</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#9BAE90] border border-[#C8B9A7]/30 shrink-0" />
                  <div>
                    <div className="text-[#F5F0E8] font-medium">#9BAE90</div>
                    <div className="text-[#C8B9A7] text-[11px]">Olive Accent</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-[#8C5835] border border-[#C8B9A7]/30 shrink-0" />
                  <div>
                    <div className="text-[#F5F0E8] font-medium">#8C5835</div>
                    <div className="text-[#C8B9A7] text-[11px]">Bronze Accent</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 1: Font Family Cards (3 Fonts Overview) */}
        <section aria-labelledby="fonts-overview-heading" className="space-y-8">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90]">
              01 · FONTOVI ZA TESTIRANJE
            </p>
            <h2
              id="fonts-overview-heading"
              className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
              style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
            >
              Tri uloge u tipografskom sistemu
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Playfair Display Card */}
            <div className="bg-[#241C17] border border-[#C8B9A7]/15 p-7 sm:p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[#9BAE90]">
                  <span>GLAVNI SERIFNI FONT</span>
                  <span>400 / 400i / 600</span>
                </div>
                <h3
                  className={`${playfairClass} text-3xl sm:text-4xl text-[#F5F0E8] font-normal`}
                  style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                >
                  Playfair Display
                </h3>
                <p className="text-sm text-[#C8B9A7] leading-relaxed">
                  Visokokontrastni urednički serif sa izraženim završecima i klasičnom proporcijom.
                  Nosi naslove, podnaslove, citate i luksuzna dugmad.
                </p>
              </div>
              <div
                className={`${playfairClass} pt-6 border-t border-[#C8B9A7]/15 space-y-2`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
              >
                <p className="text-2xl text-[#F5F0E8] font-normal">Aa Bb Cc Čč Ćć Šš Žž</p>
                <p className="text-lg italic text-[#C8B9A7]">
                  Italic: Između dokumentarne istine i filmske estetike
                </p>
              </div>
            </div>

            {/* DM Sans Card */}
            <div className="bg-[#241C17] border border-[#C8B9A7]/15 p-7 sm:p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[#9BAE90]">
                  <span>NAVIGACIJA I TEKSTOVI</span>
                  <span>400 / 500</span>
                </div>
                <h3
                  className={`${dmSansClass} text-3xl sm:text-4xl text-[#F5F0E8] font-normal tracking-tight`}
                  style={{ fontFamily: 'var(--font-preview-dm-sans), sans-serif' }}
                >
                  DM Sans
                </h3>
                <p className="text-sm text-[#C8B9A7] leading-relaxed">
                  Niskokontrastni geometrijski sans-serif dizajniran za besprekornu čitljivost u
                  dužim pasusima, navigaciji i malim kategorijama sa razmakom između slova.
                </p>
              </div>
              <div className="pt-6 border-t border-[#C8B9A7]/15 space-y-2">
                <p className="text-2xl text-[#F5F0E8] font-normal">Aa Bb Cc Čč Ćć Šš Žž 0123456789</p>
                <p className="text-xs uppercase tracking-[0.28em] text-[#C8B9A7]">
                  PORTFOLIO · VENČANJA · MOJA PRIČA · KONTAKT
                </p>
              </div>
            </div>

            {/* MonteCarlo Card */}
            <div className="bg-[#241C17] border border-[#C8B9A7]/15 p-7 sm:p-8 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[#9BAE90]">
                  <span>UMETNIČKI RUKOPISNI FONT</span>
                  <span>400 SCRIPT</span>
                </div>
                <h3
                  className={`${monteCarloClass} text-4xl sm:text-5xl text-[#9BAE90] font-normal leading-tight`}
                  style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                >
                  MonteCarlo
                </h3>
                <p className="text-sm text-[#C8B9A7] leading-relaxed">
                  Kaligrafski rukopisni font rezervisan za jednu pažljivo odabranu reč u naslovu ili
                  kratku ličnu poruku autora — nikad za duge blokove teksta.
                </p>
              </div>
              <div
                className={`${monteCarloClass} pt-6 border-t border-[#C8B9A7]/15 space-y-1`}
                style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
              >
                <p className="text-3xl text-[#9BAE90]">Svaka priča · svoj kadar · svetlom</p>
                <p className="text-2xl text-[#F5F0E8]">Andrej Ristić, autorski potpis</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Navigation in DM Sans + Hero Headline Comparisons */}
        <section aria-labelledby="hero-comparison-heading" className="space-y-10">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90]">
              02 · GLAVNI NASLOV, RUKOPISNI AKCENAT I ENGLESKA VERZIJA
            </p>
            <h2
              id="hero-comparison-heading"
              className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
              style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
            >
              Poređenje glavnog slogana i rukopisnog akcenta
            </h2>
          </div>

          {/* Specimen Navigation Bar in DM Sans */}
          <div className="bg-[#241C17] border border-[#C8B9A7]/20">
            <div className="px-6 sm:px-10 py-3 border-b border-[#C8B9A7]/10 flex items-center justify-between text-[11px] uppercase tracking-[0.24em] text-[#9BAE90]">
              <span>PRIMER NAVIGACIJE U DM SANS FONTU</span>
              <span>TRACKING: 0.22EM · WEIGHT: 400/500</span>
            </div>
            <header className="px-6 sm:px-10 py-5 flex items-center justify-between gap-8 border-b border-[#C8B9A7]/15 bg-[#1B1613]">
              <span
                className={`${playfairClass} text-lg sm:text-xl tracking-[0.18em] uppercase text-[#F5F0E8] whitespace-nowrap shrink-0`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
              >
                AMOX
              </span>

              <nav
                aria-label="Primer DM Sans navigacije"
                className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.22em] text-[#C8B9A7]"
              >
                <a
                  href="#hero-comparison-heading"
                  className="text-[#F5F0E8] hover:text-[#9BAE90] transition-colors whitespace-nowrap shrink-0"
                >
                  Početna
                </a>
                <a
                  href="#additional-headlines-heading"
                  className="hover:text-[#F5F0E8] transition-colors whitespace-nowrap shrink-0"
                >
                  Portfolio
                </a>
                <a
                  href="#elements-specimen-heading"
                  className="hover:text-[#F5F0E8] transition-colors whitespace-nowrap shrink-0"
                >
                  Usluge
                </a>
                <a
                  href="#elements-specimen-heading"
                  className="hover:text-[#F5F0E8] transition-colors whitespace-nowrap shrink-0"
                >
                  Moja priča
                </a>
                <a
                  href="#responsive-specimen-heading"
                  className="hover:text-[#F5F0E8] transition-colors whitespace-nowrap shrink-0"
                >
                  Kontakt
                </a>
              </nav>

              <button
                type="button"
                onClick={() => triggerButtonDemo('Navigacija: Zakažite razgovor')}
                className={`${playfairClass} px-5 py-2.5 text-xs uppercase tracking-[0.2em] bg-[#8C5835] text-[#F5F0E8] hover:bg-[#9BAE90] hover:text-[#1B1613] transition-colors whitespace-nowrap shrink-0`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
              >
                Zakažite razgovor
              </button>
            </header>

            {/* 2A: Pure Playfair Display Regular */}
            <div className="p-8 sm:p-12 md:p-16 border-b border-[#C8B9A7]/15 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90]">
                  VARIJANTA A · PLAYFAIR DISPLAY REGULAR (ČIST SERIF)
                </span>
                <span className="text-xs text-[#C8B9A7]">Playfair Display 400 · #F5F0E8</span>
              </div>

              <p
                className={`${playfairClass} text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.1] tracking-[-0.01em] text-[#F5F0E8]`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif', textWrap: 'balance' }}
              >
                „Svaka priča ima svoj kadar.“
              </p>

              <p className="text-sm sm:text-base text-[#C8B9A7] max-w-2xl leading-[1.75]">
                Fotografija i film koji beleže stvarne trenutke, ljude i atmosferu — od venčanja i
                privatnih proslava do portreta, događaja i produkcije za brendove i organizacije.
              </p>
            </div>

            {/* 2B: Playfair Display + MonteCarlo Accent (SR) */}
            <div className="p-8 sm:p-12 md:p-16 border-b border-[#C8B9A7]/15 space-y-6 bg-[#1B1613]/60">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90] block">
                    VARIJANTA B · NASLOV SA RUKOPISNIM AKCENTOM (SRPSKI)
                  </span>
                  <span className="text-xs text-[#C8B9A7] block">
                    Playfair Display Regular (#F5F0E8) + MonteCarlo (#9BAE90)
                  </span>
                </div>

                {/* Word Selector for SR */}
                <div
                  role="group"
                  aria-label="Izbor istaknute reči na srpskom"
                  className="flex items-center gap-1.5 bg-[#241C17] p-1 border border-[#C8B9A7]/20"
                >
                  {(['kadar', 'priča', 'svoj'] as SrAccentWord[]).map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => setSrAccent(word)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                        srAccent === word
                          ? 'bg-[#8C5835] text-[#F5F0E8]'
                          : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                      }`}
                    >
                      Reč: „{word}“
                    </button>
                  ))}
                </div>
              </div>

              <p
                className={`${playfairClass} text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.15] tracking-[-0.01em] text-[#F5F0E8]`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif', textWrap: 'balance' }}
              >
                „Svaka{' '}
                {srAccent === 'priča' ? (
                  <span
                    className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] font-normal inline-block px-1`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    priča
                  </span>
                ) : (
                  'priča'
                )}{' '}
                ima{' '}
                {srAccent === 'svoj' ? (
                  <span
                    className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] font-normal inline-block px-1`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    svoj
                  </span>
                ) : (
                  'svoj'
                )}{' '}
                {srAccent === 'kadar' ? (
                  <span
                    className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] font-normal inline-block px-1`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    kadar
                  </span>
                ) : (
                  'kadar'
                )}
                .“
              </p>

              {/* Side-by-side static reference of both natural SR placements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#C8B9A7]/10">
                <div className="bg-[#241C17] p-5 border border-[#C8B9A7]/10 space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#C8B9A7]">
                    OPCIJA 1 · NAGLASAK NA REČI „KADAR“ (ZAVRŠNI AKCENAT)
                  </span>
                  <p
                    className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    „Svaka priča ima svoj{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.3em] px-0.5`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      kadar
                    </span>
                    .“
                  </p>
                </div>

                <div className="bg-[#241C17] p-5 border border-[#C8B9A7]/10 space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#C8B9A7]">
                    OPCIJA 2 · NAGLASAK NA REČI „PRIČA“ (SREDNJI AKCENAT)
                  </span>
                  <p
                    className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    „Svaka{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.3em] px-0.5`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      priča
                    </span>{' '}
                    ima svoj kadar.“
                  </p>
                </div>
              </div>
            </div>

            {/* 2C: English Version */}
            <div className="p-8 sm:p-12 md:p-16 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90] block">
                    VARIJANTA C · ENGLESKA VERZIJA SA PRIRODNIM ISTICANJEM REČI
                  </span>
                  <span className="text-xs text-[#C8B9A7] block">
                    “Every story has its frame.” · Playfair Display + MonteCarlo (#9BAE90)
                  </span>
                </div>

                <div
                  role="group"
                  aria-label="Izbor istaknute reči na engleskom"
                  className="flex items-center gap-1.5 bg-[#1B1613] p-1 border border-[#C8B9A7]/20"
                >
                  {(['frame', 'story', 'its'] as EnAccentWord[]).map((word) => (
                    <button
                      key={word}
                      type="button"
                      onClick={() => setEnAccent(word)}
                      className={`px-3 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                        enAccent === word
                          ? 'bg-[#8C5835] text-[#F5F0E8]'
                          : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                      }`}
                    >
                      Word: “{word}”
                    </button>
                  ))}
                </div>
              </div>

              <p
                className={`${playfairClass} text-3xl sm:text-5xl md:text-6xl lg:text-[68px] font-normal leading-[1.15] tracking-[-0.01em] text-[#F5F0E8]`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif', textWrap: 'balance' }}
              >
                „Every{' '}
                {enAccent === 'story' ? (
                  <span
                    className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] font-normal inline-block px-1`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    story
                  </span>
                ) : (
                  'story'
                )}{' '}
                has{' '}
                {enAccent === 'its' ? (
                  <span
                    className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] font-normal inline-block px-1`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    its
                  </span>
                ) : (
                  'its'
                )}{' '}
                {enAccent === 'frame' ? (
                  <span
                    className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] font-normal inline-block px-1`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    frame
                  </span>
                ) : (
                  'frame'
                )}
                .“
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-[#C8B9A7]/10">
                <div className="bg-[#1B1613] p-5 border border-[#C8B9A7]/10 space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#C8B9A7]">
                    ENGLISH OPTION 1 · EMPHASIS ON “FRAME”
                  </span>
                  <p
                    className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    “Every story has its{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.3em] px-0.5`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      frame
                    </span>
                    .”
                  </p>
                </div>

                <div className="bg-[#1B1613] p-5 border border-[#C8B9A7]/10 space-y-2">
                  <span className="text-[11px] uppercase tracking-[0.22em] text-[#C8B9A7]">
                    ENGLISH OPTION 2 · EMPHASIS ON “STORY”
                  </span>
                  <p
                    className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    “Every{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.3em] px-0.5`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      story
                    </span>{' '}
                    has its frame.”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Additional Headlines (5 Required Examples) */}
        <section aria-labelledby="additional-headlines-heading" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90]">
                03 · PRIMERI DODATNIH NASLOVA (SR &amp; EN)
              </p>
              <h2
                id="additional-headlines-heading"
                className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
              >
                Pet uredničkih slogana u Playfair Display i MonteCarlo kombinaciji
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-[#241C17] p-1 border border-[#C8B9A7]/20">
              <button
                type="button"
                onClick={() => setShowAdditionalWithScript(true)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                  showAdditionalWithScript
                    ? 'bg-[#8C5835] text-[#F5F0E8]'
                    : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                }`}
              >
                Obadva prikaza (Čist + Akcenat)
              </button>
              <button
                type="button"
                onClick={() => setShowAdditionalWithScript(false)}
                className={`px-3.5 py-1.5 text-xs uppercase tracking-[0.18em] transition-colors whitespace-nowrap shrink-0 ${
                  !showAdditionalWithScript
                    ? 'bg-[#8C5835] text-[#F5F0E8]'
                    : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                }`}
              >
                Samo čist Playfair
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5">
            {ADDITIONAL_HEADLINES.map((item, idx) => (
              <div
                key={item.id}
                className="bg-[#241C17] border border-[#C8B9A7]/15 p-7 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center"
              >
                <div className="lg:col-span-3 space-y-2">
                  <div className="text-[11px] uppercase tracking-[0.26em] text-[#9BAE90]">
                    0{idx + 1} · {item.lang}
                  </div>
                  <div className="text-xs uppercase tracking-[0.2em] text-[#C8B9A7]">
                    {item.category}
                  </div>
                  <p className="text-xs text-[#C8B9A7]/80 leading-relaxed pt-1">{item.note}</p>
                </div>

                <div className="lg:col-span-9 space-y-4 lg:border-l lg:border-[#C8B9A7]/15 lg:pl-8">
                  {/* Pure Playfair Display version */}
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-[0.24em] text-[#C8B9A7]/70 block">
                      Playfair Display Regular:
                    </span>
                    <p
                      className={`${playfairClass} text-2xl sm:text-4xl text-[#F5F0E8] font-normal leading-snug`}
                      style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                    >
                      {item.fullPlain}
                    </p>
                  </div>

                  {/* Playfair + MonteCarlo version */}
                  {showAdditionalWithScript && (
                    <div className="pt-3 border-t border-[#C8B9A7]/10 space-y-1">
                      <span className="text-[10px] uppercase tracking-[0.24em] text-[#9BAE90] block">
                        Playfair Display + MonteCarlo (#9BAE90):
                      </span>
                      <p
                        className={`${playfairClass} text-2xl sm:text-4xl text-[#F5F0E8] font-normal leading-snug`}
                        style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                      >
                        „{item.plainBefore}
                        <span
                          className={`${monteCarloClass} text-[#9BAE90] text-[1.3em] font-normal px-1`}
                          style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                        >
                          {item.accentWord}
                        </span>
                        {item.plainAfter}“
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: UI & Editorial Elements Specimen */}
        <section aria-labelledby="elements-specimen-heading" className="space-y-10">
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90]">
              04 · KOMPLETAN UREDNIČKI SISTEM ELEMENATA
            </p>
            <h2
              id="elements-specimen-heading"
              className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
              style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
            >
              Italic citati, rukopisna poruka, tekstualni opisi, dugmad i kategorije
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Column: Editorial Composition (Kicker + Playfair + Playfair Italic + DM Sans Body + MonteCarlo Signature + Playfair Buttons) */}
            <div className="lg:col-span-7 bg-[#241C17] border border-[#C8B9A7]/15 p-8 sm:p-12 flex flex-col justify-between space-y-10">
              <div className="space-y-6">
                {/* Small Uppercase Category with Generous Letter Spacing */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8B9A7]/60 block">
                    [Mala kategorija · velika slova · razmak 0.28em]
                  </span>
                  <p className="text-xs uppercase tracking-[0.28em] text-[#9BAE90] font-medium">
                    O VIZUELNOM PRISTUPU · OLD MONEY EDITORIAL
                  </p>
                </div>

                {/* Main Title in Playfair Display */}
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8B9A7]/60 block">
                    [Glavni naslov sekcije · Playfair Display Regular]
                  </span>
                  <h3
                    className={`${playfairClass} text-3xl sm:text-4xl lg:text-[42px] text-[#F5F0E8] font-normal leading-[1.15]`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif', textWrap: 'balance' }}
                  >
                    Između dokumentarne istine i filmske estetike
                  </h3>
                </div>

                {/* Playfair Display Italic Sample */}
                <div className="py-5 border-y border-[#C8B9A7]/15 space-y-2">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#9BAE90] block">
                    [Playfair Display Italic primer]
                  </span>
                  <blockquote
                    className={`${playfairClass} italic text-xl sm:text-2xl text-[#F5F0E8] leading-relaxed font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    „Dobar kadar ne nastaje kada sve stane pred objektiv, već kada život nastavi da
                    teče pred njim.“
                  </blockquote>
                </div>

                {/* Body Copy in DM Sans */}
                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8B9A7]/60 block">
                    [Tekstualni opis u DM Sans · #F5F0E8 i #C8B9A7]
                  </span>
                  <p className="text-base text-[#F5F0E8] leading-[1.75] font-normal">
                    U radu spajam dokumentarnu spontanost i pažljivo građen filmski kadar. Ne tražim
                    nameštene osmehe niti prekidam tok događaja — pratim stvarne poglede, pokrete,
                    svetlo i prostor u kom se priča prirodno odvija.
                  </p>
                  <p className="text-sm sm:text-base text-[#C8B9A7] leading-[1.75] font-normal">
                    Bilo da je reč o venčanju, porodičnoj proslavi, portretu, korporativnom događaju
                    ili terenskom radu sa organizacijama, cilj ostaje isti: vizuelni zapis koji
                    izgleda prirodno, dostojanstveno i postojano kroz vreme.
                  </p>
                </div>
              </div>

              {/* Short Handwritten Message in MonteCarlo + Buttons with Playfair Display */}
              <div className="pt-6 border-t border-[#C8B9A7]/15 space-y-6">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#9BAE90] block">
                    [Kratka rukopisna poruka u MonteCarlo fontu]
                  </span>
                  <p
                    className={`${monteCarloClass} text-3xl sm:text-4xl text-[#9BAE90] font-normal leading-snug`}
                    style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                  >
                    Sa pažnjom prema svakom kadru — Andrej Ristić
                  </p>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8B9A7]/60 block">
                    [Dugmad sa Playfair Display fontom · Bronze #8C5835 &amp; Olive #9BAE90]
                  </span>
                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      type="button"
                      onClick={() => triggerButtonDemo('Primarno dugme: Pogledajte portfolio')}
                      className={`${playfairClass} inline-flex items-center gap-3 px-7 py-3.5 bg-[#8C5835] text-[#F5F0E8] text-sm sm:text-base tracking-[0.14em] uppercase hover:bg-[#9BAE90] hover:text-[#1B1613] transition-colors whitespace-nowrap shrink-0`}
                      style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                    >
                      <span>Pogledajte portfolio</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => triggerButtonDemo('Sekundarno dugme: Moja priča')}
                      className={`${playfairClass} inline-flex items-center gap-3 px-7 py-3.5 bg-transparent border border-[#C8B9A7]/40 text-[#F5F0E8] text-sm sm:text-base tracking-[0.14em] uppercase hover:border-[#9BAE90] hover:text-[#9BAE90] transition-colors whitespace-nowrap shrink-0`}
                      style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                    >
                      <span>Moja priča</span>
                    </button>
                  </div>

                  {activeButtonFeedback && (
                    <p className="text-xs text-[#9BAE90] flex items-center gap-1.5 pt-1">
                      <Check className="w-3.5 h-3.5" />
                      <span>Aktiviran primer dugmeta: {activeButtonFeedback}</span>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column: Uppercase Micro-Categories, MonteCarlo Notes & Editorial Spec */}
            <div className="lg:col-span-5 flex flex-col justify-between gap-6">
              {/* Uppercase Categories Specimen */}
              <div className="bg-[#241C17] border border-[#C8B9A7]/15 p-8 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#9BAE90] block">
                    [Male kategorije velikim slovima i povećanim razmakom]
                  </span>
                  <h3
                    className={`${playfairClass} text-xl text-[#F5F0E8] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    Kategorije i nadnaslovi (DM Sans · Tracking 0.25em–0.32em)
                  </h3>
                </div>

                <div className="divide-y divide-[#C8B9A7]/10">
                  {CATEGORIES_SPECIMEN.map((cat, idx) => (
                    <div key={cat} className="py-3 flex items-center justify-between gap-4">
                      <span
                        className={`text-[11px] uppercase tracking-[0.28em] ${
                          idx === 0 ? 'text-[#9BAE90] font-medium' : 'text-[#C8B9A7]'
                        }`}
                      >
                        {cat}
                      </span>
                      <span className="text-[10px] text-[#C8B9A7]/50 tabular-nums shrink-0">
                        0.28em
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Short Handwritten Notes Showcase */}
              <div className="bg-[#241C17] border border-[#C8B9A7]/15 p-8 space-y-5">
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-[0.24em] text-[#9BAE90] block">
                    [Primeri kratkih rukopisnih poruka · MonteCarlo]
                  </span>
                  <h3
                    className={`${playfairClass} text-xl text-[#F5F0E8] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    Umetnički rukopisni akcenti
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="p-4 bg-[#1B1613] border border-[#C8B9A7]/10">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8B9A7]/70 block mb-1">
                      Potpis ispod portreta / priče:
                    </span>
                    <p
                      className={`${monteCarloClass} text-3xl text-[#9BAE90]`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      „Trenuci koji ostaju kada muzika utihne.“
                    </p>
                  </div>

                  <div className="p-4 bg-[#1B1613] border border-[#C8B9A7]/10">
                    <span className="text-[10px] uppercase tracking-[0.22em] text-[#C8B9A7]/70 block mb-1">
                      Engleska rukopisna beleška:
                    </span>
                    <p
                      className={`${monteCarloClass} text-3xl text-[#F5F0E8]`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      “Captured with quiet intention &amp; natural light.”
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 5: Responsive Scale Simulation (Desktop / Tablet / Mobile) */}
        <section aria-labelledby="responsive-specimen-heading" className="space-y-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[#9BAE90]">
                05 · RESPONSIVE PRIKAZ (DESKTOP · TABLET · MOBILNI)
              </p>
              <h2
                id="responsive-specimen-heading"
                className={`${playfairClass} text-2xl sm:text-3xl text-[#F5F0E8] font-normal`}
                style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
              >
                Skaliranje tipografije kroz tri formata ekrana
              </h2>
            </div>

            {/* Viewport Filter Controls */}
            <div
              role="group"
              aria-label="Filter prikaza ekrana"
              className="flex items-center gap-1.5 bg-[#241C17] p-1 border border-[#C8B9A7]/20"
            >
              <button
                type="button"
                onClick={() => setDeviceMode('all')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap shrink-0 ${
                  deviceMode === 'all'
                    ? 'bg-[#8C5835] text-[#F5F0E8]'
                    : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Svi ekrani</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('desktop')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap shrink-0 ${
                  deviceMode === 'desktop'
                    ? 'bg-[#8C5835] text-[#F5F0E8]'
                    : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('tablet')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap shrink-0 ${
                  deviceMode === 'tablet'
                    ? 'bg-[#8C5835] text-[#F5F0E8]'
                    : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" />
                <span>Tablet</span>
              </button>
              <button
                type="button"
                onClick={() => setDeviceMode('mobile')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[0.16em] transition-colors whitespace-nowrap shrink-0 ${
                  deviceMode === 'mobile'
                    ? 'bg-[#8C5835] text-[#F5F0E8]'
                    : 'text-[#C8B9A7] hover:text-[#F5F0E8]'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobilni</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Desktop Frame Preview */}
            {(deviceMode === 'all' || deviceMode === 'desktop') && (
              <div
                className={`${
                  deviceMode === 'desktop' ? 'lg:col-span-12' : 'lg:col-span-5'
                } bg-[#241C17] border border-[#C8B9A7]/20 p-7 sm:p-9 space-y-6`}
              >
                <div className="flex items-center justify-between border-b border-[#C8B9A7]/15 pb-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9BAE90]">
                    <Monitor className="w-4 h-4" />
                    <span>DESKTOP (1440PX)</span>
                  </div>
                  <span className="text-[11px] text-[#C8B9A7] tabular-nums">
                    H1: 64px · Script: 82px · Body: 16px
                  </span>
                </div>

                <div className="bg-[#1B1613] border border-[#C8B9A7]/10 p-7 space-y-4">
                  <p className="text-[11px] uppercase tracking-[0.3em] text-[#9BAE90]">
                    AMOX PHOTOGRAPHY · PHOTOGRAPHY &amp; FILM
                  </p>
                  <p
                    className={`${playfairClass} text-4xl sm:text-5xl text-[#F5F0E8] leading-[1.12] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    „Svaka priča ima svoj{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] px-1`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      kadar
                    </span>
                    .“
                  </p>
                  <p className="text-sm sm:text-base text-[#C8B9A7] leading-[1.7]">
                    Fotografija i film koji beleže stvarne trenutke, ljude i atmosferu — uz mirno
                    vođenu estetiku i prirodan ritam kadra.
                  </p>
                  <div className="pt-2">
                    <span
                      className={`${playfairClass} inline-block px-6 py-3 bg-[#8C5835] text-[#F5F0E8] text-xs uppercase tracking-[0.2em]`}
                      style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                    >
                      Pogledajte portfolio
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Tablet Frame Preview */}
            {(deviceMode === 'all' || deviceMode === 'tablet') && (
              <div
                className={`${
                  deviceMode === 'tablet' ? 'lg:col-span-8' : 'lg:col-span-4'
                } bg-[#241C17] border border-[#C8B9A7]/20 p-7 sm:p-8 space-y-6`}
              >
                <div className="flex items-center justify-between border-b border-[#C8B9A7]/15 pb-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9BAE90]">
                    <Tablet className="w-4 h-4" />
                    <span>TABLET (768PX)</span>
                  </div>
                  <span className="text-[11px] text-[#C8B9A7] tabular-nums">
                    H1: 48px · Script: 60px · Body: 15px
                  </span>
                </div>

                <div className="bg-[#1B1613] border border-[#C8B9A7]/10 p-6 space-y-4">
                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#9BAE90]">
                    AMOX PHOTOGRAPHY · FILM
                  </p>
                  <p
                    className={`${playfairClass} text-3xl sm:text-4xl text-[#F5F0E8] leading-[1.15] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    „Every story has its{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.26em] px-1`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      frame
                    </span>
                    .“
                  </p>
                  <p className="text-sm text-[#C8B9A7] leading-[1.68]">
                    Photography and film capturing real moments, people, and atmosphere across
                    weddings, portraits, and brand productions.
                  </p>
                  <div className="pt-1">
                    <span
                      className={`${playfairClass} inline-block px-5 py-2.5 bg-[#8C5835] text-[#F5F0E8] text-xs uppercase tracking-[0.18em]`}
                      style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                    >
                      Explore Portfolio
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Frame Preview */}
            {(deviceMode === 'all' || deviceMode === 'mobile') && (
              <div
                className={`${
                  deviceMode === 'mobile' ? 'lg:col-span-6' : 'lg:col-span-3'
                } bg-[#241C17] border border-[#C8B9A7]/20 p-6 sm:p-7 space-y-6`}
              >
                <div className="flex items-center justify-between border-b border-[#C8B9A7]/15 pb-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-[#9BAE90]">
                    <Smartphone className="w-4 h-4" />
                    <span>MOBILNI (375PX)</span>
                  </div>
                  <span className="text-[11px] text-[#C8B9A7] tabular-nums">
                    H1: 34px · Script: 44px
                  </span>
                </div>

                <div className="max-w-[335px] mx-auto bg-[#1B1613] border border-[#C8B9A7]/15 p-5 space-y-3.5">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-[#9BAE90]">
                    AMOX PHOTOGRAPHY
                  </p>
                  <p
                    className={`${playfairClass} text-[30px] text-[#F5F0E8] leading-[1.18] font-normal`}
                    style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                  >
                    „Svaka priča ima svoj{' '}
                    <span
                      className={`${monteCarloClass} text-[#9BAE90] text-[1.28em] px-0.5`}
                      style={{ fontFamily: 'var(--font-preview-montecarlo), cursive' }}
                    >
                      kadar
                    </span>
                    .“
                  </p>
                  <p className="text-[13px] text-[#C8B9A7] leading-[1.65]">
                    Između dokumentarne istine i filmske estetike — bez veštačkog poziranja.
                  </p>
                  <div className="pt-1">
                    <span
                      className={`${playfairClass} block w-full text-center py-2.5 bg-[#8C5835] text-[#F5F0E8] text-[11px] uppercase tracking-[0.2em]`}
                      style={{ fontFamily: 'var(--font-preview-playfair), serif' }}
                    >
                      Zakažite razgovor
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Isolated Specimen Footer */}
      <footer className="border-t border-[#C8B9A7]/15 bg-[#241C17] py-10 mt-16">
        <div className="max-w-[1360px] mx-auto px-5 sm:px-8 md:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#C8B9A7]">
          <p className="uppercase tracking-[0.24em]">
            AMOX PHOTOGRAPHY &amp; FILM · PRIVREMENI TEST TIPOGRAFIJE (/typography-preview)
          </p>
          <p className="text-[#9BAE90] uppercase tracking-[0.2em]">
            SURDULICA · SRBIJA · REGION
          </p>
        </div>
      </footer>
    </div>
  );
}
