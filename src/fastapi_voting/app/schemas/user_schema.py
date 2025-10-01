from pydantic import BaseModel

from typing import Optional


class InputUserSchema(BaseModel):
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str
    password: str

