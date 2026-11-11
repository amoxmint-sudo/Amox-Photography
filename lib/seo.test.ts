import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getVerifiedProductionSiteUrl,
  resolveLanguageFromSearchParams,
  getPageSeoConfig,
  buildNextMetadata,
  buildLanguageSwitchUrl,
  syncDocumentSeoMetadata,
  buildPageJsonLd,
} from './seo';

test('getVerifiedProductionSiteUrl rejects empty, localhost, and ephemeral preview URLs and accepts real domains', () => {
  assert.equal(getVerifiedProductionSiteUrl(''), '');
  assert.equal(getVerifiedProductionSiteUrl('http://localhost:3000'), '');
  assert.equal(getVerifiedProductionSiteUrl('http://127.0.0.1:3000'), '');
  assert.equal(
    getVerifiedProductionSiteUrl(
      'https://ais-dev-v4y5hocyenco6mr2adimry-660272779634.europe-west2.run.app'
    ),
    ''
  );
  assert.equal(
    getVerifiedProductionSiteUrl('https://amoxphotography.com/'),
    'https://amoxphotography.com'
  );
  assert.equal(getVerifiedProductionSiteUrl(), 'https://amoxphotography.com');
});

test('resolveLanguageFromSearchParams defaults to sr and recognizes en', () => {
  assert.equal(resolveLanguageFromSearchParams(undefined), 'sr');
  assert.equal(resolveLanguageFromSearchParams({}), 'sr');
  assert.equal(resolveLanguageFromSearchParams({ lang: 'sr' }), 'sr');
  assert.equal(resolveLanguageFromSearchParams({ lang: 'en' }), 'en');
  assert.equal(resolveLanguageFromSearchParams({ lang: ['en', 'sr'] }), 'en');
  assert.equal(resolveLanguageFromSearchParams({ lang: 'fr' }), 'sr');
});

test('buildLanguageSwitchUrl produces clean URLs for sr (/ and /moja-prica), ?lang=en for en, and preserves unrelated params and hash fragments', () => {
  // Home route SR <-> EN
  assert.equal(buildLanguageSwitchUrl('http://localhost:3000/', 'en'), '/?lang=en');
  assert.equal(buildLanguageSwitchUrl('http://localhost:3000/?lang=en', 'sr'), '/');
  assert.equal(buildLanguageSwitchUrl('http://localhost:3000/?lang=sr', 'sr'), '/');

  // Moja priča route SR <-> EN
  assert.equal(
    buildLanguageSwitchUrl('http://localhost:3000/moja-prica', 'en'),
    '/moja-prica?lang=en'
  );
  assert.equal(
    buildLanguageSwitchUrl('http://localhost:3000/moja-prica?lang=en', 'sr'),
    '/moja-prica'
  );

  // Preserves hash fragments and unrelated query params
  assert.equal(
    buildLanguageSwitchUrl('http://localhost:3000/#portfolio', 'en'),
    '/?lang=en#portfolio'
  );
  assert.equal(
    buildLanguageSwitchUrl('http://localhost:3000/?lang=en#portfolio', 'sr'),
    '/#portfolio'
  );
  assert.equal(
    buildLanguageSwitchUrl(
      'http://localhost:3000/moja-prica?ref=ig&lang=en#izabrano-iskustvo',
      'sr'
    ),
    '/moja-prica?ref=ig#izabrano-iskustvo'
  );
});

