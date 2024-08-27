import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { MenuContext } from "../context/MenuContext";

function Menu() {
  const { username } = useContext(AuthContext);
  const { mode, setMode, difficulty, setDifficulty, boardType, setBoardType, jsonFile, setJsonFile } = useContext(MenuContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }

    if (jsonFile !== null) {
      setJsonFile(null);
    }
  }, [username, navigate]);

  const handleStartGame = () => {
    if (mode === "manual" && boardType === "custom" && !jsonFile) {
      alert("Please upload a JSON file for custom board.");
      return;
    }

    if (mode === "bot" && !jsonFile) {
      alert("Please upload a JSON file for Bot mode.");
      return;
    }

    navigate("/game");
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const jsonContent = JSON.parse(event.target.result);
        setJsonFile(jsonContent);
      } catch (error) {
        console.error("Invalid JSON file", error);
        alert("The uploaded file is not a valid JSON.");
      }
    };

    if (file) {
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full relative">

        <button
          onClick={() => navigate("/main-menu")}
          className="absolute top-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-lg shadow-md focus:outline-none"
        >
          Back
        </button>

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

        {mode === "manual" && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Board Type:</label>
            <select
              value={boardType}
              onChange={(e) => setBoardType(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="random">Random Board</option>
              <option value="custom">Custom Board (JSON)</option>
            </select>
          </div> 
        )}

        {(mode === "bot" || (mode === "manual" && boardType === "custom")) && (
          <div className="mb-6">
            <label className="block text-gray-700 mb-2">Upload JSON File:</label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {mode === "manual" && boardType === "random" && (
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
        )}

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
