import React, { useEffect, useState, useContext } from 'react';
import { FaUser, FaMapMarkerAlt, FaSearch, FaChevronDown, FaBars } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { ThemeContext } from '../../context/ThemeContext';
import './Navbar.css';

const majorCities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'
];

const Navbar = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);

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

  return (
    <nav className="navbar" data-theme={theme}>
      {/* Logo + Menu Icon */}
      <div className="nav-logo-wrapper">
        <div className="nav-logo" onClick={() => setShowMobileMenu(!showMobileMenu)}>
          <img src="/src/assets/images/image.png" alt="Logo" className="logo-image" />
          <FaBars className="menu-icon" />
        </div>

        {showMobileMenu && (
          <div className="mobile-dropdown">
            <button className="btn search-btn">
              <FaSearch className="btn-icon" /> Search
            </button>
            <button className="btn sky-blue">My Venues</button>
            <button className="btn">
              <MdLocalOffer className="btn-icon" /> Offers
            </button>
            <div className="mobile-login">
              <button className="btn" onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
                <FaUser className="btn-icon" /> Login
              </button>
              {showLoginDropdown && (
                <ul className="dropdown-menu">
                  <li onClick={() => alert("Go to Profile")}>Profile</li>
                  <li>
                    <button onClick={toggleTheme} className="theme-switch">
                      Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                    </button>
                  </li>
                </ul>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delivery Location */}
      <div className={`delivery ${showMobileMenu ? 'hide-on-mobile' : ''}`}>
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
      {!showMobileMenu && (
        <div className="nav-buttons desktop-only">
          <button className="btn search-btn">
            <FaSearch className="btn-icon" /> Search
          </button>
          <button className="btn sky-blue">My Venues</button>
          <button className="btn">
            <MdLocalOffer className="btn-icon" /> Offers
          </button>
          <div className="dropdown-wrapper">
            <button className="btn" onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
              <FaUser className="btn-icon" /> Login
            </button>
            {showLoginDropdown && (
              <ul className="dropdown-menu right-align">
                <li onClick={() => alert("Go to Profile")}>Profile</li>
                <li>
                  <button onClick={toggleTheme} className="theme-switch">
                    Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
