---
name: Baruch Design System
colors:
  surface: '#fbf9f4'
  surface-dim: '#dbdad5'
  surface-bright: '#fbf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3ee'
  surface-container: '#f0eee9'
  surface-container-high: '#eae8e3'
  surface-container-highest: '#e4e2dd'
  on-surface: '#1b1c19'
  on-surface-variant: '#424842'
  inverse-surface: '#30312e'
  inverse-on-surface: '#f2f1ec'
  outline: '#727972'
  outline-variant: '#c2c8c0'
  surface-tint: '#46664f'
  primary: '#072715'
  on-primary: '#ffffff'
  primary-container: '#1e3d29'
  on-primary-container: '#86a88e'
  inverse-primary: '#accfb3'
  secondary: '#755b18'
  on-secondary: '#ffffff'
  secondary-container: '#fdd88a'
  on-secondary-container: '#785d1b'
  tertiary: '#002813'
  on-tertiary: '#ffffff'
  tertiary-container: '#103f24'
  on-tertiary-container: '#7bab88'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c7ebcf'
  primary-fixed-dim: '#accfb3'
  on-primary-fixed: '#01210f'
  on-primary-fixed-variant: '#2e4d38'
  secondary-fixed: '#ffdf9c'
  secondary-fixed-dim: '#e5c276'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5b4300'
  tertiary-fixed: '#bceec8'
  tertiary-fixed-dim: '#a1d2ad'
  on-tertiary-fixed: '#00210f'
  on-tertiary-fixed-variant: '#224f33'
  background: '#fbf9f4'
  on-background: '#1b1c19'
  surface-variant: '#e4e2dd'
  deep-forest: '#1e3d29'
  moss-green: '#2d5a3d'
  earth-gold: '#c4a35a'
  sand-surface: '#f8f6f1'
  bark-slate: '#3d3d3d'
typography:
  display-hero:
    fontFamily: ebGaramond
    fontSize: 80px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '400'
    lineHeight: '1.2'
  headline-md:
    fontFamily: ebGaramond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.4'
  body-lg:
    fontFamily: hankenGrotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-base:
    fontFamily: hankenGrotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-caps:
    fontFamily: hankenGrotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.1em
spacing:
  container-max: 1280px
  gutter: 2rem
  margin-mobile: 1.25rem
  section-padding: 6rem
  stack-sm: 0.5rem
  stack-md: 1.5rem
  stack-lg: 3rem
---

## Brand & Style

The design system for this product is rooted in the intersection of **Premium Ecotourism** and **Holistic Wellness**. The visual narrative is built upon a "Terrestrial Luxury" concept—moving away from typical tech-startup aesthetics and embracing an editorial, earth-bound atmosphere that reflects the stillness of the forest.

The brand personality is **Serene, Grounded, and Hospitaliary**. It targets a high-end demographic seeking refuge from digital noise through nature and physical connection.

### Design Style: High-Contrast Editorial Minimalism
This system utilizes a minimalist framework influenced by high-end boutique hospitality. It focuses on:
- **Atmospheric Visuals:** Large, full-bleed photography that serves as the layout's primary "anchor."
- **Typography as Architecture:** Using classical serifs at large scales to create a sense of history and permanence.
- **Zero-Radius Precision:** By maintaining a `0` roundedness (sharp corners), the UI achieves a sophisticated, bespoke architectural feel, reminiscent of high-end print magazines.
- **Frugal Componentry:** Avoiding "card-heavy" layouts. Containers are used only when functionally necessary for interactivity, preferring structural whitespace and hairline dividers to separate content.

## Colors

The palette is derived directly from the forest floor and filtered sunlight.

