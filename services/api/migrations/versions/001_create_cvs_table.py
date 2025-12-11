"""Initial migration: Create CVs table"""

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = '001_create_cvs_table'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        'cvs',
        sa.Column('id', postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column('type', sa.String(20), nullable=False),
        sa.Column('name', sa.String(255), nullable=False),
        sa.Column('parent_id', postgresql.UUID(as_uuid=True), nullable=True),
        sa.Column('job_id', sa.String(100), nullable=True),
        sa.Column('role_id', sa.String(100), nullable=True),
        sa.Column('company_id', sa.String(100), nullable=True),
        sa.Column('content', postgresql.JSONB(astext_type=sa.Text()), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False),
        sa.Column('updated_at', sa.DateTime(), nullable=False),
        sa.ForeignKeyConstraint(['parent_id'], ['cvs.id'], ),
        sa.PrimaryKeyConstraint('id'),
        sa.UniqueConstraint('job_id', name='unique_job_id'),
        sa.UniqueConstraint('role_id', name='unique_role_id'),
        sa.UniqueConstraint('company_id', 'job_id', name='unique_company_job'),
    )
    
    # Create indexes
    op.create_index('idx_cv_lookup', 'cvs', ['company_id', 'job_id', 'role_id', 'type'])
    op.create_index('idx_cv_job_id', 'cvs', ['job_id'])
    op.create_index('idx_cv_role_id', 'cvs', ['role_id'])
    op.create_index('idx_cv_company_id', 'cvs', ['company_id'])


def downgrade() -> None:
    op.drop_index('idx_cv_company_id', table_name='cvs')
    op.drop_index('idx_cv_role_id', table_name='cvs')
    op.drop_index('idx_cv_job_id', table_name='cvs')
    op.drop_index('idx_cv_lookup', table_name='cvs')
    op.drop_table('cvs')
