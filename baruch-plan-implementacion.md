# Plan de implementación — Baruch Landing (MVP)

Documento de planificación técnica. Define fases, stack, estructura del repositorio Git y criterios de entrega. Complementa [baruch-requerimientos-mvp.md](./baruch-requerimientos-mvp.md).

---

## Resumen ejecutivo

| Aspecto | Decisión |
|---|---|
| **Stack MVP** | Astro 5 + Tailwind CSS + TypeScript |
| **Contenido** | Archivos estáticos (JSON + Markdown) en `src/content/` |
| **i18n** | Rutas por locale: `/es/...` y `/en/...` |
| **Formulario** | Placeholder visual (sin backend en MVP) |
| **Hosting** | Cloudflare Pages o Vercel (SSG) |
| **Git** | Repo monolítico, `main` = producción, ramas por fase/feature |

**Duración estimada MVP (Fases 0–5):** 3–5 semanas según disponibilidad de contenido real (textos, fotos, branding).

---

## Stack técnico

```
Astro (SSG)          → páginas, routing, build estático, SEO
Tailwind CSS         → diseño responsivo
TypeScript           → tipos para contenido y componentes
JSON / Markdown      → fuente de contenido MVP
Astro Image          → optimización de imágenes (RNF-07)
PhotoSwipe (o similar) → lightbox galería (RF-13)
```

**Post-MVP (referencia, no implementar ahora):**

| Fase | Tecnología candidata |
|---|---|
| CMS | Sanity o Payload |
| Formulario | Astro Actions + Resend + Cloudflare Turnstile |
| Transaccional | Stripe + calendario/disponibilidad (TBD) |

---

## Estrategia Git

### Inicialización (Fase 0)

```bash
cd c:\web\landing-baruch
git init
git branch -M main
```

Archivos base del repo:

| Archivo | Propósito |
|---|---|
| `.gitignore` | `node_modules/`, `dist/`, `.env*`, `.astro/`, OS/IDE |
| `README.md` | Cómo clonar, instalar, desarrollar y desplegar |
| `.editorconfig` | Consistencia de indentación |
| `.nvmrc` o `.node-version` | Versión de Node (ej. `20`) |

**Primer commit:**

```
docs: add MVP requirements and implementation plan
```

Contenido: `baruch-requerimientos-mvp.md`, `baruch-plan-implementacion.md`, `.gitignore`, `README.md`.

### Ramas

```
main          → producción (deploy automático)
develop       → integración continua del MVP (opcional pero recomendado)
feat/*        → features atómicas (feat/layout, feat/gallery, …)
fix/*         → correcciones
docs/*        → solo documentación
```

**Flujo recomendado:**

1. Crear rama desde `develop` (o `main` si el equipo es de una persona).
2. PR o merge cuando la fase/subtarea cumple criterios de aceptación.
3. Tag al cerrar cada fase: `v0.1.0-fase-1`, `v0.2.0-fase-2`, …
4. `main` solo recibe merges probados (`npm run build` exitoso).

### Convención de commits

[Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add experience detail page
fix: correct hreflang on gallery page
docs: update content schema for experiences
chore: configure astro image pipeline
```

### Remoto

Tras Fase 0, crear repo remoto (GitHub, GitLab o Cursor-hosted) y:

```bash
git remote add origin <url>
git push -u origin main
```

Proteger `main`: require PR + build passing (cuando exista CI).

### CI mínimo (Fase 1)

GitHub Actions (o equivalente):

```yaml
# .github/workflows/ci.yml
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version-file: '.nvmrc'
      - run: npm ci
      - run: npm run build
```

---

## Estructura del proyecto (objetivo post Fase 1)

```
landing-baruch/
├── .github/workflows/ci.yml
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── assets/images/          # imágenes referenciadas desde contenido
│   ├── components/
│   │   ├── layout/             # Header, Footer, Nav, LanguageSwitcher
│   │   ├── ui/                 # Button, Card, SectionHeading
│   │   ├── experiences/        # ExperienceCard, ExperienceGrid
│   │   ├── gallery/            # GalleryGrid, Lightbox
│   │   └── forms/              # QuoteFormPlaceholder
│   ├── content/
│   │   ├── config.ts           # schemas Zod / Astro content collections
│   │   ├── settings/
│   │   │   ├── site.es.json    # contacto, redes, WhatsApp
│   │   │   └── site.en.json
│   │   ├── pages/
│   │   │   ├── home.es.json
│   │   │   ├── home.en.json
│   │   │   ├── about.es.json
│   │   │   └── about.en.json
│   │   ├── experiences/
│   │   │   ├── retiro-wellness.es.json
│   │   │   ├── retiro-wellness.en.json
│   │   │   └── ...
│   │   └── gallery/
│   │       └── items.json
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── lib/
│   │   ├── content/            # capa de acceso RF-27
│   │   │   ├── index.ts        # getExperiences(), getPage(), …
│   │   │   └── types.ts
│   │   └── i18n/
│   │       ├── config.ts       # locales, defaultLocale
│   │       └── utils.ts        # localizedPath, switchLocale
│   ├── pages/
│   │   ├── index.astro         # redirect a /es/
│   │   ├── es/
│   │   │   ├── index.astro
│   │   │   ├── nosotros.astro
│   │   │   ├── experiencias/
│   │   │   │   ├── index.astro
│   │   │   │   └── [slug].astro
│   │   │   ├── galeria.astro
│   │   │   ├── cotizar.astro
│   │   │   ├── contacto.astro
│   │   │   └── privacidad.astro
│   │   └── en/
│   │       └── ... (espejo de /es/)
│   └── styles/
│       └── global.css
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── package.json
├── baruch-requerimientos-mvp.md
├── baruch-plan-implementacion.md
└── README.md
```

---

## Fases de implementación

### Fase 0 — Repositorio y documentación

**Objetivo:** Base versionada lista para desarrollo colaborativo.

| # | Tarea | Entregable |
|---|---|---|
| 0.1 | `git init`, `.gitignore`, `.nvmrc` | Repo local |
| 0.2 | `README.md` con instrucciones básicas | Documentación |
| 0.3 | Commit inicial con docs existentes | Historial Git |
| 0.4 | Crear remoto y push | Repo en la nube |
| 0.5 | (Opcional) Crear rama `develop` | Flujo de ramas |

**Criterio de done:** `git log` muestra commit inicial; remoto accesible; README explica el proyecto.

**Tag:** `v0.0.0-docs`

---

### Fase 1 — Scaffold y fundaciones

**Objetivo:** Proyecto Astro compilable con i18n, Tailwind y capa de contenido vacía.

| # | Tarea | Reqs |
|---|---|---|
| 1.1 | `npm create astro@latest` (template minimal, TypeScript, strict) | — |
| 1.2 | Integrar Tailwind CSS v4 | RNF-04 |
| 1.3 | Configurar i18n: locales `es` (default), `en`; redirect `/` → `/es/` | RF-04, RF-05 |
| 1.4 | `BaseLayout.astro` con slots para meta SEO | RNF-11 |
| 1.5 | Definir tipos TypeScript + schemas (Zod) para contenido | RF-26, RF-27 |
| 1.6 | Implementar `src/lib/content/` (lectura de JSON estático) | RF-22, RF-27 |
| 1.7 | CI: build en push/PR | RNF-21 |
| 1.8 | Placeholder pages vacías en `/es/` y `/en/` | RF-02 |

**Schemas de contenido (MVP):**

```typescript
// Experiencia (extensible hacia catálogo RF-24)
interface Experience {
  slug: string;
  locale: 'es' | 'en';
  title: string;
  summary: string;
  description: string;      // markdown permitido
  coverImage: string;
  gallery?: string[];
  featured?: boolean;
  order?: number;
  // reservado futuro: price, availability, …
}

// Ajustes globales
interface SiteSettings {
  locale: 'es' | 'en';
  siteName: string;
  contact: { phone, email, address, whatsapp, social[] };
}
```

**Criterio de done:** `npm run dev` y `npm run build` sin errores; rutas `/es/` y `/en/` responden.

**Rama sugerida:** `feat/scaffold` → merge a `develop`

**Tag:** `v0.1.0-foundation`

---

### Fase 2 — Layout, navegación y diseño base

**Objetivo:** Shell visual consistente en todas las páginas.

| # | Tarea | Reqs |
|---|---|---|
| 2.1 | Header con logo, menú principal, CTA WhatsApp | RF-01, RF-02, RNF-02 |
| 2.2 | Footer con contacto, redes, enlace privacidad | RF-03 |
| 2.3 | `LanguageSwitcher` preservando ruta actual | RF-05 |
| 2.4 | Design tokens: colores ecoturismo/wellness, tipografía, espaciado | RNF-03, RNF-08 |
| 2.5 | Componentes UI: `Button`, `Section`, `PageHero` | RNF-01 |
| 2.6 | Menú mobile (hamburger / drawer accesible) | RNF-04, RNF-10 |
| 2.7 | Contenido placeholder en `site.es.json` / `site.en.json` | RF-22 |

**Criterio de done:** Navegación funciona en ES/EN; responsive mobile/desktop; contraste WCAG AA en texto principal.

**Rama:** `feat/layout`

**Tag:** `v0.2.0-layout`

---

### Fase 3 — Contenido estático y páginas informativas

**Objetivo:** Todas las páginas del MVP con contenido real o placeholder estructurado.

| # | Página | Tareas | Reqs |
|---|---|---|---|
| 3.1 | **Home** | Hero, resumen experiencias, CTAs | RF-06–08 |
| 3.2 | **Nosotros** | Historia, misión, valores desde JSON/MD | Sección 1 |
| 3.3 | **Experiencias (listado)** | Grid desde `content/experiences/` | RF-09, RF-11 |
| 3.4 | **Detalle experiencia** | `[slug].astro`, galería por experiencia | RF-10 |
| 3.5 | **Galería** | Grid + categorías desde JSON | RF-12 |
| 3.6 | **Contacto** | Datos, mapa embed, WhatsApp, redes | RF-19–21 |
| 3.7 | **Privacidad** | Texto legal placeholder | RNF-16 |
| 3.8 | Seed content | 2–3 experiencias ejemplo ES+EN | RF-23 |

**Dependencia externa:** Textos e imágenes del negocio (o placeholders acordados).

**Criterio de done:** 8 páginas × 2 idiomas navegables; contenido editable solo tocando `src/content/`.

**Rama:** `feat/pages-content`

**Tag:** `v0.3.0-content`

---

### Fase 4 — Galería interactiva y formulario placeholder

**Objetivo:** Interacciones clave sin backend.

| # | Tarea | Reqs |
|---|---|---|
| 4.1 | Lightbox en galería (PhotoSwipe o similar) | RF-13 |
| 4.2 | Optimización imágenes con `@astrojs/image` o `<Image />` | RNF-07 |
| 4.3 | `QuoteFormPlaceholder`: campos visibles, botón deshabilitado | RF-14 |
| 4.4 | Aviso "envío no disponible" + links WhatsApp/email/tel | RF-15, RNF-02 |
| 4.5 | Accesibilidad formulario: labels, focus, aria-disabled | RNF-10 |
| 4.6 | Botón/flotante WhatsApp persistente | RF-20, RNF-02 |

**Criterio de done:** Galería ampliable; formulario no envía datos; alternativas de contacto visibles.

**Rama:** `feat/gallery-form-placeholder`

**Tag:** `v0.4.0-interactions`

---

### Fase 5 — SEO, calidad y deploy (cierre MVP)

**Objetivo:** Sitio publicado, indexable y estable.

| # | Tarea | Reqs |
|---|---|---|
| 5.1 | Meta title/description por página e idioma | RNF-11 |
| 5.2 | URLs semánticas (`/es/experiencias/retiro-wellness`) | RNF-12 |
| 5.3 | `hreflang`, canonical, sitemap.xml | RNF-13 |
| 5.4 | `robots.txt`, favicon, Open Graph básico | SEO |
| 5.5 | Auditoría accesibilidad (contraste, alt, landmarks) | RNF-08–10 |
| 5.6 | Lighthouse: performance mobile > 85 | RNF-06 |
| 5.7 | Deploy Cloudflare Pages / Vercel + dominio | RNF-21 |
| 5.8 | Merge `develop` → `main` | Git |
| 5.9 | README: guía para editar contenido estático | RF-22 |

**Criterio de done:** URL pública HTTPS; build CI verde; checklist de requerimientos MVP marcado.

**Rama:** `feat/seo-deploy`

**Tag:** `v1.0.0-mvp`

---

## Fases post-MVP (planificadas, sin implementar)

### Fase 6 — CMS

| Tarea | Notas |
|---|---|
| Elegir Sanity vs Payload | Según presupuesto y preferencia de hosting |
| Replicar schemas actuales en el CMS | RF-26, RNF-22 |
| Implementar adapter en `src/lib/content/` | RF-27: misma API, nueva fuente |
| Preview de contenido | Opcional |
| Migrar JSON existente al CMS | Script one-shot |
| Documentar flujo editorial | Para el negocio |

**Tag objetivo:** `v2.0.0-cms`

---

### Fase 7 — Formulario activo

| Tarea | Reqs |
|---|---|
| Endpoint serverless (Astro Actions o API route) | RF-16 |
| Validación servidor + cliente | RF-15 (activo) |
| Cloudflare Turnstile | RNF-14 |
| Resend (email al negocio + confirmación usuario) | RF-16, RF-17 |
| Campo tipo solicitante | RF-18 |
| Actualizar aviso de privacidad | RNF-16 |

**Tag objetivo:** `v2.1.0-forms`

---

### Fase 8 — Transaccional

| Tarea | Reqs |
|---|---|
| Modelo de precios/disponibilidad en experiencias | RF-24 |
| Flujo reservación desde formulario existente | RF-25 |
| Integración pagos (Stripe u otro) | RNF-20 |
| Panel o CMS para disponibilidad | RNF-19 |

**Tag objetivo:** `v3.0.0-booking`

---

## Matriz requisitos → fase

| ID | Fase |
|---|---|
| RF-01 – RF-03 | 2 |
| RF-04 – RF-05 | 1, 2 |
| RF-06 – RF-08 | 3 |
| RF-09 – RF-11 | 1, 3 |
| RF-12 – RF-13 | 3, 4 |
| RF-14 – RF-15 | 4 |
| RF-16 – RF-18 | 7 |
| RF-19 – RF-21 | 2, 3, 4 |
| RF-22 – RF-23, RF-26 – RF-27 | 1, 3 |
| RF-24 – RF-25 | 8 (diseño desde Fase 1) |
| RNF-01 – RNF-05 | 2, 3, 4 |
| RNF-06 – RNF-07 | 4, 5 |
| RNF-08 – RNF-10 | 2, 4, 5 |
| RNF-11 – RNF-13 | 5 |
| RNF-14 – RNF-15 | 7 |
| RNF-16 | 3, 7 |
| RNF-17 – RNF-18 | 1, 3 |
| RNF-19 – RNF-22 | 1 (diseño), 6, 8 |
| RNF-21 | 1, 5 |

---

## Orden de trabajo recomendado (sprint view)

```
Semana 1   Fase 0 + Fase 1 (repo, scaffold, i18n, content layer)
Semana 2   Fase 2 (layout, nav, diseño base)
Semana 3   Fase 3 (páginas + contenido placeholder del negocio)
Semana 4   Fase 4 (galería, form placeholder, WhatsApp)
Semana 5   Fase 5 (SEO, QA, deploy) + contenido real si ya está listo
```

Si el contenido del negocio tarda, Fases 3–4 pueden usar seed content y sustituirse antes del deploy sin cambiar código.

---

## Checklist pre-deploy MVP

- [ ] Build de producción sin errores
- [ ] Todas las rutas ES/EN responden 200
- [ ] Language switcher mantiene contexto
- [ ] Imágenes con `alt` descriptivo
- [ ] Formulario no envía datos; aviso visible
- [ ] WhatsApp abre conversación correcta
- [ ] sitemap.xml y hreflang presentes
- [ ] Aviso de privacidad publicado
- [ ] README explica cómo editar `src/content/`

---

## Próximo paso inmediato

Ejecutar **Fase 0** en el repo local:

1. Inicializar Git y archivos base (`.gitignore`, `README.md`, `.nvmrc`).
2. Commit con los documentos de requerimientos y este plan.
3. Crear remoto y push.
4. Abrir **Fase 1** en rama `feat/scaffold` con `npm create astro@latest`.

¿Proceder con Fase 0 + Fase 1 en el siguiente paso?
