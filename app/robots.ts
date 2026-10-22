import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/site-config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = SITE_CONFIG.siteUrl || '';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: baseUrl ? `${baseUrl}/sitemap.xml` : undefined,
  };
}
