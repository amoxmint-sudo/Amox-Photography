import { SITE_CONFIG } from './site-config';
import {
  PortfolioCategoryId,
  PHOTO_GALLERY_CATEGORIES,
  PhotoCategoryConfig,
  isValidPhotoFilename,
  sortPhotoFilenames,
  inferAspectRatioFromFilename,
} from './photo-categories';
import manifestData from './photos-manifest.json';

export interface PortfolioItem {
  id: string;
  category: PortfolioCategoryId;
  title: {
    sr: string;
    en: string;
  };
  subtitle: {
    sr: string;
    en: string;
  };
  imagePath: string;
  aspectRatio: 'landscape' | 'portrait' | 'square';
  width?: number;
  height?: number;
  alt: {
    sr: string;
    en: string;
  };
  isPlaceholder?: boolean;
}

export interface PhotoDimensions {
  width: number;
  height: number;
}

export type ServiceInquiryKey =
  | 'weddings'
  | 'events'
  | 'portraits'
  | 'video-production'
  | 'video-editing'
  | 'ngo'
  | 'corporate'
  | 'other';

export interface PackageItem {
  id: string;
  serviceKey: ServiceInquiryKey;
  title: {
    sr: string;
    en: string;
  };
  description: {
    sr: string;
    en: string;
  };
  features: {
    sr: string[];
    en: string[];
  };
  note: {
    sr: string;
    en: string;
  };
}

export interface FAQItem {
  id: string;
  question: {
    sr: string;
    en: string;
  };
  answer: {
    sr: string;
    en: string;
  };
}

export interface PortfolioServiceCategory {
  id: string;
  slug: string;
  title: { sr: string; en: string };
  shortDesc: { sr: string; en: string };
  ctaLabel: { sr: string; en: string };
  coverImage: string;
}

/**
 * Usluge i oblasti rada za prikaz u uvodnom pregledu usluga (BrandIntro)
 */
export const PORTFOLIO_CATEGORIES: PortfolioServiceCategory[] = [
  {
    id: 'weddings',
    slug: 'weddings',
    title: { sr: 'Venčanja', en: 'Weddings' },
    shortDesc: {
      sr: 'Celodnevna priča o vama i vašim najbližima — ispričana spontano, sa estetikom modnog editorijala i toplinom porodičnog arhiva.',
      en: 'A full-day story of you and those closest to you — told spontaneously, blending fashion-editorial aesthetics with the warmth of a family archive.',
    },
    ctaLabel: {
      sr: 'Istraži priče sa venčanja',
      en: 'Explore wedding stories',
    },
    coverImage: '/photos/svadbe/AMX03291-Edit.jpg',
  },
  {
    id: 'events',
    slug: 'events',
    title: { sr: 'Rođendani i događaji', en: 'Birthdays & Events' },
    shortDesc: {
      sr: 'Energija velikih jubileja, 18. rođendana i privatnih proslava uhvaćena iz samog centra dešavanja — dinamično, živopisno i bez propuštenih susreta.',
      en: 'The energy of milestone anniversaries, 18th birthdays, and private celebrations captured from the heart of the action — dynamic, vivid, and without a single missed encounter.',
    },
    ctaLabel: {
      sr: 'Pogledaj galeriju proslava',
      en: 'View celebration gallery',
    },
    coverImage: '/photos/18-rodjendani/AMX09846.jpg',
  },
  {
    id: 'portraits',
    slug: 'portraits',
    title: { sr: 'Portreti', en: 'Portraits' },
    shortDesc: {
      sr: 'Individualni, poslovni i editorial portreti koji ne liče na obične studijske slike, već otkrivaju karakter, stav i teksturu.',
      en: 'Individual, executive, and editorial portraits that go beyond standard studio imagery to reveal character, presence, and texture.',
    },
    ctaLabel: {
      sr: 'Otkrij portretni portfolio',
      en: 'Discover portrait portfolio',
    },
    coverImage: '/photos/portreti/AMX00230-Edit.jpg',
  },
  {
    id: 'video-production',
    slug: 'video-production',
    title: {
      sr: 'Video produkcija i snimanje',
      en: 'Video Production & Filming',
    },
    shortDesc: {
      sr: 'Višekamerno snimanje, pokret, perspektiva iz vazduha i čist zvuk — od autorskih filmova o slavljima do korporativnih i terenskih produkcija.',
      en: 'Multi-camera filming, fluid movement, aerial perspectives, and crisp audio — from signature celebration films to corporate and field productions.',
    },
    ctaLabel: {
      sr: 'Pogledaj video produkciju',
      en: 'Explore video production',
    },
    coverImage: SITE_CONFIG.images.videoProduction,
  },
  {
    id: 'video-editing',
    slug: 'video-editing',
    title: {
      sr: 'Video montaža i postprodukcija',
      en: 'Video Editing & Post-Production',
    },
    shortDesc: {
      sr: 'Imate snimljen materijal, a treba vam priča koja drži pažnju? Montaža dugih i kratkih formata, filmski color grading, obrada zvuka i titlovanje.',
      en: 'Have raw footage and need a story that holds attention? Long- and short-form editing, cinematic color grading, sound design, and subtitling.',
    },
    ctaLabel: {
      sr: 'Detalji o postprodukciji',
      en: 'Post-production details',
    },
    coverImage: SITE_CONFIG.images.videoEditing,
  },
  {
    id: 'ngo',
    slug: 'ngo',
    title: { sr: 'Nevladine organizacije i institucije', en: 'NGO & Organizations' },
    shortDesc: {
      sr: 'Vizuelno pripovedanje sa svrhom — dokumentarni filmovi, fotografisanje konferencija i terenskih akcija koje daju glas važnim društvenim temama.',
      en: 'Purpose-driven visual storytelling — documentary films, conference coverage, and field reportage that give voice to vital social causes.',
    },
    ctaLabel: {
      sr: 'Pogledaj NVO projekte',
      en: 'View NGO projects',
    },
    coverImage: SITE_CONFIG.images.ngo,
  },
];

