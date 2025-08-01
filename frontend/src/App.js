import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import { getRequest, postRequest } from './utils/apiUtils';
import { Route, Routes, Navigate } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [questions, setQuestions] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [gameFinished, setGameFinished] = useState(false);
  const [score, setScore] = useState(0);
  useEffect(() => {
    const getQuestions = async () => {
      try {
        const res = await getRequest(
          {
            url: '/questions'
          }
        )
        if (res.code == 200) {
          setQuestions(res.data);
          console.log("Successfully retrieved questions", res.data)
        }
        else {
          console.error(res)
        }
        setLoading(false);
      }
      catch (error) {
        console.error(error)
        setLoading(false)
      }
    }
    getQuestions();
  }, [])

  const handleAnswerClick = async (question, index) => {
    if (selectedOption != null) {
      return;
    }
    console.log(index)
    console.log(question.correctAnswer)
    setSelectedOption(index)
    if (index == question.correctAnswer) {
      console.log("Correct!")
      setFeedback("Correct!")
      setScore(score + 1)
    }
    else {
      console.log("Wrong!")
      setFeedback("Wrong!")
    }
  }

  const handleQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
    }
    else {
      setGameFinished(true)
    }
    setFeedback(null);
    setSelectedOption(null);
  }

  if (loading) return <div>Loading...</div>
  if (!questions) return <div>Error loading questions</div>

  if (gameFinished == true) {
    return (
      <div className='App'>
        <h1>Quiz Finished!</h1>
        <h2>Your Score: {score} / {questions.length}</h2>
        <button onClick={() => window.location.reload()}>Play Again</button>
      </div>
    )
  }

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <div className="container mt-5">
      <div className='row justify-content-center'>
        <div className='col-md-8'>
          <div className='text-center mb-4'>
            <h1>Quiz Game</h1>
            <p>Current Score: {score} / {questions.length}</p>
            <p>Question {currentQuestionIndex + 1} of {questions.length}</p>
            <div className="card">
              <div className='card-body'>
                <h2 className='card-title py-3'>{currentQuestion.questionText}</h2>
                <div className='d-grid gap-2 mb-2 px-4'>
                  {currentQuestion.options.map((option, index2) => (
                    <button key={index2} className={`btn ${selectedOption == index2 ? (selectedOption == currentQuestion.correctAnswer ? 'btn-success' : 'btn-danger'): 'btn-outline-secondary'}`}
                      onClick={() => handleAnswerClick(currentQuestion, index2)}>
                      {option}
                    </button>
                  ))}
                </div>
                {feedback && (
                  <div className='text-center px-5'>
                    <div className='alert alert-info'>
                      {feedback}
                    </div>
                    <button onClick={()=>handleQuestion()}>
                      {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button> 
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
