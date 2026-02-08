from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    # Database
    DATABASE_URL: str

    # JWT
    JWT_SECRET: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # RAG / PDF
    PDF_PATH: str

    # Pinecone
    PINECONE_API_KEY: str
    PINECONE_ENV: str
    PINECONE_INDEX: str

    # OpenRouter
    OPENROUTER_API_KEY: str

    model_config = {
        "extra": "allow"
    }

settings = Settings()
