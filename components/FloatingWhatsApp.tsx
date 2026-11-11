'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG, Language } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import { MessageCircle } from 'lucide-react';

interface FloatingWhatsAppProps {
  lang: Language;
}

export function FloatingWhatsApp({ lang }: FloatingWhatsAppProps) {
  const t = translations[lang];
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.aside
      aria-label="Brzi kontakt preko WhatsApp-a"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-30 pointer-events-auto"
    >
      <a
        href={SITE_CONFIG.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp.label}
        title={t.whatsapp.label}
        className="group flex items-center gap-2.5 bg-[#25D366] text-white px-3.5 py-3 rounded-full shadow-lg shadow-black/15 hover:shadow-xl hover:bg-[#20bd5a] hover:-translate-y-1 hover:scale-[1.03] active:translate-y-0 active:scale-95 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#25D366] min-h-[44px] min-w-[44px]"
      >
        <MessageCircle className="w-5 h-5 fill-current shrink-0 transition-transform duration-200 group-hover:rotate-6" />
        <span className="text-xs font-medium tracking-wide uppercase pr-1 hidden md:inline-block">
          WhatsApp
        </span>
      </a>
    </motion.aside>
  );
}
