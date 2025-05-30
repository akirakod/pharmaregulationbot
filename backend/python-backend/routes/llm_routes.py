# python-backend/routes/llm_routes.py
from flask import Blueprint, request, jsonify
from ..services import llm_service  # Import the service

bp = Blueprint('llm', __name__, url_prefix='/llm')  # Create blueprint

@bp.route('', methods=['POST'])
def get_llm_response():
    data = request.get_json()
    prompt = data.get('prompt')
    
    if not prompt:
        return jsonify({"error": "No prompt provided"}), 400

    try:
        llm_response = llm_service.generate_llm_response(prompt)  # Call the service function
        return jsonify({'response': llm_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500