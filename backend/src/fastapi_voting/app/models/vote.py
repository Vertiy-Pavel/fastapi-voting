from datetime import datetime, timezone

from sqlalchemy import ForeignKey, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship

from src.fastapi_voting.app.models.base import Base


class Vote(Base):
    """ОРМ-модель. Описывает запись о голосе"""

    # --- Метаданные ---
    __tablename__ = 'votes'

    # --- Колонки таблицы ---
    id: Mapped[int] = mapped_column(primary_key=True)

    # --- Внешние ключи ---
    author_id: Mapped[int | None] = mapped_column(ForeignKey('users.id', ondelete='SET NULL'))
    voting_id: Mapped[int] = mapped_column(ForeignKey('votings.id', ondelete="CASCADE"))
    #question_id: Mapped[int] = mapped_column(ForeignKey('questions.id'), ondelete='CASCADE') TODO: Модель Question
    #option_id: Mapped[int] = mapped_column(ForeignKey('options.id'), ondelete='CASCADE') TODO: Модель Option
    voted_at: Mapped[timezone] = mapped_column(TIMESTAMP(timezone=True), default=datetime.now(timezone.utc))

    # --- ОРМ-связи ---
    author: Mapped["User"] = relationship(back_populates="votes_made", foreign_keys=[author_id])
    voting: Mapped["Voting"] = relationship(back_populates="votes")

    # TODO: Question-relationship
    # TODO: Option-relationship
