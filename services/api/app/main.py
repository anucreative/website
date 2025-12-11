"""FastAPI CV Management Backend"""

import json
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from app.database import init_db
from app.routes import cv

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize database on startup and save OpenAPI schema"""
    await init_db()
    
    # Save OpenAPI schema for type generation
    schema = app.openapi()
    # Path: app/main.py → app/ → services/api/ → services/api/openapi.json
    schema_file = Path(__file__).parent.parent / "openapi.json"
    
    schema_file.write_text(json.dumps(schema, indent=2))
    print(f"✅ OpenAPI schema saved to: {schema_file.absolute()}")
    
    yield

app = FastAPI(
    title="anucreative API",
    description="CV management backend",
    version="0.1.0",
    lifespan=lifespan
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(cv.router, prefix="/cv", tags=["cv"])

@app.get("/health", operation_id="health")
async def health():
    """Health check endpoint"""
    return {"status": "ok"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
