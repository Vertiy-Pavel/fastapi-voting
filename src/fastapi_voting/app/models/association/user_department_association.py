from sqlalchemy import Table, Column, ForeignKey, Integer

from src.fastapi_voting.app.models.base import Base

users_department_association_table = Table(
    "users_department_association",
    Base.metadata,

    Column("user_id", Integer, ForeignKey("users.id")),
    Column("department_id", Integer, ForeignKey("departments.id")),
)