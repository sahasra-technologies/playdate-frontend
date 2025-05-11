import React, {useState} from 'react' 
import axios from 'axios' 
import { useNavigate } from 'react-router-dom' 
import '../Login/Login'

const apiClient = axios.create({
  baseURL: 'http://157.173.195.249:8000',
  headers: { 'Content-Type': 'application/json' },
}); 


const Register = () =>{
    const [username, setUsername] =useState('')
    const [firstName, setFirstName] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()  


    const handleRegister = async() =>{
        if(!username || !firstName || !password){
            alert('All fields are required')
            return
        }
     try{ 
        const response = await apiClient.post('/User/signup/',{
            username, 
            password, 
            first_name: firstName,
        })

        alert('Registration successful! Please log in.');
        navigate('/');

     }catch(error){
        console.error('Registration error:', error.response?.data || error.message);
        alert('Registration failed. Try a different email.');
     }
    }


    return(
        <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">Register</h2>
        <input
          type="text"
          placeholder="Full Name"
          className="input-field"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          className="input-field"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input-field"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="button" className="sign-in-button" onClick={handleRegister}>
          Register
        </button>
        <div className="forgot-password" onClick={() => navigate('/')}>
          Back to Login
        </div>
      </div>
    </div>
    )
}
export default Register;