import React, { useEffect, useState, useContext } from 'react';
import { FaUser, FaMapMarkerAlt, FaSearch, FaChevronDown } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from '../Login/UserContext';
import './Navbar.css';

const majorCities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'
];

const Navbar = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("access"));

  const { theme, toggleTheme } = useContext(ThemeContext);
  const { names } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();
            const address = data.address;
            const display = `${address.postcode || ''}, ${address.suburb || address.city || address.town || address.village || 'Your Area'}`;
            setLocation(display);
          } catch (error) {
            setLocation('Unable to fetch location');
            console.error('Error fetching address:', error);
          }
        },
        (error) => {
          setLocation('Permission denied');
          console.error('Geolocation error:', error);
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  const handleCitySelect = (city) => {
    setLocation(city);
    setShowCityDropdown(false);
  };

  const handleLogout = () => {
    Cookies.remove("access");
    Cookies.remove("refresh");
    Cookies.remove("userId");
    setIsLoggedIn(false);
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <nav className="navbar" data-theme={theme}>
      {/* Logo */}
      <div className="nav-logo-wrapper">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <img src="/src/assets/images/image.png" alt="Logo" className="logo-image" />
        </div>
      </div>

      {/* Delivery Location */}
      <div className="delivery">
        <FaMapMarkerAlt className="icon-map" />
        <div className="delivery-text">
          <span className="deliver-to">Delivery to</span>
          <div className="location" onClick={() => setShowCityDropdown(!showCityDropdown)}>
            {location} <FaChevronDown className="icon-down" />
          </div>
          {showCityDropdown && (
            <ul className="dropdown-menu">
              {majorCities.map((city, index) => (
                <li key={index} onClick={() => handleCitySelect(city)}>
                  {city}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Desktop Buttons */}
      <div className="nav-buttons desktop-only">
        <button className="btn search-btn">
          <FaSearch className="btn-icon" /> Search
        </button>
        <button className="btn sky-blue" onClick={() => navigate('/')}>Tournaments</button>
        <button className="btn">
          <MdLocalOffer className="btn-icon" /> Offers
        </button>
        <div className="dropdown-wrapper">
          <button className="btn" onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
            <FaUser className="btn-icon" /> {isLoggedIn ? (names || 'Profile') : 'Login'}
          </button>

          {showLoginDropdown && (
            <div className="dropdown-menu right-align">
              {isLoggedIn ? (
                <>
                  
                  <button onClick={toggleTheme} className="theme-switch">
                    {theme === 'dark' ? 'Light' : 'Dark'} Mode
                  </button>
                  <button onClick={handleLogout}>Logout</button>
                </>
              ) : (
                <button onClick={handleLoginClick}>Go to Login</button>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;