'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Mail, Phone, Instagram, Youtube, ExternalLink, X } from 'lucide-react';

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

  const navItems = [
    { id: 'home', label: t.nav.home, num: '01' },
    { id: 'about', label: t.nav.about, num: '02' },
    { id: 'weddings', label: t.nav.weddings, num: '03' },
    { id: 'events', label: t.nav.events, num: '04' },
    { id: 'portraits', label: t.nav.portraits, num: '05' },
    { id: 'video', label: t.nav.video, num: '06' },
    { id: 'ngo', label: t.nav.ngo, num: '07' },
    { id: 'portfolio', label: t.nav.portfolio, num: '08' },
    { id: 'pricing', label: t.nav.pricing, num: '09' },
    { id: 'testimonials', label: t.nav.testimonials, num: '10' },
    { id: 'faq', label: t.nav.faq, num: '11' },
    { id: 'contact', label: t.nav.contact, num: '12' },
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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col bg-[#1B1613] text-[#FAF8F5] overflow-y-auto"
        >
          {/* Header row in modal */}
          <div className="flex items-center justify-between px-6 sm:px-12 py-6 border-b border-[#2C241E] shrink-0">
            <Logo isLight onClick={onClose} />

            <div className="flex items-center gap-6">
              <LanguageSwitcher
                currentLang={lang}
                onLanguageChange={onLanguageChange}
                isLight
              />

              <button
                ref={firstFocusableRef}
                type="button"
                onClick={onClose}
                aria-label={t.nav.closeMenu}
                className="flex items-center gap-2 p-2 text-stone-300 hover:text-white transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
              >
                <span className="text-xs tracking-[0.2em] uppercase hidden sm:inline">
                  {t.nav.closeMenu}
                </span>
                <X className="w-6 h-6 stroke-[1.5]" />
              </button>
            </div>
          </div>

          {/* Main content grid */}
          <div className="flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Primary navigation list */}
            <nav
              aria-label="Glavni meni navigacije"
              className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.id;
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.025, duration: 0.2 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleLinkClick(item.id)}
                      className="group flex items-baseline gap-3 text-left w-full py-2 border-b border-[#2C241E] hover:border-amber-700/50 transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    >
                      <span className="text-xs font-mono text-stone-500 tabular-nums group-hover:text-amber-300 transition-colors">
                        {item.num}
                      </span>
                      <span
                        className={`text-lg sm:text-xl md:text-2xl font-serif-editorial transition-colors tracking-wide ${
                          isActive
                            ? 'text-amber-200 font-medium'
                            : 'text-stone-200 group-hover:text-white group-hover:translate-x-1 duration-200 transform'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  </motion.div>
                );
              })}
            </nav>

            {/* Sidebar information inside menu */}
            <div className="lg:col-span-4 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-[#2C241E] pt-8 lg:pt-0 lg:pl-10 space-y-8">
              <div>
                <span className="text-[11px] tracking-[0.25em] uppercase text-stone-400 block mb-2 font-mono">
                  {lang === 'sr' ? 'Slogan' : 'Slogan'}
                </span>
                <p className="text-stone-300 font-serif-editorial text-xl italic">
                  „{SITE_CONFIG.slogan[lang]}“
                </p>
                <p className="text-xs text-stone-400 mt-3 leading-relaxed">
                  {SITE_CONFIG.serviceArea[lang]}
                </p>
              </div>

              <div className="space-y-4">
                <span className="text-[11px] tracking-[0.25em] uppercase text-stone-400 block font-mono">
                  {lang === 'sr' ? 'Direktan kontakt' : 'Direct Contact'}
                </span>

                <div className="space-y-2 text-sm text-stone-300">
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>{SITE_CONFIG.email}</span>
                  </a>

                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2.5 hover:text-white transition-colors"
                  >
                    <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{SITE_CONFIG.phone} (WhatsApp)</span>
                  </a>
                </div>
              </div>

              {/* Client gallery highlight & social */}
              <div className="space-y-4">
                <span className="text-[11px] tracking-[0.25em] uppercase text-stone-400 block font-mono">
                  {lang === 'sr' ? 'Klijentska platforma' : 'Client Platform'}
                </span>
                <a
                  href={SITE_CONFIG.picTimeClientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs text-amber-200 hover:text-amber-100 hover:underline transition-colors"
                >
                  <span>Pic-Time Client Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <div className="flex items-center gap-4 pt-2 text-stone-400">
                  <a
                    href={SITE_CONFIG.instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram profil"
                    className="hover:text-white transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube kanal"
                    className="hover:text-white transition-colors"
                  >
                    <Youtube className="w-5 h-5" />
                  </a>
                  <a
                    href={SITE_CONFIG.tiktokUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="TikTok profil"
                    className="hover:text-white transition-colors text-xs font-mono font-bold px-1 border border-stone-600 rounded"
                  >
                    TT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
