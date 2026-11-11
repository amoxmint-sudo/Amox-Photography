import React from 'react';
import type { Metadata } from 'next';
import {
  buildNextMetadata,
  resolveLanguageFromSearchParams,
} from '@/lib/seo';
import { MojaPricaPageClient } from '@/components/MojaPricaPageClient';

interface MojaPricaPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: MojaPricaPageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = resolveLanguageFromSearchParams(resolvedParams);
  return buildNextMetadata('moja-prica', lang);
}

export default async function MojaPricaPage({
  searchParams,
}: MojaPricaPageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = resolveLanguageFromSearchParams(resolvedParams);
  return <MojaPricaPageClient initialLang={lang} />;
}
