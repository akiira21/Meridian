from datetime import datetime
from pydantic import BaseModel


class CreateUserRequest(BaseModel):
    username: str
    email: str
    password: str


class CreateUserRepoResponse(BaseModel):
    username: str
    email: str
    created_at: datetime


class UserResponse(BaseModel):
    name: str | None = None
    username: str
    email: str
    avatar_url: str | None = None
    created_at: datetime
