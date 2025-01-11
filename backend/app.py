from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

# 환경 변수 로드
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    sentence = data.get('sentence', '')
    style = data.get('style', 'native')

    if not sentence or not style:
        return jsonify({'error': 'Invalid input'}), 400

    # OpenAI API 호출
    prompt = f"Rewrite this sentence in a {style} style, like a casual American Instagram post: {sentence}"
    try:
        response = openai.ChatCompletion.create(
            model="gpt-4o-mini",  # 최신 모델 사용
            messages=[
                {"role": "system", "content": "You are an expert in rewriting sentences into casual American Instagram style."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=100
        )
        translated_text = response['choices'][0]['message']['content'].strip()
        return jsonify({'translated': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
