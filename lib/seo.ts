import type { Metadata } from 'next';
import { SITE_CONFIG, Language } from './site-config';
import { FAQ_DATA, PACKAGES_DATA } from './portfolio-data';
import { MY_STORY_CONTENT } from './my-story-data';

export type SeoPageKey = 'home' | 'moja-prica';

export interface PageSeoConfig {
  page: SeoPageKey;
  lang: Language;
  htmlLang: Language;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogType: 'website' | 'profile';
  ogLocale: 'sr_RS' | 'en_US';
  alternateLocale: ('sr_RS' | 'en_US')[];
  ogImage: string;
  ogImageWidth: number;
  ogImageHeight: number;
  ogImageAlt: string;
  canonicalUrl?: string;
  ogUrl?: string;
  hreflangAlternates: {
    sr: string;
    'sr-RS': string;
    en: string;
    'x-default': string;
  };
}

/**
 * Vraća verifikovani produkcijski domen samo ako je eksplicitno konfigurisan
 * (npr. putem NEXT_PUBLIC_SITE_URL) i nije lokalni ili privremeni preview URL (*.run.app).
 * Nikada ne izmišlja domen.
 */
export function getVerifiedProductionSiteUrl(rawUrl?: string): string {
  const candidate = (
    rawUrl !== undefined ? rawUrl : process.env.NEXT_PUBLIC_SITE_URL || ''
  ).trim();

  if (!candidate) return '';

  try {
    const parsed = new URL(candidate);
    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return '';
    }
    const host = parsed.hostname.toLowerCase();
    if (
      host === 'localhost' ||
      host === '127.0.0.1' ||
      host.endsWith('.local') ||
      host.endsWith('.run.app')
    ) {
      return '';
    }
    return parsed.origin;
  } catch {
    return '';
  }
}

/**
 * Bezbedno određuje jezik ('sr' ili 'en') iz URL searchParams objekta.
 */
export function resolveLanguageFromSearchParams(
  searchParams?: Record<string, string | string[] | undefined> | null
): Language {
  if (!searchParams) return 'sr';
  const raw = searchParams.lang;
  const value = Array.isArray(raw) ? raw[0] : raw;
  return value === 'en' ? 'en' : 'sr';
}

const SEO_COPY: Record<
  SeoPageKey,
  Record<
    Language,
    {
      title: string;
      description: string;
      ogTitle: string;
      ogDescription: string;
      ogType: 'website' | 'profile';
      ogLocale: 'sr_RS' | 'en_US';
      alternateLocale: ('sr_RS' | 'en_US')[];
      ogImage: string;
      ogImageWidth: number;
      ogImageHeight: number;
      ogImageAlt: string;
    }
  >
> = {
  home: {
    sr: {
      title: 'AMOX Photography & Film — Fotografija i video produkcija',
      description:
        'Autentična fotografija i video produkcija za venčanja, proslave, portrete, događaje i organizacije u Srbiji i regionu. Svaka priča ima svoj kadar.',
      ogTitle: 'AMOX Photography & Film — Fotografija i video produkcija',
      ogDescription:
        'Autentična fotografija i video produkcija za venčanja, proslave, portrete, događaje i organizacije u Srbiji i regionu. Svaka priča ima svoj kadar.',
      ogType: 'website',
      ogLocale: 'sr_RS',
      alternateLocale: ['en_US'],
      ogImage: SITE_CONFIG.images.hero,
      ogImageWidth: 1200,
      ogImageHeight: 800,
      ogImageAlt:
        'AMOX Photography & Film — autentična fotografija i video produkcija',
    },
    en: {
      title: 'AMOX Photography & Film — Photography & Video Production',
      description:
        'Authentic wedding, event, portrait, and documentary photography and video production across Serbia and the region. Every story has its frame.',
      ogTitle: 'AMOX Photography & Film — Photography & Video Production',
      ogDescription:
        'Authentic wedding, event, portrait, and documentary photography and video production across Serbia and the region. Every story has its frame.',
      ogType: 'website',
      ogLocale: 'en_US',
      alternateLocale: ['sr_RS'],
      ogImage: SITE_CONFIG.images.hero,
      ogImageWidth: 1200,
      ogImageHeight: 800,
      ogImageAlt:
        'AMOX Photography & Film — authentic photography and video production',
    },
  },
  'moja-prica': {
    sr: {
      title:
        'Moja priča — Autorski profil i iskustvo | AMOX Photography & Film',
      description:
        'Upoznajte autorski pristup, izabrane filmske, festivalske i izlagačke projekte, kreativni proces i alate iza brenda AMOX Photography & Film.',
      ogTitle:
        'Moja priča — Autorski profil i iskustvo | AMOX Photography & Film',
      ogDescription:
        'Fotografija, video i vizuelne priče: autorski profil, izabrano iskustvo (Obruč, Monaco Yacht Show, Rock Garden, Overload), kreativni proces i alati.',
      ogType: 'profile',
      ogLocale: 'sr_RS',
      alternateLocale: ['en_US'],
      ogImage: SITE_CONFIG.images.about,
      ogImageWidth: 896,
      ogImageHeight: 1200,
      ogImageAlt: 'AMOX Photography & Film — autorski vizuelni arhiv',
    },
    en: {
      title: 'My Story — Author Profile & Experience | AMOX Photography & Film',
      description:
        'Discover the author profile, selected film, festival, and exhibition projects, creative process, and tools behind AMOX Photography & Film.',
      ogTitle:
        'My Story — Author Profile & Experience | AMOX Photography & Film',
      ogDescription:
        'Photography, video, and visual stories: author profile, selected experience (Obruč, Monaco Yacht Show, Rock Garden, Overload), creative process, and tools.',
      ogType: 'profile',
      ogLocale: 'en_US',
      alternateLocale: ['sr_RS'],
      ogImage: SITE_CONFIG.images.about,
      ogImageWidth: 896,
      ogImageHeight: 1200,
      ogImageAlt: 'AMOX Photography & Film — visual archive frame',
    },
  },
};

