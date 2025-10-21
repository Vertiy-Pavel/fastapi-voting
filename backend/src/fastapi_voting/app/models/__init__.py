from sqlalchemy.orm import configure_mappers

from src.fastapi_voting.app.models.department import Department
from src.fastapi_voting.app.models.user import User
from src.fastapi_voting.app.models.vote import Vote
from src.fastapi_voting.app.models.voting import Voting
from src.fastapi_voting.app.models.question import Question
from src.fastapi_voting.app.models.option import Option


configure_mappers()