function resolveAspectRatio(
  filename: string,
  dims?: PhotoDimensions | null
): 'landscape' | 'portrait' | 'square' {
  if (dims && dims.width > 0 && dims.height > 0) {
    const diffRatio =
      Math.abs(dims.width - dims.height) / Math.max(dims.width, dims.height);
    if (diffRatio < 0.05) return 'square';
    return dims.width > dims.height ? 'landscape' : 'portrait';
  }
  return inferAspectRatioFromFilename(filename);
}

/**
 * Formira PortfolioItem objekat na osnovu konfiguracije kategorije, imena fajla, rednog broja i izmerenih dimenzija.
 * Nikada ne izlaže serverske putanje — koristi isključivo bezbednu javnu URL putanju (/photos/<kategorija>/<fajl>).
 */
export function buildPortfolioItemFromPhoto(
  categoryConfig: PhotoCategoryConfig,
  filename: string,
  indexInCategory: number,
  dimensions?: PhotoDimensions | null,
  customPublicPathPrefix?: string
): PortfolioItem {
  const frameNumber = String(indexInCategory + 1).padStart(2, '0');
  const encodedFilename = encodeURIComponent(filename);
  const prefix = customPublicPathPrefix || categoryConfig.publicPathPrefix;
  const publicUrl = `${prefix}/${encodedFilename}`;
  const aspectRatio = resolveAspectRatio(filename, dimensions);
  const hasValidDims =
    dimensions && dimensions.width > 0 && dimensions.height > 0;

  return {
    id: `${categoryConfig.id}-${frameNumber}-${filename.replace(/[^a-zA-Z0-9_-]/g, '_')}`,
    category: categoryConfig.id,
    title: {
      sr: `${categoryConfig.label.sr} — Kadar ${frameNumber}`,
      en: `${categoryConfig.label.en} — Frame ${frameNumber}`,
    },
    subtitle: {
      sr: categoryConfig.subtitle.sr,
      en: categoryConfig.subtitle.en,
    },
    imagePath: publicUrl,
    aspectRatio,
    ...(hasValidDims
      ? { width: dimensions.width, height: dimensions.height }
      : {}),
    alt: {
      sr: `${categoryConfig.label.sr} — fotografija ${frameNumber} (AMOX Photography)`,
      en: `${categoryConfig.label.en} — photograph ${frameNumber} (AMOX Photography)`,
    },
  };
}

