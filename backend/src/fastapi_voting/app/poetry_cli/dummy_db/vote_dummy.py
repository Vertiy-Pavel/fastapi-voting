from sqlalchemy import select
from sqlalchemy.orm import selectinload

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.models.user import User
from src.fastapi_voting.app.models.voting import Voting
from src.fastapi_voting.app.models.vote import Vote


async def get_fake_votes(session: AsyncSession, votings: list[Voting]):
    query = select(Voting).options(selectinload(Voting.registered_users))
    result = await session.execute(query)
    votings = result.scalars().all()

    for voting in votings:
        for user in voting.registered_users:
            vote = Vote(
                author_id=user.id,
                voting_id=voting.id,
            )
            session.add(vote)

    await session.flush()
