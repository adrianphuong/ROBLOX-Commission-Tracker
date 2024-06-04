import React from 'react'
import { CgList, CgCalculator } from "react-icons/cg";
import { AiOutlineSetting } from "react-icons/ai";
import { Link } from 'react-router-dom'
import { HiOutlineBookOpen } from "react-icons/hi";

export const Navbar = () => {
  return (
    <div className='absolute top-1/4 drop-shadow-xl ml-5 py-8 rounded-3xl px-2 bg-neutral-800 text-white hidden md:block'>
      <Link to = "/home">
        <button className='p-3 mb-5 hover:bg-neutral-900 transition-all rounded-xl hover:drop-shadow-xl block'>
          <CgList className='w-7 h-7 '/>
        </button>
      </Link>
      <Link to = "/calculator">
        <button className='p-3 mb-5 hover:bg-neutral-900 transition-all rounded-xl hover:drop-shadow-xl block'>
          <CgCalculator className='w-7 h-7 '/>
        </button>
      </Link>
      <Link to = "/history">
        <button className='p-3 mb-5 hover:bg-neutral-900 transition-all rounded-xl hover:drop-shadow-xl block'>
          <HiOutlineBookOpen className='w-7 h-7 '/>
        </button>
      </Link>
      <Link to = "/settings">
        <button className='p-3 mb-5 hover:bg-neutral-900 transition-all rounded-xl hover:drop-shadow-xl block'>
          <AiOutlineSetting className='w-7 h-7 '/>
        </button>
      </Link>
    </div>
  )
}

export default Navbar;