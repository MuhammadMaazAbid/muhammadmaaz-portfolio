## What I'll do

### 1. Install your uploaded files
- **Resume**: copy `user-uploads://MuhammadMaaz_resume-2.pdf` → `public/Muhammad_Maaz_Resume.pdf` (overwrites the old one; existing download links keep working).
- **Favicon**: copy `user-uploads://logo.png` → `public/favicon.png` and `public/apple-touch-icon.png`. Delete the temporary teal "M" SVG placeholder I generated last turn and update the `<link rel="icon">` tags in `__root.tsx` to point at the PNG.

### 2. Update the hero summary
Replace the current long "Motivated and adaptable Computer Science student…" bio in `src/components/site/data.ts` with the sharper version from the approved plan:

> "I build high-performance applications and AI-driven systems. Currently Co-Founder at Insightify, operating at the intersection of full-stack development, cybersecurity, and human-centric design. Deep technical architecture meets real-world execution."

This text flows into the Hero through `profile.bio` (and isn't reused on About, which has its own hand-written copy — so nothing else breaks).

### 3. Why you "can't see any changes" — likely cache
Last turn's changes are real (scroll reveals, magnetic buttons, dot grid, variable font, hydration fix), but they can be invisible until the browser drops the old SSR HTML and the cached assets. Two things I'll verify after the edits:

- Hard-reload the preview (Cmd/Ctrl + Shift + R) — old JS chunks may still be running.
- Confirm the build picked up the changes (check `dist/` output or just inspect the live preview HTML for the new `.reveal` classes and `.dot-grid` element).

If the effects still don't show, I'll dig into:
- Whether SSR is stripping the IntersectionObserver-applied class (likely fine, but worth checking with a console log).
- Whether the dot grid is being clipped by `overflow-hidden` somewhere upstream.

### 4. Out of scope
No new effects beyond what was already approved. Email infra, badge, contact form unchanged.

## Deliverables
- New PDF live at `/Muhammad_Maaz_Resume.pdf`
- Your "M" logo visible in the browser tab
- Hero shows the new short, sharper summary
- Confirmation that scroll reveals + magnetic CTAs + dot grid are actually rendering on the live preview
