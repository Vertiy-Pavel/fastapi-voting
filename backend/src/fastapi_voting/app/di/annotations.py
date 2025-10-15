from fastapi import Depends

from typing import Annotated


from src.fastapi_voting.app.services.user_service import UserService
from src.fastapi_voting.app.services.department_service import DepartmentService
from src.fastapi_voting.app.services.voting_service import VotingService

from fastapi_voting.app.di.dependencies.auth_di import (
    AuthTokenRequired,
    csrf_valid
)

from src.fastapi_voting.app.di.dependencies.services_di import (
    get_user_service,
    get_department_service,
    get_voting_service
)

# --- Аннотации для сервисов---
UserServiceAnnotation = Annotated[UserService, Depends(get_user_service)]
DepartmentServiceAnnotation = Annotated[DepartmentService, Depends(get_department_service)]
VotingServiceAnnotation = Annotated[VotingService, Depends(get_voting_service)]

# --- Аннотации для токенов ---
AccessRequiredAnnotation = Annotated[AuthTokenRequired, Depends(AuthTokenRequired("access_token"))]
RefreshRequiredAnnotation = Annotated[AuthTokenRequired, Depends(AuthTokenRequired("refresh_token"))]
CSRFValidAnnotation = Annotated[csrf_valid, Depends(csrf_valid)]
