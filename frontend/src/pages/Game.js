import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { MenuContext } from "../context/MenuContext";
import { AuthContext } from "../context/AuthContext";
import generateBoard from "../logic/generateBoard";

const Game = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [startDot, setStartDot] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const { username } = useContext(AuthContext);
  const { mode, difficulty } = useContext(MenuContext);

  useEffect(() => {
    if (!username) {
      navigate('/');
    }
    const initialBoard = generateBoard(difficulty);
    setBoard(initialBoard);
  }, [difficulty, username, navigate]);

  const isValidMove = (rowIndex, colIndex) => {
    const [lastRow, lastCol] = currentPath[currentPath.length - 1];
    const isSelisihSatu =
      (Math.abs(lastRow - rowIndex) === 1 && lastCol === colIndex) ||
      (Math.abs(lastCol - colIndex) === 1 && lastRow === rowIndex);

    return isSelisihSatu && board[rowIndex][colIndex] === 0;
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    if (board[rowIndex][colIndex] === 2) {
      // start dari titik awal
      setStartDot([rowIndex, colIndex]);
      setCurrentPath([[rowIndex, colIndex]]);
      updateBoard(rowIndex, colIndex, 3);
    } else if (board[rowIndex][colIndex] === 3) {
      // start ga dari titik awal
      const index = currentPath.findIndex(
        ([r, c]) => r === rowIndex && c === colIndex
      );
      const newPath = currentPath.slice(0, index + 1);
      for (let i = index + 1; i < currentPath.length; i++) {
        const [r, c] = currentPath[i];
        updateBoard(r, c, 0);
      }
      setCurrentPath(newPath);
      setStartDot([rowIndex, colIndex]);
    }
  };

  const handleMouseUp = () => {
    setStartDot(null);
  };

  const handleMouseEnter = (rowIndex, colIndex) => {
    if (!startDot) return;

    // kalo user nya balik
    const isReturning =
      currentPath.length > 1 &&
      rowIndex === currentPath[currentPath.length - 2][0] &&
      colIndex === currentPath[currentPath.length - 2][1];

    if (isReturning) {
      const [lastRow, lastCol] = currentPath.pop();
      updateBoard(lastRow, lastCol, 0);
      setCurrentPath([...currentPath]);
    } else if (isValidMove(rowIndex, colIndex)) {
      setCurrentPath([...currentPath, [rowIndex, colIndex]]);
      updateBoard(rowIndex, colIndex, 3);
    }
  };

  const updateBoard = (rowIndex, colIndex, value) => {
    const newBoard = [...board];
    newBoard[rowIndex][colIndex] = value;
    setBoard(newBoard);
  };

  const renderLines = () => {
    return currentPath.map(([startRow, startCol], index) => {
      if (index === currentPath.length - 1) return null;
      const [endRow, endCol] = currentPath[index + 1];
  
      // Penyesuaian posisi koordinat untuk menggambar garis
      const dotSize = 70; // Ukuran dot
      const gapSize = 15; // Jarak antar dot
      const dotOffset = dotSize / 2; // Setengah ukuran dot untuk mendapatkan titik tengah
      const x1 = startCol * (dotSize + gapSize) + dotOffset;
      const y1 = startRow * (dotSize + gapSize) + dotOffset;
      const x2 = endCol * (dotSize + gapSize) + dotOffset;
      const y2 = endRow * (dotSize + gapSize) + dotOffset;
  
      return (
        <line
          key={`${startRow}-${startCol}-${endRow}-${endCol}`}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="#1D4ED8"
          strokeWidth="10"
          strokeLinecap="round" 
        />
      );
    });
  };
  
  const renderBoard = () => {
    const dotSize = 70; // Ukuran dot
    const gapSize = 10; // Jarak antar dot
  
    return (
      <div className="flex justify-center">
        {board.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${board[0].length}, ${dotSize}px)`,
              gap: `${gapSize}px`,
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "12px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <svg
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                pointerEvents: "none",
              }}
            >
              {renderLines()}
            </svg>
            {board.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                  onMouseUp={handleMouseUp}
                  onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                  className={clsx(
                    "border-2 rounded-full flex items-center justify-center cursor-pointer",
                    {
                      "bg-black": cell === 1,
                      "bg-green-500": cell === 2,
                      "bg-white": cell === 0,
                      "bg-blue-700": cell === 3,
                    }
                  )}
                  style={{
                    width: `${dotSize}px`,
                    height: `${dotSize}px`,
                  }}
                />
              ))
            )}
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 text-white">
      <h1 className="text-4xl font-bold mb-8">Dot Connect</h1>
      <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
        {renderBoard()}
      </div>
      <button
        onClick={() => navigate("/menu")}
        className="mt-8 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
      >
        Back to Menu
      </button>
    </div>
  );
};

export default Game;
