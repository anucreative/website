# Copilot Instructions for anucreative Monorepo

## Architecture Overview

This is a **Turborepo monorepo** using Yarn Workspaces with three main spaces:

- **`apps/`** – Frontend applications (currently empty, will include TanStack Start React app and Vue 3 app)
- **`packages/shared/`** – Shared exports: routes, themes, constants, types
- **`services/`** – Backend services (optional FastAPI in future phases)

**Key principle:** Single source of truth for routes (`packages/shared/routes.ts`), themes, and constants. All apps consume these to avoid duplication.

## Development Workflow

### Essential Commands

```bash
# Install dependencies and prepare workspaces
yarn install

# Development: Run all apps in parallel
yarn dev

# Run specific app (filter by package name)
yarn dev:filter @tanstack/start

# Build all packages/apps (respects dependency graph)
yarn build

# Type check all workspaces
yarn type-check

# Lint all files
yarn lint

# Format code (Prettier)
yarn format

# Run tests
yarn test

# Clean all outputs (dist, build, node_modules)
yarn clean
```

**Development pattern:** Turborepo uses the `turbo.json` pipeline to manage task dependencies. Build tasks (`^build`) depend on dependencies being built first. Development (`dev`) tasks have no dependencies and run in parallel.

## Project Structure & Conventions

### Shared Package (`packages/shared/`)

The shared package exports four main modules (via `exports` in `package.json`):

1. **`./routes`** – Route definitions using `const ROUTES = { HOME, CV, CV_ALAN, ... }`
   - Export helper: `getAllRoutes()` returns non-wildcard routes
   - Both TanStack Start and Vue router consume this directly
2. **`./constants`** – API endpoints and app configuration
   - `API_ENDPOINTS` – Base URLs (supports `VITE_API_URL`, `VITE_NODE_API_URL`, `VITE_PYTHON_API_URL`)
   - `APP` – Version, name, environment
   - `CACHE` – TTL constants for MSW/client caching
3. **`./themes`** – Theme configuration
   - `ThemeType` type: `'default' | 'alan'`
   - `THEME_CONFIGS` object with color schemes
   - Helper: `getThemeConfig(theme)` returns theme by name
4. **`./index`** – Re-exports all three modules

**Import pattern:** Apps should use `import { ROUTES, getThemeConfig } from '@monorepo/shared'` (path alias defined in root `tsconfig.json`).

### TypeScript Configuration

- **Target:** ES2020 with bundler module resolution
- **Strict mode:** Enabled globally
- **Path alias:** `@monorepo/*` → `packages/*` (configured in root `tsconfig.json`)
- **No emit from shared:** Uses `tsc` with `--noEmit` for type-checking

### Code Style (Prettier & ESLint)

**Prettier settings:**

- Print width: 100 characters
- Single quotes, no semicolons
- Trailing commas: ES5 style
- Arrow parens: avoid (`x => x` not `(x) => x`)

**ESLint:**

- Warns on unused variables (except parameters starting with `_`)
- Warns on console (except `warn`, `error`)
- ES2021 features enabled

## Key Implementation Patterns

### Route Management

All routes must be defined in `packages/shared/routes.ts`. When adding a new route:

```typescript
export const ROUTES = {
  HOME: '/',
  CV: '/cv',
  CV_ALAN: '/cv/alan',
  NEW_ROUTE: '/new',
  NOT_FOUND: '*',
} as const
```

This ensures both React (TanStack Start) and Vue routers stay in sync.

### Theme System

Themes use CSS variables set at the root level. When implementing theme switching:

1. Define colors in `THEME_CONFIGS` in `packages/shared/src/themes.ts`
2. Apply theme via CSS variables (Phase 4 will use Lit components for this)
3. Routes like `/cv` use default theme; `/cv/alan` uses alan theme

### API Integration

Currently uses **Mock Service Worker (MSW)** for development. In future phases:

- Phase 2: MSW with hardcoded JSON data
- Phase 6: Real Prisma + TanStack Start API routes
- Phase 9: Optional FastAPI backend

API endpoints are defined in `packages/shared/constants.ts`:

- `VITE_API_URL` (default: `http://localhost:3001`)
- `VITE_NODE_API_URL` (TanStack Start backend)
- `VITE_PYTHON_API_URL` (FastAPI backend)

### Workspaces & Dependencies

When creating a new app/package:

1. Add `package.json` with `"private": true` for internal packages
2. Set name as `@monorepo/package-name`
3. Configure scripts for `build`, `type-check`, `clean`
4. Declare dependencies on `@monorepo/shared` if needed
5. Update root `turbo.json` if adding new task types

**Build dependency example:** If `apps/react` depends on `packages/shared`, the build order is automatic via `turbo.json` pipeline: `"build": { "dependsOn": ["^build"] }`.

## Project Phases & Status

**Phase 1: Monorepo Foundation** ✓ Complete

- Turborepo + Yarn Workspaces set up
- Shared package initialized with routes, themes, constants

**Phase 2: TanStack Start CV Page** 🚀 In Progress

- Create `apps/react/` with TanStack Start
- Integrate MSW for mocked CV data
- Implement `/cv` and `/cv/alan` routes

**Phase 3-9:** See README.md for future phases

## Common Tasks for AI Agents

### Creating a New Route

1. Add to `ROUTES` in `packages/shared/src/routes.ts`
2. Create corresponding page component in app (e.g., `apps/react/src/routes/new-page.tsx`)
3. Both frameworks automatically pick up route via shared constants

### Adding a New Environment Variable

1. Add to `constants.ts` in `packages/shared`
2. Reference as `process.env.VITE_VAR_NAME` or `process.env.VAR_NAME`
3. Document in `.env.example` (create if needed)
4. Update `turbo.json` `globalEnv` if it should invalidate cache

### Debugging Build Issues

- Check `turbo.json` pipeline for task dependencies
- Run `yarn clean` to clear caches and rebuild
- Use `yarn build --filter @package-name` to build specific package
- Check root `tsconfig.json` for path aliases
- Verify workspace name in `package.json` matches imports

## Environment & Tooling

- **Node:** ≥24.0.0 (specified in root `package.json`)
- **Yarn:** 4.9.4 (pinned, using Yarn 4)
- **Monorepo manager:** Turborepo 2.6.1+
- **TypeScript:** 5.9.3
- **Linting:** ESLint 9.39.1 + typescript-eslint 8.48.0
- **Testing:** Vitest 4.0.14 (installed but not yet configured in apps)
- **Formatting:** Prettier 3.7.3

Run `yarn install-deps` before starting development.

## Git & Deployment

- **Repository:** Configured with `.gitignore` for monorepo (excludes `node_modules`, `dist`, `.turbo`, `*.db`)
- **Deployment:** Netlify (Phase 3) – build command: `yarn build`, publish: `apps/react/.output/public`
- **Cache:** Turborepo caching enabled for `build`, `test`, `lint`, `type-check` tasks
