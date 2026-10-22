'use client';

import React from 'react';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';

interface TopBarProps {
  lang: Language;
  onLanguageChange: (lang: Language) => void;
  isMenuOpen: boolean;
  onToggleMenu: () => void;
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  menuButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export function TopBar({
  lang,
  onLanguageChange,
  isMenuOpen,
  onToggleMenu,
  activeSection,
  onNavigate,
  menuButtonRef,
}: TopBarProps) {
  const t = translations[lang];

  return (
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="shrink-0">
          <Logo onClick={() => onNavigate('home')} />
        </div>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav
          aria-label="Glavna navigacija"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#6E645A]"
        >
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#211B17] py-1 ${
              activeSection === 'portfolio' ? 'text-[#211B17] font-semibold border-b border-[#8C5835]' : ''
            }`}
          >
            {t.nav.portfolio}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('weddings')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#211B17] py-1 ${
              activeSection === 'weddings' ? 'text-[#211B17] font-semibold border-b border-[#8C5835]' : ''
            }`}
          >
            {t.nav.weddings}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pricing')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#211B17] py-1 ${
              activeSection === 'pricing' ? 'text-[#211B17] font-semibold border-b border-[#8C5835]' : ''
            }`}
          >
            {t.nav.pricing}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#211B17] py-1 ${
              activeSection === 'about' ? 'text-[#211B17] font-semibold border-b border-[#8C5835]' : ''
            }`}
          >
            {t.nav.about}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`whitespace-nowrap shrink-0 transition-colors hover:text-[#211B17] py-1 ${
              activeSection === 'contact' ? 'text-[#211B17] font-semibold border-b border-[#8C5835]' : ''
            }`}
          >
            {t.nav.contact}
          </button>
        </nav>

        {/* Zone 3: Language Switcher + Animated 3-line Menu Button */}
        <div className="flex items-center gap-4 sm:gap-6 shrink-0">
          <LanguageSwitcher
            currentLang={lang}
            onLanguageChange={onLanguageChange}
          />

          {/* Creative 3-line hamburger turning into X */}
          <button
            ref={menuButtonRef as any}
            type="button"
            onClick={onToggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.menu}
            className="group flex items-center gap-2 p-2 -mr-1 text-[#211B17] hover:text-[#8C5835] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:inline">
              {isMenuOpen ? t.nav.closeMenu : t.nav.menu}
            </span>
            <div className="w-5 h-4 relative flex flex-col justify-between py-0.5">
              <span
                className={`w-5 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  isMenuOpen ? 'rotate-45 translate-y-[5.5px]' : ''
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-current transition-all duration-200 ${
                  isMenuOpen ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-current transition-all duration-300 origin-center ${
                  isMenuOpen ? '-rotate-45 -translate-y-[5.5px]' : ''
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
