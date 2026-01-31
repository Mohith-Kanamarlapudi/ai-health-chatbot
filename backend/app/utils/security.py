import hashlib

def hash_text(text: str):
    """Useful if you want to hash anything."""
    return hashlib.sha256(text.encode()).hexdigest()
