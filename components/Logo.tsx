'use client';

import React from 'react';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/site-config';

interface LogoProps {
  className?: string;
  isLight?: boolean;
  onClick?: () => void;
  showSubtitle?: boolean;
}

/**
 * Textual logo component for AMOX PHOTOGRAPHY.
 * Can be easily swapped with a graphic SVG/PNG logo in the future if provided by the owner.
 */
export function Logo({
  className = '',
  isLight = false,
  onClick,
  showSubtitle = true,
}: LogoProps) {
  return (
    <Link
      href="/"
      onClick={onClick}
      className={`group inline-flex flex-col tracking-tight focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835] ${className}`}
      aria-label={`${SITE_CONFIG.name} — Početna`}
    >
      <span
        className={`font-sans text-sm sm:text-base font-semibold tracking-[0.28em] uppercase transition-colors ${
          isLight
            ? 'text-white group-hover:text-amber-100'
            : 'text-[#211B17] group-hover:text-[#8C5835]'
        }`}
      >
        {SITE_CONFIG.name}
      </span>
      {showSubtitle && (
        <span
          className={`text-[9px] sm:text-[10px] tracking-[0.35em] uppercase font-light -mt-0.5 transition-colors ${
            isLight ? 'text-stone-300' : 'text-[#85776B]'
          }`}
        >
          {SITE_CONFIG.subtitle}
        </span>
      )}
    </Link>
  );
}
