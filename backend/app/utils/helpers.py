def trim_text(text: str, max_len: int = 1200):
    """
    Trim long text so LLM does not overflow.
    """
    if len(text) <= max_len:
        return text
    return text[:max_len] + "... (trimmed)"
