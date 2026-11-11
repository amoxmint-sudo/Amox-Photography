import { MetadataRoute } from 'next';
import { getVerifiedProductionSiteUrl } from '@/lib/seo';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getVerifiedProductionSiteUrl();
  if (!baseUrl) {
    return [];
  }

  const routes = ['', '/moja-prica'];
  const now = new Date();

  return routes.flatMap((route) => {
    const srUrl = `${baseUrl}${route || '/'}`;
    const enUrl = `${baseUrl}${route || '/'}?lang=en`;
    const alternates = {
      languages: {
        sr: srUrl,
        en: enUrl,
      },
    };

    return [
      {
        url: srUrl,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1.0 : 0.85,
        alternates,
      },
      {
        url: enUrl,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 0.9 : 0.8,
        alternates,
      },
    ];
  });
}

