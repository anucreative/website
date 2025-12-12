"""SQLAlchemy models for database"""

from sqlalchemy import Column, String, Enum, ForeignKey, DateTime, UniqueConstraint, Index
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from datetime import datetime
import uuid

from app.database import Base

class CV(Base):
    """CV/Resume document"""
    
    __tablename__ = "cvs"
    
    # Primary key
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Type classification
    type = Column(String(20), nullable=False)  # base, role, job, company
    name = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, nullable=False, index=True)
    
    # Relationship to parent CV
    parent_id = Column(UUID(as_uuid=True), ForeignKey("cvs.id"), nullable=True)
    parent = relationship("CV", remote_side=[id], backref="children")
    
    # Metadata for lookups
    job_id = Column(String(100), unique=True, nullable=True, index=True)
    role_id = Column(String(100), unique=True, nullable=True, index=True)
    company_id = Column(String(100), nullable=True, index=True)
    
    # Full Resume as JSONB
    content = Column(JSONB, nullable=False)
    
    # Timestamps
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=False, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Constraints
    __table_args__ = (
        UniqueConstraint("company_id", "job_id", name="unique_company_job"),
        Index("idx_cv_lookup", "company_id", "job_id", "role_id", "type"),
    )
    
    def __repr__(self):
        return f"<CV(id={self.id}, type={self.type}, name={self.name})>"
