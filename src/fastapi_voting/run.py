import logging
import uvicorn

from src.fastapi_voting.app.main import fastapi_app
from src.fastapi_voting.app.core import settings


# --- Инициализация параметров и логирования ---
logger = logging.getLogger('fastapi-voting')

APP = fastapi_app
PORT = settings.Settings.PORT


if __name__ == '__main__':
    uvicorn.run(
        APP,
        host=f"localhost",
        port=PORT
    )