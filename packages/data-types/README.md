# @monorepo/data-types

TypeScript type definitions for CV/Resume data following the [JSON Resume schema](https://jsonresume.org/schema).

## Schema

Based on the standardized JSON Resume format, supporting:

- `Basics` – Name, contact info, location, profiles
- `Work` – Employment history
- `Education` – Educational background
- `Skills` – Technical and soft skills with keywords
- `Languages` – Language proficiency
- `Volunteer` – Volunteer experience
- `Awards`, `Certificates`, `Publications`, `Projects` – Additional sections
- `Interests`, `References` – Optional extras

## Usage

```typescript
import type { Resume } from '@monorepo/data-types'

const resume: Resume = {
  basics: {
    name: 'John Doe',
    email: 'john@example.com',
    url: 'https://johndoe.com',
    // ...
  },
  work: [
    {
      position: 'Senior Developer',
      name: 'Company Inc',
      startDate: '2020-01-01',
      // ...
    },
  ],
  // ...
}
```

## Validation

Use the `isResume()` type guard for runtime validation:

```typescript
if (isResume(data)) {
  // data is safely typed as Resume
}
```

## Alignment with Backend

These types are designed to match future API responses from:

- **Phase 6:** Prisma models and TanStack Start API routes
- **Phase 9:** FastAPI endpoint responses

Changes to these types should be coordinated with backend schema updates.
