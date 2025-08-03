import React from 'react';
import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import {Link} from 'react-router-dom';
const LoginPage = () => {
  const location=useLocation();
  const[successMsg,setSuccessMsg]=useState('');

  useEffect(()=>{
    if(location.state?.registered){
      setSuccessMsg("Registered Successfully. Please login");
      const timer=setTimeout(()=>{
        setSuccessMsg('');
      }, 3000);
      return()=>clearTimeout(timer);
    }
  }, [location.state]);

  const navigate=useNavigate();
  const[email, setEmail]=useState('');
  const[password, setPassword]=useState('');
  const[error, setError]=useState('');
  const handleSubmit=async(e)=>{
    e.preventDefault();
    try{
      const res= await fetch('https://spendmap-server.onrender.com/api/auth/login',
        {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body:JSON.stringify({email, pwd:password}),
        });
        const data= await res.json();
        if(res.ok){
          console.log("Login success:",data);
          localStorage.setItem('token', data.token);
          navigate('/home', {state:{loggedin:true, username:data.user.username}});
        }
        else{
          setError(data.msg||"Login failed");
        }
    }
    catch(err){
      console.log(err);
      setError("Something went wrong!");
    }

  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-400 px-4 ">
      {successMsg && (
        <div className="bg-green-100 text-green-700 px-4 py-2 rounded mb-4 shadow-md w-full max-w-sm text-center text-sm font-medium">
          {successMsg}
        </div>
      )}
      <div className=" bg-white border-gray-300 p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">Login</h2>
        <form onSubmit={handleSubmit}>
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
          <div className='mb-2 flex'>
              <button
                type="submit"
                className="w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-900 transition"
                  >
                Login
              </button>
             
                
          </div>
          {error && <p className='text-red-500 mt-4 text-sm'>{error}</p>}
        </form>

        <p className="mt-4 text-sm text-gray-800 text-center">
          Dont have an account?{" "}
          <Link to="/register" className="text-blue-600 hover:underline">
            Register here
          </Link>
        </p>
       </div>
    </div>
  );
};

export default LoginPage;
