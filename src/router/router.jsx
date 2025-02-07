import React from 'react'
import {  Route, Routes } from 'react-router-dom';
import Guestlayout from '../layouts/Guestlayout';
import MinesweeperIndex from '../Minesweeper/MinesweeperIndex';
import IndexHome from '../Minesweeper/IndexHome';




const Router = () => {
  return (

    <Routes>
      <Route path='/' element={<Guestlayout/>}>
        <Route index element={<IndexHome />} />
        <Route path='minesweeper' element={<MinesweeperIndex />} />
   
  

      </Route>
      
    </Routes>

  );
};

export default Router