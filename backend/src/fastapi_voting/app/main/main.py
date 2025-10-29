from fastapi import FastAPI
from logging import getLogger

from src.fastapi_voting.app.main.middlewares import setup_middlewares

from src.fastapi_voting.app.api.user_api import user_router
from src.fastapi_voting.app.api.department_api import department_router
from src.fastapi_voting.app.api.voting_api import voting_router


# --- Создание логера и приложения FastApi ---
logger = getLogger('fastapi-voting')

# ---Инициализация приложения ---
fastapi_app = FastAPI(
    title='FastAPI-Voting',
    version='1.0',
    description='FastAPI-Voting',
    docs_url='/docs',
    redoc_url='/redoc',
)

# --- регистрация промежуточных обработчиков ---
setup_middlewares(fastapi_app)

# --- Вторичные данные ---
v1_url_prefix = '/api/v1'

# --- Регистрация обработчиков маршрутов ---
fastapi_app.include_router(router=user_router, prefix=v1_url_prefix)
fastapi_app.include_router(router=department_router, prefix=v1_url_prefix)
fastapi_app.include_router(router=voting_router, prefix=v1_url_prefix)
