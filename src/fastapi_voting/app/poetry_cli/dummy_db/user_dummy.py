import asyncio
import typer

from sqlalchemy import select

from alembic import command
from alembic.config import Config

from src.fastapi_voting.app.db.db_core import async_engine


from src.fastapi_voting.app.models.base import Base
from src.fastapi_voting.app.models import user, voting

from src.fastapi_voting.app.core.utils.paths import get_root_path


# --- Инициализация конфигураций ---
alembic_cfg = Config( str(get_root_path() / "alembic.ini") )
dummy_typer = typer.Typer()


# --- Точка входа ---
@dummy_typer.command()
def init() -> None:
    asyncio.run(init_db())


# --- Вторичные синхронные функции ---
def alembic_sync() -> None:
    command.downgrade(alembic_cfg, "base")
    command.upgrade(config=alembic_cfg, revision="head")


async def init_db() -> None:
    """Пересоздаёт таблицы и наполняет моковыми данными"""

    async with async_engine.begin() as conn:
        await asyncio.to_thread(alembic_sync)

        # --- Операции наполнения контентом ---



if __name__ == '__main__':
    asyncio.run(init_db())
