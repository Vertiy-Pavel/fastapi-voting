# Асинхронный сервис для проведения голосований
## Файловая архитектура проекта - слоистая

```powershell
fastapi-voting                          # Корневой каталог Poetry
├── src
│   └── fastapi_voting                 
│       ├── app                        # Основной модуль приложения
│       │   ├── api                    # Роутеры и контроллеры
│       │   │   └── __init__.py
│       │   ├── db                     # Подключение к БД, миграции
│       │   │   └── __init.py__        
│       │   ├── models                 # SQLAlchemy-модели
│       │   │   └── __init__.py
│       │   ├── repositories           # Работа с БД
│       │   │   └── __init.py__
│       │   ├── schemas                # Pydantic-схемы
│       │   │   └── __init.py__
│       │   ├── services               # Бизнес-логика
│       │   │   └── __init.py__
│       │   ├── di                     # Dependency Injection
│       │   │   └── __init.py__
│       │   ├── integrations           # Внешние сервисы (SSO, API)
│       │   │   └── __init.py__
│       │   ├── core                   # Конфигурация, утилиты, логгеры
│       │   │   └── __init.py__
│       │   └── main.py                # Точка входа FastAPI
│       ├── .env                       # Переменные окружения
│       ├── __init__.py                # Корневой init
│       └── run.py                     # Запуск приложения вручную
├── tests/                             # Тесты
├── alembic.ini                        # Конфигурация Alembic
├── .gitignore                         # Git-игнор
├── pyproject.toml                     # Poetry-манифест
└── README.md                          # Документация
```

## Предварительный перечень технологий:
- FastApi
- SQLAlchemy
- MySQL
- Redis
- Alembic

