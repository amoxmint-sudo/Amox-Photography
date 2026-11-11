'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Language } from '@/lib/site-config';
import { PortfolioItem, PORTFOLIO_ITEMS } from '@/lib/portfolio-data';
import { PortfolioCategoryId } from '@/lib/photo-categories';
import { allocatePagePhotos } from '@/lib/photo-selection';
import {
  buildLanguageSwitchUrl,
  buildPageJsonLd,
  syncDocumentSeoMetadata,
} from '@/lib/seo';
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

interface HomePageClientProps {
  initialLang?: Language;
}

export function HomePageClient({ initialLang = 'sr' }: HomePageClientProps) {
  const [lang, setLang] = useState<Language>(initialLang);

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
          syncDocumentSeoMetadata('home', target as Language);
        }, 10);
        return () => clearTimeout(timer);
      }
    } catch {
      // ignore
    }
  }, [initialLang]);

  // Sync document.documentElement.lang and live SEO metadata with active language
  useEffect(() => {
    syncDocumentSeoMetadata('home', lang);
  }, [lang]);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [preselectedService, setPreselectedService] = useState<string>('');
  const [preselectionVersion, setPreselectionVersion] = useState<number>(0);

  // Discovered portfolio items & Lightbox state
  const [discoveredItems, setDiscoveredItems] =
    useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxItems, setLightboxItems] =
    useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  // Stabilan nasumičan seed za trenutnu posetu (generiše se jednom po učitavanju stranice)
  const [visitSeed, setVisitSeed] = useState<number>(1);
  const hasGeneratedSeedRef = useRef(false);

  useEffect(() => {
    if (hasGeneratedSeedRef.current) return;
    hasGeneratedSeedRef.current = true;
    const randomSeed = Math.floor(Math.random() * 2147483646) + 2;
    const timer = setTimeout(() => {
      setVisitSeed(randomSeed);
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const pagePhotoSelection = useMemo(
    () => allocatePagePhotos(discoveredItems, visitSeed),
    [discoveredItems, visitSeed]
  );

  const jsonLd = useMemo(() => buildPageJsonLd('home', lang), [lang]);

  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleLanguageChange = (newLang: Language) => {
    setLang(newLang);
    syncDocumentSeoMetadata('home', newLang);
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

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPackageForInquiry = (serviceTitle: string) => {
    setPreselectedService(serviceTitle);
    setPreselectionVersion((v) => v + 1);
    scrollToSection('contact');
  };

  const handleOpenPhotoFromService = (
    imagePath: string,
    title: string,
    category: string
  ) => {
    const matchingCategoryItems =
      category === '18-rodjendani'
        ? discoveredItems.filter(
            (item) =>
              item.category === '18-rodjendani' ||
              item.category === '1-rodjendani' ||
              item.category === 'krstenja'
          )
        : discoveredItems.filter((item) => item.category === category);

    if (matchingCategoryItems.length > 0) {
      const startIdx = Math.max(
        0,
        matchingCategoryItems.findIndex((item) => item.imagePath === imagePath)
      );
      setLightboxItems(matchingCategoryItems);
      setLightboxIndex(startIdx);
      setLightboxOpen(true);
      return;
    }

    const customItem: PortfolioItem = {
      id: `service-${category}`,
      category: (category as PortfolioCategoryId) || 'svadbe',
      title: { sr: title, en: title },
      subtitle: {
        sr: 'AMOX Photography & Film',
        en: 'AMOX Photography & Film',
      },
      imagePath,
      aspectRatio: 'landscape',
      alt: { sr: title, en: title },
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
    setTimeout(() => {
      menuButtonRef.current?.focus();
    }, 50);
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-[#FAF8F5] text-[#211B17]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

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
          selectedCovers={pagePhotoSelection.brandIntroCoverBySlug}
        />

        {/* Section 3: About Me */}
        <AboutSection
          lang={lang}
          onNavigatePortfolio={() => scrollToSection('portfolio')}
        />

        {/* Section 4: Visual Services Detailed Sections */}
        <ServicesOverview
          lang={lang}
          onSelectServiceForInquiry={handleSelectPackageForInquiry}
          onOpenPhoto={handleOpenPhotoFromService}
          selectedPhotos={pagePhotoSelection.servicesBySlug}
        />

        {/* Section 5: Filterable Portfolio Gallery (7 Categories) */}
        <PortfolioSection
          lang={lang}
          visitSeed={visitSeed}
          onOpenLightbox={handleOpenGalleryLightbox}
          onItemsDiscovered={setDiscoveredItems}
        />

        {/* Section 6: Packages & Pricing */}
        <PackagesSection
          lang={lang}
          onSelectPackage={handleSelectPackageForInquiry}
        />

        {/* Section 7: Client Testimonials */}
        <TestimonialsSection lang={lang} />

        {/* Section 8: FAQ Accordion */}
        <FAQSection lang={lang} />

        {/* Section 9: Contact Form & Inquiries */}
        <ContactSection
          lang={lang}
          preselectedService={preselectedService}
          preselectionVersion={preselectionVersion}
        />
      </main>

      {/* 5. Footer */}
      <Footer lang={lang} onNavigate={scrollToSection} />

      {/* 6. Lightbox Modal */}
      <Lightbox
        isOpen={lightboxOpen}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
        lang={lang}
      />

      {/* 7. Discreet Floating WhatsApp Button */}
      <FloatingWhatsApp lang={lang} />
    </div>
  );
}
