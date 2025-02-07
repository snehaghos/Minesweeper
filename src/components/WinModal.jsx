import React from 'react';

const WinModal = ({ points, timer, onRestart }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <p className="text-2xl font-luckiestGuy">{points}</p>
        <h2 className="text-4xl py-4 font-bold text-green-500 font-luckiestGuy">Congratulations</h2>
        <h2 className="text-8xl py-4 font-bold text-red-500 font-luckiestGuy">🥳</h2>
        <p className="text-2xl">Time: {timer}s</p>
        <p className="mb-4 text-2xl text-green-500 font-luckiestGuy">You have won the game.</p>
        <button
          className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
          onClick={onRestart}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default WinModal;