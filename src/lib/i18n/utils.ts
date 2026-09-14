import {
  defaultLocale,
  localeLabels,
  routeSegments,
  type Locale,
  locales,
} from './config';

export { defaultLocale, localeLabels, locales, routeSegments };
export type { Locale };

/** Astro `base` (always trailing slash in practice). */
function siteBase(): string {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
}

/** Prefix a root-relative path with BASE_URL so assets/links work under /<repo>/. */
export function withBase(path: string): string {
  const base = siteBase();
  if (path === '/' || path === '') return base;
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${normalized}`;
}

/** Strip Astro base from a pathname before locale routing. */
function stripBase(pathname: string): string {
  const base = siteBase();
  if (base === '/') return pathname;
  const prefix = base.slice(0, -1);
  if (pathname === prefix || pathname.startsWith(`${prefix}/`)) {
    const rest = pathname.slice(prefix.length) || '/';
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname;
}

/**
 * Build a localized path. Default locale (`es`) has no prefix.
 * English uses `/en/...`. Always trailing slash. Prefixed with BASE_URL.
 */
export function localizedPath(locale: Locale, segment = ''): string {
  const cleaned = segment.replace(/^\/+|\/+$/g, '');
  const path = cleaned ? `/${cleaned}` : '';

  if (locale === defaultLocale) {
    return withBase(cleaned ? `${path}/` : '/');
  }

  return withBase(cleaned ? `/${locale}${path}/` : `/${locale}/`);
}

export function getLocaleFromUrl(pathname: string): Locale {
  const withoutBase = stripBase(pathname);
  const segment = withoutBase.split('/').filter(Boolean)[0];
  return segment === 'en' ? 'en' : defaultLocale;
}

/** Strip `/en` or legacy `/es` prefix; default-locale paths stay as-is. */
function stripLocalePrefix(pathname: string): string {
  const stripped = pathname.replace(/^\/(en|es)(?=\/|$)/, '') || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

function translatePath(pathWithoutLocale: string, from: Locale, to: Locale): string {
  if (from === to) return pathWithoutLocale;

  const normalized =
    pathWithoutLocale === '/' ? '' : pathWithoutLocale.replace(/^\//, '').replace(/\/$/, '');

  for (const segments of Object.values(routeSegments)) {
    const fromSeg = segments[from];
    const toSeg = segments[to];

    if (!fromSeg && !normalized) {
      return '';
    }

    if (fromSeg && (normalized === fromSeg || normalized.startsWith(`${fromSeg}/`))) {
      const rest = normalized.slice(fromSeg.length);
      return toSeg ? `${toSeg}${rest}` : rest.replace(/^\//, '');
    }
  }

  return normalized;
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const withoutBase = stripBase(pathname);
  const currentLocale = getLocaleFromUrl(pathname);
  const withoutLocale = stripLocalePrefix(withoutBase);
  const translated = translatePath(withoutLocale, currentLocale, targetLocale);
  return localizedPath(targetLocale, translated);
}

export function getPagePath(
  pageKey: keyof typeof routeSegments,
  locale: Locale,
  slug?: string,
): string {
  const segment = routeSegments[pageKey][locale];
  const fullSegment = slug && segment ? `${segment}/${slug}` : segment;
  return localizedPath(locale, fullSegment);
}

export function getAlternateLocaleUrl(pathname: string): string {
  const current = getLocaleFromUrl(pathname);
  const alternate: Locale = current === 'es' ? 'en' : 'es';
  return switchLocalePath(pathname, alternate);
}
