import logging

from sqlalchemy import select, and_, or_, func
from sqlalchemy.orm import aliased, selectinload
from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.models.voting import Voting
from src.fastapi_voting.app.models.user import User
from src.fastapi_voting.app.models import Question

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


    async def delete(self, voting: Voting) -> None:
        """Выполняет мягкое удаление указанного голосования"""
        voting.deleted = True
        self.session.add(voting)
        await self.session.commit()


    async def available_votings(self, user_id: int, find: str | None, page: int, archived: bool) -> tuple:
        """Возвращает перечень доступных конкретному пользователю голосований"""

        # Формирование фильтрующего запроса
        creator = aliased(User)
        registered = aliased(User)

        query = select(Voting, creator.id, creator.first_name, creator.last_name).join(creator, Voting.creator).outerjoin(registered, Voting.registered_users).where(
            and_(
                Voting.deleted == False,
                Voting.archived == archived,
                or_(
                    creator.id == user_id,
                    registered.id == user_id,
                    Voting.public == True
                 )
            )
        ).distinct()

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
            select(Voting)
            .options(selectinload(Voting.questions).selectinload(Question.options))
            .options(selectinload(Voting.registered_users))
            .where(Voting.id == voting_id)
            )

        result = await self.session.execute(query)
        return result.scalars().one()
