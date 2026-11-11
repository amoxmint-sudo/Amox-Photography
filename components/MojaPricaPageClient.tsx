'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Language } from '@/lib/site-config';
import {
  buildLanguageSwitchUrl,
  buildPageJsonLd,
  syncDocumentSeoMetadata,
} from '@/lib/seo';
import { TopBar } from '@/components/TopBar';
import { FullscreenNav } from '@/components/FullscreenNav';
import { MyStoryPageContent } from '@/components/MyStoryPageContent';
import { Footer } from '@/components/Footer';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Preloader } from '@/components/Preloader';

interface MojaPricaPageClientProps {
  initialLang?: Language;
}

export function MojaPricaPageClient({
  initialLang = 'sr',
}: MojaPricaPageClientProps) {
  const router = useRouter();
  const [lang, setLang] = useState<Language>(initialLang);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  // Synchronize language from URL query or localStorage safely after mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const stored = localStorage.getItem('amox_language');
      const target =
        urlLang === 'en' || urlLang === 'sr'
          ? urlLang
          : stored === 'en' || stored === 'sr'
          ? stored
          : null;
      if (target && target !== initialLang) {
        const timer = setTimeout(() => {
          setLang(target as Language);
          syncDocumentSeoMetadata('moja-prica', target as Language);
        }, 10);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, [initialLang]);

  useEffect(() => {
    syncDocumentSeoMetadata('moja-prica', lang);
  }, [lang]);

  const jsonLd = useMemo(() => buildPageJsonLd('moja-prica', lang), [lang]);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    syncDocumentSeoMetadata('moja-prica', newLang);
    try {
      localStorage.setItem('amox_language', newLang);
      const nextUrl = buildLanguageSwitchUrl(window.location.href, newLang);
      History.prototype.replaceState.call(
        window.history,
        window.history.state,
        '',
        nextUrl
      );
    } catch {
      // ignore
    }
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 50);
  };

  const handleNavigateHomeSection = (sectionId: string) => {
    const query = lang === 'en' ? '?lang=en' : '';
    if (sectionId === 'home') {
      router.push(`/${query}`);
    } else if (sectionId === 'moja-prica') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      router.push(`/${query}#${sectionId}`);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#1B1613] text-[#F5F0E8]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Preloader (same component and behavior as HomePage) */}
      <Preloader />

      {/* 2. Sticky Top Bar */}
      <TopBar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        activeSection="moja-prica"
        onNavigate={handleNavigateHomeSection}
        menuButtonRef={menuButtonRef}
      />

      {/* Fullscreen Navigation Modal */}
      <FullscreenNav
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeSection="moja-prica"
        onNavigate={handleNavigateHomeSection}
      />

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        <MyStoryPageContent
          lang={lang}
          onNavigateHomeSection={handleNavigateHomeSection}
        />
      </main>

      {/* Footer */}
      <Footer lang={lang} onNavigate={handleNavigateHomeSection} />

      {/* Discreet Floating WhatsApp Button */}
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
