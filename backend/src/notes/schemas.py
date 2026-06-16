from datetime import datetime
from pydantic import BaseModel


class NoteCreateRequest(BaseModel):
    title: str
    content: str | None = None
    is_pinned: bool = False
    color: str = "gray"


class NoteUpdateRequest(BaseModel):
    title: str | None = None
    content: str | None = None
    is_pinned: bool | None = None
    color: str | None = None


class NoteResponse(BaseModel):
    id: int
    user_id: int
    title: str
    content: str | None
    is_pinned: bool
    color: str
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class NoteListResponse(BaseModel):
    items: list[NoteResponse]
    total: int
