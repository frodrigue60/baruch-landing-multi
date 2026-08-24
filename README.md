# Baruch Landing — Sitio web informativo (MVP)

Landing page bilingüe (ES/EN) para ecoturismo y wellness. Contenido en archivos estáticos; formulario de cotización como placeholder hasta fase posterior.

## Requisitos

- Node.js 22+ (ver `.nvmrc`)
- npm

## Desarrollo local

```bash
npm install
npm run dev
```

Abre [http://localhost:4321](http://localhost:4321). La raíz redirige a `/es/`.

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción (SSG) |
| `npm run preview` | Preview del build |

## Estructura clave

- `src/content/` — textos, experiencias y ajustes (JSON)
- `src/lib/content/` — capa de acceso al contenido (desacoplada de la UI)
- `src/lib/i18n/` — locales y utilidades de rutas
- `src/pages/es/` y `src/pages/en/` — rutas por idioma

## Editar contenido

1. **Ajustes globales** (contacto, WhatsApp, redes): `src/content/settings/site.{es,en}.json`
2. **Experiencias**: un archivo JSON por experiencia en `src/content/experiences/`
3. **Páginas** (home, nosotros): `src/content/pages/`

No modificar componentes para cambiar textos; solo los archivos en `src/content/`.

## Documentación

- [Requerimientos MVP](./baruch-requerimientos-mvp.md)
- [Plan de implementación](./baruch-plan-implementacion.md)
- [Guía para agentes IA](./AGENTS.md)

## Deploy

Build estático compatible con **Cloudflare Pages** o **Vercel**:

- Build command: `npm run build`
- Output directory: `dist`

## Git

- `main` — producción
- `develop` — integración
- Ramas `feat/*` por feature

Conventional Commits. Ver `AGENTS.md` para convenciones completas.
