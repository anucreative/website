"""Script to seed the database with base CV from cv.json"""

import asyncio
import json
import uuid
from pathlib import Path
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker

from app.models import CV
from app.database import Base
from app.config import settings


async def seed_base_cv():
    """Load base CV from cv.json and create in database"""
    
    # Read cv.json
    cv_json_path = Path(__file__).parent.parent.parent.parent / "packages/data-types/cv.json"
    
    if not cv_json_path.exists():
        raise FileNotFoundError(f"cv.json not found at {cv_json_path}")
    
    with open(cv_json_path, 'r') as f:
        cv_content = json.load(f)
    
    # Create engine and session
    engine = create_async_engine(settings.database_url)
    
    # Create tables
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    
    async_session_maker = async_sessionmaker(
        engine,
        class_=AsyncSession,
        expire_on_commit=False,
    )
    
    async with async_session_maker() as session:
        # Check if base CV already exists
        from sqlalchemy import select
        result = await session.execute(select(CV).where(CV.type == 'base'))
        existing = result.scalar()
        
        if existing:
            print("✅ Base CV already exists")
            return
        
        # Create base CV
        base_cv = CV(
            id=uuid.uuid4(),
            type='base',
            name='Base CV',
            parent_id=None,
            job_id=None,
            role_id=None,
            company_id=None,
            content=cv_content
        )
        
        session.add(base_cv)
        await session.commit()
        
        print(f"✅ Base CV seeded successfully (ID: {base_cv.id})")
    
    await engine.dispose()


if __name__ == "__main__":
    asyncio.run(seed_base_cv())
