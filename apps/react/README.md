# @monorepo/react

TanStack Start full-stack React application for displaying CV/Resume pages.

## Features

- Full-stack React with TanStack Start and React Router
- Multiple CV pages (`/cv`, `/cv/alan` coming in Phase 5)
- Theme support via CSS variables
- MSW integration for API mocking in development
- Type-safe data fetching with `@monorepo/data-types`
- Responsive design
- Performance optimized

## Getting Started

### Development

```bash
# From root
yarn dev

# Run specific app
yarn dev:filter @monorepo/react
```

The app will start with MSW intercepting API requests to `/api/resume`.

### Build

```bash
yarn build --filter @monorepo/start
```

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

## Project Structure

```
src/
├── routes/
│   ├── __root.tsx      # Root layout with theme and MSW setup
│   └── cv.tsx          # CV page component
└── styles/
    └── global.css      # Global styles with CSS variables
```

## Routes

- `/` – Home (to be implemented)
- `/cv` – CV page (default theme)
- `/cv/alan` – CV page (ALAN theme, Phase 5)

## Integration Points

- **Data:** Fetches from `@monorepo/data-types` sample via MSW
- **Shared:** Uses routes, themes, constants from `@monorepo/shared`
- **MSW:** Intercepts `/api/resume` requests in development
- **Theme:** CSS variables support (Phase 5 will add theme switcher)

## Phase 6 Integration

When Phase 6 backend is ready:

1. Replace MSW with real API endpoints
2. Update `VITE_API_URL` to point to TanStack Start API routes
3. Use Prisma-generated types instead of mocked data

## API Endpoints (Mocked)

- `GET /api/resume` – Returns resume data
- `GET /api/resume/:id` – Returns resume by ID
