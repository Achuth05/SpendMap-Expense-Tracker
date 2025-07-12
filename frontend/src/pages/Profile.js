import React from 'react';
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useLocation, useNavigate} from 'react-router-dom';
import Navbar from "../components/Navbar";
const Profile=()=>{
    const navigate=useNavigate();
    const location=useLocation();
    const[user, setUser]=useState(null);
    const[successMsg,setSuccessMsg]=useState('');
    useEffect(()=>{
        if(location.state?.changed){
          setSuccessMsg("Password changed successfully");
          const timer=setTimeout(()=>{
            setSuccessMsg('');
          }, 3000);
          return()=>clearTimeout(timer);
        }
      }, [location.state]);
      useEffect(()=>{
        if(location.state?.updated){
          setSuccessMsg("Profile updated successfully");
          const timer=setTimeout(()=>{
            setSuccessMsg('');
          }, 3000);
          return()=>clearTimeout(timer);
        }
      }, [location.state]);
    useEffect(()=>{
        const fetchProfile=async()=>{
            const token=localStorage.getItem('token');
            try{
                const res= await fetch('http://localhost:3001/api/auth/profile', {
                headers:{
                    'Content-Type':'application/json',
                     Authorization:`Bearer ${token}`,
                },
                });
                const data=await res.json();
                setUser(data);
            }
            catch(err){
                console.error("Failed to fetch", err);
            }
        };
        fetchProfile();
    }, []);
    if(!user) return(
        <div className='text-center mt-20'>Loading profile...</div>
    )
    const date=new Date(user.created).toLocaleDateString('en-GB',{
        year: 'numeric',
        month:'long',
        day:'numeric'
    });
    return (
        <div className='bg-gray-400 min-h-screen'>
            <Navbar/>
            <h1 className='text-gray-800 text-3xl sm:text-4xl md:text-5xl px-4 font-bold py-4'>Your PROFILE</h1>
            <div className=' flex flex-col items-center justify-center w-full px-4 py-6'>
                {successMsg && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 shadow-md w-full max-w-sm text-center text-sm font-medium">
                        {successMsg}
                    </div>
                )}
                 <div className='bg-white mt-4 p-6 rounded-lg shadow-lg w-full max-w-md'>
                    <div className='space-y-3 text-gray-700'>
                        <div>
                            <span className='font-semibold'>Username: </span>{user.username}
                        </div>
                         <div>
                            <span className='font-semibold'>Email: </span>{user.email}
                        </div>
                        <div>
                            <span className='font-semibold'>Joined: </span>{date}
                        </div>
                    </div>
                    <div className='mt-4 flex flex-col sm:flex-row gap-3'>
                        <Link className='bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-900 transition w-full'
                                to='/edit-profile'>Edit Profile
                        </Link>
                        <Link className='bg-blue-600 px-4 py-2 text-white rounded hover:bg-blue-800 transition w-full'
                                to='/change-password'>Change Password
                        </Link>
                    </div>
                </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                    onClick={()=>{navigate('/home')}}>
                Back
            </button>
        </div>
            
    )
};
       
   
export default Profile;