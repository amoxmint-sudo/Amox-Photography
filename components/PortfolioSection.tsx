'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { PORTFOLIO_ITEMS, PortfolioItem } from '@/lib/portfolio-data';
import {
  PHOTO_GALLERY_CATEGORIES,
  PortfolioCategoryId,
  getPhotoCategoryConfig,
} from '@/lib/photo-categories';
import { buildPortfolioGalleryOrder } from '@/lib/photo-selection';
import { Maximize2, ImageOff, ChevronLeft, ChevronRight } from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';
import { computeStaggerDelay } from '@/lib/scroll-animation';

const INITIAL_PHOTO_COUNT = 6;
const PHOTO_BATCH_SIZE = 6;
const STAGGER_BATCH_MODULO = 6;

interface PortfolioSectionProps {
  lang: Language;
  visitSeed?: number;
  onOpenLightbox: (items: PortfolioItem[], index: number) => void;
  onItemsDiscovered?: (items: PortfolioItem[]) => void;
}

type FilterCategory = 'all' | PortfolioCategoryId;

export function PortfolioSection({
  lang,
  visitSeed = 1,
  onOpenLightbox,
  onItemsDiscovered,
}: PortfolioSectionProps) {
  const t = translations[lang];
  const prefersReducedMotion = useReducedMotion();
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('all');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_PHOTO_COUNT);
  const [items, setItems] = useState<PortfolioItem[]>(PORTFOLIO_ITEMS);
  const itemsSigRef = useRef<string>(
    PORTFOLIO_ITEMS.map((i) => `${i.id}:${i.imagePath}`).join('|')
  );
  const [columnCount, setColumnCount] = useState<number>(3);
  const [loadedDimensions, setLoadedDimensions] = useState<
    Record<string, { width: number; height: number }>
  >({});

  // Horizontal scroll state for single-row filter bar
  const filterScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [hasOverflow, setHasOverflow] = useState(true);

  const filterButtons: { id: FilterCategory; label: string }[] = useMemo(
    () => [
      { id: 'all', label: t.portfolioPage.all },
      ...PHOTO_GALLERY_CATEGORIES.map((cat) => ({
        id: cat.id,
        label: cat.label[lang],
      })),
    ],
    [lang, t.portfolioPage.all]
  );

  // Responsive column count for balanced masonry layout (1 on mobile, 2 on tablet, 3 on desktop)
  useEffect(() => {
    const updateColumns = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setColumnCount(1);
      } else if (w < 1024) {
        setColumnCount(2);
      } else {
        setColumnCount(3);
      }
    };
    updateColumns();
    window.addEventListener('resize', updateColumns);
    return () => window.removeEventListener('resize', updateColumns);
  }, []);

  const updateScrollIndicators = useCallback(() => {
    const el = filterScrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    setHasOverflow(maxScrollLeft > 2);
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(maxScrollLeft - el.scrollLeft > 4);
  }, []);

  useEffect(() => {
    updateScrollIndicators();
    const timer = setTimeout(updateScrollIndicators, 150);
    window.addEventListener('resize', updateScrollIndicators);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateScrollIndicators);
    };
  }, [lang, updateScrollIndicators]);

  /**
   * Automatski pomera horizontalni red filtera tako da zadati filter bude
   * jasno vidljiv u okviru trake filtera, bez vertikalnog skoka stranice.
   */
  const scrollCategoryIntoFilterBar = useCallback((categoryId: FilterCategory) => {
    const el = filterScrollRef.current;
    if (!el) return;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    if (maxScrollLeft <= 2) return;

    const targetBtn = el.querySelector<HTMLButtonElement>(
      `[data-filter-category="${categoryId}"]`
    );
    if (!targetBtn) return;

    const desiredLeft =
      targetBtn.offsetLeft - (el.clientWidth - targetBtn.offsetWidth) / 2;
    const clampedLeft = Math.max(0, Math.min(maxScrollLeft, desiredLeft));

    el.scrollTo({
      left: clampedLeft,
      behavior: 'smooth',
    });
  }, []);

  /**
   * Aktivira izabranu kategoriju i vraća prikaz na prvih 6 fotografija iz nove kategorije.
   */
  const activateCategory = useCallback(
    (categoryId: FilterCategory) => {
      setActiveFilter(categoryId);
      setVisibleCount(INITIAL_PHOTO_COUNT);
      scrollCategoryIntoFilterBar(categoryId);
    },
    [scrollCategoryIntoFilterBar]
  );

  /**
   * Kružni prelazak na prethodnu ili sledeću kategoriju portfolija pomoću strelica.
   * Sa poslednje kategorije desna strelica vraća na prvu, a sa prve leva vraća na poslednju.
   */
  const handleStepCategory = (direction: 'prev' | 'next') => {
    const currentIndex = filterButtons.findIndex((b) => b.id === activeFilter);
    const safeIndex = currentIndex === -1 ? 0 : currentIndex;
    const nextIndex =
      direction === 'next'
        ? (safeIndex + 1) % filterButtons.length
        : (safeIndex - 1 + filterButtons.length) % filterButtons.length;

    const targetCategory = filterButtons[nextIndex].id;
    activateCategory(targetCategory);
  };

  const handleFilterWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    const el = filterScrollRef.current;
    if (!el) return;
    if (el.scrollWidth > el.clientWidth && Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
      el.scrollLeft += e.deltaY;
      updateScrollIndicators();
    }
  };

  // Automatsko preuzimanje najnovije liste fotografija iz /api/photos (pri montiranju i vraćanju fokusa na prozor uz 30s zaštitu od suvišnih poziva)
  useEffect(() => {
    let isMounted = true;
    let activeController: AbortController | null = null;
    let lastFetchTime = 0;
    const FOCUS_SYNC_COOLDOWN_MS = 30000;

    const syncPhotosFromApi = (isFocusEvent = false) => {
      const now = Date.now();
      if (isFocusEvent && now - lastFetchTime < FOCUS_SYNC_COOLDOWN_MS) {
        return;
      }
      lastFetchTime = now;

      activeController?.abort();
      const controller = new AbortController();
      activeController = controller;

      fetch('/api/photos', { cache: 'no-store', signal: controller.signal })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (!isMounted || !data || !Array.isArray(data.items)) return;
          const incoming: PortfolioItem[] = data.items;
          const nextSig = incoming.map((i) => `${i.id}:${i.imagePath}`).join('|');
          if (itemsSigRef.current === nextSig) return;
          itemsSigRef.current = nextSig;
          setItems(incoming);
          onItemsDiscovered?.(incoming);
        })
        .catch(() => {
          // Zadržava inicijalnu listu iz manifesta ako API poziv nije dostupan ili je prekinut
        });
    };

    const handleWindowFocus = () => syncPhotosFromApi(true);

    syncPhotosFromApi(false);
    window.addEventListener('focus', handleWindowFocus);
    return () => {
      isMounted = false;
      activeController?.abort();
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [onItemsDiscovered]);

  // Generiši stabilan nasumičan redosled za trenutnu posetu (jednom po učitavanju stranice)
  // bez mutiranja originalnog niza `PORTFOLIO_ITEMS` ili `items`
  const portfolioOrder = useMemo(
    () => buildPortfolioGalleryOrder(items, visitSeed),
    [items, visitSeed]
  );

  // Izbor već generisanog nasumičnog redosleda za „Sve“ ili pojedinačnu kategoriju
  const filteredItems = useMemo(() => {
    if (activeFilter === 'all') {
      return portfolioOrder.all;
    }
    return portfolioOrder.byCategory[activeFilter] || [];
  }, [portfolioOrder, activeFilter]);

  // Prikaži prvih 6 fotografija (i dodaj po 6 na svaki klik „Učitaj još“) za svaku kategoriju i za „Sve“
  const visibleItems = useMemo(
    () => filteredItems.slice(0, visibleCount),
    [filteredItems, visibleCount]
  );

  // Raspodela vidljivih fotografija po kolonama za uredan masonry prikaz bez skakanja pri učitavanju novih
  const masonryColumns = useMemo(() => {
    const cols: { item: PortfolioItem; originalIndex: number }[][] = Array.from(
      { length: columnCount },
      () => []
    );
    visibleItems.forEach((item, index) => {
      cols[index % columnCount].push({ item, originalIndex: index });
    });
    return cols;
  }, [visibleItems, columnCount]);

  const hasMorePhotos = visibleCount < filteredItems.length;

  const handleLoadMore = () => {
    setVisibleCount((prev) =>
      Math.min(prev + PHOTO_BATCH_SIZE, filteredItems.length)
    );
  };

  return (
    <section id="portfolio" className="py-20 lg:py-32 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <EditorialReveal variant="heading">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
              {lang === 'sr' ? 'Izabrani kadrovi' : 'Visual Stories'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
              {t.portfolioPage.title}
            </h2>
          </EditorialReveal>
          <EditorialReveal variant="text" delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
              {t.portfolioPage.subtitle}
            </p>
          </EditorialReveal>
        </div>

        {/* Single-Row Horizontal Filter Bar with centered circular prev/next category arrows */}
        <EditorialReveal
          variant="fade-up"
          delay={0.14}
          className="relative max-w-4xl mx-auto mb-14"
        >
          <div className="relative flex items-center justify-center gap-2.5 sm:gap-3.5">
            {/* Kružno dugme sa strelicom ulevo (aktivira prethodni filter kružno) */}
            <button
              type="button"
              data-filter-arrow="left"
              onClick={() => handleStepCategory('prev')}
              aria-label={
                lang === 'sr' ? 'Prethodna kategorija' : 'Previous category'
              }
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 bg-[#FAF8F5] border border-[#D8CEBF] text-[#211B17] hover:border-[#8C5835] hover:bg-white hover:text-[#8C5835] active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
            >
              <ChevronLeft className="w-4 h-4 stroke-[1.5]" />
            </button>

            <div className="relative flex-1 min-w-0 overflow-hidden flex items-center">
              {/* Subtle left fade hint */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute left-0 top-0 bottom-0 w-5 sm:w-7 bg-gradient-to-r from-[#FAF8F5] to-transparent z-20 transition-opacity duration-200 ${
                  canScrollLeft ? 'opacity-100' : 'opacity-0'
                }`}
              />

              {/* Single-row horizontal scroll container */}
              <div
                ref={filterScrollRef}
                onScroll={updateScrollIndicators}
                onWheel={handleFilterWheel}
                data-filter-scroll-container="true"
                className={`w-full flex flex-nowrap items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar scroll-smooth touch-pan-x py-1 px-1 ${
                  !hasOverflow ? 'justify-center' : ''
                }`}
              >
                {filterButtons.map((btn) => {
                  const isActive = activeFilter === btn.id;
                  return (
                    <button
                      key={btn.id}
                      type="button"
                      data-filter-category={btn.id}
                      aria-pressed={isActive}
                      onClick={() => activateCategory(btn.id)}
                      className={`relative inline-flex items-center justify-center shrink-0 whitespace-nowrap h-9 sm:h-10 px-4 sm:px-5 text-xs uppercase tracking-[0.16em] font-medium transition-colors duration-200 border ${
                        isActive
                           ? 'text-white border-[#211B17] bg-[#211B17]'
                           : 'bg-white text-[#6E645A] hover:text-[#211B17] border-[#E0D7CB] hover:border-[#8C5835]'
                      } active:scale-[0.98] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]`}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="portfolio-active-filter"
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="absolute inset-0 bg-[#211B17] z-0"
                        />
                      )}
                      <span className="relative z-10">{btn.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Subtle right fade hint */}
              <div
                aria-hidden="true"
                className={`pointer-events-none absolute right-0 top-0 bottom-0 w-5 sm:w-7 bg-gradient-to-l from-[#FAF8F5] to-transparent z-20 transition-opacity duration-200 ${
                  canScrollRight ? 'opacity-100' : 'opacity-0'
                }`}
              />
            </div>

            {/* Kružno dugme sa strelicom udesno (aktivira sledeći filter kružno) */}
            <button
              type="button"
              data-filter-arrow="right"
              onClick={() => handleStepCategory('next')}
              aria-label={
                lang === 'sr' ? 'Sledeća kategorija' : 'Next category'
              }
              className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-full shrink-0 bg-[#FAF8F5] border border-[#D8CEBF] text-[#211B17] hover:border-[#8C5835] hover:bg-white hover:text-[#8C5835] active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]"
            >
              <ChevronRight className="w-4 h-4 stroke-[1.5]" />
            </button>
          </div>
        </EditorialReveal>

        {/* Masonry Gallery Grid preserving natural photograph proportions */}
        <AnimatePresence mode="wait">
          {visibleItems.length > 0 ? (
            <motion.div
              key={activeFilter}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
              transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                data-portfolio-grid="true"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-start"
              >
                {masonryColumns.map((colItems, colIdx) => (
                  <div
                    key={`masonry-col-${colIdx}`}
                    data-masonry-column={colIdx}
                    className="flex flex-col gap-6 sm:gap-7"
                  >
                    <AnimatePresence>
                      {colItems.map(({ item, originalIndex }) => {
                        const catConfig = getPhotoCategoryConfig(item.category);
                        const categoryLabel = catConfig ? catConfig.label[lang] : item.category;
                        const runtimeDims = loadedDimensions[item.id];
                        const fallbackWidth =
                          item.aspectRatio === 'portrait'
                            ? 900
                            : item.aspectRatio === 'square'
                            ? 1000
                            : 1200;
                        const fallbackHeight =
                          item.aspectRatio === 'portrait'
                            ? 1200
                            : item.aspectRatio === 'square'
                            ? 1000
                            : 900;
                        const resolvedWidth =
                          runtimeDims?.width || item.width || fallbackWidth;
                        const resolvedHeight =
                          runtimeDims?.height || item.height || fallbackHeight;

                        return (
                          <motion.div
                            key={item.id}
                            exit={
                              prefersReducedMotion
                                ? { opacity: 0, transition: { duration: 0 } }
                                : {
                                    opacity: 0,
                                    y: 6,
                                    transition: {
                                      duration: 0.36,
                                      ease: [0.22, 1, 0.36, 1],
                                    },
                                  }
                            }
                          >
                            <EditorialReveal
                              variant="card"
                              delay={computeStaggerDelay(originalIndex, 0.065, STAGGER_BATCH_MODULO)}
                            >
                              <div
                                data-portfolio-card={item.id}
                                onClick={() => onOpenLightbox(filteredItems, originalIndex)}
                                className="group relative bg-white overflow-hidden cursor-pointer border border-[#E0D7CB] hover:border-[#8C5835] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8C5835]"
                                tabIndex={0}
                                role="button"
                                aria-label={`${item.title[lang]} — ${
                                  lang === 'sr'
                                    ? 'otvori fotografiju u punoj veličini'
                                    : 'open full-size photograph'
                                }`}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    onOpenLightbox(filteredItems, originalIndex);
                                  }
                                }}
                              >
                                {/* Fotografija u originalnim proporcijama bez sečenja */}
                                <div className="relative w-full overflow-hidden bg-[#F3EFE9]">
                                  <Image
                                    src={item.imagePath}
                                    alt={item.alt[lang]}
                                    width={resolvedWidth}
                                    height={resolvedHeight}
                                    loading="lazy"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                    onLoad={(e) => {
                                      const img = e.currentTarget;
                                      if (img.naturalWidth > 0 && img.naturalHeight > 0) {
                                        const currentRatio = resolvedWidth / resolvedHeight;
                                        const naturalRatio = img.naturalWidth / img.naturalHeight;
                                        if (Math.abs(currentRatio - naturalRatio) > 0.01) {
                                          setLoadedDimensions((prev) =>
                                            prev[item.id]
                                              ? prev
                                              : {
                                                  ...prev,
                                                  [item.id]: {
                                                    width: img.naturalWidth,
                                                    height: img.naturalHeight,
                                                  },
                                                }
                                          );
                                        }
                                      }
                                    }}
                                    className="w-full h-auto object-contain block group-hover:scale-[1.025] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                                    referrerPolicy="no-referrer"
                                  />

                                  {/* Editorial hover scrim with animated title & category slide */}
                                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                                    <div className="transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]">
                                      <div className="flex items-center justify-between gap-2">
                                        <span className="text-[10px] uppercase font-mono tracking-widest text-amber-300">
                                          {categoryLabel}
                                        </span>
                                        <Maximize2 className="w-4 h-4 text-stone-200 transition-transform duration-300 group-hover:scale-110" />
                                      </div>

                                      <h3 className="font-serif-editorial text-lg sm:text-xl font-medium tracking-wide mt-1">
                                        {item.title[lang]}
                                      </h3>

                                      <p className="text-xs text-stone-300 mt-0.5 line-clamp-1">
                                        {item.subtitle[lang]}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                {/* Clean caption below photo */}
                                <div className="p-4 bg-white flex items-center justify-between gap-3 text-xs text-[#6E645A] border-t border-[#F3EFE9]">
                                  <span className="font-serif-editorial text-sm sm:text-base text-[#211B17] group-hover:text-[#8C5835] transition-colors duration-200 font-medium tracking-wide truncate">
                                    {item.title[lang]}
                                  </span>
                                  <span className="text-[10px] uppercase font-mono text-[#8C5835] shrink-0">
                                    {categoryLabel}
                                  </span>
                                </div>
                              </div>
                            </EditorialReveal>
                          </motion.div>
                        );
                      })}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              {/* Text-Only Load More Control */}
              {hasMorePhotos && (
                <EditorialReveal
                  variant="fade-up"
                  delay={0.08}
                  className="mt-14 sm:mt-16 pt-2 flex flex-wrap items-center justify-center"
                >
                  <button
                    type="button"
                    data-load-more-photos="true"
                    onClick={handleLoadMore}
                    className="group relative inline-flex flex-col items-center justify-center py-2 text-[11px] sm:text-xs uppercase tracking-[0.24em] font-medium text-[#211B17] hover:text-[#8C5835] bg-transparent border-0 cursor-pointer transition-colors duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:text-[#8C5835]"
                  >
                    <span>{t.portfolioPage.loadMore}</span>
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-px w-6 bg-[#8C5835]/35 group-hover:w-full group-hover:bg-[#8C5835] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    />
                  </button>
                </EditorialReveal>
              )}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${activeFilter}`}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="max-w-xl mx-auto py-16 px-6 text-center bg-white border border-[#EAE3D9]"
            >
              <ImageOff className="w-8 h-8 text-[#8C5835] mx-auto mb-3 stroke-[1.5]" />
              <p className="text-sm sm:text-base font-serif-editorial text-[#211B17]">
                {t.portfolioPage.noItems}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
