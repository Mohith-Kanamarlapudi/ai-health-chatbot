from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.auth.jwt_handler import get_current_user
from app.models.quiz_score import QuizScore
from app.schemas.quiz import QuizScoreCreate, QuizScoreResponse

router = APIRouter(prefix="/api/quiz", tags=["Quiz"])

@router.post("/save", response_model=QuizScoreResponse)
def save_quiz_score(score_data: QuizScoreCreate, db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    new_score = QuizScore(
        user_id=user["id"],
        score=score_data.score,
        total_questions=score_data.total_questions
    )
    db.add(new_score)
    db.commit()
    db.refresh(new_score)
    return new_score


@router.get("/my-scores", response_model=list[QuizScoreResponse])
def get_my_scores(db: Session = Depends(get_db), user: dict = Depends(get_current_user)):
    scores = (
        db.query(QuizScore)
        .filter(QuizScore.user_id == user["id"])
        .order_by(QuizScore.created_at.desc())
        .all()
    )
    return scores
