from fastapi import APIRouter
from app.rag.rag_engine import answer_query
from app.config import settings
from app.schemas.chat import ChatRequest
import requests

router = APIRouter(prefix="/chatbot", tags=["Chatbot"])


# --------------------------------
# Helper → Call LLM (OpenRouter)
# --------------------------------
def call_llm(prompt: str) -> str:
    response = requests.post(
        "https://openrouter.ai/api/v1/chat/completions",
        headers={
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "Content-Type": "application/json"
        },
        json={
            "model": "openai/gpt-4o-mini",
            "messages": [{"role": "user", "content": prompt}],
            "temperature": 0.2
        },
        timeout=30
    )

    response.raise_for_status()
    return response.json()["choices"][0]["message"]["content"]


# --------------------------------
# 🔒 Medical Intent Classifier
# --------------------------------
def is_medical_query(query: str) -> bool:
    prompt = f"""
You are a strict classifier.

Is the following question related to medicine, health, disease,
symptoms, diagnosis, treatment, drugs, or healthcare?

Question: "{query}"

Reply with ONLY one word:
YES or NO
"""
    result = call_llm(prompt).strip().upper()
    return result == "YES"


# --------------------------------
# 🧠 Chat Endpoint (Medical-Only)
# --------------------------------
@router.post("/")
def chat(payload: ChatRequest):

    user_query = payload.user_query.strip()
    lang = payload.language or "en"

    # --------------------------------
    # 1️⃣ MEDICAL DOMAIN GATE
    # --------------------------------
    if not is_medical_query(user_query):
        return {
            "query": user_query,
            "response": (
                "I am a medical assistant and can answer only "
                "health- and medicine-related questions. "
                "Please ask a medical query."
            ),
            "rag_used": None,
            "emergency_mode": False
        }

    # --------------------------------
    # 2️⃣ RAG → Search Medical Knowledge
    # --------------------------------
    rag_result = answer_query(user_query)
    context = rag_result.get("context", "").strip()

    rag_prompt = f"""
You are a medical assistant.

Use ONLY the context below to answer the question.
If the answer is NOT present in the context,
reply with exactly this word: NO_CONTEXT

Context:
{context}

Question:
{user_query}

Answer:
"""
    rag_answer = call_llm(rag_prompt).strip()

    # --------------------------------
    # 3️⃣ Emergency Mode Decision
    # --------------------------------
    emergency_mode = (
        rag_answer == "NO_CONTEXT" or
        len(context) < 30
    )

    # --------------------------------
    # 4️⃣ Emergency Mode (Medical Only)
    # --------------------------------
    if emergency_mode:
        emergency_prompt = f"""
You are a medical assistant.

The user asked a medical question, but reliable medical
book information was not found.

Give SAFE, GENERAL medical guidance only.

Instructions:
- Suggest 3–5 basic home remedies if applicable
- Mention common OTC medicines (example: paracetamol)
- Clearly say when to consult a doctor
- Do NOT diagnose
- Do NOT give dosages
- Be calm and reassuring

User Question:
{user_query}

Answer:
"""
        english_answer = call_llm(emergency_prompt)

    else:
        english_answer = rag_answer

    # --------------------------------
    # 5️⃣ Language Handling
    # --------------------------------
    if lang == "en":
        return {
            "query": user_query,
            "response": english_answer,
            "rag_used": context,
            "emergency_mode": emergency_mode
        }

    # --------------------------------
    # 6️⃣ Translation (Hindi)
    # --------------------------------
    translation_prompt = f"""
Translate the following medical response into
simple, clear Hindi.

Text:
{english_answer}

Hindi:
"""
    hindi_answer = call_llm(translation_prompt)

    return {
        "query": user_query,
        "response": hindi_answer,
        "rag_used": context,
        "translated": True,
        "emergency_mode": emergency_mode
    }
