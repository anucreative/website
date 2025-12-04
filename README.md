# AnuCreative Monorepo

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

- [ ] **4.1 Create `packages/ui/` - Lit Components**
  - [ ] Initialize package with `package.json`
  - [ ] Set up TypeScript configuration
  - [ ] Create `src/components/` directory
  - [ ] Create `src/themes/` directory for theme files

- [ ] **4.2 Create Theme System**
  - [ ] Create `src/themes/base.css` - CSS variables for default theme
  - [ ] Create theme JSON files (default, alan)
  - [ ] Set up Style Dictionary configuration to generate CSS from JSON
  - [ ] Generate theme CSS files from JSON

- [ ] **4.3 Create Example Components**
  - [ ] Create `Card.ts` - Lit component for CV section
  - [ ] Create `Header.ts` - Lit component for CV header
  - [ ] Document component API

- [ ] **4.4 Integrate into TanStack Start**
  - [ ] Import Lit components in TanStack Start
  - [ ] Replace hardcoded HTML with components
  - [ ] Verify theme CSS variables work
  - [ ] Test locally and redeploy

### Phase 5: ALAN Theme (Multiple Themes 🎭)

Add ALAN theme variant at `/cv/alan` using CSS variables from the UI library.

- [ ] **5.1 Create ALAN Theme**
  - [ ] Define ALAN theme colors in JSON
  - [ ] Generate ALAN theme CSS via Style Dictionary
  - [ ] Add to `packages/ui/src/themes/alan.css`

- [ ] **5.2 Implement Theme Switching**
  - [ ] Create theme context in TanStack Start
  - [ ] Update route `/cv/alan` to use ALAN theme
  - [ ] Apply theme CSS variables at root level
  - [ ] Verify theme switches correctly

- [ ] **5.3 Deploy**
  - [ ] Push to GitHub
  - [ ] Verify automatic deployment to Render
  - [ ] Test both `/cv` and `/cv/alan` routes

### Phase 6: Backend - Database & API (Type-Safe API 🔌)

Replace MSW with real backend using Prisma + TanStack Start server routes. Generate TypeScript types from Prisma.

- [ ] **6.1 Set up Prisma**
  - [ ] Initialize Prisma in TanStack Start app
  - [ ] Create `prisma/schema.prisma` with CV data model
  - [ ] Set up SQLite for local dev (Postgres in production)

- [ ] **6.2 Create Server Routes**
  - [ ] Create `/src/routes/api/cv.ts` - Server route returning CV data
  - [ ] Integrate Prisma client
  - [ ] Update TanStack Start to fetch from real API

- [ ] **6.3 Generate API Types**
  - [ ] Set up `@prisma/client` type generation
  - [ ] Create type guards and validators
  - [ ] Use generated types in frontend

- [ ] **6.4 Database Setup**
  - [ ] Create database migrations
  - [ ] Seed database with sample data
  - [ ] Document database schema

### Phase 7: More Themes (Extensibility 🌈)

Add additional themes to demonstrate the theming system works well.

- [ ] **7.1 Create Additional Themes**
  - [ ] Define 2-3 new theme JSON files
  - [ ] Generate CSS via Style Dictionary
  - [ ] Create corresponding routes (`/cv/theme-name`)

- [ ] **7.2 Create Theme Showcase**
  - [ ] Optional: Create `/themes` page showing all themes
  - [ ] Deploy and verify

### Phase 8: Vue 3 Frontend (Alternative Framework 💚)

Build Vue 3 version consuming the same data from the backend.

- [ ] **8.1 Create Vue App**
  - [ ] Initialize `apps/web-vue/` with Vite + Vue 3
  - [ ] Set up TypeScript configuration
  - [ ] Install Vue Router

- [ ] **8.2 Create Routes & Pages**
  - [ ] Create router configuration with shared routes
  - [ ] Create `/src/views/CVPage.vue`
  - [ ] Implement theme switching via composable

- [ ] **8.3 Integrate UI Components**
  - [ ] Import Lit components in Vue
  - [ ] Apply theme CSS variables
  - [ ] Verify all themes work

- [ ] **8.4 Deploy**
  - [ ] Deploy Vue app separately (or same Render service under subdomain)
  - [ ] Verify routes and data fetching work

### Phase 9: FastAPI Backend (Optional Python Backend)

Add Python FastAPI backend as alternative to TanStack Start server routes.

- [ ] **9.1 Create FastAPI Service**
  - [ ] Initialize `services/api-python/` with FastAPI
  - [ ] Set up SQLAlchemy ORM
  - [ ] Create database models
  - [ ] Implement `/api/cv` endpoint

- [ ] **9.2 API Documentation**
  - [ ] Generate OpenAPI schema
  - [ ] Set up Swagger UI

- [ ] **9.3 Type Generation**
  - [ ] Generate TypeScript types from OpenAPI
  - [ ] Update frontends to use FastAPI backend (optional)

### Phase 10: Optional Enhancements

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
│ ├── start/ # TanStack Start (React) full-stack app
│ └── web-vue/ # Vue 3 frontend (Phase 8)
├── packages/
│ ├── shared/ # Routes, themes, constants
│ ├── data-types/ # TypeScript interfaces for CV data
│ ├── ui/ # Lit web components library
│ └── msw/ # Mock Service Worker setup
├── services/
│ └── api-python/ # FastAPI backend (Phase 9, optional)
└── ...config files
```

### Data Flow

**Phase 2-3:** `data.json` → MSW handlers → Frontend (hardcoded) **Phase 4-5:** Components extracted, theme system via CSS variables **Phase 6+:** `Prisma/DB` → TanStack Start API routes → Frontend types from Prisma **Phase 8:** Vue app uses same backend and UI components **Phase 9:** FastAPI backend as alternative

### Key Technologies

- **Monorepo:** Turborepo + Yarn Workspaces
- **Frontend (React):** TanStack Start
- **Frontend (Vue):** Vite + Vue 3 + TanStack Router
- **UI Components:** Lit web components
- **Styling:** CSS variables + Style Dictionary
- **Mocking:** MSW (Mock Service Worker)
- **Backend:** TanStack Start server routes (Prisma) + FastAPI (optional)
- **Deployment:** Render
- **Database:** SQLite (dev) / Postgres (prod)

---

## Getting Started

### Prerequisites

- Node.js 18+
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
