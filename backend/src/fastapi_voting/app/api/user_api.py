from fastapi import APIRouter
from fastapi.params import Depends
from fastapi.responses import JSONResponse

from fastapi_csrf_protect import CsrfProtect

from src.fastapi_voting.app.core.utils.utils import create_tokens
from src.fastapi_voting.app.di.annotations import UserServiceAnnotation

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema, OutputCreateUserSchema
from src.fastapi_voting.app.schemas.user_schema import InputLoginUserSchema, ResponseLoginUserSchema, UserSchema
from src.fastapi_voting.app.schemas.user_schema import TokenSchema


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


@user_router.post("/login", response_model=ResponseLoginUserSchema)
async def user_login(
        data: InputLoginUserSchema,
        user_service: UserServiceAnnotation,
        csrf_protect: CsrfProtect = Depends(),
):
    # --- Инициализация данных ---
    remember_flag = data.model_dump().get("remember", False)

    # --- Работа сервиса ---
    logined_user = await user_service.login(data)

    # --- Генерация токенов ---
    tokens = create_tokens(logined_user.id, remember_flag)
    csrf_token, signed_token = csrf_protect.generate_csrf_tokens()

    # --- Формирование ответа сервера ---
    content: dict = ResponseLoginUserSchema(
        user=UserSchema.model_validate(logined_user),
        tokens=TokenSchema(
            access_token=tokens['access_token'],
            csrf_token=signed_token,
        ),
    ).model_dump(mode="json")

    response = JSONResponse(content=content)
    response.set_cookie(key="csrf_token", value=csrf_token, httponly=True)
    response.set_cookie(key="refresh_token", value=tokens["refresh_token"], httponly=True)

    return response