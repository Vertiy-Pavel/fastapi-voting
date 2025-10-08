import typer

from src.fastapi_voting.app.poetry_cli.run_application_cli import run_app_typer

app = typer.Typer()
app.add_typer(run_app_typer)

if __name__ == "__main__":
    app()