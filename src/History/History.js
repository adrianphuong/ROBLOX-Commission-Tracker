import React from 'react'
import { useEffect } from 'react';
import TopNavbar from '../Navbar/TopNavbar';
import Navbar from '../Navbar/Navbar';

export const History = () => {
    useEffect(() => {
        const animationElements = document.querySelectorAll('.animation');
        const observer = new IntersectionObserver(entries => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                }
            })
        }, {
            threshold:0.5
    });
    
        for (let i = 0; i < animationElements.length; i++) {
            const el = animationElements[i];
            observer.observe(el);
        }
    },[]);
  return (
    <div className='w-full h-screen flex'>
        <Navbar />
        <TopNavbar />
        <div className='search-container w-2/3 h-1/2 m-auto my-auto home-page-container'>
            <h1 className='w-full text-4xl pb-5 font-bold tracking-tighter text-neutral-800'>History</h1>
            <input className='search-input w-full bg-neutral-200 h-16 rounded-xl text-xl pl-5' placeholder='Search...'></input>
            <div className='search-results'>

            </div>
        </div>
    </div>
  )
}


export default History;