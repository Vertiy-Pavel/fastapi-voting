from fastapi import FastAPI

from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware

from fastapi.middleware.cors import CORSMiddleware


# --- Конфигурация обработчиков ---
origins = [
    "https://localhost:5173"
]

# --- Регистрация промежуточных обработчиков ---
def setup_middlewares(app: FastAPI):
    app.add_middleware(HTTPSRedirectMiddleware)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
        expose_headers=["*"],
    )