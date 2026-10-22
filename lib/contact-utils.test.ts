import test from 'node:test';
import assert from 'node:assert/strict';
import { validateContactForm, buildMailtoUrl, formatPlainTextInquiry } from './contact-utils';
import { SITE_CONFIG } from './site-config';

test('validateContactForm rejects empty required fields', () => {
  const result = validateContactForm({
    fullName: '',
    email: '',
    serviceType: '',
  }, 'sr');

  assert.equal(result.isValid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.email);
  assert.ok(result.errors.serviceType);
});

test('validateContactForm validates valid data', () => {
  const result = validateContactForm({
    fullName: 'Jelena Petrović',
    email: 'jelena@example.com',
    serviceType: 'Venčanja',
    phone: '+381601234567',
  }, 'sr');

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('validateContactForm localized error messages in English', () => {
  const result = validateContactForm({
    fullName: '',
    email: 'not-an-email',
    serviceType: '',
  }, 'en');

  assert.equal(result.isValid, false);
  assert.match(result.errors.fullName || '', /Please enter your full name/i);
  assert.match(result.errors.email || '', /Please enter a valid email address/i);
});

test('buildMailtoUrl constructs correct encoded recipient, subject, and body', () => {
  const url = buildMailtoUrl({
    fullName: 'Ana & Milan',
    email: 'ana@example.com',
    phone: '+38161111222',
    serviceType: 'Venčanja',
    eventDate: '2027-09-15',
    location: 'Novi Sad',
    message: 'Zanima nas celodnevno fotografisanje.',
  }, 'sr');

  assert.ok(url.startsWith(`mailto:${SITE_CONFIG.email}?`));
  assert.ok(url.includes('subject='));
  assert.ok(url.includes('body='));
  // Ensure special characters and spaces are safely URI encoded
  assert.ok(!url.includes(' '));
  assert.ok(decodeURIComponent(url).includes('Ana & Milan'));
  assert.ok(decodeURIComponent(url).includes('Novi Sad'));
});

test('formatPlainTextInquiry includes all provided info', () => {
  const text = formatPlainTextInquiry({
    fullName: 'Marko Marković',
    email: 'marko@example.com',
    serviceType: 'Portreti',
    location: 'Beograd',
  }, 'sr');

  assert.ok(text.includes('Marko Marković'));
  assert.ok(text.includes('marko@example.com'));
  assert.ok(text.includes('Portreti'));
  assert.ok(text.includes('Beograd'));
});
