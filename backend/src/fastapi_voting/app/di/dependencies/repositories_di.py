import logging

from fastapi import Depends

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.di.dependencies.databases_di import get_db

from src.fastapi_voting.app.repositories.user_repo import UserRepo
from src.fastapi_voting.app.repositories.department_repo import DepartmentRepo


# --- Инициализация первичных данных ---
logger = logging.Logger("fastapi-voting")


# --- Определение зависимостей ---
async def get_user_repo(db: AsyncSession = Depends(get_db)):
    return UserRepo(db)

async def get_department_repo(db: AsyncSession = Depends(get_db)):
    return DepartmentRepo(db)