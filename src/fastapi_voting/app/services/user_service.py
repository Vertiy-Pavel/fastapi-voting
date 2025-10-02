from fastapi import HTTPException

from src.fastapi_voting.app.repositories.user_repo import UserRepo

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema


class UserService:
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo


    async def register(self, data: InputCreateUserSchema):
        """Отвечает за регистрацию нового пользователя"""
        # TODO: Валидация почты и телефона
        # --- Инициализация и извлечение первичных данных ---
        user_data = data.model_dump()

        # --- Проверка на уникальность пользователя ---
        user_by_phone = await self.user_repo.get_by_item(column=self.user_repo.model.phone, item=user_data["phone"])
        user_by_email = await self.user_repo.get_by_item(column=self.user_repo.model.email, item=user_data["email"])

        if user_by_phone:
            raise HTTPException(status_code=409, detail="Пользователь с таким номером телефона уже существует")

        if user_by_email:
            raise HTTPException(status_code=409, detail="Пользователь с таким адресом электронной почты уже существует")

        # --- Регистрация пользователя ---
        result = await self.user_repo.add_user(user_data)

        # --- Формирование ответа ---
        return result