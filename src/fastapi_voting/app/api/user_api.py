from fastapi import APIRouter, Depends
from fastapi import Body

from src.fastapi_voting.app.di.annotations import UserServiceAnnotation
from src.fastapi_voting.app.services.user_service import UserService

from src.fastapi_voting.app.schemas.user_schema import InputUserSchema


# --- Конфигурация обработчика маршрутов, связанных с пользователями ---
user_router = APIRouter(
    prefix="/user",
    tags=["user"]
)

@user_router.post("/register")
async def user_register(
        user_service: UserServiceAnnotation,
        data: InputUserSchema
):
    await user_service.register(data)