import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { SITE_CONFIG } from '@/lib/site-config';

const serifFont = Cormorant_Garamond({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: `${SITE_CONFIG.name} — ${SITE_CONFIG.subtitle}`,
  description: `${SITE_CONFIG.name} — ${SITE_CONFIG.slogan.sr} Zvanični portfolio za fotografske i video usluge u Srbiji i regionu.`,
  openGraph: {
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.subtitle}`,
    description: SITE_CONFIG.slogan.sr,
    type: 'website',
    locale: 'sr_RS',
    alternateLocale: ['en_US'],
    siteName: SITE_CONFIG.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_CONFIG.name} — ${SITE_CONFIG.subtitle}`,
    description: SITE_CONFIG.slogan.sr,
  },
  alternates: {
    languages: {
      'sr': '/?lang=sr',
      'en': '/?lang=en',
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="sr" className={`${serifFont.variable} ${sansFont.variable}`}>
      <body className="min-h-screen bg-[#FAF8F5] text-[#211B17] font-sans antialiased selection:bg-[#E4D7C8] selection:text-[#211B17]">
        {children}
      </body>
    </html>
  );
}
