from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from database import get_db_session
from middleware.decorators import require_auth, rate_limit
from water.schemas import (
    WaterIntakeCreateRequest,
    WaterIntakeResponse,
    WaterIntakeListResponse,
    TodayHistoryResponse,
)
from water.services import WaterService


water_router = APIRouter()


@water_router.post("/log", response_model=WaterIntakeResponse, status_code=201)
@require_auth
@rate_limit("60/minute")
def log_water(
    data: WaterIntakeCreateRequest,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    intake = WaterService.log_intake(db, user["user_id"], data)
    return WaterIntakeResponse.model_validate(intake)


@water_router.get("/today", response_model=TodayHistoryResponse)
@require_auth
@rate_limit("120/minute")
def get_today(
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    result = WaterService.get_today_with_history(db, user["user_id"])
    return TodayHistoryResponse(
        intakes=[WaterIntakeResponse.model_validate(i) for i in result["intakes"]],
        summary=result["summary"],
    )


@water_router.get("/history", response_model=WaterIntakeListResponse)
@require_auth
@rate_limit("120/minute")
def get_history(
    limit: int = Query(30, ge=1, le=100),
    offset: int = Query(0, ge=0),
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    items = WaterService.get_history(db, user["user_id"], limit=limit, offset=offset)
    return WaterIntakeListResponse(
        items=[WaterIntakeResponse.model_validate(i) for i in items],
        total=len(items),
    )


@water_router.delete("/{intake_id}")
@require_auth
@rate_limit("60/minute")
def delete_intake(
    intake_id: int,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    deleted = WaterService.delete_intake(db, intake_id, user["user_id"])
    if not deleted:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Intake not found")
    return {"message": "Intake deleted successfully"}
