import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TournamentsPage.css';

const TournamentPage = () => {
  const navigate = useNavigate();
  const [tournamentData, setTournamentData] = useState([]);

  const connectWebSocket = () => {
    const ws = new WebSocket('ws://157.173.195.249:8000/tournaments');

    ws.onopen = () => {
      console.log('✅ WebSocket connected');
    };

    ws.onmessage = (event) => {
      try {
        const payload = JSON.parse(event.data);
        console.log('📩 WebSocket data:', payload);

        if (payload.action === 'initial' && Array.isArray(payload.data)) {
          setTournamentData(payload.data);
        }
      } catch (error) {
        console.error('❌ Failed to parse WebSocket data:', error);
      }
    };

    ws.onerror = (error) => {
      console.error('❌ WebSocket error:', error);
    };

    ws.onclose = (e) => {
      console.log('🔌 WebSocket closed. Reconnecting in 3s...', e.reason);
      setTimeout(connectWebSocket, 3000);
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, []);

  const handleCardClick = (gameId) => {
    navigate(`/tournaments/${gameId}`);
  };

  return (
    <div className='main-container'>
      <h1 className="main-heading">Released <span>Tournaments</span></h1>
      <div className="tournament-container">
        <h1 className="sub-heading">PICK YOUR GAME</h1>
        <p className="sub-title">PICK YOUR GAME</p>

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
