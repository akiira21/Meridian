from sqlalchemy.exc import IntegrityError, SQLAlchemyError
import logging

from src.users.schemas import CreateUserRequest, UserResponse
from src.users.models import Users

from src.database import get_db_session

from utils.auth import generate_hash, verify_password


logger = logging.getLogger(__name__)


class UserRepository:
    @staticmethod
    def create_user(data: CreateUserRequest):
        try:
            with get_db_session() as session:
                user = Users(
                    username=data.username, email=data.email, password=generate_hash(data.password)
                )

                session.add(user)
                session.flush()
                user_id = user.id
                logger.info(f"User created with user_id: {user_id}")

                return user_id

        except IntegrityError as err:
            logger.error(f"Integrity error while creating user: {err}")
            raise

        except SQLAlchemyError as err:
            logger.error(f"Sql Error creating user: {err}")
            raise

    @staticmethod
    def get_by_id(user_id: int):
        try:
            with get_db_session() as session:
                user = session.query(Users).filter(Users.id == user_id).first()

                if user:
                    return UserResponse(
                        name=user.name,
                        username=user.username,
                        email=user.email,
                        avatar_url=user.avatar_url,
                        created_at=user.created_at,
                    )
                return None 

        except SQLAlchemyError as err:
            logger.error(f"Error while fetching user details: {err}")
            raise

    @staticmethod
    def get_by_email(email: str):
        try: 
            with get_db_session() as session:
                user = session.query(Users).filter(Users.email == email).first()

                if user:
                    return UserResponse(
                        name=user.name,
                        username=user.username,
                        email=user.email,
                        avatar_url=user.avatar_url,
                        created_at=user.created_at,
                    )

                return None 

        except SQLAlchemyError as err:
            logger.error(f"Error in finding user with email: {err}")
            raise 
    
    @classmethod
    def verify_user(cls, email: str, password: str):
        try:
            with get_db_session() as session:
                user = session.query(Users).filter(Users.email == email).first()
                if not user:
                    return None

                if verify_password(password, user.password):
                    return UserResponse(
                        name=user.name,
                        username=user.username,
                        email=user.email,
                        avatar_url=user.avatar_url,
                        created_at=user.created_at,
                    )

                return None

        except SQLAlchemyError as err:
            logger.error(f"Error verifying user: {err}")
            raise
