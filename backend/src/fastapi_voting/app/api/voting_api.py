from fastapi import APIRouter, Depends

from src.fastapi_voting.app.di.dependencies.auth_di import AuthTokenRequired

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


@voting_router.post(path="/create", response_model=ResponseCreateVotingSchema)
async def create_voting(
        voting_service: VotingServiceAnnotation,
        voting_data: InputCreateVotingSchema,
        user_id: int = Depends(AuthTokenRequired("access_token"))
):
    # --- Работа сервиса ---
    result = await voting_service.create_voting(voting_data)

    # --- Ответ ---
    return result


@voting_router.delete(path="/delete/{voting_id}")
async def delete_voting(
        voting_id: int,
        voting_service: VotingServiceAnnotation,
):
    # --- Работа сервиса ---
    await voting_service.delete_voting(voting_id)

    # --- Ответ ---
    return {"message": "success"}