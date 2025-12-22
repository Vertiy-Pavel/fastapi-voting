from fastapi import APIRouter, Query, Header, status

from src.fastapi_voting.app.di.annotations import (
    VotingServiceAnnotation,
    AccessRequiredAnnotation,
)
from src.fastapi_voting.app.schemas.voting_schema import (
    InputCreateVotingSchema,
    InputDeleteVotingSchema,
    ResponseAllVotingsSchema,
    ResponseVotingDataSchema
)


# --- Конфигурация роутера ---
voting_router = APIRouter(
    prefix="/voting",
    tags=["Голосования"],
)


# --- Все доступные голосования ---
@voting_router.get(path="/all", response_model=ResponseAllVotingsSchema)
async def get_all_votings(
        access_payload: AccessRequiredAnnotation,

        voting_service: VotingServiceAnnotation,

        find: str = Query(default=None, description="Строковое условие поиска."),
        archived: bool = Query(default=False, description="Булево условие статуса голосования."),
        page: int = Query(default=1, description="Целочисленное значение текущей страницы для пагинации."),

        access_token: str = Header(default=None, description="JWT-токен"),
):
    response = await voting_service.get_all_votings(user_id=access_payload["sub"], page=page, find=find, archived=archived)
    return response


# --- Создать голосование ---
@voting_router.post(path="/create", status_code=status.HTTP_201_CREATED)
async def create_voting(
        access_payload: AccessRequiredAnnotation,

        voting_service: VotingServiceAnnotation,
        voting_data: InputCreateVotingSchema,

        access_token: str = Header(default=None, description="JWT-токен"),
):
    await voting_service.create_voting(voting_data=voting_data, creator_id=access_payload["sub"])
    return {"message": "success"}


# --- Удалить голосование ---
@voting_router.post(path="/delete")
async def delete_voting(
        access_payload: AccessRequiredAnnotation,

        voting_data: InputDeleteVotingSchema,
        voting_service: VotingServiceAnnotation,

        access_token: str = Header(default=None, description="JWT-токен"),
):
    await voting_service.delete_voting(voting_id=voting_data.id)
    return {"message": "success"}


# --- Детали голосования ---
@voting_router.get(path="/data/{voting_id}", response_model=ResponseVotingDataSchema)
async def get_voting_data(
        access_payload: AccessRequiredAnnotation,
        voting_service: VotingServiceAnnotation,

        voting_id: int,

        access_token: str = Header(default=None, description="JWT-токен."),
):
    res_data = await voting_service.get_data_voting(voting_id=voting_id)
    return res_data
