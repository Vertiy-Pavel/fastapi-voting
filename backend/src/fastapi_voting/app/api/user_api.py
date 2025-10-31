import logging

from datetime import datetime, timedelta, timezone

from fastapi import APIRouter, status, Request
from fastapi.params import Depends
from fastapi.responses import JSONResponse

from fastapi_csrf_protect import CsrfProtect

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.core.utils.utils import create_tokens
from src.fastapi_voting.app.di.annotations import (
    UserServiceAnnotation,

    RedisClientAnnotation,
    AccessRequiredAnnotation,
    RefreshRequiredAnnotation,
    CSRFValidAnnotation
)

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema, OutputCreateUserSchema
from src.fastapi_voting.app.schemas.user_schema import InputLoginUserSchema, ResponseLoginUserSchema, UserSchema
from src.fastapi_voting.app.schemas.user_schema import OutputRefreshUserSchema


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
    # --- Инициализация данных ---
    remember_flag = data.model_dump()["remember_me"]
    cookie_expire = datetime.now(timezone.utc) + timedelta(days=settings.JWT_REFRESH_EXPIRE_DAYS)

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
    response.set_cookie(key="refresh-token", value=tokens["refresh_token"], httponly=True, expires=cookie_expire)

    return response


# --- Выход из сессии ---
@user_router.post("/access-logout")
async def user_acs_logout(
        access_payload: AccessRequiredAnnotation,
        redis_client: RedisClientAnnotation,
):
    # --- Первичные данные и запись в БД ---
    jti = access_payload["jti"]
    ttl = access_payload["exp"]

    redis_client.set(
        name=f"jwt_block:{jti}",
        ex=ttl,
        value="1"
    )

    # --- Ответ ---
    return {"message": "access revoked"}


@user_router.post("/refresh-logout")
async def user_ref_logout(
        csrf_is_valid: CSRFValidAnnotation,
        refresh_payload: RefreshRequiredAnnotation,
        redis_client: RedisClientAnnotation,
):
    # --- Первичные данные и запись в БД ---
    jti = refresh_payload["jti"]
    ttl = refresh_payload["exp"]

    redis_client.set(
        name=f"jwt_block:{jti}",
        ex=ttl,
        value="1"
    )

    # --- Ответ ---
    return {"message": "refresh revoked"}


# --- Обновление сессии ---
@user_router.post("/refresh", response_model=OutputRefreshUserSchema)
async def user_refresh(
        csrf_is_valid: CSRFValidAnnotation,
        refresh_payload: RefreshRequiredAnnotation,
        csrf_protect: CsrfProtect = Depends(),
):
    # --- Первичные данные ---
    user_id = refresh_payload["user_id"]
    cookie_expire = datetime.now(timezone.utc) + timedelta(days=settings.JWT_REFRESH_EXPIRE_DAYS)

    # --- Генерация токенов ---
    tokens = create_tokens(user_id, refresh=True)
    csrf_token, signed_csrf = csrf_protect.generate_csrf_tokens(settings.CSRF_SECRET_KEY)

    # --- Формирование ответа ---
    content = {"access_token": tokens["access_token"]}

    response = JSONResponse(content=content)
    response.headers["X-CSRF-Token"] = csrf_token
    response.set_cookie(key="fastapi-csrf-token", value=signed_csrf, httponly=True, expires=cookie_expire)
    response.set_cookie(key="refresh-token", value=tokens["refresh_token"], httponly=True, expires=cookie_expire)

    # --- Ответ ---
    return response
