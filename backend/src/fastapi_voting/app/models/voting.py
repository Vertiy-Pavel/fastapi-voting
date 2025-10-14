from datetime import datetime, timezone

from typing import List

from sqlalchemy import ForeignKey, TIMESTAMP, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.fastapi_voting.app.models.base import Base

from src.fastapi_voting.app.models.association.user_voting_registered_association import users_voting_registered_association_table
from src.fastapi_voting.app.models.association.voting_department_association import voting_department_association_table


class Voting(Base):
    """ОРМ-модель. Описывает запись о голосовании"""

    # --- Метаданные ---
    __tablename__ = "votings"

    # --- Колонки таблицы ---
    id: Mapped[int] = mapped_column(primary_key=True)

    title: Mapped[str] = mapped_column(String(255))
    theme: Mapped[str] = mapped_column(String(255))
    public: Mapped[bool]
    quorum: Mapped[int]

    registration_start: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True))
    registration_end: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True))

    voting_start: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True))
    voting_end: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True))

    created_at: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now(timezone.utc))
    updated_at: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now(timezone.utc), onupdate=datetime.now(timezone.utc))

    archived: Mapped[bool] = mapped_column(nullable=True)
    archive_after: Mapped[timezone | None] = mapped_column(TIMESTAMP(timezone=True))

    deleted: Mapped[bool] = mapped_column(default=False)

    # --- Внешние ключи ---
    creator_id: Mapped[int | None] = mapped_column(ForeignKey("users.id", ondelete='SET NULL'))

    # --- ОРМ-связи ---
    creator: Mapped['User'] = relationship(back_populates="creator_votings", foreign_keys=[creator_id])

    votes: Mapped[List['Vote']] = relationship(back_populates="voting", cascade="all, delete-orphan")

    departments: Mapped[List['Department']] = relationship(secondary=voting_department_association_table, back_populates="votings")
    registered_users: Mapped[List['User']] = relationship(secondary=users_voting_registered_association_table, back_populates="votings")

    # TODO: Question-relationship, Model