export function getPageSeoConfig(
  page: SeoPageKey,
  lang: Language,
  rawSiteUrl?: string
): PageSeoConfig {
  const verifiedOrigin = getVerifiedProductionSiteUrl(rawSiteUrl);
  const copy = SEO_COPY[page][lang];
  const basePath = page === 'home' ? '/' : '/moja-prica';
  const srHref = verifiedOrigin ? `${verifiedOrigin}${basePath}` : basePath;
  const enHref = verifiedOrigin
    ? `${verifiedOrigin}${basePath}?lang=en`
    : `${basePath}?lang=en`;
  const activeUrl = lang === 'en' ? enHref : srHref;

  return {
    page,
    lang,
    htmlLang: lang,
    ...copy,
    canonicalUrl: verifiedOrigin ? activeUrl : undefined,
    ogUrl: verifiedOrigin ? activeUrl : undefined,
    hreflangAlternates: {
      sr: srHref,
      'sr-RS': srHref,
      en: enHref,
      'x-default': srHref,
    },
  };
}

export function buildNextMetadata(
  page: SeoPageKey,
  lang: Language,
  rawSiteUrl?: string
): Metadata {
  const cfg = getPageSeoConfig(page, lang, rawSiteUrl);
  const verifiedOrigin = getVerifiedProductionSiteUrl(rawSiteUrl);
  const resolvedOgImageUrl = verifiedOrigin
    ? `${verifiedOrigin}${cfg.ogImage}`
    : cfg.ogImage;

  return {
    ...(verifiedOrigin ? { metadataBase: new URL(verifiedOrigin) } : {}),
    title: cfg.title,
    description: cfg.description,
    openGraph: {
      title: cfg.ogTitle,
      description: cfg.ogDescription,
      type: cfg.ogType,
      locale: cfg.ogLocale,
      alternateLocale: cfg.alternateLocale,
      siteName: SITE_CONFIG.name,
      ...(cfg.ogUrl ? { url: cfg.ogUrl } : {}),
      images: [
        {
          url: resolvedOgImageUrl,
          width: cfg.ogImageWidth,
          height: cfg.ogImageHeight,
          alt: cfg.ogImageAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: cfg.ogTitle,
      description: cfg.ogDescription,
      images: [resolvedOgImageUrl],
    },
    alternates: {
      ...(cfg.canonicalUrl ? { canonical: cfg.canonicalUrl } : {}),
      languages: cfg.hreflangAlternates,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
  };
}

/**
 * Formira relativni URL pri promeni jezika (SR / EN) bez ponovnog učitavanja stranice:
 * - za 'en' postavlja ?lang=en
 * - za 'sr' uklanja parametar lang (čist URL: / ili /moja-prica)
 * - čuva eventualne druge query parametre i #hash fragment.
 */
export function buildLanguageSwitchUrl(
  currentUrl: string,
  newLang: Language
): string {
  try {
    const parsed = new URL(currentUrl, 'http://localhost');
    if (newLang === 'en') {
      parsed.searchParams.set('lang', 'en');
    } else {
      parsed.searchParams.delete('lang');
    }
    const search = parsed.searchParams.toString();
    return `${parsed.pathname}${search ? `?${search}` : ''}${parsed.hash}`;
  } catch {
    return newLang === 'en' ? '/?lang=en' : '/';
  }
}

/**
 * Sinhronizuje <title>, <meta name="description">, OpenGraph, Twitter,
 * og:locale:alternate, og:image:alt, canonical/og:url (samo za potvrđeni produkcijski domen)
 * i <html lang> direktno u klijentskom DOM-u kada korisnik promeni jezik (SR / EN)
 * bez kreiranja dupliranih meta oznaka.
 */
export function syncDocumentSeoMetadata(
  page: SeoPageKey,
  lang: Language,
  rawSiteUrl?: string
): void {
  if (typeof document === 'undefined') return;
  const cfg = getPageSeoConfig(page, lang, rawSiteUrl);

  document.documentElement.lang = cfg.htmlLang;
  document.title = cfg.title;

  const setMetaContent = (selector: string, content: string) => {
    if (typeof document.querySelectorAll === 'function') {
      const elements = Array.from(
        document.querySelectorAll<HTMLMetaElement>(selector)
      );
      if (elements.length > 0) {
        elements[0].setAttribute('content', content);
        for (let i = 1; i < elements.length; i += 1) {
          elements[i].remove();
        }
        return;
      }
    }
    const el = document.querySelector<HTMLMetaElement>(selector);
    if (el) {
      el.setAttribute('content', content);
    }
  };

  setMetaContent('meta[name="description"]', cfg.description);
  setMetaContent('meta[property="og:title"]', cfg.ogTitle);
  setMetaContent('meta[property="og:description"]', cfg.ogDescription);
  setMetaContent('meta[property="og:locale"]', cfg.ogLocale);
  if (cfg.alternateLocale.length > 0) {
    setMetaContent(
      'meta[property="og:locale:alternate"]',
      cfg.alternateLocale[0]
    );
  }
  setMetaContent('meta[property="og:image:alt"]', cfg.ogImageAlt);
  setMetaContent('meta[name="twitter:title"]', cfg.ogTitle);
  setMetaContent('meta[name="twitter:description"]', cfg.ogDescription);
  setMetaContent('meta[name="twitter:image:alt"]', cfg.ogImageAlt);

  if (cfg.canonicalUrl) {
    const canonicalEl = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]'
    );
    if (canonicalEl) {
      canonicalEl.setAttribute('href', cfg.canonicalUrl);
    }
  }

  if (cfg.ogUrl) {
    setMetaContent('meta[property="og:url"]', cfg.ogUrl);
  }
}

/**
 * Generiše Schema.org JSON-LD strukturirane podatke isključivo na osnovu
 * postojećeg, potvrđenog sadržaja sajta (bez izmišljenih lokacija, ocena ili domena).
 */
export function buildPageJsonLd(
  page: SeoPageKey,
  lang: Language,
  rawSiteUrl?: string
): Record<string, unknown> {
  const verifiedOrigin = getVerifiedProductionSiteUrl(rawSiteUrl);
  const cfg = getPageSeoConfig(page, lang, rawSiteUrl);

  if (page === 'moja-prica') {
    const story = MY_STORY_CONTENT[lang];
    return {
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      inLanguage: lang,
      name: cfg.title,
      description: cfg.description,
      ...(cfg.canonicalUrl ? { url: cfg.canonicalUrl } : {}),
      mainEntity: {
        '@type': 'Organization',
        name: SITE_CONFIG.name,
        alternateName: `${SITE_CONFIG.name} — ${SITE_CONFIG.subtitle}`,
        description: story.hero.intro,
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.phone,
        sameAs: [
          SITE_CONFIG.instagramUrl,
          SITE_CONFIG.youtubeUrl,
          SITE_CONFIG.tiktokUrl,
        ],
        knowsAbout: story.creativeProcess.columns.map((col) => col.areaTitle),
      },
    };
  }

  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'ProfessionalService',
        name: SITE_CONFIG.name,
        alternateName: `${SITE_CONFIG.name} — ${SITE_CONFIG.subtitle}`,
        inLanguage: lang,
        description: cfg.description,
        slogan: SITE_CONFIG.slogan[lang],
        email: SITE_CONFIG.email,
        telephone: SITE_CONFIG.phone,
        ...(verifiedOrigin ? { url: verifiedOrigin } : {}),
        image: verifiedOrigin
          ? `${verifiedOrigin}${SITE_CONFIG.images.hero}`
          : SITE_CONFIG.images.hero,
        sameAs: [
          SITE_CONFIG.instagramUrl,
          SITE_CONFIG.youtubeUrl,
          SITE_CONFIG.tiktokUrl,
        ],
        knowsLanguage: ['sr', 'en'],
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name:
            lang === 'sr'
              ? 'Fotografske i video usluge'
              : 'Photography & Video Services',
          itemListElement: PACKAGES_DATA.map((pkg) => ({
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: pkg.title[lang],
              description: pkg.description[lang],
            },
          })),
        },
      },
      {
        '@type': 'FAQPage',
        inLanguage: lang,
        mainEntity: FAQ_DATA.map((faq) => ({
          '@type': 'Question',
          name: faq.question[lang],
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer[lang],
          },
        })),
      },
    ],
  };
}
