from app.rag.loader import load_and_chunk_pdf
from app.rag.embeddings import generate_embeddings
from app.rag.pinecone_db import upload_vectors
from app.rag.retriever import retrieve_context
from app.utils.logger import log_info

def build_rag_pipeline(pdf_path: str):
    log_info("📄 Loading + Cleaning + Chunking PDF...")
    chunks = load_and_chunk_pdf()

    log_info("✂️ Generating embeddings...")
    chunks, embeddings = generate_embeddings(chunks)

    log_info("🚀 Uploading vectors to Pinecone...")
    upload_vectors(chunks, embeddings)

    log_info("🎉 RAG pipeline completed successfully.")

    return {
        "status": "success",
        "chunks_uploaded": len(chunks)
    }


def answer_query(user_query: str):
    log_info(f"🔍 Retrieving context for: {user_query}")

    context = retrieve_context(user_query)

    combined = "\n\n".join([c["text"] for c in context])

    return {
        "query": user_query,
        "context": combined
    }
