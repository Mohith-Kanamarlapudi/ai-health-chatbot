from pydantic import BaseModel
from datetime import datetime

class QuizScoreCreate(BaseModel):
    score: int
    total_questions: int

class QuizScoreResponse(BaseModel):
    id: int
    score: int
    total_questions: int
    created_at: datetime

    class Config:
        orm_mode = True
