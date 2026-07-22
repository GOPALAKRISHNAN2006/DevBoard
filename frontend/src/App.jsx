import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import Login from './pages/auth/Login.jsx'
import Register from './pages/auth/Register.jsx'
import Dashbaord from './pages/dashboard/Dashboard.jsx';

function App() {
  return(
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register/>}/> 
        <Route path="/dashboard" element={<Dashbaord/>}/>
      </Routes>
    </BrowserRouter>
  );
}
export default App
