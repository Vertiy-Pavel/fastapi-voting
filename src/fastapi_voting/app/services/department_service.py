import logging

from src.fastapi_voting.app.repositories.department_repo import DepartmentRepo

from src.fastapi_voting.app.schemas.department_schema import ResponseAllDepartmentsSchema


# --- Инициализация первичных данных ---
logger = logging.getLogger("fastapi-voting")

class DepartmentService:

    def __init__(self, department_repo: DepartmentRepo):
        self.department_repo = department_repo


    async def get_departments(self):
        departments = await self.department_repo.get_all_departments()
        return departments
