import test from 'node:test';
import assert from 'node:assert/strict';
import {
  validateContactForm,
  buildMailtoUrl,
  formatPlainTextInquiry,
  getLocalizedServiceLabel,
  buildWeb3FormsPayload,
  WEB3FORMS_ENDPOINT,
  WEB3FORMS_ACCESS_KEY,
} from './contact-utils';
import { SITE_CONFIG } from './site-config';
import { PACKAGES_DATA, PORTFOLIO_CATEGORIES } from './portfolio-data';

test('validateContactForm rejects empty required fields', () => {
  const result = validateContactForm(
    {
      fullName: '',
      email: '',
      serviceType: '',
    },
    'sr'
  );

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.serviceType);
});

test('validateContactForm validates valid data', () => {
  const result = validateContactForm(
    {
      fullName: 'Jelena Petrović',
      email: 'jelena@example.com',
      serviceType: 'Venčanja',
      phone: '+381601234567',
    },
    'sr'
  );

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateContactForm localized error messages in English', () => {
  const result = validateContactForm(
    {
      fullName: '',
      email: 'not-an-email',
      serviceType: '',
    },
    'en'
  );

  assert.equal(result.isValid, false);
  assert.match(result.errors.fullName || '', /Please enter your full name/i);
  assert.match(result.errors.email || '', /Please enter a valid email address/i);
});

test('buildMailtoUrl constructs correct encoded recipient, subject, and body', () => {
  const url = buildMailtoUrl(
    {
      fullName: 'Ana & Milan',
      email: 'ana@example.com',
      phone: '+38161111222',
      serviceType: 'Venčanja',
      eventDate: '2027-09-15',
      location: 'Novi Sad',
      message: 'Zanima nas celodnevno fotografisanje.',
    },
    'sr'
  );

  assert.ok(url.startsWith(`mailto:${SITE_CONFIG.email}?`));
  assert.ok(url.includes('subject='));
  assert.ok(url.includes('body='));
  assert.ok(!url.includes(' '));
  assert.ok(decodeURIComponent(url).includes('Ana & Milan'));
  assert.ok(decodeURIComponent(url).includes('Novi Sad'));
});

test('formatPlainTextInquiry includes all provided info', () => {
  const text = formatPlainTextInquiry(
    {
      fullName: 'Marko Marković',
      email: 'marko@example.com',
      serviceType: 'Portreti',
      location: 'Beograd',
    },
    'sr'
  );

  assert.ok(text.includes('Marko Marković'));
  assert.ok(text.includes('marko@example.com'));
  assert.ok(text.includes('Portreti'));
  assert.ok(text.includes('Beograd'));
});

test('buildWeb3FormsPayload includes access_key and all 7 form fields', () => {
  assert.equal(WEB3FORMS_ENDPOINT, 'https://api.web3forms.com/submit');
  assert.equal(WEB3FORMS_ACCESS_KEY, 'b5d0fd6c-e735-4d7b-bd5e-ddb63c891143');

  const payload = buildWeb3FormsPayload(
    {
      fullName: 'Marija Jovanović',
      email: 'marija@example.com',
      phone: '+381 60 123 4567',
      serviceType: 'Venčanja',
      eventDate: '15. septembar 2027.',
      location: 'Beograd',
      message: 'Želimo fotografisanje i snimanje.',
    },
    'sr'
  );

  assert.equal(payload.access_key, 'b5d0fd6c-e735-4d7b-bd5e-ddb63c891143');
  assert.equal(payload.fullName, 'Marija Jovanović');
  assert.equal(payload.name, 'Marija Jovanović');
  assert.equal(payload.email, 'marija@example.com');
  assert.equal(payload.phone, '+381 60 123 4567');
  assert.equal(payload.serviceType, 'Venčanja');
  assert.equal(payload.eventDate, '15. septembar 2027.');
  assert.equal(payload.location, 'Beograd');
  assert.equal(payload.message, 'Želimo fotografisanje i snimanje.');
});

test('PORTFOLIO_CATEGORIES has 6 separate cards (3x2 grid) with separate video filming and video editing cards, while PACKAGES_DATA and inquiry options also preserve both services', () => {
  assert.equal(PORTFOLIO_CATEGORIES.length, 6);
  assert.deepEqual(
    PORTFOLIO_CATEGORIES.map((c) => c.title.sr),
    [
      'Venčanja',
      'Rođendani i događaji',
      'Portreti',
      'Video produkcija i snimanje',
      'Video montaža i postprodukcija',
      'Nevladine organizacije i institucije',
    ]
  );

  const pkgIds = PACKAGES_DATA.map((p) => p.id);
  assert.ok(pkgIds.includes('pkg-video-production'));
  assert.ok(pkgIds.includes('pkg-video-editing'));
  assert.ok(!pkgIds.includes('pkg-video'));

  // Check SR and EN inquiry generation for both video services
  assert.equal(
    getLocalizedServiceLabel('Video produkcija i snimanje', 'en'),
    'Video Production & Filming'
  );
  assert.equal(
    getLocalizedServiceLabel('Video Editing & Post-Production', 'sr'),
    'Video montaža i postprodukcija'
  );

  const prodInquirySr = formatPlainTextInquiry(
    {
      fullName: 'Nikola Ilić',
      email: 'nikola@example.com',
      serviceType: 'Video produkcija i snimanje',
    },
    'sr'
  );
  assert.ok(prodInquirySr.includes('Vrsta usluge: Video produkcija i snimanje'));

  const editInquiryEn = formatPlainTextInquiry(
    {
      fullName: 'Elena Smith',
      email: 'elena@example.com',
      serviceType: 'Video Editing & Post-Production',
    },
    'en'
  );
  assert.ok(editInquiryEn.includes('Service Type: Video Editing & Post-Production'));
});

