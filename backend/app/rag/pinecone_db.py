import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec

load_dotenv()

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
PINECONE_ENV = os.getenv("PINECONE_ENV")
PINECONE_INDEX = os.getenv("PINECONE_INDEX")

pc = Pinecone(api_key=PINECONE_API_KEY)


def get_index():
    if PINECONE_INDEX not in pc.list_indexes().names():
        pc.create_index(
            name=PINECONE_INDEX,
            dimension=384,
            metric="cosine",
            spec=ServerlessSpec(
                cloud="aws",
                region=PINECONE_ENV
            )
        )
    return pc.Index(PINECONE_INDEX)


def upload_vectors(chunks, embeddings):
    index = get_index()

    vectors = []
    for i, (chunk, emb) in enumerate(zip(chunks, embeddings)):
        vectors.append({
            "id": f"chunk-{i}",
            "values": emb,
            "metadata": {
                "text": chunk,
                "chunk_id": i
            }
        })

    # ---------------------
    # FIX: BATCH UPLOAD
    # ---------------------
    batch_size = 100  # Pinecone safe limit

    print(f"Uploading {len(vectors)} vectors in batches of {batch_size}...")

    for i in range(0, len(vectors), batch_size):
        batch = vectors[i:i + batch_size]
        index.upsert(vectors=batch)
        print(f"Uploaded batch {i//batch_size + 1} ({len(batch)} vectors)")

    print("All vectors uploaded successfully.")
