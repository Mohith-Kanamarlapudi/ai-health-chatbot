from fastapi import APIRouter, Depends
from app.auth.jwt_handler import get_current_user

router = APIRouter(prefix="/user", tags=["User"])


@router.get("/profile")
def profile(user = Depends(get_current_user)):
    """
    Returns authenticated user info extracted from JWT.
    """
    return {
        "message": "User authenticated successfully",
        "data": user
    }
