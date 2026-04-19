
# Muhammad Maaz — Personal Portfolio

## Overview
A premium, dark-mode personal portfolio for Muhammad Maaz (Full-Stack Developer, Founder, UN Millennium Fellow) built as a multi-route TanStack Start site with a fintech-inspired minimal aesthetic. Despite the user calling it "single-page", I'll use separate routes per section for SSR/SEO benefits, with the homepage acting as a long-scroll landing showcasing everything (best of both worlds: anchor-scroll on home + dedicated routes for deep links/sharing).

## Design Direction

**Aesthetic**: Minimal fintech — think Linear, Stripe, Ramp. Restrained, confident, scannable.

**Colors** (dark-only, no light mode):
- Background base: `#0F0F10` (near-black charcoal)
- Surface/cards: `#181819` with `#1F1F21` elevated
- Borders: `#26262A` (hairline, 1px)
- Text primary: `#F5F5F4`
- Text muted: `#8A8A8E`
- Accent teal: `#5EEAD4` (used sparingly — links, primary CTA, active states)
- Accent lavender: `#C4B5FD` (secondary highlights, tech tags)
- No gradients on buttons, no glow, no neon.

**Typography**: Inter for everything. Tight tracking on headlines (-0.02em), generous line-height (1.6) on body. Large hero (clamp 48–80px), section titles ~32px, body 15–16px.

**Spacing & shape**: 
- Border radius: 8px (cards), 6px (buttons/tags), 4px (small chips)
- Soft shadows only: `0 1px 2px rgba(0,0,0,0.4)` on cards
- Generous vertical rhythm (96–128px between sections)
- Max content width: 1100px, centered

**Motion**: Subtle only — 150ms ease transitions on hover, slight `translateY(-2px)` lift on project cards with border color shift to teal/20%. No scroll-triggered animations beyond a gentle fade-in on first paint.

## Architecture

**Routes**:
- `/` — Full landing page with all sections stacked (Hero → Experience → Projects → Skills → Honors → Contact/Footer), smooth-scroll anchors from nav
- `/projects` — Dedicated projects page (same cards, expanded)
- `/about` — Bio + experience + honors
- `/contact` — Contact info + form-style display

Each route gets its own `head()` with unique title/description/og tags.

**Shared layout** (in `__root.tsx`):
- Fixed minimal top nav: "Maaz" wordmark left, links (Work, About, Contact) right, GitHub/LinkedIn icons
- Footer with email + socials

## Page Sections (Homepage)

**A. Hero**
- Small eyebrow tag: "Available for opportunities" with teal dot
- Headline: "Muhammad Maaz" (large, tight)
- Subheadline: "Full-Stack Software Developer — Flutter, Node.js & React"
- Bio paragraph (muted color, max 600px wide)
- Two CTAs: "View Projects" (teal filled) + "Contact Me" (ghost with border)
- GitHub + LinkedIn icon links inline below

**B. Experience & Leadership** — Insightify
- Section label: "01 — Experience"
- Card with title, lavender tech tags row, three bullets, small "UN Millennium Fellowship" badge

**C. Technical Projects**
- Section label: "02 — Selected Work"
- 2-column grid (1-col mobile) of 4 project cards:
  - Hospital ER Management System
  - Divi (Smart Expense Allocation)
  - Embedded Hardware Radar System
  - The Cinemique Aura
- Each card: title, tech tags, description, subtle hover lift + teal border

**D. Skills & Certifications**
- Section label: "03 — Stack"
- Three columns: Languages & Frameworks / Databases & DevOps / Certifications
- Skills as small bordered chips, not bars or percentages

**E. Honors & Competitions**
- Section label: "04 — Recognition"
- Clean list with year on left, title + description on right (timeline-feel without the line)
- Three entries: FAST Soventure Pitchfest, Hult Prize, UN Millennium Fellowship

**F. Footer / Contact**
- Large "Let's build something." statement
- Email link (teal): muhammadmaaz153@gmail.com
- GitHub + LinkedIn links
- Copyright line, minimal

## Technical Notes

- TanStack Start file-based routing in `src/routes/`
- Tailwind v4 via `src/styles.css` — update color tokens to the charcoal/teal/lavender palette
- Inter font via `@fontsource/inter` (weights 400, 500, 600, 700)
- Lucide icons for Github, Linkedin, Mail, ArrowRight, ExternalLink
- Smooth scroll behavior on html element for anchor navigation on home
- Fully responsive: mobile nav collapses to hamburger sheet, grids collapse to single column < 768px
- Each route's `head()` populated with Maaz-specific metadata for proper social sharing
- Replace placeholder `index.tsx` entirely
