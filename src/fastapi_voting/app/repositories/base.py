from sqlalchemy.ext.asyncio import AsyncSession


class Base:
    def __init__(self, model, session: AsyncSession):
        self.session = session
        self.model = model


    async def get_all(self):
        pass

    async def get_by_id(self):
        pass