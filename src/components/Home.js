import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
          Dacoid Quiz Platform
        </h1>

        <div className="bg-gray-200 p-4 rounded-lg text-left">
          <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>For multiple-choice questions, select the one best answer (A, B, C, or D).</li>
            <li>For integer-type questions, write your numerical answer clearly.</li>
            <li>No calculators unless specified.</li>
            <li>You have <span className="font-bold">30 minutes</span> to complete this quiz.</li>
          </ul>
        </div>

        <button
          onClick={() => navigate("/quiz")}
          className="mt-6 px-6 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
};

export default Home;
