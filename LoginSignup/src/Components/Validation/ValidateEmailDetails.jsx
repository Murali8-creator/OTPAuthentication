import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const ValidateEmailDetails = (props) => {
  const { name, email, password } = props;
  const navigate = useNavigate();
  const [hasRegistered, setHasRegistered] = useState(false);

  useEffect(() => {
    if (!hasRegistered && name && email && password) {
      registerUser();
    }
  }, [name, email, password, hasRegistered]);

  const registerUser = async () => {
    const data = { name, email, password };
    try {
      const response = await fetch('http://localhost:8080/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      console.log('Success:', responseData);
      setHasRegistered(true); // Update state to indicate registration has completed
      navigate('/otp', { state: { email } }); // Pass the email to the OTP page
    } catch (error) {
      console.log(error);
    }
  };

  return null;
};
