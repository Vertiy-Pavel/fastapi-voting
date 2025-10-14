import logging

from fastapi import Depends

from src.fastapi_voting.app.services.voting_service import VotingService
from src.fastapi_voting.app.services.user_service import UserService
from src.fastapi_voting.app.services.department_service import DepartmentService

from src.fastapi_voting.app.repositories.user_repo import UserRepo
from src.fastapi_voting.app.repositories.department_repo import DepartmentRepo
from src.fastapi_voting.app.repositories.voting_repo import VotingRepo

from src.fastapi_voting.app.di.dependencies.repositories_di import (
    get_user_repo,
    get_department_repo,
    get_voting_repo
)


# --- Инициализация первичных данных ---
logger = logging.Logger("fastapi-voting")


# --- Определение зависимостей ---
async def get_user_service(repo: UserRepo = Depends(get_user_repo)):
    return UserService(repo)

async def get_department_service(repo: DepartmentRepo = Depends(get_department_repo)):
    return DepartmentService(repo)

async def get_voting_service(repo: VotingRepo = Depends(get_voting_repo)):
    return VotingService(repo)