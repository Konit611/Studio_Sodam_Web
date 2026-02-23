# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered personalized recipe web service frontend. Users input ingredients, and an AI backend generates custom recipes. The project is in early stage — see `docs/PRD-Frontend.md` for full product requirements.

**Stack**: Next.js 15 (App Router), TypeScript, Tailwind CSS, TanStack Query, React Server Components

## Expected Build Commands

```bash
npm run dev        # Development server
npm run build      # Production build
npm run lint       # ESLint
npm run start      # Production server
```

## Architecture

### Routing (App Router)

```
/                  → Home — ingredient input + AI recipe generation
/recipes           → Recipe list (paginated with offset/limit)
/recipes/[id]      → Recipe detail (view/delete)
/settings          → User profile (allergies, cooking skill)
```

### Backend API

All calls go to `{NEXT_PUBLIC_API_URL}/api/v1`. Key endpoints:

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/recipes/generate` | AI recipe generation |
| GET | `/recipes/?offset=&limit=` | Recipe list |
| GET/DELETE | `/recipes/{id}` | Recipe detail/delete |
| GET/PATCH | `/users/{id}` | User profile |

### State Management

- **Server Components first**: Use RSC for list/detail pages; Client Components only for interactive parts
- **TanStack Query**: Client-side caching, mutations, optimistic updates (e.g., delete immediately reflects in UI with rollback on failure)

### Design System

- **Colors**: Warm orange primary (CTA), cream background, white surface cards, dark gray text, red for danger/errors
- **Mobile-first**: 375px baseline → responsive breakpoints at sm:640px, md:768px, lg:1024px
- **Typography**: `text-xl font-bold` titles, `text-base` body, `text-sm text-secondary` captions

### Shared Components

- `TagInput` — reused for ingredient input (home, max 30 items/50 chars) and allergy input (settings, max 20 items/30 chars)
- `DifficultyBadge` — maps `easy`→쉬움, `medium`→보통, `hard`→어려움
- `RecipeCard`, `ConfirmDialog`, `Toast`, `EmptyState`, `LoadingSpinner`

## Coding Rules (docs/CODING_RULES.md)

**High cohesion, low coupling** is the core principle:

- **Functional cohesion**: Each function does exactly one thing. Lifecycle/init functions should only call other well-defined functions, not contain implementation details.
- **Avoid logical cohesion**: Do not create flag-driven utility functions. Instead, create separate functions per use case (e.g., `sendText` and `sendStamp`, not `sendMessage(type)`). Extract shared logic into focused helper functions.
- **Minimize coupling**: Prefer data/message coupling (pass scalar values or call without args). Avoid control coupling (flags), common coupling (globals), and content coupling.
- **Separation of concerns**: Keep UI rendering, data fetching, and business logic in separate layers.

## Environment

- `NEXT_PUBLIC_API_URL` — Backend API base URL (only public env var)

## Language

The product UI is in Korean. PRD is in Korean, coding rules are in Japanese. Code (variable names, comments, commit messages) should be in English.
