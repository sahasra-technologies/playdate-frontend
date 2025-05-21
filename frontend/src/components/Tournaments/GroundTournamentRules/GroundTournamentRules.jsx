import React, { useEffect, useState } from 'react';
import './GroundTournamentRules.css'

const GroundTournamentFirstRules = () => {
  const [firstRules, setFirstRules] = useState([]);

  useEffect(() => {
    fetch('http://157.173.195.249:8000/Tournament/tournaments/')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
      })
      .then(data => {
        // Extract the first rule from each tournament (if exists)
        const firstRuleList = data
          .map(tournament => tournament.rules?.[0]) // Get only the first rule
          .filter(rule => rule); // Remove undefined/null

        setFirstRules(firstRuleList);
      })
      .catch(error => {
        console.error('Fetch error:', error);
      });
  }, []);

  return (
    <div>
      <h2>Tournament Rules</h2>
      <div >
      <ul >
        {firstRules.map((rule, index) => (
          <li className='rules-list'  key={index}>{rule}</li>
        ))}
      </ul>
      </div>
    </div>
  );
};

export default GroundTournamentFirstRules;