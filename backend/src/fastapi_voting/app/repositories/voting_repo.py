from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.models.voting import Voting

from src.fastapi_voting.app.repositories.base_repo import Base


class VotingRepo(Base):

    def __init__(self, session: AsyncSession):
        super().__init__(Voting, session)


    async def delete(self, voting: Voting):
        voting.deleted = True
        self.session.add(voting)
        await self.session.commit()