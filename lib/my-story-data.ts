import { Language, SITE_CONFIG } from './site-config';

export interface SelectedExperienceItem {
  id: string;
  num: string;
  title: string;
  yearOrFormat: string;
  categoryLabel: string;
  description: string;
  /**
   * Layout variant within the asymmetric magazine spread in Section 02:
   * - 'lead': dominant primary feature block (OBRUČ)
   * - 'major': secondary prominent feature block (MONACO YACHT SHOW — 2026)
   * - 'pair': mid-sized editorial column block (ROCK GARDEN, OVERLOAD)
   * - 'index': concise curatorial strip item (URBAN NO CONCEPT, SURDULICA KROZ OBJEKTIV)
   */
  layoutVariant: 'lead' | 'major' | 'pair' | 'index';
  /**
   * Optional authentic photograph path. Can be changed or set to null
   * independently for each project without affecting other items.
   */
  imageSrc: string | null;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
}

export interface CreativeProcessColumn {
  num: string;
  areaTitle: string;
  summary: string;
  roles: string[];
}

export interface CraftToolItem {
  num: string;
  name: string;
  purpose: string;
}

export interface MyStoryContent {
  breadcrumbHome: string;
  breadcrumbCurrent: string;
  hero: {
    sectionNum: string;
    publicationHeader: string;
    issueLabel: string;
    titleLines: [string, string];
    subtitle: string;
    intro: string;
    metaExperienceLabel: string;
    metaExperienceValue: string;
    metaDisciplineLabel: string;
    metaDisciplineValue: string;
    photoSrc: string;
    photoAlt: string;
    photoWidth: number;
    photoHeight: number;
    photoCaption: string;
    photoCode: string;
  };
  selectedExperience: {
    sectionNum: string;
    kicker: string;
    title: string;
    editorialNote: string;
    items: SelectedExperienceItem[];
  };
  creativeProcess: {
    sectionNum: string;
    kicker: string;
    title: string;
    intro: string;
    columns: [
      CreativeProcessColumn,
      CreativeProcessColumn,
      CreativeProcessColumn,
      CreativeProcessColumn
    ];
  };
  tools: {
    sectionNum: string;
    kicker: string;
    title: string;
    editorialNote: string;
    items: CraftToolItem[];
  };
  philosophy: {
    sectionNum: string;
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    pullQuote: string;
  };
  closing: {
    sectionNum: string;
    kicker: string;
    title: string;
    text: string;
    ctaLabel: string;
    portfolioCtaLabel: string;
  };
}

