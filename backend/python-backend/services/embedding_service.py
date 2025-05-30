# python-backend/services/embedding_service.py
from ..utils.vertex_utils import embedding_model

def generate_embedding(text):
    try:
        embeddings = embedding_model.get_embeddings([text])
        return [embedding.values for embedding in embeddings][0]
    except Exception as e:
        raise Exception(f"Error generating embedding: {e}")  # Re-raise for better handling in route