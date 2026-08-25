import {
  defaultLocale,
  localeLabels,
  routeSegments,
  type Locale,
  locales,
} from './config';

export { defaultLocale, localeLabels, locales, routeSegments };
export type { Locale };

/**
 * Build a localized path. Default locale (`es`) has no prefix.
 * English uses `/en/...`. Always trailing slash.
 */
export function localizedPath(locale: Locale, segment = ''): string {
  const cleaned = segment.replace(/^\/+|\/+$/g, '');
  const path = cleaned ? `/${cleaned}` : '';

  if (locale === defaultLocale) {
    return cleaned ? `${path}/` : '/';
  }

  return cleaned ? `/${locale}${path}/` : `/${locale}/`;
}

export function getLocaleFromUrl(pathname: string): Locale {
  const segment = pathname.split('/').filter(Boolean)[0];
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
  const currentLocale = getLocaleFromUrl(pathname);
  const withoutLocale = stripLocalePrefix(pathname);
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
