export const SITE_CONFIG = {
  name: 'AMOX PHOTOGRAPHY',
  subtitle: 'Photography & Film',
  slogan: {
    sr: 'Svaka priča ima svoj kadar.',
    en: 'Every Story Has Its Frame.',
  },
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || '',
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
    sr: '„Kamera je samo alat. Ono što zaista pravi razliku jeste poverenje između čoveka iza objektiva i ljudi ispred njega.“',
    en: '“The camera is only a tool. What truly makes the difference is the trust between the person behind the lens and the people in front of it.”',
  },
  images: {
    hero: '/photos/portreti/AMX04056.jpg',
    about: '/images/about_photographer_portrait_1792654920192.jpg',
    wedding: '/photos/svadbe/AMX03291-Edit.jpg',
    event: '/photos/18-rodjendani/AMX09846.jpg',
    portrait: '/images/portfolio_portrait_1792654921293.jpg',
    ngo: '/images/portfolio_ngo_1792654950876.jpg',
  },
} as const;

export type Language = 'sr' | 'en';
