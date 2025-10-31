from fastapi import FastAPI, Request

from fastapi.middleware.cors import CORSMiddleware


# --- Конфигурация обработчиков ---
origins = [
    "http://localhost:5173",
    "https://localhost:3000"
]


def setup_middlewares(app: FastAPI):

    # --- Регистрация промежуточных обработчиков ---
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )
