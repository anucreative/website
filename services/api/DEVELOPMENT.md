# FastAPI development environment

## Setup

```bash
cd services/api
python3 -m venv venv
source venv/bin/activate
pip install -e ".[dev]"
```

## Initialize Database

```bash
# Run migrations and seed base CV
python scripts/setup_dev.py
```

Or manually:

```bash
# Run migrations
alembic upgrade head

# Seed base CV from cv.json
python -m scripts.seed

# Generate TypeScript types from Pydantic models
python scripts/generate_types.py
```

## Run Development Server

```bash
python run.py
```

API will be available at: `http://localhost:8000`

### Swagger UI

Interactive API documentation: `http://localhost:8000/docs`

### ReDoc

Alternative docs: `http://localhost:8000/redoc`

## Endpoints

### List all CVs

```bash
curl http://localhost:8000/cv
```

### Get specific CV

```bash
curl http://localhost:8000/cv/{cv_id}
```

### Create new CV

```bash
curl -X POST http://localhost:8000/cv \
  -H "Content-Type: application/json" \
  -d @- << 'EOF'
{
  "type": "role",
  "name": "Frontend Developer CV",
  "role_id": "frontend-dev",
  "content": { /* Resume object */ }
}
EOF
```

### Update CV

```bash
curl -X PATCH http://localhost:8000/cv/{cv_id} \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### Delete CV

```bash
curl -X DELETE http://localhost:8000/cv/{cv_id}
```

## Testing

```bash
pytest
pytest --cov  # With coverage
```
