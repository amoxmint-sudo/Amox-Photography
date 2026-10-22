export const SITE_CONFIG = {
  name: 'AMOX PHOTOGRAPHY',
  subtitle: 'Photography & Film',
  slogan: {
    sr: 'Svaka priča ima svoj kadar.',
    en: 'Every Story Has Its Frame.',
  },
  siteUrl: process.env.APP_URL || '',
  email: 'amoxmint@gmail.com',
  phone: '+381629247415',
  whatsappUrl: 'https://wa.me/381629247415',
  instagramUrl: 'https://www.instagram.com/amox.photography/',
  tiktokUrl: 'https://www.tiktok.com/@amox.ph',
  youtubeUrl: 'https://www.youtube.com/@amoxphotography',
  picTimeClientUrl: 'https://amoxmint.pic-time.com/client',
  serviceArea: {
    sr: 'Dostupan širom Srbije i u susednim zemljama. Ostale destinacije po dogovoru.',
    en: 'Available throughout Serbia and neighboring countries. Other destinations by arrangement.',
  },
  aboutText: {
    sr: 'Verujem da se najlepše priče kriju u detaljima i emocijama koje često prolaze neprimećeno. Kroz fotografiju i video stvaram autentične vizuelne priče, spajajući iskrene trenutke, elegantan pristup i pažljivo komponisane kadrove.',
    en: 'I believe the most beautiful stories live in the details and emotions that often go unnoticed. Through photography and film, I create authentic visual stories that combine genuine moments, an elegant approach, and carefully composed frames.',
  },
  images: {
    hero: '/images/hero_editorial_cover_1792654919855.jpg',
    about: '/images/about_photographer_portrait_1792654920192.jpg',
    wedding: '/images/portfolio_wedding_1792654920831.jpg',
    event: '/images/portfolio_event_1792654921938.jpg',
    portrait: '/images/portfolio_portrait_1792654921293.jpg',
    ngo: '/images/portfolio_ngo_1792654950876.jpg',
  },
} as const;

export type Language = 'sr' | 'en';
