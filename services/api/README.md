# FastAPI Backend

PostgreSQL + SQLAlchemy async backend for CV management.

## Setup

### Prerequisites

- Python 3.12+
- PostgreSQL 14+

### Installation

```bash
cd services/api

# Create and activate virtual environment
python3.12 -m venv venv
source venv/bin/activate

# Install dependencies (with dev tools)
pip install -e ".[dev]"
```

### Initialize Development Environment

```bash
# Full setup: create DB, run migrations, seed data
python scripts/setup_dev.py
```

This runs:

1. Creates PostgreSQL database if needed
2. Applies all Alembic migrations
3. Seeds base CV from `packages/data-types/cv.json`

### Start Development Server

```bash
python run.py
```

API runs on `http://localhost:8000`

#### Interactive Documentation

- **Swagger UI**: `http://localhost:8000/docs` – Interactive API explorer
- **ReDoc**: `http://localhost:8000/redoc` – Alternative docs

## Database Migrations

We use **Alembic** to manage schema changes.

### Making a Schema Change

1. **Edit the model** in `app/models.py`:

```python
class CV(Base):
    slug = Column(String(255), unique=True, nullable=False, index=True)
    # Add or remove columns here
```

2. **Generate migration** (Alembic detects changes automatically):

```bash
./venv/bin/alembic revision --autogenerate -m "descriptive message"
```

3. **Review the migration** in `migrations/versions/`:

```bash
cat migrations/versions/002_your_migration.py
```

4. **Apply migration**:

```bash
./venv/bin/alembic upgrade head
```

### Common Migration Commands

```bash
# Show current migration state
./venv/bin/alembic current

# View migration history
./venv/bin/alembic history

# Downgrade to previous migration
./venv/bin/alembic downgrade -1

# Downgrade to specific revision
./venv/bin/alembic downgrade <revision_id>
```

## Development Workflow

### Manual Steps (if not using `setup_dev.py`)

```bash
# Apply all migrations
./venv/bin/alembic upgrade head

# Seed base CV from cv.json
python -m scripts.seed

# Test the API
curl http://localhost:8000/cv/base
```

### Running Tests

```bash
pytest
pytest --cov  # With coverage report
```

## API Endpoints

All endpoints use **slug-based lookups** for human-readable URLs (no UUIDs):

### Fetch CV

```bash
# Get base CV
curl http://localhost:8000/cv/base

# Get any CV by slug
curl http://localhost:8000/cv/{slug}
# Returns base CV if slug not found (fallback behavior)
```

**Response** (`GET /cv/{slug}`):

```json
{
  "id": "uuid",
  "type": "base",
  "name": "Base CV",
  "slug": "base",
  "content": {
    /* full Resume object */
  },
  "created_at": "2025-12-12T...",
  "updated_at": "2025-12-12T..."
}
```

### Create CV

```bash
curl -X POST http://localhost:8000/cv/ \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "alan",
    "name": "Alan CV",
    "type": "base",
    "content": { /* Resume object */ }
  }'
```

### Update CV

```bash
curl -X PATCH http://localhost:8000/cv/alan \
  -H "Content-Type: application/json" \
  -d '{"content": { /* updated Resume */ }}'
```

### Delete CV

```bash
curl -X DELETE http://localhost:8000/cv/alan
```

## Architecture

See [ARCHITECTURE.md](../../ARCHITECTURE.md) for database design, slug-based lookup strategy, and type generation workflow.

## Database

- **Engine**: PostgreSQL with async SQLAlchemy + asyncpg
- **Migrations**: Alembic for schema versioning
- **Schema**: Single `cvs` table with JSONB content storage
- **Lookup**: Direct slug-based access with automatic fallback to base CV

## Files

- `app/models.py` – SQLAlchemy models
- `app/schemas.py` – Pydantic request/response schemas
- `app/routes/cv.py` – API endpoint handlers
- `app/main.py` – FastAPI app setup
- `migrations/` – Alembic migration history
- `scripts/setup_dev.py` – Database initialization
- `scripts/seed.py` – Load base CV from cv.json
- `run.py` – Development server entry point
