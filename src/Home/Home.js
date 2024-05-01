import React from 'react'
import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import './Loading.css'
import robux from '../Assets/robux.png'
import Navbar from '../Navbar/Navbar';


export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userPic, setUserPic] = useState(null);
  const [revenue, setRevenue] = useState(0);
  const [commissionCount, setCommissionCount] = useState(0);
  const navigate = useNavigate();

  // Intersection Fade In Animation
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

  const checkStatus = async() => {
    try {
      const res = await fetch('http://localhost:10000/api/checkauth');
      if(res.ok) {
        console.log("authenticated")
        getUser();
      }
      else {
        console.log("not authenticated")
        navigate("/")
      }
    }
    catch(error) {
      console.log("status could not be fetched.", error)
      navigate("/")
    }
  }
  const getUser = async () => {
    try {
      const res = await fetch('http://localhost:10000/api/getusername');
      const res2 = await fetch('http://localhost:10000/api/getuserpicture');
      if (res.ok && res2.ok) {
        const userData = await res.json();
        setUser(userData)
        setUserPic(await res2.json());
      } else {
        console.log("Failed to fetch user data");
        navigate("/")
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
      navigate("/")
    }
    finally {
      setTimeout(() => {
        setIsLoading(false);
      },2000)
    }
  }

  useEffect(() => {
    checkStatus();
  },[])

  return (
    <div className='w-full h-screen bg-white'>
      {isLoading ? <div class="gooey bg-black">
  <span class="dot"></span>
  <div class="dots">
    <span></span>
    <span></span>
    <span></span>
  </div>
</div>: 
      
      <div className='home-page-container bg-neutral-50 h-screen'>
        <Navbar />
        <div className='absolute top-0 right-0'>
          <img className='rounded-full w-1/3 mt-5 hover:scale-105 hover:drop-shadow-lg hover:border-2 bg-white cursor-pointer m-auto ease-in-out transition-all' src = {userPic} />
        </div>
        <h1 className='w-2/3 pt-40 text-neutral-800 tracking-tight m-auto font-bold text-4xl select-none'>
            Hello, 
            <span className=''> {user}!</span>
        </h1>
        <h2 className='w-2/3 pt-2 text-neutral-500 tracking-tight m-auto font-medium text-base select-none'>View your progress here:</h2>
        <div className='w-2/3 mt-5 mb-5 bg-white rounded-xl m-auto flex select-none'>
          <div className='w-1/2'>
            <h1 className='text-neutral-700 ml-5 mt-5 text-lg tracking-tight font-semibold'>Total Revenue:</h1>
            <div className='flex w-full justify-center'>
              <img className='w-10 my-auto mr-2' src = {robux} alt = " Robux"></img>
              <h2 className='text-6xl mt-10 mb-10 text-neutral-800 font-bold'>{revenue}</h2>
            </div>
          </div>
          <div className='w-1/2'>
            <h1 className='text-neutral-700 ml-5 text-lg tracking-tight mt-5 font-semibold'>Commissions left:</h1>
            <h2 className='text-6xl mt-10 mb-10 text-neutral-800 font-bold text-center w-full'>{commissionCount} Left</h2>
          </div>
        </div>
        <div className='w-2/3 m-auto mt-10'>
          <h1 className='text-neutral-800 tracking-tight m-auto font-bold text-2xl select-none mb-5'>Commissions</h1>
          <div className='input-commission-container w-full'>
            <div className='w-full bg-white py-5 rounded-2xl drop-shadow-md flex'>
              <input className='rounded-lg ml-5 p-2 w-1/3 border-neutral-100 border-2' type = "text" placeholder='Name...' />
              <img className='ml-20 w-6 my-auto mr-2' src={robux} alt = 'Robux'/>
              <input className='rounded-lg p-2 w-1/6 border-neutral-100 border-2' type = "text" placeholder='Amount...' />
              <button className='font-semibold rounded-xl ml-auto mr-5 transition-all hover:-translate-y-0.5 hover:bg-neutral-50 tracking-tight drop-shadow-md bg-white border-neutral-100 border-2 px-5 py-2 text-neutral-500'>Add</button>
            </div>
          </div>
        </div>
      </div>
      
      }
    </div>
  )
}

export default Home;