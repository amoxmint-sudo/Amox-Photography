export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    weddings: string;
    events: string;
    portraits: string;
    video: string;
    ngo: string;
    portfolio: string;
    pricing: string;
    testimonials: string;
    faq: string;
    contact: string;
    menu: string;
    closeMenu: string;
    quickInquiry: string;
  };
  hero: {
    tagline: string;
    explorePortfolio: string;
    requestQuote: string;
    placeholderNote: string;
  };
  intro: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
  };
  categoriesSection: {
    kicker: string;
    title: string;
    exploreCategory: string;
  };
  featuredWorks: {
    kicker: string;
    title: string;
    subtitle: string;
    viewAllPortfolio: string;
    placeholderBadge: string;
  };
  videoIntro: {
    kicker: string;
    title: string;
    description: string;
    watchShowreel: string;
    openYoutube: string;
  };
  ngoIntro: {
    kicker: string;
    title: string;
    description: string;
    learnMore: string;
  };
  aboutPage: {
    title: string;
    kicker: string;
    quote: string;
    approachTitle: string;
    approachP1: string;
    approachP2: string;
    portfolioCta: string;
    contactCta: string;
    photoPlaceholder: string;
  };
  portfolioPage: {
    title: string;
    subtitle: string;
    all: string;
    weddings: string;
    events: string;
    portraits: string;
    video: string;
    ngo: string;
    noItems: string;
    videoTitle: string;
    videoSubtitle: string;
  };
  pricingPage: {
    title: string;
    subtitle: string;
    priceUponRequest: string;
    requestQuote: string;
    disclaimer: string;
  };
  testimonialsPage: {
    title: string;
    subtitle: string;
    pendingNote: string;
    ctaButton: string;
  };
  faqPage: {
    title: string;
    subtitle: string;
  };
  contactPage: {
    title: string;
    subtitle: string;
    nameLabel: string;
    namePlaceholder: string;
    emailLabel: string;
    emailPlaceholder: string;
    phoneLabel: string;
    phonePlaceholder: string;
    serviceLabel: string;
    serviceSelectPlaceholder: string;
    dateLabel: string;
    datePlaceholder: string;
    locationLabel: string;
    locationPlaceholder: string;
    messageLabel: string;
    messagePlaceholder: string;
    submitButton: string;
    notice: string;
    fallbackHelp: string;
    copyButton: string;
    copiedText: string;
    requiredBadge: string;
    optionalBadge: string;
    directContactTitle: string;
    clientGalleryTitle: string;
  };
  lightbox: {
    close: string;
    prev: string;
    next: string;
    counterOf: string;
  };
  whatsapp: {
    label: string;
  };
  footer: {
    subtitle: string;
    serviceArea: string;
    rights: string;
    clientGallery: string;
    navigation: string;
    social: string;
    contact: string;
  };
}

