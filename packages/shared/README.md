# @monorepo/shared

Shared constants, types, route definitions, and theme configurations used across all frontend and backend applications.

## Contents

- **routes.ts** - TanStack Router route definitions (single source of truth)
  - Generic CV at `/cv`
  - alan theme at `/cv/alan`
- **themes.ts** - Theme configurations (Default, alan)
- **constants.ts** - API endpoints and application constants
- **index.ts** - Central export point

## Usage

```typescript
import { ROUTES, THEME_CONFIGS, API_ENDPOINTS } from '@monorepo/shared'
```

## Building

```bash
yarn build          # Compile TypeScript
yarn type-check     # Type check without emitting
yarn clean          # Remove dist directory
```
