import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLightbulb, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { FcRules } from 'react-icons/fc';
import { ThemeContext } from '../../context/ThemeContext';
import MatchSchedule from './MatchSchedule';
import TournamentsRules from './TournamentRules';
import './GameDetails.css';
import Cookies from 'js-cookie';

const WS_URL = 'ws://157.173.195.249:8000/tournaments';

const GameDetailsPage = () => {
  const { id } = useParams();
  const [tournaments, setTournaments] = useState([]);
  const [activeTab, setActiveTab] = useState('venue');
  const [showDetailsBelowCard, setShowDetailsBelowCard] = useState(false);
  const { theme } = useContext(ThemeContext);
  const [game, setGame] = useState(null);
  const [wsError, setWsError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("access");
    if (!token) {
      navigate("/"); 
    }
  }, [navigate]);

  const connectWebSocket = () => {
    const socket = new WebSocket(WS_URL);

    socket.onopen = () => {
      console.log('✅ WebSocket connected');
      setWsError(false);
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.action === 'initial' && Array.isArray(msg.data)) {
          setTournaments(msg.data);
        }
      } catch (err) {
        console.error('❌ WebSocket parsing error:', err);
      }
    };

    socket.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      setWsError(true);
    };

    socket.onclose = () => {
      console.warn('⚠️ WebSocket disconnected. Reconnecting in 3s...');
      setTimeout(connectWebSocket, 3000);
    };

    return socket;
  };

  useEffect(() => {
    const socket = connectWebSocket();
    return () => socket.close();
  }, []);

  useEffect(() => {
    if (tournaments.length > 0) {
      const selectedGame = tournaments.find((g) => g.id === id);
      setGame(selectedGame);
    }
  }, [tournaments, id]);

  const handleVenueClick = () => {
    setShowDetailsBelowCard(true);
  };

  const handleIconClick = () => {
    navigate(`/venue/${id}`);
  };

  if (wsError) return <p style={{ color: 'red' }}>WebSocket connection failed. Please try again later.</p>;
  if (!game) return <p>Loading game details...</p>;

  return (
    <div className="page-wrapper">
      <div className={`details-container ${theme}`}>
        <h1>{game.name}</h1>

        <div className="tab-buttons">
          <button
            onClick={() => setActiveTab('venue')}
            className={activeTab === 'venue' ? 'active' : ''}
          >
            <div className="tab-icon"><FaLightbulb /></div>
            <div>
              Venue Details
              <small>Stadium & surroundings</small>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={activeTab === 'schedule' ? 'active' : ''}
          >
            <FaCalendarAlt className="tab-icon" />
            <div>
              Match Schedule
              <small>Check game dates</small>
            </div>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={activeTab === 'rules' ? 'active' : ''}
          >
            <FcRules className="tab-icon" />
            <div>
              Tournament Rules
              <small>Guidelines & rules</small>
            </div>
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'venue' && (
            <div className="venue-section">
              {game.images?.main_image && (
                <div className="venue-images-grid">
                  {[...Array(5)].map((_, rowIndex) => (
                    <div
                      key={rowIndex}
                      className="venue-card"
                      onClick={handleVenueClick}
                      style={{ cursor: 'pointer' }}
                    >
                      <img src={game.images.main_image} alt={`venue`} />
                      <div className="venue-label">
                        {game.name} {rowIndex + 1}
                        <div className="venue-time"> {game.price} </div>
                      </div>
                      <div
                        className="go-to-icon"
                        onClick={(e) => {
                          e.stopPropagation(); // To prevent triggering parent click
                          handleIconClick();
                        }}
                        style={{ cursor: 'pointer' }}
                      >
                        <FaChevronRight />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showDetailsBelowCard && (
                <div className="split-view" style={{ marginTop: '2rem' }}>
                  <div className="left-pane"><MatchSchedule /></div>
                  <div className="right-pane"><TournamentsRules /></div>
                </div>
              )}
            </div>
          )}

          {(activeTab === 'schedule' || activeTab === 'rules') && (
            <div className="split-view">
              <div className="left-pane"><MatchSchedule /></div>
              <div className="right-pane"><TournamentsRules /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;