/**
 * Pretvara mapu { [categoryId]: filenames[] } u niz PortfolioItem objekata.
 */
export function buildPortfolioItemsFromMap(
  filesByCategory: Partial<Record<PortfolioCategoryId, string[]>>,
  dimensionsByKey?: Record<string, PhotoDimensions>,
  prefixByFileKey?: Record<string, string>
): { items: PortfolioItem[]; countsByCategory: Record<PortfolioCategoryId, number> } {
  const items: PortfolioItem[] = [];
  const countsByCategory = {} as Record<PortfolioCategoryId, number>;

  for (const catConfig of PHOTO_GALLERY_CATEGORIES) {
    const rawFiles = filesByCategory[catConfig.id] || [];
    const validFiles = sortPhotoFilenames(rawFiles.filter(isValidPhotoFilename));
    countsByCategory[catConfig.id] = validFiles.length;

    validFiles.forEach((filename, idx) => {
      const key = `${catConfig.folderName}/${filename}`;
      const dims = dimensionsByKey?.[key] || null;
      const customPrefix = prefixByFileKey?.[key];
      items.push(
        buildPortfolioItemFromPhoto(catConfig, filename, idx, dims, customPrefix)
      );
    });
  }

  return { items, countsByCategory };
}

/**
 * Inicijalna lista fotografija generisana iz centralizovanih 7 kategorijskih foldera (manifest).
 * Na klijentu i serveru automatski se dopunjava preko /api/photos ako su dodate nove slike u public/photos/*.
 */
