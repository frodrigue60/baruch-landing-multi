// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

/** @type {Record<string, string | undefined>} */
const env = /** @type {any} */ (globalThis).process?.env ?? {};

/**
 * Infer GitHub Pages `site` + `base` in CI from GITHUB_REPOSITORY.
 * Override locally or in CI with PUBLIC_SITE_URL / PUBLIC_BASE_PATH.
 *
 * Example: owner/baruch-landing-multi
 *   site → https://owner.github.io
 *   base → /baruch-landing-multi/
 */
function githubPagesFromEnv() {
  const isActions = env.GITHUB_ACTIONS === 'true';
  const repoFull = env.GITHUB_REPOSITORY || '';
  const [owner, repo] = repoFull.split('/');

  if (!isActions || !owner || !repo) {
    return { site: undefined, base: undefined };
  }

  // User/org site repo (owner.github.io) is served at the domain root.
  const isUserSite = repo.toLowerCase() === `${owner.toLowerCase()}.github.io`;

  return {
    site: `https://${owner}.github.io`,
    base: isUserSite ? '/' : `/${repo}/`,
  };
}

const gh = githubPagesFromEnv();

const site =
  env.PUBLIC_SITE_URL ||
  gh.site ||
  'https://baruch-landing-demo.luisrodz.dev';

const base = env.PUBLIC_BASE_PATH || gh.base || '/';

// https://astro.build/config
export default defineConfig({
  site,
  base,
  trailingSlash: 'always',
  vite: {
    plugins: [tailwindcss()],
  },
});
