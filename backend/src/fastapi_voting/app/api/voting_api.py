from fastapi import APIRouter, Depends, Request

from src.fastapi_voting.app.di.annotations import (
    VotingServiceAnnotation,
    AccessRequiredAnnotation,
    CSRFValidAnnotation
)
from src.fastapi_voting.app.schemas.voting_schema import (
    InputCreateVotingSchema, ResponseCreateVotingSchema, InputDeleteVotingSchema
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
        csrf_is_valid: CSRFValidAnnotation,
        user_id: AccessRequiredAnnotation,

        voting_service: VotingServiceAnnotation,
        voting_data: InputCreateVotingSchema,
):
    # --- Работа сервиса ---
    result = await voting_service.create_voting(voting_data)

    # --- Ответ ---
    return result


@voting_router.post(path="/delete")
async def delete_voting(
        csrf_is_valid: CSRFValidAnnotation,
        user_id: AccessRequiredAnnotation,

        voting_data: InputDeleteVotingSchema,
        voting_service: VotingServiceAnnotation,
):
    # --- Извлечение данных запроса ---
    voting_id = voting_data.model_dump()["id"]

    # --- Работа сервиса ---
    await voting_service.delete_voting(voting_id)

    # --- Ответ ---
    return {"message": "success"}