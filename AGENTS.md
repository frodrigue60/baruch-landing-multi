# AGENTS.md — Baruch Landing

Contexto técnico para agentes de IA (Cursor, Copilot, etc.) que trabajen en este repositorio.

## Proyecto

| Campo | Valor |
|-------|-------|
| **Nombre** | Baruch Landing |
| **Tipo** | Sitio informativo / marketing (SSG) |
| **Dominio de negocio** | Ecoturismo, wellness, retiros y experiencias |
| **Idiomas** | Español (`es`, default) e inglés (`en`) |
| **Fase actual** | MVP — Fase 1 (fundaciones). Ver [baruch-plan-implementacion.md](./baruch-plan-implementacion.md) |

## Stack (no cambiar sin acuerdo)

```
Astro 5+ / 7   SSG, routing, componentes .astro
TypeScript 7   strict — tipos en lib/ y content/
Bun            runtime + package manager (no npm/Node como default)
Tailwind CSS   estilos utilitarios
JSON estático  fuente de contenido MVP (no CMS aún)
```

**Fuera de alcance MVP:** CMS (Sanity/Payload), envío de formularios, reservaciones, pagos.

## Principios de arquitectura

1. **Contenido separado de presentación** — Textos e imágenes viven en `src/content/`. Los componentes solo renderizan datos vía `src/lib/content/`.
2. **Capa de contenido abstracta (RF-27)** — Las páginas importan `getExperiences()`, `getPage()`, `getSiteSettings()`, nunca leen JSON directamente. Esto permite migrar a CMS sin reescribir páginas.
3. **i18n por rutas** — `/es/...` y `/en/...`. No usar solo cookies/query para idioma. El switcher debe preservar la ruta equivalente (RF-05).
4. **Formulario placeholder** — En `/contacto` (no en cotizar): `QuoteFormPlaceholder` muestra UI pero **no envía datos**. Botón deshabilitado + aviso + CTAs a WhatsApp/email/teléfono (RF-14, RF-15).
5. **Cotizar = simulador** — `/cotizar` muestra paquetes y calculadora front-side desde `src/content/pricing/`. No es cotización formal ni pago.
6. **Minimizar scope** — Cambios pequeños y focalizados. No implementar features de fases futuras.

## Estructura de directorios

```
src/
├── assets/images/           # imágenes del sitio
├── components/
│   ├── layout/              # Header, Footer, Nav, LanguageSwitcher
│   ├── ui/                  # Button, Section, PageHero, PageHeader, SectionHeading
│   ├── experiences/         # ExperienceCard, ExperienceGrid
│   ├── gallery/             # GalleryGrid, Lightbox (Fase 4)
│   ├── pricing/             # PackageCards, CostSimulator
│   └── forms/               # QuoteFormPlaceholder (en /contacto)├── content/
│   ├── settings/            # site.es.json, site.en.json
│   ├── pages/               # home, about por locale
│   ├── experiences/         # un JSON por experiencia × locale
│   ├── pricing/             # config.es.json, config.en.json (simulador)
│   └── gallery/             # items.json, categories.json
├── layouts/
│   └── BaseLayout.astro     # shell HTML, meta SEO, header/footer
├── lib/
│   ├── content/
│   │   ├── index.ts         # API pública de contenido
│   │   └── types.ts         # Experience, SiteSettings, PageContent
│   └── i18n/
│       ├── config.ts        # locales, defaultLocale, labels, routeSegments
│       ├── labels.ts        # uiLabels, t() — strings de UI compartidos
│       └── utils.ts         # localizedPath, getLocaleFromUrl, switchLocale
├── pages/
│   ├── index.astro          # redirect → /es/
│   ├── es/                  # rutas en español
│   └── en/                  # rutas en inglés (espejo)
└── styles/
    └── global.css           # Tailwind imports + tokens CSS
```

## Modelos de contenido

### SiteSettings (`src/content/settings/site.{locale}.json`)

```json
{
  "siteName": "Baruch",
  "tagline": "...",
  "contact": {
    "phone": "+52 ...",
    "email": "hola@...",
    "address": "...",
    "whatsapp": "521XXXXXXXXXX",
    "social": [{ "platform": "instagram", "url": "https://..." }]
  }
}
```

### Experience (`src/content/experiences/{slug}.{locale}.json`)

Campos MVP: `slug`, `locale`, `title`, `summary`, `description`, `coverImage`, `gallery?`, `featured?`, `order?`.

Campos reservados (no usar en MVP, no eliminar del tipo): `price`, `availability` — para Fase 8.

### PricingConfig (`src/content/pricing/config.{locale}.json`)

Simulador de costos (solo front): `packages` (basePricePerDay), `personTypes`, `reservationTypes`, `locations` con multiplicadores. Cálculo: `base × días × huéspedes × persona × reservación × ubicación`.

### PageContent (`src/content/pages/{page}.{locale}.json`)

Para home, nosotros, etc.: `title`, `description` (SEO), secciones con contenido markdown o strings.

## Convenciones de código

### Astro

