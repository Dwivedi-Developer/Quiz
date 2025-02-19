import React, { useEffect, useState } from "react";

const Scoreboard = ({ score, totalQuestions, onRetry, answerHistory  }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    saveScore(score, totalQuestions);
    loadScoreHistory();
  }, []);

  const saveScore = async (score, total) => {
    if (!("indexedDB" in window)) return;

    const request = indexedDB.open("QuizDB", 1);
    request.onupgradeneeded = (event) => {
      let db = event.target.result;
      if (!db.objectStoreNames.contains("scores")) {
        db.createObjectStore("scores", { keyPath: "id", autoIncrement: true });
      }
    };

    request.onsuccess = (event) => {
      let db = event.target.result;
      let transaction = db.transaction("scores", "readwrite");
      let store = transaction.objectStore("scores");
      store.add({ score, total, date: new Date().toLocaleString() });
    };
  };

  const loadScoreHistory = () => {
    if (!("indexedDB" in window)) return;

    const request = indexedDB.open("QuizDB", 1);
    request.onsuccess = (event) => {
      let db = event.target.result;
      let transaction = db.transaction("scores", "readonly");
      let store = transaction.objectStore("scores");
      let getAll = store.getAll();

      getAll.onsuccess = () => {
        setHistory(getAll.result.reverse()); // Show latest first
      };
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6 text-center">
      <h2 className="text-3xl font-bold text-gray-800">Quiz Completed!</h2>
      <p className="text-xl font-semibold text-gray-700 mt-4">
        Your Score: {score} / {totalQuestions}
      </p>
      <div className="flex flex-wrap justify-center gap-2 mt-6">
        
          {answerHistory.map((record, index) => (
            <div
              key={index}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-white font-bold text-sm shadow-md ${
                record.isCorrect ? "bg-green-500" : "bg-red-500"
              }`}
            >
            {index + 1}
          </div>
        ))}
      </div>
      <div className="flex items-center justify-center gap-4 mt-4">
        <span className="text-green-600 font-bold">✔ Correct</span>
        <span className="text-red-600 font-bold">✖ Incorrect</span>
      </div>

      <button
        onClick={onRetry}
        className="mt-6 px-6 py-3 text-lg font-semibold text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md focus:outline-none focus:ring-4 focus:ring-blue-300"
      >
        Reattempt Quiz
      </button>

      {/* Score History Section */}
      <div className="mt-10 w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Score History</h3>
        {history.length > 0 ? (
          <ul className="space-y-4">
            {history.map((entry, index) => (
              <li
              key={index}
              className={`p-4 rounded-lg shadow-md border-l-8 transition duration-300 ease-in-out transform hover:scale-105 ${
                entry.score >= entry.totalQuestions / 2 ? "border-green-500 bg-green-50" : "border-red-500 bg-red-50"
              }`}
            >
              <p className="text-lg font-semibold text-gray-800">Attempt {history.length - index}</p>
              <p className="text-sm text-gray-600">Date: {entry.date}</p>
              <p className="text-lg font-medium mt-1">
                Score: <span className="font-bold text-gray-900">{entry.score} / {entry.total}</span>
              </p>
            </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No quiz history available.</p>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
