// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/** @type {Record<string, string | undefined>} */
const env = /** @type {any} */ (globalThis).process?.env ?? {};

/**
 * Infer GitHub Pages `site` + `base` in CI from GITHUB_REPOSITORY.
 * Override with PUBLIC_SITE_URL / PUBLIC_BASE_PATH (recommended for custom domains).
 *
 * Project site on github.io path:
 *   site → https://owner.github.io
 *   base → /repo/
 *
 * Custom subdomain (e.g. https://baruch-landing-multi-demo.luisrodz.dev):
 *   set PUBLIC_SITE_URL to that origin → base defaults to `/`
 */
function githubPagesFromEnv() {
  const isActions = env.GITHUB_ACTIONS === 'true';
  const repoFull = env.GITHUB_REPOSITORY || '';
  const [owner, repo] = repoFull.split('/');

  if (!isActions || !owner || !repo) {
    return { site: undefined, base: undefined };
  }

  const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

  return {
    site: `https://${owner}.github.io`,
    base: isUserSite ? '/' : `/${repo}/`,
  };
}

/** Custom hostnames (Cloudflare subdomain, etc.) are served at domain root. */
function isCustomHostname(siteUrl) {
  try {
    const host = new URL(siteUrl).hostname;
    return Boolean(host) && !host.endsWith('.github.io') && host !== 'github.io';
  } catch {
    return false;
  }
}

const gh = githubPagesFromEnv();

const site =
  env.PUBLIC_SITE_URL ||
  gh.site ||
  'https://baruch-landing-multi-demo.luisrodz.dev';

const base =
  env.PUBLIC_BASE_PATH ||
  (env.PUBLIC_SITE_URL && isCustomHostname(env.PUBLIC_SITE_URL) ? '/' : undefined) ||
  gh.base ||
  '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
