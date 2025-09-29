import logging
import uvicorn

from src.fastapi_voting.app.main import fastapi_app
from src.fastapi_voting.app.core.settings import Settings


# --- Инициализация логирования и конфигурационного файла---
logger = logging.getLogger('fastapi-voting')
settings = Settings()


# --- Точка входа в приложение ---
if __name__ == '__main__':
    uvicorn.run(
        fastapi_app,
        host=settings.APP_HOST,
        port=settings.APP_PORT
    )