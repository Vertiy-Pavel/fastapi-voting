from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """ORM-модель. Описывает родительский класс для всех остальных"""

    # --- Метаданные ---
    __abstract__ = True

