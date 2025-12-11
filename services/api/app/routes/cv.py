"""CV routes and endpoints"""

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, or_, and_, case
from uuid import UUID

from app.database import get_session
from app.models import CV
from app.schemas import CVCreate, CVUpdate, CVResponse, Resume

router = APIRouter()

@router.get("/", response_model=list[CVResponse])
async def list_cvs(session: AsyncSession = Depends(get_session)):
    """List all CVs"""
    result = await session.execute(select(CV))
    return result.scalars().all()

@router.post("/", response_model=CVResponse, status_code=201)
async def create_cv(
    cv_create: CVCreate,
    session: AsyncSession = Depends(get_session)
):
    """Create a new CV"""
    
    # Validate parent if provided
    if cv_create.parent_id:
        result = await session.execute(select(CV).where(CV.id == cv_create.parent_id))
        if not result.scalar():
            raise HTTPException(status_code=404, detail="Parent CV not found")
    
    # Create new CV
    new_cv = CV(
        type=cv_create.type,
        name=cv_create.name,
        parent_id=cv_create.parent_id,
        job_id=cv_create.job_id,
        role_id=cv_create.role_id,
        company_id=cv_create.company_id,
        content=cv_create.content.model_dump(exclude_none=True),
    )
    
    session.add(new_cv)
    await session.commit()
    await session.refresh(new_cv)
    
    return new_cv

@router.get("/{cv_id}", response_model=CVResponse)
async def get_cv(
    cv_id: UUID,
    session: AsyncSession = Depends(get_session)
):
    """Get a specific CV by ID"""
    result = await session.execute(select(CV).where(CV.id == cv_id))
    cv = result.scalar()
    
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    
    return cv

@router.patch("/{cv_id}", response_model=CVResponse)
async def update_cv(
    cv_id: UUID,
    cv_update: CVUpdate,
    session: AsyncSession = Depends(get_session)
):
    """Update a CV (partial update)"""
    result = await session.execute(select(CV).where(CV.id == cv_id))
    cv = result.scalar()
    
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    
    if cv_update.name:
        cv.name = cv_update.name
    if cv_update.content:
        cv.content = cv_update.content.model_dump(exclude_none=True)
    
    await session.commit()
    await session.refresh(cv)
    
    return cv

@router.delete("/{cv_id}", status_code=204)
async def delete_cv(
    cv_id: UUID,
    session: AsyncSession = Depends(get_session)
):
    """Delete a CV"""
    result = await session.execute(select(CV).where(CV.id == cv_id))
    cv = result.scalar()
    
    if not cv:
        raise HTTPException(status_code=404, detail="CV not found")
    
    await session.delete(cv)
    await session.commit()
