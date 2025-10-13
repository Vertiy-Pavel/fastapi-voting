from sqlalchemy import Table, Column, ForeignKey, Integer

from src.fastapi_voting.app.models.base import Base


voting_department_association_table = Table(
    "voting_department_association",
    Base.metadata,

    Column("voting_id", Integer, ForeignKey("votings.id", ondelete="CASCADE")),
    Column("department_id", Integer, ForeignKey("departments.id", ondelete="CASCADE")),
)