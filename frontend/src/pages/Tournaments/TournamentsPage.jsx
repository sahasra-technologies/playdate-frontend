// src/pages/TournamentsPage/TournamentPage.jsx
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { ThemeContext } from '../../context/ThemeContext';
import './TournamentsPage.css';

const TournamentPage = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);

  const [tournamentData, setTournamentData] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [webSocketLoading, setWebSocketLoading] = useState(true);

  let ws;

 useEffect(() => {
  const token = Cookies.get("access");
  if (token) {
    setIsAuthenticated(true);
  } else {
    setIsAuthenticated(true); // not required but makes intent clear
  }
}, []);


  useEffect(() => {
    if (isAuthenticated) {
      connectWebSocket();
    }
    else{
      connectWebSocket();
    }
    // return () => {
    //   if (ws) ws.close();
    // };
  }, [isAuthenticated]);

  const connectWebSocket = () => {
    setWebSocketLoading(true);
    ws = new WebSocket('ws://157.173.195.249:8000/tournaments');

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
      setWebSocketLoading(false);
    };

    ws.onmessage = (event) => {
      setIsLoading(true);
      try {
        const payload = JSON.parse(event.data);
        console.log('📩 WebSocket data:', payload);
        handleWebSocketAction(payload);
      } catch (error) {
        console.error('❌ Failed to parse WebSocket data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
      setWebSocketLoading(false);
    };

    ws.onclose = (e) => {
      console.log('🔌 WebSocket closed. Reconnecting in 3s...', e.reason);
      setTimeout(connectWebSocket, 3000);
    };
  };

  const handleWebSocketAction = (message) => {
    switch (message.action) {
      case 'initial':
        if (Array.isArray(message.data)) {
          setTournamentData(message.data);
        }
        break;

      case 'create':
        setTournamentData((prev) => [...prev, message.data]);
        break;

      case 'update':
        setTournamentData((prev) =>
          prev.map((item) =>
            item.id === message.data.id ? { ...item, ...message.data } : item
          )
        );
        break;

      case 'delete':
        setTournamentData((prev) =>
          prev.filter((item) => item.id !== message.data.id)
        );
        break;

      default:
        console.warn('⚠️ Unhandled WebSocket action:', message.action);
    }
  };

  const handleCardClick = (gameId) => {
    navigate(`/tournaments/${gameId}`);
  };

  const handleAddPlayer = () => {
    navigate("/add-team");
  };

  if (!isAuthenticated) return null;

  return (
    <div className={`main-container ${theme}`}>
      <div className="header-container">
        <h1 className="main-heading">
          Released <span>Tournaments</span>
        </h1>
       <button className="add-team-button" onClick={handleAddPlayer}>
  + Add Team
</button>

      </div>

      <div className="tournament-container">
        <h1 className="sub-heading">PICK YOUR GAME</h1>
        <p className="sub-title">PICK YOUR GAME</p>

        {webSocketLoading && <p>Connecting to server...</p>}
        {isLoading && <p>Loading tournaments...</p>}

        <div className="game-grid">
          {tournamentData.length > 0 ? (
            tournamentData.map((game) => (
              <div
                key={game.id}
                className="game-card"
                onClick={() => handleCardClick(game.id)}
              >
                <img
                  src={game.images?.main_image || '/default.jpg'}
                  alt={game.name}
                />
                <div className="overlay-text">{game.name}</div>
              </div>
            ))
          ) : (
            <p>No tournaments available right now.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TournamentPage;
