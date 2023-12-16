import { useEffect, useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/login'
import Home from './components/home';
import Nav from './components/nav';
import ActivitiesForMonth from './components/activitiesFormonth';
import ItemsForMonth from './components/itemsForMonth';

 function App() {
  return (
    <BrowserRouter>
      <Nav/>

      <Routes>

        <Route  path="/" element={<Login />}/>
        


        <Route path="/activities" element={<Home/>} />
        <Route path="/activitiesForMonth" element={<ActivitiesForMonth/>} />
        <Route path="/month/:id" element={<ItemsForMonth/>} />


        
          <Route path="*" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App
