# Copilot Instructions for anucreative Monorepo

## Architecture Overview

This is a **Turborepo monorepo** using Yarn Workspaces with three main spaces:

- **`apps/`** – Frontend applications (currently TanStack Start React app)
- **`packages/shared/`** – Shared exports: routes and constants
- **`packages/tokens/`** – Design tokens (JSON) and generated theme CSS via Style Dictionary
- **`packages/ui/`** – Lit web components library
- **`services/`** – Backend services (optional FastAPI in future phases)

**Key principle:** Single source of truth for routes (`packages/shared/routes.ts`), constants, and design tokens (`packages/tokens/tokens/*.json`). All apps consume these to avoid duplication.

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

# Run tests - Root level (pass through to Turborepo)
yarn test -- --run

# Run tests - Individual app/package level (direct Vitest)
yarn test --run
# Clean all outputs (dist, build, node_modules)
yarn clean
```

**Testing approach:**

- Tests use **Vitest** as the test runner
- **MSW (Mock Service Worker)** intercepts HTTP requests for realistic mocking
- **Real data** from `packages/data-types/cv.json` is used in tests
- Tests are set up in `src/test/setup.ts` with MSW handlers pre-configured
- Use `@testing-library/react` and `@testing-library/jest-dom` for component testing

**Development pattern:** Turborepo uses the `turbo.json` pipeline to manage task dependencies. Build tasks (`^build`) depend on dependencies being built first. Development (`dev`) tasks have no dependencies and run in parallel.

## Project Structure & Conventions

### Shared Package (`packages/shared/`)

The shared package exports two main modules (via `exports` in `package.json`):

1. **`./routes`** – Route definitions using `const ROUTES = { HOME, CV, CV_ALAN, ... }`
   - Export helper: `getAllRoutes()` returns non-wildcard routes
   - Both TanStack Start and Vue router consume this directly
2. **`./constants`** – API endpoints and app configuration
   - `API_ENDPOINTS` – Base URLs (supports `VITE_API_URL`, `VITE_NODE_API_URL`, `VITE_PYTHON_API_URL`)
   - `APP` – Version, name, environment
   - `CACHE` – TTL constants for MSW/client caching
3. **`./index`** – Re-exports routes and constants

**Import pattern:** Apps should use `import { ROUTES } from '@website/shared'` (path alias defined in root `tsconfig.json`).

### TypeScript Configuration

- **Target:** ES2020 with bundler module resolution
- **Strict mode:** Enabled globally
- **Path alias:** `@website/*` → `packages/*` (configured in root `tsconfig.json`)
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

### Theme System (Design Tokens)

Themes are now centralized in `packages/tokens/` using Style Dictionary:

1. **Token definitions** – Colors, typography, spacing defined in `packages/tokens/tokens/*.json`
   - `default.json` – Default theme tokens
   - `alan.json` – ALAN theme tokens
2. **CSS generation** – Style Dictionary builds JSON tokens into CSS custom properties
   - `yarn build` in tokens package generates `dist/default.css` and `dist/alan.css`
3. **Usage in apps** – Import generated CSS directly:
   ```typescript
   import defaultCSS from '@website/tokens/dist/default.css?raw'
   import alanCSS from '@website/tokens/dist/alan.css?raw'
   ```
4. **Route-based theming** – Routes like `/cv` use default theme; `/cv/alan` uses alan theme

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
2. Set name as `@website/package-name`
3. Configure scripts for `build`, `type-check`, `clean`
4. Declare dependencies on `@website/shared` if needed
5. Update root `turbo.json` if adding new task types

**Build dependency example:** If `apps/react` depends on `packages/shared`, the build order is automatic via `turbo.json` pipeline: `"build": { "dependsOn": ["^build"] }`.

## Project Phases & Status

**Phase 1: Monorepo Foundation** ✓ Complete

- Turborepo + Yarn Workspaces set up
- Shared package initialized with routes, themes, constants

**Phase 2: TanStack Start CV Page** ✓ Complete

- Created `apps/react/` with TanStack Start
- Integrated MSW for mocked CV data
- Implemented `/cv` and `/cv/alan` routes

**Phase 3: Deployment Pipeline** ✓ Complete

- Set up Render deployment
- Configured auto-deployment via GitHub

**Phase 4: Component Library** ✓ Complete

- Created `packages/ui/` with Lit web components
- Set up Storybook for component testing
- Integrated components into React app

**Phase 5: Style Dictionary** 🚀 In Progress

- Created `packages/tokens/` with design tokens
- Set up Style Dictionary to generate CSS from JSON
- Removed theme definitions from `packages/shared`

**Phase 6-11:** See README.md for future phases

## Common Tasks for AI Agents

### Creating a New Route

1. Add to `ROUTES` in `packages/shared/src/routes.ts`
2. Create corresponding page component in app (e.g., `apps/react/src/routes/new-page.tsx`)
3. Both frameworks automatically pick up route via shared constants

### Adding a New Theme

1. Create `packages/tokens/tokens/theme-name.json` with token definitions (copy structure from `default.json`)
2. Update `packages/tokens/config.json` to include the new theme in the Style Dictionary config
3. Run `yarn build` in tokens package to generate `dist/theme-name.css`
4. Import in apps: `import themeCss from '@website/tokens/dist/theme-name.css?raw'`

### Adding a New Token Type

1. Add to all theme JSON files in `packages/tokens/tokens/`
2. Run `yarn build` to regenerate CSS with new tokens
3. Use CSS custom properties in components: `color: var(--color-new-token)`

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
