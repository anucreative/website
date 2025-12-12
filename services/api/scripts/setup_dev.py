"""Development setup script - create schema and seed data"""

import subprocess
import sys
from pathlib import Path

import psycopg2


def ensure_database_exists():
    """Ensure the anucreative database exists, create if needed."""
    from app.config import settings
    from urllib.parse import urlparse
    
    parsed = urlparse(settings.database_url)
    db_name = parsed.path.lstrip("/")
    host = parsed.hostname or "localhost"
    port = parsed.port or 5432
    user = parsed.username or "postgres"
    password = parsed.password or "postgres"
    
    admin_url = f"postgresql://{user}:{password}@{host}:{port}/postgres"
    
    try:
        conn = psycopg2.connect(admin_url)
        conn.autocommit = True
        cur = conn.cursor()
        
        cur.execute(f"SELECT 1 FROM pg_database WHERE datname='{db_name}'")
        if cur.fetchone():
            print(f"   ✅ Database '{db_name}' already exists")
        else:
            cur.execute(f"CREATE DATABASE {db_name}")
            print(f"   ✅ Database '{db_name}' created")
        
        cur.close()
        conn.close()
    except psycopg2.OperationalError as e:
        print(f"❌ Failed to connect to PostgreSQL: {e}")
        sys.exit(1)


def setup_dev():
    """Set up development environment."""
    print("🚀 Setting up development environment...\n")
    
    # 1. Ensure database exists
    print("1️⃣  Ensuring database exists...")
    ensure_database_exists()
    print()
    
    # 2. Create tables from models
    print("2️⃣  Creating database schema...")
    from app.database import engine
    from app.models import Base
    Base.metadata.create_all(bind=engine)
    print("✅ Database schema created\n")
    
    # 3. Seed data
    print("3️⃣  Seeding base CV...")
    result = subprocess.run(
        [sys.executable, "-m", "scripts.seed"],
        capture_output=True,
        text=True
    )
    if result.returncode != 0:
        print(f"❌ Seed failed: {result.stderr}")
        sys.exit(1)
    print(result.stdout)
    
    print("✅ Development environment ready!")
    print("   Run: yarn dev")
    print("   Run: python run.py")

if __name__ == "__main__":
    setup_dev()