export const translations: Record<'sr' | 'en', TranslationSchema> = {
  sr: {
    nav: {
      home: 'Početna',
      about: 'O meni',
      weddings: 'Venčanja',
      events: 'Rođendani i događaji',
      portraits: 'Portreti',
      video: 'Video produkcija i montaža',
      ngo: 'Nevladine organizacije i institucije',
      portfolio: 'Portfolio',
      pricing: 'Paketi i cene',
      testimonials: 'Utisci klijenata',
      faq: 'Česta pitanja',
      contact: 'Kontakt i upiti',
      menu: 'Meni',
      closeMenu: 'Zatvori meni',
      quickInquiry: 'Zatraži ponudu',
    },
    hero: {
      tagline: 'Svaka priča ima svoj kadar.',
      explorePortfolio: 'Pogledaj portfolio',
      requestQuote: 'Zatraži ponudu',
      placeholderNote: 'Editorial prikaz — primer kadra (placeholder spreman za zamenu fotografijom vlasnika)',
    },
    intro: {
      kicker: 'O vizuelnom pristupu',
      title: 'Fotografija i film kroz autentične trenutke',
      p1: 'Verujemo da istinska lepota vizuelne priče nastaje u iskrenim trenucima i detaljima koji se često odvijaju tiho. Naš pristup kombinuje prirodno svetlo, promišljenu kompoziciju i poštovanje prema vašem ritmu.',
      p2: 'Bilo da se radi o intimnom venčanju, porodičnoj proslavi, editorial portretu ili dokumentovanju rada nevladine organizacije, svakom kadru pristupamo sa istom pažnjom i toplinom.',
    },
    categoriesSection: {
      kicker: 'Usluge i oblasti rada',
      title: 'Izaberite pravu vizuelnu priču',
      exploreCategory: 'Pogledaj detalje i galeriju',
    },
    featuredWorks: {
      kicker: 'Odabrani kadrovi',
      title: 'Galerija i atmosfera',
      subtitle: 'Primeri pažljivo komponovanih kadrova i estetskog pristupa. Svaki rad se lako prilagođava vašoj viziji.',
      viewAllPortfolio: 'Pogledaj ceo portfolio',
      placeholderBadge: 'Primer kadra (placeholder)',
    },
    videoIntro: {
      kicker: 'Pokretne slike',
      title: 'Video produkcija i montaža',
      description: 'Emocija zabeležena kroz filmski tempo, pažljivu kolor korekciju i zvučnu atmosferu. Od kraćih formata za društvene mreže do filmskih zapisa važnih događaja.',
      watchShowreel: 'Pogledaj showreel',
      openYoutube: 'Poseti YouTube kanal',
    },
    ngoIntro: {
      kicker: 'Saradnja i partnerstva',
      title: 'Dokumentovanje nevladinih organizacija i institucija',
      description: 'Zabijeležavanje konferencija, edukativnih radionica, terenskih poseta i društvenih inicijativa uz visoke profesionalne i etičke standarde.',
      learnMore: 'Pogledaj NGO usluge',
    },
    aboutPage: {
      title: 'O meni',
      kicker: 'Iza objektiva',
      quote: '„Verujem da se najlepše priče kriju u detaljima i emocijama koje često prolaze neprimećeno. Kroz fotografiju i video stvaram autentične vizuelne priče, spajajući iskrene trenutke, elegantan pristup i pažljivo komponisane kadrove.“',
      approachTitle: 'Filozofija rada',
      approachP1: 'Kada fotografišem ili snimam, trudim se da budem prisutan, a ne nametljiv. Najlepši kadrovi uvek nastaju spontano — u razgovoru, pogledu, smehu ili tišini.',
      approachP2: 'Svaka saradnja je prilagođena ljudima sa kojima radim. Cilj je da se osećate opušteno i svoji, dok ja brinem o svetlu, kompoziciji i atmosferi.',
      portfolioCta: 'Istraži portfolio radove',
      contactCta: 'Stupite u kontakt',
      photoPlaceholder: 'Lična fotografija vlasnika — placeholder spreman za zamenu fotografijom autora',
    },
    portfolioPage: {
      title: 'Portfolio',
      subtitle: 'Pažljivo odabrani radovi iz različitih oblasti fotografije i filma.',
      all: 'Sve',
      weddings: 'Venčanja',
      events: 'Događaji',
      portraits: 'Portreti',
      video: 'Video',
      ngo: 'Organizacije',
      noItems: 'Trenutno nema radova u izabranoj kategoriji.',
      videoTitle: 'Video portfolio i filmski formati',
      videoSubtitle: 'Kratke filmske forme, showreel materijali i promotivni snimci.',
    },
    pricingPage: {
      title: 'Paketi i cene',
      subtitle: 'Transparentan i personalizovan pristup. Sve ponude formiraju se individualno prema vašim željama i obimu angažmana.',
      priceUponRequest: 'Na upit',
      requestQuote: 'Zatraži ponudu',
      disclaimer: 'Cene se formiraju bez skrivenih troškova. Za detaljnu i tačnu procenu, pošaljite nam upit sa datumom i lokacijom.',
    },
    testimonialsPage: {
      title: 'Utisci klijenata',
      subtitle: 'Iskrena iskustva parova, slavljenika i partnera.',
      pendingNote: 'Sekcija sa utiscima se ažurira isključivo stvarnim izjavama klijenata nakon realizovanih projekata. Budite među prvima koji će podeliti svoje utiske!',
      ctaButton: 'Pošaljite vaš upit',
    },
    faqPage: {
      title: 'Česta pitanja',
      subtitle: 'Odgovori na najčešće nedoumice o rezervaciji, saradnji i isporuci.',
    },
    contactPage: {
      title: 'Kontakt i upiti',
      subtitle: 'Podelite sa nama detalje o vašem događaju, ideji ili projektu. Radujemo se prilici da stvorimo nešto autentično zajedno.',
      nameLabel: 'Ime i prezime',
      namePlaceholder: 'npr. Ana Jovanović',
      emailLabel: 'Email adresa',
      emailPlaceholder: 'npr. ana@example.com',
      phoneLabel: 'Telefon',
      phonePlaceholder: 'npr. +381 60 123 4567',
      serviceLabel: 'Vrsta usluge',
      serviceSelectPlaceholder: 'Izaberite uslugu...',
      dateLabel: 'Željeni datum događaja',
      datePlaceholder: 'npr. 15. septembar 2027.',
      locationLabel: 'Lokacija događaja',
      locationPlaceholder: 'npr. Beograd, Novi Sad, Avala...',
      messageLabel: 'Poruka ili dodatni detalji',
      messagePlaceholder: 'Opišite vaše želje, okvirnu satnicu ili specifične zahteve...',
      submitButton: 'Pripremi i pošalji upit',
      notice: 'Klikom na dugme otvoriće se vaša email aplikacija sa pripremljenom porukom. Podatke šaljete sami, nakon provere poruke.',
      fallbackHelp: 'Ukoliko se vaša email aplikacija ne otvori automatski, možete kopirati pripremljen tekst ili nam pisati direktno na amoxmint@gmail.com.',
      copyButton: 'Kopiraj pripremljen tekst upita',
      copiedText: 'Tekst upita je kopiran u privremenu memoriju!',
      requiredBadge: 'obavezno',
      optionalBadge: 'opciono',
      directContactTitle: 'Direktan kontakt',
      clientGalleryTitle: 'Galerija za klijente',
    },
    lightbox: {
      close: 'Zatvori prikaz (Esc)',
      prev: 'Prethodna fotografija (Strelica levo)',
      next: 'Sledeća fotografija (Strelica desno)',
      counterOf: 'od',
    },
    whatsapp: {
      label: 'Kontaktiraj me preko WhatsApp-a',
    },
    footer: {
      subtitle: 'Photography & Film',
      serviceArea: 'Dostupan širom Srbije i u susednim zemljama. Ostale destinacije po dogovoru.',
      rights: 'Sva prava zadržana.',
      clientGallery: 'Klijentska Pic-Time galerija',
      navigation: 'Navigacija',
      social: 'Društvene mreže',
      contact: 'Kontakt',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About Me',
      weddings: 'Weddings',
      events: 'Birthdays & Events',
      portraits: 'Portraits',
      video: 'Video Production & Editing',
      ngo: 'NGO & Organizations',
      portfolio: 'Portfolio',
      pricing: 'Packages & Pricing',
      testimonials: 'Client Testimonials',
      faq: 'FAQ',
      contact: 'Contact & Inquiries',
      menu: 'Menu',
      closeMenu: 'Close menu',
      quickInquiry: 'Request a Quote',
    },
    hero: {
      tagline: 'Every Story Has Its Frame.',
      explorePortfolio: 'Explore Portfolio',
      requestQuote: 'Request a Quote',
      placeholderNote: 'Editorial visual — frame placeholder (ready for owner photograph)',
    },
    intro: {
      kicker: 'Our Visual Philosophy',
      title: 'Photography & Film Rooted in Authentic Moments',
      p1: 'We believe genuine visual storytelling emerges from honest moments and subtle details that unfold quietly. Our approach pairs soft natural light with intentional framing and deep respect for your natural rhythm.',
      p2: 'Whether an intimate wedding, a celebration with family, an editorial portrait, or documenting non-profit initiatives, every single frame is approached with warmth and precision.',
    },
    categoriesSection: {
      kicker: 'Services & Scope',
      title: 'Choose the Right Visual Story',
      exploreCategory: 'View details & gallery',
    },
    featuredWorks: {
      kicker: 'Selected Frames',
      title: 'Gallery & Atmosphere',
      subtitle: 'Selected examples of composed frames and fine-art editorial styling. Every project is crafted around your unique story.',
      viewAllPortfolio: 'Explore Full Portfolio',
      placeholderBadge: 'Frame placeholder',
    },
    videoIntro: {
      kicker: 'Moving Images',
      title: 'Video Production & Editing',
      description: 'Emotion brought to life through cinematic pacing, color harmony, and intentional sound design. From concise social-first cuts to enduring full-length films.',
      watchShowreel: 'Watch Showreel',
      openYoutube: 'Visit YouTube Channel',
    },
    ngoIntro: {
      kicker: 'Partnerships & Impact',
      title: 'Documenting NGOs & Institutions',
      description: 'Documenting conferences, educational seminars, field missions, and community initiatives with high ethical and visual standards.',
      learnMore: 'Explore NGO Services',
    },
    aboutPage: {
      title: 'About Me',
      kicker: 'Behind the Lens',
      quote: '“I believe the most beautiful stories live in the details and emotions that often go unnoticed. Through photography and film, I create authentic visual stories that combine genuine moments, an elegant approach, and carefully composed frames.”',
      approachTitle: 'Working Philosophy',
      approachP1: 'When shooting photography or film, my goal is to remain attentive without being intrusive. The most captivating frames always unfold naturally — in laughter, conversation, a glance, or quiet contemplation.',
      approachP2: 'Every collaboration is tailored to the people in front of the lens. You can feel completely relaxed while I shape the light, composition, and mood.',
      portfolioCta: 'Explore Portfolio Works',
      contactCta: 'Get in Touch',
      photoPlaceholder: 'Owner personal portrait — placeholder ready for the photographer’s portrait',
    },
    portfolioPage: {
      title: 'Portfolio',
      subtitle: 'Curated editorial works across photography and cinematic film.',
      all: 'All',
      weddings: 'Weddings',
      events: 'Events',
      portraits: 'Portraits',
      video: 'Film',
      ngo: 'Organizations',
      noItems: 'No items currently in this category.',
      videoTitle: 'Cinematic Films & Showreels',
      videoSubtitle: 'Short-form visual pieces, showreels, and event films.',
    },
    pricingPage: {
      title: 'Packages & Pricing',
      subtitle: 'Transparent, tailored collaboration. Every proposal is crafted individually around your timeline and vision.',
      priceUponRequest: 'Price upon request',
      requestQuote: 'Request a Quote',
      disclaimer: 'Pricing is structured clearly without hidden fees. For a customized proposal, send us an inquiry with your preferred date and location.',
    },
    testimonialsPage: {
      title: 'Client Testimonials',
      subtitle: 'Authentic words from couples, event hosts, and collaborators.',
      pendingNote: 'Client testimonials will be published here with genuine reviews following completed projects. Be among the first to collaborate with us!',
      ctaButton: 'Send an Inquiry',
    },
    faqPage: {
      title: 'Frequently Asked Questions',
      subtitle: 'Clear answers on booking, availability, delivery, and creative collaboration.',
    },
    contactPage: {
      title: 'Contact & Inquiries',
      subtitle: 'Share your vision, date, or project concept with us. We look forward to creating something genuine and enduring together.',
      nameLabel: 'Full Name',
      namePlaceholder: 'e.g. Elena Smith',
      emailLabel: 'Email Address',
      emailPlaceholder: 'e.g. elena@example.com',
      phoneLabel: 'Phone Number',
      phonePlaceholder: 'e.g. +381 60 123 4567',
      serviceLabel: 'Service Type',
      serviceSelectPlaceholder: 'Select a service...',
      dateLabel: 'Desired Event Date',
      datePlaceholder: 'e.g. September 15, 2027',
      locationLabel: 'Event Location',
      locationPlaceholder: 'e.g. Belgrade, Novi Sad, or destination...',
      messageLabel: 'Message or Project Details',
      messagePlaceholder: 'Share your vision, expected schedule, or any specific wishes...',
      submitButton: 'Prepare & Send Inquiry',
      notice: 'Clicking the button will open your email application with a pre-filled message. You send the information yourself after reviewing the message.',
      fallbackHelp: 'If your email client does not open automatically, you can copy the pre-filled text or write to us directly at amoxmint@gmail.com.',
      copyButton: 'Copy Pre-Filled Inquiry Text',
      copiedText: 'Inquiry text copied to clipboard!',
      requiredBadge: 'required',
      optionalBadge: 'optional',
      directContactTitle: 'Direct Inquiries',
      clientGalleryTitle: 'Client Gallery Platform',
    },
    lightbox: {
      close: 'Close viewer (Esc)',
      prev: 'Previous photograph (Left arrow)',
      next: 'Next photograph (Right arrow)',
      counterOf: 'of',
    },
    whatsapp: {
      label: 'Contact me on WhatsApp',
    },
    footer: {
      subtitle: 'Photography & Film',
      serviceArea: 'Available throughout Serbia and neighboring countries. Other destinations by arrangement.',
      rights: 'All rights reserved.',
      clientGallery: 'Client Pic-Time Gallery',
      navigation: 'Navigation',
      social: 'Social Channels',
      contact: 'Direct Contact',
    },
  },
};
