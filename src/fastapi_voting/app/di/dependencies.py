import logging

from jose import jwt, JWTError

from fastapi import Depends, status
from fastapi.exceptions import HTTPException
from fastapi.security import OAuth2PasswordBearer

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.db.db_core import AsyncSessionLocal

from src.fastapi_voting.app.repositories.user_repo import UserRepo

from src.fastapi_voting.app.services.user_service import UserService

from src.fastapi_voting.app.core.settings import Settings


# --- Определение первичных конфигураций ---
logger = logging.getLogger("fastapi-voting")
settings = Settings()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/login")


# --- Создание сессии с MySQL --
async def get_db() -> AsyncSession:
        async with AsyncSessionLocal() as session:
            yield session
            await session.close()


# --- Работа с JWT ---
async def get_encode_jwt(token: str = Depends(oauth2_scheme)) -> int:
    """Декодирует токен, извлекая и возвращая id пользователя"""
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=["HS256"])
        user_id = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Некорректный JWT-токен")

    except JWTError as e:
        logger.error(e)
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Некорректный JWT-токен", headers={"WWW-Authenticate": "Bearer"})

    return user_id


# --- Зависимости-репозитории ---
async def get_user_repo(db: AsyncSession = Depends(get_db)):
    return UserRepo(db)


# --- Зависимости-сервисы ---
async def get_user_service(repo: UserRepo = Depends(get_user_repo)):
    return UserService(repo)