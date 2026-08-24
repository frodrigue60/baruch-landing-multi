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
  featured?: boolean;
  order?: number;
  /** Reservado para fase transaccional */
  price?: number | null;
  /** Reservado para fase transaccional */
  availability?: string | null;
}

export interface PageSection {
  id: string;
  heading: string;
  body: string;
}

export interface PageContent {
  locale: Locale;
  pageKey: string;
  title: string;
  description: string;
  heading: string;
  sections?: PageSection[];
}

export interface GalleryItem {
  id: string;
  src: string;
  alt: Record<Locale, string>;
  category?: string;
  experienceSlug?: string;
}

export type PageKey = 'home' | 'about';
