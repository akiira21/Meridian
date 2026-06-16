from sqlalchemy.orm import Session

from water.models import WaterIntake
from water.repository import WaterRepository, DEFAULT_DAILY_GOAL_ML
from water.schemas import WaterIntakeCreateRequest


class WaterService:
    @staticmethod
    def log_intake(db: Session, user_id: int, data: WaterIntakeCreateRequest) -> WaterIntake:
        return WaterRepository.create(db, user_id, data.amount_ml)

    @staticmethod
    def get_today_summary(db: Session, user_id: int) -> dict:
        intakes = WaterRepository.get_today(db, user_id)
        consumed = sum(i.amount_ml for i in intakes)
        remaining = max(DEFAULT_DAILY_GOAL_ML - consumed, 0)
        percentage = min(round((consumed / DEFAULT_DAILY_GOAL_ML) * 100, 1), 100.0)

        return {
            "goal_ml": DEFAULT_DAILY_GOAL_ML,
            "consumed_ml": consumed,
            "remaining_ml": remaining,
            "percentage": percentage,
        }

    @staticmethod
    def get_today_with_history(db: Session, user_id: int) -> dict:
        intakes = WaterRepository.get_today(db, user_id)
        summary = WaterService.get_today_summary(db, user_id)
        return {
            "intakes": intakes,
            "summary": summary,
        }

    @staticmethod
    def get_history(db: Session, user_id: int, limit: int = 30, offset: int = 0) -> list[WaterIntake]:
        return WaterRepository.get_history(db, user_id, limit=limit, offset=offset)

    @staticmethod
    def delete_intake(db: Session, intake_id: int, user_id: int) -> bool:
        intake = WaterRepository.get_by_id(db, intake_id, user_id)
        if not intake:
            return False
        return WaterRepository.delete(db, intake)
