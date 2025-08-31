import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Start from './pages/Start';
import UserLogin from './pages/UserLogin';
import UserSignup from './pages/UserSignup';
import CaptainLogin from './pages/CaptainLogin';
import CaptainSignup from './pages/CaptainSignup';
import UserHome from './pages/UserHome';
import UserProtected from './pages/UserProtected';
import UserLogout from './pages/UserLogout';
import CaptainHome from './pages/CaptainHome';
import CaptainProtected from './pages/CaptainProtected';
import CaptainLogout from './pages/CaptainLogout';
import UserRiding from './pages/UserRiding';
import CaptainRiding from './pages/CaptainRiding';


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Start />} />
        <Route path='/user-login' element={<UserLogin />} />
        <Route path='/user-signup' element={<UserSignup />} />
        <Route path='/captain-login' element={<CaptainLogin />} />
        <Route path='/captain-signup' element={<CaptainSignup />} />
        <Route path='/user-home' element={<UserProtected><UserHome /></UserProtected>} />
        <Route path='/user-logout' element={<UserProtected><UserLogout /></UserProtected>} />
        <Route path='/captain-home' element={<CaptainProtected><CaptainHome /></CaptainProtected>} />
        <Route path='/captain-logout' element={<CaptainProtected><CaptainLogout /></CaptainProtected>} />
        <Route path='/user-ride' element={<UserRiding />} />
        <Route path='/captain-ride' element={<CaptainRiding />} />
      </Routes>
    </>
  )
}

export default App;