test('getPageSeoConfig provides distinct SR and EN metadata for home and moja-prica without inventing canonical URL when domain is unconfigured', () => {
  const homeSr = getPageSeoConfig('home', 'sr', '');
  const homeEn = getPageSeoConfig('home', 'en', '');
  const storySr = getPageSeoConfig('moja-prica', 'sr', '');
  const storyEn = getPageSeoConfig('moja-prica', 'en', '');

  assert.notEqual(homeSr.title, homeEn.title);
  assert.notEqual(homeSr.description, homeEn.description);
  assert.notEqual(homeSr.title, storySr.title);
  assert.notEqual(homeEn.title, storyEn.title);
  assert.notEqual(homeSr.description, storySr.description);
  assert.notEqual(homeEn.description, storyEn.description);

  assert.equal(homeSr.ogLocale, 'sr_RS');
  assert.deepEqual(homeSr.alternateLocale, ['en_US']);
  assert.equal(homeEn.ogLocale, 'en_US');
  assert.deepEqual(homeEn.alternateLocale, ['sr_RS']);
  assert.equal(storySr.ogLocale, 'sr_RS');
  assert.deepEqual(storySr.alternateLocale, ['en_US']);
  assert.equal(storyEn.ogLocale, 'en_US');
  assert.deepEqual(storyEn.alternateLocale, ['sr_RS']);

  // No canonical URL or ogUrl when production domain is not configured
  assert.equal(homeSr.canonicalUrl, undefined);
  assert.equal(homeSr.ogUrl, undefined);
  assert.equal(storySr.canonicalUrl, undefined);
  assert.equal(storySr.ogUrl, undefined);

  // Relative hreflang alternates work reliably without a configured domain
  assert.deepEqual(homeSr.hreflangAlternates, {
    sr: '/',
    'sr-RS': '/',
    en: '/?lang=en',
    'x-default': '/',
  });
  assert.deepEqual(storySr.hreflangAlternates, {
    sr: '/moja-prica',
    'sr-RS': '/moja-prica',
    en: '/moja-prica?lang=en',
    'x-default': '/moja-prica',
  });
});

test('buildNextMetadata sets canonical, og:url, and absolute hreflang URLs only when a verified production domain is provided', () => {
  const metaWithoutDomain = buildNextMetadata('moja-prica', 'en', '');
  assert.equal(metaWithoutDomain.alternates?.canonical, undefined);
  assert.equal(metaWithoutDomain.openGraph?.url, undefined);

  const metaWithPreviewDomain = buildNextMetadata(
    'moja-prica',
    'en',
    'https://ais-dev-v4y5hocyenco6mr2adimry-660272779634.europe-west2.run.app'
  );
  assert.equal(metaWithPreviewDomain.alternates?.canonical, undefined);
  assert.equal(metaWithPreviewDomain.openGraph?.url, undefined);

  const metaWithDomain = buildNextMetadata(
    'moja-prica',
    'en',
    'https://amoxphotography.com'
  );
  assert.equal(
    metaWithDomain.alternates?.canonical,
    'https://amoxphotography.com/moja-prica?lang=en'
  );
  assert.equal(
    metaWithDomain.openGraph?.url,
    'https://amoxphotography.com/moja-prica?lang=en'
  );
  assert.deepEqual(metaWithDomain.alternates?.languages, {
    sr: 'https://amoxphotography.com/moja-prica',
    'sr-RS': 'https://amoxphotography.com/moja-prica',
    en: 'https://amoxphotography.com/moja-prica?lang=en',
    'x-default': 'https://amoxphotography.com/moja-prica',
  });
});

