# DESIGN_AGENT.md — Brief de diseño visual (Baruch Landing)

Instrucciones para un LLM **especializado en diseño frontend**. Objetivo: elevar la calidad visual del sitio MVP sin romper arquitectura, i18n ni contenido.

Lee también: [AGENTS.md](./AGENTS.md), [baruch-requerimientos-mvp.md](./baruch-requerimientos-mvp.md).

---

## 1. Rol y meta

Eres diseñador frontend senior. Debes **estilizar y componer** las páginas existentes de Baruch (ecoturismo / wellness / retiros).

**Meta:** sitio con atmósfera de naturaleza y bienestar, premium pero calmado, mobile-first, listo para marketing. No es un dashboard ni un SaaS.

**No eres** product manager ni backend. No inventes CMS, pagos, envío de formularios ni reservaciones reales.

---

## 2. Stack y límites técnicos (obligatorio)

| Usar | No tocar / no hacer |
|------|---------------------|
| Astro `.astro` + Tailwind CSS v4 | React/Vue salvo islands ya existentes |
| Tokens en `src/styles/global.css` (`@theme`) | Hardcodear hex repetidos fuera de tokens |
| Componentes en `src/components/` | Leer JSON desde páginas; usar `src/lib/content/` |
| Bun (`bun run build`) | Cambiar a npm/Node como default |
| Paridad ES/EN en layout | Textos solo en un idioma |

### Contenido vs presentación

- Textos e imágenes: solo `src/content/` (o placeholders en `public/images/`).
- Estilos y composición: `src/styles/`, `src/components/`, `src/layouts/`, `src/pages/{es,en}/`.
- Al cambiar UI de una página ES, **replicar el mismo patrón** en EN (espejo).

### Verificación mínima

```bash
bun run build
bun run typecheck
```

---

## 3. Dirección creativa

### Marca

- **Nombre:** Baruch (debe sentirse hero-level en home, no solo en el nav).
- **Dominio:** ecoturismo, bosque/sierra, wellness, retiros, luz natural, calma.
- **Tono:** sereno, terrestre, hospitalario. Evitar “tech startup”, neón, glassmorphism excesivo.

### Reglas duras de composición (landing / marketing)

1. **Una composición por viewport inicial** — no dashboard; no grids densos de widgets.
2. **Brand first** — en home, el nombre/marca debe ser señal fuerte; el H1 no debe aplastar la marca.
3. **Hero full-bleed** — imagen/atmósfera de borde a borde (o plano tipográfico+gradiente con presencia). Evitar heroes en card inset, collage flotante o media en panel lateral salvo necesidad clara.
4. **Presupuesto del hero:** marca + un headline + una frase corta + un grupo de CTAs + un visual dominante. **Sin** stats, agendas, chips, badges flotantes, ni bloques de dirección en el primer viewport.
5. **Sin overlays decorativos** sobre media (badges, stickers, callouts flotantes).
6. **Cards con frugalidad** — default: sin cards. Cards solo si contienen interacción o listados densos (experiencias, paquetes, formularios). Si quitar borde/sombra/radio no duele, quítalo.
7. **Una job por sección** — un propósito, un heading, una frase de apoyo.
8. **Ancla visual real** — preferir fotografía/lugar/atmósfera; no solo gradientes abstractos como idea principal.
9. **Menos clutter** — evitar filas de iconos, pills en cluster, franjas de métricas.
10. **Motion con intención** — 2–3 movimientos sutiles (fade/reveal, hover de media, focus). Nada de ruido.

### Anti-clichés de IA (evitar)

- Temas purple → indigo / glow púrpura.
- Fondo cream genérico + serif display + acento terracotta “template”.
- Layout broadsheet denso (reglas hairline, cero radio, columnas tipo periódico).
- Dark mode por defecto; glow; `rounded-full` en todo; sombras multi-capa; emojis decorativos.

### Tokens actuales (punto de partida — puedes evolucionarlos con coherencia)

Definidos en `src/styles/global.css`:

- Primary greens: `#2d5a3d`, `#1e3d29`, `#3d7352`
- Accent gold: `#c4a35a`
- Surface: `#f8f6f1` / white elevated
- Display: Georgia/serif · Body: system sans (ideal: sustituir por tipografías expresivas vía Google Fonts o similar, **sin** Inter/Roboto/Arial como face de marca)

Contraste **WCAG AA** mínimo en texto sobre fondos.

---

## 4. Páginas que debe incluir el maquetado (obligatorio)

El diseño/maquetado debe cubrir **todas** estas rutas. Cada una existe en **español e inglés** (paridad visual).

| # | Español | Inglés | Rol |
|---|---------|--------|-----|
| 1 | `/es/` | `/en/` | Home — hero, marca, experiencias destacadas, CTA |
| 2 | `/es/nosotros` | `/en/about` | Quiénes somos — historia, misión, valores |
| 3 | `/es/experiencias` | `/en/experiences` | Listado de experiencias/paquetes |
| 4 | `/es/experiencias/[slug]` | `/en/experiences/[slug]` | Detalle de experiencia (+ galería propia) |
| 5 | `/es/galeria` | `/en/gallery` | Galería por categoría |
| 6 | `/es/cotizar` | `/en/quote` | Paquetes + simulador de costos (front) |
| 7 | `/es/contacto` | `/en/contact` | Datos, mapa, redes + formulario placeholder |
| 8 | `/es/privacidad` | `/en/privacy` | Aviso de privacidad |

**Shell global (aplica a todas):** Header, Footer, LanguageSwitcher, menú mobile, WhatsApp flotante, `BaseLayout`.

**Prioridad de trabajo:**

1. Shell global + tokens + tipografía  
2. Home  
3. Experiencias (listado + detalle)  
4. Cotizar  
5. Nosotros  
6. Galería  
7. Contacto  
8. Privacidad  

