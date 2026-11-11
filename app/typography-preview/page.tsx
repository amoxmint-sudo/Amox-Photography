import type { Metadata } from 'next';
import { Playfair_Display, DM_Sans, MonteCarlo } from 'next/font/google';
import TypographyPreviewClient from './TypographyPreviewClient';

const playfair = Playfair_Display({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-preview-playfair',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '500', '600'],
  variable: '--font-preview-dm-sans',
  display: 'swap',
});

const monteCarlo = MonteCarlo({
  subsets: ['latin', 'latin-ext'],
  weight: ['400'],
  variable: '--font-preview-montecarlo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Typography Preview · AMOX Photography & Film',
  description:
    'Privremeni vizuelni test tipografije (Playfair Display, DM Sans, MonteCarlo) za AMOX Photography & Film.',
  robots: {
    index: false,
    follow: false,
  },
};

export default function TypographyPreviewPage() {
  return (
    <div className={`${playfair.variable} ${dmSans.variable} ${monteCarlo.variable}`}>
      <TypographyPreviewClient
        playfairClass={playfair.className}
        dmSansClass={dmSans.className}
        monteCarloClass={monteCarlo.className}
      />
    </div>
  );
}
