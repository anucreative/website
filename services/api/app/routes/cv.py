"""CV routes and endpoints"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, case
from uuid import UUID

from app.database import get_session
from app.models import CV as CVModel
from app.schemas import CVCreate, CVUpdate, CVResponse, CV

router = APIRouter()

@router.post("/", response_model=CVResponse, status_code=201, operation_id="createCv")
async def create_cv(
    cv_create: CVCreate,
    session: AsyncSession = Depends(get_session)
):
    """Create a new CV"""
    
    # Create new CV
    new_cv = CVModel(
        type=cv_create.type,
        name=cv_create.name,
        slug=cv_create.slug,
        content=cv_create.content.model_dump(exclude_none=True),
    )
    
    session.add(new_cv)
    await session.commit()
    await session.refresh(new_cv)
    
    return new_cv

@router.get("/{slug}", response_model=CVResponse, operation_id="getCvBySlug")
async def get_cv(
    slug: str,
    session: AsyncSession = Depends(get_session)
):
    """Get a specific CV by slug, fallback to 'base' if not found"""
    # Single query: fetch matching slug OR base, prioritize exact match
    result = await session.execute(
        select(CVModel)
        .where(or_(CVModel.slug == slug, CVModel.slug == 'base'))
        .order_by(case((CVModel.slug == slug, 0), else_=1))
    )
    cv = result.scalars().first()
    
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    
    return cv

@router.patch("/{slug}", response_model=CVResponse, operation_id="updateCvBySlug")
async def update_cv(
    slug: str,
    cv_update: CVUpdate,
    session: AsyncSession = Depends(get_session)
):
    """Update a CV (partial update)"""
    result = await session.execute(select(CVModel).where(CVModel.slug == slug))
    cv = result.scalar()
    
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    
    if cv_update.name:
        cv.name = cv_update.name
    if cv_update.slug:
        cv.slug = cv_update.slug
    if cv_update.content:
        cv.content = cv_update.content.model_dump(exclude_none=True)
    
    await session.commit()
    await session.refresh(cv)
    
    return cv

@router.delete("/{slug}", status_code=204, operation_id="deleteCvBySlug")
async def delete_cv(
    slug: str,
    session: AsyncSession = Depends(get_session)
):
    """Delete a CV"""
    result = await session.execute(select(CVModel).where(CVModel.slug == slug))
    cv = result.scalar()
    
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    
    await session.delete(cv)
    await session.commit()
