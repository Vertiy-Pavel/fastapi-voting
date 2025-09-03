# Асинхронный сервис для проведения голосований
## Файловая архитектура проекта - слоистая

```powershell
fastapi-voting                          # Корневой каталог Poetry
├── src
│   └── fastapi_voting                 
│       ├── app                        # Основной модуль приложения
│       │   ├── api                    # Роутеры и контроллеры
│       │   │   └── __init__.py
│       │   ├── core                   # Конфигурация, утилиты, логеры
│       │   │   └── __init.py__        
│       │   ├── db                     # Подключение к БД, миграции
│       │   │   └── __init__.py
│       │   ├── di                     # Dependency Injection
│       │   │   └── __init.py__
│       │   ├── integrations           # Внешние сервисы (SSO, API)
│       │   │   └── __init.py__
│       │   ├── models                 # SQLAlchemy-модели
│       │   │   └── __init.py__
│       │   ├── repositories           # Работа с БД (DAO)
│       │   │   └── __init.py__
│       │   ├── schemas                # Pydantic-схемы (DTO)
│       │   │   └── __init.py__
│       │   ├── services               # Бизнес-логика
│       │   │   └── __init.py__
│       │   └── main.py                # Точка входа FastAPI
│       ├── __init__.py                # Корневой init
│       └── run.py                     # Запуск приложения вручную
├── tests/                             # Тесты
├── .gitignore                         # Git-игнор
├── poetry.lock                        # Файл с фиксированный версиями зависимостей (генерирует Poetry)
├── pyproject.toml                     # Poetry-манифест
└── README.md                          # Документация
```

## Предварительный перечень технологий:
- Python 3.11.9
- FastApi
- SQLAlchemy
- MySQL + asyncmy
- Redis
- Alembic

## Установка зависимостей
Разместить конфигурационный файл с переменными среды (.env) в ``fastapi-voting/`` - в корневом каталоге
Содержимое .env:
```powershell
# Конфигурация приложения
APP_PORT=<Укажите порт для процесса на хост-машине>

# Конфигурация MySQL
MYSQL_PORT=3306
DATABASE_URL=mysql+asyncmy://<USERNAME>:<PASSWORD>@<HOST_ADRESS>/<DB_NAME>
```
