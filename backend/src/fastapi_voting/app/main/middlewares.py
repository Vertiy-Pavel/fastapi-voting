from fastapi import FastAPI, Request

from fastapi.middleware.cors import CORSMiddleware


# --- Конфигурация обработчиков ---
origins = [
    "https://localhost:5173"
]


def setup_middlewares(app: FastAPI):

    # --- Регистрация промежуточных обработчиков ---
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["Authorization", "Content-Type", "X-CSRF-Token"],
        expose_headers=["X-CSRF-Token"],
    )
