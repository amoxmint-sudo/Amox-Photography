'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mail, Phone, Instagram, Youtube, ExternalLink, X, ArrowUpRight } from 'lucide-react';

interface FullscreenNavProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export function FullscreenNav({
  isOpen,
  onClose,
  lang,
  onLanguageChange,
  activeSection,
  onNavigate,
}: FullscreenNavProps) {
  const t = translations[lang];
  const prefersReducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll when open and handle Escape key
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onClose();
        }
      };

      window.addEventListener('keydown', handleKeyDown);
      firstFocusableRef.current?.focus();

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  const myStoryHref = lang === 'en' ? '/moja-prica?lang=en' : '/moja-prica';

  const navItems: Array<{ id: string; label: string; num: string; href?: string }> = [
    { id: 'home', label: t.nav.home, num: '01' },
    { id: 'about', label: t.nav.about, num: '02' },
    { id: 'services', label: t.nav.services, num: '03' },
    { id: 'weddings', label: t.nav.weddings, num: '04' },
    { id: 'events', label: t.nav.events, num: '05' },
    { id: 'portraits', label: t.nav.portraits, num: '06' },
    { id: 'video-production', label: t.nav.videoProduction, num: '07' },
    { id: 'video-editing', label: t.nav.videoEditing, num: '08' },
    { id: 'ngo', label: t.nav.ngo, num: '09' },
    { id: 'portfolio', label: t.nav.portfolio, num: '10' },
    { id: 'pricing', label: t.nav.pricing, num: '11' },
    { id: 'testimonials', label: t.nav.testimonials, num: '12' },
    { id: 'faq', label: t.nav.faq, num: '13' },
    { id: 'contact', label: t.nav.contact, num: '14' },
    { id: 'moja-prica', label: t.nav.myStory, num: '15', href: myStoryHref },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={t.nav.menu}
          initial={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-[#1B1613] text-[#FAF8F5] overflow-y-auto"
        >
          {/* Header row in modal with discreet logo reveal */}
          <div className="flex items-center justify-between px-6 sm:px-12 py-6 border-b border-[#2C241E] shrink-0">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <Logo lang={lang} isLight onClick={onClose} />
            </motion.div>

            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-6"
            >
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={onLanguageChange}
                isLight
                layoutScope="modal"
              />

              <button
                ref={firstFocusableRef}
                type="button"
                onClick={onClose}
                aria-label={t.nav.closeMenu}
                className="group flex items-center gap-2 p-2 text-stone-300 hover:text-white active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              >
                <span className="text-xs tracking-[0.2em] uppercase hidden sm:inline">
                  {t.nav.closeMenu}
                </span>
                <X className="w-6 h-6 stroke-[1.5] transition-transform duration-300 group-hover:rotate-90" />
              </button>
            </motion.div>
          </div>

          {/* Main content container */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 py-8 lg:py-12 flex flex-col justify-between gap-10">
            <div>
              {/* Editorial Index Kicker */}
              <motion.div
                initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between pb-4 mb-2 border-b border-[#2C241E]"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.28em] text-[#8C5835]">
                  {lang === 'sr'
                    ? 'Urednički indeks navigacije'
                    : 'Editorial Navigation Index'}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-[#7A6A5C] tabular-nums">
                  01 — 15
                </span>
              </motion.div>

              {/* 15-Item Editorial Navigation Matrix:
                  - Mobile: 1 column (15 rows)
                  - Tablet (sm/md): 2 columns (7 rows of 2 + item 15 spanning full 2-column width)
                  - Desktop (lg+): 3 columns × 5 rows = 15 items with zero empty cells */}
              <nav
                aria-label="Glavni meni navigacije"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-x-8 lg:gap-x-10 xl:gap-x-12 gap-y-0 items-stretch"
              >
                {navItems.map((item, index) => {
                  const isActive = activeSection === item.id;
                  const isLastItem = index === navItems.length - 1;

                  const itemInner = (
                    <>
                      {/* Subtle animated bottom bronze line on hover */}
                      <span
                        aria-hidden="true"
                        className={`pointer-events-none absolute left-0 bottom-[-1px] h-[1px] w-full origin-left transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                          isActive
                            ? 'bg-[#D4A373] scale-x-100'
                            : 'bg-[#8C5835] scale-x-0 group-hover:scale-x-100'
                        }`}
                      />

                      <span className="flex items-baseline gap-3.5 min-w-0 pr-2">
                        <span
                          className={`w-6 shrink-0 text-[11px] font-mono tabular-nums tracking-[0.12em] transition-colors duration-200 ${
                            isActive
                              ? 'text-[#D4A373]'
                              : 'text-[#7A6A5C] group-hover:text-[#D4A373]'
                          }`}
                        >
                          {item.num}
                        </span>
                        <span
                          className={`text-[17px] sm:text-[18px] lg:text-[17.5px] xl:text-[19px] font-serif-editorial font-normal leading-snug tracking-[0.01em] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                            isActive
                              ? 'text-[#E5C185]'
                              : 'text-[#EDE6DD] group-hover:text-white group-hover:translate-x-1'
                          }`}
                        >
                          {item.label}
                        </span>
                      </span>

                      <span className="flex items-center gap-2 shrink-0">
                        {isLastItem && (
                          <span className="text-[9px] font-mono uppercase tracking-[0.22em] text-[#8C5835] border border-[#3A2E25] px-2 py-0.5 hidden sm:inline lg:hidden">
                            {lang === 'sr' ? 'Autorska stranica' : 'Author Page'}
                          </span>
                        )}
                        <ArrowUpRight
                          className={`w-4 h-4 shrink-0 transition-all duration-300 ${
                            isActive
                              ? 'text-[#E5C185] opacity-100 translate-x-0'
                              : 'text-[#D4A373] opacity-0 -translate-x-1.5 group-hover:opacity-100 group-hover:translate-x-0'
                          }`}
                        />
                      </span>
                    </>
                  );

                  return (
                    <motion.div
                      key={item.id}
                      initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.05 + index * 0.024,
                        duration: 0.38,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className={`h-full ${
                        isLastItem ? 'sm:col-span-2 lg:col-span-1' : ''
                      }`}
                    >
                      {item.href ? (
                        <Link
                          href={item.href}
                          onClick={onClose}
                          className="group relative h-full min-h-[56px] sm:min-h-[62px] flex items-center justify-between gap-3 text-left w-full py-3.5 border-b border-[#2C241E] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                        >
                          {itemInner}
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleLinkClick(item.id)}
                          className="group relative h-full min-h-[56px] sm:min-h-[62px] flex items-center justify-between gap-3 text-left w-full py-3.5 border-b border-[#2C241E] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                        >
                          {itemInner}
                        </button>
                      )}
                    </motion.div>
                  );
                })}
              </nav>
            </div>

            {/* Bottom Studio & Contact Bar aligned with the 3-column editorial grid */}
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="pt-8 border-t border-[#2C241E] grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 xl:gap-12 items-start"
            >
              {/* Column 1: Slogan & Service Territory */}
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C5835] block font-mono">
                  {lang === 'sr' ? 'Slogan' : 'Slogan'}
                </span>
                <p className="text-[#EDE6DD] font-serif-editorial text-lg sm:text-xl italic">
                  „{SITE_CONFIG.slogan[lang]}“
                </p>
                <p className="text-xs text-[#9E9083] leading-relaxed">
                  {SITE_CONFIG.serviceArea[lang]}
                </p>
              </div>

              {/* Column 2: Direct Contact */}
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C5835] block font-mono">
                  {lang === 'sr' ? 'Direktan kontakt' : 'Direct Contact'}
                </span>

                <div className="space-y-2 text-sm text-[#D6C9BC]">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-2.5 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <Mail className="w-4 h-4 text-[#D4A373] shrink-0" />
                    <span>{SITE_CONFIG.email}</span>
                  </a>

                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-white hover:translate-x-1 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{SITE_CONFIG.phone} (WhatsApp)</span>
                  </a>
                </div>
              </div>

              {/* Column 3: Client Gallery & Social Channels */}
              <div className="space-y-3">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#8C5835] block font-mono">
                  {lang === 'sr' ? 'Klijentska platforma' : 'Client Platform'}
                </span>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <a
                    href={SITE_CONFIG.picTimeClientUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link inline-flex items-center gap-2 text-xs text-[#E5C185] hover:text-amber-100 pb-0.5 transition-colors"
                  >
                    <span>Pic-Time Client Portal</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <div className="flex items-center gap-4 text-[#9E9083]">
                    <a
                      href={SITE_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        lang === 'sr' ? 'Instagram profil' : 'Instagram profile'
                      }
                      className="hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Instagram className="w-4 h-4" />
                    </a>
                    <a
                      href={SITE_CONFIG.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        lang === 'sr' ? 'YouTube kanal' : 'YouTube channel'
                      }
                      className="hover:text-white hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <Youtube className="w-4 h-4" />
                    </a>
                    <a
                      href={SITE_CONFIG.tiktokUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={
                        lang === 'sr' ? 'TikTok profil' : 'TikTok profile'
                      }
                      className="hover:text-white hover:-translate-y-0.5 transition-all duration-200 text-[11px] font-mono font-bold px-1.5 py-0.5 border border-[#4A3D33] rounded"
                    >
                      TT
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
