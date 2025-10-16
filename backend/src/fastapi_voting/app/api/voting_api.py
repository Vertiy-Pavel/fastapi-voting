from fastapi import APIRouter, Depends, Request

from fastapi_csrf_protect import CsrfProtect

from src.fastapi_voting.app.di.annotations import (
    VotingServiceAnnotation,
    AccessRequiredAnnotation,
    CSRFValidAnnotation
)
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
        user_id: AccessRequiredAnnotation,
        csrf_is_valid: CSRFValidAnnotation,

        voting_service: VotingServiceAnnotation,
        voting_data: InputCreateVotingSchema,
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