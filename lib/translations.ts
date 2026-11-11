export interface TranslationSchema {
  nav: {
    home: string;
    about: string;
    services: string;
    weddings: string;
    events: string;
    portraits: string;
    videoCombined: string;
    videoProduction: string;
    videoEditing: string;
    ngo: string;
    portfolio: string;
    pricing: string;
    testimonials: string;
    faq: string;
    contact: string;
    myStory: string;
    menu: string;
    closeMenu: string;
    quickInquiry: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
    explorePortfolio: string;
    requestQuote: string;
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
  servicesOverview: {
    weddingsIntro: string;
    eventsIntro: string;
    portraitsIntro: string;
    videoProductionIntro: string;
    videoEditingIntro: string;
    ngoIntro: string;
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
    myStoryCta: string;
    photoPlaceholder: string;
  };
  portfolioPage: {
    title: string;
    subtitle: string;
    all: string;
    svadbe: string;
    rodjendani18: string;
    rodjendani1: string;
    krstenja: string;
    portreti: string;
    ngoOrganizacije: string;
    korporativniDogadjaji: string;
    noItems: string;
    loadMore: string;
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
    locationBadge: string;
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
      services: 'Usluge',
      weddings: 'Venčanja',
      events: 'Rođendani i događaji',
      portraits: 'Portreti',
      videoCombined: 'Video produkcija i postprodukcija',
      videoProduction: 'Video produkcija i snimanje',
      videoEditing: 'Video montaža i postprodukcija',
      ngo: 'Nevladine organizacije i institucije',
      portfolio: 'Portfolio',
      pricing: 'Paketi i cene',
      testimonials: 'Utisci klijenata',
      faq: 'Česta pitanja',
      contact: 'Kontakt i upiti',
      myStory: 'Moja priča',
      menu: 'Meni',
      closeMenu: 'Zatvori meni',
      quickInquiry: 'Zatraži ponudu',
    },
    hero: {
      tagline: 'Svaka priča ima svoj kadar.',
      subtitle: 'Dokumentujemo trenutke koji se ne mogu režirati — kroz fotografiju i film koji čuvaju pokret, karakter i atmosferu stvarnog života.',
      explorePortfolio: 'Pogledaj portfolio',
      requestQuote: 'Zatraži ponudu',
    },
    intro: {
      kicker: 'O vizuelnom pristupu',
      title: 'Između dokumentarne istine i filmske estetike',
      p1: 'Najjači kadrovi nikada ne nastaju na komandu „nasmejte se“. Oni se dešavaju u međuvremenu — u dubokom uzdahu pre početka ceremonije, u energiji punog podijuma ili u tihoj koncentraciji tokom rada na terenu. Naš zadatak nije da režiramo vaš događaj, već da ga posmatramo budno i pretvorimo u trajno vizuelno nasleđe.',
      p2: 'Bilo da kreiramo intimnu priču o venčanju, karakterni portret, dinamičnu montažu ili dokumentarni film za nevladin sektor, svakom projektu donosimo istu disciplinu: prepoznatljiv filmski kolorit, tehničku preciznost i potpunu posvećenost ljudima ispred objektiva.',
    },
    categoriesSection: {
      kicker: 'Usluge i oblasti rada',
      title: 'Šest formata. Jedan autorski pečat.',
      exploreCategory: 'Pogledaj detalje i galeriju',
    },
    servicesOverview: {
      weddingsIntro: 'Dan venčanja proleti brže nego što očekujete. Dok vi nazdravljate sa gostima i uživate u svom danu, mi beležimo sve ono što biste inače propustili — suzu u uglu oka vaših roditelja, smeh tokom jutarnjih priprema i filmsku atmosferu prvog plesa. Rezultat su fotografije i filmovi kojima se ne divite samo zbog estetike, već zato što vas i posle deset godina vraćaju tačno u taj osećaj.',
      eventsIntro: 'Punoletstva i porodični jubileji nose posebnu vrstu euforije. Umesto ukočenog ređanja za grupne fotografije, fokusiramo se na pokret, scenografiju, muziku i susrete generacija — stvarajući vizuelnu reportažu koja prenosi punu temperaturu vaše proslave.',
      portraitsIntro: 'Dobar portret ne pokazuje samo kako neko izgleda, već ko je ta osoba kada spusti gard. Radimo na lokacijama koje vama prijaju — pod otvorenim nebom ili uz pažljivo postavljenu rasvetu — kreirajući vizuelni identitet za kreativce, preduzetnike ili vašu ličnu kolekciju.',
      videoProductionIntro: 'Pokretna slika traži razmišljanje u scenama, zvuku i dinamici. Koristeći savremene kamere, stabilizaciju, dronove i profesionalno snimanje zvuka, pretvaramo događaje, proslave i autorske projekte u filmove koji imaju dubinu i bioskopski karakter.',
      videoEditingIntro: 'U montaži se priča zapravo rađa. Za produkcije, YouTube kreatore, podkaste i brendove preuzimamo kompletan proces postprodukcije: selekciju najboljih dublova, građenje ritma koji zadržava gledaoce, preciznu korekciju boja i pripremu za sve digitalne platforme.',
      ngoIntro: 'Projekti koji menjaju zajednicu zaslužuju više od protokolarnih fotografija. Sa direktnim iskustvom u nevladinom sektoru i dokumentarnom filmu, razumemo rad na terenu i standarde komunikacije prema donatorima i javnosti — pretvarajući vaše inicijative u snažne vizuelne dokaze o ostvarenom uticaju.',
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
      title: 'Video produkcija i snimanje',
      description: 'Profesionalno snimanje i kreiranje video sadržaja za događaje, proslave, venčanja, poslovne događaje, konferencije i organizacije.',
      watchShowreel: 'Pogledaj showreel',
      openYoutube: 'Poseti YouTube kanal',
    },
    ngoIntro: {
      kicker: 'Saradnja i partnerstva',
      title: 'Dokumentovanje nevladinih organizacija i institucija',
      description: 'Zabeležavanje konferencija, edukativnih radionica, terenskih poseta i društvenih inicijativa uz visoke profesionalne i etičke standarde.',
      learnMore: 'Pogledaj NGO usluge',
    },
    aboutPage: {
      title: 'O meni',
      kicker: 'Iza objektiva',
      quote: '„Kamera je samo alat. Ono što zaista pravi razliku jeste poverenje između čoveka iza objektiva i ljudi ispred njega.“',
      approachTitle: 'Filozofija rada',
      approachP1: 'Kroz AMOX Photography & Film gradim prostor u kome ne morate da glumite. Bilo da stojite pred objektivom prvi put u životu ili govorite pred punom konferencijskom salom, moj cilj je da budem prisutan, ali nevidljiv — da prepoznam pravi trenutak dok ste vi potpuno opušteni i svoji.',
      approachP2: 'Svaki projekat, od prve kafe i planiranja kadrova do finalnog kolorita u montaži, prolazi kroz moje ruke. Vi donosite svoju priču, a ja preuzimam brigu o svetlu, ritmu i atmosferi.',
      portfolioCta: 'Istraži portfolio radove',
      contactCta: 'Stupite u kontakt',
      myStoryCta: 'Moja priča',
      photoPlaceholder: 'Andrej Ristić · Osnivač i kreativni direktor',
    },
    portfolioPage: {
      title: 'Portfolio',
      subtitle: 'Pažljivo odabrani radovi po kategorijama događaja i projekata.',
      all: 'Sve',
      svadbe: 'Svadbe',
      rodjendani18: '18. rođendani',
      rodjendani1: '1. rođendani',
      krstenja: 'Krštenja',
      portreti: 'Portreti',
      ngoOrganizacije: 'NGO i organizacije',
      korporativniDogadjaji: 'Korporativni događaji',
      noItems: 'Trenutno nema fotografija u izabranoj kategoriji.',
      loadMore: 'Učitaj još',
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
      locationBadge: 'SURDULICA · SRBIJA · REGION',
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
      services: 'Services',
      weddings: 'Weddings',
      events: 'Birthdays & Events',
      portraits: 'Portraits',
      videoCombined: 'Video Production & Post-Production',
      videoProduction: 'Video Production & Filming',
      videoEditing: 'Video Editing & Post-Production',
      ngo: 'NGO & Organizations',
      portfolio: 'Portfolio',
      pricing: 'Packages & Pricing',
      testimonials: 'Client Testimonials',
      faq: 'FAQ',
      contact: 'Contact & Inquiries',
      myStory: 'My Story',
      menu: 'Menu',
      closeMenu: 'Close menu',
      quickInquiry: 'Request a Quote',
    },
    hero: {
      tagline: 'Every Story Has Its Frame.',
      subtitle: 'Documenting moments that cannot be staged — through photography and film that preserve the motion, character, and atmosphere of real life.',
      explorePortfolio: 'Explore Portfolio',
      requestQuote: 'Request a Quote',
    },
    intro: {
      kicker: 'Our Visual Philosophy',
      title: 'Between Documentary Truth and Cinematic Aesthetics',
      p1: 'The strongest frames never happen on cue when someone says “smile.” They unfold in the spaces in between — in a deep breath before the ceremony begins, in the electricity of a packed dance floor, or in the quiet focus of work in the field. Our role is not to stage your event, but to observe it attentively and turn it into a lasting visual legacy.',
      p2: 'Whether we are crafting an intimate wedding story, a character-driven portrait, a dynamic edit, or a documentary film for the non-profit sector, we bring the same discipline to every project: a signature cinematic color palette, technical precision, and complete dedication to the people in front of the lens.',
    },
    categoriesSection: {
      kicker: 'Services & Scope',
      title: 'Six Formats. One Signature Vision.',
      exploreCategory: 'View details & gallery',
    },
    servicesOverview: {
      weddingsIntro: 'Your wedding day flies by faster than you ever expect. While you raise a glass with your guests and savor every moment of your celebration, we capture everything you might otherwise miss — the quiet tear in the corner of your parents’ eyes, the laughter during morning preparations, and the cinematic atmosphere of your first dance. The result is photography and film you cherish not only for their aesthetic beauty, but because ten years later they bring you right back to that exact feeling.',
      eventsIntro: 'Coming-of-age celebrations and family milestones carry a distinct kind of euphoria. Instead of stiff, lined-up group photos, we focus on movement, stage design, music, and the meeting of generations — creating a visual reportage that captures the full pulse and energy of your celebration.',
      portraitsIntro: 'A compelling portrait shows not just how someone looks, but who they are when they let their guard down. We work in locations where you feel most comfortable — under open skies or with carefully sculpted lighting — crafting a visual identity for creatives, entrepreneurs, or your personal collection.',
      videoProductionIntro: 'Moving images demand thinking in scenes, sound, and dynamics. Using modern cameras, stabilization systems, drones, and professional audio recording, we transform events, celebrations, and signature projects into films with depth and theatrical character.',
      videoEditingIntro: 'The edit is where a story truly comes to life. For productions, YouTube creators, podcasts, and brands, we take over the entire post-production process: selecting the strongest takes, building a rhythm that holds viewers’ attention, precise color grading, and preparing deliverables for every digital platform.',
      ngoIntro: 'Projects that transform communities deserve far more than protocol photography. With firsthand experience in the non-profit sector and documentary filmmaking, we understand fieldwork and the communication standards expected by donors and the public — turning your initiatives into powerful visual proof of real-world impact.',
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
      title: 'Video Production & Filming',
      description: 'Professional video filming and production for events, celebrations, weddings, corporate gatherings, conferences, and organizations.',
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
      quote: '“The camera is only a tool. What truly makes the difference is the trust between the person behind the lens and the people in front of it.”',
      approachTitle: 'Working Philosophy',
      approachP1: 'Through AMOX Photography & Film, I create a space where you never have to perform. Whether you are standing in front of a lens for the first time in your life or speaking before a full conference hall, my goal is to be present yet invisible — recognizing the true moment while you remain completely relaxed and yourself.',
      approachP2: 'Every project — from our first coffee and frame planning to the final color grade in the edit — passes directly through my hands. You bring your story, and I take care of the light, rhythm, and atmosphere.',
      portfolioCta: 'Explore Portfolio Works',
      contactCta: 'Get in Touch',
      myStoryCta: 'My Story',
      photoPlaceholder: 'Andrej Ristić · Founder & Creative Director',
    },
    portfolioPage: {
      title: 'Portfolio',
      subtitle: 'Curated photographs organized by event and project category.',
      all: 'All',
      svadbe: 'Weddings',
      rodjendani18: '18th Birthdays',
      rodjendani1: '1st Birthdays',
      krstenja: 'Baptisms',
      portreti: 'Portraits',
      ngoOrganizacije: 'NGOs & Organizations',
      korporativniDogadjaji: 'Corporate Events',
      noItems: 'No photographs currently in this category.',
      loadMore: 'Load More',
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
      locationBadge: 'SURDULICA · SERBIA · REGION',
      clientGallery: 'Client Pic-Time Gallery',
      navigation: 'Navigation',
      social: 'Social Channels',
      contact: 'Direct Contact',
    },
  },
};
