## Redesign Phase 1 (Mobile-first scaffold)

- [X] Archive previous UI code. [Completed] (`master/archive-2025-11-07/src/*`) – old `App.tsx`, `components/`, `pages/`, `tools/`, `lib/`, and `content/` moved.
- [X] Set up lightweight routing. [Completed] (`master/src/App.tsx`)
- [X] Create shared header with MM + menu. [Completed] (`master/src/components/Header.tsx`)
- [X] Build Home page with title, minimal nav, quote. [Completed] (`master/src/pages/Home.tsx`)
- [X] Add swipe navigation on Home (left→About, right→Modalities). [Completed] (`master/src/lib/useSwipe.ts` used in `Home.tsx`)
- [X] Create About page placeholder. [Completed] (`master/src/pages/About.tsx`)
- [X] Create Modalities page with hero + full-screen carousel. [Completed] (`master/src/pages/Modalities.tsx`)
- [X] Implement swipe + dots between modalities with pastel overlays. [Completed] (`master/src/components/Dots.tsx`, `master/src/lib/useSwipe.ts`, `master/src/data/modalities.ts`)
- [X] Ensure mobile-first + basic desktop responsiveness (max-width container, viewport). [Completed] (`master/index.html`, Tailwind defaults)

Key entry points to run:

- `master/index.html`
- `master/src/main.tsx`
- `master/src/App.tsx`

Notes:

- Background image placeholder uses `public/placeholder-portrait.jpg`.
- Home swipe gestures: left→`/about`, right→`/modalities`.
- Modalities carousel is full-screen, swipeable, with dots indicator and per-slide pastel overlay color.

## Redesign Phase 1A (Modalities refinement)

- [X] Rebuild Modalities hero + preview card to match reference. [Completed] (`master/src/pages/Modalities.tsx`)
- [X] Turn modality panels into rounded overlay cards with pastel wash layers. [Completed] (`master/src/pages/Modalities.tsx`)
- [X] Align typography + spacing with reference screenshots. [Completed] (`master/index.html`, `master/src/styles/globals.css`, `master/src/pages/Modalities.tsx`)
- [X] Refine hero peek → full-screen transition for first modality card. [Completed] (`master/src/pages/Modalities.tsx`)

## Font Styling Updates (2025-11-07)

- [X] Set Modalities header to Satoshi at 750 weight. [Completed] (`master/src/pages/Modalities.tsx`)
- [X] Switch global body typography to Author at 250 weight. [Completed] (`master/src/styles/globals.css`)
- [X] Apply Agu Display to the MM logo. [Completed] (`master/src/components/Header.tsx`)
- [X] Update Modalities cards to render titles in Satoshi 750. [Completed] (`master/src/pages/Modalities.tsx`)
- [X] Increase site body copy sizing for readability. [Completed] (`master/src/styles/globals.css`)
- [X] Rebalance body copy to 16px baseline while keeping Author styling. [Completed] (`master/src/styles/globals.css`)
- [X] Enlarge Somatic Internal Family Systems teaser headline with heavier Satoshi weight. [Completed] (`master/src/pages/Modalities.tsx`)
- [X] Set Home hero title to Agu Display. [Completed] (`master/src/pages/Home.tsx`)
- [X] Share Modalities background treatment across Home & About. [Completed] (`master/src/pages/Home.tsx`, `master/src/pages/About.tsx`)

## About Page Refresh (2025-11-08)

- [X] Recreate About portrait card and layout from reference mock. [Completed] (`master/src/pages/About.tsx`, `master/src/assets/Masha Background.jpg`)
- [X] Load About narrative from Markdown source with card styling. [Completed] (`master/src/pages/About.tsx`, `/Users/sasha/Masha-website/about-me.md`, `master/src/types/content.d.ts`)
- [X] Remove residual card chrome and tighten top spacing. [Completed] (`master/src/pages/About.tsx`)
- [X] Add pastel wash and grain texture for higher card contrast. [Completed] (`src/pages/About.tsx`)

Next up (Phase 2):  

- [ ] Implement menu panel and link targets.
- [ ] Populate About + Modalities content from Markdown/site.json.
- [ ] Add Poetry + Book a Session pages (placeholders → real content).
- [ ] Add subtle transitions (fade/slide) and polish desktop layout.

## Repo Cleanup (2025-11-08)

- [X] Promote Vite app from `master/` to repo root. [Completed] (Move log) – `rsync -a --exclude 'dist' master/ ./` then removed `master/`. Entry points now at repo root: `index.html`, `src/main.tsx`, `src/App.tsx`.
- [X] Ensure build artifacts ignored. [Completed] (`.gitignore`) – `dist` already ignored; removed `master/` including `master/dist/`.

## Mobile-first additions (2025-11-08)

- [X] Add Poetry route. [Completed] (`src/App.tsx`, `src/pages/Poetry.tsx`)
- [X] Implement poetry loader with frontmatter. [Completed] (`src/lib/poetry.ts`)
- [X] Seed poetry content (5 placeholders). [Completed] (`content/poetry/*.md`)
- [X] Hook up Calendly popup. [Completed] (`src/components/CalendlyButton.tsx`, `README-CALENDLY.md` env: `VITE_CALENDLY_URL`)
- [X] Wire Home nav to Poetry + Booking. [Completed] (`src/pages/Home.tsx`)

## Documentation (2025-11-08)

- [X] Update README for root app, Calendly env, poetry model, and structure. [Completed] (`README.md`)

## Booking + Performance (2025-11-08)

- [X] Add full-page booking route and inline embed. [Completed] (`src/pages/Book.tsx`, `src/components/CalendlyInline.tsx`)
- [X] Wire popup booking from Home + Menu; keep /book link. [Completed] (`src/pages/Home.tsx`, `src/components/MenuSheet.tsx`, `src/components/CalendlyButton.tsx`)
- [X] Optimize page backgrounds to AVIF/WebP and use image-set. [Completed] (`src/pages/Home.tsx`, `src/pages/About.tsx`, `src/pages/Modalities.tsx`, `src/pages/Poetry.tsx`, `src/pages/Book.tsx`)
- [X] Add prefers-reduced-motion for carousel transitions. [Completed] (`src/lib/usePrefersReducedMotion.ts`, `src/pages/Modalities.tsx`)
- [X] Harmonize modality overlay pastels. [Completed] (`src/data/modalities.ts`)
## Modalities polish (2025-11-09)

- [X] Ensure teaser modality card is visible on initial page load. [Completed] (`src/pages/Modalities.tsx`)
- [X] Keep sticky carousel anchored while hero collapses. [Completed] (`src/pages/Modalities.tsx`)
- [X] Fix full-screen card expansion: remove max-width constraint when expanded, ensure edge-to-edge layout, prevent overflow from next card. [Completed] (`src/pages/Modalities.tsx`)
- [X] Make card truly full-screen when expanded: use absolute positioning with `inset-0`, remove horizontal padding from card, add padding to inner content div. [Completed] (`src/pages/Modalities.tsx`)
- [X] Fix card height to fill full viewport: make card wrapper `absolute inset-0` when expanded, card uses `relative w-full h-full` to fill wrapper. [Completed] (`src/pages/Modalities.tsx`)
- [X] Align hero padding with viewport to avoid card overlap. [Completed] (`src/pages/Modalities.tsx`)
- [X] Clamp teaser expansion so adjacent cards remain hidden. [Completed] (`src/pages/Modalities.tsx`)

