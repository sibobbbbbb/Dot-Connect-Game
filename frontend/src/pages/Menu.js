import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";

function Menu() {
  const { username } = useContext(AuthContext);
  const { mode, setMode, difficulty, setDifficulty } = useContext(MenuContext);
  const navigate = useNavigate();

  const handleStartGame = () => {
    console.log("Starting game with settings:", { username, mode, difficulty });
    navigate("/game"); 
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Hello {username}!
        </h2>
        <p className="text-center mb-8">Welcome to Dot Connect Game</p>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Game Mode:</label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="manual">Manual Mode</option>
            <option value="bot">Bot Mode</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Difficulty Level:</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="beginner">Beginner</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <button
          onClick={handleStartGame}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Start Game
        </button>
      </div>
    </div>
  );
}

export default Menu;
