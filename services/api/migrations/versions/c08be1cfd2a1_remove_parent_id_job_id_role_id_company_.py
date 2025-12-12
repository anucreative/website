"""Remove parent_id, job_id, role_id, company_id columns

Revision ID: c08be1cfd2a1
Revises: 001_initial
Create Date: 2025-12-12 13:53:07.698887

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = 'c08be1cfd2a1'
down_revision: Union[str, None] = '001_initial'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # Drop columns (in reverse dependency order)
    op.drop_column('cvs', 'role_id')
    op.drop_column('cvs', 'company_id')
    op.drop_column('cvs', 'job_id')
    op.drop_column('cvs', 'parent_id')


def downgrade() -> None:
    # Re-add columns in original order
    op.add_column('cvs', sa.Column('parent_id', sa.UUID(), autoincrement=False, nullable=True))
    op.add_column('cvs', sa.Column('job_id', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
    op.add_column('cvs', sa.Column('company_id', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
    op.add_column('cvs', sa.Column('role_id', sa.VARCHAR(length=100), autoincrement=False, nullable=True))
