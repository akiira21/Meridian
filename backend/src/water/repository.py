from datetime import datetime, timedelta
from sqlalchemy import select, and_, desc
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from water.models import WaterIntake


DEFAULT_DAILY_GOAL_ML = 2500


class WaterRepository:
    @staticmethod
    def create(db: Session, user_id: int, amount_ml: int) -> WaterIntake:
        try:
            intake = WaterIntake(user_id=user_id, amount_ml=amount_ml)
            db.add(intake)
            db.commit()
            db.refresh(intake)
            return intake
        except IntegrityError:
            db.rollback()
            raise
        except SQLAlchemyError:
            db.rollback()
            raise

    @staticmethod
    def get_by_id(db: Session, intake_id: int, user_id: int) -> WaterIntake | None:
        return db.execute(
            select(WaterIntake).where(
                and_(WaterIntake.id == intake_id, WaterIntake.user_id == user_id)
            )
        ).scalar_one_or_none()

    @staticmethod
    def get_today(db: Session, user_id: int) -> list[WaterIntake]:
        today_start = datetime.now().replace(hour=0, minute=0, second=0, microsecond=0)
        today_end = today_start + timedelta(days=1)
        query = (
            select(WaterIntake)
            .where(
                and_(
                    WaterIntake.user_id == user_id,
                    WaterIntake.logged_at >= today_start,
                    WaterIntake.logged_at < today_end,
                )
            )
            .order_by(desc(WaterIntake.logged_at))
        )
        result = db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    def get_history(
        db: Session,
        user_id: int,
        limit: int = 30,
        offset: int = 0,
    ) -> list[WaterIntake]:
        query = (
            select(WaterIntake)
            .where(WaterIntake.user_id == user_id)
            .order_by(desc(WaterIntake.logged_at))
            .limit(limit)
            .offset(offset)
        )
        result = db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    def delete(db: Session, intake: WaterIntake) -> bool:
        try:
            db.delete(intake)
            db.commit()
            return True
        except SQLAlchemyError:
            db.rollback()
            return False
