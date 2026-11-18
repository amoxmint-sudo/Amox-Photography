import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadata } from '@/lib/seo';
import { MojaPricaPageClient } from '@/components/MojaPricaPageClient';

export const metadata: Metadata = buildNextMetadata(
  'moja-prica',
  'sr',
  'https://amoxphotography.com'
);

export default function MojaPricaPage() {
  return <MojaPricaPageClient initialLang="sr" />;
}
