import React from 'react';
import { useState, useEffect } from 'react';
/*import add from '../assets/add.png';
import view from '../assets/view.png';*/
import {jwtDecode} from 'jwt-decode';
import { useLocation, Link } from 'react-router-dom';
import Navbar from '../components/Navbar'
const HomePage=()=>{
    const[summary, setSummary]=useState(null);
    const location=useLocation();
    const[welcomeMsg, setWelcomeMsg]=useState('');
    useEffect(()=>{
        if(location.state?.loggedin){
          setWelcomeMsg(`Welcome, ${location.state.username}`);
          window.history.replaceState({},document.title);
        }
      }, [location.state]);
    useEffect(()=>{
        const token=localStorage.getItem('token');
        const decoded=jwtDecode(token);
        const userId=decoded.user.id;
        const fetchSummary=async()=>{
            try{
                const res=await fetch(`http://localhost:3001/api/reports/summary/${userId}`,
                    {
                        headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`}
                    }
                );
                const data= await res.json();
                setSummary(data);
            }
            catch(err){
                console.error(err);
            }
        };
        fetchSummary();
    },[]);
    return (
        <div className='min-h-screen bg-gray-400'>
            <Navbar/>
            {welcomeMsg && (
                <div className='text-3xl mt-4 ml-4 sm:text-4xl md:text-5xl text-gray-800 font-bold'>{welcomeMsg}</div>
            )}
            <div className='flex justify-center items-center mt-4 flex-col'>
                <span className='text-xl mb-3sm:text-2xl md:text-3xl lg:text-4xl text-blue-800 font-bold'>
                    Spend<span className='text-green-700'>Map</span></span>
                <p className='max-w-xl text-md text-center italic mb-6'>Tracking expenses with ease</p>
                <p className='text-md text-gray-600 mb-5 text-center'>From adding expenses to reviewing your reports. Your journey begins here.</p>
            </div>
            <div className='flex justify-center items-center'>
                {summary && Object.keys(summary).length>0?(
                    <div className='bg-white mt-10 p-6 mb-8 rounded-lg max-w-md shadow-md'>
                        <h2 className='text-gray-800 text-xl font-bold mb-4'>This month's SUMMARY</h2>
                        <div className='flex justify-between'>
                            <span className='text-green-800'>Daily expenses: </span><span className='text-blue-700'>₹{summary.dailySum}</span>
                            <span className='text-green-800'>Monthly bills: </span><span className='text-blue-700'>₹{summary.monthlySum}</span>
                            <span className='text-green-800'>Occasional: </span><span className='text-blue-700'>₹{summary.occasionalSum}</span>
                        </div>
                        <div className='flex justify-between font-semibold border-t shadow-md pt-2 mt-2'>
                            <span className='text-blue-800'>Total: </span><span className='text-blue-800'>₹{summary.total}</span>
                        </div>
                    </div>
                ):(
                    <div className='bg-white mt-10 p-6 mb-8 rounded-lg max-w-md shadow-md'>
                        <h2 className='text-gray-800 text-center text-xl font-bold mb-4'>This month's SUMMARY</h2>
                        <p className='text-gray-700 text-center italic mt-4'>No expenses recorded for this month yet</p>
                    </div>
                )}
            </div>
            
            
            <div className='flex mx-auto flex-col pb-6 md:flex-row items-center justify-center gap-8 mt-10 '>
                 
                    <Link to='/add'>
                        <div className='bg-white rounded-xl w-60 h-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center cursor-pointer'>
                            <img src='/images/add.png' className='w-20 h-20 object-contain mb-4' alt='Add'/>
                            <span className='text-lg font-bold text-gray-800'>Add Expense</span>
                        </div>
                    </Link>
                    <Link to='/report'>
                        <div className='bg-white rounded-xl w-60 h-50 shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-300 p-6 flex flex-col items-center cursor-pointer'>
                            <img src='/images/view.png' className='w-20 h-20 object-contain mb-4' alt='Add'/>
                            <span className='text-lg font-bold text-gray-800'>View Reports</span>
                        </div>
                    </Link>
                
            </div>
           
        </div>
        
        
    );
};
export default HomePage;