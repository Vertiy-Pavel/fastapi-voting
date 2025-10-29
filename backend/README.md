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
- Poetry
- FastApi
- SQLAlchemy
- MySQL + asyncmy
- Alembic
- Uvicorn (ASGI)

## Установка зависимостей
Разместить конфигурационный файл с переменными среды (.env) в ``fastapi-voting/`` - в корневом каталоге
Содержимое .env:
```powershell
# Конфигурация приложения
JWT_SECRET_KEY=c05da040fc7bd6f8f8964405f94d6f4b
JWT_ACCESS_EXPIRE_MINUTES=120
JWT_REFRESH_EXPIRE_DAYS=1

CSRF_SECRET_KEY=8BMagWCAM5jHrz09DMUaZiDe8L1Vj8scPbR3AlUEG8fY6vz8To5A0aT9K0zSSuCU
CSRF_COOKIE_SAMESITE=none
CSRF_MAX_AGE=86400
CSRF_COOKIE_SECURE=true

TLS_PRIVATE_KEY=<path_to_key>
TLS_CERTIFICATE=<path_to_certificate>

APP_HOST=127.0.0.1
APP_PORT=5000

# Конфигурация MySQL
DB_HOST=127.0.0.1
DB_PORT=3306

DB_USER=root
DB_PASSWORD=0000
DB_NAME=voting

```

Для создания файла виртуального окружения непосредственно в корневом каталоге проекта(опционально):
```commandline
poetry config virtualenvs.in-project true
```
Для установки всех необходимых зависимостей:
```commandline
poetry install
```
## Генерация сертификата.
Для корректной работы шифрования трафика по протоколу TLS требуется иметь SSL-сертификат и приватный ключ.

Для генерации самоподписанного SSL-сертификата и приватного ключа - перейдите в директорию, где планируется разместить файлы, и выполните инструкцию:
```commandline
openssl req -x509 -sha256 -nodes -days 365 -newkey rsa:2048 -keyout privateKey.key -out certificate.crt
```
В одноимённых полях файла .env укажите полные маршруты к вашим файлам сертификата и ключа.

## Shell-инструкции CLI
Корректное исполнение инструкций оболочкой требует пребывания в корне проекта на момент применения инструкции
```commandline
poetry run db init - сброс таблиц, применение миграций и наполнение тестовым контентом
poetry run app start - запуск приложения.
```
## Опциональные аргументы инструкций
### `poetry run app start`:
| Аргумент   | По умолчанию | Описание                                                                                     |
|:-----------|:-------------|:---------------------------------------------------------------------------------------------|
| `--reload` | `False`      | Включает режим мониторинга изменений с целью обновления процесса.                            |
| `--public` | `127.0.0.1`  | Задаёт прослушивание всех сетевых интерфейсов (`0.0.0.0`), делая приложение доступным извне. |



