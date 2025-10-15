import logging

from fastapi import HTTPException

from src.fastapi_voting.app.repositories.user_repo import UserRepo

from src.fastapi_voting.app.schemas.user_schema import (
    InputCreateUserSchema, InputLoginUserSchema,
)

from src.fastapi_voting.app.models.user import User

from src.fastapi_voting.app.core.enums import RolesEnum


logger = logging.getLogger("fastapi-voting")


class UserService:
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo


    async def register(self, data: InputCreateUserSchema) -> User:
        """Отвечает за регистрацию нового пользователя"""

        # --- Инициализация и извлечение первичных данных ---
        user_data: dict = data.model_dump()
        user_data['role'] = RolesEnum(user_data['role'])

        # --- Проверка на уникальность пользователя ---
        user_by_phone: User = await self.user_repo.get_by_item(column=self.user_repo.model.phone, item=user_data["phone"])
        user_by_email: User = await self.user_repo.get_by_item(column=self.user_repo.model.email, item=user_data["email"])

        if user_by_phone:
            logger.debug(f"Пользователь с номером телефона <{user_data['phone']}> уже существует")
            raise HTTPException(status_code=401, detail="Некорректные почта или телефон")

        if user_by_email:
            logger.debug(f"Пользователь с таким адресом электронной почты <{user_data['email']}> уже существует")
            raise HTTPException(status_code=401, detail="Некорректные почта или телефон")

        # --- Регистрация пользователя ---
        result: User = await self.user_repo.add_user(user_data)

        # --- Формирование ответа ---
        return result


    async def login(self, data: InputLoginUserSchema) -> User:
        """Отвечает за авторизацию пользователя"""

        # --- Инициализация и извлечение первичных данных ---
        data: dict = data.model_dump()

        # --- Проверки на существование пользователя и корректность пароля ---
        user_by_email: User = await self.user_repo.get_by_item(column=self.user_repo.model.email, item=data["email"])
        if not user_by_email:
            logger.debug(f"Пользователя с почтой <{data['email']}> не существует")
            raise HTTPException(status_code=401, detail="Неверные учётные данные")

        current_password_is_valid: bool = user_by_email.verify_password(password=data["password"])
        if not current_password_is_valid:
            logger.debug(f"Введён неверный пароль для пользователя с ID {user_by_email.id}")
            raise HTTPException(status_code=401, detail=f"Неверные учётные данные")

        # --- Формирование ответа ---
        return user_by_email