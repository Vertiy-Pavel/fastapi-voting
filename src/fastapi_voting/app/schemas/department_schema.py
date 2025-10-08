from typing import List

from pydantic import BaseModel
from pydantic.types import datetime


# --- Схемы для выгрузки всех отделов ---
class ResponseAllDepartmentsSchema(BaseModel):
    id: int
    name: str
    description: str
    location: str
    parent_id: int | None

    created_at: datetime
    updated_at: datetime

    children: List['ResponseAllDepartmentsSchema']


ResponseAllDepartmentsSchema.model_rebuild()