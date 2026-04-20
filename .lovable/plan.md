
Plan: stay dark, refine the slate palette, add resume button, build DB-backed contact form, wire profile photo + designed OG card. Photo upload pending.

## 1. Theme — Soft Dark slate (refined, not changed)
Update `src/styles.css` tokens to your exact spec:
- `--background`: `#111827` (deep slate)
- `--card`: `#1F2937`, `--card-elevated`: `#273548`
- `--border`: `#2D3748` hairline, `--border-strong`: `#3B4759`
- `--foreground`: `#E5E7EB` (soft off-white), `--muted-foreground`: `#9CA3AF` (ash)
- `--primary` (teal): `#2DD4BF` with dark slate foreground
- `--secondary` (lavender): `#A78BFA` for tags
- `color-scheme: dark` stays. No gradients, no pure black, no pure white, no glow.

Everything else (Inter, layout, components) keeps working — it just re-skins via tokens.

## 2. Resume download (Option A)
- Add `Download Resume` ghost button next to "View Projects" / "Contact Me" in `Hero` (`sections.tsx`), and a matching link in `Footer.tsx` and `/contact`.
- Button links to `/Muhammad_Maaz_Resume.pdf` with `download` attr and opens in new tab as fallback.
- You drop the PDF into `public/Muhammad_Maaz_Resume.pdf` after — link works the moment the file lands, no code change needed.

## 3. Profile photo in Hero
- You upload a portrait; I save it to `src/assets/maaz.jpg` (Vite-hashed import).
- Restructure `Hero` to a 2-column grid on `md+` (text left, photo right ~280px rounded-2xl with hairline border + soft shadow). On your 249px viewport it stacks: photo on top ~140px, then text. No crop weirdness — `object-cover`, `aspect-square`.

## 4. Contact form — DB-only (Lovable Cloud)
Enable Lovable Cloud. Then:
- **Migration**: create `contact_messages` table (`id uuid pk`, `name text`, `email text`, `message text`, `created_at timestamptz default now()`). RLS on. Policies: `INSERT` allowed for `anon` + `authenticated` (so the public form can submit); `SELECT` restricted (you'll view rows in Cloud → Tables, no public read).
- **Server function** `submitContactMessage` in `src/utils/contact.functions.ts` using `createServerFn` + Zod validation (name 1–100, email format, message 10–2000, basic length caps to prevent abuse). Inserts via `supabaseAdmin` (service role, server-only).
- **Form UI** on `/contact`: replace the static info list bottom-half with a real form using `react-hook-form` + `zod` resolver + existing shadcn `Input`/`Textarea`/`Label`/`Button`. On success → `sonner` toast "Message sent" + reset form. On error → toast with reason. Keep the existing email/GitHub/LinkedIn cards above the form.
- Email forwarding (Lovable Emails) layered on later — schema + form won't change.

## 5. Designed OG share image (1200×630)
What it is, briefly: when your URL is pasted into LinkedIn / X / WhatsApp / iMessage / Slack, those platforms read your page's `<meta property="og:image">` and render a rich preview card. Without it you get a bare blue link. With it you get a branded card.

Approach:
- Generate **once at build time**, not on the fly. I'll write a small Node script (`scripts/generate-og.mjs`) using `@vercel/og` (Satori under the hood — pure JS, works without native deps) that composes:
  - Dark slate `#111827` background, subtle 1px grid texture
  - Your circular portrait left (~280px)
  - Right column: "Muhammad Maaz" in Inter 72px, tagline "Full-Stack Software Developer — Flutter, Node.js & React" in 32px ash, small teal "Available for opportunities" pill, lavender tag row "UN Millennium Fellow • Founder, Insightify"
- Output to `public/og-image.png` (1200×630). Run via `bun run og:generate` (added to `package.json` scripts). Re-run only when photo or copy changes.
- Wire `og:image` + `twitter:image` (+ `twitter:card: summary_large_image`) into `src/routes/index.tsx`'s `head()` only — leaf routes only per TanStack rules. `/projects`, `/about`, `/contact` keep their own text metadata, no shared image.

## 6. Verification (after build)
- Click "Download Resume" → confirms 200 (will 404 until you upload the PDF — expected).
- Submit contact form with valid + invalid input → confirm row appears in Cloud table, validation errors show inline, toast fires.
- `curl -I` on `/og-image.png` → 200, correct dimensions.
- Paste preview URL into LinkedIn Post Inspector / opengraph.xyz to confirm card renders.

## What I need from you next message
1. Your portrait photo (drag into chat).
2. Approval to enable **Lovable Cloud** (needed for the DB + server function). One click on your side when prompted.

Resume PDF can come whenever — link works the moment you drop the file in `public/`.
