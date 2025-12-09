# anucreative website

A monorepo for building CV websites with multiple frontend frameworks (React/TanStack Start, Vue 3) sharing common UI components and data sources. Built with Turborepo, Yarn Workspaces, and designed for iterative delivery.

## Development Strategy

This project follows a "release early, release often" philosophy:

- Each phase builds on the previous and delivers a working product
- Core infrastructure is established first (monorepo, shared packages)
- Frontend released with hardcoded data (Phase 2)
- Deployment pipeline live after Phase 3
- Backend and database added incrementally
- Additional themes and frontend variants added progressively

---

## Implementation Roadmap

### Phase 1: Monorepo Foundation ✓

- [x] **1.1 Initialize Turborepo with Yarn Workspaces**
  - [x] Create root `package.json` with workspaces configuration
  - [x] Set up `turbo.json` with task pipelines
  - [x] Configure `.gitignore` for monorepo
  - [x] Initialize git repository

- [x] **1.2 Create Monorepo Folder Structure**
  - [x] Create `apps/` directory
  - [x] Create `packages/` directory
  - [x] Create `services/` directory

- [x] **1.3 Configure Root Dependencies**
  - [x] Install Turborepo CLI
  - [x] Install TypeScript, ESLint, Prettier (root level)
  - [x] Configure shared `tsconfig.json`

### Phase 2: TanStack Start CV Page (First Release 🚀)

Build a working CV page at `/cv` with hardcoded data. Data types and structure defined upfront for future API integration.

- [x] **2.1 Create Shared Packages**
  - [x] `packages/shared/` - Routes, themes, constants (already started)
  - [x] `packages/data-types/` - TypeScript interfaces for CV data (shape matches future API)
  - [x] Create `src/data-types.ts` with CV data interface
  - [x] Create sample JSON for development

- [x] **2.2 Create `packages/msw/` - Mock Service Worker**
  - [x] Initialize with `package.json`
  - [x] Create `src/handlers.ts` - MSW handlers using JSON data
  - [x] Create `src/server.ts` - Node.js worker setup
  - [x] Create `src/browser.ts` - Browser worker setup
  - [x] Create `src/index.ts` - Export all handlers

- [x] **2.3 Create TanStack Start App**
  - [x] Initialize `apps/react/` with TanStack Start
  - [x] Set up TypeScript configuration
  - [x] Create root layout (`/src/routes/__root.tsx`)
  - [x] Create `/src/routes/cv.tsx` page
  - [x] Fetch data from MSW (mocked JSON)
  - [x] Implement basic styling with CSS variables
  - [x] Set up `.env.example`

- [x] **2.4 Test & Verify Locally**
  - [x] Start dev server and verify `/cv` loads
  - [x] Verify data displays correctly
  - [x] Verify TypeScript types work

### Phase 3: Deployment Pipeline (Live 🌐)

Get the app live on Render with automatic deployments.

- [x] **3.1 Set up Render**
  - [x] Create Render account
  - [x] Create Web Service
  - [x] Configure build command: `yarn && yarn build`
  - [x] Configure start command: `yarn start`

- [x] **3.2 Configure Deployment**
  - [x] Set up `render.yaml` in root for infrastructure as code
  - [x] Configure environment variables (NODE_ENV, VITE_API_URL, etc.)
  - [x] Scripts configured in package.json

- [ ] **3.3 Go Live**
  - [x] Push to GitHub (main branch)
  - [x] Deploy to Render
  - [x] Verify site is live at Render domain
  - [x] Set up custom domain if needed

### First Release Checklist (Phase 3)

- [x] Phase 2 complete - /cv page loads with data
- [x] Build system working (`yarn build` successful)
- [x] Tests passing (16/16 tests ✅)
- [x] Render Web Service ready (render.yaml + scripts configured)
- [x] GitHub repo connected for auto-deployment
- [x] Deployment tested on Render
- [x] /cv and /cv/alan (once Phase 5 done) live and working

### Phase 4: Component Library (Reusable UI 🎨)

Extract components to a shared Lit web components library with theming support via CSS variables.

- [x] **4.1 Create `packages/ui/` - Lit Components**
  - [x] Initialize package with `package.json`
  - [x] Set up TypeScript configuration
  - [x] Create `src/components/` directory (CVHeader, CVSection, CVSectionTitle, CVSubsection)
  - [x] Create `src/themes/` directory for theme configuration
  - [x] Create theme system with `applyTheme()` and `getThemeVariables()`

- [x] **4.2 Set up Storybook for Component Testing**
  - [x] Install Storybook 10.1.4 with web-components-vite framework
  - [x] Configure `.storybook/main.ts` and `.storybook/preview.ts`
  - [x] Create story files for CVHeader, CVCard, CVSection
  - [x] Add stories for both default and alan themes
  - [x] Enable accessibility and docs addons

