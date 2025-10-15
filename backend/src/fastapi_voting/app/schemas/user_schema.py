from pydantic import BaseModel

from src.fastapi_voting.app.core.enums import RolesEnum


# --- Схемы для регистрации пользователя ---
class InputCreateUserSchema(BaseModel):
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str
    password: str
    role: str

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

class UserSchema(BaseModel):
    id: int
    first_name: str
    last_name: str
    surname: str
    phone: str
    email: str
    role: RolesEnum

    class Config:
        from_attributes = True



class ResponseLoginUserSchema(BaseModel):
    user: UserSchema
    access_token: str

    class Config:
        from_attributes = True

