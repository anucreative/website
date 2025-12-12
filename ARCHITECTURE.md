# CV Database & API Architecture

## Problem Statement

Support personalized CVs for different jobs, roles, and companies with a single base CV. Users need to extend base CVs with role-specific or job-specific changes, then manage these versions with minimal duplication.

## Design Decisions

### 1. Database Schema

**Technology:** PostgreSQL with JSONB + SQLAlchemy

- Single `cvs` table with full `Resume` stored as JSONB (no normalization)
- **`slug` column (unique, indexed)** for direct human-friendly lookups
- Metadata columns: `job_id`, `role_id`, `company_id` for optional filtering/auditing
- Optional `parent_id` for lineage tracking (for auditing, not required for core logic)

### 2. CV Retrieval Strategy

**Direct slug lookup** with fallback to base:

```sql
SELECT * FROM cvs WHERE slug = $slug
-- If slug not found, fallback to: SELECT * FROM cvs WHERE slug = 'base'
```

**API Endpoint:** `GET /cv/{slug}`

- Fetch CV by slug (e.g., `/cv/base`, `/cv/alan`, `/cv/alan-frontend-developer`)
- If CV with slug not found, automatically returns base CV (fallback behavior)
- Simple, human-readable URLs without IDs or nested routes

### 3. API Endpoints

- **GET `/cv/{slug}`** – Fetch CV by slug (returns base if not found)
- **POST `/cv/`** – Create new CV (requires `slug` in body, must be unique)
- **PATCH `/cv/{slug}`** – Update CV by slug
- **DELETE `/cv/{slug}`** – Delete CV by slug

All endpoints use direct slug lookup. No ID-based access needed.

### 4. Frontend Routing

**React/TanStack Start routes:**

- `/cv/` – Landing route, loads base CV via `fetchResume()`
- `/cv/:slug` – Dynamic route, loads CV by slug parameter

Simple dynamic routes without nested path structure.

### 5. Data Storage & Updates

- Each CV is **fully independent** - stored as complete JSONB document
- No cascading updates needed
- Update any field in any CV without affecting others
- Optional `parent_id` for tracking inheritance history (audit trail)

### 6. Backend Framework

**FastAPI** with async SQLAlchemy:

- Async by default (good for concurrent queries)
- Pydantic validation (auto-validates Resume shape)
- Type hints as contracts (Python 3.10+)
- Auto-generated API docs (Swagger UI)
- First-class async SQLAlchemy support with asyncpg

### 7. Development Workflow

- **No migrations during development** – SQLAlchemy `create_all()` from models
- Database recreated fresh from models when needed
- Seed script loads data from `packages/data-types/cv.json`
- Types auto-generated from OpenAPI schema via `yarn generate-types`
