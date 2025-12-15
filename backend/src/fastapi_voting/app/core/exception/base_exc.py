from fastapi.exceptions import HTTPException

from src.fastapi_voting.app.core.settings import get_settings

settings = get_settings()


# --- Базовый класс исключений ---
class AppException(HTTPException):
    """Базовый класс-исключение с поддержкой WWW-Authenticate"""

    def __init__(self, log_detail: str, status_code: int, detail: str, www_error: str=None):

        # --- Свойства класса и вспомогательные данные ---
        headers = None
        self.exception_detail = detail
        self.log_message = log_detail

        # --- Адаптация заголовков ---
        if status_code == 401:
            headers = {"WWW-Authenticate": f"Bearer realm=\"Restricted Area\", error=\"{www_error}\""}

        elif status_code == 429:
            headers = {} # TODO: Заголовки лимитирования

        # --- Возбуждение HTTPException ---
        super().__init__(detail=detail, status_code=status_code, headers=headers)


    @property
    def log_detail(self):
        return self.log_message

    @property
    def response_detail(self):
        return self.exception_detail


# --- Базовый класс аномальных исключений ---
class AnomalyException(AppException):
    def __init__(self, log_detail: str, detail: str, status_code: int, extra_data: list[str], www_error: str=None):
        super().__init__(
            log_detail,
            detail=detail,
            status_code=status_code,
            www_error=www_error,
        )
        self.extra_data = extra_data


# --- Базовый класс для исключений лимитирования запросов ---
class APILimiterException(AppException):
    def __init__(self, minutes: int, log_detail: str, detail: str, status_code: int, extra_data: list[str], www_error: str=None):
        super().__init__(
            log_detail,
            detail=detail,
            status_code=status_code,
            www_error=www_error
        )
        self.extra_data = extra_data
        self.minutes = minutes


# --- Базовый класс для исключений лимитирования запросов к SMTP ---
class SMTPAPILimiterException(APILimiterException):
    def __init__(self, log_detail: str, detail: str, status_code: int, extra_data: list[str], www_error: str=None):
        super().__init__(
            log_detail=log_detail,
            detail=detail,
            status_code=status_code,
            www_error=www_error,
            extra_data=extra_data,
            minutes=settings.EMAIL_REQUEST_LIMIT_MINUTES
        )