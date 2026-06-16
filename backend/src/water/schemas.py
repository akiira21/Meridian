from datetime import datetime
from pydantic import BaseModel, Field


class WaterIntakeCreateRequest(BaseModel):
    amount_ml: int = Field(..., ge=1, le=5000, description="Amount of water in milliliters")


class WaterIntakeResponse(BaseModel):
    id: int
    user_id: int
    amount_ml: int
    logged_at: datetime

    class Config:
        from_attributes = True


class WaterIntakeListResponse(BaseModel):
    items: list[WaterIntakeResponse]
    total: int


class DailyGoalResponse(BaseModel):
    goal_ml: int
    consumed_ml: int
    remaining_ml: int
    percentage: float


class TodayHistoryResponse(BaseModel):
    intakes: list[WaterIntakeResponse]
    summary: DailyGoalResponse
