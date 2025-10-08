from pathlib import Path


# --- Вспомогательные утилиты ---
def get_root_path() -> Path:
    """Формирование маршрута корня проекта в ОС"""

    return Path(__file__).parent.parent.parent.parent.parent.parent

