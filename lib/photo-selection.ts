import type { PortfolioItem } from './portfolio-data';
import type { PortfolioCategoryId } from './photo-categories';

export interface SectionPhotoAllocation {
  primary: PortfolioItem | null;
  allCategoryItems: PortfolioItem[];
}

export interface PagePhotoSelection {
  brandIntroCoverBySlug: Partial<Record<string, PortfolioItem>>;
  servicesBySlug: {
    weddings: SectionPhotoAllocation;
    events: SectionPhotoAllocation;
    portraits: SectionPhotoAllocation;
    ngo: SectionPhotoAllocation;
    corporate: SectionPhotoAllocation;
  };
}

/**
 * Deterministički generator pseudoslučajnih brojeva (Mulberry32) u opsegu [0, 1).
 * Omogućava stabilan izbor tokom jedne posete i ponovljive jedinične testove.
 */
export function createSeededRng(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Fisher-Yates mešanje niza bez mutiranja ulaznog niza.
 */
export function shuffleItems<T>(
  items: readonly T[],
  rng: () => number = Math.random
): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    const tmp = copy[i];
    copy[i] = copy[j];
    copy[j] = tmp;
  }
  return copy;
}

/**
 * Proverava stvarne dimenzije fotografije i vraća `true` isključivo ako fotografija
 * ima potvrđenu vertikalnu (portretnu) orijentaciju gde je visina veća od širine (`height > width`).
 */
export function isConfirmedVerticalPhoto(item: PortfolioItem): boolean {
  if (
    typeof item.width === 'number' &&
    typeof item.height === 'number' &&
    item.width > 0 &&
    item.height > 0
  ) {
    return item.height > item.width;
  }
  return false;
}

/**
 * Izdvaja jedinstvene fotografije za zadatu kategoriju (bez mešanja različitih kategorija)
 * ne menjajući redosled u glavnoj portfolio galeriji.
 */
export function getUniqueCategoryItems(
  items: readonly PortfolioItem[],
  categoryId: PortfolioCategoryId
): PortfolioItem[] {
  const seen = new Set<string>();
  const result: PortfolioItem[] = [];
  for (const item of items) {
    if (item.category !== categoryId) continue;
    if (seen.has(item.imagePath)) continue;
    seen.add(item.imagePath);
    result.push(item);
  }
  return result;
}

/**
 * Izdvaja isključivo vertikalne (`height > width`) fotografije iz zadate kategorije.
 */
export function getVerticalCategoryItems(
  items: readonly PortfolioItem[],
  categoryId: PortfolioCategoryId
): PortfolioItem[] {
  return getUniqueCategoryItems(items, categoryId).filter(isConfirmedVerticalPhoto);
}

/**
 * Bira po jednu vertikalnu fotografiju iz odgovarajuće kategorije za sekciju usluge
 * (`ServicesOverview`) i uvodnu karticu (`BrandIntro`), bez dodatnih malih fotografija.
 * - Koristi isključivo potvrđene vertikalne fotografije (`height > width`).
 * - Ne koristi istu fotografiju na dva mesta kada u kategoriji postoji više vertikalnih fotografija.
 */
function allocateSingleVerticalForCategory(
  allCategoryItems: readonly PortfolioItem[],
  rng: () => number,
  usedPaths: Set<string>
): {
  brandIntroItem: PortfolioItem | null;
  sectionAllocation: SectionPhotoAllocation;
} {
  const verticalItems = allCategoryItems.filter(isConfirmedVerticalPhoto);

  if (verticalItems.length === 0) {
    return {
      brandIntroItem: null,
      sectionAllocation: {
        primary: null,
        allCategoryItems: [...allCategoryItems],
      },
    };
  }

  const available = verticalItems.filter((item) => !usedPaths.has(item.imagePath));
  const pool = available.length > 0 ? available : verticalItems;
  const shuffled = shuffleItems(pool, rng);

  const primary = shuffled[0];
  usedPaths.add(primary.imagePath);

  const brandIntroItem = shuffled.length > 1 ? shuffled[1] : shuffled[0];
  usedPaths.add(brandIntroItem.imagePath);

  return {
    brandIntroItem,
    sectionAllocation: {
      primary,
      allCategoryItems: [...allCategoryItems],
    },
  };
}

/**
 * Kreira raspodelu vertikalnih fotografija po sekcijama usluga za trenutnu posetu:
 * - Svaka usluga dobija samo jednu glavnu vertikalnu fotografiju (`height > width`).
 * - Horizontalne fotografije i fotografije bez potvrđenih dimenzija se nikada ne biraju.
 * - Nikada ne meša fotografije iz različitih kategorija.
 * - Ostaje potpuno stabilna za zadati `seed` tokom skrolovanja, promene jezika i rada sa Lightbox-om.
 */
