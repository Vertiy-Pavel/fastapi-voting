from typing import List

from pydantic import BaseModel
from pydantic.types import datetime


# --- Схемы для выгрузки всех отделов ---
class ResponseAllDepartmentsSchema(BaseModel):
    id: int
    name: str
    parent_id: int | None

ResponseAllDepartmentsSchema.model_rebuild()