// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { LoginSignup } from './Components/LoginSignUp/LoginSignup';
import { OTPPage } from './Components/Validation/OTPPage';
import { Home } from './Components/Home';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<LoginSignup />} />
        <Route path="/otp" element={<OTPPage />} />
        {/* Define other routes here */}
        <Route path="/" element={<LoginSignup />} exact />
        <Route path='/login' element={<LoginSignup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
