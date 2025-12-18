from sqlalchemy import select, update


from src.fastapi_voting.app.repositories.base_repo import Base
from src.fastapi_voting.app.repositories.department_repo import Department

from src.fastapi_voting.app.models.user import User


class UserRepo(Base):

    def __init__(self, session):
        super().__init__(User, session)

    async def add_user(self, data: dict) -> User:
        """Вносит запись о новом пользователе"""

        # Работа с первичными данными
        password = data.pop("password")
        dep_ids = data.pop("departments")

        # Выборка связанных отделов
        deps_query = select(Department).where(Department.id.in_(dep_ids))
        deps = await self.session.execute(deps_query)
        data["departments"] = deps.scalars().all()

        # Формирование записи о пользователе
        user = self.model(**data)
        user.set_hash_password(password)

        self.session.add(user)
        await self.session.commit()

        return user


    async def change_credentials(self, data: dict, id: int) -> User:

        # --- Формирование и исполнение запроса ---
        query = update(self.model).where(self.model.id == id).values(**data)
        await self.session.execute(query)
        await self.session.commit()

        # --- Формирование и исполнение запроса на данные обновлённого пользователя ---
        user = await self.session.get(self.model, id)

        # --- Результат ---
        return user


    async def change_email(self, id: int, email: str) -> bool:
        query = update(self.model).where(self.model.id == id).values(email=email)
        await self.session.execute(query)
        await self.session.commit()
        return True


    async def change_password(self, password: str, id: int):
        user = await self.session.get(self.model, id)
        user.set_hash_password(password)

        self.session.add(user)
        await self.session.commit()

        return True