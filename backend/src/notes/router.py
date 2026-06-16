from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from auth.dependencies import get_current_user
from database import get_db_session
from middleware.decorators import require_auth, rate_limit
from notes.schemas import (
    NoteCreateRequest,
    NoteUpdateRequest,
    NoteResponse,
    NoteListResponse,
)
from notes.services import NoteService


notes_router = APIRouter()


@notes_router.post("", response_model=NoteResponse, status_code=201)
@require_auth
@rate_limit("60/minute")
def create_note(
    data: NoteCreateRequest,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    note = NoteService.create_note(db, user["user_id"], data)
    return NoteResponse.model_validate(note)


@notes_router.get("", response_model=NoteListResponse)
@require_auth
@rate_limit("120/minute")
def list_notes(
    search: str | None = Query(None),
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    notes = NoteService.list_notes(db, user["user_id"], search=search)
    return NoteListResponse(
        items=[NoteResponse.model_validate(n) for n in notes],
        total=len(notes),
    )


@notes_router.get("/{note_id}", response_model=NoteResponse)
@require_auth
@rate_limit("120/minute")
def get_note(
    note_id: int,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    note = NoteService.get_note(db, note_id, user["user_id"])
    return NoteResponse.model_validate(note)


@notes_router.patch("/{note_id}", response_model=NoteResponse)
@require_auth
@rate_limit("60/minute")
def update_note(
    note_id: int,
    data: NoteUpdateRequest,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    note = NoteService.update_note(db, note_id, user["user_id"], data)
    return NoteResponse.model_validate(note)


@notes_router.delete("/{note_id}")
@require_auth
@rate_limit("60/minute")
def delete_note(
    note_id: int,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    NoteService.delete_note(db, note_id, user["user_id"])
    return {"message": "Note deleted successfully"}


@notes_router.post("/{note_id}/pin", response_model=NoteResponse)
@require_auth
@rate_limit("60/minute")
def toggle_pin(
    note_id: int,
    db: Session = Depends(get_db_session),
    user: dict = Depends(get_current_user),
):
    note = NoteService.toggle_pin(db, note_id, user["user_id"])
    return NoteResponse.model_validate(note)
