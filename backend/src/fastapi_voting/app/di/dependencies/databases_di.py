import logging

from redis.asyncio import Redis

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.db.db_core import AsyncSessionLocal
from src.fastapi_voting.app.core.settings import get_settings


# --- Инструментарий ---
logger = logging.Logger("fastapi-voting")
settings = get_settings()


# --- Определение зависимостей ---
async def get_db() -> AsyncSession:
    async with AsyncSessionLocal() as session:
        yield session
        await session.close()


async def get_redis() -> Redis:
    redis_client = Redis.from_url(settings.get_redis_url())
    return redis_client