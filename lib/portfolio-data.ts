import { SITE_CONFIG } from './site-config';

export interface PortfolioItem {
  id: string;
  category: 'weddings' | 'events' | 'portraits' | 'video' | 'ngo';
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
  alt: {
    sr: string;
    en: string;
  };
  isPlaceholder?: boolean;
}

export interface VideoItem {
  id: string;
  title: {
    sr: string;
    en: string;
  };
  description: {
    sr: string;
    en: string;
  };
  thumbnailPath: string;
  youtubeId?: string; // Replace with owner's YouTube video ID when ready
  youtubeUrl: string;
  isPlaceholder?: boolean;
}

export interface PackageItem {
  id: string;
  categoryId: 'weddings' | 'events' | 'portraits' | 'video' | 'ngo';
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

export interface TestimonialItem {
  id: string;
  clientName: string;
  projectType: {
    sr: string;
    en: string;
  };
  quote: {
    sr: string;
    en: string;
  };
  date?: string;
}

export const PORTFOLIO_CATEGORIES = [
  {
    id: 'weddings',
    slug: 'weddings',
    title: { sr: 'Venčanja', en: 'Weddings' },
    shortDesc: {
      sr: 'Autentični trenuci, iskrene emocije, detalji i pažljivo komponisani kadrovi vašeg posebnog dana.',
      en: 'Authentic moments, genuine emotions, intimate details, and carefully composed frames of your special day.',
    },
    coverImage: SITE_CONFIG.images.wedding,
  },
  {
    id: 'events',
    slug: 'events',
    title: { sr: 'Rođendani i događaji', en: 'Birthdays & Events' },
    shortDesc: {
      sr: 'Dokumentovanje privatnih proslava, jubileja i posebnih događaja u toploj i prirodnoj atmosferi.',
      en: 'Documenting private celebrations, anniversaries, and special events with natural warmth and elegance.',
    },
    coverImage: SITE_CONFIG.images.event,
  },
  {
    id: 'portraits',
    slug: 'portraits',
    title: { sr: 'Portreti', en: 'Portraits' },
    shortDesc: {
      sr: 'Individualni, editorial i lični portreti uz prirodno svetlo i iskren estetski pristup.',
      en: 'Individual, editorial, and personal portraits embracing natural lighting and authentic aesthetics.',
    },
    coverImage: SITE_CONFIG.images.portrait,
  },
  {
    id: 'video',
    slug: 'video',
    title: { sr: 'Video produkcija i montaža', en: 'Video Production & Editing' },
    shortDesc: {
      sr: 'Filmski kadrovi, ritam montaže i zvučna atmosfera koji pretvaraju događaj u trajnu filmsku priču.',
      en: 'Cinematic composition, rhythmic editing, and sound design turning moments into enduring films.',
    },
    coverImage: SITE_CONFIG.images.hero,
  },
  {
    id: 'ngo',
    slug: 'ngo',
    title: { sr: 'Nevladine organizacije i institucije', en: 'NGO & Organizations' },
    shortDesc: {
      sr: 'Dokumentovanje konferencija, edukacija, terenskih aktivnosti i društveno odgovornih projekata.',
      en: 'Documenting conferences, workshops, field operations, and socially impactful institutional projects.',
    },
    coverImage: SITE_CONFIG.images.ngo,
  },
] as const;

export const PORTFOLIO_ITEMS: PortfolioItem[] = [
  {
    id: 'w-1',
    category: 'weddings',
    title: { sr: 'Dokumentarni kadar venčanja', en: 'Documentary Wedding Frame' },
    subtitle: { sr: 'Iskrena radost i prirodno svetlo', en: 'Candid joy in natural light' },
    imagePath: SITE_CONFIG.images.wedding,
    aspectRatio: 'landscape',
    alt: {
      sr: 'Mladenci nasmejani u prirodnom ambijentu — primer stila fotografije (placeholder)',
      en: 'Bride and groom laughing outdoors in natural daylight — style placeholder',
    },
    isPlaceholder: true,
  },
  {
    id: 'p-1',
    category: 'portraits',
    title: { sr: 'Prirodni svetlosni portret', en: 'Natural Light Portrait' },
    subtitle: { sr: 'Topli tonovi i autentičan izraz', en: 'Warm tones and authentic expression' },
    imagePath: SITE_CONFIG.images.portrait,
    aspectRatio: 'portrait',
    alt: {
      sr: 'Portret u enterijeru uz prozor — primer stila fotografije (placeholder)',
      en: 'Indoor window light portrait — style placeholder',
    },
    isPlaceholder: true,
  },
  {
    id: 'e-1',
    category: 'events',
    title: { sr: 'Privatna večera i rođendan', en: 'Private Dinner & Birthday' },
    subtitle: { sr: 'Intimna atmosfera uz sveće', en: 'Intimate candlelit gathering' },
    imagePath: SITE_CONFIG.images.event,
    aspectRatio: 'landscape',
    alt: {
      sr: 'Društvo za stolom uz rođendansku tortu — primer stila (placeholder)',
      en: 'Friends around table with celebration cake — style placeholder',
    },
    isPlaceholder: true,
  },
  {
    id: 'n-1',
    category: 'ngo',
    title: { sr: 'Zajednička radionica i diskusija', en: 'Community Workshop & Panel' },
    subtitle: { sr: 'Dokumentovanje projektnih aktivnosti', en: 'Documenting collaborative community project' },
    imagePath: SITE_CONFIG.images.ngo,
    aspectRatio: 'landscape',
    alt: {
      sr: 'Učesnici radionice u razgovoru — primer dokumentarnog pristupa (placeholder)',
      en: 'Workshop participants engaging in dialogue — style placeholder',
    },
    isPlaceholder: true,
  },
  {
    id: 'h-1',
    category: 'video',
    title: { sr: 'Filmski pejzažni kadar', en: 'Cinematic Landscape Frame' },
    subtitle: { sr: 'Široki prostor i kompozicija', en: 'Expansive space and intentional composition' },
    imagePath: SITE_CONFIG.images.hero,
    aspectRatio: 'landscape',
    alt: {
      sr: 'Pejzaž sa usamljenim drvetom i toplim nebom — primer filmskog kadra (placeholder)',
      en: 'Landscape with lone tree under warm sky — cinematic frame placeholder',
    },
    isPlaceholder: true,
  },
  {
    id: 'a-1',
    category: 'portraits',
    title: { sr: 'Editorial portret sa fotoaparatom', en: 'Editorial Portrait with Camera' },
    subtitle: { sr: 'Tihi trenutak fokusa', en: 'Quiet moment of focus' },
    imagePath: SITE_CONFIG.images.about,
    aspectRatio: 'portrait',
    alt: {
      sr: 'Portret sa analognom kamerom uz prozor — placeholder za fotografiju vlasnika',
      en: 'Portrait with camera by window — placeholder for photographer photo',
    },
    isPlaceholder: true,
  },
];

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'v-1',
    title: {
      sr: 'AMOX Filmski Showreel — U pripremi',
      en: 'AMOX Cinematic Showreel — Coming Soon',
    },
    description: {
      sr: 'Kratki pregled kadrova, ritma i zvučnog dizajna. Biće objavljen čim vlasnik dostavi prve zvanične video radove.',
      en: 'A showcase of pacing, framing, and sound design. Will be updated once official video work is linked.',
    },
    thumbnailPath: SITE_CONFIG.images.hero,
    youtubeUrl: SITE_CONFIG.youtubeUrl,
    isPlaceholder: true,
  },
];

