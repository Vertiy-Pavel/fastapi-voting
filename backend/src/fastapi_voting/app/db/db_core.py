import logging

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.fastapi_voting.app.core.settings import get_settings


# --- Инициализация логирования и конфигурационного класса ---
logging.getLogger("fastapi-voting")
settings = get_settings()

# --- Инициализация движка и фабрики сессий ---
async_engine = create_async_engine(settings.get_db_url(), echo=True)
AsyncSessionLocal = async_sessionmaker(async_engine, expire_on_commit=False)
