import React, { useEffect, useState } from 'react';
import './GroundMatchSchedule.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const GroundMatchSchedule = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await axios.get(`http://157.173.195.249:8000/Tournament/schedule/${id}`);
        setSchedule(response.data || []);
      } catch (err) {
        console.error('Error fetching match schedule:', err);
        setError('Failed to load schedule.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchSchedule();
    }
  }, [id]);

  if (loading) return <p>Loading match schedule...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="match-schedule-wrapper">
      <h2>Match Schedule</h2>

      {schedule.length === 0 ? (
        <p>No match schedule available.</p>
      ) : (
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Teams</th>
              <th>Time</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            {schedule.map((match, index) => (
              <tr key={index}>
                <td>{match.date || 'TBD'}</td>
                <td>{match.teams || 'TBD'}</td>
                <td>{match.time || 'TBD'}</td>
                <td>{match.location || 'TBD'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button className="back-button" onClick={() => navigate(-1)}>⬅ Back</button>
    </div>
  );
};

export default GroundMatchSchedule;
