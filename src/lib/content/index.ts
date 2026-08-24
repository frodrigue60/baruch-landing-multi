import type { Locale } from '@/lib/i18n/config';
import type {
  Experience,
  GalleryCategory,
  GalleryItem,
  PageContent,
  PageKey,
  SiteSettings,
} from './types';

import siteEs from '@/content/settings/site.es.json';
import siteEn from '@/content/settings/site.en.json';
import homeEs from '@/content/pages/home.es.json';
import homeEn from '@/content/pages/home.en.json';
import aboutEs from '@/content/pages/about.es.json';
import aboutEn from '@/content/pages/about.en.json';
import contactEs from '@/content/pages/contact.es.json';
import contactEn from '@/content/pages/contact.en.json';
import privacyEs from '@/content/pages/privacy.es.json';
import privacyEn from '@/content/pages/privacy.en.json';
import quoteEs from '@/content/pages/quote.es.json';
import quoteEn from '@/content/pages/quote.en.json';
import retiroWellnessEs from '@/content/experiences/retiro-wellness.es.json';
import retiroWellnessEn from '@/content/experiences/retiro-wellness.en.json';
import ecotourBosqueEs from '@/content/experiences/ecotour-bosque.es.json';
import ecotourBosqueEn from '@/content/experiences/ecotour-bosque.en.json';
import yogaAmanecerEs from '@/content/experiences/yoga-amanecer.es.json';
import yogaAmanecerEn from '@/content/experiences/yoga-amanecer.en.json';
import galleryItems from '@/content/gallery/items.json';
import galleryCategories from '@/content/gallery/categories.json';

const siteSettingsByLocale: Record<Locale, SiteSettings> = {
  es: siteEs as SiteSettings,
  en: siteEn as SiteSettings,
};

const pagesByLocale: Record<Locale, Record<PageKey, PageContent>> = {
  es: {
    home: homeEs as PageContent,
    about: aboutEs as PageContent,
    contact: contactEs as PageContent,
    privacy: privacyEs as PageContent,
    quote: quoteEs as PageContent,
  },
  en: {
    home: homeEn as PageContent,
    about: aboutEn as PageContent,
    contact: contactEn as PageContent,
    privacy: privacyEn as PageContent,
    quote: quoteEn as PageContent,
  },
};

const allExperiences: Experience[] = [
  retiroWellnessEs as Experience,
  retiroWellnessEn as Experience,
  ecotourBosqueEs as Experience,
  ecotourBosqueEn as Experience,
  yogaAmanecerEs as Experience,
  yogaAmanecerEn as Experience,
];

const allGalleryCategories = galleryCategories as GalleryCategory[];

export function getSiteSettings(locale: Locale): SiteSettings {
  return siteSettingsByLocale[locale];
}

export function getPage(pageKey: PageKey, locale: Locale): PageContent {
  return pagesByLocale[locale][pageKey];
}

export function getExperiences(locale: Locale): Experience[] {
  return allExperiences
    .filter((experience) => experience.locale === locale)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function getExperience(slug: string, locale: Locale): Experience | undefined {
  return allExperiences.find(
    (experience) => experience.slug === slug && experience.locale === locale,
  );
}

export function getFeaturedExperiences(locale: Locale): Experience[] {
  return getExperiences(locale).filter((experience) => experience.featured);
}

export function getGalleryItems(): GalleryItem[] {
  return galleryItems as GalleryItem[];
}

export function getGalleryItemsByLocale(locale: Locale): Array<
  GalleryItem & { altText: string }
> {
  return getGalleryItems().map((item) => ({
    ...item,
    altText: item.alt[locale],
  }));
}

export function getGalleryCategories(): GalleryCategory[] {
  return allGalleryCategories;
}

export function getGalleryGroupedByCategory(locale: Locale): Array<{
  id: string;
  label: string;
  items: Array<GalleryItem & { altText: string }>;
}> {
  const items = getGalleryItemsByLocale(locale);

  return getGalleryCategories()
    .map((category) => ({
      id: category.id,
      label: category.label[locale],
      items: items.filter((item) => item.category === category.id),
    }))
    .filter((group) => group.items.length > 0);
}

export function getExperienceSlugs(locale: Locale): string[] {
  return [...new Set(getExperiences(locale).map((experience) => experience.slug))];
}

export type {
  Experience,
  GalleryCategory,
  GalleryItem,
  PageContent,
  PageKey,
  SiteSettings,
};
