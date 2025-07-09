import React from 'react';
import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Change=()=>{
    const[oldPassword, setOldPassword]=useState('');
    const[newPassword, setNewPassword]=useState('');
    const[confirmPassword, setConfirmPassword]=useState('');
    const navigate=useNavigate();
    const handleChange=async(e)=>{
        e.preventDefault();
        if(newPassword!==confirmPassword){
            alert("Password mismatch!");
            return;
        }
        const token=localStorage.getItem('token');
        try{
            const res=await fetch('http://localhost:3001/api/auth/change-password',
                {
                    method:'POST',
                    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                    body:JSON.stringify({oldPassword, newPassword}),
                }
            );
            const data=await res.json();
            console.log("Submitted:", data);
        }
        catch(err){
            console.error("Error occured", err);
        }
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigate('/profile',{state:{changed:true}} );
    }
    return(
        <div className='bg-gray-400 min-h-screen'>
            <Navbar/>
            <h1 className='text-gray-800 text-3xl sm:text-4xl md:text-5xl px-4 py-4 font-bold '>Change password</h1>
            <div className="flex justify-center items-start ">
                <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                    <form onSubmit={handleChange} className='w-full py-6'>
                        <div className='mb-4'>
                            <label className='text-sm text-gray-800 mb-1 font-bold block'>Current Password</label>
                            <input
                                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                type='password'
                                value={oldPassword}
                                placeholder='Enter current password'
                                onChange={(e)=>setOldPassword(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='text-sm text-gray-800 mb-1 font-bold block'>New Password</label>
                            <input
                                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                type='password'
                                value={newPassword}
                                placeholder='Enter new password'
                                onChange={(e)=>setNewPassword(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='text-sm text-gray-800 mb-1 font-bold block'>Confirm New Password</label>
                            <input
                                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                type='password'
                                value={confirmPassword}
                                placeholder='Enter password'
                                onChange={(e)=>setConfirmPassword(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-gray-600 text-white font-semibold hover:bg-blue-500 p-2 rounded shadow-md">
                                Change Password
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default Change;