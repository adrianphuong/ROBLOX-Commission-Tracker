import React from 'react'
import {useState , useEffect} from 'react'
import {getUserPic} from '../HandleAPI/HandleAPI'
import { CgMoon, CgInbox } from 'react-icons/cg';
import { HiSparkles } from "react-icons/hi";
import {Link, useNavigate} from 'react-router-dom'

export const TopNavbar = () => {
  const [userPic, setUserPic] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Toggle isOpen state
    console.log(isOpen)
    };

  useEffect(() => {
    getUserPic(setUserPic, navigate);
  },[])
  return (
    <div className='absolute top-8 right-8 flex'>
          <h1 className='alpha-text scale-75 select-none py-2 px-4 bg-gradient-to-r from-sky-100 via-blue-100 to-purple-200 h-10 m-auto align-middle rounded-xl font-bold text-base flex'><HiSparkles className='w-5 h-5 my-auto mr-2'/>ALPHA v1</h1>
          <button className= 'rounded-full align-middle p-2 ml-2 m-auto hover:bg-neutral-200 transition-all'><CgInbox className='w-5 m-auto h-5' /></button>
          <button className= 'rounded-full align-middle p-2 ml-2 m-auto hover:bg-neutral-200 transition-all'><CgMoon className='w-5 m-auto h-5' /></button>
          <img className='rounded-full w-[50px] ml-5 hover:drop-shadow-lg cursor-pointer m-auto ease-in-out transition-all' onClick={toggleMenu} src = {userPic} />
          {isOpen && <div className='absolute top-full transform transition-max-h duration-300 right-0 m-auto w-6/12 mt-5 bg-neutral-100 bg-opacity-95 rounded-xl drop-shadow-md'>
        <Link to="/settings">
            <button className = "home-button block hover:bg-neutral-200 rounded-lg transition-all py-2 px-4 w-full text-end">
                Settings
            </button>
        </Link>
        <Link to="/">
            <button className = "home-button hover:bg-neutral-200 transition-all rounded-lg block py-2 px-4 w-full text-end font-bold text-red-500">
                Logout
            </button>
        </Link>
        </div>}
    </div>
  )
}

export default TopNavbar;