export function allocatePagePhotos(
  items: readonly PortfolioItem[],
  seed: number
): PagePhotoSelection {
  const rng = createSeededRng(seed);
  const usedPaths = new Set<string>();

  const svadbePool = getUniqueCategoryItems(items, 'svadbe');
  const rodjendani18Pool = getUniqueCategoryItems(items, '18-rodjendani');
  const portretiPool = getUniqueCategoryItems(items, 'portreti');
  const ngoPool = getUniqueCategoryItems(items, 'ngo-organizacije');
  const corporatePool = getUniqueCategoryItems(items, 'korporativni-dogadjaji');

  const weddingsAlloc = allocateSingleVerticalForCategory(svadbePool, rng, usedPaths);
  const eventsAlloc = allocateSingleVerticalForCategory(rodjendani18Pool, rng, usedPaths);
  const portraitsAlloc = allocateSingleVerticalForCategory(portretiPool, rng, usedPaths);
  const ngoAlloc = allocateSingleVerticalForCategory(ngoPool, rng, usedPaths);
  const corporateAlloc = allocateSingleVerticalForCategory(corporatePool, rng, usedPaths);

  const brandIntroCoverBySlug: Partial<Record<string, PortfolioItem>> = {};
  if (weddingsAlloc.brandIntroItem) {
    brandIntroCoverBySlug.weddings = weddingsAlloc.brandIntroItem;
  }
  if (eventsAlloc.brandIntroItem) {
    brandIntroCoverBySlug.events = eventsAlloc.brandIntroItem;
  }
  if (portraitsAlloc.brandIntroItem) {
    brandIntroCoverBySlug.portraits = portraitsAlloc.brandIntroItem;
  }
  if (ngoAlloc.brandIntroItem) {
    brandIntroCoverBySlug.ngo = ngoAlloc.brandIntroItem;
  }
  if (corporateAlloc.brandIntroItem) {
    brandIntroCoverBySlug.corporate = corporateAlloc.brandIntroItem;
  }

  return {
    brandIntroCoverBySlug,
    servicesBySlug: {
      weddings: weddingsAlloc.sectionAllocation,
      events: eventsAlloc.sectionAllocation,
      portraits: portraitsAlloc.sectionAllocation,
      ngo: ngoAlloc.sectionAllocation,
      corporate: corporateAlloc.sectionAllocation,
    },
  };
}

export interface PortfolioGalleryOrder {
  all: PortfolioItem[];
  byCategory: Record<PortfolioCategoryId, PortfolioItem[]>;
}

const ALL_PORTFOLIO_CATEGORY_IDS: readonly PortfolioCategoryId[] = [
  'svadbe',
  '18-rodjendani',
  '1-rodjendani',
  'krstenja',
  'portreti',
  'ngo-organizacije',
  'korporativni-dogadjaji',
];

/**
 * Generiše stabilan nasumičan redosled fotografija za portfolio galeriju na osnovu `seed` vrednosti posete:
 * - Ne menja ulazni niz `items` niti `PORTFOLIO_ITEMS`.
 * - Za svaku pojedinačnu kategoriju (`byCategory`) nasumično meša isključivo fotografije te kategorije.
 * - Za kategoriju „Sve“ (`all`) nasumično meša sve fotografije iz svih kategorija tako da se
 *   različite kategorije smenjuju i da se uzastopne fotografije iz iste kategorije izbegavaju
 *   kad god postoje fotografije iz drugih kategorija, zadržavajući sve postojeće fotografije.
 */
export function buildPortfolioGalleryOrder(
  items: readonly PortfolioItem[],
  seed: number
): PortfolioGalleryOrder {
  const rng = createSeededRng((seed ^ 0x9e3779b9) >>> 0);

  const byCategory: Record<PortfolioCategoryId, PortfolioItem[]> = {
    svadbe: [],
    '18-rodjendani': [],
    '1-rodjendani': [],
    krstenja: [],
    portreti: [],
    'ngo-organizacije': [],
    'korporativni-dogadjaji': [],
  };

  const seenKeys = new Set<string>();
  for (const item of items) {
    const uniqueKey = `${item.id}::${item.imagePath}`;
    if (seenKeys.has(uniqueKey)) continue;
    seenKeys.add(uniqueKey);
    if (byCategory[item.category]) {
      byCategory[item.category].push(item);
    }
  }

  for (const catId of ALL_PORTFOLIO_CATEGORY_IDS) {
    byCategory[catId] = shuffleItems(byCategory[catId], rng);
  }

  const queues = new Map<PortfolioCategoryId, PortfolioItem[]>();
  let remainingTotal = 0;
  for (const catId of ALL_PORTFOLIO_CATEGORY_IDS) {
    const list = byCategory[catId];
    if (list.length > 0) {
      queues.set(catId, [...list]);
      remainingTotal += list.length;
    }
  }

  const all: PortfolioItem[] = [];
  let lastCategory: PortfolioCategoryId | null = null;
  let secondLastCategory: PortfolioCategoryId | null = null;

  while (remainingTotal > 0) {
    const activeCategories = ALL_PORTFOLIO_CATEGORY_IDS.filter(
      (catId) => (queues.get(catId)?.length || 0) > 0
    );
    const otherCategories = activeCategories.filter(
      (catId) => catId !== lastCategory
    );
    const candidates =
      otherCategories.length > 0 ? otherCategories : activeCategories;

    const halfThreshold = Math.ceil(remainingTotal / 2);
    const urgentCandidates = candidates.filter(
      (catId) => (queues.get(catId)?.length || 0) >= halfThreshold
    );

    let pool: PortfolioCategoryId[];
    if (urgentCandidates.length > 0) {
      pool = urgentCandidates;
    } else {
      const diverseCandidates = candidates.filter(
        (catId) => catId !== secondLastCategory
      );
      pool = diverseCandidates.length > 0 ? diverseCandidates : candidates;
    }

    let chosenCategory = pool[0];
    if (pool.length > 1) {
      const totalWeight = pool.reduce(
        (sum, catId) => sum + (queues.get(catId)?.length || 0),
        0
      );
      let roll = rng() * totalWeight;
      for (const catId of pool) {
        roll -= queues.get(catId)?.length || 0;
        if (roll <= 0) {
          chosenCategory = catId;
          break;
        }
      }
    }

    const queue = queues.get(chosenCategory)!;
    const nextItem = queue.shift()!;
    all.push(nextItem);
    secondLastCategory = lastCategory;
    lastCategory = chosenCategory;
    remainingTotal -= 1;
  }

  return {
    all,
    byCategory,
  };
}

