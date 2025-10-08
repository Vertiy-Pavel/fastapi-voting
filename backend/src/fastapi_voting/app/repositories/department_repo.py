from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from src.fastapi_voting.app.repositories.base_repo import Base

from src.fastapi_voting.app.models.department import Department


class DepartmentRepo(Base):

    def __init__(self, session: AsyncSession):
        super().__init__(Department, session)


    async def get_all_departments(self):
        query = select(Department).options(selectinload(self.model.children))
        result = await self.session.execute(query)
        return result.scalars().all()
