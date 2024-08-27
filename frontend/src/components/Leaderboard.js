import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Leaderboard() {
  const [scores, setScores] = useState([]);
  const [level, setLevel] = useState("beginner");
  const [mode, setMode] = useState("manual");
  const navigate = useNavigate(); // Untuk navigasi

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/score/leaderboard?level=${level}&mode=${mode}`
        );
        const data = await response.json();
        if (response.ok) {
          setScores(data);
        } else {
          console.error("Failed to fetch leaderboard:", data.message);
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      }
    };
    if (mode === "bot") {
      setLevel("beginner");
    }
    fetchLeaderboard();
  }, [level, mode]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">
        <button
          onClick={() => navigate("/main-menu")}
          className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md focus:outline-none"
        >
          Back
        </button>

        <h2 className="text-3xl font-semibold text-center mb-6">Leaderboard</h2>

        <div className="mb-4 flex justify-between">
          <div>
            <label className="block text-gray-700 mb-2">Mode:</label>
            <select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="manual">Manual</option>
              <option value="bot">Bot</option>
            </select>
          </div>

          <div>
            {mode !== "bot" && (
              <>
                <label className="block text-gray-700 mb-2">Level:</label>
                <select
                  value={level}
                  onChange={(e) => setLevel(e.target.value)}
                  className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="beginner">Beginner</option>
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </>
            )}
          </div>
        </div>

        <ul className="space-y-3">
          {scores.map((score, index) => (
            <li
              key={index}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex justify-between"
            >
              <span>
                {index + 1}. {score.username}
              </span>
              <span>{score.time} seconds</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Leaderboard;
