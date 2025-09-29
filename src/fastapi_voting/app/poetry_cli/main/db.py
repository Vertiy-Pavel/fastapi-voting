import typer

from src.fastapi_voting.app.poetry_cli.dummy_db.user_dummy import dummy_typer


db = typer.Typer()
db.add_typer(dummy_typer)


if __name__ == "__main__":
    db()
