import React, { useEffect, useState } from 'react';
import './GroundTournamentRules.css';

const GroundTournamentRules = ({ setIsLoading }) => {
  const [firstRules, setFirstRules] = useState([]);

 useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch('https://playdatesport.com/api/Tournament/tournaments/');
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      // console.log(response.json())

      const data = await response.json();

      const allRules = data
        .flatMap(tournament => tournament.rules || [])
        .filter(rule => rule);

      setFirstRules(allRules);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  fetchData();
}, [setIsLoading]);


  return (
    <div>
      <h2>Tournament Rules</h2>
      <div>
        <ul>
          {firstRules.length > 0 ? (
            firstRules.map((rule, index) => (
              <li className='rules-list' key={index}>
                {rule}
              </li>
            ))
          ) : (
            <li className='rules-list'>No rules available</li>
          )}
        </ul>

      </div>
    </div>
  );
};

export default GroundTournamentRules;
