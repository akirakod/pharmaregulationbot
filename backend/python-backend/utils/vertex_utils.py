# python-backend/utils/vertex_utils.py
import vertexai
import os
from vertexai.language_models import TextEmbeddingModel
from vertexai.preview.generative_models import GenerativeModel

# Initialize Vertex AI
PROJECT_ID = os.getenv("PROJECT_ID")
REGION = "us-central1"  # Or your desired region
vertexai.init(project=PROJECT_ID, location=REGION)

# Load the embedding model
embedding_model = TextEmbeddingModel.from_pretrained("text-embedding-005")

# Load the Gemini model
llm_model = GenerativeModel("gemini-2.0-flash")  # Replace with the correct Gemini 2 Flash model name