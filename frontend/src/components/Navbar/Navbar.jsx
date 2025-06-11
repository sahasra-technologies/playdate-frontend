import React, { useEffect, useState, useContext } from 'react';
import {
  FaUser, FaMapMarkerAlt, FaSearch, FaChevronDown, FaBars, FaTimes
} from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
// import { ThemeContext } from '../../context/ThemeContext';
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useUser } from '../Login/UserContext';
import './Navbar.css';

const majorCities = ['Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'];

const Navbar = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!Cookies.get("access"));

  // const { theme, toggleTheme } = useContext(ThemeContext);
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
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);
            const data = await response.json();
            const address = data.address;
            const display = `${address.postcode || ''}, ${address.suburb || address.city || address.town || address.village || 'Your Area'}`;
            setLocation(display);
          } catch {
            setLocation('Unable to fetch location');
          }
        },
        () => setLocation('Permission denied')
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
    Cookies.remove("email");
    Cookies.remove("first_name");
    setIsLoggedIn(false);
    setShowLoginDropdown(false);
    navigate("/");


    window.location.reload()
  };

  const handleLoginClick = () => {
    navigate("/login");
    setShowLoginDropdown(false);
  };

  const handleContactUsClick = () => {
    navigate("/contact-us");
    setShowLoginDropdown(false);
  };

 const renderDropdown = () => (
  <div className="dropdown-menu right-align">
    {/* <button onClick={toggleTheme} className="dropdown-btn">
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button> */}
    <button onClick={handleContactUsClick} className='dropdown-btn'>Contact Us</button>
    {isLoggedIn ? (
      <button onClick={handleLogout} className="dropdown-btn">Logout</button>
    ) : (
      <button onClick={handleLoginClick} className="dropdown-btn">Go to Login</button>
    )}
  </div>
);

  return (
    <nav className="navbar" data-theme=''>
      {/* Logo */}
      <div className="nav-logo-wrapper">
        <div className="nav-logo" onClick={() => navigate("/")}>
          <img src="data:image/png;base64,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" alt="Logo" className="logo-image" />
        </div>
        <div className="mobile-hamburger" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          {showMobileMenu ? <FaTimes /> : <FaBars />}
        </div>
      </div>

      {/* Delivery */}
      <div className="delivery desktop-only">
        <FaMapMarkerAlt className="icon-map" />
        <div className="delivery-text">
          <span className="deliver-to">Delivery to</span>
          <div className="location" onClick={() => setShowCityDropdown(!showCityDropdown)}>
            {location} <FaChevronDown className="icon-down" />
          </div>
          {showCityDropdown && (
            <ul className="dropdown-menu">
              {majorCities.map((city, index) => (
                <li key={index} onClick={() => handleCitySelect(city)}>{city}</li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="nav-buttons desktop-only">
        {/* <button className="btn search-btn"><FaSearch className="btn-icon" /> Search</button> */}
        <button className="btn sky-blue" onClick={() => navigate('/')}>Tournaments</button>
        {/* <button className="btn"><MdLocalOffer className="btn-icon" /> Offers</button> */}

        <div className="dropdown-wrapper">
          <button className="btn" onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
            <FaUser className="btn-icon" /> {isLoggedIn ? (names || 'Profile') : 'Login'}
          </button>
          
          {showLoginDropdown && renderDropdown()}
          
        </div>
      </div>

      {/* Mobile Dropdown */}
      {showMobileMenu && (
        <div className="mobile-dropdown">
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
                    <li key={index} onClick={() => handleCitySelect(city)}>{city}</li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* <button className="btn search-btn"><FaSearch className="btn-icon" /> Search</button> */}
          <button className="btn sky-blue" onClick={() => navigate('/')}>Tournaments</button>
          {/* <button className="btn"><MdLocalOffer className="btn-icon" /> Offers</button> */}
          <div className="dropdown-wrapper">
            <button className="btn" onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
              <FaUser className="btn-icon" /> {isLoggedIn ? (names || 'Profile') : 'Login'}
            </button>
            {showLoginDropdown && renderDropdown()}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
