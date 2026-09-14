# Baruch Landing — Sitio web informativo (MVP)

Landing page bilingüe (ES/EN) para ecoturismo y wellness. Contenido en archivos estáticos; formulario de cotización como placeholder hasta fase posterior.

## Requisitos

- [Bun](https://bun.sh) 1.4+ (ver `.bun-version`)
- TypeScript 7

## Desarrollo local

```bash
bun install
bun run dev
```

Abre [http://localhost:4321](http://localhost:4321). El sitio carga en español en `/`; el inglés está en `/en/`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `bun run dev` | Servidor de desarrollo |
| `bun run build` | Build de producción (SSG) |
| `bun run preview` | Preview del build |
| `bun run typecheck` | Typecheck con `tsc --noEmit` |

## Estructura clave

- `src/content/` — textos, experiencias y ajustes (JSON)
- `src/lib/content/` — capa de acceso al contenido (desacoplada de la UI)
- `src/lib/i18n/` — locales y utilidades de rutas
- `src/pages/` — rutas en español (idioma default, sin prefijo)
- `src/pages/en/` — rutas en inglés

## Editar contenido

1. **Ajustes globales** (contacto, WhatsApp, redes, mapa): `src/content/settings/site.{es,en}.json`
2. **Experiencias**: un archivo JSON por experiencia en `src/content/experiences/`
3. **Páginas** (home, nosotros, contacto, privacidad, cotizar): `src/content/pages/`
4. **Galería**: imágenes en `src/content/gallery/items.json`, categorías en `categories.json`
5. **Precios / simulador**: `src/content/pricing/config.{es,en}.json`

No modificar componentes para cambiar textos; solo los archivos en `src/content/`.

## Documentación

- [Requerimientos MVP](./baruch-requerimientos-mvp.md)
- [Plan de implementación](./baruch-plan-implementacion.md)
- [Guía para agentes IA](./AGENTS.md)

## Variables de entorno

Copia `.env.example` → `.env` (este último **nunca** se sube a git).

| Variable | Tipo | Uso |
|----------|------|-----|
| `PUBLIC_SITE_URL` | pública | Origen canónico / OG. En CI de GitHub Actions se infiere de `GITHUB_REPOSITORY` si no se define. |
| `PUBLIC_BASE_PATH` | pública | Prefijo de rutas (p. ej. `/repo/`). En Actions se infiere como `/<repo>/`. |
| `PUBLIC_CONTACT_API_URL` | pública | URL del API de contacto cuando el sitio está en Pages (estático). |
| `RESEND_API_KEY`, `CONTACT_TO_EMAIL`, `CONTACT_FROM_EMAIL` | secreto | Solo en el servidor del API (`api/contact.ts`). |
| `CONTACT_CORS_ORIGIN` | secreto/config | Orígenes permitidos (CORS), p. ej. `https://<user>.github.io`. |

## Deploy

### GitHub Pages (estático)

El workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) construye con **Bun** (`withastro/action`) y publica con `actions/deploy-pages`.

**Importante:** GitHub Pages solo sirve archivos estáticos. **No ejecuta APIs de servidor** ni endpoints de Astro. El formulario de contacto en Pages debe apuntar a un API externo vía `PUBLIC_CONTACT_API_URL` (ver `api/contact.ts` y `CONTACT_CORS_ORIGIN`).

#### Subdominio Cloudflare (recomendado)

Objetivo: `https://baruch-landing-multi-demo.luisrodz.dev/` (sitio en la **raíz** del host, no bajo `/baruch-landing-multi/`).

1. En Cloudflare DNS (zona `luisrodz.dev`):

   | Tipo | Nombre | Contenido | Proxy |
   |------|--------|-----------|-------|
   | CNAME | `baruch-landing-multi-demo` | `frodrigue60.github.io` | DNS only (gris) al principio; luego puedes probar Proxied |

2. En el repo GitHub: **Settings → Pages → Custom domain** → `baruch-landing-multi-demo.luisrodz.dev` → Enforce HTTPS cuando GitHub lo permita.

3. Variables de Actions (`Settings → Secrets and variables → Actions → Variables`):

   - `PUBLIC_SITE_URL` = `https://baruch-landing-multi-demo.luisrodz.dev`
   - `PUBLIC_BASE_PATH` = `/`

4. Push a `main` (o `workflow_dispatch`) para rebuild con `base: /`.

Nota: el user site `frodrigue60.github.io` usa `www.luisrodz.dev`, por eso `*.github.io/<repo>/` redirige a `www.luisrodz.dev/<repo>/`. El subdominio propio evita esa ruta.

#### Sin dominio custom

URL path: `https://<usuario>.github.io/<repo>/` (con `base` = `/<repo>/`). Source: **GitHub Actions**.

### Cloudflare Pages / Vercel / Docker

- Install: `bun install`
- Build: `bun run build`
- Output: `dist`

Docker local: `bun run docker:up` (nginx sirve `dist`; tampoco ejecuta el API de contacto).

### API de contacto (aparte del sitio estático)

```bash
# En el host del API (no en Pages):
bun run api:contact
```

## Git

- `main` — producción (Pages)
- `develop` — integración
- Ramas `feat/*` por feature

Conventional Commits. Ver `AGENTS.md` para convenciones completas.
