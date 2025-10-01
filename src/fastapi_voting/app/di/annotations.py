from fastapi import Depends

from typing import Annotated

from src.fastapi_voting.app.services.user_service import UserService

from src.fastapi_voting.app.di.dependencies import get_user_service


# --- Аннотации ---
UserServiceAnnotation = Annotated[UserService, Depends(get_user_service)]