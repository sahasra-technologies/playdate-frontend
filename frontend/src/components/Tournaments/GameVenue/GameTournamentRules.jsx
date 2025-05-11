import React from 'react';
import './GameTournamentRules.css';

const GameTournamentRules = ({ rules }) => {
  if (!rules || rules.length === 0) return <p>No tournament rules available.</p>;

  return (
    <div className="tournament-rules-container">
      {rules.map((rule, index) => (
        <div key={index} className="rule-item">
          <span className="rule-number">{index + 1}.</span>
          <span className="rule-text">{rule}</span>
        </div>
      ))}
    </div>
  );
};

export default GameTournamentRules;
