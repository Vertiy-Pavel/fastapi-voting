from pydantic_settings import BaseSettings

from src.fastapi_voting.app.core.utils import get_root_path


class Settings(BaseSettings):

    # --- Конфигурация приложения ---
    JWT_SECRET_KEY: str
    JWT_ACCESS_EXPIRE_MINUTES: int
    Jwt_REFRESH_EXPIRE_DAYS: int

    APP_HOST: str
    APP_PORT: int

    # --- Конфигурация данных БД ---
    DB_HOST: str
    DB_PORT: str

    DB_USER: str
    DB_PASSWORD: str
    DB_NAME: str


    class Config:
        env_file = get_root_path() / ".env"

    def get_db_url(self) -> str:
        return f"mysql+asyncmy://{self.DB_USER}:{self.DB_PASSWORD}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"

