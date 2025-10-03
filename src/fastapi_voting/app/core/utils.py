from pathlib import Path

from jose import jwt


# --- Вспомогательные утилиты ---
def get_root_path() -> Path:
    """Формирование маршрута корня проекта в ОС"""

    return Path(__file__).parent.parent.parent.parent.parent


def create_tokens(user_id: int, refresh: bool) -> dict:
    """Формирование JWT-токенов"""

    from src.fastapi_voting.app.core.settings import get_settings
    settings = get_settings()

    access_payload = {"user_id": user_id, "token_type": "access"}
    access_token: str = jwt.encode(access_payload, settings.JWT_SECRET_KEY, algorithm="HS256")

    if refresh:
        refresh_payload = {"user_id": user_id, "token_type": "refresh"}
        refresh_token: str = jwt.encode(refresh_payload, settings.JWT_SECRET_KEY, algorithm="HS256")

    return {
        "access_token": access_token,
        "refresh_token": refresh_token if refresh else None,
    }