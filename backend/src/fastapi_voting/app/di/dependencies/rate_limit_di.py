from datetime import timedelta

from fastapi import Request

from src.fastapi_voting.app.core.exception.simple_exc import TooManyRequests

from src.fastapi_voting.app.core.settings import get_settings


# --- Инструментарий ---
settings = get_settings()

# --- Зависимость для ограничения запросов ---
class ApiLimiterDI: # TODO: Реализована модель фиксированного окна. В будущем рассмотреть реализацию более сложных моделей.

    def __init__(self, times: int, minutes: int): # TODO: Переменчивая работоспособность
        self.times = times
        self.minutes = minutes

    async def __call__(self, request: Request):

        # Первичные данные
        redis = request.app.state.redis
        client_ip = request.headers.get("X-Real-IP")
        request_uri = request.url.path

        ttl = int(timedelta(minutes=self.minutes).total_seconds())
        key = f"api-limiter:{request_uri}:{client_ip}"

        # Инкрементирование и условия лимитирования
        request_count = await redis.incr(key, amount=1)
        await redis.expire(key, ttl)

        if request_count > self.times:
            extra_data = [
                f"Minutes: {self.minutes}",
                f"Times: {self.times}",
                f"Request Count: {request_count}",
            ]
            raise TooManyRequests(log_message="Превышен лимит запросов.", extra_data=extra_data)

        return self.minutes