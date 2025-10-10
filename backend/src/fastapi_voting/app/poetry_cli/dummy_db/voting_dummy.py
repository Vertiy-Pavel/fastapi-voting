import logging

import random
import faker

from sqlalchemy.ext.asyncio import AsyncSession

from datetime import datetime, timedelta

from src.fastapi_voting.app.core.enums import RolesEnum

from src.fastapi_voting.app.models.voting import Voting
from src.fastapi_voting.app.models.department import Department
from src.fastapi_voting.app.models.user import User
from src.fastapi_voting.app.models.vote import Vote


# --- Внешние инструменты ---
logger = logging.getLogger("fastapi-voting")
faker = faker.Faker()


async def get_fake_votings(session: AsyncSession, users: list[User], departments: set[Department]) -> tuple[AsyncSession, list[Voting]]: # TODO: Votes
    """Генерирует комплекс фейковых голосований"""

    # --- Вспомогательные инструменты ---
    def get_users_of_deps(deps: list[Department]) -> set[User]:
        """Формирует перечень уникальных пользователей, содержащихся в списке отделов"""
        result = set()
        for dep in deps:
            result.update(dep.users)
        return result

    # --- Инициализация вспомогательных данных---
    votings = []
    chiefs = {u for u in users if u.role == RolesEnum.CHIEF}
    employees = {u for u in users if u.role == RolesEnum.EMPLOYEE}

    # --- Генерация голосований ---
    for _ in range(40):

        # --- Выборка отделов, для которых будет доступно голосование ---
        target_departments = random.sample(list(departments), random.randint(1, len(departments)))

        # --- Выборка пользователей для голосования ---
        creator: User = random.choice(target_departments).head_of_department
        available_users = get_users_of_deps(target_departments)
        registered_users = random.sample(
            list(available_users),
            random.randint(1, len(available_users))
        )

        # --- Временные метки и остальные аргументы ---
        reg_start = faker.future_datetime("+1m")
        reg_end = timedelta(days=random.randint(1, 7)) + reg_start

        voting_start = timedelta(weeks=random.randint(1, 4)) + reg_end
        voting_end = timedelta(days=random.randint(1, 7)) + voting_start

        archived: bool = faker.boolean()
        archive_after = timedelta(days=7) + voting_end if archived else None

        # --- Создание голосования ---
        voting = Voting(
            title=faker.name(),
            theme=faker.text(),
            public=faker.boolean(),
            quorum=faker.pyint(min_value=1),

            registration_start=reg_start,
            registration_end=reg_end,

            voting_start=voting_start,
            voting_end=voting_end,

            archived=archived,
            archive_after=archive_after,

            creator=creator,
            #TODO: Votes
            departments=target_departments,
            registered_users=registered_users,
        )
        votings.append(voting)

    session.add_all(votings)

    return session, votings