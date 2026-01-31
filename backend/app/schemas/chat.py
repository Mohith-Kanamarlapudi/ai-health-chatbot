from pydantic import BaseModel

class ChatRequest(BaseModel):
    user_query: str
    language: str = "en"   # default language
