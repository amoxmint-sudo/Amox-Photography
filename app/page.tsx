'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { PortfolioItem, PORTFOLIO_ITEMS } from '@/lib/portfolio-data';
import { TopBar } from '@/components/TopBar';
import { FullscreenNav } from '@/components/FullscreenNav';
import { HeroSection } from '@/components/HeroSection';
import { BrandIntro } from '@/components/BrandIntro';
import { ServicesOverview } from '@/components/ServicesOverview';
import { PortfolioSection } from '@/components/PortfolioSection';
import { AboutSection } from '@/components/AboutSection';
import { PackagesSection } from '@/components/PackagesSection';
import { TestimonialsSection } from '@/components/TestimonialsSection';
import { FAQSection } from '@/components/FAQSection';
import { ContactSection } from '@/components/ContactSection';
import { Footer } from '@/components/Footer';
import { Lightbox } from '@/components/Lightbox';
import { FloatingWhatsApp } from '@/components/FloatingWhatsApp';
import { Preloader } from '@/components/Preloader';

export default function HomePage() {
  const [lang, setLang] = useState<Language>('sr');

  // Synchronize language from URL query or localStorage safely after mount
  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const urlLang = urlParams.get('lang');
      const stored = localStorage.getItem('amox_language');
      const target = (urlLang === 'en' || urlLang === 'sr') ? urlLang : (stored === 'en' || stored === 'sr') ? stored : null;
      if (target && target !== 'sr') {
        const timer = setTimeout(() => {
          setLang(target as Language);
          document.documentElement.lang = target;
        }, 10);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, []);

  // Sync document.documentElement.lang with active language
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedService, setPreselectedService] = useState<string>('');

  // Lightbox state
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    document.documentElement.lang = newLang;
    try {
      localStorage.setItem('amox_language', newLang);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', newLang);
      window.history.replaceState({}, '', url.toString());
    } catch {
      // ignore
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackageForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    scrollToSection('contact');
  };

  const handleOpenPhotoFromService = (imagePath: string, title: string, category: string) => {
    const customItem: PortfolioItem = {
      id: `service-${category}`,
      category: category as any,
      title: { sr: title, en: title },
      subtitle: { sr: 'AMOX Photography & Film', en: 'AMOX Photography & Film' },
      imagePath,
      aspectRatio: 'landscape',
      alt: { sr: title, en: title },
      isPlaceholder: true,
    };
    setLightboxItems([customItem]);
    setLightboxIndex(0);
    setLightboxOpen(true);
  };

  const handleOpenGalleryLightbox = (items: PortfolioItem[], index: number) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
    // Return focus to menu trigger button
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 50);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF8F5] text-[#211B17]">
      {/* 1. Preloader */}
      <Preloader />

      {/* 2. Sticky Top Bar */}
      <TopBar
        lang={lang}
        onLanguageChange={handleLanguageChange}
        isMenuOpen={isMenuOpen}
        onToggleMenu={() => setIsMenuOpen((prev) => !prev)}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        menuButtonRef={menuButtonRef}
      />

      {/* 3. Fullscreen Navigation Modal */}
      <FullscreenNav
        isOpen={isMenuOpen}
        onClose={handleCloseMenu}
        lang={lang}
        onLanguageChange={handleLanguageChange}
        activeSection={activeSection}
        onNavigate={scrollToSection}
      />

      {/* 4. Main Page Content */}
      <main id="main-content" className="flex-1">
        {/* Section 1: Hero Section */}
        <HeroSection
          lang={lang}
          onNavigatePortfolio={() => scrollToSection('portfolio')}
          onNavigateContact={() => scrollToSection('contact')}
          onScrollDown={() => scrollToSection('about')}
        />

        {/* Section 2: Brand Introduction & Approach Overview */}
        <BrandIntro
          lang={lang}
          onNavigateCategory={(catId) => scrollToSection(catId)}
          onNavigatePortfolio={() => scrollToSection('portfolio')}
          onNavigateContact={() => scrollToSection('contact')}
        />

        {/* Section 3: About Me */}
        <AboutSection
          lang={lang}
          onNavigatePortfolio={() => scrollToSection('portfolio')}
          onNavigateContact={() => scrollToSection('contact')}
        />

        {/* Section 4: Visual Services Detailed Sections (Weddings, Events, Portraits, Video, NGO) */}
        <ServicesOverview
          lang={lang}
          onSelectServiceForInquiry={handleSelectPackageForInquiry}
          onOpenPhoto={handleOpenPhotoFromService}
        />

        {/* Section 5: Filterable Portfolio Gallery & Video Showreel */}
        <PortfolioSection
          lang={lang}
          onOpenLightbox={handleOpenGalleryLightbox}
        />

        {/* Section 6: Packages & Pricing */}
        <PackagesSection
          lang={lang}
          onSelectPackage={handleSelectPackageForInquiry}
        />

        {/* Section 7: Client Testimonials */}
        <TestimonialsSection
          lang={lang}
          onNavigateContact={() => scrollToSection('contact')}
        />

        {/* Section 8: FAQ Accordion */}
        <FAQSection lang={lang} />

        {/* Section 9: Contact Form & Inquiries */}
        <ContactSection
          lang={lang}
          preselectedService={preselectedService}
        />
      </main>

      {/* 5. Minimalist Footer */}
      <Footer lang={lang} onNavigate={scrollToSection} />

      {/* 6. Discreet Floating WhatsApp Button */}
      <FloatingWhatsApp lang={lang} />

      {/* 7. Fullscreen Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        lang={lang}
      />
    </div>
  );
}
