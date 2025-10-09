import logging
import uvicorn

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.core.log_config import LogSetup

# --- Инициализация логирования и конфигурационного файла---
LogSetup()
logger = logging.getLogger('fastapi-voting')

settings = get_settings()


def main(reload: bool = False, host: str = settings.APP_HOST):
    logger.info("Запуск приложения fastapi-voting")

    uvicorn.run(
        "src.fastapi_voting.app.main:fastapi_app",
        host=host,
        port=settings.APP_PORT,

        reload=reload,
        reload_dirs=["src/"],
        reload_excludes=["*.log", "*.tmp", "__pycache__"]
    )


# --- Точка входа в приложение ---
if __name__ == '__main__':
    main()

# TODO: Провести полное логирование работы приложения