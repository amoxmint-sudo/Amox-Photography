'use client';

import React from 'react';
import { SITE_CONFIG, Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { Logo } from './Logo';
import { Mail, Phone, Instagram, Youtube, ExternalLink } from 'lucide-react';

interface FooterProps {
  lang: Language;
  onNavigate: (sectionId: string) => void;
}

export function Footer({ lang, onNavigate }: FooterProps) {
  const t = translations[lang];
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#F3EFE9] border-t border-[#EAE3D9] text-[#211B17] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-[#E0D7CB]">
          {/* Brand & Editorial Territory */}
          <div className="lg:col-span-5 space-y-4">
            <Logo />
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
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C5835] block mb-3">
              {t.footer.navigation}
            </span>
            <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs text-[#6E645A]">
              <button
                type="button"
                onClick={() => onNavigate('home')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.home}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portfolio')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.portfolio}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('weddings')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.weddings}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('events')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.events}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('portraits')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.portraits}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('video')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.video}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('ngo')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.ngo}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('pricing')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.pricing}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('about')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.about}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('faq')}
                className="text-left hover:text-[#211B17] transition-colors"
              >
                {t.nav.faq}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#211B17] transition-colors font-semibold"
              >
                {t.nav.contact}
              </button>
            </div>
          </div>

          {/* Direct Contact & Pic-Time */}
          <div className="lg:col-span-4 space-y-4">
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#8C5835] block mb-2">
              {t.footer.contact}
            </span>
            <div className="space-y-2 text-xs text-[#524941]">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 hover:text-[#8C5835] transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#8C5835] shrink-0" />
                <span>{SITE_CONFIG.email}</span>
              </a>

              <a
                href={SITE_CONFIG.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#8C5835] transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>{SITE_CONFIG.phone} (WhatsApp)</span>
              </a>

              <div className="pt-2">
                <a
                  href={SITE_CONFIG.picTimeClientUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[#8C5835] hover:text-[#211B17] font-medium transition-colors"
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
                aria-label="Instagram profil"
                className="p-1.5 rounded hover:text-[#211B17] hover:bg-stone-200/60 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube kanal"
                className="p-1.5 rounded hover:text-[#211B17] hover:bg-stone-200/60 transition-colors"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.tiktokUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok profil"
                className="p-1.5 rounded hover:text-[#211B17] hover:bg-stone-200/60 transition-colors text-xs font-mono font-bold"
              >
                TT
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#85776B] gap-4">
          <p>
            © {currentYear} {SITE_CONFIG.name}. {t.footer.rights}
          </p>
          <div className="flex items-center gap-4 text-[11px] font-mono">
            <span>BEOGRAD · SRBIJA · REGION</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
