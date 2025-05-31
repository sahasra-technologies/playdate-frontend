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

 const renderDropdown = () => (
  <div className="dropdown-menu right-align">
    {/* <button onClick={toggleTheme} className="dropdown-btn">
      {theme === 'dark' ? '🌞 Light Mode' : '🌙 Dark Mode'}
    </button> */}
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
        <button className="btn search-btn"><FaSearch className="btn-icon" /> Search</button>
        <button className="btn sky-blue" onClick={() => navigate('/')}>Tournaments</button>
        <button className="btn"><MdLocalOffer className="btn-icon" /> Offers</button>

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

          <button className="btn search-btn"><FaSearch className="btn-icon" /> Search</button>
          <button className="btn sky-blue" onClick={() => navigate('/')}>Tournaments</button>
          <button className="btn"><MdLocalOffer className="btn-icon" /> Offers</button>
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
