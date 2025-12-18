from uuid import UUID

from fastapi import APIRouter, status, Header, Depends

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.di.annotations import (
    AccessRequiredAnnotation,
)
# from src.fastapi_voting.app.schemas.vote_schema

# --- Инструментарий и обработчик ---
settings = get_settings()

vote_router = APIRouter(
    prefix="/votes",
    tags=["Работа с голосами"]
)

# Отдать голос
@vote_router.post("/create")
async def create_vote():
    pass