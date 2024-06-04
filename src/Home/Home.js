import React from 'react'
import {useState , useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { getUser } from '../HandleAPI/HandleAPI';
import './Loading.css'
import robux from '../Assets/robux.png'
import robuxwhite from '../Assets/robux_white.png'
import Navbar from '../Navbar/Navbar'
import TopNavbar from '../Navbar/TopNavbar';
import Commission from '../Commission/Commission'
import CountUp from 'react-countup'


export const Home = () => {
  const [oldRevenue, setOldRevenue] = useState(0);
  const [commissions, setCommissions] = useState([]);
  const [client, setClient] = useState("");
  const [deadline, setDeadline] = useState("")
  const [amount, setAmount] = useState(0);
  const [details, setDetails] = useState("");
  const [commId, setCommId] = useState("");

  const [user, setUser] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
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

  const handleCreateCommission = () => {
    if(client && deadline && amount) {
      setOldRevenue(parseInt(revenue));
      setCommissionCount(commissionCount+1)
    // Create a new commission object
    const newCommission = {
      client: client,
      deadline: deadline,
      amount: amount
    };
    setCommissions([...commissions, newCommission]);
    setRevenue(parseInt(revenue)+parseInt(amount));
    console.log(revenue)
    console.log(details)
    setClient("");
    setDeadline("");
    setAmount(0);
    setDetails("")
    document.getElementById("client-input").value = ""
    document.getElementById("deadline-input").value = ""
    document.getElementById("amount-input").value = ""
    }
  };

  const sortByDeadline = (a, b) => {
    // Convert the deadline strings to Date objects for comparison
    const deadlineA = new Date(a.deadline);
    const deadlineB = new Date(b.deadline);
  
    // Compare the deadline dates
    if (deadlineA < deadlineB) {
      return -1;
    }
    if (deadlineA > deadlineB) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    getUser(navigate, setUser, setUserPic);
  },[])


  return (
    <div className='w-full h-screen'>
      
      <div className='home-page-container h-screen bg-neutral-100 overflow-x-auto'>
        <Navbar />
        <TopNavbar userPic={userPic} />
          <h1 className='w-2/3 pt-20 text-neutral-800 tracking-tight m-auto font-semibold text-5xl select-none'>
              Hello, 
              <span className='font-bold'> {user}!</span>
          </h1>
          <h2 className='w-2/3 pt-2 text-neutral-500 tracking-tight m-auto font-medium text-base select-none'>View your progress here:</h2>
          <div className='w-2/3 mt-5 mb-5 border-2 bg-gradient-to-br from-neutral-700 to-neutral-900 rounded-xl m-auto flex select-none drop-shadow-md'>
            <div className='w-1/2'>
              <h1 className='text-neutral-100 ml-5 mt-5 text-lg tracking-tight font-semibold'>Total Revenue:</h1>
              <div className='flex w-full justify-center overflow-x-scroll'>
                <img className='w-10 my-auto mr-2 ' src = {robuxwhite} alt = " Robux"></img>
                <h2 className='text-6xl mt-10 mb-10 text-white inline-block font-bold'><CountUp start = {oldRevenue} end = {revenue} duration = {2}/></h2>
              </div>
            </div>
            <div className='w-1/2'>
              <h1 className='text-neutral-100 ml-5 text-lg tracking-tight mt-5 font-semibold'>Commissions left:</h1>
              <h2 className='text-6xl mt-10 mb-10 text-white font-bold text-center w-full'>{commissionCount} Left</h2>
            </div>
          </div>
          <div className='w-2/3 m-auto mt-10'>
            <h1 className='text-neutral-800 tracking-tighter m-auto font-semibold text-2xl select-none mb-5'>Commissions</h1>
            <div className='input-commission-container w-full'>
              <div className='w-full bg-white py-5 rounded-2xl drop-shadow-md flex'>
                <input id = "client-input" className='rounded-lg ml-5 p-2 w-1/4 border-neutral-100 border-2' type = "text" placeholder='Name...' onChange={(e) => setClient(e.target.value)} />
                <input id = "deadline-input" className='rounded-lg ml-5 p-2 w-2/12 border-neutral-100 border-2' type = "date" placeholder='N/A' onChange={(e) => setDeadline(e.target.value)}/>
                <img className='ml-10 w-6 my-auto mr-2' src={robux} alt = 'Robux'/>
                <input id = "amount-input" className='rounded-lg p-2 w-1/6 border-neutral-100 border-2' type = "number" min = "0" placeholder='Amount...' onChange={(e) => setAmount(e.target.value)}/>
                <button onClick= {() => setDetailsOpen(!detailsOpen)} className='font-semibold rounded-xl text-sm m-auto transition-all hover:-translate-y-0.5 hover:bg-neutral-800 bg-neutral-700 tracking-tight drop-shadow-md px-5 py-2 text-white'>Add Details</button>
                <button onClick = {handleCreateCommission} className='font-semibold rounded-xl ml-auto mr-5 transition-all hover:-translate-y-0.5 hover:bg-neutral-900 bg-neutral-800 tracking-tight drop-shadow-md px-5 py-2 text-white hover:bg-gradient-to-r from-yellow-400 to-orange-400 hover:scale-105'>Create</button>
              </div>
              
              <div className='list w-full'>
              {commissions.sort(sortByDeadline).map((item) => (
                <Commission
                  key={item.id}
                  client={item.client}
                  deadline={item.deadline}
                  amount={item.amount}
                  details={item.details}
                />
              ))}
              </div>

            </div>
          </div>
        </div>
      
      {detailsOpen && (<div className='w-full h-screen absolute top-0 z-10 bg-neutral-800/50'>
        <div className='details-container m-auto rounded-xl z-30 w-1/2 h-screen pt-60'> 
          <textarea contentEditable = "true" cols = "10" rows="10" className='rounded-xl bg-neutral-200 block w-full m-auto pt-5 resize-none pl-5 text-neutral-600' placeholder='Type details here...' onChange={(e) => setDetails(e.target.value)}></textarea>
          <div className='w-full m-auto bg-black'><button onClick={() => setDetailsOpen(!detailsOpen)} className='bg-neutral-200 transition-all text-neutral-600 rounded-xl px-8 py-2  float-end mt-5 hover:scale-105'>Save</button></div>
        </div>
      </div>)}
    </div>
  )
}

export default Home;