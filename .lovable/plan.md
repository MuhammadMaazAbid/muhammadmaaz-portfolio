
Three changes:

## 1. Tighten section spacing
In `src/components/site/sections.tsx`, sections currently use `py-16 md:py-24`. Reduce to `py-10 md:py-14` for `Experience`, `Projects`, `Skills`, `Honors`. Hero stays as-is (it's the top hero). This brings sections visually closer without cramping.

## 2. Single-page scroll navigation (with separate routes still working)
Current behavior: nav links go to `/projects`, `/about`, `/contact` (separate routes). You want clicking "Work" / "About" on the homepage to **scroll** to that section on the same page, while still being able to scroll freely up/down through everything.

Approach:
- Keep `/projects`, `/about`, `/contact` as standalone routes (good for SEO + direct sharing).
- On the homepage `/`, render all sections stacked (already the case): Hero, Experience, Projects, Skills, Honors, Contact teaser.
- Update `Nav.tsx` so when the user is **on `/`**, the nav links become hash anchors (`/#projects`, `/#about`, `/#contact`) that smooth-scroll to the section. When on any other route, they navigate to the full route as today.
- Add `id="experience"`, `id="projects"`, `id="skills"`, `id="about"`, `id="contact"` to each section (most already exist). Add an `About` section to the homepage (currently only on `/about`) so the anchor has a target — short bio + honors + skills grouped.
- `scroll-behavior: smooth` is already set in `styles.css`, so anchor jumps animate. Add `scroll-margin-top: 4rem` on section headings so the sticky nav doesn't overlap.
- Active nav link uses `IntersectionObserver` to highlight whichever section is currently in view (so as you scroll, the nav updates — matches the behavior you described).

Result: nav click = smooth scroll to section, free scrolling unrestricted, active link follows your scroll position. Direct visits to `/projects` etc. still work.

## 3. Light + Dark theme toggle
- Add a `ThemeProvider` in `src/components/theme-provider.tsx` (React context, persists choice to `localStorage`, respects system preference on first visit, toggles `.dark` class on `<html>`).
- Wrap the app in `__root.tsx` with `ThemeProvider`, plus an inline pre-hydration script in the `<head>` to set the class before paint (prevents flash of wrong theme on SSR).
- Add a `ThemeToggle` button (sun/moon icon from lucide-react) in `Nav.tsx`, both desktop and mobile menu.
- Update `src/styles.css`:
  - Move current dark tokens from `:root` into `.dark` selector.
  - Add new `:root` (light mode) tokens — minimal warm-light palette that complements the dark teal/lavender:
    - bg `#FAFAF7`, card `#FFFFFF`, card-elevated `#F5F4EF`
    - foreground `#0F1115`, muted-foreground `#5B5F6B`
    - border `#E6E3DC`, border-strong `#D4D0C7`
    - primary (teal, slightly deeper for contrast on light): `#0D9488`
    - secondary (lavender, deeper): `#7C6BD8`
  - Remove forced `color-scheme: dark` from html; set it dynamically via the theme class.
  - Update OG image note: it stays the dark-slate version (good for sharing regardless of viewer's theme).

## Files to edit
- `src/styles.css` — split tokens into `:root` (light) + `.dark` (existing dark)
- `src/components/theme-provider.tsx` — new, context + hook
- `src/components/theme-toggle.tsx` — new, sun/moon button
- `src/routes/__root.tsx` — wrap with provider + inline pre-hydration script
- `src/components/site/Nav.tsx` — smart links (hash on `/`, route elsewhere) + theme toggle + active-section observer
- `src/components/site/sections.tsx` — reduce `py-16 md:py-24` → `py-10 md:py-14`, add ids, add `scroll-mt-16` to headings, add an `About` section component
- `src/routes/index.tsx` — include the new `<About />` in the homepage stack

## Verify after build
- Toggle theme — colors swap instantly, persists on reload, no flash.
- On `/`, click Work → smooth-scrolls to projects, can scroll freely past it.
- On `/about`, click Work in nav → navigates to `/#projects` (full route load + scroll).
- Sticky nav doesn't cover section headings.
- Section spacing visibly tighter.
