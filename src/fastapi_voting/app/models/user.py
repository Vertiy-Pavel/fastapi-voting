import argon2

from sqlalchemy import ForeignKey, String, BINARY
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

    password_hash: Mapped[str] = mapped_column(String(255))
    is_email_verified: Mapped[bool] = mapped_column(default=False)

    # --- ORM-связи  ---
    # ...

    def set_hash_password(self, password: str) -> None:
        ph = argon2.PasswordHasher()
        self.password_hash = ph.hash(password)

    def verify_password(self, password: str) -> bool:
        ph = argon2.PasswordHasher()
        return ph.verify(self.password_hash, password)