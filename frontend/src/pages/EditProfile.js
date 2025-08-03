import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
const Edit=()=>{
    const navigate=useNavigate();
    const[name, setName]=useState('');
    const[email, setEmail]=useState('');
    const handleEdit=async(e)=>{
        e.preventDefault();
        const token=localStorage.getItem('token');
        try{
            const res=await fetch('https://spendmap-server.onrender.com/api/auth/edit-profile',
                {
                    method:'PUT',
                    headers:{'Content-Type':'application/json', Authorization:`Bearer ${token}`},
                    body:JSON.stringify({name, email}),
                }
            );
            const data=await res.json();
            console.log("Submitted:", data);
        }
        catch(err){
            console.error("Update failed", err);
        }
        setName('');
        setEmail('');
        navigate('/profile',{state:{updated:true}} );
    };

    return(
        <div className='pt-16 bg-gray-400 min-h-screen'>
            <Navbar/>
            <h1 className='text-gray-800 text-3xl sm:text-4xl md:text-5xl px-4 py-4 font-bold '>Change password</h1>
            <div className="flex justify-center items-start ">
                <div className="bg-gray-200 flex flex-col justify-center items-center rounded w-full mb-6 max-w-md mx-4 px-5 sm:mx-auto">
                    <form onSubmit={handleEdit} className='w-full py-6'>
                        <div className='mb-4'>
                            <label className='text-sm text-gray-800 mb-1 font-bold block'>Username</label>
                            <input
                                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                type='text'
                                value={name}
                                placeholder='Enter new username'
                                onChange={(e)=>setName(e.target.value)}
                            />
                        </div>
                        <div className='mb-4'>
                            <label className='text-sm text-gray-800 mb-1 font-bold block'>Email</label>
                            <input
                                className='w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500'
                                type='text'
                                value={email}
                                placeholder='Enter new email'
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-2 bg-gray-600 text-white font-semibold hover:bg-blue-500 p-2 rounded shadow-md">
                                Edit
                        </button>
                    </form>
                </div>
            </div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mt-5 ml-5 mb-6" 
                    onClick={()=>{navigate('/profile')}}>
                Back
            </button>
        </div>
    )
};
export default Edit;
