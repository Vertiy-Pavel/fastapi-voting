from fastapi import APIRouter

from src.fastapi_voting.app.di.annotations import (
    DepartmentServiceAnnotation,
    CSRFValidAnnotation,
    AccessRequiredAnnotation
)

from src.fastapi_voting.app.schemas.department_schema import ResponseAllDepartmentsSchema


# --- Конфигурация роутера ---
department_router = APIRouter(
    prefix="/department",
    tags=["department"],
)

# --- Обработчики ---
@department_router.get(path="/all", response_model=list[ResponseAllDepartmentsSchema])
async def get_all_departments(
        csrf_valid: CSRFValidAnnotation,
        user_id: AccessRequiredAnnotation,

        departments_service: DepartmentServiceAnnotation
):
    departments = await departments_service.get_departments()
    return departments
