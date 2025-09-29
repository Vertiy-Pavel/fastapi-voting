import os
import logging
import datetime

from logging.handlers import TimedRotatingFileHandler

from pathlib import Path

from src.fastapi_voting.app.core.utils import get_root_path


def get_time():
    return datetime.datetime.now().strftime("%Y-%m-%d")


def make_handler(file_dir: Path, filename: str, log_level: int) -> TimedRotatingFileHandler:
    """Создаёт и возвращает обработчик для логгера """

    handler = TimedRotatingFileHandler(
        filename=os.path.join(file_dir, f"{filename}-{get_time()}.log"),
        when="midnight",
        interval=1,
        backupCount=3,
        encoding="utf-8"
    )
    handler.setLevel(log_level)
    return handler


class LogSetup:
    """Класс-конфигурация логирования"""

    # --- Инициализация маршрутов для логов ---
    LOG_DIR = get_root_path() / "logs"
    INFO_DIR = LOG_DIR / "info"
    WARNING_DIR = LOG_DIR / "warning"
    ERROR_DIR = LOG_DIR / "error"
    CRITICAL_DIR = LOG_DIR / "critical"


    def __init__(self):
        self.make_log_dirs()

        self.init_logger()
        self.init_handlers()
        self.init_formatters()

        self.set_formatters()
        self.set_handlers()


    def init_logger(self) -> None:
        """Инициализация параметров логера"""

        self.logger = logging.getLogger("fastapi-voting")
        self.logger.setLevel(logging.DEBUG)
        self.logger.propagate = False


    def init_handlers(self) -> None:
        """Инициализация хендлеров"""

        self.console_handler = logging.StreamHandler()
        self.console_handler.setLevel(logging.INFO)

        self.all_handler = make_handler(self.LOG_DIR, "ALL", logging.DEBUG)
        self.info_handler = make_handler(self.INFO_DIR, "INFO", logging.INFO)
        self.warning_handler = make_handler(self.WARNING_DIR, "WARNING", logging.WARNING)
        self.error_handler = make_handler(self.ERROR_DIR, "ERROR", logging.ERROR)
        self.critical_handler = make_handler(self.CRITICAL_DIR, "CRITICAL", logging.CRITICAL)


    def make_log_dirs(self) -> None:
        """Создание директории логов"""

        os.makedirs(self.LOG_DIR, exist_ok=True)
        os.makedirs(self.INFO_DIR, exist_ok=True)
        os.makedirs(self.WARNING_DIR, exist_ok=True)
        os.makedirs(self.ERROR_DIR, exist_ok=True)
        os.makedirs(self.CRITICAL_DIR, exist_ok=True)


    def init_formatters(self) -> None:
        self.main_formatter = logging.Formatter("%(levelname)s: %(asctime)s - %(filename)s: %(lineno)d - %(message)s")
        self.console_formatter = logging.Formatter("%(levelname)s:     %(message)s")


    def set_formatters(self) -> None:
        self.console_handler.setFormatter(self.console_formatter)
        self.all_handler.setFormatter(self.main_formatter)
        self.info_handler.setFormatter(self.main_formatter)
        self.warning_handler.setFormatter(self.main_formatter)
        self.error_handler.setFormatter(self.main_formatter)
        self.critical_handler.setFormatter(self.main_formatter)


    def set_handlers(self) -> None:
        self.logger.addHandler(self.console_handler)
        self.logger.addHandler(self.all_handler)
        self.logger.addHandler(self.info_handler)
        self.logger.addHandler(self.warning_handler)
        self.logger.addHandler(self.error_handler)
        self.logger.addHandler(self.critical_handler)