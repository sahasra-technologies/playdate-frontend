import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { FaLightbulb, FaCalendarAlt, FaChevronRight } from 'react-icons/fa';
import { FcRules } from 'react-icons/fc';
import { ThemeContext } from '../../context/ThemeContext';
import { useGame } from '../../context/GameContext';
import axios from 'axios';
import './GameDetails.css';
import defaultVenueImage from '../../assets/Tournment/sahasra.png'; 
import MatchSchedule from './MatchSchedule';
import GroundTournamentRules from './GroundTournamentRules/GroundTournamentRules';

const API_URL = 'http://157.173.195.249:8000/Tournament/tournaments/';

const GameDetailsPage = ({ setIsLoading }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useContext(ThemeContext);
  const { game, setGame, setGround } = useGame();

  const [activeTab, setActiveTab] = useState('venue');
  const [grounds, setGrounds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const currentTab = queryParams.get('tab') || 'venue';
    setActiveTab(currentTab);
  }, [location.search]);

  useEffect(() => {
    const fetchGameDetails = async () => {
      try {
        const response = await axios.post(API_URL, { id }, {
          headers: { 'Content-Type': 'application/json' }
        });

        const fetchedGrounds = response.data.ground || [];
        setGrounds(fetchedGrounds);
        setGame({ id, ...response.data });
      } catch (err) {
        console.error('API fetch error: ', err);
        setError('Failed to fetch tournament data.');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchGameDetails();
  }, [id, setGame]);

  const handleVenueClick = (ground) => {
    setGround(ground);
    navigate(`/venue/${ground.id}`);
  };

  const updateTab = (tabName) => {
    setActiveTab(tabName);
    navigate(`/tournaments/${id}?tab=${tabName}`, { replace: true });
  };

  if (loading) return <p>Loading game details...</p>;
  if (error) return <div>{error}</div>;
  if (!grounds.length) return <div>No grounds found.</div>;

  return (
    <div className="page-wrapper">
      <div className={`details-container ${theme}`}>
        <h1 className='heading'>{game?.name || 'Game Details'}</h1>

        {/* Tabs */}
        <div className="tab-buttons">
          <button onClick={() => updateTab('venue')} className={activeTab === 'venue' ? 'active' : ''}>
            <div className="tab-icon"><FaLightbulb /></div>
            <div>
              Venue Details
              <small>Stadium & surroundings</small>
            </div>
          </button>
          <button onClick={() => updateTab('schedule')} className={activeTab === 'schedule' ? 'active' : ''}>
            <div className="tab-icon"><FaCalendarAlt /></div>
            <div>
              Match Schedule
              <small>Check game dates</small>
            </div>
          </button>
          <button onClick={() => updateTab('rules')} className={activeTab === 'rules' ? 'active' : ''}>
            <div className="tab-icon"><FcRules /></div>
            <div>
              Tournament Rules
              <small>Guidelines & rules</small>
            </div>
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'venue' && (
            <div className="venue-section">
              <div className="venue-grid">
                {grounds.map((ground) => {
                  let imageUrl = defaultVenueImage;
                  if (Array.isArray(ground.images) && ground.images.length > 0 && ground.images[0].url) {
                    imageUrl = ground.images[0].url;
                  } else if (ground.images?.url) {
                    imageUrl = ground.images.url;
                  }

                  return (
                    <div
                      key={ground.id}
                      className="venue-card"
                      onClick={() => handleVenueClick(ground)}
                    >
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(-1);
                        }}
                        className="card-back-button"
                      >
                        ⬅
                      </button>

                      <img src={imageUrl} alt="Venue" />

                      <div className="venue-label">
                        {ground.ground_name || 'Unknown Ground'}
                        <div className="venue-time">{ground.address || 'Unknown Address'}</div>
                      </div>
                      <div className="go-to-icon"><FaChevronRight /></div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {activeTab === 'schedule' && <MatchSchedule id={id} />}
          {activeTab === 'rules' && <GroundTournamentRules id={id} setIsLoading={setIsLoading} />}
        </div>
      </div>
    </div>
  );
};

export default GameDetailsPage;
