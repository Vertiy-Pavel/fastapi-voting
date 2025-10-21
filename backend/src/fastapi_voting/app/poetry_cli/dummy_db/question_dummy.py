import faker
import random

from sqlalchemy import select

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.core.enums import QuestionTypeEnum

from src.fastapi_voting.app.models import (
    Question,
    Voting
)

random = random.Random()
faker = faker.Faker()

async def get_fake_questions(session: AsyncSession, votings: list[Voting]) -> set[Question]:
    # --- Инициализация вспомогательных данных ---
    questions = set()
    question_types = list(QuestionTypeEnum)

    # --- Генерация вопросов голосования ---
    for voting in votings:
        question = Question(
            type=random.choice(question_types),
            title=faker.text(max_nb_chars=255),
            voting_id=voting.id,
        )
        questions.add(question)

    session.add_all(questions)
    await session.flush()

    return questions