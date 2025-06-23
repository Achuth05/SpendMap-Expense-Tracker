import React from 'react';
import Protected from './components/Protected';
import { Routes, Route} from 'react-router-dom';
/*import Navbar from './components/Navbar';*/
import HomePage from './pages/Home';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import AddExpense from './pages/Add';
import ReportPage from './pages/Report';
import Profile from './pages/Profile';
import './App.css';


function App() {
  return (
      <>
          {/*<Navbar/>*/}
          <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/home" element={<Protected><HomePage/></Protected>}/>
            <Route path="/add" element={<Protected><AddExpense/></Protected>}/>
            <Route path="/report" element={<Protected><ReportPage/></Protected>}/>
            <Route path="/profile" element={<Protected><Profile/></Protected>}/>
          </Routes>
      </>
  );
}

export default App;
