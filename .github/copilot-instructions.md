# Copilot Instructions for anucreative Monorepo

## Architecture Overview

This is a **Turborepo monorepo** using Yarn Workspaces with:

- **`apps/react`** – TanStack Start SSR React app for CV portfolio
- **`packages/config`** – API endpoints, app configuration (CACHE, etc.)
- **`packages/ui`** – Design system: Lit web components + design tokens
- **`packages/tokens`** – Design tokens (JSON) and build artifacts
- **`packages/msw`** – Mock Service Worker handlers for testing
- **`packages/data-types`** – Shared TypeScript types and data (cv.json resume)
- **`services/`** – Future backend services (FastAPI planned)

**Key principle:** Single source of truth for brands, API config, tokens, and types. Apps consume via `@website/*` path aliases.

- **Configuration:** `@website/config` (API_ENDPOINTS, CACHE, APP constants)
- **Design system:** `@website/ui` (Lit components + tokens + BRANDS)
- **Data:** `@website/data-types` (CV resume, types)

## Development Workflow

### Essential Commands

```bash
# Install dependencies and prepare workspaces
yarn install

# Development: Run all apps in parallel
yarn dev

# Build all packages/apps
yarn build

# Type check all workspaces
yarn type-check

# Lint all files
yarn lint

# Format code (Prettier)
yarn format

# Run tests with watch
yarn test:watch

# Run tests once
yarn test

# Clean all outputs (dist, build, node_modules)
yarn clean

# Watch Storybook for UI components
yarn storybook
```

**Testing approach:**

- Tests use **Vitest** as the test runner
- **MSW (Mock Service Worker)** intercepts HTTP requests for realistic mocking
- Test setup in [apps/react/src/test/setup.ts](apps/react/src/test/setup.ts) configures MSW handlers pre-execution
- Use `@testing-library/react` and `@testing-library/jest-dom` for component testing

**Development pattern:** Turborepo's `turbo.json` pipeline manages dependencies. Build tasks depend on `^build` (dependencies first). Dev tasks run in parallel. CV page at `/cv/:company` dynamically applies theme CSS based on company parameter.

## Project Structure & Conventions

### Config Package (`packages/config/`)

Exports configuration via structured exports:

1. **`./api`** – API endpoints and request configuration
   - `API_ENDPOINTS` – Base URLs (supports `VITE_API_URL`, `VITE_NODE_API_URL`, `VITE_PYTHON_API_URL`)
   - `getApiUrl()` – Helper to resolve API URL based on environment
   - `REQUEST_TIMEOUT` – Request timeout constant

2. **`./app`** – Application-level constants
   - `APP` – Version, name, environment
   - `CACHE` – TTL constants for MSW/client caching

3. **`./`** (index) – Re-exports all from api and app

**Import pattern:** Apps should use `import { API_ENDPOINTS } from '@website/config'` and `import { BRANDS, Brand } from '@website/ui/constants'` (path aliases defined in root `tsconfig.json`).

### Routing Architecture

Routes are **file-based** using TanStack Router:

- [apps/react/src/routes/\_\_root.tsx](apps/react/src/routes/__root.tsx) – Root layout, theme CSS injection, head configuration
- [apps/react/src/routes/index.tsx](apps/react/src/routes/index.tsx) – Home page
- [apps/react/src/routes/cv/$company.tsx](apps/react/src/routes/cv/$company.tsx) – Dynamic CV page with `$company` param

**Key insight:** The `$company` parameter drives theme selection. [apps/react/src/utils/theme-selector.ts](apps/react/src/utils/theme-selector.ts) maps company name to Brand enum, then [\_\_root.tsx](apps/react/src/routes/__root.tsx) injects corresponding CSS (default.css, alan.css, bsport.css).

### Token System (Design Tokens)

Themes use **Style Dictionary** to generate CSS from JSON. Token definitions and build config live in `packages/ui/`:

1. **Token definitions** – Colors, typography, spacing in [packages/ui/src/tokens/\*.json](packages/ui/src/tokens/)
   - `default.json` – Default theme
   - `alan.json` – ALAN brand theme
   - `bsport.json` – BSPORT brand theme
2. **Build process** – [packages/ui/scripts/build.ts](packages/ui/scripts/build.ts) runs Style Dictionary for each brand, generating CSS files in `dist/`
3. **Build output** – CSS files are copied to `packages/tokens/dist/` for build artifacts
4. **Usage in root layout** – [\_\_root.tsx](apps/react/src/routes/__root.tsx) imports generated CSS and injects dynamically based on route param:
   ```tsx
   import defaultCSS from '@website/tokens/dist/default.css?raw'
   import alanCSS from '@website/tokens/dist/alan.css?raw'
   ```

### API Integration

Currently uses **Mock Service Worker (MSW)** for development:

- [packages/msw/src/handlers.ts](packages/msw/src/handlers.ts) – HTTP handler definitions (GET `/api/resume`)
- [apps/react/src/api/resume.ts](apps/react/src/api/resume.ts) – Client fetch function
- [apps/react/src/test/setup.ts](apps/react/src/test/setup.ts) – MSW server setup with `beforeAll`, `afterEach` hooks

Real CV data lives in [packages/data-types/cv.json](packages/data-types/cv.json), imported and served by MSW handlers.

## Project Phases & Status

**Phase 1: Monorepo Foundation** ✓ Complete

- Turborepo + Yarn Workspaces set up
- Shared package initialized with constants

**Phase 2: TanStack Start CV Page** ✓ Complete

- Created `apps/react/` with TanStack Start
- Integrated MSW for mocked CV data
- Implemented `/cv` and `/cv/:company` dynamic routes

**Phase 3: Deployment Pipeline** ✓ Complete

- Configured Render deployment
- Auto-deployment via GitHub

**Phase 4: Component Library** ✓ Complete

- Created `packages/ui/` with Lit web components + design tokens

**Phase 6-11:** See README.md for future phases

## Common Tasks for AI Agents

### Adding a New Brand Theme

1. Create [packages/ui/src/tokens/new-brand.json](packages/ui/src/tokens/) with token structure (copy from default.json)
2. Update [packages/ui/src/constants.ts](packages/ui/src/constants.ts) – add brand to `BRANDS` array
3. Run `yarn build` in components package to generate `dist/new-brand.css`
4. Update [\_\_root.tsx](apps/react/src/routes/__root.tsx) to import and conditionally inject new theme CSS
5. Test via route `/cv/new-brand` to confirm theme applies

### Adding a New Token Type

1. Add property to all theme JSON files in [packages/ui/src/tokens/](packages/ui/src/tokens/)
2. Run `yarn build` in components package to regenerate CSS
3. Use in components via CSS custom properties: `color: var(--new-token-name)`

### Adding New API Endpoint

1. Add handler to [packages/msw/src/handlers.ts](packages/msw/src/handlers.ts)
2. Create client function in [apps/react/src/api/](apps/react/src/api/) (e.g., resume.ts pattern)
3. Update [packages/config/src/api.ts](packages/config/src/api.ts) with endpoint constant if needed
4. Call from React component or route loader

### Adding a New Environment Variable

1. Reference as `process.env.VITE_VAR_NAME` (Vite prefix) or `process.env.VAR_NAME`
2. Update [packages/shared/src/constants.ts](packages/shared/src/constants.ts) to use it
3. Add to root `turbo.json` `globalEnv` if it should invalidate cache
4. Document in `.env.example` (create if needed)

### Debugging Build Issues

- Check [turbo.json](turbo.json) pipeline for task dependencies
- Run `yarn clean` to clear Turbo cache and rebuild
- Use `yarn build --filter @website/package-name` to build specific package
- Check root [tsconfig.json](tsconfig.json) for correct path aliases (`@website/*`)
- Verify workspace name in package.json matches imports
- Check `globalDependencies` in turbo.json for cache invalidation triggers

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