test('syncDocumentSeoMetadata updates all existing SEO tags across SR -> EN -> SR transitions without creating duplicates or exposing preview domains', () => {
  const elementsBySelector = new Map<
    string,
    { attrs: Record<string, string>; setAttribute: (k: string, v: string) => void }
  >();

  const registerElement = (selector: string, initialAttrs: Record<string, string>) => {
    const attrs = { ...initialAttrs };
    elementsBySelector.set(selector, {
      attrs,
      setAttribute(k: string, v: string) {
        attrs[k] = v;
      },
    });
  };

  registerElement('meta[name="description"]', { content: '' });
  registerElement('meta[property="og:title"]', { content: '' });
  registerElement('meta[property="og:description"]', { content: '' });
  registerElement('meta[property="og:locale"]', { content: 'sr_RS' });
  registerElement('meta[property="og:locale:alternate"]', { content: 'en_US' });
  registerElement('meta[property="og:image:alt"]', { content: '' });
  registerElement('meta[property="og:url"]', { content: 'https://amoxphotography.com/' });
  registerElement('meta[name="twitter:title"]', { content: '' });
  registerElement('meta[name="twitter:description"]', { content: '' });
  registerElement('meta[name="twitter:image:alt"]', { content: '' });
  registerElement('link[rel="canonical"]', { href: 'https://amoxphotography.com/' });

  const initialElementCount = elementsBySelector.size;

  const mockDocument = {
    documentElement: { lang: 'sr' },
    title: '',
    querySelector(selector: string) {
      return elementsBySelector.get(selector) || null;
    },
  };

  const originalDocument = (globalThis as { document?: unknown }).document;
  (globalThis as { document?: unknown }).document = mockDocument;

  try {
    // 1. Transition to EN with unconfigured/preview domain -> canonical & og:url must NOT be overwritten with preview domain
    syncDocumentSeoMetadata(
      'home',
      'en',
      'https://ais-dev-v4y5hocyenco6mr2adimry-660272779634.europe-west2.run.app'
    );

    assert.equal(mockDocument.documentElement.lang, 'en');
    assert.equal(
      mockDocument.title,
      'AMOX Photography & Film — Photography & Video Production'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:locale"]')?.attrs.content,
      'en_US'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:locale:alternate"]')?.attrs.content,
      'sr_RS'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:image:alt"]')?.attrs.content,
      'AMOX Photography & Film — authentic photography and video production'
    );
    assert.equal(
      elementsBySelector.get('meta[name="twitter:image:alt"]')?.attrs.content,
      'AMOX Photography & Film — authentic photography and video production'
    );
    // Unchanged because preview domain was rejected
    assert.equal(
      elementsBySelector.get('link[rel="canonical"]')?.attrs.href,
      'https://amoxphotography.com/'
    );

    // 2. Transition to EN with verified production domain -> updates canonical and og:url
    syncDocumentSeoMetadata('home', 'en', 'https://amoxphotography.com');
    assert.equal(
      elementsBySelector.get('link[rel="canonical"]')?.attrs.href,
      'https://amoxphotography.com/?lang=en'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:url"]')?.attrs.content,
      'https://amoxphotography.com/?lang=en'
    );

    // 3. Transition back to SR -> restores SR metadata and clean SR canonical URL
    syncDocumentSeoMetadata('home', 'sr', 'https://amoxphotography.com');
    assert.equal(mockDocument.documentElement.lang, 'sr');
    assert.equal(
      mockDocument.title,
      'AMOX Photography & Film — Fotografija i video produkcija'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:locale"]')?.attrs.content,
      'sr_RS'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:locale:alternate"]')?.attrs.content,
      'en_US'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:image:alt"]')?.attrs.content,
      'AMOX Photography & Film — autentična fotografija i video produkcija'
    );
    assert.equal(
      elementsBySelector.get('link[rel="canonical"]')?.attrs.href,
      'https://amoxphotography.com/'
    );
    assert.equal(
      elementsBySelector.get('meta[property="og:url"]')?.attrs.content,
      'https://amoxphotography.com/'
    );

    // Confirm zero new/duplicate elements were created
    assert.equal(elementsBySelector.size, initialElementCount);
  } finally {
    (globalThis as { document?: unknown }).document = originalDocument;
  }
});

test('buildPageJsonLd generates valid Schema.org structured data for home and moja-prica in SR and EN', () => {
  const homeJsonSr = buildPageJsonLd('home', 'sr', '');
  const storyJsonEn = buildPageJsonLd('moja-prica', 'en', '');

  assert.equal(homeJsonSr['@context'], 'https://schema.org');
  assert.ok(Array.isArray(homeJsonSr['@graph']));
  assert.equal(storyJsonEn['@context'], 'https://schema.org');
  assert.equal(storyJsonEn['@type'], 'ProfilePage');
  assert.equal(storyJsonEn.inLanguage, 'en');
});
