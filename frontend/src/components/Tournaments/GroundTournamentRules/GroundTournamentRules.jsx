import React, { useEffect, useState } from 'react';
import './GroundTournamentRules.css';

const GroundTournamentRules = ({ setIsLoading }) => {
  const [firstRules, setFirstRules] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true); // show spinner

        const response = await fetch('http://157.173.195.249:8000/Tournament/tournaments/');
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();

        const firstRuleList = data
          .map(tournament => tournament.rules?.[0])
          .filter(rule => rule);

        setFirstRules(firstRuleList);
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setIsLoading(false); // hide spinner
      }
    };

    fetchData();
  }, [setIsLoading]);

  return (
    <div>
      <h2>Tournament Rules</h2>
      <div>
        <ul>
          {firstRules.map((rule, index) => (
            <li className='rules-list' key={index}>
              {rule}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default GroundTournamentRules;
