import React from 'react';
import Protected from './components/Protected';
import { Routes, Route} from 'react-router-dom';
import HomePage from './pages/Home';
import AboutPage from './pages/About';
import RegisterPage from './pages/Register';
import LoginPage from './pages/Login';
import AddExpense from './pages/Add';
import ReportPage from './pages/Report';
import Profile from './pages/Profile';
import Change from './pages/ChangePwd';
import Edit from './pages/EditProfile';
import './App.css';


function App() {
  return (
      <>
          {/*<Navbar/>*/}
          <Routes>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
            <Route path="/" element={<AboutPage/>}/>
            <Route path="/home" element={<Protected><HomePage/></Protected>}/>
            <Route path="/add" element={<Protected><AddExpense/></Protected>}/>
            <Route path="/report" element={<Protected><ReportPage/></Protected>}/>
            <Route path="/profile" element={<Protected><Profile/></Protected>}/>
            <Route path="/change-password" element={<Protected><Change/></Protected>}/>
            <Route path="/edit-profile" element={<Protected><Edit/></Protected>}/>
          </Routes>
      </>
  );
}

export default App;
