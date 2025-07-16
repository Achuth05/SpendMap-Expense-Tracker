import React from 'react';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import { useNavigate} from 'react-router-dom';
/*import {useTheme} from '../context/ThemeContext';*/
const Navbar=()=>{

    const navigate=useNavigate();
    const[dropDown, setDropDown]=useState(false);
    const[hamburger, setHamburger]=useState(false);
    const handleLogout=()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    return (
    <nav className="bg-gray-300 shadow-md px-4 py-3">
      <div className="max-w-7xl flex items-center justify-between">
        <div className=" items-center flex space-x-4">
            {/* Hamburger for mobile */}
            <div className="md:hidden">
                <button onClick={() => setHamburger(!hamburger)}>☰</button>
            </div>

            <Link to='/home' className="text-gray-800 font-medium hover:text-blue-600 hidden md:block">Home</Link>
            <Link to="/add" className="text-gray-800 font-medium hover:text-blue-600 hidden md:block">Add Expense</Link>
            <Link to="/report" className="text-gray-800 font-medium hover:text-blue-600 hidden md:block">Report</Link>
        </div>

        
        {/* Right side - Profile icon */}
        <div className="flex-shrink-0 relative">
          <button onClick={() => setDropDown(!dropDown)} className="text-xl mr-2">
            👤
          </button>
          {/*<button onClick={()=>setDarkMode(!darkMode)} className='bg-gray-800 text-white px-2 py-2 rounded hover:bg-gray-600 dark:bg-white dark:text-black dark:hover:bg-gray-600 transition'>{darkMode? 'Light Mode':'Dark Mode'}</button>*/}
          {dropDown && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded shadow-lg z-50">
              <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100 text-sm">Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600">Logout</button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu - only when open */}
      {hamburger && (
        <div className="mt-2 md:hidden space-y-2">
          <Link to="/home" className='block text-gray-800 px-2 py-1 hover:text-blue-600'>Home</Link>
          <Link to="/add" className="block text-gray-800 px-2 py-1 hover:text-blue-600">Add Expense</Link>
          <Link to="/report" className="block text-gray-800 px-2 py-1 hover:text-blue-600">Report</Link>
        </div>
      )}
    </nav>
  );
    
};
export default Navbar;