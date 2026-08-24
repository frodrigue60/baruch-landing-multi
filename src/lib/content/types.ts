import type { Locale } from '@/lib/i18n/config';

export interface SocialLink {
  platform: string;
  url: string;
  label?: string;
}

export interface SiteContact {
  phone: string;
  email: string;
  address: string;
  whatsapp: string;
  /** URL de embed para mapa (iframe). Opcional. */
  mapEmbedUrl?: string;
}

export interface SiteSettings {
  locale: Locale;
  siteName: string;
  tagline: string;
  contact: SiteContact;
  social: SocialLink[];
}

export interface Experience {
  slug: string;
  locale: Locale;
  title: string;
  summary: string;
  description: string;
  coverImage: string;
  gallery?: string[];
  highlights?: string[];
  duration?: string;
  groupSize?: string;
  featured?: boolean;
  order?: number;
  price?: number | null;
  availability?: string | null;
}

export interface PageSection {
  id: string;
  heading: string;
  body: string;
}

export interface PageCta {
  heading: string;
  body: string;
  primaryLabel: string;
  secondaryLabel: string;
}

export interface PageContent {
  locale: Locale;
  pageKey: string;
  title: string;
  description: string;
  heading: string;
  sections?: PageSection[];
  cta?: PageCta;
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: Record<Locale, string>;
  category: string;
  experienceSlug?: string;
}

export interface GalleryCategory {
  id: string;
  label: Record<Locale, string>;
}

export type PageKey = 'home' | 'about' | 'contact' | 'privacy' | 'quote';
