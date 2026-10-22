'use client';

import React from 'react';
import { Language } from '@/lib/site-config';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  isLight?: boolean;
}

export function LanguageSwitcher({
  currentLang,
  onLanguageChange,
  className = '',
  isLight = false,
}: LanguageSwitcherProps) {
  return (
    <div
      role="group"
      aria-label="Izbor jezika / Language selector"
      className={`inline-flex items-center text-xs tracking-wider uppercase font-medium ${className}`}
    >
      <button
        type="button"
        onClick={() => onLanguageChange('sr')}
        aria-pressed={currentLang === 'sr'}
        aria-label="Prikaži na srpskom jeziku"
        className={`px-2 py-1 transition-all rounded ${
          currentLang === 'sr'
            ? isLight
              ? 'text-white font-semibold underline underline-offset-4 decoration-amber-300'
              : 'text-[#211B17] font-semibold underline underline-offset-4 decoration-[#8C5835]'
            : isLight
            ? 'text-stone-400 hover:text-white'
            : 'text-[#8A7D71] hover:text-[#211B17]'
        } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]`}
      >
        SR
      </button>
      <span
        aria-hidden="true"
        className={`text-[10px] select-none ${isLight ? 'text-stone-600' : 'text-[#D5CCC0]'}`}
      >
        /
      </span>
      <button
        type="button"
        onClick={() => onLanguageChange('en')}
        aria-pressed={currentLang === 'en'}
        aria-label="Display in English"
        className={`px-2 py-1 transition-all rounded ${
          currentLang === 'en'
            ? isLight
              ? 'text-white font-semibold underline underline-offset-4 decoration-amber-300'
              : 'text-[#211B17] font-semibold underline underline-offset-4 decoration-[#8C5835]'
            : isLight
            ? 'text-stone-400 hover:text-white'
            : 'text-[#8A7D71] hover:text-[#211B17]'
        } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]`}
      >
        EN
      </button>
    </div>
  );
}
