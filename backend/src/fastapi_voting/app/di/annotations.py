from fastapi import Depends

from typing import Annotated

from src.fastapi_voting.app.services.user_service import UserService
from src.fastapi_voting.app.services.department_service import DepartmentService

from src.fastapi_voting.app.di.dependencies.services import (
    get_user_service,
    get_department_service
)

# --- Аннотации для сервисов---
UserServiceAnnotation = Annotated[UserService, Depends(get_user_service)]
DepartmentServiceAnnotation = Annotated[DepartmentService, Depends(get_department_service)]
