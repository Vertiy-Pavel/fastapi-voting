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