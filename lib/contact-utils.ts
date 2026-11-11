import { SITE_CONFIG, Language } from './site-config';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone?: string;
  serviceType: string;
  eventDate?: string;
  location?: string;
  message?: string;
}

export interface ValidationErrors {
  fullName?: string;
  email?: string;
  serviceType?: string;
}

export interface ServiceOptionDefinition {
  key: string;
  label: {
    sr: string;
    en: string;
  };
  aliases: string[];
}

export const CONTACT_SERVICE_OPTIONS: readonly ServiceOptionDefinition[] = [
  {
    key: 'weddings',
    label: { sr: 'Venčanja', en: 'Weddings' },
    aliases: ['weddings', 'svadbe', 'venčanja', 'vencanja', 'venčanja / weddings'],
  },
  {
    key: 'events',
    label: { sr: 'Rođendani i događaji', en: 'Birthdays & Events' },
    aliases: [
      'events',
      'rođendani i događaji',
      'birthdays & events',
      'proslave i događaji',
      'celebrations & events',
      '18. rođendani',
      '1. rođendani',
      'krštenja',
      'rođendani i događaji / events',
    ],
  },
  {
    key: 'portraits',
    label: { sr: 'Portreti', en: 'Portraits' },
    aliases: ['portraits', 'portreti', 'portreti / portraits'],
  },
  {
    key: 'video-production',
    label: { sr: 'Video produkcija i snimanje', en: 'Video Production & Filming' },
    aliases: [
      'video-production',
      'video produkcija i snimanje',
      'video production & filming',
      'video produkcija i montaža',
      'video production & editing',
      'video produkcija',
      'video production',
    ],
  },
  {
    key: 'video-editing',
    label: { sr: 'Video montaža i postprodukcija', en: 'Video Editing & Post-Production' },
    aliases: [
      'video-editing',
      'video montaža i postprodukcija',
      'video editing & post-production',
      'video montaža',
      'video editing',
    ],
  },
  {
    key: 'ngo',
    label: { sr: 'Nevladine organizacije i institucije', en: 'NGO & Organizations' },
    aliases: [
      'ngo',
      'ngo-organizacije',
      'nevladine organizacije i institucije',
      'nevladine organizacije',
      'ngo & organizations',
      'ngos & organizations',
      'nevladine organizacije / ngo',
    ],
  },
  {
    key: 'corporate',
    label: { sr: 'Korporativni događaji', en: 'Corporate Events' },
    aliases: ['corporate', 'korporativni-dogadjaji', 'korporativni događaji', 'corporate events'],
  },
  {
    key: 'other',
    label: { sr: 'Drugo / Više usluga', en: 'Other / Multiple Services' },
    aliases: ['other', 'ostalo', 'drugo / više usluga', 'other / multiple services', 'ostalo / other'],
  },
] as const;

/**
 * Pronalazi kanonsku definiciju usluge na osnovu ključa ili naziva na srpskom/engleskom jeziku.
 */
export function findServiceOption(input?: string): ServiceOptionDefinition | undefined {
  if (!input || !input.trim()) return undefined;
  const normalized = input.trim().toLowerCase();
  return CONTACT_SERVICE_OPTIONS.find(
    (opt) =>
      opt.key === normalized ||
      opt.label.sr.toLowerCase() === normalized ||
      opt.label.en.toLowerCase() === normalized ||
      opt.aliases.includes(normalized)
  );
}

/**
 * Vraća lokalizovani naziv usluge za prikaz u select polju i u generisanom tekstu upita.
 */
export function getLocalizedServiceLabel(serviceInput: string, lang: Language = 'sr'): string {
  const matched = findServiceOption(serviceInput);
  if (matched) {
    return matched.label[lang];
  }
  return serviceInput.trim();
}

