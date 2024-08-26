import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import clsx from "clsx";
import { MenuContext } from "../context/MenuContext";
import { AuthContext } from "../context/AuthContext";
import generateBoard from "../logic/generateBoard";
import solveDotConnect from "../logic/botSolver";

const Game = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([]);
  const [startDot, setStartDot] = useState(null);
  const [currentPath, setCurrentPath] = useState([]);
  const { username } = useContext(AuthContext);
  const { mode, difficulty, jsonFile } = useContext(MenuContext);
  const [stopwatch, setStopwatch] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [dotToWin, setDotToWin] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [winningTime, setWinningTime] = useState(0);
  const [isBotRunning, setIsBotRunning] = useState(false); // Apakah bot sedang berjalan
  const [botIndex, setBotIndex] = useState(0); // Index path bot saat ini

  const findStartDot = (board) => {
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[i].length; j++) {
        if (board[i][j] === 2) {
          return [i, j];
        }
      }
    }
    return null;
  };

  const countZero = (matrix) => {
    let count = 0;
    for (let i = 0; i < matrix.length; i++) {
      for (let j = 0; j < matrix[i].length; j++) {
        if (matrix[i][j] === 0) {
          count++;
        }
      }
    }
    return count;
  };

  useEffect(() => {
    if (!username) {
      navigate("/");
    }

    var initialBoard =
      mode === "bot" ? jsonFile.board : generateBoard(difficulty);
    setBoard(initialBoard);
    const count = countZero(initialBoard);
    setDotToWin(count);
    setIsRunning(true);
  }, [jsonFile, difficulty, username, navigate, mode]);

  useEffect(() => {
    if (mode === "bot" && isRunning) {
      const startDot = findStartDot(board);
      const startTime = performance.now();
      const solutionPath = solveDotConnect(
        board,
        startDot[0],
        startDot[1],
        dotToWin
      );
      const endTime = performance.now();
      const solvingTime = endTime - startTime;
      setWinningTime(solvingTime / 1000);
      setCurrentPath(solutionPath);
      setIsBotRunning(true); // Mulai jalur bot
    }
  }, [mode, isRunning]);

  useEffect(() => {
    if (isBotRunning && currentPath.length > 0) {
      const interval = setInterval(() => {
        setBotIndex((prevIndex) => {
          const nextIndex = prevIndex + 1;
          if (nextIndex < currentPath.length) {
            const [row, col] = currentPath[nextIndex];
            updateBoard(row, col, 3);
            return nextIndex;
          } else {
            // Bot selesai
            clearInterval(interval);
            setIsBotRunning(false);
            setIsWinner(true);
            return prevIndex;
          }
        });
      }, 100); // Jeda antara langkah-langkah bot
      return () => clearInterval(interval);
    }
  }, [currentPath, isBotRunning, stopwatch]);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatch((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && stopwatch !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, stopwatch]);

  useEffect(() => {
    if (
      mode === "manual" &&
      dotToWin !== 0 &&
      currentPath.length - 1 === dotToWin
    ) {
      setTimeout(() => {
        setIsWinner(true);
        setWinningTime(stopwatch);
      }, 100);
    }
  }, [currentPath, dotToWin]);

  const isValidMove = (rowIndex, colIndex) => {
    const [lastRow, lastCol] = currentPath[currentPath.length - 1];
    const isSelisihSatu =
      (Math.abs(lastRow - rowIndex) === 1 && lastCol === colIndex) ||
      (Math.abs(lastCol - colIndex) === 1 && lastRow === rowIndex);

    return isSelisihSatu && board[rowIndex][colIndex] === 0;
  };

  const handleMouseDown = (rowIndex, colIndex) => {
    if (mode === "bot" || isBotRunning) return; // Cegah interaksi
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
    if (mode === "bot" || isBotRunning) return; // Cegah interaksi
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
    if (mode === "bot") {
      return currentPath
        .slice(0, botIndex + 1)
        .map(([startRow, startCol], index) => {
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
    } else {
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
    }
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
      {!isWinner && mode === "manual" && (
        <>
          <div className="flex items-center gap-4">
            <p className="text-lg">Time: {stopwatch} seconds</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
            {renderBoard()}
          </div>
          <button
            onClick={() => navigate("/menu")}
            className="mt-8 bg-red-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-red-600 transition duration-300"
          >
            Back to Menu
          </button>
        </>
      )}
      {!isWinner && mode === "bot" && (
        <>
          <div className="flex items-center gap-4">
            <p className="text-lg">Bot is solving... Please wait.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg text-gray-800">
            {renderBoard()}
          </div>
        </>
      )}
      {isWinner && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4 text-black">
              Congratulations!
            </h2>
            <p className="mb-4 text-black">You have connected all the dots!</p>
            <p className="mb-8 text-black">Time taken: {winningTime} seconds</p>
            <button
              onClick={() => navigate("/menu")}
              className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
            >
              Back to Menu
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
