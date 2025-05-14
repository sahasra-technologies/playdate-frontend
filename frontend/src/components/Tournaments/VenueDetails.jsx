import React, { useState, useEffect, useContext } from 'react';
import './VenueDetails.css';
import { useParams, useNavigate } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import { Navigation } from 'lucide-react';
import gameImg from '../../assets/Venues/gamelogo.png';
import Cookies from 'js-cookie'


import axios from 'axios';

const API_URL = 'http://157.173.195.249:8000/Tournament/tournaments/';

const VenueDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const [game, setGame] = useState(null);
  const [apiError, setApiError] = useState(false); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  
  useEffect(() => {
    const token = Cookies.get("access");
    if (!token) {
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
    setAuthLoading(false);
  }, [navigate]);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        const selectedGame = data.find((g) => String(g.id) === id);

        if (selectedGame) {
          setGame(selectedGame);
        } else {
          setApiError(true);
        }
      } catch (error) {
        console.error('❌ API fetch error:', error);
        setApiError(true);
      }
    };

   if (isAuthenticated) {
      fetchTournaments();
    }
  }, [id, isAuthenticated]);

  if (apiError) {
    return <p className="error-msg">Failed to fetch venue details. Try again later.</p>;
  }

  if (!game) {
    return <p className="loading-msg">Loading venue details...</p>;
  }
  if (authLoading) return null;
  if (!isAuthenticated) return null;

 

  return (
    <div className={`venue-details-wrapper ${theme}`}>
      <button className="back-btn" onClick={() => navigate(-1)}>← </button>

      <div className="top-section">
        <img className="main-img" src={game.images?.main_image || gameImg} alt={game.name} />
        <div className="details-section">
          <div className="details-header">
            <div>
              <h1>{game.name}</h1>
              <p className="game-name">{game.category || 'N/A'}</p>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(game.ground?.location || '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="get-directions"
            >
              Get Directions <span className="nav-icon-bg"><Navigation size={14} /></span>
            </a>
          </div>
        </div>
      </div>

      <div className="section">
        <h2>About</h2>
        <p>{game.about || 'No description available.'}</p>
      </div>

      <div className="section">
        <h2>Slot Time</h2>
        <p>{game.start_date || 'N/A'}</p>
      </div>

      <div className="section">
        <h2>Amenities</h2>
        <p>{Array.isArray(game.amenities) ? game.amenities.join(', ') : game.amenities || 'N/A'}</p>
      </div>

      <div className="section">
        <h2>Location</h2>
        <p>{game.ground?.location || 'N/A'}</p>
      </div>

      <div className="section">
        <h2>Ground Timings</h2>
        <p>{game.times || 'N/A'}</p>
      </div>

      <button className="book-button">Book Slot</button>
    </div>
  );
};

export default VenueDetails;