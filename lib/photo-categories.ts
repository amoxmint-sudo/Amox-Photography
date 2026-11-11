export type PortfolioCategoryId =
  | 'svadbe'
  | '18-rodjendani'
  | '1-rodjendani'
  | 'krstenja'
  | 'portreti'
  | 'ngo-organizacije'
  | 'korporativni-dogadjaji';

export interface PhotoCategoryConfig {
  id: PortfolioCategoryId;
  folderName: PortfolioCategoryId;
  publicPathPrefix: `/photos/${PortfolioCategoryId}`;
  label: {
    sr: string;
    en: string;
  };
  subtitle: {
    sr: string;
    en: string;
  };
}

/**
 * Centralizovana definicija svih 7 kategorija portfolija i njihovih foldera u public/photos/
 */
export const PHOTO_GALLERY_CATEGORIES: readonly PhotoCategoryConfig[] = [
  {
    id: 'svadbe',
    folderName: 'svadbe',
    publicPathPrefix: '/photos/svadbe',
    label: {
      sr: 'Svadbe',
      en: 'Weddings',
    },
    subtitle: {
      sr: 'Autentični trenuci, emocije i pažljivo komponovani kadrovi venčanja',
      en: 'Authentic moments, emotions, and carefully composed wedding frames',
    },
  },
  {
    id: '18-rodjendani',
    folderName: '18-rodjendani',
    publicPathPrefix: '/photos/18-rodjendani',
    label: {
      sr: '18. rođendani',
      en: '18th Birthdays',
    },
    subtitle: {
      sr: 'Energija, portreti slavljenika i atmosfera proslave punoletstva',
      en: 'Energy, portraits, and atmosphere of 18th birthday celebrations',
    },
  },
  {
    id: '1-rodjendani',
    folderName: '1-rodjendani',
    publicPathPrefix: '/photos/1-rodjendani',
    label: {
      sr: '1. rođendani',
      en: '1st Birthdays',
    },
    subtitle: {
      sr: 'Porodična toplina, osmesi i nežni trenuci prvog rođendana',
      en: 'Family warmth, smiles, and tender moments of first birthdays',
    },
  },
  {
    id: 'krstenja',
    folderName: 'krstenja',
    publicPathPrefix: '/photos/krstenja',
    label: {
      sr: 'Krštenja',
      en: 'Baptisms',
    },
    subtitle: {
      sr: 'Svečani trenuci, tradicija i porodični detalji čina krštenja',
      en: 'Sacred moments, tradition, and family details of baptism ceremonies',
    },
  },
  {
    id: 'portreti',
    folderName: 'portreti',
    publicPathPrefix: '/photos/portreti',
    label: {
      sr: 'Portreti',
      en: 'Portraits',
    },
    subtitle: {
      sr: 'Individualni, editorial i lični portreti uz prirodno svetlo i autentičan izraz',
      en: 'Individual, editorial, and personal portraits embracing natural light and authentic expression',
    },
  },
  {
    id: 'ngo-organizacije',
    folderName: 'ngo-organizacije',
    publicPathPrefix: '/photos/ngo-organizacije',
    label: {
      sr: 'NGO i organizacije',
      en: 'NGOs & Organizations',
    },
    subtitle: {
      sr: 'Vizuelno dokumentovanje radionica, konferencija i projekata organizacija',
      en: 'Visual documentation of workshops, conferences, and institutional projects',
    },
  },
  {
    id: 'korporativni-dogadjaji',
    folderName: 'korporativni-dogadjaji',
    publicPathPrefix: '/photos/korporativni-dogadjaji',
    label: {
      sr: 'Korporativni događaji',
      en: 'Corporate Events',
    },
    subtitle: {
      sr: 'Profesionalni kadrovi poslovnih skupova, panela i korporativnih događaja',
      en: 'Professional coverage of business summits, panels, and corporate events',
    },
  },
] as const;

export const ALLOWED_PHOTO_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.avif'] as const;

const CATEGORY_MAP = new Map<PortfolioCategoryId, PhotoCategoryConfig>(
  PHOTO_GALLERY_CATEGORIES.map((cat) => [cat.id, cat])
);

export function getPhotoCategoryConfig(categoryId: string): PhotoCategoryConfig | undefined {
  return CATEGORY_MAP.get(categoryId as PortfolioCategoryId);
}

/**
 * Bezbedna validacija naziva fajla fotografije:
 * - zabranjuje skrivene fajlove (koji počinju tačkom),
 * - zabranjuje pokušaje izlaska iz direktorijuma (.., /, \),
 * - proverava da li je ekstenzija među dozvoljenim formatima (JPG, JPEG, PNG, WebP, AVIF).
 */
export function isValidPhotoFilename(filename: string): boolean {
  if (!filename || typeof filename !== 'string') return false;
  const trimmed = filename.trim();
  if (!trimmed || trimmed.startsWith('.')) return false;
  if (trimmed.includes('..') || trimmed.includes('/') || trimmed.includes('\\')) return false;

  const lower = trimmed.toLowerCase();
  return ALLOWED_PHOTO_EXTENSIONS.some((ext) => lower.endsWith(ext));
}

/**
 * Stabilno sortiranje fajlova (prirodni alfanumerički redosled: 01, 02, ..., 10).
 */
export function sortPhotoFilenames(filenames: string[]): string[] {
  return [...filenames].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' })
  );
}

export function inferAspectRatioFromFilename(
  filename: string
): 'landscape' | 'portrait' | 'square' {
  const lower = filename.toLowerCase();
  if (lower.includes('portret') || lower.includes('portrait') || lower.includes('vert')) {
    return 'portrait';
  }
  if (lower.includes('square') || lower.includes('kvadrat')) {
    return 'square';
  }
  return 'landscape';
}
