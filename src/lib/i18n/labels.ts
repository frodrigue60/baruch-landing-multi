import type { Locale } from './config';

export const uiLabels = {
  skipToContent: {
    es: 'Saltar al contenido',
    en: 'Skip to content',
  },
  menuOpen: {
    es: 'Abrir menú',
    en: 'Open menu',
  },
  menuClose: {
    es: 'Cerrar menú',
    en: 'Close menu',
  },
  whatsapp: {
    es: 'Escríbenos por WhatsApp',
    en: 'Message us on WhatsApp',
  },
  whatsappShort: {
    es: 'WhatsApp',
    en: 'WhatsApp',
  },
  quote: {
    es: 'Cotizar',
    en: 'Get a quote',
  },
  viewDetail: {
    es: 'Ver detalle',
    en: 'View details',
  },
  featuredExperiences: {
    es: 'Experiencias destacadas',
    en: 'Featured experiences',
  },
  backToExperiences: {
    es: 'Volver a experiencias',
    en: 'Back to experiences',
  },
} as const satisfies Record<string, Record<Locale, string>>;

export function t(key: keyof typeof uiLabels, locale: Locale): string {
  return uiLabels[key][locale];
}
