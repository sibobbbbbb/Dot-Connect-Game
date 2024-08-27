import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function MainMenu() {
  const { username } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
  }, [username, navigate]);
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 text-white">
      <div className="bg-white text-gray-800 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-3xl font-semibold text-center mb-4">
          Hello {username}!
        </h2>
        <p className="text-center mb-8">Welcome to Dot Connect Game</p>

        <button
          onClick={() => navigate("/menu")}
          className="w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Play Game
        </button>

        <button
          onClick={() => navigate("/leaderboard")}
          className="my-4 w-full bg-blue-500 text-white py-2 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
        >
          Leaderboard
        </button>
      </div>
    </div>
  );
}

export default MainMenu;
