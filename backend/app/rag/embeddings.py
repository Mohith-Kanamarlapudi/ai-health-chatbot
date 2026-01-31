from sentence_transformers import SentenceTransformer
from functools import lru_cache
import time

@lru_cache()
def get_embedding_model():
    return SentenceTransformer("all-MiniLM-L6-v2")

def generate_embeddings(chunks):
    model = get_embedding_model()

    print("Generating embeddings...")
    start = time.time()

    embeddings = model.encode(chunks, batch_size=32, show_progress_bar=True)

    end = time.time()
    print(f"Generated {len(embeddings)} embeddings in {end - start:.2f} sec")

    return chunks, embeddings.tolist()
