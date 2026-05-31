# CLAUDE.md

Guidance for Claude Code (and humans) when working in this repository.

## Project overview

**ConvictConnect** is a Next.js + Genkit AI application for incarcerated and formerly-incarcerated people. It combines profile/match discovery, kite (letter-style) messaging, an AI-powered virtual-visit eligibility ("warden") flow, a sentence calculator, a community forum, and release-planning resources. Deployed to Firebase App Hosting.

The product blueprint (vision, features, style guide) lives in [`docs/blueprint.md`](./docs/blueprint.md).

## Tech stack

- **Framework**: Next.js 15 (App Router, Turbopack), React 18, TypeScript 5
- **Styling**: Tailwind CSS 3 + shadcn/ui (Radix primitives), `lucide-react` icons, `tailwindcss-animate`
- **Forms / validation**: `react-hook-form` + `zod` (`@hookform/resolvers/zod`)
- **AI**: Genkit 1.x with `@genkit-ai/google-genai` — model `googleai/gemini-2.5-flash`
- **Hosting**: Firebase App Hosting (`apphosting.yaml`)
- **Charts / extras**: Recharts, Embla Carousel
- **Patches**: `patch-package` (run via postinstall if patches exist)

## Commands

```bash
npm install
npm run dev               # Next.js dev server (Turbopack) on http://localhost:9002
npm run genkit:dev        # Start Genkit dev environment for AI flows
npm run genkit:watch      # Genkit dev in watch mode
npm run build             # Production build (NODE_ENV=production)
npm run start             # Start production server
npm run lint              # ESLint
npm run typecheck         # tsc --noEmit
```

Dev port is **9002** (not the default 3000) — see `package.json`.

## Environment

Required for full AI functionality:

- `GEMINI_API_KEY` — Google Generative AI key consumed by `src/ai/genkit.ts`.

Without the key, the dashboard falls back to mock recommendation data in `src/lib/mock-data.ts`. Never commit real keys.

## Repo layout

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (sidebar provider, global styles)
│   ├── page.tsx                  # Dashboard ("The Yard")
│   ├── globals.css               # Tailwind + CSS variable tokens
│   ├── profile/  search/  kites/ visits/  calculator/  forum/  release/
│
├── ai/
│   ├── genkit.ts                 # Genkit client (Gemini 2.5 Flash)
│   ├── dev.ts                    # Dev entry for `genkit:dev`
│   └── flows/                    # Server-only AI flows (`'use server'`)
│       ├── match-recommendation.ts
│       ├── sentence-calculator.ts
│       └── virtual-visit-eligibility.ts
│
├── components/
│   ├── convict-sidebar.tsx       # Client-rendered navigation
│   └── ui/                       # shadcn/ui primitives (button, card, dialog, …)
│
├── hooks/                        # use-mobile, use-toast
└── lib/                          # mock-data, placeholder-images, utils (cn, etc.)

docs/blueprint.md                 # Product blueprint + design tokens
apphosting.yaml                   # Firebase App Hosting config (maxInstances: 1)
components.json                   # shadcn/ui config (baseColor: neutral, RSC enabled)
next.config.ts                    # Turbopack; remote image patterns: placehold.co, unsplash, picsum
tailwind.config.ts                # Class-based dark mode, custom HSL tokens, accordion keyframes
tsconfig.json                     # Strict mode, paths: `@/*` → `src/*`
```

## Conventions

- **Path alias**: import from `@/...` (maps to `src/`).
- **Genkit flows are server-only** — keep the `'use server'` directive at the top of files in `src/ai/flows/`. Never import them into a client component.
- **UI primitives**: add new shadcn components with `npx shadcn add <component>` so `components.json` stays in sync.
- **Styling**: use the HSL CSS variables defined in `globals.css` (primary violet, secondary rose, etc.). Don't hardcode colors.
- **Forms**: validate with Zod schemas + `react-hook-form` resolvers; never trust raw form data.
- **Build flags**: `next.config.ts` currently ignores TypeScript and ESLint errors during build. Don't rely on the build to catch type errors — run `npm run typecheck` and `npm run lint` locally and in CI.
- **Client vs server**: only mark components with `"use client"` when you need hooks/handlers; default to server components.

## AI flows

| Flow                              | Purpose                                                                          |
|-----------------------------------|----------------------------------------------------------------------------------|
| `match-recommendation.ts`         | Score and rank potential matches given a user profile + a list of candidates.    |
| `sentence-calculator.ts`          | Compute estimated release dates from sentencing inputs.                          |
| `virtual-visit-eligibility.ts`    | "AI warden" — judges trust/readiness for a virtual visit based on interactions.  |

All flows return structured objects (matchScore + reason, eligibility verdicts, etc.) suitable for direct rendering.

## Deployment

Firebase App Hosting is configured via `apphosting.yaml` (max instances: 1 — bump for production traffic). See https://firebase.google.com/docs/app-hosting/configure for tuning options.
