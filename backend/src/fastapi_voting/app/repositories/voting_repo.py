import logging

from sqlalchemy import select, update, and_, or_, func
from sqlalchemy.orm import aliased, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.models.voting import Voting
from src.fastapi_voting.app.models.user import User
from src.fastapi_voting.app.models.question import Question
from src.fastapi_voting.app.models.vote import Vote
from src.fastapi_voting.app.models.option import Option
from src.fastapi_voting.app.models.department import Department


from src.fastapi_voting.app.repositories.base_repo import Base


# --- Инструментарий ---
logger = logging.getLogger("fastapi-voting")
settings = get_settings()

# --- Репозиторий ---
class VotingRepo(Base):

    def __init__(self, session: AsyncSession):
        super().__init__(Voting, session)


    async def get_voting_by_id(self, voting_id: int):
        """Выполняет выборку указанного голосования"""

        query = select(Voting).where(
            and_(
                Voting.id == voting_id,
                Voting.deleted == False
            )
        )
        result = await self.session.execute(query)
        return result.scalars().all()


    async def delete(self, voting_id: int) -> None:
        """Выполняет мягкое удаление указанного голосования"""
        query = update(Voting).where(Voting.id == voting_id).values(deleted=True)
        await self.session.execute(query)
        await self.session.commit()


    async def create_voting(self, data: dict) -> bool:
        """Создаёт запись о голосовании"""

        # Выборка перечня указанных отделов
        query_deps = select(Department).where(Department.id.in_(data["departments"]))
        deps = await self.session.execute(query_deps)

        # Формирование записи о голосовании
        data["departments"] = deps.scalars().all()
        voting_instance = Voting(**data)

        self.session.add(voting_instance)
        await self.session.commit()
        return True

    async def available_votings(self, user_id: int, find: str | None, page: int, archived: bool) -> tuple:
        """Возвращает перечень доступных конкретному пользователю голосований"""

        # Формирование фильтрующего запроса
        creator = aliased(User)
        registered = aliased(User)
        users_of_deps = aliased(User)

        query = ((select(Voting, creator.id, creator.first_name, creator.last_name).
                 join(creator, Voting.creator).
                 outerjoin(registered, Voting.registered_users).
                 outerjoin(Department, Voting.departments).
                 outerjoin(users_of_deps, Department.users)
                 )
        .where(
            and_(
                Voting.archived == archived,
                Voting.deleted == False,
                or_(
                    creator.id == user_id,
                    registered.id == user_id,
                    users_of_deps.id == user_id,
                    Voting.public == True
                )
            )
        )).distinct()

        # --- Выборка по условию поиска ---
        if find:
            query = self.search_all(query=query, find=find)

        # --- Запрос на кол-во доступных записей ---
        total_count_query = select(func.count()).select_from(query.subquery())
        total_count = await self.session.execute(total_count_query)

        # --- Применение пагинации ---
        query = self.paginate(query, page)

        # --- Ответ ---
        result = await self.session.execute(query)
        return result.all(), total_count.scalar()


    async def get_data_voting(self, voting_id: int):
        """Возвращает подробности конкретного голосования."""

        query = (
            select(Voting).
            options(selectinload(Voting.registered_users)).
            options(selectinload(Voting.questions).selectinload(Question.options).selectinload(Option.votes).selectinload(Vote.author))
        ).where(Voting.id == voting_id)

        result = await self.session.execute(query)
        return result.scalars().one_or_none()
