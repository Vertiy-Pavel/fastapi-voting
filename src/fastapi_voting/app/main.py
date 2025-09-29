from fastapi import FastAPI
from logging import getLogger

# --- Создание логера и приложения FastApi ---
logger = getLogger('fastapi-voting')

fastapi_app = FastAPI()
