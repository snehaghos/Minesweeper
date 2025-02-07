import React from 'react';

const GameOverModal = ({ points, timer, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-luckiestGuy">{points}</p>
        <p className="text-2xl">Time: {timer}s</p>
        <h2 className="text-4xl py-4 font-bold text-red-500 font-luckiestGuy">Game Over</h2>
        <h2 className="text-8xl py-4 font-bold text-red-500 font-luckiestGuy">🥹</h2>
        <p className="mb-4 text-2xl text-red-500 font-luckiestGuy">You have hit a mine. Better luck next time.</p>
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
          onClick={onRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;