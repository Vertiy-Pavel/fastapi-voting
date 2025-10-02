from fastapi import Depends

from typing import Annotated, Required

from src.fastapi_voting.app.services.user_service import UserService

from src.fastapi_voting.app.di.dependencies import get_user_service, get_encode_jwt


# --- Аннотации для сервисов---
UserServiceAnnotation = Annotated[UserService, Depends(get_user_service)]

# --- Первичные аннотации ---
RequiredJWTAnnotation = Annotated[int, Depends(get_encode_jwt)]