from sentence_transformers import SentenceTransformer
from functools import lru_cache
from app.rag.pinecone_db import get_index

@lru_cache()
def get_query_embedding_model():
    return SentenceTransformer("all-MiniLM-L6-v2")

def embed_query(query: str):
    model = get_query_embedding_model()
    return model.encode(query).tolist()

def retrieve_context(query: str, top_k: int = 5):
    index = get_index()
    query_embedding = embed_query(query)

    results = index.query(
        vector=query_embedding,
        top_k=top_k,
        include_metadata=True
    )

    context_chunks = []

    for match in results["matches"]:
        metadata = match["metadata"]
        context_chunks.append({
            "score": match["score"],
            "text": metadata.get("text", "")
        })

    return context_chunks
