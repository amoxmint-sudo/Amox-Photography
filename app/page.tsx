import React from 'react';
import type { Metadata } from 'next';
import { buildNextMetadata } from '@/lib/seo';
import { HomePageClient } from '@/components/HomePageClient';

export const metadata: Metadata = buildNextMetadata(
  'home',
  'sr',
  'https://amoxphotography.com'
);

export default function HomePage() {
  return <HomePageClient initialLang="sr" />;
}
