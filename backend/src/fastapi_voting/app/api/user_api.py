import logging

from datetime import timedelta

from fastapi import APIRouter, status
from fastapi.params import Depends
from fastapi.responses import JSONResponse

from fastapi_csrf_protect import CsrfProtect

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.core.utils.utils import create_tokens
from src.fastapi_voting.app.di.annotations import UserServiceAnnotation

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema, OutputCreateUserSchema
from src.fastapi_voting.app.schemas.user_schema import InputLoginUserSchema, ResponseLoginUserSchema, UserSchema


# --- Инициализация первичных данных и вспомогательных инструментов---
logger = logging.getLogger("fastapi-voting")
settings = get_settings()


# --- Конфигурация обработчика маршрутов, связанных с пользователями ---
user_router = APIRouter(
    prefix="/user",
    tags=["user"]
)


# --- Регистрация пользователя ---
@user_router.post("/register", response_model=OutputCreateUserSchema)
async def user_register(
        data: InputCreateUserSchema,
        user_service: UserServiceAnnotation
):
    registered_user = await user_service.register(data)
    return registered_user


# --- Авторизация пользователя ---
@user_router.post("/login", response_model=ResponseLoginUserSchema)
async def user_login(
        data: InputLoginUserSchema,
        user_service: UserServiceAnnotation,
        csrf_protect: CsrfProtect = Depends(),
):
    # TODO: JWT-blocklist

    # --- Инициализация данных ---
    remember_flag = data.model_dump()["remember_me"]
    cookie_expire = timedelta(days=settings.JWT_REFRESH_EXPIRE_DAYS)

    # --- Работа сервиса ---
    logined_user = await user_service.login(data)

    # --- Генерация токенов ---
    tokens = create_tokens(logined_user.id, remember_flag)
    csrf_token, signed_csrf = csrf_protect.generate_csrf_tokens()

    # --- Формирование ответа сервера ---
    content: dict = ResponseLoginUserSchema(
        user=UserSchema.model_validate(logined_user),
        access_token=tokens["access_token"]
    ).model_dump(mode="json")

    response = JSONResponse(content=content)
    response.headers["X-CSRF-Token"] = csrf_token
    response.set_cookie(key="fastapi-csrf-token", value=signed_csrf, httponly=True, expires=cookie_expire)
    response.set_cookie(key="refresh_token", value=tokens["refresh_token"], httponly=True, expires=cookie_expire)

    return response