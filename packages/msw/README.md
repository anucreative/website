# @website/msw

Mock Service Worker setup for intercepting and mocking HTTP requests in development and tests.

## Exports

- **`handlers`** – MSW request handlers for CV API endpoints
- **`browser`** – Browser worker setup for client-side mocking

## Usage

### Browser (React/TanStack)

```typescript
import { setupWorker } from 'msw/browser'
import { handlers } from '@website/msw'

const worker = setupWorker(...handlers)

// In your app initialization
await worker.start({
  onUnhandledRequest: 'error',
})
```

### Server (Node.js tests)

```typescript
import { setupServer } from 'msw/node'
import { handlers } from '@website/msw'

const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## Mocked Endpoints

- `GET /api/resume` – Returns CV data from `@website/data-types` sample
- `GET /api/resume/:id` – Returns specific resume by ID (currently returns sample)

## Integration

This package provides mock data from `@website/data-types` cv.json, allowing:

- Full frontend development without backend
- Predictable test data
- Easy transition to real API in Phase 6

See `cv.json` in `@website/data-types` for the mock data structure.
