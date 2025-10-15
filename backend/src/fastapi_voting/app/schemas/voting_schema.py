from datetime import datetime

from pydantic import BaseModel


# --- Схемы для создания голосования ---
class InputCreateVotingSchema(BaseModel):
    title: str
    theme: str
    public: bool
    quorum: int

    registration_start: datetime
    registration_end: datetime

    voting_start: datetime
    voting_end: datetime

    archived: bool
    archive_after: datetime

    deleted: bool


class ResponseCreateVotingSchema(BaseModel):
    id: int
    title: str
    theme: str
    public: bool
    quorum: int

    registration_start: datetime
    registration_end: datetime

    voting_start: datetime
    voting_end: datetime

    archived: bool
    archive_after: datetime

    deleted: bool

    class Config:
        from_attributes = True