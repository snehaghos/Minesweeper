import { useEffect, useState } from "react";

const InstructionModal = ({ onClose }) => {
  const [message, setMessage] = useState("Right-click to flag a mine!");

  useEffect(() => {
    const timeout1 = setTimeout(() => setMessage("Let's start the game!"), 2000);
    const timeout2 = setTimeout(() => onClose(), 3000);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center">
        <p className="text-lg font-semibold">{message}</p>
      </div>
    </div>
  );
};

export default InstructionModal;
