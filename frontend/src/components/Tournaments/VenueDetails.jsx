import React, { useState, useEffect, useContext } from 'react';
import './VenueDetails.css';
import { useParams } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import GameSchedule from '../Tournaments/GameVenue/GameSchedule';
import GameTournamentRules from './GameVenue/GameTournamentRules';

const WS_URL = 'ws://157.173.195.249:8000/tournaments';

const VenueDetails = () => {
  const { id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [game, setGame] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [wsError, setWsError] = useState(false);

  // Establish WebSocket connection
  useEffect(() => {
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
      console.warn('⚠️ WebSocket disconnected.');
    };

    return () => socket.close();
  }, []);

  // Set current game from URL param
  useEffect(() => {
    if (tournaments.length > 0) {
      const selectedGame = tournaments.find((g) => g.id === id);
      setGame(selectedGame);
    }
  }, [tournaments, id]);

  if (wsError) return <p className="error-msg">WebSocket connection failed. Try again later.</p>;
  if (!game) return <p className="loading-msg">Loading venue details...</p>;

  return (
    <div className={`venue-details-wrapper ${theme}`}>
      <h2>{game.name} - Venue & Rules</h2>

      <div className="venue-description">
        <p>{game.about}</p>
      </div>

      {/* Clickable Image Gallery to switch game */}
      <div className="venue-images-gallery">
        {tournaments.map((g) => (
          <div
            className="venue-img-card"
            key={g.id}
            onClick={() => setGame(g)}
            style={{ cursor: 'pointer' }}
          >
            <img src={g.images?.main_image} alt={g.name} />
            <div className="img-caption">
              {g.name} <span style={{ marginLeft: '8px' }}>➤</span>
            </div>
          </div>
        ))}
      </div>

      {/* Split Section for Schedule and Rules */}
      <div className="venue-split-section">
        <div className="venue-schedule">
          <h3>📅 Match Schedule</h3>
          <GameSchedule schedule={game.schedule} />
        </div>

        <div className="venue-rules">
          <h3>📜 Tournament Rules</h3>
          <GameTournamentRules rules={game.rules} />
        </div>
      </div>
    </div>
  );
};

export default VenueDetails;
