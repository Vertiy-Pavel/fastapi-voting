from pydantic import BaseModel

from typing import Optional


# --- Схемы для регистрации пользователя ---
class InputCreateUserSchema(BaseModel):
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str
    password: str

class OutputCreateUserSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str