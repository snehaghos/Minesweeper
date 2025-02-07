import React, { useState, useEffect, useRef } from "react";
import ThemeButton from "../Theme/ThemeButton";
import gameStart from "../assets/audio/gameStart.mp3";
import cellReveal from "../assets/audio/cellReveal.mp3";
import gameOver from "../assets/audio/gameOver.mp3";
import { useTheme } from "../Theme/ThemeProvider";
import './Minesweeper.css';
import Board from "../components/Board";
import GameOverModal from "../components/GameOverModal";
import WinModal from "../components/WinModal";
import RestartButton from "../components/RestartButton";
import InstructionModal from "../components/InstructionModal";

const BoardSize = 8;
const MineCount = 10;

const chcDirection = [
  [-1, -1], [-1, 0], [-1, 1],
  [0, -1], [0, 1],
  [1, -1], [1, 0],
  [1, 1],
];

function emptyBoard() {
  let board = [];
  for (let i = 0; i < BoardSize; i++) {
    let row = [];
    for (let j = 0; j < BoardSize; j++) {
      row.push({ isMine: false, count: 0, isFlagged: false });
    }
    board.push(row);
  }
  return board;
}

function minePlacing(board, firstClickRow, firstClickCol) {
  let count = 0;
  while (count < MineCount) {
    let row = Math.floor(Math.random() * BoardSize);
    let col = Math.floor(Math.random() * BoardSize);
    if (!board[row][col].isMine && (row !== firstClickRow || col !== firstClickCol)) {
      board[row][col].isMine = true;
      count++;
    }
  }
}

function calcAdjaNum(board) {
  for (let row = 0; row < BoardSize; row++) {
    for (let col = 0; col < BoardSize; col++) {
      if (!board[row][col].isMine) {
        let count = 0;
        for (let [dx, dy] of chcDirection) {
          let newRow = row + dx;
          let newCol = col + dy;
          if (
            newRow >= 0 && newRow < BoardSize &&
            newCol >= 0 && newCol < BoardSize &&
            board[newRow][newCol].isMine
          ) {
            count++;
          }
        }
        board[row][col].count = count;
      }
    }
  }
}

function initializeBoard(firstClickRow, firstClickCol) {
  let board = emptyBoard();
  minePlacing(board, firstClickRow, firstClickCol);
  calcAdjaNum(board);
  return board;
}

