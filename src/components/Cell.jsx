import React from "react";

const Cell = ({
  rowIndex,
  colIndex,
  handleClick,
  handleRightClick,
  revealed,
  cell,
}) => {
  return (
    <button
      key={`${rowIndex}-${colIndex}`}
      onClick={() => handleClick(rowIndex, colIndex)}
      onContextMenu={(e) => handleRightClick(e, rowIndex, colIndex)}
      className={`w-12 h-12 sm:w-14 sm:h-14 border border-gray-400 flex items-center justify-center text-lg font-bold transition-all duration-300 ease-in-out ${revealed[rowIndex][colIndex]
        ? cell.isMine
          ? "text-white"
          : cell.count === 0
            ? "bg-gray-300 text-gray-900 blankbox"
            : "bg-gray-300 text-gray-900 numberbox"
        : cell.isFlagged
          ? "bg-yellow-400 text-black"
          : "bg-gray-200/30 hover:bg-slate-400 hover:scale-105"
        }`}
    >
      {revealed[rowIndex][colIndex]
        ? cell.isMine
          ? "💣"
          : cell.count || " "
        : cell.isFlagged
          ? "🚩"
          : ""}
    </button>
  );
};

export default Cell;
