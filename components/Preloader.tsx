'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SITE_CONFIG } from '@/lib/site-config';

export function Preloader() {
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem('amox_seen_preloader');
      if (!hasSeen) {
        // Trigger show via async timer to prevent SSR hydration mismatch and avoid synchronous effect state mutation
        const showTimer = setTimeout(() => {
          setShow(true);
        }, 10);

        const hideTimer = setTimeout(() => {
          setShow(false);
          try {
            sessionStorage.setItem('amox_seen_preloader', 'true');
          } catch {
            // ignore in private browsing
          }
        }, 750);

        return () => {
          clearTimeout(showTimer);
          clearTimeout(hideTimer);
        };
      }
    } catch {
      // ignore
    }
  }, []);

  if (!show) return null;

  return (
    <AnimatePresence>
      <motion.div
        role="status"
        aria-label="Učitavanje AMOX Photography sajta"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FAF8F5] text-[#211B17] pointer-events-none select-none"
      >
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="text-center"
        >
          <span className="font-sans text-xs sm:text-sm font-semibold tracking-[0.38em] uppercase block">
            {SITE_CONFIG.name}
          </span>
          <span className="text-[10px] tracking-[0.45em] uppercase text-[#85776B] font-light mt-1 block">
            {SITE_CONFIG.subtitle}
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
