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
    role_id: int

class OutputCreateUserSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str

    class Config:
        from_attributes = True


# --- Схемы для авторизации пользователя ---
class InputLoginUserSchema(BaseModel):
    email: str
    password: str
    remember_me: bool

class OutputLoginUserSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str
    role_id: int

    class Config:
        from_attributes = True

class TokenDetails(BaseModel):
    access_token: str
    refresh_token: str | None


class LoginResponseSchema(BaseModel):
    user: OutputLoginUserSchema
    tokens: TokenDetails


