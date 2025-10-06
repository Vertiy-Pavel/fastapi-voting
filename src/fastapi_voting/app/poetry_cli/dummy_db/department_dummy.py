import faker
import copy
import random

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.models.department import Department
from src.fastapi_voting.app.models.user import User

from src.fastapi_voting.app.core.enums import RolesEnum


# --- Инициализация первичных данных ---
faker = faker.Faker()
random = random.Random()


# --- Скрипты-генераторы ---
async def get_fake_departments(session: AsyncSession, users: list[User]) -> tuple:
    """Генерирует список отделов. Кол-во отделов напрямую зависит от кол-ва шефов по паритету."""

    async def set_dep_users(head_user: User, emp_users: list[User], dep: Department) -> list[User]:
        """Связывает пользователей с указанным отделом"""
        if not head_user.departments:
            head_user.departments.append(dep)

        dep_users = [head_user]
        head_user.manage_department = dep

        for employee in emp_users:
            employee.departments.append(dep)
            dep_users.append(employee)

        return dep_users


    # --- Инициализация копии списка пользователей, делегирование надвое: шефы, работники ---
    users = users.copy()
    chief_users =  []
    employee_users =  []

    for user in users:
        if user.role.value == RolesEnum.CHIEF.value:
            chief_users.append(user)
            continue
        employee_users.append(user)

    # --- Вспомогательные данные ---
    departments = []
    transactions = []

    # --- Генерация отделов ---
    for _ in range(len(chief_users)):
        random_chief_id = random.randint(0, len(chief_users) - 1)
        head_depart_choice = chief_users.pop(random_chief_id)
        employee_choice = random.sample(employee_users, 12)

        all_users = [head_depart_choice, *employee_choice]

        department = Department(
            name = faker.name(),
            description = faker.text(),
            location = faker.city(),

            parent_id = None, # TODO: Реализовать рекурсивную генерацию дерева связей дочерних отделов
                              # TODO: parent
                              # TODO: children
            head_of_department = head_depart_choice,
            head_of_department_id = head_depart_choice.id,

            users = all_users,
        )
        departments.append(department)

        # --- Манипуляции со связанными ОРМ-моделями ---
        update_users = await set_dep_users(head_depart_choice, employee_choice, department)
        transactions.extend(update_users)

    transactions.extend(departments)
    session.add_all(transactions)

    return session, departments

