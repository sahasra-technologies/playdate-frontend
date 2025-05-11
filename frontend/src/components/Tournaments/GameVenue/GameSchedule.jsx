import React from 'react';
import './GameSchedule.css';

const GameSchedule = ({ schedule }) => {
  if (!schedule || schedule.length === 0) return <p>No match schedule available.</p>;

  return (
    <table className="schedule-table">
      <thead>
        <tr>
          <th>Date</th>
          <th>Time</th>
          <th>Teams</th>
          <th>Venue</th>
        </tr>
      </thead>
      <tbody>
        {schedule.map((match, index) => (
          <tr key={index}>
            <td>{match.date}</td>
            <td>{match.time}</td>
            <td>{match.teams}</td>
            <td>{match.venue}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default GameSchedule;
