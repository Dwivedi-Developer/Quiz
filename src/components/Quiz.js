import React, { useState } from "react";
import Question from "./Question";
import Timer from "./Timer";
import Scoreboard from "./Scoreboard";
import quizData from "../data/quizData";

const Quiz = () => {
  const [currentTypeIndex, setCurrentTypeIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected option

  const currentType = quizData[currentTypeIndex];
  const currentQuestion = currentType.questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentType.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    } else if (currentTypeIndex < quizData.length - 1) {
      setCurrentTypeIndex((prevIndex) => prevIndex + 1);
      setCurrentQuestionIndex(0);
    } else {
      setShowScore(true);
    }
    setSelectedAnswer(null); // Reset the selected answer for the next question
    setResetTrigger((prev) => prev + 1); // Reset timer
  };

  const handleAnswer = (selectedAnswer) => {
    setSelectedAnswer(selectedAnswer); // Store selected answer in state

    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 300); // Small delay for UI smoothness
  };

  const handleFinishQuiz = () => {
    if (window.confirm("Do you want to finish your quiz?")) {
      setShowScore(true);
    }
  };

  const handleRetry = () => {
    setCurrentTypeIndex(0);
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
    setResetTrigger(0);
    setSelectedAnswer(null);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      {showScore ? (
        <Scoreboard
          score={score}
          totalQuestions={quizData.flatMap((type) => type.questions).length}
          onRetry={handleRetry}
        />
      ) : (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6 relative">
          <button
            onClick={handleFinishQuiz}
            className="absolute top-4 right-4 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition"
          >
            Finish
          </button>
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">{currentType.type}</h2>
          <Timer timeLimit={30} onTimeUp={handleNextQuestion} resetTrigger={resetTrigger} />
          <Question
            question={currentQuestion}
            onAnswer={handleAnswer}
            selectedAnswer={selectedAnswer} // Pass selected answer state
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;