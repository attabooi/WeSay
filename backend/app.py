from flask import Flask, request, jsonify
import openai
from dotenv import load_dotenv
import os

app = Flask(__name__)

# 환경 변수 로드
load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")  # OpenAI API 키 설정

@app.route('/translate', methods=['POST'])
def translate():
    data = request.json
    sentence = data.get('sentence', '')
    style = data.get('style', 'native')

    if not sentence or not style:
        return jsonify({'error': 'Invalid input'}), 400

    # OpenAI API 호출
    prompt = f"Rewrite this sentence in a {style} English style. Make it sound like a conversation between friends in the TV show Friends—warm, casual, and with some natural slang thrown in. The vibe should feel like a light, effortless chat between close friends: {sentence}"
    try:
        completion = openai.chat.completions.create(
            model="gpt-4", 
            messages=[
                {"role": "system", "content": "You are an expert at rewriting sentences in a warm, casual, and playful American conversational style. Imagine your responses sound like dialogue between friends in the TV show Friends—relatable, natural, and with some slang or casual expressions. Jokes can be included if they fit naturally, but they are not mandatory. Focus on making the tone light, friendly, and authentic, rather than forcing humor."},
                {"role": "user", "content": prompt}
            ]
        )
        translated_text = completion.choices[0].message.content.strip()
        return jsonify({'translated': translated_text})


    except Exception as e:
        print(f"Error calling OpenAI API: {e}")
        return jsonify({'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
