from sqlalchemy import select, text

from sqlalchemy.ext.asyncio import AsyncSession


class Base:
    def __init__(self, model, session: AsyncSession):
        self.session = session
        self.model = model


    async def get_all(self):
        pass

    async def get_by_id(self, id: int):
        return self.session.get(self.model, id)

    async def get_by_item(self, column, item: any):
        query = select(self.model).where(column == item)
        result = await self.session.execute(query)
        return result.scalars().first()

