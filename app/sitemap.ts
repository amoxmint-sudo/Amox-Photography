import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.siteUrl || '';
  if (!baseUrl) {
    return [];
  }

  const routes = [
    '',
    '/#portfolio',
    '/#weddings',
    '/#events',
    '/#portraits',
    '/#video',
    '/#ngo',
    '/#about',
    '/#pricing',
    '/#faq',
    '/#contact',
  ];

  const now = new Date();

  return routes.flatMap((route) => [
    {
      url: `${baseUrl}${route}?lang=sr`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 1.0 : 0.8,
    },
    {
      url: `${baseUrl}${route}?lang=en`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: route === '' ? 0.9 : 0.7,
    },
  ]);
}
