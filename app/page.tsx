import React from 'react';
import type { Metadata } from 'next';
import {
  buildNextMetadata,
  resolveLanguageFromSearchParams,
} from '@/lib/seo';
import { HomePageClient } from '@/components/HomePageClient';

interface HomePageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export async function generateMetadata({
  searchParams,
}: HomePageProps): Promise<Metadata> {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = resolveLanguageFromSearchParams(resolvedParams);
  return buildNextMetadata('home', lang);
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const lang = resolveLanguageFromSearchParams(resolvedParams);
  return <HomePageClient initialLang={lang} />;
}
