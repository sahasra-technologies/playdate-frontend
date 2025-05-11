import React, {useState,useEffect} from 'react'; 
import {useSearchParams, useNavigate} from 'react-router-dom';
import axios from 'axios' 
import '../Login/Login.css'  

const apiClient = axios.create({
    baseURL: 'http://157.173.195.249:8000',
    headers: { 'Content-Type': 'application/json' },
  }); 

const ResetPassword = () =>{  
   const [searchParams] = useSearchParams(); 
   const token = searchParams.get('token'); 

   const [password, setPassword] = useState('')
   const [confirmPassword, setConfirmPassword] = useState('')
   const navigate = useNavigate(); 

   useEffect(()=>{
    if(!token){
      alert("Invalid or Credentials")
      navigate('/')
    }
   },[token, navigate]) 

   if (!token) {
    return <navigate to="/" replace />;
  }

   const handleReset = async () => {
    if (!password || !confirmPassword) {
      alert('Please fill all fields');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const response = await apiClient.patch('/User/signup/', {
        token,
        password,
        confirm_password: confirmPassword,
      });

      alert('Password reset successful!');
      navigate('/');
    } catch (error) {
      console.error('Reset password error:', error.response?.data || error.message);
      alert('Failed to reset password. Please try again.');
    }
  };

    return(
        <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="input-field"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="button" className="sign-in-button" onClick={handleReset}>
          Update Password
        </button>
      </div>
    </div>
    )
}
export default ResetPassword;