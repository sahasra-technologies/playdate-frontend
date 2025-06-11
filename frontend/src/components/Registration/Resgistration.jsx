import React, {useState} from 'react' 
import axios from 'axios' 
import { useNavigate } from 'react-router-dom' 
import '../Login/Login'
import logo from '../../assets/images/image.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";

const apiClient = axios.create({
  baseURL: 'https://playdatesport.com/api',
  headers: { 'Content-Type': 'application/json' },
}); 


const Register = ({ setIsLoading }) =>{
    const [username, setUsername] =useState('')
    const [firstName, setFirstName] = useState('')
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false);

    const navigate = useNavigate()
    
    const isPasswordValid = (password) => {
      const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
      return regex.test(password);
    };


    const handleRegister = async() =>{
        if(!username || !firstName || !password){
            alert('All fields are required')
            return
        }
     try{
        
        if (!isPasswordValid(password)) {
          alert("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
          return;
        }
        // console.log("phone", phone)
        setIsLoading(true)
        const response = await apiClient.post('/User/signup/',{
            username, 
            password, 
            first_name: firstName,
            phone:`+91${phone}`,
        })

        alert('Registration successful! Please log in.');
        setIsLoading(false)
        navigate('/login');

     }catch(error){
        console.error('Registration error:', error.response?.data || error.message);
        setIsLoading(false)
        alert('Registration failed. Try a different email.');
     }
    }
    
    const togglePasswordVisibility = () =>{
      setShowPassword(prev => !prev);
    }

    return(
        <div className="login-container">
      <div className="reg-box">
        <h2 className="login-title">
          <img src={logo} alt="Logo" /><br/>
          Register</h2>
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
        <div className="phone-input-container" style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ padding: '10px', background: '#eee', border: '1px solid #ccc', borderRight: 'none', borderRadius: '4px 0 0 4px' }}>
            +91
          </span>
          <input
            type="text"
            placeholder="Phone Number"
            className="input-field"
            style={{ borderRadius: '0 4px 4px 0' }}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div className="password-wrapper">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <span onClick={togglePasswordVisibility} className="eye-icon">
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* <p style={{ fontWeight: '600', fontSize: '13px', color: '#444', margin: '4px 0 6px' }}>
          Password Requirements:
        </p> */}

        <ul className="reg_password-hint-list">
          <li>Minimum 8 characters</li>
          <li>At least 1 uppercase letter (A-Z)</li>
          <li>At least 1 lowercase letter (a-z)</li>
          <li>At least 1 number (0-9)</li>
          <li>At least 1 special character (@$!%*?#&)</li>
        </ul>

        <div className="reg_password-hint-list-mobile">
          <p>
            Minimum 8 characters, At least 1 uppercase letter (A-Z), At least 1 lowercase letter (a-z), At least 1 number (0-9), At least 1 special character (@$!%*?#&)
          </p>
        </div>


        <button type="button" className="sign-in-button" onClick={handleRegister}>
          Register
        </button>
        <div className="forgot-password" onClick={() => navigate('/login')}>
          Back to Login
        </div>
      </div>
    </div>
    )
}
export default Register;