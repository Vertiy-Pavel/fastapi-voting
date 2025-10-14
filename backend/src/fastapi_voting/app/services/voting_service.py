from fastapi import HTTPException

from src.fastapi_voting.app.schemas.voting_schema import InputCreateVotingSchema

from src.fastapi_voting.app.repositories.voting_repo import VotingRepo

from src.fastapi_voting.app.models import Voting


class VotingService:

    def __init__(self, voting_repo: VotingRepo):
        self.voting_repo = voting_repo


    async def create_voting(self, voting_data: InputCreateVotingSchema) -> Voting:

        # --- Первичные данные ---
        data = voting_data.model_dump()

        # --- Работа репозитория ----
        voting = await self.voting_repo.add_instance(data)

        # --- Ответ сервиса ---
        return voting


    async def delete_voting(self, voting_id: int) -> bool:

        # --- Проверка на существование записи ---
        voting = await self.voting_repo.get_by_id(voting_id)
        if (voting is None) or (voting.deleted):
            raise HTTPException(status_code=404, detail="Голосования не существует")

        # --- Работа репозитория ----
        await self.voting_repo.delete(voting)

        # --- Ответ сервиса ---
        return True