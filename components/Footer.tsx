'use client';

import React from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { SITE_CONFIG, Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { Logo } from './Logo';
import { Mail, Phone, Instagram, Youtube, ExternalLink } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

const FOOTER_SENJA_WIDGET_ID = 'ef254f66-f140-4ed3-98b4-1a62c4157d44';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = translations[lang];
  const currentYear = new Date().getFullYear();
  const myStoryHref = lang === 'en' ? '/moja-prica?lang=en' : '/moja-prica';

  return (
    <footer className="bg-[#F3EFE9] border-t border-[#EAE3D9] text-[#211B17] pt-16 pb-12">
      <Script
        id={`senja-platform-${FOOTER_SENJA_WIDGET_ID}`}
        src={`https://widget.senja.io/widget/${FOOTER_SENJA_WIDGET_ID}/platform.js`}
        strategy="afterInteractive"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#E0D7CB]">
          {/* Brand & Editorial Territory */}
          <EditorialReveal variant="text" className="lg:col-span-5 space-y-4">
            <Logo lang={lang} />
            <p className="text-xs text-[#6E645A] leading-relaxed max-w-sm pt-2">
              {SITE_CONFIG.slogan[lang]}
            </p>
            <div className="pt-2">
              <span className="text-[10px] tracking-[0.2em] uppercase font-mono text-[#8C5835] block mb-1">
                {lang === 'sr' ? 'Područje delovanja' : 'Service Territory'}
              </span>
              <p className="text-xs text-[#524941] leading-relaxed max-w-sm">
                {SITE_CONFIG.serviceArea[lang]}
              </p>
            </div>
          </EditorialReveal>

          {/* Navigation Links */}
          <EditorialReveal
            variant="text"
            delay={0.08}
            className="lg:col-span-3 space-y-3"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C5835] block mb-3">
              {t.footer.navigation}
            </span>
            <div className="grid grid-cols-2 gap-y-2.5 gap-x-4 text-xs text-[#6E645A]">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.home}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.portfolio}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('services')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.services}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('events')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.events}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portraits')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.portraits}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('video-production')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.videoProduction}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('video-editing')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.videoEditing}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('ngo')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.ngo}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.pricing}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.about}
              </button>
              <Link
                href={myStoryHref}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.myStory}
              </Link>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200"
              >
                {t.nav.faq}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#211B17] hover:translate-x-0.5 transition-all duration-200 font-semibold"
              >
                {t.nav.contact}
              </button>
            </div>
          </EditorialReveal>

          {/* Direct Contact & Pic-Time */}
          <EditorialReveal
            variant="text"
            delay={0.16}
            className="lg:col-span-4 space-y-4"
          >
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C5835] block mb-2">
              {t.footer.contact}
            </span>
            <div className="space-y-2.5 text-xs text-[#524941]">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 hover:text-[#8C5835] hover:translate-x-0.5 transition-all duration-200"
              >
                <Mail className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <div>
                <a
                  href={SITE_CONFIG.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 hover:text-[#8C5835] hover:translate-x-0.5 transition-all duration-200"
                >
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{SITE_CONFIG.phone} (WhatsApp)</span>
                </a>
              </div>

              <div className="pt-2">
                <a
                  href={SITE_CONFIG.picTimeClientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link inline-flex items-center gap-1.5 text-[#8C5835] hover:text-[#211B17] font-medium pb-0.5 transition-colors"
                >
                  <span>{t.footer.clientGallery}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Social channels icons */}
            <div className="pt-2 flex items-center gap-3 text-[#6E645A]">
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={
                  lang === 'sr' ? 'Instagram profil' : 'Instagram profile'
                }
                className="p-1.5 rounded hover:text-[#211B17] hover:bg-stone-200/60 hover:-translate-y-0.5 transition-all duration-200"
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
                className="p-1.5 rounded hover:text-[#211B17] hover:bg-stone-200/60 hover:-translate-y-0.5 transition-all duration-200"
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
                className="p-1.5 rounded hover:text-[#211B17] hover:bg-stone-200/60 hover:-translate-y-0.5 transition-all duration-200 text-xs font-mono font-bold"
              >
                TT
              </a>
            </div>

            {/* Senja review widget in existing empty space below social icons */}
            <div
              className="senja-embed block w-full max-w-full overflow-hidden"
              data-id={FOOTER_SENJA_WIDGET_ID}
              data-mode="shadow"
              data-lazyload="false"
            />
          </EditorialReveal>
        </div>

        {/* Bottom copyright line */}
        <EditorialReveal
          variant="fade-in"
          delay={0.24}
          className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#85776B] gap-4"
        >
          <p>
            © {currentYear} {SITE_CONFIG.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>{t.footer.locationBadge}</span>
          </div>
        </EditorialReveal>
      </div>
    </footer>
  );
}
