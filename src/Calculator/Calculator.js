import React from 'react'
import Navbar from '../Navbar/Navbar'
import { useState, useEffect } from 'react'
import TopNavbar from '../Navbar/TopNavbar';
import robuxSymbol from '../Assets/robux.png'

export const Calculator = () => {
  const [robux, setRobux] = useState(0);
  const [USD, setUSD] = useState(0);
  useEffect(() => {
    if(robux > 0) {
        var conversion = parseInt(robux) * 0.0035;
        setUSD(parseFloat(conversion).toFixed(2));
    }
    else {
        setUSD(0)
    }
  });
  return (
    <div className='home-page-container w-full h-screen bg-neutral-100'>
        <Navbar />
        <TopNavbar />
        <h1 className='title w-full pt-40 text-center text-neutral-800 tracking-tight text-5xl font-bold select-none'>Roblox <b>DevEx</b> Calculator</h1>
        <h1 className='title w-1/2 m-auto pt-4 text-center text-neutral-500 text-md italic select-none'>If you're part of the developer exchange program on ROBLOX, use this calculator to see how much robux converts to USD.</h1>
        <div className='calculator-container w-full m-auto'>
            <div className='flex w-2/3 m-auto h-72'>
                <img className='w-30 h-20 my-auto mr-4' src = {robuxSymbol} alt = ''/>
                <input onChange={(e) => setRobux(e.target.value)} className='robux-input text-7xl w-1/3 text-center font-semibold overflow-x-auto focus:outline-none bg-neutral-100 ' placeholder='Input...'></input>
                <div className='robux-output text-7xl select-none w-1/2 tracking-tighter text-center font-semibold my-auto'>${USD}</div>
            </div>
        </div>
    </div>
  )
}

export default Calculator;