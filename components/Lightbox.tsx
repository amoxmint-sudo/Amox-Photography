'use client';

import React, { useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PortfolioItem } from '@/lib/portfolio-data';
import { getPhotoCategoryConfig } from '@/lib/photo-categories';
import { Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface LightboxProps {
  isOpen: boolean;
  items: PortfolioItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (newIndex: number) => void;
  lang: Language;
}

export function Lightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
  lang,
}: LightboxProps) {
  const t = translations[lang];
  const prefersReducedMotion = useReducedMotion();
  const currentItem = items[currentIndex];
  const categoryLabel = currentItem
    ? getPhotoCategoryConfig(currentItem.category)?.label[lang] || currentItem.category
    : '';

  const handlePrev = useCallback(() => {
    if (items.length <= 1) return;
    const prev = currentIndex === 0 ? items.length - 1 : currentIndex - 1;
    onNavigate(prev);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    if (items.length <= 1) return;
    const next = currentIndex === items.length - 1 ? 0 : currentIndex + 1;
    onNavigate(next);
  }, [currentIndex, items.length, onNavigate]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  // Touch swipe support
  const touchStartX = React.useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
  };

  return (
    <AnimatePresence>
      {isOpen && currentItem && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={currentItem.title[lang]}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#120F0D]/95 text-stone-100 p-4 sm:p-6 backdrop-blur-md select-none"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top bar with counter, title, and close button */}
          <div className="flex items-center justify-between gap-4 max-w-7xl w-full mx-auto pb-3 border-b border-stone-800 shrink-0">
            <div className="flex items-center gap-3 text-xs tracking-widest uppercase font-mono text-stone-400">
              <span>
                {currentIndex + 1} {t.lightbox.counterOf} {items.length}
              </span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-200/90 hidden sm:inline">
                {categoryLabel}
              </span>
            </div>

            <div className="text-center truncate hidden sm:block max-w-md">
              <p className="text-sm font-serif-editorial text-stone-200 tracking-wide">
                {currentItem.title[lang]}
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label={t.lightbox.close}
              className="group flex items-center gap-1.5 p-2 rounded text-stone-300 hover:text-white hover:bg-stone-800 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-1 focus-visible:ring-amber-400 min-h-[44px] min-w-[44px] justify-center"
            >
              <span className="text-xs uppercase tracking-widest hidden sm:inline">
                Esc
              </span>
              <X className="w-6 h-6 stroke-[1.5] transition-transform duration-300 group-hover:rotate-90" />
            </button>
          </div>

          {/* Center media area with prev/next overlays and fluid photo transitions */}
          <div className="relative flex-1 flex items-center justify-center my-3 max-w-6xl w-full mx-auto overflow-hidden">
            {/* Previous button */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label={t.lightbox.prev}
                className="group absolute left-2 sm:left-4 z-10 p-3 rounded-full bg-black/45 hover:bg-black/85 text-white/90 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6 stroke-[2] transition-transform duration-200 group-hover:-translate-x-0.5" />
              </button>
            )}

            {/* Animated Active Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentItem.id}-${currentIndex}`}
                initial={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.96, y: 8 }
                }
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, scale: 0.98, y: -6 }
                }
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full h-full max-h-[75vh] flex items-center justify-center"
              >
                <Image
                  src={currentItem.imagePath}
                  alt={currentItem.alt[lang]}
                  fill
                  className="object-contain"
                  sizes="(max-width: 1024px) 100vw, 1200px"
                  priority
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </AnimatePresence>

            {/* Next button */}
            {items.length > 1 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label={t.lightbox.next}
                className="group absolute right-2 sm:right-4 z-10 p-3 rounded-full bg-black/45 hover:bg-black/85 text-white/90 hover:text-white hover:scale-105 active:scale-95 transition-all duration-200 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <ChevronRight className="w-6 h-6 stroke-[2] transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
            )}
          </div>

          {/* Bottom caption bar */}
          <div className="max-w-7xl w-full mx-auto pt-2 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-400 gap-1 shrink-0">
            <div>
              <span className="text-stone-300 font-serif-editorial text-base sm:text-lg block sm:inline">
                {currentItem.title[lang]}
              </span>
              <span className="hidden sm:inline mx-2 text-stone-600">|</span>
              <span className="text-stone-400 text-xs">
                {currentItem.subtitle[lang]}
              </span>
            </div>

            <div className="text-[11px] text-stone-500 font-mono tracking-wider">
              {currentItem.isPlaceholder && (
                <span className="text-amber-300/80">
                  [Placeholder — spreman za zamenu originalom]
                </span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
