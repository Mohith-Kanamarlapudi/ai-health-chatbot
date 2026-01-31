import os
from PyPDF2 import PdfReader
from app.config import settings

def load_pdf_text():
    pdf_path = settings.PDF_PATH

    if not os.path.exists(pdf_path):
        raise FileNotFoundError(f"PDF not found at: {pdf_path}")

    print(f"Loading PDF from: {pdf_path}")

    reader = PdfReader(pdf_path)
    full_text = ""

    for i, page in enumerate(reader.pages):
        try:
            text = page.extract_text()
            if text:
                full_text += text + "\n"
        except Exception as e:
            print(f"Error reading page {i}: {e}")

    return full_text


def clean_text(text: str):
    lines = text.split("\n")
    cleaned = [line.strip() for line in lines if line.strip()]
    return "\n".join(cleaned)


def chunk_text(text: str, chunk_size=400, overlap=50):
    words = text.split()
    chunks = []

    start = 0
    while start < len(words):
        end = start + chunk_size
        chunk = " ".join(words[start:end])
        chunks.append(chunk)
        start += (chunk_size - overlap)

    return chunks


def load_and_chunk_pdf():
    raw_text = load_pdf_text()
    cleaned = clean_text(raw_text)
    chunks = chunk_text(cleaned)

    print(f"Total chunks created: {len(chunks)}")
    return chunks
    