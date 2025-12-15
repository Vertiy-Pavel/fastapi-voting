from fastapi import status

from src.fastapi_voting.app.core.exception.base_exc import AppException, SMTPAPILimiterException


# --- Исключения для пользователей ---
class UserNotFound(AppException):
    def __init__(self, log_message: str):
        super().__init__(log_detail=log_message, detail=f"Invalid Data.", status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

class UserAlreadyExist(AppException):
    def __init__(self, log_message: str):
        super().__init__(log_detail=log_message, detail=f"Invalid Data.", status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

class InvalidLogin(AppException):
    def __init__(self, log_message: str):
        super().__init__(log_detail=log_message, detail=f"Invalid Data.", status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)


# --- Исключения для голосований ---
class VotingNotFound(AppException):
    def __init__(self, log_message: str):
        super().__init__(log_detail=log_message, detail=f"Invalid Data.", status_code=status.HTTP_404_NOT_FOUND)


# --- Исключения для отложенных тасков ---
class TaskAlreadyExist(AppException):
    def __init__(self, log_message: str):
        super().__init__(log_detail=log_message, detail="Invalid Data", status_code=status.HTTP_409_CONFLICT)

class TaskNotFound(AppException):
    def __init__(self, log_message: str):
        super().__init__(log_detail=log_message, detail="Invalid Data", status_code=status.HTTP_404_NOT_FOUND)


# --- Исключения для ограничения запросов ---
class TooManyRequests(SMTPAPILimiterException):
    def __init__(self, log_message: str, extra_data: list[str]):
        super().__init__(log_detail=log_message, detail="Too Many Requests", status_code=status.HTTP_429_TOO_MANY_REQUESTS, extra_data=extra_data)

class APILimiterSMTPConnectError(SMTPAPILimiterException):
    def __init__(self, log_message: str, extra_data: list[str] = None):
        super().__init__(log_detail=log_message, detail="Email not sent", status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, extra_data=extra_data)