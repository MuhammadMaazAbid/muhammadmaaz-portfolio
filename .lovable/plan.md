&nbsp;

## Goals

1. Swap in your updated resume PDF.
2. Replace the browser-tab icon with your custom favicon.
3. Add tasteful UX polish: scroll-triggered reveals, magnetic buttons, hover micro-interactions, and a static teal dot-grid hero overlay (3–5% opacity, no motion).
4. Full performance pass — faster first paint **and** snappier navigation.
5. Quietly fix the existing theme-toggle hydration mismatch (currently throwing React #418 in production) since it directly hurts perceived smoothness.

## Uploads needed from you

Please attach in your next message:

- `Muhammad_Maaz_Resume.pdf` — updated resume (replaces `/public/Muhammad_Maaz_Resume.pdf`)
- Favicon file — `.svg` preferred (also accept `.png` 512×512 or `.ico`). I'll generate the full set (favicon.ico, apple-touch-icon, 192/512 PWA icons) from it.

I'll start everything else in parallel and wire the files in once they arrive.

## What I'll build

### 1. Resume + favicon

- Drop new PDF at `/public/Muhammad_Maaz_Resume.pdf` (download link already points here — no code change needed).
- Add favicon assets to `/public/` and register them in `__root.tsx` `head().links` (icon, apple-touch-icon, manifest).

### 2. UX effects

- **Scroll reveals**: lightweight `IntersectionObserver` hook (`useReveal`) — no Framer Motion dependency. Fades + 8px translate, runs once, respects `prefers-reduced-motion`. Applied to Experience, Projects, Skills, Honors, About, Contact sections.
- **Magnetic buttons**: `<MagneticButton>` wrapper using pointer events + transform; subtle 6–8px pull. Applied to primary CTAs in Hero and ContactTeaser. Disabled on touch / reduced-motion.
- **Hover micro-interactions**: project + honor cards get a soft lift (translateY -2px, shadow upgrade, border highlight to `--primary/40`) on hover. Pure CSS transitions.
- **Hero dot-grid overlay**: pure CSS `radial-gradient` background pattern, ~16px spacing, color `var(--primary)` at 4% opacity in light / 5% in dark, masked with a vertical fade so it dissolves toward the next section. Zero motion, zero JS.

### 3. Performance pass

Diagnostic first (Lighthouse-style profile), then fixes:

- **Fonts**: currently loads 4 Inter weights via `@fontsource` CSS imports — these block first paint. Switch to `@fontsource-variable/inter` (single variable file, ~30KB) and preload it. Expected: ~150–250 KB saved + faster LCP.
- **OG image**: hero/social image is fetched from `storage.googleapis.com` on every page. Move it under `/public/` and serve from same origin (eliminates a DNS+TLS handshake).
- **Code-splitting**: verify each route is its own chunk (TanStack auto-splits, but I'll confirm no `export function` leaks in route files, which would defeat splitting).
- **Sections component**: `src/components/site/sections.tsx` exports 7 sections used only on `/`. Confirm it's not pulled into other routes' bundles; if it is, split per-section.
- **Lucide icons**: confirm tree-shaking is working (named imports only — already correct).
- **Image hints**: add `loading="lazy"` and explicit `width`/`height` to any below-the-fold images (prevents layout shift, defers decode).
- **Prefetch**: TanStack `<Link>` prefetches on hover by default — verify `defaultPreload: 'intent'` is set on the router; if not, enable it for instant nav.
- **Theme init script**: keep inline (already correct), but add `color-scheme` CSS hint to avoid flash.

### 4. Quiet fix: hydration mismatch

The console is throwing React error #418 because `<ThemeToggle>` renders `<Sun>` on the server and `<Moon>` on the client (or vice versa). This causes React to throw away and re-render the entire tree on every load — measurable perf hit. Fix by rendering a neutral placeholder until mounted, or by reading the theme synchronously from the inline init script's classlist before first render. This will both silence the error and visibly speed up first interaction.

## Technical notes

- No new heavy dependencies. Framer Motion is **not** added — IntersectionObserver + CSS handles reveals at a fraction of the cost.
- `@fontsource-variable/inter` swaps in (~30 KB) and the four `@fontsource/inter/{400,500,600,700}.css` imports come out of `src/styles.css`.
- Magnetic button is ~40 lines, no deps.
- All effects gated behind `@media (prefers-reduced-motion: reduce)`.
- Favicon registration uses TanStack `head().links`, not a manual `<link>` tag (SSR-safe).

**Updated Summary Text for Hero Section:** "I build high-performance applications and AI-driven systems. Currently Co-Founder at Insightify, operating at the intersection of full-stack development, cybersecurity, and human-centric design. Deep technical architecture meets real-world execution."

## Out of scope (will not touch)

- Email infrastructure / contact form (already shipped).
- Branding badge (already hidden).
- Page content/copy (only the resume file changes).
- Color tokens / typography scale.

## Deliverable checklist

- New resume PDF live at `/Muhammad_Maaz_Resume.pdf`
- Favicon visible in browser tab across light/dark
- Scroll reveals on all index sections
- Magnetic Hero + Contact CTAs
- Card hover lift on Projects + Honors
- Dot-grid behind Hero, no motion
- Hydration error gone from console
- Variable Inter font loaded; old weights removed
- OG image served from `/public/`
- Lighthouse perf score reported before/after