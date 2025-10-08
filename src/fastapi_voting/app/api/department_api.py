from fastapi import APIRouter

from src.fastapi_voting.app.di.annotations import DepartmentServiceAnnotation

from src.fastapi_voting.app.schemas.department_schema import ResponseAllDepartmentsSchema


# --- Конфигурация роутера ---
department_router = APIRouter(
    prefix="/department",
    tags=["department"],
)

# --- Обработчики ---
@department_router.get(path="/departments", response_model=list[ResponseAllDepartmentsSchema])
async def get_all_departments(departments_service: DepartmentServiceAnnotation):
    departments = await departments_service.department_repo.get_all_departments()
    return departments
