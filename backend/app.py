from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return {'message': 'Quiz Game API is running!'}

@app.route('/question')
def get_question():
    return jsonify({
        'question': 'What is the capital of France?',
        'options': ['London', 'Berlin', 'Paris', 'Madrid', 'Ireland'],
        'correct_answer': 2
    })

@app.route('/health')
def get_health():
    return jsonify({
        'correctAnswer': "colon cancer",
        'options': ['colon cancer', 'skin cancer', 'breast cancer', 'prostate cancer'],
        'question': "Which cancer has bloody stool as one of its common symptoms?"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)