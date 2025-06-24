import React from 'react';
/*import Protected from './components/Protected';*/
import { Routes, Route} from 'react-router-dom';
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
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/add" element={<AddExpense/>}/>
            <Route path="/report" element={<ReportPage/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Routes>
      </>
  );
}

export default App;
