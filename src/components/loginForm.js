import React, { useState } from 'react';
import './loginpage.css';
import { useNavigate } from 'react-router-dom';
import { verifyEmailAndSendOtp, userLogin } from '../services/applicationServices'

function LoginPage({onLogin}) {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleOtpChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSendOtp = async (event) => {
    event.preventDefault();
    if (email) {
      if (validateEmail(email)) setIsOtpSent(true);
      let result = await verifyEmailAndSendOtp(email);
      setUser(result.user);
    }
  };

  function validateEmail(email) {
    // Define the regex pattern to find the email should end with either '@kapturecx.com' or '@kapturecrm.com'.
    const emailRegex = /^[\w-]+(\.[\w-]+)*@kapture(cx|crm)\.com$/;

    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      alert('Invalid email address. Please use an email ending with @kapturecx.com or @kapturecrm.com');
    }
    return isValidEmail; 
  }

  const handleLogin = async (event) => {
    event.preventDefault();
    if (otp) {
      let res = userLogin({ otp, user });
      onLogin(user);
      if (res) navigate('/public-private-keys');
    }
  };

  return (
    <form>
      <h1 style={{ color: '#e03038' }}>
        Selfserve-API-Configuration
      </h1>
      {!isOtpSent ? (
        <>
          <label>
            Email:
            <input type="text" value={email} onChange={handleEmailChange} />
          </label>
          <br />
          <button onClick={handleSendOtp}>Send OTP</button>
        </>
      ) : (
        <>
          <label>
            OTP:
            <input type="text" value={otp} onChange={handleOtpChange} />
          </label>
          <br />
          <button className='login-btn' onClick={handleLogin}>Login</button>
          <button className='resend-otp' onClick={handleSendOtp}>Resend OTP</button>
        </>
      )}
      <br />
    </form>
  );
}

export default LoginPage;
