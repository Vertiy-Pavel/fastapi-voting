from fastapi import APIRouter

from fastapi_voting.app.core.utils import create_tokens
from src.fastapi_voting.app.di.annotations import UserServiceAnnotation

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema, OutputCreateUserSchema
from src.fastapi_voting.app.schemas.user_schema import InputLoginUserSchema, LoginResponseSchema


# --- Конфигурация обработчика маршрутов, связанных с пользователями ---
user_router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@user_router.post("/register", response_model=OutputCreateUserSchema)
async def user_register(
        data: InputCreateUserSchema,
        user_service: UserServiceAnnotation
):
    registered_user = await user_service.register(data)
    return registered_user


@user_router.post("/login", response_model=LoginResponseSchema)
async def user_login(
        data: InputLoginUserSchema,
        user_service: UserServiceAnnotation
):
    # TODO: Контроль сессий с помощью JWT
    # --- Инициализация данных ---
    remember_flag: bool = data.model_dump().get("remember_me", False)

    # --- Работа сервиса ---
    logined_user = await user_service.login(data)

    # --- Формирование ответа сервера ---
    response = {
        "user": logined_user,
        "tokens": create_tokens(user_id=logined_user.id, refresh=remember_flag)
    }
    return response