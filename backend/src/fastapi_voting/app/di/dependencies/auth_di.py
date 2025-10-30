import logging

import redis

from fastapi import Request, HTTPException, status, Depends

from fastapi_csrf_protect import CsrfProtect

from jose import jwt
from jose.exceptions import ExpiredSignatureError, JWTError

from src.fastapi_voting.app.core.settings import get_settings

from src.fastapi_voting.app.di.dependencies.databases_di import get_redis


# --- Инструментарий ---
settings = get_settings()
logger = logging.getLogger("fastapi-voting")

# --- Зависимости ---
class AuthTokenRequired:
    """Класс-зависимость. Валидирует конкретный токен и возвращает payload """

    def __init__(self, token_type):
        self.token_type = token_type

        # --- Проверка на корректный тип токена ---
        if self.token_type not in ("access_token", "refresh_token"):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Некорректный тип токена.")


    def extract_token(self, request: Request):
        """Извлекает и возвращает валидную строку токена"""

        if self.token_type == "access_token":
            token_string = request.headers.get("Authorization")

            if token_string and token_string.startswith("Bearer"):
                return token_string[7:]

            return None

        elif self.token_type == "refresh_token":
            token_string = request.cookies.get("refresh-token")
            return token_string

        return None


    async def __call__(
            self,
            request: Request,
            redis_client: redis.Redis = Depends(get_redis)
    ):

        # --- Извлечение токена из входных данных ---
        token = self.extract_token(request)

        # --- Проверка на наличие токена во входных данных ---
        if token is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"{self.token_type} не был указан.")

        # --- Валидация токена и извлечение payload-данных ---
        try:
            payload = jwt.decode(
                token,
                key=settings.JWT_SECRET_KEY,
                algorithms=["HS256"]
            )
        except ExpiredSignatureError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"{self.token_type} просрочен.")

        except JWTError:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"Некорректный {self.token_type}.")

        # --- Проверка отозванных токенов ---
        token_is_revoked = redis_client.exists(f"jwt_block:{payload['jti']}")

        if token_is_revoked:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail=f"{self.token_type} отозван.")

        # --- Ответ ---
        return payload


async def csrf_valid(request: Request, csrf_protect: CsrfProtect = Depends()):
    await csrf_protect.validate_csrf(
        request=request,
        cookie_key="fastapi-csrf-token",
        secret_key=settings.CSRF_SECRET_KEY,
    )
    return True