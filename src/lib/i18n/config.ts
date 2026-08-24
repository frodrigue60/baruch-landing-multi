export const locales = ['es', 'en'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'es';

export const localeLabels: Record<Locale, string> = {
  es: 'Español',
  en: 'English',
};

/** Segmentos de ruta por página (sin prefijo de locale). */
export const routeSegments: Record<
  | 'home'
  | 'about'
  | 'experiences'
  | 'gallery'
  | 'quote'
  | 'contact'
  | 'privacy',
  Record<Locale, string>
> = {
  home: { es: '', en: '' },
  about: { es: 'nosotros', en: 'about' },
  experiences: { es: 'experiencias', en: 'experiences' },
  gallery: { es: 'galeria', en: 'gallery' },
  quote: { es: 'cotizar', en: 'quote' },
  contact: { es: 'contacto', en: 'contact' },
  privacy: { es: 'privacidad', en: 'privacy' },
};

export const navItems: Array<{
  key: keyof typeof routeSegments;
  label: Record<Locale, string>;
}> = [
  { key: 'home', label: { es: 'Inicio', en: 'Home' } },
  { key: 'about', label: { es: 'Nosotros', en: 'About' } },
  { key: 'experiences', label: { es: 'Experiencias', en: 'Experiences' } },
  { key: 'gallery', label: { es: 'Galería', en: 'Gallery' } },
  { key: 'quote', label: { es: 'Cotizar', en: 'Quote' } },
  { key: 'contact', label: { es: 'Contacto', en: 'Contact' } },
];
