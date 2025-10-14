from fastapi import APIRouter

from src.fastapi_voting.app.di.annotations import VotingServiceAnnotation

from src.fastapi_voting.app.schemas.voting_schema import (
    InputCreateVotingSchema, ResponseCreateVotingSchema
)


# --- Конфигурация роутера ---
voting_router = APIRouter(
    prefix="/voting",
    tags=["voting"],
)

# --- Обработчики ---
@voting_router.get(path="/all")
async def get_all_votings(
        voting_service: VotingServiceAnnotation
):
    # TODO: Список голосований
    pass


@voting_router.post(path="/", response_model=ResponseCreateVotingSchema)
async def create_voting(
        voting_service: VotingServiceAnnotation,
        voting_data: InputCreateVotingSchema
):
    # --- Работа сервиса ---
    result = await voting_service.create_voting(voting_data)

    # --- Ответ ---
    return result