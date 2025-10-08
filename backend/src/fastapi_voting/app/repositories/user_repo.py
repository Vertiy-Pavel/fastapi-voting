from sqlalchemy import select

from src.fastapi_voting.app.repositories.base_repo import Base

from src.fastapi_voting.app.models.user import User

from src.fastapi_voting.app.schemas.user_schema import InputCreateUserSchema


class UserRepo(Base):

    def __init__(self, session):
        super().__init__(User, session)

    async def add_user(self, data: dict) -> User:
        password = data.pop("password")
        user = User(**data)
        user.set_hash_password(password)

        self.session.add(user)
        await self.session.commit()

        return user



