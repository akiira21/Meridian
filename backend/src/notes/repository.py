from sqlalchemy.orm import Session
from sqlalchemy import select, and_, desc, or_
from sqlalchemy.exc import SQLAlchemyError, IntegrityError

from notes.models import Note


class NoteRepository:
    @staticmethod
    def create(db: Session, user_id: int, title: str, content: str | None, is_pinned: bool, color: str) -> Note:
        try:
            note = Note(user_id=user_id, title=title, content=content, is_pinned=is_pinned, color=color)
            db.add(note)
            db.commit()
            db.refresh(note)
            return note
        except IntegrityError:
            db.rollback()
            raise
        except SQLAlchemyError:
            db.rollback()
            raise

    @staticmethod
    def get_by_id(db: Session, note_id: int, user_id: int) -> Note | None:
        return db.execute(
            select(Note).where(
                and_(Note.id == note_id, Note.user_id == user_id)
            )
        ).scalar_one_or_none()

    @staticmethod
    def get_all(db: Session, user_id: int, search: str | None = None) -> list[Note]:
        query = select(Note).where(Note.user_id == user_id)

        if search:
            query = query.where(
                or_(
                    Note.title.ilike(f"%{search}%"),
                    Note.content.ilike(f"%{search}%"),
                )
            )

        query = query.order_by(desc(Note.is_pinned), desc(Note.updated_at))
        result = db.execute(query)
        return list(result.scalars().all())

    @staticmethod
    def update(db: Session, note: Note, data: dict) -> Note:
        try:
            for key, value in data.items():
                if value is not None:
                    setattr(note, key, value)
            db.commit()
            db.refresh(note)
            return note
        except SQLAlchemyError:
            db.rollback()
            raise

    @staticmethod
    def delete(db: Session, note: Note) -> bool:
        try:
            db.delete(note)
            db.commit()
            return True
        except SQLAlchemyError:
            db.rollback()
            return False
