from fastapi import FastAPI, Depends, Security
from fastapi.openapi.utils import get_openapi
from fastapi.security import HTTPBearer
from fastapi.middleware.cors import CORSMiddleware

from app.auth.routes_auth import router as auth_router
from app.api.chatbot import router as chatbot_router
from app.api import diseases
from app.api import quiz
from app.database import Base, engine
from app.rag.rag_engine import build_rag_pipeline
from app.auth.jwt_handler import get_current_user

# Create DB tables automatically
Base.metadata.create_all(bind=engine)

app = FastAPI(title="AI Health Chatbot API")

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# ROUTERS (IMPORTANT)
# -----------------------------
app.include_router(auth_router)
app.include_router(chatbot_router)
app.include_router(diseases.router, prefix="/api", tags=["Diseases"])
app.include_router(quiz.router)

# -----------------------------
# RAG BUILD
# -----------------------------
@app.get("/build-rag")
def build_rag(current_user=Security(get_current_user)):
    return {"message": "RAG built"}

# -----------------------------
# HEALTH CHECK
# -----------------------------
@app.get("/")
def root():
    return {"message": "AI Health Chatbot Running"}

# -----------------------------
# OPENAPI SECURITY
# -----------------------------
def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema

    openapi_schema = get_openapi(
        title=app.title,
        version="1.0.0",
        description="AI Health Chatbot API",
        routes=app.routes,
    )

    openapi_schema["components"]["securitySchemes"] = {
        "BearerAuth": {
            "type": "http",
            "scheme": "bearer",
            "bearerFormat": "JWT"
        }
    }

    PUBLIC_ENDPOINTS = [
        "/auth/signup",
        "/auth/login",
        "/api/diseases",
        "/api/diseases/{d_id}"
    ]

    for path, methods in openapi_schema["paths"].items():
        if any(path.startswith(pub) for pub in PUBLIC_ENDPOINTS):
            for method in methods.values():
                method.pop("security", None)
        else:
            for method in methods.values():
                method["security"] = [{"BearerAuth": []}]

    app.openapi_schema = openapi_schema
    return app.openapi_schema

app.openapi = custom_openapi
