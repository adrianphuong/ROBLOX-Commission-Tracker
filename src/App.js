import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../src/Home/Landing'
import Home from '../src/Home/Home'

export default function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element = {<Landing/>}/>
          <Route path ="/home" element = {<Home/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}