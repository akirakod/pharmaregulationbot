# python-backend/services/llm_service.py
from ..utils.vertex_utils import llm_model 

def generate_llm_response(prompt):
    # print(f"\n[DEBUG] Prompt sent to LLM:\n{prompt}\n")
    try:
        response = llm_model.generate_content(
            prompt,
            generation_config={"temperature": 0.4, "top_p": 0.8, "top_k": 10},  
        )
        return response.text
    except Exception as e:
        raise Exception(f"Error generating LLM response: {e}") 