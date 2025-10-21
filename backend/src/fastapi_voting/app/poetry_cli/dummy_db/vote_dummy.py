import random

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from sqlalchemy.ext.asyncio import AsyncSession

from src.fastapi_voting.app.models.question import Question
from src.fastapi_voting.app.models.vote import Vote


# --- Вспомогательные инструменты ---
random = random.Random()


# --- Функция-генератор ---
async def get_fake_votes(session: AsyncSession) -> set[Vote]:

    # --- Выгрузка первичных данных с бд ---
    query = select(Question).options(selectinload(Question.options))
    result = await session.execute(query)
    questions = result.scalars().all()

    # --- Вспомогательные данные ---
    votes: set[Vote] = set()

    # --- Генератор ---
    for question in questions:
        for user in question.voting.registered_users:
            vote = Vote(
                author_id=user.id,
                voting_id=question.voting.id,
                question_id=question.id,
                option_id=random.choice(question.options).id,
            )
            session.add(vote)

    session.add_all(questions)
    await session.flush()

    return votes
