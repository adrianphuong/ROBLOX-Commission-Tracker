import React from 'react'
import {useState, useEffect} from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { checkAuth } from './HandleAPI/HandleAPI';
import History from '../src/History/History'
import Settings from '../src/Settings/Settings'
import Landing from '../src/Home/Landing'
import Home from '../src/Home/Home'
import Calculator from '../src/Calculator/Calculator'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth(setAuthenticated)
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 2000); // 2000 milliseconds delay
      });
  }, []);

  if (isLoading) {
    return (
      <div className="gooey bg-black">
        <span className="dot"></span>
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route index element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/calculator" element={<Calculator />} />
        <Route path="/history" element={<History />} />
        <Route path= "/settings" element={<Settings/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  )
}