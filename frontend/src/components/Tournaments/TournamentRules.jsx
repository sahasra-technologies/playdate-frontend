import React from 'react';
import './TournamentRules.css';

const TournamentsRules = () => {
  return (
    <div className="tournament-rules-container">
      {/* Heading Section */}
      <div className="heading-section">
        <h2 className="heading-title">Tournament Rules</h2>
      </div>

      {/* Rules Content */}
      <div className="rules-content">
        <p>
          1. Each team must have a minimum of 5 and a maximum of 10 players.
        </p>
        <p>
          2. Players must wear proper sports attire and shoes during matches.
        </p>
        <p>
          3. Matches will follow knockout format; the losing team is eliminated.
        </p>
        <p>
          4. Any misconduct or foul play will result in immediate disqualification.
        </p>
        <p>
          5. Matches will be 40 minutes long with two 20-minute halves.
        </p>
        <p>
          6. The referee’s decision will be final and binding in all cases.
        </p>
        <p>
          7. All teams must arrive 15 minutes before their scheduled match.
        </p>
        <p>
          8. Substitutions can be made only during stoppages and with the referee’s permission.
        </p>
      </div>
    </div>
  );
};

export default TournamentsRules;
