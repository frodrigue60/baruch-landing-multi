import type { Locale } from '@/lib/i18n/config';
import type {
  Experience,
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
import retiroWellnessEs from '@/content/experiences/retiro-wellness.es.json';
import retiroWellnessEn from '@/content/experiences/retiro-wellness.en.json';
import ecotourBosqueEs from '@/content/experiences/ecotour-bosque.es.json';
import ecotourBosqueEn from '@/content/experiences/ecotour-bosque.en.json';
import galleryItems from '@/content/gallery/items.json';

const siteSettingsByLocale: Record<Locale, SiteSettings> = {
  es: siteEs as SiteSettings,
  en: siteEn as SiteSettings,
};

const pagesByLocale: Record<Locale, Record<PageKey, PageContent>> = {
  es: {
    home: homeEs as PageContent,
    about: aboutEs as PageContent,
  },
  en: {
    home: homeEn as PageContent,
    about: aboutEn as PageContent,
  },
};

const allExperiences: Experience[] = [
  retiroWellnessEs as Experience,
  retiroWellnessEn as Experience,
  ecotourBosqueEs as Experience,
  ecotourBosqueEn as Experience,
];

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

export function getExperienceSlugs(locale: Locale): string[] {
  return [...new Set(getExperiences(locale).map((experience) => experience.slug))];
}

export type {
  Experience,
  GalleryItem,
  PageContent,
  PageKey,
  SiteSettings,
};
