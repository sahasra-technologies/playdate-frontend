import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import './GroundTournamentRules.css';

const GroundTournamentRules = ({ setIsLoading }) => {
  const { id } = useParams();
  const locate = useLocation();
  const [firstRules, setFirstRules] = useState([]);

  // const { status, id: tournamentId } = locate.state
  // console.log("Venue status", status, id, tournamentId)

  // console.log("id", id)

 useEffect(() => {
  const fetchData = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`https://playdatesport.com/api/Tournament/tournaments/?id=${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      // console.log(response.json())

      const data = await response.json();
      console.log("data", data)
      // const allRules = data
      //   .flatMap(tournament => tournament.rules || [])
      //   .filter(rule => rule);

      // setFirstRules(allRules);
      setFirstRules(data.rules)
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
