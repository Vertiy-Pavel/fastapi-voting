from datetime import datetime, timezone

from typing import List

from sqlalchemy import ForeignKey
from sqlalchemy.types import String, TIMESTAMP
from sqlalchemy.orm import Mapped, relationship, mapped_column

from src.fastapi_voting.app.models.base import Base

from src.fastapi_voting.app.models.association.user_department_association import user_department_association_table


class Department(Base):
    """ОРМ-модель. Описывает запись отдела"""

    # --- Метаданные ---
    __tablename__ = "departments"

    # --- Колонки таблицы ---
    id: Mapped[int] = mapped_column(primary_key=True)

    name: Mapped[str] = mapped_column(String(255), unique=True)
    description: Mapped[str] = mapped_column(String(255))
    location: Mapped[str] = mapped_column(String(255))

    created_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now(timezone.utc))
    updated_at: Mapped[datetime] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    # --- Внешние ключи ---
    parent_id: Mapped[int] = mapped_column(ForeignKey("departments.id", ondelete="CASCADE"))
    head_of_department_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete="SET NULL"), unique=True)

    # --- ОРМ-связи ---
    parent: Mapped['Department'] = relationship(back_populates="children", cascade="all, delete-orphan")
    head_of_department: Mapped['User'] = relationship(back_populates="manage_department", cascade="all, delete-orphan")

    children: Mapped[List['Department']] = relationship(back_populates="parent")

    users: Mapped[List['User']] = relationship(secondary=user_department_association_table, back_populates="departments")
