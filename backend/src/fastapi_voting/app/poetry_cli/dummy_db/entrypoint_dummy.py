import asyncio
import typer

from alembic import command
from alembic.config import Config

from src.fastapi_voting.app.db.db_core import AsyncSessionLocal

from src.fastapi_voting.app.core.utils.paths import get_root_path

from src.fastapi_voting.app.poetry_cli.dummy_db import user_dummy,department_dummy


# --- Инициализация конфигураций ---
alembic_cfg = Config( str(get_root_path() / "alembic.ini") )
dummy_typer = typer.Typer()


# --- Точка входа ---
@dummy_typer.command()
def init() -> None:
    try:
        asyncio.run(init_db())
    except ValueError as e:
        print(f"Учтённый сценарий, логика выборки несовершенна. Перезапустите скрипт.\nException: {e}")

# --- Вторичные синхронные функции ---
def alembic_sync() -> None:
    command.downgrade(alembic_cfg, "base")
    command.upgrade(config=alembic_cfg, revision="head")


async def init_db() -> None:
    """Пересоздаёт таблицы и наполняет моковыми данными"""

    async with AsyncSessionLocal() as session:
        await asyncio.to_thread(alembic_sync)

        # --- Операции наполнения контентом ---
        session, users = await user_dummy.get_fake_users(session)
        session, departments = await department_dummy.get_fake_departments(session, users)

        await session.commit()

if __name__ == '__main__':
    asyncio.run(init_db())
