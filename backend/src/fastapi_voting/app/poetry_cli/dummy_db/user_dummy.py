import faker
import random

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.models.user import User

from src.fastapi_voting.app.core.enums import RolesEnum


# --- Инициализация первичных данных ---
faker = faker.Faker()
random = random.Random()


# --- Скрипты-генераторы ---
async def get_fake_users(session: AsyncSession) -> tuple:
    roles = list(RolesEnum)
    users = []

    for i in range(50):
        role_choice = random.choice(roles)
        user = User(
            first_name=faker.first_name(),
            last_name=faker.last_name(),
            surname=faker.first_name(),

            phone=faker.phone_number(),
            email=faker.email(),

            # TODO: votes_made

            role=role_choice,
        )
        user.set_hash_password(password="0000")
        users.append(user)

    session.add_all(users)

    return session, users