const Minesweeper = () => {
  const { theme } = useTheme();
  const [board, setBoard] = useState([]);
  const [points, setPoints] = useState(0);
  const [win, setWin] = useState(false);
  const [firstClick, setFirstClick] = useState(true);
  const [revealed, setRevealed] = useState(
    Array.from({ length: BoardSize }, () => Array(BoardSize).fill(false))
  );
  const [isGameOver, setIsGameOver] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const gameStartRef = useRef(null);
  const cellRevealRef = useRef(null);
  const gameOverRef = useRef(null);

  const homeStyle = {
    backgroundImage: `url('images/${theme}.jpg')`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  useEffect(() => {
    if (gameStartRef.current) {
      gameStartRef.current.play();
    }
  }, []);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  function handleClick(row, col) {
    if (revealed[row][col] || isGameOver || board[row][col].isFlagged) return;

    if (!isTimerRunning) {
      setIsTimerRunning(true);
    }

    let newBoard = [...board];
    let newRevealed = [...revealed];

    if (firstClick) {
      // first click does not hit a mine and has zero adjacent mines
      newBoard = initializeBoard(row, col);

      setBoard(newBoard);
      setFirstClick(false);

      setTimeout(() => {
        let updatedRevealed = [...newRevealed];
        floodFill(row, col, updatedRevealed, newBoard); // Ensure the first click reveals cells
        setRevealed(updatedRevealed);
      }, 0);

      return;
    }

    // after first click
    if (newBoard[row][col].isMine) {
      setIsTimerRunning(false);
      setRevealed(Array.from({ length: BoardSize }, () => Array(BoardSize).fill(true)));
      gameOverRef.current?.play();

      setTimeout(() => {
        setIsGameOver(true);
      }, 1500);
    } else {
      floodFill(row, col, newRevealed, newBoard);
      setRevealed(newRevealed);
      setPoints(points + 5);
      winCond(newRevealed);
    }

    if (cellRevealRef.current) {
      cellRevealRef.current.play();
    }
  }

  function handleRightClick(event, row, col) {
    event.preventDefault();

    if (revealed[row][col] || isGameOver) return;

    let newBoard = [...board];
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
  }

  function floodFill(row, col, newRevealed, newBoard) {
    let queue = [[row, col]];
    while (queue.length > 0) {
      let [r, c] = queue.shift();
      if (
        r < 0 || r >= BoardSize ||
        c < 0 || c >= BoardSize ||
        newRevealed[r][c] ||
        newBoard[r][c].isMine
      ) {
        continue;
      }

      newRevealed[r][c] = true;
      setPoints(points => points + 5);

      if (newBoard[r][c].count === 0) {
        for (let [dx, dy] of chcDirection) {
          queue.push([r + dx, c + dy]);
        }
      }
    }
  }

  function winCond(newRevealed) {
    let allNonMineCellsRevealed = true;
    for (let row = 0; row < BoardSize; row++) {
      for (let col = 0; col < BoardSize; col++) {
        if (!board[row][col].isMine && !newRevealed[row][col]) {
          allNonMineCellsRevealed = false;
          break;
        }
      }
    }
    if (allNonMineCellsRevealed) {
      setWin(true);
      setIsTimerRunning(false);
    }
  }

  function handleRestart() {
    setBoard(emptyBoard());
    setTimer(0);
    setIsTimerRunning(false);
    setRevealed(Array.from({ length: BoardSize }, () => Array(BoardSize).fill(false)));
    setIsGameOver(false);
    setWin(false);
    setPoints(0);
    setFirstClick(true);
  }

  return (
    <div className="flex flex-col items-center h-[100vh]" style={homeStyle}>
      <audio ref={gameStartRef} preload="auto">
        <source src={gameStart} type="audio/mp3" />
      </audio>
      <audio ref={cellRevealRef} preload="auto">
        <source src={cellReveal} type="audio/mp3" />
      </audio>
      <audio ref={gameOverRef} preload="auto">
        <source src={gameOver} type="audio/mp3" />
      </audio>
      <h1 className="text-4xl font-bold my-4 text-slate-200 font-luckiestGuy">Minesweeper</h1>

      <div className="flex flex-wrap justify-center md:justify-between items-center w-[80%] px-6 py-4 gap-8">
        <h1 className="text-2xl md:text-xl font-luckiestGuy text-slate-100">
          {MineCount} Mines 💣
        </h1>

        <h1 className="text-2xl md:text-xl font-luckiestGuy text-slate-100">
          <ThemeButton />
        </h1>

        <p className="text-2xl md:text-xl text-slate-100">
          Time: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
        </p>
      </div>

      <p className="absolute top-4 right-6 text-2xl md:text-3xl font-luckiestGuy text-slate-100">
        {points}
      </p>

      <Board
        board={board}
        revealed={revealed}
        handleClick={handleClick}
        handleRightClick={handleRightClick}
      />

      {isGameOver && (
        <GameOverModal
          points={points}
          timer={timer}
          onRestart={handleRestart}
        />
      )}

      {win && (
        <WinModal
          points={points}
          timer={timer}
          onRestart={handleRestart}
        />
      )}
      <div className="flex flex-row items-center w-full justify-center px-6 py-4 gap-4">
        {showInstructions && <InstructionModal onClose={() => setShowInstructions(false)} />}

        {/* Instructions Button */}
        <button
          onClick={() => setShowInstructions(true)}
          className="bg-blue-600 text-white px-6 py-2 rounded-md text-lg font-semibold mt-4">
          Instructions
        </button>
        <RestartButton onRestart={handleRestart} />

      </div>

    </div>
  );
};

export default Minesweeper;