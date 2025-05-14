// src/components/Tournaments/GameCard.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './GameCard.css';

const GameCard = ({ game }) => {
  const navigate = useNavigate();

  // Navigate with full game object via state
  const handleCardClick = (tab) => {
    navigate(`/game/${game.id}?tab=${tab}`, { state: game });
  };

  return (
    <div className="game-card" onClick={() => handleCardClick('venue')}>
      <img src={game.logo || game.image} alt={`${game.name} Logo`} className="game-logo" />
      <h3>{game.name}</h3>

      <div className="game-card-buttons">
        <button onClick={(e) => { e.stopPropagation(); handleCardClick('venue'); }}>
          Venue Details
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleCardClick('schedule'); }}>
          Match Schedule
        </button>
        <button onClick={(e) => { e.stopPropagation(); handleCardClick('rules'); }}>
          Tournament Rules
        </button>
      </div>
    </div>
  );
};

export default GameCard;
