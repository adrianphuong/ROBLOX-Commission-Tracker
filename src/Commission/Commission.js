import React from 'react'
import { useState } from 'react'
import robux from '../Assets/robux.png'
import { HiCheckCircle, HiTrash, HiUser, HiUserCircle } from "react-icons/hi";



export const Commission = ({client, deadline, amount, details}) => {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [complete, setComplete] = useState(false);

  const formatDate = (dateString) => {
    const options = { month: 'long', day: 'numeric', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  };
  
  return (
    <div className='w-full mt-2 mb-2 bg-white py-5 rounded-2xl drop-shadow-md flex  select-none'>
        {detailsOpen &&
        (<div className='w-full h-screen absolute top-0 z-10 bg-neutral-800/50'>
        <div>{details}</div>
      </div>)
        }
        <HiUserCircle className='w-8 h-8 my-auto ml-4 text-black'/>
        <h1 className='rounded-lg  p-2 w-1/4 font-bold'>{client}</h1>
        <h1 className='rounded-lg p-2 w-2/12 tracking-tighter font-bold '>{formatDate(deadline)}</h1>
        <img className='ml-8 w-6 my-auto mr-2' src={robux} alt = 'Robux'/>
        <h1 className='rounded-lg p-2 w-1/6 font-bold tracking-tighter'>{new Intl.NumberFormat().format(amount)}</h1>
        <button className='delete-button my-auto ml-auto cursor-default'>
            <HiTrash className='w-6 h-6 text-black cursor-pointer hover:scale-125 transition-all'/>
        </button>
        <button 
        className='font-semibold rounded-xl mr-5 ml-5 transition-all hover:-translate-y-0.5 bg-gradient-to-r from-red-400 to-red-500 tracking-tight drop-shadow-md px-5 py-2 text-white hover:text-black hover:scale-105 relative'
        onMouseEnter={() => setComplete(true)}
        onMouseLeave={() => setComplete(false)}
      >
        {complete ? (
            <div className='px-7 text-green-300'>
          <HiCheckCircle className='w-6 h-6 m-auto' />
          </div>
        ) : (
          'Incomplete'
        )}
      </button>
    </div>
    
  )
}


export default Commission;