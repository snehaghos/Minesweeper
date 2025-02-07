import React from "react";

const Timer = ({ timer }) => {
  return (
    <p className="text-2xl text-slate-100">
      Time: {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, "0")}
    </p>
  );
};

export default Timer;