export const MY_STORY_CONTENT: Record<Language, MyStoryContent> = {
  sr: {
    breadcrumbHome: 'Početna',
    breadcrumbCurrent: 'Moja priča',

    // 01 — EDITORIAL HERO
    hero: {
      sectionNum: '01',
      publicationHeader: 'AMOX PHOTOGRAPHY & FILM',
      issueLabel: 'AUTORSKI PROFIL / 01',
      titleLines: ['„Slika je trenutak.', 'Priča je ono što ostaje.“'],
      subtitle: 'Fotografija. Video. Vizuelne priče.',
      intro:
        'Bavim se fotografijom, videografijom i vizuelnom produkcijom. Moj rad obuhvata različite faze kreativnog procesa — od snimanja i fotografisanja do montaže, kolor korekcije i postprodukcije.',
      metaExperienceLabel: 'Iskustvo',
      metaExperienceValue: '5+ godina iskustva',
      metaDisciplineLabel: 'Oblasti rada',
      metaDisciplineValue: 'Fotografija / Video / Postprodukcija',
      photoSrc: SITE_CONFIG.images.about,
      photoAlt: 'AMOX Photography & Film — autorski vizuelni arhiv',
      photoWidth: 896,
      photoHeight: 1200,
      photoCaption: 'Vizuelni arhiv — AMOX Photography & Film',
      photoCode: 'FIG. 01 / ARCHIVE',
    },

    // 02 — IZABRANO ISKUSTVO
    selectedExperience: {
      sectionNum: '02',
      kicker: '02 / IZABRANO ISKUSTVO',
      title: 'Rad koji govori umesto biografije.',
      editorialNote:
        'Odabrani produkcijski, video, festivalski i izlagački projekti.',
      items: [
        {
          id: 'obruc',
          num: '01',
          title: 'OBRUČ',
          yearOrFormat: 'DUGOMETRAŽNI FILM',
          categoryLabel: 'Produkcija i postprodukcija',
          description:
            'Učešće u produkciji i postprodukciji dugometražnog filma.',
          layoutVariant: 'lead',
          imageSrc: null,
        },
        {
          id: 'monaco-yacht-show-2026',
          num: '02',
          title: 'MONACO YACHT SHOW — 2026',
          yearOrFormat: '2026',
          categoryLabel: 'Međunarodni događaj',
          description:
            'Istaknuto profesionalno iskustvo povezano sa događajem Monaco Yacht Show 2026. godine.',
          layoutVariant: 'major',
          imageSrc: null,
        },
        {
          id: 'rock-garden-2026',
          num: '03',
          title: 'ROCK GARDEN — 2026',
          yearOrFormat: '2026',
          categoryLabel: 'Video produkcija',
          description: 'Video produkcija za Rock Garden 2026.',
          layoutVariant: 'pair',
          imageSrc: null,
        },
        {
          id: 'overload-2022-2024',
          num: '04',
          title: 'OVERLOAD — 2022 / 2024',
          yearOrFormat: '2022 / 2024',
          categoryLabel: 'Festivalska fotografija',
          description:
            'Fotografisanje na festivalu Overload tokom izdanja 2022. i 2024. godine.',
          layoutVariant: 'pair',
          imageSrc: null,
        },
        {
          id: 'urban-no-concept',
          num: '05',
          title: 'URBAN NO CONCEPT',
          yearOrFormat: 'IZLOŽBA',
          categoryLabel: 'Autorski rad',
          description: 'Izložba fotografija.',
          layoutVariant: 'index',
          imageSrc: null,
        },
        {
          id: 'surdulica-kroz-objektiv',
          num: '06',
          title: 'SURDULICA KROZ OBJEKTIV',
          yearOrFormat: 'IZLOŽBA',
          categoryLabel: 'Dokumentarna izložba',
          description:
            'Izložba fotografija posvećena vizuelnom predstavljanju Surdulice.',
          layoutVariant: 'index',
          imageSrc: null,
        },
      ],
    },

    // 03 — MOJ KREATIVNI PROCES
    creativeProcess: {
      sectionNum: '03',
      kicker: '03 / MOJ KREATIVNI PROCES',
      title: 'Od prvog kadra do poslednjeg detalja.',
      intro:
        'Moj rad povezuje fotografiju, video i postprodukciju. U zavisnosti od projekta, učestvujem u različitim fazama nastanka vizuelnog sadržaja — od snimanja do finalne obrade.',
      columns: [
        {
          num: '01',
          areaTitle: 'Fotografija',
          summary:
            'Kompozicija, rad sa svetlom na terenu i pažljiva obrada portreta i dokumentarnih serija.',
          roles: [
            'Fotograf',
            'Retušer fotografija',
            'Snimatelj događaja',
          ],
        },
        {
          num: '02',
          areaTitle: 'Video',
          summary:
            'Snimanje pokretne slike, oblikovanje ritma u montaži i završna kolor korekcija.',
          roles: [
            'Videograf',
            'Video montažer',
            'Kolorista / color grading',
          ],
        },
        {
          num: '03',
          areaTitle: 'Vizuelni sadržaj',
          summary:
            'Kreiranje vizuelnih materijala i perspektiva iz vazduha prilagođenih savremenim medijima.',
          roles: [
            'Dizajner vizuelnog sadržaja',
            'Dron operater',
          ],
        },
        {
          num: '04',
          areaTitle: 'Projektna saradnja',
          summary:
            'Realizacija vizuelnih i dokumentarnih zadataka u saradnji sa organizacijama i institucijama.',
          roles: [
            'Projektni saradnik za organizacije i institucije',
          ],
        },
      ],
    },

    // 04 — PROGRAMI I ALATI
    tools: {
      sectionNum: '04',
      kicker: '04 / PROGRAMI I ALATI',
      title: 'Alati mog zanata.',
      editorialNote:
        'Softverski alati za selekciju, obradu fotografija, video montažu, kolor korekciju i vizuelni dizajn.',
      items: [
        {
          num: '01',
          name: 'Adobe Lightroom',
          purpose: 'organizacija i obrada fotografija.',
        },
        {
          num: '02',
          name: 'Adobe Premiere Pro',
          purpose: 'video montaža.',
        },
        {
          num: '03',
          name: 'DaVinci Resolve',
          purpose: 'montaža i kolor obrada.',
        },
        {
          num: '04',
          name: 'Adobe Photoshop',
          purpose: 'napredna obrada fotografija i vizuelnih elemenata.',
        },
        {
          num: '05',
          name: 'CapCut',
          purpose: 'montaža i obrada video sadržaja.',
        },
        {
          num: '06',
          name: 'Canva',
          purpose: 'dizajn vizuelnih materijala.',
        },
        {
          num: '07',
          name: 'Evoto',
          purpose: 'retuširanje portreta.',
        },
      ],
    },

    // 05 — FILOZOFIJA RADA
    philosophy: {
      sectionNum: '05',
      kicker: '05 / FILOZOFIJA RADA',
      title: 'Više od dobrog kadra.',
      p1: 'Za mene fotografija i video nisu samo tehnički zapis događaja. Oni prenose atmosferu, čuvaju trenutke i stvaraju vizuelnu priču.',
      p2: 'U radu težim jednostavnosti, čistoći kadra, prirodnom osećaju trenutka i pažljivoj obradi koja naglašava suštinu, bez suvišnih efekata.',
      pullQuote:
        '„Oni prenose atmosferu, čuvaju trenutke i stvaraju vizuelnu priču.“',
    },

    // 06 — ZAVRŠNA SEKCIJA
    closing: {
      sectionNum: '06',
      kicker: '06 / ZAVRŠNA SEKCIJA',
      title: 'Hajde da stvorimo nešto posebno.',
      text: 'Otvoren sam za projekte u kojima se fotografija, video i vizuelno pripovedanje povezuju u jasnu i autentičnu priču.',
      ctaLabel: 'Stupite u kontakt',
      portfolioCtaLabel: 'Istraži portfolio radove',
    },
  },

  en: {
    breadcrumbHome: 'Home',
    breadcrumbCurrent: 'My Story',

    // 01 — EDITORIAL HERO
    hero: {
      sectionNum: '01',
      publicationHeader: 'AMOX PHOTOGRAPHY & FILM',
      issueLabel: 'AUTHOR PROFILE / 01',
      titleLines: ['“An image is a moment.', 'The story is what remains.”'],
      subtitle: 'Photography. Video. Visual Stories.',
      intro:
        'I work across photography, videography, and visual production. My practice spans different stages of the creative process — from video recording and photography to editing, color correction, and post-production.',
      metaExperienceLabel: 'Experience',
      metaExperienceValue: '5+ years of experience',
      metaDisciplineLabel: 'Disciplines',
      metaDisciplineValue: 'Photography / Video / Post-production',
      photoSrc: SITE_CONFIG.images.about,
      photoAlt: 'AMOX Photography & Film — visual archive frame',
      photoWidth: 896,
      photoHeight: 1200,
      photoCaption: 'Visual archive — AMOX Photography & Film',
      photoCode: 'FIG. 01 / ARCHIVE',
    },

    // 02 — SELECTED EXPERIENCE
    selectedExperience: {
      sectionNum: '02',
      kicker: '02 / SELECTED EXPERIENCE',
      title: 'Work that speaks instead of a biography.',
      editorialNote:
        'Selected production, video, festival, and exhibition projects.',
      items: [
        {
          id: 'obruc',
          num: '01',
          title: 'OBRUČ',
          yearOrFormat: 'FEATURE FILM',
          categoryLabel: 'Production & Post-Production',
          description:
            'Participation in the production and post-production of the feature film.',
          layoutVariant: 'lead',
          imageSrc: null,
        },
        {
          id: 'monaco-yacht-show-2026',
          num: '02',
          title: 'MONACO YACHT SHOW — 2026',
          yearOrFormat: '2026',
          categoryLabel: 'International Event',
          description:
            'Featured professional experience connected with the Monaco Yacht Show 2026 event.',
          layoutVariant: 'major',
          imageSrc: null,
        },
        {
          id: 'rock-garden-2026',
          num: '03',
          title: 'ROCK GARDEN — 2026',
          yearOrFormat: '2026',
          categoryLabel: 'Video Production',
          description: 'Video production for Rock Garden 2026.',
          layoutVariant: 'pair',
          imageSrc: null,
        },
        {
          id: 'overload-2022-2024',
          num: '04',
          title: 'OVERLOAD — 2022 / 2024',
          yearOrFormat: '2022 / 2024',
          categoryLabel: 'Festival Photography',
          description:
            'Festival photography at Overload in 2022 and 2024.',
          layoutVariant: 'pair',
          imageSrc: null,
        },
        {
          id: 'urban-no-concept',
          num: '05',
          title: 'URBAN NO CONCEPT',
          yearOrFormat: 'EXHIBITION',
          categoryLabel: 'Authored Work',
          description: 'Photography exhibition.',
          layoutVariant: 'index',
          imageSrc: null,
        },
        {
          id: 'surdulica-kroz-objektiv',
          num: '06',
          title: 'SURDULICA KROZ OBJEKTIV',
          yearOrFormat: 'EXHIBITION',
          categoryLabel: 'Documentary Exhibition',
          description:
            'Photography exhibition dedicated to the visual representation of Surdulica.',
          layoutVariant: 'index',
          imageSrc: null,
        },
      ],
    },

    // 03 — MY CREATIVE PROCESS
    creativeProcess: {
      sectionNum: '03',
      kicker: '03 / MY CREATIVE PROCESS',
      title: 'From the first frame to the final detail.',
      intro:
        'My work connects photography, video, and post-production. Depending on the project, I participate in different stages of creating visual content — from shooting to final finishing.',
      columns: [
        {
          num: '01',
          areaTitle: 'Photography',
          summary:
            'Composition, natural and directed light on location, and careful retouching of portrait and documentary series.',
          roles: [
            'Photographer',
            'Photo Retoucher',
            'Event Photographer & Cameraman',
          ],
        },
        {
          num: '02',
          areaTitle: 'Video',
          summary:
            'Capturing moving images, shaping narrative pacing in editing, and final color grading.',
          roles: [
            'Videographer',
            'Video Editor',
            'Colorist / color grading',
          ],
        },
        {
          num: '03',
          areaTitle: 'Visual Content',
          summary:
            'Designing visual materials and capturing aerial perspectives tailored for contemporary media.',
          roles: [
            'Visual Content Designer',
            'Drone Operator',
          ],
        },
        {
          num: '04',
          areaTitle: 'Project Collaboration',
          summary:
            'Delivering visual and documentary assignments in partnership with organizations and institutions.',
          roles: [
            'Project Collaborator for Organizations and Institutions',
          ],
        },
      ],
    },

    // 04 — SOFTWARE & TOOLS
    tools: {
      sectionNum: '04',
      kicker: '04 / SOFTWARE & TOOLS',
      title: 'Tools of my craft.',
      editorialNote:
        'Software environment for image curation, photo finishing, video editing, color grading, and visual design.',
      items: [
        {
          num: '01',
          name: 'Adobe Lightroom',
          purpose: 'photo organization and processing.',
        },
        {
          num: '02',
          name: 'Adobe Premiere Pro',
          purpose: 'video editing.',
        },
        {
          num: '03',
          name: 'DaVinci Resolve',
          purpose: 'editing and color grading.',
        },
        {
          num: '04',
          name: 'Adobe Photoshop',
          purpose: 'advanced processing of photographs and visual elements.',
        },
        {
          num: '05',
          name: 'CapCut',
          purpose: 'editing and processing of video content.',
        },
        {
          num: '06',
          name: 'Canva',
          purpose: 'design of visual materials.',
        },
        {
          num: '07',
          name: 'Evoto',
          purpose: 'portrait retouching.',
        },
      ],
    },

    // 05 — PHILOSOPHY OF WORK
    philosophy: {
      sectionNum: '05',
      kicker: '05 / PHILOSOPHY OF WORK',
      title: 'More than a good frame.',
      p1: 'For me, photography and video are not merely a technical record of an event. They convey atmosphere, preserve moments, and create a visual story.',
      p2: 'In my work, I strive for simplicity, clarity of framing, a natural feel for the moment, and careful finishing that emphasizes the essence without unnecessary effects.',
      pullQuote:
        '“They convey atmosphere, preserve moments, and create a visual story.”',
    },

    // 06 — CLOSING
    closing: {
      sectionNum: '06',
      kicker: '06 / CLOSING',
      title: 'Let’s create something special.',
      text: 'I am open to projects where photography, video, and visual storytelling come together into a clear and authentic story.',
      ctaLabel: 'Get in Touch',
      portfolioCtaLabel: 'Explore Portfolio Works',
    },
  },
};
