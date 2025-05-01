import React, { useEffect, useState, useContext } from 'react';
import { FaUser, FaMapMarkerAlt, FaSearch, FaChevronDown } from 'react-icons/fa';
import { MdLocalOffer } from 'react-icons/md';
import { ThemeContext } from '../../context/ThemeContext'; // Adjust if path differs
import './Navbar.css';

const majorCities = [
  'Mumbai', 'Delhi', 'Bengaluru', 'Hyderabad', 'Ahmedabad',
  'Chennai', 'Kolkata', 'Pune', 'Jaipur', 'Surat'
];

const Navbar = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [showCityDropdown, setShowCityDropdown] = useState(false);
  const [showLoginDropdown, setShowLoginDropdown] = useState(false);
  const { darkMode, toggleTheme } = useContext(ThemeContext);

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
    <nav className="navbar">
      {/* Logo Image */}
      <div className="nav-logo">
        <img src="/src/assets/images/image.png" alt="Logo" className="logo-image" />
      </div>

      {/* Delivery Address with City Dropdown */}
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

      {/* Nav Buttons */}
      <div className="nav-buttons">
        <button className="btn gray-btn search-btn">
          <FaSearch className="btn-icon" /> Search
        </button>
        <button className="btn sky-blue">My Venues</button>
        <button className="btn gray-btn">
          <MdLocalOffer className="btn-icon" /> Offers
        </button>

        {/* Login Dropdown */}
        <div className="dropdown-wrapper">
          <button className="btn gray-btn" onClick={() => setShowLoginDropdown(!showLoginDropdown)}>
            <FaUser className="btn-icon" /> Login
          </button>
          {showLoginDropdown && (
            <ul className="dropdown-menu right-align">
              <li onClick={() => alert("Go to Profile")}>Profile</li>
              <button onClick={toggleTheme} style={{ margin: '1rem' }}>
      Switch to {darkMode ? 'Light' : 'Dark'} Mode
    </button>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
