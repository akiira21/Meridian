from fastapi import HTTPException
from sqlalchemy.orm import Session

from notes.models import Note
from notes.repository import NoteRepository
from notes.schemas import NoteCreateRequest, NoteUpdateRequest


class NoteService:
    @staticmethod
    def create_note(db: Session, user_id: int, data: NoteCreateRequest) -> Note:
        return NoteRepository.create(
            db, user_id, data.title, data.content, data.is_pinned, data.color
        )

    @staticmethod
    def get_note(db: Session, note_id: int, user_id: int) -> Note:
        note = NoteRepository.get_by_id(db, note_id, user_id)
        if not note:
            raise HTTPException(status_code=404, detail="Note not found")
        return note

    @staticmethod
    def list_notes(db: Session, user_id: int, search: str | None = None) -> list[Note]:
        return NoteRepository.get_all(db, user_id, search=search)

    @staticmethod
    def update_note(db: Session, note_id: int, user_id: int, data: NoteUpdateRequest) -> Note:
        note = NoteService.get_note(db, note_id, user_id)
        update_data = data.model_dump(exclude_unset=True)
        return NoteRepository.update(db, note, update_data)

    @staticmethod
    def delete_note(db: Session, note_id: int, user_id: int) -> bool:
        note = NoteService.get_note(db, note_id, user_id)
        return NoteRepository.delete(db, note)

    @staticmethod
    def toggle_pin(db: Session, note_id: int, user_id: int) -> Note:
        note = NoteService.get_note(db, note_id, user_id)
        return NoteRepository.update(db, note, {"is_pinned": not note.is_pinned})