export const PORTFOLIO_ITEMS: PortfolioItem[] = buildPortfolioItemsFromMap(
  (manifestData?.categories || {}) as Partial<Record<PortfolioCategoryId, string[]>>,
  ((manifestData as { dimensions?: Record<string, PhotoDimensions> })?.dimensions || {})
).items;

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-weddings',
    serviceKey: 'weddings',
    title: { sr: 'Venčanja', en: 'Weddings' },
    description: {
      sr: 'Kompletno fotografisanje ili video snimanje venčanja prilagođeno vašem tempu i željama.',
      en: 'Comprehensive wedding photography or film tailored to your timeline and vision.',
    },
    features: {
      sr: [
        'Celodnevno ili parcijalno praćenje događaja',
        'Zasebna editorial sesija mladenaca',
        'Pažljiva selekcija i kolor korekcija kadrova',
        'Isporuka putem bezbedne Pic-Time privatne galerije',
      ],
      en: [
        'Full-day or partial wedding coverage',
        'Dedicated editorial couple portrait session',
        'Careful curation and fine-art color grading',
        'Private delivery via secure Pic-Time client gallery',
      ],
    },
    note: {
      sr: 'Obim, broj sati i detalji definišu se kroz dogovor sa klijentom.',
      en: 'Coverage hours and specific deliverables are tailored in consultation.',
    },
  },
  {
    id: 'pkg-events',
    serviceKey: 'events',
    title: { sr: 'Rođendani i događaji', en: 'Birthdays & Events' },
    description: {
      sr: 'Zabeležite dragocene trenutke sa porodicom i prijateljima bez veštačkog poziranja.',
      en: 'Capture precious moments with family and friends without forced posing.',
    },
    features: {
      sr: [
        'Dokumentovanje proslave i spontanih emocija',
        'Fotografisanje detalja ambijenta i atmosfere',
        'Brza priprema odabranih fotografija',
        'Online galerija sa lakim deljenjem sa gostima',
      ],
      en: [
        'Documenting celebration and spontaneous emotions',
        'Detail shots of ambiance, decor, and setting',
        'Quick turnaround of selected preview frames',
        'Online gallery for easy sharing with guests',
      ],
    },
    note: {
      sr: 'Prilagođeno dužini i formatu proslave.',
      en: 'Tailored to the duration and format of your celebration.',
    },
  },
  {
    id: 'pkg-portraits',
    serviceKey: 'portraits',
    title: { sr: 'Portreti', en: 'Portraits' },
    description: {
      sr: 'Lični, poslovni ili umetnički editorial portreti u studijskom ili prirodnom okruženju.',
      en: 'Personal, branding, or fine-art editorial portraits in studio or natural locations.',
    },
    features: {
      sr: [
        'Priprema i dogovor oko koncepta i stajlinga',
        'Prirodno svetlo ili kontrolisani studijski uslovi',
        'Profesionalna nežna obrada lica i tonova',
        'Visoka rezolucija prilagođena štampi i webu',
      ],
      en: [
        'Concept, styling, and location consultation',
        'Natural light or controlled studio environment',
        'Subtle and natural retouching and color tuning',
        'High-resolution output optimized for print & web',
      ],
    },
    note: {
      sr: 'Termin i lokacija prilagođavaju se vašem rasporedu.',
      en: 'Session date and location adapted to your schedule.',
    },
  },
  {
    id: 'pkg-video-production',
    serviceKey: 'video-production',
    title: { sr: 'Video produkcija i snimanje', en: 'Video Production & Filming' },
    description: {
      sr: 'Usluga snimanja i kreiranja video materijala za događaje, proslave, venčanja, poslovne događaje, konferencije, organizacije i druge projekte.',
      en: 'Video filming and production service for events, celebrations, weddings, corporate events, conferences, organizations, and custom projects.',
    },
    features: {
      sr: [
        'Snimanje događaja, proslava, venčanja i konferencija',
        'Kreiranje autentičnog video materijala na lokaciji',
        'Pažljivo kadriranje i rad sa prirodnim i ambijentalnim svetlom',
        'Prilagođen pristup vrsti događaja i potrebama projekta',
      ],
      en: [
        'Filming events, celebrations, weddings, and conferences',
        'Creating authentic on-location video material',
        'Intentional framing with natural and ambient lighting',
        'Approach tailored to the event format and project needs',
      ],
    },
    note: {
      sr: 'Obim snimanja i detalji definišu se prema vrsti projekta.',
      en: 'Filming scope and details are defined according to your project.',
    },
  },
  {
    id: 'pkg-video-editing',
    serviceKey: 'video-editing',
    title: { sr: 'Video montaža i postprodukcija', en: 'Video Editing & Post-Production' },
    description: {
      sr: 'Samostalna usluga montaže materijala koji ste već snimili — povezivanje kadrova, obrada boja, zvuk i prilagođavanje željenim formatima.',
      en: 'Standalone editing service for footage you have already recorded — frame assembly, color grading, audio alignment, and multi-platform formatting.',
    },
    features: {
      sr: [
        'Selekcija i smisleno povezivanje snimljenih kadrova',
        'Obrada boja (kolor korekcija) i usklađivanje zvuka',
        'Muzička podloga i titlovi prema dogovoru',
        'Prilagođavanje videa društvenim mrežama i drugim namenama',
      ],
      en: [
        'Selection and rhythmic assembly of recorded footage',
        'Color grading and audio synchronization',
        'Music selection and subtitles by arrangement',
        'Adapting videos for social media and other platforms',
      ],
    },
    note: {
      sr: 'Ponuda se formira prema obimu materijala i željenom formatu.',
      en: 'Proposal tailored to your source footage and target format.',
    },
  },
  {
    id: 'pkg-ngo',
    serviceKey: 'ngo',
    title: { sr: 'Nevladine organizacije i institucije', en: 'NGO & Organizations' },
    description: {
      sr: 'Profesionalno dokumentovanje aktivnosti organizacija civilnog društva i institucija.',
      en: 'Professional documentation for civil society organizations and institutions.',
    },
    features: {
      sr: [
        'Fotografisanje i snimanje konferencija i foruma',
        'Dokumentovanje terenskog rada i radionica',
        'Materijal pripremljen za donorske izveštaje i web',
        'Iskustvo u poštovanju etičkih normi i privatnosti',
      ],
      en: [
        'Photo & video coverage of conferences and forums',
        'Fieldwork and interactive workshop documentation',
        'Materials prepared for donor reporting, PR, and web',
        'Strict adherence to ethical norms and participant consent',
      ],
    },
    note: {
      sr: 'Ponuda se formira na osnovu agende i zahteva projekta.',
      en: 'Proposal structured around your project agenda and scope.',
    },
  },
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    question: {
      sr: 'Kako mogu da rezervišem termin za fotografisanje ili video?',
      en: 'How do I book a session or date for photo or video coverage?',
    },
    answer: {
      sr: 'Rezervacija počinje slanjem upita preko kontakt-forme na sajtu, putem email adrese amoxmint@gmail.com ili direktnom WhatsApp porukom na +381629247415. Nakon što proverimo dostupnost vašeg datuma, dogovaramo sve detalje i potvrđujemo termin.',
      en: 'Booking begins by submitting the contact form on this website, sending an email to amoxmint@gmail.com, or reaching out directly via WhatsApp at +381629247415. Once date availability is confirmed, we discuss all preferences and finalize the booking.',
    },
  },
  {
    id: 'faq-2',
    question: {
      sr: 'Koliko ranije je potrebno rezervisati datum?',
      en: 'How far in advance should I reserve a date?',
    },
    answer: {
      sr: 'Za venčanja i veće događaje preporučuje se kontakt što ranije, često nekoliko meseci unapred, kako bi se osigurala dostupnost željenog termina. Za portrete i manje proslave termini se mogu zakazati i u kraćem roku ukoliko u rasporedu ima slobodnih dana.',
      en: 'For weddings and major events, we recommend inquiring as early as possible, typically a few months in advance. For portraits and intimate gatherings, dates can often be accommodated on shorter notice depending on availability.',
    },
  },
  {
    id: 'faq-3',
    question: {
      sr: 'Kako se formiraju cene i šta je uključeno u ponudu?',
      en: 'How are prices structured and what is included in the quote?',
    },
    answer: {
      sr: 'Sve cene se formiraju individualno na upit, jer svaki događaj ima specifičan obim, trajanje i lokaciju. U upitu navedite datum, okvirnu lokaciju i vrstu usluge kako bismo vam dostavili tačnu i transparentnu ponudu bez skrivenih troškova.',
      en: 'All pricing is provided upon request because each project has distinct timing, scope, and location requirements. Include your date, approximate location, and service type in your inquiry so we can provide a transparent proposal.',
    },
  },
  {
    id: 'faq-4',
    question: {
      sr: 'Na koji način i u kom formatu se isporučuju fotografije i video?',
      en: 'How and in what format are photos and films delivered?',
    },
    answer: {
      sr: 'Fotografije se klijentima isporučuju u visokoj rezoluciji putem profesionalne, bezbedne Pic-Time klijentske galerije (https://amoxmint.pic-time.com/client), gde ih možete pregledati, sačuvati i podeliti sa najbližima. Video materijali se isporučuju putem pouzdanih digitalnih linkova u punoj HD ili 4K rezoluciji.',
      en: 'Photographs are delivered in high resolution via our private, secure Pic-Time client platform (https://amoxmint.pic-time.com/client), allowing effortless viewing, downloading, and sharing with loved ones. Films are delivered via cloud links in full HD or 4K.',
    },
  },
  {
    id: 'faq-5',
    question: {
      sr: 'Da li radite van Beograda i Srbije?',
      en: 'Do you travel outside Belgrade and throughout the region?',
    },
    answer: {
      sr: 'Da! AMOX Photography & Film je dostupan širom Srbije, u Crnoj Gori, Bosni i Hercegovini i ostalim susednim zemljama. Putovanja na druge međunarodne i evropske destinacije se rado organizuju po dogovoru.',
      en: 'Yes! AMOX Photography & Film is available across Serbia, Montenegro, Bosnia and Herzegovina, and neighboring countries. Destination events across Europe and beyond are happily arranged upon agreement.',
    },
  },
  {
    id: 'faq-6',
    question: {
      sr: 'Kako izgleda proces dogovora pre samog snimanja?',
      en: 'What does the preparation process look like before the shoot?',
    },
    answer: {
      sr: 'Pre svakog angažmana prolazimo kroz raspored dana, željeni stil i specifične zahteve. Volimo opušten i prirodan pristup gde se osećate prijatno ispred kamere, kako bi zabeležene emocije bile iskrene i spontane.',
      en: 'Before every engagement, we review your timeline, style preferences, and key priorities. We focus on a relaxed, natural environment where you feel at ease, ensuring authentic and meaningful frames.',
    },
  },
];
