import React from 'react';

const RestartButton = ({ onRestart }) => {
  return (
    <button
      onClick={onRestart}
      className="mt-4 px-6 py-4 bg-slate-50/60 font-bold rounded-lg shadow-lg text-slate-50 text-shadow-lg drop-shadow-[0_1.2px_1.2px_rgba(0,0,0,0.8)]"
    >
      Start
    </button>
  );
};

export default RestartButton;