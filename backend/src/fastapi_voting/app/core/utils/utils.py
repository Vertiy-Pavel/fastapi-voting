import logging
import uuid

from datetime import datetime, timedelta

from jose import jwt

from src.fastapi_voting.app.core.settings import get_settings


# --- Инструментарий ---
settings = get_settings()


# --- Скрипты-утилиты ---
def create_tokens(user_id: int, refresh: bool) -> dict:
    """Формирование JWT-токенов"""

    exp = datetime.now() + timedelta(minutes=settings.JWT_ACCESS_EXPIRE_MINUTES)
    payload = {
        "user_id": user_id,
        "token_type": "access",
        "jti": str(uuid.uuid4()),
        "exp": int(exp.timestamp())
    }
    access_token: str = jwt.encode(payload, settings.JWT_SECRET_KEY, algorithm="HS256")

    if refresh:
        exp = datetime.now() + timedelta(days=settings.JWT_REFRESH_EXPIRE_DAYS)
        refresh_payload = {
            "user_id": user_id,
            "token_type": "refresh",
            "jti": str(uuid.uuid4()),
            "exp": int(exp.timestamp())
        }
        refresh_token: str = jwt.encode(refresh_payload, settings.JWT_SECRET_KEY, algorithm="HS256")

    return {
        "access_token": access_token,
        "refresh_token": refresh_token if refresh else None,
    }