- Preferir **componentes estáticos** (sin `client:*`) salvo lightbox, menú mobile o formulario.
- Props tipadas con `interface Props { ... }` en frontmatter.
- SEO: cada página pasa `title`, `description`, `locale` y `alternateLocaleUrl` a `BaseLayout`.

### TypeScript

- `strict: true`. Evitar `any`.
- Validar JSON de contenido con tipos en `types.ts`; Zod opcional en fases posteriores.

### Tailwind

- Mobile-first (`sm:`, `md:`, `lg:`).
- Tokens de marca en `global.css` (`--color-primary`, etc.) cuando existan; no hardcodear hex repetidos.
- Contraste WCAG AA mínimo (RNF-08).

### i18n

```typescript
// Siempre usar utilidades, no concatenar strings a mano
import { localizedPath, switchLocalePath } from '@/lib/i18n/utils';

localizedPath('es', '/experiencias');        // → /es/experiencias
switchLocalePath('/es/nosotros', 'en');      // → /en/nosotros
```

Mapa de rutas ES ↔ EN (mantener sincronizado):

| ES | EN |
|----|-----|
| `/es/` | `/en/` |
| `/es/nosotros` | `/en/about` |
| `/es/experiencias` | `/en/experiences` |
| `/es/experiencias/[slug]` | `/en/experiences/[slug]` |
| `/es/galeria` | `/en/gallery` |
| `/es/cotizar` | `/en/quote` |
| `/es/contacto` | `/en/contact` |
| `/es/privacidad` | `/en/privacy` |

Al agregar páginas, actualizar este mapa en `src/lib/i18n/config.ts` y en este archivo.

### Imports

Usar alias `@/` → `src/` (configurado en `tsconfig.json`):

```typescript
import { getExperiences } from '@/lib/content';
import BaseLayout from '@/layouts/BaseLayout.astro';
```

## Git y commits

- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `chore:`, `refactor:`
- **Ramas:** `feat/nombre-corto` desde `develop` o `main`
- **No commitear:** `.env`, secretos, `node_modules/`, `dist/`
- **Antes de merge:** `bun run build` y `bun run typecheck` deben pasar
- **No hacer** force push a `main`

## Comandos útiles

```bash
bun install          # instalar dependencias
bun run dev          # dev server → localhost:4321
bun run build        # build SSG → dist/
bun run preview      # servir dist/ localmente
bun run typecheck    # tsc --noEmit (TypeScript 7)
```

## Checklist al implementar una página nueva

- [ ] Rutas en `/es/` y `/en/` (o entrada en mapa i18n)
- [ ] Contenido en `src/content/`, no hardcoded en .astro
- [ ] Meta title + description (RNF-11)
- [ ] `hreflang` / URL alternativa en layout
- [ ] Responsive (RNF-04)
- [ ] Imágenes con `alt` (RNF-09)
- [ ] CTA WhatsApp o contacto visible (RNF-02)

## Checklist al editar contenido

- [ ] Archivos ES y EN sincronizados (misma estructura, mismo slug)
- [ ] Rutas de imágenes relativas a `src/assets/images/` o `public/`
- [ ] No romper schemas en `types.ts`

## Errores comunes a evitar

| ❌ No hacer | ✅ Hacer |
|------------|----------|
| Leer JSON directo en `.astro` | Usar `src/lib/content/` |
| Textos en español solo en `/en/` | Paridad de contenido por locale |
| Formulario con `action` POST real | Placeholder deshabilitado + aviso |
| Implementar Sanity/CMS en MVP | Archivos estáticos |
| `client:load` en toda la página | SSG puro; islands solo si necesario |
| Una sola URL sin prefijo de idioma | Siempre `/es/` o `/en/` |

## Documentos de referencia

| Archivo | Contenido |
|---------|-----------|
| [baruch-requerimientos-mvp.md](./baruch-requerimientos-mvp.md) | RF/RNF, alcance MVP |
| [baruch-plan-implementacion.md](./baruch-plan-implementacion.md) | Fases, tags, estructura objetivo |
| [DESIGN_AGENT.md](./DESIGN_AGENT.md) | Brief para LLM de diseño visual |
| [README.md](./README.md) | Setup humano |

## Fases de implementación (resumen)

| Fase | Estado | Entregable |
|------|--------|------------|
| 0 — Repo | ✅ | Git, docs, configs |
| 1 — Fundaciones | ✅ | Astro, i18n, content layer, páginas placeholder |
| 2 — Layout | ✅ | Header, footer, diseño, mobile nav, UI kit |
| 3 — Contenido | ✅ | Páginas con JSON estructurado, 3 experiencias, galería por categoría |
| 4 — Interacciones | ⏳ | Galería lightbox, form placeholder |
| 5 — Deploy | ⏳ | SEO, CI, producción |
| 6+ | ⏳ | CMS, formulario, transaccional |

Actualizar la columna **Estado** al cerrar cada fase.

## Contacto del negocio (placeholders)

Hasta recibir datos reales, usar placeholders en `site.{locale}.json`:

- WhatsApp: número sin `+` en JSON, link `https://wa.me/{number}`
- Email/teléfono: valores de ejemplo claramente marcados como placeholder
