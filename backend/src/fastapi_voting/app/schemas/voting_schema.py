from datetime import datetime

from pydantic import BaseModel, conlist

from src.fastapi_voting.app.core.enums import QuestionTypeEnum


# --- Общая схема со всеми полями ---
class VotingSchema(BaseModel):
    id: int
    title: str
    theme: str
    public: bool
    quorum: int

    registration_start: datetime
    registration_end: datetime

    voting_start: datetime
    voting_end: datetime

    class Config:
        from_attributes = True


# --- Схемы для создания голосования ---
class CreateVotingOptionSchema(BaseModel):
    option: str

class CreateVotingQuestionSchema(BaseModel):
    type: QuestionTypeEnum
    title: str
    options: conlist(CreateVotingOptionSchema, min_length=1)

class InputCreateVotingSchema(BaseModel):
    title: str
    theme: str
    public: bool
    quorum: int

    registration_start: datetime
    registration_end: datetime

    voting_start: datetime
    voting_end: datetime
    questions: conlist(CreateVotingQuestionSchema, min_length=1)


# --- Схема для удаления голосования ---
class InputDeleteVotingSchema(BaseModel):
    id: int


# --- Схема для отображения всех голосований ---
class OutputAllVotingsSchema(BaseModel):
    voting: VotingSchema

    creator_id: int
    creator_first_name: str
    creator_last_name: str

    class Config:
        from_attributes = True

class ResponseAllVotingsSchema(BaseModel):
    items: list[OutputAllVotingsSchema]
    pagination: dict[str, bool | int]


# --- Схема для деталей голосования ---
class RegisteredUsersVotingDataSchema(BaseModel):
    id: int
    first_name: str
    last_name: str

    class Config:
        from_attributes = True

class OptionsVotingDataSchema(BaseModel):
    id: int
    option: str

    class Config:
        from_attributes = True

class RegisteredQuestionsVotingDataSchema(BaseModel):
    id: int
    type: QuestionTypeEnum
    title: str
    options: list[OptionsVotingDataSchema]

    class Config:
        from_attributes = True


class InputVotingDataSchema(BaseModel):
    id: int

class ResponseVotingDataSchema(BaseModel):
    registered_users: list[RegisteredUsersVotingDataSchema]
    questions: list[RegisteredQuestionsVotingDataSchema]
    # TODO: voting_results: OptionsVotingDataSchema
    # TODO: Статистика регистрации/голосов