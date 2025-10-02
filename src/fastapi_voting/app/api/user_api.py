from fastapi import APIRouter, Depends
from fastapi import Body

from src.fastapi_voting.app.di.annotations import UserServiceAnnotation
from src.fastapi_voting.app.services.user_service import UserService

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema, OutputCreateUserSchema


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
    # TODO: Контроль сессий с помощью JWT
    registered_user = await user_service.register(data)
    return registered_user