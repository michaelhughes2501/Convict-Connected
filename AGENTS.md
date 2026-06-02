# Repository Guidelines

## Product Language
- Convict Connected is a supervised reentry-support platform. User-facing copy must be dignified, empowering, community-oriented, and avoid punitive or dehumanizing phrasing.
- Use prison-themed terms only where they are specified as UI nomenclature; keep backend, database, and clinical/admin language neutral.
- Prefer these UI terms: "The Yard" for the community hub, "Send a Kite" for messaging, "My Cell" for profile/settings, "Block" for groups, "Roll Call" for daily check-in, "Commissary" for resources, "Good Time" for positive credits, "PO" for case manager, "Resident" for end users, "Mail Room" for moderation queue, "Warden" for super admin, "Captain" for moderation lead, and "CO" for observer.
- Do not use "inmate" in UI copy; use "Resident". Do not glorify incarceration or use threats, blame, or punitive framing.

## Current App Shape
- This checkout is a Firebase Studio / Next.js app, not the full multi-service roadmap. Do not assume Flask, SvelteKit, Vite, Socket.io, MongoDB, or Kubernetes files exist unless they are added later.
- App routes live under `src/app`. Shared UI components live under `src/components`, with shadcn-style components in `src/components/ui`.
- The global shell is wired in `src/app/layout.tsx` and `src/components/convict-sidebar.tsx`.
- Genkit AI setup is in `src/ai/genkit.ts`; registered local dev flows are imported from `src/ai/dev.ts`.
- Existing AI flows: `match-recommendation`, `virtual-visit-eligibility`, and `sentence-calculator` under `src/ai/flows`.

## Commands
- Install dependencies with `npm install`.
- Run the app locally with `npm run dev`; it starts Next.js with Turbopack on port `9002`.
- Run Genkit locally with `npm run genkit:dev`, or `npm run genkit:watch` while editing flows.
- Build with `npm run build`. Note that `next.config.ts` currently ignores TypeScript and ESLint build errors, so also run `npm run typecheck` for TypeScript validation.
- `npm run lint` is configured as `next lint`; verify it still works with the installed Next.js version before relying on it in automation.

## Implementation Notes
- Use TypeScript, React Server Components where appropriate, and the existing `@/*` path aliases.
- Use existing shadcn/Radix UI primitives and `lucide-react` icons before adding new component libraries.
- Tailwind design tokens are CSS-variable based in `src/app/globals.css`; keep styling aligned with the existing token system unless intentionally revising the theme.
- Remote Next images are currently allowed from `placehold.co`, `images.unsplash.com`, and `picsum.photos` in `next.config.ts`.

## AI And Safety
- Genkit uses `@genkit-ai/google-genai` with the default model configured as `googleai/gemini-2.5-flash`.
- Keep AI outputs framed as support, eligibility, education, or moderation assistance. Do not present AI-generated sentencing or eligibility outputs as legal, clinical, or final supervisory decisions.
- The sentence calculator must keep a clear legal-disclaimer posture.
