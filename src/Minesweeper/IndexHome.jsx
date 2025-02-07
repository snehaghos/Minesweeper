import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import gameStart from "../assets/audio/gameStart.mp3";


const IndexHome = () => {
    const gameStartRef = useRef(null);
  
    const navigate=useNavigate();
  const homeStyle = {
    backgroundImage: "url('images/bg1.jpg')",
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const flyInAnimation = {
    initial: { y: '-100vh', opacity: 0 }, 
    animate: { y: 0, opacity: 1 }, 
    transition: { type: 'spring', stiffness: 70, duration: 3.5 },
  };

  return (
    <div style={homeStyle}>
        {/* <audio ref={gameStartRef} src="/audio/gamestart.mp3"></audio> */}
      <motion.div
        className="text-8xl font-extrabold font-luckiestGuy text-white cursor-pointer drop-shadow-2xl flex justify-center flex-col gap-6 items-center h-[100vh] neon-border"
        initial="initial"
        animate="animate"
        variants={flyInAnimation} 
       
      >
        Minesweeper
        <div className='text-white text-2xl font-bold text-center cursor-pointer drop-shadow-2xl bg-gray-100/40 p-4 rounded-md' onClick={() => navigate('/minesweeper')}>
        Play Game
      </div>
      </motion.div>
     
    </div>
  );
};

export default IndexHome;
