import React, { useEffect, useState } from 'react';
import './MatchPage.css';
import axios from 'axios';
import matchSchedule from '../../assets/Tournment/matchSchedule.png';

function MatchPage({ setIsLoading, id }) {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);

    axios.get(`https://playdatesport.com/api/Tournament/tournament_ground/?id=${id}`)
      .then(({ data }) => {
        setMatches(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error('Error fetching matches:', err);
        setError('Failed to load matches');
        setIsLoading(false);
      });
  }, [setIsLoading, id]);

  if (error) {
    return (
      <div className="app">
        <p className="error">{error}</p>
      </div>
    );
  }

  return (
    <div className="app">
      <div className="match-list">
        {matches.length === 0 ? (
          <div className="no-matches">
            <img src={matchSchedule} alt="No Matches Scheduled" className="no-matches-img" />
          </div>
        ) : (
          matches.map((match) => (
            <div className="card" key={match.id}>
              <div className="teams">
                <div className="team">
                  <img
                    src={match?.team1?.images?.url || '/default-team.png'}
                    alt={match?.team1?.name || 'Team 1'}
                  />
                  <p>{match?.team1?.name || 'N/A'}</p>
                </div>
                <div className="vs">V/s</div>
                <div className="team">
                  <img
                    src={match?.team2?.images?.url || '/default-team.png'}
                    alt={match?.team2?.name || 'Team 2'}
                  />
                  <p>{match?.team2?.name || 'N/A'}</p>
                </div>
              </div>

              <div className="info">
                <p><strong>Venue:</strong> {match?.grounds?.ground_name || 'N/A'}</p>
                <p><strong>Date:</strong> {match?.date || 'N/A'}</p>
              </div>

              {/* <div className="buttons">
                <button>View Players</button>
                <button>View Score</button>
              </div> */}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default MatchPage;
