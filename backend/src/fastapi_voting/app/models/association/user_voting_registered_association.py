from sqlalchemy import Table, Column, ForeignKey, Integer

from src.fastapi_voting.app.models.base import Base


users_voting_registered_association_table = Table(
    "users_voting_registered_association",
    Base.metadata,

    Column("user_id", Integer, ForeignKey("users.id", ondelete="CASCADE")),
    Column("voting_id", Integer, ForeignKey("votings.id", ondelete="CASCADE")),
)