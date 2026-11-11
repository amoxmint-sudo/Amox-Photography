'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Language } from '@/lib/site-config';

interface LanguageSwitcherProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  className?: string;
  isLight?: boolean;
  layoutScope?: string;
}

export function LanguageSwitcher({
  currentLang,
  onLanguageChange,
  className = '',
  isLight = false,
  layoutScope = 'header',
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
        className={`relative px-2 py-1 transition-colors duration-200 rounded ${
          currentLang === 'sr'
            ? isLight
              ? 'text-white font-semibold'
              : 'text-[#211B17] font-semibold'
            : isLight
            ? 'text-stone-400 hover:text-white'
            : 'text-[#8A7D71] hover:text-[#211B17]'
        } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]`}
      >
        <span>SR</span>
        {currentLang === 'sr' && (
          <motion.span
            layoutId={`lang-indicator-${layoutScope}`}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-2 right-2 bottom-0.5 h-[1.5px] ${
              isLight ? 'bg-amber-300' : 'bg-[#8C5835]'
            }`}
          />
        )}
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
        className={`relative px-2 py-1 transition-colors duration-200 rounded ${
          currentLang === 'en'
            ? isLight
              ? 'text-white font-semibold'
              : 'text-[#211B17] font-semibold'
            : isLight
            ? 'text-stone-400 hover:text-white'
            : 'text-[#8A7D71] hover:text-[#211B17]'
        } focus:outline-none focus-visible:ring-1 focus-visible:ring-[#8C5835]`}
      >
        <span>EN</span>
        {currentLang === 'en' && (
          <motion.span
            layoutId={`lang-indicator-${layoutScope}`}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute left-2 right-2 bottom-0.5 h-[1.5px] ${
              isLight ? 'bg-amber-300' : 'bg-[#8C5835]'
            }`}
          />
        )}
      </button>
    </div>
  );
}
