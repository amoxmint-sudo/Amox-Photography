'use client';

import React, { useState } from 'react';
import Script from 'next/script';
import { motion, AnimatePresence } from 'motion/react';
import { Language, SITE_CONFIG } from '@/lib/site-config';
import { translations } from '@/lib/translations';
import {
  ContactFormData,
  CONTACT_SERVICE_OPTIONS,
  getLocalizedServiceLabel,
  validateContactForm,
  buildMailtoUrl,
  formatPlainTextInquiry,
  ValidationErrors,
} from '@/lib/contact-utils';
import {
  Mail,
  Phone,
  Instagram,
  Youtube,
  ExternalLink,
  Copy,
  Check,
  Send,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { EditorialReveal } from './EditorialReveal';

const CONTACT_SENJA_WIDGET_ID = 'bd9a5992-aaf9-443a-88cc-3f00ea32e8bc';

interface ContactSectionProps {
  lang: Language;
  preselectedService?: string;
  preselectionVersion?: number;
}

export function ContactSection({
  lang,
  preselectedService,
  preselectionVersion = 0,
}: ContactSectionProps) {
  const t = translations[lang];

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    serviceType: '',
    eventDate: '',
    location: '',
    message: '',
  });

  // Tracks which preselectionVersion the user manually overrode
  const [manualOverrideVersion, setManualOverrideVersion] = useState<number>(-1);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [copied, setCopied] = useState(false);

  // If user clicked a package/service CTA more recently than their last manual dropdown change,
  // use the preselected service; otherwise use their manual selection.
  const rawActiveService =
    manualOverrideVersion === preselectionVersion
      ? formData.serviceType
      : preselectedService || formData.serviceType || '';

  const effectiveServiceType = rawActiveService
    ? getLocalizedServiceLabel(rawActiveService, lang)
    : '';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === 'serviceType') {
      setManualOverrideVersion(preselectionVersion);
    }
    if (errors[name as keyof ValidationErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const submissionData = {
      ...formData,
      serviceType: effectiveServiceType,
    };

    const validation = validateContactForm(submissionData, lang);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    const mailtoUrl = buildMailtoUrl(submissionData, lang);
    window.location.href = mailtoUrl;
  };

  const handleCopy = async () => {
    const text = formatPlainTextInquiry(
      {
        ...formData,
        serviceType: effectiveServiceType,
      },
      lang
    );
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
    }
  };

  const serviceOptions = CONTACT_SERVICE_OPTIONS.map((opt) => ({
    key: opt.key,
    value: opt.label[lang],
    label: opt.label[lang],
  }));

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF8F5] border-t border-[#EAE3D9]">
      <Script
        id={`senja-platform-${CONTACT_SENJA_WIDGET_ID}`}
        src={`https://widget.senja.io/widget/${CONTACT_SENJA_WIDGET_ID}/platform.js`}
        strategy="afterInteractive"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <EditorialReveal variant="heading">
            <span className="text-xs uppercase tracking-[0.25em] font-mono text-[#8C5835] block mb-3">
              {lang === 'sr' ? 'Rezervacija i upiti' : 'Booking & Inquiries'}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-editorial text-[#211B17] tracking-tight">
              {t.contactPage.title}
            </h2>
          </EditorialReveal>
          <EditorialReveal variant="text" delay={0.08}>
            <p className="mt-4 text-sm sm:text-base text-[#6E645A] leading-relaxed">
              {t.contactPage.subtitle}
            </p>
          </EditorialReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start lg:items-stretch">
          {/* Left Column: Contact Form */}
          <EditorialReveal
            variant="section"
            delay={0.08}
            className="lg:col-span-7 bg-white p-6 sm:p-10 border border-[#EAE3D9] shadow-sm flex flex-col justify-between"
          >
            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                >
                  <span>{t.contactPage.nameLabel}</span>
                  <span className="text-[10px] text-[#8C5835] lowercase font-mono">
                    *{t.contactPage.requiredBadge}
                  </span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder={t.contactPage.namePlaceholder}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] border rounded-none text-[#211B17] placeholder-[#A09488] focus:bg-white focus:outline-none focus:ring-1 ${
                    errors.fullName
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#E0D7CB] hover:border-[#C5B8A8] focus:ring-[#8C5835] focus:border-[#8C5835]'
                  } transition-all duration-200`}
                />
                <AnimatePresence>
                  {errors.fullName && (
                    <motion.p
                      key="fullName-err"
                      id="fullName-error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.fullName}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Email Address */}
              <div>
                <label
                  htmlFor="email"
                  className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                >
                  <span>{t.contactPage.emailLabel}</span>
                  <span className="text-[10px] text-[#8C5835] lowercase font-mono">
                    *{t.contactPage.requiredBadge}
                  </span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={t.contactPage.emailPlaceholder}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] border rounded-none text-[#211B17] placeholder-[#A09488] focus:bg-white focus:outline-none focus:ring-1 ${
                    errors.email
                      ? 'border-red-500 focus:ring-red-500'
                      : 'border-[#E0D7CB] hover:border-[#C5B8A8] focus:ring-[#8C5835] focus:border-[#8C5835]'
                  } transition-all duration-200`}
                />
                <AnimatePresence>
                  {errors.email && (
                    <motion.p
                      key="email-err"
                      id="email-error"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>

              {/* Phone & Service Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                  >
                    <span>{t.contactPage.phoneLabel}</span>
                    <span className="text-[10px] text-stone-400 lowercase font-mono">
                      {t.contactPage.optionalBadge}
                    </span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t.contactPage.phonePlaceholder}
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E0D7CB] hover:border-[#C5B8A8] rounded-none text-[#211B17] placeholder-[#A09488] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5835] focus:border-[#8C5835] transition-all duration-200"
                  />
                </div>

                {/* Service Type */}
                <div>
                  <label
                    htmlFor="serviceType"
                    className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                  >
                    <span>{t.contactPage.serviceLabel}</span>
                    <span className="text-[10px] text-[#8C5835] lowercase font-mono">
                      *{t.contactPage.requiredBadge}
                    </span>
                  </label>
                  <select
                    id="serviceType"
                    name="serviceType"
                    required
                    value={effectiveServiceType}
                    onChange={handleChange}
                    aria-invalid={!!errors.serviceType}
                    aria-describedby={errors.serviceType ? 'serviceType-error' : undefined}
                    className={`w-full px-4 py-3 text-sm bg-[#FAF8F5] border rounded-none text-[#211B17] focus:bg-white focus:outline-none focus:ring-1 ${
                      errors.serviceType
                        ? 'border-red-500 focus:ring-red-500'
                        : 'border-[#E0D7CB] hover:border-[#C5B8A8] focus:ring-[#8C5835] focus:border-[#8C5835]'
                    } transition-all duration-200`}
                  >
                    <option value="" disabled>
                      {t.contactPage.serviceSelectPlaceholder}
                    </option>
                    {serviceOptions.map((opt) => (
                      <option key={opt.key} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                  <AnimatePresence>
                    {errors.serviceType && (
                      <motion.p
                        key="service-err"
                        id="serviceType-error"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.2 }}
                        className="mt-1.5 text-xs text-red-600 flex items-center gap-1.5"
                      >
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.serviceType}</span>
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Date & Location Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="eventDate"
                    className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                  >
                    <span>{t.contactPage.dateLabel}</span>
                    <span className="text-[10px] text-stone-400 lowercase font-mono">
                      {t.contactPage.optionalBadge}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="eventDate"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    placeholder={t.contactPage.datePlaceholder}
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E0D7CB] hover:border-[#C5B8A8] rounded-none text-[#211B17] placeholder-[#A09488] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5835] focus:border-[#8C5835] transition-all duration-200"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                  >
                    <span>{t.contactPage.locationLabel}</span>
                    <span className="text-[10px] text-stone-400 lowercase font-mono">
                      {t.contactPage.optionalBadge}
                    </span>
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder={t.contactPage.locationPlaceholder}
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E0D7CB] hover:border-[#C5B8A8] rounded-none text-[#211B17] placeholder-[#A09488] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5835] focus:border-[#8C5835] transition-all duration-200"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="flex items-center justify-between text-xs font-medium uppercase tracking-wider text-[#211B17] mb-2"
                >
                  <span>{t.contactPage.messageLabel}</span>
                  <span className="text-[10px] text-stone-400 lowercase font-mono">
                    {t.contactPage.optionalBadge}
                  </span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={t.contactPage.messagePlaceholder}
                  className="w-full px-4 py-3 text-sm bg-[#FAF8F5] border border-[#E0D7CB] hover:border-[#C5B8A8] rounded-none text-[#211B17] placeholder-[#A09488] focus:bg-white focus:outline-none focus:ring-1 focus:ring-[#8C5835] focus:border-[#8C5835] transition-all duration-200"
                />
              </div>

              {/* Submit CTA */}
              <div>
                <button
                  type="submit"
                  className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-3.5 text-xs font-medium uppercase tracking-[0.2em] text-white bg-[#211B17] hover:bg-[#8C5835] hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#8C5835]"
                >
                  <Send className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  <span>{t.contactPage.submitButton}</span>
                </button>
              </div>

              {/* Crucial honest explanatory notice */}
              <div className="pt-2 border-t border-[#EAE3D9]">
                <p className="text-xs text-[#6E645A] leading-relaxed flex items-start gap-2">
                  <HelpCircle className="w-4 h-4 text-[#8C5835] shrink-0 mt-0.5" />
                  <span>{t.contactPage.notice}</span>
                </p>

                {/* Instant Copy Fallback with animated state feedback */}
                <div className="mt-4 p-3 bg-[#FAF8F5] border border-[#E0D7CB] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <span className="text-[#6E645A]">
                    {t.contactPage.fallbackHelp}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopy}
                    className={`shrink-0 inline-flex items-center gap-2 px-3.5 py-2 bg-white border rounded-none transition-all duration-200 active:scale-[0.98] ${
                      copied
                        ? 'border-emerald-600 bg-emerald-50/40'
                        : 'border-[#D5CCC0] hover:border-[#8C5835] text-[#211B17]'
                    }`}
                  >
                    <AnimatePresence mode="wait" initial={false}>
                      {copied ? (
                        <motion.span
                          key="copied-state"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.16 }}
                          className="inline-flex items-center gap-1.5 text-emerald-700 font-medium"
                        >
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{t.contactPage.copiedText}</span>
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy-state"
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.92 }}
                          transition={{ duration: 0.16 }}
                          className="inline-flex items-center gap-1.5"
                        >
                          <Copy className="w-3.5 h-3.5 text-[#8C5835]" />
                          <span>{t.contactPage.copyButton}</span>
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>
              </div>
            </form>
          </EditorialReveal>

          {/* Right Column: Direct Info, Social, Pic-Time & Senja */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8 lg:gap-6">
            {/* Direct details */}
            <EditorialReveal
              variant="card"
              delay={0.14}
              className="bg-white p-6 sm:p-8 border border-[#EAE3D9] hover:border-[#D5CCC0] transition-colors duration-300"
            >
              <h3 className="text-xs uppercase tracking-[0.22em] font-mono text-[#8C5835] mb-6">
                {t.contactPage.directContactTitle}
              </h3>

              <div className="space-y-5 text-sm">
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                    Email
                  </span>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="font-medium text-[#211B17] hover:text-[#8C5835] hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4 text-[#8C5835]" />
                    <span>{SITE_CONFIG.email}</span>
                  </a>
                </div>

                <div>
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                    WhatsApp & Telefon
                  </span>
                  <a
                    href={SITE_CONFIG.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#211B17] hover:text-[#8C5835] hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-emerald-600" />
                    <span>{SITE_CONFIG.phone}</span>
                  </a>
                </div>

                <div className="pt-2">
                  <span className="text-[11px] uppercase tracking-wider text-stone-400 block mb-1">
                    {lang === 'sr' ? 'Područje rada' : 'Service Territory'}
                  </span>
                  <p className="text-xs text-[#6E645A] leading-relaxed">
                    {SITE_CONFIG.serviceArea[lang]}
                  </p>
                </div>
              </div>
            </EditorialReveal>

            {/* Pic-Time client portal highlight */}
            <EditorialReveal
              variant="card"
              delay={0.22}
              className="bg-[#FAF8F5] p-6 sm:p-8 border border-[#E0D7CB] hover:border-[#8C5835]/60 transition-colors duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs uppercase tracking-[0.22em] font-mono text-[#8C5835]">
                  {t.contactPage.clientGalleryTitle}
                </h4>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </div>

              <p className="text-xs text-[#6E645A] leading-relaxed mb-4">
                {lang === 'sr'
                  ? 'Već ste klijent AMOX Photography? Pristupite svojoj zaštićenoj online galeriji u visokoj rezoluciji putem Pic-Time platforme.'
                  : 'Already an AMOX Photography client? Access your secure high-resolution online gallery directly on the Pic-Time portal.'}
              </p>

              <a
                href={SITE_CONFIG.picTimeClientUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="editorial-link inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#211B17] hover:text-[#8C5835] pb-0.5 transition-colors"
              >
                <span>{lang === 'sr' ? 'Otvori klijentsku galeriju' : 'Open Client Gallery'}</span>
              </a>
            </EditorialReveal>

            {/* Social channels */}
            <EditorialReveal
              variant="card"
              delay={0.3}
              className="bg-white p-6 sm:p-8 border border-[#EAE3D9] hover:border-[#D5CCC0] transition-colors duration-300"
            >
              <span className="text-xs uppercase tracking-[0.22em] font-mono text-[#8C5835] block mb-4">
                {t.footer.social}
              </span>

              <div className="flex flex-col gap-3 text-xs">
                <a
                  href={SITE_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[#211B17] hover:text-[#8C5835] hover:translate-x-1 transition-all duration-200"
                >
                  <Instagram className="w-4 h-4 text-[#8C5835]" />
                  <span>@amox.photography</span>
                </a>
                <a
                  href={SITE_CONFIG.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[#211B17] hover:text-[#8C5835] hover:translate-x-1 transition-all duration-200"
                >
                  <Youtube className="w-4 h-4 text-[#8C5835]" />
                  <span>@amoxphotography (YouTube)</span>
                </a>
                <a
                  href={SITE_CONFIG.tiktokUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 text-[#211B17] hover:text-[#8C5835] hover:translate-x-1 transition-all duration-200"
                >
                  <span className="w-4 h-4 flex items-center justify-center font-mono text-[10px] font-bold border border-[#8C5835] text-[#8C5835] rounded">
                    TT
                  </span>
                  <span>@amox.ph (TikTok)</span>
                </a>
              </div>
            </EditorialReveal>

            {/* Senja client review panel */}
            <EditorialReveal
              variant="card"
              delay={0.36}
              className="bg-white p-6 sm:p-8 border border-[#EAE3D9] hover:border-[#D5CCC0] transition-colors duration-300 lg:flex-1 flex flex-col justify-center overflow-hidden"
            >
              <div
                className="senja-embed block w-full max-w-full"
                data-id={CONTACT_SENJA_WIDGET_ID}
                data-mode="shadow"
                data-lazyload="false"
              />
            </EditorialReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
