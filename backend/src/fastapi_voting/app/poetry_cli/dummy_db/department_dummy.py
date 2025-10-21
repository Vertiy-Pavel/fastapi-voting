import faker
import random

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.models.department import Department
from src.fastapi_voting.app.models.user import User

from src.fastapi_voting.app.core.enums import RolesEnum


# --- Инициализация первичных данных ---
faker = faker.Faker()
random = random.Random()


# --- Скрипты-генераторы ---
async def get_fake_departments(session: AsyncSession, users: list[User]):
    """Генерирует список отделов. Кол-во отделов напрямую зависит от кол-ва шефов по паритету."""

    async def get_tree_departments(root_dep: Department, employeers: list[User], chiefs: set[User]):
        """
        Рекурсивно генерирует дерево связей.
        Args:
            root_dep (Department): Определяет родительский отдел:
            employeers (list[User]): Определяет сотрудников, которых планируется связать с отделом.
            chiefs (list[User]): Определяет шефов, которых планируется связать с отделом.
        """

        # --- Рекурсия прекращается по факту исчерпания доступных начальников ---
        if not chiefs:
            return None

        # --- Выборка сотрудников ---
        l_head_root_depart_choice = chiefs.pop()
        l_employee_root_depart_sample = random.sample(employeers, random.randint(1, len(employeers)))

        # --- Создание родительского отдела ---
        l_department = Department(
            name=faker.name(),
            description=faker.text(),
            location=faker.city(),

            parent_id=root_dep.id,
            parent=root_dep,

            head_of_department=l_head_root_depart_choice,
            head_of_department_id=l_head_root_depart_choice.id,

            users=l_employee_root_depart_sample,
        )
        daughter_dep = await get_tree_departments(l_department, l_employee_root_depart_sample, chiefs)

        if daughter_dep:
            l_department.children.append(daughter_dep)

        return l_department


    def set_dep_users(head_user: User, emp_users: list[User], dep: Department) -> None:
        """Связывает пользователей с указанным отделом"""
        if not head_user.departments:
            head_user.departments.append(dep)

        head_user.manage_department = dep

        for employee in emp_users:
            employee.departments.append(dep)
            transactions.add(employee)


    # --- Выгрузка первичных данных с БД ---
    query = select(User).options(selectinload(User.departments))
    result = await session.execute(query)
    users = list(result.scalars().all())


    # --- Инициализация копии списка пользователей, делегирование надвое: шефы, работники ---
    users = users.copy()
    chief_users = set()
    employee_users = set()

    for user in users:
        if user.role.value == RolesEnum.CHIEF.value:
            chief_users.add(user)
            continue
        employee_users.add(user)


    # --- Вспомогательные данные ---
    departments = set()
    transactions = set()


    # --- Генерация отделов ---
    for _ in range(3):

        # Выборка данных про глав отделов
        head_root_depart_choice = chief_users.pop()

        if len(chief_users) == 0:
            head_daughter_depart_sample = set()
        else:
            head_daughter_depart_sample = set(random.sample(list(chief_users), random.randint(1, len(chief_users)-1)))

        chief_users = chief_users - head_daughter_depart_sample

        # Выборка данных про сотрудников отделов
        employee_root_depart_sample = random.sample(list(employee_users), random.randint(1, 7))
        employee_daughter_depart_sample = random.sample(list(employee_users), random.randint(1, len(employee_users)-3))

        # --- Инициализация корневого отдела ---
        department = Department(
                name = faker.name(),
                description = faker.text(),
                location = faker.city(),

                parent_id = None,
                parent = None,

                head_of_department = head_root_depart_choice,
                head_of_department_id = head_root_depart_choice.id,

                users = [head_root_depart_choice, *employee_root_depart_sample]
            )

        # --- Рекурсивная генерация дерева дочерних отделов ---
        if head_daughter_depart_sample:
            department.children.append(
                await get_tree_departments(
                    department,
                    employee_daughter_depart_sample,
                    head_daughter_depart_sample)
            )
        departments.add(department)
        transactions.add(department)

        # --- Вторичные манипуляции со связанными ОРМ-моделями ---
        set_dep_users(head_root_depart_choice, employee_root_depart_sample, department)

    # --- Фиксация результирующего состояния транзакции ---
    session.add_all(transactions)
    await session.flush()

    return departments
