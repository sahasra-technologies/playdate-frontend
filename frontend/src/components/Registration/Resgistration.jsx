import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../Login/Login';
import logo from '../../assets/images/image.png';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from 'react-toastify';

const apiClient = axios.create({
  baseURL: 'https://playdatesport.com/api',
  headers: { 'Content-Type': 'application/json' },
});

const Register = ({ setIsLoading }) => {
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const navigate = useNavigate();

  const isPasswordValid = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;
    return regex.test(password);
  };

  const handleRegister = async () => {
    if (!username || !firstName || !password) {
      // alert('All fields are required');
      return toast.error('Please fill in all required fields.');
      // return;
    }

    if (!isPasswordValid(password)) {
      return toast.error("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
      // alert("Password must be at least 8 characters long and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character.");
      // return;
    }

    if (!isChecked) {
      // alert("You must agree to the terms and privacy policy before registering.");
      return toast.error("You must agree to the terms and privacy policy before registering.");
      // return;
    }

    try {
      setIsLoading(true);
      const response = await apiClient.post('/User/signup/', {
        username,
        password,
        first_name: firstName,
        phone: `+91${phone}`,
      });

      toast.success('Registration successful! Please log in.');
      setIsLoading(false);
      navigate('/login');
    } catch (error) {
      console.error('Registration error:', error.response?.data || error.message);
      setIsLoading(false);
      toast.error('Registration failed. Try a different email.');
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="login-container">
      <div className="reg-box">
        <h2 className="login-title">
          <img src={logo} alt="Logo" /><br />
          Register
        </h2>

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

        <div className="terms-container">
          <input
            type="checkbox"
            id="terms"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
          <label htmlFor="terms">
            I agree to the <span className="terms-link" onClick={() => setShowTerms(true)}>Terms and Conditions</span> and <span className="terms-link" onClick={() => setShowPrivacy(true)}>Privacy Policy</span>
          </label>
        </div>

        <button
          type="button"
          className="sign-in-button"
          onClick={handleRegister}
          disabled={!isChecked}
          style={{ opacity: !isChecked ? 0.6 : 1, cursor: !isChecked ? 'not-allowed' : 'pointer' }}
        >
          Register
        </button>

        <div className="forgot-password" onClick={() => navigate('/login')}>
          Back to Login
        </div>
      </div>

      {/* Terms Modal */}
      {showTerms && (
        <div className="terms-modal">
          <div className="terms-content">
            <span className="close-icon" onClick={() => setShowTerms(false)}>×</span>
            {/* <h3>Terms and Conditions</h3> */}
            <h1>PlayDate - Terms and Conditions</h1>
          <div class="meta">Last Updated: June 12, 2025</div>

          <h2>1. Acceptance of Terms</h2>
          <p>By using PlayDate's website or app, you agree to these Terms. If you disagree, please stop using the Platform.</p>

          <h2>2. Eligibility</h2>
          <p>Open to users of all ages. Users under 18 must have adult supervision for bookings and payments.</p>

          <h2>3. Bookings & Payments</h2>
          <p>Payments may be made through the app (advance) or partly at the venue. Payment processing is secure, and PlayDate is not a banking entity. Refunds are initiated within 3-5 business days for delays. Refund value is based on the hours delayed or cancellation timing. Rescheduling or cancellations may depend on venue policy. If you cancel too late or no-show, refunds may not apply.</p>

          <h2>4. User Responsibilities & Code of Conduct</h2>
          <p>Users must not impersonate others, spam, harass, hack, or misuse the system. No-shows or repeated misconduct may result in forfeiture of payments or temporary bans.</p>

          <h2>5. Matchmaking & Playmate System</h2>
          <p>We use your preferences, location, and sports interests to suggest matches. PlayDate does not guarantee that a match will always be found. Poor participation or repeated declines may affect visibility in the system.</p>

          <h2>6. Venue Liability Disclaimer</h2>
          <p>PlayDate is not responsible for injuries, accidents, or disputes during physical games or events. All play is at the user's own risk.</p>

          <h2>7. User-Generated Content & Moderation</h2>
          <p>Users are responsible for any content uploaded. PlayDate reserves the right to remove offensive, fake, or abusive content and block users violating platform rules.</p>

          <h2>8. Media & Promotional Rights</h2>
          <p>Users grant PlayDate rights to capture, reuse, and promote any photos or videos taken during events. This includes marketing and advertising use without separate consent.</p>

          <h2>9. Privacy, Data Security & Usage</h2>
          <p>We collect user data (name, contact, location, sport preferences) only for matchmaking and enhancing the user experience. We never sell user data. Users may request access or deletion of their data by contacting support.</p>

          <h2>10. Intellectual Property</h2>
          <p>All content, code, design, and branding are owned by PlayDate. No one may reproduce or misuse them without written permission.</p>

          <h2>11. Modifications & Updates</h2>
          <p>We may update these terms occasionally. Continued use implies agreement to updated terms.</p>

          <h2>12. Governing Law & Dispute Resolution</h2>
          <p>These terms are governed by Indian law and the jurisdiction of Hyderabad, Telangana. Please contact support before raising legal disputes.</p>

          <h2>13. Contact & Support</h2>
          <p>Email: <a href="mailto:contact@playdate.com">contact@playdate.com</a><br/>
          Address: Uppal,Hyderabad.</p>
            <button onClick={() => setShowTerms(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}

      {/* Privacy Modal */}
      {showPrivacy && (
        <div className="terms-modal">
          <div className="terms-content">
            <span className="close-icon" onClick={() => setShowPrivacy(false)}>×</span>
            <h1>Privacy Policy - PlayDate Sports Pvt. Ltd.</h1>
            <div className="meta">Effective Date: 01/06/2025</div>

            <h2>1. Information We Collect</h2>
            <p>We collect personal info (name, contact, DOB, etc.), credentials, GPS location, media content, device data, match history, communication logs, and payment information (handled securely via Razorpay).</p>

            <h2>2. How We Use Your Information</h2>
            <p>We use your data to match games, manage tournaments, show performance, send notifications, personalize content, and improve the app.</p>

            <h2>3. Consent for Media Usage</h2>
            <p>By participating in events, you consent to media usage. You can opt out by emailing <a href="mailto:contact@playdate.com">contact@playdate.com</a>.</p>

            <h2>4. Data Sharing and Disclosure</h2>
            <p>We don’t sell your data. We only share with secure processors (e.g., Razorpay, Firebase), authorities if required, and under strict confidentiality with partners.</p>

            <h2>5. User Rights & Choices</h2>
            <p>You can access, correct, or delete your data, and opt out of promotional communications via the app or email.</p>

            <h2>6. Cookies & Tracking</h2>
            <p>We use cookies and SDKs for session management and analytics. You can manage this via your browser/device settings.</p>

            <h2>7. Children’s Privacy</h2>
            <p>Users under 18 need verified guardian consent. We protect minors with limited visibility and identity masking.</p>

            <h2>8. Security Practices</h2>
            <p>We use encryption, HTTPS, secure authentication, internal access tiers, and regular audits to protect data.</p>

            <h2>9. Refunds and Transaction Issues</h2>
            <p>Refunds are processed in 3–5 business days. Disputes must be raised within 24 hours of an issue.</p>

            <h2>10. Policy Updates</h2>
            <p>Policy may change. We notify you via app/email. Continued use implies acceptance.</p>

            <h2>11. Grievance and Contact</h2>
            <p>
              <strong>PlayDate Sport</strong><br />
              Address: Uppal,Hyderabad.<br />
              Email: <a href="mailto:contact@playdate.com">contact@playdate.com</a>
            </p>

            <button onClick={() => setShowPrivacy(false)} className="close-modal-btn">Close</button>
          </div>
        </div>
      )}

    </div>
  );
};

export default Register;
