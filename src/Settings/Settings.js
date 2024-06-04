import React from 'react'
import TopNavbar from '../Navbar/TopNavbar';
import Navbar from '../Navbar/Navbar';
import { HiSparkles } from "react-icons/hi";

export const Settings = () => {
  return (
    <div className='w-full h-screen flex'>
        <Navbar />
        <TopNavbar />
        <div className='settings-container w-1/2 h-2/3 my-auto rounded-xl bg-neutral-200 drop-shadow-lg m-auto home-page-container'>
            <div className='flex'>
                <h1 className='title-text pl-5 text-3xl font-bold tracking-tighter pt-5'>Update Log</h1>
                <h1 className='alpha-text w-[170px] scale-75 mt-5 select-none py-2 px-4 bg-gradient-to-r from-sky-100 via-blue-100 to-purple-200 h-10 rounded-xl font-bold text-base flex'><HiSparkles className='w-5 h-5 my-auto mr-2'/>ALPHA v1</h1>
            </div>
            <div className='update-log-container overflow-y-auto'>
                <div className='section pl-6 pt-5'>
                    <h1 className='update-version-title text-neutral-500 tracking-tighter italic font-semibold'>Update v1.00</h1>
                    <h2 className='description w-2/3 text-neutral-500 tracking-tighter italic text-sm'>
                        Worked on the project for a couple weeks, set up commission creation/deletion logic,
                        the OAuth 2.0 user authentication, API logic, and I'm still working on the databases and managing
                        refresh tokens in exchange for access tokens. The scaling will come soon, but it's not
                        meant for mobile at the moment.
                    </h2>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Settings;
