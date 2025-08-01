from flask import Flask, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

def getConnection():
    return mysql.connector.connect (
        host='127.0.0.1',
        port=3306,
        user='root',
        password='root',
        database='quiz'
    )


@app.route('/')
def home():
    return {'message': 'Quiz Game API is running!'}

@app.route('/questions')
def get_question():
    try:
        connection = getConnection()
        cursor = connection.cursor(dictionary=True)

        cursor.execute("SELECT * FROM questions ORDER BY RAND() LIMIT 5")
        rawQuestions = cursor.fetchall()
        questions = []
        for q in rawQuestions:
            transformed_question = {
                'id': q['id'],
                'questionText': q['questionText'],
                'options': [q['optionA'], q['optionB'], q['optionC'], q['optionD']],  # Convert to array
                'correctAnswer': q['correctAnswer'],
                'category': q['category']
            }
            questions.append(transformed_question)
        

        cursor.close()
        connection.close()
        if questions:
            return jsonify(
                {
                    "code": 200,
                    "data": questions
                }
            )
        else:
            return jsonify({"code": 400, "data": {"message": "Error retrieving questions"}})
    except Exception as e:
        return jsonify({"Error": str(e)}), 500

@app.route('/health')
def get_health():
    return jsonify({
        'correctAnswer': 0,
        'options': ['colon cancer', 'skin cancer', 'breast cancer', 'prostate cancer'],
        'question': "Which cancer has bloody stool as one of its common symptoms?"
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)