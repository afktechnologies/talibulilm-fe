# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Talibulilm frontend: a Next.js 15 (App Router) + React 19 site serving Islamic reference content — Quran (surah/juz/page/ayah + translations), Hadith (books/collections/hadiths), Duas/Supplications, a Qna module, a Scholars directory, and standalone tools (Zakat calculator, Islamic calendar). It consumes the sibling `talibulilm-be` NestJS API (see that repo's `CLAUDE.md` for backend/domain details) but **this repo is developed independently — do not edit anything under `../talibulilm-be`**.

## Commands

```bash
pnpm dev      # next dev — dev server on http://localhost:3000
pnpm build    # next build
pnpm start    # next start (serve production build)
pnpm lint     # next lint
```

This repo uses `pnpm` (see `pnpm-lock.yaml`); don't introduce `package-lock.json`/`yarn.lock`. There is no test runner configured — no `test` script, no Jest/Vitest/Playwright config or `*.spec/test.*` files exist in this repo.

## Architecture

### Data layer: three states of wiring, per feature

The codebase is mid-migration from static JSON mocks to the live backend, and different feature areas are in different states. Check which state a feature is in before assuming a data source:

- **Live API (Quran, most of Hadith)**: `src/services/api/endpoints/*.ts` define `ky`-based fetchers grouped by domain (`quranApi`, `hadithApi`, `supplicationApi`, `qnaApi`), re-exported from `src/services/api/endpoints/index.ts`. `src/services/hooks/*.ts` wrap each endpoint in a TanStack Query `useQuery` (queryKey, `select: (response) => response.data` to unwrap the backend's `{ message, code, data, meta? }` envelope). Components call the hooks, never the endpoint functions or `apiClient` directly.
- **Static JSON fallback (Supplication, Qna, Scholars)**: several pages still import fixture data straight from `src/store/data/*.json` (e.g. `src/app/qna/page.tsx` imports `qnaData.json`). Some of these files contain the real API-backed version commented out directly above/below the static version, showing the intended replacement — read the surrounding comments before changing these pages, they document the migration path in progress.
- **Not wired at all (Scholars, Qna ask)**: `src/app/scholars/[slug]/page.tsx` and `src/app/scholars/page.tsx` render `<ComingSoon />` with the real implementation fully commented out below. `src/app/api/qna/ask/route.ts` is a Next.js route handler that logs the submission and returns a fake success — the real `fetch` to the backend is commented out. Don't assume a page is unimplemented just because the route exists; check for `ComingSoon`/commented blocks first.

`src/constants/api.ts` hardcodes `API_BASE_URL` to the production API (`https://api.talibulilm.in`) — it does **not** read `process.env.API_BASE_URL` even though `.env`/`.env.example` define that var. If you need env-driven API URLs, this is the disconnect to fix; don't assume changing `.env` has any effect today.

`apiClient` (`src/services/api/client.ts`) is a shared `ky` instance with a `beforeRequest` hook stubbed out for future auth-token injection — no auth/token handling exists on the frontend yet.

### App Router structure

Routes live under `src/app/**/page.tsx` and stay thin: they fetch/import data (server components by default — several are `async` and read dynamic route params via `await params`, per Next 15's async-params API) and delegate all markup/interactivity to `src/components/<Domain>/...`. Domain component folders roughly mirror the route tree (`components/Quran/Home`, `components/Quran/Details`, `components/Quran/Tafsir`, `components/Hadith/Home`, `components/Hadith/Collections`, `components/Hadith/Details`, `components/Qna`, `components/Supplication/{Home,Dua}`, `components/Scholars`, `components/ZakatCalculator`). `components/common/*` holds cross-domain UI (Navbar, Footer, Breadcrumb, SearchBar, error fallbacks, skeletons) plus the two app-wide providers.

Client-side interactivity is opt-in via `"use client"` at the top of leaf components (e.g. `QnaClient.tsx`, most `*Content.tsx`/`*Card.tsx` files) — container `page.tsx` files stay server components where possible.

### Providers (`src/app/layout.tsx`)

Root layout nests `ReduxProvider` → `QueryClientProviderComponent` → `MainNavbar`/children/`MainFooter`. Both providers are client components:
- `ReduxProvider` (`src/components/common/Redux/ReduxProvider.tsx`) wires `react-redux` + `redux-persist` (`PersistGate`) around the store in `src/store/index.ts`.
- `QueryClientProviderComponent` creates one `QueryClient` (retry: 1, no refetch-on-focus) for TanStack Query.

### Redux store

`src/store/index.ts` combines four slices — `quranLastRead`, `quranBookmark`, `hadithLastRead`, `hadithBookmark` (`src/store/slice/*.ts`) — and persists all four to `localStorage` via `redux-persist` (whitelist covers exactly those four keys). This is purely client-side reading-progress/bookmark state; it is unrelated to the TanStack Query server-state cache. There is no Supplication or Qna slice yet even though those domains have bookmark-like UI (`DuaActions`, `CounterBadge`) — check whether that state is still local-only (`useState`) before assuming Redux coverage.

### Domain types

`src/types/surah.ts` and `src/types/hadith.ts` mirror the backend's response envelopes (`{ message, code, data, meta? }`) and entity shapes (`SurahList`, `AyahListWithTranslation`, `JuzList`, `PageList`, etc. — note `JuzList`/`PageList` carry `ayahNumber: number[]` as a `[start, end]` range plus a nested `surahInfo`, matching the backend's range-based Juz/Page/Ruku/Hizb model rather than a direct ayah FK). Supplication/Qna/Scholars, being still on static JSON, don't have equivalent typed API response interfaces yet.

### Styling

Three approaches coexist: Tailwind CSS v4 (`@import "tailwindcss"` in `src/styles/global.css`, configured only via `postcss.config.mjs` — there is no `tailwind.config.*`), CSS Modules (`*.module.css` next to most components, still the dominant pattern for page/section-level layout), and MUI (`@mui/material`/`@mui/icons-material`, used sparingly in a handful of files like `breadcrumb.tsx`, `ShareTooltip.tsx`, `dailyAyah.tsx`). When touching an existing component, match whatever styling approach it already uses rather than converting it.

Fonts are defined once in `src/app/font/font.js` (`next/font/google`: `Lateef` for Arabic script, `Roboto` and `EB_Garamond` for Latin) and imported by className where needed (see `error.tsx`/`not-found.tsx`).

### Arabic numerals

`src/utils/convertToArabic.ts` converts Western digits to Arabic-Indic numeral glyphs (٠-٩) for displaying ayah/page numbers; the `num-to-arabic` package (spelled-out number words) is a separate dependency used elsewhere — don't conflate the two.

## Gotchas

- `next.config.ts` sets `eslint: { ignoreDuringBuilds: true }` — `pnpm build` succeeds even with lint errors. Run `pnpm lint` explicitly to catch issues.
- Large blocks of commented-out code are common and often meaningful (the "real" API-backed implementation vs. the currently-active static/stub one) — read surrounding comments before deleting them as dead code.
- No test infrastructure exists; don't assume `pnpm test` works or invent test files unless the user asks you to set up a test runner first.