export const PACKAGES_DATA: PackageItem[] = [
  {
    id: 'pkg-weddings',
    categoryId: 'weddings',
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
    categoryId: 'events',
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
    categoryId: 'portraits',
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
    id: 'pkg-video',
    categoryId: 'video',
    title: { sr: 'Video produkcija i montaža', en: 'Video Production & Editing' },
    description: {
      sr: 'Kratke filmske forme, video za društvene mreže, muzički i promotivni video zapisi.',
      en: 'Cinematic short films, social formats, music, and promotional videos.',
    },
    features: {
      sr: [
        'Snimanje profesionalnom cinema opremom',
        'Montaža, ritam, dinamika i selekcija muzike',
        'Kolor korekcija i zvučni dizajn',
        'Prilagođavanje za YouTube, Instagram i TikTok',
      ],
      en: [
        'Shooting with professional cinema equipment',
        'Editing, pacing, rhythm, and licensed audio selection',
        'Color grading and dedicated sound design',
        'Optimized exports for YouTube, Instagram, and TikTok',
      ],
    },
    note: {
      sr: 'Format i trajanje videa zavise od vaših ciljeva.',
      en: 'Video format and runtime depend on project goals.',
    },
  },
  {
    id: 'pkg-ngo',
    categoryId: 'ngo',
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

// As instructed: hide fake reviews; keep clean data structure ready for real reviews
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  // Popunjava se isključivo stvarnim izjavama klijenata kada ih vlasnik dostavi.
];