- **Deep Forest (#1e3d29):** The primary anchor. Used for heavy typography, navigation backgrounds, and primary buttons. It represents the depth and shade of the woods.
- **Earth Gold (#c4a35a):** The secondary accent. Used sparingly for high-value callouts, active states, and refined decorative elements. It symbolizes sunlight and premium quality.
- **Moss Green (#2d5a3d):** A tertiary variant used for interactive elements, hover states, and subtle background shifts.
- **Sand Surface (#f8f6f1):** The foundation of the light-mode experience. This off-white, warm neutral prevents the "clinical" feel of pure white, providing a soft, paper-like texture to the interface.

**Usage Note:** Avoid gradients. Color should be applied in solid, confident blocks to maintain the "grounded" terrestrial feel.

## Typography

The typographic strategy balances **Classical Authority** (EB Garamond) with **Modern Precision** (Hanken Grotesk).

- **Headlines:** Always EB Garamond. Large scales should use medium weights to maintain elegance without becoming overly "heavy." Use `display-hero` for the brand name on the home page to create a luxury editorial impact.
- **Body:** Hanken Grotesk provides a clean, neutral counterpoint that ensures high legibility for long-form content like retreat descriptions and privacy policies.
- **Labels:** Small labels, such as package categories or button text, should use Hanken Grotesk in uppercase with slight tracking (`0.1em`) to evoke a sense of professional labeling and wayfinding.

## Layout & Spacing

This design system uses a **Fixed Grid** philosophy for desktop to maintain a controlled, editorial feel, while transitioning to a fluid, safe-margin approach for mobile.

- **Vertical Rhythm:** Generous section padding (`6rem`) is used to give elements "breath," reinforcing the calm and wellness aspect. No section should feel cramped.
- **The "Hero Budget":** The initial viewport is strictly limited to: Brand Name + 1 Headline + 1 Sentence + 1-2 CTAs + 1 Dominant Visual.
- **Mobile-First:** Margins scale down to `1.25rem` on mobile, ensuring content remains the hero. Grids reflow from multi-column desktop views to single-column stacks with consistent `stack-md` spacing between elements.

## Elevation & Depth

To maintain the grounded, terrestrial aesthetic, this design system **avoids standard shadows and blurs**.

- **Tonal Layering:** Depth is conveyed through background color shifts (e.g., a `Deep Forest` footer meeting a `Sand Surface` body) and sharp, high-contrast intersections.
- **Low-Contrast Outlines:** Instead of shadows, cards (when used) and input fields utilize 1px solid borders in a slightly darker version of the surface color or the `Bark Slate` color at low opacity.
- **Full-Bleed Media:** Images are used as the "base" layer. UI elements (like text or buttons) can sit directly on media using solid background fills rather than semi-transparent overlays, keeping the look crisp and intentional.

## Shapes

The shape language is strictly **Sharp (0px)**. 

Every element—from buttons and input fields to image containers and cards—must have 0px corner radius. This choice removes the "software" feel and aligns the UI with architectural and print design, evoking a more premium and permanent atmosphere.

## Components

### Buttons
- **Primary:** Solid `Deep Forest` background, `Sand Surface` text, 0px radius. Uppercase label.
- **Secondary:** Outlined `Earth Gold` or `Deep Forest`, 1px solid border.
- **Hover:** Subtle shift to `Moss Green` or a slight shift in background opacity. No lifting or shadow effect.

### Cards (Experiences & Packages)
- Avoid "box" styling. Use an image (sharp corners) followed directly by text on the `Sand Surface`. 
- If a container is necessary, use a 1px solid `Bark Slate` border with no shadow and no radius.

### Input Fields & Selects
- 1px solid border using `Bark Slate`. 
- `Sand Surface` background to match the page, or pure white for contrast.
- Focus state: Border color changes to `Earth Gold`.

### Interactive Elements
- **WhatsApp Floating Button:** A simple, high-contrast `Deep Forest` or `Earth Gold` square (0px radius) in the bottom corner.
- **Language Switcher:** Minimalist text-only link (e.g., "ES | EN") in the navigation bar using Hanken Grotesk labels.

### Lists
- Use thin hairline dividers (1px) in `Bark Slate` at 10% opacity to separate list items in the "Pricing" or "Experience Detail" pages. Avoid bullet points; use typographic hierarchy or `Earth Gold` checkmarks instead.