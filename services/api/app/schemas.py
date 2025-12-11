"""Pydantic schemas for CV management"""

from typing import Optional
from pydantic import BaseModel, Field, ConfigDict
from uuid import UUID
from datetime import datetime

# CV schema models (matching @website/data-types)

class Location(BaseModel):
    address: Optional[str] = None
    postalCode: Optional[str] = None
    city: Optional[str] = None
    countryCode: Optional[str] = None
    region: Optional[str] = None

class Profile(BaseModel):
    network: str
    username: Optional[str] = None
    url: Optional[str] = None

class Basics(BaseModel):
    name: str
    label: Optional[str] = None
    image: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    url: Optional[str] = None
    summary: Optional[str] = None
    future: Optional[str] = None
    location: Optional[Location] = None
    profiles: Optional[list[Profile]] = None

class Work(BaseModel):
    name: Optional[str] = None
    position: Optional[str] = None
    url: Optional[str] = None
    location: Optional[str] = None
    slug: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    summary: Optional[str] = None
    highlights: Optional[list[str]] = None

class Skill(BaseModel):
    name: str
    level: Optional[str] = None
    keywords: Optional[list[str]] = None

class Language(BaseModel):
    language: str
    fluency: Optional[str] = None

class Education(BaseModel):
    institution: str
    url: Optional[str] = None
    area: Optional[str] = None
    studyType: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    score: Optional[str] = None
    courses: Optional[list[str]] = None

class Award(BaseModel):
    title: str
    date: Optional[str] = None
    awarder: Optional[str] = None
    summary: Optional[str] = None

class Certificate(BaseModel):
    name: str
    date: Optional[str] = None
    issuer: Optional[str] = None
    url: Optional[str] = None

class Publication(BaseModel):
    name: str
    publisher: Optional[str] = None
    releaseDate: Optional[str] = None
    url: Optional[str] = None
    summary: Optional[str] = None

class Interest(BaseModel):
    name: str
    keywords: Optional[list[str]] = None

class Reference(BaseModel):
    name: str
    reference: Optional[str] = None

class Project(BaseModel):
    name: str
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    description: Optional[str] = None
    highlights: Optional[list[str]] = None
    url: Optional[str] = None
    keywords: Optional[list[str]] = None

class Volunteer(BaseModel):
    organization: str
    position: Optional[str] = None
    url: Optional[str] = None
    startDate: Optional[str] = None
    endDate: Optional[str] = None
    summary: Optional[str] = None
    highlights: Optional[list[str]] = None

class CV(BaseModel):
    """Full CV matching JSON CV schema"""
    model_config = ConfigDict(json_schema_extra={})
    
    basics: Basics
    work: Optional[list[Work]] = None
    volunteer: Optional[list[Volunteer]] = None
    education: Optional[list[Education]] = None
    awards: Optional[list[Award]] = None
    certificates: Optional[list[Certificate]] = None
    publications: Optional[list[Publication]] = None
    skills: Optional[list[Skill]] = None
    languages: Optional[list[Language]] = None
    interests: Optional[list[Interest]] = None
    references: Optional[list[Reference]] = None
    projects: Optional[list[Project]] = None

# CV API schemas

class CVCreate(BaseModel):
    """Request to create a new CV"""
    type: str = Field(..., pattern="^(base|role|job|company)$")
    name: str
    content: CV
    parent_id: Optional[UUID] = None
    job_id: Optional[str] = None
    role_id: Optional[str] = None
    company_id: Optional[str] = None

class CVUpdate(BaseModel):
    """Request to update a CV"""
    name: Optional[str] = None
    content: Optional[CV] = None

class CVResponse(BaseModel):
    """CV response with metadata"""
    id: UUID
    type: str
    name: str
    parent_id: Optional[UUID] = None
    job_id: Optional[str] = None
    role_id: Optional[str] = None
    company_id: Optional[str] = None
    content: CV
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
