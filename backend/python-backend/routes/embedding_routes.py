# python-backend/routes/embedding_routes.py
from flask import Blueprint, request, jsonify
from ..services import embedding_service  # Import the service

bp = Blueprint('embedding', __name__, url_prefix='/embed')  # Create blueprint

@bp.route('', methods=['POST'])
def embed_text():
    data = request.get_json()
    text = data.get('text')
    if not text:
        return jsonify({"error": "No text provided"}), 400

    try:
        embedding = embedding_service.generate_embedding(text)  # Call the service function
        return jsonify({'embedding': embedding})
    except Exception as e:
        return jsonify({"error": str(e)}), 500