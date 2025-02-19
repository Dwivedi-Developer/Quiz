import React, { useState } from "react";

const Question = ({ question, selectedAnswer, questionIndex, onAnswer, timeUp }) => {
  const [userInput, setUserInput] = useState("");
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null); // Track correctness

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleOptionSelect = (option) => {
    if (!submitted) {
      setSelectedOption(option);
    }
  };

  const handleSaveAnswer = () => {
    if (!selectedOption && userInput === "" ) return;
    if(timeUp) return ;

    const isAnswerCorrect = question.options
      ? selectedOption === question.correctAnswer
      : userInput === question.correctAnswer;

    setIsCorrect(isAnswerCorrect);
    setSubmitted(true);

    setTimeout(() => {
      onAnswer(question.options ? selectedOption : userInput);
      setUserInput("");
      setSelectedOption(null);
      setSubmitted(false);
      setIsCorrect(null);
    }, 1000);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto w-full mt-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{question.question}</h3>
      </div>

      {question.options ? (
        <ul className="space-y-4">
          {question.options.map((option, index) => {
            let bgColor = "bg-gray-100 hover:bg-gray-200 border border-gray-300";
            if (submitted && selectedOption === option) {
              bgColor = isCorrect ? "bg-green-500 text-white border-green-700" : "bg-red-500 text-white border-red-700";
            } else if (selectedOption === option) {
              bgColor = "bg-blue-100 border-blue-500 shadow-md";
            }

            return (
              <li
                key={index}
                className={`flex items-center p-3 rounded-lg shadow-sm transition cursor-pointer border-2 ${bgColor}`}
                onClick={() => handleOptionSelect(option)}
              >
                <input
                  type="radio"
                  id={`option-${index}`}
                  name="answer"
                  value={option}
                  checked={selectedOption === option}
                  className="mr-3 w-5 h-5 hidden"
                  readOnly
                />
                <label htmlFor={`option-${index}`} className="text-gray-700 font-medium cursor-pointer w-full">
                  {String.fromCharCode(65 + index)}. {option}
                </label>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className="flex flex-col gap-4">
          <input
            type="text"
            value={userInput}
            onChange={handleInputChange}
            disabled={timeUp || submitted}
            placeholder="Enter your answer"
            className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 ${
              submitted ? (isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white") : ""
            }`}
          />
        </div>
      )}

      {/* Save and Next Button */}
      <button
        onClick={handleSaveAnswer}
        disabled={(!selectedOption && userInput === "") || timeUp || submitted}
        className={`mt-4 px-6 py-2 font-semibold rounded-lg shadow-md transition 
          ${selectedOption || userInput !== "" ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-400 text-gray-700 cursor-not-allowed"}
        `}
      >
        Save and Next
      </button>

      {timeUp && <p className="text-red-600 font-bold mt-4">Time's up!</p>}
    </div>
  );
};

export default Question;
