from fastapi import APIRouter, HTTPException, Depends, Security
from pydantic import BaseModel
from typing import List
from app.rag.rag_engine import answer_query
from app.api.chatbot import call_llm
from app.auth.jwt_handler import get_current_user

router = APIRouter()

# -----------------------------
# Request Model
# -----------------------------
class SymptomRequest(BaseModel):
    symptoms: List[str]


# -----------------------------
# Build Prompt
# -----------------------------
def build_prompt(symptoms: List[str], context: str) -> str:
    symptom_line = ", ".join(symptoms)

    return f"""
You are a medical assistant.

User symptoms:
{symptom_line}

Use ONLY the context below if relevant.
If context is missing, give general, safe guidance
WITHOUT diagnosing with certainty.

Context:
{context}

Provide the output strictly in this JSON format:

{{
  "possible_diseases": [
    {{
      "name": "...",
      "probability": "Low/Medium/High",
      "reason": "..."
    }}
  ],
  "home_remedies": ["...", "..."],
  "when_to_visit_doctor": ["...", "..."]
}}
"""
# -----------------------------
# POST /symptom-checker
# -----------------------------
@router.post("/symptom-checker")
def symptom_checker(payload: SymptomRequest, current_user=Security(get_current_user)):

    if not payload.symptoms:
        raise HTTPException(status_code=400, detail="No symptoms provided")

    # convert symptoms to a single query
    user_query = " ".join(payload.symptoms)

    # retrieve context (RAG)
    rag_result = answer_query(user_query)
    context = rag_result.get("context", "")

    # build prompt
    prompt = build_prompt(payload.symptoms, context)

    # call LLM
    llm_response = call_llm(prompt)

    return {
        "symptoms": payload.symptoms,
        "context_used": context,
        "analysis": llm_response
    }
