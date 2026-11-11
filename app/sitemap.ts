import { MetadataRoute } from 'next';

const BASE_URL = 'https://amoxphotography.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/moja-prica'];
  const now = new Date();

  return routes.flatMap((route) => {
    const srUrl = `${BASE_URL}${route || '/'}`;
    const enUrl = `${BASE_URL}${route || '/'}?lang=en`;
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

