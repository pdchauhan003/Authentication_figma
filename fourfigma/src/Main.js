
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import Signin from './Componants/Signin';
import Signup from './Componants/Signup';
import Dashboard from './Componants/Dashboard';
import ForgotPass from './Componants/ForgotPass';
import ProtectedRoute from './Componants/ProtectedRoute';
import ChangePass from './Componants/ChangePass';
import SecondPage from './Componants/SecondPage';
import OtpPage from './Componants/OtpPage';
import {Toaster} from 'react-hot-toast'
function Main() {
  const [bool, setBool] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setBool(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  const isStepAllowed = (step) => {
    if (step == "forgot") return true;
    if (localStorage.getItem("tempEmail") && step == "varifyotp") return true;
    if (localStorage.getItem("tempEmail") && step == "passchange" ) return true;
    return false;
  };

  return (
    <BrowserRouter>
      <Routes>
        {bool ? (
          <Route path="/" element={<WelcomePage />} />
        ) : (
          <>
            <Route path="/" element={<SecondPage/>} />
            <Route path="/signin" element={<Signin/>} />
            <Route path="/signup" element={<Signup/>} />
            <Route path="/forgot" element={<ForgotPass/>} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            {/* <Route path='/passchange' element={<ChangePass/>}/> */}
            <Route
              path="/passchange"
              element={
                isStepAllowed("passchange") ? <ChangePass /> : <Navigate to="/signin" />
              }
            />
            {/* <Route path='/varifyotp' element={<OtpPage/>}/> */}
            <Route
              path="/varifyotp"
              element={
                isStepAllowed("varifyotp") ? <OtpPage /> : <Navigate to="/signin" />
              }
            />
          </>
        )}
      </Routes>
      <Toaster />
    </BrowserRouter>
    
  );
}

export default Main;
