from sqlalchemy import ForeignKey, String
from sqlalchemy.orm import Mapped, mapped_column

from src.fastapi_voting.app.models.base import Base


class User(Base):
    __tablename__ = "users"

    # --- Столбцы таблицы ---
    first_name: Mapped[str] = mapped_column(String(255))
    last_name: Mapped[str] = mapped_column(String(255))
    surname: Mapped[str | None] = mapped_column(String(255))

    phone: Mapped[str] = mapped_column(String(25), unique=True)
    email: Mapped[str] = mapped_column(String(120), unique=True)

    password_hash: Mapped[str] = mapped_column(String(256))
    is_email_verified: Mapped[bool] = mapped_column(default=False)

    # --- ORM-связи  ---
    # ...

