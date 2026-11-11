'use client';

import React, { useState, useEffect } from 'react';
import { SITE_CONFIG } from '@/lib/site-config';

export function Preloader() {
  const [mounted, setMounted] = useState<boolean>(true);
  const [exiting, setExiting] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(12);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const activeDurationMs = prefersReduced ? 350 : 1750;
    const exitDurationMs = prefersReduced ? 200 : 450;

    const startTime = Date.now();
    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const ratio = Math.min(1, elapsed / (activeDurationMs - 120));
      const eased = 1 - Math.pow(1 - ratio, 3);
      setProgress(Math.max(12, Math.round(eased * 100)));
    }, 30);

    const exitTimer = setTimeout(() => {
      setProgress(100);
      setExiting(true);
    }, activeDurationMs);

    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, activeDurationMs + exitDurationMs);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      aria-label="Učitavanje AMOX Photography sajta"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#1B1613] text-[#FAF8F5] pointer-events-none select-none overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting ? 'opacity-0 scale-[1.02]' : 'opacity-100 scale-100'
      }`}
    >
      {/* Subtle warm studio ambient light */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(140,88,53,0.22)_0%,rgba(27,22,19,0)_68%)]"
      />

      {/* Expanding camera viewfinder frame ("otvaranje kadra") */}
      <div className="animate-preloader-frame relative w-[88vw] max-w-xl px-8 py-14 sm:px-14 sm:py-16 flex flex-col items-center justify-center">
        {/* Viewfinder Corner Marks */}
        <span
          aria-hidden="true"
          className="absolute top-0 left-0 w-6 h-6 border-t border-l border-[#8C5835]/80"
        />
        <span
          aria-hidden="true"
          className="absolute top-0 right-0 w-6 h-6 border-t border-r border-[#8C5835]/80"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-[#8C5835]/80"
        />
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-[#8C5835]/80"
        />

        {/* Top Frame Metadata */}
        <div className="w-full flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.28em] text-[#A69686] mb-8">
          <span>FRAME 01 · EDITORIAL</span>
          <span className="tabular-nums text-amber-200/90">
            {String(progress).padStart(3, '0')}%
          </span>
        </div>

        {/* Brand Title & Subtitle Reveal */}
        <div className="animate-preloader-text text-center space-y-2.5">
          <span className="font-sans text-sm sm:text-base md:text-lg font-semibold tracking-[0.42em] uppercase text-[#FAF8F5] block">
            {SITE_CONFIG.name}
          </span>

          <span className="text-[10px] sm:text-[11px] tracking-[0.48em] uppercase text-amber-200/85 font-light block">
            {SITE_CONFIG.subtitle}
          </span>

          <p className="pt-2 font-serif-editorial italic text-sm sm:text-base text-stone-300/90 tracking-wide">
            „{SITE_CONFIG.slogan.sr}“
          </p>
        </div>

        {/* Smooth Progress Line */}
        <div className="w-full max-w-xs mt-9">
          <div className="h-[1.5px] w-full bg-[#2C241E] overflow-hidden relative">
            <div className="animate-preloader-progress h-full w-full bg-gradient-to-r from-[#8C5835] via-amber-200/90 to-[#8C5835]" />
          </div>
        </div>
      </div>
    </div>
  );
}
