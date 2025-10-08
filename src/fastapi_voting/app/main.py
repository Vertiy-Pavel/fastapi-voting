from fastapi import FastAPI
from logging import getLogger

from src.fastapi_voting.app.api.user_api import user_router
from src.fastapi_voting.app.api.department_api import department_router


# --- Создание логера и приложения FastApi ---
logger = getLogger('fastapi-voting')

fastapi_app = FastAPI(
    title='FastAPI-Voting',
    version='1.0',
    description='FastAPI-Voting',
    docs_url='/docs',
    redoc_url='/redoc',
)
v1_url_prefix = '/api/v1'

# --- Регистрация обработчиков маршрутов ---
fastapi_app.include_router(router=user_router, prefix=v1_url_prefix)
fastapi_app.include_router(router=department_router, prefix=v1_url_prefix)