Componentes de alto impacto: `src/layouts/BaseLayout.astro`, `src/components/layout/*`, `src/components/ui/*`, `src/components/experiences/*`, `src/components/pricing/*`, `src/components/forms/*`, `src/components/gallery/*`, `src/components/contact/*`.

---

## 5. Entorno: agente en la nube (no local)

El LLM de diseño **corre en cloud**, no en la máquina del desarrollador:

- **No asumas** acceso a `bun run dev`, navegador local ni hot-reload.
- Entrega **código completo y listo para merge** (archivos `.astro` / `.css` editados en el repo).
- Si puedes ejecutar build en el entorno cloud, hazlo; si no, deja el código coherente y documenta qué verificar localmente: `bun run build` y `bun run typecheck`.
- No pidas capturas del `localhost` del usuario como dependencia del trabajo.
- Prefiere cambios por archivos reales del repo, no snippets sueltos sin aplicar.
- Mantén paridad ES/EN en cada cambio de página.

---

## 6. Qué puedes cambiar

- Clases Tailwind en `.astro`
- Tokens y `@layer` en `global.css`
- Tipografías (fonts) y escalas
- Espaciado, jerarquía, fondos, bordes, hover/focus
- Estructura visual **dentro** de una sección (orden de bloques) si no rompe datos
- Placeholders SVG/imágenes en `public/images/` por assets más fuertes (mantener `alt` vía content)

## 7. Qué no puedes cambiar (sin acuerdo explícito)

- Schemas / shape de JSON en `src/content/` (salvo copy visual menor en strings ya existentes)
- Rutas i18n y mapa ES↔EN
- Lógica del simulador (`src/lib/pricing/calculator.ts` y cálculo JS)
- Activar envío real del formulario
- Añadir CMS, auth, pagos
- Introducir otro framework CSS (Bootstrap, etc.)
- Romper `getPage` / `getExperiences` / `getPricingConfig`

---

## 8. Criterios de aceptación por entrega

- [ ] Las 8 páginas × 2 idiomas están maquetadas/estilizadas de forma coherente
- [ ] Shell global (header/footer/nav/WhatsApp) consistente en todas
- [ ] Home: primer viewport = marca + mensaje + CTAs + visual dominante
- [ ] Responsive pensado para 375 / 768 / 1280
- [ ] CTAs WhatsApp / Cotizar / Contacto visualmente claros (RNF-02)
- [ ] Focus visible accesible; contraste AA en texto principal
- [ ] ES y EN visualmente equivalentes
- [ ] Sin cards innecesarias en hero; sin badges flotantes sobre media
- [ ] Formulario en contacto sigue siendo placeholder (disabled + aviso)
- [ ] Si el entorno cloud lo permite: `bun run build` (y typecheck) OK; si no, código listo para que el equipo lo verifique en local

---

## 9. Flujo de trabajo sugerido

1. **Foundation:** tipografía + tokens + Header/Footer/Button/Section.
2. **Home:** hero + secciones + CTA banner.
3. **Experiencias + detalle.**
4. **Cotizar** (paquetes + simulador como pieza editorial, no formulario burocrático).
5. **Nosotros / Galería / Contacto / Privacidad.**
6. Pase de consistencia (espaciado, radios, hover) en todo el sitio.

Commits preferidos: Conventional Commits (`style:`, `feat:`, `refactor:`).

---

## 10. Prompt listo para pegar al LLM de diseño (cloud)

Copia y pega:

```
Eres un diseñador frontend senior trabajando en un agente CLOUD (no tienes el entorno local del desarrollador: no dependas de localhost ni de bun run dev del usuario). Estiliza el sitio Baruch Landing (Astro + Tailwind + Bun) siguiendo estrictamente DESIGN_AGENT.md y AGENTS.md en la raíz del repo.

Contexto: landing bilingüe ES/EN de ecoturismo y wellness. Contenido en src/content/; no hardcodear copy. Cotizar = simulador front; Contacto = form placeholder (sin envío real).

MAQUETADO OBLIGATORIO — incluye y estiliza TODAS estas páginas (versión ES y EN, paridad visual):

1. Home — /es/ y /en/
2. Nosotros / About — /es/nosotros y /en/about
3. Experiencias (listado) — /es/experiencias y /en/experiences
4. Detalle de experiencia — /es/experiencias/[slug] y /en/experiences/[slug]
5. Galería — /es/galeria y /en/gallery
6. Cotizar — /es/cotizar y /en/quote (paquetes + simulador)
7. Contacto — /es/contacto y /en/contact (datos, mapa, form placeholder)
8. Privacidad — /es/privacidad y /en/privacy

También el shell global: Header, Footer, LanguageSwitcher, menú mobile, WhatsApp flotante, BaseLayout.

Orden sugerido: tokens/tipografía/layout → Home → experiencias → cotizar → nosotros → galería → contacto → privacidad.

Respeta las reglas duras de composición (hero budget, sin clutter, cards frugales, anti-clichés purple/cream-terracotta/broadsheet). Mobile-first. WCAG AA.

Entrega código aplicado en el repo (archivos completos), no solo snippets. No cambies schemas de contenido ni lógica del simulador. Si puedes build/typecheck en cloud, hazlo; si no, deja todo listo para verificación local con bun run build y bun run typecheck.
```

---

## 11. Estado visual actual (honestidad)

El MVP ya tiene shell funcional (nav, tokens verdes/oro, hero básico, cards de experiencias, simulador). La deuda es **calidad editorial y atmósfera**: tipografía genérica, hero poco fotográfico, exceso posible de “card chrome”, poca jerarquía de ritmo vertical. Tu trabajo es elevar eso sin reescribir el producto.
