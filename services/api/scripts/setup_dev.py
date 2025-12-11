"""Development setup script - run migrations and seed data"""

import subprocess
import sys
import time
from pathlib import Path

import psycopg2


def run_command(cmd, description, cwd=None):
    """Run a subprocess command and handle errors."""
    result = subprocess.run(cmd, capture_output=True, text=True, cwd=cwd)
    if result.returncode != 0:
        print(f"❌ {description} failed:")
        print(result.stderr)
        sys.exit(1)
    return result


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


def wait_for_file(file_path, max_retries=60, delay=1):
    """Wait for a file to exist."""
    for attempt in range(max_retries):
        if file_path.exists():
            return True
        if attempt == max_retries - 1:
            raise TimeoutError(f"File {file_path} was not created after {max_retries}s")
        time.sleep(delay)


def setup_dev():
    """Set up development environment."""
    print("🚀 Setting up development environment...\n")
    
    # 0. Ensure database exists
    print("0️⃣  Ensuring database exists...")
    ensure_database_exists()
    print()
    
    # 1. Run migrations
    print("1️⃣  Running database migrations...")
    run_command(["alembic", "upgrade", "head"], "Migration")
    print("✅ Migrations complete\n")
    
    # 2. Seed data
    print("2️⃣  Seeding base CV...")
    result = run_command([sys.executable, "-m", "scripts.seed"], "Seed")
    print(result.stdout)
    
    # 3. Generate OpenAPI schema via server startup
    print("3️⃣  Generating and saving OpenAPI schema...")
    print("   Starting FastAPI server...")
    
    schema_file = Path(__file__).parent.parent / "openapi.json"
    process = subprocess.Popen(
        [sys.executable, "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    
    try:
        wait_for_file(schema_file)
        print("   ✅ OpenAPI schema saved")
    except TimeoutError:
        print("❌ Failed to generate schema")
        sys.exit(1)
    finally:
        print("   Stopping FastAPI server...")
        process.terminate()
        try:
            process.wait(timeout=5)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
    
    # 4. Generate TypeScript types
    print("4️⃣  Generating TypeScript types...")
    run_command(
        ["yarn", "api:types"],
        "Type generation",
        cwd=str(Path(__file__).parent.parent.parent)
    )
    print("✅ TypeScript types generated successfully")
    
    print("\n✅ Development environment ready!")
    print("   Run: python run.py")

if __name__ == "__main__":
    setup_dev()
