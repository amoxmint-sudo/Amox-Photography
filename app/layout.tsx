import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { buildNextMetadata } from '@/lib/seo';

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
  ...buildNextMetadata('home', 'sr', 'https://amoxphotography.com'),
  metadataBase: new URL('https://amoxphotography.com'),
  icons: {
    icon: [{ url: '/favicon.png', type: 'image/png' }],
    shortcut: ['/favicon.png'],
    apple: [{ url: '/favicon.png', type: 'image/png' }],
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
