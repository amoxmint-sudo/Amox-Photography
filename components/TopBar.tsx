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
    <header className="sticky top-0 z-40 w-full bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#EAE3D9] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Zone 1: Single text element wordmark */}
        <div className="shrink-0">
          <Logo lang={lang} onClick={() => onNavigate('home')} />
        </div>

        {/* Zone 2: 5 concise single-line nav links with fluid editorial underline */}
        <nav
          aria-label="Glavna navigacija"
          className="hidden md:flex items-center gap-6 lg:gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#6E645A]"
        >
          <button
            type="button"
            onClick={() => onNavigate('portfolio')}
            className={`editorial-link whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#211B17] py-1.5 ${
              activeSection === 'portfolio' ? 'text-[#211B17] font-semibold' : ''
            }`}
          >
            {t.nav.portfolio}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('services')}
            className={`editorial-link whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#211B17] py-1.5 ${
              activeSection === 'services' ? 'text-[#211B17] font-semibold' : ''
            }`}
          >
            {t.nav.services}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('pricing')}
            className={`editorial-link whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#211B17] py-1.5 ${
              activeSection === 'pricing' ? 'text-[#211B17] font-semibold' : ''
            }`}
          >
            {t.nav.pricing}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`editorial-link whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#211B17] py-1.5 ${
              activeSection === 'about' ? 'text-[#211B17] font-semibold' : ''
            }`}
          >
            {t.nav.about}
          </button>
          <button
            type="button"
            onClick={() => onNavigate('contact')}
            className={`editorial-link whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#211B17] py-1.5 ${
              activeSection === 'contact' ? 'text-[#211B17] font-semibold' : ''
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
            layoutScope="topbar"
          />

          {/* Creative 3-line hamburger turning into X */}
          <button
            ref={menuButtonRef}
            type="button"
            onClick={onToggleMenu}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? t.nav.closeMenu : t.nav.menu}
            className="group flex items-center gap-2.5 p-2 -mr-1 text-[#211B17] hover:text-[#8C5835] active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
          >
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium hidden sm:inline">
              {isMenuOpen ? t.nav.closeMenu : t.nav.menu}
            </span>
            <div className="w-5 h-4 relative flex flex-col justify-between py-0.5">
              <span
                className={`w-5 h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  isMenuOpen
                    ? 'rotate-45 translate-y-[5.5px]'
                    : 'group-hover:w-3.5 group-hover:translate-x-1.5'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-current transition-all duration-200 ease-out ${
                  isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`w-5 h-[1.5px] bg-current transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  isMenuOpen
                    ? '-rotate-45 -translate-y-[5.5px]'
                    : 'group-hover:w-4'
                }`}
              />
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
