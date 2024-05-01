import React from 'react'
import ROBLOX from '../Assets/Roblox-Logo.png'
import axios from 'axios'

const redirectToOAuth = () => {
  axios.get('http://localhost:10000/api/authenticate')
    .then(response => {
      window.location.href = response.data.redirect;
    })
    .catch(error => {
      console.error('Error redirecting', error);
    })
}

export const Landing = () => {
  return (
    <div className='flex h-screen'>
        <div className='h-1/3 m-auto'>
          <h1 className='text-7xl w-8/12 m-auto text-center font-bold font-inter tracking-tighter text-neutral-700'>The <b>ROBLOX</b> Commission Tracker.</h1>
          <h2 className='w-2/3 mt-10 m-auto text-md text-center font-semibold  text-neutral-700 font-inter tracking-wide'>
          Keeping your graphic design projects organized is essential. It helps you stay focused and ensures everything runs smoothly.
          </h2>
          <div className='w-full justify-center flex mt-10'>
          <button onClick={redirectToOAuth} className='text-center bg-white flex h-full drop-shadow-lg p-1 w-30 px-20 rounded-xl hover:bg-neutral-200 transition-all ease-in-out'>
            <h1 className='inline-block font-inter m-auto font-extrabold h-full text-black'>Login with  </h1>
          <img src= {ROBLOX} className='w-24 inline-block pl-2' alt = "ROBLOX"></img>
          </button>
          </div>
        </div>
    </div>
  )
}

export default Landing;