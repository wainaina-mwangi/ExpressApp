import React from 'react'
import { Routes,Route } from "react-router-dom";
import ResetPassword from './pages/ResetPassword';
import EmailVerify from './pages/EmailVerify';
import Login from './pages/Login';
import Home from './pages/Home';

function App() {
  return (
    <div >
    <Routes>
      <Route  path='/'   element={<Home/>}/>
      <Route  path='/login'   element={<Login/>}/>
      <Route  path='/emailverify'   element={<EmailVerify/>}/>
      <Route  path='/resetpassword'   element={<ResetPassword/>}/>
    </Routes>
    </div>
  )
}

export default App