from sqlalchemy import Table, Column, ForeignKey, Integer

from src.fastapi_voting.app.models.base import Base


registered_user_voting_association_table = Table(
    "registered_user_association",
    Base.metadata,

    Column("user_id", Integer, ForeignKey("users.id")),
    Column("voting_id", Integer, ForeignKey("votings.id")),
)