from src.fastapi_voting.app.repositories.user_repo import UserRepo

from src.fastapi_voting.app.schemas.user_schema import InputUserSchema


class UserService:
    def __init__(self, user_repo: UserRepo):
        self.user_repo = user_repo


    async def register(self, data: InputUserSchema):
        """Отвечает за регистрацию нового пользователя"""

        # --- Инициализация и извлечение первичных данных ---
        user_data = data.model_dump()

        # --- Регистрация пользователя ---
        await self.user_repo.add_user(user_data)
