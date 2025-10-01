from fastapi import Depends, HTTPException, status

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.db.db_core import AsyncSessionLocal

from src.fastapi_voting.app.repositories.user_repo import UserRepo

from src.fastapi_voting.app.services.user_service import UserService


# --- Создание сессии с MySQL --
async def get_db() -> AsyncSession:
        async with AsyncSessionLocal() as session:
            yield session
            await session.close()


# --- Зависимости-репозитории ---
async def get_user_repo(db: AsyncSession = Depends(get_db)):
    return UserRepo(db)


# --- Зависимости-сервисы ---
async def get_user_service(repo: UserRepo = Depends(get_user_repo)):
    return UserService(repo)