import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Link} from 'react-router-dom';
const RegisterPage=()=>{
    const navigate= useNavigate();
    const[username, setUsername]=useState('');
    const[email, setEmail]=useState('');
    const[password, setPassword]= useState('');
    const[error, setError]=useState('');
    const handleRegister=async(e)=>{
        e.preventDefault();
        try{
            const res=await fetch('http://localhost:3001/api/auth/register',
                {
                    method: 'POST',
                    headers:{'Content-Type':'application/json',},
                    body:JSON.stringify({username, email, pwd:password}),
                }
            );
            const data=await res.json();
            if(res.ok){
                console.log("Succesfully registered");
                localStorage.setItem('token', data.token);
                navigate('/',{state:{registered:true}});
            }
            else{
                setError(data.msg||"Failed to create account");
            }
        }
        catch(err){
            console.log(err);
            setError("Something went wrong!");
        }
    }

        return(
            <div className="flex items-center justify-center min-h-screen bg-gray-400 px-4 ">
                <div className=" bg-white border-gray-300 p-6 rounded-lg shadow-md w-full max-w-sm">
                   
                    <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">Register</h2>
                    <form onSubmit={handleRegister}>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-800 font-medium mb-1">Username</label>
                        <input
                        type="text" 
                        onChange={(e)=>setUsername(e.target.value)}            
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter username"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-800 font-medium mb-1">Email</label>
                        <input
                        type="email"  
                        onChange={(e)=>setEmail(e.target.value)}           
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter your email"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm text-gray-800 font-medium mb-1">Password</label>
                        <input
                        type="password"
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                        placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-900 transition"
                    >
                        Create account
                    </button>
                    {error && <p className='text-red-500 mt-4 text-sm'>{error}</p>}
                     <p><Link to='/' className='mt-2 block text-sm text-blue-600 text-center hover:underline'>Back to login</Link></p>
                    </form>
                </div>
            </div>
        );
    
    }
    


export default RegisterPage;