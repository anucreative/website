---

## Implementation Roadmap

### Phase 1: Monorepo Foundation

- [x] **1.1 Initialize Turborepo with Yarn Workspaces**
  - [x] Create root `package.json` with workspaces configuration
  - [x] Set up `turbo.json` with task pipelines
  - [x] Configure `.gitignore` for monorepo
  - [x] Initialize git repository

- [x] **1.2 Create Monorepo Folder Structure**
  - [x] Create `apps/` directory
  - [x] Create `packages/` directory
  - [x] Create `services/` directory
  - [x] Set up root `.env.example` template

- [x] **1.3 Configure Root Dependencies**
  - [x] Install Turborepo CLI
  - [x] Install TypeScript (root level)
  - [x] Install ESLint, Prettier (root level)
  - [x] Configure shared `tsconfig.json`

### Phase 2: Shared Packages

- [ ] **2.1 Create `packages/shared/` - Shared Constants & Types**
  - [ ] Initialize package with `package.json`
  - [ ] Create `src/routes.ts` - TanStack Router route definitions
  - [ ] Create `src/themes.ts` - Theme type definitions (fish → blue, chips → pink)
  - [ ] Create `src/constants.ts` - API endpoint constants
  - [ ] Export everything from `src/index.ts`

- [ ] **2.2 Create `packages/api-types/` - API Response Types**
  - [ ] Initialize package with `package.json`
  - [ ] Create `src/api.ts` with unified GET response type
    - [ ] Include fields for theme-agnostic data
  - [ ] Create OpenAPI YAML template (to be filled by backends)
  - [ ] Set up `openapi-typescript` generation script (prepare, don't run yet)

- [ ] **2.3 Create `packages/env/` - Environment Management**
  - [ ] Initialize package with `package.json`
  - [ ] Create `src/schema.ts` - TypeScript interface for env vars
  - [ ] Create `src/index.ts` - Validation and export logic
  - [ ] Document required env vars in README

- [ ] **2.4 Create `packages/config/` - Shared Config Files**
  - [ ] Set up shared TypeScript configuration
  - [ ] Set up shared ESLint configuration
  - [ ] Set up shared Prettier configuration

### Phase 3: UI Components & Documentation

- [ ] **3.1 Create `packages/ui/` - Lit Web Components Library**
  - [ ] Initialize package with `package.json`
  - [ ] Set up TypeScript configuration
  - [ ] Create `src/components/` directory structure
  - [ ] Create base theme CSS variables file
  - [ ] Create `src/themes/fish.css` - Blue theme
  - [ ] Create `src/themes/chips.css` - Pink theme
  - [ ] Create example Lit component (e.g., `ThemeButton.ts`)

- [ ] **3.2 Set up Storybook for Lit Components**
  - [ ] Initialize Storybook with Web Components preset
  - [ ] Configure `.storybook/main.ts` for Lit
  - [ ] Configure `.storybook/preview.ts` with theme switching
  - [ ] Create story for theme variations
  - [ ] Integrate MSW into Storybook configuration

- [ ] **3.3 Create `packages/msw/` - Mock Service Worker Setup**
  - [ ] Initialize package with `package.json`
  - [ ] Create `src/handlers.ts` - MSW request handlers for GET endpoint
  - [ ] Create `src/server.ts` - Node.js worker setup
  - [ ] Create `src/browser.ts` - Browser worker setup
  - [ ] Create `src/index.ts` - Export all handlers and workers

### Phase 4: Frontend Apps

- [ ] **4.1 Create `apps/web-react/` - React 19 Application**
  - [ ] Initialize with Vite + React 19
  - [ ] Set up TypeScript configuration
  - [ ] Install TanStack Router for React
  - [ ] Create `src/router.ts` - Import shared routes, configure React-specific routing
  - [ ] Create `src/layouts/RootLayout.tsx` - Root with theme provider
  - [ ] Create `src/layouts/FishTheme.tsx` - Fish theme page
  - [ ] Create `src/layouts/ChipsTheme.tsx` - Chips theme page
  - [ ] Set up theme context/provider using CSS variables
  - [ ] Import and use Lit components in pages
  - [ ] Integrate MSW for development
  - [ ] Set up `.env` configuration pointing to backend

- [ ] **4.2 Create `apps/web-vue/` - Vue 3 Application**
  - [ ] Initialize with Vite + Vue 3
  - [ ] Set up TypeScript configuration
  - [ ] Install TanStack Router for Vue
  - [ ] Create `src/router.ts` - Import shared routes, configure Vue-specific routing
  - [ ] Create `src/layouts/RootLayout.vue` - Root with theme provider
  - [ ] Create `src/layouts/FishTheme.vue` - Fish theme page
  - [ ] Create `src/layouts/ChipsTheme.vue` - Chips theme page
  - [ ] Set up theme composable using CSS variables
  - [ ] Import and use Lit components in pages
  - [ ] Integrate MSW for development
  - [ ] Set up `.env` configuration pointing to backend

### Phase 5: Backend Services

- [ ] **5.1 Create `services/api-node/` - Node.js Backend**
  - [ ] Initialize with Express + TypeScript
  - [ ] Set up Prisma ORM
  - [ ] Create `prisma/schema.prisma` with models for data
  - [ ] Create `src/routes/data.ts` - Single GET endpoint
  - [ ] Set up OpenAPI documentation
  - [ ] Create `.env.example` with database URL
  - [ ] Write migration scripts (Prisma migrations)

- [ ] **5.2 Create `services/api-python/` - FastAPI Backend**
  - [ ] Initialize with FastAPI + SQLAlchemy
  - [ ] Set up database models
  - [ ] Create `app/routers/data.py` - Single GET endpoint
  - [ ] OpenAPI docs auto-generated by FastAPI
  - [ ] Create `.env.example` with database URL
  - [ ] Write migration setup (Alembic)

### Phase 6: API Schema & Type Generation

- [ ] **6.1 Create OpenAPI Schema**
  - [ ] Node.js backend: Generate OpenAPI YAML from Express
  - [ ] FastAPI backend: Extract OpenAPI YAML from auto-docs
  - [ ] Save OpenAPI spec to `packages/api-types/schema.yaml`

- [ ] **6.2 Generate TypeScript Types**
  - [ ] Configure `openapi-typescript` in `packages/api-types/`
  - [ ] Generate types from OpenAPI YAML
  - [ ] Update `packages/api-types/src/index.ts` to export generated types
  - [ ] Both frontend apps import from `@monorepo/api-types`

### Phase 7: Integration & Testing

- [ ] **7.1 Set up Testing Infrastructure**
  - [ ] Install Vitest in root
  - [ ] Configure Vitest to use MSW
  - [ ] Create `vitest.config.ts` for tests

- [ ] **7.2 Add Test Examples**
  - [ ] Write example React component test with MSW
  - [ ] Write example Vue component test with MSW
  - [ ] Write example Lit component test with MSW
  - [ ] Create sample backend API test

- [ ] **7.3 Verify End-to-End Flow**
  - [ ] Start Node.js backend
  - [ ] Start React app (verify theme switching)
  - [ ] Start Vue app (verify theme switching)
  - [ ] Verify MSW intercepts API calls in development
  - [ ] Verify both themes render correctly

### Phase 8: Documentation & DevOps

- [ ] **8.1 Create Documentation**
  - [ ] Root `README.md` - Project overview
  - [ ] `ARCHITECTURE.md` - Detailed architecture decisions
  - [ ] `DEVELOPMENT.md` - How to run locally
  - [ ] `DEPLOYMENT.md` - CI/CD strategies (to be filled later)
  - [ ] Package-level READMEs for each workspace

- [ ] **8.2 Set up Development Scripts**
  - [ ] Root `package.json`: `yarn dev` (start all services in parallel)
  - [ ] Root `package.json`: `yarn build` (build all packages)
  - [ ] Root `package.json`: `yarn test` (run all tests)
  - [ ] Root `package.json`: `yarn lint` (lint all packages)
  - [ ] Root `package.json`: `yarn type-check` (TypeScript check all packages)

- [ ] **8.3 Git & CI Configuration**
  - [ ] Create `.github/workflows/test.yml` (optional, for later)
  - [ ] Create `.github/workflows/build.yml` (optional, for later)
  - [ ] Set up `.gitignore` for node_modules, builds, env files
  - [ ] Create `.editorconfig` for consistent formatting

### Phase 9: Optional Enhancements (Future)

- [ ] Set up E2E testing with Playwright/Cypress
- [ ] Add CI/CD pipelines for multiple deployment strategies
- [ ] Implement database seeding scripts
- [ ] Add performance monitoring
- [ ] Create admin dashboard for data management
- [ ] Implement real-time updates (WebSocket)
- [ ] Add authentication/authorization layer
- [ ] Deploy to staging/production environments

---

## Open Questions

1. **CI/CD & Deployment Strategies**

   - How should React and Vue apps be deployed? (Same CDN? Different?)
   - How should Node.js and FastAPI backends be deployed? (Docker? Serverless? VPS?)
   - Should databases be managed separately or together?
   - Status: **To be determined**

2. **Database Initialization**

   - Should migrations run automatically on startup (dev) or manually (prod)?
   - Current Recommendation: Auto on startup for dev, manual with CI/CD for prod

3. **Feature Flag Management**
   - Should we add feature flags to switch between backends/frontends at runtime?
   - Status: **To be determined**

---

## Progress Tracking

**Current Phase:** Planning Complete ✓
**Next Phase:** Phase 1 - Monorepo Foundation

---

## Useful Commands (To Be Updated)

```bash
# Install dependencies
yarn install

# Development
yarn dev              # Start all services
yarn dev --filter <app-name>  # Start specific app

# Build
yarn build            # Build all packages
yarn build --filter <package-name>  # Build specific package

# Testing
yarn test             # Run all tests
yarn test --watch     # Run tests in watch mode

# Linting
yarn lint             # Lint all files
yarn type-check       # TypeScript check

# Documentation
yarn storybook        # Start Storybook
```

## References

- [Turborepo Docs](https://turbo.build/repo/docs)
- [TanStack Router](https://tanstack.com/router/latest)
- [Lit Web Components](https://lit.dev)
- [Storybook](https://storybook.js.org)
- [MSW Documentation](https://mswjs.io)
- [openapi-typescript](https://openapi-ts.dev)
- [Prisma Documentation](https://www.prisma.io/docs)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Yarn Workspaces](https://classic.yarnpkg.com/en/docs/workspaces/)

## Notes

- All routes will be defined in a single source of truth: `packages/shared/routes.ts`
- Both React and Vue apps can use TanStack Router independently
- MSW will handle API mocking in development and tests
- All frontends consume the same API response type
- Theme is purely a frontend concern (determined by route)
