# CV Database & API Architecture

## Problem Statement
Support personalized CVs for different jobs, roles, and companies with a single base CV. Users need to extend base CVs with role-specific or job-specific changes, then manage these versions with minimal duplication.

## Design Decisions

### 1. Database Schema
**Technology:** PostgreSQL with JSONB + SQLAlchemy
- Single `cvs` table with full `Resume` stored as JSONB (no normalization)
- Metadata columns: `job_id`, `role_id`, `company_id` for lookups
- Optional `parent_id` for lineage tracking (for auditing, not required for core logic)

### 2. CV Retrieval Strategy
Fallback chain: Job → Company → Role → Base
```sql
SELECT * FROM cvs WHERE 
  (job_id=$job AND role_id=$role AND company_id=$company)
  OR (company_id=$company)
  OR (role_id=$role)
  OR (type='base')
```

### 3. Creation Workflow
User selects parent CV → Fetches content → Edits in form → Saves as new CV with `parent_id` reference.
Supports inheritance from any context: base, role, company, or job.

### 4. Update & Migration
Search-replace across all CVs using PostgreSQL JSONB operators.
No cascading updates needed—each CV is independent.

### 5. Backend Framework
**FastAPI** over Flask:
- Async by default (good for concurrent queries)
- Pydantic validation (auto-validates Resume shape)
- Type hints as contracts (Python 3.10+)
- Auto-generated API docs (Swagger UI)
- First-class async SQLAlchemy support
