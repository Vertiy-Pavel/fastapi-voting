import logging

from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker

from src.fastapi_voting.app.core.settings import Settings


# --- Инициализация логирования и конфигурационного класса ---
logging.getLogger("fastapi-voting")
settings = Settings()

# --- Инициализация движка и фабрики сессий ---
engine = create_async_engine(settings.get_db_url(), echo=True)
AsyncSessionLocal = async_sessionmaker(engine, expire_on_commit=False)
