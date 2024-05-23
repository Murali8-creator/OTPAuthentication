// OTPPage.js
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './OTPPage.css'


export const OTPPage = () => {
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const email = location.state?.email || '';
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('OTP entered:', otp);
    console.log('Email:', email);

    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      if(response.ok){
        
        navigate('/login');
      }

      const data = response;
      console.log('Success:', data);
      // Handle successful verification


    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="otp-container">
      <form onSubmit={handleSubmit}>
        <label htmlFor="otp">Enter OTP:</label>
        <input
          type="text"
          id="otp"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