- [x] **4.3 Integrate into TanStack Start** ✓
  - [x] Import Lit components in TanStack Start
  - [x] Replace hardcoded HTML with components
  - [x] Verify theme CSS variables work
  - [x] Test locally and build successfully

### Phase 5: Style Dictionary (Design Token Management 🎨) ✓ Complete

Set up Style Dictionary to generate CSS from centralized theme JSON files.

- [x] **5.1 Create `packages/tokens/` - Design Tokens**
  - [x] Initialize package with `package.json`
  - [x] Create theme JSON files (`default.json`, `alan.json`)
  - [x] Define design tokens (colors, typography, spacing, layout)
  - [x] Set up Style Dictionary configuration (`config.json`)
  - [x] Generate CSS files in `dist/default.css` and `dist/alan.css`

- [x] **5.2 Generate Theme CSS**
  - [x] Verified CSS files are generated from token definitions
  - [x] Updated `packages/ui` to import generated CSS files
  - [x] Replaced hardcoded theme variables with generated CSS
  - [x] Verified all themes compile and apply correctly

- [x] **5.3 Integrate Generated Themes into UI Package**
  - [x] Updated `packages/ui` imports to use `packages/tokens` CSS
  - [x] Removed duplicate theme definitions from `src/themes/`
  - [x] Removed theme generation functions from `packages/shared`
  - [x] Verified all components render with generated token values

### Phase 6: ALAN Theme (Multiple Themes 🎭) ✓ Complete

Add ALAN theme variant at `/cv/alan` using CSS variables from generated themes.

- [x] **6.1 Verify ALAN Theme**
  - [x] Confirmed `alan.json` tokens in `packages/tokens`
  - [x] Verified ALAN CSS generated via Style Dictionary
  - [x] All ALAN theme tokens defined and working
  - [x] Theme switching works via route-based CSS injection

### Phase 7: Server-Side Rendering (SSR & Loading States 🚀)

Implement SSR with TanStack Start and add loading/error states for better UX.

- [x] **7.1 TanStack Start SSR Setup** ✓
  - [x] TanStack Start configured for SSR (tanstackStart plugin in vite.config.ts)
  - [x] Server-side rendering working in production build (dist/server/server.js generated)
  - [x] CSS (themes) properly injected on server (style tags in \_\_root.tsx)
  - [x] No hydration mismatches (theme styles keyed by route)

- [ ] **7.4 Performance Optimization**
  - [ ] Add caching headers for static assets
  - [ ] Implement streaming responses for large data
  - [ ] Optimize bundle size and lazy loading
  - [ ] Measure and improve Core Web Vitals

### Phase 8: Backend - Database & API (Type-Safe API 🔌)

Replace MSW with real backend using Prisma + TanStack Start server routes. Generate TypeScript types from Prisma.

- [ ] **8.1 Set up Prisma**
  - [ ] Initialize Prisma in TanStack Start app
  - [ ] Create `prisma/schema.prisma` with CV data model
  - [ ] Set up SQLite for local dev (Postgres in production)

- [ ] **8.2 Create Server Routes**
  - [ ] Create `/src/routes/api/cv.ts` - Server route returning CV data
  - [ ] Integrate Prisma client
  - [ ] Update TanStack Start to fetch from real API

- [ ] **8.3 Generate API Types**
  - [ ] Set up `@prisma/client` type generation
  - [ ] Create type guards and validators
  - [ ] Use generated types in frontend

- [ ] **8.4 Database Setup**
  - [ ] Create database migrations
  - [ ] Seed database with sample data
  - [ ] Document database schema

### Phase 9: More Themes (Extensibility 🌈)

Add additional themes to demonstrate the theming system works well.

- [ ] **9.1 Create Additional Themes**
  - [ ] Define 2-3 new theme JSON files in `packages/tokens`
  - [ ] Generate CSS via Style Dictionary
  - [ ] Create corresponding routes (`/cv/theme-name`)

- [ ] **9.2 Create Theme Showcase**
  - [ ] Optional: Create `/themes` page showing all themes
  - [ ] Deploy and verify

### Phase 10: Vue 3 Frontend (Alternative Framework 💚)

Build Vue 3 version consuming the same data from the backend.

- [ ] **10.1 Create Vue App**
  - [ ] Initialize `apps/web-vue/` with Vite + Vue 3
  - [ ] Set up TypeScript configuration
  - [ ] Install Vue Router

- [ ] **10.2 Create Routes & Pages**
  - [ ] Create router configuration with shared routes
  - [ ] Create `/src/views/CVPage.vue`
  - [ ] Implement theme switching via composable

- [ ] **10.3 Integrate UI Components**
  - [ ] Import Lit components in Vue
  - [ ] Apply theme CSS variables from `packages/ui`
  - [ ] Verify all themes work

