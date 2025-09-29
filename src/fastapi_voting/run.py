import logging
import uvicorn

from src.fastapi_voting.app.main import fastapi_app
from src.fastapi_voting.app.core.settings import Settings

from src.fastapi_voting.app.core.log_config import LogSetup

# --- Инициализация логирования и конфигурационного файла---
LogSetup()
logger = logging.getLogger('fastapi-voting')

settings = Settings()


def main():
    logger.info("Запуск приложения fastapi-voting")

    uvicorn.run(
        fastapi_app,
        host=settings.APP_HOST,
        port=settings.APP_PORT,
    )


# --- Точка входа в приложение ---
if __name__ == '__main__':
    main()