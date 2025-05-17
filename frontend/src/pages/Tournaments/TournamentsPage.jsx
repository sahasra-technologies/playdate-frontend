import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TournamentsPage.css';

const TournamentPage = () => {
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [webSocketLoading, setWebSocketLoading] = useState(true);
  let ws;

  useEffect(() => {
    setIsLoading(true);
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
      setTimeout(() => connectWebSocket(), 3000);
    };

    return () => {
      if (ws) ws.close();
    };
  }, []);

  const connectWebSocket = () => {
    ws = new WebSocket('ws://157.173.195.249:8000/tournaments');
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

  return (
    <div className='main-container'>
      <h1 className="main-heading">Released <span>Tournaments</span></h1>
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
