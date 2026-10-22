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
  const serviceLabel = data.serviceType || (isSr ? 'Opšti upit' : 'General Inquiry');
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
  const serviceLabel = data.serviceType || (isSr ? 'Opšti upit' : 'General Inquiry');
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