- [ ] **10.4 Deploy**
  - [ ] Deploy Vue app separately (or same Render service under subdomain)
  - [ ] Verify routes and data fetching work

### Phase 11: FastAPI Backend (Optional Python Backend)

Add Python FastAPI backend as alternative to TanStack Start server routes.

- [ ] **10.1 Create FastAPI Service**
  - [ ] Initialize `services/api-python/` with FastAPI
  - [ ] Set up SQLAlchemy ORM
  - [ ] Create database models
  - [ ] Implement `/api/cv` endpoint

- [ ] **10.2 API Documentation**
  - [ ] Generate OpenAPI schema
  - [ ] Set up Swagger UI

- [ ] **10.3 Type Generation**
  - [ ] Generate TypeScript types from OpenAPI
  - [ ] Update frontends to use FastAPI backend (optional)

### Phase 11: Optional Enhancements

- [ ] Set up E2E testing (Playwright/Cypress)
- [ ] Add CI/CD workflows (GitHub Actions)
- [ ] Implement search/filtering
- [ ] Add animations and transitions
- [ ] Set up monitoring and analytics
- [ ] Add authentication/authorization
- [ ] Create admin dashboard for managing content
- [ ] Multi-language support

---

## Architecture Overview

### Monorepo Structure

```
anucreative-website/
├── apps/
│   ├── react/ # TanStack Start (React) full-stack app
│   └── vue/ # Vue 3 frontend (Phase 9)
├── packages/
│   ├── shared/ # Routes, themes, constants
│   ├── data-types/ # TypeScript interfaces for CV data
│   ├── ui/ # Lit web components library
│   ├── tokens/ # Style Dictionary design tokens (Phase 5)
│   └── msw/ # Mock Service Worker setup
├── services/
│   └── api-python/ # FastAPI backend (Phase 10, optional)
└── ...config files
```

### Key Technologies

- **Monorepo:** Turborepo + Yarn Workspaces
- **Frontend (React):** TanStack Start
- **Frontend (Vue):** Vite + Vue 3 + TanStack Router
- **UI Components:** Lit web components
- **Design Tokens:** Style Dictionary (centralized theme management)
- **Styling:** CSS variables + generated from Style Dictionary
- **Mocking:** MSW (Mock Service Worker)
- **Backend:** TanStack Start server routes (Prisma) + FastAPI (optional)
- **Deployment:** Render
- **Database:** SQLite (dev) / Postgres (prod)

---

## Getting Started

### Prerequisites

- Node.js 24+
- Yarn 4.9.4

### Installation

```bash
git clone <repo>
cd anucreative-website
yarn install

# Start TanStack Start dev server
yarn dev

# Build all packages
yarn build

# Run tests
yarn test

# Lint all files
yarn lint

# Type check
yarn type-check
```

## References

- [Turborepo Docs](https://turbo.build/repo/docs)
- [TanStack Start](https://tanstack.com/start/latest)
- [Lit Web Components](https://lit.dev)
- [MSW Documentation](https://mswjs.io)
- [Style Dictionary](https://amzn.github.io/style-dictionary/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Vue 3 Documentation](https://vuejs.org/)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Render Docs](https://docs.render.com/)
- [Yarn Workspaces](https://yarnpkg.com/features/workspaces)

## Deployment to Render

### Prerequisites

- GitHub account with repository pushed to `main` branch
- Render.com account (https://render.com)

### Deployment Steps

1. **Connect Repository**
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Select "Deploy an existing repository"
   - Search for and select this repository
   - Click "Connect"

2. **Configure Service**
   - **Name:** `anucreative-website` (or your preference)
   - **Environment:** `Node`
   - **Build Command:** `yarn install && yarn build`
   - **Start Command:** `yarn start`
   - **Instance Type:** Free or Paid (your choice)

3. **Set Environment Variables**
   - Add `NODE_ENV`: `production`
   - Add `VITE_API_URL`: `http://localhost:3001` (or your API URL)

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Wait for build to complete (~2-3 minutes)
   - Access your site at the provided Render domain

5. **Custom Domain (Optional)**
   - In Render dashboard, go to Settings
   - Add custom domain under "Custom Domain"
   - Follow DNS instructions for your domain registrar

### Automatic Deployments

Render automatically redeploys when you push to `main` branch. To test:

```bash
git add .
git commit -m "Phase 3: Deployment configuration"
git push origin main
```

---

## Notes

- **Single source of truth for routes:** `packages/shared/routes.ts`
- **Data types defined upfront:** Interfaces match future API shape (Prisma models)
- **MSW from the start:** Decouples frontend from backend from day one
- **CSS variables for theming:** All themes defined in `packages/ui/`
- **Iterative releases:** Each phase delivers a working product
- **Type safety throughout:** TypeScript from Prisma models → Frontend types
