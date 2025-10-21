from enum import Enum


# --- Роли пользователей ---
class RolesEnum(Enum):
    CHIEF = "CHIEF"
    EMPLOYEE = "EMPLOYEE"


# --- Типы вопросов ---
class QuestionTypeEnum(Enum):
    SINGLE = "single_choice"
    MULTIPLE = "multiple_choice"