export function validateContactForm(
  data: ContactFormData,
  lang: Language = 'sr'
): { isValid: boolean; errors: ValidationErrors } {
  const errors: ValidationErrors = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName =
      lang === 'sr'
        ? 'Molimo unesite vaše ime i prezime (najmanje 2 karaktera).'
        : 'Please enter your full name (at least 2 characters).';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailRegex.test(data.email.trim())) {
    errors.email =
      lang === 'sr'
        ? 'Molimo unesite važeću email adresu.'
        : 'Please enter a valid email address.';
  }

  if (!data.serviceType || data.serviceType.trim().length === 0) {
    errors.serviceType =
      lang === 'sr'
        ? 'Molimo izaberite vrstu usluge.'
        : 'Please select a service type.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

export function buildMailtoUrl(data: ContactFormData, lang: Language = 'sr'): string {
  const isSr = lang === 'sr';
  const serviceLabel = data.serviceType
    ? getLocalizedServiceLabel(data.serviceType, lang)
    : isSr
    ? 'Opšti upit'
    : 'General Inquiry';
  const subject = isSr
    ? `[AMOX Upit] ${serviceLabel} - ${data.fullName.trim()}`
    : `[AMOX Inquiry] ${serviceLabel} - ${data.fullName.trim()}`;

  const bodyLines = [
    isSr ? 'Poštovani AMOX Photography & Film,' : 'Dear AMOX Photography & Film,',
    '',
    isSr
      ? 'Šaljem vam upit sa zvaničnog sajta:'
      : 'I am sending an inquiry via your official website:',
    '',
    `${isSr ? 'Ime i prezime' : 'Full Name'}: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    `${isSr ? 'Telefon' : 'Phone'}: ${data.phone?.trim() || (isSr ? 'Nije navedeno' : 'Not specified')}`,
    `${isSr ? 'Vrsta usluge' : 'Service Type'}: ${serviceLabel}`,
    `${isSr ? 'Željeni datum' : 'Desired Date'}: ${data.eventDate?.trim() || (isSr ? 'Nije navedeno' : 'Not specified')}`,
    `${isSr ? 'Lokacija događaja' : 'Event Location'}: ${data.location?.trim() || (isSr ? 'Nije navedeno' : 'Not specified')}`,
    '',
    `${isSr ? 'Dodatna poruka i detalji' : 'Additional Message & Details'}:`,
    data.message?.trim() || (isSr ? 'Bez dodatne poruke.' : 'No additional message.'),
    '',
    '----------------------------------------',
    isSr
      ? 'Poslato sa: amox-photography'
      : 'Sent via: amox-photography',
  ];

  const body = bodyLines.join('\n');
  return `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function formatPlainTextInquiry(data: ContactFormData, lang: Language = 'sr'): string {
  const isSr = lang === 'sr';
  const serviceLabel = data.serviceType
    ? getLocalizedServiceLabel(data.serviceType, lang)
    : isSr
    ? 'Opšti upit'
    : 'General Inquiry';
  return [
    `Do: ${SITE_CONFIG.email}`,
    `Naslov: [AMOX] ${serviceLabel} - ${data.fullName.trim()}`,
    '',
    `${isSr ? 'Ime i prezime' : 'Full Name'}: ${data.fullName.trim()}`,
    `Email: ${data.email.trim()}`,
    `${isSr ? 'Telefon' : 'Phone'}: ${data.phone?.trim() || (isSr ? 'Nije navedeno' : 'Not specified')}`,
    `${isSr ? 'Vrsta usluge' : 'Service Type'}: ${serviceLabel}`,
    `${isSr ? 'Željeni datum' : 'Desired Date'}: ${data.eventDate?.trim() || (isSr ? 'Nije navedeno' : 'Not specified')}`,
    `${isSr ? 'Lokacija događaja' : 'Event Location'}: ${data.location?.trim() || (isSr ? 'Nije navedeno' : 'Not specified')}`,
    '',
    `${isSr ? 'Poruka' : 'Message'}:`,
    data.message?.trim() || (isSr ? 'Bez dodatne poruke.' : 'No message provided.'),
  ].join('\n');
}
