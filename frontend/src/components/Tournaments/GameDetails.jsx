// GameDetailsPage.jsx
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLightbulb, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { FcRules } from 'react-icons/fc';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import MatchSchedule from './MatchSchedule';
import GameMatchSchedule from '../Tournaments/GroundMatchShedule/GroundMatchSchedule'
import GroundTournamentRules from './GroundTournamentRules/GroundTournamentRules';
import axios from 'axios';
import './GameDetails.css';

const API_URL = 'http://157.173.195.249:8000/Tournament/tournaments/';

const GameDetailsPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { game, setGame, ground, setGround } = useGame();

  const [activeTab, setActiveTab] = useState('venue');
  const [showDetailsBelowCard, setShowDetailsBelowCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const pathSegments = window.location.pathname.split('/');
  const id = pathSegments[pathSegments.length - 1];

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.post(API_URL, { id }, {
          headers: { 'Content-Type': 'application/json' }
        });

        const fetchedGround = response.data.ground?.[0] || null;
        setGround(fetchedGround);
        setGame({ id, ...response.data });
      } catch (err) {
        console.error('API fetch error: ', err);
        setError('Failed to fetch tournament data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGameDetails();
  }, [id, setGame, setGround]);

  const handleVenueClick = () => setShowDetailsBelowCard(true);
  const navigateToVenueDetails = () => navigate(`/venue/${id}`);
  const handleCard = (e) => {
    e.stopPropagation();
    navigateToVenueDetails();
  };

  if (loading) return <p>Loading game details...</p>;
  if (error) return <div>{error}</div>;
  if (!ground) return <div>No data found.</div>;

  const imageUrl = Array.isArray(ground.images)
    ? ground.images[0]?.url
    : ground.images?.url;

  return (
    <div className="page-wrapper">
      <div className={`details-container ${theme}`}>
        <h1>{ground?.ground_name || 'Game Details'}</h1>

        <div className="tab-buttons">
          <button onClick={() => setActiveTab('venue')} className={activeTab === 'venue' ? 'active' : ''}>
            <div className="tab-icon"><FaLightbulb /></div>
            <div>
              Venue Details
              <small>Stadium & surroundings</small>
            </div>
          </button>
          <button onClick={() => setActiveTab('schedule')} className={activeTab === 'schedule' ? 'active' : ''}>
            <div className="tab-icon"><FaCalendarAlt /></div>
            <div>
              Match Schedule
              <small>Check game dates</small>
            </div>
          </button>
          <button onClick={() => setActiveTab('rules')} className={activeTab === 'rules' ? 'active' : ''}>
            <div className="tab-icon"><FcRules /></div>
            <div>
              Tournament Rules
              <small>Guidelines & rules</small>
            </div>
          </button>
        </div>

        <div className="tab-content" onClick={handleCard}>
          {activeTab === 'venue' && (
            <div className="venue-section">
              {imageUrl ? (
                <div className="venue-images-grid">
                  <div className="venue-card" onClick={handleVenueClick} style={{ cursor: 'pointer', position: 'relative' }}>
                    <button onClick={(e) => { e.stopPropagation(); navigate(-1); }} className="card-back-button">
                      ⬅
                    </button>
                    <img src={imageUrl} alt="Venue" />
                    <div className="venue-label">
                      {ground.ground_name || 'Unknown Ground'}
                      <div className="venue-time">{ground.address || 'Unknown Address'}</div>
                    </div>
                    <div className="go-to-icon"><FaChevronRight /></div>
                  </div>
                </div>
              ) : <p>No image available for this venue.</p>}

              {showDetailsBelowCard && (
                <div className="split-view" style={{ marginTop: '2rem' }}>
                  <div className="left-pane"><MatchSchedule /></div>
                  <div className="right-pane"><GroundTournamentRules id={id} /></div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'schedule' && (
            <div className="split-view">
              <div className="left-pane"><GameMatchSchedule /></div> {/* ✅ Updated line */}
              <div className="right-pane" />
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="split-view">
              <div className="left-pane" />
              <div className="right-pane"><GroundTournamentRules id={id} /></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
