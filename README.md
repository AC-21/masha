# Masha Maria — Website (mobile-first)

A minimalist, mobile-first website built with React, TypeScript, Tailwind v4 and Vite. Pages: Home, About, Modalities (full-screen swipe carousel), Poetry (frontmatter-driven), with a Calendly popup for booking.

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:5173`.

Build and preview:

```bash
npm run build
npm run preview
```

## Environment

Calendly popup uses an env var:

```
VITE_CALENDLY_URL=https://calendly.com/YOUR-USERNAME/YOUR-EVENT
```

Create `.env` locally or configure in your hosting provider.

## Content model

- About text: `about-me.md` at repo root (loaded as raw markdown).
- Poetry: Markdown with YAML-like frontmatter in `content/poetry/*.md`.

Example:

```markdown
---
slug: treat-yourself-kindly
title: "Treat yourself kindly"
date: 2025-01-12
summary: "A small reminder to be gentle."
tags: [kindness]
---
Poem body here…
```

Poems are loaded via `src/lib/poetry.ts` and sorted by date (newest first).

## Project structure

```
src/
├─ components/
│  ├─ Header.tsx
│  ├─ Dots.tsx
│  ├─ CalendlyButton.tsx
│  └─ MenuSheet.tsx
├─ pages/
│  ├─ Home.tsx
│  ├─ About.tsx
│  ├─ Modalities.tsx
│  └─ Poetry.tsx
├─ lib/
│  ├─ useSwipe.ts
│  ├─ useInView.ts
│  └─ poetry.ts
├─ data/
│  └─ modalities.ts
├─ styles/
│  └─ globals.css
├─ App.tsx
└─ main.tsx
```

Public assets live in `public/` (images, fonts). Fonts are self-hosted via `.woff2/.woff`.

## Design notes

- Mobile-first; content column max width 560px.
- Modalities: sticky full-screen carousel with horizontal swipe and pastel overlay per slide; dots indicate position; deep-links via `/#ifs` etc.
- Poetry: mobile stream; desktop ≥1024px becomes balanced two-column with center rule.

## Housekeeping

- `dist/` is ignored by git.
- Unused helpers removed (`src/styles/typography.ts`, `src/styles/fontloader.ts`).

## License

MIT — customize and deploy freely.