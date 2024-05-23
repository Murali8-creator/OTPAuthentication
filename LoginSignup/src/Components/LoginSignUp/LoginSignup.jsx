import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginSignup.css';

import user_icon from '../Assets/person.png';
import email_icon from '../Assets/email.png';
import password_icon from '../Assets/password.png';
import { ValidateEmailDetails } from '../Validation/ValidateEmailDetails';
import { ValidateLoginDetails } from '../Validation/ValidateLoginDetails';

export const LoginSignup = () => {
  const [action, setAction] = useState('Sign up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSignUpClick = async () => {
    setAction('Sign up');
    
    if (name.trim() !== '' && email.trim() !== '' && password.trim() !== '') {
      setSubmitted(true);
      setError(null);
      // Call ValidateEmailDetails here if necessary
    }
  };

  const handleLoginClick = async () => {
    setAction('Login');
    if (email.trim() !== '' && password.trim() !== '') {
      console.log("email:", email);
      console.log("password:", password);
      setSubmitted(true);
      setError(null);
      try {
        await ValidateLoginDetails(email, password, setError, navigate);
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action}</div>
        <div className='underline'></div>
      </div>
      <div className='inputs'>
        {action === 'Login' ? (
          <div></div>
        ) : (
          <div className='input'>
            <img src={user_icon} alt='' />
            <input 
              type='text' 
              id='name' 
              placeholder='Name' 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}

        <div className='input'>
          <img src={email_icon} alt='' />
          <input 
            type='email' 
            id='email' 
            placeholder='Email' 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className='input'>
          <img src={password_icon} alt='' />
          <input 
            type='password' 
            id='password' 
            placeholder='Password' 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === 'Sign up' ? (
        <div></div>
      ) : (
        <div className='forgot-password'>
          <center>Lost Password? <span>Click here!</span></center>
        </div>
      )}
      <div className='submit-container'>
        <Link
          className={action === 'Login' ? 'submit' : 'submit gray'}
          to='/login'
          onClick={handleLoginClick}
        >
          Log In
        </Link>
        <Link
          className={action === 'Sign up' ? 'submit' : 'submit gray'}
          to='/signup'
          onClick={handleSignUpClick}
        >
          Sign Up
        </Link>
      </div>
      {submitted && action === 'Sign up' && <ValidateEmailDetails name={name} email={email} password={password} />}
    </div>
  );
};
